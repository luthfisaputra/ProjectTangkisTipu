import { pool } from '../config/db.js';
import {
  loadQuestionSets,
  validateQuestionSetsData,
  toDateOrNull,
} from './seedHelpers.js';

// Seed set soal contoh + kode kelas terkait + relasi pivot set_class_codes.
// Sumber: Backend/src/db/data/question-sets.json (dikonversi dari frontend, bukan impor runtime).
//
// Idempoten & aman terhadap data admin:
// - question_sets: ON CONFLICT (id) DO NOTHING -> set yang sudah diedit admin tidak ditimpa.
// - class_codes:  ON CONFLICT (code) DO NOTHING -> label kode yang sudah diubah admin tetap.
// - set_class_codes: ON CONFLICT DO NOTHING -> relasi tidak diduplikasi.
// - Gunakan SEED_FORCE=1 untuk memperbarui baris seed secara paksa.
const FORCE = process.env.SEED_FORCE === '1';

async function seedClassCodes(classCodes) {
  let inserted = 0;
  let skipped = 0;
  for (const { code, label } of classCodes) {
    const sql = FORCE
      ? `INSERT INTO class_codes (code, label, active)
         VALUES ($1, $2, TRUE)
         ON CONFLICT (code) DO UPDATE SET label = EXCLUDED.label
         RETURNING (xmax = 0) AS inserted`
      : `INSERT INTO class_codes (code, label, active)
         VALUES ($1, $2, TRUE)
         ON CONFLICT (code) DO NOTHING
         RETURNING (xmax = 0) AS inserted`;
    const { rows } = await pool.query(sql, [code, label ?? null]);
    if (rows.length === 0) skipped += 1;
    else inserted += 1;
  }
  console.log(`[seed-question-sets] class_codes: ${inserted} ditulis, ${skipped} dilewati.`);
}

async function seedSets(sets) {
  let inserted = 0;
  let skipped = 0;
  for (const s of sets) {
    const params = [
      s.id,
      s.nama,
      s.catatan ?? null,
      s.jalur,
      s.tipe,
      s.status,
      toDateOrNull(s.rilis_at),
      toDateOrNull(s.tutup_at),
    ];
    const sql = FORCE
      ? `INSERT INTO question_sets
           (id, nama, catatan, jalur, tipe, status, rilis_at, tutup_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO UPDATE SET
           nama     = EXCLUDED.nama,
           catatan  = EXCLUDED.catatan,
           jalur    = EXCLUDED.jalur,
           tipe     = EXCLUDED.tipe,
           status   = EXCLUDED.status,
           rilis_at = EXCLUDED.rilis_at,
           tutup_at = EXCLUDED.tutup_at,
           updated_at = NOW()
         RETURNING (xmax = 0) AS inserted`
      : `INSERT INTO question_sets
           (id, nama, catatan, jalur, tipe, status, rilis_at, tutup_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO NOTHING
         RETURNING (xmax = 0) AS inserted`;
    const { rows } = await pool.query(sql, params);
    if (rows.length === 0) skipped += 1;
    else inserted += 1;
  }
  console.log(`[seed-question-sets] question_sets: ${inserted} ditulis, ${skipped} dilewati.`);
}

async function seedSetClassCodes(sets) {
  let inserted = 0;
  let skipped = 0;
  for (const s of sets) {
    const code = (s.kodeKelas ?? '').toString().trim();
    if (!code) continue;
    const { rows } = await pool.query(
      `INSERT INTO set_class_codes (set_id, code)
       VALUES ($1, $2)
       ON CONFLICT (set_id, code) DO NOTHING
       RETURNING (xmax = 0) AS inserted`,
      [s.id, code],
    );
    if (rows.length === 0) skipped += 1;
    else inserted += 1;
  }
  console.log(`[seed-question-sets] set_class_codes: ${inserted} ditulis, ${skipped} dilewati.`);
}

async function verify() {
  const { rows: setRows } = await pool.query(
    `SELECT COUNT(*)::int AS total FROM question_sets`,
  );
  const { rows: pivotRows } = await pool.query(
    `SELECT COUNT(*)::int AS total FROM set_class_codes`,
  );
  const { rows: orphanRows } = await pool.query(
    `SELECT COUNT(*)::int AS total
       FROM set_class_codes scc
       LEFT JOIN question_sets qs ON qs.id = scc.set_id
       LEFT JOIN class_codes cc ON cc.code = scc.code
      WHERE qs.id IS NULL OR cc.code IS NULL`,
  );

  console.log(`[verify] total question_sets: ${setRows[0].total}`);
  console.log(`[verify] total set_class_codes: ${pivotRows[0].total}`);
  console.log(`[verify] relasi yatim (harus 0): ${orphanRows[0].total}`);
}

async function run() {
  const data = await loadQuestionSets();
  const errors = validateQuestionSetsData(data);
  if (errors.length) {
    throw new Error(`data seed tidak valid: ${errors.join('; ')}`);
  }

  await seedClassCodes(data.classCodes ?? []);
  await seedSets(data.sets);
  await seedSetClassCodes(data.sets);
  await verify();
  await pool.end();
}

run().catch(async (err) => {
  console.error('[seed-question-sets] gagal:', err.message);
  await pool.end();
  process.exit(1);
});
