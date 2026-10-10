import { useState } from 'react'
import { getSoalPretest, LABEL_SET_PRETEST } from '../data/pretestSoal.jsx'

const HURUF = ['A', 'B', 'C', 'D']

export default function Pretest({ token = '', track = 1, onSelesai = () => {}, onKeluar = () => {} }) {
  const trackIdx = Number(track) >= 0 && Number(track) <= 2 ? Number(track) : 1
  const soalList = getSoalPretest(trackIdx)
  const TOTAL = soalList.length

  const [idx, setIdx] = useState(0)
  const [jawaban, setJawaban] = useState(() => soalList.map(() => null))
  const [showExit, setShowExit] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)

  const soal = soalList[idx]
  const terjawab = jawaban.filter((a) => a !== null).length
  const belum = TOTAL - terjawab
  const persen = Math.round(((idx + 1) / TOTAL) * 100)
  const lansia = trackIdx === 2

  const pilih = (i) => {
    setJawaban((prev) => {
      const next = [...prev]
      next[idx] = i
      return next
    })
  }

  const konfirmasiSubmit = () => {
    const skor = jawaban.reduce((n, a, i) => (a === soalList[i].kunci ? n + 1 : n), 0)
    onSelesai(skor)
  }

  const mintaSubmit = () => {
    if (belum > 0) setShowSubmit(true)
    else konfirmasiSubmit()
  }

  return (
    <main className="w-full min-h-screen bg-surface">
      <div className="flex flex-col w-full">
        <div
          className="w-full max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg space-y-space-lg">
          {/* Top Utility & Header Bar */}
          <div
            className="w-full bg-surface-white rounded-xl shadow-sm p-space-md lg:p-space-lg flex flex-col md:flex-row md:items-center md:justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <button
                className="inline-flex items-center justify-center h-12 px-space-md rounded-xl bg-surface-container-low text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors gap-space-xs font-label-md text-label-md"
                onClick={() => setShowExit(true)} type="button">
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_back</span>
                <span>Keluar Tes</span>
              </button>
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <h1 className="font-headline-sm text-headline-sm text-primary">Pre-test Kemampuan Awal</h1>
                  <span
                    className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed-variant font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px]" aria-hidden="true">flag</span>
                    Boleh dilewati
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-text-muted">
                  Kode Sesi: {token || 'TT-PRE-9021'} • Set {trackIdx + 1}: {LABEL_SET_PRETEST[trackIdx]}
                </span>
              </div>
            </div>
            {/* Linear Progress Status */}
            <div className="flex flex-col md:items-end gap-space-xs min-w-[260px]">
              <div className="flex items-center justify-between w-full">
                <span className="font-label-md text-label-md text-primary font-bold">Soal {idx + 1} dari {TOTAL}</span>
                <span className="font-label-sm text-label-sm text-text-muted">{persen}% Selesai</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container overflow-hidden">
                <div className="h-full bg-primary-container rounded-full transition-all duration-300"
                  style={{ width: `${persen}%` }}></div>
              </div>
            </div>
          </div>

          {/* Main Content: Two Columns Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            {/* Primary Column (8 / 12) */}
            <div className="lg:col-span-8 flex flex-col gap-space-lg">
              {/* Question Scenario Card */}
              <div
                className="bg-surface-white rounded-xl shadow-sm p-space-lg lg:p-space-xl flex flex-col gap-space-lg relative overflow-hidden">
                <div className="flex items-center justify-between gap-space-sm flex-wrap">
                  <div
                    className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">quiz</span>
                    <span>Kategori: {soal.kategori}</span>
                  </div>
                  <div className="flex items-center gap-space-xs text-text-muted font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">verified</span>
                    <span>Pilihan Tunggal (Pilih 1 tindakan)</span>
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="space-y-space-sm">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted">
                    Kasus Situasional Soal {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="font-headline-sm text-headline-sm text-on-surface leading-relaxed">
                    {soal.pertanyaan}
                  </p>
                </div>

                {/* Contextual Mockup Callout */}
                {soal.mockup && (
                  <div className="p-space-md rounded-xl bg-surface-card-subtle flex items-start gap-space-md">
                    <div
                      className="w-10 h-10 rounded-full bg-surface-white flex items-center justify-center text-primary shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-[20px]" aria-hidden="true">{soal.mockup.icon}</span>
                    </div>
                    <div className="flex flex-col font-body-sm text-body-sm space-y-1">
                      <span className="font-label-sm text-label-sm text-primary">{soal.mockup.label}</span>
                      <p className="text-on-surface-variant italic leading-normal">{soal.mockup.isi}</p>
                    </div>
                  </div>
                )}

                {/* Neutral Rule Notice */}
                <div className="flex items-center gap-space-xs text-text-muted font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">info</span>
                  <span>Kunci jawaban dan evaluasi lengkap akan disajikan di Laporan Analisis Akhir setelah tes
                    diselesaikan.</span>
                </div>

                {/* Answer Options: 2x2 Grid */}
                <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
                  <legend className="sr-only">{soal.pertanyaan}</legend>
                  {soal.opsi.map((teks, i) => {
                    const dipilih = jawaban[idx] === i
                    return (
                      <label
                        key={i}
                        className={`relative flex flex-col justify-between p-space-md min-h-[148px] rounded-xl cursor-pointer transition-all ${dipilih
                          ? 'bg-primary-fixed/20 shadow-md'
                          : 'bg-surface-white hover:bg-surface-container-low shadow-sm'}`}>
                        <input
                          className="sr-only"
                          type="radio"
                          name={`soal-${idx}`}
                          checked={dipilih}
                          onChange={() => pilih(i)} />
                        <div className="flex items-start gap-space-sm">
                          <span
                            className={`w-8 h-8 rounded-lg font-label-md text-label-md flex items-center justify-center shrink-0 ${dipilih
                              ? 'bg-primary-container text-on-primary shadow-sm'
                              : 'bg-surface-container-high text-on-surface group-hover:bg-primary-fixed'}`}>
                            {HURUF[i]}
                          </span>
                          <p className={`font-body-md text-body-md leading-relaxed ${dipilih
                            ? 'text-primary font-semibold'
                            : 'text-on-surface'}`}>
                            {teks}
                          </p>
                        </div>
                        <div className={`mt-space-sm flex items-center ${dipilih ? 'justify-between' : 'justify-end'}`}>
                          {dipilih && (
                            <span
                              className="font-label-sm text-label-sm text-primary flex items-center gap-1 font-bold">
                              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">check_circle</span>
                              Jawaban Anda Tersimpan
                            </span>
                          )}
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${dipilih
                              ? 'bg-primary-container text-on-primary shadow-sm'
                              : 'bg-surface-container text-transparent'}`}>
                            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">check</span>
                          </div>
                        </div>
                      </label>
                    )
                  })}
                </fieldset>

                {/* Bottom Action Buttons */}
                <div className="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
                  <button
                    className={`w-full sm:w-auto inline-flex items-center justify-center h-12 px-space-lg rounded-xl font-label-lg text-label-lg transition-colors gap-space-xs ${idx === 0
                      ? 'bg-surface-container-low text-text-muted cursor-not-allowed'
                      : 'bg-surface-container-low text-primary hover:bg-surface-container'}`}
                    onClick={() => setIdx((i) => Math.max(0, i - 1))} type="button" disabled={idx === 0}>
                    <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_back</span>
                    <span>Sebelumnya</span>
                  </button>
                  <div className="flex items-center gap-space-sm w-full sm:w-auto">
                    <button
                      className={`w-full sm:w-auto inline-flex items-center justify-center h-12 px-space-xl rounded-xl font-label-lg text-label-lg shadow-sm transition-all gap-space-xs ${idx === TOTAL - 1
                        ? 'bg-surface-container-high text-text-muted cursor-not-allowed'
                        : 'bg-primary text-on-primary hover:bg-primary-container'}`}
                      onClick={() => setIdx((i) => Math.min(TOTAL - 1, i + 1))} type="button"
                      disabled={idx === TOTAL - 1}>
                      <span>{idx === TOTAL - 1 ? 'Soal Terakhir' : `Lanjut ke Soal ${idx + 2}`}</span>
                      <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Column: Quiz Navigation Sidebar (4 / 12) */}
            <div className="lg:col-span-4 flex flex-col gap-space-lg">
              {/* Navigation Sheet Card */}
              <div className="bg-surface-white rounded-xl shadow-sm p-space-lg flex flex-col gap-space-lg">
                <div className="flex items-center justify-between pb-space-xs">
                  <div>
                    <h2 className="font-label-lg text-label-lg text-primary font-bold">Navigasi Soal</h2>
                    <span className="font-label-sm text-label-sm text-text-muted">Total {TOTAL} Butir Kasus</span>
                  </div>
                  <span
                    className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary bg-surface-container-low px-space-sm py-1 rounded-full">
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">alarm</span>
                    Fleksibel
                  </span>
                </div>

                {/* Question Grid 44x44px */}
                <div className="grid grid-cols-5 gap-space-sm justify-items-center">
                  {soalList.map((s, i) => {
                    const dijawab = jawaban[i] !== null
                    const aktif = i === idx
                    return (
                      <button
                        key={s.id}
                        aria-label={`Soal ${i + 1} ${dijawab ? 'Terjawab' : aktif ? 'Sedang Dikerjakan' : 'Belum Dikerjakan'}`}
                        aria-current={aktif ? 'true' : undefined}
                        onClick={() => setIdx(i)} type="button"
                        className={`w-11 h-11 rounded-xl font-label-md text-label-md flex items-center justify-center relative transition-colors ${aktif
                          ? 'bg-surface-white text-primary shadow-md bg-gradient-to-b from-primary-fixed/20 to-surface-white font-extrabold'
                          : dijawab
                            ? 'bg-primary text-on-primary shadow-sm hover:opacity-90'
                            : 'bg-surface-container-low text-text-muted hover:text-on-surface hover:bg-surface-container'}`}>
                        {i + 1}
                        {dijawab && !aktif && (
                          <span
                            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center text-[9px] font-bold"
                            aria-hidden="true">✓</span>
                        )}
                        {aktif && (
                          <span className="absolute -top-1 -right-1 flex h-3 w-3" aria-hidden="true">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Legend Bar */}
                <div
                  className="pt-space-sm flex flex-col gap-space-xs font-body-sm text-body-sm bg-surface-card-subtle p-space-md rounded-xl">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold mb-1">Status
                    Pengerjaan:</span>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded bg-primary" aria-hidden="true"></span>
                      <span className="text-on-surface-variant">Terjawab</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary font-bold">{terjawab} Butir</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded bg-surface-white shadow-sm" aria-hidden="true"></span>
                      <span className="text-on-surface-variant">Sedang Aktif</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary font-bold">1 Butir</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded bg-surface-container-low" aria-hidden="true"></span>
                      <span className="text-on-surface-variant">Belum Dijawab</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-text-muted font-bold">{belum} Butir</span>
                  </div>
                </div>

                {/* Final Submit Button */}
                <div className="pt-space-xs">
                  <button
                    className="w-full inline-flex items-center justify-center h-12 px-space-lg rounded-xl bg-surface-container-high text-on-surface-variant hover:bg-secondary hover:text-on-secondary font-label-lg text-label-lg transition-all gap-space-xs shadow-sm"
                    onClick={mintaSubmit} type="button">
                    <span className="material-symbols-outlined text-[20px]" aria-hidden="true">assignment_turned_in</span>
                    <span>Selesaikan Tes Sekarang</span>
                  </button>
                  <p className="font-label-sm text-[12px] text-center text-text-muted mt-2">
                    {belum > 0
                      ? `Kamu masih memiliki ${belum} soal yang belum diisi.`
                      : 'Semua soal sudah terjawab. Tekan untuk mengirim jawabanmu.'}
                  </p>
                </div>
              </div>

              {/* Testing Rules Information Banner Card */}
              <div className="bg-surface-cream rounded-xl p-space-lg flex flex-col gap-space-sm shadow-sm">
                <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">policy</span>
                  <span>Aturan Evaluasi Pre-test</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Tes ini ditujukan untuk mengukur pemahaman awal Anda sebelum mempelajari modul dan simulasi. Hasil
                  Pre-test bersifat formatif dan boleh dilewati tanpa sanksi.
                </p>
                <div
                  className="p-space-sm rounded-lg bg-surface-white font-body-sm text-body-sm text-text-muted flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0" aria-hidden="true">lock</span>
                  <span>Catatan: Post-test kelulusan di akhir kursus hanya dapat dikerjakan <strong
                      className="text-on-surface">1 kali per set soal</strong> untuk penerbitan sertifikat digital.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exit Confirmation Modal */}
        {showExit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-on-surface/50 backdrop-blur-sm fade-in"
            role="dialog" aria-modal="true" aria-labelledby="judul-keluar">
            <div className="bg-surface-white rounded-xl shadow-xl max-w-md w-full p-space-lg flex flex-col gap-space-md pop-in">
              <div className="w-12 h-12 rounded-xl bg-error-container text-error flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]" aria-hidden="true">warning</span>
              </div>
              <div className="space-y-space-xs">
                <h3 id="judul-keluar" className="font-headline-sm text-headline-sm text-on-surface">
                  Yakin ingin keluar dari Pre-test?</h3>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Jawaban yang telah Anda pilih hingga Soal {idx + 1} hanya disimpan sementara. Anda dapat
                  melanjutkan kembali dari halaman Uji Skor kapan saja.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-end gap-space-sm pt-space-sm">
                <button
                  className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-space-md rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors"
                  onClick={() => setShowExit(false)} type="button">
                  Batal &amp; Lanjutkan Tes
                </button>
                <button
                  className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-space-md rounded-xl bg-error text-on-error font-label-md text-label-md hover:opacity-90 transition-opacity"
                  onClick={onKeluar} type="button">
                  Keluar ke Beranda
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Submit Confirmation Modal */}
        {showSubmit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-on-surface/50 backdrop-blur-sm fade-in"
            role="dialog" aria-modal="true" aria-labelledby="judul-kirim">
            <div className="bg-surface-white rounded-xl shadow-xl max-w-md w-full p-space-lg flex flex-col gap-space-md pop-in">
              <div className="w-12 h-12 rounded-xl bg-warning-yellow-light text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]" aria-hidden="true">help</span>
              </div>
              <div className="space-y-space-xs">
                <h3 id="judul-kirim" className="font-headline-sm text-headline-sm text-on-surface">
                  Akhiri sesi Pre-test sekarang?</h3>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Terdapat {belum} butir soal yang belum dijawab. Jawaban yang sudah dipilih tetap akan dinilai dan
                  progres Langkah 1 dianggap selesai.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-end gap-space-sm pt-space-sm">
                <button
                  className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-space-md rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors"
                  onClick={() => setShowSubmit(false)} type="button">
                  Batal &amp; Lanjutkan Tes
                </button>
                <button
                  className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-space-md rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors"
                  onClick={konfirmasiSubmit} type="button">
                  Selesaikan Tes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
