-- 009_backfill_legacy_sets.optional.sql — backfill OPSIONAL rekaman lama ke set default.
-- Additive & idempoten. TIDAK menghapus/mengubah data lama.
--
-- PENTING (BE-12): file ini memakai penanda '.optional.' sehingga runner
-- `node src/db/migrate.js` TIDAK menjalankannya otomatis. Jalankan manual:
--   node src/db/run-optional-migration.js 009_backfill_legacy_sets.optional.sql
-- Keputusan apakah backfill diinginkan di produksi masih menunggu konfirmasi admin.
--
-- Tujuan: mengaitkan soal pretest lama (set_id IS NULL) dan attempt lama
-- (set_id IS NULL) ke satu set default per (track, type) agar query berbasis set
-- (BE-06) dapat menemukan rekaman lama. Bila tidak diinginkan, migrasi ini aman
-- karena hanya mengisi kolom yang masih NULL.
--
-- Kondisi aman:
-- - Hanya menyentuh baris dengan set_id IS NULL (data yang sudah punya set tidak diubah).
-- - Membuat set default dengan id deterministik 'SET-DEFAULT-<track>-<type>'.
-- - ON CONFLICT DO NOTHING -> tidak menimpa set yang sudah diedit admin.
-- - UPDATE ... WHERE set_id IS NULL -> tidak menimpa relasi yang sudah ada.
--
-- Rollback (manual, bila perlu):
--   UPDATE questions SET set_id = NULL
--     WHERE set_id IN (SELECT id FROM question_sets WHERE id LIKE 'SET-DEFAULT-%');
--   UPDATE test_attempts SET set_id = NULL
--     WHERE set_id IN (SELECT id FROM question_sets WHERE id LIKE 'SET-DEFAULT-%');
--   DELETE FROM question_sets WHERE id LIKE 'SET-DEFAULT-%';
--   (hapus baris '009_backfill_legacy_sets.optional.sql' dari schema_migrations bila ingin menjalankan ulang)
--
-- Validasi setelah migrasi:
--   SELECT COUNT(*) FROM questions WHERE set_id IS NULL;      -- sisa soal tanpa set
--   SELECT COUNT(*) FROM test_attempts WHERE set_id IS NULL;  -- sisa attempt tanpa set

-- 1) Set default per (track, type) untuk soal lama.
INSERT INTO question_sets (id, nama, catatan, jalur, tipe, status)
SELECT
  'SET-DEFAULT-' || q.track || '-' || q.type,
  'Set Default ' || q.track || ' ' || q.type,
  'Dibuat otomatis oleh migrasi 009 untuk rekaman lama tanpa set.',
  CASE q.track WHEN 0 THEN 'anak' WHEN 1 THEN 'dewasa' ELSE 'lansia' END,
  CASE q.type WHEN 'pretest' THEN 'pre' WHEN 'posttest' THEN 'post' ELSE 'retensi' END,
  'draf'
FROM (SELECT DISTINCT track, type FROM questions WHERE set_id IS NULL) q
ON CONFLICT (id) DO NOTHING;

-- 2) Kaitkan soal lama ke set default sesuai (track, type).
UPDATE questions q
   SET set_id = 'SET-DEFAULT-' || q.track || '-' || q.type
 WHERE q.set_id IS NULL
   AND EXISTS (
     SELECT 1 FROM question_sets qs
      WHERE qs.id = 'SET-DEFAULT-' || q.track || '-' || q.type
   );

-- 3) Set default per (track, type) untuk attempt lama.
INSERT INTO question_sets (id, nama, catatan, jalur, tipe, status)
SELECT
  'SET-DEFAULT-' || p.track || '-' || a.type,
  'Set Default ' || p.track || ' ' || a.type,
  'Dibuat otomatis oleh migrasi 009 untuk attempt lama tanpa set.',
  CASE p.track WHEN 0 THEN 'anak' WHEN 1 THEN 'dewasa' ELSE 'lansia' END,
  CASE a.type WHEN 'pretest' THEN 'pre' WHEN 'posttest' THEN 'post' ELSE 'retensi' END,
  'draf'
FROM (
  SELECT DISTINCT p.track, a.type
    FROM test_attempts a
    JOIN participants p ON p.id = a.participant_id
   WHERE a.set_id IS NULL
) p
ON CONFLICT (id) DO NOTHING;

-- 4) Kaitkan attempt lama ke set default sesuai (track, type).
UPDATE test_attempts a
   SET set_id = 'SET-DEFAULT-' || p.track || '-' || a.type
  FROM participants p
 WHERE p.id = a.participant_id
   AND a.set_id IS NULL
   AND EXISTS (
     SELECT 1 FROM question_sets qs
      WHERE qs.id = 'SET-DEFAULT-' || p.track || '-' || a.type
   );
