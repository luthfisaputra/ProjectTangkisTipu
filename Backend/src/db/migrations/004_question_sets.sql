-- 004_question_sets.sql — entitas set soal
-- Additive. Tidak menyentuh data lama. Idempoten.
CREATE TABLE IF NOT EXISTS question_sets (
  id         TEXT PRIMARY KEY,
  nama       TEXT NOT NULL,
  catatan    TEXT,
  jalur      TEXT NOT NULL CHECK (jalur IN ('anak', 'dewasa', 'lansia')),
  tipe       TEXT NOT NULL CHECK (tipe IN ('pre', 'post', 'retensi')),
  status     TEXT NOT NULL DEFAULT 'draf' CHECK (status IN ('draf', 'terjadwal', 'aktif')),
  rilis_at   DATE,
  tutup_at   DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_question_sets_jadwal
    CHECK (tutup_at IS NULL OR rilis_at IS NULL OR tutup_at >= rilis_at)
);

CREATE INDEX IF NOT EXISTS idx_question_sets_status ON question_sets(status);
CREATE INDEX IF NOT EXISTS idx_question_sets_jalur_tipe ON question_sets(jalur, tipe);
