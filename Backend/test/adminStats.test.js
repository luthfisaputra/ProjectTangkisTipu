import test from 'node:test';
import assert from 'node:assert/strict';
import { __setQueryImpl } from '../src/config/db.js';
import {
  getRingkasan,
  getDistribusi,
  getSoalSalah,
  getKategoriSalah,
  getRingkasanKodeKelas,
  statsQuerySchema,
  listQuerySchema,
} from '../src/controllers/adminStatsController.js';
import { requireAdmin } from '../src/middleware/requireAdmin.js';
import { issueToken } from '../src/services/adminAuthService.js';

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

// Dataset kecil: 3 peserta, 2 pretest + 2 posttest tersubmit.
// Peserta A: pre 4, post 8. Peserta B: pre 6, post 10. Peserta C: hanya pre 5.
const DATASET = {
  peserta: 3,
  skor: [
    { type: 'pretest', jumlah_attempt: 3, jumlah_peserta: 3, rata_rata: '5.0000000000000000' },
    { type: 'posttest', jumlah_attempt: 2, jumlah_peserta: 2, rata_rata: '9.0000000000000000' },
  ],
  distribusi: [
    { type: 'pretest', score: 4, jumlah: 1 },
    { type: 'pretest', score: 5, jumlah: 1 },
    { type: 'pretest', score: 6, jumlah: 1 },
    { type: 'posttest', score: 8, jumlah: 1 },
    { type: 'posttest', score: 10, jumlah: 1 },
  ],
  soal: [
    { id: 'Q1', kategori: 'APK Palsu', salah: 2, dijawab: 3 },
    { id: 'Q2', kategori: 'OTP', salah: 1, dijawab: 3 },
  ],
  kategori: [
    { kategori: 'APK Palsu', salah: 2, dijawab: 3 },
    { kategori: 'OTP', salah: 1, dijawab: 3 },
  ],
  kodeKelas: [
    {
      code: 'PR-2312',
      label: 'Kelas Percontohan',
      active: true,
      jumlah_peserta: 2,
      pre_selesai: 2,
      post_selesai: 1,
      pre_rata: '5.0000000000000000',
      post_rata: '8.0000000000000000',
    },
  ],
};

function fakeQuery(text) {
  if (text.includes('COUNT(*)::int AS jumlah FROM participants')) {
    return Promise.resolve({ rows: [{ jumlah: DATASET.peserta }] });
  }
  if (text.includes('AVG(a.score)::numeric AS rata_rata')) {
    return Promise.resolve({ rows: DATASET.skor });
  }
  if (text.includes('GROUP BY a.type, a.score')) {
    return Promise.resolve({ rows: DATASET.distribusi });
  }
  if (text.includes('GROUP BY q.id, q.kategori')) {
    return Promise.resolve({ rows: DATASET.soal });
  }
  if (text.includes('GROUP BY COALESCE(q.kategori')) {
    return Promise.resolve({ rows: DATASET.kategori });
  }
  if (text.includes('FROM class_codes c')) {
    return Promise.resolve({ rows: DATASET.kodeKelas });
  }
  return Promise.resolve({ rows: [] });
}

async function jalankan(handler, req) {
  __setQueryImpl(fakeQuery);
  const res = mockRes();
  let err = null;
  await handler(req, res, (e) => {
    err = e;
  });
  __setQueryImpl(null);
  if (err) throw err;
  return res;
}

/* ---- Agregasi ringkasan ---- */

test('getRingkasan menghitung rata-rata, kenaikan, dan penyelesaian', async () => {
  const res = await jalankan(getRingkasan, { query: {} });
  const r = res.body.ringkasan;
  assert.equal(r.jumlahPeserta, 3);
  assert.equal(r.pretest.rataRata, 5);
  assert.equal(r.posttest.rataRata, 9);
  assert.equal(r.kenaikanRataRata, 4);
  assert.equal(r.penyelesaian.pesertaPretestSelesai, 3);
  assert.equal(r.penyelesaian.pesertaPosttestSelesai, 2);
  assert.equal(r.penyelesaian.persenPenyelesaianPosttest, 66.7);
});

test('getRingkasan mengembalikan null bila belum ada attempt tersubmit', async () => {
  __setQueryImpl((text) => {
    if (text.includes('COUNT(*)::int AS jumlah FROM participants')) {
      return Promise.resolve({ rows: [{ jumlah: 0 }] });
    }
    return Promise.resolve({ rows: [] });
  });
  const res = mockRes();
  await getRingkasan({ query: {} }, res, (e) => {
    if (e) throw e;
  });
  __setQueryImpl(null);
  assert.equal(res.body.ringkasan.pretest.rataRata, null);
  assert.equal(res.body.ringkasan.kenaikanRataRata, null);
  assert.equal(res.body.ringkasan.penyelesaian.persenPenyelesaianPosttest, 0);
});

/* ---- Distribusi ---- */

test('getDistribusi mengelompokkan attempt per bucket skor', async () => {
  const res = await jalankan(getDistribusi, { query: {} });
  assert.equal(res.body.distribusi.pretest.length, 3);
  assert.equal(res.body.distribusi.posttest.length, 2);
  assert.deepEqual(res.body.distribusi.posttest[1], { skor: 10, jumlah: 1 });
});

/* ---- Soal & kategori salah ---- */

test('getSoalSalah menghitung persen salah dan memaginasi', async () => {
  const res = await jalankan(getSoalSalah, { query: { page: 1, limit: 20 } });
  assert.equal(res.body.soal.length, 2);
  assert.equal(res.body.soal[0].questionId, 'Q1');
  assert.equal(res.body.soal[0].persenSalah, 66.7);
  assert.equal(res.body.page, 1);
});

test('getKategoriSalah mengagregasi per kategori', async () => {
  const res = await jalankan(getKategoriSalah, { query: { page: 1, limit: 20 } });
  assert.equal(res.body.kategori[0].kategori, 'APK Palsu');
  assert.equal(res.body.kategori[0].salah, 2);
});

/* ---- Ringkasan kode kelas ---- */

test('getRingkasanKodeKelas tidak mengekspos identitas peserta', async () => {
  const res = await jalankan(getRingkasanKodeKelas, { query: { page: 1, limit: 20 } });
  const k = res.body.kodeKelas[0];
  assert.equal(k.code, 'PR-2312');
  assert.equal(k.jumlahPeserta, 2);
  assert.equal(k.persenPenyelesaianPosttest, 50);
  assert.equal(k.nickname, undefined);
  assert.equal(k.token, undefined);
});

/* ---- Validasi query ---- */

test('statsQuerySchema memvalidasi filter dan paginasi', () => {
  assert.equal(statsQuerySchema.safeParse({}).success, true);
  assert.equal(statsQuerySchema.safeParse({ jalur: 'dewasa', page: '2', limit: '10' }).success, true);
  assert.equal(statsQuerySchema.safeParse({ jalur: 'remaja' }).success, false);
  assert.equal(statsQuerySchema.safeParse({ limit: '999' }).success, false);
});

test('listQuerySchema default page/limit', () => {
  const parsed = listQuerySchema.parse({});
  assert.equal(parsed.page, 1);
  assert.equal(parsed.limit, 20);
});

/* ---- Akses tanpa admin ---- */

test('requireAdmin menolak akses statistik tanpa header Authorization', () => {
  const req = { headers: {} };
  const res = mockRes();
  let called = false;
  requireAdmin(req, res, () => {
    called = true;
  });
  assert.equal(called, false);
  assert.equal(res.statusCode, 401);
  assert.equal(res.body.error.code, 'UNAUTHORIZED');
});

test('requireAdmin menerima token admin valid untuk statistik', () => {
  const token = issueToken({ id: 'a1', username: 'admin', role: 'admin' });
  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = mockRes();
  let called = false;
  requireAdmin(req, res, () => {
    called = true;
  });
  assert.equal(called, true);
});
