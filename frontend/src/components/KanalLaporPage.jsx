import KanalHero from './KanalHero.jsx'
import KanalPrinsipDasar from './KanalPrinsipDasar.jsx'
import KanalGoldenPeriod from './KanalGoldenPeriod.jsx'
import KanalDirektoriLapor from './KanalDirektoriLapor.jsx'
import KanalChecklistBukti from './KanalChecklistBukti.jsx'
import KanalPenutup from './KanalPenutup.jsx'

export default function KanalLaporPage({ onHome = () => {}, onSimulasi = () => {}, onBelajar = () => {} }) {
  return (
    <main id="kanal-lapor" className="w-full bg-surface-cream min-h-screen">
      <div className="flex flex-col w-full">
        <KanalHero onHome={onHome} />
        <KanalPrinsipDasar />
        <KanalGoldenPeriod />
        <KanalDirektoriLapor />
        <KanalChecklistBukti />
        <KanalPenutup onSimulasi={onSimulasi} onBelajar={onBelajar} />
      </div>
    </main>
  )
}
