// Integration test READ-ONLY terhadap database Supabase yang sedang dipakai.
//
// PENTING:
// - Hanya menjalankan SELECT. Tidak ada INSERT/UPDATE/DELETE/DROP/TRUNCATE/ALTER.
// - Tidak menjalankan migrasi atau seed.
// - Tidak mencetak kredensial (DATABASE_URL tidak pernah di-log).
// - Opt-in: hanya berjalan bila INTEGRATION_DB=1 dan DATABASE_URL tersedia.
//   Jalankan dengan: npm run test:integration
//
// Jika INTEGRATION_DB tidak diset, seluruh test di file ini di-skip.
import test from 'node:test';
import assert from 'node:assert/strict';

import { pool, testConnection } from '../../src/config/db.js';

const ENABLED = process.env.INTEGRATION_DB === '1';

// Tabel inti yang diharapkan ada setelah migrasi 001-007.
const EXPECTED_TABLES = [
  'participants',
  'class_codes',
  'questions',
  'test_attempts',
  'answers',
  'schema_migrations',
  'question_sets',
  'set_class_codes',
];

test(
  'koneksi Supabase hidup (SELECT 1)',
  { skip: ENABLED ? false : 'INTEGRATION_DB != 1 (opt-in)' },
  async () => {
    const ok = await testConnection();
    assert.equal(ok, true, 'SELECT 1 harus mengembalikan ok=1');
  },
);

test(
  'tabel inti ada di schema public (read-only information_schema)',
  { skip: ENABLED ? false : 'INTEGRATION_DB != 1 (opt-in)' },
  async () => {
    const { rows } = await pool.query(
      `SELECT table_name FROM information_schema.tables
       WHERE table_schema = 'public' AND table_name = ANY($1::text[])`,
      [EXPECTED_TABLES],
    );
    const found = new Set(rows.map((r) => r.table_name));
    const missing = EXPECTED_TABLES.filter((t) => !found.has(t));
    assert.deepEqual(missing, [], `tabel hilang: ${missing.join(', ')}`);
  },
);

test(
  'schema_migrations terisi (migrasi pernah diterapkan)',
  { skip: ENABLED ? false : 'INTEGRATION_DB != 1 (opt-in)' },
  async () => {
    const { rows } = await pool.query(
      'SELECT COUNT(*)::int AS jumlah FROM schema_migrations',
    );
    assert.ok(rows[0].jumlah > 0, 'schema_migrations harus berisi minimal 1 baris');
  },
);

test(
  'kolom answers.selected_option boleh NULL (migrasi 002)',
  { skip: ENABLED ? false : 'INTEGRATION_DB != 1 (opt-in)' },
  async () => {
    const { rows } = await pool.query(
      `SELECT is_nullable FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = 'answers'
         AND column_name = 'selected_option'`,
    );
    assert.equal(rows.length, 1, 'kolom answers.selected_option harus ada');
    assert.equal(rows[0].is_nullable, 'YES', 'selected_option harus nullable');
  },
);

test(
  'endpoint GET /api/modules mengembalikan daftar modul (read-only)',
  { skip: ENABLED ? false : 'INTEGRATION_DB != 1 (opt-in)' },
  async () => {
    const { listModules } = await import('../../src/controllers/modulesController.js');
    const res = {
      statusCode: 200,
      body: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        this.body = payload;
        return this;
      },
    };
    await listModules({}, res);
    assert.equal(res.statusCode, 200);
    assert.ok(Array.isArray(res.body?.modules), 'respons harus memuat array modules');
  },
);

test.after(async () => {
  if (ENABLED) {
    await pool.end();
  }
});
