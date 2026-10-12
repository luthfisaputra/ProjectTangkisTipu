export default function Hero({ onBelajar = () => {} }) {
  const goBelajar = (e) => { e.preventDefault(); onBelajar() }

  return (
    <>
    <header
        className="relative w-full overflow-hidden bg-gradient-to-b from-[#17338f] via-[#1d4ea8] to-[#7ccbf3] text-white">
        {/*  Elemen Ilustrasi Alam / Langit Malam & Lanskap Sore  */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            {/*  Bulan Purnama Bercahaya  */}
            <div
                className="absolute top-12 right-[18%] md:right-[26%] w-28 h-28 rounded-full bg-white/90 shadow-[0_0_80px_25px_rgba(255,255,255,0.45)]">
            </div>
            <div className="absolute top-14 right-[19%] md:right-[27%] w-24 h-24 rounded-full bg-amber-50/40 blur-[1px]">
            </div>
            {/*  Bintang-bintang & Rasi Konstelasi SVG  */}
            <svg className="absolute inset-0 w-full h-full opacity-65" xmlns="http://www.w3.org/2000/svg">
                {/*  Bintang-bintang titik  */}
                <circle cx="8%" cy="14%" fill="#ffffff" opacity="0.8" r="1.5"></circle>
                <circle cx="15%" cy="28%" fill="#ffffff" opacity="0.9" r="2"></circle>
                <circle cx="22%" cy="10%" fill="#ffffff" opacity="0.6" r="1"></circle>
                <circle cx="34%" cy="22%" fill="#ffffff" opacity="0.85" r="2.5"></circle>
                <circle cx="42%" cy="12%" fill="#ffffff" opacity="0.7" r="1.5"></circle>
                <circle cx="48%" cy="30%" fill="#ffffff" opacity="0.75" r="2"></circle>
                <circle cx="62%" cy="16%" fill="#ffffff" opacity="0.9" r="2.5"></circle>
                <circle cx="70%" cy="8%" fill="#ffffff" opacity="0.7" r="1.5"></circle>
                <circle cx="88%" cy="24%" fill="#ffffff" opacity="0.85" r="2"></circle>
                <circle cx="93%" cy="15%" fill="#ffffff" opacity="0.65" r="1.5"></circle>
                <circle cx="28%" cy="38%" fill="#ffffff" opacity="0.7" r="1.5"></circle>
                {/*  Bintang 4-sudut berkilau  */}
                <path d="M120 70 L122 75 L127 77 L122 79 L120 84 L118 79 L113 77 L118 75 Z" fill="#ffffff"
                    opacity="0.8"></path>
                <path d="M520 90 L522 94 L526 95 L522 96 L520 100 L518 96 L514 95 L518 94 Z" fill="#ffffff"
                    opacity="0.85"></path>
                <path d="M920 60 L922 65 L927 67 L922 69 L920 74 L918 69 L913 67 L918 65 Z" fill="#ffffff"
                    opacity="0.9"></path>
                {/*  Garis Konstelasi Halus  */}
                <polyline fill="none" opacity="0.35" points="100,160 140,130 190,145 230,110" stroke="#ffffff"
                    strokeDasharray="3,3" strokeWidth="0.8"></polyline>
                <circle cx="100" cy="160" fill="#ffffff" opacity="0.8" r="2"></circle>
                <circle cx="140" cy="130" fill="#ffffff" opacity="0.9" r="2.5"></circle>
                <circle cx="190" cy="145" fill="#ffffff" opacity="0.8" r="2"></circle>
                <circle cx="230" cy="110" fill="#ffffff" opacity="0.9" r="2.5"></circle>
            </svg>
            {/*  Burung Camar Melayang  */}
            <svg className="absolute top-28 left-[45%] w-24 h-12 opacity-40 text-white" fill="none" stroke="currentColor"
                strokeWidth="2" viewBox="0 0 100 40">
                <path d="M10 25 Q 25 10, 40 25 Q 55 10, 70 25"></path>
                <path d="M60 15 Q 70 5, 80 15 Q 90 5, 100 15" strokeWidth="1.5"></path>
            </svg>
            {/*  Siluet Berlapis Perbukitan/Pegunungan Halus  */}
            <svg className="absolute bottom-16 left-0 w-full h-44 text-blue-900/30" preserveAspectRatio="none"
                viewBox="0 0 1200 160">
                <path d="M0,160 L0,90 Q180,40 380,85 T800,70 Q1020,40 1200,80 L1200,160 Z" fill="currentColor"></path>
            </svg>
            <svg className="absolute bottom-10 left-0 w-full h-36 text-sky-700/25" preserveAspectRatio="none"
                viewBox="0 0 1200 140">
                <path d="M0,140 L0,80 Q250,30 520,70 T1000,55 Q1110,65 1200,75 L1200,140 Z" fill="currentColor"></path>
            </svg>
            {/*  Awan tipis bercahaya di cakrawala  */}
            <div className="absolute bottom-20 left-10 w-96 h-20 bg-white/10 rounded-full blur-2xl pointer-events-none">
            </div>
            <div
                className="absolute bottom-28 right-20 w-[420px] h-24 bg-white/15 rounded-full blur-2xl pointer-events-none">
            </div>
        </div>
        {/*  Kurva SVG Organik Putih di Bagian Bawah  */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
            <svg className="relative block w-full h-24 md:h-36 lg:h-44 text-surface-cream" fill="currentColor"
                preserveAspectRatio="none" viewBox="0 0 1440 220">
                <path d="M0,90 C320,180 540,60 840,130 C1140,200 1320,80 1440,110 L1440,220 L0,220 Z"></path>
            </svg>
        </div>
        {/*  2. Konten Hero Utama (Dua Kolom: Teks & Foto Edukator)  */}
        <div className="relative z-0 max-w-[1200px] mx-auto px-margin-desktop pt-space-lg pb-24 md:pb-32 lg:pb-36">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-end">
                {/*  Kolom Kiri: Headline & CTAs (7 Kolom)  */}
                <div className="lg:col-span-7 flex flex-col items-start gap-space-md pt-space-md">
                    {/*  Anonymous Trust Pill  */}
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white shadow-sm">
                        <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">verified_user</span>
                        <span className="font-label-sm text-label-sm font-semibold tracking-wide">100% Anonim • Tanpa Daftar
                            • Bebas Data Pribadi</span>
                    </div>
                    {/*  H1 Headline (Putih Tebal ~48px)  */}
                    <h1
                        className="font-display text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold text-white tracking-tight leading-[1.18] mt-space-xs drop-shadow-sm">
                        Kenali penipuan online sebelum kamu jadi korban
                    </h1>
                    {/*  Sub-headline (Putih 18px)  */}
                    <p className="font-body-lg text-[17px] sm:text-[18px] text-white/90 max-w-[580px] leading-relaxed">
                        Latih cara mengenali pesan penipuan lewat simulasi chat interaktif yang singkat dan mudah
                        diikuti. Gratis, tanpa perlu mendaftar pakai nomor HP atau email.
                    </p>
                    {/*  2 Tombol Aksi  */}
                    <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                        <a className="inline-flex items-center justify-center gap-space-sm h-[52px] px-8 rounded-full bg-white text-[#17338f] font-label-lg text-label-lg font-bold shadow-lg hover:bg-sky-50 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                            data-path="belajar-modus" href="#" onClick={goBelajar}>
                            <span>Mulai Latihan Sekarang</span>
                            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                        </a>
                        <a className="inline-flex items-center justify-center gap-space-sm h-[52px] px-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/40 text-white font-label-lg text-label-lg font-semibold backdrop-blur-md transition-all hover:-translate-y-0.5"
                            href="#simulasi-chat">
                            <span>Lihat 8 Modus Populer</span>
                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </a>
                    </div>
                    {/*  Kartu Statistik Kaca (Glassmorphism putih/15 ring-1 ring-white/25)  */}
                    <div className="w-full mt-space-md">
                        <div
                            className="grid grid-cols-3 gap-space-md p-space-md rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/25 shadow-lg text-white">
                            <div className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-1.5 text-white">
                                    <span className="material-symbols-outlined text-[20px] text-amber-300">timer</span>
                                    <span className="font-headline-md text-headline-md font-bold">3 Menit</span>
                                </div>
                                <span className="font-label-sm text-label-sm text-white/80">Durasi Per Modul</span>
                            </div>
                            <div className="flex flex-col gap-0.5 border-l border-white/20 pl-space-md">
                                <div className="flex items-center gap-1.5 text-white">
                                    <span className="material-symbols-outlined text-[20px] text-amber-300">fact_check</span>
                                    <span className="font-headline-md text-headline-md font-bold">8 Modus</span>
                                </div>
                                <span className="font-label-sm text-label-sm text-white/80">Kasus OJK & Satgas
                                    PASTI</span>
                            </div>
                            <div className="flex flex-col gap-0.5 border-l border-white/20 pl-space-md">
                                <div className="flex items-center gap-1.5 text-white">
                                    <span
                                        className="material-symbols-outlined text-[20px] text-tertiary-fixed">lock_reset</span>
                                    <span className="font-headline-md text-headline-md font-bold">0 Data</span>
                                </div>
                                <span className="font-label-sm text-label-sm text-white/80">Privasi Dijamin 100%</span>
                            </div>
                        </div>
                        {/*  Social Proof Strip  */}
                        <div className="flex items-center gap-2 mt-3 px-1 text-white/90 font-body-sm text-body-sm">
                            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-300 animate-pulse shrink-0"></span>
                            <span>Dipercaya oleh peserta dari berbagai daerah di Indonesia</span>
                        </div>
                    </div>
                </div>
                {/*  Kolom Kanan: Foto Edukator di Atas Kurva Putih (5 Kolom)  */}
                <div className="lg:col-span-5 relative flex flex-col items-center justify-end z-0">
                    {/*  Foto Edukator Wanita Berhijab  */}
                    <div className="relative w-[700px] -ml-16 max-w-none flex justify-center items-end">
                        <img alt="Edukator TangkisTipu"
                            className="w-full h-auto max-h-[800px] object-contain drop-shadow-2xl select-none -mb-24"
                            src="/assets/FotoHeader.png" />
                    </div>
                </div>
            </div>
        </div>
    </header>
    </>
  )
}
