// Simulasi Kasus Interaktif — Jalur PELAJAR & REMAJA
// 8 skenario (satu per modus populer Pelajar), masing-masing 6 ronde pilihan.
// Materi sensitif (modus 6 & 7) ditulis pada tingkat pola & perlindungan,
// tanpa naskah rayuan atau detail teknis.

export const SIMULASI_KASUS_PELAJAR = [
  // ============================================================
  // KASUS 1 — Judi Online Berkedok Game
  // ============================================================
  {
    id: 'kasus-pelajar-1',
    modusId: 'pelajar-m1',
    title: 'Game "Pasti Menang" dari Teman',
    kategori: 'Judi Online',
    level: 'Tinggi',
    levelTone: 'danger',
    kontak: {
      nama: 'Rian (Teman Kelas)',
      peran: 'Teman yang mengajak',
      nomor: '@rian.kelas',
      online: true,
      avatarIcon: 'casino',
      avatarBg: 'bg-danger-red-light',
      avatarFg: 'text-danger-red',
    },
    peringatan: [
      'Ajakan dari teman dengan janji "pasti menang"',
      'Deposit kecil (Rp10.000) dengan hadiah besar',
      'Menang kecil di awal supaya ketagihan',
      'Referral: dapat komisi kalau ajak orang lain',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Bro, nih aku ada game baru keren. Modal Rp10.000 bisa jadi Rp500.000! Gacor banget!', waktu: '19:42' },
      { dari: 'lawan', teks: 'Tadi aku main 15 menit langsung profit Rp150.000. Nih buktinya 👇', waktu: '19:42' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Wah serius? Gimana caranya, Bro?', waktu: '19:43', reaksi: 'Gampang! Tinggal download aplikasinya, deposit via QRIS atau e-wallet. Nanti aku bimbing ya!', reaksiWaktu: '19:43' },
          { teks: 'Itu judi online kan? Aku nggak mau ikut.', waktu: '19:43', reaksi: 'Ah santai aja, ini game, bukan judi. Yang penting main tanggung, nggak apa-apa. Modal kecil dulu coba-coba.', reaksiWaktu: '19:44' },
        ],
      },
      { dari: 'lawan', teks: 'Aku kirim link-nya ya. Tinggal install aja. Kalau kalah, untungnya sedikit-sedikit juga bisa cair', waktu: '19:45' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Oke, aku install dulu. Kalau untung, aku lanjut ya.', waktu: '19:46', reaksi: 'Sip! Main aman-aman dulu aja. Kalau profit banyak, langsung WD ya biar cair.', reaksiWaktu: '19:46' },
          { teks: 'Aku nggak mau ikut. Menurutku itu penipuan.', waktu: '19:46', reaksi: 'Yaudah tapi rugi lho, teman-teman udah pada profit. Kamu doang yang nggak ikut.', reaksiWaktu: '19:47' },
        ],
      },
      { dari: 'sistem', teks: '[Aplikasi meminta Anda bayar deposit via QRIS Rp10.000]', waktu: '19:48' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Oke, aku transfer Rp10.000 dulu ya.', waktu: '19:49', reaksi: 'Sip! Setelah transfer, saldo langsung masuk. Main gampang kok, tinggal klik tombolnya.', reaksiWaktu: '19:49' },
          { teks: 'Kenapa harus deposit dulu? Kok nggak langsung main?', waktu: '19:49', reaksi: 'Buat modalnya, Bro. Kalau nggak ada modal, nggak bisa main. Modal Rp10.000 aja cukup kok, nanti bisa jadi Rp100.000.', reaksiWaktu: '19:50' },
        ],
      },
      { dari: 'lawan', teks: 'Gimana, udah? Tadi teman aku yang cewek juga udah transfer, dia langsung profit Rp80.000', waktu: '19:52' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku coba dulu ya, kayak seru nih.', waktu: '19:53', reaksi: 'Sip! Nanti kalau nangis, aku bantu ya. Pokoknya jangan berhenti sebelum balik modal!', reaksiWaktu: '19:53' },
          { teks: 'Aku skip ya. Ini kayak jebakan, teman kamu yang aku khawatirin.', waktu: '19:53', reaksi: 'Yaudah, tapi kamu bakal nyesel. Semua orang lagi profit sekarang.', reaksiWaktu: '19:54' },
        ],
      },
      { dari: 'lawan', teks: 'Eh tadi teman aku yang transfer Rp10.000 udah profit Rp80.000. Sekarang dia deposit Rp500.000, langsung jadi Rp2 juta!', waktu: '19:55' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Wah, aku juga mau deposit Rp500.000 biar profit gede.', waktu: '19:56', reaksi: 'Sip, kali ini pasti gacor! Aku bantu ya, biar nggak salah klik. Duit aku juga masuk kok', reaksiWaktu: '19:56' },
          { teks: 'Ini pasti jebakan. Yang menang di awal cuma buat mancing korban.', waktu: '19:56', reaksi: 'Ah kamu nggak tahu aja. Coba dulu aja, sekali aja Rp100.000. Kalau nggak profit, aku ganti uangmu', reaksiWaktu: '19:57' },
        ],
      },
      { dari: 'sistem', teks: '[Dalam 3 hari, kamu kalah total Rp250.000. Saldo tinggal Rp0]', waktu: '22:11' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku mau balikin modal. Aku deposit Rp500.000 lagi.', waktu: '22:12', reaksi: 'Nah gitu dong! Pokoknya jangan berhenti. Kalau berhenti, uangmu hangus.', reaksiWaktu: '22:12' },
          { teks: 'Aku stop. Ini beneran nggak sehat, aku mau cerita ke orang tua.', waktu: '22:12', reaksi: 'Jangan Bro! Nanti mereka marah. Coba sekali lagi aja, aku yakin kali ini profit.', reaksiWaktu: '22:13' },
        ],
      },
      { dari: 'lawan', teks: 'Bro, jangan berhenti. Sekali lagi aja, aku udah feeling kali ini gacor. Kalau nggak, uangmu hangus lho.', waktu: '22:15' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Oke, sekali lagi. Tapi kalau kalah, aku stop.', waktu: '22:16', reaksi: 'Sip! Langsung deposit Rp1 juta aja biar profitnya gede. Feeling aku kuat kali ini!', reaksiWaktu: '22:16' },
          { teks: 'Nggak. Aku blokir ini. Aku mau cerita ke orang tua.', waktu: '22:16', reaksi: '[Pesan gagal terkirim — kamu memblokir nomor ini]', reaksiWaktu: '22:17' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Ikut deposit lagi untuk "balikin modal" karena feeling kali ini menang',
        hasil: 'Kekalahan terus berulang, uang jajan terkuras, dan kamu mulai berbohong ke orang tua. Kalau dipaksa terus, bisa berujung pinjam teman atau terlibat pinjol ilegal.',
        tips: 'Judi online dirancang agar pemain kalah. Menang kecil di awal cuma umpan. Kalau sudah mulai, hentikan dan cerita ke orang dewasa tepercaya.',
      },
      {
        benar: true,
        teks: 'Hentikan, blokir ajakan, dan cerita ke orang tua/guru',
        hasil: 'Kamu memutus siklus kekalahan. Kecanduan butuh pendampingan, bukan hukuman. Cerita ke orang dewasa tepercaya adalah langkah paling berani.',
        tips: 'Kalau ada teman yang terpapar, lapor ke SAPA 129 (telepon 129 atau WA 08111-129-129). Laporkan juga rekening judol ke cekrekening.id.',
      },
    ],
    fakta: 'PPATK (Juli 2026): ±103.100 anak-remaja terhubung transaksi judol sepanjang 2025. 77,72% di antaranya pelajar SMP–SMA usia 13–16 tahun.',
  },

  // ============================================================
  // KASUS 2 — Top Up Murah / Skin Gratis
  // ============================================================
  {
    id: 'kasus-pelajar-2',
    modusId: 'pelajar-m2',
    title: 'Diamond Murah 70% & Skin Gratis',
    kategori: 'Phishing Akun Game',
    level: 'Sedang–Tinggi',
    levelTone: 'warning',
    kontak: {
      nama: 'Admin Top Up Murah',
      peran: 'Mengaku reseller resmi',
      nomor: '@topupmurah.id',
      online: true,
      avatarIcon: 'sports_esports',
      avatarBg: 'bg-warning-yellow-light',
      avatarFg: 'text-secondary',
    },
    peringatan: [
      'Harga jauh di bawah resmi',
      'Diminta login pakai akun game di situs luar',
      'Promo "skin gratis" dari link tidak resmi',
      'Testimoni palsu di kolom komentar',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Bro, ada promo top up ML diskon 70% nih! 86 diamond cuma Rp20.000', waktu: '16:20' },
      { dari: 'lawan', teks: 'Nih bukti member yang udah cair: [screenshot] langsung masuk akun 5 menit 👇', waktu: '16:20' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Wah murah banget! Gimana caranya?', waktu: '16:21', reaksi: 'Gampang! Tinggal klik link ini, login pakai akun ML kamu, terus pilih nominalnya.', reaksiWaktu: '16:21' },
          { teks: 'Kok bisa 70%? Bukannya harga resmi 86 diamond Rp50.000?', waktu: '16:21', reaksi: 'Kami ambil dari distributor ilegal dikit, tapi aman kok. Nggak ada yang kena banned.', reaksiWaktu: '16:22' },
        ],
      },
      { dari: 'lawan', teks: 'Ini link-nya ya: mltopup-official-promo.xyz/login', waktu: '16:22' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Kenapa harus login? Bukannya top up cuma butuh User ID?', waktu: '16:23', reaksi: 'Sistem baru Bro, biar diamond-nya bisa langsung nempel. Kalau nggak login, harus nunggu 24 jam.', reaksiWaktu: '16:23' },
          { teks: 'Oke, aku klik sekarang.', waktu: '16:23', reaksi: 'Sip! Login pakai email dan password akun ML kamu ya. Kalau bisa pakai nomor HP juga.', reaksiWaktu: '16:24' },
        ],
      },
      { dari: 'lawan', teks: 'Setelah login, tunggu OTP masuk ke email/HP kamu ya. Nanti tinggal kirim OTP-nya ke aku biar diverifikasi', waktu: '16:25' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Kok kirim OTP ke kamu? Bukannya itu buat login?', waktu: '16:26', reaksi: 'Buat verifikasi top up-nya Bro. Kalau nggak, diamond-nya nggak masuk. Sistem baru nih.', reaksiWaktu: '16:26' },
          { teks: 'Oke, nanti aku kirim.', waktu: '16:26', reaksi: 'Sip! Cepetan ya, sistem timeout 5 menit. Setelah itu, langsung aku proses diamond-nya', reaksiWaktu: '16:27' },
        ],
      },
      { dari: 'sistem', teks: '[Email kamu: Permintaan ubah password akun game. Kode verifikasi: 8721]', waktu: '16:28' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Ada email buat ubah password akun! Ini pasti phishing.', waktu: '16:29', reaksi: 'Itu email dummy dari sistem kita Bro, biar aman. Tinggal kasih kodenya ke aku aja.', reaksiWaktu: '16:29' },
          { teks: 'Oke, kodenya 8721. Cepetan ya.', waktu: '16:29', reaksi: 'Sip! Bentar, aku proses. Jangan keluar dari halaman ya', reaksiWaktu: '16:30' },
        ],
      },
      { dari: 'sistem', teks: '[Kamu tiba-tiba log out dari akun game. Tidak bisa login lagi]', waktu: '16:31' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Astaga, aku nggak bisa login! Kamu pakai dataku ya?', waktu: '16:32', reaksi: 'Tenang Bro, itu sistem verifikasi. 5 menit lagi normal kok. Tunggu aja', reaksiWaktu: '16:32' },
          { teks: 'Kok aku ke-log out? Ini kenapa?', waktu: '16:32', reaksi: 'Mungkin sinyal kamu jelek. Coba login lagi pakai email. Kalau nggak bisa, bilang aku ya', reaksiWaktu: '16:33' },
        ],
      },
      { dari: 'lawan', teks: 'Eh Bro, aku butuh Rp50.000 buat "biaya admin" cairin diamond-nya. Nanti aku ganti Rp70.000 sekalian di akun kamu', waktu: '16:35' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Oke, aku transfer sekarang. Pokoknya diamondku masuk ya.', waktu: '16:36', reaksi: 'Sip! Nanti langsung aku proses. Kirim bukti transfernya ya', reaksiWaktu: '16:36' },
          { teks: 'Ini makin banyak minta. Aku berhenti dan report akunmu.', waktu: '16:36', reaksi: 'Yaudah terserah kamu. Yang lain banyak yang mau', reaksiWaktu: '16:37' },
        ],
      },
      { dari: 'lawan', teks: 'Kalau nggak transfer sekarang, akunmu aku jual ke orang lain. Password udah aku ganti', waktu: '16:38' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Jangan! Aku transfer sekarang, tapi jangan jual akunku.', waktu: '16:39', reaksi: 'Bagus. Transfer Rp100.000 aja, sekalian biar akunmu aman. Nanti aku kasih balik Rp200.000', reaksiWaktu: '16:39' },
          { teks: 'Silakan. Aku report dan hubungi customer service game sekarang.', waktu: '16:39', reaksi: '[Pesan gagal terkirim — kamu memblokir nomor ini]', reaksiWaktu: '16:40' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Kirim OTP, transfer biaya admin, dan serahkan akun karena takut dijual',
        hasil: 'Akun game-mu dibajak permanen, uang transferanmu hilang, dan pelaku menjual akun ke orang lain. Kamu juga berisiko kehilangan data pribadi lain.',
        tips: 'Top up resmi hanya butuh User ID. Kalau diminta login, itu phishing. Jangan pernah bagikan OTP ke siapa pun.',
      },
      {
        benar: true,
        teks: 'Jangan kirim OTP, ganti password dari perangkat lain, lapor ke customer service game',
        hasil: 'Kamu memutus phishing sebelum akun diambil alih. Kalau terlanjur, CS game bisa bantu pulihkan akun dengan bukti kepemilikan.',
        tips: 'Aktifkan 2FA di akun game, bind ke email/HP aktif. Top up hanya lewat toko resmi di dalam game.',
      },
    ],
    fakta: 'Juni 2026: penawaran akun Free Fire gratis kembali marak di komunitas pemain. Mei 2026: promo top up jauh di bawah resmi sering dari carding/refund trick — akun bisa kena banned.',
  },

  // ============================================================
  // KASUS 3 — Tugas Like/Follow "Uang Jajan"
  // ============================================================
  {
    id: 'kasus-pelajar-3',
    modusId: 'pelajar-m3',
    title: 'Freelance Like/Follow Rp20 Ribu',
    kategori: 'Kerja Online Palsu',
    level: 'Sedang–Tinggi',
    levelTone: 'warning',
    kontak: {
      nama: 'Admin Freelance',
      peran: 'Mengaku HRD freelance',
      nomor: '@admin.freelance',
      online: true,
      avatarIcon: 'thumb_up',
      avatarBg: 'bg-warning-yellow-light',
      avatarFg: 'text-secondary',
    },
    peringatan: [
      'Perekrutan lewat DM tanpa wawancara',
      'Bayaran awal cair untuk membangun kepercayaan',
      'Diminta deposit untuk "tugas VIP"',
      'Ancaman hangus kalau tidak buru-buru',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Hai! Aku lihat kamu aktif di TikTok. Mau ikut freelance like & follow? Komisi Rp20.000 per tugas', waktu: '10:02' },
      { dari: 'lawan', teks: 'Gajinya cair harian, cukup 30 menit sehari. Nih bukti member yang udah cair 👇', waktu: '10:02' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Wah gampang banget, aku ikut!', waktu: '10:03', reaksi: 'Sip! Nanti aku bimbing dari tugas pertama ya. Kalau lancar bisa naik level VIP!', reaksiWaktu: '10:03' },
          { teks: 'Beneran cair? Atau cuma jebakan?', waktu: '10:03', reaksi: 'Aman dong, nih aku kirim bukti transfer member yang udah cair. Tinggal like, langsung dibayar', reaksiWaktu: '10:04' },
        ],
      },
      { dari: 'lawan', teks: 'Tugas pertama kamu udah cair Rp30.000 ke e-wallet ✅. Besok bisa tugas lagi ya', waktu: '10:05' },
      { dari: 'lawan', teks: 'Sekarang ada tugas VIP nih: top up Rp300.000, komisi Rp1.500.000', waktu: '10:06' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Kok aku yang harus setor dulu? Bukannya kerja itu digaji?', waktu: '10:07', reaksi: 'Iya, ini cuma jaminan komitmen. Nanti uangnya balik + komisi Rp1.500.000. Untung besar!', reaksiWaktu: '10:07' },
          { teks: 'Oke, aku top up sekarang ya.', waktu: '10:07', reaksi: 'Sip! Setelah top up, kamu langsung dapat misi VIP dan komisinya cair hari ini', reaksiWaktu: '10:07' },
        ],
      },
      { dari: 'lawan', teks: 'Batas 30 menit ya. Kalau lewat, slot VIP-nya hangus', waktu: '10:08' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku belum ada uang nih, besok aja ya?', waktu: '10:08', reaksi: 'Gapapa, bisa pinjam teman atau orang tua dulu. Nanti komisinya balik 5x lipat kok!', reaksiWaktu: '10:08' },
          { teks: 'Oke, aku transfer sekarang.', waktu: '10:08', reaksi: 'Mantap! Bukti transfernya kirim ya, langsung aku proses biar komisi cepat masuk', reaksiWaktu: '10:09' },
        ],
      },
      { dari: 'lawan', teks: 'Eh sebelum top up, kamu perlu isi data untuk akun VIP dulu. Nama, nomor rekening, dan foto KTP', waktu: '10:10' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Foto KTP? Bukannya buat freelance nggak butuh KTP?', waktu: '10:11', reaksi: 'Buat verifikasi akun VIP, biar komisi bisa dicairkan langsung ke rekening kamu.', reaksiWaktu: '10:11' },
          { teks: 'Oke, aku kirim semuanya.', waktu: '10:11', reaksi: 'Sip! Jangan lupa selfie pegang KTP juga ya, biar lewat verifikasinya', reaksiWaktu: '10:12' },
        ],
      },
      { dari: 'lawan', teks: 'Slot VIP tinggal 1 nih. Kalau telat, batch berikutnya 2 minggu lagi', waktu: '10:13' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku cerita ke orang tua dulu ya, kayaknya aneh.', waktu: '10:14', reaksi: 'Yaudah terserah kamu. Tapi slot-nya hangus lho. Nanti kalau ada batch baru baru aku kabari', reaksiWaktu: '10:14' },
          { teks: 'Oke, aku transfer sekarang.', waktu: '10:14', reaksi: 'Sip! Kirim bukti transfernya ya, langsung aku proses biar komisi cair hari ini', reaksiWaktu: '10:15' },
        ],
      },
      { dari: 'lawan', teks: 'Eh sistemnya error nih. Untuk cairin komisi Rp1,5 juta, kamu perlu setor pajak Rp200.000 dulu', waktu: '10:17' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Kok minta setor lagi? Ini makin aneh.', waktu: '10:18', reaksi: 'Biar komisinya bisa cair. Kalau tidak, uang Rp300.000 kamu hangus.', reaksiWaktu: '10:18' },
          { teks: 'Oke, aku transfer lagi.', waktu: '10:18', reaksi: 'Bagus. Setelah transfer, aku proses pencairan komisi ya', reaksiWaktu: '10:19' },
        ],
      },
      { dari: 'lawan', teks: 'Ini step terakhir. Setelah pajak, tinggal setor biaya verifikasi Rp150.000 biar dana Rp1,5 juta langsung cair', waktu: '10:20' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Ini makin banyak biaya. Aku stop dan cerita ke orang tua.', waktu: '10:21', reaksi: '[Pesan gagal terkirim — kamu memblokir nomor ini]', reaksiWaktu: '10:21' },
          { teks: 'Oke, aku setor biaya verifikasi.', waktu: '10:21', reaksi: 'Sip! Setelah ini, dana Rp1,5 juta cair langsung ke e-wallet kamu', reaksiWaktu: '10:22' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Setor deposit, pajak, dan biaya verifikasi untuk mencairkan komisi',
        hasil: 'Setoran terus bertambah, komisi tidak pernah cair. Setelah kamu sadar, admin memblokir nomor dan grup menghilang.',
        tips: 'Kerja sungguhan tidak pernah minta kamu bayar dulu. Kalau ada deposit, itu penipuan.',
      },
      {
        benar: true,
        teks: 'Hentikan, blokir admin, simpan bukti chat & cerita ke orang tua atau guru',
        hasil: 'Kamu menghentikan kerugian sebelum setoran bertambah. Bukti chat bisa dipakai untuk melaporkan nomor dan rekening pelaku.',
        tips: 'Ceritakan ke orang dewasa sebelum menyetor uang. Penipu benci kalau korbannya berdiskusi dengan orang lain.',
      },
    ],
    fakta: 'Bareskrim Juli 2024: 823 korban jaringan "kerja paruh waktu" dengan kerugian ~Rp59 miliar. IASC Januari 2026: 23.469 laporan kategori lowongan kerja.',
  },

  // ============================================================
  // KASUS 4 — Pinjol Ilegal & Pinjam Rekening
  // ============================================================
  {
    id: 'kasus-pelajar-4',
    modusId: 'pelajar-m4',
    title: 'Diminta Pinjamkan KTP & Rekening',
    kategori: 'Pinjol Ilegal',
    level: 'Tinggi',
    levelTone: 'danger',
    kontak: {
      nama: 'Kenalan Online',
      peran: 'Mengaku butuh bantuan verifikasi',
      nomor: '@kenalan.online',
      online: true,
      avatarIcon: 'badge',
      avatarBg: 'bg-danger-red-light',
      avatarFg: 'text-danger-red',
    },
    peringatan: [
      'Imbalan kecil untuk data KTP atau pinjam rekening',
      'Minta selfie memegang KTP',
      'Diminta buka rekening/e-wallet baru',
      'Tekanan waktu: "hari ini terakhir"',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Hai, aku liat profil kamu, kayaknya kita satu circle deh 😊', waktu: '19:41' },
      { dari: 'lawan', teks: 'Btw aku ada proyek kecil nih, butuh bantuan data verifikasi. Imbalannya pulsa Rp50.000', waktu: '19:42' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Proyek apa tuh? Aku tertarik!', waktu: '19:42', reaksi: 'Gampang banget kok, cuma butuh data verifikasi aja. Nanti aku bayar pulsa Rp50.000', reaksiWaktu: '19:42' },
          { teks: 'Proyek apa ya? Kok langsung ke aku?', waktu: '19:42', reaksi: 'Aku lagi butuh banyak responden nih, kebetulan profil kamu cocok. Aman kok, santai aja', reaksiWaktu: '19:43' },
        ],
      },
      { dari: 'lawan', teks: 'Cuma butuh selfie kamu pegang KTP aja kok, gampang', waktu: '19:43' },
      { dari: 'lawan', teks: 'Ku bayar pulsa Rp50.000, cuma sekali. Aman kok 😊', waktu: '19:43' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'KTP? Buat apa ya? Aku gak pernah denger verifikasi model begini.', waktu: '19:44', reaksi: 'Tenang aja, ini cuma verifikasi akun bisnis aku. Nanti pulsanya langsung masuk. Aman kok 😊', reaksiWaktu: '19:44' },
          { teks: 'Oh gitu, oke deh aku kirim.', waktu: '19:44', reaksi: 'Sip! Langsung kirim ya, jangan lupa selfie sambil senyum biar cepat lewat verifikasinya', reaksiWaktu: '19:44' },
        ],
      },
      { dari: 'lawan', teks: 'Eh kalau kamu nggak punya KTP sendiri, boleh pakai KTP kakak atau orang tua kamu', waktu: '19:45' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'KTP kakak? Itu nggak boleh kayaknya.', waktu: '19:46', reaksi: 'Gapapa kok, yang penting ada fotonya. Nanti pulsanya aku kirim dobel deh buat kakak kamu juga', reaksiWaktu: '19:46' },
          { teks: 'Oke, aku pinjam KTP kakak dulu.', waktu: '19:46', reaksi: 'Sip! Kalau bisa sekalian foto kakak kamu pegang KTP juga ya, biar lolos verifikasi', reaksiWaktu: '19:47' },
        ],
      },
      { dari: 'lawan', teks: 'Sekalian ya, kamu buka rekening bank atau e-wallet baru atas namamu. Nanti rekeningnya aku pakai buat terima transfer', waktu: '19:48' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Rekening atas namaku dipakai orang lain? Itu bahaya.', waktu: '19:49', reaksi: 'Aman kok, cuma buat terima transferan klien aku. Nanti kamu dapat bonus Rp100.000 per transaksi', reaksiWaktu: '19:49' },
          { teks: 'Oke, aku buka rekening baru.', waktu: '19:49', reaksi: 'Mantap! Nanti aku kirim instruksinya. Jangan bilang siapa-siapa ya, biar nggak banyak yang ikut', reaksiWaktu: '19:50' },
        ],
      },
      { dari: 'lawan', teks: 'Cepetan ya, ini hari terakhir. Nanti ku transfer pulsanya', waktu: '19:51' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku tanya orang tua dulu ya, kayaknya aneh.', waktu: '19:52', reaksi: 'Jangan tanya siapa-siapa ya. Ini proyek rahasia. Kalau ketahuan, kita dua-duanya kena', reaksiWaktu: '19:52' },
          { teks: 'Oke, aku kirim sekarang.', waktu: '19:52', reaksi: 'Sip! Jangan lupa selfie pegang KTP dan foto KK juga ya, biar makin gampang', reaksiWaktu: '19:53' },
        ],
      },
      { dari: 'lawan', teks: 'Nanti kalau ada SMS atau telepon dari bank, jangan dibalas ya. Bilang aja nggak tahu. Itu bagian dari verifikasi', waktu: '19:55' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Kok aku harus bohong ke bank? Ini beneran aneh.', waktu: '19:56', reaksi: 'Aman kok, cuma proses biasa. Kalau kamu jujur, nanti proyeknya gagal dan pulsanya nggak cair', reaksiWaktu: '19:56' },
          { teks: 'Oke, aku bilang nggak tahu aja.', waktu: '19:56', reaksi: 'Bagus. Sekarang kirim datanya ya, cepetan', reaksiWaktu: '19:57' },
        ],
      },
      { dari: 'lawan', teks: 'Kalau dalam 30 menit nggak kirim, aku cari orang lain ya. Slot terbatas', waktu: '19:58' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku block saja. Ini beneran penipuan.', waktu: '19:59', reaksi: '[Pesan gagal terkirim — kamu memblokir nomor ini]', reaksiWaktu: '19:59' },
          { teks: 'Oke, aku kirim data sekarang.', waktu: '19:59', reaksi: 'Cepat ya, sebelum slotnya diambil orang lain', reaksiWaktu: '20:00' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Kirim foto KTP, buka rekening baru, dan berbohong ke bank',
        hasil: 'Identitasmu dipakai membuka pinjaman online ilegal. Utang dan teror penagih datang ke kamu dan keluarga. Kalau rekeningmu jadi tempat uang pelaku, kamu bisa terlibat pidana.',
        tips: 'KTP, NIK, selfie pegang KTP, dan rekening tidak boleh dipinjamkan ke siapa pun. Tidak ada alasan baik untuk "meminjamkan" identitas.',
      },
      {
        benar: true,
        teks: 'Tolak, blokir, dan ceritakan ke orang tua atau guru',
        hasil: 'Identitasmu aman. Kamu juga menghindari kemungkinan besar terlibat pidana pencucian uang karena rekening dipakai pelaku.',
        tips: 'Kalau KTP/NIK keluargamu disalahgunakan: cek NIK di idebku.ojk.go.id, lapor OJK 157, dan minta blokir NIK ke Dukcapil.',
      },
    ],
    fakta: 'Bareskrim November 2025: aplikasi pinjol ilegal memeras ~400 korban. Satu korban rugi Rp1,4 miliar karena data KTP-nya dipakai berulang meski pinjaman sudah lunas.',
  },

  // ============================================================
  // KASUS 5 — Catut Akun Teman & Link Voting
  // ============================================================
  {
    id: 'kasus-pelajar-5',
    modusId: 'pelajar-m5',
    title: 'Akun Teman Kirim Link Voting',
    kategori: 'Manipulasi Sosial',
    level: 'Sedang–Tinggi',
    levelTone: 'warning',
    kontak: {
      nama: 'Alisa (Teman)',
      peran: 'Akun teman yang dibajak',
      nomor: '@alisa.teman',
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
          { teks: 'Oke, aku klik ya!', waktu: '21:16', reaksi: 'Sip! Langsung vote ya Bro, tinggal 5 suara lagi biar adikku menang 🥺', reaksiWaktu: '21:16' },
          { teks: 'Bentar, ini link apa ya? Kok domainnya aneh?', waktu: '21:16', reaksi: 'Link lomba adik aku kok, aman. Tinggal klik aja langsung bisa vote', reaksiWaktu: '21:16' },
        ],
      },
      { dari: 'lawan', teks: 'Vote terakhir hari ini, cepetan ya!', waktu: '21:17' },
      { dari: 'lawan', teks: 'Halamannya minta nomor WA + kode 6 digit yang masuk, tinggal masukin aja', waktu: '21:17' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Kok minta kode 6 digit? Itu OTP WhatsApp buat login?', waktu: '21:18', reaksi: 'Bukan OTP kok, itu kode verifikasi vote aja. Buruan masukin ya, nanti voting-nya ditutup 😭', reaksiWaktu: '21:18' },
          { teks: 'Oke, aku isi ya.', waktu: '21:18', reaksi: 'Sip! Tinggal masukin kodenya, terus klik tombol vote-nya. Gampang kan? 😊', reaksiWaktu: '21:18' },
        ],
      },
      { dari: 'lawan', teks: 'Kode 6 digit itu buat verifikasi vote-nya kok, aman', waktu: '21:19' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Tapi OTP WhatsApp itu buat login. Kalau aku kasih, akunku yang kena.', waktu: '21:19', reaksi: 'Yaudah kalau gak percaya, nanti adikku kalah lomba gara-gara kamu 😭', reaksiWaktu: '21:19' },
          { teks: 'Oke ini kodenya…', waktu: '21:19', reaksi: 'Sip! Jangan keluar dari halaman ya, nanti aku info kalau vote-nya kelar', reaksiWaktu: '21:20' },
        ],
      },
      { dari: 'sistem', teks: '[HP kamu tiba-tiba log out dari WhatsApp — akun sedang dipakai di perangkat lain]', waktu: '21:20' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Astaga, WhatsApp-ku log out! Ini pasti dari link voting.', waktu: '21:21', reaksi: 'Tenang Bro, itu karena verifikasi voting. Nanti bisa login lagi', reaksiWaktu: '21:21' },
          { teks: 'Kok WhatsApp-ku mati ya?', waktu: '21:21', reaksi: 'Wah nggak tahu Bro, mungkin error dari WhatsApp-nya. Coba tunggu sebentar', reaksiWaktu: '21:22' },
        ],
      },
      { dari: 'lawan', teks: '[Pesan dari akun Alisa ke kontakmu: "Bro, pinjam uang dulu Rp500.000, urgent. Transfer ke rekening ini ya: 8821xxxx"]', waktu: '21:22' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Ini bukan Alisa. Akunnya dibajak dan sekarang minta uang.', waktu: '21:23', reaksi: 'Bro, serius deh. Ini aku Alisa. Cepetan transfer ya sebelum aku kena masalah', reaksiWaktu: '21:23' },
          { teks: 'Alisa kok tiba-tiba minta uang? Ini aneh.', waktu: '21:23', reaksi: 'Bro, urgent banget. Nanti aku ganti. Tolong ya', reaksiWaktu: '21:24' },
        ],
      },
      { dari: 'lawan', teks: 'Kalau bisa transfer sekarang, kalau nggak aku cari orang lain ya.', waktu: '21:25' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku telepon Alisa dulu ke nomor lamanya untuk konfirmasi.', waktu: '21:26', reaksi: '[Telepon ke Alisa] "Hah? Aku nggak kirim pesan apa-apa. WA-ku memang baru kena hack!"', reaksiWaktu: '21:26' },
          { teks: 'Oke, aku transfer sekarang.', waktu: '21:26', reaksi: 'Makasih Bro, nanti aku ganti ya', reaksiWaktu: '21:27' },
        ],
      },
      { dari: 'lawan', teks: 'Nanti aku kabari kalau sudah cair ya.', waktu: '21:28' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku tidak akan transfer. Aku sudah konfirmasi ke Alisa asli.', waktu: '21:28', reaksi: '[Pesan gagal terkirim — akun dialihkan ke pemilik asli]', reaksiWaktu: '21:29' },
          { teks: 'Oke, aku tunggu kabarnya.', waktu: '21:28', reaksi: 'Sip Bro, transfer Rp500.000 dulu ya. Nanti aku ganti Rp600.000', reaksiWaktu: '21:29' },
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
    fakta: 'Bitdefender Oktober 2025: kampanye "Vote for My Child" memakai 177 domain palsu dan 554 tautan unik. IASC Januari 2026: penipuan medsos 19.983 laporan.',
  },

  // ============================================================
  // KASUS 6 — Sextortion & Grooming (ditulis pada level pola)
  // ============================================================
  {
    id: 'kasus-pelajar-6',
    modusId: 'pelajar-m6',
    title: 'Kenalan Online Minta Foto & Ancam Sebar',
    kategori: 'Keamanan Pribadi',
    level: 'Sangat Tinggi',
    levelTone: 'critical',
    icon: 'shield_lock',
    kontak: {
      nama: 'Akun Anonim',
      peran: 'Mengaku teman sebaya',
      nomor: '@akun.anonim',
      online: true,
      avatarIcon: 'shield_lock',
      avatarBg: 'bg-danger-red text-on-error',
      avatarFg: '',
    },
    peringatan: [
      'Akun anonim yang terlalu cepat akrab',
      'Minta pindah ke chat pribadi atau video call',
      'Minta foto pribadi, iming-iming uang atau hadiah',
      'Muncul ancaman: "Kalau tidak, aku sebar"',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Hai, aku lihat kamu di grup game. Kamu keren dan asik kayaknya 😊', waktu: '20:30' },
      { dari: 'lawan', teks: 'Boleh kenalan lebih dekat? Aku juga suka hobi yang sama kayak kamu', waktu: '20:30' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Hai juga! Iya boleh, hobi kita sama ya 😊', waktu: '20:31', reaksi: 'Asik! Kamu beda dari yang lain. Nanti kita chat pribadi aja ya, biar lebih bebas', reaksiWaktu: '20:31' },
          { teks: 'Maaf, aku nggak biasa kenalan dengan akun anonim.', waktu: '20:31', reaksi: 'Ah jangan gitu, aku cuma pengen punya teman. Boleh deh kan? Aku nggak jahat kok', reaksiWaktu: '20:32' },
        ],
      },
      { dari: 'lawan', teks: 'Aku sebenarnya naksir sama kamu. Aku pengen lihat kamu lebih dekat', waktu: '20:33' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Kita baru kenal. Aku nggak nyaman kalau dibahas begitu.', waktu: '20:34', reaksi: 'Yaudah, maafin aku ya. Boleh minta foto kamu aja? Biar aku bayangin kamu cantik/ganteng', reaksiWaktu: '20:34' },
          { teks: 'Aku flattered sih, tapi kayaknya terlalu cepat.', waktu: '20:34', reaksi: 'Nggak apa-apa kok, kita kan udah deket. Boleh kirim satu foto aja?', reaksiWaktu: '20:35' },
        ],
      },
      { dari: 'lawan', teks: 'Nih aku kirim kamu uang Rp50.000 dulu ya, biar kamu percaya. Terus kirim foto aja, biasa aja kok', waktu: '20:36' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku nggak mau terima uang dari orang yang belum aku kenal.', waktu: '20:37', reaksi: 'Santai aja, uangnya buat kamu. Aku cuma pengen lihat kamu. Nanti aku kirim lebih banyak lagi', reaksiWaktu: '20:37' },
          { teks: 'Oke, aku kirim satu foto aja ya.', waktu: '20:37', reaksi: 'Sip! Yang jelas ya fotonya. Kalau bagus, aku kirim hadiah lebih banyak', reaksiWaktu: '20:38' },
        ],
      },
      { dari: 'lawan', teks: 'Wah bagus! Coba kirim foto kamu yang tanpa baju dong, biar aku makin sayang sama kamu', waktu: '20:40' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku nggak mau. Tolong jangan chat aku lagi.', waktu: '20:41', reaksi: 'Sekali aja deh, aku janji nggak sebar. Kalau kamu nggak mau, aku sebar foto kamu yang tadi', reaksiWaktu: '20:41' },
          { teks: 'Aku nggak nyaman. Nanti aja ya kalau udah kenal lama.', waktu: '20:41', reaksi: 'Jangan nanti, sekarang aja. Kalau nggak, aku sebar foto kamu yang tadi ke semua kontakmu', reaksiWaktu: '20:42' },
        ],
      },
      { dari: 'lawan', teks: 'Aku sudah screenshot chat kita. Kalau kamu nggak nurut, aku sebar ke semua orang', waktu: '20:43' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku tutup chat ini dan cerita ke orang tua sekarang.', waktu: '20:44', reaksi: 'Jangan! Kalau kamu cerita, aku beneran sebar. Diam aja, nurutin aku aja', reaksiWaktu: '20:44' },
          { teks: 'Jangan sebar. Aku turutin aja deh.', waktu: '20:44', reaksi: 'Bagus. Sekarang kirim foto yang aku minta. Kalau nurut, aku nggak sebar', reaksiWaktu: '20:45' },
        ],
      },
      { dari: 'lawan', teks: 'Aku tunggu 10 menit. Kalau nggak, aku sebar ke semua temanmu', waktu: '20:46' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku blokir akun ini dan cerita ke guru BK.', waktu: '20:47', reaksi: '[Pesan gagal terkirim — kamu memblokir akun ini]', reaksiWaktu: '20:47' },
          { teks: 'Tolong jangan sebar. Aku nurut.', waktu: '20:47', reaksi: 'Bagus. Kirim sekarang. Kalau nurut, aku hapus semua screenshot', reaksiWaktu: '20:48' },
        ],
      },
      { dari: 'lawan', teks: 'Kamu nurut terus ya, nanti aku kirim hadiah lebih banyak lagi.', waktu: '20:50' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Tidak. Aku stop. Aku cerita ke orang tua dan lapor SAPA 129.', waktu: '20:51', reaksi: '[Pesan gagal terkirim — kamu memblokir akun ini]', reaksiWaktu: '20:51' },
          { teks: 'Oke, aku nurutin kamu terus.', waktu: '20:51', reaksi: 'Bagus. Nanti aku bakal minta lebih banyak lagi ya, jangan bosen', reaksiWaktu: '20:52' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Turuti ancaman dan terus kirim apa yang diminta karena takut disebar',
        hasil: 'Permintaan akan terus bertambah dan tidak akan pernah berhenti. Menuruti ancaman biasanya bukan menghentikan, tapi membuat pelaku merasa bisa terus menekan.',
        tips: 'Ini bukan salahmu. Pelaku yang melakukan kejahatan. Jangan bayar dan jangan turuti ancaman.',
      },
      {
        benar: true,
        teks: 'Hentikan komunikasi, blokir, jangan hapus bukti, cerita ke orang tua/guru, lapor SAPA 129 / KPAI',
        hasil: 'Kamu memutus tekanan pelaku. Dengan bantuan orang dewasa dan lembaga resmi, kamu bisa dilindungi dan pelaku bisa diproses.',
        tips: 'Lapor: SAPA 129 (telepon 129 atau WA 08111-129-129), WhatsApp KPAI 0811-1002-7727, atau Unit PPA di polres terdekat.',
      },
    ],
    fakta: 'KPAI Jan–Apr 2026: 57 kasus kekerasan seksual anak dan 12 kasus anak korban pornografi & kejahatan siber. SIMFONI PPA (2023–Juni 2024): 15.186 anak korban kekerasan seksual.',
  },

  // ============================================================
  // KASUS 7 — Foto Diedit AI (Deepfake)
  // ============================================================
  {
    id: 'kasus-pelajar-7',
    modusId: 'pelajar-m7',
    title: 'Ancaman Sebar Foto Editan AI',
    kategori: 'Deepfake & Pemerasan',
    level: 'Tinggi',
    levelTone: 'danger',
    kontak: {
      nama: 'Akun Anonim',
      peran: 'Memeras dengan foto editan',
      nomor: '@akun.pemeras',
      online: true,
      avatarIcon: 'face_retouching_natural',
      avatarBg: 'bg-danger-red-light',
      avatarFg: 'text-danger-red',
    },
    peringatan: [
      'Foto diambil dari akun medsos publik',
      'Diedit dengan AI jadi konten asusila',
      'Ancaman sebar ke grup sekolah',
      'Minta uang atau foto tambahan',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Hai. Aku punya foto kamu yang diedit AI jadi konten yang bikin malu', waktu: '22:01' },
      { dari: 'lawan', teks: 'Kalau kamu nggak mau aku sebar ke grup sekolah, transfer Rp500.000', waktu: '22:01' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Astaga. Jangan sebar. Aku transfer sekarang.', waktu: '22:02', reaksi: 'Bagus. Transfer ke rekening ini. Kalau nurut, aku hapus fotonya', reaksiWaktu: '22:02' },
          { teks: 'Aku nggak akan nurut. Sebar aja, aku nggak bersalah.', waktu: '22:02', reaksi: 'Yakin? Nanti kamu malu seumur hidup. Sekali transfer aja, aman', reaksiWaktu: '22:03' },
        ],
      },
      { dari: 'lawan', teks: 'Kalau kamu lapor polisi, aku tetap sebar sebelum aku ketangkep', waktu: '22:04' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Kamu jahat. Aku bakal cerita ke orang tua dan guru.', waktu: '22:05', reaksi: 'Kalau kamu cerita, aku sebar sekarang juga. Pilih: transfer atau sebar', reaksiWaktu: '22:05' },
          { teks: 'Oke, aku transfer. Jangan sebar.', waktu: '22:05', reaksi: 'Bagus. Transfer Rp500.000 sekarang. Kalau tidak, aku sebar ke semua grup', reaksiWaktu: '22:06' },
        ],
      },
      { dari: 'sistem', teks: '[Akun anonim ini mengunggah caption ancaman: "Tunggu 10 menit, kalau nggak transfer aku sebar ke semua grup kelas"]', waktu: '22:07' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku screenshot semua ancamannya. Bukti penting.', waktu: '22:08', reaksi: 'Ngapain screenshot? Nanti malah jadi bukti kamu. Cepetan transfer', reaksiWaktu: '22:08' },
          { teks: 'Aku takut. Aku transfer sekarang.', waktu: '22:08', reaksi: 'Bagus. Setelah transfer, aku hapus. Jangan lapor siapa-siapa ya', reaksiWaktu: '22:09' },
        ],
      },
      { dari: 'lawan', teks: 'Setelah kamu transfer, ada tambahan Rp300.000 lagi ya. Buat "biaya hapus data"', waktu: '22:11' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Tadi bilang Rp500.000 doang. Ini makin banyak.', waktu: '22:12', reaksi: 'Ya kalau mau aman, transfer aja. Kalau nggak, aku sebar semua', reaksiWaktu: '22:12' },
          { teks: 'Oke, aku transfer lagi.', waktu: '22:12', reaksi: 'Bagus. Setelah ini, aku mungkin butuh tambahan lagi ya', reaksiWaktu: '22:13' },
        ],
      },
      { dari: 'lawan', teks: 'Pokoknya setiap kali kamu minta hapus, ada biaya. Jangan lapor siapa-siapa', waktu: '22:15' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku cerita ke orang tua sekarang. Ini bukan salahku.', waktu: '22:16', reaksi: 'Jangan! Aku beneran sebar kalau kamu cerita', reaksiWaktu: '22:16' },
          { teks: 'Oke, aku nurut. Jangan sebar ya.', waktu: '22:16', reaksi: 'Bagus. Nanti aku kabari kalau butuh tambahan', reaksiWaktu: '22:17' },
        ],
      },
      { dari: 'lawan', teks: 'Kamu masih sekolah kan? Mikirin reputasi kamu dulu sebelum lapor', waktu: '22:18' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku blokir. Aku mau lapor polisi dan KPAI.', waktu: '22:19', reaksi: '[Pesan gagal terkirim — kamu memblokir akun ini]', reaksiWaktu: '22:19' },
          { teks: 'Jangan sebar. Aku nurut apa pun.', waktu: '22:19', reaksi: 'Bagus. Sekarang kirim foto kamu yang baru, biar aku update koleksinya', reaksiWaktu: '22:20' },
        ],
      },
      { dari: 'lawan', teks: 'Aku tunggu foto barunya. Kalau tidak, aku sebar semua', waktu: '22:22' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Tidak. Aku stop dan cerita ke orang tua, guru BK, dan lapor polisi.', waktu: '22:23', reaksi: '[Pesan gagal terkirim]', reaksiWaktu: '22:23' },
          { teks: 'Oke, aku kirim sekarang.', waktu: '22:23', reaksi: 'Bagus. Setelah ini, aku bakal minta lebih banyak lagi ya', reaksiWaktu: '22:24' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Transfer uang dan turuti permintaan karena takut disebar',
        hasil: 'Permintaan terus bertambah dan tidak akan berhenti. Setiap kali kamu menurut, pelaku merasa bisa terus menekan. Uangmu habis dan rasa takut makin besar.',
        tips: 'Membuat dan menyebarkan deepfake asusila adalah tindak pidana. Kamu korban, bukan pelaku.',
      },
      {
        benar: true,
        teks: 'Simpan bukti, jangan sebarkan ulang, cerita ke orang dewasa tepercaya, lapor polisi/KPAI',
        hasil: 'Kamu memutus tekanan. Dengan bantuan orang dewasa dan lembaga resmi, pelaku bisa diproses dan kamu dilindungi.',
        tips: 'Lapor SAPA 129, KPAI, atau Unit PPA/Siber di polres terdekat. Atur akun jadi privat dan batasi foto wajah publik.',
      },
    ],
    fakta: 'Kasus deepfake SMAN 11 Semarang (Okt 2025) berlanjut ke persidangan Januari 2026. Pelaku terancam UU Pornografi maksimal 12 tahun penjara dan denda Rp6 miliar.',
  },

  // ============================================================
  // KASUS 8 — Tiket Konser & Jastip Palsu
  // ============================================================
  {
    id: 'kasus-pelajar-8',
    modusId: 'pelajar-m8',
    title: 'Tiket Konser "Ready" di Twitter',
    kategori: 'Tiket & Jastip Palsu',
    level: 'Sedang',
    levelTone: 'warning',
    kontak: {
      nama: 'Seller Tiket',
      peran: 'Mengaku punya tiket ready',
      nomor: '@seller.tiket',
      online: true,
      avatarIcon: 'confirmation_number',
      avatarBg: 'bg-warning-yellow-light',
      avatarFg: 'text-secondary',
    },
    peringatan: [
      'Tiket "ready" padahal konser sudah sold out',
      'Harga di bawah atau di atas pasaran drastis',
      'Hanya terima transfer ke rekening pribadi',
      'Akun baru atau sering ganti nama',
    ],
    skenario: [
      { dari: 'lawan', teks: 'Ready tiket konser [idola]! Harga di bawah pasaran, DM cepat sebelum habis', waktu: '14:02' },
      { dari: 'lawan', teks: 'Aku punya 3 tiket kategori Festival. Bisa COD kalau di Jakarta, tapi kalau luar kota transfer dulu', waktu: '14:02' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Wah aku minat! Berapa harganya?', waktu: '14:03', reaksi: 'Rp800.000 aja, harga aslinya Rp1.200.000. Cepetan ya, banyak yang nanya', reaksiWaktu: '14:03' },
          { teks: 'Kok masih ready? Bukannya udah sold out?', waktu: '14:03', reaksi: 'Aku beli pas war kemarin, terus ada 3 teman yang batal jadi aku jual', reaksiWaktu: '14:04' },
        ],
      },
      { dari: 'lawan', teks: 'Aku minta DP Rp500.000 dulu ya, sisanya pas tiketnya kamu terima. Transfer ke e-wallet aku', waktu: '14:05' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Bisa COD aja nggak? Aku takut ketipu.', waktu: '14:06', reaksi: 'Aduh aku di luar kota, nggak bisa COD. Kalau nggak transfer sekarang, aku jual ke orang lain', reaksiWaktu: '14:06' },
          { teks: 'Oke, aku transfer DP-nya.', waktu: '14:06', reaksi: 'Sip! Ini nomor e-wallet aku. Transfer Rp500.000 sekarang ya', reaksiWaktu: '14:07' },
        ],
      },
      { dari: 'sistem', teks: '[Kamu transfer Rp500.000 ke e-wallet pelaku]', waktu: '14:09' },
      { dari: 'lawan', teks: 'Bukti transfernya kirim ya, biar aku booking tiketnya', waktu: '14:10' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Sudah aku kirim. Tiketnya kapan dikirim?', waktu: '14:11', reaksi: 'Nanti aku info ya. Kalau bisa lunasin Rp300.000 sisanya dulu biar tiket langsung aku kirim', reaksiWaktu: '14:12' },
          { teks: 'Tiketnya bisa dikirim hari ini?', waktu: '14:11', reaksi: 'Kalau lunasin sisanya dulu, aku kirim hari ini juga. Biar nggak nunggu lama', reaksiWaktu: '14:12' },
        ],
      },
      { dari: 'lawan', teks: 'Kalau lunasin sekarang, aku kirim tiketnya hari ini. Kalau nggak, aku jual ke orang lain', waktu: '14:13' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Kok tiba-tiba minta lunas dulu? Aku bayar sisanya setelah tiket sampai saja.', waktu: '14:14', reaksi: 'Yaudah terserah kamu, tapi tiketnya nanti aku jual ke orang lain ya', reaksiWaktu: '14:14' },
          { teks: 'Oke, aku lunasi sekarang biar cepat.', waktu: '14:14', reaksi: 'Sip! Transfer Rp300.000 ke nomor e-wallet yang sama ya', reaksiWaktu: '14:15' },
        ],
      },
      { dari: 'sistem', teks: '[Kamu transfer Rp300.000 lagi. Total Rp800.000 sudah masuk ke pelaku]', waktu: '14:17' },
      { dari: 'lawan', teks: 'Eh sistemnya error nih. Untuk kirim tiketnya, aku butuh biaya kirim Rp50.000 dulu', waktu: '14:19' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Ini makin banyak minta. Aku berhenti dan lapor.', waktu: '14:20', reaksi: '[Pesan gagal terkirim — kamu memblokir nomor ini]', reaksiWaktu: '14:20' },
          { teks: 'Oke, aku transfer biaya kirimnya.', waktu: '14:20', reaksi: 'Sip! Setelah ini, tiketnya langsung aku kirim ya', reaksiWaktu: '14:21' },
        ],
      },
      { dari: 'lawan', teks: 'Oh iya, tiketnya ternyata kategori Festival. Tambahan Rp400.000 ya biar upgrade ke VIP', waktu: '14:23' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Aku stop. Ini penipuan. Aku cerita ke orang tua dan lapor polisi.', waktu: '14:24', reaksi: '[Pesan gagal terkirim]', reaksiWaktu: '14:24' },
          { teks: 'Oke, aku transfer tambahan Rp400.000.', waktu: '14:24', reaksi: 'Bagus. Setelah transfer, tiket VIP langsung aku kirim', reaksiWaktu: '14:25' },
        ],
      },
      { dari: 'lawan', teks: 'Eh ternyata tiketnya hilang di sistem. Aku transfer balik uangnya minggu depan ya', waktu: '14:27' },
      {
        dari: 'pilihan',
        label: 'Bagaimana kamu membalas?',
        opsi: [
          { teks: 'Kamu penipu. Aku lapor polisi dan screenshot semua bukti.', waktu: '14:28', reaksi: '[Pesan gagal terkirim]', reaksiWaktu: '14:28' },
          { teks: 'Oke, aku tunggu minggu depan.', waktu: '14:28', reaksi: 'Sip! Jangan lupa ya, minggu depan aku transfer balik', reaksiWaktu: '14:29' },
        ],
      },
    ],
    pilihan: [
      {
        benar: false,
        teks: 'Terus transfer tambahan sampai tiket diterima',
        hasil: 'Uang terus keluar dan tiket tidak pernah datang. Pelaku menambah permintaan sampai kamu sadar atau kehabisan uang.',
        tips: 'Beli tiket hanya dari penjual resmi yang diumumkan promotor/artis. Harga jauh di bawah atau di atas pasar = curiga.',
      },
      {
        benar: true,
        teks: 'Hentikan transfer, simpan bukti chat & transfer, lapor bank, IASC, dan polisi',
        hasil: 'Kamu menghentikan kerugian lebih lanjut. Bukti lengkap bisa dipakai untuk upaya pemblokiran rekening pelaku.',
        tips: 'Hati-hati jastip. Cek ulasan dan riwayat penjual. Jangan transfer penuh sebelum ada kejelasan.',
      },
    ],
    fakta: 'Konser BLACKPINK Jakarta (Nov 2025): korban membeli tiket Rp5 juta dari akun di X. Saat penukaran, tiket tidak terdaftar. Pelaku ditangkap 27 November 2025.',
  },
]

export const TOTAL_KASUS_PELAJAR = SIMULASI_KASUS_PELAJAR.length

export function getKasusPelajarById(id) {
  return SIMULASI_KASUS_PELAJAR.find((k) => k.id === id) || null
}

export function pickRandomKasusPelajar() {
  return SIMULASI_KASUS_PELAJAR[Math.floor(Math.random() * SIMULASI_KASUS_PELAJAR.length)]
}