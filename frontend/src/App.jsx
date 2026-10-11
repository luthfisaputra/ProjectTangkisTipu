import { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import JalurBelajar from './components/JalurBelajar.jsx'
import SimulasiChat from './components/SimulasiChat.jsx'
import KanalLaporPage from './components/KanalLaporPage.jsx'
import Footer from './components/Footer.jsx'
import BelajarModus from './components/BelajarModus.jsx'
import BelajarModusPopuler from './components/BelajarModusPopuler.jsx'
import ModulDetail from './components/ModulDetail.jsx'
import SimulasiChatModul from './components/SimulasiChatModul.jsx'
import SimulasiKasusInteraktif from './components/SimulasiKasusInteraktif.jsx'
import Komunitas from './components/Komunitas.jsx'
import UjiSkorTes from './components/UjiSkorTes.jsx'
import SimpanKode from './components/SimpanKode.jsx'
import DashboardPeserta from './components/DashboardPeserta.jsx'
import Pretest from './components/Pretest.jsx'
import Posttest from './components/Posttest.jsx'
import LoginPage from './components/LoginPage.jsx'
import DashboardAdmin from './components/DashboardAdmin.jsx'
import KodeKelasAdmin from './components/KodeKelasAdmin.jsx'
import SetSoalAdmin from './components/SetSoalAdmin.jsx'
import { DAFTAR_SOAL, SET_SOAL } from './data/setSoal.js'
import { modul01Pelajar } from './data/modul01Pelajar.jsx'
import { modul02Pelajar } from './data/modul02Pelajar.jsx'
import { modul03Pelajar } from './data/modul03Pelajar.jsx'
import { modul04Pelajar } from './data/modul04Pelajar.jsx'
import { modul01Dewasa } from './data/modul01Dewasa.jsx'
import { modul02Dewasa } from './data/modul02Dewasa.jsx'
import { modul03Dewasa } from './data/modul03Dewasa.jsx'
import { modul04Dewasa } from './data/modul04Dewasa.jsx'
import { modul01Lansia } from './data/modul01Lansia.jsx'
import { modul02Lansia } from './data/modul02Lansia.jsx'
import { modul03Lansia } from './data/modul03Lansia.jsx'
import { modul04Lansia } from './data/modul04Lansia.jsx'
import { SIMULASI_CHAT_MODUL } from './data/simulasiChatModul.jsx'
import { getProgress, updateProgress } from './api.js'

const MODUL = {
  'pelajar-01': modul01Pelajar,
  'pelajar-02': modul02Pelajar,
  'pelajar-03': modul03Pelajar,
  'pelajar-04': modul04Pelajar,
  'dewasa-01': modul01Dewasa,
  'dewasa-02': modul02Dewasa,
  'dewasa-03': modul03Dewasa,
  'dewasa-04': modul04Dewasa,
  'lansia-01': modul01Lansia,
  'lansia-02': modul02Lansia,
  'lansia-03': modul03Lansia,
  'lansia-04': modul04Lansia,
}

const PESERTA_STORAGE_KEY = 'tangkistipu.peserta'

function bacaPesertaTersimpan() {
  try {
    const raw = window.localStorage.getItem(PESERTA_STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return data && data.token ? data : null
  } catch {
    return null
  }
}

export default function App() {
  const [feedback, setFeedback] = useState(false)
  const [page, setPage] = useState('beranda')
  const [modulId, setModulId] = useState(null)
  const [simulasiModulId, setSimulasiModulId] = useState(null)
  const [tesStep, setTesStep] = useState(1)
  const [peserta, setPeserta] = useState(
    () => bacaPesertaTersimpan() || { nickname: '', track: 1, classCode: '', token: '' }
  )
  // State set soal diangkat ke App supaya daftar kode kelas di Dashboard Admin
  // ikut ter-update saat set ditambah/dihapus di halaman Set Soal.
  const [sets, setSets] = useState(SET_SOAL)
  const [bankSoal, setBankSoal] = useState(() => SET_SOAL.reduce((acc, s) => ({ ...acc, [s.id]: DAFTAR_SOAL }), {}))
  const [progres, setProgres] = useState({ pretest: null, modusIds: [], skenario: 0, posttest: null })
  const [progresError, setProgresError] = useState('')
  // Simpan nilai progres terakhir yang sudah dikirim ke backend agar tidak
  // mengirim request berulang untuk nilai yang sama.
  const progresTersinkronRef = useRef({ modusDibaca: 0, skenario: 0 })

  // Skor selalu berasal dari respons backend (submit), bukan dihitung di frontend.
  const selesaikanPretest = (skor, hasil) =>
    setProgres((p) => ({ ...p, pretest: { skor, total: hasil?.total ?? 10, passed: hasil?.passed ?? null } }))

  // Kirim progres parsial ke backend. Backend adalah sumber kebenaran dan
  // nilainya tidak bisa turun (GREATEST), jadi aman dari state lokal usang.
  const simpanProgres = useCallback(async (payload) => {
    const token = peserta?.token
    if (!token) return
    try {
      const res = await updateProgress(token, payload)
      const p = res?.progress
      if (!p) return
      progresTersinkronRef.current = {
        modusDibaca: p.modusDibaca ?? 0,
        skenario: p.skenario ?? 0,
      }
      setProgres((prev) => ({
        ...prev,
        // modusIds lokal dipertahankan; jumlah dibaca mengikuti backend.
        modusIds: prev.modusIds,
        skenario: Math.max(prev.skenario, p.skenario ?? 0),
        pretest: p.pretest > 0 ? { skor: p.pretest, total: 10, passed: prev.pretest?.passed ?? null } : prev.pretest,
        posttest: p.posttest > 0 ? { skor: p.posttest, total: 10, passed: prev.posttest?.passed ?? null } : prev.posttest,
      }))
      setProgresError('')
    } catch {
      setProgresError('Gagal menyimpan progres ke server. Perubahanmu tetap tersimpan di perangkat ini.')
    }
  }, [peserta?.token])

  const tandaiModusDibaca = (id) => {
    setProgres((p) => {
      if (p.modusIds.includes(id)) return p
      const modusIds = [...p.modusIds, id]
      const jumlah = modusIds.length
      if (jumlah > progresTersinkronRef.current.modusDibaca) {
        simpanProgres({ modusDibaca: Math.min(jumlah, 8) })
      }
      return { ...p, modusIds }
    })
  }

  const tandaiSkenarioSelesai = () => {
    setProgres((p) => {
      const skenario = Math.min(p.skenario + 1, 8)
      if (skenario > progresTersinkronRef.current.skenario) {
        simpanProgres({ skenario })
      }
      return { ...p, skenario }
    })
  }

  const selesaikanPosttest = (skor, hasil) =>
    setProgres((p) => ({ ...p, posttest: { skor, total: hasil?.total ?? 10, passed: hasil?.passed ?? null } }))

  // Simpan identitas peserta (termasuk token dari backend) agar bisa dipulihkan.
  useEffect(() => {
    try {
      if (peserta && peserta.token) {
        window.localStorage.setItem(PESERTA_STORAGE_KEY, JSON.stringify(peserta))
      } else {
        window.localStorage.removeItem(PESERTA_STORAGE_KEY)
      }
    } catch {
      // Abaikan bila localStorage tidak tersedia.
    }
  }, [peserta])

  // Muat progres dari backend saat token peserta tersedia. Backend adalah
  // sumber kebenaran; nilai lokal tidak pernah menurunkannya.
  useEffect(() => {
    const token = peserta?.token
    if (!token) return
    let aktif = true
    const controller = new AbortController()

    const muat = async () => {
      try {
        const res = await getProgress(token, { signal: controller.signal })
        if (!aktif) return
        const p = res?.progress
        if (!p) return
        progresTersinkronRef.current = {
          modusDibaca: p.modusDibaca ?? 0,
          skenario: p.skenario ?? 0,
        }
        setProgres((prev) => ({
          ...prev,
          skenario: Math.max(prev.skenario, p.skenario ?? 0),
          pretest: p.pretest > 0 ? { skor: p.pretest, total: 10, passed: prev.pretest?.passed ?? null } : prev.pretest,
          posttest: p.posttest > 0 ? { skor: p.posttest, total: 10, passed: prev.posttest?.passed ?? null } : prev.posttest,
        }))
        setProgresError('')
      } catch (err) {
        if (err && err.name === 'AbortError') return
        if (!aktif) return
        // Jangan hapus identitas peserta hanya karena request gagal sementara.
        setProgresError('Gagal memuat progres dari server. Menampilkan data terakhir yang tersimpan.')
      }
    }

    muat()
    return () => {
      aktif = false
      controller.abort()
    }
  }, [peserta?.token])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-visible)')
    if (!els.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  })

  const navigate = (path) => {
    setPage(
      [
        'belajar-modus',
        'belajar-modus-populer',
        'simulasi-kasus',
        'komunitas',
        'uji-skor-tes',
        'dashboard',
        'pretest',
        'posttest',
        'kanal-lapor',
        'login',
        'admin',
        'set-soal',
        'kode-kelas',
      ].includes(path)
        ? path
        : 'beranda'
    )
    setModulId(null)
    setSimulasiModulId(null)
    setTesStep(1)
    if (path === 'uji-skor-tes') {
      setProgres({ pretest: null, modusIds: [], skenario: 0, posttest: null })
      progresTersinkronRef.current = { modusDibaca: 0, skenario: 0 }
    }
    window.scrollTo({ top: 0 })
  }

  const openModul = (id) => {
    if (!MODUL[id]) return
    setModulId(id)
    window.scrollTo({ top: 0 })
  }

  const closeModul = () => {
    setModulId(null)
    window.scrollTo({ top: 0 })
  }

  // Buka simulasi chat khusus modul (dari detail modul belajar)
  const openSimulasiModul = (id) => {
    if (!SIMULASI_CHAT_MODUL[id]) return
    setSimulasiModulId(id)
    window.scrollTo({ top: 0 })
  }

  const closeSimulasiModul = () => {
    setSimulasiModulId(null)
    window.scrollTo({ top: 0 })
  }

  const backToBerandaFromSimulasi = () => {
    setSimulasiModulId(null)
    setModulId(null)
    setPage('beranda')
    window.scrollTo({ top: 0 })
  }

  // Navbar & Footer disembunyikan di halaman full-bleed (pre-test, login, admin).
  // Footer juga disembunyikan di tampilan simulasi chat per modul.
  const chromeVisible = !['pretest', 'posttest', 'login', 'admin', 'set-soal', 'kode-kelas'].includes(page)

  return (
    <>
      {chromeVisible && (
        <Navbar
          active={
            page === 'dashboard'
              ? 'uji-skor-tes'
              : page === 'belajar-modus-populer'
                ? 'belajar-modus'
                : page
          }
          onNavigate={navigate}
        />
      )}
      <div key={`${page}-${modulId || 'none'}-${simulasiModulId || 'none'}-${tesStep}`} className="page-enter">
        {simulasiModulId ? (
          <SimulasiChatModul
            content={SIMULASI_CHAT_MODUL[simulasiModulId]}
            onBack={closeSimulasiModul}
            onModul={closeSimulasiModul}
            onBeranda={backToBerandaFromSimulasi}
          />
        ) : modulId ? (
          <ModulDetail content={MODUL[modulId]} onBack={closeModul} onSimulasi={openSimulasiModul} />
        ) : page === 'login' ? (
          <LoginPage onKembali={() => navigate('beranda')} onMasuk={() => navigate('admin')} />
        ) : page === 'admin' ? (
          <DashboardAdmin onKeluar={() => navigate('login')} onNavigate={navigate} sets={sets} />
        ) : page === 'set-soal' ? (
          <SetSoalAdmin
            bankSoal={bankSoal}
            onKeluar={() => navigate('login')}
            onNavigate={navigate}
            sets={sets}
            setBankSoal={setBankSoal}
            setSets={setSets}
          />
        ) : page === 'kode-kelas' ? (
          <KodeKelasAdmin onKeluar={() => navigate('login')} onNavigate={navigate} sets={sets} />
        ) : page === 'pretest' ? (
          <Pretest
            token={peserta?.token}
            track={peserta?.track}
            onSelesai={(skor, hasil) => {
              selesaikanPretest(skor, hasil)
              navigate('dashboard')
            }}
            onKeluar={() => navigate('beranda')}
          />
        ) : page === 'posttest' ? (
          <Posttest
            token={peserta?.token}
            track={peserta?.track}
            onSelesai={(skor, hasil) => {
              selesaikanPosttest(skor, hasil)
              navigate('dashboard')
            }}
            onKeluar={() => navigate('dashboard')}
          />
        ) : page === 'dashboard' ? (
          <DashboardPeserta
            peserta={peserta}
            progres={{ ...progres, modusDibaca: Math.max(progres.modusIds.length, progresTersinkronRef.current.modusDibaca) }}
            progresError={progresError}
            onSelesaiPretest={() => navigate('pretest')}
            onSelesaiPosttest={() => navigate('posttest')}
            onModul={() => navigate('belajar-modus')}
            onModulPopuler={() => navigate('belajar-modus-populer')}
            onSimulasiKasus={() => navigate('simulasi-kasus')}
            onSimulasi={() => navigate('komunitas')}
            onHome={() => navigate('uji-skor-tes')}
          />
        ) : page === 'simulasi-kasus' ? (
          <SimulasiKasusInteraktif
            track={peserta.track}
            sudahDijalankan={progres.skenario >= 1}
            onSelesai={tandaiSkenarioSelesai}
            onBack={() => navigate('dashboard')}
          />
        ) : page === 'belajar-modus-populer' ? (
          <BelajarModusPopuler
            track={peserta.track}
            readIds={progres.modusIds}
            onSelesaiSatu={tandaiModusDibaca}
            onBack={() => navigate('dashboard')}
          />
        ) : page === 'komunitas' ? (
          <Komunitas />
        ) : page === 'uji-skor-tes' ? (
          tesStep === 2 ? (
            <SimpanKode
              peserta={peserta}
              onBack={() => { setTesStep(1); window.scrollTo({ top: 0 }) }}
              onMulai={() => navigate('dashboard')}
            />
          ) : (
            <UjiSkorTes
              setPeserta={setPeserta}
              onLanjut={() => { setTesStep(2); window.scrollTo({ top: 0 }) }}
              onHome={() => navigate('beranda')}
            />
          )
        ) : page === 'kanal-lapor' ? (
          <KanalLaporPage
            onHome={() => navigate('beranda')}
            onSimulasi={() => navigate('simulasi-kasus')}
            onBelajar={() => navigate('belajar-modus')}
          />
        ) : page === 'belajar-modus' ? (
          <BelajarModus onHome={() => navigate('beranda')} onOpenModul={openModul} />
        ) : (
          <>
            <Hero onBelajar={() => navigate('belajar-modus')} />
            <main className="w-full bg-surface-cream min-h-screen">
              <div className="flex flex-col w-full">
                <JalurBelajar />
                <SimulasiChat feedback={feedback} setFeedback={setFeedback} />
              </div>
            </main>
          </>
        )}
      </div>
      {chromeVisible && !simulasiModulId && <Footer />}
    </>
  )
}
