-- 006_attempts_set_link.sql — relasi attempt -> set + dukungan tipe retensi
-- Additive. Kolom nullable agar attempt lama tetap valid. Idempoten.
ALTER TABLE test_attempts
  ADD COLUMN IF NOT EXISTS set_id TEXT REFERENCES question_sets(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_test_attempts_set ON test_attempts(set_id);

-- Longgarkan CHECK type agar mendukung 'retensi'. Nilai lama tetap valid.
ALTER TABLE test_attempts DROP CONSTRAINT IF EXISTS test_attempts_type_check;
ALTER TABLE test_attempts
  ADD CONSTRAINT test_attempts_type_check
  CHECK (type IN ('pretest', 'posttest', 'retensi'));
