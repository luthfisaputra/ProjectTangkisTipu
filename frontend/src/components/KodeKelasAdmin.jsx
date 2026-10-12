import { useCallback, useEffect, useMemo, useState } from 'react'
import AdminShell from './AdminShell.jsx'
import KodeKelasDetail from './KodeKelasDetail.jsx'
import KodeKelasHeader from './KodeKelasHeader.jsx'
import KodeKelasModal from './KodeKelasModal.jsx'
import KodeKelasStats from './KodeKelasStats.jsx'
import KodeKelasTable from './KodeKelasTable.jsx'
import { pesanPengingat } from '../data/kodeKelas.js'
import {
  listClassCodes,
  getClassCode,
  createClassCode,
  updateClassCode,
  activateClassCode,
  deactivateClassCode,
  listQuestionSets,
} from '../api.js'

const FILTER_AWAL = { q: '', tab: 'semua' }

// Petakan filter tab UI ke query `active` backend.
function activeDariTab(tab) {
  if (tab === 'aktif') return 'true'
  if (tab === 'nonaktif') return 'false'
  return 'all'
}

// Normalisasi satu kode kelas dari backend ke bentuk yang dipakai komponen.
function mapKode(c) {
  return {
    kode: c.code,
    nama: c.label || `Kelompok ${c.code}`,
    catatan: c.label || 'Belum ada label kelompok',
    active: c.active !== false,
    status: c.active !== false ? 'aktif' : 'nonaktif',
    jumlahPeserta: typeof c.jumlahPeserta === 'number' ? c.jumlahPeserta : 0,
    jumlahSet: typeof c.jumlahSet === 'number' ? c.jumlahSet : 0,
    createdAt: c.createdAt || '',
    setIds: Array.isArray(c.setIds) ? c.setIds : [],
  }
}

// Halaman admin Kode Kelas: daftar kode kelas + relasi set soal dari backend.
export default function KodeKelasAdmin({ onNavigate = () => {}, onKeluar = () => {}, onUnauthorized = () => {} }) {
  const [filters, setFilters] = useState(FILTER_AWAL)
  const [daftar, setDaftar] = useState([])
  const [sets, setSets] = useState([])
  const [kodeTerpilih, setKodeTerpilih] = useState(null)
  const [detail, setDetail] = useState(null)
  const [memuat, setMemuat] = useState(true)
  const [memuatDetail, setMemuatDetail] = useState(false)
  const [menyimpan, setMenyimpan] = useState(false)
  const [galat, setGalat] = useState('')
  const [pesan, setPesan] = useState('')
  const [modal, setModal] = useState(null) // null | { mode: 'buat' | 'edit', awal }

  useEffect(() => {
    if (!pesan) return
    const timer = window.setTimeout(() => setPesan(''), 3200)
    return () => window.clearTimeout(timer)
  }, [pesan])

  const beritahu = (teks) => setPesan(teks)
  const keDetail = () =>
    window.setTimeout(
      () => document.getElementById('detail-kelas')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      60
    )

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

  const muatDaftar = useCallback(async () => {
    setMemuat(true)
    setGalat('')
    try {
      const res = await listClassCodes({ active: activeDariTab(filters.tab), q: filters.q.trim() || undefined })
      setDaftar((Array.isArray(res?.classCodes) ? res.classCodes : []).map(mapKode))
    } catch (err) {
      tanganiGalat(err, 'Gagal memuat daftar kode kelas.')
    } finally {
      setMemuat(false)
    }
  }, [filters.tab, filters.q, tanganiGalat])

  const muatSets = useCallback(async () => {
    try {
      const res = await listQuestionSets()
      setSets(Array.isArray(res?.sets) ? res.sets : [])
    } catch (err) {
      tanganiGalat(err, 'Gagal memuat daftar set soal.')
    }
  }, [tanganiGalat])

  useEffect(() => {
    muatSets()
  }, [muatSets])

  // Muat ulang daftar saat filter/pencarian berubah (debounce pencarian).
  useEffect(() => {
    const timer = window.setTimeout(muatDaftar, filters.q ? 300 : 0)
    return () => window.clearTimeout(timer)
  }, [muatDaftar, filters.q])

  // Muat detail kode kelas terpilih dari backend (termasuk setIds).
  useEffect(() => {
    if (!kodeTerpilih) {
      setDetail(null)
      return
    }
    let aktif = true
    setMemuatDetail(true)
    getClassCode(kodeTerpilih)
      .then((res) => {
        if (!aktif) return
        setDetail(res?.classCode ? mapKode(res.classCode) : null)
      })
      .catch((err) => {
        if (!aktif) return
        tanganiGalat(err, 'Gagal memuat detail kode kelas.')
      })
      .finally(() => {
        if (aktif) setMemuatDetail(false)
      })
    return () => {
      aktif = false
    }
  }, [kodeTerpilih, tanganiGalat])

  const terpilih = useMemo(
    () => detail || daftar.find((k) => k.kode === kodeTerpilih) || daftar[0] || null,
    [detail, daftar, kodeTerpilih]
  )

  const hitungTab = (id) => {
    if (id === 'semua') return daftar.length
    if (id === 'aktif') return daftar.filter((k) => k.active).length
    if (id === 'nonaktif') return daftar.filter((k) => !k.active).length
    return 0
  }

  const ubahFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }))

  const salinTeks = async (teks, info) => {
    try {
      await navigator.clipboard.writeText(teks)
      beritahu(info)
    } catch {
      beritahu('Peramban menolak akses papan klip. Salin manual ya.')
    }
  }

  const salinKode = (kode) => salinTeks(kode, `Kode kelas ${kode} disalin ke papan klip.`)

  const salinPesan = (kelompokTerpilih) =>
    salinTeks(pesanPengingat(kelompokTerpilih), `Pesan pengingat tes ulang kelas ${kelompokTerpilih.kode} disalin.`)

  const pilihKode = (kode) => {
    setKodeTerpilih(kode)
    keDetail()
  }

  const ubahStatus = async (kode, aktifkan) => {
    const aksi = aktifkan ? 'mengaktifkan' : 'menonaktifkan'
    if (!window.confirm(`Yakin ${aksi} kode kelas ${kode}?`)) return
    setGalat('')
    try {
      if (aktifkan) await activateClassCode(kode)
      else await deactivateClassCode(kode)
      beritahu(`Kode kelas ${kode} berhasil di${aktifkan ? 'aktifkan' : 'nonaktifkan'}.`)
      await muatDaftar()
      if (kodeTerpilih === kode) {
        const res = await getClassCode(kode)
        setDetail(res?.classCode ? mapKode(res.classCode) : null)
      }
    } catch (err) {
      tanganiGalat(err, `Gagal ${aksi} kode kelas.`)
    }
  }

  const simpanKode = async (payload) => {
    setMenyimpan(true)
    setGalat('')
    try {
      if (modal?.mode === 'edit') {
        await updateClassCode(modal.awal.kode, payload)
        beritahu(`Kode kelas ${modal.awal.kode} diperbarui.`)
      } else {
        const res = await createClassCode(payload)
        beritahu(`Kode kelas ${res?.classCode?.code || payload.code} dibuat.`)
        setKodeTerpilih(res?.classCode?.code || payload.code)
      }
      setModal(null)
      await muatDaftar()
      if (modal?.mode === 'edit') {
        const res = await getClassCode(modal.awal.kode)
        setDetail(res?.classCode ? mapKode(res.classCode) : null)
      }
    } catch (err) {
      if (err && err.code === 'DUPLICATE_CODE') {
        setGalat('Kode kelas sudah digunakan. Pilih kode lain.')
      } else if (err && err.code === 'INVALID_SET') {
        setGalat('Set soal terkait tidak ditemukan.')
      } else {
        tanganiGalat(err, 'Gagal menyimpan kode kelas.')
      }
    } finally {
      setMenyimpan(false)
    }
  }

  return (
    <AdminShell active="kode-kelas" onKeluar={onKeluar} onNavigate={onNavigate}>
      <main className="w-full pt-16 bg-surface-cream px-space-xl py-space-xl">
        <div className="flex flex-col w-full gap-space-2xl">
          <KodeKelasHeader onBuatKode={() => setModal({ mode: 'buat', awal: null })} />

          {galat && (
            <div
              className="flex items-start gap-space-sm p-space-md rounded-xl bg-danger-red-light text-on-surface shadow-sm"
              role="alert"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px] text-danger-red">error</span>
              <span className="font-body-sm text-body-sm flex-1">{galat}</span>
              <button
                className="font-label-sm text-label-sm text-primary hover:underline shrink-0"
                onClick={() => setGalat('')}
                type="button"
              >
                Tutup
              </button>
            </div>
          )}

          <KodeKelasStats kelompok={daftar} />

          {memuat ? (
            <div className="bg-surface-white rounded-xl shadow-sm p-space-2xl flex flex-col items-center gap-space-sm text-text-muted">
              <span aria-hidden="true" className="material-symbols-outlined text-[32px] animate-spin text-primary">progress_activity</span>
              <span className="font-body-sm text-body-sm">Memuat kode kelas…</span>
            </div>
          ) : (
            <KodeKelasTable
              hitungTab={hitungTab}
              kelompok={daftar}
              kodeTerpilih={terpilih?.kode || null}
              onBuatKode={() => setModal({ mode: 'buat', awal: null })}
              onNonaktifkan={(kode) => ubahStatus(kode, false)}
              onAktifkan={(kode) => ubahStatus(kode, true)}
              onEdit={(kode) => {
                const k = daftar.find((x) => x.kode === kode)
                setModal({ mode: 'edit', awal: k || null })
              }}
              onPilih={pilihKode}
              onSalin={salinKode}
              onUbahFilter={ubahFilter}
              q={filters.q}
              tab={filters.tab}
            />
          )}

          <div className="scroll-mt-20" id="detail-kelas">
            {memuatDetail ? (
              <div className="bg-surface-white rounded-xl shadow-sm p-space-2xl flex flex-col items-center gap-space-sm text-text-muted">
                <span aria-hidden="true" className="material-symbols-outlined text-[32px] animate-spin text-primary">progress_activity</span>
                <span className="font-body-sm text-body-sm">Memuat detail kode kelas…</span>
              </div>
            ) : (
              terpilih && (
                <KodeKelasDetail
                  kelompok={terpilih}
                  onBeritahu={beritahu}
                  onEdit={() => setModal({ mode: 'edit', awal: terpilih })}
                  onSalinKode={salinKode}
                  onSalinPesan={salinPesan}
                  sets={sets}
                />
              )
            )}
          </div>
        </div>
      </main>

      {modal && (
        <KodeKelasModal
          awal={modal.awal}
          mode={modal.mode}
          menyimpan={menyimpan}
          onBatal={() => setModal(null)}
          onKonfirmasi={simpanKode}
          sets={sets}
        />
      )}

      {pesan && (
        <div
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 pop-in bg-surface-white text-on-surface font-label-md text-label-md px-space-md py-space-sm rounded-xl shadow-lg flex items-center gap-space-sm max-w-[calc(100%-3rem)]"
          role="status"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
          <span>{pesan}</span>
        </div>
      )}
    </AdminShell>
  )
}
