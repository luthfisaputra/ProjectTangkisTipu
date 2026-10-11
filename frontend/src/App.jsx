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
import { getParticipant, getProgress, updateProgress } from './api.js'

const MODUL = {
  'pelajar-01': modul01Pelajar,
}

const TOKEN_KEY = 'tangkistipu_token'

const bacaToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

const simpanToken = (token) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* abaikan */
  }
}

const mapProgres = (p) => ({
  pretest: p?.pretest ? { skor: p.pretest } : null,
  modusDibaca: p?.modusDibaca ?? 0,
  skenario: p?.skenario ?? 0,
  posttest: p?.posttest ? { skor: p.posttest } : null,
})

export default function App() {
  const [feedback, setFeedback] = useState(false)
  const [page, setPage] = useState('beranda')
  const [modulId, setModulId] = useState(null)
  const [tesStep, setTesStep] = useState(1)
  const [peserta, setPeserta] = useState({ nickname: '', track: 1, classCode: '', token: '' })

  const simpanPeserta = (data) => {
    setPeserta(data)
    if (data?.token) simpanToken(data.token)
  }
  const [progres, setProgres] = useState({ pretest: null, modusDibaca: 0, skenario: 0, posttest: null })

  const [pesanError, setPesanError] = useState('')

  const selesaikanPretest = async (skor) => {
    setProgres((p) => ({ ...p, pretest: { skor } }))
    const token = peserta?.token
    if (!token) return
    try {
      const data = await getProgress(token)
      if (data?.progress) setProgres(mapProgres(data.progress))
    } catch {
      /* abaikan, tampilan tetap */
    }
  }

  const kirimProgres = async (nilai) => {
    const token = peserta?.token
    if (!token) return
    try {
      await updateProgress(token, nilai)
      setPesanError('')
    } catch (err) {
      setPesanError(err?.message || 'Gagal menyimpan progres.')
    }
  }

  const tambahModus = () => {
    const nilai = Math.min(progres.modusDibaca + 1, 8)
    setProgres((p) => ({ ...p, modusDibaca: nilai }))
    kirimProgres({ modusDibaca: nilai, skenario: progres.skenario })
  }

  const tambahSkenario = () => {
    const nilai = Math.min(progres.skenario + 1, 8)
    setProgres((p) => ({ ...p, skenario: nilai }))
    kirimProgres({ modusDibaca: progres.modusDibaca, skenario: nilai })
  }

  const selesaikanPosttest = () => setProgres((p) => ({ ...p, posttest: { skor: 8 } }))

  useEffect(() => {
    const token = bacaToken()
    if (!token) return
    let aktif = true
    ;(async () => {
      try {
        const profil = await getParticipant(token)
        if (!aktif) return
        const p = profil?.participant
        setPeserta({
          nickname: p?.nickname || p?.nama || '',
          track: p?.track ?? 1,
          classCode: p?.classCode || '',
          token,
        })
        const data = await getProgress(token)
        if (aktif && data?.progress) setProgres(mapProgres(data.progress))
      } catch (err) {
        if (err?.message && /404|tidak ditemukan/i.test(err.message)) {
          simpanToken(null)
        }
      }
    })()
    return () => {
      aktif = false
    }
  }, [])

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
    const tujuan = ['belajar-modus', 'uji-skor-tes', 'dashboard', 'pretest'].includes(path) ? path : 'beranda'
    setPage(tujuan === 'uji-skor-tes' && bacaToken() ? 'dashboard' : tujuan)
    setModulId(null)
    setTesStep(1)
    window.scrollTo({ top: 0 })
  }

  const mulaiBaru = () => {
    const lanjut = window.confirm(
      'Progres di perangkat ini akan dilepas dan kamu mulai sebagai peserta baru. Kode lamamu tidak bisa dipakai lagi di perangkat ini. Lanjutkan?'
    )
    if (!lanjut) return
    simpanToken(null)
    setPeserta({ nickname: '', track: 1, classCode: '', token: '' })
    setProgres({ pretest: null, modusDibaca: 0, skenario: 0, posttest: null })
    setPesanError('')
    setPage('uji-skor-tes')
    setModulId(null)
    setTesStep(1)
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
            onMulaiBaru={mulaiBaru}
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
              setPeserta={simpanPeserta}
              onLanjut={() => { setTesStep(2); window.scrollTo({ top: 0 }) }}
              onHome={() => navigate('beranda')}
              onMulaiBaru={mulaiBaru}
              onMasuk={(progresBaru) => {
                if (progresBaru) setProgres(progresBaru)
                setPage('dashboard')
                setModulId(null)
                setTesStep(1)
                window.scrollTo({ top: 0 })
              }}
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
