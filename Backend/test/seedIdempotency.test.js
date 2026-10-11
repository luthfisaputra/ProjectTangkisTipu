import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  loadPretestQuestions,
  loadQuestionSets,
  validatePretestData,
  validateQuestionSetsData,
  resolveSetId,
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
    path.join(DB_DIR, 'migrations', '009_backfill_legacy_sets.optional.sql'),
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

test('migrasi 009 memakai penanda .optional. (opt-in, tidak auto-run)', async () => {
  const files = await readdir(path.join(DB_DIR, 'migrations'));
  const backfill = files.filter((f) => f.startsWith('009_'));
  assert.equal(backfill.length, 1, 'hanya boleh ada satu file 009');
  assert.match(backfill[0], /\.optional\.sql$/, '009 harus memakai penanda .optional.');
  assert.ok(
    !files.includes('009_backfill_legacy_sets.sql'),
    'file 009 lama tanpa penanda .optional. harus sudah dihapus',
  );
});

test('migrate.js melewati file .optional. (tidak dijalankan otomatis)', async () => {
  const src = await readFile(path.join(DB_DIR, 'migrate.js'), 'utf8');
  assert.match(src, /OPTIONAL_MARKER\s*=\s*'\.optional\.'/, 'harus mendefinisikan penanda .optional.');
  assert.match(src, /isOptional\(file\)/, 'runner harus memeriksa file opsional');
});

test('runner migrasi opsional hanya menerima file .optional.', async () => {
  const src = await readFile(path.join(DB_DIR, 'run-optional-migration.js'), 'utf8');
  assert.match(src, /\.optional\./, 'harus memvalidasi penanda .optional.');
  assert.match(src, /schema_migrations/, 'harus mencatat ke schema_migrations');
});

test('pemetaan soal->set eksplisit & konsisten dengan data set', async () => {
  const data = await loadQuestionSets();
  const errors = validateQuestionSetsData(data);
  assert.deepEqual(errors, [], `validasi pemetaan gagal: ${errors.join('; ')}`);

  const map = data._pemetaanSoalKeSet;
  assert.ok(map && map.pretest, 'harus ada pemetaan pretest');
  assert.equal(map.pretest['0'], 'SET-ANK-PRE-01');
  assert.equal(map.pretest['1'], 'SET-DWS-DRAFT-03');
  assert.equal(map.pretest['2'], null, 'track lansia belum punya set pre (jangan dikarang)');
  assert.ok(Array.isArray(map.keputusanDiperlukan) && map.keputusanDiperlukan.length > 0);
});

test('resolveSetId mengembalikan set_id benar atau null tanpa mengarang', async () => {
  const data = await loadQuestionSets();
  assert.equal(resolveSetId(data, 'pretest', 0), 'SET-ANK-PRE-01');
  assert.equal(resolveSetId(data, 'pretest', 1), 'SET-DWS-DRAFT-03');
  assert.equal(resolveSetId(data, 'pretest', 2), null);
  assert.equal(resolveSetId(data, 'posttest', 0), null);
});

test('seed-questions.js mengaitkan soal ke set (kolom set_id)', async () => {
  const src = await readFile(path.join(DB_DIR, 'seed-questions.js'), 'utf8');
  assert.match(src, /set_id/, 'seed harus menulis kolom set_id');
  assert.match(src, /resolveSetId/, 'seed harus memakai pemetaan eksplisit');
  assert.match(src, /ON CONFLICT \(id\) DO NOTHING/, 'tetap idempoten');
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
