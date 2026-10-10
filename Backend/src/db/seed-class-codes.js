import { pool } from '../config/db.js';

const CLASS_CODES = [
  { code: 'TANGKIS2026', label: 'Kelas Umum TangkisTipu' },
  { code: 'SEKOLAH01', label: 'Sekolah Demo' },
  { code: 'KOMUNITAS', label: 'Komunitas Waspada Digital' },
];

async function run() {
  for (const { code, label } of CLASS_CODES) {
    await pool.query(
      `INSERT INTO class_codes (code, label, active)
       VALUES ($1, $2, TRUE)
       ON CONFLICT (code) DO UPDATE SET label = EXCLUDED.label, active = TRUE`,
      [code, label]
    );
  }

  const { rows } = await pool.query('SELECT COUNT(*)::int AS total FROM class_codes');
  console.log(`[seed-class-codes] selesai. total kode: ${rows[0].total}`);
  await pool.end();
}

run().catch(async (err) => {
  console.error('[seed-class-codes] gagal:', err.message);
  await pool.end();
  process.exit(1);
});
