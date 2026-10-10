import { useEffect, useState } from 'react'

const NAV = [
  { id: 'cara-kerja', label: 'Cara Kerja Penipunya', meta: '4 Langkah' },
  { id: 'ciri-ciri', label: 'Ciri-Ciri yang Harus Dikenali', meta: '5 Tanda' },
  { id: 'studi-kasus', label: 'Studi Kasus', meta: '1 Menit' },
  { id: 'simulasi', label: 'Contoh Simulasi Chat', meta: 'Latihan', latihan: true },
  { id: 'lakukan', label: 'Yang Harus Kamu Lakukan', meta: '5 Tips' },
  { id: 'terlanjur', label: 'Kalau Sudah Terlanjur', meta: '4 Langkah' },
  { id: 'lapor', label: 'Tempat Melapor', meta: '4 Kanal' },
]

function SectionHead({ num, label, title, revealClass = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${revealClass}`}>
      <div
        className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-wider font-bold">
        <span
            className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-xs font-bold">{num}</span>
        {label}
      </div>
      <h2 className="font-headline-md text-headline-md text-primary">{title}</h2>
    </div>
  )
}

export default function ModulDetail({ content: c, onBack = () => {}, onSimulasi = () => {} }) {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(NAV[0].id)
  const [choice, setChoice] = useState(null)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-96px 0px -55% 0px' }
    )
    NAV.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const goto = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const picked = choice === null ? null : c.simulasi.pilihan[choice]

  return (
    <main className="w-full bg-surface min-h-screen">
      <div className="flex flex-col w-full">
        <div className="w-full bg-surface">
          <div className="w-full bg-surface-container-high h-1 sticky top-20 z-40">
            <div className="bg-primary h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}></div>
          </div>
          <div className="max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
            <nav
              className="flex flex-wrap items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mb-space-lg reveal">
              <a className="hover:text-primary transition-colors flex items-center gap-1 text-on-surface-variant cursor-pointer"
                href="#" onClick={(e) => { e.preventDefault(); onBack() }}>
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Semua Modul
              </a>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface-variant">{c.jalur}</span>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-bold">Modul {c.num}</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-start">
              <article className="lg:col-span-8 flex flex-col gap-space-2xl w-full">
                <header
                  className="flex flex-col gap-space-md pb-space-lg border-b border-surface-container-high reveal">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-semibold">
                      <span className="material-symbols-outlined text-[15px]">sports_esports</span>
                      Modul {c.num} • {c.jalur}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-safe-green-light text-tertiary font-label-sm text-label-sm font-medium">
                      <span className="material-symbols-outlined text-[15px]">verified</span>
                      Tingkat {c.level}
                    </span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight leading-tight pt-1">
                    {c.title}
                  </h1>
                </header>

                <section className="flex flex-col gap-space-lg reveal" id="cara-kerja">
                  <SectionHead num="01" label="Modus Operandi" title="Cara Kerja Penipunya" />
                  <div className="flex flex-col divide-y divide-surface-container-high">
                    {c.langkah.map((s, i) => (
                      <div key={s.title} className="py-space-md flex items-start gap-space-md group">
                        <span
                          className="text-2xl font-extrabold text-primary/40 shrink-0 font-headline-lg w-8">0{i + 1}</span>
                        <div className="flex flex-col gap-1">
                          <h3 className="font-headline-sm text-headline-sm text-primary">{s.title}</h3>
                          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-[65ch]">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="flex flex-col gap-space-lg reveal" id="ciri-ciri">
                  <SectionHead num="02" label="Identifikasi Visual" title="Ciri-Ciri yang Harus Kamu Kenali" />
                  <ul className="flex flex-col divide-y divide-surface-container-high">
                    {c.ciri.map((t) => (
                      <li key={t} className="py-space-md flex items-start gap-space-md">
                        <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">priority_high</span>
                        <span className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-[65ch]">{t}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="pl-space-lg border-l-4 border-secondary flex flex-col gap-space-sm reveal"
                  id="studi-kasus">
                  <div
                    className="flex items-center gap-2 text-secondary font-label-sm text-label-sm font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[18px]">history_edu</span>
                    Studi Kasus Lapangan
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary">
                    Kasus Nyata: Rizky (15 Tahun)
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed max-w-[65ch]">
                    {c.studiKasus}
                  </p>
                </section>

                <section
                  className="p-space-xl rounded-2xl bg-surface-container-low flex flex-col gap-space-md reveal"
                  id="simulasi">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[22px]">flash_on</span>
                      <h2 className="font-headline-md text-headline-md text-primary">Contoh Simulasi Chat</h2>
                    </div>
                    <span
                      className="px-3 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                      Simulasi Kilat
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    Skenario: <strong className="text-primary font-semibold">{c.simulasi.pengirim}</strong> kirim
                    chat: <em>"{c.simulasi.pesan}"</em> Reaksi terbaikmu?
                  </p>
                  <div className="flex flex-col gap-space-sm pt-1">
                    {c.simulasi.pilihan.map((p, i) => {
                      const letter = i === 0 ? 'A' : 'B'
                      const isPicked = choice === i
                      const state = isPicked ? (p.benar ? 'bg-safe-green-light text-tertiary' : 'bg-danger-red-light text-danger-red') : ''
                      return (
                        <button key={letter}
                          className={`w-full text-left p-space-md rounded-xl bg-surface-white hover:bg-surface-container transition-all flex items-start gap-space-sm cursor-pointer shadow-sm min-h-[56px] ${state}`}
                          type="button" onClick={() => setChoice(i)}>
                          <span
                            className="w-7 h-7 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center font-bold shrink-0 text-sm">{letter}</span>
                          <span className="flex-1 font-body-md text-body-md">{p.teks}</span>
                        </button>
                      )
                    })}
                  </div>
                  {picked && (
                    <div className={`p-space-md rounded-xl transition-all duration-300 ${picked.benar ? 'bg-safe-green-light text-tertiary' : 'bg-danger-red-light text-danger-red'}`}>
                      <div className="flex items-start gap-space-sm font-body-sm text-body-sm">
                        <span className={`material-symbols-outlined text-[24px] shrink-0 ${picked.benar ? 'text-tertiary' : 'text-danger-red'}`}>
                          {picked.benar ? 'check_circle' : 'cancel'}
                        </span>
                        <div className="flex flex-col gap-1">
                          <strong className="font-bold">{picked.benar ? 'Jawaban Kamu Tepat!' : 'Kurang Tepat!'}</strong>
                          <p className="text-on-surface">{picked.hasil}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </section>

                <section className="flex flex-col gap-space-lg reveal" id="lakukan">
                  <SectionHead num="03" label="Langkah Preventif" title="Yang Harus Kamu Lakukan" />
                  <ul className="flex flex-col divide-y divide-surface-container-high">
                    {c.lakukan.map((t, i) => (
                      <li key={i} className="py-space-md flex items-start gap-space-md">
                        <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">check_circle</span>
                        <span className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-[65ch]">{t}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="flex flex-col gap-space-lg reveal" id="terlanjur">
                  <SectionHead num="04" label="Penanganan Darurat" title="Kalau Sudah Terlanjur" />
                  <div className="flex flex-col divide-y divide-surface-container-high">
                    {c.terlanjur.map((t, i) => (
                      <div key={t} className="py-space-md flex items-start gap-space-md">
                        <span
                          className="text-2xl font-extrabold text-primary/40 shrink-0 font-headline-lg w-8">0{i + 1}</span>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-[65ch] pt-1">
                          {t}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="flex flex-col gap-space-lg" id="lapor">
                  <SectionHead num="05" label="Pelaporan Resmi" title="Tempat Melapor" revealClass="reveal" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    {c.lapor.map((l, i) => (
                      <div key={l.nama}
                        className={`p-space-lg rounded-2xl bg-safe-green-light/50 flex flex-col gap-1 reveal ${i === 1 ? 'reveal-2' : i === 2 ? 'reveal-3' : i === 3 ? 'reveal-4' : ''}`}>
                        <span className="font-label-md text-label-md text-tertiary font-bold">{l.nama}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">{l.desc}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <footer
                  className="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md border-t border-surface-container-high reveal">
                  <a className="w-full sm:w-auto h-[52px] px-space-lg rounded-xl text-primary font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors cursor-pointer"
                    href="#" onClick={(e) => { e.preventDefault(); onBack() }}>
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    Kembali ke Kurikulum
                  </a>
                  <a className="w-full sm:w-auto h-[52px] px-space-lg rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-sm cursor-pointer"
                    href="#" onClick={(e) => { e.preventDefault(); onSimulasi() }}>
                    <span>Lanjut ke Simulasi Chat Penipuan</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </a>
                </footer>
              </article>

              <aside className="lg:col-span-4 flex flex-col gap-space-lg sticky top-28">
                <div
                  className="p-space-lg rounded-2xl bg-surface-container-low flex flex-col gap-space-md reveal">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl bg-primary-fixed overflow-hidden shrink-0 flex items-center justify-center">
                      <img alt="Kiki Penjaga Digital" className="w-full h-full object-cover"
                        src="/assets/ChildModul.png" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm font-bold text-primary">Kiki Digital</span>
                      <span className="text-xs text-on-surface-variant">Mentor Siaga Remaja</span>
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed pl-1">
                    "Ragu? <strong className="text-danger-red font-semibold">Tanya orang tua, kakak, atau
                    guru</strong> sebelum klik."
                  </p>
                </div>

                <div
                  className="p-space-lg rounded-2xl bg-surface-white border border-surface-container-high flex flex-col gap-space-md reveal reveal-2">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
                    <h3 className="font-label-lg text-label-lg text-primary font-bold">Panduan Membaca</h3>
                    <span
                      className="text-xs font-semibold text-tertiary bg-safe-green-light px-2.5 py-0.5 rounded-full">Modul
                      1 dari 4</span>
                  </div>
                  <nav className="flex flex-col gap-1.5">
                    {NAV.map((n) => {
                      const isActive = active === n.id
                      return (
                        <a key={n.id}
                          className={`py-2 px-2.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${isActive ? 'bg-surface-container-low text-primary font-medium' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'}`}
                          href={`#${n.id}`} onClick={(e) => goto(e, n.id)}>
                          <div className="flex items-center gap-2 text-sm">
                            <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-primary' : n.latihan ? 'text-secondary' : 'text-outline'}`}>
                              {isActive ? 'check_circle' : n.latihan ? 'flash_on' : 'radio_button_unchecked'}
                            </span>
                            <span>{NAV.indexOf(n) + 1}. {n.label}</span>
                          </div>
                          <span className={`text-[11px] ${isActive ? 'text-primary font-bold' : n.latihan ? 'text-secondary font-bold' : 'text-on-surface-variant'}`}>
                            {isActive ? 'Aktif' : n.meta}
                          </span>
                        </a>
                      )
                    })}
                  </nav>
                </div>

                <div className="p-space-md rounded-xl bg-warning-yellow-light flex items-start gap-3 reveal reveal-3">
                  <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">tips_and_updates</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-secondary uppercase">Ingat Satu Hal:</span>
                    <p className="text-xs text-on-surface leading-snug">{c.ingat}</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
