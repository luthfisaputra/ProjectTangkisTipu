import { JALUR_META } from '../data/setSoal.js'

const KARTU = (label, nilai, catatan, ikon, nada, badgeClass, badgeIkon) => ({
  label,
  nilai,
  catatan,
  ikon,
  nada,
  badgeClass,
  badgeIkon,
})

export default function SetSoalStats({ sets = [] }) {
  const total = sets.length
  const aktif = sets.filter((s) => s.status === 'aktif').length
  const terjadwal = sets.filter((s) => s.status === 'terjadwal').length
  const draf = sets.filter((s) => s.status === 'draf').length
  const retensi = sets.filter((s) => s.tipe === 'retensi').length
  const jalur = Object.keys(JALUR_META).length

  const kartu = [
    KARTU(
      'Total Set Soal',
      total,
      `${aktif} aktif digunakan peserta`,
      'quiz',
      'text-primary',
      'bg-safe-green-light text-tertiary',
      'check_circle'
    ),
    KARTU(
      'Jalur Pengguna',
      jalur,
      'Anak, Dewasa, Lansia',
      'family_restroom',
      'text-primary',
      'bg-safe-green-light text-tertiary',
      'groups'
    ),
    KARTU(
      'Tes Ulang 14 Hari',
      retensi,
      `${terjadwal} menunggu jadwal rilis`,
      'history_edu',
      'text-secondary',
      'bg-warning-yellow-light text-secondary',
      'update'
    ),
    KARTU(
      'Draf Belum Rilis',
      draf,
      draf > 0 ? 'Perlu direview sebelum dirilis' : 'Semua set sudah dirilis',
      'edit_note',
      'text-on-surface-variant',
      draf > 0 ? 'bg-danger-red-light text-danger-red' : 'bg-safe-green-light text-tertiary',
      draf > 0 ? 'pending_actions' : 'task_alt'
    ),
  ]

  return (
    <section aria-label="Ringkasan set soal" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
      {kartu.map((k) => (
        <div
          className="bg-surface-white p-space-lg rounded-xl shadow-sm flex items-center justify-between gap-space-md hover:shadow-md transition-shadow"
          key={k.label}
        >
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-text-muted">{k.label}</span>
            <span className={`font-display text-headline-lg ${k.nada} mt-1`}>{k.nilai}</span>
            <span
              className={`inline-flex items-center gap-1 mt-1 font-label-sm text-label-sm ${k.badgeClass}`}
            >
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
