import { z } from 'zod';
import { query, withTransaction } from '../config/db.js';
import { evaluate } from '../services/scoringService.js';
import {
  pilihSet,
  setTersediaUntukPeserta,
  validasiJawaban,
  bolehMulaiPosttest,
  cekRetensi,
  tipeSetDariTes,
  trackDariJalur,
} from '../services/setSelectionService.js';

const TEST_TYPES = ['pretest', 'posttest', 'retensi'];

export const testTypeParamSchema = z.object({
  type: z.enum(TEST_TYPES, { message: 'Tipe tes harus "pretest", "posttest", atau "retensi".' }),
});

export const startTestSchema = z
  .object({
    token: z.string().trim().regex(/^TKP-[A-Z0-9]{8}$/, 'Format token tidak valid'),
    setId: z.string().trim().min(1).max(80).optional(),
  })
  .strict();

export const submitTestSchema = z
  .object({
    attemptId: z.string().uuid('attemptId tidak valid'),
    token: z.string().trim().regex(/^TKP-[A-Z0-9]{8}$/, 'Format token tidak valid'),
    answers: z
      .array(
        z.object({
          questionId: z.string().trim().min(1),
          selectedOption: z.coerce.number().int().min(0),
        }),
      )
      .min(1, 'Jawaban tidak boleh kosong'),
  })
  .strict();

export const resultsTokenParamSchema = z.object({
  token: z.string().trim().regex(/^TKP-[A-Z0-9]{8}$/, 'Format token tidak valid'),
});

async function findParticipant(token) {
  const { rows } = await query(
    'SELECT id, track FROM participants WHERE token = $1 LIMIT 1',
    [token],
  );
  return rows.length > 0 ? rows[0] : null;
}

// Ambil kandidat set untuk jalur peserta + tipe tes, lalu pilih yang aktif & dalam jadwal.
async function ambilSetAktif(jalur, type, setId) {
  const tipeSet = tipeSetDariTes(type);
  if (!tipeSet) return null;

  if (setId) {
    const { rows } = await query(
      `SELECT id, nama, jalur, tipe, status, rilis_at, tutup_at, created_at
       FROM question_sets WHERE id = $1 LIMIT 1`,
      [setId],
    );
    const set = rows[0];
    if (!set || set.jalur !== jalur || set.tipe !== tipeSet) return null;
    // Terapkan validasi status & jadwal yang sama seperti jalur tanpa setId.
    if (!setTersediaUntukPeserta(set)) return null;
    return set;
  }

  const { rows } = await query(
    `SELECT id, nama, jalur, tipe, status, rilis_at, tutup_at, created_at
     FROM question_sets WHERE jalur = $1 AND tipe = $2`,
    [jalur, tipeSet],
  );
  return pilihSet(rows, { jalur, type });
}

async function ambilSoalSet(setId) {
  const { rows } = await query(
    `SELECT id, kategori, pertanyaan, opsi
     FROM questions
     WHERE set_id = $1 AND active = TRUE
     ORDER BY created_at ASC, id ASC
     LIMIT 10`,
    [setId],
  );
  return rows;
}

export async function startTest(req, res, next) {
  try {
    const { type } = req.params;
    const { token, setId } = req.body;

    const participant = await findParticipant(token);
    if (!participant) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Peserta tidak ditemukan.' },
      });
    }

    const jalur = Object.entries({ 0: 'anak', 1: 'dewasa', 2: 'lansia' }).find(
      ([k]) => Number(k) === participant.track,
    )?.[1];
    if (!jalur) {
      return res.status(400).json({
        error: { code: 'INVALID_TRACK', message: 'Jalur peserta tidak dikenali.' },
      });
    }

    const set = await ambilSetAktif(jalur, type, setId);
    if (!set) {
      return res.status(404).json({
        error: {
          code: 'SET_NOT_AVAILABLE',
          message: 'Set soal belum tersedia atau belum masuk jadwal.',
        },
      });
    }

    const { rows: attempts } = await query(
      `SELECT id, set_id, type, score, created_at
       FROM test_attempts
       WHERE participant_id = $1 AND set_id = $2
       ORDER BY created_at ASC`,
      [participant.id, set.id],
    );

    let attemptId = null;

    if (type === 'posttest') {
      const cek = bolehMulaiPosttest(attempts, set.id);
      if (!cek.boleh) {
        return res.status(409).json({
          error: {
            code: 'ATTEMPT_LIMIT_REACHED',
            message: 'Post-test hanya dapat dikerjakan satu kali per set.',
          },
        });
      }
      attemptId = cek.attemptId;
    } else if (type === 'retensi') {
      // Retensi hanya boleh setelah 14 hari sejak submit post-test terakhir.
      const { rows: postRows } = await query(
        `SELECT id, score, created_at FROM test_attempts
         WHERE participant_id = $1 AND type = 'posttest' AND score IS NOT NULL
         ORDER BY created_at DESC LIMIT 1`,
        [participant.id],
      );
      const cek = cekRetensi(postRows[0]);
      if (!cek.boleh) {
        return res.status(409).json({
          error: {
            code: 'RETENSI_BELUM_TIBA',
            message: 'Tes ulang baru tersedia setelah 14 hari sejak post-test terakhir.',
            tersediaPada: cek.tersediaPada ? cek.tersediaPada.toISOString() : null,
          },
        });
      }
      const pending = attempts.find((a) => a.score === null);
      attemptId = pending ? pending.id : null;
    } else {
      // Pretest boleh diulang: lanjutkan attempt pending bila ada.
      const pending = attempts.find((a) => a.score === null);
      attemptId = pending ? pending.id : null;
    }

    const questions = await ambilSoalSet(set.id);
    if (questions.length === 0) {
      return res.status(404).json({
        error: { code: 'QUESTIONS_NOT_AVAILABLE', message: 'Soal pada set ini belum tersedia.' },
      });
    }

    if (!attemptId) {
      const { rows: attemptRows } = await query(
        `INSERT INTO test_attempts (participant_id, type, set_id)
         VALUES ($1, $2, $3) RETURNING id`,
        [participant.id, type, set.id],
      );
      attemptId = attemptRows[0].id;
    }

    // Respons peserta: tanpa kunci/penjelasan/kasus_nyata.
    res.status(201).json({
      attemptId,
      type,
      track: participant.track,
      setId: set.id,
      setNama: set.nama,
      questions: questions.map((q) => ({
        id: q.id,
        kategori: q.kategori,
        pertanyaan: q.pertanyaan,
        opsi: q.opsi,
      })),
    });
  } catch (err) {
    next(err);
  }
}

export async function submitTest(req, res, next) {
  try {
    const { type } = req.params;
    const { attemptId, token, answers } = req.body;

    const participant = await findParticipant(token);
    if (!participant) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Peserta tidak ditemukan.' },
      });
    }

    const outcome = await withTransaction(async (client) => {
      // Klaim attempt secara atomik: hanya attempt milik peserta, belum disubmit.
      const { rows: attemptRows } = await client.query(
        `SELECT id, participant_id, type, set_id, score
         FROM test_attempts WHERE id = $1 FOR UPDATE`,
        [attemptId],
      );

      if (attemptRows.length === 0) {
        return { status: 404, body: { error: { code: 'NOT_FOUND', message: 'Attempt tidak ditemukan.' } } };
      }

      const attempt = attemptRows[0];

      if (attempt.participant_id !== participant.id) {
        return { status: 403, body: { error: { code: 'FORBIDDEN', message: 'Attempt ini bukan milik peserta.' } } };
      }

      if (attempt.type !== type) {
        return { status: 400, body: { error: { code: 'TYPE_MISMATCH', message: 'Tipe tes tidak sesuai dengan attempt.' } } };
      }

      if (attempt.score !== null) {
        return { status: 409, body: { error: { code: 'ALREADY_SUBMITTED', message: 'Attempt ini sudah pernah disubmit.' } } };
      }

      if (!attempt.set_id) {
        return { status: 409, body: { error: { code: 'SET_MISSING', message: 'Attempt tidak terikat set soal.' } } };
      }

      // Soal harus berasal dari set attempt, aktif, dan set masih dalam jadwal.
      const { rows: setRows } = await client.query(
        `SELECT id, status, rilis_at, tutup_at FROM question_sets WHERE id = $1 LIMIT 1`,
        [attempt.set_id],
      );
      const set = setRows[0];
      if (!set) {
        return { status: 409, body: { error: { code: 'SET_NOT_AVAILABLE', message: 'Set soal tidak ditemukan.' } } };
      }

      const { rows: questions } = await client.query(
        `SELECT id, kategori, opsi, kunci, penjelasan, kasus_nyata
         FROM questions
         WHERE set_id = $1 AND active = TRUE
         ORDER BY created_at ASC, id ASC
         LIMIT 10`,
        [attempt.set_id],
      );

      if (questions.length === 0) {
        return { status: 409, body: { error: { code: 'QUESTIONS_NOT_AVAILABLE', message: 'Soal pada set ini tidak tersedia.' } } };
      }

      const cek = validasiJawaban(answers, questions);
      if (!cek.valid) {
        const details = [];
        if (cek.duplikat.length > 0) {
          details.push({ field: 'answers', message: `Jawaban duplikat: ${cek.duplikat.join(', ')}` });
        }
        if (cek.tidakDikenal.length > 0) {
          details.push({ field: 'answers', message: `Soal bukan bagian set ini: ${cek.tidakDikenal.join(', ')}` });
        }
        if (cek.opsiTidakValid.length > 0) {
          details.push({ field: 'answers', message: 'Pilihan jawaban di luar rentang opsi.' });
        }
        return {
          status: 400,
          body: { error: { code: 'INVALID_ANSWERS', message: 'Jawaban tidak valid.', details } },
        };
      }

      const result = evaluate(questions, answers, type);
      const detailMap = new Map(result.details.map((d) => [String(d.questionId), d]));

      for (const q of questions) {
        const d = detailMap.get(String(q.id));
        await client.query(
          `INSERT INTO answers (attempt_id, question_id, selected_option, is_correct)
           VALUES ($1, $2, $3, $4)`,
          [attemptId, q.id, d?.selectedOption ?? null, d?.isCorrect ?? false],
        );
      }

      // Update atomik: hanya bila belum disubmit (cegah submit ganda bersamaan).
      const { rows: updated } = await client.query(
        `UPDATE test_attempts SET score = $1, passed = $2
         WHERE id = $3 AND score IS NULL RETURNING id`,
        [result.score, result.passed, attemptId],
      );
      if (updated.length === 0) {
        return { status: 409, body: { error: { code: 'ALREADY_SUBMITTED', message: 'Attempt ini sudah pernah disubmit.' } } };
      }

      if (type === 'pretest') {
        await client.query(
          `INSERT INTO progress (participant_id, pretest_score)
           VALUES ($1, $2)
           ON CONFLICT (participant_id) DO UPDATE SET
             pretest_score = EXCLUDED.pretest_score,
             updated_at    = NOW()`,
          [attempt.participant_id, result.score],
        );
      } else if (type === 'posttest') {
        await client.query(
          `INSERT INTO progress (participant_id, posttest_score)
           VALUES ($1, $2)
           ON CONFLICT (participant_id) DO UPDATE SET
             posttest_score = EXCLUDED.posttest_score,
             updated_at     = NOW()`,
          [attempt.participant_id, result.score],
        );
      }

      return {
        status: 200,
        body: {
          attemptId,
          type,
          setId: attempt.set_id,
          score: result.score,
          total: result.total,
          passed: result.passed,
          details: questions.map((q) => {
            const d = detailMap.get(String(q.id));
            return {
              questionId: q.id,
              selectedOption: d?.selectedOption ?? null,
              isCorrect: d?.isCorrect ?? false,
              penjelasan: q.penjelasan,
              kasusNyata: q.kasus_nyata,
            };
          }),
        },
      };
    });

    res.status(outcome.status).json(outcome.body);
  } catch (err) {
    next(err);
  }
}

export async function getResults(req, res, next) {
  try {
    const { token } = req.params;

    const participant = await findParticipant(token);
    if (!participant) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Peserta tidak ditemukan.' },
      });
    }

    // Hanya attempt milik peserta ini yang sudah dinilai server (score IS NOT NULL).
    // Skor selalu berasal dari test_attempts, bukan nilai kiriman klien.
    const { rows: attempts } = await query(
      `SELECT ta.id, ta.type, ta.set_id, ta.score, ta.passed, ta.created_at,
              qs.nama AS set_nama
       FROM test_attempts ta
       LEFT JOIN question_sets qs ON qs.id = ta.set_id
       WHERE ta.participant_id = $1 AND ta.score IS NOT NULL
       ORDER BY ta.created_at ASC`,
      [participant.id],
    );

    const { rows: categoryRows } = await query(
      `SELECT q.kategori,
              COUNT(*)::int AS total,
              SUM(CASE WHEN a.is_correct THEN 1 ELSE 0 END)::int AS correct
       FROM answers a
       JOIN test_attempts ta ON ta.id = a.attempt_id
       JOIN questions q ON q.id = a.question_id
       WHERE ta.participant_id = $1
       GROUP BY q.kategori
       ORDER BY q.kategori ASC`,
      [participant.id],
    );

    // Ringkasan per tipe tes (pre/post/retensi) dari attempt yang sudah dinilai.
    const byType = {};
    for (const a of attempts) {
      const entry = byType[a.type] ?? { attempts: 0, bestScore: null, lastScore: null, passed: false };
      entry.attempts += 1;
      entry.lastScore = a.score;
      entry.bestScore = entry.bestScore === null ? a.score : Math.max(entry.bestScore, a.score);
      entry.passed = entry.passed || a.passed === true;
      byType[a.type] = entry;
    }

    res.json({
      token,
      attempts: attempts.map((a) => ({
        attemptId: a.id,
        type: a.type,
        setId: a.set_id,
        setNama: a.set_nama ?? null,
        score: a.score,
        passed: a.passed,
        createdAt: a.created_at,
      })),
      summary: {
        byCategory: categoryRows.map((c) => ({
          kategori: c.kategori,
          correct: c.correct,
          total: c.total,
        })),
        byType,
      },
    });
  } catch (err) {
    next(err);
  }
}

export default { startTest, submitTest, getResults };
