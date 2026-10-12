export const modul01Dewasa = {
  id: 'dewasa-01',
  num: '01',
  jalur: 'Jalur Dewasa & Karier',
  kategori: 'APK Penyamar',
  durasi: '4 Menit',
  level: 'Dasar',
  title: 'File .apk Undangan & Resi Palsu',
  icon: 'install_mobile',
  kasusTitle: 'Kasus Nyata: Budi (34 Tahun)',
  studiKasus: (
    <>Budi (34) menerima file <em>undangan-hajatan.apk</em> dari nomor tak dikenal dengan pesan "undangan pernikahan
      dari teman lama". Ia menginstalnya agar bisa membuka undangan. Dua jam kemudian saldo tabungan Rp45.000.000 raib,
      terbaca pelaku lewat SMS yang masuk ke ponselnya.</>
  ),
  langkah: [
    { title: 'Umpan dari nomor asing', desc: 'Pelaku mengirim file .apk berkedok undangan nikah, resi paket, tagihan listrik/BPJS/pajak, atau surat tilang lewat WhatsApp.' },
    { title: 'File dipercaya & dipasang', desc: 'Korban memasang aplikasi agar "bisa melihat" isinya. Padahal aplikasi jahat itu bisa membaca kontak, SMS, dan kata sandi.' },
    { title: 'SMS & perbankan dibajak', desc: 'Setiap kode OTP yang masuk dibaca aplikasi jahat, lalu uang berpindah tanpa sepengetahuan pemilik.' },
  ],
  ciri: [
    'Pengirim asing yang mengirim file, bukan tautan resmi',
    'Nama file berakhiran .apk (undangan, resi, tagihan, tilang)',
    'Bahasa mendesak: "segera buka" atau "lihat bukti pelanggaran"',
    'Nomor pengirim tidak dikenal dan tidak bisa diverifikasi',
  ],
  simulasi: {
    pengirim: 'Nomor tak dikenal',
    pesan: 'Resi paket Anda sudah keluar, buka file resi.apk untuk melihat detailnya.',
    pilihan: [
      {
        benar: false,
        teks: 'Buka filenya supaya tahu isi resinya',
        hasil: 'Aplikasi jahat terpasang dan bisa membaca SMS berisi kode OTP rekening Anda.',
      },
      {
        benar: true,
        teks: 'Jangan buka. Cek resi lewat aplikasi atau situs resmi ekspedisi/marketplace',
        hasil: 'Verifikasi lewat kanal resmi membuat file berbahaya tidak pernah terpasang.',
      },
    ],
  },
  lakukan: [
    'Jangan instal file .apk dari chat, apa pun alasannya.',
    'Pasang aplikasi hanya dari Google Play Store, bukan dari tautan kiriman orang.',
    'Nomor asing mengirim file? Abaikan, lalu blokir nomornya.',
  ],
  terlanjur: [
    'Aktifkan mode pesawat segera agar aplikasi jahat berhenti mengirim data.',
    'Hubungi bank untuk memblokir akses mobile banking dan kartu Anda.',
    'Lapor ke IASC (iasc.ojk.go.id) dan polisi; laporkan juga nomor pelaku.',
  ],
  lapor: [
    { nama: 'iasc.ojk.go.id', desc: 'Lapor kasus penipuan ke IASC OJK' },
    { nama: 'Kontak OJK 157', desc: 'Aduan dan informasi layanan keuangan' },
    { nama: 'cekrekening.id', desc: 'Cek dan lapor rekening penipu' },
    { nama: 'patrolisiber.id', desc: 'Lapor kejahatan siber ke Polri' },
  ],
  ingat: 'File .apk dari nomor asing selalu berbahaya, termasuk yang berkedok undangan atau resi.',
  mentor: {
    img: '/assets/Dewasa.png',
    nama: 'Mentor Siaga Dewasa',
    peran: 'Karier & Keuangan',
    quote: <>Menerima file <strong className="text-danger-red font-semibold">.apk dari nomor asing</strong>? Jangan
      buka—konfirmasi dulu lewat kanal resmi.</>,
  },
}
