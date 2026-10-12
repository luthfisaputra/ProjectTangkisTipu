// Simulasi Kasus Interaktif — Jalur DEWASA & KARIER
// 8 skenario (satu per modus populer Dewasa), masing-masing 6 ronde pilihan.
// Skema skenario:
//   { dari: 'lawan', teks, waktu }
//   { dari: 'sistem', teks, waktu }
//   { dari: 'pilihan', label, opsi: [{teks, waktu, reaksi, reaksiWaktu}, ...] }
// Setelah semua ronde selesai → final "Apa tindakanmu?"

export const SIMULASI_KASUS_DEWASA = [
  // ============================================================
  // KASUS 1 — Pinjol Ilegal & Jebakan KTP
  // ============================================================
  {
    id: 'kasus-dewasa-1',
    modusId: 'dewasa-m1',
    title: 'Pinjaman Atas Namamu',
    kategori: 'Pinjol Ilegal',
    level: 'Tinggi',
    levelTone: 'danger',
    kontak: {
      nama: 'Admin Pinjol Cepat',
      peran: 'Mengaku dari aplikasi pinjol',
      nomor: '+62 812-4400-XXXX',
      online: true,
      avatarIcon: 'badge',
      avatarBg: 'bg-danger-red-light',
      avatarFg: 'text-danger-red',
    },
    peringatan: [
      'Nomor tidak dikenal mengabarkan pinjaman disetujui',
      'Minta verifikasi data KTP dan selfie',
      'Minta Anda mentransfer balik "dana nyasar"',
      'Ancaman sebar data kalau tidak dituruti',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Selamat pagi Pak. Saya dari aplikasi Pinjol Cepat. Ada pengajuan pinjaman Rp8.000.000 atas nama Bapak yang sudah disetujui.', waktu: '09:02' },
      { dari: 'lawan', teks: 'Untuk pencairan, kami butuh verifikasi ulang data KTP dan selfie memegang KTP ya Pak.', waktu: '09:02' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Lho, saya tidak pernah mengajukan pinjaman apa pun.', waktu: '09:03', reaksi: 'Bisa jadi data Bapak dipakai orang lain Pak. Kami harus cepat tangani sebelum dana dicairkan.', reaksiWaktu: '09:03' },
          { teks: 'Aplikasi apa ya? Saya tidak pernah install.', waktu: '09:03', reaksi: 'Kami dari afiliasi Bank Mitra, Pak. Bapak pasti pernah klik iklan kami. Biar cepat, kirim foto KTP dulu ya.', reaksiWaktu: '09:04' },
        ],
      },
      { dari: 'lawan', teks: 'Kalau tidak diverifikasi hari ini, pinjaman tetap cair dan Bapak akan ditagih Rp8 juta + bunga 15% per bulan.', waktu: '09:05' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Saya mau cek ke OJK dulu. Pinjol resmi harus terdaftar.', waktu: '09:06', reaksi: 'Ah, tidak perlu sampai OJK Pak. Ini cuma masalah internal. Kalau Bapak lapor, prosesnya lama dan dana tetap dicairkan.', reaksiWaktu: '09:06' },
          { teks: 'Baik, apa yang harus saya lakukan?', waktu: '09:06', reaksi: 'Kirim foto KTP, selfie pegang KTP, dan nomor rekening aktif. Nanti kami blokir pengajuan aslinya.', reaksiWaktu: '09:07' },
        ],
      },
      { dari: 'sistem', teks: '[Admin mengirim logo aplikasi yang tidak dikenal]', waktu: '09:07' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Saya tidak kenal aplikasi ini. Saya akan lapor ke OJK 157.', waktu: '09:08', reaksi: 'Bapak jangan mengada-ada. Data Bapak sudah kami pegang. Kalau tidak kooperatif, kami sebar ke kontak Bapak.', reaksiWaktu: '09:08' },
          { teks: 'Oke saya kirim sekarang.', waktu: '09:08', reaksi: 'Bagus Pak. Sekalian beri akses kontak dan galeri biar verifikasi cepat lewat.', reaksiWaktu: '09:09' },
        ],
      },
      { dari: 'lawan', teks: 'Eh Pak, ternyata ada kesalahan sistem. Dana Rp8 juta sudah cair ke rekening Bapak. Tolong transfer balik ke rekening kantor ya.', waktu: '09:11' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Saya cek dulu rekening, sepertinya tidak ada dana masuk.', waktu: '09:12', reaksi: 'Sudah masuk Pak, cek lagi. Kalau Bapak tidak transfer balik, kami laporkan pencurian.', reaksiWaktu: '09:12' },
          { teks: 'Oke, kirim nomor rekening kantornya.', waktu: '09:12', reaksi: 'Ini rekeningnya Pak. Transfer Rp8 juta hari ini, kalau besok bunganya bertambah.', reaksiWaktu: '09:13' },
        ],
      },
      { dari: 'lawan', teks: 'Kalau Bapak tidak transfer hari ini, kami kirim data KTP Bapak ke semua kontak Bapak.', waktu: '09:15' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Silakan. Saya juga akan laporkan nomor ini ke polisi.', waktu: '09:16', reaksi: 'Bapak keterlaluan. Kami akan sebar sekarang.', reaksiWaktu: '09:16' },
          { teks: 'Jangan Pak, saya transfer sekarang.', waktu: '09:16', reaksi: 'Bagus. Kirim bukti transfernya ya. Setelah itu data Bapak kami hapus.', reaksiWaktu: '09:17' },
        ],
      },
      { dari: 'lawan', teks: 'Sekarang atau data Bapak tersebar.', waktu: '09:18' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Saya tutup percakapan ini dan blokir nomor kamu.', waktu: '09:19', reaksi: '[Pesan gagal terkirim — Anda memblokir nomor ini]', reaksiWaktu: '09:19' },
          { teks: 'Oke, saya transfer sebentar lagi.', waktu: '09:19', reaksi: 'Jangan lama-lama ya Pak. Saya tunggu 15 menit. Kalau lewat, saya sebar.', reaksiWaktu: '09:20' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Kirim KTP & selfie, lalu transfer Rp8 juta ke rekening "kantor"',
        hasil: 'Data KTP-mu dipakai membuka pinjaman baru atas namamu, dan uang Rp8 juta langsung masuk kantong penipu. Setelah itu teror penagih akan terus datang.',
        tips: 'Pinjol resmi tidak pernah minta foto KTP lewat chat pribadi, dan tidak pernah minta transfer balik ke rekening pribadi.',
      },
      {
        benar: true,
        teks: 'Blokir nomor, cek NIK di idebku.ojk.go.id, lapor OJK 157',
        hasil: 'Kamu memutus rantai pemerasan. Nomor pelaku diblokir, dan pemakaian NIK-mu bisa dicek lewat SLIK OJK. Kalau ada pinjaman asing, bisa langsung dilaporkan.',
        tips: 'Cek NIK di idebku.ojk.go.id. Kalau ada pinjaman tidak dikenal, minta blokir NIK ke Dukcapil dan lapor OJK 157.',
      },
    ],
    fakta: 'Bareskrim November 2025: dua aplikasi pinjol ilegal memeras ~400 korban. Satu korban rugi Rp1,4 miliar karena data KTP-nya dipakai berulang meski pinjaman sudah lunas.',
  },

  // ============================================================
  // KASUS 2 — File APK Berkedok Kurir Paket
  // ============================================================
  {
    id: 'kasus-dewasa-2',
    modusId: 'dewasa-m2',
    title: 'Kurir Paket Kirim File .apk',
    kategori: 'Malware APK',
    level: 'Tinggi',
    levelTone: 'danger',
    kontak: {
      nama: 'Kurir Ekspedisi',
      peran: 'Mengaku kurir paket',
      nomor: '+62 813-2299-XXXX',
      online: true,
      avatarIcon: 'local_shipping',
      avatarBg: 'bg-warning-yellow-light',
      avatarFg: 'text-secondary',
    },
    peringatan: [
      'Kurir asli tidak pernah kirim file .apk lewat chat',
      'Nama file dibuat mirip foto paket atau resi',
      'HP minta izin "install dari sumber tidak dikenal"',
      'Setelah dipasang, aplikasi minta akses SMS & kontak',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Halo Kak, saya kurir JNE. Ada paket untuk Kakak tapi alamatnya kurang lengkap.', waktu: '13:20' },
      { dari: 'lawan', teks: 'Ini foto paketnya ya, biar Kakak bisa konfirmasi: Foto_Paket_Anda.apk', waktu: '13:20' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Kok formatnya .apk? Kurir biasanya kirim foto biasa.', waktu: '13:21', reaksi: 'Oh iya Kak, ini pakai aplikasi resmi JNE. Tinggal diinstall biar bisa lihat fotonya.', reaksiWaktu: '13:21' },
          { teks: 'Iya, saya buka dulu ya.', waktu: '13:21', reaksi: 'Siap Kak, kalau muncul izin "install dari sumber tidak dikenal", diizinkan ya biar cepat.', reaksiWaktu: '13:22' },
        ],
      },
      { dari: 'lawan', teks: 'Setelah dibuka, izinkan akses SMS, kontak, dan penyimpanan ya Kak. Itu bagian dari verifikasi.', waktu: '13:22' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Kok minta akses SMS? Untuk foto paket cuma perlu izin galeri.', waktu: '13:23', reaksi: 'Ini fitur baru Kak, biar notifikasi kurir bisa masuk. Aman kok, cuma buat kirim resi.', reaksiWaktu: '13:23' },
          { teks: 'Oke, saya install sekarang.', waktu: '13:23', reaksi: 'Mantap Kak. Jangan lupa semua izin di-allow ya. Setelah itu kirim kode verifikasi yang masuk.', reaksiWaktu: '13:24' },
        ],
      },
      { dari: 'lawan', teks: 'Kalau sudah dibuka, kirim kode OTP yang baru masuk ke SMS ya Kak. Buat konfirmasi penerimaan paket.', waktu: '13:25' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Kode OTP untuk konfirmasi penerimaan paket? Tidak masuk akal.', waktu: '13:26', reaksi: 'Kak, sistem JNE yang baru memang begitu. Kalau tidak, paketnya kami kembalikan ke pengirim.', reaksiWaktu: '13:26' },
          { teks: 'Oke, kodenya 452891.', waktu: '13:26', reaksi: 'Sip Kak, tunggu sebentar ya, kami proses.', reaksiWaktu: '13:27' },
        ],
      },
      { dari: 'sistem', teks: '[HP mulai lambat — aplikasi asing berjalan di latar belakang]', waktu: '13:28' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Aneh, HP saya jadi lambat. Saya uninstall aplikasi ini.', waktu: '13:29', reaksi: 'Jangan Kak! Nanti verifikasinya gagal. Biarkan saja, nanti normal sendiri.', reaksiWaktu: '13:29' },
          { teks: 'Kok HP saya jadi panas ya?', waktu: '13:29', reaksi: 'Normal Kak, aplikasinya sedang sinkron data paket. Bentar lagi selesai.', reaksiWaktu: '13:30' },
        ],
      },
      { dari: 'sistem', teks: '[SMS dari 8888: Kode OTP transaksi Rp15.000.000 — JANGAN bagikan ke siapa pun]', waktu: '13:30' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Kode OTP bank masuk! Saya harus segera putus koneksi.', waktu: '13:31', reaksi: 'Kak jangan! Itu OTP buat konfirmasi paket. Kalau tidak dikasih, aplikasinya error.', reaksiWaktu: '13:31' },
          { teks: 'Ada SMS OTP bank masuk. Kamu pakai data saya ya?', waktu: '13:31', reaksi: 'Tidak Kak, mungkin itu dari bank. Tidak ada hubungannya dengan paket.', reaksiWaktu: '13:32' },
        ],
      },
      { dari: 'lawan', teks: 'Cepat Kak! Sistemnya timeout nih. Kirim kodenya sekarang atau paketnya kami bawa balik.', waktu: '13:32' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Kode OTP ini bukan untuk kamu. Saya blokir dan uninstall sekarang.', waktu: '13:33', reaksi: '[Pesan gagal terkirim]', reaksiWaktu: '13:33' },
          { teks: 'Tenang, sebentar saya kirim.', waktu: '13:33', reaksi: 'Cepat ya Kak, sudah 30 detik sistem nunggu.', reaksiWaktu: '13:34' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Install APK dan berikan izin SMS + kirim kode OTP bank',
        hasil: 'Aplikasi jahat membaca SMS bank-mu dan meneruskan kode OTP ke pelaku. Rekening bisa dikuras tanpa kamu sadar.',
        tips: 'File .apk dari chat selalu berbahaya. Kode OTP bank tidak pernah diminta oleh siapa pun.',
      },
      {
        benar: true,
        teks: 'Uninstall APK, aktifkan mode pesawat, hubungi bank untuk blokir',
        hasil: 'Kamu menghentikan malware sebelum menguras rekening. Bank memblokir akses dan kartu bisa diganti.',
        tips: 'Putuskan internet (mode pesawat) → uninstall → hubungi bank. Ganti PIN dan kata sandi dari perangkat lain.',
      },
    ],
    fakta: 'OJK November 2025: laporan APK via WhatsApp mencapai 3.924 kasus. Jaringan APK kurir pernah rugikan 493 korban dengan total ~Rp12 miliar.',
  },

  // ============================================================
  // KASUS 3 — Undangan Pernikahan & Surat Palsu Berformat APK
  // ============================================================
  {
    id: 'kasus-dewasa-3',
    modusId: 'dewasa-m3',
    title: 'Undangan Pernikahan Berformat APK',
    kategori: 'Malware APK',
    level: 'Tinggi',
    levelTone: 'danger',
    kontak: {
      nama: 'Nomor Tak Dikenal',
      peran: 'Mengaku teman lama',
      nomor: '+62 815-7712-XXXX',
      online: true,
      avatarIcon: 'mail',
      avatarBg: 'bg-warning-yellow-light',
      avatarFg: 'text-secondary',
    },
    peringatan: [
      'File APK dari nomor asing selalu berbahaya',
      'Nama file menyerupai dokumen resmi',
      'Pengirim menekan agar segera dibuka',
      'Undangan asli biasanya berbentuk tautan atau gambar',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Halo, ini Rian kan? Aku Dwi teman SMP. Aku ada undangan hajatan, boleh aku kirim ke kamu?', waktu: '09:14' },
      { dari: 'lawan', teks: 'Bentar ya aku kirim filenya. Undangan-Hajatan-Dwi.apk', waktu: '09:14' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Maaf, ini siapa ya? Aku gak ingat.', waktu: '09:15', reaksi: 'Lho, aku Dwi, teman satu kelas SMP dulu. Masa lupa? Langsung buka undangannya ya.', reaksiWaktu: '09:15' },
          { teks: 'Oh iya, boleh dikirim. Tapi kok formatnya .apk?', waktu: '09:15', reaksi: 'Undangannya pakai aplikasi WO baru, biar ada videonya. Aman kok, tinggal install.', reaksiWaktu: '09:16' },
        ],
      },
      { dari: 'lawan', teks: 'Langsung install aja ya, nanti muncul izin akses — tinggal "Izinkan" semua biar lancar.', waktu: '09:16' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Undangan kok butuh izin akses SMS? Ini mencurigakan.', waktu: '09:17', reaksi: 'Itu fitur verifikasi tamu Kak, biar undangannya nyambung ke kontak kamu. Official punya.', reaksiWaktu: '09:17' },
          { teks: 'Oke, aku install ya.', waktu: '09:17', reaksi: 'Sip! Kalau muncul notifikasi minta "izin akses khusus", diizinkan ya.', reaksiWaktu: '09:18' },
        ],
      },
      { dari: 'lawan', teks: 'Udah dibuka belum? Kalau ada notifikasi "izinkan akses SMS & kontak", diizinkan ya.', waktu: '09:18' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Lho kok minta akses SMS? Undangan apa ini?', waktu: '09:19', reaksi: 'Fitur verifikasi tamu Kak. Kalau tidak diizinkan, undangannya nggak bisa dibuka.', reaksiWaktu: '09:19' },
          { teks: 'Oke, aku izinkan semua.', waktu: '09:19', reaksi: 'Mantap! Nanti kalau ada kode dari bank, itu bagian dari verifikasi ya, santai aja.', reaksiWaktu: '09:20' },
        ],
      },
      { dari: 'sistem', teks: '[Notifikasi HP: Aplikasi "Undangan-Hajatan-Dwi" meminta akses SMS]', waktu: '09:20' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Kok tiba-tiba ada aplikasi baru di HP saya? Saya tidak merasa install.', waktu: '09:21', reaksi: 'Itu aplikasi WO-nya Kak, normal. Nanti hilang sendiri setelah acara selesai.', reaksiWaktu: '09:21' },
          { teks: 'Oke, saya lanjutkan.', waktu: '09:21', reaksi: 'Bagus. Jangan keluar dari aplikasi ya, nanti undangannya corrupt.', reaksiWaktu: '09:22' },
        ],
      },
      { dari: 'lawan', teks: 'Cepetan ya, acaranya minggu depan. Kalau belum install, kamu nggak bisa buka undangannya 😊', waktu: '09:22' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Aku tanya teman dulu ya, ini mencurigakan.', waktu: '09:23', reaksi: 'Yaudah jangan lama-lama, nanti nggak keburu. Ini penting lho, acaranya keluarga besar 😔', reaksiWaktu: '09:23' },
          { teks: 'Oke oke, aku install sekarang.', waktu: '09:23', reaksi: 'Sip! Jangan lupa screenshot bukti install-nya ya. Kalau ada error bilang aku.', reaksiWaktu: '09:24' },
        ],
      },
      { dari: 'sistem', teks: '[SMS dari BCA: Kode OTP transfer Rp25.000.000 — JANGAN dibagikan]', waktu: '09:24' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Kode OTP BCA masuk! Ini pasti malware. Saya harus segera bertindak.', waktu: '09:25', reaksi: 'Kak, kode OTP-nya kirim ke aku ya, buat verifikasi undangan.', reaksiWaktu: '09:25' },
          { teks: 'Ada OTP bank masuk, kamu pakai data saya ya?', waktu: '09:25', reaksi: 'Bukan Kak, mungkin dari bank. Nanti aku tanya WO-nya.', reaksiWaktu: '09:26' },
        ],
      },
      { dari: 'lawan', teks: 'Kak, kode OTP-nya buruan kirim ya, sistemnya timeout.', waktu: '09:26' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Aku blokir kamu. Saya mau amankan rekening dulu.', waktu: '09:27', reaksi: '[Pesan gagal terkirim]', reaksiWaktu: '09:27' },
          { teks: 'Sebentar, saya kirim.', waktu: '09:27', reaksi: 'Cepat ya Kak, sudah 1 menit sistem nunggu.', reaksiWaktu: '09:28' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Install APK dan berikan akses SMS + kontak',
        hasil: 'Aplikasi jahat membaca OTP bank-mu dan meneruskannya ke pelaku. Saldo tabungan bisa raib dalam hitungan menit.',
        tips: 'Undangan asli tidak perlu aplikasi baru. Kalau ragu, telepon orang yang mengundang lewat nomor lama.',
      },
      {
        benar: true,
        teks: 'Hapus file, blokir nomor, telepon teman lewat jalur lain untuk konfirmasi',
        hasil: 'Kamu menghindari pencurian OTP. File berbahaya tidak terpasang, dan kamu sudah verifikasi ke teman asli.',
        tips: 'Nomor asing yang kirim file → abaikan, hapus, blokir. Konfirmasi lewat jalur yang kamu cari sendiri.',
      },
    ],
    fakta: 'Nasabah di Malang kehilangan Rp1,4 miliar setelah membuka file undangan pernikahan berformat APK pada 2023. Modus ini masih beredar hingga 2025 dalam berbagai kemasan baru.',
  },

  // ============================================================
  // KASUS 4 — Phishing Bank (SMS Palsu)
  // ============================================================
  {
    id: 'kasus-dewasa-4',
    modusId: 'dewasa-m4',
    title: 'SMS Phishing "Kartu Diblokir"',
    kategori: 'Phishing Bank',
    level: 'Tinggi',
    levelTone: 'danger',
    kontak: {
      nama: 'BANK-NOTIF',
      peran: 'Mengaku notifikasi bank',
      nomor: '8888',
      online: true,
      avatarIcon: 'phishing',
      avatarBg: 'bg-danger-red-light',
      avatarFg: 'text-danger-red',
    },
    peringatan: [
      'SMS dari nomor yang tampak resmi tapi berisi tautan',
      'Ancaman "kartu diblokir" untuk membuat panik',
      'Diminta isi nomor kartu, PIN, atau OTP',
      'Bank tidak pernah minta PIN/OTP di halaman web',
    ],
    skenario: [
      { dari: 'lawan', teks: '[SMS] PEMBERITAHUAN: Kartu debit Anda akan diblokir karena aktivitas mencurigakan. Verifikasi sekarang di: bca-klik-aman.xyz', waktu: '10:02' },
      { dari: 'lawan', teks: '[SMS] Jika tidak diverifikasi dalam 24 jam, kartu Anda diblokir permanen.', waktu: '10:02' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Aneh, saya tidak pernah dapat notifikasi seperti ini sebelumnya.', waktu: '10:03', reaksi: '[SMS] Klik tautan untuk verifikasi: bca-klik-aman.xyz', reaksiWaktu: '10:03' },
          { teks: 'Saya klik tautannya untuk cek.', waktu: '10:03', reaksi: '[SMS] Tautan diverifikasi. Silakan isi data kartu Anda.', reaksiWaktu: '10:04' },
        ],
      },
      { dari: 'sistem', teks: '[Tautan membuka halaman yang mirip situs bank, minta login & data kartu]', waktu: '10:04' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Alamat URL-nya aneh, bank resmi pasti pakai domain utama.', waktu: '10:05', reaksi: '[Halaman] Silakan isi nomor kartu & PIN untuk melanjutkan verifikasi.', reaksiWaktu: '10:05' },
          { teks: 'Saya isi form-nya ya.', waktu: '10:05', reaksi: '[Halaman] Nomor kartu dan PIN Anda sedang diverifikasi...', reaksiWaktu: '10:06' },
        ],
      },
      { dari: 'lawan', teks: '[SMS] Untuk konfirmasi, masukkan kode OTP yang baru dikirim ke HP Anda.', waktu: '10:06' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Bank tidak pernah minta OTP di website. Ini pasti penipuan.', waktu: '10:07', reaksi: '[Halaman] Kode OTP hanya untuk verifikasi satu kali, aman.', reaksiWaktu: '10:07' },
          { teks: 'Oke, saya masukkan kode OTP-nya.', waktu: '10:07', reaksi: '[Halaman] Kode diterima. Tunggu proses verifikasi...', reaksiWaktu: '10:08' },
        ],
      },
      { dari: 'sistem', teks: '[SMS dari 8888: Transaksi Rp9.500.000 dari kartu Anda ke rekening 8821xxxx berhasil]', waktu: '10:08' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Astaga, ada transaksi yang bukan saya! Ini pembobolan.', waktu: '10:09', reaksi: '[Halaman] Transaksi berhasil. Terima kasih telah verifikasi.', reaksiWaktu: '10:09' },
          { teks: 'Saya tunggu prosesnya.', waktu: '10:09', reaksi: '[SMS] Transaksi berikutnya sedang diproses...', reaksiWaktu: '10:10' },
        ],
      },
      { dari: 'sistem', teks: '[SMS dari 8888: Transaksi Rp12.000.000 dari kartu Anda berhasil]', waktu: '10:11' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Saya tutup browser dan telepon bank lewat nomor di kartu.', waktu: '10:12', reaksi: '[Halaman] Mohon tetap di halaman ini, verifikasi belum selesai...', reaksiWaktu: '10:12' },
          { teks: 'Kok bisa ada transaksi lagi? Saya tunggu.', waktu: '10:12', reaksi: '[SMS] Transaksi berikutnya sedang diproses...', reaksiWaktu: '10:13' },
        ],
      },
      { dari: 'lawan', teks: '[SMS] Sisa saldo Anda Rp1.200.000. Transaksi ditangguhkan karena limit.', waktu: '10:14' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Saya telepon call center bank sekarang untuk blokir kartu.', waktu: '10:15', reaksi: '[Call center] Kartu Anda kami blokir sementara. Laporan pembobolan sedang diproses.', reaksiWaktu: '10:15' },
          { teks: 'Saya transfer saldo ke rekening lain biar aman.', waktu: '10:15', reaksi: '[SMS] Verifikasi tambahan diperlukan. Masukkan OTP berikutnya.', reaksiWaktu: '10:16' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Isi nomor kartu, PIN, dan kode OTP di halaman yang ditautkan',
        hasil: 'Data kartu dan OTP langsung dipakai pelaku untuk menguras rekening. Total kerugian bisa sampai puluhan juta.',
        tips: 'Bank tidak pernah minta PIN atau OTP di halaman web mana pun. Kalau ragu, hubungi bank lewat nomor di kartu ATM.',
      },
      {
        benar: true,
        teks: 'Tutup halaman, telepon call center bank lewat nomor resmi di kartu',
        hasil: 'Kartu bisa langsung diblokir sebelum lebih banyak dana hilang. Laporan pembobolan bisa masuk jalur resmi untuk investigasi.',
        tips: 'Selalu ketik sendiri alamat situs bank. Jangan klik tautan dari SMS.',
      },
    ],
    fakta: 'OJK Oktober 2025: laporan phishing mencapai 13.386 kasus dengan kerugian Rp507,53 miliar. Kasus SMS phishing fake BTS (Maret 2025) merugikan 12 korban Rp473 juta.',
  },

  // ============================================================
  // KASUS 5 — Tugas Like/Follow Berkedok Kerja Paruh Waktu
  // ============================================================
  {
    id: 'kasus-dewasa-5',
    modusId: 'dewasa-m5',
    title: 'Tawaran Kerja Like/Follow Rp20 Ribu',
    kategori: 'Lowongan Kerja Palsu',
    level: 'Sedang–Tinggi',
    levelTone: 'warning',
    kontak: {
      nama: 'Admin Freelance',
      peran: 'Mengaku HRD freelance',
      nomor: '+62 811-3322-XXXX',
      online: true,
      avatarIcon: 'thumb_up',
      avatarBg: 'bg-warning-yellow-light',
      avatarFg: 'text-secondary',
    },
    peringatan: [
      'Perekrutan lewat chat pribadi tanpa wawancara',
      'Bayaran awal cair kecil untuk membangun kepercayaan',
      'Diminta deposit/top up untuk "tugas VIP"',
      'Ancaman "hangus" jika tidak buru-buru setor',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Halo Kak! Ada lowongan freelance santai: like & follow TikTok, Rp20.000 per tugas.', waktu: '10:02' },
      { dari: 'lawan', teks: 'Gajinya cair harian, bisa dari rumah. Nih bukti transfer member yang udah cair 👇', waktu: '10:02' },
      { dari: 'sistem', teks: '[Gambar: Bukti transfer Rp30.000 ke e-wallet member]', waktu: '10:03' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Wah gampang banget, aku tertarik!', waktu: '10:04', reaksi: 'Sip Kak! Nanti aku bimbing dari tugas pertama ya. Kalau lancar bisa naik level VIP 🚀', reaksiWaktu: '10:04' },
          { teks: 'Ini beneran gaji atau cuma jebakan?', waktu: '10:04', reaksi: 'Wah jangan suudzon Kak 😊 Nih aku kirim bukti transfer member lain yang udah cair 👇', reaksiWaktu: '10:04' },
        ],
      },
      { dari: 'lawan', teks: 'Tugas pertama kakak udah cair Rp30.000 ke e-wallet kakak ✅', waktu: '10:05' },
      { dari: 'lawan', teks: 'Sekarang ada tugas VIP nih: top up Rp300.000, komisi langsung Rp1.500.000', waktu: '10:06' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Kok aku yang harus setor dulu? Bukannya kerja itu digaji?', waktu: '10:07', reaksi: 'Iya Kak, ini cuma jaminan komitmen. Nanti uangnya balik + komisi Rp1.500.000 lho, untung besar!', reaksiWaktu: '10:07' },
          { teks: 'Oke, aku top up sekarang ya.', waktu: '10:07', reaksi: 'Sip! Setelah top up, Kakak langsung dapat misi VIP dan komisi cair hari ini ✅', reaksiWaktu: '10:07' },
        ],
      },
      { dari: 'lawan', teks: 'Batas 30 menit ya Kak. Kalau lewat, komisi hangus dan slot VIP-nya diambil orang lain.', waktu: '10:08' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Aku belum ada uang nih, mungkin lain kali.', waktu: '10:08', reaksi: 'Gapapa Kak, bisa pinjam teman atau orang tua dulu. Nanti komisinya balik 5x lipat kok!', reaksiWaktu: '10:08' },
          { teks: 'Oke, aku transfer sekarang.', waktu: '10:08', reaksi: 'Mantap! Bukti transfernya kirim ke aku ya Kak, langsung aku proses biar komisi cepat masuk ✅', reaksiWaktu: '10:09' },
        ],
      },
      { dari: 'lawan', teks: 'Oh iya, sebelum top up, Kakak perlu isi data untuk akun VIP dulu ya. Nama lengkap, nomor rekening, dan foto KTP.', waktu: '10:10' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Foto KTP? Bukannya buat freelance nggak butuh KTP?', waktu: '10:10', reaksi: 'Buat verifikasi akun VIP Kak, biar komisinya bisa dicairkan ke rekening Kakak langsung.', reaksiWaktu: '10:11' },
          { teks: 'Oke, aku kirim semuanya.', waktu: '10:10', reaksi: 'Sip! Jangan lupa selfie pegang KTP juga ya Kak, biar lewat verifikasinya.', reaksiWaktu: '10:11' },
        ],
      },
      { dari: 'lawan', teks: 'Slot VIP tinggal 1 nih Kak. Kalau telat, batch berikutnya 2 minggu lagi.', waktu: '10:12' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Aku cerita ke teman dulu ya, kayaknya aneh.', waktu: '10:12', reaksi: 'Yaudah terserah Kak, tapi slot-nya hangus lho. Nanti kalau ada batch baru aku kabari ya 😊', reaksiWaktu: '10:13' },
          { teks: 'Oke, aku transfer sekarang.', waktu: '10:12', reaksi: 'Sip! Kirim bukti transfernya ya Kak, nanti langsung aku proses biar komisi cair hari ini.', reaksiWaktu: '10:13' },
        ],
      },
      { dari: 'lawan', teks: 'Eh Kak, sistemnya error nih. Untuk mencairkan komisi Rp1,5 juta, Kakak perlu setor biaya pajak Rp200.000 dulu.', waktu: '10:15' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Kok minta setor lagi? Ini makin aneh.', waktu: '10:15', reaksi: 'Biar komisinya bisa cair Kak. Kalau tidak, uang Rp300.000 Kakak hangus.', reaksiWaktu: '10:16' },
          { teks: 'Oke, aku transfer lagi.', waktu: '10:15', reaksi: 'Bagus Kak. Setelah transfer, aku proses pencairan komisi ya.', reaksiWaktu: '10:16' },
        ],
      },
      { dari: 'lawan', teks: 'Ini step terakhir Kak. Setelah pajak, tinggal setor biaya verifikasi Rp150.000 biar dana Rp1,5 juta langsung cair.', waktu: '10:17' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Ini makin banyak biaya. Aku berhenti dan lapor polisi.', waktu: '10:18', reaksi: '[Pesan gagal terkirim — Anda memblokir nomor ini]', reaksiWaktu: '10:18' },
          { teks: 'Oke, aku setor biaya verifikasi.', waktu: '10:18', reaksi: 'Sip! Setelah ini, dana Rp1,5 juta cair langsung ke e-wallet Kakak.', reaksiWaktu: '10:19' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Setor deposit, pajak, dan biaya verifikasi untuk mencairkan komisi',
        hasil: 'Setoran terus bertambah dan komisi tidak pernah cair. Setelah kamu sadar, admin memblokir nomor dan grup menghilang.',
        tips: 'Kerja sungguhan tidak pernah minta kamu bayar dulu. Kalau ada deposit, itu 100% penipuan.',
      },
      {
        benar: true,
        teks: 'Berhenti, blokir admin, simpan bukti chat & laporan ke IASC',
        hasil: 'Kamu menghentikan kerugian sebelum setoran bertambah. Bukti chat bisa dipakai untuk melaporkan nomor dan rekening pelaku.',
        tips: 'Ceritakan ke orang dewasa sebelum setor uang. Penipu benci kalau korbannya berdiskusi dengan orang lain.',
      },
    ],
    fakta: 'Bareskrim Juli 2024: 823 korban jaringan "kerja paruh waktu" dengan kerugian ~Rp59 miliar. IASC Januari 2026 mencatat 23.469 laporan kategori lowongan kerja.',
  },

  // ============================================================
  // KASUS 6 — Catut Akun Teman & Link Undian/Voting
  // ============================================================
  {
    id: 'kasus-dewasa-6',
    modusId: 'dewasa-m6',
    title: 'Akun Teman Kirim Link Voting',
    kategori: 'Manipulasi Sosial',
    level: 'Sedang–Tinggi',
    levelTone: 'warning',
    kontak: {
      nama: 'Rian (Teman)',
      peran: 'Akun teman yang dibajak',
      nomor: '@rian.teman',
      online: true,
      avatarIcon: 'alternate_email',
      avatarBg: 'bg-safe-green-light',
      avatarFg: 'text-tertiary',
    },
    peringatan: [
      'Datang dari akun teman, bukan nomor asing',
      'Permintaan "bantuan cepat" dengan link aneh',
      'Alasan emosional: voting lomba anak/adik',
      'Halaman minta nomor WA + kode 6 digit',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Bro, tolong voting lomba adik gue dong 🙏', waktu: '21:15' },
      { dari: 'lawan', teks: 'Ini link-nya: vote-lomba-anak.xyz', waktu: '21:15' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Oke, aku klik ya!', waktu: '21:16', reaksi: 'Sip! Langsung vote ya Bro, tinggal 5 suara lagi biar adikku menang 🥺', reaksiWaktu: '21:16' },
          { teks: 'Bentar, ini link apa ya? Kok domainnya aneh?', waktu: '21:16', reaksi: 'Link lomba adik aku kok, aman. Tinggal klik aja langsung bisa vote.', reaksiWaktu: '21:16' },
        ],
      },
      { dari: 'lawan', teks: 'Vote terakhir hari ini, cepetan ya!', waktu: '21:17' },
      { dari: 'lawan', teks: 'Halamannya minta nomor WA + kode 6 digit yang masuk, tinggal masukin aja.', waktu: '21:17' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Kok minta kode 6 digit? Itu kan OTP WhatsApp buat login?', waktu: '21:18', reaksi: 'Bukan OTP kok, itu kode verifikasi vote aja. Buruan masukin ya, nanti voting-nya ditutup 😭', reaksiWaktu: '21:18' },
          { teks: 'Oke, aku isi ya.', waktu: '21:18', reaksi: 'Sip! Tinggal masukin kodenya, terus klik tombol vote-nya. Gampang kan? 😊', reaksiWaktu: '21:18' },
        ],
      },
      { dari: 'lawan', teks: 'Kode 6 digit itu buat verifikasi vote-nya kok, aman.', waktu: '21:19' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Tapi OTP WhatsApp itu buat login. Kalau aku kasih, akunku yang kena.', waktu: '21:19', reaksi: 'Yaudah kalau gak percaya, nanti adikku kalah lomba gara-gara kamu 😭', reaksiWaktu: '21:19' },
          { teks: 'Oke ini kodenya…', waktu: '21:19', reaksi: 'Sip! Jangan keluar dari halaman ya, nanti aku info kalau vote-nya kelar.', reaksiWaktu: '21:20' },
        ],
      },
      { dari: 'sistem', teks: '[HP kamu tiba-tiba log out dari WhatsApp — akun sedang dipakai di perangkat lain]', waktu: '21:20' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Astaga, WhatsApp-ku log out! Ini pasti dari link voting.', waktu: '21:21', reaksi: 'Tenang Bro, itu karena verifikasi voting. Nanti bisa login lagi.', reaksiWaktu: '21:21' },
          { teks: 'Kok WhatsApp-ku mati ya?', waktu: '21:21', reaksi: 'Wah nggak tahu Bro, mungkin error dari WhatsApp-nya. Coba tunggu sebentar.', reaksiWaktu: '21:22' },
        ],
      },
      { dari: 'lawan', teks: '[Pesan dari akun Rian ke kontak kamu: "Bro, pinjam uang dulu Rp500.000, urgent. Transfer ke rekening ini ya: 8821xxxx a.n. Andi"]', waktu: '21:22' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Ini bukan Rian. Akunnya dibajak dan sekarang dipakai minta uang ke kontaknya.', waktu: '21:23', reaksi: 'Bro, serius deh. Ini aku Rian. Cepetan transfer ya sebelum aku kena masalah.', reaksiWaktu: '21:23' },
          { teks: 'Rian kok tiba-tiba minta uang? Ini aneh.', waktu: '21:23', reaksi: 'Bro, urgent banget. Nanti aku ganti. Tolong ya.', reaksiWaktu: '21:24' },
        ],
      },
      { dari: 'lawan', teks: 'Kalau bisa transfer sekarang, kalau nggak aku cari orang lain ya.', waktu: '21:25' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Aku telepon Rian dulu ke nomor lamanya untuk konfirmasi.', waktu: '21:26', reaksi: '[Telepon ke Rian] "Hah? Aku nggak kirim pesan apa-apa. WA-ku memang baru kena hack!"', reaksiWaktu: '21:26' },
          { teks: 'Oke, aku transfer sekarang.', waktu: '21:26', reaksi: 'Makasih Bro, nanti aku ganti ya.', reaksiWaktu: '21:27' },
        ],
      },
      { dari: 'lawan', teks: 'Nanti aku kabari kalau sudah cair ya.', waktu: '21:28' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Aku tidak akan transfer. Aku sudah konfirmasi ke Rian asli.', waktu: '21:28', reaksi: '[Pesan gagal terkirim — akun dialihkan ke pemilik asli]', reaksiWaktu: '21:29' },
          { teks: 'Oke, aku tunggu kabarnya.', waktu: '21:28', reaksi: 'Sip Bro, transfer Rp500.000 dulu ya. Nanti aku ganti Rp600.000.', reaksiWaktu: '21:29' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Kirim kode OTP WhatsApp ke halaman voting, lalu transfer "bantuan" ke teman',
        hasil: 'Akun WhatsApp-mu dibajak dan menyebar link serupa ke semua kontakmu. Uang Rp500.000 juga hilang ke pelaku.',
        tips: 'Kode OTP tidak boleh diberikan ke siapa pun, termasuk lewat screenshot. Verifikasi teman lewat telepon nomor lama.',
      },
      {
        benar: true,
        teks: 'Tolak kirim kode, telepon teman lewat nomor lama, laporkan akunnya',
        hasil: 'Akunmu tetap aman. Kamu juga membantu temanmu memulihkan akun dan mencegah korban berikutnya.',
        tips: 'Aktifkan verifikasi dua langkah di WhatsApp dan 2FA di Instagram, cek Perangkat Tertaut secara berkala.',
      },
    ],
    fakta: 'Bitdefender Oktober 2025: kampanye "Vote for My Child" memakai 177 domain palsu dan 554 tautan unik. IASC Januari 2026: penipuan media sosial 19.983 laporan.',
  },

  // ============================================================
  // KASUS 7 — Toko Online Fiktif & Belanja Murah Palsu
  // ============================================================
  {
    id: 'kasus-dewasa-7',
    modusId: 'dewasa-m7',
    title: 'Penjual HP Murah di Marketplace',
    kategori: 'Toko Online Fiktif',
    level: 'Sedang–Tinggi',
    levelTone: 'warning',
    kontak: {
      nama: 'Toko Gadget Murah',
      peran: 'Penjual HP "murah"',
      nomor: '+62 812-9987-XXXX',
      online: true,
      avatarIcon: 'storefront',
      avatarBg: 'bg-warning-yellow-light',
      avatarFg: 'text-secondary',
    },
    peringatan: [
      'Harga jauh di bawah pasar',
      'Diajak pindah transaksi ke chat pribadi',
      'Diminta transfer ke rekening pribadi',
      'Testimoni seragam dan akun baru',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Halo Kak! Kami jual HP flagship baru, harga cuma Rp4.500.000. Minat?', waktu: '11:02' },
      { dari: 'lawan', teks: 'Barang masih segel, garansi resmi 1 tahun. Stok tinggal 2 nih Kak.', waktu: '11:02' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Harga pasar HP itu Rp12 juta. Kok bisa segini murah?', waktu: '11:03', reaksi: 'Kami ambil dari distributor langsung Kak, jadi bisa potong banyak. Barang masih banyak yang cari lho.', reaksiWaktu: '11:03' },
          { teks: 'Wah murah banget! Aku minat.', waktu: '11:03', reaksi: 'Sip Kak! Di luar marketplace lebih murah lagi karena nggak kena potongan platform. Boleh chat ke WA-ku langsung?', reaksiWaktu: '11:04' },
        ],
      },
      { dari: 'lawan', teks: 'Kalau Kakak minat, boleh lanjut di WhatsApp pribadi ya biar cepat. Ini nomorku: 0812-9987-xxxx', waktu: '11:04' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Kok harus pindah ke WA pribadi? Di marketplace kan ada perlindungan pembeli.', waktu: '11:05', reaksi: 'Di luar marketplace bisa lebih murah Kak, nggak ada potongan 10%. Sistem marketplace itu ribet.', reaksiWaktu: '11:05' },
          { teks: 'Oke, aku chat WA-nya ya.', waktu: '11:05', reaksi: 'Sip Kak, aku tunggu. Nanti aku kirim foto barangnya ya.', reaksiWaktu: '11:06' },
        ],
      },
      { dari: 'sistem', teks: '[Pindah ke chat WA]', waktu: '11:06' },
      { dari: 'lawan', teks: 'Ini foto barangnya Kak. Masih segel. Kalau mau, transfer Rp2.000.000 DP dulu, sisanya setelah barang sampai.', waktu: '11:07' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'DP ke rekening pribadi ya? Bisa lewat rekber marketplace?', waktu: '11:07', reaksi: 'Aduh Kak, aku sudah nggak pakai marketplace lagi. Rekening pribadi saja ya, ini rekeningku.', reaksiWaktu: '11:08' },
          { teks: 'Oke, transfer DP ke rekeningmu.', waktu: '11:07', reaksi: 'Sip! Ini nomor rekeningku ya Kak, a.n. Andi Pratama. Transfer sekarang ya, biar aku booking barangnya.', reaksiWaktu: '11:08' },
        ],
      },
      { dari: 'lawan', teks: 'Rekening ya Kak: 8821xxxx a.n. Andi Pratama. Transfer Rp2.000.000 sekarang ya, biar barangnya aku booking.', waktu: '11:09' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Nama rekeningmu bukan nama toko ya? Kok pribadi?', waktu: '11:09', reaksi: 'Iya Kak, ini rekening pemilik. Nanti begitu transfer, aku kirim nomor resinya ya.', reaksiWaktu: '11:10' },
          { teks: 'Oke, aku transfer sekarang.', waktu: '11:09', reaksi: 'Sip Kak. Tunggu ya, nanti aku kirim bukti pengiriman.', reaksiWaktu: '11:10' },
        ],
      },
      { dari: 'sistem', teks: '[Kamu transfer Rp2.000.000 ke rekening 8821xxxx]', waktu: '11:12' },
      { dari: 'lawan', teks: 'Bukti transfernya kirim ya Kak, biar aku proses booking barangnya.', waktu: '11:13' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Sudah aku kirim. Barangnya kapan dikirim?', waktu: '11:14', reaksi: 'Nanti aku info ya Kak. Kalau bisa lunasi Rp2,5 juta sisanya dulu biar barang langsung dikirim.', reaksiWaktu: '11:15' },
          { teks: 'Barangnya bisa dikirim hari ini?', waktu: '11:14', reaksi: 'Kalau lunasi Rp2,5 juta sisanya, aku bisa kirim hari ini juga Kak. Biar nggak nunggu lama.', reaksiWaktu: '11:15' },
        ],
      },
      { dari: 'lawan', teks: 'Kalau Kakak lunasi sekarang, aku kirim hari ini juga.', waktu: '11:16' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Kok tiba-tiba minta lunas dulu? Aku bayar sisanya setelah barang sampai saja.', waktu: '11:17', reaksi: 'Yaudah terserah Kak, tapi barangnya nanti aku jual ke orang lain ya.', reaksiWaktu: '11:17' },
          { teks: 'Oke, aku lunasi sekarang biar cepat.', waktu: '11:17', reaksi: 'Sip! Transfer Rp2,5 juta ke rekening yang sama ya. Nanti aku kirim resi pengiriman.', reaksiWaktu: '11:18' },
        ],
      },
      { dari: 'lawan', teks: 'Eh Kak, sistemnya error. Untuk pencairan pengiriman, Kakak perlu setor biaya asuransi Rp250.000 dulu.', waktu: '11:20' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Ini makin aneh. Aku tidak akan transfer lagi. Aku lapor polisi.', waktu: '11:21', reaksi: '[Pesan gagal terkirim — Anda memblokir nomor ini]', reaksiWaktu: '11:21' },
          { teks: 'Oke, aku transfer biaya asuransinya.', waktu: '11:21', reaksi: 'Bagus Kak. Setelah ini barang langsung dikirim ya.', reaksiWaktu: '11:22' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Transfer DP + pelunasan + biaya asuransi ke rekening pribadi penjual',
        hasil: 'Uang tidak kembali dan HP tidak pernah datang. Penjual hilang setelah kamu berhenti transfer.',
        tips: 'Selalu bayar lewat sistem resmi marketplace. Jangan pernah transfer ke rekening pribadi penjual.',
      },
      {
        benar: true,
        teks: 'Berhenti transfer, lapor ke IASC dan bank, simpan bukti chat & transfer',
        hasil: 'Kamu menghentikan kerugian lebih lanjut. Bukti yang lengkap bisa dipakai untuk upaya pemblokiran rekening pelaku.',
        tips: 'Kalau ragu, ajak teman atau keluarga memeriksa penjual. Testimoni seragam dan akun baru = tanda bahaya.',
      },
    ],
    fakta: 'OJK November 2025: penipuan belanja online adalah modus terbanyak dengan 64.933 laporan dan kerugian ~Rp1,14 triliun.',
  },

  // ============================================================
  // KASUS 8 — Mengaku Pihak Lain (Bank/Polisi)
  // ============================================================
  {
    id: 'kasus-dewasa-8',
    modusId: 'dewasa-m8',
    title: 'Telepon "Petugas Bank" Minta OTP',
    kategori: 'Impersonation',
    level: 'Tinggi',
    levelTone: 'danger',
    kontak: {
      nama: 'Petugas Bank (Palsu)',
      peran: 'Mengaku petugas fraud bank',
      nomor: '+62 21-5060-XXXX',
      online: true,
      avatarIcon: 'account_balance',
      avatarBg: 'bg-danger-red-light',
      avatarFg: 'text-danger-red',
    },
    peringatan: [
      'Penelepon membuat panik',
      'Minta OTP, PIN, atau akses layar',
      'Menyuruh pindahkan uang ke "rekening aman"',
      'Melarang Anda menutup telepon',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Selamat siang Pak. Saya Andi dari divisi Fraud Detection Bank Nusantara. Mohon maaf mengganggu.', waktu: '15:22' },
      { dari: 'lawan', teks: 'Kami mendeteksi transaksi mencurigakan di rekening Bapak sebesar Rp8.500.000 dari luar negeri.', waktu: '15:22' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Hah? Kok bisa? Aku nggak pernah transaksi hari ini!', waktu: '15:23', reaksi: 'Betul Pak, karena itu kami hubungi. Ini upaya pembobolan. Kita harus cepat amankan dana Bapak sekarang.', reaksiWaktu: '15:23' },
          { teks: 'Bisa saya verifikasi dulu dari nomor resmi bank?', waktu: '15:23', reaksi: 'Bapak tenang, saya di kantor pusat. Kalau Bapak tutup telepon, transaksi tetap berjalan lho Pak, dana Bapak bisa hilang.', reaksiWaktu: '15:24' },
        ],
      },
      { dari: 'lawan', teks: 'Kami akan pindahkan dana Bapak ke "rekening aman" yang diawasi langsung oleh bank. Tidak bisa diakses pelaku.', waktu: '15:24' },
      { dari: 'lawan', teks: 'Untuk verifikasi, tolong sebutkan kode OTP yang baru masuk ke SMS Bapak ya.', waktu: '15:25' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'OTP? Bukannya bank tidak pernah minta OTP?', waktu: '15:25', reaksi: 'Normalnya begitu Pak, tapi kasus fraud seperti ini perlu OTP khusus. Ini prosedur darurat.', reaksiWaktu: '15:25' },
          { teks: 'Oke, sebentar saya lihat SMS-nya.', waktu: '15:25', reaksi: 'Siap Pak. Kodenya 6 digit ya. Kalau sudah dapat, sebutkan ke saya biar kami input.', reaksiWaktu: '15:26' },
        ],
      },
      { dari: 'lawan', teks: 'Ini mendesak Pak. Pelaku sedang aktif. Kalau tidak dalam 2 menit, dana Bapak bisa lenyap.', waktu: '15:26' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Saya tutup telepon, mau telepon bank langsung lewat nomor resmi.', waktu: '15:26', reaksi: 'Pak jangan tutup telepon! Kalau Bapak tutup, proses pemblokiran gagal dan dana Bapak hilang. Saya di sini membantu Bapak.', reaksiWaktu: '15:27' },
          { teks: 'Oke, kodenya 452891.', waktu: '15:26', reaksi: 'Baik Pak. Kami input sekarang. Tunggu sebentar, nanti Bapak akan terima SMS konfirmasi.', reaksiWaktu: '15:27' },
        ],
      },
      { dari: 'lawan', teks: 'Pak, apakah Bapak punya aplikasi m-banking di HP? Saya perlu Bapak install aplikasi "Verifikasi Aman" dari link ini biar dana bisa dipindah.', waktu: '15:28' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Install aplikasi dari link? Bank resmi pasti lewat Play Store.', waktu: '15:28', reaksi: 'Aplikasi ini internal Pak, tidak ada di Play Store. Ini satu-satunya cara mengamankan dana Bapak.', reaksiWaktu: '15:29' },
          { teks: 'Oke, saya install sekarang.', waktu: '15:28', reaksi: 'Bagus Pak. Setelah install, izinkan akses SMS dan notifikasi ya, biar kami bisa pantau transaksi.', reaksiWaktu: '15:29' },
        ],
      },
      { dari: 'lawan', teks: 'Untuk mempercepat, Bapak bisa berbagi layar saja biar saya bimbing langsung.', waktu: '15:30' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Berbagi layar? Tidak. Ini makin mencurigakan.', waktu: '15:30', reaksi: 'Bapak, ini prosedur resmi kami. Kalau Bapak tidak kooperatif, kami tidak bisa mengembalikan dana Bapak.', reaksiWaktu: '15:31' },
          { teks: 'Oke, saya share layar ya.', waktu: '15:30', reaksi: 'Sip Pak. Sekarang buka aplikasi m-banking Bapak, saya bantu pindahkan dana ke rekening aman.', reaksiWaktu: '15:31' },
        ],
      },
      { dari: 'sistem', teks: '[Penelepon meminta Anda membuka aplikasi m-banking dan memindahkan dana ke rekening "aman"]', waktu: '15:32' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Tidak ada "rekening aman". Saya tutup telepon sekarang.', waktu: '15:33', reaksi: 'Bapak jangan tutup dulu! Kalau Bapak tutup, dana Bapak hilang total!', reaksiWaktu: '15:33' },
          { teks: 'Oke, saya pindahkan dana ke rekening yang kamu kasih.', waktu: '15:33', reaksi: 'Bagus Pak. Transfer Rp50.000.000 ke rekening ini ya, nanti dana Bapak kembali setelah investigasi.', reaksiWaktu: '15:34' },
        ],
      },
      { dari: 'lawan', teks: 'Ini kesempatan terakhir Bapak. Transfer sekarang atau dana Bapak hilang selamanya.', waktu: '15:35' },
      {
        dari: 'pilihan',
        label: 'Balasanmu?',
        opsi: [
          { teks: 'Saya blokir nomor ini dan lapor polisi.', waktu: '15:36', reaksi: '[Panggilan terputus]', reaksiWaktu: '15:36' },
          { teks: 'Oke, saya transfer sekarang.', waktu: '15:36', reaksi: 'Bagus Pak. Setelah transfer, kirim bukti ke nomor ini. Nanti dana Bapak kembali setelah 3 hari.', reaksiWaktu: '15:37' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Berikan OTP & berbagi layar, lalu transfer ke "rekening aman"',
        hasil: 'Seluruh dana rekening kamu dipindahkan ke rekening penipu dalam hitungan detik. Tidak ada "rekening aman" di bank.',
        tips: 'Bank tidak pernah minta OTP, PIN, atau memindahkan dana ke "rekening aman". Tutup telepon, hubungi bank lewat nomor resmi.',
      },
      {
        benar: true,
        teks: 'Tutup telepon, hubungi bank lewat nomor resmi di kartu ATM',
        hasil: 'Rekening tetap aman. Kalau memang ada transaksi aneh, bank akan verifikasi lewat prosedur resmi.',
        tips: 'Selalu tutup telepon dulu, lalu hubungi bank sendiri lewat nomor yang kamu cari sendiri.',
      },
    ],
    fakta: 'OJK November 2025: laporan fake call mencapai 39.978 dengan kerugian ~Rp1,54 triliun. IASC Mei 2026 menambahkan modus baru: remote access & share screen.',
  },
]

export const TOTAL_KASUS_DEWASA = SIMULASI_KASUS_DEWASA.length

export function getKasusDewasaById(id) {
  return SIMULASI_KASUS_DEWASA.find((k) => k.id === id) || null
}

// Acak satu kasus dari pool yang belum dijalankan
export function pickRandomKasusDewasa(sudahIds = []) {
  const pool = SIMULASI_KASUS_DEWASA.filter((k) => !sudahIds.includes(k.id))
  if (pool.length === 0) return SIMULASI_KASUS_DEWASA[Math.floor(Math.random() * SIMULASI_KASUS_DEWASA.length)]
  return pool[Math.floor(Math.random() * pool.length)]
}