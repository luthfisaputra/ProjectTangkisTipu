-- 003_schema_migrations.sql — tabel pelacak migrasi
-- Additive. Tidak menyentuh data lama. Idempoten.
CREATE TABLE IF NOT EXISTS schema_migrations (
  filename   TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
