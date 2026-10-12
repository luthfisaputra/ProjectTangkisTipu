export default function Footer() {
  return (
    <>
    <footer className="w-full bg-surface-white mt-space-2xl border-t border-border-subtle/50">
        <div className="max-w-[1200px] mx-auto px-margin-desktop py-space-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-xl pb-space-xl">
                <div className="md:col-span-5 flex flex-col gap-space-md">
                    <div className="flex items-center gap-space-sm">
                        <img src="/assets/LogoTangkis.png" alt="Logo TangkisTipu" className="h-10 w-auto shrink-0" />
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">TangkisTipu</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Platform simulasi edukasi interaktif pencegahan penipuan online dan rekayasa sosial di
                        Indonesia. Lindungi diri, keluarga, dan lansia dengan ketangguhan digital.
                    </p>
                    <div
                        className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-lg bg-surface-card-subtle text-text-muted font-label-sm text-label-sm self-start">
                        <span className="material-symbols-outlined text-[16px]">lock</span>Inisiatif Edukasi Terbuka &
                        Terdesentralisasi
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                        <span className="font-label-lg text-label-lg text-on-surface font-bold">Direktori Pelaporan Resmi
                            Pemerintah</span>
                        <span className="font-label-sm text-label-sm text-primary font-semibold">Verifikasi Cepat</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <a className="flex items-start gap-space-sm p-space-md rounded-xl bg-surface-cream hover:bg-surface-container transition-all"
                            href="tel:157">
                            <span className="material-symbols-outlined text-primary text-[22px]">call</span>
                            <div>
                                <span className="font-label-md text-label-md text-on-surface block font-semibold">Kontak OJK
                                    157</span>
                                <span className="font-body-sm text-body-sm text-text-muted block">Satgas PASTI / Keuangan
                                    Ilegal</span>
                            </div>
                        </a>
                        <a className="flex items-start gap-space-sm p-space-md rounded-xl bg-surface-cream hover:bg-surface-container transition-all"
                            href="https://cekrekening.id" rel="noopener" target="_blank">
                            <span className="material-symbols-outlined text-primary text-[22px]">account_balance</span>
                            <div>
                                <span className="font-label-md text-label-md text-on-surface block font-semibold">Cek
                                    Rekening Komdigi</span>
                                <span className="font-body-sm text-body-sm text-text-muted block">Cek & Laporkan
                                    Rekening Penipu</span>
                            </div>
                        </a>
                        <a className="flex items-start gap-space-sm p-space-md rounded-xl bg-surface-cream hover:bg-surface-container transition-all"
                            href="https://patrolisiber.id" rel="noopener" target="_blank">
                            <span className="material-symbols-outlined text-primary text-[22px]">local_police</span>
                            <div>
                                <span className="font-label-md text-label-md text-on-surface block font-semibold">Patroli
                                    Siber Polri</span>
                                <span className="font-body-sm text-body-sm text-text-muted block">Tindak Pidana Kejahatan
                                    Siber</span>
                            </div>
                        </a>
                        <a className="flex items-start gap-space-sm p-space-md rounded-xl bg-surface-cream hover:bg-surface-container transition-all"
                            href="https://aduankonten.id" rel="noopener" target="_blank">
                            <span className="material-symbols-outlined text-primary text-[22px]">report_problem</span>
                            <div>
                                <span className="font-label-md text-label-md text-on-surface block font-semibold">Satgas
                                    PASTI & Komdigi</span>
                                <span className="font-body-sm text-body-sm text-text-muted block">Blokir Situs & File
                                    APK Berbahaya</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div
                className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md border-t border-border-subtle/50">
                <div className="flex items-center gap-space-sm text-danger-red">
                    <span className="material-symbols-outlined text-[20px]">info</span>
                    <p className="font-label-md text-label-md font-semibold">Situs ini bukan kanal pelaporan resmi. Nirlaba
                        & 100% Anonim.</p>
                </div>
                <p className="font-body-sm text-body-sm text-text-muted text-center md:text-right">© 2025 TangkisTipu.
                    Seluruh hak cipta inisiatif edukasi publik dilindungi.</p>
            </div>
        </div>
    </footer>
    </>
  )
}
