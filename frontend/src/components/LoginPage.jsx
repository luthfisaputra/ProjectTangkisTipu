import { useState } from 'react'
import LoginForm from './LoginForm.jsx'
import LoginScene from './LoginScene.jsx'
import LoginSceneMobile from './LoginSceneMobile.jsx'
import { adminLogin, setAdminToken, ApiError } from '../api.js'

export default function LoginPage({ onMasuk = () => {}, onKembali = () => {} }) {
  const [isDay, setIsDay] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggle = () => setIsDay((d) => !d)

  const handleSubmit = async ({ username, password }) => {
    if (loading) return
    setError('')
    setLoading(true)
    try {
      const res = await adminLogin({ username, password })
      if (!res || !res.token) {
        throw new ApiError('Respons login tidak valid.', { status: 0, code: 'INVALID_RESPONSE' })
      }
      setAdminToken(res.token)
      onMasuk(res.admin)
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError('Username atau password salah.')
      } else if (err instanceof ApiError && err.status === 0) {
        setError('Tidak dapat terhubung ke server. Periksa koneksi lalu coba lagi.')
      } else {
        setError((err && err.message) || 'Login gagal. Coba lagi.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen md:h-screen md:overflow-hidden bg-white text-slate-800 antialiased select-none">
      {/* Full Screen Edge-to-Edge Container */}
      <main className="w-full min-h-screen md:h-full flex flex-col md:flex-row relative">
        <LoginSceneMobile isDay={isDay} onToggle={toggle} />
        <LoginForm
          error={error}
          isDay={isDay}
          loading={loading}
          onKembali={onKembali}
          onSubmit={handleSubmit}
          onToggle={toggle}
        />
        <LoginScene isDay={isDay} onToggle={toggle} />
      </main>
    </div>
  )
}
