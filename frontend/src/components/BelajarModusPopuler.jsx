import { useEffect, useMemo, useState } from 'react'
import {
  getModusPopuler,
  getTrackLabel,
  isTrackAvailable,
} from '../data/modulPopuler.jsx'

// ============================================================
// HELPERS
// ============================================================

const LEVEL_STYLE = {
  danger: { chip: 'bg-danger-red-light text-danger-red', dot: 'bg-danger-red' },
  critical: { chip: 'bg-danger-red text-on-error', dot: 'bg-danger-red' },
  warning: { chip: 'bg-warning-yellow-light text-secondary', dot: 'bg-secondary' },
  neutral: { chip: 'bg-surface-container text-text-muted', dot: 'bg-text-muted' },
}

function SectionHead({ num, label, title }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-wider font-bold">
        <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-xs font-bold shrink-0">
          {num}
        </span>
        {label}
      </div>
      <h2 className="font-headline-md text-headline-md text-primary">{title}</h2>
    </div>
  )
}

// ============================================================
// COMING SOON
// ============================================================

function ComingSoonView({ onBack, trackLabel }) {
  return (
    <main className="w-full bg-surface-cream min-h-screen">
      <div className="max-w-[600px] mx-auto px-4 sm:px-margin py-12 sm:py-20 flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-warning-yellow-light text-secondary flex items-center justify-center">
          <span className="material-symbols-outlined text-[28px] sm:text-[32px]">construction</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-primary font-bold">
          Segera Hadir untuk Jalur Ini
        </h1>
        <p className="font-body-md text-body-md text-text-muted leading-relaxed">
          Kurikulum <strong>8 Modus Populer</strong> untuk jalur <strong>{trackLabel || 'ini'}</strong> sedang disusun.
          Saat ini tersedia untuk jalur <strong>Anak & Remaja</strong>, <strong>Dewasa & Karier</strong>, dan <strong>Ramah Lansia</strong>.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-2 h-11 px-6 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Kembali ke Dashboard
        </button>
      </div>
    </main>
  )
}

// ============================================================
// SIDEBAR (desktop only)
// ============================================================

function ModusSidebar({ modusList, total, activeId, readIds, onPick }) {
  return (
    <nav
      className="hidden lg:flex flex-col gap-1 bg-surface-white rounded-2xl border border-border-subtle shadow-sm p-2 sticky top-24"
      aria-label="Daftar modus"
    >
      <div className="px-2 py-2 flex items-center justify-between">
        <span className="font-label-md text-label-md text-on-surface font-bold">8 Modus Populer</span>
        <span className="text-[11px] text-text-muted font-semibold">{readIds.length}/{total}</span>
      </div>
      <ul className="flex flex-col gap-0.5">
        {modusList.map((m) => {
          const isActive = m.id === activeId
          const isRead = readIds.includes(m.id)
          const tone = LEVEL_STYLE[m.levelTone] || LEVEL_STYLE.neutral
          return (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => onPick(m.id)}
                className={`w-full text-left px-2.5 py-2 rounded-xl transition-colors flex items-center gap-2.5 ${
                  isActive ? 'bg-primary-fixed text-primary' : 'hover:bg-surface-container-low'
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[11px] font-bold ${
                    isActive
                      ? 'bg-primary text-on-primary'
                      : isRead
                        ? 'bg-safe-green-light text-tertiary'
                        : 'bg-surface-container text-text-muted'
                  }`}
                >
                  {isRead && !isActive ? (
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  ) : (
                    String(m.num).padStart(2, '0')
                  )}
                </span>
                <span className="flex flex-col min-w-0 flex-1">
                  <span
                    className={`font-label-sm text-label-sm font-semibold truncate ${
                      isActive ? 'text-primary' : 'text-on-surface'
                    }`}
                  >
                    {m.title}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-text-muted">
                    <span className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
                    {m.level}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// ============================================================
// CHIPS MOBILE
// ============================================================

function ModusChipsMobile({ modusList, activeId, readIds, onPick }) {
  return (
    <div className="lg:hidden -mx-4 px-4 mb-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
      <div className="flex gap-2 pb-1">
        {modusList.map((m) => {
          const isActive = m.id === activeId
          const isRead = readIds.includes(m.id)
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onPick(m.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 h-9 px-3 rounded-full font-label-sm text-label-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : isRead
                    ? 'bg-safe-green-light text-tertiary'
                    : 'bg-surface-white text-text-muted border border-border-subtle'
              }`}
              aria-pressed={isActive}
            >
              <span className="material-symbols-outlined text-[14px]">
                {isRead && !isActive ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              <span>Modus {m.num}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================
// MODUS CONTENT
// ============================================================

function ModusContent({ modus, total }) {
  const tone = LEVEL_STYLE[modus.levelTone] || LEVEL_STYLE.neutral
  return (
    <article className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
      <header className="flex flex-col gap-3 pb-5 border-b border-border-subtle">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-semibold">
            <span className="material-symbols-outlined text-[14px] sm:text-[15px]">menu_book</span>
            Modus {String(modus.num).padStart(2, '0')} dari {total}
          </span>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 rounded-full font-label-sm text-label-sm font-semibold ${tone.chip}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
            Level {modus.level}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 ${tone.chip}`}>
            <span className="material-symbols-outlined text-[22px] sm:text-[26px]">{modus.icon}</span>
          </div>
          <h1 className="font-headline-md sm:font-headline-lg text-headline-md sm:text-headline-lg text-primary tracking-tight leading-tight pt-0.5 sm:pt-1">
            {modus.title}
          </h1>
        </div>
      </header>

      <section className="flex flex-col gap-3">
        <SectionHead num="01" label="Ringkasan" title="Singkatnya" />
        <p className="font-body-md text-body-md text-on-surface leading-relaxed max-w-[65ch]">
          {modus.singkatnya}
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHead num="02" label="Modus Operandi" title="Cara Kerja Penipunya" />
        <div className="flex flex-col divide-y divide-border-subtle">
          {modus.caraKerja.map((s, i) => (
            <div key={i} className="py-3 flex items-start gap-2.5 sm:gap-3">
              <span className="text-base sm:text-lg font-extrabold text-primary/40 shrink-0 w-6 sm:w-7 font-headline-md">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-[65ch]">
                {s}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHead num="03" label="Contoh Ilustrasi" title="Contoh Pesan" />
        <div className="rounded-2xl bg-surface-card-subtle border border-border-subtle p-3.5 sm:p-4 lg:p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-danger-red-light text-danger-red flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">chat</span>
            </div>
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-danger-red">
                Pesan dari penipu
              </span>
              <p className="font-body-sm sm:font-body-md text-body-sm sm:text-body-md text-on-surface italic leading-relaxed break-words">
                "{modus.contohPesan}"
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHead num="04" label="Data & Fakta" title="Data Nyata" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {modus.dataNyata.map((d, i) => {
            const t = LEVEL_STYLE[d.tone] || LEVEL_STYLE.neutral
            return (
              <div key={i} className="rounded-2xl p-3.5 sm:p-4 border border-border-subtle bg-surface-white flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted">Statistik</span>
                </div>
                <span className={`font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md font-bold break-words ${
                  d.tone === 'danger' || d.tone === 'critical'
                    ? 'text-danger-red'
                    : d.tone === 'warning'
                      ? 'text-secondary'
                      : 'text-primary'
                }`}>
                  {d.value}
                </span>
                <span className="text-[12px] text-text-muted leading-snug">{d.label}</span>
              </div>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHead num="05" label="Identifikasi" title="Tanda Bahaya" />
        <ul className="flex flex-col divide-y divide-border-subtle">
          {modus.tandaBahaya.map((t, i) => (
            <li key={i} className="py-3 flex items-start gap-2.5 sm:gap-3">
              <span className="material-symbols-outlined text-danger-red text-[18px] sm:text-[20px] shrink-0 mt-0.5">
                priority_high
              </span>
              <span className="font-body-sm sm:font-body-md text-body-sm sm:text-body-md text-on-surface-variant leading-relaxed max-w-[65ch]">
                {t}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHead num="06" label="Langkah Preventif" title="Lakukan Ini" />
        <ul className="flex flex-col divide-y divide-border-subtle">
          {modus.lakukanIni.map((t, i) => (
            <li key={i} className="py-3 flex items-start gap-2.5 sm:gap-3">
              <span className="material-symbols-outlined text-tertiary text-[18px] sm:text-[20px] shrink-0 mt-0.5">
                check_circle
              </span>
              <span className="font-body-sm sm:font-body-md text-body-sm sm:text-body-md text-on-surface-variant leading-relaxed max-w-[65ch]">
                {t}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

// ============================================================
// CELEBRATION
// ============================================================

function CelebrationCard({ onBack, onTandaiSelesai, trackLabel }) {
  const handleClick = () => {
    if (onTandaiSelesai) onTandaiSelesai()
    onBack()
  }
  return (
    <div className="rounded-2xl bg-surface-white border border-border-subtle shadow-sm p-6 sm:p-8 flex flex-col items-center text-center gap-3 pop-in">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-safe-green-light text-tertiary flex items-center justify-center">
        <span className="material-symbols-outlined text-[32px] sm:text-[36px]">workspace_premium</span>
      </div>
      <h3 className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md text-primary font-bold">
        🎉 8 Modus Populer Selesai!
      </h3>
      <p className="font-body-sm sm:font-body-md text-body-sm sm:text-body-md text-text-muted max-w-sm leading-relaxed">
        Kamu sudah menyelesaikan 8 modus populer jalur <strong>{trackLabel}</strong>. Lanjut ke simulasi kasus interaktif untuk mengasah naluri.
      </p>
      <button
        type="button"
        onClick={handleClick}
        className="mt-2 h-11 px-5 sm:px-6 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors inline-flex items-center gap-2 shadow-sm"
      >
        <span className="material-symbols-outlined text-[18px]">check_circle</span>
        <span>Tandai Selesai & Lanjut</span>
      </button>
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function BelajarModusPopuler({
  track = 1,
  readIds = [],
  onSelesaiSatu = () => {},
  onBack = () => {},
}) {
  const trackLabel = getTrackLabel(track)

  if (!isTrackAvailable(track)) {
    return <ComingSoonView onBack={onBack} trackLabel={trackLabel} />
  }

  const modusList = getModusPopuler(track)
  const total = modusList.length

  const trackPrefix = track === 0 ? 'pelajar-' : track === 1 ? 'dewasa-' : 'lansia-'
  const trackReadIds = readIds.filter((id) => id.startsWith(trackPrefix))

  const [activeId, setActiveId] = useState(() => {
    const firstUnread = modusList.find((m) => !trackReadIds.includes(m.id))
    return (firstUnread || modusList[0]).id
  })

  useEffect(() => {
    const firstUnread = modusList.find((m) => !trackReadIds.includes(m.id))
    setActiveId((firstUnread || modusList[0]).id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track])

  const activeIdx = useMemo(
    () => modusList.findIndex((m) => m.id === activeId),
    [modusList, activeId]
  )
  const modus = modusList[activeIdx] || modusList[0]
  const isRead = trackReadIds.includes(activeId)
  const sudahDibaca = trackReadIds.length
  const persen = total > 0 ? Math.round((sudahDibaca / total) * 100) : 0
  const isLast = activeIdx === total - 1
  const allRead = sudahDibaca === total

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeId])

  const pickModus = (id) => setActiveId(id)

  const handleTandaiDanLanjut = () => {
    if (!isRead) onSelesaiSatu(activeId)
    if (!isLast) setActiveId(modusList[activeIdx + 1].id)
  }

  const handleTandaiSelesaiDariCelebration = () => {
    modusList.forEach((m) => {
      if (!trackReadIds.includes(m.id)) onSelesaiSatu(m.id)
    })
  }

  const handlePrev = () => {
    if (activeIdx > 0) setActiveId(modusList[activeIdx - 1].id)
  }

  return (
    <main className="w-full bg-surface-cream min-h-screen">
      {/* Progress bar atas — sticky di bawah Navbar */}
      <div className="w-full bg-surface-container-high h-1 sticky top-20 z-40">
        <div
          className="bg-primary h-full transition-all duration-300 ease-out"
          style={{ width: `${persen}%` }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-margin md:px-margin-tablet lg:px-margin-desktop pt-4 sm:pt-space-lg lg:pt-space-xl pb-6 lg:pb-space-xl">

        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-text-muted font-label-sm text-label-sm mb-3 sm:mb-4">
          <button
            type="button"
            onClick={onBack}
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Dashboard
          </button>
          <span className="text-outline-variant">/</span>
          <span className="text-text-muted">Langkah 2</span>
          <span className="text-outline-variant hidden sm:inline">/</span>
          <span className="text-primary font-bold hidden sm:inline">Pelajari 8 Modus Populer</span>
        </nav>

        {/* Header summary */}
        <div className="bg-surface-white rounded-2xl border border-border-subtle shadow-sm p-3.5 sm:p-4 lg:p-5 mb-3.5 sm:mb-4 lg:mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  Langkah 2
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 rounded-full bg-surface-container-low text-text-muted text-[10px] sm:text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[11px] sm:text-[12px]">menu_book</span>
                  {sudahDibaca} dari {total} modus
                </span>
              </div>
              <h1 className="font-headline-sm sm:font-headline-md lg:font-headline-lg text-headline-sm sm:text-headline-md lg:text-headline-lg text-primary tracking-tight">
                Pelajari 8 Modus Populer
              </h1>
              <p className="font-body-sm sm:font-body-md text-body-sm sm:text-body-md text-text-muted">
                Modus yang paling sering menimpa <strong>{trackLabel}</strong>.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
              <div className="flex flex-col items-start sm:items-end gap-1">
                <span className="font-label-sm text-label-sm text-primary font-bold">{persen}% selesai</span>
                <div className="w-32 sm:w-40 h-2 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className="h-full bg-primary-container rounded-full transition-all duration-500"
                    style={{ width: `${persen}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chips mobile */}
        <ModusChipsMobile modusList={modusList} activeId={activeId} readIds={trackReadIds} onPick={pickModus} />

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          <aside className="hidden lg:block lg:col-span-4">
            <ModusSidebar modusList={modusList} total={total} activeId={activeId} readIds={trackReadIds} onPick={pickModus} />
          </aside>

          <section className="lg:col-span-8 flex flex-col gap-3.5 sm:gap-4 min-w-0">
            {allRead && isLast ? (
              <CelebrationCard
                onBack={onBack}
                onTandaiSelesai={handleTandaiSelesaiDariCelebration}
                trackLabel={trackLabel}
              />
            ) : (
              <>
                <div className="bg-surface-white rounded-2xl border border-border-subtle shadow-sm p-3.5 sm:p-5 lg:p-8">
                  <ModusContent modus={modus} total={total} />
                </div>

                {/* Bottom action bar */}
                <div className="sticky bottom-3 sm:bottom-4 z-30 bg-surface-white rounded-2xl border border-border-subtle shadow-md p-2.5 sm:p-3 lg:p-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={activeIdx === 0}
                      className={`h-11 px-3.5 sm:px-4 rounded-xl font-label-md text-label-md font-semibold inline-flex items-center justify-center gap-1.5 transition-colors ${
                        activeIdx === 0
                          ? 'bg-surface-container text-text-muted cursor-not-allowed'
                          : 'bg-surface-container-low text-primary hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                      <span className="hidden sm:inline">Sebelumnya</span>
                      <span className="sm:hidden">Prev</span>
                    </button>

                    <span className="text-center text-[12px] text-text-muted sm:flex-1 order-first sm:order-none">
                      Modus {modus.num} dari {total}
                      {isRead && (
                        <span className="ml-2 inline-flex items-center gap-1 text-tertiary font-semibold">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          Sudah dibaca
                        </span>
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={handleTandaiDanLanjut}
                      className={`h-11 px-4 sm:px-5 rounded-xl font-label-md text-label-md font-semibold inline-flex items-center justify-center gap-1.5 shadow-sm transition-colors ${
                        isLast
                          ? 'bg-tertiary text-on-tertiary hover:opacity-90'
                          : 'bg-primary text-on-primary hover:bg-primary-container'
                      }`}
                    >
                      {isLast ? (
                        <>
                          <span className="material-symbols-outlined text-[18px]">check_circle</span>
                          <span className="hidden sm:inline">Tandai Selesai</span>
                          <span className="sm:hidden">Selesai</span>
                        </>
                      ) : (
                        <>
                          <span className="hidden sm:inline">
                            {isRead ? 'Lanjut' : 'Tandai Selesai & Lanjut'}
                          </span>
                          <span className="sm:hidden">{isRead ? 'Lanjut' : 'Tandai & Lanjut'}</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}