const TONE = {
  danger: { box: 'bg-danger-red-light text-danger-red', label: 'text-danger-red' },
  warning: { box: 'bg-warning-yellow-light text-secondary', label: 'text-secondary' },
  safe: { box: 'bg-safe-green-light text-tertiary-container', label: 'text-tertiary-container' },
}

const PRINSIP = [
  {
    tone: 'danger',
    icon: 'sync_problem',
    label: 'Prinsip 01',
    title: 'Waspadai Jebakan “Recovery Scam”',
    desc: 'Pelaku atau sindikat lain sering menyamar di media sosial sebagai “hacker putih”, konsultan pengembalian dana, atau oknum pengadilan yang menjanjikan uang Anda kembali asal membayar deposit di muka.',
    noteTitle: 'Fakta Hukum:',
    note: 'Tidak ada lembaga swasta yang berwenang menarik saldo dari rekening Anda tanpa putusan pengadilan atau blokir resmi IASC.',
  },
  {
    tone: 'warning',
    icon: 'phonelink_lock',
    label: 'Prinsip 02',
    title: 'Amankan Perangkat & Akses Finansial',
    desc: 'Jika penipuan melibatkan instalasi file APK (surat undangan, paket, tilang) atau tautan perbankan palsu, segera putuskan koneksi internet (mode pesawat), hapus aplikasi asing, dan ubah PIN m-Banking dari ponsel lain yang bersih.',
    noteTitle: 'Tindakan Cepat:',
    note: 'Matikan akses SMS forwarder dan hubungi CS operator seluler bila sinyal tiba-tiba mati mendadak (modus SIM swap).',
  },
  {
    tone: 'safe',
    icon: 'account_balance',
    label: 'Prinsip 03',
    title: 'Pahami Batas Kewenangan Tiap Lembaga',
    desc: 'Jangan langsung berangkat ke kantor polisi sebelum mengamankan rekening Anda di bank penerbit. Polisi berwenang pada penyelidikan pidana, sedangkan isolasi lalu lintas saldo bank ditangani oleh bank Anda bersama IASC/OJK.',
    noteTitle: 'Urutan Prioritas:',
    note: 'Prioritaskan: hentikan transaksi bank (menit ke-0) → dokumentasi bukti (jam ke-1) → laporan polisi dan OJK (hari ke-1).',
  },
]

export default function KanalPrinsipDasar() {
  return (
    <section className="w-full bg-surface-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="max-w-2xl mb-14 md:mb-20 reveal">
          <span
            className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold block mb-2">01
            / Fondasi Psikologis &amp; Keamanan</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-4">
            Tiga Hal Wajib Dipahami Sebelum Mengambil Tindakan
          </h2>
          <p className="font-body-md text-body-md text-text-muted leading-relaxed">
            Kebanyakan korban kehilangan dana tambahan bukan karena penipuan awal, melainkan karena
            keputusan impulsif dalam 2 jam setelah kejadian. Pahami tiga prinsip pertahanan berikut:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 md:grid-rows-[1fr_auto]">
          {PRINSIP.map((item, i) => {
            const tone = TONE[item.tone]
            return (
              <div
                key={item.label}
                className={`bg-surface-cream border border-border-subtle/50 p-8 rounded-2xl shadow-sm flex flex-col justify-between md:grid md:grid-rows-[subgrid] md:row-span-2 reveal ${i === 1 ? 'reveal-2' : i === 2 ? 'reveal-3' : ''}`}>
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl ${tone.box} flex items-center justify-center mb-6`}>
                    <span className="material-symbols-outlined text-[26px]">{item.icon}</span>
                  </div>
                  <span
                    className={`font-label-sm text-label-sm ${tone.label} font-mono font-bold uppercase block mb-1`}>{item.label}</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">{item.title}</h3>
                  <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-8 pt-4 bg-surface-container-low rounded-xl p-4">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold block mb-0.5">{item.noteTitle}</span>
                  <span className="font-body-sm text-body-sm text-text-muted leading-normal">{item.note}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
