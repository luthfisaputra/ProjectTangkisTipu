// Integration smoke test: tidak menyentuh database.
// Menguji GET /health dan proteksi endpoint admin tanpa token (harus 401).
// Dijalankan hanya via `npm run test:integration` (opt-in).
import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'node:http';

import app from '../../src/app.js';

function startServer() {
  return new Promise((resolve) => {
    const server = app.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

function httpGet(port, path, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = request.request(
      { host: '127.0.0.1', port, path, method: 'GET', headers },
      (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          let json = null;
          try {
            json = JSON.parse(body);
          } catch {
            json = null;
          }
          resolve({ status: res.statusCode, body: json, raw: body });
        });
      },
    );
    req.on('error', reject);
    req.end();
  });
}

test('GET /health mengembalikan 200 { status: "ok" }', async () => {
  const { server, port } = await startServer();
  try {
    const res = await httpGet(port, '/health');
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, { status: 'ok' });
  } finally {
    server.close();
  }
});

test('endpoint admin tanpa token harus 401 UNAUTHORIZED', async () => {
  const { server, port } = await startServer();
  try {
    const res = await httpGet(port, '/api/admin/stats/ringkasan');
    assert.equal(res.status, 401);
    assert.equal(res.body?.error?.code, 'UNAUTHORIZED');
  } finally {
    server.close();
  }
});

test('endpoint admin dengan token tidak valid harus 401 INVALID_TOKEN', async () => {
  const { server, port } = await startServer();
  try {
    const res = await httpGet(port, '/api/admin/stats/ringkasan', {
      Authorization: 'Bearer token-palsu',
    });
    assert.equal(res.status, 401);
    assert.equal(res.body?.error?.code, 'INVALID_TOKEN');
  } finally {
    server.close();
  }
});
