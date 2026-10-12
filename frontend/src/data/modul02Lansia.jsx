export const modul02Lansia = {
  id: 'lansia-02',
  num: '02',
  jalur: 'Jalur Ramah Lansia',
  kategori: 'Telepon Dini Hari',
  durasi: '3 Menit',
  level: 'Waspada Tinggi',
  title: '"Anak Bapak Ditangkap—Butuh Uang Damai!"',
  icon: 'local_police',
  kasusTitle: 'Kasus Nyata: Warga Bandung',
  studiKasus: (
    <>Pukul 2 dini hari, seorang warga Bandung menerima telepon dari orang tak dikenal yang mengaku anaknya
      ditahan polisi dan minta transfer untuk "damai". Ia selamat karena segera memeriksa anaknya sendiri—yang
      ternyata sedang tidur di rumah.</>
  ),
  langkah: [
    { title: 'Mengaku polisi atau teman anak', desc: 'Pelaku menyamar sebagai polisi atau kenalan anak untuk meyakinkan Anda.' },
    { title: 'Menelepon dini hari', desc: 'Ditelpon pukul 2 pagi atau larut malam, saat Anda baru bangun dan sulit berpikir jernih.' },
    { title: 'Minta uang "damai"', desc: 'Uang damai atau tebusan diminta lewat transfer ke rekening pribadi.' },
  ],
  ciri: [
    'Polisi asli tidak meminta uang damai lewat telepon ke rekening pribadi',
    'Anda diminta "jangan beri tahu siapa pun"',
    'Nada mengancam dan terburu-buru, terutama larut malam',
  ],
  simulasi: {
    pengirim: 'Telepon pukul 2 dini hari',
    pesan: '"Pak, putra Bapak kami tahan. Kalau mau diselesaikan damai, transfer sekarang—jangan beri tahu siapa pun."',
    pilihan: [
      {
        benar: false,
        teks: 'Transfer sekarang agar anak lekas bebas',
        hasil: 'Uang masuk ke rekening penipu, sementara anak Anda tidak sedang menghadapi masalah apa pun.',
      },
      {
        benar: true,
        teks: 'Tutup telepon, ambil napas, lalu cek anak lewat nomor yang tersimpan atau bangunkan keluarga di rumah',
        hasil: 'Anda memastikan keadaan anak sendiri sebelum bertindak—penipuan gagal.',
      },
    ],
  },
  lakukan: [
    'Tutup telepon, ambil napas.',
    'Cek anak/cucu lewat nomor yang tersimpan, atau bangunkan anggota keluarga di rumah.',
    'Kalau ragu, datangi kantor polisi terdekat—jangan transfer.',
  ],
  terlanjur: [
    'Segera hubungi bank untuk memblokir rekening tujuan; kecepatan sangat menentukan.',
    'Lapor ke Kontak OJK 157 atau minta keluarga melapor di iasc.ojk.go.id.',
    'Lapor polisi dengan membawa bukti transfer dan nomor penelepon.',
  ],
  lapor: [
    { nama: 'iasc.ojk.go.id', desc: 'Lapor kasus penipuan ke IASC OJK' },
    { nama: 'Kontak OJK 157', desc: 'Aduan dan informasi layanan keuangan' },
    { nama: 'cekrekening.id', desc: 'Cek dan lapor rekening penipu' },
    { nama: 'patrolisiber.id', desc: 'Lapor kejahatan siber ke Polri' },
  ],
  ingat: 'Tidak ada urusan hukum yang selesai dengan transfer lewat telepon malam hari.',
  mentor: {
    img: '/assets/Lansia.png',
    nama: 'Mentor Siaga Lansia',
    peran: 'Ramah Huruf Besar',
    quote: <>Mengaku polisi minta uang damai? <strong className="text-danger-red font-semibold">Cek anak dulu ke
      rumah—jangan transfer.</strong></>,
  },
}
