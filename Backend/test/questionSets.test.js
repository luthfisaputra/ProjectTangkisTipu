import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createSetSchema,
  updateSetSchema,
  publishSetSchema,
  createQuestionSchema,
  updateQuestionSchema,
  idParamSchema,
  questionParamSchema,
  MAKS_SOAL,
} from '../src/controllers/questionSetsController.js';
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

const setValid = {
  nama: 'Kuis Deteksi Undian Palsu',
  catatan: 'Penyusunan tim kurikulum',
  jalur: 'dewasa',
  tipe: 'pre',
  kodeKelas: 'PR-2312',
  rilis: '2026-08-14',
  tutup: '2026-09-14',
};

/* ---- Validasi payload set ---- */

test('createSetSchema menerima payload set valid', () => {
  const parsed = createSetSchema.parse(setValid);
  assert.equal(parsed.nama, setValid.nama);
  assert.equal(parsed.jalur, 'dewasa');
});

test('createSetSchema menolak nama kosong dan jalur/tipe tidak dikenal', () => {
  assert.equal(createSetSchema.safeParse({ ...setValid, nama: '  ' }).success, false);
  assert.equal(createSetSchema.safeParse({ ...setValid, jalur: 'remaja' }).success, false);
  assert.equal(createSetSchema.safeParse({ ...setValid, tipe: 'kuis' }).success, false);
});

test('createSetSchema menolak tanggal tutup sebelum rilis', () => {
  const hasil = createSetSchema.safeParse({ ...setValid, rilis: '2026-09-14', tutup: '2026-08-14' });
  assert.equal(hasil.success, false);
  assert.equal(hasil.error.issues[0].path[0], 'tutup');
});

test('createSetSchema menerima rilis/tutup kosong (draf)', () => {
  const hasil = createSetSchema.safeParse({ ...setValid, rilis: '', tutup: '' });
  assert.equal(hasil.success, true);
});

test('updateSetSchema menerima pembaruan parsial', () => {
  const hasil = updateSetSchema.safeParse({ nama: 'Judul Baru' });
  assert.equal(hasil.success, true);
});

/* ---- Transisi status / jadwal ---- */

test('publishSetSchema menerima status terjadwal/aktif dan menolak status lain', () => {
  assert.equal(publishSetSchema.safeParse({ status: 'terjadwal' }).success, true);
  assert.equal(publishSetSchema.safeParse({ status: 'aktif' }).success, true);
  assert.equal(publishSetSchema.safeParse({ status: 'draf' }).success, false);
});

test('publishSetSchema menolak jadwal tutup sebelum rilis', () => {
  const hasil = publishSetSchema.safeParse({ rilis: '2026-09-14', tutup: '2026-08-14' });
  assert.equal(hasil.success, false);
});

/* ---- Validasi payload pertanyaan ---- */

const soalValid = {
  kategori: 'Modus APK Palsu',
  pertanyaan: 'Pesan berisi file .apk dari nomor tak dikenal. Tindakan paling aman?',
  opsi: ['Pasang aplikasinya', 'Hapus pesan dan jangan buka lampiran', 'Teruskan ke kerabat', 'Balas pesan'],
  kunci: 1,
  ulasan: 'File .apk dari nomor tak dikenal adalah modus malware.',
};

test('createQuestionSchema menerima soal valid', () => {
  const parsed = createQuestionSchema.parse(soalValid);
  assert.equal(parsed.kunci, 1);
  assert.equal(parsed.opsi.length, 4);
});

test('createQuestionSchema menolak kunci di luar rentang opsi', () => {
  const hasil = createQuestionSchema.safeParse({ ...soalValid, kunci: 9 });
  assert.equal(hasil.success, false);
  assert.equal(hasil.error.issues[0].path[0], 'kunci');
});

test('createQuestionSchema menolak opsi kurang dari dua atau berisi kosong', () => {
  assert.equal(createQuestionSchema.safeParse({ ...soalValid, opsi: ['satu'] }).success, false);
  assert.equal(createQuestionSchema.safeParse({ ...soalValid, opsi: ['a', '  '] }).success, false);
});

test('createQuestionSchema menolak pertanyaan/kategori kosong', () => {
  assert.equal(createQuestionSchema.safeParse({ ...soalValid, pertanyaan: '' }).success, false);
  assert.equal(createQuestionSchema.safeParse({ ...soalValid, kategori: '   ' }).success, false);
});

test('updateQuestionSchema menerima pembaruan parsial', () => {
  assert.equal(updateQuestionSchema.safeParse({ kunci: 0 }).success, true);
  assert.equal(updateQuestionSchema.safeParse({}).success, true);
});

/* ---- Validasi parameter ---- */

test('idParamSchema dan questionParamSchema memvalidasi parameter route', () => {
  assert.equal(idParamSchema.safeParse({ id: 'SET-1' }).success, true);
  assert.equal(idParamSchema.safeParse({ id: '' }).success, false);
  assert.equal(questionParamSchema.safeParse({ id: 'SET-1', qid: 'Q-1' }).success, true);
  assert.equal(questionParamSchema.safeParse({ id: 'SET-1' }).success, false);
});

test('MAKS_SOAL sesuai PRD FR-05 (10 soal per set)', () => {
  assert.equal(MAKS_SOAL, 10);
});

/* ---- Akses tanpa autentikasi ---- */

test('requireAdmin menolak akses tanpa header Authorization', () => {
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

test('requireAdmin menolak token invalid', () => {
  const req = { headers: { authorization: 'Bearer token-palsu' } };
  const res = mockRes();
  let called = false;
  requireAdmin(req, res, () => {
    called = true;
  });
  assert.equal(called, false);
  assert.equal(res.statusCode, 401);
  assert.equal(res.body.error.code, 'INVALID_TOKEN');
});

test('requireAdmin menerima token admin valid', () => {
  const token = issueToken({ id: 'a1', username: 'admin', role: 'admin' });
  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = mockRes();
  let called = false;
  requireAdmin(req, res, () => {
    called = true;
  });
  assert.equal(called, true);
  assert.equal(req.admin.username, 'admin');
});
