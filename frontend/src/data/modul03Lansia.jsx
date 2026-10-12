export const modul03Lansia = {
  id: 'lansia-03',
  num: '03',
  jalur: 'Jalur Ramah Lansia',
  kategori: 'WhatsApp Palsu',
  durasi: '3 Menit',
  level: 'Hukum & Data',
  title: 'Chat "Ma, Ini Nomor Baru Saya"',
  icon: 'chat',
  kasusTitle: 'Kasus Nyata: Bu Ratna (65 Tahun)',
  studiKasus: (
    <>Bu Ratna (65) menerima pesan WhatsApp dari nomor baru yang memakai foto profil anaknya: "Ma, HP lama aku
      hilang, ini nomor baru." Ia mengirim <strong>Rp10.000.000</strong> ke rekening yang diminta—ternyata milik
      penipu dari luar negeri. Anaknya sendiri tidak pernah kehilangan ponsel.</>
  ),
  langkah: [
    { title: 'Foto & nama disalin', desc: 'Pelaku memakai foto dan nama anak Anda yang diambil dari media sosial.' },
    { title: 'Alasan darurat', desc: 'HP hilang, tagihan mendesak, atau tidak bisa mengakses mobile banking—semua dibuat agar Anda buru-buru.' },
    { title: 'Rekening salah nama', desc: 'Nomor rekening diberikan untuk transfer segera, sering atas nama orang lain.' },
  ],
  ciri: [
    'Nomor baru, tetapi tidak mau ditelepon ("lagi rusak", "lagi rapat")',
    'Minta uang di pesan pertama',
    'Rekening tujuan atas nama orang lain',
  ],
  simulasi: {
    pengirim: 'WhatsApp dari nomor tak dikenal',
    pesan: '"Ma, HP lama aku hilang, ini nomor baru. Tolong transfer dulu ya Rp1 juta malam ini, nanti aku ganti—rekeningnya atas nama aku."',
    pilihan: [
      {
        benar: false,
        teks: 'Langsung transfer karena mendesak dan kasihan',
        hasil: 'Rekening atas nama orang lain adalah tanda bahaya besar; uang Anda tidak akan kembali.',
      },
      {
        benar: true,
        teks: 'Jangan transfer. Telepon nomor lama anak, atau tanyakan hal yang hanya diketahui anak',
        hasil: 'Anda memastikan identitas pengirim lewat nomor lama—modus nomor palsu gagal.',
      },
    ],
  },
  lakukan: [
    'Jangan balas dengan data atau uang.',
    'Telepon nomor lama anak, atau tanya keluarga lain.',
    'Tanyakan sesuatu yang hanya diketahui anak, misalnya nama panggilan masa kecil.',
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
  ingat: 'Nomor baru + minta uang + rekening atas nama lain = hampir pasti penipuan.',
  mentor: {
    img: '/assets/Lansia.png',
    nama: 'Mentor Siaga Lansia',
    peran: 'Ramah Huruf Besar',
    quote: <>Dapat chat "nomor baru" minta uang? <strong className="text-danger-red font-semibold">Telepon nomor
      lama anak dulu—jangan transfer.</strong></>,
  },
}
