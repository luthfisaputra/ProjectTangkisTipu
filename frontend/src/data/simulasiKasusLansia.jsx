// Simulasi Kasus Interaktif — Jalur RAMAH LANSIA (60+)
// 8 skenario (satu per modus populer Lansia), masing-masing 6 ronde pilihan.
// Bahasa lebih sederhana, kalimat lebih pendek, dan konteks disesuaikan
// dengan pengalaman lansia (pensiun, cucu, haji/umrah, dll).

export const SIMULASI_KASUS_LANSIA = [
  // ============================================================
  // KASUS 1 — Tautan "Tunjangan/Lowongan Kerja Lansia" Palsu
  // ============================================================
  {
    id: 'kasus-lansia-1',
    modusId: 'lansia-m1',
    title: 'Tautan "Tunjangan Lansia 2026"',
    kategori: 'Penipuan Tautan',
    level: 'Sedang–Tinggi',
    levelTone: 'warning',
    kontak: {
      nama: 'Nomor Tak Dikenal',
      peran: 'Mengirim tautan pendaftaran',
      nomor: '+62 812-4411-XXXX',
      online: true,
      avatarIcon: 'link_off',
      avatarBg: 'bg-warning-yellow-light',
      avatarFg: 'text-secondary',
    },
    peringatan: [
      'Tautan pendaftaran bantuan lewat bit.ly atau domain asing',
      'Minta nomor HP, KTP, atau Telegram',
      'Nama program meniru program resmi yang sudah ditutup',
      'Dibagikan akun pribadi, bukan akun kementerian',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Selamat pagi Bu. Ini info penting untuk lansia: Pendaftaran Tunjangan Lansia 2026 sudah dibuka. Khusus usia 60 tahun ke atas.', waktu: '08:02' },
      { dari: 'lawan', teks: 'Bapak/Ibu bisa daftar lewat tautan ini ya. Kuota terbatas, ditutup akhir bulan: bit.ly/tunjangan-lansia-2026', waktu: '08:02' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Wah, ini bantuan dari pemerintah ya? Saya mau daftar.', waktu: '08:03', reaksi: 'Betul Bu, ini program resmi dari pemerintah. Tinggal isi data diri dan nomor HP ya.', reaksiWaktu: '08:03' },
          { teks: 'Maaf, saya tidak pernah dengar program ini. Ini dari mana?', waktu: '08:03', reaksi: 'Ini dari Kementerian Sosial Bu, saya petugas yang membantu pendaftaran. Bapak/Ibu tinggal isi tautannya saja.', reaksiWaktu: '08:04' },
        ],
      },
      { dari: 'lawan', teks: 'Setelah buka tautan, isi nama lengkap, nomor HP aktif, dan nomor rekening ya Bu. Nanti dananya langsung cair.', waktu: '08:05' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok nomor rekening juga diminta?', waktu: '08:06', reaksi: 'Buat pencairan dana Bu, biar langsung masuk ke rekening Ibu. Aman kok, ini program resmi.', reaksiWaktu: '08:06' },
          { teks: 'Baik, saya isi sekarang.', waktu: '08:06', reaksi: 'Sip Bu. Kalau ada bagian yang tidak dimengerti, tanya saya ya. Nanti saya bantu proses pendaftarannya.', reaksiWaktu: '08:07' },
        ],
      },
      { dari: 'lawan', teks: 'Untuk verifikasi cepat, Bapak/Ibu juga perlu kirim foto KTP dan foto KK ya. Biar tidak kena penipuan.', waktu: '08:08' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kenapa mesti foto KTP? Pendaftaran bantuan biasanya cukup KTP saja.', waktu: '08:09', reaksi: 'Ini syarat baru Bu, biar dana bantuannya tidak salah orang. Kalau tidak lengkap, nanti prosesnya lama.', reaksiWaktu: '08:09' },
          { teks: 'Baik, saya kirim foto KTP dan KK.', waktu: '08:09', reaksi: 'Mantap Bu. Setelah ini, nanti saya kabari kalau dana bantuannya sudah siap dicairkan.', reaksiWaktu: '08:10' },
        ],
      },
      { dari: 'sistem', teks: '[Setelah kamu kirim foto KTP, nomor HP kamu menerima SMS kode OTP dari aplikasi dompet digital]', waktu: '08:12' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Ada SMS OTP masuk. Ini dari mana ya?', waktu: '08:13', reaksi: 'Itu kode verifikasi pendaftaran Bu, tolong sebutkan kodenya ke saya. Biar cepat diproses.', reaksiWaktu: '08:13' },
          { teks: 'Saya tidak mengerti soal OTP. Saya kirim saja ke petugas.', waktu: '08:13', reaksi: 'Betul Bu, kirim kodenya ke saya. Setelah itu, dana bantuannya langsung masuk ke rekening Ibu.', reaksiWaktu: '08:14' },
        ],
      },
      { dari: 'lawan', teks: 'Kalau bisa dalam 10 menit ya Bu. Kalau tidak, sistem akan reset dan Ibu harus isi ulang dari awal.', waktu: '08:15' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Sebentar, saya telepon anak saya dulu. Kayaknya mencurigakan.', waktu: '08:16', reaksi: 'Jangan Bu, ini cuma proses cepat. Nanti kalau anak Ibu ikut campur, malah ribet. Kirim kodenya saja.', reaksiWaktu: '08:16' },
          { teks: 'Baik, saya sebutkan kodenya sekarang.', waktu: '08:16', reaksi: 'Sip Bu. Setelah ini, dana bantuan Rp600.000 langsung masuk ke rekening Ibu.', reaksiWaktu: '08:17' },
        ],
      },
      { dari: 'lawan', teks: 'Maaf Bu, sistem error. Tolong kirim foto selfie Ibu sambil pegang KTP ya, biar verifikasi bisa dilewati.', waktu: '08:18' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Ini kok makin banyak minta. Saya berhenti saja.', waktu: '08:19', reaksi: 'Jangan Bu, nanti dana bantuannya hangus. Tinggal sekali ini saja, lalu selesai.', reaksiWaktu: '08:19' },
          { teks: 'Baik, saya kirim sekarang.', waktu: '08:19', reaksi: 'Bagus Bu. Setelah verifikasi lewat, dana bantuan langsung cair hari ini juga.', reaksiWaktu: '08:20' },
        ],
      },
      { dari: 'lawan', teks: 'Nah, tinggal bayar biaya admin Rp250.000 untuk pencairan ya Bu. Setelah itu, dana Rp600.000 langsung masuk.', waktu: '08:22' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok malah saya yang bayar? Bantuan resmi tidak begitu.', waktu: '08:23', reaksi: 'Ini biaya administrasi Bu, bukan bayar bantuan. Kalau tidak bayar, dana tidak bisa dicairkan.', reaksiWaktu: '08:23' },
          { teks: 'Baik, saya transfer biaya adminnya.', waktu: '08:23', reaksi: 'Sip Bu. Setelah transfer, kirim bukti ke saya. Dana bantuan langsung cair.', reaksiWaktu: '08:24' },
        ],
      },
      { dari: 'lawan', teks: 'Kalau bisa transfer hari ini ya Bu. Kalau lewat, kuota bantuannya diberikan ke orang lain.', waktu: '08:25' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Saya berhenti. Saya mau tanya kantor desa dulu.', waktu: '08:26', reaksi: '[Pesan gagal terkirim — kamu memblokir nomor ini]', reaksiWaktu: '08:26' },
          { teks: 'Baik, saya transfer sekarang.', waktu: '08:26', reaksi: 'Bagus Bu. Setelah ini, dana bantuan Rp600.000 langsung masuk ke rekening Ibu hari ini.', reaksiWaktu: '08:27' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Isi data lengkap, kirim foto KTP & KK, dan transfer biaya admin Rp250.000',
        hasil: 'Data KTP dan nomor HP-mu dipakai untuk membuka rekening atau pinjaman ilegal. Uang Rp250.000 langsung masuk kantong pelaku, dan "dana bantuan" tidak pernah datang.',
        tips: 'Pendaftaran bantuan resmi hanya lewat kantor desa/kelurahan, dinas sosial, atau situs kementerian. Tidak pernah lewat bit.ly atau tautan dari WhatsApp.',
      },
      {
        benar: true,
        teks: 'Hentikan komunikasi, blokir nomor, dan tanyakan ke kantor desa/kelurahan',
        hasil: 'Data dan uangmu aman. Kantor desa/kelurahan bisa memverifikasi langsung apakah benar ada program bantuan resmi.',
        tips: 'Jangan isi formulir dari kiriman media sosial atau WhatsApp. Untuk bantuan resmi, tanya langsung ke kantor desa atau dinas sosial.',
      },
    ],
    fakta: 'Juli–September 2026: unggahan "Tunjangan Lansia 2026" dan "Lowongan Kerja Lansia 2026" muncul di Facebook & WhatsApp, meminta nomor HP dan Telegram lewat tautan bit.ly. Pencek fakta Mafindo/TurnBackHoax menyebutnya pencurian data pribadi.',
  },

  // ============================================================
  // KASUS 2 — File APK / Remote Access
  // ============================================================
  {
    id: 'kasus-lansia-2',
    modusId: 'lansia-m2',
    title: 'File "Foto Paket" dari Kurir',
    kategori: 'Malware APK',
    level: 'Tinggi',
    levelTone: 'danger',
    kontak: {
      nama: 'Kurir Paket',
      peran: 'Mengaku kurir ekspedisi',
      nomor: '+62 815-7722-XXXX',
      online: true,
      avatarIcon: 'local_shipping',
      avatarBg: 'bg-warning-yellow-light',
      avatarFg: 'text-secondary',
    },
    peringatan: [
      'Kurir asli tidak pernah kirim file .apk lewat chat',
      'File dibuat mirip foto paket',
      'HP minta izin install dari sumber tidak dikenal',
      'Aplikasi minta akses SMS, kontak, dan penyimpanan',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Selamat siang Bu. Saya kurir JNE. Ada paket untuk Ibu, tapi alamatnya kurang jelas.', waktu: '13:20' },
      { dari: 'lawan', teks: 'Ini foto paketnya ya Bu, biar Ibu bisa konfirmasi alamatnya: Foto_Paket_Anda.apk', waktu: '13:20' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok bentuknya file .apk, bukan foto biasa ya?', waktu: '13:21', reaksi: 'Iya Bu, ini pakai aplikasi baru dari JNE. Tinggal dipasang biar bisa lihat fotonya.', reaksiWaktu: '13:21' },
          { teks: 'Baik, saya buka dulu ya.', waktu: '13:21', reaksi: 'Siap Bu. Kalau muncul permintaan izin, langsung diizinkan saja ya biar lancar.', reaksiWaktu: '13:22' },
        ],
      },
      { dari: 'lawan', teks: 'Setelah dipasang, izinkan akses SMS, kontak, dan penyimpanan ya Bu. Itu bagian dari verifikasi paket.', waktu: '13:22' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok minta akses SMS? Saya tidak mengerti.', waktu: '13:23', reaksi: 'Itu fitur baru Bu, biar notifikasi kurir masuk ke HP Ibu. Aman kok, ini dari JNE resmi.', reaksiWaktu: '13:23' },
          { teks: 'Baik, saya izinkan semua.', waktu: '13:23', reaksi: 'Mantap Bu. Setelah ini, saya kirim kode verifikasi ke HP Ibu ya.', reaksiWaktu: '13:24' },
        ],
      },
      { dari: 'lawan', teks: 'Sekarang kirim kode yang baru masuk ke SMS ya Bu. Untuk konfirmasi penerimaan paket.', waktu: '13:25' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok kirim kode SMS? Ini aneh.', waktu: '13:26', reaksi: 'Bu, ini sistem baru JNE. Kalau tidak dikirim, paketnya akan dikembalikan ke pengirim.', reaksiWaktu: '13:26' },
          { teks: 'Baik, kodenya 452891.', waktu: '13:26', reaksi: 'Sip Bu. Tunggu sebentar ya, kami proses.', reaksiWaktu: '13:27' },
        ],
      },
      { dari: 'sistem', teks: '[HP Ibu mulai lambat. Aplikasi berjalan di latar belakang]', waktu: '13:28' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'HP saya jadi lambat. Saya hapus saja aplikasinya.', waktu: '13:29', reaksi: 'Jangan Bu! Nanti verifikasinya gagal. Biarkan saja, nanti normal sendiri.', reaksiWaktu: '13:29' },
          { teks: 'HP saya panas, kenapa ya?', waktu: '13:29', reaksi: 'Normal Bu, aplikasinya sedang sinkron data paket. Sebentar lagi selesai.', reaksiWaktu: '13:30' },
        ],
      },
      { dari: 'sistem', teks: '[SMS dari 8888: Kode OTP transaksi Rp15.000.000 dari rekening Ibu. JANGAN bagikan ke siapa pun]', waktu: '13:30' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Ada SMS dari bank! Kok bisa ada transaksi Rp15 juta?', waktu: '13:31', reaksi: 'Bu, itu bagian dari verifikasi. Kirim kodenya ke saya, nanti saya blokir transaksinya.', reaksiWaktu: '13:31' },
          { teks: 'Saya tidak mengerti, ini kenapa?', waktu: '13:31', reaksi: 'Bentar Bu, itu bagian proses. Kirim kodenya ke saya, biar saya bantu amankan.', reaksiWaktu: '13:32' },
        ],
      },
      { dari: 'lawan', teks: 'Cepat ya Bu. Kalau tidak, dana Ibu bisa hilang. Kirim kodenya sekarang.', waktu: '13:32' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Saya mau telepon bank dulu lewat nomor di kartu ATM.', waktu: '13:33', reaksi: 'Bu, jangan tutup dulu! Kalau Ibu tutup, transaksinya jalan terus dan dana Ibu hilang.', reaksiWaktu: '13:33' },
          { teks: 'Baik, saya kirim kodenya.', waktu: '13:33', reaksi: 'Bagus Bu. Setelah ini, transaksi Rp15 juta langsung saya blokir.', reaksiWaktu: '13:34' },
        ],
      },
      { dari: 'lawan', teks: 'Maaf Bu, saya butuh bantuan Ibu untuk berbagi layar HP. Biar saya bimbing langsung memblokir transaksinya.', waktu: '13:35' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Berbagi layar? Saya tidak mengerti. Sepertinya ini penipuan.', waktu: '13:36', reaksi: 'Bu, ini prosedur resmi kami. Kalau Ibu tidak mau, dana Ibu bisa hilang total.', reaksiWaktu: '13:36' },
          { teks: 'Baik, saya coba bagikan layar.', waktu: '13:36', reaksi: 'Sip Bu. Sekarang buka aplikasi m-banking Ibu ya. Saya bantu proses pemblokirannya.', reaksiWaktu: '13:37' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, saya perlu Ibu buka aplikasi bank. Nanti saya bantu pindahkan dana ke rekening aman.', waktu: '13:38' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Tidak. Saya tidak percaya. Saya tutup telepon dan telepon anak saya.', waktu: '13:39', reaksi: '[Panggilan terputus]', reaksiWaktu: '13:39' },
          { teks: 'Baik, saya buka aplikasinya sekarang.', waktu: '13:39', reaksi: 'Bagus Bu. Transfer dana Rp50 juta ke rekening ini ya, nanti dana Ibu kembali setelah investigasi.', reaksiWaktu: '13:40' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Install APK, berikan izin SMS, dan kirim kode OTP ke pelaku',
        hasil: 'Aplikasi jahat membaca SMS bank dan meneruskan OTP ke pelaku. Rekening Ibu/Bapak bisa dikuras dalam hitungan menit.',
        tips: 'File .apk dari chat selalu berbahaya. Kurir asli tidak pernah minta instal aplikasi. Kode OTP bank tidak pernah diminta siapa pun.',
      },
      {
        benar: true,
        teks: 'Putuskan internet (mode pesawat), uninstall aplikasi, telepon bank lewat nomor di kartu ATM',
        hasil: 'Kamu menghentikan malware sebelum menguras rekening. Bank bisa langsung memblokir akses dan mengganti kartu.',
        tips: 'Mode pesawat → uninstall → hubungi bank. Ganti PIN dan kata sandi dari perangkat lain. Minta keluarga matikan "install unknown apps" di HP.',
      },
    ],
    fakta: 'Satgas PASTI (Juni 2026): social engineering dengan remote access adalah salah satu modus paling banyak dipakai. Kasus Malang 2023: korban kehilangan Rp1,4 miliar setelah membuka APK undangan.',
  },

  // ============================================================
  // KASUS 3 — Kloning Suara / Deepfake "Anak/Cucu Darurat"
  // ============================================================
  {
    id: 'kasus-lansia-3',
    modusId: 'lansia-m3',
    title: 'Suara Cucu Minta Uang Darurat',
    kategori: 'Kloning Suara AI',
    level: 'Sangat Tinggi',
    levelTone: 'critical',
    icon: 'record_voice_over',
    kontak: {
      nama: 'Nomor Tak Dikenal',
      peran: 'Suara mirip cucu',
      nomor: '+62 813-8890-XXXX',
      online: false,
      avatarIcon: 'record_voice_over',
      avatarBg: 'bg-danger-red text-on-error',
      avatarFg: '',
    },
    peringatan: [
      'Suara mirip, tapi dari nomor tidak dikenal',
      'Diminta jangan beri tahu keluarga lain',
      'Ada jeda janggal atau distorsi suara',
      'Minta transfer cepat dengan alasan darurat',
    ],
    skenario: [
      { dari: 'lawan', teks: '[Panggilan suara] Kek... ini aku... cucu Kek... tolong... 😢', waktu: '16:02' },
      { dari: 'lawan', teks: 'Aku kecelakaan Kek... sepeda aku ditabrak mobil... sekarang di rumah sakit...', waktu: '16:02' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Kakek/Nenek membalas?',
        opsi: [
          { teks: 'Ya ampun, kamu di rumah sakit mana? Kakek ke sana sekarang!', waktu: '16:03', reaksi: 'Kek... jangan ke sini dulu... biaya operasinya harus dibayar sekarang... kalau nggak, aku nggak bisa masuk ruang operasi 😭', reaksiWaktu: '16:03' },
          { teks: 'Cucu? Suaramu mirip, tapi Kakek mau tanya sesuatu dulu.', waktu: '16:03', reaksi: 'Kek, ini aku beneran... suaraku serak karena habis nangis... tolong percaya Kek...', reaksiWaktu: '16:04' },
        ],
      },
      { dari: 'lawan', teks: 'Dokter bilang butuh Rp15 juta Kek... sekarang... kalau nggak, aku nggak bisa dioperasi...', waktu: '16:04' },
      { dari: 'lawan', teks: 'Kakek transfer ke rekening teman aku ya... aku nggak sempat kasih rekening aku sendiri...', waktu: '16:04' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Kakek/Nenek membalas?',
        opsi: [
          { teks: 'Kok ke rekening teman? Kakek mau transfer ke rekening kamu aja.', waktu: '16:05', reaksi: 'Nggak bisa Kek, aku lagi nggak bawa dompet. Udah Kek, teman aku bisa dipercaya, nanti dia yang bantu aku di rumah sakit.', reaksiWaktu: '16:05' },
          { teks: 'Baik Cucu, rekeningnya apa? Kakek transfer sekarang.', waktu: '16:05', reaksi: 'Makasih Kek... ini nomor rekeningnya... transfer Rp15 juta sekarang ya Kek...', reaksiWaktu: '16:06' },
        ],
      },
      { dari: 'lawan', teks: 'Kek, cepat ya... dokter udah mau masuk... aku takut banget... jangan bilang Mama ya Kek, nanti Mama marah...', waktu: '16:06' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Kakek/Nenek membalas?',
        opsi: [
          { teks: 'Kenapa nggak boleh bilang Mama? Ini kan penting.', waktu: '16:07', reaksi: 'Aku malu Kek... nanti Mama marahin aku... tolong Kek, cepat transfer ya...', reaksiWaktu: '16:07' },
          { teks: 'Baik Cucu, Kakek transfer sekarang ya.', waktu: '16:07', reaksi: 'Makasih Kek... kalau udah transfer, kirim buktinya ya... aku tunggu di rumah sakit...', reaksiWaktu: '16:08' },
        ],
      },
      { dari: 'lawan', teks: 'Kek, nomor aku yang ini... HP aku rusak soalnya, jadi pinjam nomor teman... jangan disimpan ya Kek...', waktu: '16:09' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Kakek/Nenek membalas?',
        opsi: [
          { teks: 'Kok pindah nomor? Kakek mau telepon nomor kamu yang lama aja.', waktu: '16:10', reaksi: 'Jangan Kek! HP aku rusak, nggak bisa dihubungi. Ini nomor teman aku, yang penting sekarang transfer dulu ya Kek.', reaksiWaktu: '16:10' },
          { teks: 'Baik Cucu, Kakek catat nomornya.', waktu: '16:10', reaksi: 'Iya Kek, catat ya. Terus transfer Rp15 juta sekarang... aku tunggu...', reaksiWaktu: '16:11' },
        ],
      },
      { dari: 'lawan', teks: 'Kek, kalau bisa dalam 10 menit ya... kata dokter operasinya harus cepat, kalau nggak nyawa aku taruhannya 😢', waktu: '16:12' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Kakek/Nenek membalas?',
        opsi: [
          { teks: 'Kakek mau cek dulu ke rumah sakit. Mana tahu ini nggak benar.', waktu: '16:13', reaksi: 'Jangan Kek! Kalau Kakek telepon rumah sakit, malah makin lama. Aku nggak kuat nahan sakit...', reaksiWaktu: '16:13' },
          { teks: 'Baik Cucu, Kakek transfer sekarang.', waktu: '16:13', reaksi: 'Makasih Kek... setelah transfer, aku langsung dioperasi...', reaksiWaktu: '16:14' },
        ],
      },
      { dari: 'lawan', teks: 'Kek, kata dokter biayanya kurang Rp5 juta lagi... tolong tambah ya Kek...', waktu: '16:15' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Kakek/Nenek membalas?',
        opsi: [
          { teks: 'Tadi bilang Rp15 juta cukup. Kok sekarang minta tambahan?', waktu: '16:16', reaksi: 'Iya Kek, dokter bilang ada biaya tambahan untuk obat... tolong ya Kek...', reaksiWaktu: '16:16' },
          { teks: 'Baik Cucu, Kakek tambah Rp5 juta lagi.', waktu: '16:16', reaksi: 'Makasih Kek... Kakek memang paling baik... aku bakal ingat budi Kakek...', reaksiWaktu: '16:17' },
        ],
      },
      { dari: 'lawan', teks: 'Kek, setelah ini ada biaya rumah sakit lagi... kalau bisa transfer terus ya Kek...', waktu: '16:18' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Kakek/Nenek membalas?',
        opsi: [
          { teks: 'Ini kok makin banyak. Kakek berhenti, mau telepon cucu Kakek dulu.', waktu: '16:19', reaksi: '[Panggilan terputus — penelepon menutup]', reaksiWaktu: '16:19' },
          { teks: 'Baik Cucu, Kakek transfer lagi.', waktu: '16:19', reaksi: 'Makasih Kek... nanti aku kabari kalau operasinya selesai...', reaksiWaktu: '16:20' },
        ],
      },
      { dari: 'lawan', teks: 'Kek, kalau bisa jangan bilang siapa-siapa ya... ini rahasia kita...', waktu: '16:22' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Kakek/Nenek membalas?',
        opsi: [
          { teks: 'Tidak. Kakek mau telepon cucu Kakek lewat nomor lamanya.', waktu: '16:23', reaksi: '[Panggilan terputus]', reaksiWaktu: '16:23' },
          { teks: 'Baik Cucu, ini rahasia kita.', waktu: '16:23', reaksi: 'Iya Kek... tapi tolong transfer lagi ya... biar aku bisa keluar dari rumah sakit...', reaksiWaktu: '16:24' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Transfer uang dan turuti permintaan karena suara mirip cucu',
        hasil: 'Suara bisa ditiru AI dari rekaman singkat di media sosial. Cucu Ibu/Bapak sebenarnya baik-baik saja. Uang langsung hilang ke penipu.',
        tips: 'Suara mirip bukan bukti. Tutup telepon, telepon balik ke nomor lama cucu/anak, dan tanyakan kata sandi keluarga.',
      },
      {
        benar: true,
        teks: 'Tutup telepon, telepon balik nomor lama cucu, tanyakan kata sandi keluarga',
        hasil: 'Kata sandi keluarga hanya diketahui orang asli. Penipuan terungkap, uang Ibu/Bapak aman.',
        tips: 'Buat kata sandi keluarga: satu kata rahasia yang hanya diketahui keluarga inti. Jangan pernah transfer ke rekening yang bukan atas nama cucu/anak.',
      },
    ],
    fakta: 'Bisnis.com (13 April 2026): penipu hanya butuh 3 detik rekaman suara untuk kloning suara via AI. Polda Metro Jaya (Agustus 2026) memperingatkan skenario "kecelakaan/masalah hukum mendadak".',
  },

  // ============================================================
  // KASUS 4 — Mengaku Polisi/Bank + Recovery Scam
  // ============================================================
  {
    id: 'kasus-lansia-4',
    modusId: 'lansia-m4',
    title: 'Telepon "Petugas Bank" Minta Rekening Aman',
    kategori: 'Impersonation',
    level: 'Tinggi',
    levelTone: 'danger',
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
      'Penelepon membuat takut atau panik',
      'Diminta jangan beri tahu keluarga',
      'Minta OTP, PIN, atau pindah dana',
      'Diminta tetap di telepon lama',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Selamat siang Bu. Saya Andi dari divisi Fraud Bank Nusantara. Mohon maaf mengganggu.', waktu: '15:22' },
      { dari: 'lawan', teks: 'Kami mendeteksi transaksi mencurigakan di rekening Ibu sebesar Rp8.500.000 dari luar negeri.', waktu: '15:22' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Hah? Saya tidak pernah transaksi apa-apa hari ini!', waktu: '15:23', reaksi: 'Betul Bu, karena itu kami hubungi. Ini upaya pembobolan. Kita harus cepat amankan dana Ibu.', reaksiWaktu: '15:23' },
          { teks: 'Saya mau telepon bank dulu lewat nomor resmi.', waktu: '15:23', reaksi: 'Bu, saya di kantor pusat. Kalau Ibu tutup telepon, transaksinya jalan terus lho Bu.', reaksiWaktu: '15:24' },
        ],
      },
      { dari: 'lawan', teks: 'Kami akan pindahkan dana Ibu ke "rekening aman" yang diawasi bank. Tidak bisa diakses pelaku.', waktu: '15:24' },
      { dari: 'lawan', teks: 'Untuk verifikasi, tolong sebutkan kode OTP yang baru masuk ke SMS Ibu ya.', waktu: '15:25' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'OTP? Bukannya bank tidak pernah minta OTP?', waktu: '15:25', reaksi: 'Normalnya begitu Bu, tapi kasus fraud seperti ini perlu OTP khusus. Ini prosedur darurat.', reaksiWaktu: '15:25' },
          { teks: 'Baik, sebentar saya lihat SMS-nya.', waktu: '15:25', reaksi: 'Siap Bu. Kodenya 6 digit ya. Kalau sudah, sebutkan ke saya biar kami input.', reaksiWaktu: '15:26' },
        ],
      },
      { dari: 'lawan', teks: 'Ini mendesak Bu. Pelaku sedang aktif. Kalau tidak dalam 2 menit, dana Ibu bisa lenyap.', waktu: '15:26' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Saya tutup telepon, mau telepon bank lewat nomor di kartu ATM.', waktu: '15:26', reaksi: 'Bu jangan tutup! Kalau Ibu tutup, proses pemblokiran gagal dan dana Ibu hilang. Saya sedang membantu Ibu lho.', reaksiWaktu: '15:27' },
          { teks: 'Baik, kodenya 452891.', waktu: '15:26', reaksi: 'Baik Bu. Kami input sekarang. Tunggu sebentar, nanti Ibu terima SMS konfirmasi.', reaksiWaktu: '15:27' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, apakah Ibu punya aplikasi m-banking di HP? Kami perlu bantu proses pemindahan dana ke rekening aman.', waktu: '15:28' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok harus pindah dana? Bukannya bank cuma blokir?', waktu: '15:28', reaksi: 'Ini standar Bu, biar dana Ibu tidak diambil pelaku. Kalau tidak dipindah, dana bisa dicuri.', reaksiWaktu: '15:29' },
          { teks: 'Baik, saya pindahkan dananya.', waktu: '15:28', reaksi: 'Bagus Bu. Transfer Rp50 juta ke rekening ini. Nanti dana Ibu kembali setelah investigasi.', reaksiWaktu: '15:29' },
        ],
      },
      { dari: 'lawan', teks: 'Tapi tolong jangan bilang siapa-siapa ya Bu. Termasuk anak atau keluarga. Ini sedang dalam penyelidikan rahasia.', waktu: '15:30' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok nggak boleh bilang keluarga? Ini aneh.', waktu: '15:30', reaksi: 'Kalau keluarga tahu, kasusnya bisa bocor ke pelaku Bu. Ini standar penyelidikan rahasia.', reaksiWaktu: '15:31' },
          { teks: 'Baik, saya tidak bilang siapa-siapa.', waktu: '15:30', reaksi: 'Sip Bu. Sekarang buka aplikasi m-banking Ibu ya. Saya bantu proses pemindahannya.', reaksiWaktu: '15:31' },
        ],
      },
      { dari: 'lawan', teks: 'Kalau bisa hari ini ya Bu. Sisa saldo Ibu Rp50 juta. Harus segera dipindahkan biar aman.', waktu: '15:32' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Tidak. Saya tidak mau pindah dana. Saya mau telepon bank langsung.', waktu: '15:33', reaksi: 'Bu, jangan tutup dulu! Kalau Ibu tutup, dana Rp50 juta bisa hilang total!', reaksiWaktu: '15:33' },
          { teks: 'Baik, saya pindahkan sekarang.', waktu: '15:33', reaksi: 'Bagus Bu. Transfer Rp50 juta ke rekening ini. Nanti dana Ibu kembali setelah 3 hari.', reaksiWaktu: '15:34' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, saya juga bisa bantu proses pemulihan dana. Tapi ada biaya administrasi Rp500.000 dulu ya Bu.', waktu: '15:36' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok mesti bayar lagi? Saya nggak mau.', waktu: '15:37', reaksi: 'Ini biaya proses Bu, bukan bayar ke kami. Kalau tidak, dana Ibu tidak bisa kembali.', reaksiWaktu: '15:37' },
          { teks: 'Baik, saya transfer Rp500.000.', waktu: '15:37', reaksi: 'Sip Bu. Setelah transfer, dana Ibu diproses untuk dipulihkan.', reaksiWaktu: '15:38' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, kalau bisa transfer sekarang ya. Nanti kena denda kalau lewat.', waktu: '15:39' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Tidak. Saya berhenti. Saya mau telepon anak saya.', waktu: '15:40', reaksi: '[Panggilan terputus]', reaksiWaktu: '15:40' },
          { teks: 'Baik, saya transfer sekarang.', waktu: '15:40', reaksi: 'Bagus Bu. Setelah ini, dana Ibu diproses. Tunggu kabar dari saya ya.', reaksiWaktu: '15:41' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Berikan OTP, pindahkan dana ke "rekening aman", dan transfer biaya pemulihan',
        hasil: 'Seluruh dana rekening Ibu/Bapak dipindahkan ke penipu dalam hitungan menit. "Biaya pemulihan" adalah recovery scam — penipuan kedua.',
        tips: 'Bank tidak pernah minta OTP, PIN, atau memindahkan dana ke "rekening aman". Tidak ada "rekening aman" di bank atau polisi.',
      },
      {
        benar: true,
        teks: 'Tutup telepon, telepon bank lewat nomor resmi di kartu ATM, cerita ke keluarga',
        hasil: 'Rekening tetap aman. Kalau memang ada transaksi aneh, bank akan verifikasi lewat prosedur resmi.',
        tips: 'Selalu tutup telepon dulu, lalu hubungi bank sendiri lewat nomor yang Ibu/Bapak cari sendiri. Ceritakan ke keluarga.',
      },
    ],
    fakta: 'Satgas PASTI (Juni 2026) mengingatkan recovery scam — penipuan lanjutan yang menyasar korban sebelumnya. Polisi/bank/pengadilan tidak pernah minta transfer atau uang tunai lewat telepon.',
  },

  // ============================================================
  // KASUS 5 — Investasi Bodong Pensiunan
  // ============================================================
  {
    id: 'kasus-lansia-5',
    modusId: 'lansia-m5',
    title: 'Investasi "Untung Pasti" dari Kenalan',
    kategori: 'Investasi Bodong',
    level: 'Sangat Tinggi',
    levelTone: 'critical',
    kontak: {
      nama: 'Pak Anto (Kenalan)',
      peran: 'Mantan pegawai bank',
      nomor: '+62 812-3390-XXXX',
      online: true,
      avatarIcon: 'savings',
      avatarBg: 'bg-danger-red text-on-error',
      avatarFg: '',
    },
    peringatan: [
      'Untung pasti per bulan, tanpa risiko',
      'Ditawarkan orang yang mengaku dari bank',
      'Saldo naik di aplikasi yang tidak jelas',
      '"Akun terkunci" atau "biaya pencairan"',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Bu, ini saya Pak Anto, mantan pegawai bank tempat Ibu dulu. Ada program investasi khusus pensiunan nih.', waktu: '10:02' },
      { dari: 'lawan', teks: 'Untung pasti 10% per bulan, aman, dan modalnya bisa ditarik kapan saja. Banyak pensiunan yang sudah ikut.', waktu: '10:02' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Wah, untungnya besar ya. Boleh dijelaskan?', waktu: '10:03', reaksi: 'Siap Bu. Nanti saya kirim link dan masukin Ibu ke grup WhatsApp khusus investor pensiunan. Di sana banyak testimoni.', reaksiWaktu: '10:03' },
          { teks: 'Untung pasti itu biasanya investasi bodong. Ini resmi?', waktu: '10:03', reaksi: 'Resmi dong Bu, saya dulu pegawai bank. Produknya kerja sama dengan bank asing, cuma tidak dipasarkan umum.', reaksiWaktu: '10:04' },
        ],
      },
      { dari: 'lawan', teks: 'Ini kan program terbatas Bu. Saya bantu daftarkan Ibu, tapi slot hanya 10 orang. Sisanya sudah penuh.', waktu: '10:05' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Boleh saya cek dulu ke bank tempat Bapak kerja dulu?', waktu: '10:06', reaksi: 'Ah, jangan Bu. Produk ini tidak ada di bank, cuma lewat saya. Kalau Ibu tanya bank, malah nggak bisa ikut.', reaksiWaktu: '10:06' },
          { teks: 'Baik, saya ikut. Bagaimana caranya?', waktu: '10:06', reaksi: 'Gampang Bu. Setor minimal Rp10 juta ke rekening saya. Nanti saya bantu daftarkan dan buka akun investasinya.', reaksiWaktu: '10:07' },
        ],
      },
      { dari: 'lawan', teks: 'Nih Bu, saya kirim screenshot aplikasi investasinya. Lihat saldo saya, dari Rp50 juta jadi Rp72 juta dalam 3 bulan.', waktu: '10:08' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Wah mantap. Saya mau ikut, setor Rp20 juta ya Pak?', waktu: '10:09', reaksi: 'Sip Bu. Transfer ke rekening pribadi saya dulu ya, nanti saya daftarkan. Nanti Ibu juga dapat akses aplikasinya.', reaksiWaktu: '10:09' },
          { teks: 'Aplikasinya resmi? Saya cek dulu di OJK.', waktu: '10:09', reaksi: 'Sudah resmi Bu, izinnya dari luar negeri. Nggak perlu cek OJK, produk ini eksklusif.', reaksiWaktu: '10:10' },
        ],
      },
      { dari: 'sistem', teks: '[Kamu setor Rp20.000.000 ke rekening pribadi Pak Anto]', waktu: '10:14' },
      { dari: 'lawan', teks: 'Bu, akun Ibu sudah aktif nih. Nih lihat saldonya di aplikasi. Sudah Rp20 juta, nanti tumbuh terus.', waktu: '10:16' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Wah bagus. Bulan depan saya tambah lagi ya Pak.', waktu: '10:17', reaksi: 'Boleh banget Bu. Kalau tambah bulan ini, dapat bonus 5% lho. Khusus investor awal.', reaksiWaktu: '10:17' },
          { teks: 'Kok cuma angka? Saya belum lihat uangnya.', waktu: '10:17', reaksi: 'Itu saldo investasi Bu, nanti bisa ditarik kapan saja. Kalau Ibu mau lihat uangnya, tinggal pencairan.', reaksiWaktu: '10:18' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, kalau Ibu mau coba pencairan, silakan. Tapi biasanya investor tunggu 3 bulan biar untung maksimal.', waktu: '10:19' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Saya mau coba pencairan sebagian dulu ya Pak.', waktu: '10:20', reaksi: 'Wah Bu, pencairan sebagian kena biaya Rp2 juta. Lebih baik tunggu 3 bulan, untungnya lebih besar.', reaksiWaktu: '10:20' },
          { teks: 'Baik, saya tunggu 3 bulan.', waktu: '10:20', reaksi: 'Bagus Bu. Sekarang tolong setor tambahan Rp30 juta lagi ya, biar bonus 5% langsung masuk.', reaksiWaktu: '10:21' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, kalau Ibu setor tambahan Rp30 juta bulan ini, total jadi Rp50 juta. Untung bulanan jadi Rp5 juta.', waktu: '10:22' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Saya setor Rp30 juta lagi ya Pak. Semoga lancar.', waktu: '10:23', reaksi: 'Sip Bu. Setelah transfer, langsung saya proses ya. Nanti Ibu dapat bonus Rp2,5 juta.', reaksiWaktu: '10:23' },
          { teks: 'Kok malah terus-terusan suruh setor? Saya mau cek ke OJK dulu.', waktu: '10:23', reaksi: 'Jangan Bu, itu nanti lama. Ini kesempatan emas, tinggal tambah Rp30 juta aja.', reaksiWaktu: '10:24' },
        ],
      },
      { dari: 'sistem', teks: '[2 bulan kemudian, saldo di aplikasi menunjukkan Rp68 juta. Saat Ibu mencoba pencairan:]', waktu: '10:30' },
      { dari: 'lawan', teks: 'Bu, kok Ibu coba pencairan? Ada masalah. Akun Ibu terkunci karena dicurigai transaksi mencurigakan.', waktu: '10:30' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok terkunci? Tolong buka dong Pak, itu uang saya.', waktu: '10:31', reaksi: 'Bisa Bu, tapi Ibu harus bayar biaya buka akun Rp5 juta. Setelah itu, dana langsung cair.', reaksiWaktu: '10:31' },
          { teks: 'Ini pasti penipuan. Saya mau lapor polisi.', waktu: '10:31', reaksi: 'Jangan Bu! Kalau lapor, dana Ibu nggak bisa kembali. Bayar biaya buka akun aja Rp5 juta.', reaksiWaktu: '10:32' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, kalau tidak bayar biaya buka akun Rp5 juta hari ini, dana Ibu hangus. Sistemnya otomatis, tidak bisa diubah.', waktu: '10:34' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Tidak. Saya tidak mau bayar lagi. Saya mau lapor OJK dan polisi.', waktu: '10:35', reaksi: '[Pesan gagal terkirim — kamu memblokir nomor ini]', reaksiWaktu: '10:35' },
          { teks: 'Baik, saya bayar biaya buka akunnya.', waktu: '10:35', reaksi: 'Sip Bu. Setelah transfer, dana Ibu langsung cair.', reaksiWaktu: '10:36' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Terus setor tambahan untuk membuka akun dan mencairkan dana',
        hasil: 'Setoran bertambah dan dana tidak pernah cair. Skema ini dirancang agar korban terus menyetor sampai kehabisan uang.',
        tips: 'Investasi resmi tidak menjanjikan untung pasti. Kalau diminta transfer ke rekening pribadi atau bayar "biaya buka akun", itu penipuan.',
      },
      {
        benar: true,
        teks: 'Berhenti setor, cek izin di sipasti.ojk.go.id, lapor OJK 157 dan polisi',
        hasil: 'Kamu menghentikan kerugian lebih lanjut. Cek izin memastikan entitas tidak terdaftar, dan laporan bisa masuk jalur resmi.',
        tips: 'Cek izin entitas di sipasti.ojk.go.id sebelum setor. Diskusikan dulu dengan anak atau keluarga.',
      },
    ],
    fakta: 'Banyumas Juni 2026: 69 pensiunan ASN diduga tertipu investasi ~Rp15 miliar. Gowa Oktober 2026: pasangan pensiunan BUMN rugi ~Rp900 juta, sampai jual emas & gadai rumah.',
  },

  // ============================================================
  // KASUS 6 — Pre-Order Emas/Perak Murah
  // ============================================================
  {
    id: 'kasus-lansia-6',
    modusId: 'lansia-m6',
    title: 'Pre-Order Emas Murah "Dipercaya Artis"',
    kategori: 'Pre-Order Palsu',
    level: 'Tinggi',
    levelTone: 'danger',
    kontak: {
      nama: 'Admin PO Emas',
      peran: 'Mengaku toko emas online',
      nomor: '@po.emas.murah',
      online: true,
      avatarIcon: 'workspace_premium',
      avatarBg: 'bg-danger-red-light',
      avatarFg: 'text-danger-red',
    },
    peringatan: [
      'Harga jauh di bawah pasar',
      'Promosi mengandalkan artis/influencer',
      'Sistem pre-order berbulan-bulan',
      'Transfer ke rekening pribadi',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Selamat pagi Bu. Kami buka pre-order emas murah nih. Harga jauh di bawah pasaran, dijamin asli.', waktu: '09:02' },
      { dari: 'lawan', teks: 'Sudah dipercaya banyak artis dan influencer. Nih foto kami bareng artis terkenal 👇', waktu: '09:02' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Wah, artisnya terkenal. Berarti aman ya?', waktu: '09:03', reaksi: 'Betul Bu, sudah ribuan pelanggan puas. Harga emas hari ini Rp1.000.000/gram, kami jual Rp800.000/gram saja.', reaksiWaktu: '09:03' },
          { teks: 'Kok bisa lebih murah dari toko resmi?', waktu: '09:03', reaksi: 'Kami ambil langsung dari tambang Bu, jadi bisa potong banyak. Ini kesempatan langka, jangan sampai kelewatan.', reaksiWaktu: '09:04' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, kami ada paket khusus lansia. Beli 5 gram gratis 0,5 gram. Beli 10 gram gratis 1 gram.', waktu: '09:05' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Wah, boleh coba beli 5 gram dulu ya.', waktu: '09:06', reaksi: 'Sip Bu! Transfer ke rekening saya ya Rp4.000.000. Nanti emasnya kami kirim dalam 2 minggu.', reaksiWaktu: '09:06' },
          { teks: 'Saya cek dulu toko emas resmi. Kok nggak ada nama Bapak/Ibu?', waktu: '09:06', reaksi: 'Kami toko baru Bu, cuma online. Tapi sudah banyak yang percaya kok. Kalau ragu, cek aja testimoni kami.', reaksiWaktu: '09:07' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, ini nomor rekening saya ya: 8821xxxx a.n. Andi Pratama. Transfer Rp4.000.000 sekarang, nanti emasnya dikirim ke alamat Ibu.', waktu: '09:08' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok rekening pribadi? Bukannya atas nama toko?', waktu: '09:09', reaksi: 'Iya Bu, ini rekening pemilik toko. Nanti setelah transfer, kami kirim invoice resmi via WhatsApp.', reaksiWaktu: '09:09' },
          { teks: 'Baik, saya transfer sekarang.', waktu: '09:09', reaksi: 'Sip Bu. Setelah transfer, kirim buktinya ke saya ya. Emas dikirim dalam 2 minggu.', reaksiWaktu: '09:10' },
        ],
      },
      { dari: 'sistem', teks: '[2 minggu kemudian — emas belum dikirim. Kamu menghubungi admin]', waktu: '09:15' },
      { dari: 'lawan', teks: 'Bu, maaf ada kendala pengiriman. Karena permintaan tinggi, pengiriman tertunda 3 minggu lagi ya.', waktu: '09:15' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok tertunda? Saya sudah bayar Rp4 juta.', waktu: '09:16', reaksi: 'Ini karena volume tinggi Bu. Kalau Ibu mau cepat, tambah Rp1 juta buat "biaya prioritas", nanti emasnya dikirim minggu ini.', reaksiWaktu: '09:16' },
          { teks: 'Baik, saya tunggu 3 minggu lagi.', waktu: '09:16', reaksi: 'Makasih Bu, sabar ya. Kalau Ibu tambah Rp1 juta, bisa prioritas lho.', reaksiWaktu: '09:17' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, ada paket baru nih. Kalau Ibu beli 10 gram sekarang, harga lebih murah. Beli 10 gram Rp7.500.000 aja.', waktu: '09:18' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Boleh, saya beli 10 gram lagi ya.', waktu: '09:19', reaksi: 'Sip Bu! Transfer Rp7.500.000 ke rekening yang sama ya. Nanti emasnya digabung dengan pesanan sebelumnya.', reaksiWaktu: '09:19' },
          { teks: 'Tunggu, emas saya yang pertama belum datang. Saya mau cek dulu.', waktu: '09:19', reaksi: 'Santai Bu, ini sistemnya begitu. Nanti semuanya dikirim sekaligus, biar hemat ongkos kirim.', reaksiWaktu: '09:20' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, ini diskon terakhir. Beli 20 gram dapat bonus 3 gram. Total cuma Rp15.000.000. Bayar sekarang, hemat Rp3 juta.', waktu: '09:22' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Wah, boleh. Saya transfer Rp15 juta ya.', waktu: '09:23', reaksi: 'Sip Bu! Transfer sekarang, nanti emasnya dikirim paling lambat 1 bulan.', reaksiWaktu: '09:23' },
          { teks: 'Saya tanya anak saya dulu ya. Kok belum ada barang yang datang.', waktu: '09:23', reaksi: 'Jangan tanya anak dulu Bu. Nanti anaknya malah melarang. Ini kesempatan langka lho.', reaksiWaktu: '09:24' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, pengiriman kena "pajak emas" Rp1.500.000. Ini standar untuk pengiriman emas batangan.', waktu: '09:26' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok ada pajak lagi? Saya nggak mau bayar.', waktu: '09:27', reaksi: 'Kalau tidak bayar, emas Ibu tertahan di bea cukai Bu. Ini peraturan pemerintah.', reaksiWaktu: '09:27' },
          { teks: 'Baik, saya transfer Rp1.500.000.', waktu: '09:27', reaksi: 'Sip Bu. Setelah transfer, emas langsung dikirim hari ini.', reaksiWaktu: '09:28' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, kalau tidak transfer hari ini, semua pesanan Ibu hangus ya. Uang yang sudah masuk tidak bisa dikembalikan.', waktu: '09:29' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Ini penipuan. Saya berhenti dan lapor polisi.', waktu: '09:30', reaksi: '[Pesan gagal terkirim — kamu memblokir nomor ini]', reaksiWaktu: '09:30' },
          { teks: 'Baik, saya transfer pajaknya.', waktu: '09:30', reaksi: 'Bagus Bu. Nanti saya kabari kalau emasnya dikirim.', reaksiWaktu: '09:31' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Terus transfer untuk "prioritas", "diskon", dan "pajak emas"',
        hasil: 'Uang terus keluar, emas tidak pernah datang. Pengumuman artis atau influencer tidak menjamin legalitas toko.',
        tips: 'Beli emas/perak di toko atau penyedia berizin resmi. Wajah selebriti bukan jaminan legalitas.',
      },
      {
        benar: true,
        teks: 'Berhenti transfer, simpan bukti chat & transfer, lapor Bareskrim/Polres setempat',
        hasil: 'Kamu menghentikan kerugian lebih lanjut. Bukti lengkap bisa dipakai untuk upaya pemblokiran rekening pelaku.',
        tips: 'Diskusikan dulu dengan keluarga sebelum PO besar-besaran. Harga jauh di bawah pasar adalah tanda bahaya.',
      },
    ],
    fakta: 'Bareskrim (9 Oktober 2026): dugaan penipuan pre-order emas/perak dengan 85 korban dan kerugian gabungan ~Rp25 miliar. Figur publik dalam promosi jadi pemicu kepercayaan.',
  },

  // ============================================================
  // KASUS 7 — Penipuan Travel Haji & Umrah
  // ============================================================
  {
    id: 'kasus-lansia-7',
    modusId: 'lansia-m7',
    title: 'Paket Umrah Murah "Berangkat Cepat"',
    kategori: 'Travel Haji/Umrah',
    level: 'Tinggi',
    levelTone: 'danger',
    kontak: {
      nama: 'Admin Travel',
      peran: 'Mengaku biro travel',
      nomor: '+62 813-2277-XXXX',
      online: true,
      avatarIcon: 'mosque',
      avatarBg: 'bg-danger-red-light',
      avatarFg: 'text-danger-red',
    },
    peringatan: [
      'Harga jauh di bawah pasaran',
      'Janji berangkat cepat tanpa antre',
      'Minta transfer ke rekening pribadi',
      'Tidak bisa tunjukkan izin PPIU/PIHK',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Assalamualaikum Bu. Kami travel umrah resmi, buka paket khusus lansia. Berangkat cepat tanpa antre panjang.', waktu: '11:02' },
      { dari: 'lawan', teks: 'Harga cuma Rp25 juta, jauh di bawah harga travel lain yang Rp35 juta. Kuota tinggal 5 keluarga.', waktu: '11:02' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Wah murah ya. Saya minat. Gimana caranya?', waktu: '11:03', reaksi: 'Alhamdulillah Bu. Nanti saya kirim brosur dan formulirnya. Tinggal transfer DP Rp5 juta untuk kunci kursi.', reaksiWaktu: '11:03' },
          { teks: 'Kok bisa lebih murah dari travel lain? Ini resmi?', waktu: '11:03', reaksi: 'Kami ambil kuota khusus Bu, kerja sama dengan maskapai. Izinnya lengkap kok, nanti saya tunjukkan.', reaksiWaktu: '11:04' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, ini brosurnya. Pemberangkatan bulan depan. Tinggal transfer DP Rp5 juta hari ini ya biar dapat kursi.', waktu: '11:05' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Baik, saya transfer DP Rp5 juta sekarang.', waktu: '11:06', reaksi: 'Alhamdulillah. Transfer ke rekening pribadi saya ya Bu. Nanti saya bantu proses pendaftarannya.', reaksiWaktu: '11:06' },
          { teks: 'Nomor izin PPIU/PIHK-nya boleh saya lihat dulu?', waktu: '11:06', reaksi: 'Izinnya sedang diperbarui Bu. Tapi banyak jamaah kami sudah berangkat tanpa masalah. Aman kok.', reaksiWaktu: '11:07' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, transfer ke rekening pribadi saya ya: 8821xxxx a.n. Andi Pratama. Setelah transfer, kirim buktinya.', waktu: '11:08' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok ke rekening pribadi? Travel resmi biasanya rekening perusahaan.', waktu: '11:09', reaksi: 'Iya Bu, ini rekening direktur utama. Nanti setelah transfer, kami kirim invoice resmi.', reaksiWaktu: '11:09' },
          { teks: 'Baik, saya transfer sekarang.', waktu: '11:09', reaksi: 'Alhamdulillah Bu. Setelah transfer, kirim buktinya ya. Kursi Ibu langsung kami kunci.', reaksiWaktu: '11:10' },
        ],
      },
      { dari: 'sistem', teks: '[2 minggu kemudian — jadwal pemberangkatan ditunda]', waktu: '11:15' },
      { dari: 'lawan', teks: 'Maaf Bu, ada perubahan jadwal. Pemberangkatan ditunda 3 bulan karena ada perbaikan maskapai.', waktu: '11:15' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok ditunda? Saya sudah bayar DP Rp5 juta.', waktu: '11:16', reaksi: 'Ini karena force majeure Bu. Kalau Ibu mau berangkat tepat waktu, tambah Rp5 juta untuk paket VIP.', reaksiWaktu: '11:16' },
          { teks: 'Baik, saya tunggu 3 bulan lagi.', waktu: '11:16', reaksi: 'Terima kasih Bu. Kalau Ibu tambah Rp5 juta, bisa naik paket VIP yang berangkat sesuai jadwal.', reaksiWaktu: '11:17' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, sebenarnya sudah ada keberangkatan bulan depan. Tinggal tambah Rp10 juta biar dapat kursi VIP.', waktu: '11:18' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok harus tambah Rp10 juta? Ini pemerasan ya?', waktu: '11:19', reaksi: 'Bukan Bu, ini biaya upgrade. Kalau nggak upgrade, ikut jadwal yang ditunda. Terserah Ibu.', reaksiWaktu: '11:19' },
          { teks: 'Baik, saya tambah Rp10 juta.', waktu: '11:19', reaksi: 'Alhamdulillah. Transfer ke rekening yang sama ya Bu. Nanti kursi VIP Ibu kami booking.', reaksiWaktu: '11:20' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, ternyata kursi VIP sudah penuh. Tapi kami ada paket lainnya, tambah Rp8 juta lagi ya.', waktu: '11:22' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Ini kok terus minta tambahan. Saya berhenti.', waktu: '11:23', reaksi: 'Bu, kalau berhenti, DP Ibu hangus lho. Nanti Ibu nggak bisa berangkat sama sekali.', reaksiWaktu: '11:23' },
          { teks: 'Baik, saya transfer Rp8 juta lagi.', waktu: '11:23', reaksi: 'Alhamdulillah. Setelah transfer, kursi Ibu aman. Bulan depan berangkat.', reaksiWaktu: '11:24' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, kabar baik. Pemberangkatan bulan depan masih ada. Tapi tinggal 1 kursi untuk grup ini.', waktu: '11:26' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Saya tanya anak saya dulu ya. Ini sudah kebanyakan permintaan.', waktu: '11:27', reaksi: 'Bu, jangan tanya anak dulu. Nanti Ibu ketinggalan jadwal. Tambah Rp5 juta lagi, aman.', reaksiWaktu: '11:27' },
          { teks: 'Baik, saya transfer tambahan Rp5 juta.', waktu: '11:27', reaksi: 'Alhamdulillah. Setelah ini, Insya Allah Ibu berangkat bulan depan.', reaksiWaktu: '11:28' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, tinggal bayar biaya visa Rp3 juta ya. Ini wajib untuk semua jamaah.', waktu: '11:30' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Tidak. Saya berhenti. Saya mau cek ke Kemenhaj dulu.', waktu: '11:31', reaksi: 'Jangan Bu! Kalau Ibu lapor, semua prosesnya jadi ribet. Bayar Rp3 juta aja, langsung beres.', reaksiWaktu: '11:31' },
          { teks: 'Baik, saya transfer biaya visanya.', waktu: '11:31', reaksi: 'Alhamdulillah. Setelah transfer, semua dokumen Ibu lengkap dan bisa berangkat.', reaksiWaktu: '11:32' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, kabar terakhir: maskapainya bangkrut. Uang Ibu tidak bisa dikembalikan. Maaf ya.', waktu: '11:34' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Ini penipuan! Saya lapor Kemenhaj dan polisi sekarang.', waktu: '11:35', reaksi: '[Pesan gagal terkirim — akun diblokir]', reaksiWaktu: '11:35' },
          { teks: 'Ya Allah, uang saya. Tolong dikembalikan.', waktu: '11:35', reaksi: 'Mohon maaf Bu, saya tidak bisa bantu. Semua sudah di luar kendali.', reaksiWaktu: '11:36' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Terus transfer untuk "upgrade VIP", "biaya visa", dan biaya tambahan lainnya',
        hasil: 'Uang terus keluar dan keberangkatan tidak pernah terjadi. Travel ilegal biasanya tidak memiliki izin PPIU/PIHK dari Kemenhaj.',
        tips: 'Bayar hanya ke rekening atas nama perusahaan, bukan pribadi. Pastikan izin PPIU/PIHK lewat Kemenhaj sebelum membayar.',
      },
      {
        benar: true,
        teks: 'Berhenti transfer, cek izin travel ke Kemenhaj, lapor polisi',
        hasil: 'Kamu menghentikan kerugian lebih lanjut. Pihak berwenang bisa menyelidiki travel tanpa izin dan memblokir rekening pelaku.',
        tips: 'Haji/umrah resmi harus lewat travel berizin PPIU/PIHK. Diskusikan dengan keluarga sebelum transfer besar.',
      },
    ],
    fakta: 'Kemenhaj (per September 2026): 189 pengaduan penipuan/penggelapan dana haji & umrah. Polri membentuk Satgas Haji & Umrah pada April 2026.',
  },

  // ============================================================
  // KASUS 8 — Kerja Online "Tonton Drama/Iklan" & Deposit
  // ============================================================
  {
    id: 'kasus-lansia-8',
    modusId: 'lansia-m8',
    title: 'Kerja Online "Tonton Drama" Bisa Dapat Rp500 Ribu',
    kategori: 'Kerja Online Palsu',
    level: 'Sedang–Tinggi',
    levelTone: 'warning',
    kontak: {
      nama: 'Admin Grup Kerja',
      peran: 'Mengaku mentor kerja online',
      nomor: '@admin.kerjaonline',
      online: true,
      avatarIcon: 'smart_display',
      avatarBg: 'bg-warning-yellow-light',
      avatarFg: 'text-secondary',
    },
    peringatan: [
      'Diundang ke grup berisi "peserta" palsu',
      'Tugas awal dibayar kecil',
      'Diminta setor deposit untuk tugas berikutnya',
      'Komisi naik, pencairan tidak pernah datang',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Halo Bu. Saya lihat Ibu aktif di grup. Kami buka kerja online santai: nonton drama China, dibayar Rp500.000 per hari.', waktu: '14:02' },
      { dari: 'lawan', teks: 'Cukup 30 menit sehari, sambil santai di rumah. Cocok untuk ibu rumah tangga dan lansia.', waktu: '14:02' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Wah, boleh nih. Gimana caranya?', waktu: '14:03', reaksi: 'Gampang Bu. Nanti saya masukin ke grup khusus. Di sana ada mentor yang bimbing sampai tugas pertama cair.', reaksiWaktu: '14:03' },
          { teks: 'Kok bisa dibayar cuma nonton drama?', waktu: '14:03', reaksi: 'Kami kerja sama dengan platform drama Bu. Tugasnya nonton dan kasih rating. Gampang banget.', reaksiWaktu: '14:04' },
        ],
      },
      { dari: 'lawan', teks: 'Ini bukti komisi yang cair ke member kami kemarin ya Bu 👇', waktu: '14:05' },
      { dari: 'sistem', teks: '[Gambar: Bukti transfer Rp500.000 ke e-wallet member]', waktu: '14:05' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Wah mantap. Saya mau coba!', waktu: '14:06', reaksi: 'Sip Bu. Nanti saya kirim link grup ya. Sebelum mulai, Ibu perlu top up saldo "limit tugas" dulu.', reaksiWaktu: '14:06' },
          { teks: 'Kok ada top up? Bukannya kerja itu digaji, bukan bayar?', waktu: '14:06', reaksi: 'Top up ini cuma jaminan sistem Bu, biar tidak ada member nakal. Nanti saldonya balik + komisi.', reaksiWaktu: '14:07' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, saya masukin ke grup ya. Nanti Ibu top up Rp300.000 dulu, komisi pertama langsung cair Rp750.000.', waktu: '14:08' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Ini kok saya yang bayar dulu? Biasanya kerja kan dapat uang.', waktu: '14:09', reaksi: 'Iya Bu, tapi kan ini sistem baru. Nanti uangnya balik + komisi Rp750.000. Untung besar!', reaksiWaktu: '14:09' },
          { teks: 'Baik, saya top up Rp300.000.', waktu: '14:09', reaksi: 'Sip Bu. Setelah top up, Ibu langsung dapat tugas pertama dan komisi cair hari ini.', reaksiWaktu: '14:10' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, jangan lupa isi data untuk akun VIP: nama lengkap, nomor rekening, dan foto KTP.', waktu: '14:11' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok butuh KTP juga? Kerja online biasanya nggak butuh.', waktu: '14:12', reaksi: 'Buat verifikasi akun Bu, biar komisinya bisa dicairkan langsung ke rekening Ibu. Aman kok.', reaksiWaktu: '14:12' },
          { teks: 'Baik, saya kirim semua datanya.', waktu: '14:12', reaksi: 'Sip Bu. Jangan lupa selfie pegang KTP juga ya, biar lewat verifikasinya.', reaksiWaktu: '14:13' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, ini ada slot terbatas nih. Cuma 3 orang lagi yang bisa ikut batch hari ini.', waktu: '14:14' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Aku mau cerita ke anak saya dulu ya, kayaknya aneh.', waktu: '14:15', reaksi: 'Jangan Bu, nanti slotnya diambil orang lain. Ini kesempatan bagus, mumpung masih ada.', reaksiWaktu: '14:15' },
          { teks: 'Baik, saya transfer sekarang.', waktu: '14:15', reaksi: 'Sip Bu! Setelah transfer, komisi pertama Rp750.000 langsung cair hari ini.', reaksiWaktu: '14:16' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, komisi pertama Ibu udah cair Rp750.000. Sekarang ada tugas VIP, komisinya Rp3 juta. Top up Rp1.500.000 dulu ya.', waktu: '14:18' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Wah, sudah cair? Lanjut, saya top up Rp1,5 juta.', waktu: '14:19', reaksi: 'Sip Bu. Setelah top up, tugas VIP langsung buka. Komisi Rp3 juta bisa cair hari ini.', reaksiWaktu: '14:19' },
          { teks: 'Kok makin besar? Saya cek dulu ya.', waktu: '14:19', reaksi: 'Bu, kalau Ibu berhenti sekarang, komisi Rp750.000 tadi hangus lho.', reaksiWaktu: '14:20' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, ternyata sistem error nih. Buat cairin komisi Rp3 juta, Ibu perlu setor biaya pajak Rp500.000 dulu.', waktu: '14:22' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Kok minta setor lagi? Ini makin banyak permintaannya.', waktu: '14:23', reaksi: 'Biar komisinya bisa cair Bu. Kalau tidak, uang Rp1,5 juta Ibu hangus.', reaksiWaktu: '14:23' },
          { teks: 'Baik, saya transfer biaya pajaknya.', waktu: '14:23', reaksi: 'Bagus Bu. Setelah transfer, komisi langsung kami proses.', reaksiWaktu: '14:24' },
        ],
      },
      { dari: 'lawan', teks: 'Bu, tinggal bayar biaya verifikasi Rp250.000. Setelah itu, komisi Rp3 juta langsung masuk ke rekening Ibu.', waktu: '14:25' },
      {
        dari: 'pilihan',
        label: 'Bagaimana Ibu/Bapak membalas?',
        opsi: [
          { teks: 'Ini penipuan. Saya stop dan lapor ke OJK.', waktu: '14:26', reaksi: '[Pesan gagal terkirim — kamu memblokir nomor ini]', reaksiWaktu: '14:26' },
          { teks: 'Baik, saya transfer biaya verifikasinya.', waktu: '14:26', reaksi: 'Sip Bu. Setelah transfer, komisi langsung masuk hari ini.', reaksiWaktu: '14:27' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Terus setor deposit, pajak, dan biaya verifikasi untuk mencairkan komisi',
        hasil: 'Setoran terus bertambah dan komisi tidak pernah cair. Uang Ibu/Bapak habis dan admin menghilang dari grup.',
        tips: 'Pekerjaan sungguhan tidak meminta Anda menyetor uang lebih dulu. Kalau ada deposit, itu penipuan.',
      },
      {
        benar: true,
        teks: 'Berhenti setor, blokir admin, simpan bukti, lapor OJK 157 atau IASC',
        hasil: 'Kamu menghentikan kerugian lebih lanjut. Bukti chat & transfer bisa dipakai untuk melaporkan nomor dan rekening pelaku.',
        tips: 'Ceritakan ke anak atau cucu sebelum menyetor uang. Modus ini menyasar lansia yang sendirian di rumah.',
      },
    ],
    fakta: 'OJK/Satgas PASTI (Mei–Juli 2026): modus baru termasuk tugas menonton drama China atau iklan, pembelian "hak cipta film", dan akun e-commerce dengan deposit komisi. Polanya: bayaran kecil di awal, lalu setoran besar.',
  },
]

export const TOTAL_KASUS_LANSIA = SIMULASI_KASUS_LANSIA.length

export function getKasusLansiaById(id) {
  return SIMULASI_KASUS_LANSIA.find((k) => k.id === id) || null
}

export function pickRandomKasusLansia() {
  return SIMULASI_KASUS_LANSIA[Math.floor(Math.random() * SIMULASI_KASUS_LANSIA.length)]
}