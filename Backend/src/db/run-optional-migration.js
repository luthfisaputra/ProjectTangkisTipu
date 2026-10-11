import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pool } from '../config/db.js';

// Runner migrasi OPSIONAL (opt-in). Hanya menjalankan file yang diberikan
// secara eksplisit dan mengandung penanda '.optional.'.
//
// Pemakaian:
//   node src/db/run-optional-migration.js 009_backfill_legacy_sets.optional.sql
//
// Aman & idempoten: mencatat ke schema_migrations dan melewati bila sudah ada.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.join(__dirname, 'migrations');
const TRACKING_TABLE = 'schema_migrations';
const OPTIONAL_MARKER = '.optional.';

async function run() {
  const file = process.argv[2];
  if (!file) {
    throw new Error('sebutkan nama file migrasi opsional, mis. 009_backfill_legacy_sets.optional.sql');
  }
  if (!file.includes(OPTIONAL_MARKER)) {
    throw new Error(`hanya file dengan penanda '${OPTIONAL_MARKER}' yang boleh dijalankan lewat runner ini`);
  }

  const sql = await readFile(path.join(MIGRATIONS_DIR, file), 'utf8');
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${TRACKING_TABLE} (
        filename   TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    const { rows } = await client.query(
      `SELECT 1 FROM ${TRACKING_TABLE} WHERE filename = $1`,
      [file],
    );
    if (rows.length > 0) {
      console.log(`[optional-migrate] lewati ${file} (sudah diterapkan)`);
      return;
    }

    console.log(`[optional-migrate] menjalankan ${file}`);
    await client.query('BEGIN');
    await client.query(sql);
    await client.query(
      `INSERT INTO ${TRACKING_TABLE} (filename) VALUES ($1) ON CONFLICT (filename) DO NOTHING`,
      [file],
    );
    await client.query('COMMIT');
    console.log(`[optional-migrate] selesai: ${file}`);
  } catch (err) {
    await client.query('ROLLBACK');
    throw new Error(`migrasi opsional ${file} gagal: ${err.message}`);
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(async (err) => {
  console.error('[optional-migrate] gagal:', err.message);
  process.exit(1);
});
