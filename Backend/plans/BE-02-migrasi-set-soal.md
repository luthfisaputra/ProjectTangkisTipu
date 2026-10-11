# BE-02 — Migrasi Tambahan: Set Soal dan Relasi Tes

Status: desain + implementasi migrasi additive. Tidak ada migrasi/seed/query tulis yang dijalankan.
Referensi: `Backend/TASK.md` (BE-02), `Backend/plans/BE-01-audit.md`.

## 1. Ringkasan

Menambahkan entitas **set soal**, relasi soal→set, relasi attempt→set, relasi set↔kode kelas,
dukungan tipe `retensi`, dan tabel pelacak migrasi. Semua perubahan **additive**:
tidak mengubah `001_init.sql`/`002_answers_nullable.sql`, tidak menghapus kolom/tabel/data lama.

## 2. File migrasi baru

| File | Isi | Kompatibilitas |
|---|---|---|
| `003_schema_migrations.sql` | Tabel `schema_migrations(filename PK, applied_at)` | Additive, idempoten |
| `004_question_sets.sql` | Tabel `question_sets` + CHECK jalur/tipe/status + CHECK jadwal + index | Additive, idempoten |
| `005_questions_set_link.sql` | `questions.set_id` (FK nullable, ON DELETE SET NULL) + index | Additive, idempoten |
| `006_attempts_set_link.sql` | `test_attempts.set_id` (FK nullable) + longgarkan CHECK `type` (tambah `retensi`) + index | Additive, idempoten |
| `007_set_class_codes.sql` | Pivot `set_class_codes(set_id, code)` many-to-many | Additive, idempoten |

Kolom `question_sets`: `id TEXT PK`, `nama`, `catatan`, `jalur` (`anak`/`dewasa`/`lansia`),
`tipe` (`pre`/`post`/`retensi`), `status` (`draf`/`terjadwal`/`aktif`, default `draf`),
`rilis_at DATE`, `tutup_at DATE`, `created_at`, `updated_at`.

## 3. Keputusan yang dipilih (opsi paling aman)

1. **Relasi set↔kode kelas → pivot many-to-many** (`007`). Audit BE-01 menandai konflik:
   `setSoal.js` menunjukkan 1 set → 1 kode, sedangkan `kodeKelas.js:162` menunjukkan 1 kode → banyak set.
   Pivot mengakomodasi keduanya tanpa memaksa keputusan bisnis. **Perlu konfirmasi** bila nanti
   diputuskan strictly 1:1.
2. **Tipe `retensi`** dimasukkan sekarang (melonggarkan CHECK `test_attempts.type`) karena additive
   dan tidak merusak data lama. Bila `retensi` ditunda, constraint tetap kompatibel (nilai lama valid).
3. **`set_id` nullable** di `questions` dan `test_attempts`. Tidak ada paksaan NOT NULL agar data lama
   tetap valid dan query lama (track/type) tetap berjalan.
4. **Backfill tidak dijalankan.** Data lama dibiarkan `set_id = NULL`. Query `start`/`results` harus
   tetap menangani `set_id IS NULL` (fallback perilaku track/type) — pekerjaan BE-06.

## 4. Strategi backfill (opsional, belum dijalankan)

- **`questions.set_id`**: biarkan NULL. Bila admin ingin, buat satu set default per `(track, type)`
  lalu `UPDATE questions SET set_id = ... WHERE set_id IS NULL AND track = ... AND type = ...`.
  Pemetaan set default butuh keputusan admin → **jangan dikarang**.
- **`test_attempts.set_id`**: biarkan NULL. Riwayat lama tetap terbaca lewat `type`.
- **`set_class_codes`**: kosong. Backfill hanya bila kode lama (`GURU-01`, `TANGKIS2026`, `SEKOLAH01`,
  `KOMUNITAS`) perlu dipetakan ke set; default aman = tidak dipetakan.
- Tidak ada `DELETE`/`DROP COLUMN`/`TRUNCATE`. Semua kolom baru nullable atau punya DEFAULT.

## 5. Runner migrasi

`migrate.js` diubah agar:
- Membuat `schema_migrations` bila belum ada (bootstrap, idempoten).
- Melewati file yang sudah tercatat di `schema_migrations`.
- Menjalankan tiap file dalam transaksi (`BEGIN`/`COMMIT`), `ROLLBACK` bila gagal.
- Mencatat `filename` setelah sukses (`ON CONFLICT DO NOTHING`).
- Memakai satu `client` (`pool.connect()`) untuk seluruh proses.

Catatan kompatibilitas: database yang sudah pernah menjalankan `001`/`002` akan mencatat keduanya
saat run pertama runner baru (karena belum tercatat), lalu melewatinya di run berikutnya. Karena
`001`/`002` idempoten, pencatatan ulang ini aman.

## 6. Test

`Backend/test/migrations.test.js` (tanpa koneksi DB): memverifikasi urutan/keunikan file,
keberadaan `001`/`002`, sifat idempoten migrasi `003-007`, kolom/constraint `question_sets`,
FK `set_id` nullable, longgarnya CHECK `type`, pivot `set_class_codes`, dan tabel pelacak.

## 7. Pertanyaan/keputusan yang masih terbuka

1. Relasi set↔kode kelas final: many-to-many (dipilih) atau 1:1? (BE-05)
2. Apakah `retensi` aktif di versi pertama? (BE-06)
3. Apakah data lama perlu di-backfill ke set default? (BE-09)
4. Format kode kelas `PR-XXXX` vs bebas. (BE-05)

## 8. Batasan kepatuhan BE-02

- Perubahan hanya di `Backend/**`.
- Tidak menjalankan migrasi, seed, atau query tulis.
- Tidak mengubah `001`/`002` atau file frontend.
- BE-03 tidak dikerjakan.
