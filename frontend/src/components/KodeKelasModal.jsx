import { useEffect, useState } from 'react'

// Modal buat/edit kode kelas. Relasi set soal dikirim lewat setIds.
// mode: 'buat' | 'edit'. kode tidak bisa diubah saat edit (backend hanya
// menerima label/active/setIds pada PATCH).
export default function KodeKelasModal({
  mode = 'buat',
  awal = null,
  sets = [],
  menyimpan = false,
  onBatal = () => {},
  onKonfirmasi = () => {},
}) {
  const [code, setCode] = useState('')
  const [label, setLabel] = useState('')
  const [active, setActive] = useState(true)
  const [setIds, setSetIds] = useState([])
  const [galat, setGalat] = useState('')

  useEffect(() => {
    if (mode === 'edit' && awal) {
      setCode(awal.code || '')
      setLabel(awal.label || '')
      setActive(awal.active !== false)
      setSetIds(Array.isArray(awal.setIds) ? awal.setIds : [])
    } else {
      setCode('')
      setLabel('')
      setActive(true)
      setSetIds([])
    }
    setGalat('')
  }, [mode, awal])

  const toggleSet = (id) =>
    setSetIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))

  const kirim = () => {
    const kodeBersih = code.trim().toUpperCase()
    if (mode === 'buat') {
      if (kodeBersih.length < 3) {
        setGalat('Kode minimal 3 karakter.')
        return
      }
      if (!/^[A-Z0-9][A-Z0-9-]{1,38}[A-Z0-9]$/.test(kodeBersih)) {
        setGalat('Format kode tidak valid. Gunakan huruf/angka dan tanda hubung.')
        return
      }
    }
    const payload =
      mode === 'buat'
        ? { code: kodeBersih, label: label.trim() || null, active, setIds }
        : { label: label.trim() || null, active, setIds }
    onKonfirmasi(payload)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-space-md">
      <div className="bg-surface-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-space-lg flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            {mode === 'buat' ? 'Buat Kode Kelas' : `Edit Kode Kelas ${awal?.code || ''}`}
          </h2>
          <button
            aria-label="Tutup"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:bg-surface-container-high"
            onClick={onBatal}
            type="button"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {galat && (
          <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-danger-red-light text-on-surface" role="alert">
            <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-danger-red">error</span>
            <span className="font-body-sm text-body-sm flex-1">{galat}</span>
          </div>
        )}

        <label className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-text-muted">Kode Kelas</span>
          <input
            className="h-11 px-space-md rounded-xl border-0 bg-surface-cream text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary-container disabled:opacity-60"
            disabled={mode === 'edit'}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Contoh: GURU-01"
            type="text"
            value={code}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-text-muted">Label / Nama Kelompok (opsional)</span>
          <input
            className="h-11 px-space-md rounded-xl border-0 bg-surface-cream text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Contoh: SMAN 12 Jakarta - Kelas 8B"
            type="text"
            value={label}
          />
        </label>

        <label className="flex items-center gap-space-sm">
          <input
            checked={active}
            className="w-4 h-4 accent-primary"
            onChange={(e) => setActive(e.target.checked)}
            type="checkbox"
          />
          <span className="font-body-sm text-body-sm text-on-surface">Kode aktif (bisa dipakai peserta)</span>
        </label>

        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm text-text-muted">Set Soal Terkait</span>
          {sets.length === 0 ? (
            <span className="font-body-sm text-body-sm text-text-muted">Belum ada set soal tersedia.</span>
          ) : (
            <div className="flex flex-col gap-1 max-h-52 overflow-y-auto pr-1">
              {sets.map((s) => (
                <label
                  className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container-high cursor-pointer"
                  key={s.id}
                >
                  <input
                    checked={setIds.includes(s.id)}
                    className="w-4 h-4 accent-primary"
                    onChange={() => toggleSet(s.id)}
                    type="checkbox"
                  />
                  <span className="flex flex-col min-w-0">
                    <span className="font-label-md text-label-md text-on-surface truncate">{s.nama}</span>
                    <span className="font-body-sm text-body-sm text-text-muted truncate">
                      {s.id} • {s.jalur} • {s.tipe}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-space-sm pt-space-sm">
          <button
            className="h-11 px-space-lg rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest"
            onClick={onBatal}
            type="button"
          >
            Batal
          </button>
          <button
            className="h-11 px-space-lg rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-bold hover:bg-primary disabled:opacity-60 flex items-center gap-space-xs"
            disabled={menyimpan}
            onClick={kirim}
            type="button"
          >
            {menyimpan && (
              <span aria-hidden="true" className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
            )}
            <span>{mode === 'buat' ? 'Buat Kode' : 'Simpan Perubahan'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
