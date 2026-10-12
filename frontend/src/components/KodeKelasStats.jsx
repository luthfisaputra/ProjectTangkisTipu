// Empat kartu ringkasan halaman Kode Kelas — nilai diambil dari data backend
// nyata (jumlahPeserta, jumlahSet, active). Tidak ada angka palsu.

export default function KodeKelasStats({ kelompok = [] }) {
  const totalPeserta = kelompok.reduce((a, k) => a + (k.jumlahPeserta || 0), 0)
  const totalSet = kelompok.reduce((a, k) => a + (k.jumlahSet || 0), 0)
  const aktif = kelompok.filter((k) => k.active).length
  const nonaktif = kelompok.length - aktif

  const kartu = [
    {
      label: 'Total Kode Kelas',
      nilai: kelompok.length,
      catatan: `${aktif} aktif, ${nonaktif} nonaktif`,
      ikon: 'diversity_3',
      nada: 'text-primary',
      badgeClass: 'bg-safe-green-light text-tertiary',
      badgeIkon: 'check_circle',
    },
    {
      label: 'Total Peserta Tergabung',
      nilai: totalPeserta,
      catatan: 'Seluruh identitas tersimpan anonim',
      ikon: 'badge',
      nada: 'text-primary',
      badgeClass: 'bg-safe-green-light text-tertiary',
      badgeIkon: 'groups',
    },
    {
      label: 'Total Set Soal Terhubung',
      nilai: totalSet,
      catatan: 'Relasi kode kelas ↔ set soal',
      ikon: 'library_books',
      nada: 'text-tertiary',
      badgeClass: 'bg-safe-green-light text-tertiary',
      badgeIkon: 'link',
    },
    {
      label: 'Kode Aktif',
      nilai: `${kelompok.length ? Math.round((aktif / kelompok.length) * 100) : 0}%`,
      catatan: `${aktif} dari ${kelompok.length} kode bisa dipakai peserta`,
      ikon: 'task_alt',
      nada: aktif >= nonaktif ? 'text-tertiary' : 'text-secondary',
      badgeClass: aktif >= nonaktif ? 'bg-safe-green-light text-tertiary' : 'bg-warning-yellow-light text-secondary',
      badgeIkon: aktif >= nonaktif ? 'task_alt' : 'schedule',
    },
  ]

  return (
    <section aria-label="Ringkasan kode kelas" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
      {kartu.map((k) => (
        <div
          className="bg-surface-white p-space-lg rounded-xl shadow-sm flex items-center justify-between gap-space-md hover:shadow-md transition-shadow"
          key={k.label}
        >
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-text-muted">{k.label}</span>
            <span className={`font-display text-headline-lg ${k.nada} mt-1`}>{k.nilai}</span>
            <span className={`inline-flex items-center gap-1 mt-1 font-label-sm text-label-sm ${k.badgeClass}`}>
              <span aria-hidden="true" className="material-symbols-outlined text-[14px]">{k.badgeIkon}</span>
              {k.catatan}
            </span>
          </div>
          <div className={`w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0 ${k.nada}`}>
            <span aria-hidden="true" className="material-symbols-outlined text-[26px]">{k.ikon}</span>
          </div>
        </div>
      ))}
    </section>
  )
}
