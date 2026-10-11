# BE-08 — Endpoint Dashboard Admin & Statistik Kelompok

## Ringkasan

Endpoint agregat admin terproteksi (`requireAdmin`) di bawah `/api/admin/stats/*`.
Semua query terparameterisasi; daftar panjang dipaginasi (`page`, `limit`).
Tidak ada identitas pribadi (nickname/token) yang diekspos.

## Endpoint

| Method | Path | Filter | Paginasi |
|--------|------|--------|----------|
| GET | `/api/admin/stats/ringkasan` | `kodeKelas`, `jalur` | - |
| GET | `/api/admin/stats/distribusi` | `kodeKelas`, `jalur` | - |
| GET | `/api/admin/stats/soal-salah` | - | `page`, `limit` |
| GET | `/api/admin/stats/kategori-salah` | - | `page`, `limit` |
| GET | `/api/admin/stats/kode-kelas` | - | `page`, `limit` |

## Definisi metrik (eksplisit)

- **jumlahPeserta**: `COUNT(*) participants` sesuai filter.
- **rataRataPretest/Posttest**: `AVG(score)` attempt tersubmit (`score IS NOT NULL`) per `type`.
  Pembagi = jumlah attempt tersubmit type tsb. Belum ada -> `null` (bukan 0).
- **kenaikanRataRata**: `posttest - pretest`; `null` bila salah satu belum tersedia.
- **penyelesaian**: peserta unik dengan attempt tersubmit pre/post; persen = post selesai / jumlahPeserta.
- **distribusi**: jumlah attempt tersubmit per bucket skor 0-10 per type.
- **soalSalahTerbanyak**: per `question_id`, `COUNT(is_correct=FALSE)` dari attempt tersubmit;
  `persenSalah = salah / dijawab * 100`. Jawaban kosong (`selected_option IS NULL`) tidak dihitung.
- **kategoriSalahTerbanyak**: agregasi sama per `questions.kategori`.
- **ringkasanKodeKelas**: per `class_codes.code` — jumlah peserta, pre/post selesai, rata-rata pre/post,
  persen penyelesaian post-test.

## Gap data (tidak dikarang)

1. **Durasi/waktu pengerjaan per soal** tidak direkam di skema -> tidak ada metrik waktu.
2. **Kategori** hanya tersedia bila `questions.kategori` terisi; baris kosong masuk bucket `Tanpa Kategori`.
3. **Retensi 14 hari** belum dihitung (menunggu keputusan requirement BE-06).
4. **Kenaikan per kategori** (bar chart pre vs post per modus) belum dapat dihitung akurat karena
   attempt tidak menyimpan kategori; hanya agregat per soal/kategori yang tersedia.
5. **Filter rentang waktu** pada UI belum didukung; `test_attempts.created_at` tersedia untuk
   penambahan filter di iterasi berikutnya.

## Test

`Backend/test/adminStats.test.js` — agregasi pada dataset kecil (fake query) dan akses tanpa admin.
