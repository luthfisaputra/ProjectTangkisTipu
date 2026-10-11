import { pool } from '../config/db.js';
import { loadPretestQuestions, validatePretestData } from './seedHelpers.js';

// Seed soal pretest dari data backend (Backend/src/db/data/pretest-questions.json).
// Tidak lagi mengimpor JSX frontend saat runtime.
//
// Idempoten & aman terhadap data admin:
// - INSERT ... ON CONFLICT (id) DO NOTHING -> baris yang sudah ada TIDAK ditimpa.
//   Jadi soal yang sudah diedit admin tetap utuh saat seed dijalankan ulang.
// - Untuk mengisi/memperbarui soal seed secara paksa, jalankan dengan SEED_FORCE=1.
const FORCE = process.env.SEED_FORCE === '1';

async function seed() {
  const data = await loadPretestQuestions();
  const errors = validatePretestData(data);
  if (errors.length) {
    throw new Error(`data seed tidak valid: ${errors.join('; ')}`);
  }

  let inserted = 0;
  let skipped = 0;

  for (const track of data.tracks) {
    for (const soal of track.questions) {
      const params = [
        soal.id,
        track.track,
        soal.kategori ?? null,
        soal.pertanyaan,
        JSON.stringify(soal.opsi),
        soal.kunci,
        soal.penjelasan ?? null,
        soal.kasusNyata ?? null,
      ];

      const sql = FORCE
        ? `INSERT INTO questions
             (id, track, type, kategori, pertanyaan, opsi, kunci, penjelasan, kasus_nyata)
           VALUES ($1, $2, 'pretest', $3, $4, $5::jsonb, $6, $7, $8)
           ON CONFLICT (id) DO UPDATE SET
             track       = EXCLUDED.track,
             type        = EXCLUDED.type,
             kategori    = EXCLUDED.kategori,
             pertanyaan  = EXCLUDED.pertanyaan,
             opsi        = EXCLUDED.opsi,
             kunci       = EXCLUDED.kunci,
             penjelasan  = EXCLUDED.penjelasan,
             kasus_nyata = EXCLUDED.kasus_nyata
           RETURNING (xmax = 0) AS inserted`
        : `INSERT INTO questions
             (id, track, type, kategori, pertanyaan, opsi, kunci, penjelasan, kasus_nyata)
           VALUES ($1, $2, 'pretest', $3, $4, $5::jsonb, $6, $7, $8)
           ON CONFLICT (id) DO NOTHING
           RETURNING (xmax = 0) AS inserted`;

      const { rows } = await pool.query(sql, params);
      if (rows.length === 0) {
        skipped += 1;
      } else {
        inserted += 1;
      }
    }
  }

  console.log(
    `[seed-questions] ${inserted} soal ditulis, ${skipped} dilewati (sudah ada).` +
      (FORCE ? ' Mode FORCE aktif.' : ''),
  );
}

async function verify() {
  const { rows: totalRows } = await pool.query(
    `SELECT COUNT(*)::int AS total FROM questions WHERE type = 'pretest'`,
  );
  const { rows: perTrack } = await pool.query(
    `SELECT track, COUNT(*)::int AS jumlah
       FROM questions WHERE type = 'pretest'
      GROUP BY track ORDER BY track`,
  );

  console.log(`[verify] total soal pretest: ${totalRows[0].total}`);
  for (const r of perTrack) {
    console.log(`[verify] track ${r.track}: ${r.jumlah} soal`);
  }

  const ok =
    totalRows[0].total === 30 &&
    perTrack.length === 3 &&
    perTrack.every((r) => r.jumlah === 10);
  console.log(`[verify] status: ${ok ? 'OK (30 soal, 3 track x 10)' : 'TIDAK SESUAI'}`);
}

async function run() {
  await seed();
  await verify();
  await pool.end();
}

run().catch(async (err) => {
  console.error('[seed-questions] gagal:', err.message);
  await pool.end();
  process.exit(1);
});
