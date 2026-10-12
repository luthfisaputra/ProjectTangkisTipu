const RAW_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const BASE_URL = RAW_BASE_URL.replace(/\/+$/, '');

let adminToken = null;

export function setAdminToken(token) {
  adminToken = token || null;
}

export function clearAdminToken() {
  adminToken = null;
}

export function getAdminToken() {
  return adminToken;
}

export class ApiError extends Error {
  constructor(message, { status = 0, code = 'NETWORK_ERROR', details = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function buildUrl(path) {
  const cleanPath = String(path || '').replace(/^\/+/, '');
  return `${BASE_URL}/${cleanPath}`;
}

async function request(method, path, { body, headers, auth = false, signal } = {}) {
  const finalHeaders = { Accept: 'application/json', ...headers };

  if (body !== undefined && body !== null) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  if (auth && adminToken) {
    finalHeaders.Authorization = `Bearer ${adminToken}`;
  }

  let response;
  try {
    response = await fetch(buildUrl(path), {
      method,
      headers: finalHeaders,
      body: body === undefined || body === null ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if (err && err.name === 'AbortError') {
      throw err;
    }
    throw new ApiError(
      'Tidak dapat terhubung ke server. Periksa koneksi internet Anda dan coba lagi.',
      { status: 0, code: 'NETWORK_ERROR' }
    );
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type') || '';
  let payload = null;
  if (contentType.includes('application/json')) {
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
  } else {
    try {
      const text = await response.text();
      payload = text ? { message: text } : null;
    } catch {
      payload = null;
    }
  }

  if (!response.ok) {
    const apiError = payload && typeof payload === 'object' ? payload.error : null;
    const code = (apiError && apiError.code) || `HTTP_${response.status}`;
    const message =
      (apiError && apiError.message) ||
      (payload && payload.message) ||
      `Permintaan gagal dengan status ${response.status}.`;
    throw new ApiError(message, { status: response.status, code, details: payload });
  }

  return payload;
}

export const api = {
  get: (path, options) => request('GET', path, options),
  post: (path, body, options) => request('POST', path, { ...options, body }),
  patch: (path, body, options) => request('PATCH', path, { ...options, body }),
  delete: (path, options) => request('DELETE', path, options),
  request,
};

// Login admin. payload: { username, password }.
// Respons backend: { token, admin: { id, username, role } }.
export function adminLogin(payload, options) {
  return request('POST', 'api/admin/auth/login', { body: payload, ...options });
}

// Verifikasi sesi admin memakai token yang tersimpan.
// Respons backend: { admin: { id, username, role } }.
export function adminMe(options) {
  return request('GET', 'api/admin/me', { auth: true, ...options });
}

// Validasi kode kelas. Respons backend: { valid, code?, label? }.
export function validateClassCode(code, options) {
  return request('POST', 'api/class-codes/validate', { body: { code }, ...options });
}

// Registrasi peserta. Respons backend: { token, participant }.
export function createParticipant(payload, options) {
  return request('POST', 'api/participants', { body: payload, ...options });
}

// Mulai/lanjutkan attempt tes. type: 'pretest' | 'posttest' | 'retensi'.
// Respons backend: { attemptId, type, track, setId, setNama, questions } tanpa kunci.
export function startTest(type, payload, options) {
  return request('POST', `api/tests/${type}/start`, { body: payload, ...options });
}

// Kirim jawaban. payload: { attemptId, token, answers: [{ questionId, selectedOption }] }.
// Respons backend: { attemptId, type, setId, score, total, passed, details }.
export function submitTest(type, payload, options) {
  return request('POST', `api/tests/${type}/submit`, { body: payload, ...options });
}

// Riwayat hasil tes. Respons backend: { token, attempts, summary }.
export function getTestResults(token, options) {
  return request('GET', `api/tests/${encodeURIComponent(token)}/results`, options);
}

// ---- Admin: pengelolaan kode kelas (semua butuh token admin) ----
// filters: { active?: 'true'|'false'|'all', q?: string }.
// Respons backend: { classCodes: [{ code, label, active, createdAt, jumlahPeserta, jumlahSet }] }.
export function listClassCodes(filters = {}, options) {
  const params = new URLSearchParams()
  if (filters.active) params.set('active', filters.active)
  if (filters.q) params.set('q', filters.q)
  const qs = params.toString()
  return request('GET', `api/admin/class-codes${qs ? `?${qs}` : ''}`, { auth: true, ...options })
}

// Respons backend: { classCode: { code, label, active, createdAt, jumlahPeserta, jumlahSet, setIds } }.
export function getClassCode(code, options) {
  return request('GET', `api/admin/class-codes/${encodeURIComponent(code)}`, { auth: true, ...options })
}

// payload: { code, label?, active?, setIds? }. Respons: { classCode }.
export function createClassCode(payload, options) {
  return request('POST', 'api/admin/class-codes', { body: payload, auth: true, ...options })
}

// payload: subset { label?, active?, setIds? }. Respons: { classCode }.
export function updateClassCode(code, payload, options) {
  return request('PATCH', `api/admin/class-codes/${encodeURIComponent(code)}`, {
    body: payload,
    auth: true,
    ...options,
  })
}

// Respons: { classCode }.
export function activateClassCode(code, options) {
  return request('POST', `api/admin/class-codes/${encodeURIComponent(code)}/activate`, {
    body: {},
    auth: true,
    ...options,
  })
}

// Respons: { classCode }.
export function deactivateClassCode(code, options) {
  return request('POST', `api/admin/class-codes/${encodeURIComponent(code)}/deactivate`, {
    body: {},
    auth: true,
    ...options,
  })
}

// ---- Admin: pengelolaan set soal (semua butuh token admin) ----
// Respons backend: { sets: [{ id, nama, catatan, jalur, tipe, kodeKelas, kodeKelasList, rilis, tutup, status, jumlahSoal }] }.
export function listQuestionSets(options) {
  return request('GET', 'api/admin/sets', { auth: true, ...options });
}

// Respons backend: { set, soal: [{ id, kategori, pertanyaan, opsi, kunci, ulasan }] }.
export function getQuestionSet(id, options) {
  return request('GET', `api/admin/sets/${encodeURIComponent(id)}`, { auth: true, ...options });
}

// payload: { nama, catatan?, jalur, tipe, kodeKelas?, rilis?, tutup? }. Respons: { set }.
export function createQuestionSet(payload, options) {
  return request('POST', 'api/admin/sets', { body: payload, auth: true, ...options });
}

// payload: subset dari field set. Respons: { set }.
export function updateQuestionSet(id, payload, options) {
  return request('PATCH', `api/admin/sets/${encodeURIComponent(id)}`, { body: payload, auth: true, ...options });
}

// payload: { status?: 'terjadwal'|'aktif', rilis?, tutup? }. Respons: { set }.
export function publishQuestionSet(id, payload, options) {
  return request('POST', `api/admin/sets/${encodeURIComponent(id)}/publish`, { body: payload || {}, auth: true, ...options });
}

// Respons: { set } dengan status kembali 'draf'.
export function archiveQuestionSet(id, options) {
  return request('POST', `api/admin/sets/${encodeURIComponent(id)}/archive`, { body: {}, auth: true, ...options });
}

// Respons backend: { soal: [{ id, kategori, pertanyaan, opsi, kunci, ulasan }] }.
export function listSetQuestions(id, options) {
  return request('GET', `api/admin/sets/${encodeURIComponent(id)}/questions`, { auth: true, ...options });
}

// payload: { kategori, pertanyaan, opsi: string[], kunci: number, ulasan? }. Respons: { soal }.
export function createSetQuestion(id, payload, options) {
  return request('POST', `api/admin/sets/${encodeURIComponent(id)}/questions`, { body: payload, auth: true, ...options });
}

// payload: subset dari field soal. Respons: { soal }.
export function updateSetQuestion(id, questionId, payload, options) {
  return request('PATCH', `api/admin/sets/${encodeURIComponent(id)}/questions/${encodeURIComponent(questionId)}`, {
    body: payload,
    auth: true,
    ...options,
  });
}

// Respons: 204 tanpa isi.
export function deleteSetQuestion(id, questionId, options) {
  return request('DELETE', `api/admin/sets/${encodeURIComponent(id)}/questions/${encodeURIComponent(questionId)}`, {
    auth: true,
    ...options,
  });
}

// Progres peserta. Respons backend: { progress: { pretest, modusDibaca, skenario, posttest, updatedAt } }.
export function getProgress(token, options) {
  return request('GET', `api/progress/${encodeURIComponent(token)}`, options);
}

// Simpan progres parsial. payload: { modusDibaca?, skenario? } (0-8, tidak bisa turun).
export function updateProgress(token, payload, options) {
  return request('PATCH', `api/progress/${encodeURIComponent(token)}`, { body: payload, ...options });
}

export default api;
