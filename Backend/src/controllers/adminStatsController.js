import { z } from 'zod';
import { query } from '../config/db.js';

// ============================================================================
// BE-08 — Endpoint dashboard admin & statistik kelompok
//
// DEFINISI METRIK (eksplisit; tidak mengarang data bila belum tersedia):
//
// 1. jumlahPeserta
//    = COUNT(*) participants. Rentang pembagi: seluruh peserta terdaftar.
//
// 2. rataRataPretest / rataRataPosttest
//    = AVG(score) test_attempts yang SUDAH disubmit (score IS NOT NULL),
//      dikelompokkan per type ('pretest'/'posttest').
//    Pembagi = jumlah attempt tersubmit pada type tersebut (bukan jumlah
//    peserta). Bila belum ada attempt tersubmit -> nilai null (bukan 0).
//
// 3. kenaikanRataRata
//    = rataRataPosttest - rataRataPretest. Hanya dihitung bila KEDUA rata-rata
//    tersedia. Bila salah satu null -> null.
//
// 4. progres & penyelesaian
//    - pesertaPretestSelesai = COUNT(DISTINCT participant_id) attempt pretest
//      tersubmit.
//    - pesertaPosttestSelesai = COUNT(DISTINCT participant_id) attempt posttest
//      tersubmit.
//    - persenPenyelesaianPosttest = pesertaPosttestSelesai / jumlahPeserta * 100
//      (0 bila jumlahPeserta = 0).
//
// 5. distribusiHasil (per type)
//    = jumlah attempt tersubmit per bucket skor 0-10. Pembagi = attempt
//    tersubmit pada type tersebut.
//
// 6. soalSalahTerbanyak
//    = per question_id: COUNT(*) jawaban salah (is_correct = FALSE) dari
//    attempt tersubmit, plus total dijawab (selected_option IS NOT NULL) dan
//    persenSalah = salah / totalDijawab * 100. Diurutkan menurun, dipaginasi.
//    Catatan: jawaban kosong (selected_option NULL) TIDAK dihitung sebagai
//    salah maupun dijawab.
//
// 7. kategoriSalahTerbanyak
//    = agregasi yang sama dengan #6 tetapi dikelompokkan per questions.kategori.
//
// 8. ringkasanKodeKelas
//    = per class_codes.code: jumlah peserta, jumlah attempt tersubmit pre/post,
//    rata-rata skor pre/post, dan persen penyelesaian post-test. Hanya kode
//    yang benar-benar ada di tabel class_codes. Tidak mengekspos nickname/token.
//
// GAP DATA (lihat Backend/plans/BE-08-stats.md):
// - Waktu pengerjaan per soal tidak direkam -> tidak ada metrik durasi.
// - Kategori hanya tersedia bila questions.kategori terisi.
// - Retensi 14 hari belum dihitung (menunggu keputusan requirement).
// ============================================================================

export const statsQuerySchema = z.object({
  kodeKelas: z.string().trim().max(40).optional(),
  jalur: z.enum(['anak', 'dewasa', 'lansia']).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

const JALUR_TRACK = { anak: 0, dewasa: 1, lansia: 2 };

function pagination(page, limit) {
  return { offset: (page - 1) * limit, limit };
}

function angka(value) {
  if (value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

// Membangun klausa filter peserta (kode kelas / jalur) secara terparameterisasi.
function filterPeserta({ kodeKelas, jalur }, params) {
  const kondisi = [];
  if (kodeKelas) {
    params.push(kodeKelas.toUpperCase());
    kondisi.push(`p.class_code = $${params.length}`);
  }
  if (jalur) {
    params.push(JALUR_TRACK[jalur]);
    kondisi.push(`p.track = $${params.length}`);
  }
  return kondisi.length ? `WHERE ${kondisi.join(' AND ')}` : '';
}

export async function getRingkasan(req, res, next) {
  try {
    const { kodeKelas, jalur } = req.query;
    const params = [];
    const where = filterPeserta({ kodeKelas, jalur }, params);

    const { rows: pesertaRows } = await query(
      `SELECT COUNT(*)::int AS jumlah FROM participants p ${where}`,
      params,
    );
    const jumlahPeserta = pesertaRows[0]?.jumlah ?? 0;

    // Rata-rata & jumlah attempt tersubmit per type, dibatasi peserta terfilter.
    const { rows: skorRows } = await query(
      `SELECT a.type,
              COUNT(*)::int AS jumlah_attempt,
              COUNT(DISTINCT a.participant_id)::int AS jumlah_peserta,
              AVG(a.score)::numeric AS rata_rata
       FROM test_attempts a
       JOIN participants p ON p.id = a.participant_id
       ${where ? `${where} AND` : 'WHERE'} a.score IS NOT NULL
       GROUP BY a.type`,
      params,
    );

    const perType = {};
    for (const r of skorRows) {
      perType[r.type] = {
        jumlahAttempt: r.jumlah_attempt,
        jumlahPeserta: r.jumlah_peserta,
        rataRata: angka(r.rata_rata),
      };
    }

    const pre = perType.pretest || { jumlahAttempt: 0, jumlahPeserta: 0, rataRata: null };
    const post = perType.posttest || { jumlahAttempt: 0, jumlahPeserta: 0, rataRata: null };
    const kenaikan =
      pre.rataRata !== null && post.rataRata !== null
        ? Math.round((post.rataRata - pre.rataRata) * 100) / 100
        : null;

    res.json({
      ringkasan: {
        jumlahPeserta,
        pretest: pre,
        posttest: post,
        kenaikanRataRata: kenaikan,
        penyelesaian: {
          pesertaPretestSelesai: pre.jumlahPeserta,
          pesertaPosttestSelesai: post.jumlahPeserta,
          persenPenyelesaianPosttest:
            jumlahPeserta > 0 ? Math.round((post.jumlahPeserta / jumlahPeserta) * 1000) / 10 : 0,
        },
      },
      definisi: {
        jumlahPeserta: 'COUNT(*) participants sesuai filter.',
        rataRata: 'AVG(score) attempt tersubmit (score IS NOT NULL) per type; null bila belum ada.',
        kenaikanRataRata: 'posttest - pretest; null bila salah satu rata-rata belum tersedia.',
        persenPenyelesaianPosttest: 'peserta posttest selesai / jumlah peserta * 100.',
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getDistribusi(req, res, next) {
  try {
    const { kodeKelas, jalur } = req.query;
    const params = [];
    const where = filterPeserta({ kodeKelas, jalur }, params);

    const { rows } = await query(
      `SELECT a.type, a.score, COUNT(*)::int AS jumlah
       FROM test_attempts a
       JOIN participants p ON p.id = a.participant_id
       ${where ? `${where} AND` : 'WHERE'} a.score IS NOT NULL
       GROUP BY a.type, a.score
       ORDER BY a.type ASC, a.score ASC`,
      params,
    );

    const distribusi = { pretest: [], posttest: [] };
    for (const r of rows) {
      if (!distribusi[r.type]) distribusi[r.type] = [];
      distribusi[r.type].push({ skor: r.score, jumlah: r.jumlah });
    }

    res.json({
      distribusi,
      definisi: 'Jumlah attempt tersubmit per bucket skor (0-10) untuk tiap type.',
    });
  } catch (err) {
    next(err);
  }
}

export async function getSoalSalah(req, res, next) {
  try {
    const { page, limit } = req.query;
    const { offset } = pagination(page, limit);

    const { rows } = await query(
      `SELECT q.id, q.kategori,
              COUNT(*) FILTER (WHERE a.selected_option IS NOT NULL AND a.is_correct = FALSE)::int AS salah,
              COUNT(*) FILTER (WHERE a.selected_option IS NOT NULL)::int AS dijawab
       FROM answers a
       JOIN test_attempts t ON t.id = a.attempt_id AND t.score IS NOT NULL
       JOIN questions q ON q.id = a.question_id
       GROUP BY q.id, q.kategori
       HAVING COUNT(*) FILTER (WHERE a.selected_option IS NOT NULL AND a.is_correct = FALSE) > 0
       ORDER BY salah DESC, q.id ASC
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    const soal = rows.map((r) => ({
      questionId: r.id,
      kategori: r.kategori || null,
      salah: r.salah,
      dijawab: r.dijawab,
      persenSalah: r.dijawab > 0 ? Math.round((r.salah / r.dijawab) * 1000) / 10 : null,
    }));

    res.json({
      soal,
      page,
      limit,
      definisi: 'Jawaban salah (is_correct=FALSE) dari attempt tersubmit; jawaban kosong tidak dihitung.',
    });
  } catch (err) {
    next(err);
  }
}

export async function getKategoriSalah(req, res, next) {
  try {
    const { page, limit } = req.query;
    const { offset } = pagination(page, limit);

    const { rows } = await query(
      `SELECT COALESCE(q.kategori, 'Tanpa Kategori') AS kategori,
              COUNT(*) FILTER (WHERE a.selected_option IS NOT NULL AND a.is_correct = FALSE)::int AS salah,
              COUNT(*) FILTER (WHERE a.selected_option IS NOT NULL)::int AS dijawab
       FROM answers a
       JOIN test_attempts t ON t.id = a.attempt_id AND t.score IS NOT NULL
       JOIN questions q ON q.id = a.question_id
       GROUP BY COALESCE(q.kategori, 'Tanpa Kategori')
       HAVING COUNT(*) FILTER (WHERE a.selected_option IS NOT NULL AND a.is_correct = FALSE) > 0
       ORDER BY salah DESC, kategori ASC
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    const kategori = rows.map((r) => ({
      kategori: r.kategori,
      salah: r.salah,
      dijawab: r.dijawab,
      persenSalah: r.dijawab > 0 ? Math.round((r.salah / r.dijawab) * 1000) / 10 : null,
    }));

    res.json({
      kategori,
      page,
      limit,
      definisi: 'Agregasi jawaban salah per questions.kategori dari attempt tersubmit.',
    });
  } catch (err) {
    next(err);
  }
}

export async function getRingkasanKodeKelas(req, res, next) {
  try {
    const { page, limit } = req.query;
    const { offset } = pagination(page, limit);

    const { rows } = await query(
      `SELECT c.code, c.label, c.active,
              (SELECT COUNT(*)::int FROM participants p WHERE p.class_code = c.code) AS jumlah_peserta,
              (SELECT COUNT(DISTINCT a.participant_id)::int
                 FROM test_attempts a JOIN participants p ON p.id = a.participant_id
                WHERE p.class_code = c.code AND a.type = 'pretest' AND a.score IS NOT NULL) AS pre_selesai,
              (SELECT COUNT(DISTINCT a.participant_id)::int
                 FROM test_attempts a JOIN participants p ON p.id = a.participant_id
                WHERE p.class_code = c.code AND a.type = 'posttest' AND a.score IS NOT NULL) AS post_selesai,
              (SELECT AVG(a.score)::numeric
                 FROM test_attempts a JOIN participants p ON p.id = a.participant_id
                WHERE p.class_code = c.code AND a.type = 'pretest' AND a.score IS NOT NULL) AS pre_rata,
              (SELECT AVG(a.score)::numeric
                 FROM test_attempts a JOIN participants p ON p.id = a.participant_id
                WHERE p.class_code = c.code AND a.type = 'posttest' AND a.score IS NOT NULL) AS post_rata
       FROM class_codes c
       ORDER BY c.code ASC
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    const kodeKelas = rows.map((r) => {
      const jumlahPeserta = r.jumlah_peserta;
      return {
        code: r.code,
        label: r.label || '',
        active: r.active,
        jumlahPeserta,
        pretestSelesai: r.pre_selesai,
        posttestSelesai: r.post_selesai,
        rataRataPretest: angka(r.pre_rata),
        rataRataPosttest: angka(r.post_rata),
        persenPenyelesaianPosttest:
          jumlahPeserta > 0 ? Math.round((r.post_selesai / jumlahPeserta) * 1000) / 10 : 0,
      };
    });

    res.json({
      kodeKelas,
      page,
      limit,
      definisi: 'Ringkasan per class_codes.code; tanpa nickname/token peserta.',
    });
  } catch (err) {
    next(err);
  }
}

export default {
  getRingkasan,
  getDistribusi,
  getSoalSalah,
  getKategoriSalah,
  getRingkasanKodeKelas,
};
