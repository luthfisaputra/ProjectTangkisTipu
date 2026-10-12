// Data simulasi chat per modul.
// Struktur skenario:
//   - { dari: 'lawan'|'sistem', teks, waktu }        → pesan otomatis
//   - { dari: 'pilihan', label, opsi: [...] }        → user harus pilih balasan
//       setiap opsi: { teks, waktu, reaksi, reaksiWaktu }
// Setiap modul punya 3 ronde pilihan sebelum fase final "Apa tindakanmu?"

export const SIMULASI_CHAT_MODUL = {
  // ============================================================
  // JALUR PELAJAR & REMAJA
  // ============================================================

  'pelajar-01': {
    id: 'pelajar-01',
    modulTitle: 'Jebakan Diamond & Akun Game Murah',
    kategori: 'Trik Akun & Game',
    jalur: 'Jalur Pelajar & Remaja',
    modulNum: '01',
    kontak: {
      nama: 'Admin_EventML',
      peran: 'Mengaku Admin Event',
      nomor: '+62 812-7745-XXXX',
      online: true,
      avatarIcon: 'sports_esports',
      avatarBg: 'bg-danger-red-light',
      avatarFg: 'text-danger-red',
    },
    peringatan: [
      'Nomor tidak dikenal, bukan akun resmi game',
      'Menawarkan hadiah gratis sebagai umpan',
      'Link login ke domain aneh: mlbb-claim-skin-2025.top',
      'Membuat buru-buru: "kuota tinggal 3 slot"',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Halo kak! 🎉 Selamat! Akun kakak terpilih untuk event spesial bagi-bagi skin gratis dari kami!', waktu: '14:20' },
      { dari: 'lawan', teks: 'Kuota tinggal 3 slot nih kak, buruan klaim sebelum hangus!', waktu: '14:20' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          {
            teks: 'Wah iya aku mau! Gimana caranya?',
            waktu: '14:21',
            reaksi: 'Sip kak! Gampang banget, tinggal klik link yang aku kirim ya 😊',
            reaksiWaktu: '14:21',
          },
          {
            teks: 'Bentar, ini event legit apa nggak? Kok aku baru denger?',
            waktu: '14:21',
            reaksi: 'Aman kak, ini event resmi dari publisher game. Boleh dicek, tapi kuotanya cepat habis lho.',
            reaksiWaktu: '14:21',
          },
        ],
      },
      { dari: 'lawan', teks: 'Nih link-nya ya kak 👇\n🔗 mlbb-claim-skin-2025.top', waktu: '14:22' },
      { dari: 'lawan', teks: 'Kakak tinggal login pakai akun game kakak, langsung dapat skin-nya ✅', waktu: '14:22' },
      {
        dari: 'pilihan',
        label: 'Penipu makin menekan. Balasannya?',
        opsi: [
          {
            teks: 'Oke, aku klik sekarang!',
            waktu: '14:23',
            reaksi: 'Sip kak! Isi email & password akun game kakak ya di halaman itu, biar skin-nya nyangkut 😍',
            reaksiWaktu: '14:23',
          },
          {
            teks: 'Kok harus login? Bukannya bisa cuma pakai User ID?',
            waktu: '14:23',
            reaksi: 'Sistem baru dari publisher kak, wajib login dulu. Kalau nggak, skin-nya nggak akan masuk 😔',
            reaksiWaktu: '14:23',
          },
        ],
      },
      { dari: 'lawan', teks: 'Slot terakhir nih kak! 1 menit lagi hangus lho 😱', waktu: '14:24' },
      {
        dari: 'pilihan',
        label: 'Pesan terakhir. Balasannya?',
        opsi: [
          {
            teks: 'Oke oke, aku login sekarang!',
            waktu: '14:24',
            reaksi: 'Sip kak! Jangan lupa isi kode OTP yang masuk ke HP kakak ya, biar verifikasinya cepat lewat ✅',
            reaksiWaktu: '14:24',
          },
          {
            teks: 'Yaudah aku skip aja deh kayaknya.',
            waktu: '14:24',
            reaksi: 'Yah sayang banget kak, padahal kakak terpilih lho. Nanti aku info lagi kalau ada event ya 😭',
            reaksiWaktu: '14:25',
          },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Klik link & login pakai akun game-ku biar cepat dapat skin',
        hasil: 'Passwordmu terkirim ke penipu dan akunmu diambil alih. Skin gratis hanyalah umpan untuk mencuri kredensial login.',
        tips: 'Jangan pernah login akun game lewat link dari chat. Selalu buka lewat aplikasi resmi game.',
      },
      {
        benar: true,
        teks: 'Jangan klik. Buka aplikasi game langsung & cek event resmi',
        hasil: 'Event asli diumumkan di kanal resmi game, bukan lewat chat dari nomor tidak dikenal. Kamu berhasil menghindari phishing.',
        tips: 'Aktifkan 2FA di akun game dan jangan pernah bagi password ke siapa pun.',
      },
    ],
    fakta: 'Rizky (15) kehilangan akun Mobile Legends setelah memasukkan password di situs mlbb-claim-skin-2025.top.',
  },

  'pelajar-02': {
    id: 'pelajar-02',
    modulTitle: 'Tugas Like/Follow Berkedok Uang Jajan',
    kategori: 'Uang Jajan Palsu',
    jalur: 'Jalur Pelajar & Remaja',
    modulNum: '02',
    kontak: {
      nama: 'Admin Freelance ID',
      peran: 'Mengaku HRD Freelance',
      nomor: '+62 813-2290-XXXX',
      online: true,
      avatarIcon: 'thumb_up',
      avatarBg: 'bg-warning-yellow-light',
      avatarFg: 'text-secondary',
    },
    peringatan: [
      'Perekrutan lewat chat pribadi, tanpa wawancara',
      'Komisi kecil dibayar di awal sebagai umpan',
      'Diminta deposit / top up untuk "tugas VIP"',
      'Ancaman "hangus" jika tidak buru-buru setor',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Halo kak! Lowongan freelance like & follow TikTok, komisi Rp20.000 per tugas 📱', waktu: '10:02' },
      { dari: 'lawan', teks: 'Gajinya cair harian, gampang banget. Nih bukti transfer member yang udah cair 👇', waktu: '10:02' },
      { dari: 'sistem', teks: '[Gambar: Bukti transfer Rp30.000 ke e-wallet member]', waktu: '10:03' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          {
            teks: 'Wah gampang banget, aku ikut!',
            waktu: '10:04',
            reaksi: 'Sip kak! Nanti aku kasih tugas ringan dulu ya, kalau lancar bisa naik level VIP 🚀',
            reaksiWaktu: '10:04',
          },
          {
            teks: 'Ini beneran gaji atau cuma jebakan nih?',
            waktu: '10:04',
            reaksi: 'Wah jangan suudzon kak 😊 Nih aku kirim bukti transfer member lain yang udah cair 👇',
            reaksiWaktu: '10:04',
          },
        ],
      },
      { dari: 'lawan', teks: 'Tugas pertama kakak udah cair Rp30.000 ke e-wallet kakak ✅', waktu: '10:05' },
      { dari: 'lawan', teks: 'Sekarang ada tugas VIP nih: top up Rp300.000, komisi langsung Rp1.500.000', waktu: '10:06' },
      {
        dari: 'pilihan',
        label: 'Penipu makin menekan. Balasannya?',
        opsi: [
          {
            teks: 'Lho kok aku yang harus setor dulu? Bukannya kerja itu digaji?',
            waktu: '10:07',
            reaksi: 'Iya kak, ini cuma jaminan komitmen aja. Nanti uangnya balik + komisi Rp1.500.000 lho, untung besar!',
            reaksiWaktu: '10:07',
          },
          {
            teks: 'Oke, aku top up sekarang ya.',
            waktu: '10:07',
            reaksi: 'Sip! Setelah top up, kakak bisa langsung ambil tugas VIP dan komisinya cair hari ini ✅',
            reaksiWaktu: '10:07',
          },
        ],
      },
      { dari: 'lawan', teks: 'Batas 30 menit ya kak, kalau telat komisi hangus!', waktu: '10:08' },
      {
        dari: 'pilihan',
        label: 'Pesan terakhir. Balasannya?',
        opsi: [
          {
            teks: 'Tapi aku belum ada uang nih.',
            waktu: '10:08',
            reaksi: 'Gapapa kak, bisa pinjam teman atau orang tua dulu. Nanti komisinya balik 5x lipat kok!',
            reaksiWaktu: '10:08',
          },
          {
            teks: 'Oke oke, aku transfer sekarang.',
            waktu: '10:08',
            reaksi: 'Mantap! Bukti transfernya kirim ke aku ya kak, langsung aku proses biar komisi cepat masuk ✅',
            reaksiWaktu: '10:09',
          },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Top up Rp300.000 biar komisi besar tidak hangus',
        hasil: 'Ancaman "hangus" adalah teknik sunk cost dan urgensi palsu. Setoranmu tidak akan pernah kembali.',
        tips: 'Tidak ada kerja nyata yang minta kamu bayar dulu. Kalau ada deposit, itu pasti penipuan.',
      },
      {
        benar: true,
        teks: 'Berhenti. Tidak ada kerja nyata yang minta deposit—blokir admin',
        hasil: 'Kamu mengenali umpan bayaran awal dan jebakan deposit. Kerugian berhasil dihindari.',
        tips: 'Ceritakan ke orang tua atau guru sebelum menyetor uang. Penipu benci kalau korbannya berdiskusi.',
      },
    ],
    fakta: 'Nabila (16) menerima Rp30.000 pertama, lalu tergiur top up Rp300.000 yang langsung diblokir admin.',
  },

  'pelajar-03': {
    id: 'pelajar-03',
    modulTitle: 'Pinjol Ilegal & Jebakan KTP Teman',
    kategori: 'Identitas & NIK',
    jalur: 'Jalur Pelajar & Remaja',
    modulNum: '03',
    kontak: {
      nama: 'Kenalan Baru',
      peran: 'Baru dikenal di medsos',
      nomor: '+62 815-3312-XXXX',
      online: true,
      avatarIcon: 'badge',
      avatarBg: 'bg-primary-fixed',
      avatarFg: 'text-primary',
    },
    peringatan: [
      'Orang baru dikenal, langsung minta data pribadi',
      'Minta selfie memegang KTP / Kartu Pelajar',
      'Imbalan kecil (pulsa Rp50.000) sebagai umpan',
      'Ada tekanan waktu: "hari ini terakhir"',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Hai! Aku lihat profil kamu, kayaknya kita satu circle deh 😄', waktu: '19:41' },
      { dari: 'lawan', teks: 'Btw aku ada proyek kecil nih, butuh bantuan data verifikasi', waktu: '19:42' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          {
            teks: 'Proyek apa tuh? Aku tertarik!',
            waktu: '19:42',
            reaksi: 'Gampang banget kok, cuma butuh data verifikasi aja. Nanti aku bayar pulsa Rp50.000 😊',
            reaksiWaktu: '19:42',
          },
          {
            teks: 'Proyek apa ya? Kok langsung ke aku?',
            waktu: '19:42',
            reaksi: 'Aku lagi butuh banyak responden nih, kebetulan profil kamu cocok. Aman kok, santai aja.',
            reaksiWaktu: '19:43',
          },
        ],
      },
      { dari: 'lawan', teks: 'Cuma butuh selfie kamu pegang KTP aja kok, gampang', waktu: '19:43' },
      { dari: 'lawan', teks: 'Ku bayar pulsa Rp50.000, cuma sekali. Aman kok 😊', waktu: '19:43' },
      {
        dari: 'pilihan',
        label: 'Penipu makin menekan. Balasannya?',
        opsi: [
          {
            teks: 'KTP? Buat apa ya? Aku gak pernah denger verifikasi model begini.',
            waktu: '19:44',
            reaksi: 'Tenang aja, ini cuma verifikasi akun bisnis aku. Nanti pulsanya langsung masuk. Aman kok 😊',
            reaksiWaktu: '19:44',
          },
          {
            teks: 'Oh gitu, oke deh aku kirim.',
            waktu: '19:44',
            reaksi: 'Sip! Langsung kirim ya, jangan lupa selfie-nya sambil senyum biar cepat lewat verifikasinya 😄',
            reaksiWaktu: '19:44',
          },
        ],
      },
      { dari: 'lawan', teks: 'Cepetan ya, ini hari terakhir. Nanti ku transfer pulsanya', waktu: '19:45' },
      {
        dari: 'pilihan',
        label: 'Pesan terakhir. Balasannya?',
        opsi: [
          {
            teks: 'Tapi KTP ini punya kakak aku.',
            waktu: '19:45',
            reaksi: 'Gapapa kok, yang penting ada fotonya. Nanti pulsa-nya aku kirim dobel deh buat kakak kamu juga 😊',
            reaksiWaktu: '19:45',
          },
          {
            teks: 'Oke, aku kirim sekarang.',
            waktu: '19:45',
            reaksi: 'Mantap! Jangan lupa selfie-nya sambil pegang KTP ya, biar verifikasinya langsung approved ✅',
            reaksiWaktu: '19:46',
          },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Kirim aja, cuma sekali dan imbalannya lumayan',
        hasil: 'Foto KTP + selfie adalah paket lengkap untuk mengajukan pinjol ilegal atas namamu. Kamu menanggung utang yang bukan milikmu.',
        tips: 'Kalau seseorang membayarmu untuk fotomu memegang KTP, sebenarnya mereka sedang membeli identitasmu.',
      },
      {
        benar: true,
        teks: 'Tolak, blokir, dan ceritakan ke orang dewasa',
        hasil: 'Identitasmu terlindungi. Penipu tidak punya bahan untuk berutang atas namamu.',
        tips: 'KTP, NIK, dan selfie memegang KTP tidak boleh dipinjamkan ke siapa pun.',
      },
    ],
    fakta: 'Doni (17) meminjamkan NIK kakaknya ke kenalan medsos; sebulan kemudian keluarga diteror penagih utang.',
  },

  'pelajar-04': {
    id: 'pelajar-04',
    modulTitle: 'Catut Akun Teman & Link Undian di DM',
    kategori: 'Manipulasi Sosial IG/WA',
    jalur: 'Jalur Pelajar & Remaja',
    modulNum: '04',
    kontak: {
      nama: 'Alisa (Teman)',
      peran: 'Akun teman yang dibajak',
      nomor: '@alisa.medsos',
      online: true,
      avatarIcon: 'alternate_email',
      avatarBg: 'bg-safe-green-light',
      avatarFg: 'text-tertiary',
    },
    peringatan: [
      'Datang dari akun teman, bukan nomor asing',
      'Permintaan "bantuan cepat" dengan link aneh',
      'Alasan emosional: voting lomba adik',
      'Halaman minta nomor WA + kode 6 digit',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Bro, tolong voting lomba adik gue dong 🙏', waktu: '21:15' },
      { dari: 'lawan', teks: 'Ini link-nya: vote-lomba-adik.xyz', waktu: '21:15' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          {
            teks: 'Oke, aku klik ya!',
            waktu: '21:16',
            reaksi: 'Sip! Langsung vote ya bro, tinggal 5 suara lagi biar adikku menang 🥺',
            reaksiWaktu: '21:16',
          },
          {
            teks: 'Sebentar, ini link apa ya? Kok aneh?',
            waktu: '21:16',
            reaksi: 'Link lomba adik aku kok. Aman, tinggal klik aja nanti langsung bisa vote.',
            reaksiWaktu: '21:16',
          },
        ],
      },
      { dari: 'lawan', teks: 'Vote terakhir hari ini, cepetan ya!', waktu: '21:17' },
      { dari: 'lawan', teks: 'Halamannya minta nomor WA + kode 6 digit yang masuk, tinggal masukin aja', waktu: '21:17' },
      {
        dari: 'pilihan',
        label: 'Penipu makin menekan. Balasannya?',
        opsi: [
          {
            teks: 'Kok minta kode 6 digit? Itu OTP kan buat login?',
            waktu: '21:18',
            reaksi: 'Bukan OTP kok, itu kode verifikasi vote aja. Buruan masukin ya, nanti voting-nya ditutup 😭',
            reaksiWaktu: '21:18',
          },
          {
            teks: 'Oke, aku isi ya.',
            waktu: '21:18',
            reaksi: 'Sip! Tinggal masukin kodenya, terus klik tombol vote-nya. Gampang kan? 😊',
            reaksiWaktu: '21:18',
          },
        ],
      },
      { dari: 'lawan', teks: 'Kode 6 digit itu buat verifikasi vote-nya kok, aman', waktu: '21:19' },
      {
        dari: 'pilihan',
        label: 'Pesan terakhir. Balasannya?',
        opsi: [
          {
            teks: 'Kode 6 digit ini isinya buat login WA aku kan?',
            waktu: '21:19',
            reaksi: 'Yaudah kalau gak percaya, nanti adikku kalah lomba gara-gara kamu 😭',
            reaksiWaktu: '21:19',
          },
          {
            teks: 'Oke ini kodenya…',
            waktu: '21:19',
            reaksi: 'Sip! Jangan keluar dari halaman ya, nanti aku info kalau vote-nya udah kelar 😊',
            reaksiWaktu: '21:20',
          },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Kirim kode OTP-nya karena link-nya dari teman',
        hasil: 'Kode OTP adalah kunci akunmu. Bukan soal siapa yang minta—kode itu memang dipakai untuk login atas namamu.',
        tips: 'Teman yang asli tidak akan marah kalau kamu menelepon dulu sebelum mengklik.',
      },
      {
        benar: true,
        teks: 'Jangan klik. Telepon temanmu lewat jalur lain & laporkan pesannya',
        hasil: 'Kamu memutus rantai: akunmu tidak jadi pintu bagi korban berikutnya.',
        tips: 'Aktifkan verifikasi dua langkah (PIN 6 digit) di WhatsApp dan 2FA di Instagram.',
      },
    ],
    fakta: 'Alisa mengirim tangkapan layar SMS berisi 6 digit kode OTP WhatsApp—akunnya langsung hilang dan menyebar link yang sama.',
  },

  // ============================================================
  // JALUR DEWASA & KARIER
  // ============================================================

  'dewasa-01': {
    id: 'dewasa-01',
    modulTitle: 'File .apk Undangan & Resi Palsu',
    kategori: 'APK Penyamar',
    jalur: 'Jalur Dewasa & Karier',
    modulNum: '01',
    kontak: {
      nama: 'Nomor Tak Dikenal',
      peran: 'Mengaku teman lama',
      nomor: '+62 858-4412-XXXX',
      online: true,
      avatarIcon: 'install_mobile',
      avatarBg: 'bg-danger-red-light',
      avatarFg: 'text-danger-red',
    },
    peringatan: [
      'Nomor tidak dikenal mengirim file, bukan tautan resmi',
      'Nama file berakhiran .apk (undangan, resi, tagihan)',
      'Bahasa mendesak: "segera buka", "lihat bukti"',
      'Mengaku teman lama, tapi tidak bisa diverifikasi',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Halo, ini Rian kan? Aku Dwi, teman SMP dulu. Aku ada undangan hajatan nih, boleh kirim ke kamu?', waktu: '09:14' },
      { dari: 'lawan', teks: 'Bentar ya aku kirim filenya 👇', waktu: '09:14' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          {
            teks: 'Oh iya, boleh dikirim.',
            waktu: '09:15',
            reaksi: 'Sip, ini aku kirim ya. Nanti langsung dibuka biar bisa lihat detail acaranya ✅',
            reaksiWaktu: '09:15',
          },
          {
            teks: 'Maaf, ini siapa ya? Aku gak ingat.',
            waktu: '09:15',
            reaksi: 'Lho, aku Dwi, teman satu kelas SMP dulu. Masa lupa? Aku kirim undangannya ya, nanti kamu ingat sendiri 😊',
            reaksiWaktu: '09:16',
          },
        ],
      },
      { dari: 'lawan', teks: '[Lampiran: Undangan_Hajatan_Dwi.apk — 6.2 MB]', waktu: '09:16' },
      { dari: 'lawan', teks: 'Langsung diinstall aja ya, tinggal izinkan akses biar bisa dibuka undangannya', waktu: '09:16' },
      {
        dari: 'pilihan',
        label: 'File .apk sudah masuk. Balasannya?',
        opsi: [
          {
            teks: 'Oke, aku install ya sebentar.',
            waktu: '09:17',
            reaksi: 'Sip! Waktu install nanti muncul izin akses ya, tinggal "Izinkan" semua biar lancar ✅',
            reaksiWaktu: '09:17',
          },
          {
            teks: 'Kok undangan bentuknya .apk? Biasanya PDF atau gambar.',
            waktu: '09:17',
            reaksi: 'Oh iya, ini pakai aplikasi khusus dari WO biar ada videonya. Aman kok, cuma buat lihat undangan.',
            reaksiWaktu: '09:17',
          },
        ],
      },
      { dari: 'lawan', teks: 'Udah dibuka belum? Kalau ada notifikasi "izinkan akses SMS & kontak", diizinkan ya', waktu: '09:18' },
      {
        dari: 'pilihan',
        label: 'Penipu makin menekan. Balasannya?',
        opsi: [
          {
            teks: 'Lho kok minta akses SMS & kontak? Undangan apa ini?',
            waktu: '09:18',
            reaksi: 'Itu fitur verifikasi aja kok, biar undangannya terhubung ke kontak kamu. Aman, official punya ✅',
            reaksiWaktu: '09:18',
          },
          {
            teks: 'Oke, aku izinkan semua.',
            waktu: '09:18',
            reaksi: 'Mantap! Nanti kalau ada kode dari bank, itu bagian dari verifikasi ya, santai aja',
            reaksiWaktu: '09:19',
          },
        ],
      },
      { dari: 'lawan', teks: 'Cepetan ya, acaranya minggu depan. Kalau belum install nanti nggak bisa buka undangannya 😊', waktu: '09:19' },
      {
        dari: 'pilihan',
        label: 'Pesan terakhir. Balasannya?',
        opsi: [
          {
            teks: 'Oke oke, aku install sekarang.',
            waktu: '09:19',
            reaksi: 'Sip! Jangan lupa screenshot bukti install-nya ya, takutnya nanti ada error. Kalau ada apa-apa bilang aku ya 👌',
            reaksiWaktu: '09:20',
          },
          {
            teks: 'Aku tanya teman dulu ya.',
            waktu: '09:19',
            reaksi: 'Yaudah jangan lama-lama, nanti nggak keburu. Ini penting lho, acaranya keluarga besar 😔',
            reaksiWaktu: '09:20',
          },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Install file .apk & izinkan akses SMS, kontak, penyimpanan',
        hasil: 'Aplikasi jahat itu membaca SMS yang masuk—termasuk kode OTP perbankan—lalu mengirimkannya ke pelaku. Saldo tabungan bisa raib dalam hitungan menit.',
        tips: 'Jangan instal file .apk dari chat. Pasang aplikasi hanya dari Google Play Store.',
      },
      {
        benar: true,
        teks: 'Hapus file, blokir nomor, konfirmasi ke teman lewat jalur lain',
        hasil: 'Aplikasi berbahaya tidak pernah terpasang. Kamu berhasil menghindari pencurian data perbankan lewat SMS.',
        tips: 'Nomor asing yang mengirim file? Abaikan, hapus, lalu blokir nomornya.',
      },
    ],
    fakta: 'Budi (34) membuka undangan-hajatan.apk dari nomor asing; saldo tabungan Rp45.000.000 raib dalam 2 jam.',
  },

  'dewasa-02': {
    id: 'dewasa-02',
    modulTitle: 'Robot Trading & Profit Pasti 30%',
    kategori: 'Investasi Bodong',
    jalur: 'Jalur Dewasa & Karier',
    modulNum: '02',
    kontak: {
      nama: 'Admin Sinyal Trading',
      peran: 'Mengaku admin grup trading',
      nomor: '+62 812-9087-XXXX',
      online: true,
      avatarIcon: 'trending_up',
      avatarBg: 'bg-warning-yellow-light',
      avatarFg: 'text-secondary',
    },
    peringatan: [
      'Untung "pasti" atau persentase tetap per bulan',
      'Tekanan "kuota terbatas" atau "hari ini terakhir"',
      'Setoran diminta ke rekening pribadi, bukan badan usaha',
      'Mengaku izin luar negeri yang tidak bisa dicek',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Selamat siang Pak/Bu 🙏 Saya dari komunitas "AutoProfit AI", kami buka slot untuk investor terbatas.', waktu: '13:40' },
      { dari: 'lawan', teks: 'Robot trading kami rata-rata profit 30% per bulan, konsisten 2 tahun terakhir 📈', waktu: '13:40' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          {
            teks: 'Wah menarik. Boleh info lebih lanjut?',
            waktu: '13:41',
            reaksi: 'Siap! Saya kirim brosur dan link grup Telegram resmi ya. Di sana ada testimoni ratusan member yang sudah profit 😊',
            reaksiWaktu: '13:41',
          },
          {
            teks: 'Profit 30% per bulan? Itu di luar kewajaran. Platformnya berizin OJK?',
            waktu: '13:41',
            reaksi: 'Kami berizin internasional dari FSA Seychelles Bu, lebih longgar dari OJK. Banyak kok yang sudah profit tanpa masalah.',
            reaksiWaktu: '13:42',
          },
        ],
      },
      { dari: 'lawan', teks: 'Modalnya ringan, mulai Rp1 juta saja sudah bisa jalan. Slot tinggal 3 tersisa ✅', waktu: '13:42' },
      { dari: 'lawan', teks: 'Setoran langsung ke rekening perusahaan ya Bu, biar cepat diproses. Ini nomor rekeningnya 👇', waktu: '13:43' },
      {
        dari: 'pilihan',
        label: 'Penipu makin menekan. Balasannya?',
        opsi: [
          {
            teks: 'Rekeningnya atas nama pribadi ya, bukan PT?',
            waktu: '13:43',
            reaksi: 'Iya Bu, rekening direktur utama. Nanti setelah setor, kami kirim kontrak elektronik. Aman kok, sudah 2000+ investor 😊',
            reaksiWaktu: '13:43',
          },
          {
            teks: 'Oke, aku siapkan dana Rp1 juta.',
            waktu: '13:43',
            reaksi: 'Siap! Kalau bisa transfer hari ini ya Bu, slot terakhir lho. Nanti saya bantu proses pembukaan akun investasi.',
            reaksiWaktu: '13:44',
          },
        ],
      },
      { dari: 'lawan', teks: 'Slot terakhir tinggal 1 nih Bu. Kalau lewat sore ini, harus tunggu batch berikutnya 3 bulan lagi 😔', waktu: '13:44' },
      {
        dari: 'pilihan',
        label: 'Pesan terakhir. Balasannya?',
        opsi: [
          {
            teks: 'Boleh dikirim bukti izinnya? Aku cek dulu.',
            waktu: '13:44',
            reaksi: 'Izinnya sedang diperbarui Bu, jadi sementara tidak bisa ditunjukkan. Tapi 2000 investor kami profit tanpa keluhan kok 😊',
            reaksiWaktu: '13:45',
          },
          {
            teks: 'Oke, aku transfer sekarang.',
            waktu: '13:44',
            reaksi: 'Mantap! Setelah transfer, kirim bukti transfernya ya Bu. Nanti malam akun investasi Ibu langsung aktif, profit mulai jalan besok 🚀',
            reaksiWaktu: '13:45',
          },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Setor Rp1 juta ke rekening pribadi atas nama direktur',
        hasil: 'Setoranmu langsung masuk kantong pelaku. Setelah setoran besar, biasanya muncul alasan baru: pajak, biaya verifikasi, atau dana dibekukan—supaya korban setor lagi.',
        tips: 'Rekening atas nama pribadi untuk "investasi" adalah tanda bahaya besar. Setoran resmi selalu ke rekening badan usaha berizin.',
      },
      {
        benar: true,
        teks: 'Cek izin platform lewat Kontak OJK 157 sebelum menyetor dana',
        hasil: 'Entitas berizin OJK terdaftar resmi dan tidak menjanjikan profit tetap. Platform bodong seperti AutoProfit AI tidak akan lolos verifikasi.',
        tips: 'Untung besar + cepat + pasti = curiga. Cek izin lewat kontak157.ojk.go.id atau telepon 157.',
      },
    ],
    fakta: 'Rina (29) setor Rp25.000.000 ke platform autoprofit-ai.id setelah melihat testimoni palsu; situs berhenti bisa diakses pada minggu kedua.',
  },

  'dewasa-03': {
    id: 'dewasa-03',
    modulTitle: 'Penipu Mengaku Petugas Bank & Aparat',
    kategori: 'Mengaku Petugas',
    jalur: 'Jalur Dewasa & Karier',
    modulNum: '03',
    kontak: {
      nama: 'Petugas Bank',
      peran: 'Mengaku call center bank',
      nomor: '+62 21-5060-XXXX',
      online: true,
      avatarIcon: 'account_balance',
      avatarBg: 'bg-danger-red-light',
      avatarFg: 'text-danger-red',
    },
    peringatan: [
      'Meminta OTP, PIN, atau kata sandi—lembaga resmi tidak pernah meminta',
      'Menyuruh memindahkan dana ke "rekening aman"',
      'Melarang Anda menutup telepon atau menghubungi orang lain',
      'Menyebut nama & 4 digit kartu untuk meyakinkan',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Selamat siang Bapak. Saya Andi dari divisi Fraud Detection Bank Nusantara. Mohon maaf mengganggu.', waktu: '15:22' },
      { dari: 'lawan', teks: 'Kami mendeteksi transaksi mencurigakan di rekening Bapak sebesar Rp8.500.000 dari luar negeri.', waktu: '15:22' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          {
            teks: 'Hah? Kok bisa? Aku nggak pernah transaksi apa-apa hari ini!',
            waktu: '15:23',
            reaksi: 'Betul Pak, karena itu kami hubungi. Ini bisa jadi upaya pembobolan. Kita harus cepat amankan dana Bapak sekarang.',
            reaksiWaktu: '15:23',
          },
          {
            teks: 'Bisa diverifikasi dari nomor resmi bank dulu? Aku telepon balik.',
            waktu: '15:23',
            reaksi: 'Bapak tenang, saya di kantor pusat, tidak mungkin memalsukan. Kalau Bapak tutup telepon, transaksi tetap berjalan lho Pak, dana Bapak bisa hilang 😔',
            reaksiWaktu: '15:24',
          },
        ],
      },
      { dari: 'lawan', teks: 'Kami akan pindahkan dana Bapak ke "rekening aman" yang diawasi langsung oleh bank. Tidak bisa diakses pelaku ✅', waktu: '15:24' },
      { dari: 'lawan', teks: 'Untuk verifikasi, tolong sebutkan kode OTP yang baru masuk ke SMS Bapak ya. Kami butuh untuk proses pengamanan.', waktu: '15:25' },
      {
        dari: 'pilihan',
        label: 'Penipu minta OTP. Balasannya?',
        opsi: [
          {
            teks: 'OTP buat apa ya? Bukannya bank nggak pernah minta OTP?',
            waktu: '15:25',
            reaksi: 'Normalnya begitu Pak, tapi kasus fraud seperti ini perlu verifikasi OTP khusus. Ini prosedur darurat, kalau Bapak tidak kasih, dana Bapak hilang 😢',
            reaksiWaktu: '15:25',
          },
          {
            teks: 'Oke, sebentar aku lihat SMS-nya.',
            waktu: '15:25',
            reaksi: 'Siap Pak, saya tunggu. Kodenya 6 digit ya Pak. Kalau sudah dapat, langsung sebutkan ke saya biar kami input.',
            reaksiWaktu: '15:26',
          },
        ],
      },
      { dari: 'lawan', teks: 'Ini sangat mendesak Bapak. Pelaku sedang aktif. Kalau tidak dalam 2 menit, dana Bapak bisa lenyap seluruhnya 😰', waktu: '15:26' },
      {
        dari: 'pilihan',
        label: 'Pesan terakhir. Balasannya?',
        opsi: [
          {
            teks: 'Oke, kodenya 4-8-2-9-1-5.',
            waktu: '15:26',
            reaksi: 'Baik Pak, kami input sekarang. Tunggu ya sebentar, nanti Bapak akan terima SMS konfirmasi. Mohon jangan tutup telepon 😊',
            reaksiWaktu: '15:27',
          },
          {
            teks: 'Aku telepon bank langsung lewat nomor di kartu ATM.',
            waktu: '15:26',
            reaksi: 'Bapak jangan tutup telepon dulu! Kalau Bapak tutup, proses pemblokiran gagal dan dana Bapak hilang. Saya di sini membantu Bapak lho 😠',
            reaksiWaktu: '15:27',
          },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Sebutkan kode OTP agar dana segera dipindahkan ke "rekening aman"',
        hasil: 'Bank tidak pernah meminta OTP. Sekali kode OTP tersebut diberikan, pelaku langsung membobol rekening dan memindahkan seluruh dana dalam hitungan detik.',
        tips: 'OTP, PIN, dan kata sandi tidak pernah diminta oleh siapa pun—termasuk yang mengaku petugas bank.',
      },
      {
        benar: true,
        teks: 'Tutup telepon, lalu hubungi bank lewat nomor resmi di kartu atau aplikasi',
        hasil: 'Verifikasi lewat kanal resmi membuat rekening tetap aman. Jika memang ada transaksi mencurigakan, bank akan memprosesnya lewat prosedur resmi.',
        tips: 'Tidak ada "rekening aman" dari bank atau polisi. Tutup telepon, hubungi bank lewat nomor resmi.',
      },
    ],
    fakta: 'Hendra (41) ditelpon "petugas bank" karena rekeningnya dianggap mencurigakan; setelah menyebut kode OTP, Rp18.000.000 berpindah ke rekening lain malam itu juga.',
  },

  'dewasa-04': {
    id: 'dewasa-04',
    modulTitle: 'Tawaran Kerja & Deposit Paruh Waktu Palsu',
    kategori: 'Tawaran Kerja Palsu',
    jalur: 'Jalur Dewasa & Karier',
    modulNum: '04',
    kontak: {
      nama: 'HRD Freelance',
      peran: 'Mengaku HRD perusahaan',
      nomor: '+62 811-3302-XXXX',
      online: true,
      avatarIcon: 'badge',
      avatarBg: 'bg-primary-fixed',
      avatarFg: 'text-primary',
    },
    peringatan: [
      'Pekerjaan sangat mudah dengan bayaran tinggi',
      'Diminta setor uang (deposit) untuk bekerja atau menarik gaji',
      'Tidak ada kontrak, alamat kantor, atau kontak yang bisa diverifikasi',
      'Komisi kecil di awal dibayar cepat untuk membangun kepercayaan',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Halo Kak, saya Rani dari PT Berkah Digital Nusantara. Kami buka lowongan kerja paruh waktu remote untuk rating & review produk.', waktu: '11:05' },
      { dari: 'lawan', teks: 'Komisi Rp30.000 per tugas, cukup 30 menit sehari. Bisa dikerjakan dari HP 📱', waktu: '11:05' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          {
            teks: 'Wah menarik. Perusahaan apa ya ini?',
            waktu: '11:06',
            reaksi: 'PT Berkah Digital Nusantara Kak, kantor pusat di Jakarta. Kami sedang ekspansi, jadi butuh banyak freelancer untuk tugas ringan 😊',
            reaksiWaktu: '11:06',
          },
          {
            teks: 'Aku tertarik. Gimana cara daftarnya?',
            waktu: '11:06',
            reaksi: 'Gampang Kak, nanti saya kirim link grup kerja. Di sana ada mentor yang akan bimbing Kakak sampai tugas pertama cair ✅',
            reaksiWaktu: '11:07',
          },
        ],
      },
      { dari: 'lawan', teks: 'Ini bukti komisi yang baru cair ke member kemarin ya Kak 👇', waktu: '11:07' },
      { dari: 'sistem', teks: '[Gambar: Screenshot bukti transfer Rp400.000 ke e-wallet member]', waktu: '11:07' },
      {
        dari: 'pilihan',
        label: 'Penipu kirim bukti. Balasannya?',
        opsi: [
          {
            teks: 'Wah mantap. Aku mau coba!',
            waktu: '11:08',
            reaksi: 'Sip Kak! Nanti saya kirim link grup kerja ya. Jangan lupa, sebelum mulai kakak perlu top up saldo "limit tugas" dulu.',
            reaksiWaktu: '11:08',
          },
          {
            teks: 'Kok ada top up? Bukannya kerja itu digaji, bukan bayar?',
            waktu: '11:08',
            reaksi: 'Top up ini buat jaminan sistem aja Kak, biar tidak ada member nakal. Nanti saldonya balik + komisi Rp1.500.000 dalam sehari 😊',
            reaksiWaktu: '11:09',
          },
        ],
      },
      { dari: 'lawan', teks: 'Limit tugas VIP hari ini tinggal 2 slot ya Kak. Deposit Rp2.000.000, komisi balik Rp4.500.000 sore ini 🚀', waktu: '11:09' },
      {
        dari: 'pilihan',
        label: 'Penipu minta deposit besar. Balasannya?',
        opsi: [
          {
            teks: 'Oke, aku siapkan dana Rp2 juta.',
            waktu: '11:09',
            reaksi: 'Mantap Kak! Setelah deposit, screenshot bukti transfernya kirim ke saya ya. Nanti akun VIP Kakak langsung aktif 💸',
            reaksiWaktu: '11:10',
          },
          {
            teks: 'Maaf, aku tidak pernah kerja yang minta setor dulu.',
            waktu: '11:09',
            reaksi: 'Kak, ini bukan setoran, tapi jaminan komitmen aja. Uangnya balik lho + untung besar. Sayang kalau dilewatkan 😔',
            reaksiWaktu: '11:10',
          },
        ],
      },
      { dari: 'lawan', teks: 'Batas 30 menit ya Kak. Kalau lewat, slot VIP-nya hangus dan harus tunggu batch berikutnya bulan depan ⏰', waktu: '11:10' },
      {
        dari: 'pilihan',
        label: 'Pesan terakhir. Balasannya?',
        opsi: [
          {
            teks: 'Oke, aku transfer sekarang.',
            waktu: '11:10',
            reaksi: 'Sip Kak! Setelah transfer, jangan lupa kirim bukti ya. Nanti saya bantu proses pembukaan akun VIP biar komisi cepat cair 🎉',
            reaksiWaktu: '11:11',
          },
          {
            teks: 'Aku tanya teman dulu, kayaknya ini penipuan.',
            waktu: '11:10',
            reaksi: 'Yaudah terserah Kakak, tapi slot-nya hangus lho. Nanti kalau ada lowongan lagi baru saya kabari ya 😊',
            reaksiWaktu: '11:11',
          },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Setor deposit Rp2.000.000 untuk membuka tugas VIP',
        hasil: 'Setoranmu tidak akan pernah kembali. Setelah deposit, penipu akan meminta "biaya pencairan", "pajak", atau "verifikasi" tambahan—sampai korban sadar uangnya hilang.',
        tips: 'Perusahaan sungguhan tidak pernah meminta Anda membayar untuk bekerja. Kalau ada deposit, itu penipuan.',
      },
      {
        benar: true,
        teks: 'Berhenti. Simpan bukti chat & laporkan ke IASC OJK',
        hasil: 'Kamu berhasil menghindari jebakan deposit dan menghentikan penipuan lebih lanjut. Bukti chat dan nomor pelaku siap dilaporkan.',
        tips: 'Anggap komisi kecil di awal sebagai umpan. Lapor ke iasc.ojk.go.id dan blokir rekening pelaku via cekrekening.id.',
      },
    ],
    fakta: 'Sinta (24) dibayar Rp30.000 untuk tugas pertama, lalu diminta deposit Rp500.000 yang terus berlanjut tanpa pernah bisa ditarik.',
  },

  // ============================================================
  // JALUR RAMAH LANSIA (60+)
  // ============================================================

  'lansia-01': {
    id: 'lansia-01',
    modulTitle: '"Nak, Aku Kecelakaan—Butuh Uang Rumah Sakit!"',
    kategori: 'Telepon Panik',
    jalur: 'Jalur Ramah Lansia',
    modulNum: '01',
    kontak: {
      nama: 'Penelepon Tak Dikenal',
      peran: 'Mengaku anak / petugas RS',
      nomor: '+62 812-5501-XXXX',
      online: false,
      avatarIcon: 'call',
      avatarBg: 'bg-danger-red-light',
      avatarFg: 'text-danger-red',
    },
    peringatan: [
      'Penelepon tidak dikenal, suara panik menangis',
      'Anda dilarang menutup telepon',
      'Uang diminta ke rekening pribadi, bukan kasir rumah sakit',
      'Pelaku menyebut data anak untuk meyakinkan',
    ],
    skenario: [
      { dari: 'lawan', teks: '[Panggilan masuk] Halo Bu... ini saya, anak Ibu... saya kecelakaan... 😭', waktu: '10:14' },
      { dari: 'lawan', teks: 'Sekarang saya di rumah sakit... kata dokter harus segera dioperasi... tolong Bu...', waktu: '10:14' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          {
            teks: 'Ya ampun, kamu di rumah sakit mana? Ibu ke sana sekarang!',
            waktu: '10:15',
            reaksi: 'Bu... jangan ke sini dulu... biaya operasinya harus dibayar sekarang... kalau nggak saya nggak bisa masuk ruang operasi 😭',
            reaksiWaktu: '10:15',
          },
          {
            teks: 'Tunggu, ini benar anak saya? Suaranya tidak jelas.',
            waktu: '10:15',
            reaksi: 'Bu, ini saya... suara saya serak karena nangis... tolong percaya Bu... saya sakit sekali...',
            reaksiWaktu: '10:16',
          },
        ],
      },
      { dari: 'lawan', teks: 'Tadi dokter bilang operasinya Rp21 juta Bu... sekarang harus transfer ke rekening dokter...', waktu: '10:16' },
      { dari: 'lawan', teks: 'Jangan tutup telepon ya Bu... nanti saya nggak bisa kasih tahu nomor rekeningnya...', waktu: '10:16' },
      {
        dari: 'pilihan',
        label: 'Penipu minta transfer sekarang. Balasannya?',
        opsi: [
          {
            teks: 'Baik, nomor rekeningnya apa? Ibu transfer sekarang.',
            waktu: '10:17',
            reaksi: 'Ini Bu nomor rekeningnya... a.n. Andi Pratama... tolong cepat ya Bu... saya sudah nggak kuat nahan sakit...',
            reaksiWaktu: '10:17',
          },
          {
            teks: 'Kok ke rekening pribadi? Rumah sakit biasanya bayar di kasir.',
            waktu: '10:17',
            reaksi: 'Bu, ini sistem baru dari rumah sakit... biar cepat masuk ruang operasi... kalau bayar di kasir nanti harus ngantri lama, saya nggak bisa nunggu 😢',
            reaksiWaktu: '10:18',
          },
        ],
      },
      { dari: 'lawan', teks: 'Bu, saya dengar suara suster... katanya operasinya harus 15 menit lagi... kalau nggak, nyawa saya taruhannya... 😭', waktu: '10:18' },
      {
        dari: 'pilihan',
        label: 'Pesan terakhir. Balasannya?',
        opsi: [
          {
            teks: 'Baik Nak, Ibu transfer sekarang. Jangan kemana-mana ya.',
            waktu: '10:18',
            reaksi: 'Iya Bu... makasih Bu... kirim bukti transfernya ya Bu... nanti saya kasih ke dokter 😊',
            reaksiWaktu: '10:19',
          },
          {
            teks: 'Ibu tutup dulu, mau telepon anak Ibu yang asli.',
            waktu: '10:18',
            reaksi: 'Jangan Bu! Nanti saya nggak bisa telepon lagi! Bu tolong jangan tutup telepon... 😠',
            reaksiWaktu: '10:19',
          },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Transfer Rp21 juta ke rekening "dokter" agar anak cepat dioperasi',
        hasil: 'Anak Anda sebenarnya baik-baik saja. Uang Rp21 juta langsung masuk kantong penipu. Setelah transfer, nomor itu hilang dan tidak bisa dihubungi.',
        tips: 'Tutup telepon. Rumah sakit tidak pernah meminta biaya operasi ditransfer ke rekening pribadi.',
      },
      {
        benar: true,
        teks: 'Tutup telepon, lalu telepon anak langsung lewat nomor yang tersimpan',
        hasil: 'Anda memastikan keadaan anak lewat jalur sendiri. Anak baik-baik saja—modus penipuan gagal, uang aman.',
        tips: 'Tenang adalah senjata terbaik: tutup, telepon balik nomor tersimpan, jangan transfer.',
      },
    ],
    fakta: 'Ibu di Bantul kehilangan Rp21,9 juta setelah dikabari anaknya kecelakaan. Seorang ibu di Sumatera Utara hampir tertipu modus serupa—selamat karena menghubungi sekolah anaknya.',
  },

  'lansia-02': {
    id: 'lansia-02',
    modulTitle: '"Anak Bapak Ditangkap—Butuh Uang Damai!"',
    kategori: 'Telepon Dini Hari',
    jalur: 'Jalur Ramah Lansia',
    modulNum: '02',
    kontak: {
      nama: 'Mengaku Polisi',
      peran: 'Menyamar aparat / teman anak',
      nomor: '+62 813-8890-XXXX',
      online: false,
      avatarIcon: 'local_police',
      avatarBg: 'bg-danger-red-light',
      avatarFg: 'text-danger-red',
    },
    peringatan: [
      'Polisi asli tidak meminta uang damai lewat telepon',
      'Anda diminta "jangan beri tahu siapa pun"',
      'Nada mengancam dan terburu-buru',
      'Telepon masuk larut malam / dini hari',
    ],
    skenario: [
      { dari: 'lawan', teks: '[Panggilan masuk pukul 02:14] Halo, ini dari Polres. Apakah benar ini Bapak dari Rizky Pratama?', waktu: '02:14' },
      { dari: 'lawan', teks: 'Anak Bapak kami amankan tadi malam. Dia terlibat kasus narkoba. Kalau mau damai, bisa selesaikan sekarang.', waktu: '02:14' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Bapak/Ibu membalas?',
        opsi: [
          {
            teks: 'Astaga... anak saya baik-baik saja kok. Dia ada di rumah.',
            waktu: '02:15',
            reaksi: 'Mohon tenang Pak. Ini masih bisa kami selesaikan di luar pengadilan. Kalau Bapak mau anaknya pulang cepat, ada biaya damai Rp25 juta.',
            reaksiWaktu: '02:15',
          },
          {
            teks: 'Maaf, ini siapa ya? Bisa kirim surat resmi dulu?',
            waktu: '02:15',
            reaksi: 'Ini mendesak Pak, tidak bisa pakai surat. Kalau Bapak tidak cepat, anak Bapak akan kami proses hukum malam ini juga.',
            reaksiWaktu: '02:16',
          },
        ],
      },
      { dari: 'lawan', teks: 'Uang damai Rp25 juta ditransfer ke rekening bendahara sekarang. Jangan beri tahu siapa pun, termasuk istri Bapak.', waktu: '02:16' },
      { dari: 'lawan', teks: 'Kalau Bapak bicara ke orang lain, kasus anak Bapak akan naik ke pengadilan. Bisa 5 tahun penjara.', waktu: '02:16' },
      {
        dari: 'pilihan',
        label: 'Penipu minta transfer cepat. Balasannya?',
        opsi: [
          {
            teks: 'Baik Pak, saya transfer sekarang. Nomor rekeningnya?',
            waktu: '02:17',
            reaksi: 'Ini nomor rekeningnya Pak. Transfer Rp25 juta sekarang. Setelah itu anak Bapak langsung kami lepas malam ini.',
            reaksiWaktu: '02:17',
          },
          {
            teks: 'Saya cek dulu ke kantor polisi terdekat ya, Pak.',
            waktu: '02:17',
            reaksi: 'Jangan Pak! Kalau Bapak hubungi kantor lain, kasus ini jadi formal dan biayanya lebih besar. Mumpung masih bisa damai, transfer sekarang 😠',
            reaksiWaktu: '02:18',
          },
        ],
      },
      { dari: 'lawan', teks: 'Bapak punya waktu 10 menit. Kalau lewat, anak Bapak akan kami bawa ke sel tahanan malam ini.', waktu: '02:18' },
      {
        dari: 'pilihan',
        label: 'Pesan terakhir. Balasannya?',
        opsi: [
          {
            teks: 'Baik Pak, saya transfer sekarang juga.',
            waktu: '02:18',
            reaksi: 'Bagus Pak. Setelah transfer, kirim bukti ke nomor ini ya. Nanti malam anak Bapak diantar pulang 😊',
            reaksiWaktu: '02:19',
          },
          {
            teks: 'Saya mau lihat anak saya dulu sebelum transfer.',
            waktu: '02:18',
            reaksi: 'Tidak bisa Pak, dia sudah di dalam. Kalau Bapak tidak percaya, ya sudah, kami proses hukum. Terserah Bapak 😤',
            reaksiWaktu: '02:19',
          },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Transfer Rp25 juta ke rekening "bendahara polres" agar anak dibebaskan',
        hasil: 'Anak Anda tidak sedang ditahan di mana pun. Polisi asli tidak meminta uang damai lewat telepon. Uang Anda langsung masuk kantong penipu.',
        tips: 'Polisi asli tidak pernah meminta "uang damai" lewat telepon. Tutup telepon, cek anak Anda langsung.',
      },
      {
        benar: true,
        teks: 'Tutup telepon, cek anak Anda lewat nomor tersimpan atau bangunkan keluarga',
        hasil: 'Anda memastikan keadaan anak sendiri sebelum bertindak. Anak baik-baik saja—penipuan gagal, uang aman.',
        tips: 'Kalau ragu, datangi kantor polisi terdekat. Jangan transfer ke rekening pribadi.',
      },
    ],
    fakta: 'Pukul 2 dini hari, seorang warga Bandung menerima telepon anaknya "ditahan polisi" dan minta transfer untuk "damai". Ia selamat karena segera memeriksa anaknya yang ternyata tidur di rumah.',
  },

  'lansia-03': {
    id: 'lansia-03',
    modulTitle: 'Chat "Ma, Ini Nomor Baru Saya"',
    kategori: 'WhatsApp Palsu',
    jalur: 'Jalur Ramah Lansia',
    modulNum: '03',
    kontak: {
      nama: 'Nomor Baru "Anak"',
      peran: 'Mengaku anak dengan nomor baru',
      nomor: '+62 815-4478-XXXX',
      online: true,
      avatarIcon: 'chat',
      avatarBg: 'bg-danger-red-light',
      avatarFg: 'text-danger-red',
    },
    peringatan: [
      'Nomor baru, tapi tidak mau ditelepon',
      'Minta uang di pesan pertama',
      'Rekening tujuan atas nama orang lain',
      'Mengaku HP lama hilang',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Ma, ini nomor baru aku. HP lama aku hilang kemarin 😔', waktu: '20:15' },
      { dari: 'lawan', teks: 'Ma, aku butuh bantuan. Bisa transfer uang dulu nggak?', waktu: '20:16' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          {
            teks: 'Ya ampun, kenapa HP kamu hilang? Kamu di mana sekarang?',
            waktu: '20:16',
            reaksi: 'Aku di luar kota Ma. Ada urusan penting. Tolong transfer dulu ya Ma, nanti aku ganti.',
            reaksiWaktu: '20:17',
          },
          {
            teks: 'Ini benar anak saya? Suaranya via chat nih, Ibu mau telepon.',
            waktu: '20:16',
            reaksi: 'Ma, aku lagi rapat nih, nggak bisa telepon. Chat aja ya Ma. Nanti aku kabari kalau udah bisa.',
            reaksiWaktu: '20:17',
          },
        ],
      },
      { dari: 'lawan', teks: 'Aku butuh Rp10 juta Ma, buat keperluan mendesak. Nanti aku jelasin.', waktu: '20:17' },
      { dari: 'lawan', teks: 'Transfer ke rekening ini ya Ma 👇\n🏦 BCA 1234567890 a.n. Andi Pratama', waktu: '20:17' },
      {
        dari: 'pilihan',
        label: 'Nama rekening berbeda dari nama anak. Balasannya?',
        opsi: [
          {
            teks: 'Nak, kok rekeningnya bukan nama kamu?',
            waktu: '20:18',
            reaksi: 'Itu rekening teman aku Ma, HP aku hilang jadi aku pinjam HP dia. Tetap aman kok Ma.',
            reaksiWaktu: '20:18',
          },
          {
            teks: 'Baik Nak, Ibu transfer sekarang.',
            waktu: '20:18',
            reaksi: 'Iya Ma, cepetan ya. Nanti aku kabari kalau udah masuk 😊',
            reaksiWaktu: '20:19',
          },
        ],
      },
      { dari: 'lawan', teks: 'Ma, kalau bisa sekarang ya. Aku butuh banget hari ini. Besok mungkin udah nggak bisa 😭', waktu: '20:19' },
      {
        dari: 'pilihan',
        label: 'Pesan terakhir. Balasannya?',
        opsi: [
          {
            teks: 'Baik Nak, Ibu transfer sekarang.',
            waktu: '20:19',
            reaksi: 'Makasih Ma. Kalau udah transfer kirim buktinya ya. Nanti aku doain terus 😊',
            reaksiWaktu: '20:20',
          },
          {
            teks: 'Ibu mau telepon nomor lama kamu dulu ya, Nak.',
            waktu: '20:19',
            reaksi: 'Jangan Ma! Nomor lama aku udah nggak aktif. Pokoknya transfer ke nomor baru ini ya Ma 😠',
            reaksiWaktu: '20:20',
          },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Transfer Rp10 juta ke rekening atas nama orang lain',
        hasil: 'Anak Anda tidak sedang kehilangan HP. Nomor itu milik penipu dari luar negeri. Uang Anda langsung raib.',
        tips: 'Nomor baru + minta uang + rekening atas nama orang lain = hampir pasti penipuan.',
      },
      {
        benar: true,
        teks: 'Jangan transfer. Telepon nomor lama anak untuk konfirmasi',
        hasil: 'Anda memastikan identitas pengirim lewat nomor lama. Anak Anda baik-baik saja—modus nomor palsu gagal.',
        tips: 'Tanyakan hal yang hanya diketahui anak, misalnya nama panggilan masa kecil atau warna kesukaannya.',
      },
    ],
    fakta: 'Bu Ratna (65) mengirim Rp10.000.000 ke "nomor baru anak" yang ternyata milik penipu dari luar negeri. Anaknya tidak pernah kehilangan ponsel.',
  },

  'lansia-04': {
    id: 'lansia-04',
    modulTitle: 'Suara Tiruan AI yang Persis Anak/Cucu',
    kategori: 'Suara Tiruan AI',
    jalur: 'Jalur Ramah Lansia',
    modulNum: '04',
    kontak: {
      nama: 'Mengaku Cucu',
      peran: 'Suara mirip cucu',
      nomor: '+62 817-2234-XXXX',
      online: false,
      avatarIcon: 'record_voice_over',
      avatarBg: 'bg-danger-red-light',
      avatarFg: 'text-danger-red',
    },
    peringatan: [
      'Suara meyakinkan, tapi meminta uang mendadak',
      'Telepon dari nomor tidak dikenal',
      'Anda diminta instal aplikasi atau kirim kode',
      'Mengaku dari instansi, minta data pribadi',
    ],
    skenario: [
      { dari: 'lawan', teks: '[Panggilan masuk] Kek... ini aku... cucu Kek... aku butuh uang sekarang...', waktu: '16:02' },
      { dari: 'lawan', teks: 'Aku lagi ada masalah besar Kek... tolong jangan bilang Mama ya... aku malu...', waktu: '16:02' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Kakek/Nenek membalas?',
        opsi: [
          {
            teks: 'Aduh, ada apa ini cucu Kakek? Suaramu kenapa?',
            waktu: '16:03',
            reaksi: 'Aku kecelakaan Kek... sepeda aku nabrak mobil... sekarang di rumah sakit... butuh uang operasi...',
            reaksiWaktu: '16:03',
          },
          {
            teks: 'Cucu? Suaramu mirip, tapi Kakek mau tanya sesuatu dulu.',
            waktu: '16:03',
            reaksi: 'Kek, ini aku beneran... suaraku serak karena habis nangis... tolong percaya Kek... aku sakit sekali...',
            reaksiWaktu: '16:04',
          },
        ],
      },
      { dari: 'lawan', teks: 'Dokter bilang butuh Rp15 juta Kek... sekarang... kalau nggak aku nggak bisa masuk ruang operasi...', waktu: '16:04' },
      { dari: 'lawan', teks: 'Kakek transfer ke rekening teman aku ya... aku nggak sempat kasih rekening aku sendiri...', waktu: '16:04' },
      {
        dari: 'pilihan',
        label: 'Rekening teman, bukan cucu. Balasannya?',
        opsi: [
          {
            teks: 'Kok ke rekening teman? Kakek mau transfer ke rekening kamu aja.',
            waktu: '16:05',
            reaksi: 'Nggak bisa Kek, aku lagi nggak bawa dompet. Udah Kek, teman aku bisa dipercaya, nanti dia yang bantu aku di rumah sakit.',
            reaksiWaktu: '16:05',
          },
          {
            teks: 'Baik Cucu, rekeningnya apa? Kakek transfer sekarang.',
            waktu: '16:05',
            reaksi: 'Makasih Kek... ini nomor rekeningnya... transfer Rp15 juta sekarang ya Kek... nanti aku jelasin semuanya 😢',
            reaksiWaktu: '16:06',
          },
        ],
      },
      { dari: 'lawan', teks: 'Kek, cepat ya... dokter udah mau masuk... aku takut banget...', waktu: '16:06' },
      {
        dari: 'pilihan',
        label: 'Pesan terakhir. Balasannya?',
        opsi: [
          {
            teks: 'Baik Cucu, Kakek transfer sekarang.',
            waktu: '16:06',
            reaksi: 'Makasih Kek... kirim buktinya ya... nanti aku kabari kalau udah selesai operasi 😊',
            reaksiWaktu: '16:07',
          },
          {
            teks: 'Cucu, kata sandi keluarga kita apa? Kakek lupa.',
            waktu: '16:06',
            reaksi: 'Kek... aku lupa... ini aku lagi sakit... jangan begini Kek... tolong percaya aku 😠',
            reaksiWaktu: '16:07',
          },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Transfer Rp15 juta karena suaranya persis cucu',
        hasil: 'Suara bisa ditiru AI dengan sangat meyakinkan dari rekaman media sosial. Uang Anda langsung masuk kantong penipu, sementara cucu Anda baik-baik saja.',
        tips: 'Suara yang mirip bukan bukti. Tutup telepon, telepon balik nomor yang tersimpan.',
      },
      {
        benar: true,
        teks: 'Tutup telepon, telepon balik nomor tersimpan, tanya kata sandi keluarga',
        hasil: 'Kata sandi keluarga hanya diketahui orang asli—penipuan suara AI gagal. Uang Anda aman.',
        tips: 'Buat kata sandi keluarga: satu kata rahasia yang hanya diketahui keluarga.',
      },
    ],
    fakta: 'Lebih dari 100 calon korban—mayoritas pensiunan ASN di atas 60 tahun—dijebak pelaku yang mengaku petugas Taspen. Korban diarahkan menginstal file APK hingga kehilangan ratusan juta rupiah.',
  },
}

export function getSimulasiChat(id) {
  return SIMULASI_CHAT_MODUL[id] || null
}