import test from 'node:test';
import assert from 'node:assert/strict';
import { __setQueryImpl } from '../src/config/db.js';
import { login, me, loginSchema } from '../src/controllers/adminAuthController.js';
import { hashPassword } from '../src/services/adminAuthService.js';

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

function setQuery(impl) {
  __setQueryImpl(async (text, params) => impl(text, params));
}

test.after(() => __setQueryImpl(null));

test('loginSchema mewajibkan username dan password', () => {
  assert.equal(loginSchema.safeParse({ username: 'admin', password: 'x' }).success, true);
  assert.equal(loginSchema.safeParse({ username: '', password: 'x' }).success, false);
  assert.equal(loginSchema.safeParse({ username: 'admin' }).success, false);
});

test('login: kredensial salah -> 401 INVALID_CREDENTIALS', async () => {
  setQuery(async () => ({ rows: [] }));
  const res = mockRes();
  await login({ body: { username: 'admin', password: 'salah' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 401);
  assert.equal(res.body.error.code, 'INVALID_CREDENTIALS');
});

test('login: akun nonaktif -> 401', async () => {
  const hash = hashPassword('benar123');
  setQuery(async () => ({
    rows: [{ id: 'a1', username: 'admin', password_hash: hash, role: 'admin', active: false }],
  }));
  const res = mockRes();
  await login({ body: { username: 'admin', password: 'benar123' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 401);
  assert.equal(res.body.error.code, 'INVALID_CREDENTIALS');
});

test('login: kredensial benar -> 200 token dan admin tanpa hash', async () => {
  const hash = hashPassword('benar123');
  setQuery(async () => ({
    rows: [{ id: 'a1', username: 'admin', password_hash: hash, role: 'admin', active: true }],
  }));
  const res = mockRes();
  await login({ body: { username: 'admin', password: 'benar123' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 200);
  assert.ok(typeof res.body.token === 'string' && res.body.token.length > 0);
  assert.equal(res.body.admin.username, 'admin');
  assert.equal(res.body.admin.password_hash, undefined);
  assert.equal(res.body.admin.passwordHash, undefined);
});

test('me mengembalikan admin dari req.admin', () => {
  const res = mockRes();
  me({ admin: { id: 'a1', username: 'admin', role: 'admin' } }, res);
  assert.equal(res.body.admin.username, 'admin');
});
