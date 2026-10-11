import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createClassCodeSchema,
  updateClassCodeSchema,
  codeParamSchema,
  listClassCodesQuerySchema,
  validateClassCodeSchema,
} from '../src/controllers/classCodesController.js';
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

/* ---- Validasi format kode ---- */

test('createClassCodeSchema menerima kode valid dan menormalkan ke huruf besar', () => {
  const parsed = createClassCodeSchema.parse({ code: 'pr-2312', label: 'RT 05' });
  assert.equal(parsed.code, 'PR-2312');
  assert.equal(parsed.label, 'RT 05');
});

test('createClassCodeSchema menolak kode tidak valid (spasi, simbol, terlalu pendek)', () => {
  assert.equal(createClassCodeSchema.safeParse({ code: 'ab' }).success, false);
  assert.equal(createClassCodeSchema.safeParse({ code: 'PR 2312' }).success, false);
  assert.equal(createClassCodeSchema.safeParse({ code: 'PR@2312' }).success, false);
  assert.equal(createClassCodeSchema.safeParse({ code: '-PR2312' }).success, false);
});

test('createClassCodeSchema menerima setIds opsional', () => {
  const parsed = createClassCodeSchema.parse({ code: 'GURU-01', setIds: ['SET-1', 'SET-2'] });
  assert.deepEqual(parsed.setIds, ['SET-1', 'SET-2']);
});

test('updateClassCodeSchema menolak payload kosong', () => {
  assert.equal(updateClassCodeSchema.safeParse({}).success, false);
  assert.equal(updateClassCodeSchema.safeParse({ active: false }).success, true);
  assert.equal(updateClassCodeSchema.safeParse({ setIds: [] }).success, true);
});

test('codeParamSchema memvalidasi parameter route', () => {
  assert.equal(codeParamSchema.safeParse({ code: 'PR-2312' }).success, true);
  assert.equal(codeParamSchema.safeParse({ code: '' }).success, false);
});

test('listClassCodesQuerySchema menerima filter active/q', () => {
  assert.equal(listClassCodesQuerySchema.safeParse({ active: 'true' }).success, true);
  assert.equal(listClassCodesQuerySchema.safeParse({ active: 'all', q: 'guru' }).success, true);
  assert.equal(listClassCodesQuerySchema.safeParse({ active: 'yes' }).success, false);
});

test('validateClassCodeSchema (peserta) tetap menerima kode apa pun non-kosong', () => {
  assert.equal(validateClassCodeSchema.safeParse({ code: 'KOM-7821' }).success, true);
  assert.equal(validateClassCodeSchema.safeParse({ code: '' }).success, false);
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
