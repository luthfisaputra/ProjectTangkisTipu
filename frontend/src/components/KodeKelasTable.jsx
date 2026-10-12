import { formatTanggal } from '../data/setSoal.js'
import { STATUS_KODE } from '../data/kodeKelas.js'

// Tab status di atas tabel. Tab selain "Semua" hanya tampil bila jumlahnya
// lebih dari nol supaya toolbar tetap ringkas.
const TAB_STATUS = [
  { id: 'semua', label: 'Semua' },
  { id: 'aktif', label: 'Aktif' },
  { id: 'nonaktif', label: 'Nonaktif' },
]

export default function KodeKelasTable({
  kelompok = [],
  q = '',
  tab = 'semua',
  hitungTab = () => 0,
  onUbahFilter = () => {},
  kodeTerpilih = null,
  onPilih = () => {},
  onSalin = () => {},
  onNonaktifkan = () => {},
  onAktifkan = () => {},
  onEdit = () => {},
  onBuatKode = () => {},
}) {
  const tabTerlihat = TAB_STATUS.filter((t) => t.id === 'semua' || hitungTab(t.id) > 0 || t.id === tab)

  return (
    <section aria-label="Daftar kode kelas" className="flex flex-col gap-space-md">
      {/* Filter */}
      <div className="bg-surface-white p-space-md rounded-xl shadow-sm flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-space-md">
        <div className="relative min-w-[260px] flex-1">
          <label className="sr-only" htmlFor="cari-kelompok">Cari kode kelas</label>
          <span
            aria-hidden="true"
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-text-muted"
          >
            search
          </span>
          <input
            className="w-full h-12 pl-10 pr-4 rounded-xl border-0 bg-surface-cream text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container shadow-sm"
            id="cari-kelompok"
            onChange={(e) => onUbahFilter('q', e.target.value)}
            placeholder="Cari kode atau label kelas..."
            type="search"
            value={q}
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 bg-surface-container-low p-1 rounded-lg self-start xl:self-auto">
          {tabTerlihat.map((t) => {
            const aktif = t.id === tab
            return (
              <button
                aria-pressed={aktif}
                className={`px-space-md py-1.5 rounded-md font-label-sm text-label-sm transition-colors ${
                  aktif ? 'bg-surface-white text-primary font-bold shadow-sm' : 'text-text-muted hover:text-on-surface'
                }`}
                key={t.id}
                onClick={() => onUbahFilter('tab', t.id)}
                type="button"
              >
                {t.label} ({hitungTab(t.id)})
              </button>
            )
          })}
        </div>
      </div>

      {/* Tabel */}
      <div className="w-full bg-surface-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low font-label-md text-label-md text-on-surface-variant">
                <th className="py-space-md px-space-lg font-label-md" scope="col">Label Kelompok</th>
                <th className="py-space-md px-space-md font-label-md" scope="col">Kode Kelas</th>
                <th className="py-space-md px-space-md font-label-md" scope="col">Peserta & Set</th>
                <th className="py-space-md px-space-md font-label-md" scope="col">Dibuat</th>
                <th className="py-space-md px-space-md font-label-md" scope="col">Status</th>
                <th className="py-space-md px-space-lg text-right font-label-md" scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-body-sm font-body-sm text-on-surface">
              {kelompok.map((k) => {
                const status = STATUS_KODE[k.status] || STATUS_KODE.nonaktif
                const sedangDibuka = k.kode === kodeTerpilih
                return (
                  <tr
                    className={`${sedangDibuka ? 'bg-surface-cream hover:bg-surface-container-low/60' : 'hover:bg-surface-container-low/60'} transition-colors`}
                    key={k.kode}
                  >
                    <td className="py-space-lg px-space-lg">
                      <div className="flex items-center gap-2">
                        {sedangDibuka && <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0"></span>}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-label-lg text-label-lg ${sedangDibuka ? 'text-primary' : 'text-on-surface'} tracking-tight`}>
                              {k.nama}
                            </span>
                            {sedangDibuka && (
                              <span className="px-2 py-0.5 rounded text-[11px] font-label-sm bg-primary-container text-on-primary">
                                Sedang Dibuka
                              </span>
                            )}
                          </div>
                          <span className="text-text-muted font-body-sm text-body-sm">{k.catatan}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-space-lg px-space-md">
                      <div className="inline-flex items-center gap-1.5 bg-surface-white px-space-sm py-1 rounded-md shadow-sm border border-surface-container">
                        <span className="font-label-md text-label-md text-on-surface font-mono font-bold tracking-wider">{k.kode}</span>
                        <button
                          className="p-1 text-primary hover:text-primary-container transition-colors"
                          onClick={() => onSalin(k.kode)}
                          title="Salin Kode"
                          type="button"
                        >
                          <span aria-hidden="true" className="material-symbols-outlined text-[16px]">content_copy</span>
                          <span className="sr-only">Salin kode {k.kode}</span>
                        </button>
                      </div>
                    </td>
                    <td className="py-space-lg px-space-md">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface">
                          <span aria-hidden="true" className="material-symbols-outlined text-[16px] text-primary">groups</span>
                          <strong>{k.jumlahPeserta}</strong> Peserta
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-text-muted">
                          <span aria-hidden="true" className="material-symbols-outlined text-[16px]">library_books</span>
                          <strong>{k.jumlahSet}</strong> Set Soal
                        </span>
                      </div>
                    </td>
                    <td className="py-space-lg px-space-md">
                      <span className="text-text-muted font-label-md">{k.createdAt ? formatTanggal(k.createdAt.slice(0, 10)) : '-'}</span>
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
                          className={`h-9 px-space-md rounded-lg font-label-sm text-label-sm flex items-center gap-1 shadow-sm transition-colors ${
                            sedangDibuka
                              ? 'bg-primary text-on-primary'
                              : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                          }`}
                          onClick={() => onPilih(k.kode)}
                          type="button"
                        >
                          <span aria-hidden="true" className="material-symbols-outlined text-[16px]">insights</span>
                          <span>Lihat Detail</span>
                        </button>
                        <button
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:bg-surface-container-high transition-colors"
                          onClick={() => onEdit(k.kode)}
                          title="Edit Kode Kelas"
                          type="button"
                        >
                          <span aria-hidden="true" className="material-symbols-outlined text-[18px]">edit</span>
                          <span className="sr-only">Edit kode {k.kode}</span>
                        </button>
                        {k.active ? (
                          <button
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-danger-red hover:bg-danger-red-light transition-colors"
                            onClick={() => onNonaktifkan(k.kode)}
                            title="Nonaktifkan Kode"
                            type="button"
                          >
                            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">block</span>
                            <span className="sr-only">Nonaktifkan kode {k.kode}</span>
                          </button>
                        ) : (
                          <button
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-tertiary hover:bg-safe-green-light transition-colors"
                            onClick={() => onAktifkan(k.kode)}
                            title="Aktifkan Kode"
                            type="button"
                          >
                            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">check_circle</span>
                            <span className="sr-only">Aktifkan kode {k.kode}</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}

              {kelompok.length === 0 && (
                <tr>
                  <td className="py-space-2xl px-space-lg text-center" colSpan={6}>
                    <div className="flex flex-col items-center gap-space-sm text-text-muted">
                      <span aria-hidden="true" className="material-symbols-outlined text-[36px]">school</span>
                      <span className="font-label-md text-label-md text-on-surface">
                        {q || tab !== 'semua' ? 'Tidak ada kode kelas yang cocok' : 'Belum ada kode kelas'}
                      </span>
                      <span className="font-body-sm text-body-sm max-w-md">
                        {q || tab !== 'semua'
                          ? 'Coba ubah kata kunci atau pilih tab status lain di atas.'
                          : 'Buat kode kelas baru untuk menghubungkan peserta dengan set soal.'}
                      </span>
                      {!(q || tab !== 'semua') && (
                        <button
                          className="mt-1 h-10 px-space-lg rounded-xl bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-space-sm shadow-sm hover:bg-primary transition-colors"
                          onClick={onBuatKode}
                          type="button"
                        >
                          <span aria-hidden="true" className="material-symbols-outlined text-[18px]">add_circle</span>
                          <span>Buat Kode Kelas</span>
                        </button>
                      )}
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
