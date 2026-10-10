import { z } from 'zod';
import { query } from '../config/db.js';
import { evaluate } from '../services/scoringService.js';

const TEST_TYPES = ['pretest', 'posttest'];

export const testTypeParamSchema = z.object({
  type: z.enum(TEST_TYPES, { message: 'Tipe tes harus "pretest" atau "posttest".' }),
});

export const startTestSchema = z
  .object({
    token: z.string().trim().regex(/^TKP-[A-Z0-9]{8}$/, 'Format token tidak valid'),
  })
  .strict();

export const submitTestSchema = z
  .object({
    attemptId: z.string().uuid('attemptId tidak valid'),
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

export async function startTest(req, res, next) {
  try {
    const { type } = req.params;
    const { token } = req.body;

    const participant = await findParticipant(token);
    if (!participant) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Peserta tidak ditemukan.' },
      });
    }

    if (type === 'posttest') {
      const { rows: attempts } = await query(
        `SELECT id FROM test_attempts
         WHERE participant_id = $1 AND type = 'posttest' LIMIT 1`,
        [participant.id],
      );
      if (attempts.length > 0) {
        return res.status(409).json({
          error: {
            code: 'ATTEMPT_LIMIT_REACHED',
            message: 'Post-test hanya dapat dikerjakan satu kali.',
          },
        });
      }
    }

    const { rows: questions } = await query(
      `SELECT id, kategori, pertanyaan, opsi
       FROM questions
       WHERE track = $1 AND type = $2 AND active = TRUE
       ORDER BY id ASC
       LIMIT 10`,
      [participant.track, type],
    );

    if (questions.length === 0) {
      const message =
        type === 'posttest'
          ? 'Soal post-test belum tersedia'
          : 'Soal pre-test belum tersedia';
      return res.status(404).json({
        error: { code: 'QUESTIONS_NOT_AVAILABLE', message },
      });
    }

    const { rows: attemptRows } = await query(
      `INSERT INTO test_attempts (participant_id, type)
       VALUES ($1, $2) RETURNING id`,
      [participant.id, type],
    );

    res.status(201).json({
      attemptId: attemptRows[0].id,
      type,
      track: participant.track,
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
    const { attemptId, answers } = req.body;

    const { rows: attemptRows } = await query(
      `SELECT id, participant_id, type, score
       FROM test_attempts WHERE id = $1 LIMIT 1`,
      [attemptId],
    );

    if (attemptRows.length === 0) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Attempt tidak ditemukan.' },
      });
    }

    const attempt = attemptRows[0];
    if (attempt.type !== type) {
      return res.status(400).json({
        error: { code: 'TYPE_MISMATCH', message: 'Tipe tes tidak sesuai dengan attempt.' },
      });
    }

    if (attempt.score !== null) {
      return res.status(409).json({
        error: { code: 'ALREADY_SUBMITTED', message: 'Attempt ini sudah pernah disubmit.' },
      });
    }

    const { rows: questions } = await query(
      `SELECT id, kunci, penjelasan, kasus_nyata
       FROM questions
       WHERE track = (SELECT track FROM participants WHERE id = $1)
         AND type = $2 AND active = TRUE
       ORDER BY id ASC
       LIMIT 10`,
      [attempt.participant_id, type],
    );

    const validIds = new Set(questions.map((q) => q.id));
    const invalid = answers.filter((a) => !validIds.has(String(a.questionId)));
    if (invalid.length > 0) {
      return res.status(400).json({
        error: {
          code: 'INVALID_QUESTION',
          message: 'Terdapat jawaban untuk soal yang bukan bagian dari tes ini.',
          details: invalid.map((a) => ({ field: 'answers', message: a.questionId })),
        },
      });
    }

    const result = evaluate(questions, answers, type);

    const detailMap = new Map(result.details.map((d) => [String(d.questionId), d]));

    await query('BEGIN');
    try {
      for (const q of questions) {
        const d = detailMap.get(String(q.id));
        await query(
          `INSERT INTO answers (attempt_id, question_id, selected_option, is_correct)
           VALUES ($1, $2, $3, $4)`,
          [attemptId, q.id, d?.selectedOption ?? 0, d?.isCorrect ?? false],
        );
      }

      await query(
        `UPDATE test_attempts SET score = $1, passed = $2 WHERE id = $3`,
        [result.score, result.passed, attemptId],
      );

      if (type === 'pretest') {
        await query(
          `INSERT INTO progress (participant_id, pretest_score)
           VALUES ($1, $2)
           ON CONFLICT (participant_id) DO UPDATE SET
             pretest_score = EXCLUDED.pretest_score,
             updated_at    = NOW()`,
          [attempt.participant_id, result.score],
        );
      } else {
        await query(
          `INSERT INTO progress (participant_id, posttest_score)
           VALUES ($1, $2)
           ON CONFLICT (participant_id) DO UPDATE SET
             posttest_score = EXCLUDED.posttest_score,
             updated_at     = NOW()`,
          [attempt.participant_id, result.score],
        );
      }

      await query('COMMIT');
    } catch (txErr) {
      await query('ROLLBACK');
      throw txErr;
    }

    res.json({
      attemptId,
      type,
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
    });
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

    const { rows: attempts } = await query(
      `SELECT id, type, score, passed, created_at
       FROM test_attempts
       WHERE participant_id = $1
       ORDER BY created_at ASC`,
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

    res.json({
      token,
      attempts: attempts.map((a) => ({
        attemptId: a.id,
        type: a.type,
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
      },
    });
  } catch (err) {
    next(err);
  }
}

export default { startTest, submitTest, getResults };
