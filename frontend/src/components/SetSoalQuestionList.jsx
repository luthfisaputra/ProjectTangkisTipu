import { MAKS_SOAL } from '../data/setSoal.js'

export default function SetSoalQuestionList({ soal = [], aktif = 0, onPilih = () => {}, onTambah = () => {} }) {
  const terisi = soal.length
  const penuh = terisi >= MAKS_SOAL

  return (
    <div className="flex flex-col gap-space-md bg-surface-white p-space-lg rounded-xl shadow-sm">
      <div className="flex items-center justify-between gap-space-sm">
        <div className="flex flex-col">
          <span className="font-label-lg text-label-lg text-primary">Daftar Pertanyaan</span>
          <span className="font-label-sm text-label-sm text-text-muted">Progres: {terisi}/{MAKS_SOAL} soal terisi</span>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm ${
            penuh ? 'bg-safe-green-light text-tertiary' : 'bg-warning-yellow-light text-secondary'
          }`}
        >
          <span aria-hidden="true" className="material-symbols-outlined text-[14px]">{penuh ? 'check' : 'edit_note'}</span>
          {penuh ? 'Lengkap' : `${MAKS_SOAL - terisi} kosong`}
        </span>
      </div>

      <div className="flex flex-col gap-space-xs max-h-[580px] overflow-y-auto pr-1">
        {soal.map((s, i) => {
          const dipilih = i === aktif
          const lengkap = s.pertanyaan.trim().length > 0
          return (
            <button
              aria-current={dipilih ? 'true' : undefined}
              className={`relative w-full text-left p-space-md rounded-xl transition-all cursor-pointer flex items-center justify-between gap-space-sm ${
                dipilih
                  ? 'bg-surface-container-high shadow-sm'
                  : 'bg-surface hover:bg-surface-container'
              }`}
              key={s.id}
              onClick={() => onPilih(i)}
              type="button"
            >
              {dipilih && <span aria-hidden="true" className="absolute left-0 top-2 bottom-2 w-1.5 bg-primary-container rounded-r"></span>}
              <div className={`flex items-start gap-space-sm min-w-0 ${dipilih ? 'pl-2' : ''}`}>
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-label-md text-label-md shrink-0 ${
                    dipilih ? 'bg-primary-container text-on-primary font-bold' : 'bg-surface-container text-text-muted'
                  }`}
                >
                  {i + 1}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className={`font-label-md text-label-md truncate ${dipilih ? 'text-primary font-bold' : 'text-on-surface'}`}>
                    {s.ringkas}
                  </span>
                  <span className={`font-body-sm text-body-sm ${dipilih ? 'text-primary' : 'text-text-muted'}`}>
                    {dipilih ? 'Sedang diedit' : 'Pilihan Ganda Tunggal'}
                  </span>
                </div>
              </div>
              <span
                aria-hidden="true"
                className={`material-symbols-outlined text-[18px] shrink-0 ${lengkap ? 'text-tertiary' : 'text-outline-variant'}`}
              >
                {lengkap ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </button>
          )
        })}

        {soal.length === 0 && (
          <div className="p-space-md rounded-xl bg-surface text-body-sm text-text-muted text-center">
            Belum ada soal pada set ini. Tambahkan soal pertama untuk mulai menyusun materi.
          </div>
        )}
      </div>

      <button
        className="h-12 w-full rounded-xl font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors bg-surface-container text-primary hover:bg-surface-cream disabled:text-text-muted disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-surface-container"
        disabled={penuh}
        onClick={onTambah}
        type="button"
      >
        <span aria-hidden="true" className="material-symbols-outlined text-[18px]">add_circle</span>
        <span>{penuh ? `Jumlah soal penuh (${terisi}/${MAKS_SOAL})` : `Tambah Soal (${terisi}/${MAKS_SOAL})`}</span>
      </button>
    </div>
  )
}
