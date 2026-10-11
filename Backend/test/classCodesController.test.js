import test from 'node:test';
import assert from 'node:assert/strict';
import { __setQueryImpl, pool } from '../src/config/db.js';
import {
  validateClassCode,
  listClassCodes,
  getClassCode,
  createClassCode,
  updateClassCode,
  deactivateClassCode,
  activateClassCode,
} from '../src/controllers/classCodesController.js';

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

const originalConnect = pool.connect.bind(pool);

function setQuery(impl) {
  __setQueryImpl(async (text, params) => impl(text, params));
}

function setClient(impl) {
  pool.connect = async () => ({
    query: async (text, params) => impl(text, params),
    release: () => {},
  });
}

test.after(() => {
  __setQueryImpl(null);
  pool.connect = originalConnect;
});

/* ---- Endpoint peserta ---- */

test('validateClassCode: kode aktif -> valid true', async () => {
  setQuery(async () => ({ rows: [{ code: 'PR-2312', label: 'RT 05' }] }));
  const res = mockRes();
  await validateClassCode({ body: { code: 'PR-2312' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.body.valid, true);
  assert.equal(res.body.code, 'PR-2312');
});

test('validateClassCode: kode tidak ada/nonaktif -> valid false', async () => {
  setQuery(async () => ({ rows: [] }));
  const res = mockRes();
  await validateClassCode({ body: { code: 'X' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.body.valid, false);
});

/* ---- List & detail ---- */

test('listClassCodes mengembalikan daftar terpetakan', async () => {
  setQuery(async () => ({
    rows: [
      { code: 'PR-2312', label: 'RT 05', active: true, created_at: 'x', jumlah_peserta: '2', jumlah_set: '1' },
    ],
  }));
  const res = mockRes();
  await listClassCodes({ query: { active: 'true' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.body.classCodes[0].code, 'PR-2312');
  assert.equal(res.body.classCodes[0].jumlahPeserta, 2);
});

test('getClassCode: tidak ditemukan -> 404 NOT_FOUND', async () => {
  setQuery(async () => ({ rows: [] }));
  const res = mockRes();
  await getClassCode({ params: { code: 'X' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.error.code, 'NOT_FOUND');
});

/* ---- Create ---- */

test('createClassCode: kode duplikat -> 409 DUPLICATE_CODE', async () => {
  setQuery(async () => ({ rows: [{ code: 'PR-2312' }] }));
  const res = mockRes();
  await createClassCode({ body: { code: 'PR-2312' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 409);
  assert.equal(res.body.error.code, 'DUPLICATE_CODE');
});

test('createClassCode: sukses -> 201', async () => {
  setQuery(async (text) => {
    if (text.includes('SELECT code FROM class_codes')) return { rows: [] };
    if (text.includes('SELECT set_id FROM set_class_codes')) return { rows: [] };
    return { rows: [] };
  });
  setClient(async (text) => {
    if (text.includes('INSERT INTO class_codes')) {
      return { rows: [{ code: 'PR-2312', label: 'RT 05', active: true, created_at: 'x' }] };
    }
    return { rows: [] };
  });
  const res = mockRes();
  await createClassCode({ body: { code: 'PR-2312', label: 'RT 05' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 201);
  assert.equal(res.body.classCode.code, 'PR-2312');
});

/* ---- Update & status ---- */

test('updateClassCode: tidak ditemukan -> 404', async () => {
  setQuery(async () => ({ rows: [] }));
  const res = mockRes();
  await updateClassCode({ params: { code: 'X' }, body: { active: false } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 404);
});

test('deactivateClassCode: tidak ditemukan -> 404', async () => {
  setQuery(async () => ({ rows: [] }));
  const res = mockRes();
  await deactivateClassCode({ params: { code: 'X' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 404);
});

test('activateClassCode: sukses -> active true', async () => {
  setQuery(async () => ({
    rows: [{ code: 'PR-2312', label: 'RT 05', active: true, created_at: 'x' }],
  }));
  const res = mockRes();
  await activateClassCode({ params: { code: 'PR-2312' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.body.classCode.active, true);
});
