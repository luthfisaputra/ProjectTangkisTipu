export const modul02Dewasa = {
  id: 'dewasa-02',
  num: '02',
  jalur: 'Jalur Dewasa & Karier',
  kategori: 'Investasi Bodong',
  durasi: '4 Menit',
  level: 'Waspada Tinggi',
  title: 'Robot Trading & Profit Pasti 30%',
  icon: 'trending_up',
  kasusTitle: 'Kasus Nyata: Rina (29 Tahun)',
  studiKasus: (
    <>Rina (29) diajak masuk grup <em>sinyal trading</em> di Telegram. Penarikan pertama Rp500 ribu lancar, lalu ia
      menyetor Rp25.000.000 ke platform <em>autoprofit-ai.id</em>. Saat mau menarik dana, muncul tuntutan "biaya pajak
      dan verifikasi" lebih dulu. Dua minggu kemudian situs dan para adminnya hilang.</>
  ),
  langkah: [
    { title: 'Umpan janji untung', desc: 'Grup chat dan media sosial menjanjikan profit bulanan pasti, misalnya 30%, dengan modal minim.' },
    { title: 'Umpan kecil dibayar lancar', desc: 'Penarikan awal dibuat mudah supaya korban percaya, lalu didorong menyetor dana jauh lebih besar.' },
    { title: 'Dana sulit keluar', desc: 'Saat menarik dana muncul alasan baru: pajak, biaya verifikasi, atau "dana dibekukan".' },
    { title: 'Platform raib', desc: 'Setelah setoran besar masuk, platform dan admin hilang begitu saja.' },
  ],
  ciri: [
    'Untung "pasti" atau persentase tetap harian/mingguan',
    'Tekanan "kuota terbatas" atau "hari ini terakhir"',
    'Setoran diminta ke rekening pribadi, bukan badan usaha',
    'Mengaku izin luar negeri yang tidak bisa dicek keasliannya',
  ],
  simulasi: {
    pengirim: 'Grup Telegram "Sinyal Trading"',
    pesan: 'Profit pasti 30% per bulan! Modal mulai Rp1 juta, slot tinggal 3—deposit sekarang.',
    pilihan: [
      {
        benar: false,
        teks: 'Ikut setor sekarang sebelum kehabisan slot',
        hasil: 'Untung "pasti" adalah jebakan; dana sulit kembali dan platform bisa hilang kapan saja.',
      },
      {
        benar: true,
        teks: 'Jangan setor. Cek izin platform lewat Kontak OJK 157 dan pastikan imbal hasilnya masuk akal (2L: Legal & Logis)',
        hasil: 'Entitas berizin terdaftar di OJK dan tidak menjanjikan untung tetap.',
      },
    ],
  },
  lakukan: [
    'Untung besar + cepat + pasti = curiga.',
    'Cek izin entitas ke Kontak OJK 157 sebelum menyetor dana.',
    'Begitu diminta "biaya tambahan" untuk menarik dana, berhenti dan laporkan.',
  ],
  terlanjur: [
    'Hentikan semua setoran; jangan tambah dana untuk "membuka penarikan".',
    'Simpan bukti chat, transfer, dan tangkapan layar platform.',
    'Lapor ke IASC (iasc.ojk.go.id) dan blokir rekening penerima lewat cekrekening.id.',
  ],
  lapor: [
    { nama: 'iasc.ojk.go.id', desc: 'Lapor kasus penipuan ke IASC OJK' },
    { nama: 'Kontak OJK 157', desc: 'Aduan dan informasi layanan keuangan' },
    { nama: 'cekrekening.id', desc: 'Cek dan lapor rekening penipu' },
    { nama: 'patrolisiber.id', desc: 'Lapor kejahatan siber ke Polri' },
  ],
  ingat: 'Tidak ada investasi resmi yang menjanjikan untung pasti.',
  mentor: {
    img: '/assets/Dewasa.png',
    nama: 'Mentor Siaga Dewasa',
    peran: 'Karier & Keuangan',
    quote: <>Ditawar <strong className="text-danger-red font-semibold">untung pasti</strong>? Cek izinnya di Kontak
      OJK 157 sebelum menyetor dana.</>,
  },
}
