import { useEffect, useState } from 'react'
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

  const selesaikanPretest = (skor) => setProgres((p) => ({ ...p, pretest: { skor } }))

  const tandaiModusDibaca = (id) => {
    setProgres((p) => {
      if (p.modusIds.includes(id)) return p
      return { ...p, modusIds: [...p.modusIds, id] }
    })
  }

  const tandaiSkenarioSelesai = () => setProgres((p) => ({ ...p, skenario: Math.min(p.skenario + 1, 8) }))
  const selesaikanPosttest = () => setProgres((p) => ({ ...p, posttest: { skor: 8 } }))

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
    if (path === 'uji-skor-tes') setProgres({ pretest: null, modusIds: [], skenario: 0, posttest: null })
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
  const chromeVisible = !['pretest', 'login', 'admin', 'set-soal', 'kode-kelas'].includes(page)

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
            onSelesai={(skor) => {
              selesaikanPretest(skor)
              navigate('dashboard')
            }}
            onKeluar={() => navigate('beranda')}
          />
        ) : page === 'dashboard' ? (
          <DashboardPeserta
            peserta={peserta}
            progres={{ ...progres, modusDibaca: progres.modusIds.length }}
            onSelesaiPretest={() => navigate('pretest')}
            onSelesaiPosttest={selesaikanPosttest}
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
