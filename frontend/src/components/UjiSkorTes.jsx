import { useEffect, useRef, useState } from 'react'
import { TRACKS, generateParticipantId } from '../data/jalurBelajar.jsx'
import { validateClassCode, createParticipant, ApiError } from '../api.js'

const HELP_TEXT = 'Kode Kelas / Komunitas diberikan oleh fasilitator pelatihan agar nilaimu terekap ke dashboard kelompok. Jika kamu belajar sendiri, kolom ini boleh dikosongkan!'

export default function UjiSkorTes({ setPeserta = () => {}, onLanjut = () => {}, onHome = () => {} }) {
  const [nickname, setNickname] = useState('')
  const [code, setCode] = useState('')
  const [track, setTrack] = useState(1)
  const [draftTrack, setDraftTrack] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [demoId, setDemoId] = useState('TKP-8924-X')

  // Status validasi kode kelas: idle | loading | valid | invalid | error
  const [kodeStatus, setKodeStatus] = useState('idle')
  const [kodeLabel, setKodeLabel] = useState('')
  const [kodePesan, setKodePesan] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const clean = code.trim().toUpperCase()
  const codeValid = kodeStatus === 'valid'
  const submittingRef = useRef(false)

  // Validasi kode kelas ke backend (debounce) saat pengguna berhenti mengetik.
  useEffect(() => {
    if (!clean) {
      setKodeStatus('idle')
      setKodeLabel('')
      setKodePesan('')
      return
    }

    const controller = new AbortController()
    setKodeStatus('loading')
    setKodePesan('')

    const timer = window.setTimeout(async () => {
      try {
        const res = await validateClassCode(clean, { signal: controller.signal })
        if (res && res.valid) {
          setKodeStatus('valid')
          setKodeLabel(res.label || '')
        } else {
          setKodeStatus('invalid')
          setKodeLabel('')
        }
      } catch (err) {
        if (err && err.name === 'AbortError') return
        setKodeStatus('error')
        setKodePesan(
          err instanceof ApiError
            ? err.message
            : 'Gagal memeriksa kode kelas. Coba lagi sebentar lagi.'
        )
      }
    }, 500)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [clean])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submittingRef.current) return
    const nick = nickname.trim()
    if (!nick) {
      window.alert('Silakan isi nama panggilan terlebih dahulu.')
      return
    }
    if (clean && kodeStatus === 'loading') {
      setSubmitError('Tunggu sebentar, kode kelas sedang diperiksa.')
      return
    }
    if (clean && kodeStatus !== 'valid') {
      setSubmitError('Kode kelas belum valid. Periksa lagi atau kosongkan bila belajar mandiri.')
      return
    }

    submittingRef.current = true
    setSubmitLoading(true)
    setSubmitError('')

    try {
      const payload = { nickname: nick, track }
      if (clean) payload.classCode = clean
      const res = await createParticipant(payload)
      const token = res && res.token
      if (!token) {
        throw new ApiError('Server tidak mengembalikan kode peserta.', {
          status: 0,
          code: 'INVALID_RESPONSE',
        })
      }
      const participant = res.participant || {}
      setPeserta({
        nickname: participant.nickname || nick,
        track: participant.track ?? track,
        classCode: participant.classCode || clean || '',
        token,
        id: participant.id,
      })
      onLanjut()
    } catch (err) {
      setSubmitError(
        err instanceof ApiError
          ? err.message
          : 'Registrasi gagal. Periksa koneksi lalu coba lagi.'
      )
    } finally {
      submittingRef.current = false
      setSubmitLoading(false)
    }
  }

  const openModal = () => {
    setDraftTrack(track)
    setShowModal(true)
  }

  const saveTrack = () => {
    setTrack(draftTrack)
    setShowModal(false)
  }

  return (
    <main className="w-full bg-surface-cream min-h-screen">
      <div className="flex flex-col w-full">
        <div className="w-full max-w-[1100px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
          {/* Top Step Bar & Visual Indicator */}
          <div className="flex flex-wrap items-center justify-between mb-space-lg gap-space-sm reveal">
            <div className="flex items-center gap-space-sm">
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm">1</span>
              <span className="font-label-md text-label-md text-primary font-semibold">Langkah 1 dari 2: Profil
              </span>
            </div>
          </div>
          {/* Main Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
            {/* Kolom Kiri: Visual Edukasi & Janji Privasi */}
            <div className="lg:col-span-6 flex flex-col gap-space-lg">
              <div className="flex flex-col gap-space-sm reveal">
                <h1 className="font-display text-display text-primary tracking-tight leading-tight">
                  Kenalan dulu, yuk!
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  Cukup isi nama panggilan saja. <strong className="text-on-surface font-semibold">Tidak ada nama
                    asli, nomor WhatsApp, maupun email</strong> yang kami minta, dan skor hasil latihanmu tetap
                  tersimpan anonim.
                </p>
              </div>
              {/* Hero Photo with Tactile Framing */}
              <div
                className="relative w-full rounded-2xl bg-surface-white p-space-md shadow-md overflow-hidden reveal">
                <div
                  className="relative w-full h-[320px] rounded-xl overflow-hidden bg-surface-container flex items-center justify-center">
                  <img alt="Edukator muda ramah mengarahkan peserta untuk bergabung secara aman dengan smartphone"
                    className="w-full h-full object-cover object-top"
                    src="/assets/FotoPagePerkenalan.png" />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent">
                  </div>
                </div>
              </div>
              {/* 3 Poin Keunggulan Privasi (Horizontal ala Burger) */}
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div
                  className="flex items-center gap-space-md p-space-md rounded-2xl bg-surface-white shadow-sm border border-border-subtle/40 reveal">
                  <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[18px]">badge</span>
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-label-md text-label-md text-on-surface font-bold leading-snug">Nama Panggilan
                      Bebas</span>
                    <span
                      className="font-body-sm text-body-sm text-text-muted leading-relaxed">Bisa inisial,
                      samaran, atau avatar santai.</span>
                  </div>
                </div>
                <div
                  className="flex items-center gap-space-md p-space-md rounded-2xl bg-surface-white shadow-sm border border-border-subtle/40 reveal reveal-2">
                  <div className="w-9 h-9 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[18px]">tag</span>
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-label-md text-label-md text-on-surface font-bold leading-snug">Belajar Mandiri
                      Tanpa Kode</span>
                    <span className="font-body-sm text-body-sm text-text-muted leading-relaxed">Ingin belajar
                      sendiri? Langsung klik "Mulai Belajar &amp; Tes" tanpa memasukkan kode kelas.</span>
                  </div>
                </div>
                <div
                  className="flex items-center gap-space-md p-space-md rounded-2xl bg-surface-white shadow-sm border border-border-subtle/40 reveal reveal-3">
                  <div className="w-9 h-9 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
                    <span className="material-symbols-outlined text-[18px]">visibility_off</span>
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-label-md text-label-md text-on-surface font-bold leading-snug">Bebas
                      Pelacakan</span>
                    <span className="font-body-sm text-body-sm text-text-muted leading-relaxed">Tanpa cookie
                      iklan maupun data scraping.</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Kolom Kanan: Kartu Form Bersih */}
            <div className="lg:col-span-6 reveal">
              <div
                className="bg-surface-white rounded-2xl p-space-lg sm:p-space-xl shadow-md flex flex-col gap-space-lg">
                {/* Chip Jalur Terpilih */}
                <div
                  className="flex items-center justify-between p-space-sm sm:p-space-md rounded-xl bg-surface-card-subtle">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <div
                      className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">diversity_3</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span
                        className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">Jalur
                        Simulasi</span>
                      <span className="font-label-md text-label-md text-on-surface font-bold truncate">{TRACKS[track].label}</span>
                    </div>
                  </div>
                  <button
                    className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-white hover:bg-surface-container text-primary font-label-md text-label-md shadow-sm transition-all shrink-0 ml-space-sm"
                    onClick={openModal} type="button">
                    <span>Ganti Jalur</span>
                    <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                  </button>
                </div>
                <form className="flex flex-col gap-space-lg" onSubmit={handleSubmit}>
                  {/* Form Field 1: Nama Panggilan */}
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <label
                        className="font-label-lg text-label-lg text-on-surface flex items-center gap-space-xs"
                        htmlFor="nicknameInput">
                        <span>Nama Panggilan</span>
                        <span className="text-danger-red font-bold">*</span>
                      </label>
                    </div>
                    <div className="relative flex items-center">
                      <div
                        className="absolute left-space-md text-text-muted flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-[22px]">sentiment_satisfied</span>
                      </div>
                      <input
                        className="w-full h-[52px] pl-12 pr-space-md rounded-xl bg-surface-white text-on-surface font-body-md text-body-md shadow-sm focus:outline-none focus:bg-surface-container-low transition-all"
                        id="nicknameInput" value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="Misal: Rian, Kak Budi, atau Bunga" required type="text" />
                    </div>
                    <span className="font-body-sm text-body-sm text-text-muted flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[16px] text-tertiary">check</span>
                      Bebas, tidak perlu nama asli Anda.
                    </span>
                  </div>
                  {/* Form Field 2: Kode Kelas / Komunitas */}
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <label
                        className="font-label-lg text-label-lg text-on-surface flex items-center gap-space-xs"
                        htmlFor="communityCodeInput">
                        <span>Kode Kelas / Komunitas</span>
                        <span
                          className="px-space-xs py-0.5 rounded bg-surface-container text-text-muted font-label-sm text-label-sm">Opsional</span>
                      </label>
                      <button
                        className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-space-xs"
                        onClick={() => setShowHelp((v) => !v)} type="button">
                        <span className="material-symbols-outlined text-[14px]">help</span>
                        Apa ini?
                      </button>
                    </div>
                    {showHelp && (
                      <div
                        className="hint-in flex items-start gap-space-xs p-space-sm rounded-xl bg-surface-container-low border border-border-subtle shadow-sm">
                        <span
                          className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">info</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant leading-snug flex-1">
                          {HELP_TEXT}
                        </span>
                        <button
                          className="shrink-0 w-6 h-6 rounded-full hover:bg-surface-container flex items-center justify-center text-text-muted transition-colors"
                          onClick={() => setShowHelp(false)} type="button" aria-label="Tutup penjelasan">
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    )}
                    <div className="relative flex items-center">
                      <div
                        className="absolute left-space-md text-text-muted flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-[22px]">groups</span>
                      </div>
                      <input
                        className="w-full h-[52px] pl-12 pr-space-md rounded-xl bg-surface-white text-on-surface font-body-md text-body-md uppercase tracking-wider shadow-sm focus:outline-none focus:bg-surface-container-low transition-all"
                        id="communityCodeInput" value={code} onChange={(e) => setCode(e.target.value)}
                        placeholder="Contoh: KOM-7821" type="text" />
                    </div>
                    {/* State feedback / Hint area */}
                    {clean && (
                      <div className={`flex items-start gap-space-xs p-space-xs rounded-lg ${codeValid ? 'bg-safe-green-light text-tertiary' : kodeStatus === 'loading' ? 'bg-surface-container-low text-text-muted' : 'bg-warning-yellow-light text-secondary'}`}>
                        <span className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${kodeStatus === 'loading' ? 'animate-spin' : ''}`}>
                          {kodeStatus === 'loading' ? 'progress_activity' : codeValid ? 'check_circle' : 'info'}
                        </span>
                        <span className="font-body-sm text-body-sm leading-snug">
                          {kodeStatus === 'loading' ? (
                            'Memeriksa kode kelas...'
                          ) : codeValid ? (
                            <>Kode Komunitas valid: <strong>{kodeLabel || `Sesi Pelatihan ${clean}`}</strong></>
                          ) : kodeStatus === 'error' ? (
                            kodePesan || 'Gagal memeriksa kode kelas. Coba lagi sebentar lagi.'
                          ) : (
                            'Kode tidak ditemukan, cek lagi atau kosongkan saja bila belajar mandiri.'
                          )}
                        </span>
                      </div>
                    )}
                    <span className="font-body-sm text-body-sm text-text-muted">
                      Dari guru, dosen, perwakilan instansi, atau ketua komunitasmu.
                    </span>
                  </div>
                  {/* Kotak Info Keamanan (Callout) */}
                  <div className="p-space-md rounded-xl bg-surface-container-low flex items-start gap-space-md shadow-sm">
                    <div
                      className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <span className="font-label-md text-label-md text-primary font-bold">Jaminan Privasi
                        TangkisTipu</span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Kami tidak meminta nama asli, nomor HP, atau alamat email. Identitasmu 100%
                        terjaga dan aman dari kebocoran data.
                      </p>
                    </div>
                  </div>
                  {/* Tombol Aksi */}
                  <div className="flex flex-col gap-space-md pt-space-xs">
                    {submitError && (
                      <div className="flex items-start gap-space-xs p-space-sm rounded-xl bg-warning-yellow-light text-secondary">
                        <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
                        <span className="font-body-sm text-body-sm leading-snug">{submitError}</span>
                      </div>
                    )}
                    <button
                      className={`w-full h-[52px] rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary shadow-sm hover:shadow-md flex items-center justify-center gap-space-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed ${nickname.trim() ? '' : 'opacity-70'}`}
                      disabled={submitLoading}
                      id="submitButton" type="submit">
                      <span>{submitLoading ? 'Mendaftarkan...' : 'Mulai Belajar & Tes'}</span>
                      <span className={`material-symbols-outlined text-[20px] ${submitLoading ? 'animate-spin' : ''}`}>
                        {submitLoading ? 'progress_activity' : 'arrow_forward'}
                      </span>
                    </button>
                    <a className="w-full py-space-sm text-center font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-space-xs cursor-pointer"
                      href="#" onClick={(e) => { e.preventDefault(); onHome() }}>
                      <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                      <span>Kembali ke Beranda</span>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Live Random Token Sandbox Preview */}
          <div
            className="mt-space-2xl p-space-lg rounded-2xl bg-surface-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-lg reveal">
            <div className="flex items-center gap-space-md">
              <div
                className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[28px]">key</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg text-on-surface">ID Peserta Unik Kamu
                  (Pratinjau)</span>
                <span className="font-body-sm text-body-sm text-text-muted">Gunakan kode ini nanti jika ingin
                  mencetak Sertifikat TangkisTipu tanpa login.</span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm w-full md:w-auto justify-end">
              <div
                className="px-space-lg py-space-sm rounded-xl bg-surface-container font-mono text-headline-sm font-bold tracking-widest text-primary shadow-inner select-all"
                id="demoIdTag">
                {demoId}
              </div>
              <button
                className="h-11 px-space-md rounded-xl bg-surface-card-subtle hover:bg-surface-container text-primary font-label-sm text-label-sm flex items-center gap-space-xs transition-colors"
                onClick={() => setDemoId(generateParticipantId())} title="Acak ID Baru" type="button">
                <span className="material-symbols-outlined text-[18px]">cached</span>
                <span className="hidden sm:inline">Acak Baru</span>
              </button>
            </div>
          </div>
        </div>
        {/* Modal / Floating Track Switcher */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-space-md fade-in"
            id="trackModal">
            <div
              className="bg-surface-white rounded-2xl p-space-xl max-w-md w-full shadow-xl flex flex-col gap-space-lg pop-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[24px]">tune</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Pilih Jalur Belajar</h2>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-text-muted"
                  onClick={() => setShowModal(false)} type="button">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
              <div className="flex flex-col gap-space-sm">
                {TRACKS.map((t, i) => (
                  <label key={t.label}
                    className={`flex items-start gap-space-md p-space-md rounded-xl cursor-pointer transition-all ${draftTrack === i ? 'bg-surface-container-low shadow-sm' : 'bg-surface-container hover:bg-surface-container-high'}`}>
                    <input className="mt-1 w-5 h-5 text-primary accent-primary" name="trackChoice" type="radio"
                      checked={draftTrack === i} onChange={() => setDraftTrack(i)} />
                    <div className="flex flex-col">
                      <span className={`font-label-md text-label-md font-bold ${draftTrack === i ? 'text-primary' : 'text-on-surface'}`}>
                        {t.label}{draftTrack === i ? ' [Dipilih]' : ''}
                      </span>
                      <span className="font-body-sm text-body-sm text-text-muted">{t.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-space-sm">
                <button
                  className="px-space-lg py-space-sm rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high"
                  onClick={() => setShowModal(false)} type="button">
                  Batal
                </button>
                <button
                  className="px-space-lg py-space-sm rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary shadow-sm"
                  onClick={saveTrack} type="button">
                  Terapkan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
