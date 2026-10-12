import { useState } from 'react'
import { STATUS_PESERTA } from '../data/kodeKelas.js'

// Warna avatar peserta (bergantian supaya rapi dan konsisten antar kelompok).
const WARNA_AVATAR = [
  'bg-primary-fixed text-primary',
  'bg-secondary-fixed text-on-secondary-fixed',
  'bg-primary-fixed-dim text-on-primary-fixed-variant',
  'bg-surface-container-highest text-text-muted',
]

const TAB_PESERTA = [
  { id: 'semua', label: 'Semua', cocok: () => true },
  { id: 'sudah', label: 'Sudah Post-test', cocok: (p) => p.post !== null },
  { id: 'belum', label: 'Belum Post-test', cocok: (p) => p.post === null },
  { id: 'tesulang', label: 'Tes Ulang Selesai', cocok: (p) => p.status === 'tesulang' },
]

// Daftar peserta anonim satu kelompok: filter tab, unduh CSV, dan catatan privasi.
export default function KodeKelasPeserta({ kelompok = {}, onBeritahu = () => {} }) {
  const [tab, setTab] = useState('semua')
  const peserta = kelompok.hasil?.peserta || []

  const hitungTab = (t) => peserta.filter(t.cocok).length
  const tabTerlihat = TAB_PESERTA.filter((t) => t.id === 'semua' || hitungTab(t) > 0)
  const tampil = tabTerlihat.find((t) => t.id === tab) || TAB_PESERTA[0]
  const terlihat = peserta.filter(tampil.cocok)

  const unduhCsv = () => {
    const baris = [
      ['kode_peserta', 'nama_panggilan', 'skor_pre', 'skor_post', 'status'],
      ...peserta.map((p) => [p.kodeUnik, p.nama, p.pre, p.post ?? '-', p.status]),
    ]
    const csv = baris.map((b) => b.join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const tautan = document.createElement('a')
    tautan.href = url
    tautan.download = `peserta-${kelompok.kode || 'kelompok'}.csv`
    tautan.click()
    URL.revokeObjectURL(url)
    onBeritahu(`Data ${peserta.length} peserta anonim kelas ${kelompok.kode} diunduh sebagai CSV.`)
  }

  return (
    <div className="bg-surface-white rounded-xl shadow-sm p-space-lg flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Progres Belajar Peserta Anonim</h3>
          <p className="font-body-sm text-body-sm text-text-muted">Hasil terverifikasi per kode unik peserta tanpa nomor HP / NIK</p>
        </div>
        <button
          className="px-space-md py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1 hover:bg-surface-container-highest self-start sm:self-auto transition-colors"
          onClick={unduhCsv}
          type="button"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-[16px]">download</span>
          <span>Unduh CSV Anonim</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-space-xs mb-space-md pb-space-sm">
        {tabTerlihat.map((t) => {
          const aktif = t.id === tab
          return (
            <button
              aria-pressed={aktif}
              className={`px-space-md py-1.5 rounded-full font-label-sm text-label-sm transition-colors ${
                aktif ? 'bg-primary text-on-primary font-bold shadow-sm' : 'bg-surface-container-low text-text-muted hover:text-on-surface hover:bg-surface-container-high'
              }`}
              key={t.id}
              onClick={() => setTab(t.id)}
              type="button"
            >
              {t.label} ({hitungTab(t)})
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-space-sm flex-1">
        {terlihat.map((p, i) => {
          const meta = STATUS_PESERTA[p.status]
          return (
            <div
              className="p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm hover:bg-surface-cream transition-colors"
              key={p.kodeUnik}
            >
              <div className="flex items-center gap-space-md">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-label-lg text-label-lg shrink-0 ${WARNA_AVATAR[i % WARNA_AVATAR.length]}`}>
                  {p.inisial}
                </div>
                <div>
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="font-label-md text-label-md text-on-surface font-bold">{p.nama}</span>
                    <span className="font-mono text-label-sm text-label-sm px-space-xs py-0.5 rounded bg-surface-white text-text-muted shadow-sm">
                      {p.kodeUnik}
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-text-muted">{p.catatan}</span>
                </div>
              </div>
              <div className="flex items-center gap-space-md self-end sm:self-center">
                <div className="flex items-center gap-space-xs font-label-sm text-label-sm">
                  <span className="px-space-xs py-0.5 rounded bg-surface-white text-text-muted">Pre: {p.pre}/10</span>
                  <span aria-hidden="true" className="material-symbols-outlined text-[14px] text-primary">arrow_forward</span>
                  <span className={`px-space-xs py-0.5 rounded ${p.post === null ? 'bg-surface-container-highest text-text-muted' : 'bg-safe-green-light text-tertiary font-bold'}`}>
                    Post: {p.post === null ? '-' : `${p.post}/10`}
                  </span>
                </div>
                <span className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1 min-w-[150px] justify-center ${meta.pill}`}>
                  <span aria-hidden="true" className="material-symbols-outlined text-[16px]">{meta.icon}</span>
                  {meta.label}
                </span>
              </div>
            </div>
          )
        })}

        {terlihat.length === 0 && (
          <div className="p-space-xl rounded-xl bg-surface-container-low flex flex-col items-center gap-space-sm text-text-muted">
            <span aria-hidden="true" className="material-symbols-outlined text-[28px]">group_off</span>
            <span className="font-label-md text-label-md text-on-surface">Tidak ada peserta pada filter ini</span>
          </div>
        )}
      </div>

      <div className="mt-space-lg p-space-md rounded-xl bg-surface-cream flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs text-text-muted font-body-sm text-body-sm">
          <span aria-hidden="true" className="material-symbols-outlined text-tertiary text-[20px] shrink-0">security</span>
          <span>Data peserta 100% anonim dan terlindungi. Hubungi peserta melalui nomor grup WhatsApp komunitas setempat.</span>
        </div>
        <span className="font-label-sm text-label-sm text-primary shrink-0 hidden md:inline">Tanpa NIK &amp; Nomor HP</span>
      </div>
    </div>
  )
}
