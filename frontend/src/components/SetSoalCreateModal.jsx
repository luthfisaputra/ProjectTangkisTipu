import { useState } from 'react'
import DropdownPilihan from './DropdownPilihan.jsx'
import { DAFTAR_KODE_KELAS, JALUR_META, TIPE_META } from '../data/setSoal.js'

const INPUT =
  'w-full h-12 px-4 rounded-xl border-0 bg-surface-cream text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container shadow-sm'

// Modal pembuatan set soal baru (pelengkap tombol "Buat Set Baru").
export default function SetSoalCreateModal({ onBatal = () => {}, onKonfirmasi = () => {}, menyimpan = false }) {
  const [form, setForm] = useState({
    nama: '',
    catatan: 'Penyusunan mandiri',
    jalur: 'dewasa',
    tipe: 'pre',
    kodeKelas: '',
    rilis: '',
    tutup: '',
  })

  const ubah = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))
  const namaBersih = form.nama.trim()
  const kodeBersih = form.kodeKelas.trim().toUpperCase()
  const galatTutup = form.rilis && form.tutup && form.tutup < form.rilis

  const submit = (e) => {
    e.preventDefault()
    if (!namaBersih || galatTutup || menyimpan) return
    onKonfirmasi({
      ...form,
      nama: namaBersih,
      kodeKelas: kodeBersih,
      catatan: form.catatan.trim() || 'Penyusunan mandiri',
    })
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-space-md" role="dialog" aria-modal="true" aria-labelledby="judul-modal-buat-set">
      <div className="absolute inset-0 bg-black/45" onClick={onBatal} />

      <form
        className="relative w-full max-w-lg bg-surface-white rounded-xl shadow-xl flex flex-col overflow-hidden pop-in"
        onSubmit={submit}
      >
        <div className="flex items-start justify-between gap-space-md p-space-xl pb-space-md">
          <div className="flex items-center gap-space-md">
            <div className="w-11 h-11 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
              <span aria-hidden="true" className="material-symbols-outlined text-[24px]">note_add</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-headline-md text-headline-md text-primary tracking-tight" id="judul-modal-buat-set">
                Buat Soal
              </h2>
              <p className="font-body-sm text-body-sm text-text-muted">
                Set baru disimpan sebagai draf dan belum terlihat oleh peserta.
              </p>
            </div>
          </div>
          <button
            aria-label="Tutup modal"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:bg-surface-container-high transition-colors shrink-0"
            onClick={onBatal}
            title="Tutup"
            type="button"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-space-md px-space-xl pb-space-xl">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="buat-judul">
              Judul Modul Set Soal <span className="text-danger-red">*</span>
            </label>
            <input
              autoFocus
              className={INPUT}
              id="buat-judul"
              onChange={(e) => ubah('nama', e.target.value)}
              placeholder="Contoh: Kuis Deteksi Undian Palsu"
              required
              type="text"
              value={form.nama}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="buat-jalur">Target Jalur</label>
              <DropdownPilihan
                id="buat-jalur"
                nilai={form.jalur}
                onChange={(v) => ubah('jalur', v)}
                opsi={Object.entries(JALUR_META).map(([value, m]) => ({ value, label: `${m.label} (${m.usia})` }))}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="buat-tipe">Tipe Evaluasi</label>
              <DropdownPilihan
                id="buat-tipe"
                nilai={form.tipe}
                onChange={(v) => ubah('tipe', v)}
                opsi={Object.entries(TIPE_META).map(([value, m]) => ({ value, label: m.label }))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="buat-kelas">Kode Kelas</label>
            <input
              className={INPUT}
              id="buat-kelas"
              list="daftar-kode-kelas"
              onChange={(e) => ubah('kodeKelas', e.target.value.toUpperCase())}
              placeholder="Contoh: PR-0102"
              type="text"
              value={form.kodeKelas}
            />
            <datalist id="daftar-kode-kelas">
              {DAFTAR_KODE_KELAS.map((k) => (
                <option key={k} value={k} />
              ))}
            </datalist>
            <span className="font-body-sm text-body-sm text-text-muted">Set hanya bisa dikerjakan peserta dengan kode kelas ini.</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="buat-rilis">Tanggal Rilis</label>
              <input
                className={`${INPUT} cursor-pointer`}
                id="buat-rilis"
                onChange={(e) => ubah('rilis', e.target.value)}
                type="date"
                value={form.rilis}
              />
              <span className="font-body-sm text-body-sm text-text-muted">Kosongkan bila ingin merilis manual.</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="buat-tutup">Tanggal Tutup</label>
              <input
                className={`${INPUT} cursor-pointer ${galatTutup ? 'ring-2 ring-danger-red' : ''}`}
                id="buat-tutup"
                min={form.rilis || undefined}
                onChange={(e) => ubah('tutup', e.target.value)}
                type="date"
                value={form.tutup}
              />
              <span className={`font-body-sm text-body-sm ${galatTutup ? 'text-danger-red' : 'text-text-muted'}`}>
                {galatTutup ? 'Tanggal tutup tidak boleh sebelum tanggal rilis.' : 'Kosongkan bila set tidak pernah ditutup.'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="buat-catatan">Catatan Set</label>
            <input
              className={INPUT}
              id="buat-catatan"
              onChange={(e) => ubah('catatan', e.target.value)}
              placeholder="Contoh: Penyusunan tim kurikulum"
              type="text"
              value={form.catatan}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-space-sm p-space-md bg-surface-cream border-t border-border-subtle">
          <button
            className="h-12 px-space-lg rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors cursor-pointer"
            onClick={onBatal}
            type="button"
          >
            Batal
          </button>
          <button
            className="h-12 px-space-lg rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all shadow-sm flex items-center gap-space-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!namaBersih || menyimpan}
            type="submit"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
              {menyimpan ? 'progress_activity' : 'add_circle'}
            </span>
            <span>{menyimpan ? 'Menyimpan…' : 'Buat Draf'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
