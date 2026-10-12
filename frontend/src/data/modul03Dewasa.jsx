export const modul03Dewasa = {
  id: 'dewasa-03',
  num: '03',
  jalur: 'Jalur Dewasa & Karier',
  kategori: 'Mengaku Petugas',
  durasi: '3 Menit',
  level: 'Hukum & Data',
  title: 'Penipu Mengaku Petugas Bank & Aparat',
  icon: 'account_balance',
  kasusTitle: 'Kasus Nyata: Hendra (41 Tahun)',
  studiKasus: (
    <>Hendra (41) dihubungi seseorang yang mengaku petugas bank: rekeningnya "dipakai transaksi mencurigakan" dan
      harus dipindahkan ke "rekening aman". Panik, ia menyebut kode OTP yang baru masuk. Rp18.000.000 berpindah ke
      rekening lain malam itu juga.</>
  ),
  langkah: [
    { title: 'Penyamaran', desc: 'Pelaku menyamar sebagai petugas bank, kurir, polisi, atau instansi lain, kadang lengkap dengan seragam dan surat dinas palsu.' },
    { title: 'Ditakuti', desc: 'Korban diberi kabar buruk: rekening diblokir, ada tunggakan, atau terseret kasus hukum agar panik.' },
    { title: 'Kode & dana diminta', desc: 'Lalu diminta menyebut OTP/PIN, menginstal aplikasi, atau memindahkan dana ke "rekening aman".' },
  ],
  ciri: [
    'Meminta OTP, PIN, atau kata sandi—lembaga resmi tidak pernah meminta',
    'Menyuruh memindahkan dana ke "rekening aman"',
    'Melarang Anda menutup telepon atau menghubungi orang lain',
    'Menyebut nama dan 4 digit kartu untuk meyakinkan bahwa dirinya asli',
  ],
  simulasi: {
    pengirim: 'Mengaku petugas bank',
    pesan: 'Rekening Anda terdeteksi transaksi mencurigakan. Sebutkan kode OTP yang baru masuk agar dana dipindahkan ke rekening aman.',
    pilihan: [
      {
        benar: false,
        teks: 'Sebutkan kode OTP agar dana segera aman',
        hasil: 'Bank tidak pernah meminta OTP; uang langsung dibobol pelaku.',
      },
      {
        benar: true,
        teks: 'Tutup telepon, lalu hubungi bank lewat nomor resmi di kartu atau aplikasi',
        hasil: 'Verifikasi lewat kanal resmi membuat rekening Anda tetap aman.',
      },
    ],
  },
  lakukan: [
    'OTP dan PIN tidak pernah diberikan kepada siapa pun.',
    'Tidak ada "rekening aman" dari bank atau polisi.',
    'Tutup telepon, lalu hubungi balik lewat nomor resmi.',
  ],
  terlanjur: [
    'Hubungi bank segera untuk membekukan rekening dan kartu Anda.',
    'Laporkan nomor pelaku ke IASC dan cekrekening.id.',
    'Buat laporan polisi dengan bukti tangkapan layar dan riwayat panggilan.',
  ],
  lapor: [
    { nama: 'iasc.ojk.go.id', desc: 'Lapor kasus penipuan ke IASC OJK' },
    { nama: 'Kontak OJK 157', desc: 'Aduan dan informasi layanan keuangan' },
    { nama: 'cekrekening.id', desc: 'Cek dan lapor rekening penipu' },
    { nama: 'patrolisiber.id', desc: 'Lapor kejahatan siber ke Polri' },
  ],
  ingat: 'Petugas resmi tidak pernah minta OTP, PIN, atau pindah dana ke "rekening aman".',
  mentor: {
    img: '/assets/Dewasa.png',
    nama: 'Mentor Siaga Dewasa',
    peran: 'Karier & Keuangan',
    quote: <>Mengaku petugas bank minta <strong className="text-danger-red font-semibold">OTP atau PIN</strong>? Tutup
      telepon dan hubungi bank lewat nomor resmi.</>,
  },
}
