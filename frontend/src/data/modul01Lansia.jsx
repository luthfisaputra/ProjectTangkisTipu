export const modul01Lansia = {
  id: 'lansia-01',
  num: '01',
  jalur: 'Jalur Ramah Lansia',
  kategori: 'Telepon Panik',
  durasi: '3 Menit',
  level: 'Dasar',
  title: '"Nak, Aku Kecelakaan—Butuh Uang Rumah Sakit!"',
  icon: 'call',
  kasusTitle: 'Kasus Nyata: Ibu di Bantul',
  studiKasus: (
    <>Ibu di Bantul kehilangan <strong>Rp21,9 juta</strong> setelah dikabari anaknya kecelakaan dan butuh alat
      operasi. Pada April 2026, seorang ibu di Sumatera Utara hampir tertipu modus serupa; ia selamat karena
      menghubungi pihak sekolah—dan anaknya ternyata baik-baik saja.</>
  ),
  langkah: [
    { title: 'Suara panik & menangis', desc: 'Suara tangis atau panik dibuat agar Anda tidak sempat berpikir jernih.' },
    { title: 'Minta biaya lewat transfer', desc: 'Ada "dokter" atau "petugas rumah sakit" yang meminta biaya operasi lewat transfer ke rekening pribadi.' },
    { title: 'Menyebut data pribadi', desc: 'Pelaku menyebut nama anak, sekolah, atau kota—informasi yang bisa diambil dari media sosial.' },
  ],
  ciri: [
    'Penelepon tidak dikenal',
    'Anda dilarang menutup telepon',
    'Uang diminta ke rekening pribadi, bukan ke kasir rumah sakit',
  ],
  simulasi: {
    pengirim: 'Telepon dari nomor tak dikenal',
    pesan: '"Bu, anak Ibu kecelakaan, harus dioperasi sekarang! Kirim uangnya—dan jangan tutup teleponnya!"',
    pilihan: [
      {
        benar: false,
        teks: 'Dengarkan terus dan transfer sekarang juga',
        hasil: 'Anda panik lalu mentransfer ke rekening penipu, sementara anak Anda justru baik-baik saja.',
      },
      {
        benar: true,
        teks: 'Tutup telepon, lalu telepon anak Anda langsung lewat nomor yang tersimpan',
        hasil: 'Anda memastikan keadaan anak lewat jalur sendiri—modus penipuan gagal.',
      },
    ],
  },
  lakukan: [
    'Tutup telepon.',
    'Telepon anak Anda langsung lewat nomor yang sudah tersimpan.',
    'Tidak tersambung? Telepon keluarga lain atau sekolah/kantornya.',
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
  ingat: 'Tenang adalah senjata terbaik Anda: tutup, telepon balik, jangan transfer.',
  mentor: {
    img: '/assets/Lansia.png',
    nama: 'Mentor Siaga Lansia',
    peran: 'Ramah Huruf Besar',
    quote: <>Telepon panik masuk? <strong className="text-danger-red font-semibold">Tutup dulu, telepon balik nomor
      tersimpan, jangan transfer.</strong></>,
  },
}
