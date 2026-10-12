import { useEffect, useRef, useState } from 'react'
import {
  SIMULASI_KASUS_DEWASA,
  pickRandomKasusDewasa,
} from '../data/simulasiKasusDewasa.jsx'
import {
  SIMULASI_KASUS_PELAJAR,
  pickRandomKasusPelajar,
} from '../data/simulasiKasusPelajar.jsx'
import {
  SIMULASI_KASUS_LANSIA,
  pickRandomKasusLansia,
} from '../data/simulasiKasusLansia.jsx'

const DELAY_PESAN = 900

const LEVEL_STYLE = {
  danger: { chip: 'bg-danger-red-light text-danger-red', dot: 'bg-danger-red' },
  critical: { chip: 'bg-danger-red text-on-error', dot: 'bg-danger-red' },
  warning: { chip: 'bg-warning-yellow-light text-secondary', dot: 'bg-secondary' },
  neutral: { chip: 'bg-surface-container text-text-muted', dot: 'bg-text-muted' },
}

// ============================================================
// TRACK HELPERS
// ============================================================

function getTrackData(track) {
  const t = Number(track)
  if (t === 0) {
    return {
      label: 'Anak & Remaja',
      pick: pickRandomKasusPelajar,
      total: SIMULASI_KASUS_PELAJAR.length,
    }
  }
  if (t === 2) {
    return {
      label: 'Ramah Lansia',
      pick: pickRandomKasusLansia,
      total: SIMULASI_KASUS_LANSIA.length,
    }
  }
  return {
    label: 'Dewasa & Karier',
    pick: pickRandomKasusDewasa,
    total: SIMULASI_KASUS_DEWASA.length,
  }
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

function PemisahHari({ label = 'Hari ini' }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 my-1.5 sm:my-2 select-none">
      <span className="flex-1 h-px bg-border-subtle" />
      <span className="px-2.5 sm:px-3 py-0.5 rounded-full bg-surface-container-low text-text-muted text-[10px] sm:text-[11px] font-medium tracking-wide uppercase">
        {label}
      </span>
      <span className="flex-1 h-px bg-border-subtle" />
    </div>
  )
}

function TypingIndicator({ kontak }) {
  return (
    <div className="flex items-end gap-1.5 sm:gap-2 self-start pop-in">
      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${kontak.avatarBg} ${kontak.avatarFg}`}>
        <span className="material-symbols-outlined text-[12px] sm:text-[16px]">{kontak.avatarIcon}</span>
      </div>
      <div className="px-2.5 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-bl-sm bg-surface-container-low flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-text-muted typing-dot"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-text-muted typing-dot" style={{ animationDelay: '0.15s' }}></span>
        <span className="w-1.5 h-1.5 rounded-full bg-text-muted typing-dot" style={{ animationDelay: '0.3s' }}></span>
      </div>
    </div>
  )
}

function BubblePesan({ msg, kontak }) {
  const dariLawan = msg.dari === 'lawan'
  const dariSistem = msg.dari === 'sistem'

  if (dariSistem) {
    return (
      <div className="self-center max-w-[92%] sm:max-w-[85%] my-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-surface-container-low text-text-muted text-[11px] sm:text-[12px] italic text-center pop-in">
        {msg.teks}
      </div>
    )
  }

  return (
    <div className={`flex items-end gap-1.5 sm:gap-2 max-w-[92%] sm:max-w-[85%] pop-in ${dariLawan ? 'self-start' : 'self-end flex-row-reverse'}`}>
      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${dariLawan ? `${kontak.avatarBg} ${kontak.avatarFg}` : 'bg-primary text-on-primary'}`}>
        <span className="material-symbols-outlined text-[12px] sm:text-[16px]">
          {dariLawan ? kontak.avatarIcon : 'account_circle'}
        </span>
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <div className={`px-3 sm:px-4 py-2 sm:py-3 text-[13px] sm:text-body-sm leading-snug sm:leading-relaxed whitespace-pre-line shadow-sm break-words ${
          dariLawan
            ? 'bg-surface-container-low text-on-surface rounded-2xl rounded-bl-sm'
            : 'bg-primary-container text-on-primary rounded-2xl rounded-br-sm'
        }`}>
          {msg.teks}
        </div>
        {msg.waktu && (
          <span className={`flex items-center gap-1 text-[9px] sm:text-[10px] text-text-muted ${dariLawan ? 'self-start pl-2' : 'self-end pr-2'}`}>
            {msg.waktu}
            {!dariLawan && <span className="material-symbols-outlined text-[11px] sm:text-[12px] text-primary">done_all</span>}
          </span>
        )}
      </div>
    </div>
  )
}

function PilihanBalasan({ label, opsi, onPick }) {
  return (
    <div className="mt-2.5 sm:mt-3 p-3 sm:p-4 rounded-2xl bg-surface-white border border-border-subtle shadow-sm pop-in">
      <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
        <span className="material-symbols-outlined text-secondary text-[18px] sm:text-[20px] shrink-0">bolt</span>
        <span className="font-label-sm sm:font-label-md text-label-sm sm:text-label-md text-secondary font-bold uppercase tracking-wider truncate">
          {label || 'Bagaimana kamu membalas?'}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {opsi.map((opt, i) => (
          <button
            key={i}
            className="w-full text-left p-2.5 sm:p-3 rounded-xl bg-surface-white border-2 border-border-subtle hover:border-primary hover:bg-surface-container-low active:bg-surface-container-low text-on-surface transition-all flex items-start gap-2.5 sm:gap-3 min-h-[48px] sm:min-h-[56px]"
            onClick={() => onPick(i)}
            type="button"
          >
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-[11px] sm:text-sm shrink-0">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="flex-1 text-[12.5px] sm:text-body-md leading-snug sm:leading-relaxed">
              {opt.teks}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// START SCREEN
// ============================================================

function StartScreen({ sudahSelesai, trackLabel, onMulai, onBack }) {
  return (
    <div className="max-w-[720px] mx-auto px-3 sm:px-margin py-4 sm:py-space-lg lg:py-space-xl">
      <div className="bg-surface-white rounded-2xl border border-border-subtle shadow-sm p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-5">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[24px] sm:text-[30px]">forum</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              Langkah 3
            </span>
            <h1 className="font-headline-sm sm:font-headline-md lg:font-headline-lg text-headline-sm sm:text-headline-md lg:text-headline-lg text-primary font-bold leading-tight">
              Simulasi Kasus Interaktif
            </h1>
          </div>
        </div>

        <p className="font-body-sm sm:font-body-md text-body-sm sm:text-body-md text-text-muted leading-relaxed">
          Kamu akan dihadapkan pada <strong>satu skenario chat acak</strong> dari 8 modus populer jalur <strong>{trackLabel}</strong>. Balas percakapan seperti di dunia nyata, lalu di akhir ambil satu keputusan.
        </p>

        <div className="p-3 sm:p-4 rounded-xl bg-surface-container-low border border-border-subtle flex items-start gap-2.5 sm:gap-3">
          <span className="material-symbols-outlined text-primary text-[20px] sm:text-[22px] shrink-0">info</span>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-label-sm text-label-sm font-bold text-primary">Cara Main</span>
            <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
              Skenario diacak setiap kali kamu memulai. Pilih balasan yang menurutmu paling aman. Kalau salah, kamu bisa mengulang skenario.
            </p>
          </div>
        </div>

        {sudahSelesai && (
          <div className="p-3 sm:p-4 rounded-xl bg-safe-green-light border border-tertiary/20 flex items-start gap-2.5 sm:gap-3 pop-in">
            <span className="material-symbols-outlined text-tertiary text-[20px] sm:text-[22px] shrink-0">check_circle</span>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="font-label-sm text-label-sm font-bold text-tertiary">Sudah dijalankan</span>
              <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                Kamu sudah menyelesaikan simulasi. Kalau mau, kamu bisa coba lagi dengan skenario acak lain.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <button
            type="button"
            onClick={onBack}
            className="h-12 px-5 rounded-xl bg-surface-container-low text-primary font-label-md text-label-md font-semibold inline-flex items-center justify-center gap-2 hover:bg-surface-container active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali ke Dashboard
          </button>
          <button
            type="button"
            onClick={onMulai}
            className="flex-1 h-12 px-6 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold inline-flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.98] transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            {sudahSelesai ? 'Coba Skenario Lain' : 'Mulai Simulasi'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// CHAT VIEW
// ============================================================

function ChatView({ kasus, onSukses, onUlangi, onKeluar }) {
  const [history, setHistory] = useState([])
  const [cursor, setCursor] = useState(0)
  const [phase, setPhase] = useState('auto')
  const [showTyping, setShowTyping] = useState(false)
  const [pendingReaksi, setPendingReaksi] = useState(null)
  const [choice, setChoice] = useState(null)
  const scrollRef = useRef(null)

  const levelStyle = LEVEL_STYLE[kasus.levelTone] || LEVEL_STYLE.neutral

  useEffect(() => {
    setHistory([])
    setCursor(0)
    setPhase('auto')
    setShowTyping(false)
    setPendingReaksi(null)
    setChoice(null)
  }, [kasus.id])

  useEffect(() => {
    if (phase !== 'auto') return
    if (cursor >= kasus.skenario.length) {
      const t = setTimeout(() => setPhase('final'), 500)
      return () => clearTimeout(t)
    }
    const item = kasus.skenario[cursor]
    if (item.dari === 'pilihan') {
      setPhase('choice')
      return
    }
    setShowTyping(true)
    const t = setTimeout(() => {
      setShowTyping(false)
      setHistory((h) => [...h, item])
      setCursor((c) => c + 1)
    }, DELAY_PESAN)
    return () => clearTimeout(t)
  }, [cursor, phase, kasus])

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

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [history.length, showTyping, phase, choice])

  const pilihBalasan = (optIndex) => {
    const item = kasus.skenario[cursor]
    if (!item || item.dari !== 'pilihan') return
    const opt = item.opsi[optIndex]
    setHistory((h) => [...h, { dari: 'kita', teks: opt.teks, waktu: opt.waktu }])
    setShowTyping(true)
    setPendingReaksi({ teks: opt.reaksi, waktu: opt.reaksiWaktu })
    setPhase('reaksi')
  }

  const pilihTindakan = (i) => {
    if (choice !== null) return
    setChoice(i)
  }

  const picked = choice === null ? null : kasus.pilihan[choice]
  const locked = choice !== null
  const currentPilihanEntry = phase === 'choice' ? kasus.skenario[cursor] : null

  return (
    <div
      className="max-w-[900px] mx-auto px-2.5 sm:px-margin py-2 sm:py-space-md lg:py-space-lg"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >

      {/* Header kasus — sticky di mobile */}
      <div className="sticky top-20 z-30 bg-surface-white rounded-2xl border border-border-subtle shadow-sm p-2.5 sm:p-4 mb-2.5 sm:mb-4 pop-in">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={onKeluar}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center hover:bg-surface-container active:scale-95 transition-all shrink-0"
            aria-label="Kembali"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">arrow_back</span>
          </button>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                Simulasi Kasus
              </span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold ${levelStyle.chip}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${levelStyle.dot}`} />
                {kasus.level}
              </span>
            </div>
            <h1 className="font-label-md sm:font-headline-sm text-label-md sm:text-headline-sm text-primary font-bold truncate">
              {kasus.title}
            </h1>
            <span className="text-[10px] sm:text-[11px] text-text-muted truncate">{kasus.kategori}</span>
          </div>
        </div>
      </div>

      {/* Chat container — tinggi adaptif menggunakan dvh */}
      <div
        className="bg-surface-white rounded-2xl border border-border-subtle shadow-sm overflow-hidden flex flex-col"
        style={{
          height: 'min(calc(100dvh - 200px), 640px)',
          minHeight: '420px',
        }}
      >

        {/* Header kontak — sticky dalam chat */}
        <header className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border-subtle flex items-center gap-2.5 sm:gap-3 bg-surface-white shrink-0 sticky top-0 z-10">
          <div className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 ${kasus.kontak.avatarBg} ${kasus.kontak.avatarFg}`}>
            <span className="material-symbols-outlined text-[18px] sm:text-[22px]">{kasus.kontak.avatarIcon}</span>
            {kasus.kontak.online && (
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-safe-green-light border-2 border-surface-white">
                <span className="absolute inset-0.5 rounded-full bg-tertiary"></span>
              </span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md sm:font-label-lg text-label-md sm:text-label-lg text-primary font-bold truncate">
              {kasus.kontak.nama}
            </span>
            <span className="text-[10px] sm:text-[11px] text-text-muted truncate">
              {kasus.kontak.online ? 'Online' : 'Terakhir dilihat baru saja'} • {kasus.kontak.nomor}
            </span>
          </div>
        </header>

        {/* Area pesan — momentum scroll di iOS */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-2.5 sm:px-4 py-3 sm:py-4 flex flex-col gap-2.5 sm:gap-3 bg-surface-card-subtle"
          style={{
            scrollbarWidth: 'thin',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <PemisahHari label="Hari ini" />

          {history.map((msg, i) => (
            <BubblePesan key={i} msg={msg} kontak={kasus.kontak} />
          ))}

          {showTyping && <TypingIndicator kontak={kasus.kontak} />}

          {phase === 'choice' && currentPilihanEntry && (
            <PilihanBalasan
              label={currentPilihanEntry.label}
              opsi={currentPilihanEntry.opsi}
              onPick={pilihBalasan}
            />
          )}

          {phase === 'final' && (
            <div className="mt-2.5 sm:mt-3 p-3 sm:p-4 rounded-2xl bg-surface-white border border-border-subtle shadow-sm pop-in">
              <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                <span className="material-symbols-outlined text-secondary text-[18px] sm:text-[20px] shrink-0">bolt</span>
                <span className="font-label-sm sm:font-label-md text-label-sm sm:text-label-md text-secondary font-bold uppercase tracking-wider truncate">
                  Apa tindakanmu?
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {kasus.pilihan.map((p, i) => {
                  const isPicked = choice === i
                  const isOther = locked && !isPicked
                  const cls = isPicked
                    ? p.benar
                      ? 'bg-safe-green-light border-tertiary text-tertiary'
                      : 'bg-danger-red-light border-danger-red text-danger-red'
                    : isOther
                      ? 'bg-surface-container-low border-border-subtle text-text-muted opacity-50 cursor-not-allowed'
                      : 'bg-surface-white border-border-subtle hover:border-primary hover:bg-surface-container-low active:bg-surface-container-low text-on-surface cursor-pointer'
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`w-full text-left p-2.5 sm:p-3 rounded-xl border-2 transition-all flex items-start gap-2.5 sm:gap-3 min-h-[48px] sm:min-h-[56px] ${cls}`}
                      onClick={() => pilihTindakan(i)}
                      disabled={locked}
                    >
                      <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center font-bold text-[11px] sm:text-sm shrink-0 ${
                        isPicked
                          ? p.benar
                            ? 'bg-tertiary text-on-primary'
                            : 'bg-danger-red text-on-error'
                          : 'bg-surface-container-high text-on-surface'
                      }`}>
                        {isPicked ? (p.benar ? '✓' : '✕') : String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 text-[12.5px] sm:text-body-md leading-snug sm:leading-relaxed">{p.teks}</span>
                    </button>
                  )
                })}
              </div>
              {locked && (
                <p className="mt-2.5 sm:mt-3 text-[10px] sm:text-[11px] text-text-muted flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  Jawaban sudah terkunci.
                </p>
              )}
            </div>
          )}

          {picked && (
            <div className={`p-3 sm:p-4 rounded-2xl pop-in ${picked.benar ? 'bg-safe-green-light text-tertiary' : 'bg-danger-red-light text-danger-red'}`}>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="material-symbols-outlined text-[22px] sm:text-[28px] shrink-0">
                  {picked.benar ? 'check_circle' : 'cancel'}
                </span>
                <div className="flex flex-col gap-1 min-w-0">
                  <strong className="font-label-md sm:font-label-lg text-label-md sm:text-label-lg">
                    {picked.benar ? 'Tepat sekali!' : 'Kurang tepat!'}
                  </strong>
                  <p className="text-[12px] sm:text-body-sm leading-relaxed text-on-surface">{picked.hasil}</p>
                  <div className="mt-2 p-2.5 sm:p-3 rounded-lg bg-surface-white/60 flex items-start gap-1.5 sm:gap-2">
                    <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-primary shrink-0 mt-0.5">
                      tips_and_updates
                    </span>
                    <span className="text-[12px] sm:text-body-sm text-on-surface">{picked.tips}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-on-surface/10">
                {!picked.benar && (
                  <button
                    type="button"
                    onClick={onUlangi}
                    className="w-full sm:w-auto h-11 sm:h-auto px-4 sm:py-2 rounded-xl sm:rounded-lg bg-surface-white text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-container-low active:scale-[0.98] transition-all shadow-sm inline-flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">refresh</span>
                    Ulangi Skenario
                  </button>
                )}
                <button
                  type="button"
                  onClick={picked.benar ? onSukses : onKeluar}
                  className={`w-full sm:w-auto h-11 sm:h-auto px-4 sm:py-2 rounded-xl sm:rounded-lg font-label-sm text-label-sm font-semibold active:scale-[0.98] transition-all shadow-sm inline-flex items-center justify-center gap-1.5 ${
                    picked.benar
                      ? 'bg-primary text-on-primary hover:bg-primary-container'
                      : 'bg-surface-white text-primary hover:bg-surface-container-low'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {picked.benar ? 'check_circle' : 'home'}
                  </span>
                  {picked.benar ? 'Tandai Selesai & Lanjut' : 'Kembali ke Dashboard'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer dummy input — selalu di bawah chat */}
        <footer
          className="px-2.5 sm:px-4 py-2.5 sm:py-3 bg-surface-container-low border-t border-border-subtle shrink-0"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-white flex items-center justify-center text-text-muted shrink-0 active:scale-95 transition-transform"
              type="button"
              aria-label="Mic"
            >
              <span className="material-symbols-outlined text-[16px] sm:text-[18px]">mic</span>
            </button>
            <div className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-surface-white flex items-center gap-2 min-w-0">
              <span className="text-[11px] sm:text-[12px] text-text-muted select-none truncate">
                {phase === 'choice' && 'Pilih balasanmu di atas…'}
                {phase === 'final' && !locked && 'Pilih tindakanmu di atas…'}
                {phase === 'final' && locked && 'Jawaban terkunci.'}
                {(phase === 'auto' || phase === 'reaksi') && 'Menunggu pesan berikutnya…'}
              </span>
            </div>
            <button
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform"
              type="button"
              aria-label="Kirim"
            >
              <span className="material-symbols-outlined text-[16px] sm:text-[18px]">send</span>
            </button>
          </div>
        </footer>
      </div>

      {/* Fakta kasus — di bawah chat */}
      <div className="mt-2.5 sm:mt-4 p-3 sm:p-4 rounded-2xl bg-warning-yellow-light border border-border-subtle pop-in">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="material-symbols-outlined text-secondary text-[18px] sm:text-[20px]">history_edu</span>
          <span className="font-label-sm sm:font-label-md text-label-sm sm:text-label-md text-secondary font-bold uppercase tracking-wider">
            Kasus Nyata
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">{kasus.fakta}</p>
      </div>
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function SimulasiKasusInteraktif({
  track = 1,
  sudahDijalankan = false,
  onSelesai = () => {},
  onBack = () => {},
}) {
  const [kasusAktif, setKasusAktif] = useState(null)
  const trackData = getTrackData(track)

  const mulai = () => {
    const kasus = trackData.pick()
    setKasusAktif(kasus)
    window.scrollTo({ top: 0 })
  }

  const handleSukses = () => {
    onSelesai()
    setKasusAktif(null)
    onBack()
  }

  const handleUlangi = () => {
    const kasus = trackData.pick()
    setKasusAktif(kasus)
    window.scrollTo({ top: 0 })
  }

  const handleKeluar = () => {
    setKasusAktif(null)
    onBack()
  }

  return (
    <main className="w-full bg-surface-cream min-h-screen">
      {kasusAktif ? (
        <ChatView
          kasus={kasusAktif}
          onSukses={handleSukses}
          onUlangi={handleUlangi}
          onKeluar={handleKeluar}
        />
      ) : (
        <StartScreen
          sudahSelesai={sudahDijalankan}
          trackLabel={trackData.label}
          onMulai={mulai}
          onBack={onBack}
        />
      )}
    </main>
  )
}