export default function KanalLapor() {
  return (
    <>
            <section className="w-full bg-surface-white py-space-2xl" id="kanal-lapor">
                <div className="max-w-[1200px] mx-auto px-margin-desktop flex flex-col gap-space-xl">
                    {/*  Section Header  */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-xs reveal">
                        <div className="flex flex-col gap-space-sm max-w-[720px]">
                            <div className="inline-flex items-center gap-space-xs text-primary pb-space-xs">
                                <span className="material-symbols-outlined text-[22px]">policy</span>
                                <span className="font-label-md text-label-md uppercase tracking-wide font-semibold">Kanal
                                    Resmi Negara</span>
                            </div>
                            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight leading-relaxed">
                                Kanal Resmi Pelaporan Penipuan & Kejahatan Siber</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed pt-space-xs">
                                Jika Anda atau kerabat sudah menjadi korban atau menemukan nomor mencurigakan, segera
                                adukan ke institusi berwenang berikut:</p>
                        </div>
                    </div>
                    {/*  4 Kartu Tautan Eksternal  */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                        <a className="group p-space-lg rounded-2xl bg-surface-cream hover:bg-surface-container transition-all flex flex-col justify-between gap-space-lg shadow-sm border border-border-subtle/40 reveal"
                            href="tel:157">
                            <div className="flex flex-col gap-space-md">
                                <div
                                    className="w-12 h-12 rounded-xl bg-surface-white flex items-center justify-center text-primary shadow-sm group-hover:scale-105 transition-transform">
                                    <span className="material-symbols-outlined text-[26px]">call</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span
                                        className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Otoritas
                                        Jasa Keuangan</span>
                                    <h3
                                        className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-relaxed">
                                        Kontak OJK 157</h3>
                                    <p className="font-body-sm text-body-sm text-text-muted mt-1 leading-relaxed">Layanan
                                        konsumen perbankan, pasar modal, dan asuransi ilegal.</p>
                                </div>
                            </div>
                            <div
                                className="pt-space-xs flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold">
                                <span>Telepon: 157</span>
                                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                            </div>
                        </a>
                        <a className="group p-space-lg rounded-2xl bg-surface-cream hover:bg-surface-container transition-all flex flex-col justify-between gap-space-lg shadow-sm border border-border-subtle/40 reveal reveal-2"
                            href="https://ojk.go.id" rel="noopener" target="_blank">
                            <div className="flex flex-col gap-space-md">
                                <div
                                    className="w-12 h-12 rounded-xl bg-surface-white flex items-center justify-center text-secondary shadow-sm group-hover:scale-105 transition-transform">
                                    <span className="material-symbols-outlined text-[26px]">security</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span
                                        className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">Satgas
                                        Keuangan</span>
                                    <h3
                                        className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-relaxed">
                                        Satgas PASTI</h3>
                                    <p className="font-body-sm text-body-sm text-text-muted mt-1 leading-relaxed">
                                        Pemberantasan entitas pinjol ilegal dan investasi bodong.</p>
                                </div>
                            </div>
                            <div
                                className="pt-space-xs flex items-center justify-between text-secondary font-label-sm text-label-sm font-semibold">
                                <span>Portal Satgas PASTI</span>
                                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                            </div>
                        </a>
                        <a className="group p-space-lg rounded-2xl bg-surface-cream hover:bg-surface-container transition-all flex flex-col justify-between gap-space-lg shadow-sm border border-border-subtle/40 reveal reveal-3"
                            href="https://patrolisiber.id" rel="noopener" target="_blank">
                            <div className="flex flex-col gap-space-md">
                                <div
                                    className="w-12 h-12 rounded-xl bg-surface-white flex items-center justify-center text-tertiary-container shadow-sm group-hover:scale-105 transition-transform">
                                    <span className="material-symbols-outlined text-[26px]">local_police</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span
                                        className="font-label-sm text-label-sm text-tertiary-container uppercase font-bold tracking-wider">Bareskrim
                                        Polri</span>
                                    <h3
                                        className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-relaxed">
                                        Patroli Siber</h3>
                                    <p className="font-body-sm text-body-sm text-text-muted mt-1 leading-relaxed">Pelaporan
                                        resmi tindak pidana siber, pemerasan, dan scam perbankan.</p>
                                </div>
                            </div>
                            <div
                                className="pt-space-xs flex items-center justify-between text-tertiary-container font-label-sm text-label-sm font-semibold">
                                <span>patrolisiber.id</span>
                                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                            </div>
                        </a>
                        <a className="group p-space-lg rounded-2xl bg-surface-cream hover:bg-surface-container transition-all flex flex-col justify-between gap-space-lg shadow-sm border border-border-subtle/40 reveal reveal-4"
                            href="https://cekrekening.id" rel="noopener" target="_blank">
                            <div className="flex flex-col gap-space-md">
                                <div
                                    className="w-12 h-12 rounded-xl bg-surface-white flex items-center justify-center text-primary shadow-sm group-hover:scale-105 transition-transform">
                                    <span className="material-symbols-outlined text-[26px]">credit_card</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span
                                        className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Kementerian
                                        Komdigi</span>
                                    <h3
                                        className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-relaxed">
                                        Cek Rekening & Nomor</h3>
                                    <p className="font-body-sm text-body-sm text-text-muted mt-1 leading-relaxed">Cek rekam
                                        jejak nomor rekening bank dan adukan nomor WhatsApp penipu.</p>
                                </div>
                            </div>
                            <div
                                className="pt-space-xs flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold">
                                <span>cekrekening.id</span>
                                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                            </div>
                        </a>
                    </div>
                    {/*  Legal Advisory Box  */}
                    <div
                        className="p-space-lg rounded-2xl bg-warning-yellow-light shadow-sm flex items-start gap-space-md border border-amber-200/50 reveal">
                        <div
                            className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[22px]">shield_person</span>
                        </div>
                        <div className="flex flex-col gap-space-xs">
                            <span
                                className="font-label-lg text-label-lg text-on-surface leading-relaxed font-bold">Pemberitahuan
                                Penting Mengenai Status Layanan</span>
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed pt-space-xs">
                                Situs ini <strong>BUKAN</strong> kanal pelaporan resmi penegak hukum.
                                <strong>TangkisTipu</strong> adalah platform media simulasi edukasi nirlaba independen
                                yang berfokus melatih kewaspadaan dini, literasi kritis, dan ketangguhan digital
                                masyarakat luas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}
