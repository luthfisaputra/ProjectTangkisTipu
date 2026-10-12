const TONE = {
  danger: 'bg-danger-red-light text-danger-red',
  warning: 'bg-warning-yellow-light text-secondary',
  safe: 'bg-safe-green-light text-tertiary',
  neutral: 'bg-surface-variant text-on-surface-variant',
}

const KATEGORI = [
  {
    tone: 'danger',
    tagIcon: 'payments',
    tagText: 'Kasus Kritis: Transaksi Finansial',
    title: 'Uang Sudah Terlanjur Ditransfer ke Pelaku',
    desc: 'Jika transaksi baru terjadi dalam hitungan menit atau beberapa jam, fokus utama Anda adalah menghentikan pencairan dana melalui isolasi rekening bank pelaku.',
    kanalUtama: 'IASC & Call Center Bank',
    instansi: {
      title: 'Indonesia Anti-Scam Centre (IASC) & Bank Terkait',
      desc: 'Pusat penanganan penipuan transaksi keuangan yang terintegrasi antara OJK dan perbankan nasional.',
    },
    actions: [{ label: 'Kunjungi Portal Resmi', href: 'https://ojk.go.id' }],
    kolom: [
      {
        label: 'Hotline Resmi Bank Populer',
        kind: 'pairs',
        bold: 'v',
        items: [
          { k: 'HaloBCA', v: '1500888' },
          { k: 'Mandiri Call', v: '14000' },
          { k: 'Contact Center BRI', v: '1500017' },
          { k: 'BNI Call', v: '1500046' },
        ],
      },
      {
        label: 'Dokumen Wajib',
        kind: 'steps',
        items: [
          'Bukti transfer lengkap (Ref ID/RRN)',
          'Nomor rekening dan bank pelaku',
          'Kronologi singkat transaksi',
        ],
      },
    ],
  },
  {
    tone: 'warning',
    tagIcon: 'trending_down',
    tagText: 'Entitas Keuangan Tanpa Izin',
    title: 'Terjerat Pinjol Ilegal atau Investasi Fiktif',
    desc: 'Mengalami ancaman sebar data pribadi oleh aplikasi pinjol yang tidak berizin OJK, atau terjebak skema investasi robot trading dan tugas berbayar (like/review palsu).',
    kanalUtama: 'Satgas PASTI & OJK 157',
    instansi: {
      title: 'Satgas Pemberantasan Aktivitas Keuangan Ilegal (Satgas PASTI)',
      desc: 'Koordinasi 16 kementerian/lembaga untuk penutupan aplikasi dan pemblokiran rekening entitas ilegal.',
    },
    actions: [{ label: 'Portal Kontak OJK 157', href: 'https://kontak157.ojk.go.id' }],
    kolom: [
      {
        label: 'Saluran Layanan',
        kind: 'pairs',
        bold: 'v',
        items: [
          { k: 'Telepon', v: '157 (Senin–Jumat, jam kerja)' },
          { k: 'WhatsApp Pengaduan', v: '081-157-157-157' },
          { k: 'Surel', v: 'satgaspasti@ojk.go.id' },
        ],
      },
      {
        label: 'Dokumen Wajib',
        kind: 'steps',
        items: [
          'Nama aplikasi atau URL situs investasi',
          'Tangkapan layar ancaman menghubungi kontak darurat',
          'Bukti perjanjian atau bukti transfer modal',
        ],
      },
    ],
  },
  {
    tone: 'safe',
    tagIcon: 'link_off',
    tagText: 'Basis Data Komunikasi Digital',
    title: 'Menerima File .APK, Tautan Phishing, atau Nomor Telepon Spam',
    desc: 'Bantu melindungi masyarakat lain dengan melaporkan rekam jejak nomor WhatsApp penipu serta memblokir rekening tujuan sebelum jatuh korban baru.',
    kanalUtama: 'CekRekening.id & AduanNomor.id',
    instansi: {
      title: 'Kementerian Komunikasi dan Digital (Komdigi)',
      desc: 'Penyedia basis data verifikasi rekening penipuan serta penindakan pemblokiran nomor GSM.',
    },
    actions: [
      { label: 'CekRekening.id', href: 'https://cekrekening.id' },
      { label: 'AduanNomor.id', href: 'https://aduannomor.id' },
    ],
    kolom: [
      {
        label: 'Fungsi Penindakan',
        kind: 'pairs',
        bold: 'k',
        items: [
          { k: 'CekRekening:', v: 'memberikan label waspada pada rekening penipu saat diperiksa publik.' },
          { k: 'AduanNomor:', v: 'koordinasi dengan operator seluler untuk pemblokiran nomor pelaku.' },
        ],
      },
      {
        label: 'Dokumen Wajib',
        kind: 'steps',
        items: [
          'Nomor telepon pelaku dan tangkapan layar SMS/WA',
          'Nama bank dan nomor rekening yang dituju',
          'Berkas file APK atau URL phishing (jangan dibuka)',
        ],
      },
    ],
  },
  {
    tone: 'neutral',
    tagIcon: 'gavel',
    tagText: 'Penegakan Hukum Pidana',
    title: 'Kerugian Materil Signifikan & Penyelidikan Siber',
    desc: 'Dibutuhkan surat laporan polisi resmi (LP) untuk proses hukum pidana pelaku kejahatan UU ITE dan sebagai syarat pembekuan dana permanen oleh perbankan.',
    kanalUtama: 'Patroli Siber & SPKT Polri',
    instansi: {
      title: 'Direktorat Tindak Pidana Siber Bareskrim Polri',
      desc: 'Pelaporan kejahatan penipuan siber daring untuk penindakan aparat hukum.',
    },
    actions: [{ label: 'Portal Patroli Siber', href: 'https://patrolisiber.id' }],
    kolom: [
      {
        label: 'Langkah Pembuatan LP',
        kind: 'steps',
        items: [
          'Buat aduan awal di situs patrolisiber.id.',
          'Datangi SPKT Polres terdekat dengan berkas cetak bukti transfer dan riwayat percakapan.',
          'Minta Surat Tanda Penerimaan Laporan (STPL).',
        ],
      },
      {
        label: 'Kanal Pelengkap',
        kind: 'paragraph',
        items: [
          'Untuk penanganan pengaduan instansi publik terpadu, gunakan portal nasional lapor.go.id (SP4N-LAPOR!) yang diawasi Ombudsman RI dan KemenPAN-RB.',
        ],
      },
    ],
  },
]

function KolomIsi({ kolom }) {
  return (
    <div>
      <span className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">{kolom.label}</span>
      {kolom.kind === 'pairs' && (
        <div className="flex flex-col gap-1 text-text-muted leading-relaxed">
          {kolom.items.map((item) => (
            <span key={item.k}>
              {kolom.bold === 'v'
                ? <>{item.k}: <strong className="text-on-surface font-semibold">{item.v}</strong></>
                : <><strong className="text-on-surface font-semibold">{item.k}</strong> {item.v}</>}
            </span>
          ))}
        </div>
      )}
      {kolom.kind === 'steps' && (
        <ol className="flex flex-col gap-1 text-text-muted leading-relaxed list-decimal pl-5 marker:text-primary marker:font-semibold">
          {kolom.items.map((item) => <li key={item}>{item}</li>)}
        </ol>
      )}
      {kolom.kind === 'paragraph' && (
        <p className="text-text-muted leading-relaxed">{kolom.items[0]}</p>
      )}
    </div>
  )
}

export default function KanalDirektoriLapor() {
  return (
    <section className="w-full bg-surface-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="max-w-2xl mb-14 md:mb-16 reveal">
          <span
            className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold block mb-2">03
            / Direktori Institusi Resmi</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-4">
            Ke Mana Anda Harus Melapor Sesuai Jenis Masalah?
          </h2>
          <p className="font-body-md text-body-md text-text-muted leading-relaxed">
            Pilih kategori yang paling menggambarkan situasi Anda saat ini untuk melihat institusi resmi
            negara yang berwenang, kanal kontak langsung, serta berkas wajib yang harus disiapkan.
          </p>
        </div>

        <div className="space-y-8">
          {KATEGORI.map((item) => (
            <div
              key={item.title}
              className="bg-surface-cream border border-border-subtle/50 rounded-2xl p-8 md:p-10 shadow-sm flex flex-col lg:flex-row gap-8 items-start reveal">
              <div className="lg:w-1/3 flex flex-col">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${TONE[item.tone]} font-label-sm text-label-sm font-semibold w-fit mb-4`}>
                  <span className="material-symbols-outlined text-[16px]">{item.tagIcon}</span>
                  <span>{item.tagText}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">{item.title}</h3>
                <p className="font-body-md text-body-md text-text-muted leading-relaxed mb-6">{item.desc}</p>
                <div className="bg-surface-white rounded-xl p-4 mt-auto">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Kanal Utama</span>
                  <span className="font-body-md text-body-md text-primary font-bold">{item.kanalUtama}</span>
                </div>
              </div>

              <div className="lg:w-2/3 w-full flex flex-col gap-6">
                <div className="bg-surface-white p-6 rounded-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">{item.instansi.title}</h4>
                      <p className="font-body-sm text-body-sm text-text-muted">{item.instansi.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {item.actions.map((action) => (
                        <a key={action.href}
                          className="inline-flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-xl font-label-md text-label-md hover:bg-primary-container transition-all"
                          href={action.href} rel="noopener noreferrer" target="_blank">
                          <span>{action.label}</span>
                          <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-body-sm text-on-surface-variant font-body-sm">
                    {item.kolom.map((kolom) => <KolomIsi key={kolom.label} kolom={kolom} />)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
