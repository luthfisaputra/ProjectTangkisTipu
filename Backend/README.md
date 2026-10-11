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

Variabel yang dibutuhkan:

| Variabel | Wajib | Default | Keterangan |
| --- | --- | --- | --- |
| `PORT` | tidak | `3000` | Port server |
| `DATABASE_URL` | ya | - | Koneksi PostgreSQL |
| `NODE_ENV` | tidak | `development` | `development` / `production` / `test` |
| `CORS_ORIGIN` | tidak | `*` | Origin frontend yang diizinkan |
| `RATE_LIMIT_WINDOW_MS` | tidak | `60000` | Jendela rate limit (ms) |
| `RATE_LIMIT_MAX` | tidak | `100` | Maks request per jendela |
| `RATE_LIMIT_TOKEN_FAIL_MAX` | tidak | `10` | Maks respons gagal (status >= 400) per jendela untuk endpoint token |
| `TRUST_PROXY` | tidak | `0` | Jumlah hop proxy tepercaya (`app.set('trust proxy')` bila > 0) |

Contoh `.env`:

```env
PORT=3000
DATABASE_URL=postgres://NAMA_USER:PASSWORD@localhost:5432/tangkistipu
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
RATE_LIMIT_TOKEN_FAIL_MAX=10
TRUST_PROXY=0
```

## 3. Migrasi

```bash
node src/db/migrate.js
```

## 4. Seed

```bash
node src/db/seed-class-codes.js
node src/db/seed-questions.js
```

## 5. Menjalankan Server

```bash
npm run dev    # development (nodemon)
npm start      # production
```

Cek kesehatan: `GET http://localhost:3000/health` → `{ "status": "ok" }`.

## 6. Daftar Endpoint

Base URL: `http://localhost:3000`

### Health

```bash
curl http://localhost:3000/health
```

### Participants

Registrasi peserta anonim:

```bash
curl -X POST http://localhost:3000/api/participants \
  -H "Content-Type: application/json" \
  -d '{"nama":"Budi","kelas":"9A","classCode":"DEMO2024"}'
```

Ambil profil peserta berdasarkan token:

```bash
curl http://localhost:3000/api/participants/<token>
```

### Class Codes

Validasi kode kelas:

```bash
curl -X POST http://localhost:3000/api/class-codes/validate \
  -H "Content-Type: application/json" \
  -d '{"code":"DEMO2024"}'
```

### Modules

Daftar modul:

```bash
curl http://localhost:3000/api/modules
```

Detail modul:

```bash
curl http://localhost:3000/api/modules/1
```

### Progress

Ambil progres peserta:

```bash
curl http://localhost:3000/api/progress/<token>
```

Update progres peserta:

```bash
curl -X PATCH http://localhost:3000/api/progress/<token> \
  -H "Content-Type: application/json" \
  -d '{"pretest":80,"modusDibaca":["modus-1"],"skenario":["skenario-1"],"posttest":90}'
```

### Tests

Mulai tes (`type`: `pretest` atau `posttest`):

```bash
curl -X POST http://localhost:3000/api/tests/pretest/start \
  -H "Content-Type: application/json" \
  -d '{"token":"<token>"}'
```

Kirim jawaban tes:

```bash
curl -X POST http://localhost:3000/api/tests/pretest/submit \
  -H "Content-Type: application/json" \
  -d '{"token":"<token>","attemptId":"<attemptId>","answers":[{"questionId":1,"answer":"A"}]}'
```

Riwayat hasil tes:

```bash
curl http://localhost:3000/api/tests/<token>/results
```
