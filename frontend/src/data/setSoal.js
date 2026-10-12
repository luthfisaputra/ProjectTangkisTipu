// Data master halaman Set Soal (admin).
// Dipakai untuk tabel set soal, filter, dan editor soal.

// Batas jumlah soal dalam satu set (dipakai daftar soal, form, dan aksi tambah).
export const MAKS_SOAL = 10

export const JALUR_META = {
  anak: { label: 'Anak & Remaja', icon: 'school', usia: '10-17 Tahun' },
  dewasa: { label: 'Dewasa', icon: 'person', usia: '18-59 Tahun' },
  lansia: { label: 'Lansia', icon: 'elderly', usia: '60+ Tahun' },
}

export const TIPE_META = {
  pre: { label: 'Pre-test', pill: 'bg-surface-container-high text-on-surface' },
  post: { label: 'Post-test', pill: 'bg-surface-container-high text-on-surface' },
  retensi: { label: 'Tes Ulang (14 Hari)', pill: 'bg-secondary-fixed/50 text-secondary' },
}

export const STATUS_META = {
  aktif: { label: 'Aktif', icon: 'check_circle', pill: 'bg-safe-green-light text-tertiary' },
  terjadwal: { label: 'Terjadwal', icon: 'schedule', pill: 'bg-warning-yellow-light text-secondary' },
  draf: { label: 'Draf', icon: 'pause_circle', pill: 'bg-surface-container-high text-on-surface-variant' },
}

const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

// Kode kelas yang tersedia di portal admin (dipakai sebagai saran input).
// Pola seragam PR-XXXX; kode baru dibuat dari halaman Set Soal lalu otomatis
// muncul di halaman Kode Kelas & Dashboard Admin.
export const DAFTAR_KODE_KELAS = ['PR-2312', 'PR-4078', 'PR-5510', 'PR-8834']

export function formatTanggal(iso) {
  if (!iso) return '-'
  const [tahun, bulan, tanggal] = iso.split('-')
  if (!tahun || !bulan || !tanggal) return '-'
  return `${Number(tanggal)} ${BULAN[Number(bulan) - 1]} ${tahun}`
}

export const SET_SOAL = [
  {
    id: 'SET-DWS-POST-02',
    nama: 'Uji Refleks APK & Tautan Kurir Palsu v2',
    catatan: '10 kasus interaktif berbasis percakapan',
    jalur: 'dewasa',
    tipe: 'post',
    kodeKelas: 'PR-2312',
    rilis: '2026-08-14',
    tutup: '2026-09-14',
    status: 'aktif',
  },
  {
    id: 'SET-ANK-PRE-01',
    nama: 'Modus Pesan Pinjol & Hadiah Game Remaja',
    catatan: 'Diagnostik kemampuan awal peserta',
    jalur: 'anak',
    tipe: 'pre',
    kodeKelas: 'PR-4078',
    rilis: '2026-08-18',
    tutup: '2026-08-25',
    status: 'terjadwal',
  },
  {
    id: 'SET-DWS-RET-04',
    nama: 'Evaluasi Retensi Berkala 14 Hari (Spaced Repetition)',
    catatan: 'Evaluasi retensi pasca pelatihan',
    jalur: 'dewasa',
    tipe: 'retensi',
    kodeKelas: 'PR-5510',
    rilis: '2026-08-28',
    tutup: '2026-09-11',
    status: 'terjadwal',
  },
  {
    id: 'SET-LAN-POST-01',
    nama: 'Kenali Pesan Darurat Palsu Mengaku Kerabat',
    catatan: 'Pendampingan keluarga & caregiver',
    jalur: 'lansia',
    tipe: 'post',
    kodeKelas: 'PR-8834',
    rilis: '2026-08-10',
    tutup: '',
    status: 'aktif',
  },
  {
    id: 'SET-DWS-DRAFT-03',
    nama: 'Kuis Deteksi Belanja Online Bodong',
    catatan: 'Penyusunan tim kurikulum',
    jalur: 'dewasa',
    tipe: 'pre',
    kodeKelas: '',
    rilis: '',
    tutup: '',
    status: 'draf',
  },
]

export const DAFTAR_SOAL = [
  {
    id: 1,
    kategori: 'Modus APK Palsu',
    ringkas: 'Warga menerima pesan APK undangan pernikahan...',
    pertanyaan:
      'Sebuah pesan berisi file undangan pernikahan berekstensi .apk dikirim dari nomor tak dikenal. Tautan tersebut meminta izin akses SMS dan kontak agar undangan bisa dibuka. Tindakan paling aman adalah...',
    opsi: [
      'Memasang aplikasinya agar undangan bisa segera dibuka.',
      'Menghapus pesan dan tidak membuka lampiran, karena undangan resmi biasanya berupa gambar atau PDF.',
      'Meneruskan file ke kerabat agar dicek bersama.',
      'Membalas pesan untuk memastikan pengirim adalah kerabat.',
    ],
    kunci: 1,
    ulasan:
      'File .apk dari nomor tak dikenal adalah modus umum penyebaran malware. Undangan resmi berformat gambar, PDF, atau tautan halaman web, dan tidak pernah meminta izin akses SMS maupun kontak.',
  },
  {
    id: 2,
    kategori: 'Modus Keluarga Palsu',
    ringkas: 'Panggilan darurat mengaku anak ditangkap polisi...',
    pertanyaan:
      'Telepon masuk mengaku anakmu sedang ditahan polisi dan meminta segera mentransfer uang jaminan. Nomor itu tidak tersimpan di ponselmu. Langkah pertama yang paling tepat adalah...',
    opsi: [
      'Segera transfer agar anak segera dibebaskan.',
      'Hubungi anak atau anggota keluarga lain lewat nomor yang kamu simpan sendiri untuk memastikan kondisinya.',
      'Kirim uang ke rekening yang diminta karena polisi membutuhkan jaminan.',
      'Telepon balik nomor tersebut untuk menawar nominal.',
    ],
    kunci: 1,
    ulasan:
      'Penipu memanfaatkan kepanikan dengan mengaku keluarga yang bermasalah. Selalu verifikasi lewat nomor yang sudah kamu kenal sebelum mentransfer apa pun.',
  },
  {
    id: 3,
    kategori: 'Modus Situs Tiruan Bank',
    ringkas: 'Link verifikasi akun perbankan mencurigakan...',
    pertanyaan:
      'Kamu menerima pesan yang mengaku dari bank dan meminta verifikasi akun lewat tautan dengan alamat situs yang mirip nama bank, namun tidak persis. Apa yang sebaiknya kamu lakukan?',
    opsi: [
      'Membuka tautan dan mengisi data rekening agar akun tetap aman.',
      'Mengabaikan tautan, lalu membuka aplikasi resmi bank atau menghubungi call center dari nomor di kartu ATM.',
      'Meneruskan tautan ke keluarga agar ikut memverifikasi.',
      'Membalas pesan untuk meminta penjelasan bank.',
    ],
    kunci: 1,
    ulasan:
      'Situs tiruan dibuat agar mirip alamat resmi. Verifikasi selalu dilakukan lewat aplikasi resmi atau call center yang tercantum di kartu ATM, bukan lewat tautan di pesan. Sumber: OJK / Satgas PASTI.',
  },
  {
    id: 4,
    kategori: 'Modus Tugas Berkomisi',
    ringkas: 'Tawaran like video YouTube komisi bertahap...',
    pertanyaan:
      'Pengguna ditawari komisi Rp 50.000 hanya dengan like 3 video YouTube, namun di tugas ke-4 diminta setor deposit Rp 200.000 agar saldo cair. Sikap yang paling tepat adalah...',
    opsi: [
      'Tolak mentah-mentah dan hentikan komunikasi karena pekerjaan resmi tidak pernah meminta pelamar menyetor uang deposit.',
      'Transfer Rp 200.000 dulu untuk membuktikan kebenaran komisi.',
      'Minta potongan deposit dari komisi yang sudah didapat sebelumnya.',
      'Ajak teman lain bergabung agar deposit bisa dibagi dua.',
    ],
    kunci: 0,
    ulasan:
      'Pekerjaan paruh waktu resmi tidak pernah membebankan modal talangan atau deposit awal pada pelamar. Iming-iming komisi Rp 50.000 adalah trik psikologis klasik penipu. Sumber: Satgas PASTI / OJK 157.',
  },
  {
    id: 5,
    kategori: 'Modus Pinjol Ilegal',
    ringkas: 'Penipuan pinjaman kilat tanpa agunan di WhatsApp...',
    pertanyaan:
      'Penawaran pinjaman kilat tanpa agunan beredar di WhatsApp dengan bunga rendah dan proses 5 menit. Peminjam diminta membayar biaya administrasi di muka. Sikap yang tepat adalah...',
    opsi: [
      'Membayar biaya administrasi agar pencairan dana tidak tertunda.',
      'Menolak dan memilih lembaga pinjaman berizin, karena pemberi pinjaman resmi tidak memungut biaya di muka.',
      'Meminjam nominal kecil dulu untuk menguji kepercayaan.',
      'Menunda pembayaran sampai dana cair.',
    ],
    kunci: 1,
    ulasan:
      'Permintaan biaya di muka adalah ciri pinjol ilegal. Lembaga berizin tidak memungut biaya apa pun sebelum dana dicairkan. Sumber: OJK.',
  },
  {
    id: 6,
    kategori: 'Modus Kurir Palsu',
    ringkas: 'Modus kurir meminta konfirmasi nomor resi lewat form...',
    pertanyaan:
      'Seorang kurir mengirim tautan form untuk mengonfirmasi nomor resi, lalu meminta alamat lengkap dan kode OTP paket. Apa tindakan yang paling aman?',
    opsi: [
      'Mengisi form dan kode OTP agar paket segera dikirim.',
      'Tidak mengisi form maupun menyebutkan kode OTP, lalu menghubungi kurir lewat aplikasi belanja resmi.',
      'Mengirim kode OTP ke nomor yang menelepon karena sudah ada nomor resi.',
      'Meminta tetangga mengisi form tersebut.',
    ],
    kunci: 1,
    ulasan:
      'Nomor resi tidak pernah memerlukan kode OTP. Form pengiriman ulang yang diminta lewat tautan adalah upaya mengambil alih akun belanja atau rekening yang terhubung.',
  },
  {
    id: 7,
    kategori: 'Modus Hadiah & Undian',
    ringkas: 'Hadiah undian belanja online mengatasnamakan marketplace...',
    pertanyaan:
      'Pesan menyatakan kamu memenangkan hadiah undian dari marketplace besar, dengan syarat membayar pajak hadiah ke rekening pribadi. Bagaimana responsmu?',
    opsi: [
      'Segera bayar pajak hadiah agar hadiah tidak hangus.',
      'Abaikan dan cek keabsahan undian lewat kanal resmi marketplace tersebut.',
      'Menawar agar pajak dikurangi setengahnya.',
      'Mengabari teman agar ikut klaim hadiah.',
    ],
    kunci: 1,
    ulasan:
      'Undian resmi tidak meminta pembayaran ke rekening pribadi dan biasanya diumumkan lewat situs resmi penyelenggara. Sumber: Satgas PASTI / OJK 157.',
  },
  {
    id: 8,
    kategori: 'Modus Investasi Bodong',
    ringkas: 'Investasi aset kripto bot trading auto-profit...',
    pertanyaan:
      'Sebuah grup mengajak berinvestasi pada bot trading kripto dengan jaminan untung tetap 3% setiap hari dan dana bisa ditarik kapan saja. Apa yang paling perlu dicurigai?',
    opsi: [
      'Jaminan untung tetap setiap hari, yang tidak wajar bagi investasi berisiko.',
      'Minimal setoran awal yang kecil.',
      'Penggunaan grup media sosial untuk pengumuman.',
      'Ketersediaan fitur penarikan dana.',
    ],
    kunci: 0,
    ulasan:
      'Tidak ada investasi yang memberi untung tetap dan pasti. Iming-iming hasil harian adalah ciri investasi bodong yang mengandalkan dana peserta baru. Sumber: OJK.',
  },
  {
    id: 9,
    kategori: 'Modus Pemintaan OTP',
    ringkas: 'Permintaan kode OTP dengan dalih pembaruan sistem...',
    pertanyaan:
      'Seorang yang mengaku petugas bank menelepon dan meminta kode OTP yang baru saja masuk ke ponselmu untuk "pembaruan sistem". Apa yang harus kamu lakukan?',
    opsi: [
      'Menyebutkan kode OTP karena petugas bank mengetahui namamu.',
      'Tidak pernah menyebutkan kode OTP dan segera menghubungi bank lewat nomor resmi.',
      'Menyebutkan sebagian angka saja sebagai jalan tengah.',
      'Meminta orang lain menyetujui permintaan tersebut.',
    ],
    kunci: 1,
    ulasan:
      'OTP adalah kunci terakhir akunmu. Lembaga resmi tidak pernah memintanya lewat telepon, pesan, maupun chat. Sumber: OJK / Satgas PASTI.',
  },
  {
    id: 10,
    kategori: 'Penanganan Pasca-Kerugian',
    ringkas: 'Langkah pertama saat sadar telah mentransfer uang ke penipu...',
    pertanyaan:
      'Kamu baru sadar uang sudah masuk ke rekening penipu. Apa langkah pertama yang paling tepat?',
    opsi: [
      'Segera menghubungi bank untuk memblokir transaksi, lalu melaporkan ke OJK 157 dan Kepolisian.',
      'Menghapus riwayat transaksi agar tidak ada catatan.',
      'Menghubungi penipu untuk meminta pengembalian dana.',
      'Menunggu dana kembali otomatis.',
    ],
    kunci: 0,
    ulasan:
      'Segera hubungi bank agar transaksi dikunci, laporkan ke Call Center OJK 157 dan Polri, lalu simpan bukti percakapan serta transfer. Makin cepat dilaporkan, makin besar peluang dana tertahan. Sumber: OJK.',
  },
]

export const SOAL_KOSONG = {
  id: 0,
  kategori: 'Kategori Baru',
  ringkas: 'Belum ada naskah soal...',
  pertanyaan: '',
  opsi: ['', '', '', ''],
  kunci: 0,
  ulasan: '',
}
