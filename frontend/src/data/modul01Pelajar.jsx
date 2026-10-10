export const modul01Pelajar = {
  id: 'pelajar-01',
  num: '01',
  jalur: 'Jalur Pelajar & Remaja',
  kategori: 'Trik Akun & Game',
  durasi: '3 Menit',
  level: 'Dasar',
  title: 'Jebakan Diamond & Akun Game Murah',
  studiKasus: (
    <>Rizky (15) melihat iklan: <em>"Event resmi! Klaim skin gratis, klik link ini."</em> Tampilannya mirip halaman
      login game favoritnya, jadi dia memasukkan email dan password. Besoknya akunnya hilang. Password sudah diganti, dan
      skin serta rank yang dia kumpulkan berbulan-bulan ikut lenyap. Link yang dia klik ternyata situs tiruan bernama
      <em> mlbb-claim-skin-2025.top</em>.</>
  ),
  langkah: [
    { title: 'Umpan', desc: 'Penipu menyebar iklan atau chat berisi skin gratis, diskon diamond 90%, atau akun murah.' },
    { title: 'Halaman tiruan', desc: 'Link membawa kamu ke halaman login palsu yang tampilannya mirip aslinya.' },
    { title: 'Data dicuri', desc: 'Email dan password yang kamu ketik langsung dikirim ke penipu.' },
    { title: 'Akun dikuasai', desc: 'Penipu masuk, mengganti password, lalu menjual akunmu atau menguras isinya.' },
  ],
  ciri: [
    'Hadiah gratis atau diskon yang tidak masuk akal (misalnya 90%)',
    'Ada hitungan mundur atau tulisan "cepat, hari ini terakhir!"',
    'Alamat situsnya aneh dan bukan alamat resmi game',
    'Kamu diminta login lewat link yang dikirim orang, bukan lewat aplikasi game',
    'Penjual akun atau top-up minta bayar dulu, atau minta password kamu',
  ],
  simulasi: {
    pengirim: 'Akun tak dikenal',
    pesan: 'Bro, ada event resmi bagi-bagi skin gratis! Klaim di sini, login pakai akun game kamu mlbb-claim-skin-2025.top',
    pilihan: [
      {
        benar: false,
        teks: 'Klik link dan login biar cepat dapat skin',
        hasil: 'Passwordmu terkirim ke penipu dan akunmu diambil alih',
      },
      {
        benar: true,
        teks: 'Jangan klik. Cek event lewat aplikasi game atau akun media sosial resmi game',
        hasil: 'Event asli diumumkan di kanal resmi, bukan lewat link kiriman orang',
      },
    ],
  },
  lakukan: [
    <>Buka event atau top-up <strong>hanya lewat aplikasi game atau situs resmi</strong>. Jangan lewat link kiriman
      orang.</>,
    <><strong>Aktifkan verifikasi dua langkah (2FA)</strong> atau fitur keamanan akun yang tersedia di gamemu, dan
      kaitkan akun ke email aktif milikmu.</>,
    <><strong>Jangan pernah memberi password</strong> ke siapa pun, termasuk yang mengaku admin atau teman.</>,
    'Gunakan password yang berbeda dengan akun email dan media sosialmu.',
    <>Ragu? <strong>Tanya orang tua, kakak, atau guru</strong> sebelum klik.</>,
  ],
  terlanjur: [
    'Segera ganti password akun game dan email yang terkait.',
    'Hubungi layanan pelanggan resmi game untuk melaporkan akun yang diambil alih.',
    'Ceritakan ke orang tua atau guru. Jangan takut dimarahi, makin cepat dilaporkan makin besar peluang akun kembali.',
    'Kalau sudah terlanjur transfer uang, minta orang tua menghubungi bank agar rekening penerima diblokir, idealnya dalam 24 jam pertama.',
  ],
  lapor: [
    { nama: 'aduannomor.id', desc: 'Untuk memblokir nomor HP penipu' },
    { nama: 'cekrekening.id', desc: 'Cek dan lapor rekening penipu' },
    { nama: 'iasc.ojk.go.id', desc: 'Kalau sudah ada uang yang hilang (didampingi orang tua)' },
    { nama: 'patrolisiber.id', desc: 'Untuk kejahatan siber ke kepolisian' },
  ],
  ingat: 'Event atau diskon asli tidak pernah minta passwordmu.',
}
