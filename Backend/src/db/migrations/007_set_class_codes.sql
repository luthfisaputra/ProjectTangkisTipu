-- 007_set_class_codes.sql — relasi set <-> kode kelas (pivot many-to-many)
-- Additive. Tidak menyentuh data lama. Idempoten.
-- Opsi B dari audit BE-01: satu set boleh terkait banyak kode kelas dan
-- satu kode kelas boleh menampung banyak set. Pivot dipilih karena paling
-- kompatibel dengan kedua pola (setSoal.js dan kodeKelas.js).
CREATE TABLE IF NOT EXISTS set_class_codes (
  set_id     TEXT NOT NULL REFERENCES question_sets(id) ON DELETE CASCADE,
  code       TEXT NOT NULL REFERENCES class_codes(code) ON UPDATE CASCADE ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (set_id, code)
);

CREATE INDEX IF NOT EXISTS idx_set_class_codes_code ON set_class_codes(code);
