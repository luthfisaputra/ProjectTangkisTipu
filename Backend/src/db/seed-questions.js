import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pool } from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = path.resolve(__dirname, '../../../frontend/src/data/pretestSoal.jsx');

// Muat SOAL_PRETEST_SETS dari file .jsx frontend tanpa bundler:
// baca sebagai teks, buang bagian export, lalu evaluasi sebagai modul data.
async function loadSoalPretestSets() {
  const raw = await readFile(SOURCE, 'utf8');
  const cleaned = raw
    .replace(/export\s+const\s+/g, 'const ')
    .replace(/export\s+function\s+/g, 'function ');
  const tail = '\nreturn { SOAL_PRETEST_SETS };';
  const factory = new Function(`${cleaned}${tail}`);
  return factory().SOAL_PRETEST_SETS;
}

async function seed() {
  const sets = await loadSoalPretestSets();
  let total = 0;

  for (let track = 0; track < sets.length; track++) {
    for (const soal of sets[track]) {
      await pool.query(
        `INSERT INTO questions
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
           kasus_nyata = EXCLUDED.kasus_nyata`,
        [
          soal.id,
          track,
          soal.kategori,
          soal.pertanyaan,
          JSON.stringify(soal.opsi),
          soal.kunci,
          soal.penjelasan,
          soal.kasusNyata,
        ]
      );
      total++;
    }
  }

  console.log(`[seed-questions] ${total} soal diproses.`);
}

async function verify() {
  const { rows: totalRows } = await pool.query(
    `SELECT COUNT(*)::int AS total FROM questions WHERE type = 'pretest'`
  );
  const { rows: perTrack } = await pool.query(
    `SELECT track, COUNT(*)::int AS jumlah
       FROM questions WHERE type = 'pretest'
      GROUP BY track ORDER BY track`
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
