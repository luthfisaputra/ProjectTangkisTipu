import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pool } from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

async function run() {
  const files = (await readdir(MIGRATIONS_DIR))
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = await readFile(path.join(MIGRATIONS_DIR, file), 'utf8');
    console.log(`[migrate] menjalankan ${file}`);
    await pool.query(sql);
  }

  console.log(`[migrate] selesai. ${files.length} file dieksekusi.`);
  await pool.end();
}

run().catch(async (err) => {
  console.error('[migrate] gagal:', err.message);
  await pool.end();
  process.exit(1);
});
