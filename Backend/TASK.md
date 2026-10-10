# TASK.md — Eksekusi Backend TangkisTipu

Daftar task kecil yang dapat dieksekusi secara berurutan. Setiap task berdiri sendiri dan menghasilkan output yang dapat diverifikasi.

---

## FASE 0 — Fondasi Proyek

### TASK-01: Inisialisasi struktur proyek backend
- **Output**: folder `Backend/src/{config,middleware,controllers,routes,services,db}`, `package.json`, `.gitignore`.
- **Aksi**:
  - `npm init -y` di `Backend/`.
  - Install deps: `express`, `cors`, `dotenv`, `pg`, `express-rate-limit`, `zod`, `uuid`.
  - Install dev deps: `nodemon`.
  - Tambah script `dev` dan `start` di `package.json`.
- **Selesai bila**: `npm run dev` tidak error (server belum ada isi).

### TASK-02: Setup environment & konfigurasi
- **Output**: `Backend/.env.example`, `Backend/src/config/env.js`.
- **Aksi**:
  - Definisikan variabel: `PORT`, `DATABASE_URL`, `NODE_ENV`, `CORS_ORIGIN`, `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX`.
  - Load `.env` via `dotenv` dan validasi dengan `zod`.
- **Selesai bila**: env gagal start jika variabel wajib kosong.

### TASK-03: Setup Express server dasar
- **Output**: `Backend/src/app.js`, `Backend/src/server.js`.
- **Aksi**:
  - `app.js`: instance Express + `express.json()` + route `/health`.
  - `server.js`: listen pada `PORT`.
- **Selesai bila**: `GET /health` mengembalikan `{ status: "ok" }`.

---

## FASE 1 — Middleware & Infrastruktur

### TASK-04: Middleware CORS
- **Output**: `Backend/src/middleware/cors.js`.
- **Aksi**: konfigurasi CORS dari `CORS_ORIGIN`.
- **Selesai bila**: request dari origin frontend diizinkan.

### TASK-05: Middleware rate limiter
- **Output**: `Backend/src/middleware/rateLimit.js`.
- **Aksi**: `express-rate-limit` global + limiter khusus endpoint token.
- **Selesai bila**: melebihi limit mengembalikan HTTP 429.

### TASK-06: Middleware error handler & 404
- **Output**: `Backend/src/middleware/errorHandler.js`, `Backend/src/middleware/notFound.js`.
- **Aksi**: format error konsisten `{ error: { code, message } }`.
- **Selesai bila**: route tidak dikenal mengembalikan 404 terformat.

### TASK-07: Middleware validasi request (Zod)
- **Output**: `Backend/src/middleware/validate.js`.
- **Aksi**: helper `validate(schema)` untuk body/params/query.
- **Selesai bila**: input invalid mengembalikan 400 dengan detail field.

### TASK-08: Koneksi PostgreSQL (pool)
- **Output**: `Backend/src/config/db.js`.
- **Aksi**: buat `pg.Pool` dari `DATABASE_URL`, helper `query()`.
- **Selesai bila**: `SELECT 1` berhasil saat server start.

---

## FASE 2 — Skema Database & Seed

### TASK-09: Migrasi skema tabel
- **Output**: `Backend/src/db/migrations/001_init.sql`.
- **Aksi**: buat tabel `participants`, `class_codes`, `progress`, `test_attempts`, `answers`, `questions` sesuai ERD (bagian 4 rencana).
- **Selesai bila**: migrasi berjalan tanpa error di DB kosong.

### TASK-10: Script runner migrasi
- **Output**: `Backend/src/db/migrate.js`.
- **Aksi**: baca & eksekusi file SQL di `migrations/` secara berurutan.
- **Selesai bila**: `node src/db/migrate.js` membuat semua tabel.

### TASK-11: Seed kode kelas awal
- **Output**: `Backend/src/db/seed-class-codes.js`.
- **Aksi**: `INSERT ... ON CONFLICT (code) DO UPDATE` untuk beberapa kode contoh.
- **Selesai bila**: tabel `class_codes` terisi & idempotent.

### TASK-12: Seed soal dari frontend
- **Output**: `Backend/src/db/seed-questions.js`.
- **Aksi**:
  - Impor/salin `SOAL_PRETEST_SETS` dari `frontend/src/data/pretestSoal.jsx`.
  - Map ke kolom `questions` (`id`, `track`, `type='pretest'`, `kategori`, `pertanyaan`, `opsi` jsonb, `kunci`, `penjelasan`, `kasus_nyata`).
  - `INSERT ... ON CONFLICT (id) DO UPDATE`.
- **Selesai bila**: 30 baris tersimpan (3 track × 10 soal).

### TASK-13: Verifikasi seed soal
- **Output**: query verifikasi di `seed-questions.js` (log).
- **Aksi**: cek total = 30 dan tiap `track` = 10.
- **Selesai bila**: log menampilkan hasil sesuai.

---

## FASE 3 — Service Layer

### TASK-14: Service generator token
- **Output**: `Backend/src/services/tokenService.js`.
- **Aksi**: generate token acak unik (mis. `crypto.randomBytes`), cek kolisi di DB.
- **Selesai bila**: token unik & tersimpan.

### TASK-15: Service scoring
- **Output**: `Backend/src/services/scoringService.js`.
- **Aksi**: hitung skor dari jawaban vs `kunci` (server-side), tentukan `passed` (post-test ≥ 8).
- **Selesai bila**: unit test sederhana skor benar.

---

## FASE 4 — Endpoint Peserta & Kode Kelas

### TASK-16: Endpoint `POST /api/participants`
- **Output**: `controllers/participantsController.js`, `routes/participants.js`.
- **Aksi**: registrasi anonim, generate token, validasi kode kelas opsional, buat baris `progress`.
- **Selesai bila**: response berisi `token` & profil peserta.

### TASK-17: Endpoint `GET /api/participants/:token`
- **Output**: handler di `participantsController.js`.
- **Aksi**: ambil profil berdasarkan token (404 jika tidak ada).
- **Selesai bila**: mengembalikan profil peserta.

### TASK-18: Endpoint `POST /api/class-codes/validate`
- **Output**: `controllers/classCodesController.js`, `routes/classCodes.js`.
- **Aksi**: validasi kode aktif dari DB.
- **Selesai bila**: kode valid → `{ valid: true }`, invalid → `{ valid: false }`.

---

## FASE 5 — Endpoint Modul & Progres

### TASK-19: Endpoint `GET /api/modules` & `GET /api/modules/:id`
- **Output**: `controllers/modulesController.js`, `routes/modules.js`.
- **Aksi**: sajikan daftar & detail modul (statis/DB sesuai keputusan).
- **Selesai bila**: kedua endpoint mengembalikan data modul.

### TASK-20: Endpoint `GET /api/progress/:token`
- **Output**: `controllers/progressController.js`, `routes/progress.js`.
- **Aksi**: ambil progres peserta berdasarkan token.
- **Selesai bila**: mengembalikan progres (default 0).

### TASK-21: Endpoint `PATCH /api/progress/:token`
- **Output**: handler di `progressController.js`.
- **Aksi**: update `pretest`, `modusDibaca`, `skenario`, `posttest` + `updated_at`.
- **Selesai bila**: perubahan tersimpan & terverifikasi.

---

## FASE 6 — Endpoint Tes

### TASK-22: Endpoint `POST /api/tests/:type/start`
- **Output**: `controllers/testsController.js`, `routes/tests.js`.
- **Aksi**: buat `test_attempts`, kembalikan soal **tanpa** field `kunci`.
- **Selesai bila**: response sesuai format bagian 9 rencana (ada `attemptId`, `questions` tanpa `kunci`).

### TASK-23: Endpoint `POST /api/tests/:type/submit`
- **Output**: handler di `testsController.js`.
- **Aksi**: simpan `answers`, hitung skor via `scoringService`, update `test_attempts` & `progress`.
- **Selesai bila**: skor & `passed` tersimpan benar.

### TASK-24: Endpoint `GET /api/tests/:token/results`
- **Output**: handler di `testsController.js`.
- **Aksi**: riwayat hasil tes + laporan analisis per kategori.
- **Selesai bila**: mengembalikan daftar attempt & ringkasan.

### TASK-25: Aturan kelulusan & pembatasan percobaan
- **Output**: logika di `testsController.js` / `scoringService.js`.
- **Aksi**: post-test lulus jika skor ≥ 8; batasi 1x percobaan post-test per set.
- **Selesai bila**: percobaan kedua ditolak dengan pesan jelas.

---

## FASE 7 — Dokumentasi & Kualitas

### TASK-26: Dokumentasi API
- **Output**: `Backend/README.md` (daftar endpoint + contoh request/response) atau `openapi.yaml`.
- **Aksi**: dokumentasikan semua endpoint.
- **Selesai bila**: setiap endpoint punya contoh.

### TASK-27: Dokumentasi cara menjalankan
- **Output**: bagian setup di `Backend/README.md`.
- **Aksi**: langkah install, migrasi, seed, run.
- **Selesai bila**: developer baru bisa menjalankan dari nol.

---

## FASE 8 — Integrasi Frontend

### TASK-28: Integrasi `UjiSkorTes.jsx`
- **Aksi**: ganti `VALID_CODES` dengan `POST /api/class-codes/validate`; token dari `POST /api/participants`.
- **Selesai bila**: validasi kode & token via API.

### TASK-29: Integrasi `Pretest.jsx`
- **Aksi**: ambil soal dari `POST /api/tests/pretest/start`; kirim jawaban ke `submit`.
- **Selesai bila**: skor dihitung server-side.

### TASK-30: Integrasi `App.jsx` (progres)
- **Aksi**: sinkronkan state `progres` dengan `GET/PATCH /api/progress/:token`.
- **Selesai bila**: progres bertahan setelah refresh.

### TASK-31: Hapus `kunci` dari `pretestSoal.jsx`
- **Aksi**: hapus field `kunci` (atau file) setelah backend stabil.
- **Selesai bila**: kunci tidak ada lagi di bundle klien.

### TASK-32: Uji end-to-end
- **Aksi**: registrasi → simpan kode → pretest → belajar modus → simulasi → posttest → hasil.
- **Selesai bila**: seluruh alur berjalan tanpa error.

---

## FASE 9 — Fase 2 (Menyusul)

### TASK-33: Endpoint sertifikat PDF
- **Aksi**: generate sertifikat untuk skor post-test ≥ 8.

### TASK-34: Dashboard fasilitator kelompok
- **Aksi**: agregasi skor & progres anggota berbasis `class_code`.

### TASK-35: Autentikasi fasilitator
- **Aksi**: login sederhana untuk fasilitator.

### TASK-36: Analitik & ekspor data kelompok
- **Aksi**: endpoint analitik + ekspor CSV/JSON.
