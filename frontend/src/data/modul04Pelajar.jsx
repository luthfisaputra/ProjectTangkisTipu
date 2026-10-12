export const modul04Pelajar = {
  id: 'pelajar-04',
  num: '04',
  jalur: 'Jalur Pelajar & Remaja',
  kategori: 'Manipulasi Sosial IG/WA',
  durasi: '3 Menit',
  level: 'Analisis Pesan',
  title: 'Catut Akun Teman & Link Undian di DM',
  icon: 'alternate_email',
  kasusTitle: 'Kasus Nyata: Alisa',
  studiKasus: (
    <>Teman sebangku Alisa tiba-tiba mengirim DM: <em>"Bro, tolong voting lomba adik gue dong"</em> dengan link aneh.
      Alisa mengklik; halaman itu meminta kode verifikasi. SMS berisi <strong>6 digit kode OTP WhatsApp</strong> masuk,
      dan Alisa mengirim tangkapan layar SMS itu—tanpa sadar itu kunci akunnya. Akunnya hilang, dan kontaknya menerima
      pesan "voting" yang sama dari akun Alisa.</>
  ),
  langkah: [
    { title: 'Akun teman dibajak', desc: 'Pelaku mengambil alih akun seorang teman lebih dulu—dia korban sebelumnya.' },
    { title: 'Pesan dari orang dikenal', desc: 'Dari akun teman, pelaku mengirim "Bro, tolong voting lomba adik gue dong" ke semua kontak. Kewaspadaanmu turun karena pesannya akrab.' },
    { title: 'Halaman tiruan', desc: 'Tautan membuka halaman yang meniru situs lomba, lengkap dengan penghitung suara palsu.' },
    { title: 'Kode 6 digit diserahkan', desc: 'Kamu diminta memasukkan nomor dan kode yang tiba lewat SMS—kode itu kode verifikasi login WhatsApp-mu.' },
    { title: 'Rantai berlanjut', desc: 'Akunmu pindah ke pelaku, kamu terlempar keluar, dan pesan yang sama dikirim ke semua kontakmu.' },
  ],
  ciri: [
    'Teman atau kerabat minta "bantuan cepat" lewat DM/WA dengan tautan',
    'Alasan emosional: anak, adik, beasiswa, sakit, lomba, darurat',
    'Tekanan waktu: "voting segera ditutup", "cepetan ya"',
    'Halaman meminta nomor telepon, kode 6 digit, atau menautkan perangkat',
    'Bahasa "temanmu" tidak biasa, atau kamu tiba-tiba keluar dari WhatsApp',
  ],
  simulasi: {
    pengirim: 'DM Instagram dari akun teman',
    pesan: 'Bro, tolong voting lomba adik gue dong: [link]. Vote terakhir hari ini, cepetan ya. Halamannya minta nomor WA + kode 6 digit.',
    pilihan: [
      {
        benar: false,
        teks: 'Kirim kode OTP-nya karena link-nya dari teman',
        hasil: 'Kode OTP adalah kunci akunmu—bukan soal siapa yang minta, kode itu memang dipakai untuk login atas namamu.',
      },
      {
        benar: true,
        teks: 'Jangan klik; telepon temanmu lewat jalur lain dan laporkan pesannya',
        hasil: 'Kamu memutus rantai: akunmu tidak jadi pintu bagi korban berikutnya.',
      },
    ],
  },
  lakukan: [
    'Aktifkan verifikasi dua langkah di WhatsApp (PIN 6 digit) dan 2FA di Instagram.',
    'Cek menu Perangkat tertaut secara berkala dan keluarkan perangkat yang tidak dikenal.',
    'Verifikasi permintaan teman lewat telepon atau tatap muka sebelum mengklik apa pun.',
    'Tanya hal yang hanya temanmu tahu, misalnya nama guru piket kemarin.',
    'Beri tahu teman bila kamu menerima pesan aneh dari akun mereka—bisa menyelamatkan mereka.',
  ],
  terlanjur: [
    'Daftar ulang WhatsApp dengan nomormu dan masukkan kode 6 digit—perangkat pelaku otomatis keluar.',
    'Keluarkan perangkat asing, aktifkan verifikasi dua langkah, lalu beri tahu kontak lewat jalur lain: "WA-ku dibajak, abaikan link dari nomorku."',
    'Ada yang sudah transfer? Hubungi bank/e-wallet dan lapor ke IASC OJK (iasc.ojk.go.id) secepatnya.',
    'Jangan bayar "jasa pemulihan akun atau dana"—itu penipu kedua (recovery scam).',
  ],
  lapor: [
    { nama: 'iasc.ojk.go.id', desc: 'Lapor rekening penipu ke IASC OJK' },
    { nama: 'Kontak OJK 157', desc: 'Aduan dan informasi layanan keuangan' },
    { nama: 'cekrekening.id', desc: 'Cek dan lapor rekening penipu' },
    { nama: 'patrolisiber.id', desc: 'Lapor kejahatan siber ke Polri' },
  ],
  ingat: 'Teman yang asli tidak akan marah kalau kamu menelepon dulu sebelum mengklik.',
}
