import DropdownPilihan from './DropdownPilihan.jsx'
import { JALUR_META, STATUS_META, TIPE_META, formatTanggal } from '../data/setSoal.js'

function PilihFilter({ id, label, nilai, onChange, opsi }) {
  return (
    <div className="min-w-[170px]">
      <label className="sr-only" htmlFor={id}>{label}</label>
      <DropdownPilihan id={id} nilai={nilai} onChange={onChange} opsi={opsi} />
    </div>
  )
}

export default function SetSoalTable({
  sets = [],
  aktifId = null,
  filters = { q: '', jalur: '', tipe: '', status: '' },
  onUbahFilter = () => {},
  hitungSoal = () => 0,
  onEdit = () => {},
  onDuplikat = () => {},
  onHapus = () => {},
}) {
  const opsiJalur = [
    { value: '', label: 'Semua Jalur' },
    ...Object.entries(JALUR_META).map(([value, m]) => ({ value, label: m.label })),
  ]
  const opsiTipe = [
    { value: '', label: 'Semua Tipe' },
    ...Object.entries(TIPE_META).map(([value, m]) => ({ value, label: m.label })),
  ]
  const opsiStatus = [
    { value: '', label: 'Semua Status' },
    ...Object.entries(STATUS_META).map(([value, m]) => ({ value, label: m.label })),
  ]

  return (
    <section aria-label="Daftar set soal" className="flex flex-col gap-space-md">
      {/* Filter */}
      <div className="bg-surface-white p-space-md rounded-xl shadow-sm flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-space-md">
        <div className="flex flex-wrap items-center gap-space-sm flex-1">
          <div className="relative min-w-[260px] flex-1">
            <label className="sr-only" htmlFor="cari-set">Cari set soal</label>
            <span
              aria-hidden="true"
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-text-muted"
            >
              search
            </span>
            <input
              className="w-full h-12 pl-10 pr-4 rounded-xl border-0 bg-surface-cream text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container shadow-sm"
              id="cari-set"
              onChange={(e) => onUbahFilter('q', e.target.value)}
              placeholder="Cari nama set, ID, atau materi..."
              type="search"
              value={filters.q}
            />
          </div>

          <PilihFilter id="filter-jalur" label="Jalur pengguna" nilai={filters.jalur} onChange={(v) => onUbahFilter('jalur', v)} opsi={opsiJalur} />
          <PilihFilter id="filter-tipe" label="Tipe evaluasi" nilai={filters.tipe} onChange={(v) => onUbahFilter('tipe', v)} opsi={opsiTipe} />
          <PilihFilter id="filter-status" label="Status" nilai={filters.status} onChange={(v) => onUbahFilter('status', v)} opsi={opsiStatus} />
        </div>
      </div>

      {/* Tabel */}
      <div className="w-full bg-surface-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low font-label-md text-label-md text-on-surface-variant">
                <th className="py-space-md px-space-lg font-label-md" scope="col">Nama Set Soal</th>
                <th className="py-space-md px-space-md font-label-md" scope="col">Jalur Pengguna</th>
                <th className="py-space-md px-space-md font-label-md" scope="col">Tipe Evaluasi</th>
                <th className="py-space-md px-space-md font-label-md" scope="col">Jumlah Soal</th>
                <th className="py-space-md px-space-md font-label-md" scope="col">Tanggal Rilis</th>
                <th className="py-space-md px-space-md font-label-md" scope="col">Status</th>
                <th className="py-space-md px-space-lg text-right font-label-md" scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-body-sm font-body-sm text-on-surface">
              {sets.map((s) => {
                const jalur = JALUR_META[s.jalur]
                const tipe = TIPE_META[s.tipe]
                const status = STATUS_META[s.status]
                const sedangDibuka = s.id === aktifId
                return (
                  <tr
                    className={`${sedangDibuka ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-surface-container-low/60'} transition-colors`}
                    key={s.id}
                  >
                    <td className="py-space-lg px-space-lg">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-label-lg text-label-lg text-primary tracking-tight">{s.nama}</span>
                          {sedangDibuka && (
                            <span className="px-2 py-0.5 rounded text-[11px] font-label-sm bg-primary-container text-on-primary">
                              Sedang Dibuka
                            </span>
                          )}
                        </div>
                        <span className="text-text-muted font-body-sm text-body-sm">
                          ID: {s.id} • {s.catatan}
                          {s.kodeKelas ? ` • Kelas: ${s.kodeKelas}` : ''}
                        </span>
                      </div>
                    </td>
                    <td className="py-space-lg px-space-md">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                        <span aria-hidden="true" className="material-symbols-outlined text-[14px]">{jalur.icon}</span>
                        {jalur.label}
                      </span>
                    </td>
                    <td className="py-space-lg px-space-md">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-label-sm text-label-sm ${tipe.pill}`}>
                        {tipe.label}
                      </span>
                    </td>
                    <td className="py-space-lg px-space-md font-label-md text-label-md text-on-surface">
                      {hitungSoal(s.id)} Soal
                    </td>
                    <td className="py-space-lg px-space-md">
                      <div className="flex flex-col">
                        <span className="text-text-muted font-label-md">{formatTanggal(s.rilis)}</span>
                        {s.tutup && (
                          <span className="text-text-muted font-label-sm text-label-sm flex items-center gap-1">
                            <span aria-hidden="true" className="material-symbols-outlined text-[14px]">lock_clock</span>
                            Tutup {formatTanggal(s.tutup)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-space-lg px-space-md">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm text-label-sm ${status.pill}`}>
                        <span aria-hidden="true" className="material-symbols-outlined text-[14px]">{status.icon}</span>
                        {status.label}
                      </span>
                    </td>
                    <td className="py-space-lg px-space-lg text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                            sedangDibuka
                              ? 'bg-primary text-on-primary'
                              : 'text-primary-container hover:bg-surface-container'
                          }`}
                          onClick={() => onEdit(s.id)}
                          title="Sunting Set"
                          type="button"
                        >
                          <span aria-hidden="true" className="material-symbols-outlined text-[18px]">edit</span>
                          <span className="sr-only">Sunting set {s.nama}</span>
                        </button>
                        <button
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
                          onClick={() => onDuplikat(s.id)}
                          title="Duplikat Set"
                          type="button"
                        >
                          <span aria-hidden="true" className="material-symbols-outlined text-[18px]">content_copy</span>
                          <span className="sr-only">Duplikat set {s.nama}</span>
                        </button>
                        <button
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-danger-red hover:bg-danger-red-light transition-colors"
                          onClick={() => onHapus(s.id)}
                          title="Hapus Set"
                          type="button"
                        >
                          <span aria-hidden="true" className="material-symbols-outlined text-[18px]">delete</span>
                          <span className="sr-only">Hapus set {s.nama}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}

              {sets.length === 0 && (
                <tr>
                  <td className="py-space-2xl px-space-lg text-center" colSpan={7}>
                    <div className="flex flex-col items-center gap-space-sm text-text-muted">
                      <span aria-hidden="true" className="material-symbols-outlined text-[36px]">search_off</span>
                      <span className="font-label-md text-label-md text-on-surface">Tidak ada set soal yang cocok</span>
                      <span className="font-body-sm text-body-sm">Coba ubah kata kunci atau ubah pilihan filter di atas.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
