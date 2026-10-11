import test from 'node:test';
import assert from 'node:assert/strict';
import { __setQueryImpl } from '../src/config/db.js';
import { startTest, submitTest } from '../src/controllers/testsController.js';

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

// withTransaction memakai pool.connect(); kita tidak bisa memakai DB nyata.
// Untuk submitTest, kita suntikkan client palsu lewat pool.connect.
import { pool } from '../src/config/db.js';

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

const SET_AKTIF = {
  id: 'SET-1',
  nama: 'Pre Dewasa',
  jalur: 'dewasa',
  tipe: 'pre',
  status: 'aktif',
  rilis_at: '2026-01-01',
  tutup_at: '2026-12-31',
  created_at: '2026-01-01T00:00:00Z',
};

const SOAL = [
  { id: 'Q1', kategori: 'OTP', pertanyaan: 'p1', opsi: ['a', 'b', 'c'], kunci: 1, penjelasan: 'e1', kasus_nyata: 'k1' },
  { id: 'Q2', kategori: 'OTP', pertanyaan: 'p2', opsi: ['a', 'b'], kunci: 0, penjelasan: 'e2', kasus_nyata: 'k2' },
];

/* ---- startTest ---- */

test('startTest: peserta tidak ditemukan -> 404 NOT_FOUND', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [] };
    return { rows: [] };
  });
  const res = mockRes();
  await startTest({ params: { type: 'pretest' }, body: { token: 'TKP-ABCDEFGH' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.error.code, 'NOT_FOUND');
});

test('startTest: set tidak tersedia -> 404 SET_NOT_AVAILABLE', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1', track: 1 }] };
    if (text.includes('FROM question_sets')) return { rows: [] };
    return { rows: [] };
  });
  const res = mockRes();
  await startTest({ params: { type: 'pretest' }, body: { token: 'TKP-ABCDEFGH' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.error.code, 'SET_NOT_AVAILABLE');
});

test('startTest: sukses -> 201 tanpa field kunci pada soal', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1', track: 1 }] };
    if (text.includes('FROM question_sets')) return { rows: [SET_AKTIF] };
    if (text.includes('FROM test_attempts')) return { rows: [] };
    if (text.includes('FROM questions')) {
      return { rows: SOAL.map(({ kunci, penjelasan, kasus_nyata, ...rest }) => rest) };
    }
    if (text.includes('INSERT INTO test_attempts')) return { rows: [{ id: 'a1' }] };
    return { rows: [] };
  });
  const res = mockRes();
  await startTest({ params: { type: 'pretest' }, body: { token: 'TKP-ABCDEFGH' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 201);
  assert.equal(res.body.attemptId, 'a1');
  assert.equal(res.body.setId, 'SET-1');
  for (const q of res.body.questions) {
    assert.equal(Object.prototype.hasOwnProperty.call(q, 'kunci'), false);
    assert.equal(Object.prototype.hasOwnProperty.call(q, 'penjelasan'), false);
  }
});

/* ---- startTest dengan setId eksplisit: status & jadwal wajib ditegakkan ---- */

test('startTest: setId draf -> 404 SET_NOT_AVAILABLE', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1', track: 1 }] };
    if (text.includes('FROM question_sets')) return { rows: [{ ...SET_AKTIF, status: 'draf' }] };
    return { rows: [] };
  });
  const res = mockRes();
  await startTest(
    { params: { type: 'pretest' }, body: { token: 'TKP-ABCDEFGH', setId: 'SET-1' } },
    res,
    (e) => {
      throw e;
    },
  );
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.error.code, 'SET_NOT_AVAILABLE');
});

test('startTest: setId terjadwal (belum rilis) -> 404 SET_NOT_AVAILABLE', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1', track: 1 }] };
    if (text.includes('FROM question_sets')) {
      return { rows: [{ ...SET_AKTIF, status: 'terjadwal', rilis_at: '2099-01-01' }] };
    }
    return { rows: [] };
  });
  const res = mockRes();
  await startTest(
    { params: { type: 'pretest' }, body: { token: 'TKP-ABCDEFGH', setId: 'SET-1' } },
    res,
    (e) => {
      throw e;
    },
  );
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.error.code, 'SET_NOT_AVAILABLE');
});

test('startTest: setId sudah tutup -> 404 SET_NOT_AVAILABLE', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1', track: 1 }] };
    if (text.includes('FROM question_sets')) {
      return { rows: [{ ...SET_AKTIF, tutup_at: '2000-01-01' }] };
    }
    return { rows: [] };
  });
  const res = mockRes();
  await startTest(
    { params: { type: 'pretest' }, body: { token: 'TKP-ABCDEFGH', setId: 'SET-1' } },
    res,
    (e) => {
      throw e;
    },
  );
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.error.code, 'SET_NOT_AVAILABLE');
});

test('startTest: setId aktif & dalam jadwal -> 201', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1', track: 1 }] };
    if (text.includes('FROM question_sets')) return { rows: [SET_AKTIF] };
    if (text.includes('FROM test_attempts')) return { rows: [] };
    if (text.includes('FROM questions')) {
      return { rows: SOAL.map(({ kunci, penjelasan, kasus_nyata, ...rest }) => rest) };
    }
    if (text.includes('INSERT INTO test_attempts')) return { rows: [{ id: 'a1' }] };
    return { rows: [] };
  });
  const res = mockRes();
  await startTest(
    { params: { type: 'pretest' }, body: { token: 'TKP-ABCDEFGH', setId: 'SET-1' } },
    res,
    (e) => {
      throw e;
    },
  );
  assert.equal(res.statusCode, 201);
  assert.equal(res.body.setId, 'SET-1');
});

test('startTest: posttest sudah disubmit -> 409 ATTEMPT_LIMIT_REACHED', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1', track: 1 }] };
    if (text.includes('FROM question_sets')) {
      return { rows: [{ ...SET_AKTIF, tipe: 'post' }] };
    }
    if (text.includes('FROM test_attempts')) {
      return { rows: [{ id: 'a1', set_id: 'SET-1', type: 'posttest', score: 8, created_at: 'x' }] };
    }
    return { rows: [] };
  });
  const res = mockRes();
  await startTest({ params: { type: 'posttest' }, body: { token: 'TKP-ABCDEFGH' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 409);
  assert.equal(res.body.error.code, 'ATTEMPT_LIMIT_REACHED');
});

/* ---- submitTest ---- */

test('submitTest: peserta tidak ditemukan -> 404 NOT_FOUND', async () => {
  setQuery(async () => ({ rows: [] }));
  const res = mockRes();
  await submitTest(
    {
      params: { type: 'pretest' },
      body: { attemptId: '11111111-1111-1111-1111-111111111111', token: 'TKP-ABCDEFGH', answers: [{ questionId: 'Q1', selectedOption: 1 }] },
    },
    res,
    (e) => {
      throw e;
    },
  );
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.error.code, 'NOT_FOUND');
});

test('submitTest: attempt bukan milik peserta -> 403 FORBIDDEN', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1', track: 1 }] };
    return { rows: [] };
  });
  setClient(async (text) => {
    if (text.includes('FROM test_attempts')) {
      return { rows: [{ id: 'a1', participant_id: 'p2', type: 'pretest', set_id: 'SET-1', score: null }] };
    }
    return { rows: [] };
  });
  const res = mockRes();
  await submitTest(
    {
      params: { type: 'pretest' },
      body: { attemptId: '11111111-1111-1111-1111-111111111111', token: 'TKP-ABCDEFGH', answers: [{ questionId: 'Q1', selectedOption: 1 }] },
    },
    res,
    (e) => {
      throw e;
    },
  );
  assert.equal(res.statusCode, 403);
  assert.equal(res.body.error.code, 'FORBIDDEN');
});

test('submitTest: attempt sudah disubmit -> 409 ALREADY_SUBMITTED', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1', track: 1 }] };
    return { rows: [] };
  });
  setClient(async (text) => {
    if (text.includes('FROM test_attempts')) {
      return { rows: [{ id: 'a1', participant_id: 'p1', type: 'pretest', set_id: 'SET-1', score: 7 }] };
    }
    return { rows: [] };
  });
  const res = mockRes();
  await submitTest(
    {
      params: { type: 'pretest' },
      body: { attemptId: '11111111-1111-1111-1111-111111111111', token: 'TKP-ABCDEFGH', answers: [{ questionId: 'Q1', selectedOption: 1 }] },
    },
    res,
    (e) => {
      throw e;
    },
  );
  assert.equal(res.statusCode, 409);
  assert.equal(res.body.error.code, 'ALREADY_SUBMITTED');
});

test('submitTest: jawaban duplikat -> 400 INVALID_ANSWERS', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1', track: 1 }] };
    return { rows: [] };
  });
  setClient(async (text) => {
    if (text.includes('FROM test_attempts')) {
      return { rows: [{ id: 'a1', participant_id: 'p1', type: 'pretest', set_id: 'SET-1', score: null }] };
    }
    if (text.includes('FROM question_sets')) return { rows: [{ id: 'SET-1', status: 'aktif', rilis_at: null, tutup_at: null }] };
    if (text.includes('FROM questions')) return { rows: SOAL };
    return { rows: [] };
  });
  const res = mockRes();
  await submitTest(
    {
      params: { type: 'pretest' },
      body: {
        attemptId: '11111111-1111-1111-1111-111111111111',
        token: 'TKP-ABCDEFGH',
        answers: [
          { questionId: 'Q1', selectedOption: 1 },
          { questionId: 'Q1', selectedOption: 0 },
        ],
      },
    },
    res,
    (e) => {
      throw e;
    },
  );
  assert.equal(res.statusCode, 400);
  assert.equal(res.body.error.code, 'INVALID_ANSWERS');
});

test('submitTest: sukses -> 200 skor dihitung server dan penjelasan dikirim', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM participants')) return { rows: [{ id: 'p1', track: 1 }] };
    return { rows: [] };
  });
  setClient(async (text) => {
    if (text.includes('FROM test_attempts')) {
      return { rows: [{ id: 'a1', participant_id: 'p1', type: 'pretest', set_id: 'SET-1', score: null }] };
    }
    if (text.includes('FROM question_sets')) return { rows: [{ id: 'SET-1', status: 'aktif', rilis_at: null, tutup_at: null }] };
    if (text.includes('FROM questions')) return { rows: SOAL };
    if (text.includes('UPDATE test_attempts')) return { rows: [{ id: 'a1' }] };
    return { rows: [] };
  });
  const res = mockRes();
  await submitTest(
    {
      params: { type: 'pretest' },
      body: {
        attemptId: '11111111-1111-1111-1111-111111111111',
        token: 'TKP-ABCDEFGH',
        answers: [
          { questionId: 'Q1', selectedOption: 1 },
          { questionId: 'Q2', selectedOption: 1 },
        ],
      },
    },
    res,
    (e) => {
      throw e;
    },
  );
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.score, 1);
  assert.equal(res.body.total, 2);
  assert.equal(res.body.details[0].penjelasan, 'e1');
  assert.equal(res.body.details[0].kasusNyata, 'k1');
});
