# TASK.md — TangkisTipu Backend (Roo Code)

> **Tujuan dokumen:** riwayat pekerjaan backend TangkisTipu, dari audit skema hingga
> penyempurnaan pasca-audit (BE-01 s.d. BE-15), beserta status verifikasi dan gap yang
> masih terbuka.
>
> **Status saat ini:** BE-01 s.d. BE-15 **selesai dikerjakan**. Tidak ada task backend aktif.
> Integrasi frontend (UI-API-01 s.d. UI-API-09) dikerjakan di luar cakupan task backend ini.
> Pengujian end-to-end seluruh alur aplikasi **belum selesai**.

## Aturan global Roo Code

1. **Batas mutlak perubahan file:** hanya boleh membuat/mengubah file di `Backend/**`.
2. `Frontend/**` hanya boleh dibaca sebagai referensi kebutuhan; jangan mengedit, memindahkan, menghapus, atau membuat file di sana. Jika folder di workspace bernama `frontend/` dengan huruf kecil, aturan yang sama tetap berlaku.
3. Jangan membuat ulang backend. Periksa implementasi yang sudah ada dan pertahankan perilaku yang berfungsi.
4. Jangan membaca, mencetak, menyalin, atau mengubah `Backend/.env`. Gunakan `Backend/.env.example` untuk melihat nama konfigurasi saja.
5. Jangan menjalankan migrasi, seed database, atau perintah yang mengubah database untuk task audit. Jangan menghapus data, tabel, kolom, atau riwayat Git.
6. Jangan menambah dependensi kecuali task aktif benar-benar membutuhkannya dan manfaatnya dijelaskan.
7. Hindari refactor di luar task aktif. Jangan mengerjakan task berikutnya sekaligus.
8. Setelah task selesai, laporkan: ringkasan, file yang diubah, perintah/test yang dijalankan, hasilnya, serta hambatan/keputusan yang masih dibutuhkan.
9. Jika requirement belum jelas, tulis sebagai pertanyaan/risiko di laporan; jangan menebak lalu menerapkan perubahan destruktif.

---

## Baseline backend saat dokumen ini dibuat

Stack yang sudah ada: Node.js ES Modules, Express, PostgreSQL (`pg`), Zod, CORS, rate limiting, dan `node:test`.

Kode utama yang sudah tersedia:

- Konfigurasi: `src/config/env.js`, `src/config/db.js`
- Server dan app: `src/server.js`, `src/app.js`
- Middleware: CORS, rate limit, validasi Zod, 404, error handler
- Endpoint peserta: `POST /api/participants`, `GET /api/participants/:token`
- Endpoint kode kelas: `POST /api/class-codes/validate`
- Endpoint modul statis: `GET /api/modules`, `GET /api/modules/:id`
- Endpoint progres: `GET /api/progress/:token`, `PATCH /api/progress/:token`
- Endpoint tes: `POST /api/tests/:type/start`, `POST /api/tests/:type/submit`, `GET /api/tests/:token/results`
- Database: migrasi `001_init.sql`, `002_answers_nullable.sql`, runner migrasi, seed kode kelas, seed soal
- Unit test scoring tersedia di `test/scoringService.test.js`.

Hasil baseline yang diketahui: `npm test` menjalankan 4 tes scoring dan semuanya lulus pada pemeriksaan terakhir. Ini bukan bukti bahwa koneksi database atau seluruh alur API telah dites end-to-end.

Gap yang perlu diaudit, bukan langsung diasumsikan untuk diubah:

- Belum terlihat tabel/endpoint untuk akun admin, login, dan proteksi route admin.
- Skema `questions` saat ini belum mengaitkan soal ke entitas set soal; `test_attempts` juga belum menyimpan identitas set.
- Kode kelas baru memiliki endpoint validasi; API CRUD administrasi belum tersedia.
- Dashboard statistik admin/kelompok belum memiliki endpoint agregasi khusus.
- Alur tes saat ini memilih soal berdasarkan `track` dan `type`, sementara UI baru memiliki entitas set, status draf/terjadwal/aktif, kode kelas, tanggal rilis, tanggal tutup, tipe pre/post/retensi, dan pengelolaan pertanyaan.
- Pemeriksaan kode sumber frontend menunjukkan UI baru masih menggunakan data/state lokal dan belum memanggil API backend. Integrasi frontend bukan bagian dari task backend ini.

---

## Status task

| Task | Judul | Status |
| --- | --- | --- |
| BE-01 | Audit skema database dan kebutuhan migrasi | ✅ Selesai |
| BE-02 | Rancang migrasi tambahan untuk set soal dan relasi tes | ✅ Selesai |
| BE-03 | Autentikasi admin dan proteksi API admin | ✅ Selesai |
| BE-04 | API CRUD set soal dan pertanyaan | ✅ Selesai |
| BE-05 | API administrasi kode kelas/komunitas | ✅ Selesai |
| BE-06 | Tes berbasis set, jadwal, dan kebijakan percobaan | ✅ Selesai |
| BE-07 | Progres peserta dan riwayat hasil | ✅ Selesai |
| BE-08 | Endpoint dashboard admin dan statistik kelompok | ✅ Selesai |
| BE-09 | Seed/backfill data awal yang disepakati | ✅ Selesai |
| BE-10 | Tes regresi, kontrak API, dan dokumentasi backend | ✅ Selesai |
| BE-11 | Perbaikan validasi status/jadwal pada `startTest` | ✅ Selesai |
| BE-12 | Migrasi 009 opt-in dan pemetaan soal→set | ✅ Selesai |
| BE-13 | Relasi set↔kode kelas konsisten di CRUD | ✅ Selesai |
| BE-14 | Perbaikan statistik jawaban kosong | ✅ Selesai |
| BE-15 | Integration smoke test read-only Supabase | ✅ Selesai |

---

## Ringkasan hasil per task

### BE-01 — Audit skema database dan kebutuhan migrasi

**Tujuan:** menghasilkan audit berbasis kode aktual agar perubahan skema berikutnya aman, non-destruktif, serta sesuai kebutuhan frontend baru. Read-only terhadap kode aplikasi dan database.

**Hasil:** laporan [`Backend/plans/BE-01-audit.md`](plans/BE-01-audit.md) dibuat. Skema awal terdiri dari 6 tabel (`class_codes`, `participants`, `progress`, `questions`, `test_attempts`, `answers`). Ditemukan bahwa belum ada entitas set soal, akun admin, CRUD kode kelas, maupun endpoint statistik; runner migrasi lama mengeksekusi ulang semua file `.sql` tanpa tabel pelacak. Rekomendasi: migrasi additive `003+` dan tabel pelacak migrasi.

### BE-02 — Rancang migrasi tambahan untuk set soal dan relasi tes

**Tujuan:** menetapkan desain skema untuk set soal, pertanyaan milik set, kode kelas terkait set, jadwal/status publikasi, dan attempt terkait set.

**Hasil:** laporan [`Backend/plans/BE-02-migrasi-set-soal.md`](plans/BE-02-migrasi-set-soal.md). Migrasi additive dibuat: `003_schema_migrations.sql` (tabel pelacak), `004_question_sets.sql` (tabel `question_sets` + CHECK jalur/tipe/status/jadwal), `005_questions_set_link.sql` (`questions.set_id` nullable), `006_attempts_set_link.sql` (`test_attempts.set_id` nullable + tipe `retensi`), `007_set_class_codes.sql` (pivot many-to-many). Runner migrasi diubah memakai `schema_migrations` dan satu `client` per proses. Tidak ada migrasi/seed yang dijalankan.

### BE-03 — Autentikasi admin dan proteksi API admin

**Tujuan:** menyediakan model akun admin, login, dan proteksi route admin.

**Hasil:** migrasi `008_admin_users.sql` (tabel `admin_users`, password hash scrypt). Controller [`adminAuthController.js`](src/controllers/adminAuthController.js:1) menyediakan `POST /api/admin/auth/login` dan `GET /api/admin/me`. Token HMAC-SHA256 bertanda tangan `ADMIN_JWT_SECRET` dengan TTL `ADMIN_TOKEN_TTL_SECONDS`. Middleware `requireAdmin` melindungi seluruh endpoint admin. Hash password tidak pernah dikembalikan pada respons.

### BE-04 — API CRUD set soal dan pertanyaan

**Tujuan:** menyediakan endpoint admin untuk mengelola set soal dan pertanyaan di dalamnya.

**Hasil:** controller [`questionSetsController.js`](src/controllers/questionSetsController.js:1) menyediakan CRUD set (`GET/POST /api/admin/sets`, `GET/PATCH /api/admin/sets/:id`, `publish`, `archive`) dan CRUD pertanyaan (`GET/POST/PATCH/DELETE /api/admin/sets/:id/questions`) dengan batas maksimal 10 soal per set. Kunci jawaban tidak dikirim pada endpoint peserta.

### BE-05 — API administrasi kode kelas/komunitas

**Tujuan:** melengkapi CRUD/list/detail kode kelas serta status aktif/nonaktif.

**Hasil:** controller [`classCodesController.js`](src/controllers/classCodesController.js:1) menyediakan `GET/POST /api/admin/class-codes`, `GET/PATCH /api/admin/class-codes/:code`, `deactivate`, dan `activate`. Endpoint validasi peserta (`POST /api/class-codes/validate`) dipertahankan. Kode duplikat ditolak (`DUPLICATE_CODE`).

### BE-06 — Tes berbasis set, jadwal, dan kebijakan percobaan

**Tujuan:** menyesuaikan endpoint start/submit/results agar attempt mengacu ke set soal yang benar.

**Hasil:** controller [`testsController.js`](src/controllers/testsController.js:1) dan service pemilihan set memilih soal berdasarkan set aktif dan jadwal. Endpoint peserta tidak mengembalikan `kunci`/`penjelasan`/`kasus_nyata` sebelum submit. Penilaian dihitung di server; satu attempt hanya bisa disubmit sekali (`ALREADY_SUBMITTED`). Post-test dibatasi per set (`ATTEMPT_LIMIT_REACHED`).

### BE-07 — Progres peserta dan riwayat hasil

**Tujuan:** menyelaraskan kontrak endpoint peserta/progres/hasil dengan model set baru.

**Hasil:** controller [`progressController.js`](src/controllers/progressController.js:1) memastikan update progres tidak menurunkan nilai lama (memakai `GREATEST`) dan skor hanya diperbarui dari hasil tes server. `GET /api/tests/:token/results` mengembalikan riwayat attempt beserta ringkasan per kategori dan per tipe.

### BE-08 — Endpoint dashboard admin dan statistik kelompok

**Tujuan:** menyediakan statistik agregat yang diperlukan UI admin.

**Hasil:** laporan [`Backend/plans/BE-08-stats.md`](plans/BE-08-stats.md). Controller [`adminStatsController.js`](src/controllers/adminStatsController.js:1) menyediakan `ringkasan`, `distribusi`, `soal-salah`, `kategori-salah`, dan `kode-kelas` di bawah `/api/admin/stats/*`. Semua query terparameterisasi, daftar panjang dipaginasi, dan tidak mengekspos identitas peserta. Definisi metrik didokumentasikan eksplisit.

### BE-09 — Seed/backfill data awal yang disepakati

**Tujuan:** memisahkan data seed backend dari kode runtime frontend dan menyediakan backfill opsional.

**Hasil:** laporan [`Backend/plans/BE-09-seed-backfill.md`](plans/BE-09-seed-backfill.md). Sumber data dipindah ke `Backend/src/db/data/` (JSON). `seed-questions.js` dan `seed-question-sets.js` bersifat idempoten (`ON CONFLICT ... DO NOTHING`) dan tidak menimpa data admin. Backfill rekaman lama disediakan sebagai migrasi opsional `009_backfill_legacy_sets.optional.sql`. Tidak ada seed/migrasi yang dijalankan.

### BE-10 — Tes regresi, kontrak API, dan dokumentasi backend

**Tujuan:** menambah tes regresi dan mendokumentasikan endpoint, autentikasi, konfigurasi, serta langkah migrasi/seed.

**Hasil:** suite unit test diperluas (validasi Zod, error path controller, otorisasi admin, CRUD, alur tes, statistik, migrasi, idempotensi seed). [`Backend/README.md`](README.md:1) diperbarui memuat daftar endpoint, format error, autentikasi, konfigurasi environment, dan langkah migrasi/seed.

### BE-11 — Perbaikan validasi status/jadwal pada `startTest`

**Tujuan:** menegakkan status dan jadwal set pada `startTest`, termasuk saat `setId` dikirim eksplisit.

**Hasil:** cabang `setId` eksplisit kini memakai validasi ketersediaan yang sama dengan jalur `pilihSet()`, sehingga set `draf`, `terjadwal`, atau sudah lewat tanggal tutup tidak dapat dimulai. Ditambahkan test controller untuk kasus tersebut.

### BE-12 — Migrasi 009 opt-in dan pemetaan soal→set

**Tujuan:** memutuskan apakah migrasi 009 opt-in dan menyelaraskan pemetaan soal ke set.

**Hasil:** migrasi backfill diubah menjadi `009_backfill_legacy_sets.optional.sql` (penanda `.optional.`). Runner `migrate.js` melewati file berpenanda `.optional.`; eksekusi manual lewat `node src/db/run-optional-migration.js`. Pemetaan soal→set eksplisit disimpan di `question-sets.json` (`_pemetaanSoalKeSet`) dan dipakai `seed-questions.js` via `resolveSetId()`. Celah pemetaan (track 2 belum punya set `pre`, set `post` track 0/1 belum ada) didokumentasikan, bukan dikarang.

### BE-13 — Relasi set↔kode kelas konsisten di CRUD

**Tujuan:** mempersistenkan dan membaca relasi `kodeKelas` ↔ set secara konsisten pada CRUD kedua entitas.

**Hasil:** relasi set↔kode kelas disinkronkan lewat pivot `set_class_codes` dalam transaksi saat create/update set, dan dibaca kembali pada list/detail. Perubahan pada satu endpoint tercermin pada endpoint lainnya.

### BE-14 — Perbaikan statistik jawaban kosong

**Tujuan:** memperbaiki statistik jawaban salah agar mengabaikan jawaban kosong.

**Hasil:** query `getSoalSalah()` dan `getKategoriSalah()` memakai kondisi `selected_option IS NOT NULL AND is_correct = FALSE`, sehingga persentase salah tidak melebihi 100% dan konsisten dengan definisi metrik. Ditambahkan test yang mencampur jawaban benar, salah, dan kosong.

### BE-15 — Integration smoke test read-only Supabase

**Tujuan:** menambahkan integration test PostgreSQL dan smoke test backend tanpa mengubah data.

**Hasil:** `test/integration/health.smoke.test.js` (tanpa database) dan `test/integration/supabase.readonly.test.js` (read-only: `SELECT 1`, keberadaan tabel inti, `schema_migrations` terisi, `answers.selected_option` nullable, `GET /api/modules`). Test DB di-skip kecuali `INTEGRATION_DB=1`. Tidak ada operasi tulis, migrasi, atau seed yang dijalankan.

---

## Hasil verifikasi terakhir

- **Unit test:** 158 tes lulus (`npm test`, tanpa database nyata).
- **Integration smoke test read-only Supabase:** 8 tes lulus ketika `INTEGRATION_DB=1` (`npm run test:integration`).
- **Build frontend:** berhasil (di luar cakupan task backend).

### Batasan verifikasi (jangan diabaikan)

- Integration smoke test read-only **tidak membuktikan** seluruh operasi CRUD atau transaksi tulis bekerja end-to-end. Test tersebut hanya menjalankan `SELECT`/query metadata dan tidak melakukan `INSERT`/`UPDATE`/`DELETE`.
- **Migrasi 009 bersifat opsional** dan **tidak boleh dianggap sudah diterapkan** hanya karena file SQL tersedia. File berpenanda `.optional.` dilewati runner otomatis dan harus dijalankan manual bila memang dikehendaki.
- Seluruh unit test memakai mock database; lulusnya unit test **bukan** bukti bahwa koneksi database atau alur API bekerja terhadap PostgreSQL nyata.
- **Backend belum dapat dinyatakan sepenuhnya siap produksi** hanya karena seluruh unit test lulus.

---

## Gap yang masih terbuka

1. **Pengujian end-to-end seluruh alur aplikasi belum selesai** — mencakup alur peserta (registrasi → pre-test → belajar → simulasi → post-test) dan alur admin (login → kelola set/kode kelas → statistik) terhadap database nyata.
2. **CRUD dan transaksi tulis belum diuji** terhadap Supabase karena akan mengubah data produksi; memerlukan database TEST terpisah.
3. **Migrasi 009 (backfill) belum diputuskan** apakah akan diterapkan di produksi; statusnya opsional dan belum dijalankan.
4. **Pemetaan soal→set belum lengkap** — track 2 (lansia) belum punya set `pre`; set `post` untuk track 0/1 belum tersedia.
5. **Kebijakan retensi 14 hari** belum dipastikan sebagai requirement aktif.
6. **Semantik tanggal tutup dan transisi `terjadwal` → `aktif`** masih menunggu konfirmasi aturan produk.
7. **Race condition** pada batas 10 soal per set dan satu kali post-test belum diamankan dengan lock/constraint; memerlukan integration test PostgreSQL.
8. **Integrasi frontend** (UI-API-01 s.d. UI-API-09) dikerjakan di luar cakupan task backend ini dan tidak diverifikasi di sini.

---

## Definisi selesai untuk seluruh roadmap

- Setiap task dikerjakan terpisah dan ditinjau sebelum melanjutkan task berikutnya.
- Hanya `Backend/**` yang berubah.
- Migrasi database bersifat terdokumentasi dan non-destruktif kecuali ada persetujuan eksplisit.
- Setiap fitur memiliki validasi input dan tes yang relevan.
- Tidak ada kunci jawaban, hash password, token rahasia, atau konfigurasi sensitif yang terekspos melalui respons API/log.
- Integrasi frontend tetap menjadi pekerjaan terpisah; jangan ubah frontend dalam task backend mana pun.
