import test from 'node:test';
import assert from 'node:assert/strict';
import {
  hashPassword,
  verifyPassword,
  issueToken,
  verifyToken,
} from '../src/services/adminAuthService.js';
import { requireAdmin } from '../src/middleware/requireAdmin.js';

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

test('hashPassword menghasilkan hash scrypt dan tidak menyimpan plaintext', () => {
  const hash = hashPassword('rahasia123');
  assert.match(hash, /^scrypt\$[0-9a-f]+\$[0-9a-f]+$/);
  assert.equal(hash.includes('rahasia123'), false);
});

test('verifyPassword benar untuk password cocok dan salah untuk yang tidak cocok', () => {
  const hash = hashPassword('rahasia123');
  assert.equal(verifyPassword('rahasia123', hash), true);
  assert.equal(verifyPassword('salah', hash), false);
  assert.equal(verifyPassword('rahasia123', 'bukan-hash'), false);
});

test('issueToken/verifyToken: token valid mengembalikan payload admin', () => {
  const admin = { id: 'a1', username: 'admin', role: 'admin' };
  const token = issueToken(admin);
  const payload = verifyToken(token);
  assert.equal(payload.sub, 'a1');
  assert.equal(payload.username, 'admin');
  assert.equal(payload.role, 'admin');
});

test('verifyToken menolak token invalid atau dimodifikasi', () => {
  assert.equal(verifyToken('token-palsu'), null);
  assert.equal(verifyToken(undefined), null);
  const token = issueToken({ id: 'a1', username: 'admin', role: 'admin' });
  const tampered = `${token.split('.')[0]}.xxxxx`;
  assert.equal(verifyToken(tampered), null);
});

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

test('requireAdmin menerima token valid dan mengisi req.admin', () => {
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
