import { useEffect, useRef, useState } from 'react'

const DELAY_PESAN = 950

function PemisahHari({ label = 'Hari ini' }) {
  return (
    <div className="flex items-center gap-3 my-2 select-none">
      <span className="flex-1 h-px bg-border-subtle" />
      <span className="px-3 py-0.5 rounded-full bg-surface-container-low text-text-muted text-[11px] font-medium tracking-wide uppercase">
        {label}
      </span>
      <span className="flex-1 h-px bg-border-subtle" />
    </div>
  )
}

function TypingIndicator({ kontak, from = 'lawan' }) {
  const dariLawan = from === 'lawan'
  return (
    <div className={`flex items-end gap-1.5 sm:gap-2 pop-in ${dariLawan ? 'self-start' : 'self-end flex-row-reverse'}`}>
      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${
        dariLawan ? `${kontak.avatarBg} ${kontak.avatarFg}` : 'bg-primary text-on-primary'
      }`}>
        <span className="material-symbols-outlined text-[14px] sm:text-[16px]">
          {dariLawan ? kontak.avatarIcon : 'account_circle'}
        </span>
      </div>
      <div className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl flex items-center gap-1.5 ${
        dariLawan
          ? 'rounded-bl-sm bg-surface-container-low'
          : 'rounded-br-sm bg-primary-container'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full typing-dot ${dariLawan ? 'bg-text-muted' : 'bg-on-primary'}`}></span>
        <span className={`w-1.5 h-1.5 rounded-full typing-dot ${dariLawan ? 'bg-text-muted' : 'bg-on-primary'}`} style={{ animationDelay: '0.15s' }}></span>
        <span className={`w-1.5 h-1.5 rounded-full typing-dot ${dariLawan ? 'bg-text-muted' : 'bg-on-primary'}`} style={{ animationDelay: '0.3s' }}></span>
      </div>
    </div>
  )
}

function BubblePesan({ msg, kontak }) {
  const dariLawan = msg.dari === 'lawan'
  const dariSistem = msg.dari === 'sistem'

  if (dariSistem) {
    return (
      <div className="self-center max-w-[85%] sm:max-w-[80%] my-1 px-3 sm:px-4 py-2 rounded-xl bg-surface-container-low text-text-muted text-[11px] sm:text-[12px] italic text-center pop-in">
        {msg.teks}
      </div>
    )
  }

  return (
    <div className={`flex items-end gap-1.5 sm:gap-2 max-w-[90%] sm:max-w-[85%] pop-in ${dariLawan ? 'self-start' : 'self-end flex-row-reverse'}`}>
      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${
        dariLawan ? `${kontak.avatarBg} ${kontak.avatarFg}` : 'bg-primary text-on-primary'
      }`}>
        <span className="material-symbols-outlined text-[14px] sm:text-[16px]">
          {dariLawan ? kontak.avatarIcon : 'account_circle'}
        </span>
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <div
          className={`px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-body-sm leading-relaxed whitespace-pre-line shadow-sm break-words ${
            dariLawan
              ? 'bg-surface-container-low text-on-surface rounded-2xl rounded-bl-sm'
              : 'bg-primary-container text-on-primary rounded-2xl rounded-br-sm'
          }`}
        >
          {msg.teks}
        </div>
        {msg.waktu && (
          <span className={`flex items-center gap-1 text-[10px] text-text-muted ${dariLawan ? 'self-start pl-2' : 'self-end pr-2'}`}>
            {msg.waktu}
            {!dariLawan && (
              <span className="material-symbols-outlined text-[12px] text-primary" aria-hidden="true">done_all</span>
            )}
          </span>
        )}
      </div>
    </div>
  )
}

// Kartu pilihan balasan — tanpa badge ronde
function PilihanBalasan({ label, opsi, onPick }) {
  return (
    <div className="mt-3 sm:mt-space-md p-3 sm:p-space-md rounded-2xl bg-surface-white border border-border-subtle shadow-sm pop-in">
      <div className="flex items-center gap-2 mb-2.5 sm:mb-space-sm">
        <span className="material-symbols-outlined text-secondary text-[18px] sm:text-[20px] shrink-0">bolt</span>
        <span className="font-label-sm sm:font-label-md text-label-sm sm:text-label-md text-secondary font-bold uppercase tracking-wider truncate">
          {label || 'Pilih balasanmu'}
        </span>
      </div>
      <div className="flex flex-col gap-2 sm:gap-space-sm">
        {opsi.map((opt, i) => (
          <button
            key={i}
            className="w-full text-left p-2.5 sm:p-space-sm rounded-xl bg-surface-white border-2 border-border-subtle hover:border-primary hover:bg-surface-container-low text-on-surface transition-all flex items-start gap-2 sm:gap-space-sm min-h-[52px]"
            onClick={() => onPick(i)}
            type="button"
          >
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-[12px] sm:text-sm shrink-0">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="flex-1 text-[13px] sm:text-body-md leading-relaxed">{opt.teks}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function SimulasiChatModul({ content, onBack = () => {}, onModul = () => {}, onBeranda = () => {} }) {
  const [history, setHistory] = useState([])
  const [cursor, setCursor] = useState(0)
  const [phase, setPhase] = useState('auto')        // 'auto' | 'choice' | 'reaksi' | 'final'
  const [showTyping, setShowTyping] = useState(false)
  const [typingSide, setTypingSide] = useState('lawan')
  const [pendingReaksi, setPendingReaksi] = useState(null)
  const [choice, setChoice] = useState(null)        // pilihan final (0/1) — sekali dipilih, tidak bisa diganti
  const [activeTab, setActiveTab] = useState('chat')
  const scrollRef = useRef(null)

  // Reset saat modul berubah
  useEffect(() => {
    setHistory([])
    setCursor(0)
    setPhase('auto')
    setShowTyping(false)
    setTypingSide('lawan')
    setPendingReaksi(null)
    setChoice(null)
    setActiveTab('chat')
  }, [content.id])

  // ====== FASE AUTO ======
  useEffect(() => {
    if (phase !== 'auto') return

    if (cursor >= content.skenario.length) {
      const t = setTimeout(() => setPhase('final'), 500)
      return () => clearTimeout(t)
    }

    const item = content.skenario[cursor]

    if (item.dari === 'pilihan') {
      setPhase('choice')
      return
    }

    const side = item.dari === 'kita' ? 'kita' : 'lawan'
    setTypingSide(side)
    setShowTyping(true)

    const t = setTimeout(() => {
      setShowTyping(false)
      setHistory((h) => [...h, item])
      setCursor((c) => c + 1)
    }, DELAY_PESAN)

    return () => clearTimeout(t)
  }, [cursor, phase, content.skenario])

  // ====== FASE REAKSI ======
  useEffect(() => {
    if (phase !== 'reaksi' || pendingReaksi === null) return

    const t = setTimeout(() => {
      setShowTyping(false)
      setHistory((h) => [...h, { dari: 'lawan', teks: pendingReaksi.teks, waktu: pendingReaksi.waktu }])
      setPendingReaksi(null)
      setCursor((c) => c + 1)
      setPhase('auto')
    }, DELAY_PESAN)

    return () => clearTimeout(t)
  }, [phase, pendingReaksi])

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [history.length, showTyping, phase, choice])

  const pilihBalasan = (optIndex) => {
    const item = content.skenario[cursor]
    if (!item || item.dari !== 'pilihan') return
    const opt = item.opsi[optIndex]

    setHistory((h) => [...h, { dari: 'kita', teks: opt.teks, waktu: opt.waktu }])
    setTypingSide('lawan')
    setShowTyping(true)
    setPendingReaksi({ teks: opt.reaksi, waktu: opt.reaksiWaktu })
    setPhase('reaksi')
  }

  // Handler final: hanya bisa dipilih sekali
  const pilihTindakan = (i) => {
    if (choice !== null) return
    setChoice(i)
  }

  const picked = choice === null ? null : content.pilihan[choice]

  const reset = () => {
    setHistory([])
    setCursor(0)
    setPhase('auto')
    setShowTyping(false)
    setTypingSide('lawan')
    setPendingReaksi(null)
    setChoice(null)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentPilihanEntry = phase === 'choice' ? content.skenario[cursor] : null
  const locked = choice !== null

  return (
    <main className="w-full bg-surface-cream min-h-screen">
      <div className="w-full max-w-[1400px] mx-auto px-margin sm:px-margin-tablet lg:px-margin-desktop py-space-md sm:py-space-lg">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-space-md mb-3 sm:mb-space-lg">
          <div className="flex items-center gap-2 sm:gap-space-sm min-w-0 flex-1">
            <button
              className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-white shadow-sm text-primary hover:bg-surface-container-low transition-colors shrink-0"
              onClick={onBack}
              type="button"
              aria-label="Kembali ke modul"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">arrow_back</span>
            </button>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 text-text-muted text-[11px] sm:text-label-sm">
                <span>Modul {content.modulNum}</span>
                <span>•</span>
                <span className="truncate">{content.kategori}</span>
              </div>
              <h1 className="font-label-lg sm:font-headline-sm text-label-lg sm:text-headline-sm text-primary truncate leading-tight">
                Simulasi Chat: {content.modulTitle}
              </h1>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-warning-yellow-light text-secondary text-[11px] sm:text-label-sm font-semibold self-start sm:self-auto shrink-0">
            <span className="material-symbols-outlined text-[14px] sm:text-[16px]">warning</span>
            Latihan Aman • Tanpa Risiko
          </span>
        </div>

        {/* MOBILE TAB SWITCHER */}
        <div className="lg:hidden mb-3 grid grid-cols-3 gap-1 p-1 bg-surface-white rounded-xl shadow-sm">
          <button
            onClick={() => handleTabChange('chat')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[12px] sm:text-[13px] font-semibold transition-colors ${
              activeTab === 'chat' ? 'bg-primary text-on-primary shadow-sm' : 'text-text-muted hover:bg-surface-container-low'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">chat</span>
            <span>Chat</span>
          </button>
          <button
            onClick={() => handleTabChange('kontak')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[12px] sm:text-[13px] font-semibold transition-colors ${
              activeTab === 'kontak' ? 'bg-primary text-on-primary shadow-sm' : 'text-text-muted hover:bg-surface-container-low'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">person</span>
            <span>Kontak</span>
          </button>
          <button
            onClick={() => handleTabChange('bahaya')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[12px] sm:text-[13px] font-semibold transition-colors ${
              activeTab === 'bahaya' ? 'bg-primary text-on-primary shadow-sm' : 'text-text-muted hover:bg-surface-container-low'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">gpp_maybe</span>
            <span>Bahaya</span>
          </button>
        </div>

        {/* GRID 3 PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-5">

          {/* PANEL KIRI */}
          <aside className="hidden lg:flex lg:col-span-3 flex-col bg-surface-white rounded-2xl shadow-sm overflow-hidden h-[640px] reveal">
            <div className="p-space-md border-b border-border-subtle">
              <div className="flex items-center gap-space-sm">
                <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">account_circle</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-primary font-bold truncate">Kamu</span>
                  <span className="font-body-sm text-body-sm text-text-muted truncate">Peserta TangkisTipu</span>
                </div>
                <button
                  className="ml-auto w-8 h-8 rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-primary transition-colors"
                  type="button"
                  aria-label="Edit profil"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
              </div>
            </div>

            <div className="p-space-md pb-space-sm">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-surface-container-low">
                <span className="material-symbols-outlined text-[18px] text-text-muted">search</span>
                <input
                  className="flex-1 bg-transparent outline-none font-body-sm text-body-sm text-on-surface placeholder:text-text-muted"
                  placeholder="Cari percakapan..."
                  type="text"
                  readOnly
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {[
                { nama: content.kontak.nama, preview: content.skenario[content.skenario.length - 1]?.reaksi || content.skenario[content.skenario.length - 1]?.teks || '', waktu: '21:17', badge: 1, aktif: true, icon: content.kontak.avatarIcon, bg: content.kontak.avatarBg, fg: content.kontak.avatarFg },
                { nama: 'Lisa Roy', preview: 'Hi, are you available tomorrow?', waktu: '10:35', badge: 1, aktif: false, icon: 'person', bg: 'bg-primary-fixed', fg: 'text-primary' },
                { nama: 'Jamie Taylor', preview: 'Nice one. Will do it tomorrow', waktu: '10:35', badge: 0, cek: true, aktif: false, icon: 'person', bg: 'bg-secondary-fixed', fg: 'text-secondary' },
                { nama: 'Jason Roy', preview: "That's great. Looking forward...", waktu: '10:35', badge: 0, cek: true, aktif: false, icon: 'person', bg: 'bg-tertiary-fixed', fg: 'text-tertiary' },
                { nama: 'Amy Frost', preview: 'Hi, will you start working?', waktu: '10:35', badge: 0, cek: true, aktif: false, icon: 'person', bg: 'bg-surface-container-high', fg: 'text-on-surface-variant' },
                { nama: 'Paul Wilson', preview: 'See you tomorrow champ', waktu: '10:35', badge: 0, cek: true, aktif: false, icon: 'person', bg: 'bg-surface-container-high', fg: 'text-on-surface-variant' },
              ].map((k, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-space-sm px-space-md py-space-sm cursor-default transition-colors ${
                    k.aktif ? 'bg-primary-fixed/40' : 'hover:bg-surface-container-low'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${k.bg} ${k.fg}`}>
                    <span className="material-symbols-outlined text-[20px]">{k.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-label-md text-label-md truncate ${k.aktif ? 'text-primary font-bold' : 'text-on-surface font-semibold'}`}>
                        {k.nama}
                      </span>
                      <span className="text-[11px] text-text-muted shrink-0">{k.waktu}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-body-sm text-body-sm text-text-muted truncate">{k.preview}</span>
                      {k.badge > 0 && (
                        <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                          {k.badge}
                        </span>
                      )}
                      {k.cek && (
                        <span className="material-symbols-outlined text-[14px] text-primary shrink-0">done_all</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-space-sm border-t border-border-subtle bg-surface-container-low">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-surface-white">
                <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
                <span className="font-label-sm text-label-sm text-text-muted">Simulasi terisolasi • Aman</span>
              </div>
            </div>
          </aside>

          {/* PANEL TENGAH */}
          <section
            className={`lg:col-span-6 bg-surface-white rounded-2xl shadow-sm overflow-hidden flex-col
              h-[calc(100vh-260px)] min-h-[480px] max-h-[720px]
              lg:h-[640px] lg:max-h-[640px] lg:flex
              ${activeTab === 'chat' ? 'flex' : 'hidden lg:flex'}`}
          >
            <header className="px-3 sm:px-space-md py-2.5 sm:py-space-sm border-b border-border-subtle flex items-center justify-between gap-2 sm:gap-space-sm bg-surface-white shrink-0">
              <div className="flex items-center gap-2 sm:gap-space-sm min-w-0">
                <div className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 ${content.kontak.avatarBg} ${content.kontak.avatarFg}`}>
                  <span className="material-symbols-outlined text-[18px] sm:text-[22px]">{content.kontak.avatarIcon}</span>
                  {content.kontak.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-safe-green-light border-2 border-surface-white">
                      <span className="absolute inset-0.5 rounded-full bg-tertiary"></span>
                    </span>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md sm:font-label-lg text-label-md sm:text-label-lg text-primary font-bold truncate">
                    {content.kontak.nama}
                  </span>
                  <span className="text-[11px] sm:font-label-sm sm:text-label-sm text-text-muted truncate">
                    {content.kontak.online ? 'Online' : 'Terakhir dilihat baru saja'} • {content.kontak.nomor}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1 text-text-muted shrink-0">
                <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-surface-container-low flex items-center justify-center transition-colors" type="button" aria-label="Cari">
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px]">search</span>
                </button>
                <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-surface-container-low flex items-center justify-center transition-colors" type="button" aria-label="Favorit">
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px]">favorite_border</span>
                </button>
                <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-surface-container-low flex items-center justify-center transition-colors" type="button" aria-label="Notifikasi">
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px]">notifications_none</span>
                </button>
              </div>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-3 sm:px-space-md py-3 sm:py-space-md flex flex-col gap-2.5 sm:gap-3 bg-surface-card-subtle"
              style={{ scrollbarWidth: 'thin' }}
            >
              <PemisahHari label="Hari ini" />

              {history.map((msg, i) => (
                <BubblePesan key={i} msg={msg} kontak={content.kontak} />
              ))}

              {showTyping && <TypingIndicator kontak={content.kontak} from={typingSide} />}

              {/* FASE: pilih balasan */}
              {phase === 'choice' && currentPilihanEntry && (
                <PilihanBalasan
                  label={currentPilihanEntry.label}
                  opsi={currentPilihanEntry.opsi}
                  onPick={pilihBalasan}
                />
              )}

              {/* FASE FINAL: pertanyaan tindakan — jawaban dikunci setelah dipilih */}
              {phase === 'final' && (
                <div className="mt-3 sm:mt-space-md p-3 sm:p-space-md rounded-2xl bg-surface-white border border-border-subtle shadow-sm pop-in">
                  <div className="flex items-center gap-2 mb-2.5 sm:mb-space-sm">
                    <span className="material-symbols-outlined text-secondary text-[18px] sm:text-[20px]">bolt</span>
                    <span className="font-label-sm sm:font-label-md text-label-sm sm:text-label-md text-secondary font-bold uppercase tracking-wider">
                      Apa tindakanmu?
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-space-sm">
                    {content.pilihan.map((p, i) => {
                      const isPicked = choice === i
                      const isOther = locked && !isPicked
                      const cls = isPicked
                        ? p.benar
                          ? 'bg-safe-green-light border-tertiary text-tertiary'
                          : 'bg-danger-red-light border-danger-red text-danger-red'
                        : isOther
                          ? 'bg-surface-container-low border-border-subtle text-text-muted opacity-50 cursor-not-allowed'
                          : 'bg-surface-white border-border-subtle hover:border-primary hover:bg-surface-container-low text-on-surface cursor-pointer'
                      return (
                        <button
                          key={i}
                          className={`w-full text-left p-2.5 sm:p-space-sm rounded-xl border-2 transition-all flex items-start gap-2 sm:gap-space-sm min-h-[52px] ${cls}`}
                          onClick={() => pilihTindakan(i)}
                          disabled={locked}
                          type="button"
                          aria-disabled={locked}
                        >
                          <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center font-bold text-[12px] sm:text-sm shrink-0 ${
                            isPicked
                              ? p.benar ? 'bg-tertiary text-on-primary' : 'bg-danger-red text-on-error'
                              : 'bg-surface-container-high text-on-surface'
                          }`}>
                            {isPicked ? (p.benar ? '✓' : '✕') : String.fromCharCode(65 + i)}
                          </span>
                          <span className="flex-1 text-[13px] sm:text-body-md leading-relaxed">{p.teks}</span>
                        </button>
                      )
                    })}
                  </div>
                  {locked && (
                    <p className="mt-2.5 sm:mt-space-sm text-[11px] sm:text-label-sm text-text-muted flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] sm:text-[16px] shrink-0">lock</span>
                      Jawaban sudah terkunci. Klik "Ulangi Simulasi" untuk mencoba lagi.
                    </p>
                  )}
                </div>
              )}

              {picked && (
                <div className={`p-3 sm:p-space-md rounded-2xl pop-in ${picked.benar ? 'bg-safe-green-light text-tertiary' : 'bg-danger-red-light text-danger-red'}`}>
                  <div className="flex items-start gap-2 sm:gap-space-sm">
                    <span className="material-symbols-outlined text-[22px] sm:text-[28px] shrink-0">
                      {picked.benar ? 'check_circle' : 'cancel'}
                    </span>
                    <div className="flex flex-col gap-1 min-w-0">
                      <strong className="font-label-md sm:font-label-lg text-label-md sm:text-label-lg">
                        {picked.benar ? 'Tepat sekali!' : 'Kurang tepat!'}
                      </strong>
                      <p className="text-[12px] sm:text-body-sm leading-relaxed text-on-surface">{picked.hasil}</p>
                      <div className="mt-2 p-2 sm:p-space-xs rounded-lg bg-surface-white/60 flex items-start gap-1.5 sm:gap-2">
                        <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-primary shrink-0 mt-0.5">tips_and_updates</span>
                        <span className="text-[12px] sm:text-body-sm text-on-surface">{picked.tips}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-space-xs mt-3 sm:mt-space-md pt-3 sm:pt-space-md border-t border-on-surface/10">
                    <button
                      className="inline-flex items-center gap-1.5 px-3 sm:px-space-md py-2 sm:py-space-xs rounded-lg bg-surface-white text-primary text-[12px] sm:text-label-sm font-semibold hover:bg-surface-container-low transition-colors shadow-sm"
                      onClick={reset}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px] sm:text-[16px]">refresh</span>
                      Ulangi Simulasi
                    </button>
                    <button
                      className="inline-flex items-center gap-1.5 px-3 sm:px-space-md py-2 sm:py-space-xs rounded-lg bg-primary text-on-primary text-[12px] sm:text-label-sm font-semibold hover:bg-primary-container transition-colors shadow-sm"
                      onClick={onModul}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px] sm:text-[16px]">menu_book</span>
                      Kembali ke Modul
                    </button>
                  </div>
                </div>
              )}
            </div>

            <footer className="px-3 sm:px-space-md py-2.5 sm:py-space-sm bg-surface-container-low border-t border-border-subtle shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface-white flex items-center justify-center text-text-muted shrink-0" type="button" aria-label="Rekam suara">
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px]">mic</span>
                </button>
                <div className="flex-1 px-3 sm:px-space-md py-2 sm:py-2.5 rounded-full bg-surface-white flex items-center gap-2 min-w-0">
                  <span className="text-[12px] sm:text-body-sm text-text-muted select-none truncate">
                    {phase === 'choice' && 'Pilih balasanmu di atas…'}
                    {phase === 'final' && !locked && 'Pilih tindakanmu di atas…'}
                    {phase === 'final' && locked && 'Jawaban terkunci — klik Ulangi Simulasi untuk mencoba lagi'}
                    {(phase === 'auto' || phase === 'reaksi') && 'Menunggu pesan berikutnya…'}
                  </span>
                </div>
                <button className="hidden sm:flex w-10 h-10 rounded-full bg-surface-white items-center justify-center text-text-muted shrink-0" type="button" aria-label="Lampiran">
                  <span className="material-symbols-outlined text-[20px]">attach_file</span>
                </button>
                <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm" type="button" aria-label="Kirim">
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px]">send</span>
                </button>
              </div>
            </footer>
          </section>

          {/* PANEL KANAN */}
          <aside
            className={`lg:col-span-3 flex-col gap-3 lg:gap-4 overflow-y-auto
              h-[calc(100vh-260px)] min-h-[480px] max-h-[720px]
              lg:h-[640px] lg:max-h-[640px]
              ${activeTab === 'chat' ? 'hidden lg:flex' : 'flex'}`}
            style={{ scrollbarWidth: 'thin' }}
          >
            <div className={`${activeTab === 'kontak' ? 'flex' : 'hidden'} lg:flex bg-surface-white rounded-2xl shadow-sm p-4 sm:p-space-md flex-col items-center text-center gap-3 sm:gap-space-sm`}>
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${content.kontak.avatarBg} ${content.kontak.avatarFg}`}>
                <span className="material-symbols-outlined text-[32px] sm:text-[40px]">{content.kontak.avatarIcon}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">{content.kontak.nama}</span>
                <span className="text-[12px] sm:text-body-sm text-text-muted">{content.kontak.peran}</span>
                <span className="font-mono text-[10px] sm:text-[11px] text-text-muted mt-1">{content.kontak.nomor}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-space-xs w-full pt-1 sm:pt-space-xs">
                <button className="flex flex-col items-center gap-1 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors text-primary" type="button">
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]">chat</span>
                  <span className="text-[11px] sm:text-label-sm font-semibold">Chat</span>
                </button>
                <button className="flex flex-col items-center gap-1 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors text-primary" type="button">
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]">videocam</span>
                  <span className="text-[11px] sm:text-label-sm font-semibold">Video</span>
                </button>
              </div>
            </div>

            <div className={`${activeTab === 'bahaya' ? 'flex' : 'hidden'} lg:flex bg-danger-red-light/60 rounded-2xl shadow-sm p-4 sm:p-space-md flex-col gap-3 sm:gap-space-sm`}>
              <div className="flex items-center gap-2 text-danger-red">
                <span className="material-symbols-outlined text-[20px] sm:text-[22px]">gpp_maybe</span>
                <span className="font-label-md text-label-md font-bold uppercase tracking-wider">Tanda Bahaya</span>
              </div>
              <ul className="flex flex-col gap-2">
                {content.peringatan.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] sm:text-body-sm text-on-surface">
                    <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-danger-red shrink-0 mt-0.5">priority_high</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${activeTab === 'bahaya' ? 'flex' : 'hidden'} lg:flex bg-warning-yellow-light rounded-2xl shadow-sm p-4 sm:p-space-md flex-col gap-2 sm:gap-space-xs`}>
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">history_edu</span>
                <span className="font-label-md text-label-md font-bold uppercase tracking-wider">Kasus Nyata</span>
              </div>
              <p className="text-[12px] sm:text-body-sm text-on-surface leading-relaxed">{content.fakta}</p>
            </div>

            <div className="bg-surface-white rounded-2xl shadow-sm p-4 sm:p-space-md flex flex-col gap-1.5 sm:gap-space-xs">
              <span className="text-[10px] sm:text-label-sm text-text-muted uppercase tracking-wider font-semibold">Aksi Cepat</span>
              <button className="flex items-center gap-2 px-2.5 sm:px-space-sm py-2 rounded-lg hover:bg-surface-container-low transition-colors text-left" type="button">
                <span className="material-symbols-outlined text-[16px] sm:text-[18px] text-primary">flag</span>
                <span className="text-[13px] sm:text-label-md font-semibold text-on-surface">Laporkan Kontak</span>
              </button>
              <button className="flex items-center gap-2 px-2.5 sm:px-space-sm py-2 rounded-lg hover:bg-surface-container-low transition-colors text-left" type="button">
                <span className="material-symbols-outlined text-[16px] sm:text-[18px] text-primary">block</span>
                <span className="text-[13px] sm:text-label-md font-semibold text-on-surface">Blokir Nomor</span>
              </button>
              <button
                className="flex items-center gap-2 px-2.5 sm:px-space-sm py-2 rounded-lg hover:bg-surface-container-low transition-colors text-left"
                onClick={onBeranda}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px] text-primary">home</span>
                <span className="text-[13px] sm:text-label-md font-semibold text-on-surface">Kembali ke Beranda</span>
              </button>
            </div>
          </aside>
        </div>

        {/* MOBILE BOTTOM ACTION BAR */}
        <div className="flex lg:hidden items-center justify-between gap-2 mt-3">
          <button
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-surface-white text-primary text-[12px] font-semibold shadow-sm"
            onClick={onBack}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Kembali ke Modul
          </button>
          <button
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-primary text-on-primary text-[12px] font-semibold shadow-sm"
            onClick={onBeranda}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">home</span>
            Beranda
          </button>
        </div>
      </div>
    </main>
  )
}