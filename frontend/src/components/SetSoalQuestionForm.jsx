const HURUF = ['A', 'B', 'C', 'D']

export default function SetSoalQuestionForm({
  soal,
  nomor = 1,
  total = 1,
  penuh = false,
  onUbah = () => {},
  onUbahOpsi = () => {},
  onPilihKunci = () => {},
  onSebelumnya = () => {},
  onSelanjutnya = () => {},
  onPerbarui = () => {},
  onHapus = () => {},
  onSisipTautan = () => {},
}) {
  const namaGrup = `kunci-jawaban-${nomor}`

  return (
    <div className="flex flex-col gap-space-lg bg-surface-white p-space-xl rounded-xl shadow-sm">
      {/* Header soal */}
      <div className="flex flex-wrap items-center justify-between gap-space-md pb-space-md border-b border-surface-container-high">
        <div className="flex items-center gap-space-sm">
          <span className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-label-lg text-label-lg">
            {nomor}
          </span>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
              Soal Nomor {nomor} dari {total}
            </span>
            <span className="font-body-sm text-body-sm text-text-muted">Tipe: Pilihan Ganda Tunggal</span>
          </div>
        </div>
        <div className="flex items-center gap-space-sm">
          <div className="flex items-center gap-space-xs px-space-sm h-9 rounded-full bg-surface-container">
            <span aria-hidden="true" className="material-symbols-outlined text-[16px] text-primary">category</span>
            <label className="sr-only" htmlFor="kategori-soal">Kategori modus soal</label>
            <input
              className="w-44 bg-transparent border-0 font-label-sm text-label-sm text-primary focus:outline-none placeholder:text-text-muted"
              id="kategori-soal"
              onChange={(e) => onUbah('kategori', e.target.value)}
              placeholder="Kategori modus"
              type="text"
              value={soal.kategori}
            />
          </div>
          <button
            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-danger-red hover:bg-danger-red-light transition-colors"
            onClick={onHapus}
            title="Hapus Soal Ini"
            type="button"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[20px]">delete_outline</span>
            <span className="sr-only">Hapus soal nomor {nomor}</span>
          </button>
        </div>
      </div>

      {/* Naskah pertanyaan */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <label className="font-label-md text-label-md text-on-surface flex items-center gap-1" htmlFor="naskah-soal">
            <span>Naskah Skenario / Pertanyaan</span>
            <span className="text-danger-red" aria-hidden="true">*</span>
          </label>
          <span className="font-label-sm text-label-sm text-text-muted">{soal.pertanyaan.length} karakter</span>
        </div>
        <textarea
          className="w-full p-space-md rounded-xl border-0 bg-surface-cream text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container leading-relaxed shadow-sm resize-none min-h-[96px]"
          id="naskah-soal"
          onChange={(e) => onUbah('pertanyaan', e.target.value)}
          placeholder="Tulis skenario kasus dan pertanyaan untuk peserta..."
          rows="3"
          value={soal.pertanyaan}
        />
      </div>

      {/* Pilihan jawaban */}
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface">Pilihan Jawaban &amp; Kunci Evaluasi</span>
          <span className="font-label-sm text-label-sm text-text-muted">Pilih 1 pilihan sebagai jawaban benar</span>
        </div>

        {soal.opsi.map((teks, i) => {
          const kunci = i === soal.kunci
          const nomorPengecoh = soal.opsi.map((_, n) => n).filter((n) => n !== soal.kunci).indexOf(i) + 1
          return (
            <div
              className={`p-space-md rounded-xl shadow-sm flex items-start gap-space-md transition-all ${
                kunci ? 'bg-safe-green-light' : 'bg-surface-container-low'
              }`}
              key={HURUF[i]}
            >
              <div className="flex items-center gap-space-sm pt-1">
                <input
                  checked={kunci}
                  className={`w-5 h-5 cursor-pointer ${kunci ? 'accent-tertiary' : 'accent-primary'}`}
                  id={`opsi-${i}`}
                  name={namaGrup}
                  onChange={() => onPilihKunci(i)}
                  type="radio"
                />
                <label
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-label-md text-label-md cursor-pointer ${
                    kunci ? 'bg-tertiary text-on-tertiary' : 'bg-surface-container-highest text-on-surface'
                  }`}
                  htmlFor={`opsi-${i}`}
                >
                  {HURUF[i]}
                </label>
              </div>
              <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center justify-between gap-space-sm">
                  <span className={`font-label-sm text-label-sm ${kunci ? 'text-tertiary flex items-center gap-1' : 'text-text-muted'}`}>
                    {kunci && (
                      <>
                        <span aria-hidden="true" className="material-symbols-outlined text-[14px]">verified</span>
                        Kunci Jawaban Benar
                      </>
                    )}
                    {!kunci && `Pilihan Pengecoh ${nomorPengecoh}`}
                  </span>
                  {kunci && <span className="font-label-sm text-label-sm text-tertiary">Ideal</span>}
                </div>
                <textarea
                  className={`w-full p-3 rounded-xl border-0 bg-surface-cream text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 resize-none shadow-sm ${
                    kunci ? 'focus:ring-tertiary' : 'focus:ring-primary-container'
                  }`}
                  onChange={(e) => onUbahOpsi(i, e.target.value)}
                  placeholder={`Tulis pilihan jawaban ${HURUF[i]}...`}
                  rows="2"
                  value={teks}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Pembahasan */}
      <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col gap-space-sm shadow-sm">
        <div className="flex items-center justify-between gap-space-sm">
          <label className="font-label-md text-label-md text-primary flex items-center gap-space-xs" htmlFor="ulasan-soal">
            <span aria-hidden="true" className="material-symbols-outlined text-[20px]">lightbulb</span>
            <span>Ulasan &amp; Pembahasan Edukasi</span>
          </label>
          <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-1">
            <span aria-hidden="true" className="material-symbols-outlined text-[14px]">visibility</span>
            Terlihat Peserta
          </span>
        </div>
        <textarea
          className="w-full p-space-md rounded-xl border-0 bg-surface-cream text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container leading-relaxed shadow-sm resize-none min-h-[84px]"
          id="ulasan-soal"
          onChange={(e) => onUbah('ulasan', e.target.value)}
          placeholder="Tulis penjelasan singkat yang ditampilkan saat peserta meninjau hasil..."
          rows="3"
          value={soal.ulasan}
        />
        <div className="flex items-center justify-between gap-space-sm font-label-sm text-label-sm text-text-muted pt-1">
          <span>Pertanyaan tipe pilihan ganda tunggal — satu jawaban benar.</span>
          <button
            className="text-primary hover:underline flex items-center gap-0.5 shrink-0"
            onClick={onSisipTautan}
            type="button"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[16px]">add_link</span>
            <span>Sisipkan Tautan Edukasi</span>
          </button>
        </div>
      </div>

      {/* Navigasi bawah */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-sm">
        <button
          className="h-12 px-space-lg rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-space-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-surface-container"
          disabled={nomor <= 1}
          onClick={onSebelumnya}
          type="button"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>{nomor <= 1 ? 'Soal pertama' : `Kembali ke Soal ${nomor - 1}`}</span>
        </button>
        <div className="flex items-center gap-space-sm">
          <button
            className="h-12 px-space-lg rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors cursor-pointer"
            onClick={onPerbarui}
            type="button"
          >
            Perbarui Soal {nomor}
          </button>
          <button
            className={`h-12 px-space-lg rounded-xl font-label-md text-label-md transition-all flex items-center gap-space-xs shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
              nomor >= total && !penuh
                ? 'bg-tertiary text-on-tertiary hover:bg-tertiary-container'
                : 'bg-primary-container text-on-primary hover:bg-primary disabled:hover:bg-primary-container'
            }`}
            disabled={nomor >= total && penuh}
            onClick={onSelanjutnya}
            type="button"
          >
            {nomor >= total ? (
              penuh ? (
                <>
                  <span>Jumlah soal penuh ({total} soal)</span>
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">block</span>
                </>
              ) : (
                <>
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>Simpan &amp; Tambah Soal {nomor + 1}</span>
                </>
              )
            ) : (
              <>
                <span>Lanjut ke Soal {nomor + 1}</span>
                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
