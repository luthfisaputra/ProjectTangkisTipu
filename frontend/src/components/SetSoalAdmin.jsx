import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AdminShell from './AdminShell.jsx'
import SetSoalCreateModal from './SetSoalCreateModal.jsx'
import SetSoalEditor from './SetSoalEditor.jsx'
import SetSoalHeader from './SetSoalHeader.jsx'
import SetSoalStats from './SetSoalStats.jsx'
import SetSoalTable from './SetSoalTable.jsx'
import { MAKS_SOAL, formatTanggal } from '../data/setSoal.js'
import {
  listQuestionSets,
  getQuestionSet,
  createQuestionSet,
  updateQuestionSet,
  publishQuestionSet,
  archiveQuestionSet,
  createSetQuestion,
  updateSetQuestion,
  deleteSetQuestion,
} from '../api.js'

const FILTER_AWAL = { q: '', jalur: '', tipe: '', status: '' }

// Ringkasan daftar soal mengikuti naskah pertanyaan terbaru.
function ringkasDari(teks) {
  const bersih = String(teks || '').trim().replace(/\s+/g, ' ')
  if (!bersih) return 'Belum ada naskah soal...'
  return bersih.length > 46 ? `${bersih.slice(0, 46).trimEnd()}...` : bersih
}

// Normalisasi soal dari backend ke bentuk yang dipakai komponen editor.
function mapSoal(s) {
  return {
    id: s.id,
    kategori: s.kategori || '',
    pertanyaan: s.pertanyaan || '',
    opsi: Array.isArray(s.opsi) ? s.opsi : [],
    kunci: typeof s.kunci === 'number' ? s.kunci : 0,
    ulasan: s.ulasan || '',
    ringkas: ringkasDari(s.pertanyaan),
  }
}

export default function SetSoalAdmin({ onNavigate = () => {}, onKeluar = () => {}, onUnauthorized = () => {} }) {
  const [sets, setSets] = useState([])
  const [filters, setFilters] = useState(FILTER_AWAL)
  const [aktifId, setAktifId] = useState(null)
  const [idxSoal, setIdxSoal] = useState(0)
  const [pesan, setPesan] = useState('')
  const [galat, setGalat] = useState('')
  const [memuat, setMemuat] = useState(true)
  const [memuatSoal, setMemuatSoal] = useState(false)
  const [menyimpan, setMenyimpan] = useState(false)
  const [modalBuat, setModalBuat] = useState(false)

  // Draf soal yang sedang disunting (belum tentu tersimpan ke backend).
  const [daftarSoal, setDaftarSoal] = useState([])
  const [soalKotor, setSoalKotor] = useState(false)
  const [soalBaru, setSoalBaru] = useState(false)
  const [drafSet, setDrafSet] = useState(null)
  const [setKotor, setSetKotor] = useState(false)

  const aktifIdRef = useRef(null)
  aktifIdRef.current = aktifId

  const beritahu = (teks) => setPesan(teks)

  useEffect(() => {
    if (!pesan) return
    const timer = window.setTimeout(() => setPesan(''), 3200)
    return () => window.clearTimeout(timer)
  }, [pesan])

  const keEditor = () =>
    window.setTimeout(
      () => document.getElementById('editor-set-soal')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      60
    )

  // Tangani 401 dengan mekanisme sesi admin yang sudah ada.
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

  const muatSets = useCallback(async () => {
    setMemuat(true)
    setGalat('')
    try {
      const res = await listQuestionSets()
      setSets(Array.isArray(res?.sets) ? res.sets : [])
    } catch (err) {
      tanganiGalat(err, 'Gagal memuat daftar set soal.')
    } finally {
      setMemuat(false)
    }
  }, [tanganiGalat])

  useEffect(() => {
    muatSets()
  }, [muatSets])

  const setAktif = useMemo(() => sets.find((s) => s.id === aktifId) || null, [sets, aktifId])
  const setTampil = drafSet && drafSet.id === aktifId ? drafSet : setAktif

  const terlihat = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    return sets.filter((s) => {
      const cocokQ =
        !q ||
        String(s.nama || '').toLowerCase().includes(q) ||
        String(s.id || '').toLowerCase().includes(q) ||
        String(s.catatan || '').toLowerCase().includes(q)
      const cocokJalur = !filters.jalur || s.jalur === filters.jalur
      const cocokTipe = !filters.tipe || s.tipe === filters.tipe
      const cocokStatus = !filters.status || s.status === filters.status
      return cocokQ && cocokJalur && cocokTipe && cocokStatus
    })
  }, [sets, filters])

  const idxAman = Math.min(idxSoal, Math.max(0, daftarSoal.length - 1))
  const hitungSoal = (id) => {
    const s = sets.find((x) => x.id === id)
    return s && typeof s.jumlahSoal === 'number' ? s.jumlahSoal : 0
  }

  // Muat detail set + soal dari backend saat set aktif berubah.
  useEffect(() => {
    if (!aktifId) {
      setDaftarSoal([])
      setDrafSet(null)
      setSoalKotor(false)
      setSoalBaru(false)
      setSetKotor(false)
      return
    }
    let aktif = true
    setMemuatSoal(true)
    setGalat('')
    getQuestionSet(aktifId)
      .then((res) => {
        if (!aktif) return
        setDrafSet(res?.set || null)
        setDaftarSoal((res?.soal || []).map(mapSoal))
        setIdxSoal(0)
        setSoalKotor(false)
        setSoalBaru(false)
        setSetKotor(false)
      })
      .catch((err) => {
        if (!aktif) return
        tanganiGalat(err, 'Gagal memuat detail set soal.')
      })
      .finally(() => {
        if (aktif) setMemuatSoal(false)
      })
    return () => {
      aktif = false
    }
  }, [aktifId, tanganiGalat])

  /* ---- Aksi tabel ---- */
  const pilihSet = (id) => {
    setAktifId(id)
    setIdxSoal(0)
    keEditor()
  }

  const hapusSet = async (id) => {
    const asal = sets.find((s) => s.id === id)
    if (!asal) return
    if (!window.confirm(`Arsipkan set soal "${asal.nama}"? Status akan kembali menjadi draf.`)) return
    try {
      await archiveQuestionSet(id)
      beritahu('Set soal diarsipkan (status draf).')
      await muatSets()
      if (aktifIdRef.current === id) setAktifId(null)
    } catch (err) {
      tanganiGalat(err, 'Gagal mengarsipkan set soal.')
    }
  }

  const buatSetBaru = async (form) => {
    setMenyimpan(true)
    setGalat('')
    try {
      const res = await createQuestionSet({
        nama: form.nama,
        catatan: form.catatan,
        jalur: form.jalur,
        tipe: form.tipe,
        kodeKelas: form.kodeKelas || null,
        rilis: form.rilis || null,
        tutup: form.tutup || null,
      })
      const baru = res?.set
      setModalBuat(false)
      setFilters(FILTER_AWAL)
      await muatSets()
      if (baru?.id) {
        setAktifId(baru.id)
        setIdxSoal(0)
        keEditor()
      }
      beritahu(`Set "${form.nama}" dibuat sebagai draf.`)
    } catch (err) {
      tanganiGalat(err, 'Gagal membuat set soal.')
    } finally {
      setMenyimpan(false)
    }
  }

  /* ---- Aksi form parameter set ---- */
  const ubahSet = (field, value) => {
    setDrafSet((prev) => {
      const basis = prev && prev.id === aktifId ? prev : setAktif
      if (!basis) return prev
      return { ...basis, [field]: value }
    })
    setSetKotor(true)
  }

  const ubahFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }))

  /* ---- Aksi editor soal ---- */
  const ubahSoal = (field, value) =>
    setDaftarSoal((list) =>
      list.map((s, i) =>
        i === idxAman
          ? { ...s, [field]: value, ...(field === 'pertanyaan' ? { ringkas: ringkasDari(value) } : {}) }
          : s
      )
    )

  const ubahOpsi = (iOpsi, value) =>
    setDaftarSoal((list) =>
      list.map((s, i) => (i === idxAman ? { ...s, opsi: s.opsi.map((o, j) => (j === iOpsi ? value : o)) } : s))
    )

  const pilihKunci = (iOpsi) => setDaftarSoal((list) => list.map((s, i) => (i === idxAman ? { ...s, kunci: iOpsi } : s)))

  const tandaiKotor = () => setSoalKotor(true)

  const tambahSoal = () => {
    if (daftarSoal.length >= MAKS_SOAL) return
    const nomorBaru = daftarSoal.length + 1
    setDaftarSoal((list) => [
      ...list,
      { id: null, kategori: '', pertanyaan: '', opsi: ['', '', '', ''], kunci: 0, ulasan: '', ringkas: 'Belum ada naskah soal...' },
    ])
    setIdxSoal(daftarSoal.length)
    setSoalBaru(true)
    setSoalKotor(true)
    beritahu(`Soal nomor ${nomorBaru} ditambahkan. Lengkapi lalu simpan.`)
  }

  const hapusSoal = async () => {
    const soal = daftarSoal[idxAman]
    if (!soal) return
    if (daftarSoal.length <= 1) {
      beritahu('Set harus memiliki minimal satu soal.')
      return
    }
    if (!window.confirm(`Hapus soal nomor ${idxAman + 1}?`)) return
    if (soal.id) {
      try {
        await deleteSetQuestion(aktifId, soal.id)
        beritahu(`Soal nomor ${idxAman + 1} dihapus.`)
        await muatSets()
        const res = await getQuestionSet(aktifId)
        setDrafSet(res?.set || null)
        setDaftarSoal((res?.soal || []).map(mapSoal))
        setIdxSoal(Math.max(0, idxAman - 1))
        setSoalKotor(false)
        setSoalBaru(false)
      } catch (err) {
        tanganiGalat(err, 'Gagal menghapus soal.')
      }
      return
    }
    setDaftarSoal((list) => list.filter((_, i) => i !== idxAman))
    setIdxSoal(Math.max(0, idxAman - 1))
    beritahu(`Soal nomor ${idxAman + 1} dibatalkan.`)
  }

  // Validasi payload soal sesuai kontrak backend.
  const validasiSoal = (soal) => {
    if (!soal.kategori.trim()) return 'Kategori soal wajib diisi.'
    if (!soal.pertanyaan.trim()) return 'Naskah pertanyaan masih kosong.'
    const opsi = soal.opsi.map((o) => o.trim())
    if (opsi.length < 2) return 'Minimal dua pilihan jawaban.'
    if (opsi.some((o) => !o)) return 'Semua pilihan jawaban harus diisi.'
    if (soal.kunci < 0 || soal.kunci >= opsi.length) return 'Kunci jawaban di luar rentang opsi.'
    return ''
  }

  const payloadSoal = (soal) => ({
    kategori: soal.kategori.trim(),
    pertanyaan: soal.pertanyaan.trim(),
    opsi: soal.opsi.map((o) => o.trim()),
    kunci: soal.kunci,
    ulasan: soal.ulasan.trim() || null,
  })

  const perbaruiSoal = async () => {
    const soal = daftarSoal[idxAman]
    if (!soal) return
    const galatSoal = validasiSoal(soal)
    if (galatSoal) {
      beritahu(galatSoal)
      return
    }
    setMenyimpan(true)
    setGalat('')
    try {
      if (soal.id) {
        await updateSetQuestion(aktifId, soal.id, payloadSoal(soal))
      } else {
        await createSetQuestion(aktifId, payloadSoal(soal))
      }
      beritahu(`Soal nomor ${idxAman + 1} tersimpan.`)
      await muatSets()
      const res = await getQuestionSet(aktifId)
      setDrafSet(res?.set || null)
      setDaftarSoal((res?.soal || []).map(mapSoal))
      setSoalKotor(false)
      setSoalBaru(false)
    } catch (err) {
      tanganiGalat(err, 'Gagal menyimpan soal.')
    } finally {
      setMenyimpan(false)
    }
  }

  // Simpan soal aktif lalu pindah ke soal berikutnya / tambah soal baru.
  const lanjutSoal = async () => {
    const soal = daftarSoal[idxAman]
    if (soal && (soal.pertanyaan.trim() || soal.id)) {
      const galatSoal = validasiSoal(soal)
      if (galatSoal) {
        beritahu(galatSoal)
        return
      }
      setMenyimpan(true)
      try {
        if (soal.id) {
          await updateSetQuestion(aktifId, soal.id, payloadSoal(soal))
        } else {
          await createSetQuestion(aktifId, payloadSoal(soal))
        }
        await muatSets()
        const res = await getQuestionSet(aktifId)
        setDrafSet(res?.set || null)
        const soalBaruList = (res?.soal || []).map(mapSoal)
        setDaftarSoal(soalBaruList)
        setSoalKotor(false)
        setSoalBaru(false)
        if (idxSoal < soalBaruList.length - 1) {
          setIdxSoal(idxSoal + 1)
        } else {
          tambahSoal()
        }
      } catch (err) {
        tanganiGalat(err, 'Gagal menyimpan soal.')
      } finally {
        setMenyimpan(false)
      }
      return
    }
    if (idxSoal < daftarSoal.length - 1) setIdxSoal(idxSoal + 1)
    else tambahSoal()
  }

  // Menyisipkan rujukan sumber resmi ke kolom ulasan soal aktif.
  const sisipTautan = () => {
    const soal = daftarSoal[idxAman]
    if (!soal) return
    const tautan = window.prompt(
      'Masukkan tautan rujukan resmi (OJK, Satgas PASTI, Komdigi, atau Polri):',
      'https://ojk.go.id'
    )
    if (!tautan) return
    const baris = `Sumber: ${tautan.trim()}`
    const ulasanBaru = soal.ulasan.trim() ? `${soal.ulasan.trim()}\n${baris}` : baris
    ubahSoal('ulasan', ulasanBaru)
    tandaiKotor()
    beritahu('Tautan rujukan disisipkan ke kolom ulasan soal.')
  }

  const simpanDraf = async () => {
    if (!setTampil) return
    if (setTampil.rilis && setTampil.tutup && setTampil.tutup < setTampil.rilis) {
      beritahu('Tanggal tutup tidak boleh sebelum tanggal rilis.')
      return
    }
    setMenyimpan(true)
    setGalat('')
    try {
      await updateQuestionSet(setTampil.id, {
        nama: setTampil.nama,
        catatan: setTampil.catatan || null,
        jalur: setTampil.jalur,
        tipe: setTampil.tipe,
        kodeKelas: setTampil.kodeKelas || null,
        rilis: setTampil.rilis || null,
        tutup: setTampil.tutup || null,
      })
      beritahu('Perubahan set soal disimpan sebagai draf.')
      await muatSets()
      setSetKotor(false)
    } catch (err) {
      tanganiGalat(err, 'Gagal menyimpan set soal.')
    } finally {
      setMenyimpan(false)
    }
  }

  const rilisSet = async () => {
    if (!setTampil) return
    if (setTampil.rilis && setTampil.tutup && setTampil.tutup < setTampil.rilis) {
      beritahu('Tanggal tutup tidak boleh sebelum tanggal rilis.')
      return
    }
    if (!String(setTampil.kodeKelas || '').trim()) {
      beritahu('Isi kode kelas dulu agar set hanya bisa diakses peserta yang tepat.')
      return
    }
    setMenyimpan(true)
    setGalat('')
    try {
      const res = await publishQuestionSet(setTampil.id, {
        rilis: setTampil.rilis || null,
        tutup: setTampil.tutup || null,
      })
      const status = res?.set?.status
      beritahu(
        status === 'terjadwal'
          ? `Set dijadwalkan rilis ${formatTanggal(setTampil.rilis)}${
              setTampil.tutup ? ` dan ditutup ${formatTanggal(setTampil.tutup)}` : ''
            }.`
          : 'Set dirilis dan langsung aktif untuk peserta.'
      )
      await muatSets()
      setSetKotor(false)
    } catch (err) {
      tanganiGalat(err, 'Gagal merilis set soal.')
    } finally {
      setMenyimpan(false)
    }
  }

  return (
    <AdminShell active="set-soal" onKeluar={onKeluar} onNavigate={onNavigate}>
      <main className="w-full pt-16 bg-surface-cream px-space-xl py-space-xl">
        <div className="flex flex-col w-full gap-space-2xl">
          <SetSoalHeader onBuatBaru={() => setModalBuat(true)} />

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

          <SetSoalStats sets={sets} />

          {memuat ? (
            <div className="bg-surface-white rounded-xl shadow-sm p-space-2xl flex flex-col items-center gap-space-sm text-text-muted">
              <span aria-hidden="true" className="material-symbols-outlined text-[32px] animate-spin text-primary">progress_activity</span>
              <span className="font-body-sm text-body-sm">Memuat set soal…</span>
            </div>
          ) : (
            <SetSoalTable
              aktifId={aktifId}
              filters={filters}
              hitungSoal={hitungSoal}
              onDuplikat={() => beritahu('Fitur duplikat belum tersedia di backend.')}
              onEdit={pilihSet}
              onHapus={hapusSet}
              onUbahFilter={ubahFilter}
              sets={terlihat}
            />
          )}

          {memuatSoal ? (
            <div className="bg-surface-white rounded-xl shadow-sm p-space-2xl flex flex-col items-center gap-space-sm text-text-muted">
              <span aria-hidden="true" className="material-symbols-outlined text-[32px] animate-spin text-primary">progress_activity</span>
              <span className="font-body-sm text-body-sm">Memuat detail set…</span>
            </div>
          ) : (
            <SetSoalEditor
              daftarSoal={daftarSoal}
              idxSoal={idxAman}
              onHapusSoal={hapusSoal}
              onPilihKunci={pilihKunci}
              onPilihSoal={setIdxSoal}
              onPerbarui={perbaruiSoal}
              onRilis={rilisSet}
              onSimpanDraf={simpanDraf}
              onSisipTautan={sisipTautan}
              onTambahSoal={tambahSoal}
              onUbahOpsi={ubahOpsi}
              onUbahSet={ubahSet}
              onUbahSoal={(field, value) => {
                ubahSoal(field, value)
                tandaiKotor()
              }}
              set={setTampil}
            />
          )}
        </div>
      </main>

      {modalBuat && (
        <SetSoalCreateModal
          onBatal={() => setModalBuat(false)}
          onKonfirmasi={buatSetBaru}
          menyimpan={menyimpan}
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
