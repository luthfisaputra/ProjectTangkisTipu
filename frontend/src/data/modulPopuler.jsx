// Registry 8 Modus Populer per track.
// Track: 0 = Pelajar & Remaja, 1 = Dewasa, 2 = Lansia.
// Ketiganya sudah aktif.

import { MODUS_POPULER_PELAJAR } from './modulPopulerPelajar.jsx'
import { MODUS_POPULER_LANSIA } from './modulPopulerLansia.jsx'

// ============================================================
// 8 MODUS POPULER — JALUR DEWASA & KARIER
// Sumber: langkah-2-8-modus-populer-penipuan-digital.md
// ============================================================

export const MODUS_POPULER_DEWASA = [
  {
    id: 'dewasa-m1',
    num: 1,
    title: 'Pinjol Ilegal & Jebakan KTP',
    level: 'Tinggi',
    levelTone: 'danger',
    icon: 'badge',
    singkatnya: 'Kamu dibayar kecil (misalnya pulsa Rp50.000) untuk foto KTP atau selfie memegang KTP, atau "meminjamkan" KTP temanmu. Data itu dipakai mengajukan pinjaman online atas namamu. Uangnya masuk ke pelaku, tagihan dan teror datang ke kamu dan keluargamu.',
    caraKerja: [
      'Tawaran imbalan kecil untuk foto/selfie KTP, atau tawaran pinjaman "cepat tanpa syarat".',
      'Data KTP dan kontak ponselmu dikumpulkan (aplikasi meminta akses kontak dan galeri).',
      'Pinjaman diajukan atas nama pemilik KTP, sering di banyak aplikasi.',
      'Penagih menghubungi pemilik KTP, lalu menyebar pesan ke keluarga dan kontak.',
      'Teror dan pemerasan berlanjut, kadang meski utang sudah lunas.',
    ],
    contohPesan: 'Dapat pulsa Rp50.000 cuma foto selfie pegang KTP. Cepat ya, slot terbatas!',
    dataNyata: [
      { value: '26.729', label: 'Pengaduan pinjol ilegal ke OJK (s.d. 31 Agu 2026)', tone: 'danger' },
      { value: '951', label: 'Pinjol ilegal dihentikan Satgas PASTI (2026)', tone: 'warning' },
      { value: '~400', label: 'Korban kasus Bareskrim Nov 2025; 1 korban rugi Rp1,4 M', tone: 'neutral' },
    ],
    tandaBahaya: [
      'Diminta foto/selfie KTP oleh orang tak dikenal, atau "pinjam" KTP kakak/teman.',
      'Aplikasi pinjaman meminta akses kontak, galeri, dan penyimpanan.',
      'Tawaran pinjaman datang lewat SMS/WA dari nomor asing.',
      'Ada uang masuk dari aplikasi yang tidak pernah kamu buka.',
    ],
    lakukanIni: [
      'Tolak. Jangan kirim foto KTP/selfie KTP untuk imbalan apa pun.',
      'Cek NIK lewat iDeb/SLIK OJK (idebku.ojk.go.id), lapor OJK 157, dan minta blokir NIK ke Dukcapil bila disalahgunakan.',
      'Jangan transfer balik uang "nyasar" dari pinjol; lapor ke bank dan OJK.',
    ],
  },
  {
    id: 'dewasa-m2',
    num: 2,
    title: 'File APK Berkedok Kurir Paket',
    level: 'Tinggi',
    levelTone: 'danger',
    icon: 'local_shipping',
    singkatnya: 'Seseorang yang mengaku kurir mengirim file berjudul seperti "Lihat Foto Paket.apk" lewat WhatsApp. Itu bukan foto, melainkan aplikasi berbahaya. Setelah dipasang, pelaku bisa membaca SMS (termasuk OTP) dan mengendalikan aplikasi bank dari jauh.',
    caraKerja: [
      'Pesan WA dari nomor asing: "Ada paket untuk Anda, lihat fotonya di sini."',
      'File dengan nama menyerupai foto atau resi, ekstensi sebenarnya .apk.',
      'Korban memasang dan menyetujui izin (SMS, kontak, akses khusus).',
      'Aplikasi mencuri data dan OTP, lalu rekening dikuras tanpa korban membuka aplikasi bank.',
    ],
    contohPesan: 'Kak, paket Anda gagal diantar. Cek foto paket di file ini ya. [Lampiran: Lihat_Foto_Paket.apk]',
    dataNyata: [
      { value: '15.800', label: 'Laporan phishing & APK berbahaya (OJK, Nov 2025)', tone: 'danger' },
      { value: '3.924', label: 'Khusus APK via WhatsApp (per Nov 2025)', tone: 'warning' },
      { value: '493', label: 'Korban jaringan APK kurir; rugi ~Rp12 miliar (Bareskrim)', tone: 'neutral' },
    ],
    tandaBahaya: [
      'Kurir mengirim file, bukan nomor resi di aplikasi/situs resmi.',
      'Nama file "foto/resi", tetapi ukurannya beberapa MB dan ekstensinya .apk.',
      'Setelah dibuka, ponsel meminta banyak izin (SMS, kontak, akses khusus).',
    ],
    lakukanIni: [
      'Jangan pasang file APK dari chat, siapa pun pengirimnya.',
      'Lacak paket hanya lewat aplikasi/situs resmi ekspedisi.',
      'Jika terlanjur: putuskan internet (mode pesawat), uninstall aplikasinya, hubungi bank untuk memblokir rekening/kartu, ganti PIN dan kata sandi dari perangkat lain, dan pertimbangkan reset pabrik.',
    ],
  },
  {
    id: 'dewasa-m3',
    num: 3,
    title: 'Undangan Pernikahan & Surat Palsu Berformat APK',
    level: 'Tinggi',
    levelTone: 'danger',
    icon: 'mail',
    singkatnya: 'Kemasan berubah, jebakannya sama: file APK yang menyamar sebagai "Surat Undangan Pernikahan Digital", "Surat Tilang", "Informasi Tagihan", atau "Lembar Tagihan". Pesan datang dari nomor asing atau dari kontak yang akunnya sudah dibajak.',
    caraKerja: [
      'Pesan singkat bernada sopan, misalnya "Kami harap kehadirannya".',
      'Lampiran bernama menyerupai undangan atau dokumen resmi, tetapi berformat APK.',
      'Penerima membuka karena tak enak atau penasaran.',
      'Aplikasi mencuri data dan OTP, dan pelaku mengakses mobile banking.',
    ],
    contohPesan: 'Mohon hadir di acara kami 🙏 [Lampiran: Undangan-Pernikahan.apk]',
    dataNyata: [
      { value: 'Undangan Pernikahan.apk', label: 'Salah satu nama file yang paling sering dipakai (OJK)', tone: 'warning' },
      { value: '15.800', label: 'Laporan phishing & APK gabungan (OJK, Nov 2025)', tone: 'danger' },
      { value: 'Rp1,4 M', label: 'Kerugian 1 nasabah Malang setelah buka APK undangan (2023)', tone: 'neutral' },
    ],
    tandaBahaya: [
      'Undangan, surat tilang, atau tagihan dikirim sebagai file, bukan tautan resmi atau undangan yang kamu kenal.',
      'Pengirim tak dikenal, atau terasa memaksa ("tolong dibuka sekarang").',
      'Ekstensi file .apk (aplikasi), bukan gambar/PDF.',
    ],
    lakukanIni: [
      'Undangan sungguhan tidak membutuhkan aplikasi baru. Tanyakan lewat telepon kepada orang yang mengundang.',
      'Jangan buka file APK. Hapus pesan dan blokir.',
      'Jika terlanjur dipasang: ikuti langkah di Modus 2.',
    ],
  },
  {
    id: 'dewasa-m4',
    num: 4,
    title: 'Phishing Bank (SMS, Link, dan Situs Palsu)',
    level: 'Tinggi',
    levelTone: 'danger',
    icon: 'phishing',
    singkatnya: 'Pelaku menyamar sebagai bank, instansi pemerintah, atau layanan resmi lewat SMS, tautan, atau situs tiruan, untuk mencuri data kartu, PIN, atau OTP.',
    caraKerja: [
      'SMS atau pesan bernada urgen: "kartu akan diblokir", "ada denda tilang", "akun dibekukan".',
      'Tautan mengarah ke situs palsu yang mirip aslinya.',
      'Korban memasukkan nomor kartu, PIN, atau OTP.',
      'Pelaku langsung memakai data itu untuk transaksi.',
    ],
    contohPesan: 'Anda memiliki tagihan denda tilang. Bayar sekarang: [tautan aneh]',
    dataNyata: [
      { value: '13.386', label: 'Laporan phishing, rugi Rp507,53 M (OJK, Okt 2025)', tone: 'danger' },
      { value: '12', label: 'Korban SMS phishing fake BTS, rugi Rp473 juta (Bareskrim Mar 2025)', tone: 'warning' },
      { value: '124', label: 'Tautan phishing e-tilang palsu ditemukan (Feb 2026)', tone: 'neutral' },
    ],
    tandaBahaya: [
      'SMS bernada ancaman atau mendesak dari nomor/nama yang tidak jelas.',
      'Tautan bukan alamat resmi (ejaan aneh, domain tidak dikenal).',
      'Meminta PIN, OTP, atau data kartu di halaman web.',
      'Nama pengirim bisa tampak benar, tetapi tetap bisa palsu.',
    ],
    lakukanIni: [
      'Bank tidak pernah meminta PIN atau OTP. Jangan berikan pada siapa pun.',
      'Jangan klik tautan di SMS/WA. Buka aplikasi atau situs resmi dengan mengetik sendiri alamatnya.',
      'Jika terlanjur memasukkan data: segera telepon bank, blokir kartu/akun, lalu lapor ke OJK 157 dan polisi.',
    ],
  },
  {
    id: 'dewasa-m5',
    num: 5,
    title: 'Tugas Like/Follow Berkedok Kerja Paruh Waktu',
    level: 'Sedang–Tinggi',
    levelTone: 'warning',
    icon: 'thumb_up',
    singkatnya: 'Tawaran "kerja santai": like, follow, atau subscribe dibayar puluhan ribu rupiah. Bayaran awal cair untuk membangun kepercayaan, lalu korban diminta deposit demi "tugas VIP" dan uangnya hilang.',
    caraKerja: [
      'Tawaran massal lewat WA/Telegram/DM.',
      'Ajakan masuk grup berisi testimoni palsu.',
      'Beberapa tugas pertama dibayar kecil, tetapi sungguhan.',
      '"Tugas peningkatan": setor deposit dengan janji komisi besar.',
      'Ancaman "uang hangus", setoran naik berulang, lalu admin menghilang.',
    ],
    contohPesan: 'Dibutuhkan freelance like & follow, Rp20.000/tugas, cocok pelajar. Gabung grup ya!',
    dataNyata: [
      { value: '23.469', label: 'Laporan kategori lowongan kerja (IASC, Jan 2026)', tone: 'warning' },
      { value: '823', label: 'Korban jaringan kerja paruh waktu; rugi ~Rp59 M (Bareskrim 2022–2024)', tone: 'danger' },
      { value: '10.304', label: 'Kasus serupa di Malaysia (PDRM, sejak Jan 2025)', tone: 'neutral' },
    ],
    tandaBahaya: [
      'Bayaran besar untuk pekerjaan super ringan.',
      'Diminta deposit/top up/modal.',
      'Ancaman uang hangus dan batas waktu ketat.',
      'Pembayaran ke rekening pribadi yang berganti-ganti.',
    ],
    lakukanIni: [
      'Aturan emas: pekerjaan asli membayar kamu; penipuan meminta kamu membayar.',
      'Blokir, laporkan, dan simpan bukti. Jangan setor lagi untuk "menebus" uang yang sudah hilang.',
    ],
  },
  {
    id: 'dewasa-m6',
    num: 6,
    title: 'Catut Akun Teman & Link Undian/Voting',
    level: 'Sedang–Tinggi',
    levelTone: 'warning',
    icon: 'alternate_email',
    singkatnya: 'DM dari "teman": "Bro, tolong voting lomba adik gue dong" + link. Halaman palsu meminta nomor WA dan kode 6 digit. Kode itu adalah kunci login WhatsApp-mu, sehingga akunmu diambil alih, lalu pesan yang sama dikirim ke semua kontakmu.',
    caraKerja: [
      'Akun teman sudah dibajak sebelumnya.',
      'Pesan emosional ("tolong dong", anak, beasiswa, voting segera ditutup).',
      'Tautan ke halaman lomba palsu yang meminta nomor dan kode.',
      'Kode dipakai pelaku untuk login (atau menautkan perangkat ke akunmu).',
      'Pelaku menyebarkan pesan ke kontakmu dan meminta uang atau data.',
    ],
    contohPesan: 'Tolong vote adik gue di lomba ini dong, tinggal klik link ya!',
    dataNyata: [
      { value: '177 domain palsu', label: 'Kampanye "Vote for My Child" (Bitdefender, Okt 2025)', tone: 'warning' },
      { value: '52 kasus', label: 'Singapura, kerugian ~S$46.000 (Polisi Singapura, 2026)', tone: 'danger' },
      { value: '44.446', label: 'Laporan impersonation/fake call IASC (Jan 2026)', tone: 'neutral' },
    ],
    tandaBahaya: [
      'Teman minta "bantuan cepat" lewat link.',
      'Halaman voting meminta nomor telepon dan kode.',
      'Diminta menautkan perangkat atau memindai QR dari orang lain.',
      'Bahasa teman terasa tidak seperti biasanya.',
    ],
    lakukanIni: [
      'Kode OTP/verifikasi tidak boleh diberikan ke siapa pun, termasuk lewat screenshot.',
      'Verifikasi lewat telepon atau tatap muka.',
      'Aktifkan verifikasi dua langkah di WhatsApp dan 2FA di Instagram, serta cek menu Perangkat tertaut secara berkala.',
    ],
  },
  {
    id: 'dewasa-m7',
    num: 7,
    title: 'Toko Online Fiktif & Belanja Murah Palsu',
    level: 'Sedang–Tinggi',
    levelTone: 'warning',
    icon: 'storefront',
    singkatnya: 'Penipuan belanja online adalah kategori penipuan terbanyak yang dilaporkan ke OJK/IASC. Pelaku membuat toko palsu atau iklan dengan harga sangat murah, meminta pembayaran, lalu menghilang, atau mengirim tautan pembayaran yang mencuri data kartu.',
    caraKerja: [
      'Iklan atau akun toko dengan barang bagus dan harga jauh di bawah pasar.',
      'Pembeli diajak transaksi di luar platform resmi (chat pribadi, tautan sendiri).',
      'Muncul tekanan: stok tinggal sedikit, diskon hanya hari ini.',
      'Pembayaran ke rekening pribadi atau tautan berbahaya.',
      'Barang tak datang, atau data kartu terkuras.',
    ],
    contohPesan: 'Ready HP flagship cuma Rp1,5 juta! Transfer DP sekarang sebelum habis.',
    dataNyata: [
      { value: '64.933', label: 'Laporan transaksi belanja online (OJK, Nov 2025); rugi ~Rp1,14 T', tone: 'danger' },
      { value: '73.743', label: 'Kategori belanja di IASC (Jan 2026) — terbesar', tone: 'danger' },
      { value: '#1', label: 'Modus paling banyak dilaporkan ke OJK', tone: 'warning' },
    ],
    tandaBahaya: [
      'Harga jauh di bawah harga pasar.',
      'Diajak bertransaksi di luar platform resmi.',
      'Hanya menerima transfer ke rekening pribadi.',
      'Akun baru, minim ulasan, atau ulasan terlihat seragam.',
    ],
    lakukanIni: [
      'Bayar lewat fitur pembayaran resmi marketplace, jangan lewat chat pribadi.',
      'Cek reputasi penjual, jangan terburu-buru oleh diskon "hari ini saja".',
      'Jika tertipu: lapor ke bank dan IASC (iasc.ojk.go.id), simpan bukti transaksi dan chat.',
    ],
  },
  {
    id: 'dewasa-m8',
    num: 8,
    title: 'Mengaku Pihak Lain (Bank, Polisi, Kurir, Dukcapil)',
    level: 'Tinggi',
    levelTone: 'danger',
    icon: 'record_voice_over',
    singkatnya: 'Pelaku menyamar sebagai pihak berwenang atau perusahaan (petugas bank, polisi, Dukcapil, kurir, bahkan IASC sendiri) lewat telepon atau WhatsApp dengan logo yang mirip. Tujuannya membuatmu panik lalu menyerahkan kode, memasang aplikasi, atau mentransfer uang.',
    caraKerja: [
      'Telepon/WA: "Datamu bermasalah", "ada transaksi mencurigakan", "ada panggilan polisi".',
      'Tekanan agar segera bertindak dan tidak memberi tahu siapa pun.',
      'Korban diminta membagikan kode, berbagi layar, atau memasang aplikasi akses jarak jauh.',
      'Uang dipindahkan ke "rekening aman" milik pelaku.',
      'Setelah korban sadar, muncul penipu kedua yang menawarkan "pemulihan dana" dengan biaya.',
    ],
    contohPesan: 'Kami dari layanan bank. Ada transaksi janggal di rekening Anda. Mohon install aplikasi verifikasi ini.',
    dataNyata: [
      { value: '39.978', label: 'Laporan fake call, rugi ~Rp1,54 T (OJK, Nov 2025)', tone: 'danger' },
      { value: '44.446', label: 'Kategori impersonation/fake call (IASC, Jan 2026)', tone: 'danger' },
      { value: 'Remote access', label: 'Modus baru: share screen / aplikasi jarak jauh (IASC, Mei 2026)', tone: 'warning' },
    ],
    tandaBahaya: [
      'Penelepon membuatmu takut atau panik.',
      'Diminta menjaga rahasia atau tidak menutup telepon.',
      'Diminta berbagi layar, memasang aplikasi, atau menyebutkan kode.',
      'Meminta memindahkan uang ke "rekening aman".',
    ],
    lakukanIni: [
      'Tutup telepon, hubungi balik lewat nomor resmi di kartu/aplikasi/situs institusi.',
      'Instansi resmi tidak meminta kode OTP, PIN, atau transfer lewat telepon.',
      'Jangan pasang aplikasi jarak jauh atau bagikan layar saat "dipandu" orang asing.',
      'Jika sudah terlanjur: hubungi bank, lapor IASC/OJK 157 dan polisi, serta waspadai tawaran pemulihan dana berbayar.',
    ],
  },
]

// ============================================================
// REGISTRY
// ============================================================

export const MODUS_POPULER_BY_TRACK = {
  0: MODUS_POPULER_PELAJAR,
  1: MODUS_POPULER_DEWASA,
  2: MODUS_POPULER_LANSIA,
}

export const TRACK_LABEL = {
  0: 'Anak & Remaja',
  1: 'Dewasa & Karier',
  2: 'Ramah Lansia',
}

export function getModusPopuler(track) {
  const idx = Number(track) >= 0 && Number(track) <= 2 ? Number(track) : 1
  return MODUS_POPULER_BY_TRACK[idx]
}

export function getTrackLabel(track) {
  const idx = Number(track) >= 0 && Number(track) <= 2 ? Number(track) : 1
  return TRACK_LABEL[idx]
}

export function isTrackAvailable(track) {
  return getModusPopuler(track) !== null
}

// Backward compat: default ke Dewasa
export const MODUS_POPULER = MODUS_POPULER_DEWASA
export const TOTAL_MODUS_POPULER = MODUS_POPULER_DEWASA.length
export function getModusById(id) {
  return MODUS_POPULER_DEWASA.find((m) => m.id === id) || null
}