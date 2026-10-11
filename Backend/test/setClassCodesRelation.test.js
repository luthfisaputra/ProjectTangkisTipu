import test from 'node:test';
import assert from 'node:assert/strict';
import { __setQueryImpl, pool } from '../src/config/db.js';
import {
  listSets,
  getSet,
  createSet,
  updateSet,
} from '../src/controllers/questionSetsController.js';
import {
  getClassCode,
  createClassCode,
  updateClassCode,
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

function barisSet(over = {}) {
  return {
    id: 'SET-1',
    nama: 'Kuis Undian',
    catatan: null,
    jalur: 'dewasa',
    tipe: 'pre',
    status: 'draf',
    rilis_at: null,
    tutup_at: null,
    jumlah_soal: '0',
    ...over,
  };
}

/* ---- listSets membaca relasi kode kelas dari pivot ---- */

test('listSets mengembalikan kodeKelas dari set_class_codes', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM question_sets')) return { rows: [barisSet()] };
    if (text.includes('FROM set_class_codes')) return { rows: [{ code: 'PR-2312' }] };
    return { rows: [] };
  });
  const res = mockRes();
  await listSets({}, res, (e) => {
    throw e;
  });
  assert.equal(res.body.sets[0].kodeKelas, 'PR-2312');
  assert.deepEqual(res.body.sets[0].kodeKelasList, ['PR-2312']);
});

test('listSets tanpa relasi -> kodeKelas string kosong', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM question_sets')) return { rows: [barisSet()] };
    return { rows: [] };
  });
  const res = mockRes();
  await listSets({}, res, (e) => {
    throw e;
  });
  assert.equal(res.body.sets[0].kodeKelas, '');
  assert.deepEqual(res.body.sets[0].kodeKelasList, []);
});

/* ---- getSet membaca relasi kode kelas dari pivot ---- */

test('getSet mengembalikan kodeKelas dari pivot', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM question_sets')) return { rows: [barisSet()] };
    if (text.includes('FROM set_class_codes')) return { rows: [{ code: 'GURU-01' }] };
    if (text.includes('FROM questions')) return { rows: [] };
    return { rows: [] };
  });
  const res = mockRes();
  await getSet({ params: { id: 'SET-1' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.body.set.kodeKelas, 'GURU-01');
  assert.deepEqual(res.body.set.kodeKelasList, ['GURU-01']);
});

test('getSet tidak ditemukan -> 404 NOT_FOUND', async () => {
  setQuery(async () => ({ rows: [] }));
  const res = mockRes();
  await getSet({ params: { id: 'X' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.error.code, 'NOT_FOUND');
});

/* ---- createSet menyimpan relasi ke pivot dalam transaksi ---- */

test('createSet menyimpan relasi kode kelas ke set_class_codes', async () => {
  const inserts = [];
  setClient(async (text, params) => {
    if (text.includes('INSERT INTO question_sets')) return { rows: [barisSet({ id: params[0] })] };
    if (text.includes('SELECT code FROM set_class_codes')) return { rows: [] };
    if (text.includes('INSERT INTO set_class_codes')) {
      inserts.push(params);
      return { rows: [] };
    }
    return { rows: [] };
  });
  setQuery(async (text) => {
    if (text.includes('FROM set_class_codes')) return { rows: [{ code: 'PR-2312' }] };
    return { rows: [] };
  });
  const res = mockRes();
  await createSet(
    { body: { nama: 'Kuis', jalur: 'dewasa', tipe: 'pre', kodeKelas: 'pr-2312' } },
    res,
    (e) => {
      throw e;
    },
  );
  assert.equal(res.statusCode, 201);
  assert.equal(inserts.length, 1);
  assert.equal(inserts[0][0], res.body.set.id);
  assert.equal(inserts[0][1], 'PR-2312');
  assert.equal(res.body.set.kodeKelas, 'PR-2312');
});

test('createSet tanpa kodeKelas tidak menulis pivot', async () => {
  let pivotInsert = 0;
  setClient(async (text) => {
    if (text.includes('INSERT INTO question_sets')) return { rows: [barisSet()] };
    if (text.includes('INSERT INTO set_class_codes')) {
      pivotInsert += 1;
      return { rows: [] };
    }
    return { rows: [] };
  });
  setQuery(async () => ({ rows: [] }));
  const res = mockRes();
  await createSet({ body: { nama: 'Kuis', jalur: 'dewasa', tipe: 'pre' } }, res, (e) => {
    throw e;
  });
  assert.equal(pivotInsert, 0);
  assert.equal(res.body.set.kodeKelas, '');
});

test('createSet kode kelas tidak valid -> 400 INVALID_CLASS_CODE', async () => {
  setClient(async (text) => {
    if (text.includes('INSERT INTO question_sets')) return { rows: [barisSet()] };
    if (text.includes('SELECT code FROM set_class_codes')) return { rows: [] };
    if (text.includes('INSERT INTO set_class_codes')) {
      const err = new Error('fk');
      err.code = '23503';
      throw err;
    }
    return { rows: [] };
  });
  const res = mockRes();
  await createSet(
    { body: { nama: 'Kuis', jalur: 'dewasa', tipe: 'pre', kodeKelas: 'TIDAK-ADA' } },
    res,
    (e) => {
      throw e;
    },
  );
  assert.equal(res.statusCode, 400);
  assert.equal(res.body.error.code, 'INVALID_CLASS_CODE');
});

/* ---- updateSet hanya mengubah relasi yang diminta ---- */

test('updateSet menambah relasi baru tanpa menghapus relasi lain', async () => {
  const dihapus = [];
  const ditambah = [];
  setQuery(async (text) => {
    if (text.includes('FROM question_sets')) return { rows: [barisSet()] };
    if (text.includes('FROM set_class_codes')) return { rows: [{ code: 'PR-2312' }, { code: 'GURU-01' }] };
    return { rows: [] };
  });
  setClient(async (text, params) => {
    if (text.includes('UPDATE question_sets')) return { rows: [barisSet()] };
    if (text.includes('SELECT code FROM set_class_codes')) return { rows: [{ code: 'PR-2312' }] };
    if (text.includes('INSERT INTO set_class_codes')) {
      ditambah.push(params);
      return { rows: [] };
    }
    if (text.includes('DELETE FROM set_class_codes')) {
      dihapus.push(params);
      return { rows: [] };
    }
    return { rows: [] };
  });
  const res = mockRes();
  await updateSet({ params: { id: 'SET-1' }, body: { kodeKelas: 'GURU-01' } }, res, (e) => {
    throw e;
  });
  assert.deepEqual(ditambah, [['SET-1', 'GURU-01']]);
  assert.deepEqual(dihapus, [['SET-1', 'PR-2312']]);
  assert.deepEqual(res.body.set.kodeKelasList, ['PR-2312', 'GURU-01']);
});

test('updateSet tanpa field kodeKelas tidak menyentuh pivot', async () => {
  let pivotTouched = 0;
  setQuery(async (text) => {
    if (text.includes('FROM question_sets')) return { rows: [barisSet()] };
    if (text.includes('FROM set_class_codes')) return { rows: [{ code: 'PR-2312' }] };
    return { rows: [] };
  });
  setClient(async (text) => {
    if (text.includes('UPDATE question_sets')) return { rows: [barisSet()] };
    if (text.includes('set_class_codes')) {
      pivotTouched += 1;
      return { rows: [] };
    }
    return { rows: [] };
  });
  const res = mockRes();
  await updateSet({ params: { id: 'SET-1' }, body: { nama: 'Judul Baru' } }, res, (e) => {
    throw e;
  });
  assert.equal(pivotTouched, 0);
  assert.equal(res.body.set.kodeKelas, 'PR-2312');
});

test('updateSet tidak ditemukan -> 404 NOT_FOUND', async () => {
  setQuery(async () => ({ rows: [] }));
  const res = mockRes();
  await updateSet({ params: { id: 'X' }, body: { nama: 'A' } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.error.code, 'NOT_FOUND');
});

/* ---- Konsistensi lintas controller ---- */

test('perubahan relasi via updateClassCode tercermin di getSet', async () => {
  const pivot = new Set(['SET-1']);
  setQuery(async (text) => {
    if (text.includes('FROM class_codes')) {
      return { rows: [{ code: 'PR-2312', label: 'RT 05', active: true, created_at: 'x', jumlah_peserta: '0', jumlah_set: String(pivot.size) }] };
    }
    if (text.includes('SELECT set_id FROM set_class_codes')) {
      return { rows: [...pivot].map((s) => ({ set_id: s })) };
    }
    if (text.includes('FROM question_sets')) return { rows: [barisSet()] };
    if (text.includes('SELECT code FROM set_class_codes')) {
      return { rows: [...pivot].length ? [{ code: 'PR-2312' }] : [] };
    }
    if (text.includes('FROM questions')) return { rows: [] };
    return { rows: [] };
  });
  setClient(async (text, params) => {
    if (text.includes('UPDATE class_codes')) {
      return { rows: [{ code: 'PR-2312', label: 'RT 05', active: true, created_at: 'x' }] };
    }
    if (text.includes('SELECT set_id FROM set_class_codes')) {
      return { rows: [...pivot].map((s) => ({ set_id: s })) };
    }
    if (text.includes('INSERT INTO set_class_codes')) {
      pivot.add(params[0]);
      return { rows: [] };
    }
    if (text.includes('DELETE FROM set_class_codes')) {
      pivot.delete(params[1]);
      return { rows: [] };
    }
    return { rows: [] };
  });

  const resUpdate = mockRes();
  await updateClassCode({ params: { code: 'PR-2312' }, body: { setIds: ['SET-1', 'SET-2'] } }, resUpdate, (e) => {
    throw e;
  });
  assert.deepEqual(resUpdate.body.classCode.setIds, ['SET-1', 'SET-2']);

  const resSet = mockRes();
  await getSet({ params: { id: 'SET-1' } }, resSet, (e) => {
    throw e;
  });
  assert.equal(resSet.body.set.kodeKelas, 'PR-2312');
});

test('createClassCode menyimpan setIds ke pivot', async () => {
  const pivot = [];
  setQuery(async (text) => {
    if (text.includes('SELECT code FROM class_codes')) return { rows: [] };
    if (text.includes('SELECT set_id FROM set_class_codes')) {
      return { rows: pivot.map((s) => ({ set_id: s })) };
    }
    return { rows: [] };
  });
  setClient(async (text, params) => {
    if (text.includes('INSERT INTO class_codes')) {
      return { rows: [{ code: 'PR-2312', label: 'RT 05', active: true, created_at: 'x' }] };
    }
    if (text.includes('SELECT set_id FROM set_class_codes')) {
      return { rows: pivot.map((s) => ({ set_id: s })) };
    }
    if (text.includes('INSERT INTO set_class_codes')) {
      pivot.push(params[0]);
      return { rows: [] };
    }
    return { rows: [] };
  });
  const res = mockRes();
  await createClassCode({ body: { code: 'PR-2312', label: 'RT 05', setIds: ['SET-1'] } }, res, (e) => {
    throw e;
  });
  assert.equal(res.statusCode, 201);
  assert.deepEqual(res.body.classCode.setIds, ['SET-1']);
});

test('getClassCode mengembalikan setIds dari pivot', async () => {
  setQuery(async (text) => {
    if (text.includes('FROM class_codes')) {
      return { rows: [{ code: 'PR-2312', label: 'RT 05', active: true, created_at: 'x', jumlah_peserta: '0', jumlah_set: '2' }] };
    }
    if (text.includes('SELECT set_id FROM set_class_codes')) {
      return { rows: [{ set_id: 'SET-1' }, { set_id: 'SET-2' }] };
    }
    return { rows: [] };
  });
  const res = mockRes();
  await getClassCode({ params: { code: 'PR-2312' } }, res, (e) => {
    throw e;
  });
  assert.deepEqual(res.body.classCode.setIds, ['SET-1', 'SET-2']);
});
