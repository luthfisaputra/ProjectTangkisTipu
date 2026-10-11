-- 005_questions_set_link.sql — relasi soal -> set
-- Additive. Kolom nullable agar data lama tetap valid. Idempoten.
ALTER TABLE questions
  ADD COLUMN IF NOT EXISTS set_id TEXT REFERENCES question_sets(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_questions_set ON questions(set_id);
