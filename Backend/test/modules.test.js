import test from 'node:test';
import assert from 'node:assert/strict';
import {
  listModules,
  getModule,
  moduleIdParamSchema,
} from '../src/controllers/modulesController.js';

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

test('listModules mengembalikan daftar modul statis', () => {
  const res = mockRes();
  listModules({}, res);
  assert.equal(res.statusCode, 200);
  assert.ok(Array.isArray(res.body.modules));
  assert.ok(res.body.modules.length >= 1);
});

test('getModule: id dikenal -> 200', () => {
  const res = mockRes();
  getModule({ params: { id: 'pelajar-01' } }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.module.id, 'pelajar-01');
});

test('getModule: id tidak dikenal -> 404 NOT_FOUND', () => {
  const res = mockRes();
  getModule({ params: { id: 'tidak-ada' } }, res);
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.error.code, 'NOT_FOUND');
});

test('moduleIdParamSchema menolak id kosong', () => {
  assert.equal(moduleIdParamSchema.safeParse({ id: 'pelajar-01' }).success, true);
  assert.equal(moduleIdParamSchema.safeParse({ id: '' }).success, false);
});
