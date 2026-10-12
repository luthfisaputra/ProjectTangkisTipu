import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AdminShell from './AdminShell.jsx'
import DropdownPilihan from './DropdownPilihan.jsx'
import {
  getAdminStatsSummary,
  getAdminStatsDistribution,
  getAdminWrongQuestions,
  getAdminWrongCategories,
  getAdminClassCodeStats,
  listClassCodes,
} from '../api.js'

const JALUR_OPSI = [
  { value: 'all', label: 'Semua Jalur' },
  { value: 'anak', label: 'Anak & Remaja (10-17)' },
  { value: 'dewasa', label: 'Dewasa (18-59)' },
  { value: 'lansia', label: 'Lansia (60+)' },
]

const PAGE_SIZE = 5

// Format angka dari backend. null dibedakan dari 0 (metrik belum tersedia).
function fmt(value, { suffix = '', dash = '—' } = {}) {
  if (value === null || value === undefined) return dash
  const n = Number(value)
  if (!Number.isFinite(n)) return dash
  return `${n}${suffix}`
}

function fmtDesimal(value, digit = 1) {
  if (value === null || value === undefined) return null
  const n = Number(value)
  if (!Number.isFinite(n)) return null
  return n.toFixed(digit)
}

// Grafik batang distribusi skor pre vs post (skala 0-10).
function BarChart({ distribusi }) {
  const pre = distribusi?.pretest || []
  const post = distribusi?.posttest || []
  const buckets = Array.from({ length: 11 }, (_, i) => i)
  const preMap = new Map(pre.map((d) => [d.skor, d.jumlah]))
  const postMap = new Map(post.map((d) => [d.skor, d.jumlah]))
  const maxJumlah = Math.max(
    1,
    ...pre.map((d) => d.jumlah || 0),
    ...post.map((d) => d.jumlah || 0)
  )

  const chartH = 180
  const baseY = 200
  const groupW = 52
  const barW = 20
  const startX = 40

  const adaData = pre.length > 0 || post.length > 0

  if (!adaData) {
    return (
      <div className="flex flex-col items-center justify-center py-space-2xl text-center">
        <span className="material-symbols-outlined text-[40px] text-text-muted">bar_chart</span>
        <p className="font-body-sm text-body-sm text-text-muted mt-space-sm">Belum ada attempt tes tersubmit untuk ditampilkan.</p>
      </div>
    )
  }

  return (
    <div className="relative w-full pt-4 overflow-x-auto">
      <svg className="w-full min-w-[640px] h-72 overflow-visible" fill="none" viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg">
        <line className="text-surface-container-high" stroke="currentColor" strokeDasharray="4 4" x1="30" x2="620" y1="20" y2="20" />
        <text className="text-text-muted font-label-sm" fill="currentColor" fontSize="10" textAnchor="end" x="22" y="24">{maxJumlah}</text>
        <line className="text-surface-container-high" stroke="currentColor" strokeDasharray="4 4" x1="30" x2="620" y1="110" y2="110" />
        <text className="text-text-muted font-label-sm" fill="currentColor" fontSize="10" textAnchor="end" x="22" y="114">{Math.round(maxJumlah / 2)}</text>
        <line className="text-outline-variant" stroke="currentColor" strokeWidth="1.5" x1="30" x2="620" y1={baseY} y2={baseY} />
        <text className="text-text-muted font-label-sm" fill="currentColor" fontSize="10" textAnchor="end" x="22" y={baseY + 4}>0</text>
        {buckets.map((skor, i) => {
          const x = startX + i * groupW
          const preJml = preMap.get(skor) || 0
          const postJml = postMap.get(skor) || 0
          const preH = Math.round((preJml / maxJumlah) * chartH)
          const postH = Math.round((postJml / maxJumlah) * chartH)
          return (
            <g key={skor}>
              {preJml > 0 && (
                <>
                  <rect fill="#fbbc0e" height={preH} rx="3" width={barW} x={x} y={baseY - preH} />
                  <text fill="#795900" fontSize="10" fontWeight="700" textAnchor="middle" x={x + barW / 2} y={baseY - preH - 4}>{preJml}</text>
                </>
              )}
              {postJml > 0 && (
                <>
                  <rect fill="#0f5c73" height={postH} rx="3" width={barW} x={x + barW + 2} y={baseY - postH} />
                  <text fill="#004356" fontSize="10" fontWeight="700" textAnchor="middle" x={x + barW + 2 + barW / 2} y={baseY - postH - 4}>{postJml}</text>
                </>
              )}
              <text fill="#40484c" fontSize="10" fontWeight="600" textAnchor="middle" x={x + barW} y={baseY + 16}>{skor}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function KartuStat({ s }) {
  return (
    <div className="bg-surface-white p-space-lg rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.iconBox}`}>
          <span className="material-symbols-outlined text-[24px]">{s.icon}</span>
        </div>
        {s.badgeText && (
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm ${s.badge}`}>
            <span className="material-symbols-outlined text-[14px]">{s.badgeIcon}</span>
            {s.badgeText}
          </span>
        )}
      </div>
      <div className="mt-space-md">
        <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider block">{s.label}</span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className={`font-display text-display leading-none ${s.valueClass}`}>{s.value}</span>
          {s.suffix && <span className="font-headline-sm text-headline-sm text-text-muted">{s.suffix}</span>}
        </div>
        <p className="font-body-sm text-body-sm text-text-muted mt-space-xs flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          {s.note}
        </p>
      </div>
    </div>
  )
}

export default function DashboardAdmin({ onKeluar = () => {}, onNavigate = () => {}, onUnauthorized = () => {} }) {
  const [kodeKelas, setKodeKelas] = useState('all')
  const [jalur, setJalur] = useState('all')
  const [refreshing, setRefreshing] = useState(false)
  const [copied, setCopied] = useState(false)

  const [ringkasan, setRingkasan] = useState(null)
  const [distribusi, setDistribusi] = useState(null)
  const [soalSalah, setSoalSalah] = useState([])
  const [kategoriSalah, setKategoriSalah] = useState([])
  const [kodeKelasStats, setKodeKelasStats] = useState([])
  const [opsiKelasSemua, setOpsiKelasSemua] = useState([])
  const [pageSoal, setPageSoal] = useState(1)
  const [pageKategori, setPageKategori] = useState(1)
  const [pageKode, setPageKode] = useState(1)

  const [memuat, setMemuat] = useState(true)
  const [galat, setGalat] = useState('')

  const reqRef = useRef(0)

  const tanganiGalat = useCallback(
    (err, fallback) => {
      if (err && err.status === 401) {
        onUnauthorized()
        return
      }
      setGalat((err && err.message) || fallback)
    },
    [onUnauthorized]
  )

  // Filter yang dikirim ke endpoint ringkasan/distribusi (hanya yang terisi).
  const filterAktif = useMemo(() => {
    const f = {}
    if (kodeKelas !== 'all') f.kodeKelas = kodeKelas
    if (jalur !== 'all') f.jalur = jalur
    return f
  }, [kodeKelas, jalur])

  const muatSemua = useCallback(async () => {
    const reqId = ++reqRef.current
    setMemuat(true)
    setGalat('')
    try {
      const [r, d, s, k, kk] = await Promise.all([
        getAdminStatsSummary(filterAktif),
        getAdminStatsDistribution(filterAktif),
        getAdminWrongQuestions({ page: pageSoal, limit: PAGE_SIZE }),
        getAdminWrongCategories({ page: pageKategori, limit: PAGE_SIZE }),
        getAdminClassCodeStats({ page: pageKode, limit: PAGE_SIZE }),
      ])
      if (reqId !== reqRef.current) return
      setRingkasan(r?.ringkasan || null)
      setDistribusi(d?.distribusi || null)
      setSoalSalah(Array.isArray(s?.soal) ? s.soal : [])
      setKategoriSalah(Array.isArray(k?.kategori) ? k.kategori : [])
      setKodeKelasStats(Array.isArray(kk?.kodeKelas) ? kk.kodeKelas : [])
    } catch (err) {
      if (reqId !== reqRef.current) return
      tanganiGalat(err, 'Gagal memuat data statistik dari server.')
    } finally {
      if (reqId === reqRef.current) setMemuat(false)
    }
  }, [filterAktif, pageSoal, pageKategori, pageKode, tanganiGalat])

  useEffect(() => {
    muatSemua()
  }, [muatSemua])

  // Reset paginasi saat filter berubah agar tidak menampilkan halaman kosong.
  useEffect(() => {
    setPageSoal(1)
    setPageKategori(1)
    setPageKode(1)
  }, [kodeKelas, jalur])

  const handleRefresh = () => {
    if (refreshing) return
    setRefreshing(true)
    muatSemua().finally(() => setRefreshing(false))
  }

  const handleCopy = async () => {
    const kode = kodeKelas !== 'all' ? kodeKelas : ''
    try {
      await navigator.clipboard.writeText(`https://tangki-stipu.id/join?kode=${kode}`)
    } catch {
      /* clipboard tidak tersedia di konteks non-HTTPS */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Opsi kode kelas diambil dari daftar lengkap kode kelas (bukan statistik
  // yang terpaginasi), agar semua kode muncul di dropdown filter.
  useEffect(() => {
    let aktif = true
    listClassCodes({ active: 'all' })
      .then((res) => {
        if (!aktif) return
        const daftar = Array.isArray(res?.classCodes) ? res.classCodes : []
        setOpsiKelasSemua(
          daftar.map((k) => ({ value: k.code, label: `${k.code}${k.label ? ` - ${k.label}` : ''}` }))
        )
      })
      .catch(() => {
        if (aktif) setOpsiKelasSemua([])
      })
    return () => {
      aktif = false
    }
  }, [])

  const opsiKelas = useMemo(
    () => [{ value: 'all', label: 'Semua Kode Kelas' }, ...opsiKelasSemua],
    [opsiKelasSemua]
  )

  // Kembalikan ke "Semua" bila kode terpilih tidak ada di daftar.
  useEffect(() => {
    if (kodeKelas !== 'all' && !opsiKelas.some((o) => o.value === kodeKelas)) setKodeKelas('all')
  }, [opsiKelas, kodeKelas])

  const kartu = useMemo(() => {
    const r = ringkasan
    const pre = r?.pretest || {}
    const post = r?.posttest || {}
    const pen = r?.penyelesaian || {}
    const preRata = fmtDesimal(pre.rataRata)
    const postRata = fmtDesimal(post.rataRata)
    const kenaikan = r?.kenaikanRataRata
    return [
      {
        icon: 'group',
        iconBox: 'bg-surface-container-high text-primary',
        badge: 'bg-safe-green-light text-tertiary',
        badgeIcon: 'groups',
        badgeText: null,
        label: 'Jumlah Peserta',
        value: fmt(r?.jumlahPeserta),
        valueClass: 'text-primary',
        dot: 'bg-tertiary',
        note: `${fmt(pen.pesertaPretestSelesai)} selesai pre-test, ${fmt(pen.pesertaPosttestSelesai)} selesai post-test`,
      },
      {
        icon: 'assignment_late',
        iconBox: 'bg-warning-yellow-light text-secondary',
        badge: 'bg-warning-yellow-light text-secondary',
        badgeIcon: 'warning',
        badgeText: null,
        label: 'Rata-rata Skor Pre-Test',
        value: preRata === null ? '—' : preRata,
        valueClass: 'text-secondary',
        suffix: preRata === null ? null : '/ 10',
        dot: 'bg-outline',
        note: preRata === null ? 'Belum ada attempt pre-test tersubmit' : `Dari ${fmt(pre.jumlahAttempt)} attempt tersubmit`,
      },
      {
        icon: 'verified',
        iconBox: 'bg-safe-green-light text-tertiary',
        badge: 'bg-safe-green-light text-tertiary',
        badgeIcon: 'task_alt',
        badgeText: null,
        label: 'Rata-rata Skor Post-Test',
        value: postRata === null ? '—' : postRata,
        valueClass: 'text-tertiary',
        suffix: postRata === null ? null : '/ 10',
        dot: 'bg-tertiary',
        note: postRata === null ? 'Belum ada attempt post-test tersubmit' : `Dari ${fmt(post.jumlahAttempt)} attempt tersubmit`,
      },
      {
        icon: 'show_chart',
        iconBox: 'bg-surface-container-high text-primary-container',
        badge: 'bg-safe-green-light text-tertiary',
        badgeIcon: 'arrow_upward',
        badgeText: null,
        label: 'Kenaikan Skor Rata-rata',
        value: kenaikan === null || kenaikan === undefined ? '—' : `${kenaikan >= 0 ? '+' : ''}${kenaikan} Poin`,
        valueClass: 'text-primary-container',
        dot: 'bg-primary-container',
        note:
          kenaikan === null || kenaikan === undefined
            ? 'Belum tersedia (butuh pre & post-test tersubmit)'
            : `Penyelesaian post-test ${fmt(pen.persenPenyelesaianPosttest, { suffix: '%' })}`,
      },
    ]
  }, [ringkasan])

  const adaData = (ringkasan?.jumlahPeserta ?? 0) > 0

  return (
    <AdminShell active="dashboard" onKeluar={onKeluar} onNavigate={onNavigate}>
      <main className="w-full pt-16 bg-surface-cream px-space-xl py-space-xl">
        <div className="flex flex-col w-full">
          {/* Header halaman */}
          <div className="flex flex-col gap-space-xs pb-space-lg">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mt-space-xs">
              <div className="flex flex-col gap-space-xs">
                <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Dashboard Evaluasi Literasi Warga</h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                  Pantau ketahanan siber komunitas, progres peningkatan skor pre vs post-test, dan titik kerentanan warga secara agregat.
                </p>
              </div>
            </div>
          </div>

          {/* Toolbar kontrol */}
          <div className="bg-surface-white rounded-xl p-space-md shadow-sm mb-space-xl flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-space-md">
            <div className="flex flex-wrap items-center gap-space-md">
              <div className="flex flex-col min-w-[280px]">
                <label className="font-label-sm text-label-sm text-text-muted mb-1 flex items-center gap-1" htmlFor="filter-group">
                  <span className="material-symbols-outlined text-[16px]">group</span>
                  Kode Kelas
                </label>
                <DropdownPilihan id="filter-group" nilai={kodeKelas} onChange={setKodeKelas} opsi={opsiKelas} />
              </div>
              <div className="flex flex-col min-w-[260px]">
                <label className="font-label-sm text-label-sm text-text-muted mb-1 flex items-center gap-1" htmlFor="filter-jalur">
                  <span className="material-symbols-outlined text-[16px]">alt_route</span>
                  Jalur Usia
                </label>
                <DropdownPilihan id="filter-jalur" nilai={jalur} onChange={setJalur} opsi={JALUR_OPSI} />
              </div>
            </div>
            <div className="flex items-center gap-space-sm self-end xl:self-end pt-2 xl:pt-0">
              <button
                className="h-11 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface-variant font-label-md text-label-md flex items-center gap-2 transition-all active:scale-95 disabled:opacity-70"
                disabled={refreshing || memuat}
                onClick={handleRefresh}
                title="Muat Ulang Data"
                type="button"
              >
                <span className={`material-symbols-outlined text-[18px] ${refreshing ? 'animate-spin' : ''}`}>sync</span>
                <span>Perbarui Data</span>
              </button>
              <button
                className="h-11 px-space-lg rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md flex items-center gap-2 shadow-sm transition-all active:scale-95"
                onClick={() => alert('Menyiapkan berkas Ringkasan Evaluasi Literasi (PDF dan format CSV anonim)...')}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">download</span>
                <span>Unduh Laporan (PDF/CSV)</span>
              </button>
            </div>
          </div>

          {/* Status loading / error */}
          {memuat && (
            <div className="bg-surface-white rounded-xl p-space-lg shadow-sm mb-space-xl flex items-center gap-space-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary animate-spin">progress_activity</span>
              <span className="font-body-sm text-body-sm">Memuat data statistik…</span>
            </div>
          )}
          {!memuat && galat && (
            <div className="bg-danger-red-light rounded-xl p-space-lg shadow-sm mb-space-xl flex items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-sm text-danger-red">
                <span className="material-symbols-outlined">error</span>
                <span className="font-body-sm text-body-sm">{galat}</span>
              </div>
              <button
                className="h-10 px-space-md rounded-lg bg-surface-white text-primary font-label-md text-label-md transition-all active:scale-95"
                onClick={handleRefresh}
                type="button"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* Grid statistik utama */}
          {!memuat && !galat && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-xl">
              {kartu.map((s) => (
                <KartuStat key={s.label} s={s} />
              ))}
            </div>
          )}

          {/* Section analitik */}
          {!memuat && !galat && (
            <div className="flex flex-col gap-space-xl mb-space-xl">
              {/* Grafik distribusi */}
              <div className="bg-surface-white p-space-lg rounded-xl shadow-sm flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-md border-b border-surface-container-high">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[24px]">bar_chart</span>
                      <h2 className="font-headline-md text-headline-md text-primary tracking-tight">Distribusi Skor Pre vs Post</h2>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Jumlah attempt tersubmit per bucket skor (Skala 0 - 10 poin).</p>
                  </div>
                  <div className="flex items-center gap-space-lg shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded bg-secondary-fixed-dim" />
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">Pre-Test</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded bg-primary-container" />
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">Post-Test</span>
                    </div>
                  </div>
                </div>
                <BarChart distribusi={distribusi} />
              </div>

              {/* Soal paling sering salah */}
              <div className="bg-surface-white p-space-lg rounded-xl shadow-sm flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md border-b border-surface-container-high gap-space-sm">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-danger-red text-[24px]">crisis_alert</span>
                      <h2 className="font-headline-md text-headline-md text-primary tracking-tight">Soal Paling Sering Salah</h2>
                    </div>
                    <p className="font-body-sm text-body-sm text-text-muted">Berdasarkan rasio jawaban salah dari attempt tersubmit. Jawaban kosong tidak dihitung.</p>
                  </div>
                </div>
                {soalSalah.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-space-2xl text-center">
                    <span className="material-symbols-outlined text-[40px] text-text-muted">inbox</span>
                    <p className="font-body-sm text-body-sm text-text-muted mt-space-sm">Belum ada data jawaban salah.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md mt-space-lg">
                    {soalSalah.map((v, i) => {
                      const pct = v.persenSalah
                      const rank = (pageSoal - 1) * PAGE_SIZE + i + 1
                      const rankClass =
                        rank === 1
                          ? 'bg-danger-red text-on-error'
                          : rank <= 3
                            ? 'bg-secondary-container text-on-secondary-container'
                            : 'bg-surface-container-high text-on-surface-variant'
                      const barClass = rank === 1 ? 'bg-danger-red' : rank <= 3 ? 'bg-secondary-container' : 'bg-primary-container'
                      const badgeClass = rank === 1 ? 'bg-danger-red-light text-danger-red' : 'bg-warning-yellow-light text-secondary'
                      return (
                        <div
                          className="p-space-md rounded-xl bg-surface-cream hover:bg-surface-card-subtle transition-colors flex flex-col justify-between border border-border-subtle"
                          key={v.questionId}
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-label-sm text-label-sm shrink-0 ${rankClass}`}>{rank}</span>
                                <span className="font-label-md text-label-md text-on-surface font-bold truncate">{v.questionId}</span>
                              </div>
                              <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold shrink-0 ${badgeClass}`}>
                                {pct === null || pct === undefined ? '—' : `${pct}% Salah`}
                              </span>
                            </div>
                            <p className="font-body-sm text-body-sm text-text-muted line-clamp-2 mt-1">
                              Kategori: {v.kategori || 'Tanpa Kategori'} · {fmt(v.salah)} salah dari {fmt(v.dijawab)} dijawab
                            </p>
                          </div>
                          <div className="mt-space-md pt-space-sm border-t border-surface-container-high flex items-center gap-2">
                            <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                              <div className={`h-full rounded-full ${barClass}`} style={{ width: `${pct || 0}%` }} />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
                <div className="flex items-center justify-between mt-space-lg pt-space-sm border-t border-surface-container-high">
                  <span className="font-label-sm text-label-sm text-text-muted">Halaman {pageSoal}</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="h-9 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface-variant font-label-sm text-label-sm disabled:opacity-50 transition-all"
                      disabled={pageSoal <= 1}
                      onClick={() => setPageSoal((p) => Math.max(1, p - 1))}
                      type="button"
                    >
                      Sebelumnya
                    </button>
                    <button
                      className="h-9 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface-variant font-label-sm text-label-sm disabled:opacity-50 transition-all"
                      disabled={soalSalah.length < PAGE_SIZE}
                      onClick={() => setPageSoal((p) => p + 1)}
                      type="button"
                    >
                      Berikutnya
                    </button>
                  </div>
                </div>
              </div>

              {/* Kategori paling sering salah */}
              <div className="bg-surface-white p-space-lg rounded-xl shadow-sm flex flex-col">
                <div className="flex items-center gap-2 pb-space-md border-b border-surface-container-high">
                  <span className="material-symbols-outlined text-secondary text-[24px]">category</span>
                  <h2 className="font-headline-md text-headline-md text-primary tracking-tight">Kategori Paling Sering Salah</h2>
                </div>
                {kategoriSalah.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-space-2xl text-center">
                    <span className="material-symbols-outlined text-[40px] text-text-muted">inbox</span>
                    <p className="font-body-sm text-body-sm text-text-muted mt-space-sm">Belum ada data kategori salah.</p>
                  </div>
                ) : (
                  <div className="flex flex-col divide-y divide-surface-container-high mt-space-sm">
                    {kategoriSalah.map((k) => (
                      <div className="flex items-center justify-between gap-space-md py-space-sm" key={k.kategori}>
                        <div className="flex flex-col min-w-0">
                          <span className="font-label-md text-label-md text-on-surface font-bold truncate">{k.kategori}</span>
                          <span className="font-body-sm text-body-sm text-text-muted">{fmt(k.salah)} salah dari {fmt(k.dijawab)} dijawab</span>
                        </div>
                        <div className="flex items-center gap-space-md shrink-0">
                          <div className="w-32 bg-surface-container-high rounded-full h-2 overflow-hidden hidden sm:block">
                            <div className="h-full rounded-full bg-secondary-container" style={{ width: `${k.persenSalah || 0}%` }} />
                          </div>
                          <span className="font-label-md text-label-md text-secondary font-bold w-16 text-right">
                            {k.persenSalah === null || k.persenSalah === undefined ? '—' : `${k.persenSalah}%`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mt-space-lg pt-space-sm border-t border-surface-container-high">
                  <span className="font-label-sm text-label-sm text-text-muted">Halaman {pageKategori}</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="h-9 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface-variant font-label-sm text-label-sm disabled:opacity-50 transition-all"
                      disabled={pageKategori <= 1}
                      onClick={() => setPageKategori((p) => Math.max(1, p - 1))}
                      type="button"
                    >
                      Sebelumnya
                    </button>
                    <button
                      className="h-9 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface-variant font-label-sm text-label-sm disabled:opacity-50 transition-all"
                      disabled={kategoriSalah.length < PAGE_SIZE}
                      onClick={() => setPageKategori((p) => p + 1)}
                      type="button"
                    >
                      Berikutnya
                    </button>
                  </div>
                </div>
              </div>

              {/* Ringkasan kode kelas */}
              <div className="bg-surface-white p-space-lg rounded-xl shadow-sm flex flex-col">
                <div className="flex items-center gap-2 pb-space-md border-b border-surface-container-high">
                  <span className="material-symbols-outlined text-primary text-[24px]">school</span>
                  <h2 className="font-headline-md text-headline-md text-primary tracking-tight">Ringkasan Kode Kelas</h2>
                </div>
                {kodeKelasStats.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-space-2xl text-center">
                    <span className="material-symbols-outlined text-[40px] text-text-muted">inbox</span>
                    <p className="font-body-sm text-body-sm text-text-muted mt-space-sm">Belum ada kode kelas terdaftar.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto mt-space-sm">
                    <table className="w-full min-w-[720px] text-left">
                      <thead>
                        <tr className="border-b border-surface-container-high">
                          <th className="py-space-sm font-label-sm text-label-sm text-text-muted uppercase tracking-wider">Kode</th>
                          <th className="py-space-sm font-label-sm text-label-sm text-text-muted uppercase tracking-wider">Status</th>
                          <th className="py-space-sm font-label-sm text-label-sm text-text-muted uppercase tracking-wider text-right">Peserta</th>
                          <th className="py-space-sm font-label-sm text-label-sm text-text-muted uppercase tracking-wider text-right">Pre Selesai</th>
                          <th className="py-space-sm font-label-sm text-label-sm text-text-muted uppercase tracking-wider text-right">Post Selesai</th>
                          <th className="py-space-sm font-label-sm text-label-sm text-text-muted uppercase tracking-wider text-right">Rata Pre</th>
                          <th className="py-space-sm font-label-sm text-label-sm text-text-muted uppercase tracking-wider text-right">Rata Post</th>
                          <th className="py-space-sm font-label-sm text-label-sm text-text-muted uppercase tracking-wider text-right">% Selesai</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kodeKelasStats.map((k) => (
                          <tr className="border-b border-surface-container-high last:border-0" key={k.code}>
                            <td className="py-space-sm">
                              <div className="flex flex-col">
                                <span className="font-label-md text-label-md text-on-surface font-bold">{k.code}</span>
                                {k.label && <span className="font-body-sm text-body-sm text-text-muted">{k.label}</span>}
                              </div>
                            </td>
                            <td className="py-space-sm">
                              <span
                                className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${
                                  k.active ? 'bg-safe-green-light text-tertiary' : 'bg-surface-container-high text-on-surface-variant'
                                }`}
                              >
                                {k.active ? 'Aktif' : 'Nonaktif'}
                              </span>
                            </td>
                            <td className="py-space-sm font-body-sm text-body-sm text-on-surface text-right">{fmt(k.jumlahPeserta)}</td>
                            <td className="py-space-sm font-body-sm text-body-sm text-on-surface text-right">{fmt(k.pretestSelesai)}</td>
                            <td className="py-space-sm font-body-sm text-body-sm text-on-surface text-right">{fmt(k.posttestSelesai)}</td>
                            <td className="py-space-sm font-body-sm text-body-sm text-on-surface text-right">{fmtDesimal(k.rataRataPretest) ?? '—'}</td>
                            <td className="py-space-sm font-body-sm text-body-sm text-on-surface text-right">{fmtDesimal(k.rataRataPosttest) ?? '—'}</td>
                            <td className="py-space-sm font-body-sm text-body-sm text-on-surface text-right">{fmt(k.persenPenyelesaianPosttest, { suffix: '%' })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="flex items-center justify-between mt-space-lg pt-space-sm border-t border-surface-container-high">
                  <span className="font-label-sm text-label-sm text-text-muted">Halaman {pageKode}</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="h-9 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface-variant font-label-sm text-label-sm disabled:opacity-50 transition-all"
                      disabled={pageKode <= 1}
                      onClick={() => setPageKode((p) => Math.max(1, p - 1))}
                      type="button"
                    >
                      Sebelumnya
                    </button>
                    <button
                      className="h-9 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface-variant font-label-sm text-label-sm disabled:opacity-50 transition-all"
                      disabled={kodeKelasStats.length < PAGE_SIZE}
                      onClick={() => setPageKode((p) => p + 1)}
                      type="button"
                    >
                      Berikutnya
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty state: belum ada peserta pada filter aktif */}
          {!memuat && !galat && !adaData && (
            <div className="bg-surface-white rounded-xl p-space-2xl text-center shadow-sm mb-space-xl relative overflow-hidden">
              <div className="max-w-xl mx-auto flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary-container mb-space-md shadow-inner">
                  <span className="material-symbols-outlined text-[40px]">folder_off</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary tracking-tight mb-space-xs">Belum Ada Peserta</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg leading-relaxed">
                  {kodeKelas !== 'all' ? (
                    <>
                      Kode kelas <span className="font-bold text-primary">{kodeKelas}</span> belum memiliki peserta yang menyelesaikan
                      pre-test atau post-test. Bagikan kode kelompok ini kepada warga binaan untuk mulai mengumpulkan data literasi.
                    </>
                  ) : (
                    'Belum ada peserta yang terdaftar pada filter ini. Bagikan kode kelas kepada warga binaan untuk mulai mengumpulkan data literasi.'
                  )}
                </p>
                {kodeKelas !== 'all' && (
                  <div className="bg-surface-cream p-space-lg rounded-xl flex flex-col sm:flex-row items-center justify-between gap-space-md w-full mb-space-lg">
                    <div className="flex items-center gap-space-md">
                      <span className="material-symbols-outlined text-primary text-[28px]">qr_code_2</span>
                      <div className="text-left">
                        <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider block">Kode Masuk Peserta</span>
                        <span className="font-headline-md text-headline-md font-bold tracking-widest text-primary">{kodeKelas}</span>
                      </div>
                    </div>
                    <button
                      className={`h-11 px-space-lg rounded-lg font-label-md text-label-md flex items-center gap-2 transition-all active:scale-95 ${
                        copied ? 'bg-tertiary text-on-primary' : 'bg-primary-container hover:bg-primary text-on-primary'
                      }`}
                      onClick={handleCopy}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">{copied ? 'check' : 'content_copy'}</span>
                      <span>{copied ? 'Tersalin!' : 'Salin Tautan Gabung Cepat'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer operasional */}
          <div className="pt-space-lg border-t-0 flex flex-col md:flex-row items-center justify-between gap-space-md text-text-muted font-body-sm text-body-sm">
            <div className="flex items-center gap-space-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-tertiary">security</span>
                <span>Gerakan Edukasi Bersama Pengurus Lingkungan & Satgas Edukasi Siber</span>
              </div>
              <span className="hidden md:inline">|</span>
              <a className="hover:text-primary transition-colors" href="#">Bantuan Teknis Pengelola</a>
            </div>
          </div>
        </div>
      </main>
    </AdminShell>
  )
}
