import test from 'node:test';
import assert from 'node:assert/strict';
import { __setQueryImpl } from '../src/config/db.js';
import {
  createParticipant,
  getParticipant,
  createParticipantSchema,
  tokenParamSchema,
} from '../src/controllers/participantsController.js';

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

/* ---- Validasi skema ---- */

test('createParticipantSchema menerima payload minimal dan menormalkan track', () => {
  assert.equal(createParticipantSchema.safeParse({}).success, true);
  const parsed = createParticipantSchema.parse({ nickname: 'Budi', track: '2' });
  assert.equal(parsed.track, 2);
  assert.equal(parsed.nickname, 'Budi');
});

test('createParticipantSchema menolak track di luar 0-2 dan nickname kosong', () => {
  assert.equal(createParticipantSchema.safeParse({ track: 3 }).success, false);
  assert.equal(createParticipantSchema.safeParse({ track: -1 }).success, false);
  assert.equal(createParticipantSchema.safeParse({ nickname: '' }).success, false);
});

test('tokenParamSchema menolak format token salah', () => {
  assert.equal(tokenParamSchema.safeParse({ token: 'TKP-ABCDEFGH' }).success, true);
  assert.equal(tokenParamSchema.safeParse({ token: 'TKP-abc' }).success, false);
  assert.equal(tokenParamSchema.safeParse({ token: 'ABC-12345678' }).success, false);
});

/* ---- Registrasi peserta ---- */

test('createParticipant: tanpa kode kelas -> 201 dan token dibuat', async () => {
  setQuery(async (text) => {
    if (text.includes('SELECT 1 FROM participants')) return { rows: [] };
    if (text.includes('INSERT INTO participants')) {
      return {
        rows: [
          {
            id: 'p1',
            token: 'TKP-ABCDEFGH',
            nickname: 'Budi',
            track: 1,
            class_code: null,
            created_at: '2026-10-11T00:00:00Z',
          },
        ],
      };
    }
    return { rows: [] };
  });
  const res = mockRes();
  await createParticipant({ body: { nickname: 'Budi' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 201);
  assert.equal(res.body.token, 'TKP-ABCDEFGH');
  assert.equal(res.body.participant.track, 1);
  assert.equal(res.body.participant.classCode, null);
});

test('createParticipant: kode kelas tidak valid -> 400 INVALID_CLASS_CODE', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM class_codes')) return { rows: [] };
    return { rows: [] };
  });
  const res = mockRes();
  await createParticipant({ body: { classCode: 'TIDAK-ADA' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 400);
  assert.equal(res.body.error.code, 'INVALID_CLASS_CODE');
});

test('createParticipant: kode kelas valid -> tersimpan', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM class_codes')) return { rows: [{ code: 'PR-2312' }] };
    if (text.includes('SELECT 1 FROM participants')) return { rows: [] };
    if (text.includes('INSERT INTO participants')) {
      return {
        rows: [
          {
            id: 'p2',
            token: 'TKP-ABCDEFGH',
            nickname: null,
            track: 1,
            class_code: 'PR-2312',
            created_at: '2026-10-11T00:00:00Z',
          },
        ],
      };
    }
    return { rows: [] };
  });
  const res = mockRes();
  await createParticipant({ body: { classCode: 'PR-2312' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 201);
  assert.equal(res.body.participant.classCode, 'PR-2312');
});

/* ---- Ambil peserta ---- */

test('getParticipant: token tidak dikenal -> 404 NOT_FOUND', async () => {
  setQuery(async () => ({ rows: [] }));
  const res = mockRes();
  await getParticipant({ params: { token: 'TKP-ABCDEFGH' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.error.code, 'NOT_FOUND');
});

test('getParticipant: token dikenal -> 200 dengan data peserta', async () => {
  setQuery(async () => ({
    rows: [
      {
        id: 'p1',
        token: 'TKP-ABCDEFGH',
        nickname: 'Sari',
        track: 0,
        class_code: null,
        created_at: '2026-10-11T00:00:00Z',
      },
    ],
  }));
  const res = mockRes();
  await getParticipant({ params: { token: 'TKP-ABCDEFGH' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.participant.nickname, 'Sari');
  assert.equal(res.body.participant.track, 0);
});
