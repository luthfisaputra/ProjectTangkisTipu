import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.join(__dirname, '..', 'src', 'db', 'migrations');

async function loadMigrations() {
  const files = (await readdir(MIGRATIONS_DIR))
    .filter((f) => f.endsWith('.sql'))
    .sort();
  const entries = [];
  for (const file of files) {
    entries.push({ file, sql: await readFile(path.join(MIGRATIONS_DIR, file), 'utf8') });
  }
  return entries;
}

test('migrasi terurut leksikografis dan unik', async () => {
  const files = (await readdir(MIGRATIONS_DIR)).filter((f) => f.endsWith('.sql'));
  const sorted = [...files].sort();
  assert.deepEqual(files.sort(), sorted);
  assert.equal(new Set(files).size, files.length);
});

test('migrasi lama 001/002 tidak diubah (masih ada)', async () => {
  const files = (await readdir(MIGRATIONS_DIR)).filter((f) => f.endsWith('.sql'));
  assert.ok(files.includes('001_init.sql'));
  assert.ok(files.includes('002_answers_nullable.sql'));
});

test('migrasi additive baru bersifat idempoten (IF NOT EXISTS / IF EXISTS)', async () => {
  const entries = await loadMigrations();
  const additive = entries.filter((e) => /^00[3-9]/.test(e.file));
  assert.ok(additive.length >= 5, 'harus ada migrasi 003-007');

  for (const { file, sql } of additive) {
    const hasCreate = /CREATE TABLE/i.test(sql);
    const hasAlter = /ALTER TABLE/i.test(sql);
    if (hasCreate) {
      assert.match(sql, /CREATE TABLE IF NOT EXISTS/i, `${file}: CREATE TABLE harus IF NOT EXISTS`);
    }
    if (hasAlter) {
      assert.match(sql, /ADD COLUMN IF NOT EXISTS/i, `${file}: ADD COLUMN harus IF NOT EXISTS`);
    }
    if (/DROP CONSTRAINT/i.test(sql)) {
      assert.match(sql, /DROP CONSTRAINT IF EXISTS/i, `${file}: DROP CONSTRAINT harus IF EXISTS`);
    }
    assert.doesNotMatch(sql, /\bDROP TABLE\b/i, `${file}: tidak boleh DROP TABLE`);
    assert.doesNotMatch(sql, /\bTRUNCATE\b/i, `${file}: tidak boleh TRUNCATE`);
    assert.doesNotMatch(sql, /\bDROP COLUMN\b/i, `${file}: tidak boleh DROP COLUMN`);
  }
});

test('004 membuat question_sets dengan kolom & constraint yang disepakati', async () => {
  const entries = await loadMigrations();
  const sql = entries.find((e) => e.file === '004_question_sets.sql').sql;
  for (const col of ['id', 'nama', 'catatan', 'jalur', 'tipe', 'status', 'rilis_at', 'tutup_at']) {
    assert.match(sql, new RegExp(`\\b${col}\\b`), `kolom ${col} harus ada`);
  }
  assert.match(sql, /CHECK \(jalur IN \('anak', 'dewasa', 'lansia'\)\)/);
  assert.match(sql, /CHECK \(tipe IN \('pre', 'post', 'retensi'\)\)/);
  assert.match(sql, /CHECK \(status IN \('draf', 'terjadwal', 'aktif'\)\)/);
});

test('005/006 menambah set_id nullable dengan FK ON DELETE SET NULL', async () => {
  const entries = await loadMigrations();
  const q = entries.find((e) => e.file === '005_questions_set_link.sql').sql;
  const a = entries.find((e) => e.file === '006_attempts_set_link.sql').sql;
  assert.match(q, /ALTER TABLE questions[\s\S]*ADD COLUMN IF NOT EXISTS set_id TEXT REFERENCES question_sets\(id\) ON DELETE SET NULL/);
  assert.match(a, /ALTER TABLE test_attempts[\s\S]*ADD COLUMN IF NOT EXISTS set_id TEXT REFERENCES question_sets\(id\) ON DELETE SET NULL/);
});

test('006 melonggarkan CHECK type test_attempts untuk retensi', async () => {
  const entries = await loadMigrations();
  const sql = entries.find((e) => e.file === '006_attempts_set_link.sql').sql;
  assert.match(sql, /DROP CONSTRAINT IF EXISTS test_attempts_type_check/);
  assert.match(sql, /CHECK \(type IN \('pretest', 'posttest', 'retensi'\)\)/);
});

test('007 membuat pivot set_class_codes many-to-many', async () => {
  const entries = await loadMigrations();
  const sql = entries.find((e) => e.file === '007_set_class_codes.sql').sql;
  assert.match(sql, /CREATE TABLE IF NOT EXISTS set_class_codes/);
  assert.match(sql, /PRIMARY KEY \(set_id, code\)/);
  assert.match(sql, /REFERENCES question_sets\(id\) ON DELETE CASCADE/);
  assert.match(sql, /REFERENCES class_codes\(code\) ON UPDATE CASCADE ON DELETE CASCADE/);
});

test('003 membuat tabel pelacak schema_migrations', async () => {
  const entries = await loadMigrations();
  const sql = entries.find((e) => e.file === '003_schema_migrations.sql').sql;
  assert.match(sql, /CREATE TABLE IF NOT EXISTS schema_migrations/);
  assert.match(sql, /filename\s+TEXT PRIMARY KEY/);
});
