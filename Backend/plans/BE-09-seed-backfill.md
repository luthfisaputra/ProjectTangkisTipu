# BE-09 — Seed/Backfill Data Awal yang Disepakati

Status: implementasi seed backend terpisah + migrasi backfill opsional. Tidak ada seed/migrasi
yang dijalankan terhadap database. `Backend/.env` tidak dibaca.

## 1. Ringkasan

- Data seed backend dipisahkan dari kode runtime frontend. Server/seed **tidak lagi mengimpor JSX**
  frontend; sumber data kini JSON di `Backend/src/db/data/`.
- Seed bersifat **idempoten** dan **tidak menimpa** data yang sudah diedit admin
  (`ON CONFLICT ... DO NOTHING`). Mode paksa tersedia lewat `SEED_FORCE=1`.
- Relasi dijaga: soal→set (via `set_id`), set↔kode kelas (pivot `set_class_codes`).
- Backfill rekaman lama disediakan sebagai **migrasi terpisah** `009_backfill_legacy_sets.sql`
  dengan kondisi aman (`WHERE set_id IS NULL`) dan dokumentasi rollback.
- Tidak ada data rahasia/produksi yang disalin.

## 2. File yang dibuat/diubah

| File | Perubahan |
|---|---|
| `Backend/src/db/data/pretest-questions.json` | **Baru.** 30 soal pretest (3 track × 10), dikonversi dari `frontend/src/data/pretestSoal.jsx`. |
| `Backend/src/db/data/question-sets.json` | **Baru.** 5 set soal + 4 kode kelas contoh, dikonversi dari `setSoal.js`/`kodeKelas.js`. |
| `Backend/src/db/seedHelpers.js` | **Baru.** Loader JSON, pemetaan field, validasi ringan, normalisasi tanggal. |
| `Backend/src/db/seed-questions.js` | **Diubah.** Membaca JSON backend (bukan JSX), idempoten, `SEED_FORCE` opsional. |
| `Backend/src/db/seed-question-sets.js` | **Baru.** Seed set soal + kode kelas + pivot, idempoten. |
| `Backend/src/db/migrations/009_backfill_legacy_sets.sql` | **Baru.** Backfill opsional rekaman lama ke set default, aman & terdokumentasi. |
| `Backend/test/seedIdempotency.test.js` | **Baru.** Validasi data seed & idempotensi (tanpa DB). |

## 3. Pemetaan field (terdokumentasi)

Soal (`pretest-questions.json` → tabel `questions`):

| Sumber | Kolom DB |
|---|---|
| `id` | `id` |
| `kategori` | `kategori` |
| `pertanyaan` | `pertanyaan` |
| `opsi` | `opsi` (JSONB) |
| `kunci` | `kunci` |
| `penjelasan` | `penjelasan` |
| `kasusNyata` | `kasus_nyata` |
| `track` (indeks array) | `track` (0/1/2) |
| — | `type` = `'pretest'` (konstanta) |

Set soal (`question-sets.json` → tabel `question_sets`):

| Sumber | Kolom DB |
|---|---|
| `id` | `id` |
| `nama` | `nama` |
| `catatan` | `catatan` |
| `jalur` | `jalur` |
| `tipe` | `tipe` |
| `status` | `status` |
| `rilis` | `rilis_at` |
| `tutup` | `tutup_at` |
| `kodeKelas` | pivot `set_class_codes(set_id, code)` |

Pemetaan ini juga diekspor sebagai `FIELD_MAP` di `seedHelpers.js` dan diverifikasi oleh test.

## 4. Jaminan idempotensi & perlindungan data admin

- `questions`: `INSERT ... ON CONFLICT (id) DO NOTHING` → soal yang sudah diedit admin tetap.
- `question_sets`: `ON CONFLICT (id) DO NOTHING` → set yang sudah diedit admin tetap.
- `class_codes`: `ON CONFLICT (code) DO NOTHING` → label yang diubah admin tetap.
- `set_class_codes`: `ON CONFLICT (set_id, code) DO NOTHING` → relasi tidak diduplikasi.
- Tidak ada `DELETE`/`TRUNCATE`/`DROP` di skrip seed.
- `SEED_FORCE=1` hanya untuk kasus sengaja memperbarui baris seed.

## 5. Backfill rekaman lama (migrasi 009)

- Membuat set default deterministik `SET-DEFAULT-<track>-<type>` untuk soal/attempt lama.
- Hanya mengisi baris `set_id IS NULL`; baris yang sudah punya set tidak disentuh.
- `ON CONFLICT (id) DO NOTHING` → set default tidak menimpa set admin.
- **Rollback** (manual) didokumentasikan di header file SQL: set `set_id = NULL` untuk baris
  `SET-DEFAULT-%`, hapus set default, lalu hapus baris `009_...` dari `schema_migrations`.
- **Validasi** pasca-migrasi: `SELECT COUNT(*) FROM questions WHERE set_id IS NULL;` dan
  `SELECT COUNT(*) FROM test_attempts WHERE set_id IS NULL;`.

## 6. Cara menjalankan (database pengembangan yang disiapkan eksplisit)

```
cd Backend
node src/db/migrate.js            # termasuk 009 (backfill opsional)
node src/db/seed-class-codes.js   # kode kelas lama (opsional, tidak diubah)
node src/db/seed-questions.js     # 30 soal pretest (idempoten)
node src/db/seed-question-sets.js # 5 set + kode kelas + pivot (idempoten)
```

Jalankan ulang perintah seed untuk membuktikan idempotensi: jumlah baris tidak bertambah
dan data yang diedit admin tidak berubah.

## 7. Test

`Backend/test/seedIdempotency.test.js` (tanpa koneksi DB):
- Data pretest valid: 30 soal, 3 track × 10, id unik, kunci dalam rentang opsi.
- Data set valid: 5 set, jalur/tipe/status dikenal.
- `FIELD_MAP` lengkap dan sesuai kolom DB.
- `toDateOrNull` menormalkan nilai kosong ke `null`.
- `seed-questions.js` tidak mengimpor JSX/frontend saat runtime dan memakai `DO NOTHING`.
- `seed-question-sets.js` idempoten, menjaga relasi, tanpa `DELETE`/`TRUNCATE`.
- Migrasi `009` hanya mengisi `set_id IS NULL`, tanpa operasi destruktif, punya dokumentasi rollback.
- Simulasi logika idempotensi: menjalankan dua kali menghasilkan himpunan id sama.

## 8. Keputusan & risiko terbuka

1. **Relasi set↔kode kelas** memakai pivot many-to-many (migrasi 007). Bila nanti diputuskan 1:1,
   seed tetap kompatibel (satu kode per set).
2. **Backfill 009 opsional.** Bila admin tidak ingin set default otomatis, jangan jalankan migrasi
   009 atau jalankan rollback di header SQL. Perlu konfirmasi apakah backfill diinginkan di produksi.
3. **`seed-class-codes.js` lama** (kode `GURU-01`, dll.) tidak diubah; kode contoh baru (`PR-XXXX`)
   ditambahkan oleh `seed-question-sets.js`. Perlu keputusan format kode final (BE-05).
4. **Sumber frontend** (`pretestSoal.jsx`) masih ada; penghapusan dari frontend adalah pekerjaan
   terpisah (di luar `Backend/**`).

## 9. Batasan kepatuhan BE-09

- Perubahan hanya di `Backend/**`.
- Tidak menjalankan migrasi/seed/query tulis ke database.
- Tidak membaca `Backend/.env`; tidak menyalin data produksi/rahasia.
- Tidak mengubah `001`/`002` atau file frontend.
- BE-10 tidak dikerjakan.
