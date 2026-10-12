import { STATUS_KODE } from '../data/kodeKelas.js'
import { formatTanggal } from '../data/setSoal.js'

// Panel detail kode kelas terpilih: metadata nyata dari backend (label,
// status, jumlah peserta, jumlah set, daftar set terkait). Tidak menampilkan
// statistik hasil belajar karena data tersebut belum tersedia di endpoint ini.
export default function KodeKelasDetail({
  kelompok,
  sets = [],
  onSalinKode = () => {},
  onSalinPesan = () => {},
  onEdit = () => {},
}) {
  const status = STATUS_KODE[kelompok.status] || STATUS_KODE.nonaktif
  const setTerkait = sets.filter((s) => (kelompok.setIds || []).includes(s.id))

  return (
    <section aria-label={`Detail kode kelas ${kelompok.kode}`} className="flex flex-col gap-space-lg">
      {/* Panel kepala */}
      <div className="bg-surface-white rounded-xl shadow-sm p-space-lg flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center gap-space-md">
          <div className="w-14 h-14 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-md shrink-0">
            <span aria-hidden="true" className="material-symbols-outlined text-[32px]">pin</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="font-headline-md text-headline-md text-on-surface">{kelompok.nama}</span>
              <span className={`px-space-sm py-0.5 rounded-full font-label-sm text-label-sm font-bold ${status.pill}`}>
                {status.label}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-space-md mt-space-xs text-text-muted font-body-sm text-body-sm">
              <span className="flex items-center gap-1">
                <span aria-hidden="true" className="material-symbols-outlined text-[16px]">pin</span>
                Kode Kelas: <strong className="text-on-surface font-mono">{kelompok.kode}</strong>
              </span>
              <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1">
                <span aria-hidden="true" className="material-symbols-outlined text-[16px]">event</span>
                Dibuat: {kelompok.createdAt ? formatTanggal(kelompok.createdAt.slice(0, 10)) : '-'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <button
            className="h-11 px-space-md rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-space-xs hover:bg-surface-container-highest transition-colors"
            onClick={() => onSalinKode(kelompok.kode)}
            type="button"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">content_copy</span>
            <span>Salin Kode</span>
          </button>
          <button
            className="h-11 px-space-md rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-space-xs hover:bg-surface-container-highest transition-colors"
            onClick={() => onSalinPesan(kelompok)}
            type="button"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">chat</span>
            <span>Salin Pesan Pengingat</span>
          </button>
          <button
            className="h-11 px-space-md rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center gap-space-xs shadow-sm hover:bg-primary transition-colors"
            onClick={onEdit}
            type="button"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">edit</span>
            <span>Edit Kode</span>
          </button>
        </div>
      </div>

      {/* Ringkasan angka nyata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-lg">
        <div className="bg-surface-white rounded-xl shadow-sm p-space-lg flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
            <span aria-hidden="true" className="material-symbols-outlined text-[26px]">groups</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-text-muted">Jumlah Peserta</span>
            <span className="font-display text-headline-lg text-on-surface">{kelompok.jumlahPeserta}</span>
          </div>
        </div>
        <div className="bg-surface-white rounded-xl shadow-sm p-space-lg flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
            <span aria-hidden="true" className="material-symbols-outlined text-[26px]">library_books</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-text-muted">Jumlah Set Soal</span>
            <span className="font-display text-headline-lg text-on-surface">{kelompok.jumlahSet}</span>
          </div>
        </div>
      </div>

      {/* Daftar set terkait */}
      <div className="bg-surface-white rounded-xl shadow-sm p-space-lg">
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">Set Soal Terkait</h3>
        {setTerkait.length === 0 ? (
          <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col items-center gap-space-sm text-text-muted">
            <span aria-hidden="true" className="material-symbols-outlined text-[28px]">library_books</span>
            <span className="font-label-md text-label-md text-on-surface">Belum ada set soal terkait</span>
            <span className="font-body-sm text-body-sm">Gunakan tombol Edit Kode untuk menghubungkan set soal.</span>
          </div>
        ) : (
          <div className="flex flex-col gap-space-sm">
            {setTerkait.map((s) => (
              <div
                className="p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm"
                key={s.id}
              >
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface font-bold truncate">{s.nama}</span>
                  <span className="font-body-sm text-body-sm text-text-muted truncate">
                    {s.id} • {s.jalur} • {s.tipe}
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-text-muted shrink-0">
                  {typeof s.jumlahSoal === 'number' ? `${s.jumlahSoal} soal` : ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
