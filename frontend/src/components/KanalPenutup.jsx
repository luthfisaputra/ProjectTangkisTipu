export default function KanalPenutup({ onSimulasi = () => {}, onBelajar = () => {} }) {
  const goSimulasi = (e) => { e.preventDefault(); onSimulasi() }
  const goBelajar = (e) => { e.preventDefault(); onBelajar() }

  return (
    <section className="w-full bg-surface-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center reveal">
          <div
            aria-hidden="true"
            className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-md mb-6">
            <span className="material-symbols-outlined text-[30px]">psychology</span>
          </div>
          <h2
            className="font-headline-lg text-headline-lg md:text-display text-on-surface tracking-tight mb-4 text-balance">
            Mencegah Selalu Jauh Lebih Mudah Daripada Memulihkan Dana
          </h2>
          <p
            className="font-body-lg text-body-lg text-text-muted max-w-2xl leading-relaxed mb-10 text-balance">
            Setelah mengambil langkah darurat di atas, lindungi diri dan keluarga Anda dari modus-modus
            baru. Kenali trik rekayasa sosial terbaru melalui simulasi interaktif tanpa risiko kebocoran
            data pribadi.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all shadow-sm text-center inline-flex items-center justify-center gap-2"
              data-path="simulasi-chat" href="#" onClick={goSimulasi}>
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              <span>Latih Naluri di Simulasi Kasus</span>
            </a>
            <a
              className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl bg-surface-cream text-primary font-label-lg text-label-lg hover:bg-surface-card-subtle transition-all shadow-sm text-center inline-flex items-center justify-center gap-2"
              data-path="belajar-modus" href="#" onClick={goBelajar}>
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
              <span>Pelajari Modus Populer</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
