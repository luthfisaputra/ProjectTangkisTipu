import test from 'node:test';
import assert from 'node:assert/strict';
import { __setQueryImpl } from '../src/config/db.js';
import { getProgress, updateProgress, updateProgressSchema } from '../src/controllers/progressController.js';
import { getResults } from '../src/controllers/testsController.js';

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

let calls = [];
function setQuery(impl) {
  calls = [];
  __setQueryImpl(async (text, params) => {
    calls.push({ text, params });
    return impl(text, params);
  });
}

test.after(() => __setQueryImpl(null));

/* ---- Peserta tidak ditemukan ---- */

test('getProgress: token tidak dikenal -> 404 NOT_FOUND', async () => {
  setQuery(async () => ({ rows: [] }));
  const res = mockRes();
  await getProgress({ params: { token: 'TKP-ABCDEFGH' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.error.code, 'NOT_FOUND');
});

test('updateProgress: peserta tidak ditemukan -> 404 dan tidak menulis', async () => {
  setQuery(async () => ({ rows: [] }));
  const res = mockRes();
  await updateProgress(
    { params: { token: 'TKP-ABCDEFGH' }, body: { modusDibaca: 3 } },
    res,
    (e) => {
      throw e;
    },
  );
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.error.code, 'NOT_FOUND');
  assert.equal(calls.length, 1);
});

test('getResults: peserta tidak ditemukan -> 404 NOT_FOUND', async () => {
  setQuery(async () => ({ rows: [] }));
  const res = mockRes();
  await getResults({ params: { token: 'TKP-ABCDEFGH' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.error.code, 'NOT_FOUND');
});

/* ---- Progres kosong ---- */

test('getProgress: belum ada baris progres -> nilai default 0', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1' }] };
    return { rows: [] };
  });
  const res = mockRes();
  await getProgress({ params: { token: 'TKP-ABCDEFGH' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body.progress, {
    pretest: 0,
    modusDibaca: 0,
    skenario: 0,
    posttest: 0,
    updatedAt: null,
  });
});

/* ---- Update parsial ---- */

test('updateProgressSchema menerima payload parsial dan menolak field asing', () => {
  assert.equal(updateProgressSchema.safeParse({ modusDibaca: 2 }).success, true);
  assert.equal(updateProgressSchema.safeParse({ skenario: 5 }).success, true);
  assert.equal(updateProgressSchema.safeParse({}).success, true);
  assert.equal(updateProgressSchema.safeParse({ pretest: 9 }).success, false);
  assert.equal(updateProgressSchema.safeParse({ modusDibaca: 99 }).success, false);
});

test('updateProgress: hanya field yang dikirim yang diubah (parsial)', async () => {
  let capturedParams = null;
  setQuery(async (text, params) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1' }] };
    capturedParams = params;
    return {
      rows: [
        { pretest_score: 7, modus_dibaca: 4, skenario: 2, posttest_score: null, updated_at: 'now' },
      ],
    };
  });
  const res = mockRes();
  await updateProgress(
    { params: { token: 'TKP-ABCDEFGH' }, body: { modusDibaca: 4 } },
    res,
    (e) => {
      throw e;
    },
  );
  assert.equal(res.statusCode, 200);
  assert.equal(capturedParams[1], 4);
  assert.equal(capturedParams[2], null);
  assert.equal(res.body.progress.skenario, 2);
});

/* ---- Pencegahan penurunan progres ---- */

test('updateProgress: nilai lebih rendah tidak menurunkan progres (GREATEST)', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1' }] };
    return {
      rows: [
        { pretest_score: 7, modus_dibaca: 6, skenario: 5, posttest_score: null, updated_at: 'now' },
      ],
    };
  });
  const res = mockRes();
  await updateProgress(
    { params: { token: 'TKP-ABCDEFGH' }, body: { modusDibaca: 3, skenario: 5 } },
    res,
    (e) => {
      throw e;
    },
  );
  assert.equal(res.body.progress.modusDibaca, 6);
  assert.equal(res.body.progress.skenario, 5);
});

/* ---- Pengambilan hasil tes ---- */

test('getResults: hanya attempt milik peserta dengan score terisi, plus ringkasan per tipe', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1', track: 1 }] };
    if (text.includes('FROM test_attempts ta')) {
      return {
        rows: [
          {
            id: 'a1',
            type: 'pretest',
            set_id: 'SET-1',
            set_nama: 'Pre Dewasa',
            score: 6,
            passed: false,
            created_at: '2026-10-01T00:00:00Z',
          },
          {
            id: 'a2',
            type: 'posttest',
            set_id: 'SET-2',
            set_nama: 'Post Dewasa',
            score: 9,
            passed: true,
            created_at: '2026-10-05T00:00:00Z',
          },
        ],
      };
    }
    return { rows: [{ kategori: 'phishing', total: 3, correct: 2 }] };
  });
  const res = mockRes();
  await getResults({ params: { token: 'TKP-ABCDEFGH' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.token, 'TKP-ABCDEFGH');
  assert.equal(res.body.attempts.length, 2);
  assert.equal(res.body.attempts[0].setNama, 'Pre Dewasa');
  assert.equal(res.body.summary.byCategory[0].correct, 2);
  assert.equal(res.body.summary.byType.posttest.bestScore, 9);
  assert.equal(res.body.summary.byType.posttest.passed, true);
  assert.equal(res.body.summary.byType.pretest.passed, false);
});

test('getResults: peserta tanpa attempt -> daftar kosong dan ringkasan kosong', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1', track: 1 }] };
    return { rows: [] };
  });
  const res = mockRes();
  await getResults({ params: { token: 'TKP-ABCDEFGH' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body.attempts, []);
  assert.deepEqual(res.body.summary.byCategory, []);
  assert.deepEqual(res.body.summary.byType, {});
});
