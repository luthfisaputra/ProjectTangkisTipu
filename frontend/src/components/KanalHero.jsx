const VERIFIKASI = ['Konsultasi Terarah', 'Bebas Biaya Perantara', 'Fokus Penyelamatan Rekening']

export default function KanalHero({ onHome = () => {} }) {
  const goHome = (e) => { e.preventDefault(); onHome() }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-primary/10 rounded-full blur-[110px] pointer-events-none">
      </div>
      <section
        className="relative max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="flex items-center gap-space-xs text-text-muted font-label-sm text-label-sm mb-space-xl reveal">
          <a className="hover:text-primary transition-colors flex items-center gap-1" href="#" onClick={goHome}>
            <span className="material-symbols-outlined text-[16px]">home</span> Beranda
          </a>
          <span>/</span>
          <span className="text-primary font-semibold">Panduan Lapor Resmi</span>
        </div>

        <div className="flex flex-col max-w-4xl mx-auto text-center items-center mb-10 reveal">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card-subtle text-primary mb-6 shadow-sm">
            <span className="material-symbols-outlined text-[18px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
            <span className="font-label-sm text-label-sm tracking-wider uppercase">Panduan Literasi &amp; Tindakan Kritis</span>
          </div>
          <h1
            className="font-display text-headline-lg md:text-display text-on-surface tracking-tight mb-6 text-balance">
            Tetap Tenang, Berhenti Sejenak, dan Pahami Langkah yang Tepat.
          </h1>
          <p
            className="font-body-lg text-body-lg text-text-muted max-w-3xl leading-relaxed mb-8 text-balance">
            Dalam kondisi panik atau cemas setelah menghadapi modus penipuan, pelaku sering memanfaatkan
            kebingungan korban untuk memeras lebih jauh. Jangan terburu-buru mentransfer dana tebusan,
            biaya denda fiktif, atau mempercayai “jasa pemulihan dana”. Pelajari alur perlindungan diri
            berikut sebelum melangkah ke jalur resmi.
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm overflow-hidden reveal">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-label-md text-label-md text-primary uppercase tracking-wide">Penting Diketahui</span>
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
              <span className="font-label-sm text-label-sm text-text-muted">Inisiatif Non-Komersial</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-3">
              Panduan Verifikasi Resmi &amp; Pencegahan Kerugian Lanjutan
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
              <strong className="font-semibold text-on-surface">TangkisTipu adalah platform literasi
                nirlaba independen</strong> dan <span className="text-danger-red font-semibold">BUKAN</span> instansi
              kepolisian, OJK, atau penerima laporan hukum pidana. Panduan ini disiapkan agar Anda menguasai
              urutan langkah yang benar, mengamankan bukti digital Anda, serta terhindar dari salah sasaran
              saat melapor ke pihak berwenang.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-text-muted font-body-sm text-body-sm pt-2">
              {VERIFIKASI.map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-tertiary-container">verified</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 relative w-full h-[260px] md:h-[280px] rounded-xl overflow-hidden shadow-sm">
            <img
              alt="Ilustrasi konsultasi tenang dengan petugas layanan perbankan dan keamanan digital"
              className="w-full h-full object-cover"
              src="/assets/kanal-lapor-konsultasi.svg" />
            <div
              className="absolute top-3 right-3 bg-surface-cream/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm">
              <span className="font-mono text-[11px] text-text-muted">kanal-lapor-konsultasi.svg</span>
            </div>
            <div
              className="absolute bottom-3 left-3 bg-surface-cream/95 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">Edukasi Resmi
                &amp; Terpercaya</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
