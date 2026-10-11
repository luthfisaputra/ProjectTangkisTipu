import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  loadPretestQuestions,
  loadQuestionSets,
  validatePretestData,
  validateQuestionSetsData,
  toDateOrNull,
  FIELD_MAP,
} from '../src/db/seedHelpers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_DIR = path.join(__dirname, '..', 'src', 'db');

test('data seed pretest valid: 30 soal, 3 track x 10, id unik', async () => {
  const data = await loadPretestQuestions();
  const errors = validatePretestData(data);
  assert.deepEqual(errors, [], `validasi gagal: ${errors.join('; ')}`);

  const total = data.tracks.reduce((n, t) => n + t.questions.length, 0);
  assert.equal(total, 30);
  assert.equal(data.tracks.length, 3);
  for (const t of data.tracks) {
    assert.equal(t.questions.length, 10, `track ${t.track} harus 10 soal`);
  }
});

test('data seed set soal valid: 5 set, jalur/tipe/status dikenal', async () => {
  const data = await loadQuestionSets();
  const errors = validateQuestionSetsData(data);
  assert.deepEqual(errors, [], `validasi gagal: ${errors.join('; ')}`);
  assert.equal(data.sets.length, 5);
});

test('pemetaan field terdokumentasi lengkap', () => {
  for (const key of ['id', 'kategori', 'pertanyaan', 'opsi', 'kunci', 'penjelasan', 'kasusNyata']) {
    assert.ok(FIELD_MAP.questions[key], `field soal ${key} harus dipetakan`);
  }
  assert.equal(FIELD_MAP.questions.kasusNyata, 'kasus_nyata');
  for (const key of ['id', 'nama', 'catatan', 'jalur', 'tipe', 'status', 'rilis', 'tutup']) {
    assert.ok(FIELD_MAP.questionSets[key], `field set ${key} harus dipetakan`);
  }
  assert.equal(FIELD_MAP.questionSets.rilis, 'rilis_at');
  assert.equal(FIELD_MAP.questionSets.tutup, 'tutup_at');
});

test('toDateOrNull menormalkan nilai kosong ke null', () => {
  assert.equal(toDateOrNull(''), null);
  assert.equal(toDateOrNull(undefined), null);
  assert.equal(toDateOrNull(null), null);
  assert.equal(toDateOrNull('2026-08-14'), '2026-08-14');
});

test('seed-questions.js tidak mengimpor JSX frontend saat runtime', async () => {
  const src = await readFile(path.join(DB_DIR, 'seed-questions.js'), 'utf8');
  const imports = src
    .split('\n')
    .filter((l) => /^\s*import\b/.test(l))
    .join('\n');
  assert.doesNotMatch(imports, /frontend/i, 'seed tidak boleh mengimpor dari folder frontend');
  assert.doesNotMatch(imports, /\.jsx/i, 'seed tidak boleh mengimpor file .jsx');
  assert.match(src, /ON CONFLICT \(id\) DO NOTHING/, 'harus idempoten (tidak menimpa)');
});

test('seed-question-sets.js idempoten dan menjaga relasi', async () => {
  const src = await readFile(path.join(DB_DIR, 'seed-question-sets.js'), 'utf8');
  assert.match(src, /ON CONFLICT \(id\) DO NOTHING/);
  assert.match(src, /ON CONFLICT \(code\) DO NOTHING/);
  assert.match(src, /ON CONFLICT \(set_id, code\) DO NOTHING/);
  assert.doesNotMatch(src, /\bDELETE\b/i, 'seed tidak boleh menghapus data');
  assert.doesNotMatch(src, /\bTRUNCATE\b/i, 'seed tidak boleh truncate');
});

test('migrasi backfill 009 aman: hanya isi set_id NULL, tidak hapus', async () => {
  const sql = await readFile(
    path.join(DB_DIR, 'migrations', '009_backfill_legacy_sets.sql'),
    'utf8',
  );
  assert.match(sql, /WHERE q\.set_id IS NULL/);
  assert.match(sql, /WHERE a\.set_id IS NULL/);
  assert.match(sql, /ON CONFLICT \(id\) DO NOTHING/);
  assert.doesNotMatch(sql, /\bDROP TABLE\b/i);
  assert.doesNotMatch(sql, /\bTRUNCATE\b/i);
  assert.doesNotMatch(sql, /\bDROP COLUMN\b/i);
  assert.match(sql, /Rollback/i, 'harus mendokumentasikan rollback');
});

test('seed idempoten secara logika: menjalankan dua kali menghasilkan himpunan sama', async () => {
  // Simulasi in-memory: ON CONFLICT DO NOTHING -> himpunan id tetap sama.
  const data = await loadPretestQuestions();
  const ids = data.tracks.flatMap((t) => t.questions.map((q) => q.id));
  const store = new Set();
  const apply = () => ids.forEach((id) => store.add(id));
  apply();
  const afterFirst = new Set(store);
  apply();
  assert.deepEqual([...store].sort(), [...afterFirst].sort());
  assert.equal(store.size, 30);
});
