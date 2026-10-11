const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  const text = await res.text()
  let data = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!res.ok) {
    const message =
      (data && typeof data === 'object' && (data.error?.message || data.message)) ||
      (typeof data === 'string' && data) ||
      `Terjadi kesalahan (${res.status})`
    throw new Error(message)
  }

  return data
}

export const validateClassCode = (code) =>
  request('/api/class-codes/validate', {
    method: 'POST',
    body: JSON.stringify({ code }),
  })

export const createParticipant = ({ nama, nickname, kelas, classCode }) =>
  request('/api/participants', {
    method: 'POST',
    body: JSON.stringify({ nama, nickname, kelas, classCode }),
  })

export const getParticipant = (token) => request(`/api/participants/${token}`)

export const getProgress = (token) => request(`/api/progress/${token}`)

export const updateProgress = (token, { modusDibaca, skenario }) =>
  request(`/api/progress/${token}`, {
    method: 'PATCH',
    body: JSON.stringify({ modusDibaca, skenario }),
  })

export const startTest = (type, token) =>
  request(`/api/tests/${type}/start`, {
    method: 'POST',
    body: JSON.stringify({ token }),
  })

export const submitTest = (type, { attemptId, answers }) =>
  request(`/api/tests/${type}/submit`, {
    method: 'POST',
    body: JSON.stringify({ attemptId, answers }),
  })

export default {
  request,
  validateClassCode,
  createParticipant,
  getParticipant,
  getProgress,
  updateProgress,
  startTest,
  submitTest,
}
