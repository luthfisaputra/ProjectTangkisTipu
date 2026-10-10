import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import JalurBelajar from './components/JalurBelajar.jsx'
import SimulasiChat from './components/SimulasiChat.jsx'
import KanalLapor from './components/KanalLapor.jsx'
import Footer from './components/Footer.jsx'
import BelajarModus from './components/BelajarModus.jsx'
import ModulDetail from './components/ModulDetail.jsx'
import UjiSkorTes from './components/UjiSkorTes.jsx'
import SimpanKode from './components/SimpanKode.jsx'
import DashboardPeserta from './components/DashboardPeserta.jsx'
import Pretest from './components/Pretest.jsx'
import { modul01Pelajar } from './data/modul01Pelajar.jsx'

const MODUL = {
  'pelajar-01': modul01Pelajar,
}

export default function App() {
  const [feedback, setFeedback] = useState(false)
  const [page, setPage] = useState('beranda')
  const [modulId, setModulId] = useState(null)
  const [tesStep, setTesStep] = useState(1)
  const [peserta, setPeserta] = useState({ nickname: '', track: 1, classCode: '', token: '' })
  const [progres, setProgres] = useState({ pretest: null, modusDibaca: 0, skenario: 0, posttest: null })

  const selesaikanPretest = (skor) => setProgres((p) => ({ ...p, pretest: { skor } }))
  const tambahModus = () => setProgres((p) => ({ ...p, modusDibaca: Math.min(p.modusDibaca + 1, 8) }))
  const tambahSkenario = () => setProgres((p) => ({ ...p, skenario: Math.min(p.skenario + 1, 8) }))
  const selesaikanPosttest = () => setProgres((p) => ({ ...p, posttest: { skor: 8 } }))

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
    setPage(['belajar-modus', 'uji-skor-tes', 'dashboard', 'pretest'].includes(path) ? path : 'beranda')
    setModulId(null)
    setTesStep(1)
    if (path === 'uji-skor-tes') setProgres({ pretest: null, modusDibaca: 0, skenario: 0, posttest: null })
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

  const gotoSimulasi = () => {
    setModulId(null)
    setPage('beranda')
    window.scrollTo({ top: 0 })
    setTimeout(() => {
      document.getElementById('simulasi-chat')?.scrollIntoView({ behavior: 'smooth' })
    }, 120)
  }

  return (
    <>
      {page !== 'pretest' && <Navbar active={page === 'dashboard' ? 'uji-skor-tes' : page} onNavigate={navigate} />}
      <div key={`${page}-${modulId || 'none'}-${tesStep}`} className="page-enter">
        {modulId ? (
          <ModulDetail content={MODUL[modulId]} onBack={closeModul} onSimulasi={gotoSimulasi} />
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
            progres={progres}
            onSelesaiPretest={() => navigate('pretest')}
            onTambahModus={tambahModus}
            onTambahSkenario={tambahSkenario}
            onSelesaiPosttest={selesaikanPosttest}
            onModul={() => navigate('belajar-modus')}
            onSimulasi={() => gotoSimulasi()}
            onHome={() => navigate('uji-skor-tes')}
          />
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
        ) : page === 'belajar-modus' ? (
          <BelajarModus onHome={() => navigate('beranda')} onOpenModul={openModul} />
        ) : (
          <>
            <Hero />
            <main className="w-full bg-surface-cream min-h-screen">
              <div className="flex flex-col w-full">
                <JalurBelajar />
                <SimulasiChat feedback={feedback} setFeedback={setFeedback} />
                <KanalLapor />
              </div>
            </main>
          </>
        )}
      </div>
      {page !== 'pretest' && <Footer />}
    </>
  )
}
