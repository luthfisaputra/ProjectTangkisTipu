export default function Navbar({ active = 'beranda', onNavigate = () => {} }) {
  const go = (path) => (e) => { e.preventDefault(); onNavigate(path) }

  return (
    <>
    <div
        className="sticky top-0 z-50 w-full px-4 h-20 flex items-center justify-between gap-space-lg bg-[#17338f]/90 backdrop-blur-md shadow-lg">
        {/*  Logo Brand  */}
        <a className="flex items-center gap-space-sm group" href="#" onClick={go('beranda')}>
            <img src="/assets/LogoTangkis.png" alt="Logo TangkisTipu" className="h-10 w-auto shrink-0" />
            <span
                className="font-headline-md text-headline-md text-white tracking-tight leading-none font-bold">TangkisTipu</span>
        </a>
        {/*  Menu Navigasi Tengah  */}
        <nav
            className="hidden lg:flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-inner">
            <a aria-current={active === 'beranda' ? 'page' : undefined}
                className={`font-label-md text-label-md px-space-md py-1.5 rounded-full transition-colors ${active === 'beranda' ? 'bg-white text-[#17338f] font-bold shadow-sm' : 'text-white/90 hover:text-white hover:bg-white/15'}`}
                data-path="beranda" href="#" onClick={go('beranda')}>Beranda</a>
            <a aria-current={active === 'belajar-modus' ? 'page' : undefined}
                className={`font-label-md text-label-md px-space-md py-1.5 rounded-full transition-colors ${active === 'belajar-modus' ? 'bg-white text-[#17338f] font-bold shadow-sm' : 'text-white/90 hover:text-white hover:bg-white/15'}`}
                data-path="belajar-modus" href="#" onClick={go('belajar-modus')}>Belajar Modus</a>
            <a aria-current={active === 'komunitas' ? 'page' : undefined}
                className={`font-label-md text-label-md px-space-md py-1.5 rounded-full transition-colors ${active === 'komunitas' ? 'bg-white text-[#17338f] font-bold shadow-sm' : 'text-white/90 hover:text-white hover:bg-white/15'}`}
                data-path="komunitas" href="#" onClick={go('komunitas')}>Komunitas</a>
            <a aria-current={active === 'uji-skor-tes' ? 'page' : undefined}
                className={`font-label-md text-label-md px-space-md py-1.5 rounded-full transition-colors ${active === 'uji-skor-tes' ? 'bg-white text-[#17338f] font-bold shadow-sm' : 'text-white/90 hover:text-white hover:bg-white/15'}`}
                data-path="uji-skor-dan-tes" href="#" onClick={go('uji-skor-tes')}>Uji Skor & Tes</a>
            <a aria-current={active === 'kanal-lapor' ? 'page' : undefined}
                className={`font-label-md text-label-md px-space-md py-1.5 rounded-full transition-colors ${active === 'kanal-lapor' ? 'bg-white text-[#17338f] font-bold shadow-sm' : 'text-white/90 hover:text-white hover:bg-white/15'}`}
                data-path="kanal-lapor" href="#" onClick={go('kanal-lapor')}>Kanal Lapor</a>
        </nav>
        {/*  Tombol Masuk Admin & Profil  */}
        <div className="flex items-center gap-space-md">
            <a className="hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-full bg-white text-[#17338f] font-label-md text-label-md font-bold shadow hover:bg-sky-50 transition-all hover:scale-105"
                data-path="login" href="#" onClick={go('login')}>Masuk Admin</a>
            <div
                className="w-9 h-9 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
        </div>
    </div>
    </>
  )
}
