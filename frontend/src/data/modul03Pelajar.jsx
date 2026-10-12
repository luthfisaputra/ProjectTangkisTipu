export const modul03Pelajar = {
  id: 'pelajar-03',
  num: '03',
  jalur: 'Jalur Pelajar & Remaja',
  kategori: 'Identitas & NIK',
  durasi: '3 Menit',
  level: 'Hukum & Data',
  title: 'Pinjol Ilegal & Jebakan KTP Teman',
  icon: 'badge',
  kasusTitle: 'Kasus Nyata: Doni (17 Tahun)',
  studiKasus: (
    <>Doni (17) berkenalan dengan seseorang di media sosial yang butuh "data pemilik KTP untuk verifikasi" dan
      menjanjikan imbalan. Doni lalu <strong>meminjamkan data NIK kakaknya</strong>. Sebulan kemudian, keluarganya
      diteror penagih utang tak dikenal—padahal Doni sendiri tidak pernah menerima uang apa pun.</>
  ),
  langkah: [
    { title: 'Imbalan kecil', desc: '"Dapat pulsa Rp50.000, cuma foto KTP." Nominalnya sengaja dibuat kecil agar terasa sepele.' },
    { title: 'Foto KTP & selfie', desc: 'Diminta memegang KTP agar lolos verifikasi wajah; alasannya bisa lamaran kerja, hadiah, beasiswa, atau "bantu teman".' },
    { title: 'Data dipakai ajukan pinjaman', desc: 'Identitas didaftarkan ke satu atau banyak aplikasi pinjol ilegal, sering dengan nomor dan rekening milik pelaku.' },
    { title: 'Dana ke rekening pelaku', desc: 'Pinjaman dicairkan ke pelaku; pemilik KTP tidak menerima apa pun, tetapi tagihannya atas namanya.' },
    { title: 'Teror & pemerasan berulang', desc: 'Penagih menghubungi pemilik KTP lalu menyebar ke keluarga dan kontak. Membayar belum tentu menghentikan teror.' },
  ],
  ciri: [
    'Diminta foto KTP, Kartu Pelajar, atau selfie memegang KTP oleh orang yang baru dikenal',
    'Imbalan tidak sebanding—hanya foto saja sudah dibayar pulsa',
    'Alasan berubah-ubah: verifikasi, hadiah, beasiswa, lamaran kerja',
    'Diminta kode OTP, PIN, atau akses akun e-wallet dan rekening',
    'Ada tekanan waktu: "cepat, hari ini saja" atau diancam jika menolak',
  ],
  simulasi: {
    pengirim: 'Kenalan baru di media sosial',
    pesan: 'Cuma butuh selfie pegang KTP kamu buat verifikasi, ku bayar pulsa Rp50.000. Cuma sebentar kok.',
    pilihan: [
      {
        benar: false,
        teks: 'Kirim saja, cuma sekali dan imbalannya lumayan',
        hasil: 'Foto KTP + selfie adalah paket lengkap untuk mengajukan pinjol atas namamu.',
      },
      {
        benar: true,
        teks: 'Tolak, blokir, dan ceritakan ke orang dewasa—KTP tidak dipinjamkan ke siapa pun',
        hasil: 'Identitasmu terlindungi; penipu tidak punya bahan untuk berutang atas namamu.',
      },
    ],
  },
  lakukan: [
    'Tolak imbalan apa pun untuk foto KTP, selfie KTP, atau NIK—jangan negosiasi.',
    'Jangan pernah meminjamkan KTP atau data milik orang lain, termasuk keluarga sendiri.',
    'Kalau KTP harus difoto untuk keperluan resmi, beri watermark tertulis ("khusus untuk ... tanggal ...").',
    'Jangan memberi izin akses kontak, galeri, dan penyimpanan ke aplikasi pinjaman.',
    'Ceritakan ke orang dewasa sebelum mengirim dokumen identitas ke siapa pun.',
  ],
  terlanjur: [
    'Cek apakah NIK dipakai lewat layanan iDeb/SLIK OJK (idebku.ojk.go.id).',
    'Kumpulkan bukti: tangkapan layar tagihan, nomor penagih, nama aplikasi, dan chat—jangan hapus chat.',
    'Lapor ke OJK lewat Kontak OJK 157 dan ke polisi; minta pemblokiran NIK ke Dukcapil setempat.',
    'Jangan bayar tagihan dari pihak tak jelas sebelum berkonsultasi dengan OJK atau polisi.',
  ],
  lapor: [
    { nama: 'iasc.ojk.go.id', desc: 'Lapor kasus penipuan ke IASC OJK' },
    { nama: 'Kontak OJK 157', desc: 'Aduan pinjol ilegal & penyalahgunaan data' },
    { nama: 'cekrekening.id', desc: 'Cek dan lapor rekening penipu' },
    { nama: 'patrolisiber.id', desc: 'Lapor kejahatan siber ke Polri' },
  ],
  ingat: 'Kalau seseorang membayarmu untuk fotomu memegang KTP, sebenarnya mereka sedang membeli identitasmu.',
}
