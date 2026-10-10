import { useState } from 'react'

const TRACKS = {
  pelajar: {
    id: 'pelajar',
    icon: 'school',
    label: 'Pelajar & Remaja',
    summaryLabel: 'Jalur Pelajar',
    sub: 'Usia 10–17 Tahun • Game, Medsos & Tugas',
    badge: 'Jalur Pelajar & Remaja (10-17 Tahun)',
    heroTitle: 'Kurikulum Pelajar Digital Cerdas & Bebas Jebakan',
    heroDesc: 'Hai Teman Tangkis! Jangan sampai diamond game incaranmu berujung akun lenyap, atau uang jajan ambyar gara-gara iming-iming tugas receh. Ayo kenali 4 trik tipu paling viral di tongkrongan digital!',
    chips: [
      { icon: 'timer', iconClass: 'text-secondary-fixed', text: '4 Modul Kilat • Total 12 Menit' },
      { icon: 'military_tech', iconClass: 'text-tertiary-fixed', text: 'Lencana: Detektif Siber Remaja' },
      { icon: 'bolt', iconClass: 'text-secondary-fixed', text: 'Gaya Santai & Bebas Ribet' },
    ],
    heading: '4 Jebakan Paling Sering Menimpa Remaja',
    summaryDesc: 'Fokus pada jebakan diamond game, like media sosial, pembajakan akun, dan pinjaman data siswa.',
    modules: [
      {
        id: 'pelajar-01',
        iconBoxClass: 'bg-warning-yellow-light text-secondary',
        icon: 'sports_esports',
        tag: 'Trik Akun & Game',
        time: '3 Menit',
        level: 'Dasar',
        title: 'Jebakan Diamond & Akun Game Murah',
        desc: 'Waspada tautan phishing berkedok "Event Resmi Bagi-Bagi Skin Gratis" atau diskon diamond 90% via browser login tiruan yang siap menguras kredensial akunmu.',
        caseStudy: <>Rizky (15) kehilangan akun Mobile Legends setelah memasukkan password di situs tidak resmi bernama <em>mlbb-claim-skin-2025.top</em>.</>,
        solution: 'Verifikasi 2FA & Link Resmi',
      },
      {
        iconBoxClass: 'bg-safe-green-light text-tertiary',
        icon: 'thumb_up',
        tag: 'Uang Jajan Palsu',
        time: '3 Menit',
        level: 'Waspada Tinggi',
        title: 'Tugas Like/Follow Berkedok Uang Jajan',
        desc: 'Diiming-imingi Rp20.000 per like TikTok atau reels di grup Telegram. Awalnya dibayar, lalu diminta setor "deposit VIP" hingga tabungan sekolah ludes tak bersisa.',
        caseStudy: <>Nabila (16) dibujuk bergabung grup freelance, menerima Rp30.000 pertama, lalu tergiur top up Rp300.000 yang langsung diblokir admin.</>,
        solution: 'Rumus Tidak Ada Uang Mudah',
      },
      {
        iconBoxClass: 'bg-danger-red-light text-danger-red',
        icon: 'badge',
        tag: 'Identitas & NIK',
        time: '3 Menit',
        level: 'Hukum & Data',
        title: 'Pinjol Ilegal & Jebakan KTP Teman',
        desc: 'Diminta foto selfie pegang KTP/Kartu Pelajar dengan imbalan pulsa Rp50.000? NIK kamu bisa dipakai sindikat pinjol ilegal untuk pinjaman jutaan rupiah!',
        caseStudy: <>Doni (17) meminjamkan data NIK kakaknya ke kenalan medsos; sebulan kemudian keluarga diteror penagih utang tak dikenal.</>,
        solution: 'Rahasia Data Pribadi Mutlak',
      },
      {
        iconBoxClass: 'bg-primary-fixed text-primary',
        icon: 'alternate_email',
        tag: 'Manipulasi Sosial IG/WA',
        time: '3 Menit',
        level: 'Analisis Pesan',
        title: 'Catut Akun Teman & Link Undian di DM',
        desc: 'Teman sebangku tiba-tiba kirim DM Instagram: "Bro, tolong voting lomba adik gue dong" disertai link aneh. Saat dibuka, kamu disuruh memasukkan OTP WhatsApp.',
        caseStudy: <>Alisa mengklik tautan voting teman, tanpa sadar mengirim tangkapan layar SMS berisi 6 digit kode OTP verifikasi WhatsApp.</>,
        solution: 'Konfirmasi Lewat Telepon Langsung',
      },
    ],
  },
  dewasa: {
    id: 'dewasa',
    icon: 'work',
    label: 'Dewasa & Karier',
    summaryLabel: 'Jalur Dewasa & Karier',
    sub: '18–59 Tahun • Finansial, APK & Investasi',
    badge: 'Jalur Dewasa & Karier (18-59 Tahun)',
    heroTitle: 'Kurikulum Dewasa Cerdas Amankan Karier & Keuangan',
    heroDesc: 'Hai, profesional Tangkis! Jangan biarkan file undangan berbait .apk atau janji profit robot trading menguras tabungan hasil kerja kerasmu. Amankan data, karier, dan rekeningmu dengan 4 modul kilat ini.',
    chips: [
      { icon: 'timer', iconClass: 'text-secondary-fixed', text: '4 Modul Kilat • Total 14 Menit' },
      { icon: 'military_tech', iconClass: 'text-tertiary-fixed', text: 'Lencana: Penjaga Keuangan Digital' },
      { icon: 'bolt', iconClass: 'text-secondary-fixed', text: 'Gaya Praktis & To the Point' },
    ],
    heading: '4 Jebakan yang Mengincar Profesional & Pekerja',
    summaryDesc: 'Kurikulum APK malware (.apk undangan/resi), modus investasi bodong robot trading, dan phising internet banking.',
    modules: [
      {
        iconBoxClass: 'bg-warning-yellow-light text-secondary',
        icon: 'install_mobile',
        tag: 'APK Penyamar',
        time: '4 Menit',
        level: 'Dasar',
        title: 'File .apk Undangan & Resi Palsu',
        desc: 'Menerima file .apk berkedok undangan pernikahan atau resi paket dari nomor tak dikenal? Sekali dibuka, aplikasi jahat itu membaca semua SMS—termasuk kode OTP rekeningmu.',
        caseStudy: <>Budi (34) membuka <em>undangan-hajatan.apk</em> dari nomor asing; saldo tabungan Rp45.000.000 raib dalam 2 jam.</>,
        solution: 'Jangan Buka .apk dari Nomor Asing',
      },
      {
        iconBoxClass: 'bg-safe-green-light text-tertiary',
        icon: 'trending_up',
        tag: 'Investasi Bodong',
        time: '4 Menit',
        level: 'Waspada Tinggi',
        title: 'Robot Trading & Profit Pasti 30%',
        desc: 'Grup Telegram menawarkan robot trading dengan profit bulanan dijamin 30% dan modal minim. Uangmu diputar sebentar, lalu platform hilang bersama para adminnya.',
        caseStudy: <>Rina (29) setor Rp25.000.000 ke platform <em>autoprofit-ai.id</em> setelah melihat testimoni palsu; situs berhenti bisa diakses pada minggu kedua.</>,
        solution: 'Cek Legalitas Investasi di OJK',
      },
      {
        iconBoxClass: 'bg-danger-red-light text-danger-red',
        icon: 'account_balance',
        tag: 'Phishing Perbankan',
        time: '3 Menit',
        level: 'Hukum & Data',
        title: 'SMS & Link Login Internet Banking Palsu',
        desc: 'SMS berlogo bank mengabarkan "rekening diblokir" disertai tautan login. Halaman tiruan menyerupai bank asli dan langsung mencuri user ID beserta PIN-mu.',
        caseStudy: <>Hendra (41) login di <em>internetbanking-verify.web.id</em> sesuai instruksi SMS; Rp18.000.000 berpindah ke rekening lain malam itu juga.</>,
        solution: 'Akses Rekening via Aplikasi Resmi',
      },
      {
        iconBoxClass: 'bg-primary-fixed text-primary',
        icon: 'qr_code_2',
        tag: 'Transfer & QRIS Palsu',
        time: '3 Menit',
        level: 'Analisis Pesan',
        title: 'Notifikasi Transfer Palsu & QRIS Tempelan',
        desc: 'Pembeli mengirim tangkapan layar "transfer berhasil" atau menempel QRIS yang mengarah ke rekening penipu. Saldo belum pernah masuk, barang sudah terlanjur dikirim.',
        caseStudy: <>Sari (26) percaya screenshot transfer Rp1.500.000 dari pembeli marketplace; paket laptop terkirim, uang tak pernah masuk.</>,
        solution: 'Tunggu Notifikasi di Aplikasi Resmi',
      },
    ],
  },
  lansia: {
    id: 'lansia',
    icon: 'elderly',
    label: 'Ramah Lansia',
    summaryLabel: 'Jalur Ramah Lansia',
    sub: '60+ Tahun • Panggilan Panik & Modus Anak',
    badge: 'Jalur Ramah Lansia (60+ Tahun)',
    heroTitle: 'Kurikulum Ramah Lansia Aman dari Modus Telepon & Chat',
    heroDesc: 'Halo, Oma & Opa Tangkis! Jangan panik saat ada telepon mengaku cucu kecelakaan atau iming-iming hadiah pensiun. Kenali 4 modul dengan huruf besar dan bahasa santai ini.',
    chips: [
      { icon: 'timer', iconClass: 'text-secondary-fixed', text: '4 Modul Kilat • Total 10 Menit' },
      { icon: 'military_tech', iconClass: 'text-tertiary-fixed', text: 'Lencana: Waspada Lansia Cerdas' },
      { icon: 'bolt', iconClass: 'text-secondary-fixed', text: 'Huruf Besar & Bahasa Santai' },
    ],
    heading: '4 Jebakan yang Sering Menimpa Lansia',
    summaryDesc: 'Desain kontras tinggi dengan huruf ekstra besar. Menghadapi telepon panik anak kecelakaan atau klaim hadiah undian pensiun.',
    modules: [
      {
        iconBoxClass: 'bg-warning-yellow-light text-secondary',
        icon: 'call',
        tag: 'Telepon Panik',
        time: '3 Menit',
        level: 'Dasar',
        title: '"Nak, Aku Kecelakaan—Butuh Uang Rumah Sakit!"',
        desc: 'Suara tangis anak atau cucu meminta transfer mendesak sambil melarang menghubungi orang lain. Suara dan wajah kini bisa dipalsukan lewat rekaman.',
        caseStudy: <>Pak Karya (68) ditelpon "anaknya" menangis minta Rp35.000.000 untuk biaya operasi; untungnya ia menelepon balik ke nomor asli dan anaknya justru sedang di rumah.</>,
        solution: 'Selalu Telpon Balik Nomor Anak',
      },
      {
        iconBoxClass: 'bg-safe-green-light text-tertiary',
        icon: 'redeem',
        tag: 'Hadiah & Undian',
        time: '3 Menit',
        level: 'Waspada Tinggi',
        title: 'Hadiah Pensiun & Biaya "Pajak Hadiah"',
        desc: 'Dapat telepon atau surat menyatakan menang undian pensiun bernilai ratusan juta, tetapi diminta membayar biaya administrasi dan pajak lebih dulu.',
        caseStudy: <>Bu Siti (63) mentransfer Rp7.500.000 sebagai "pajak hadiah" yang sampai hari ini tak pernah datang.</>,
        solution: 'Hadiah Sah Tak Pernah Minta Biaya',
      },
      {
        iconBoxClass: 'bg-danger-red-light text-danger-red',
        icon: 'badge',
        tag: 'Mengaku Petugas',
        time: '3 Menit',
        level: 'Hukum & Data',
        title: 'Penipu Mengaku Petugas Bank, BPJS & Polisi',
        desc: 'Datang memakai seragam dan surat dinas palsu, lalu meminta kartu ATM, PIN, atau kode OTP dengan alasan "verifikasi data nasabah".',
        caseStudy: <>Pak Bambang (70) menyerahkan PIN ATM kepada "petugas bank" yang datang ke rumah; Rp12.000.000 habis dalam hitungan menit.</>,
        solution: 'Petugas Resmi Tak Pernah Minta PIN',
      },
      {
        iconBoxClass: 'bg-primary-fixed text-primary',
        icon: 'chat',
        tag: 'WhatsApp Palsu',
        time: '3 Menit',
        level: 'Analisis Pesan',
        title: 'Chat "Mama, Aku Ganti Nomor Baru"',
        desc: 'Pesan WhatsApp mengaku anak atau keluarga yang sedang ganti nomor, lalu minta transfer untuk keperluan mendesak. Foto profil pun bisa dicuri siapa saja.',
        caseStudy: <>Bu Ratna (65) mengirim Rp10.000.000 ke "nomor baru anak" yang ternyata milik penipu dari luar negeri.</>,
        solution: 'Simpan & Cocokkan Nomor Keluarga',
      },
    ],
  },
}

const TRACK_ORDER = ['pelajar', 'dewasa', 'lansia']

export default function BelajarModus({ onHome = () => {}, onOpenModul = () => {} }) {
  const [track, setTrack] = useState('pelajar')
  const goHome = (e) => { e.preventDefault(); onHome() }
  const active = TRACKS[track]

  return (
    <main className="w-full bg-surface-cream min-h-screen">
      <div className="flex flex-col w-full">
            <div
                className="relative w-full overflow-hidden bg-gradient-to-b from-primary-fixed-dim/20 via-surface-cream to-surface-cream py-14">
                <div
                    className="max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex flex-col gap-10">
                    <div className="flex flex-wrap items-center justify-between gap-space-sm reveal">
                        <div className="flex items-center gap-space-xs text-text-muted font-label-sm text-label-sm">
                            <a className="hover:text-primary transition-colors flex items-center gap-1" data-path="beranda"
                                href="#" onClick={(e) => { e.preventDefault(); onHome() }}>
                                <span className="material-symbols-outlined text-[16px]">home</span> Beranda
                            </a>
                            <span>/</span>
                            <span className="text-primary font-semibold">Pilih Jalur Edukasi</span>
                        </div>
                        <div
                            className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-white shadow-sm">
                            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-ping"></span>
                            <span className="font-label-sm text-label-sm text-on-surface">Target Literasi Digital Nasional
                                2025</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-space-md max-w-3xl reveal">
                        <span className="font-label-md text-label-md text-secondary tracking-widest uppercase">Eksplorasi
                            Kurikulum Interaktif</span>
                        <h1 className="font-display text-display text-on-surface tracking-tight">Kuasai Trik Lawan Modus
                            Tipu-Tipu Digital</h1>
                        <p className="font-body-lg text-body-lg text-text-muted max-w-2xl">
                            Pilih kurikulum yang dirancang khusus sesuai dinamika dan ancaman digital pada fase usiamu.
                            Belajar santai, interaktif, dan langsung bisa kamu terapkan.
                        </p>
                    </div>
                    <div className="w-full bg-surface-card-subtle p-space-sm rounded-3xl shadow-sm flex flex-col md:flex-row gap-space-sm reveal"
                        id="track-switcher">
                        {TRACK_ORDER.map((id) => {
                            const t = TRACKS[id]
                            const isActive = track === id
                            return (
                                <button
                                    key={id}
                                    className={`track-tab flex-1 flex items-center justify-center md:justify-start gap-4 p-4 md:p-5 rounded-2xl transition-all text-left ${isActive ? 'bg-surface-white text-primary shadow-sm' : 'bg-transparent hover:bg-surface-white/60 text-on-surface-variant'}`}
                                    data-track={id} type="button" onClick={() => setTrack(id)}>
                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isActive ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-primary'}`}>
                                        <span className="material-symbols-outlined text-[28px]"
                                            style={{ fontVariationSettings: "'FILL' 1" }}>{t.icon}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`font-headline-sm text-headline-sm leading-tight ${isActive ? 'text-primary' : 'text-on-surface'}`}>{t.label}</span>
                                        <span className="font-body-sm text-body-sm text-text-muted">{t.sub}</span>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="w-full bg-surface-cream pb-20">
                <div
                    className="max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex flex-col gap-16">
                    <div
                        className="relative w-full rounded-3xl bg-primary text-on-primary overflow-hidden shadow-xl p-8 md:p-12 reveal">
                        <div
                            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary-container blur-3xl pointer-events-none opacity-40">
                        </div>
                        <div
                            className="absolute right-1/3 -top-10 w-60 h-60 rounded-full bg-secondary-container blur-3xl pointer-events-none opacity-20">
                        </div>
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                            <div className="lg:col-span-7 flex flex-col gap-6">
                                <div
                                    className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md w-fit">
                                    <span className="material-symbols-outlined text-[18px]">verified</span>
                                    {active.badge}
                                </div>
                                <h2 className="font-display text-display text-on-primary tracking-tight">
                                    {active.heroTitle}
                                </h2>
                                <p className="font-body-lg text-body-lg text-primary-fixed-dim">
                                    {active.heroDesc}
                                </p>
                                <div className="flex flex-wrap items-center gap-3 pt-2">
                                    {active.chips.map((chip) => (
                                        <div key={chip.text}
                                            className="flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-primary-container text-on-primary/95 font-label-sm text-label-sm">
                                            <span className={`material-symbols-outlined text-[18px] ${chip.iconClass}`}>{chip.icon}</span>
                                            {chip.text}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-3 pt-4">
                                    <a className="w-full max-w-[420px] inline-flex items-center justify-center min-h-[48px] px-space-lg rounded-xl bg-secondary-container text-on-secondary-container font-label-lg text-label-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform"
                                data-path="simulasi-chat" href="#" onClick={goHome}>
                                        Coba Simulasi Chat Sesuai Jalur Ini
                                        <span className="material-symbols-outlined ml-2 text-[20px]">arrow_forward</span>
                                    </a>
                                    <a className="w-full max-w-[420px] inline-flex items-center justify-center min-h-[48px] px-space-lg rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-surface-white hover:text-primary transition-all"
                                data-path="uji-ketahanan" href="#" onClick={goHome}>
                                        <span className="material-symbols-outlined mr-2 text-[20px]">psychology</span>
                                        Uji Pemahaman (Pre-test)
                                    </a>
                                </div>
                            </div>
                            <div className="lg:col-span-5 flex justify-center lg:justify-end">
                                <div className="relative w-64 md:w-80 flex flex-col items-center">
                                    <div
                                        className="relative z-10 w-full overflow-hidden rounded-2xl shadow-2xl bg-surface-white/10 backdrop-blur-sm p-space-sm">
                                        <img alt="Karakter Pendamping Pelajar TangkisTipu"
                                            className="w-full h-auto object-cover rounded-xl"
                                            src="/assets/AssetChild.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                        <div className="lg:col-span-8 flex flex-col gap-7">
                            <div
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pb-2 reveal">
                                <div>
                                    <span
                                        className="font-label-md text-label-md text-primary uppercase font-bold tracking-wider">Modul
                                        Kurikulum Utama</span>
                                    <h3 className="font-headline-lg text-headline-lg text-on-surface">{active.heading}</h3>
                                </div>
                            </div>
                            {active.modules.map((m, i) => (
                                <div key={m.title}
                                    className="group flex flex-col md:flex-row gap-5 md:gap-7 p-6 md:p-7 rounded-3xl bg-surface-white border border-border-subtle shadow-sm hover:shadow-md transition-all reveal">
                                    <div className="flex md:flex-col items-center md:items-start gap-4 md:w-28 shrink-0">
                                        <div
                                            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${m.iconBoxClass}`}>
                                            <span className="material-symbols-outlined text-[28px]">{m.icon}</span>
                                        </div>
                                        <span
                                            className="font-label-sm text-label-sm font-bold tracking-widest text-text-muted">MODUL 0{i + 1}</span>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between gap-6">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                                                <span
                                                    className="px-space-sm py-1 rounded-lg bg-danger-red-light text-danger-red font-label-sm text-label-sm font-semibold">{m.tag}</span>
                                                <span
                                                    className="flex items-center gap-1.5 font-label-sm text-label-sm text-text-muted">
                                                    <span className="material-symbols-outlined text-[16px]">schedule</span> {m.time}
                                                </span>
                                                <span className="font-label-sm text-label-sm text-text-muted">Level: {m.level}</span>
                                            </div>
                                            <h4 className="font-headline-md text-headline-md text-on-surface">{m.title}</h4>
                                            <p className="font-body-md text-body-md text-on-surface-variant max-w-[62ch]">
                                                {m.desc}
                                            </p>
                                            <div
                                                className="mt-1 p-4 rounded-2xl bg-surface-cream border border-border-subtle text-text-muted font-body-sm text-body-sm flex items-start gap-3">
                                                <span
                                                    className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">report_problem</span>
                                                <span><strong>Studi Kasus:</strong> {m.caseStudy}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-subtle">
                                            <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                                Solusi: {m.solution}
                                            </span>
                                            <button
                                                className={`inline-flex items-center justify-center min-h-[44px] px-space-md rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${m.id ? '' : 'opacity-60 cursor-default'}`}
                                                type="button"
                                                onClick={m.id ? () => onOpenModul(m.id) : undefined}
                                                disabled={!m.id}>
                                                Mulai Pelajari Modul
                                                <span className="material-symbols-outlined ml-1 text-[18px]">play_arrow</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="lg:col-span-4 flex flex-col gap-7">
                            <div
                                className="p-space-lg rounded-2xl bg-surface-white shadow-sm flex flex-col gap-space-md reveal">
                                <div className="flex items-center justify-between">
                                    <span className="font-label-md text-label-md text-primary font-bold">Ringkasan 3 Jalur
                                        Edukasi</span>
                                    <span className="material-symbols-outlined text-text-muted text-[20px]">layers</span>
                                </div>
                                <p className="font-body-sm text-body-sm text-text-muted">
                                    Pilihan jalur menyesuaikan studi kasus nyata dengan bahasa dan psikologi target
                                    korban.
                                </p>
                                <div className="flex flex-col gap-space-sm">
                                    {TRACK_ORDER.map((id) => {
                                        const t = TRACKS[id]
                                        const isActive = track === id
                                        return (
                                            <div key={id}
                                                className={`p-space-md rounded-xl flex flex-col gap-space-xs transition-colors ${isActive ? 'bg-safe-green-light/60' : 'bg-surface-cream hover:bg-surface-card-subtle'}`}>
                                                <div className="flex items-center justify-between">
                                                    <span
                                                        className={`font-label-md text-label-md font-bold flex items-center gap-1 ${isActive ? 'text-tertiary' : 'text-on-surface font-semibold'}`}>
                                                        <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
                                                        {t.summaryLabel}{isActive ? ' (Aktif)' : ''}
                                                    </span>
                                                    {isActive ? (
                                                        <span
                                                            className="text-[11px] font-bold uppercase tracking-wider text-tertiary bg-surface-white px-2 py-0.5 rounded-full">Dipilih</span>
                                                    ) : (
                                                        <button className="text-primary font-label-sm text-label-sm hover:underline"
                                                            type="button" onClick={() => setTrack(id)}>Buka Jalur →</button>
                                                    )}
                                                </div>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                                    {t.summaryDesc}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div
                                className="p-space-lg rounded-2xl bg-secondary-container/20 text-on-surface shadow-sm flex flex-col gap-space-md reveal reveal-2">
                                <div
                                    className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                                    <span className="material-symbols-outlined text-[24px]">verified</span>
                                </div>
                                <div className="flex flex-col gap-space-xs">
                                    <h4 className="font-headline-sm text-headline-sm text-on-surface">Aturan Emas
                                        Anti-Kecolongan</h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        Sebelum mengklik link apa pun di Instagram, Discord, atau WhatsApp:
                                    </p>
                                </div>
                                <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface">
                                    <li className="flex items-start gap-2">
                                        <span className="text-danger-red font-bold">×</span> Jangan pernah kirim 6 digit
                                        angka kode OTP kepada siapapun.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-danger-red font-bold">×</span> Jangan login akun game lewat
                                        web browser luar selain aplikasi resmi.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-tertiary font-bold">✓</span> Selalu telepon nomor seluler
                                        biasa temanmu bila ia meminjam uang/akun.
                                    </li>
                                </ul>
                            </div>
                            <div
                                className="p-space-lg rounded-2xl bg-surface-white shadow-sm flex flex-col gap-space-md reveal reveal-3">
                                <span className="font-label-md text-label-md text-primary font-bold">Statistik Kasus Remaja
                                    (Data OJK &amp; Siber)</span>
                                <div className="flex flex-col gap-space-sm">
                                    <div>
                                        <div className="flex justify-between font-label-sm text-label-sm mb-1">
                                            <span>Modul Game &amp; Akun Phishing</span>
                                            <span className="font-bold text-danger-red">48% Korban</span>
                                        </div>
                                        <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                                            <div className="h-full bg-danger-red rounded-full" style={{ width: "48%" }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between font-label-sm text-label-sm mb-1">
                                            <span>Pancingan Uang Jajan &amp; Like Medsos</span>
                                            <span className="font-bold text-secondary">31% Korban</span>
                                        </div>
                                        <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                                            <div className="h-full bg-secondary-container rounded-full" style={{ width: "31%" }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between font-label-sm text-label-sm mb-1">
                                            <span>Penyalahgunaan Data &amp; Pinjol Pelajar</span>
                                            <span className="font-bold text-primary">21% Korban</span>
                                        </div>
                                        <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                                            <div className="h-full bg-primary rounded-full" style={{ width: "21%" }}></div>
                                        </div>
                                    </div>
                                </div>
                                <span className="font-body-sm text-body-sm text-text-muted">Edukasi sejak dini terbukti
                                    menurunkan risiko terkena manipulasi digital hingga 73%.</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className="p-8 md:p-10 rounded-3xl bg-surface-card-subtle flex flex-col md:flex-row items-center justify-between gap-8 reveal">
                        <div className="flex flex-col gap-space-sm max-w-xl">
                            <span
                                className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Langkah
                                Selanjutnya</span>
                            <h3 className="font-headline-md text-headline-md text-on-surface">Uji Nyali &amp; Kemampuan
                                Detektif Siber-mu!</h3>
                            <p className="font-body-md text-body-md text-text-muted">
                                Mau tahu seberapa kuat benteng digitalmu saat ditekan penipu? Coba simulator chat
                                interaktif atau ikuti pre-test untuk melihat skormu.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-space-sm w-full md:w-auto">
                            <a className="flex-1 md:flex-initial inline-flex items-center justify-center min-h-[48px] px-space-lg rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all shadow-md"
                                        data-path="simulasi-chat" href="#" onClick={goHome}>
                                Mulai Simulator Chat
                                <span className="material-symbols-outlined ml-2 text-[20px]">chat</span>
                            </a>
                            <a className="flex-1 md:flex-initial inline-flex items-center justify-center min-h-[48px] px-space-lg rounded-xl bg-surface-white text-primary font-label-md text-label-md hover:bg-surface-cream transition-all shadow-sm"
                                        data-path="uji-ketahanan" href="#" onClick={goHome}>
                                Ambil Tes Cepat
                                <span className="material-symbols-outlined ml-2 text-[20px]">quiz</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </main>
  )
}
