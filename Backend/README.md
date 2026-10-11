# TangkisTipu Backend

API backend TangkisTipu (Node.js, Express, PostgreSQL, Zod, ES Modules).

## 1. Install

```bash
cd Backend
npm install
```

## 2. Konfigurasi `.env`

Salin `.env.example` menjadi `.env` lalu sesuaikan nilainya.

```bash
copy .env.example .env
```

Variabel yang dibutuhkan (nama saja; nilai rahasia tidak boleh di-commit):

| Variabel | Wajib | Default | Keterangan |
| --- | --- | --- | --- |
| `PORT` | tidak | `3000` | Port server |
| `DATABASE_URL` | ya | - | Koneksi PostgreSQL |
| `NODE_ENV` | tidak | `development` | `development` / `production` / `test` |
| `CORS_ORIGIN` | tidak | `*` | Origin frontend yang diizinkan (dipisah koma). Wajib diisi domain asli saat `NODE_ENV=production` |
| `RATE_LIMIT_WINDOW_MS` | tidak | `60000` | Jendela rate limit (ms) |
| `RATE_LIMIT_MAX` | tidak | `100` | Maks request per jendela (global) |
| `RATE_LIMIT_TOKEN_FAIL_MAX` | tidak | `10` | Maks respons gagal (status >= 400) per jendela untuk endpoint token |
| `TRUST_PROXY` | tidak | `0` | Jumlah hop proxy tepercaya (`app.set('trust proxy')` bila > 0) |
| `ADMIN_JWT_SECRET` | ya | - | Rahasia HMAC token admin, minimal 32 karakter |
| `ADMIN_TOKEN_TTL_SECONDS` | tidak | `28800` | Masa berlaku token admin (detik) |

Catatan: `ADMIN_JWT_SECRET` dan `DATABASE_URL` divalidasi saat startup; server berhenti bila tidak valid.

## 3. Migrasi

```bash
node src/db/migrate.js
```

Runner mencatat file yang sudah diterapkan pada tabel `schema_migrations` dan melewatinya pada eksekusi berikutnya. Migrasi bersifat additive dan idempoten (`IF NOT EXISTS` / `IF EXISTS`).

## 4. Seed

```bash
node src/db/seed-class-codes.js
node src/db/seed-questions.js
node src/db/seed-question-sets.js
```

Seed bersifat idempoten (`ON CONFLICT ... DO NOTHING`) dan tidak menghapus data yang sudah ada.

## 5. Menjalankan Server

```bash
npm run dev    # development (nodemon)
npm start      # production
```

Cek kesehatan: `GET http://localhost:3000/health` → `{ "status": "ok" }`.

## 6. Menjalankan Test

### 6.1 Unit test (default, tanpa database)

```bash
npm test
```

- Menjalankan seluruh `test/*.test.js` memakai `node:test` dan **tidak memerlukan database nyata maupun rahasia di `.env`**.
- Akses database disuntikkan lewat seam `__setQueryImpl` di [`src/config/db.js`](src/config/db.js:24) dan `pool.connect` untuk transaksi, sehingga query di-mock.
- Test migrasi/seed hanya membaca file SQL/JSON di disk (tanpa eksekusi DB).
- Untuk menjalankan satu file: `node --test test/<nama>.test.js`.

### 6.2 Integration test (opt-in, terpisah)

```bash
npm run test:integration
```

- Menjalankan `test/integration/*.test.js` dan **tidak ikut berjalan** pada `npm test`.
- **Read-only**: hanya `SELECT` dan query metadata (`information_schema`). Tidak ada `INSERT`/`UPDATE`/`DELETE`/`DROP`/`TRUNCATE`/`ALTER`, tidak menjalankan migrasi/seed, dan tidak mengubah data yang sudah ada.
- Kredensial tidak pernah dicetak; koneksi memakai `DATABASE_URL` dari `.env` yang sudah ada.
- Test yang menyentuh database di-skip kecuali `INTEGRATION_DB=1` diset. Contoh (Windows cmd):

```bash
set INTEGRATION_DB=1 && npm run test:integration
```

- Cakupan:
  - `health.smoke.test.js` — `GET /health` → `200 { status: "ok" }`; endpoint admin tanpa token → `401 UNAUTHORIZED`; token tidak valid → `401 INVALID_TOKEN`. Tidak menyentuh database.
  - `supabase.readonly.test.js` — `SELECT 1`, keberadaan tabel inti, `schema_migrations` terisi, `answers.selected_option` nullable, dan `GET /api/modules` (read-only).
- Hasil yang diharapkan: semua test lulus bila koneksi Supabase sehat dan skema sudah dimigrasi. Bila `INTEGRATION_DB` tidak diset, seluruh test DB dilaporkan `skipped` (bukan gagal).

### 6.3 Belum diuji (butuh database TEST terpisah)

- **CRUD dan transaksi tulis** (registrasi peserta, submit test, PATCH progres) **belum diuji** terhadap Supabase saat ini karena akan mengubah data produksi. Pengujian ini memerlukan database TEST terpisah dan belum dijalankan pada BE-15.

## 7. Format Error

Semua error memakai bentuk berikut:

```json
{ "error": { "code": "KODE", "message": "pesan", "details": [] } }
```

`details` hanya ada pada `VALIDATION_ERROR` (array `{ field, message }`). Kode error yang dipakai:

| Kode | Status | Sumber |
| --- | --- | --- |
| `VALIDATION_ERROR` | 400 | Middleware Zod [`validate`](src/middleware/validate.js:3) |
| `INVALID_CLASS_CODE` | 400 | Registrasi peserta dengan kode kelas tidak valid |
| `INVALID_TRACK` | 400 | `start` dengan track peserta tidak dikenali |
| `INVALID_ANSWERS` | 400 | `submit` dengan jawaban duplikat/asing/opsi di luar rentang |
| `TYPE_MISMATCH` | 400 | `submit` tipe tes tidak sesuai attempt |
| `INVALID_SET` | 400 | Kode kelas merujuk set yang tidak ada |
| `UNAUTHORIZED` | 401 | Tidak ada header `Authorization: Bearer` |
| `INVALID_TOKEN` | 401 | Token admin tidak valid/kedaluwarsa |
| `INVALID_CREDENTIALS` | 401 | Login admin gagal |
| `FORBIDDEN` | 403 | Attempt bukan milik peserta |
| `NOT_FOUND` | 404 | Peserta/attempt/modul/kode kelas/route tidak ditemukan |
| `SET_NOT_AVAILABLE` | 404/409 | Set soal tidak tersedia/tidak dalam jadwal |
| `QUESTIONS_NOT_AVAILABLE` | 404/409 | Soal set belum tersedia |
| `DUPLICATE_CODE` | 409 | Kode kelas sudah dipakai |
| `ATTEMPT_LIMIT_REACHED` | 409 | Post-test sudah disubmit untuk set ini |
| `RETENSI_BELUM_TIBA` | 409 | Retensi belum 14 hari sejak post-test terakhir |
| `ALREADY_SUBMITTED` | 409 | Attempt sudah pernah disubmit |
| `SET_MISSING` | 409 | Attempt tidak terikat set |
| `RATE_LIMITED` | 429 | Melebihi batas rate limit |
| `INTERNAL_ERROR` | 500 | Kesalahan tak terduga |

## 8. Autentikasi

- Endpoint peserta memakai **token peserta** (`TKP-XXXXXXXX`) di path/body, tanpa akun.
- Endpoint admin memerlukan header `Authorization: Bearer <token>` yang diperoleh dari `POST /api/admin/auth/login`. Token adalah HMAC-SHA256 bertanda tangan dengan `ADMIN_JWT_SECRET` dan kedaluwarsa sesuai `ADMIN_TOKEN_TTL_SECONDS`.
- Password admin disimpan sebagai hash scrypt; hash tidak pernah dikembalikan pada respons.

## 9. Daftar Endpoint

Base URL: `http://localhost:3000`. Semua endpoint API berawalan `/api`.

### Health

| Method | Path | Auth | Keterangan |
| --- | --- | --- | --- |
| GET | `/health` | - | `{ "status": "ok" }` |

### Peserta

| Method | Path | Auth | Keterangan |
| --- | --- | --- | --- |
| POST | `/api/participants` | - | Registrasi peserta anonim |
| GET | `/api/participants/:token` | token peserta | Profil peserta |

`POST /api/participants` — body: `{ nickname?, track?, classCode? }` (`track` 0-2, `classCode` opsional; bila diisi harus valid & aktif). Respons `201`:

```json
{ "token": "TKP-ABCDEFGH", "participant": { "id": "uuid", "nickname": "Budi", "track": 1, "classCode": null, "createdAt": "..." } }
```

`GET /api/participants/:token` — respons `200` `{ "participant": { ... } }`; `404 NOT_FOUND` bila token tidak dikenal.

### Kode Kelas (peserta)

| Method | Path | Auth | Keterangan |
| --- | --- | --- | --- |
| POST | `/api/class-codes/validate` | - | Validasi kode kelas |

Body `{ code }` → `{ "valid": true, "code": "PR-2312", "label": "RT 05" }` atau `{ "valid": false }`.

### Modul

| Method | Path | Auth | Keterangan |
| --- | --- | --- | --- |
| GET | `/api/modules` | - | Daftar modul (metadata statis) |
| GET | `/api/modules/:id` | - | Detail modul |

Isi modul tetap berada di frontend; backend hanya menyediakan metadata.

### Progres

| Method | Path | Auth | Keterangan |
| --- | --- | --- | --- |
| GET | `/api/progress/:token` | token peserta | Ambil progres |
| PATCH | `/api/progress/:token` | token peserta | Update progres parsial |

`PATCH` body: `{ modusDibaca?, skenario? }` (0-8). Hanya field ini yang diterima; `pretest`/`posttest` ditolak. Nilai tidak boleh turun (memakai `GREATEST`). Respons `200` `{ "progress": { pretest, modusDibaca, skenario, posttest, updatedAt } }`.

### Tes

| Method | Path | Auth | Keterangan |
| --- | --- | --- | --- |
| POST | `/api/tests/:type/start` | token peserta | Mulai/lanjutkan attempt (`type`: `pretest`\|`posttest`\|`retensi`) |
| POST | `/api/tests/:type/submit` | token peserta | Kirim jawaban & nilai di server |
| GET | `/api/tests/:token/results` | token peserta | Riwayat hasil tes |

`start` body: `{ token, setId? }`. Respons `201` memuat `attemptId`, `setId`, `setNama`, dan `questions` **tanpa** `kunci`/`penjelasan`/`kasus_nyata`.

`submit` body: `{ attemptId (uuid), token, answers: [{ questionId, selectedOption }] }`. Respons `200` memuat `score`, `total`, `passed`, dan `details` (termasuk `penjelasan` & `kasusNyata` setelah dinilai). Skor hanya ditulis server; satu attempt hanya bisa disubmit sekali (`409 ALREADY_SUBMITTED`).

`results` respons `200`:

```json
{ "token": "TKP-ABCDEFGH", "attempts": [ { "attemptId": "...", "type": "pretest", "setId": "...", "setNama": "...", "score": 6, "passed": false, "createdAt": "..." } ], "summary": { "byCategory": [ { "kategori": "...", "correct": 2, "total": 3 } ], "byType": { "posttest": { "attempts": 1, "bestScore": 9, "lastScore": 9, "passed": true } } } }
```

### Admin — Autentikasi

| Method | Path | Auth | Keterangan |
| --- | --- | --- | --- |
| POST | `/api/admin/auth/login` | - | Login admin |
| GET | `/api/admin/me` | admin | Profil admin aktif |

`login` body `{ username, password }` → `200 { token, admin: { id, username, role } }`; `401 INVALID_CREDENTIALS` bila gagal.

### Admin — Set Soal & Pertanyaan

Semua endpoint memerlukan auth admin.

| Method | Path | Keterangan |
| --- | --- | --- |
| GET | `/api/admin/sets` | Daftar set soal |
| POST | `/api/admin/sets` | Buat set |
| GET | `/api/admin/sets/:id` | Detail set |
| PATCH | `/api/admin/sets/:id` | Update set (parsial) |
| POST | `/api/admin/sets/:id/publish` | Terbitkan/jadwalkan (`status`: `terjadwal`\|`aktif`) |
| POST | `/api/admin/sets/:id/archive` | Arsipkan set |
| GET | `/api/admin/sets/:id/questions` | Daftar pertanyaan set |
| POST | `/api/admin/sets/:id/questions` | Tambah pertanyaan (maks 10 per set) |
| PATCH | `/api/admin/sets/:id/questions/:qid` | Update pertanyaan |
| DELETE | `/api/admin/sets/:id/questions/:qid` | Hapus pertanyaan |

### Admin — Kode Kelas

| Method | Path | Keterangan |
| --- | --- | --- |
| GET | `/api/admin/class-codes` | Daftar kode kelas (filter `active`, `q`) |
| POST | `/api/admin/class-codes` | Buat kode kelas |
| GET | `/api/admin/class-codes/:code` | Detail kode kelas |
| PATCH | `/api/admin/class-codes/:code` | Update kode kelas |
| POST | `/api/admin/class-codes/:code/deactivate` | Nonaktifkan (soft) |
| POST | `/api/admin/class-codes/:code/activate` | Aktifkan kembali |

### Admin — Statistik

| Method | Path | Keterangan |
| --- | --- | --- |
| GET | `/api/admin/stats/ringkasan` | Jumlah peserta, rata-rata pre/post, kenaikan, penyelesaian |
| GET | `/api/admin/stats/distribusi` | Distribusi skor per tipe |
| GET | `/api/admin/stats/soal-salah` | Soal paling banyak salah (paginasi) |
| GET | `/api/admin/stats/kategori-salah` | Kategori paling banyak salah (paginasi) |
| GET | `/api/admin/stats/kode-kelas` | Ringkasan per kode kelas (tanpa identitas peserta) |

Definisi metrik statistik didokumentasikan di [`src/controllers/adminStatsController.js`](src/controllers/adminStatsController.js:4).

## 10. Cakupan Test

Test saat ini mencakup: validasi skema (Zod) untuk seluruh endpoint, error path controller (404/400/401/403/409), otorisasi admin (`requireAdmin`), login admin, registrasi & pengambilan peserta, validasi kode kelas, CRUD kode kelas, modul, alur `start`/`submit` tes (termasuk kebocoran kunci & penilaian server), progres, hasil tes, statistik admin, pemilihan set/jadwal, scoring, migrasi, dan idempotensi seed.

Test ini memakai mock database; **belum** ada test end-to-end terhadap PostgreSQL nyata. Klaim "teruji" hanya berlaku untuk perilaku yang benar-benar dijalankan oleh suite di atas.
