import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pool } from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

const TRACKING_TABLE = 'schema_migrations';

// Migrasi opsional: file yang namanya mengandung '.optional.' TIDAK dijalankan
// otomatis oleh runner ini. Backfill rekaman lama (009) bersifat opt-in agar
// tidak mengubah data penting tanpa keputusan admin. Jalankan manual dengan:
//   node src/db/run-optional-migration.js <file.sql>
const OPTIONAL_MARKER = '.optional.';

function isOptional(file) {
  return file.includes(OPTIONAL_MARKER);
}

async function ensureTrackingTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS ${TRACKING_TABLE} (
      filename   TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function appliedMigrations(client) {
  const { rows } = await client.query(`SELECT filename FROM ${TRACKING_TABLE}`);
  return new Set(rows.map((r) => r.filename));
}

async function run() {
  const files = (await readdir(MIGRATIONS_DIR))
    .filter((f) => f.endsWith('.sql'))
    .sort();

  const client = await pool.connect();
  let applied = 0;
  let skipped = 0;

  try {
    await ensureTrackingTable(client);
    const done = await appliedMigrations(client);

    for (const file of files) {
      if (isOptional(file)) {
        console.log(`[migrate] lewati ${file} (migrasi opsional, jalankan manual)`);
        skipped += 1;
        continue;
      }

      if (done.has(file)) {
        console.log(`[migrate] lewati ${file} (sudah diterapkan)`);
        skipped += 1;
        continue;
      }

      const sql = await readFile(path.join(MIGRATIONS_DIR, file), 'utf8');
      console.log(`[migrate] menjalankan ${file}`);

      try {
        await client.query('BEGIN');
        await client.query(sql);
        await client.query(
          `INSERT INTO ${TRACKING_TABLE} (filename) VALUES ($1) ON CONFLICT (filename) DO NOTHING`,
          [file],
        );
        await client.query('COMMIT');
        applied += 1;
      } catch (err) {
        await client.query('ROLLBACK');
        throw new Error(`migrasi ${file} gagal: ${err.message}`);
      }
    }

    console.log(
      `[migrate] selesai. ${applied} diterapkan, ${skipped} dilewati, ${files.length} total.`,
    );
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(async (err) => {
  console.error('[migrate] gagal:', err.message);
  process.exit(1);
});
