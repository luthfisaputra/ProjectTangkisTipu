import { useEffect, useState } from 'react'
import { TRACKS } from '../data/jalurBelajar.jsx'
import { salinKode, unduhKartuPeserta } from '../utils/kartuPeserta.js'

const HIGHLIGHTS = [
  { icon: 'key_off', text: 'Tanpa Akun & Password' },
  { icon: 'lock', text: 'Data Aman di Perangkatmu' },
  { icon: 'edit_note', text: 'Bisa Dicatat atau Disimpan di Catatan HP' },
]

const GUIDES = [
  {
    icon: 'family_restroom',
    title: 'Membantu Orang Tua?',
    desc: 'Catat di sticky note dekat meja atau kulkas.',
  },
  {
    icon: 'devices',
    title: 'Bisa Lintas Perangkat',
    desc: 'Masukkan kode yang sama di HP atau laptop.',
  },
]

export default function SimpanKode({ peserta, onBack = () => {}, onMulai = () => {} }) {
  const token = peserta?.token || 'TKP-0000-X'
  const nickname = peserta?.nickname?.trim() || 'Kawan Waspada'
  const track = TRACKS[peserta?.track] || TRACKS[1]
  const classCode = (peserta?.classCode || '').trim()

  const [saved, setSaved] = useState(false)
  const [pulse, setPulse] = useState(false)
  const [toast, setToast] = useState(false)
  const [download, setDownload] = useState('idle')

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(false), 4000)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!pulse) return
    const timer = window.setTimeout(() => setPulse(false), 1200)
    return () => window.clearTimeout(timer)
  }, [pulse])

  const showToast = () => setToast(true)

  const copyCode = async () => {
    try {
      await salinKode(token)
      setPulse(true)
      showToast()
    } catch {
      window.alert(`Silakan catat kodemu: ${token}`)
    }
  }

  const handleDownload = () => {
    if (download !== 'idle') return
    setDownload('loading')
    window.setTimeout(() => {
      try {
        unduhKartuPeserta({ token, nickname })
        setDownload('done')
        showToast()
        window.setTimeout(() => setDownload('idle'), 2400)
      } catch {
        setDownload('idle')
        window.alert('Unduhan gagal. Silakan catat kodemu: ' + token)
      }
    }, 900)
  }

  const toggleSaved = (e) => setSaved(e.target.checked)

  return (
    <main className="w-full bg-surface-cream min-h-screen">
      <div className="flex flex-col w-full">
        {/* Toast Notifikasi */}
        {toast && (
          <div
            className="fixed top-24 right-4 sm:right-6 z-50 flex items-center gap-space-md p-space-md bg-surface-white rounded-xl shadow-xl pop-in max-w-[calc(100%-2rem)]"
            role="status" aria-live="polite" style={{ boxShadow: '0 12px 32px rgba(15, 92, 115, 0.12)' }}>
            <div
              className="w-10 h-10 rounded-full bg-safe-green-light flex items-center justify-center text-tertiary shrink-0">
              <span className="material-symbols-outlined text-[22px]">check_circle</span>
            </div>
            <div className="flex flex-col pr-space-md">
              <span className="font-label-md text-label-md text-on-surface">Kode berhasil disalin!</span>
              <span className="font-body-sm text-body-sm text-text-muted">Tersimpan di papan klip perangkatmu.</span>
            </div>
            <button
              className="w-8 h-8 rounded-lg hover:bg-surface-cream text-text-muted hover:text-on-surface flex items-center justify-center transition-colors shrink-0"
              onClick={() => setToast(false)} type="button" aria-label="Tutup notifikasi">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        <div className="w-full max-w-[1100px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
          {/* Stepper & Privacy Badge */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg reveal">
            <div className="flex items-center gap-space-sm">
              <div className="flex items-center gap-space-xs">
                <span
                  className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </span>
                <span className="w-6 h-0.5 bg-primary"></span>
                <span
                  className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm shadow-sm">
                  2
                </span>
              </div>
              <span className="font-label-md text-label-md text-on-surface ml-space-xs">
                Langkah 2 dari 2: Simpan Kode Unikmu
              </span>
            </div>
          </div>

          {/* Judul Halaman */}
          <div className="max-w-[780px] mb-space-2xl reveal">
            <h1 className="font-display text-display text-primary tracking-tight mb-space-sm">
              Simpan Kodemu Baik-Baik!
            </h1>
            <p className="font-body-md md:text-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Kami tidak menyimpan email atau nomor HP-mu. Kode acak ini adalah satu-satunya kunci untuk
              menyambungkan progres pre-test, simulasi kasus, post-test, dan sertifikatmu.
            </p>
            <button
              className="mt-space-md inline-flex items-center gap-space-xs font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
              onClick={onBack} type="button">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Ubah Profil</span>
            </button>
          </div>

          {/* Grid Konten Utama */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/* Kolom Kiri */}
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <div
                className="bg-surface-white rounded-[16px] p-space-lg sm:p-space-xl shadow-md relative overflow-hidden reveal"
                style={{ boxShadow: '0 10px 30px rgba(15, 92, 115, 0.06)' }}>
                <div
                  className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-container via-primary-fixed-dim to-secondary-container"
                  aria-hidden="true"></div>
                <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-primary-fixed/30 blur-2xl"
                  aria-hidden="true"></div>

                <div className="flex items-center justify-between gap-space-md mt-space-xs mb-space-lg">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary-container text-[20px]">badge</span>
                    <span
                      className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted">Kode Peserta
                      Anonim Anda</span>
                  </div>
                </div>

                {/* Kotak Kode */}
                <div
                  className={`p-space-lg rounded-xl bg-surface-cream text-center mb-space-md pop-in transition-shadow duration-300 ${pulse ? 'shadow-[0_0_0_3px_rgba(0,67,86,0.15)]' : ''}`}>
                  <div className="font-label-sm text-label-sm text-text-muted mb-space-xs">
                    KODE IDENTITAS SEMENTARA
                  </div>
                  <div
                    className="font-display text-[32px] sm:text-[38px] leading-[42px] sm:leading-[48px] text-primary tracking-[0.18em] font-mono select-all">
                    {token}
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                    Identitas Peserta: <span className="font-label-md text-label-md text-primary">{nickname}</span>
                  </div>
                </div>

                {/* Detail Jalur & Kode Kelas */}
                <div className="flex flex-wrap items-center gap-space-xs mb-space-lg">
                  <span
                    className="inline-flex items-center gap-1 px-space-sm py-1 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[16px]">route</span>
                    {track.label}
                  </span>
                  {classCode && (
                    <span
                      className="inline-flex items-center gap-1 px-space-sm py-1 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px]">groups</span>
                      Kode Kelas: {classCode}
                    </span>
                  )}
                </div>

                {/* Tombol Aksi Ganda */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mb-space-md">
                  <button
                    className="h-12 px-space-lg rounded-xl bg-surface-cream hover:bg-surface-container text-primary font-label-lg text-label-lg flex items-center justify-center gap-space-sm transition-all active:scale-[0.98]"
                    onClick={copyCode} type="button">
                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                    <span>Salin Kode</span>
                  </button>
                  <button
                    className="h-12 px-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container text-primary-container font-label-lg text-label-lg flex items-center justify-center gap-space-sm transition-all active:scale-[0.98] disabled:opacity-70"
                    onClick={handleDownload} type="button" disabled={download !== 'idle'}>
                    <span
                      className={`material-symbols-outlined text-[20px] ${download === 'loading' ? 'animate-spin' : ''}`}>
                      {download === 'done' ? 'check' : download === 'loading' ? 'refresh' : 'download'}
                    </span>
                    <span>
                      {download === 'done' ? 'Tersimpan!' : download === 'loading' ? 'Menyiapkan Gambar...' : 'Unduh Gambar'}
                    </span>
                  </button>
                </div>

                {/* Progress Unduhan */}
                {download === 'loading' && (
                  <div className="h-1.5 rounded-full bg-surface-container overflow-hidden fade-in mb-space-md">
                    <div className="h-full rounded-full bg-primary progress-fill"></div>
                  </div>
                )}

              </div>

              {/* Panduan Singkat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                {GUIDES.map((g, i) => (
                  <div
                    key={g.title}
                    className={`p-space-md rounded-xl bg-surface-white flex items-center gap-space-md shadow-sm reveal ${i === 1 ? 'reveal-2' : ''}`}>
                    <div
                      className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[22px]">{g.icon}</span>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface block">{g.title}</span>
                      <span className="font-body-sm text-body-sm text-text-muted block">{g.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className="lg:col-span-5 flex flex-col gap-space-lg">
              {/* Kartu Peringatan */}
              <div className="bg-warning-yellow-light rounded-[16px] p-space-lg sm:p-space-xl shadow-sm relative overflow-hidden reveal">
                <div className="flex items-start gap-space-md mb-space-md">
                  <div
                    className="w-11 h-11 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">warning</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface">Penting untuk Diingat</span>
                    <span
                      className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Perlindungan
                      Anonimitas Penuh</span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface leading-relaxed mb-space-lg font-medium">
                  Kode ini dipakai untuk menyambungkan hasil pre-test, post-test, dan tes ulang. Kalau hilang, kamu
                  harus membuat kode baru dan hasil lamamu tidak tersambung.
                </p>
                <div className="flex flex-col gap-space-sm pt-space-md">
                  {HIGHLIGHTS.map((h) => (
                    <div key={h.text} className="flex items-center gap-space-sm text-on-surface">
                      <div
                        className="w-6 h-6 rounded-full bg-surface-white flex items-center justify-center text-secondary shrink-0 shadow-sm">
                        <span className="material-symbols-outlined text-[16px]">{h.icon}</span>
                      </div>
                      <span className="font-label-md text-label-md">{h.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Konfirmasi & CTA */}
              <div
                className="bg-surface-white rounded-[16px] p-space-lg sm:p-space-xl shadow-md flex flex-col gap-space-lg reveal reveal-2"
                style={{ boxShadow: '0 10px 30px rgba(15, 92, 115, 0.06)' }}>
                <label className="flex items-start gap-space-md cursor-pointer select-none group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input className="sr-only peer" id="confirm-saved" type="checkbox" checked={saved}
                      onChange={toggleSaved} />
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shadow-sm transition-all duration-200 ${saved ? 'bg-primary scale-105' : 'bg-surface-card-subtle'}`}>
                      <span
                        className={`material-symbols-outlined text-on-primary text-[18px] transition-opacity duration-200 ${saved ? 'opacity-100' : 'opacity-0'}`}>check</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors">
                      Aku sudah menyimpan kodeku
                    </span>
                    <span className="font-body-sm text-body-sm text-text-muted mt-0.5">
                      Centang untuk membuka akses ke tes &amp; modul
                    </span>
                  </div>
                </label>

                <div className="flex flex-col gap-space-md pt-space-xs">
                  <button
                    className={`w-full h-[52px] px-space-xl rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-space-sm shadow-md transition-all ${saved ? 'hover:bg-primary-container hover:shadow-lg active:scale-[0.99]' : 'opacity-40 cursor-not-allowed'}`}
                    onClick={onMulai} type="button" disabled={!saved}>
                    <span>Lanjut ke Pre-test / Belajar</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Reassurance Pill */}
              <div
                className="px-space-md py-space-sm rounded-xl bg-surface-card-subtle flex flex-wrap items-center justify-between gap-space-xs text-text-muted text-body-sm reveal reveal-3">
                <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                  TangkisTipu Protective UI
                </span>
                <span className="font-label-sm text-label-sm">Bukan kanal lapor resmi • Standar WCAG AA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
