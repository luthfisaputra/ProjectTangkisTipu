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

// Validasi kode kelas. Respons backend: { valid, code?, label? }.
export function validateClassCode(code, options) {
  return request('POST', 'api/class-codes/validate', { body: { code }, ...options });
}

// Registrasi peserta. Respons backend: { token, participant }.
export function createParticipant(payload, options) {
  return request('POST', 'api/participants', { body: payload, ...options });
}

export default api;
