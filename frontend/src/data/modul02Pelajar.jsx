export const modul02Pelajar = {
  id: 'pelajar-02',
  num: '02',
  jalur: 'Jalur Pelajar & Remaja',
  kategori: 'Uang Jajan Palsu',
  durasi: '3 Menit',
  level: 'Waspada Tinggi',
  title: 'Tugas Like/Follow Berkedok Uang Jajan',
  icon: 'thumb_up',
  kasusTitle: 'Kasus Nyata: Nabila (16 Tahun)',
  studiKasus: (
    <>Nabila (16) melihat postingan <em>"Dibutuhkan freelance like &amp; follow, Rp20.000 per tugas"</em> dan diajak
      masuk grup Telegram. Ia menerima bayaran pertama Rp30.000, lalu makin percaya. Saat ditawari "tugas VIP"
      dengan komisi berkali lipat, ia top up Rp300.000 dari tabungan sekolah—langsung diblokir admin, grup
      menghilang, uangnya lenyap.</>
  ),
  langkah: [
    { title: 'Umpan', desc: 'Pesan acak atau iklan "kerja sampingan" like/follow berbayar lewat WhatsApp, Telegram, atau DM. Tidak ada wawancara, tidak ada kontrak.' },
    { title: 'Grup & bukti palsu', desc: 'Korban diundang ke grup berisi banyak "anggota" dengan testimoni dan bukti transfer palsu—merasa aman karena semua orang terlihat untung.' },
    { title: 'Bayaran awal cair', desc: 'Beberapa tugas pertama benar-benar dibayar (misalnya Rp30.000) untuk membangun kepercayaan.' },
    { title: 'Deposit "tugas VIP"', desc: 'Tiba-tiba diminta top up atau deposit untuk membuka tugas lebih besar. Situsnya tiruan yang tampilannya mirip platform terkenal.' },
    { title: 'Ancaman hangus & diblokir', desc: 'Kalau berhenti, komisi dianggap hangus; setoran naik lagi, lalu saldo tak bisa ditarik dan admin memblokir korban.' },
  ],
  ciri: [
    'Gaji besar untuk pekerjaan sangat ringan (misalnya Rp20.000 per like)',
    'Merekrut lewat pesan acak atau DM, langsung pindah ke grup Telegram/WhatsApp',
    'Diminta deposit, top up, biaya VIP, atau "modal" dalam bentuk apa pun',
    'Ancaman "uang hangus", batas waktu ketat, atau rekening pribadi yang berganti-ganti',
    'Setelah setor, muncul syarat baru: pajak, verifikasi, biaya pencairan',
  ],
  simulasi: {
    pengirim: 'Admin grup Telegram',
    pesan: 'Tugas 3 hari udah cair ya! Sekarang ada tugas VIP: top up Rp300.000 untuk komisi Rp1.500.000. Batas 30 menit, kalau telat hangus!',
    pilihan: [
      {
        benar: false,
        teks: 'Top up sekarang biar komisi besar tidak hangus',
        hasil: 'Ancaman "hangus" itu teknik sunk cost dan urgensi; setoranmu tidak akan pernah kembali.',
      },
      {
        benar: true,
        teks: 'Berhenti. Tidak ada kerja nyata yang minta deposit—blokir admin dan ceritakan ke orang tua atau guru',
        hasil: 'Kamu mengenali umpan bayaran awal dan jebakan deposit; kerugian terhindar.',
      },
    ],
  },
  lakukan: [
    'Jangan balas tawaran kerja dari nomor tak dikenal—blokir dan laporkan.',
    'Cek dulu perusahaannya: situs resmi, alamat, kontak, dan ulasan independen.',
    'Cerita ke orang tua atau guru sebelum menyetor uang; penipu benci kalau korbannya berdiskusi.',
    'Jangan pernah membagikan OTP, PIN, atau kata sandi, apa pun alasannya.',
    'Jangan pinjamkan rekening atau e-wallet untuk menerima transfer atas nama admin.',
  ],
  terlanjur: [
    'Berhenti—jangan setor lagi untuk "menebus" atau "membuka blokir". Itu hanya menambah kerugian.',
    'Simpan bukti: tangkapan layar chat, bukti transfer, nomor rekening, dan nama grup. Jangan hapus chat.',
    'Hubungi bank/e-wallet untuk melapor, lalu lapor ke IASC (iasc.ojk.go.id) atau Kontak OJK 157.',
    'Lapor polisi dan ceritakan ke orang dewasa tepercaya—jangan menyimpan rahasia karena malu.',
  ],
  lapor: [
    { nama: 'iasc.ojk.go.id', desc: 'Lapor kasus penipuan ke IASC OJK' },
    { nama: 'Kontak OJK 157', desc: 'Aduan dan informasi layanan keuangan' },
    { nama: 'cekrekening.id', desc: 'Cek dan lapor rekening penipu' },
    { nama: 'patrolisiber.id', desc: 'Lapor kejahatan siber ke Polri' },
  ],
  ingat: 'Kalau kamu yang diminta bayar untuk bisa kerja, itu bukan kerja. Itu jebakan.',
}
