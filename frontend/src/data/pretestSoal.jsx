// Sumber: soal-pretest-TangkisTipu.md
// Set 1: Anak & Remaja (10-17), Set 2: Dewasa (18-59), Set 3: Lansia (60+)
// Urutan set mengikuti indeks TRACKS di jalurBelajar.jsx.

const SET_ANAK_REMAJA = [
  {
    id: 'R1',
    kategori: 'Jebakan Top-up & Akun Game',
    pertanyaan:
      'Kamu lihat story IG: "Top up Diamond FF diskon 70%! Cukup login pakai email dan password akun game-mu biar diamond langsung masuk." Apa yang kamu lakukan?',
    opsi: [
      'Login saja, kan cuma sebentar',
      'Ajak teman top up bareng supaya dapat bonus',
      'Tidak login. Top up hanya lewat situs atau toko resmi, cukup pakai User ID',
      'Login, lalu ganti password setelahnya',
    ],
    kunci: 2,
    penjelasan:
      'Penyedia top up yang sah tidak meminta email dan kata sandi akunmu. Harga jauh di bawah pasar adalah tanda penipuan atau phishing.',
    kasusNyata:
      'Menurut ulasan industri top up game, platform yang sah tidak pernah meminta email dan kata sandi, dan diskon sekitar 70% tanpa promo resmi patut dicurigai. [S20]',
  },
  {
    id: 'R2',
    kategori: 'Pelecehan Berkedok Hadiah di Game',
    pertanyaan:
      'Di game, pemain yang mengaku "kakak" menawarkan diamond gratis kalau kamu pindah chat ke WhatsApp, lalu meminta foto atau video pribadi. Apa yang paling tepat?',
    opsi: [
      'Terima, lumayan diamond gratis',
      'Tolak, berhenti chat, simpan tangkapan layar, lalu ceritakan ke orang tua atau guru',
      'Kirim foto, asal wajah ditutup',
      'Minta temanmu ikut supaya ada yang menemani',
    ],
    kunci: 1,
    penjelasan:
      'Orang dewasa asing yang meminta hal pribadi dengan iming-iming hadiah adalah bahaya. Itu bukan kesalahanmu, dan orang dewasa tepercaya bisa membantu melapor.',
    kasusNyata:
      'Bareskrim Polri menangkap pelaku yang menjerat 11 anak perempuan lewat game Free Fire dengan iming-iming diamond (2021). [S21, S22]',
  },
  {
    id: 'R3',
    kategori: 'Komisi Like/Subscribe & Deposit Palsu',
    pertanyaan:
      'Nomor asing menawarkan kerja paruh waktu lewat WA: like dan subscribe video, Rp15 ribu tiap 3 tugas. Kamu diundang ke grup Telegram dan dua tugas pertama benar-benar dibayar. Lalu kamu diminta deposit untuk lanjut. Apa yang kamu lakukan?',
    opsi: [
      'Deposit kecil dulu, nanti kembali bersama komisi',
      'Pinjam uang orang tua untuk deposit',
      'Lanjut tugas sambil menunggu admin lupa soal deposit',
      'Berhenti, jangan deposit, lalu ceritakan ke orang tua. Kerja yang sah tidak meminta uang di depan',
    ],
    kunci: 3,
    penjelasan: 'Bayaran kecil di awal adalah umpan agar korban percaya, lalu deposit makin besar.',
    kasusNyata:
      'Seorang korban di Depok dijanjikan Rp15 ribu per 3 tugas like dan subscribe, lalu diminta deposit berulang sampai rugi puluhan juta (2023). [S4]',
  },
  {
    id: 'R4',
    kategori: 'Penipuan Belanja & Rekening Pribadi',
    pertanyaan:
      'Kamu mau beli akun game atau HP bekas. Penjual di Facebook memasang harga jauh di bawah pasar, minta DP ke rekening pribadi, dan menunjukkan "testimoni". Sebaiknya?',
    opsi: [
      'Tidak transfer ke rekening pribadi. Beli lewat platform resmi dengan pembayaran lewat sistem platform, dan curigai harga yang tidak wajar',
      'Transfer DP kecil dulu untuk tes',
      'Percaya karena testimoninya banyak',
      'Transfer penuh supaya cepat dikirim',
    ],
    kunci: 0,
    penjelasan: 'Testimoni mudah dipalsukan. Pembayaran lewat sistem platform memberi perlindungan kalau barang tidak datang.',
    kasusNyata:
      'Penipuan transaksi belanja adalah modus terbanyak di IASC, dengan 73.743 laporan hingga pertengahan Januari 2026. [S13]',
  },
  {
    id: 'R5',
    kategori: 'Pinjol Ilegal & Akses Kontak',
    pertanyaan:
      'Muncul iklan di medsos: "Pinjaman Rp2 juta cair 5 menit, cukup KTP dan selfie, izinkan akses kontak." Apa yang benar?',
    opsi: [
      'Coba pinjam sedikit saja',
      'Pakai KTP orang tua tanpa bilang',
      'Jangan. Cek dulu apakah pinjol itu berizin OJK (kontak OJK 157), dan bicarakan dengan orang tua',
      'Pinjam, asal bayar tepat waktu pasti aman',
    ],
    kunci: 2,
    penjelasan: 'Pinjol yang tidak berizin OJK termasuk ilegal, dan keluhan terhadapnya sangat banyak.',
    kasusNyata:
      'Sepanjang 1 Januari-31 Agustus 2026, OJK menerima 26.729 pengaduan pinjol ilegal. [S17]',
  },
  {
    id: 'R6',
    kategori: 'Penipuan OTP Dompet Digital',
    pertanyaan:
      'Seseorang di WA mengaku "admin" dompet digital, bilang akunmu akan dibekukan, dan minta kode 6 digit yang baru masuk ke HP-mu. Apa yang kamu lakukan?',
    opsi: [
      'Kirim kodenya supaya akun aman',
      'Jangan kasih kode OTP ke siapa pun, blokir nomornya, dan cek lewat aplikasi resmi',
      'Kirim setengah kodenya saja',
      'Kirim kalau dia menunjukkan foto kartu pegawai',
    ],
    kunci: 1,
    penjelasan: 'Kode OTP adalah kunci akunmu. Pihak resmi tidak pernah memintanya.',
    kasusNyata:
      'Pihak bank menegaskan tidak pernah meminta PIN, kata sandi, atau OTP lewat telepon, SMS, atau email. [S11]',
  },
  {
    id: 'R7',
    kategori: 'Malware APK Resi Paket',
    pertanyaan:
      'Di grup kelas, nomor tak dikenal mengirim file "Resi-Paket-Kamu.apk". Temanmu bilang "buka aja, paling paketmu". Apa yang benar?',
    opsi: [
      'Buka di HP orang tua',
      'Buka, kalau aneh langsung dihapus',
      'Forward ke grup lain supaya ada yang tahu',
      'Jangan dibuka atau dipasang. File .apk dari nomor asing bisa mencuri data. Hapus dan beri tahu admin grup',
    ],
    kunci: 3,
    penjelasan:
      'Memasang file .apk dari chat memberi aplikasi berbahaya akses ke HP-mu, termasuk SMS dan aplikasi lain.',
    kasusNyata:
      '493 nasabah bank melapor menjadi korban link phishing dan APK modifikasi (resi paket, promo bank, dll.) dengan total kerugian Rp12 miliar. [S2]',
  },
  {
    id: 'R8',
    kategori: 'Giveaway Palsu & Phishing Data',
    pertanyaan:
      'Pesan masuk: "Selamat! Kamu terpilih menang giveaway HP. Klik link dan isi NIK serta nomor HP." Apa yang kamu lakukan?',
    opsi: [
      'Abaikan dan jangan klik. Giveaway asli tidak meminta data lewat link asing',
      'Klik dan isi data lengkap',
      'Klik, tapi isi data palsu',
      'Bayar ongkos kirim kecil dulu',
    ],
    kunci: 0,
    penjelasan: 'Hadiah palsu dipakai untuk memancing data atau memasang aplikasi berbahaya.',
    kasusNyata:
      'Salah satu cara lama penipu adalah kabar palsu menang undian, lalu korban diminta mengisi formulir di URL yang berisi malware RAT. [S9]',
  },
  {
    id: 'R9',
    kategori: 'Love Scam Mengatasnamakan Petugas',
    pertanyaan:
      'Kamu kenalan di Instagram dengan seseorang yang mengaku anggota TNI atau polisi. Kalian chat tiap hari tapi belum pernah bertemu, lalu dia minta transfer "darurat". Apa yang kamu lakukan?',
    opsi: [
      'Kirim karena kasihan',
      'Kirim setelah dia kirim foto KTP',
      'Jangan kirim uang. Blokir, dan ceritakan ke orang dewasa yang kamu percaya',
      'Kirim sedikit dulu untuk tes',
    ],
    kunci: 2,
    penjelasan:
      'Foto seragam dan KTP mudah dipalsukan. Orang yang belum pernah kamu temui tidak boleh jadi tempat mengirim uang.',
    kasusNyata:
      'Polisi mengungkap jaringan love scam yang memakai akun palsu anggota TNI atau Polri, dengan lebih dari 1.286 korban teridentifikasi (Polda Lampung, Mei 2026). [S16]',
  },
  {
    id: 'R10',
    kategori: 'Pelaporan Cepat Korban Belanja',
    pertanyaan:
      'Temanmu terlanjur transfer uang ke penjual online yang ternyata penipu. Langkah pertama yang paling tepat?',
    opsi: [
      'Menunggu seminggu, siapa tahu barangnya datang',
      'Segera hubungi bank atau dompet digital untuk minta rekening diblokir, lalu lapor ke iasc.ojk.go.id bersama orang tua, dan simpan semua bukti',
      'Memarahi penjual di kolom komentar',
      'Transfer lagi supaya barangnya dikirim',
    ],
    kunci: 1,
    penjelasan: 'Makin cepat dilaporkan, makin besar peluang dana tertahan.',
    kasusNyata:
      'Lewat IASC, OJK telah memblokir 604.923 rekening dan menahan dana korban Rp723,7 miliar (hingga 31 Juli 2026). [S14]',
  },
]

const SET_DEWASA = [
  {
    id: 'D1',
    kategori: 'Malware APK Undangan Pernikahan',
    pertanyaan:
      'WA dari nomor tak dikenal: "Mohon kehadirannya di pernikahan kami", lampiran Undangan.apk (6 MB). Apa yang kamu lakukan?',
    opsi: [
      'Pasang saja, nanti dihapus kalau aneh',
      'Jangan dipasang. Hapus, blokir, dan konfirmasi ke kenalan lewat jalur lain bila perlu',
      'Pasang di HP cadangan, tapi tetap login m-banking di HP utama',
      'Pasang setelah dicek antivirus gratis',
    ],
    kunci: 1,
    penjelasan:
      'Undangan asli tidak perlu dipasang sebagai aplikasi. File .apk meminta izin yang bisa membuka akses ke SMS dan m-banking.',
    kasusNyata:
      'Seorang nasabah di Malang kehilangan saldo hingga Rp1,4 miliar setelah membuka file undangan pernikahan berformat APK di WhatsApp (2023). [S1]',
  },
  {
    id: 'D2',
    kategori: 'Kerja Online Like YouTube & Deposit',
    pertanyaan:
      '"Asisten perusahaan" menelepon lewat WA, menawarkan kerja menekan like video YouTube dengan komisi Rp31 ribu per video. Kamu dikirimi link Telegram dan diminta deposit sebelum dapat misi. Apa yang kamu lakukan?',
    opsi: [
      'Deposit kecil dulu karena komisinya jelas',
      'Deposit setelah minta bukti transfer pekerja lain',
      'Deposit dan ajak teman agar dapat bonus',
      'Menolak dan memblokir. Pekerjaan yang sah tidak meminta setoran dulu',
    ],
    kunci: 3,
    penjelasan:
      'Modusnya bertahap: tugas ringan, komisi kecil, lalu deposit makin besar yang tidak bisa ditarik.',
    kasusNyata:
      'Polda Metro Jaya menahan dua tersangka dalam kasus like YouTube yang merugikan seorang korban lebih dari Rp800 juta (2024). [S3]',
  },
  {
    id: 'D3',
    kategori: 'Pinjol untuk Barang Fiktif',
    pertanyaan:
      'Kamu mahasiswa. Kenalan menawarkan kerja sama jualan di toko online miliknya dengan komisi 10% per transaksi. Kamu diminta "membeli" barang di tokonya dengan pinjaman online. Apa risikonya?',
    opsi: [
      'Uang pinjaman masuk ke pelaku dan barang fiktif, sehingga kamu menanggung utangnya. Tolak',
      'Tidak ada risiko, komisinya menutup cicilan',
      'Risiko hanya jika telat bayar',
      'Aman asal pinjolnya terdaftar OJK',
    ],
    kunci: 0,
    penjelasan:
      'Intinya penipuan, bukan bisnis. Pinjol dipakai sebagai alat "membiayai" barang yang tidak pernah ada.',
    kasusNyata:
      'Polresta Bogor mencatat 311 mahasiswa IPB terjerat dengan nilai Rp2,1 miliar. Satgas Waspada Investasi menyebut pelaku menjanjikan komisi 10% per transaksi dan barangnya fiktif (2022). [S5, S6]',
  },
  {
    id: 'D4',
    kategori: 'Robot Trading & Skema Ponzi',
    pertanyaan:
      'Teman mengajak investasi robot trading dengan profit tetap 5% per minggu, plus bonus kalau mengajak anggota baru. Apa yang paling tepat?',
    opsi: [
      'Ikut dengan modal kecil dulu',
      'Ikut kalau banyak selebritas yang promosi',
      'Jangan ikut. Profit tetap tinggi dan bonus rekrutmen adalah ciri skema ponzi atau money game. Cek legalitas ke OJK 157 atau sipasti.ojk.go.id',
      'Ikut, lalu keluar sebelum rugi',
    ],
    kunci: 2,
    penjelasan:
      'Investasi sah selalu ada risiko. Keuntungan "pasti" biasanya berasal dari setoran anggota baru.',
    kasusNyata:
      'Bareskrim mencatat kerugian korban skema robot trading bodong sekitar Rp5,9 triliun per Maret 2022. Satgas Waspada Investasi menyebut banyak robot trading ilegal sebenarnya money game berskema MLM dengan imbal hasil tetap. [S7, S8]',
  },
  {
    id: 'D5',
    kategori: 'Penipuan Mengatasnamakan OJK',
    pertanyaan:
      'Email berlogo OJK: "Kami bantu menyelesaikan masalah pinjol Anda. Bayar biaya administrasi Rp1,5 juta dan kirim foto KTP." Apa yang kamu lakukan?',
    opsi: [
      'Bayar, karena logonya resmi',
      'Kirim KTP saja dulu, bayar belakangan',
      'Telepon nomor di email untuk memastikan',
      'Abaikan. OJK tidak meminta data pribadi atau biaya semacam itu. Konfirmasi hanya lewat kontak resmi OJK 157',
    ],
    kunci: 3,
    penjelasan: 'Logo dan alamat email mudah ditiru, dan nomor di pesan penipu bukan nomor resmi.',
    kasusNyata:
      'OJK mengingatkan bahwa mereka tidak menyediakan penyelesaian kasus individual langsung dan tidak pernah meminta data pribadi masyarakat. [S10]',
  },
  {
    id: 'D6',
    kategori: 'Malware APK Berkedok BPJS',
    pertanyaan:
      'Pesan "BPJS Kesehatan": "Ada tunggakan iuran, rincian di file terlampir (.apk)." Apa yang kamu lakukan?',
    opsi: [
      'Jangan buka lampirannya. Cek status iuran lewat aplikasi Mobile JKN atau kanal resmi BPJS',
      'Buka dulu untuk melihat jumlahnya',
      'Bayar ke rekening yang tertera',
      'Balas dan minta dikirim ulang dalam format PDF',
    ],
    kunci: 0,
    penjelasan:
      'BPJS mengirim pengingat tanpa lampiran seperti itu, dan tidak menagih lewat rekening pribadi.',
    kasusNyata:
      'BPJS Kesehatan memperingatkan fail .apk yang direkayasa seolah informasi tunggakan iuran untuk membobol rekening (2023). [S18]',
  },
  {
    id: 'D7',
    kategori: 'Penipuan OTP Telepon Bank',
    pertanyaan:
      'Telepon "petugas bank": ada transaksi mencurigakan di rekeningmu, dan dia minta kode OTP agar transaksi diblokir. Apa yang kamu lakukan?',
    opsi: [
      'Berikan OTP agar rekening aman',
      'Berikan OTP, tapi tolak memberi PIN',
      'Tutup telepon, lalu hubungi call center resmi dari aplikasi atau kartu',
      'Tetap di telepon sampai orangnya mengirim identitas',
    ],
    kunci: 2,
    penjelasan:
      'Penipu menciptakan kepanikan. Bank tidak pernah meminta OTP, jadi putuskan kontak dan hubungi sendiri nomor resmi.',
    kasusNyata: 'Penipu telepon menekan korban agar memberikan PIN atau OTP dengan dalih rekening disalahgunakan. [S11]',
  },
  {
    id: 'D8',
    kategori: 'Love Scam Kerja Online Berdeposit',
    pertanyaan:
      'Kamu akrab sebulan dengan kenalan di Instagram. Dia mengajak "kerja online" di sebuah aplikasi dan kamu setor deposit. Saat mau menarik komisi, kamu diminta setor lagi. Apa yang kamu lakukan?',
    opsi: [
      'Setor lagi supaya komisi cair',
      'Berhenti dan jangan setor lagi. Simpan bukti dan laporkan',
      'Setor, tapi jumlah kecil saja',
      'Minta pelaku mengirim bukti transfer dulu',
    ],
    kunci: 1,
    penjelasan:
      'Kombinasi hubungan akrab, ajakan kerja online, dan deposit berulang adalah pola penipuan. Pelaku bisa menampilkan angka komisi palsu di aplikasi.',
    kasusNyata:
      'Polda Metro Jaya mengungkap tiga pelaku love scamming dengan modus pekerjaan online berdeposit terhadap 21 korban (2025). Satu korban melapor rugi Rp423 juta. IASC menerima 3.494 laporan love scam sepanjang 2025. [S15, S19]',
  },
  {
    id: 'D9',
    kategori: 'Penipuan Marketplace Pindah Chat',
    pertanyaan:
      'Di marketplace, ada ponsel dengan harga 40% di bawah pasar. Penjual mengajak pindah ke WA dan meminta bayar ke rekening pribadi. Apa yang kamu lakukan?',
    opsi: [
      'Tetap bertransaksi dan membayar lewat sistem platform. Tolak pembayaran ke rekening pribadi atau pindah chat',
      'Transfer setengah dulu',
      'Percaya karena rating tokonya bagus',
      'Transfer penuh supaya tidak diambil orang lain',
    ],
    kunci: 0,
    penjelasan: 'Pindah ke luar platform menghilangkan perlindungan pembeli.',
    kasusNyata:
      'Penipuan transaksi belanja menempati urutan pertama di IASC dengan 73.743 laporan, disusul impersonation 44.446 dan investasi 26.365 (hingga pertengahan Januari 2026). [S13]',
  },
  {
    id: 'D10',
    kategori: 'Pelaporan Cepat Korban Transfer',
    pertanyaan:
      'Dua jam lalu kamu transfer Rp5 juta ke penipu. Langkah paling tepat sekarang?',
    opsi: [
      'Menunggu pelaku membalas chat',
      'Menghapus chat supaya tenang',
      'Melapor kalau seminggu tidak ada kabar',
      'Segera hubungi bank agar rekening tujuan diblokir, lapor di iasc.ojk.go.id, dan simpan semua bukti',
    ],
    kunci: 3,
    penjelasan:
      'Kecepatan menentukan peluang dana tertahan. Anjurannya adalah meminta bank memblokir dalam 24 jam pertama.',
    kasusNyata:
      'Hingga 30 Juli 2026, IASC memblokir dana korban Rp723,7 miliar dan mengembalikan Rp204,3 miliar kepada korban. [S14]',
  },
]

const SET_LANSIA = [
  {
    id: 'L1',
    kategori: 'Penipuan Data BPJS via Telepon',
    pertanyaan:
      'Ada telepon dari orang yang mengaku "Care Center BPJS Kesehatan". Katanya kartu BPJS Bapak/Ibu akan non-aktif, dan dia minta nomor NIK. Apa yang dilakukan?',
    opsi: [
      'Memberi NIK supaya kartu aman',
      'Memberi NIK, tapi tidak memberi nomor KK',
      'Menutup telepon dan tidak memberi data. Cek lewat aplikasi Mobile JKN atau datang ke kantor BPJS',
      'Membayar dulu supaya kartu tidak mati',
    ],
    kunci: 2,
    penjelasan: 'Data pribadi tidak boleh diberikan lewat telepon dari orang yang tidak dikenal.',
    kasusNyata:
      'BPJS Kesehatan mengimbau masyarakat waspada terhadap penelepon yang mengaku dari Care Center dan menyebut kartu JKN akan non-aktif. [S23]',
  },
  {
    id: 'L2',
    kategori: 'Modus Darurat Keluarga Palsu',
    pertanyaan:
      'Telepon dari orang yang mengaku dokter: "Anak Bapak/Ibu kecelakaan. Butuh Rp12 juta untuk alat operasi, transfer sekarang." Apa yang dilakukan?',
    opsi: [
      'Tenang. Hubungi anak atau keluarga langsung lewat nomor yang biasa. Jangan transfer dulu',
      'Langsung transfer, nyawa anak lebih penting',
      'Transfer separuh dulu',
      'Minta penelepon menunggu sambil mencari uang',
    ],
    kunci: 0,
    penjelasan:
      'Penipu menciptakan kepanikan agar korban tidak sempat mengecek. Satu telepon ke anak biasanya langsung membongkar penipuan.',
    kasusNyata:
      'Seorang kepala dinas di Gianyar nyaris kehilangan Rp12 juta karena telepon "dokter" yang mengabarkan anaknya kecelakaan. [S12]',
  },
  {
    id: 'L3',
    kategori: 'Penipuan OTP Telepon Bank',
    pertanyaan:
      'Ada telepon "petugas bank": "Rekening Bapak/Ibu mau dibobol! Sebutkan kode yang masuk lewat SMS." Apa yang dilakukan?',
    opsi: [
      'Menyebutkan kode, supaya bank bisa menolong',
      'Menyebutkan kode, tapi tidak memberi PIN',
      'Meminta penelepon menelepon ulang nanti',
      'Menutup telepon. Bank tidak pernah meminta kode. Hubungi bank lewat nomor di kartu ATM',
    ],
    kunci: 3,
    penjelasan: 'Kode SMS adalah kunci rekening. Siapa pun yang memegangnya bisa memindahkan uang.',
    kasusNyata:
      'Bank menegaskan tidak pernah meminta PIN, kata sandi, atau kode OTP lewat telepon, SMS, atau email. [S11]',
  },
  {
    id: 'L4',
    kategori: 'Love Scam & Paket Tertahan',
    pertanyaan:
      'Kenalan di Facebook sudah dua bulan berkirim pesan sayang, dan bilang akan mengirim hadiah mahal dari luar negeri. Lalu ada orang bilang paket tertahan di bea cukai dan Bapak/Ibu harus transfer Rp3 juta. Apa yang dilakukan?',
    opsi: [
      'Transfer, kasihan hadiahnya tertahan',
      'Tidak transfer, ceritakan ke anak atau keluarga. Itu ciri penipuan',
      'Transfer separuh dulu',
      'Meminta kenalan itu yang membayar',
    ],
    kunci: 1,
    penjelasan: 'Hadiah yang "tertahan" lalu meminta biaya adalah ciri khas penipuan asmara.',
    kasusNyata:
      'Polda Jawa Timur membongkar sindikat love scamming yang menyasar perempuan usia 45-60 tahun. Korbannya 53 orang dengan aliran dana sekitar Rp1,1 miliar, dan modusnya paket hadiah tertahan di bea cukai. [S19b]',
  },
  {
    id: 'L5',
    kategori: 'Investasi Bodong Tetangga',
    pertanyaan:
      'Tetangga mengajak ikut investasi: setor Rp5 juta, untung pasti 10% tiap bulan, tanpa risiko. Apa yang dilakukan?',
    opsi: [
      'Ikut, kan tetangga sendiri',
      'Ikut dengan separuh dana dulu',
      'Tidak ikut. Untung tinggi dan "pasti" itu tanda investasi bodong. Tanyakan dulu ke OJK 157',
      'Ikut kalau banyak orang di desa sudah ikut',
    ],
    kunci: 2,
    penjelasan: 'Orang yang kita kenal pun bisa jadi korban lalu tanpa sadar mengajak orang lain.',
    kasusNyata:
      'Bareskrim mencatat kerugian korban skema robot trading bodong sekitar Rp5,9 triliun per Maret 2022. Satgas Waspada Investasi menyebut janji imbal hasil tetap sebagai hal yang tidak logis. [S7, S8]',
  },
  {
    id: 'L6',
    kategori: 'Malware APK Undangan Pernikahan',
    pertanyaan:
      'WA dari nomor tak dikenal mengirim file "Undangan Pernikahan.apk". Bapak/Ibu diminta "izinkan pasang aplikasi". Apa yang dilakukan?',
    opsi: [
      'Dipasang, kalau aneh dihapus lagi',
      'Dipasang di HP cucu saja',
      'Dibalas, ditanyakan siapa pengirimnya',
      'Tidak dipasang, dihapus, dan tanya anak atau cucu',
    ],
    kunci: 3,
    penjelasan: 'Undangan asli tidak perlu dipasang sebagai aplikasi.',
    kasusNyata:
      'Seorang nasabah di Malang kehilangan Rp1,4 miliar setelah membuka file undangan pernikahan berformat APK di WhatsApp. [S1]',
  },
  {
    id: 'L7',
    kategori: 'Bantuan BPJS Palsu',
    pertanyaan:
      'Pesan WA: "Selamat! Bapak/Ibu terpilih menerima dana bantuan BPJS Rp75 juta. Klik link dan isi data." Apa yang dilakukan?',
    opsi: [
      'Diabaikan. BPJS tidak membagi dana bantuan seperti itu',
      'Klik link, siapa tahu benar',
      'Bayar biaya admin dulu, karena bantuannya besar',
      'Disebarkan ke grup keluarga agar yang lain ikut dapat',
    ],
    kunci: 0,
    penjelasan: 'Menyebarkan pesan seperti ini justru ikut memperluas penipuan.',
    kasusNyata:
      'BPJS Kesehatan lewat akun resminya menyatakan tidak mengeluarkan dana bantuan apa pun, dan menyebut pesan WA bernada demikian sebagai penipuan (2022). [S24]',
  },
  {
    id: 'L8',
    kategori: 'Penipuan Mengatasnamakan OJK',
    pertanyaan:
      'Telepon dari "petugas OJK": "Bapak/Ibu bisa dapat bantuan masalah keuangan. Bayar biaya administrasi dan kirim data pribadi." Apa yang dilakukan?',
    opsi: [
      'Memberikan data, karena dari lembaga negara',
      'Menolak. OJK tidak meminta data pribadi atau biaya seperti itu. Cek ke kontak resmi OJK 157',
      'Membayar biaya kecil dulu',
      'Meminta penelepon datang ke rumah',
    ],
    kunci: 1,
    penjelasan: 'Penipu sering memakai nama lembaga negara agar korban percaya.',
    kasusNyata:
      'OJK mengingatkan bahwa mereka tidak meminta data pribadi masyarakat dan tidak menyediakan penyelesaian individual langsung. [S10]',
  },
  {
    id: 'L9',
    kategori: 'Penipuan Belanja Motor Bekas',
    pertanyaan:
      'Di Facebook ada motor bekas setengah harga. Penjual minta transfer penuh dulu, katanya motor dikirim besok. Apa yang dilakukan?',
    opsi: [
      'Transfer penuh, takut keduluan orang',
      'Transfer separuh dulu',
      'Tidak transfer. Harga terlalu murah dan disuruh bayar dulu itu tanda penipuan. Beli di dealer atau toko resmi, atau minta anak mendampingi',
      'Transfer kalau penjual mengirim foto KTP',
    ],
    kunci: 2,
    penjelasan: 'Foto KTP dan foto motor mudah dipalsukan atau dicuri dari orang lain.',
    kasusNyata: 'Penipuan transaksi belanja adalah laporan terbanyak di IASC, yaitu 73.743 laporan. [S13]',
  },
  {
    id: 'L10',
    kategori: 'Pelaporan Cepat Korban Transfer',
    pertanyaan: 'Bapak/Ibu terlanjur transfer uang ke penipu. Apa yang dilakukan pertama?',
    opsi: [
      'Segera telepon bank agar rekening tujuan diblokir, lalu minta anak atau keluarga membantu melapor ke iasc.ojk.go.id dan simpan bukti',
      'Diam saja karena malu',
      'Menunggu penipu menelepon balik',
      'Transfer lagi untuk "menebus" uang yang tertahan',
    ],
    kunci: 0,
    penjelasan: 'Menjadi korban bukan aib. Semakin cepat melapor, semakin besar peluang dana tertahan.',
    kasusNyata:
      'IASC telah memblokir dana korban Rp723,7 miliar dan mengembalikan Rp204,3 miliar kepada korban (hingga 30 Juli 2026). [S14]',
  },
]

export const SOAL_PRETEST_SETS = [SET_ANAK_REMAJA, SET_DEWASA, SET_LANSIA]

export const LABEL_SET_PRETEST = ['Anak & Remaja (10–17 Tahun)', 'Dewasa (18–59 Tahun)', 'Lansia (60+ Tahun)']

export function getSoalPretest(track) {
  const i = Number(track)
  return SOAL_PRETEST_SETS[i >= 0 && i <= 2 ? i : 1]
}
