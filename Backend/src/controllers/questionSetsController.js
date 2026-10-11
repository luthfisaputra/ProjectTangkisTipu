import { z } from 'zod';
import { query, withTransaction } from '../config/db.js';

// Batas maksimal soal per set sesuai PRD FR-05 ("Tiap set berisi 10 soal").
export const MAKS_SOAL = 10;

const JALUR = ['anak', 'dewasa', 'lansia'];
const TIPE = ['pre', 'post', 'retensi'];
const STATUS = ['draf', 'terjadwal', 'aktif'];

const tanggal = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD.')
  .or(z.literal(''))
  .optional()
  .nullable();

const setBase = {
  nama: z.string().trim().min(1, 'Nama set wajib diisi.').max(200),
  catatan: z.string().trim().max(500).optional().nullable(),
  jalur: z.enum(JALUR),
  tipe: z.enum(TIPE),
  kodeKelas: z.string().trim().max(40).optional().nullable(),
  rilis: tanggal,
  tutup: tanggal,
};

function cekJadwal(data) {
  if (data.rilis && data.tutup && data.tutup < data.rilis) {
    return false;
  }
  return true;
}

export const createSetSchema = z
  .object(setBase)
  .refine(cekJadwal, { message: 'Tanggal tutup tidak boleh sebelum tanggal rilis.', path: ['tutup'] });

export const updateSetSchema = z
  .object({
    nama: setBase.nama.optional(),
    catatan: setBase.catatan,
    jalur: setBase.jalur.optional(),
    tipe: setBase.tipe.optional(),
    kodeKelas: setBase.kodeKelas,
    rilis: setBase.rilis,
    tutup: setBase.tutup,
  })
  .refine(cekJadwal, { message: 'Tanggal tutup tidak boleh sebelum tanggal rilis.', path: ['tutup'] });

export const publishSetSchema = z
  .object({
    status: z.enum(['terjadwal', 'aktif']).optional(),
    rilis: tanggal,
    tutup: tanggal,
  })
  .refine(cekJadwal, { message: 'Tanggal tutup tidak boleh sebelum tanggal rilis.', path: ['tutup'] });

export const archiveSetSchema = z.object({}).passthrough();

export const idParamSchema = z.object({ id: z.string().trim().min(1).max(80) });
export const setIdParamSchema = z.object({ id: z.string().trim().min(1).max(80) });
export const questionParamSchema = z.object({
  id: z.string().trim().min(1).max(80),
  qid: z.string().trim().min(1).max(80),
});

const questionBase = {
  kategori: z.string().trim().min(1, 'Kategori wajib diisi.').max(120),
  pertanyaan: z.string().trim().min(1, 'Naskah pertanyaan wajib diisi.').max(2000),
  opsi: z.array(z.string().trim().min(1, 'Opsi tidak boleh kosong.')).min(2).max(6),
  kunci: z.number().int().min(0),
  ulasan: z.string().trim().max(2000).optional().nullable(),
};

export const createQuestionSchema = z
  .object(questionBase)
  .refine((d) => d.kunci < d.opsi.length, { message: 'Kunci jawaban di luar rentang opsi.', path: ['kunci'] });

export const updateQuestionSchema = z
  .object({
    kategori: questionBase.kategori.optional(),
    pertanyaan: questionBase.pertanyaan.optional(),
    opsi: questionBase.opsi.optional(),
    kunci: questionBase.kunci.optional(),
    ulasan: questionBase.ulasan,
  })
  .refine((d) => d.kunci === undefined || d.opsi === undefined || d.kunci < d.opsi.length, {
    message: 'Kunci jawaban di luar rentang opsi.',
    path: ['kunci'],
  });

function mapSet(row) {
  return {
    id: row.id,
    nama: row.nama,
    catatan: row.catatan || '',
    jalur: row.jalur,
    tipe: row.tipe,
    kodeKelas: row.kode_kelas || '',
    rilis: row.rilis_at ? row.rilis_at.toISOString().slice(0, 10) : '',
    tutup: row.tutup_at ? row.tutup_at.toISOString().slice(0, 10) : '',
    status: row.status,
    jumlahSoal: row.jumlah_soal !== undefined ? Number(row.jumlah_soal) : undefined,
  };
}

// Normalisasi kode kelas dari payload: string tunggal -> array unik non-kosong.
function normalisasiKodeKelas(kodeKelas) {
  if (kodeKelas === undefined || kodeKelas === null) return [];
  const daftar = Array.isArray(kodeKelas) ? kodeKelas : [kodeKelas];
  const bersih = daftar
    .map((k) => (typeof k === 'string' ? k.trim().toUpperCase() : ''))
    .filter((k) => k.length > 0);
  return [...new Set(bersih)];
}

// Baca relasi kode kelas dari pivot set_class_codes.
async function ambilKodeKelasSet(setId, runner = { query }) {
  const { rows } = await runner.query(
    'SELECT code FROM set_class_codes WHERE set_id = $1 ORDER BY code ASC',
    [setId],
  );
  return rows.map((r) => r.code);
}

// Sinkronkan relasi set <-> kode kelas. Hanya menyentuh relasi yang berubah,
// sehingga relasi lain tidak terhapus tanpa sengaja.
async function sinkronKodeKelasSet(client, setId, kodeKelas) {
  if (kodeKelas === undefined) return;
  const target = normalisasiKodeKelas(kodeKelas);
  const { rows } = await client.query(
    'SELECT code FROM set_class_codes WHERE set_id = $1',
    [setId],
  );
  const saatIni = rows.map((r) => r.code);
  const tambah = target.filter((k) => !saatIni.includes(k));
  const hapus = saatIni.filter((k) => !target.includes(k));

  for (const code of tambah) {
    await client.query(
      `INSERT INTO set_class_codes (set_id, code) VALUES ($1, $2)
       ON CONFLICT (set_id, code) DO NOTHING`,
      [setId, code],
    );
  }
  for (const code of hapus) {
    await client.query('DELETE FROM set_class_codes WHERE set_id = $1 AND code = $2', [setId, code]);
  }
}

// Kode kelas tunggal untuk kompatibilitas payload frontend (field kodeKelas).
function kodeKelasUtama(daftar) {
  return Array.isArray(daftar) && daftar.length > 0 ? daftar[0] : '';
}

// Soal admin boleh memuat kunci jawaban (endpoint admin, bukan peserta).
function mapQuestion(row) {
  return {
    id: row.id,
    kategori: row.kategori || '',
    pertanyaan: row.pertanyaan,
    opsi: Array.isArray(row.opsi) ? row.opsi : [],
    kunci: row.kunci,
    ulasan: row.penjelasan || '',
  };
}

function buatIdSet() {
  const acak = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SET-${Date.now().toString(36).toUpperCase()}-${acak}`;
}

function buatIdSoal(setId) {
  const acak = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${setId}-Q-${acak}`;
}

async function ambilSet(id) {
  const { rows } = await query(
    `SELECT s.*, (SELECT COUNT(*) FROM questions q WHERE q.set_id = s.id) AS jumlah_soal
     FROM question_sets s WHERE s.id = $1 LIMIT 1`,
    [id],
  );
  return rows[0] || null;
}

export async function listSets(req, res, next) {
  try {
    const { rows } = await query(
      `SELECT s.*, (SELECT COUNT(*) FROM questions q WHERE q.set_id = s.id) AS jumlah_soal
       FROM question_sets s ORDER BY s.created_at DESC`,
    );
    const sets = await Promise.all(
      rows.map(async (row) => {
        const kodeKelas = await ambilKodeKelasSet(row.id);
        return { ...mapSet(row), kodeKelas: kodeKelasUtama(kodeKelas), kodeKelasList: kodeKelas };
      }),
    );
    res.json({ sets });
  } catch (err) {
    next(err);
  }
}

export async function getSet(req, res, next) {
  try {
    const row = await ambilSet(req.params.id);
    if (!row) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Set soal tidak ditemukan.' } });
    }
    const kodeKelas = await ambilKodeKelasSet(row.id);
    const { rows: soal } = await query(
      `SELECT id, kategori, pertanyaan, opsi, kunci, penjelasan
       FROM questions WHERE set_id = $1 ORDER BY created_at ASC, id ASC`,
      [req.params.id],
    );
    res.json({
      set: { ...mapSet(row), kodeKelas: kodeKelasUtama(kodeKelas), kodeKelasList: kodeKelas },
      soal: soal.map(mapQuestion),
    });
  } catch (err) {
    next(err);
  }
}

export async function createSet(req, res, next) {
  try {
    const { nama, catatan, jalur, tipe, kodeKelas, rilis, tutup } = req.body;
    const id = buatIdSet();
    const row = await withTransaction(async (client) => {
      const { rows } = await client.query(
        `INSERT INTO question_sets (id, nama, catatan, jalur, tipe, status, rilis_at, tutup_at)
         VALUES ($1, $2, $3, $4, $5, 'draf', $6, $7)
         RETURNING *`,
        [id, nama, catatan || null, jalur, tipe, rilis || null, tutup || null],
      );
      await sinkronKodeKelasSet(client, id, kodeKelas);
      return rows[0];
    });
    const kodeKelasList = await ambilKodeKelasSet(id);
    res.status(201).json({
      set: { ...mapSet({ ...row, jumlah_soal: 0 }), kodeKelas: kodeKelasUtama(kodeKelasList), kodeKelasList },
    });
  } catch (err) {
    if (err && err.code === '23503') {
      return res.status(400).json({ error: { code: 'INVALID_CLASS_CODE', message: 'Kode kelas terkait tidak ditemukan.' } });
    }
    next(err);
  }
}

export async function updateSet(req, res, next) {
  try {
    const ada = await ambilSet(req.params.id);
    if (!ada) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Set soal tidak ditemukan.' } });
    }
    const b = req.body;
    const rilis = b.rilis !== undefined ? b.rilis || null : ada.rilis_at;
    const tutup = b.tutup !== undefined ? b.tutup || null : ada.tutup_at;
    const row = await withTransaction(async (client) => {
      const { rows } = await client.query(
        `UPDATE question_sets
         SET nama = $2, catatan = $3, jalur = $4, tipe = $5, rilis_at = $6, tutup_at = $7, updated_at = NOW()
         WHERE id = $1 RETURNING *`,
        [
          req.params.id,
          b.nama !== undefined ? b.nama : ada.nama,
          b.catatan !== undefined ? b.catatan || null : ada.catatan,
          b.jalur !== undefined ? b.jalur : ada.jalur,
          b.tipe !== undefined ? b.tipe : ada.tipe,
          rilis,
          tutup,
        ],
      );
      await sinkronKodeKelasSet(client, req.params.id, b.kodeKelas);
      return rows[0];
    });
    const kodeKelasList = await ambilKodeKelasSet(req.params.id);
    res.json({
      set: {
        ...mapSet({ ...row, jumlah_soal: ada.jumlah_soal }),
        kodeKelas: kodeKelasUtama(kodeKelasList),
        kodeKelasList,
      },
    });
  } catch (err) {
    if (err && err.code === '23503') {
      return res.status(400).json({ error: { code: 'INVALID_CLASS_CODE', message: 'Kode kelas terkait tidak ditemukan.' } });
    }
    next(err);
  }
}

export async function publishSet(req, res, next) {
  try {
    const ada = await ambilSet(req.params.id);
    if (!ada) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Set soal tidak ditemukan.' } });
    }
    const b = req.body || {};
    const rilis = b.rilis !== undefined ? b.rilis || null : ada.rilis_at;
    const tutup = b.tutup !== undefined ? b.tutup || null : ada.tutup_at;
    const status = b.status || (rilis ? 'terjadwal' : 'aktif');
    const { rows } = await query(
      `UPDATE question_sets SET status = $2, rilis_at = $3, tutup_at = $4, updated_at = NOW()
       WHERE id = $1 RETURNING *`,
      [req.params.id, status, rilis, tutup],
    );
    const kodeKelasList = await ambilKodeKelasSet(req.params.id);
    res.json({
      set: {
        ...mapSet({ ...rows[0], jumlah_soal: ada.jumlah_soal }),
        kodeKelas: kodeKelasUtama(kodeKelasList),
        kodeKelasList,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function archiveSet(req, res, next) {
  try {
    const ada = await ambilSet(req.params.id);
    if (!ada) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Set soal tidak ditemukan.' } });
    }
    const { rows } = await query(
      `UPDATE question_sets SET status = 'draf', updated_at = NOW() WHERE id = $1 RETURNING *`,
      [req.params.id],
    );
    const kodeKelasList = await ambilKodeKelasSet(req.params.id);
    res.json({
      set: {
        ...mapSet({ ...rows[0], jumlah_soal: ada.jumlah_soal }),
        kodeKelas: kodeKelasUtama(kodeKelasList),
        kodeKelasList,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function listQuestions(req, res, next) {
  try {
    const ada = await ambilSet(req.params.id);
    if (!ada) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Set soal tidak ditemukan.' } });
    }
    const { rows } = await query(
      `SELECT id, kategori, pertanyaan, opsi, kunci, penjelasan
       FROM questions WHERE set_id = $1 ORDER BY created_at ASC, id ASC`,
      [req.params.id],
    );
    res.json({ soal: rows.map(mapQuestion) });
  } catch (err) {
    next(err);
  }
}

export async function createQuestion(req, res, next) {
  try {
    const ada = await ambilSet(req.params.id);
    if (!ada) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Set soal tidak ditemukan.' } });
    }
    if (Number(ada.jumlah_soal) >= MAKS_SOAL) {
      return res.status(409).json({
        error: { code: 'MAKS_SOAL', message: `Set sudah mencapai batas maksimal ${MAKS_SOAL} soal.` },
      });
    }
    const { kategori, pertanyaan, opsi, kunci, ulasan } = req.body;
    const id = buatIdSoal(req.params.id);
    const { rows } = await query(
      `INSERT INTO questions (id, track, type, kategori, pertanyaan, opsi, kunci, penjelasan, set_id)
       VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9)
       RETURNING id, kategori, pertanyaan, opsi, kunci, penjelasan`,
      [
        id,
        trackDariJalur(ada.jalur),
        typeDariTipe(ada.tipe),
        kategori,
        pertanyaan,
        JSON.stringify(opsi),
        kunci,
        ulasan || null,
        req.params.id,
      ],
    );
    res.status(201).json({ soal: mapQuestion(rows[0]) });
  } catch (err) {
    next(err);
  }
}

export async function updateQuestion(req, res, next) {
  try {
    const { rows: cek } = await query(
      `SELECT id, kategori, pertanyaan, opsi, kunci, penjelasan FROM questions WHERE id = $1 AND set_id = $2 LIMIT 1`,
      [req.params.qid, req.params.id],
    );
    const soal = cek[0];
    if (!soal) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Pertanyaan tidak ditemukan.' } });
    }
    const b = req.body;
    const opsi = b.opsi !== undefined ? b.opsi : soal.opsi;
    const kunci = b.kunci !== undefined ? b.kunci : soal.kunci;
    if (kunci >= opsi.length) {
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Input tidak valid.', details: [{ field: 'kunci', message: 'Kunci jawaban di luar rentang opsi.' }] },
      });
    }
    const { rows } = await query(
      `UPDATE questions
       SET kategori = $2, pertanyaan = $3, opsi = $4::jsonb, kunci = $5, penjelasan = $6
       WHERE id = $1 RETURNING id, kategori, pertanyaan, opsi, kunci, penjelasan`,
      [
        req.params.qid,
        b.kategori !== undefined ? b.kategori : soal.kategori,
        b.pertanyaan !== undefined ? b.pertanyaan : soal.pertanyaan,
        JSON.stringify(opsi),
        kunci,
        b.ulasan !== undefined ? b.ulasan || null : soal.penjelasan,
      ],
    );
    res.json({ soal: mapQuestion(rows[0]) });
  } catch (err) {
    next(err);
  }
}

export async function deleteQuestion(req, res, next) {
  try {
    const { rowCount } = await query(`DELETE FROM questions WHERE id = $1 AND set_id = $2`, [
      req.params.qid,
      req.params.id,
    ]);
    if (rowCount === 0) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Pertanyaan tidak ditemukan.' } });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

function trackDariJalur(jalur) {
  return jalur === 'anak' ? 0 : jalur === 'lansia' ? 2 : 1;
}

function typeDariTipe(tipe) {
  return tipe === 'post' ? 'posttest' : tipe === 'retensi' ? 'retensi' : 'pretest';
}

export default {
  listSets,
  getSet,
  createSet,
  updateSet,
  publishSet,
  archiveSet,
  listQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
