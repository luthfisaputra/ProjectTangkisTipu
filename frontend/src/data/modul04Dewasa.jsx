export const modul04Dewasa = {
  id: 'dewasa-04',
  num: '04',
  jalur: 'Jalur Dewasa & Karier',
  kategori: 'Tawaran Kerja Palsu',
  durasi: '3 Menit',
  level: 'Analisis Pesan',
  title: 'Tawaran Kerja & Deposit Paruh Waktu Palsu',
  icon: 'badge',
  kasusTitle: 'Kasus Nyata: Sinta (24 Tahun)',
  studiKasus: (
    <>Sinta (24), mahasiswa, ditawari kerja sampingan "menyukai video dan memberi rating". Komisi Rp30.000 cair. Lalu
      ia diminta deposit Rp500.000 untuk "naik level"; setoran terus bertambah hingga uangnya tak bisa ditarik
      sama sekali.</>
  ),
  langkah: [
    { title: 'Rekrutmen instan', desc: 'Perekrutan lewat WhatsApp atau Telegram oleh orang tak dikenal, tanpa wawancara atau kontrak resmi.' },
    { title: 'Komisi kecil dibayar', desc: 'Tugas ringan berkomisi; komisi kecil di awal benar-benar dibayar sebagai umpan kepercayaan.' },
    { title: 'Deposit untuk "naik level"', desc: 'Korban diminta menyetor uang untuk membuka tugas dengan komisi yang lebih besar.' },
    { title: 'Dana tak bisa ditarik', desc: 'Setelah setoran besar masuk, penarikan ditunda-tunda dan admin menghilang.' },
  ],
  ciri: [
    'Pekerjaan sangat mudah dengan bayaran tinggi',
    'Diminta setor uang (deposit) untuk bekerja atau menarik gaji',
    'Tidak ada kontrak, alamat kantor, atau kontak yang bisa diverifikasi',
    'Komisi kecil di awal dibayar cepat untuk membangun kepercayaan',
  ],
  simulasi: {
    pengirim: 'Admin "HRD" di WhatsApp',
    pesan: 'Tugas sudah 3 hari, komisi Rp400 ribu siap cair. Transfer deposit Rp2.000.000 dulu untuk naik level, ya.',
    pilihan: [
      {
        benar: false,
        teks: 'Transfer depositnya biar komisi besar bisa cair',
        hasil: 'Setoran tidak kembali dan komisi tetap tidak dibayar.',
      },
      {
        benar: true,
        teks: 'Berhenti. Perusahaan sungguhan tidak pernah minta setoran; simpan bukti chat dan lapor',
        hasil: 'Anda terhindar dari jebakan deposit dan bukti chat siap dilaporkan.',
      },
    ],
  },
  lakukan: [
    'Kerja sungguhan tidak pernah meminta Anda membayar.',
    'Anggap komisi kecil di awal sebagai umpan, bukan penghasilan.',
    'Verifikasi perusahaan lewat situs dan kontak resmi sebelum menerima tawaran.',
  ],
  terlanjur: [
    'Hentikan setoran dan jangan ikuti instruksi "pencairan terakhir".',
    'Simpan bukti chat, bukti transfer, dan identitas pelaku.',
    'Lapor ke IASC dan blokir rekening penerima lewat cekrekening.id.',
  ],
  lapor: [
    { nama: 'iasc.ojk.go.id', desc: 'Lapor kasus penipuan ke IASC OJK' },
    { nama: 'Kontak OJK 157', desc: 'Aduan dan informasi layanan keuangan' },
    { nama: 'cekrekening.id', desc: 'Cek dan lapor rekening penipu' },
    { nama: 'patrolisiber.id', desc: 'Lapor kejahatan siber ke Polri' },
  ],
  ingat: 'Lowongan yang meminta setoran dulu selalu berbahaya.',
  mentor: {
    img: '/assets/Dewasa.png',
    nama: 'Mentor Siaga Dewasa',
    peran: 'Karier & Keuangan',
    quote: <>Diminta <strong className="text-danger-red font-semibold">setor dulu untuk kerja</strong>? Perusahaan
      resmi tidak pernah meminta uang.</>,
  },
}
