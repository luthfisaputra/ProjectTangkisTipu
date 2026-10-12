export const modul04Lansia = {
  id: 'lansia-04',
  num: '04',
  jalur: 'Jalur Ramah Lansia',
  kategori: 'Suara Tiruan AI',
  durasi: '3 Menit',
  level: 'Analisis Pesan',
  title: 'Suara Tiruan AI yang Persis Anak/Cucu',
  icon: 'record_voice_over',
  kasusTitle: 'Kasus Nyata: Pensiunan Taspen',
  studiKasus: (
    <>Lebih dari <strong>100 calon korban</strong>—mayoritas pensiunan ASN di atas 60 tahun—dijebak oleh pelaku
      yang mengaku petugas Taspen. Korban diarahkan menginstal file APK hingga kehilangan uang sampai ratusan
      juta rupiah, dengan komunikasi yang dibuat sangat meyakinkan.</>
  ),
  langkah: [
    { title: 'Suara ditiru AI', desc: 'Teknologi AI bisa meniru suara seseorang, dan hasilnya sangat meyakinkan.' },
    { title: 'Mengaku keluarga atau pejabat', desc: 'Pelaku meniru suara anak/cucu, atau meniru pejabat dan mengaku petugas instansi.' },
    { title: 'Transfer atau instal APK', desc: 'Anda diminta transfer mendesak atau menginstal aplikasi sampai uangnya habis.' },
  ],
  ciri: [
    'Suara meyakinkan, tetapi meminta uang mendadak',
    'Telepon berasal dari nomor yang tidak dikenal',
    'Anda diminta menginstal aplikasi atau mengirim kode',
  ],
  simulasi: {
    pengirim: 'Telepon dari nomor tak dikenal',
    pesan: '"Kek, tolong, aku butuh uang sekarang—tolong jangan bilang sama Mama ya, aku malu."',
    pilihan: [
      {
        benar: false,
        teks: 'Karena suaranya persis, langsung transfer',
        hasil: 'Suara bisa ditiru AI dengan sangat meyakinkan; uang Anda justru hilang.',
      },
      {
        benar: true,
        teks: 'Tutup, telepon balik ke nomor yang tersimpan, lalu tanya kata sandi keluarga',
        hasil: 'Kata sandi keluarga hanya diketahui orang asli—penipuan suara AI gagal.',
      },
    ],
  },
  lakukan: [
    'Suara yang mirip bukan bukti. Tutup, lalu telepon balik ke nomor yang tersimpan.',
    'Buat kata sandi keluarga: satu kata rahasia yang hanya diketahui keluarga.',
    'Instansi resmi tidak meminta uang atau instalasi aplikasi lewat telepon/WhatsApp.',
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
  ingat: 'Suara yang mirip bukan bukti—tanya kata sandi keluarga sebelum transfer.',
  mentor: {
    img: '/assets/Lansia.png',
    nama: 'Mentor Siaga Lansia',
    peran: 'Ramah Huruf Besar',
    quote: <>Suara mirip anak minta uang? <strong className="text-danger-red font-semibold">Tanya kata sandi
      keluarga</strong> sebelum percaya.</>,
  },
}
