const BERKAS = [
  {
    num: '01',
    title: 'Bukti Transfer Asli',
    desc: 'Bukan struk salinan buram. Simpan resi PDF dari m-Banking yang memuat jelas nomor referensi transaksi, jam/menit transaksi, serta nomor rekening penerima.',
    tag: 'Wajib untuk Bank & LP',
  },
  {
    num: '02',
    title: 'Tangkapan Layar Chat',
    desc: 'Tangkapan layar percakapan secara utuh dan berurutan, dari pesan sapaan pertama hingga instruksi transfer. Pastikan nomor telepon pelaku di bagian atas tampak jelas.',
    tag: 'Bukti Percakapan Utuh',
  },
  {
    num: '03',
    title: 'Identitas Akun Pelaku',
    desc: 'Salin tautan profil media sosial (Instagram, Facebook), username Telegram, nama toko online di e-commerce, atau nomor WhatsApp yang digunakan untuk menghubungi Anda.',
    tag: 'Identitas Jejak Akun',
  },
  {
    num: '04',
    title: 'Kronologi Tertulis',
    desc: 'Tulis ringkasan singkat dalam 1 halaman: tanggal kejadian, narasi awal penipu (misalnya undian atau paket), total nominal kerugian, dan tanggal Anda menyadari adanya penipuan.',
    tag: 'Mempercepat BAP Polisi',
  },
]

export default function KanalChecklistBukti() {
  return (
    <section className="w-full bg-surface-cream py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="bg-surface-container-lowest rounded-2xl p-8 md:p-12 shadow-sm reveal">
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 pb-8 border-b border-border-subtle">
            <div className="lg:col-span-12 max-w-3xl">
              <span
                className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold block mb-2">04
                / Berkas Bukti</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-3">
                Daftar Periksa Berkas Sebelum Mengirim Laporan
              </h2>
              <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                Lebih dari 40% laporan ke kepolisian atau bank tertunda karena bukti yang diserahkan
                buram, terpotong, atau tidak memiliki nomor transaksi unik. Pastikan empat dokumen ini
                siap dan terorganisir di tangan Anda sebelum mendatangi kantor cabang bank
                maupun SPKT kepolisian.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:grid-rows-[1fr_auto]">
            {BERKAS.map((item, i) => (
              <div key={item.num} className={`bg-surface-cream p-6 rounded-xl flex flex-col justify-between lg:grid lg:grid-rows-[subgrid] lg:row-span-2 reveal ${i === 1 ? 'reveal-2' : i === 2 ? 'reveal-3' : i === 3 ? 'reveal-4' : ''}`}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary font-bold font-mono">{item.num}</span>
                    <span className="font-label-md text-label-md text-on-surface font-bold">{item.title}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-text-muted leading-relaxed mb-4">{item.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-tertiary-container font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
