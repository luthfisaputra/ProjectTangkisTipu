const FASE = [
  {
    title: 'Isolasi Saldo & Hubungi Bank Anda',
    intro: 'Segera telepon call center resmi bank asal rekening Anda. Minta petugas customer service untuk:',
    items: [
      'Memblokir rekening m-Banking dan kartu ATM Anda untuk sementara.',
      'Mencatat nomor rekening bank tujuan (rekening pelaku) untuk diteruskan ke sistem pemblokiran interbank IASC.',
      'Meminta nomor tiket aduan resmi dari bank Anda.',
    ],
    noteTitle: 'Catatan Penting:',
    note: 'Gunakan hanya nomor telepon resmi bank. Jangan mencari nomor call center di Google Maps atau kolom komentar media sosial karena banyak yang dipalsukan.',
  },
  {
    title: 'Amankan Seluruh Jejak Bukti Digital',
    intro: 'Sebelum memblokir kontak pelaku atau menghapus chat, amankan dokumentasi yang sah secara hukum:',
    items: [
      'Tangkapan layar riwayat percakapan dari awal, tanpa mengedit atau mengaburkan jam dan tanggal.',
      'Bukti transfer bank asli yang memuat nomor referensi transaksi (RRN/Ref ID).',
      'Catat URL situs web palsu, tautan grup Telegram, atau nama akun marketplace.',
    ],
    noteTitle: 'Hindari Kesalahan:',
    note: 'Jangan merespons pelaku dengan makian yang membuatnya menghapus pesan untuk semua orang (Delete for Everyone).',
  },
  {
    title: 'Lapor Resmi ke Regulator & Siber Polri',
    intro: 'Gunakan bukti yang telah terstruktur rapi untuk memicu tindakan institusi berwenang:',
    items: [
      'Pelaporan nomor rekening pelaku ke CekRekening.id dan IASC.',
      'Pemblokiran nomor seluler/WhatsApp penipu lewat AduanNomor.id Komdigi.',
      'Penerbitan Surat Tanda Penerimaan Laporan (STPL) di SPKT Polres/Bareskrim.',
    ],
    noteTitle: 'Hasil Akhir:',
    note: 'Surat laporan polisi (LP) menjadi syarat wajib bila Anda ingin mengajukan pembukaan blokir rekening pelaku untuk mediasi pengembalian sisa dana.',
  },
]

export default function KanalGoldenPeriod() {
  return (
    <section className="w-full bg-surface-cream py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal">
          <div className="max-w-2xl">
            <span
              className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold block mb-2">02
              / Respon Bertahap</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-3">
              Garis Waktu “Golden Period” 24 Jam Pertama
            </h2>
            <p className="font-body-md text-body-md text-text-muted leading-relaxed">
              Sindikat penipuan biasanya memindahkan dana curian ke jaringan “rekening penampung
              bertingkat” (layering) dalam waktu 30 hingga 90 menit. Ketepatan waktu tindakan Anda
              sangat menentukan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:grid-rows-[1fr_auto]">
          {FASE.map((item, i) => (
            <div
              key={item.title}
              className={`bg-surface-container-lowest p-8 rounded-2xl shadow-sm relative flex flex-col justify-between lg:grid lg:grid-rows-[subgrid] lg:row-span-2 reveal ${i === 1 ? 'reveal-2' : i === 2 ? 'reveal-3' : ''}`}>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">{item.title}</h3>
                <p className="font-body-md text-body-md text-text-muted leading-relaxed mb-6">{item.intro}</p>
                <ul className="flex flex-col gap-2.5 mb-6 text-on-surface-variant font-body-sm text-body-sm">
                  {item.items.map((text) => (
                    <li key={text} className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-surface-container-low rounded-xl p-4 text-text-muted font-body-sm text-body-sm">
                <strong className="text-on-surface font-semibold block mb-1">{item.noteTitle}</strong>
                {item.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
