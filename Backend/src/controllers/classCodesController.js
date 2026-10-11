import { z } from 'zod';
import { query, withTransaction } from '../config/db.js';

// Format kode kelas: huruf/angka, pemisah '-' diizinkan, 3-40 karakter.
// Contoh valid: PR-2312, GURU-01, TANGKIS2026.
const KODE_REGEX = /^[A-Z0-9][A-Z0-9-]{1,38}[A-Z0-9]$/;

export const validateClassCodeSchema = z.object({
  code: z.string().trim().min(1).max(40),
});

const kodeField = z
  .string()
  .trim()
  .toUpperCase()
  .min(3, 'Kode minimal 3 karakter.')
  .max(40, 'Kode maksimal 40 karakter.')
  .regex(KODE_REGEX, 'Format kode tidak valid. Gunakan huruf/angka dan tanda hubung.');

const labelField = z.string().trim().max(200).optional().nullable();

export const createClassCodeSchema = z.object({
  code: kodeField,
  label: labelField,
  active: z.boolean().optional(),
  setIds: z.array(z.string().trim().min(1).max(80)).max(50).optional(),
});

export const updateClassCodeSchema = z
  .object({
    label: labelField,
    active: z.boolean().optional(),
    setIds: z.array(z.string().trim().min(1).max(80)).max(50).optional(),
  })
  .refine((d) => Object.keys(d).length > 0, { message: 'Tidak ada perubahan yang dikirim.' });

export const codeParamSchema = z.object({
  code: z.string().trim().min(1).max(40),
});

export const listClassCodesQuerySchema = z.object({
  active: z.enum(['true', 'false', 'all']).optional(),
  q: z.string().trim().max(80).optional(),
});

function mapClassCode(row) {
  return {
    code: row.code,
    label: row.label || '',
    active: row.active,
    createdAt: row.created_at,
    jumlahPeserta: row.jumlah_peserta !== undefined ? Number(row.jumlah_peserta) : undefined,
    jumlahSet: row.jumlah_set !== undefined ? Number(row.jumlah_set) : undefined,
  };
}

async function ambilKode(code) {
  const { rows } = await query(
    `SELECT c.code, c.label, c.active, c.created_at,
            (SELECT COUNT(*) FROM participants p WHERE p.class_code = c.code) AS jumlah_peserta,
            (SELECT COUNT(*) FROM set_class_codes s WHERE s.code = c.code) AS jumlah_set
     FROM class_codes c WHERE c.code = $1 LIMIT 1`,
    [code],
  );
  return rows[0] || null;
}

async function ambilSetIds(code) {
  const { rows } = await query(
    'SELECT set_id FROM set_class_codes WHERE code = $1 ORDER BY set_id ASC',
    [code],
  );
  return rows.map((r) => r.set_id);
}

async function sinkronSet(client, code, setIds) {
  if (!Array.isArray(setIds)) return;
  await client.query('DELETE FROM set_class_codes WHERE code = $1', [code]);
  for (const setId of setIds) {
    await client.query(
      `INSERT INTO set_class_codes (set_id, code) VALUES ($1, $2)
       ON CONFLICT (set_id, code) DO NOTHING`,
      [setId, code],
    );
  }
}

// Endpoint peserta: tetap dipertahankan apa adanya.
export async function validateClassCode(req, res, next) {
  try {
    const { code } = req.body;
    const { rows } = await query(
      'SELECT code, label FROM class_codes WHERE code = $1 AND active = TRUE LIMIT 1',
      [code],
    );

    if (rows.length === 0) {
      return res.json({ valid: false });
    }

    res.json({ valid: true, code: rows[0].code, label: rows[0].label });
  } catch (err) {
    next(err);
  }
}

export async function listClassCodes(req, res, next) {
  try {
    const { active, q } = req.query;
    const kondisi = [];
    const params = [];

    if (active === 'true') kondisi.push('c.active = TRUE');
    else if (active === 'false') kondisi.push('c.active = FALSE');

    if (q) {
      params.push(`%${q.toUpperCase()}%`);
      kondisi.push(`(UPPER(c.code) LIKE $${params.length} OR UPPER(COALESCE(c.label, '')) LIKE $${params.length})`);
    }

    const where = kondisi.length ? `WHERE ${kondisi.join(' AND ')}` : '';
    const { rows } = await query(
      `SELECT c.code, c.label, c.active, c.created_at,
              (SELECT COUNT(*) FROM participants p WHERE p.class_code = c.code) AS jumlah_peserta,
              (SELECT COUNT(*) FROM set_class_codes s WHERE s.code = c.code) AS jumlah_set
       FROM class_codes c ${where}
       ORDER BY c.created_at DESC, c.code ASC`,
      params,
    );
    res.json({ classCodes: rows.map(mapClassCode) });
  } catch (err) {
    next(err);
  }
}

export async function getClassCode(req, res, next) {
  try {
    const row = await ambilKode(req.params.code);
    if (!row) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Kode kelas tidak ditemukan.' } });
    }
    const setIds = await ambilSetIds(row.code);
    res.json({ classCode: { ...mapClassCode(row), setIds } });
  } catch (err) {
    next(err);
  }
}

export async function createClassCode(req, res, next) {
  try {
    const { code, label, active, setIds } = req.body;

    const { rows: ada } = await query('SELECT code FROM class_codes WHERE code = $1 LIMIT 1', [code]);
    if (ada.length > 0) {
      return res.status(409).json({
        error: { code: 'DUPLICATE_CODE', message: 'Kode kelas sudah digunakan.' },
      });
    }

    const row = await withTransaction(async (client) => {
      const { rows } = await client.query(
        `INSERT INTO class_codes (code, label, active)
         VALUES ($1, $2, $3)
         RETURNING code, label, active, created_at`,
        [code, label || null, active === undefined ? true : active],
      );
      await sinkronSet(client, code, setIds);
      return rows[0];
    });

    const setIdsFinal = await ambilSetIds(row.code);
    res.status(201).json({ classCode: { ...mapClassCode({ ...row, jumlah_peserta: 0, jumlah_set: setIdsFinal.length }), setIds: setIdsFinal } });
  } catch (err) {
    if (err && err.code === '23505') {
      return res.status(409).json({ error: { code: 'DUPLICATE_CODE', message: 'Kode kelas sudah digunakan.' } });
    }
    if (err && err.code === '23503') {
      return res.status(400).json({ error: { code: 'INVALID_SET', message: 'Set soal terkait tidak ditemukan.' } });
    }
    next(err);
  }
}

export async function updateClassCode(req, res, next) {
  try {
    const ada = await ambilKode(req.params.code);
    if (!ada) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Kode kelas tidak ditemukan.' } });
    }

    const b = req.body;
    const row = await withTransaction(async (client) => {
      const { rows } = await client.query(
        `UPDATE class_codes
         SET label = $2, active = $3
         WHERE code = $1
         RETURNING code, label, active, created_at`,
        [
          req.params.code,
          b.label !== undefined ? b.label || null : ada.label,
          b.active !== undefined ? b.active : ada.active,
        ],
      );
      await sinkronSet(client, req.params.code, b.setIds);
      return rows[0];
    });

    const setIdsFinal = await ambilSetIds(row.code);
    res.json({ classCode: { ...mapClassCode({ ...row, jumlah_peserta: ada.jumlah_peserta, jumlah_set: setIdsFinal.length }), setIds: setIdsFinal } });
  } catch (err) {
    if (err && err.code === '23503') {
      return res.status(400).json({ error: { code: 'INVALID_SET', message: 'Set soal terkait tidak ditemukan.' } });
    }
    next(err);
  }
}

// Nonaktifkan (soft) — tidak menghapus agar rekam hasil lama tetap utuh.
export async function deactivateClassCode(req, res, next) {
  try {
    const { rows } = await query(
      `UPDATE class_codes SET active = FALSE WHERE code = $1
       RETURNING code, label, active, created_at`,
      [req.params.code],
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Kode kelas tidak ditemukan.' } });
    }
    res.json({ classCode: mapClassCode(rows[0]) });
  } catch (err) {
    next(err);
  }
}

export async function activateClassCode(req, res, next) {
  try {
    const { rows } = await query(
      `UPDATE class_codes SET active = TRUE WHERE code = $1
       RETURNING code, label, active, created_at`,
      [req.params.code],
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Kode kelas tidak ditemukan.' } });
    }
    res.json({ classCode: mapClassCode(rows[0]) });
  } catch (err) {
    next(err);
  }
}

export default {
  validateClassCode,
  listClassCodes,
  getClassCode,
  createClassCode,
  updateClassCode,
  deactivateClassCode,
  activateClassCode,
};
