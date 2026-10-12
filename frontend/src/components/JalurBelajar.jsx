export default function JalurBelajar() {
  return (
    <>
            <section className="w-full bg-surface-white py-space-2xl" id="jalur-belajar">
                <div className="max-w-[1200px] mx-auto px-margin-desktop flex flex-col gap-space-xl">
                    {/*  Section Header Center  */}
                    <div
                        className="text-center max-w-[700px] mx-auto flex flex-col items-center gap-space-sm pb-space-sm reveal">
                        <span
                            className="font-label-md text-label-md text-secondary uppercase tracking-wider bg-warning-yellow-light px-space-md py-1.5 rounded-full mb-space-xs font-semibold">Pilih
                            Jalur Belajar</span>
                        <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight leading-relaxed">Materi
                            Disesuaikan Berdasarkan Rentang<br />Usia & Kebutuhan</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed pt-space-xs">Setiap
                            kelompok usia menghadapi target modus berbeda. Pilih kurikulum yang paling relevan dengan
                            rutinitas harianmu.</p>
                    </div>
                    {/*  3 Kartu Jalur Usia  */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                        {/*  Kartu 1: Pelajar & Gamer  */}
                        <div
                            className="group flex flex-col justify-between p-space-xl rounded-2xl bg-surface-cream hover:bg-surface-container transition-all duration-300 hover:-translate-y-1 shadow-sm border border-border-subtle/50 reveal">
                            <div className="flex flex-col gap-space-md">
                                <div className="flex items-center justify-between pb-space-xs">
                                    <span
                                        className="inline-flex items-center gap-1 px-space-sm py-1.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                                        <span className="material-symbols-outlined text-[16px]">sports_esports</span>Usia
                                        10–17 Tahun
                                    </span>
                                    <span className="font-label-sm text-label-sm text-text-muted">Tingkat Dasar</span>
                                </div>
                                <div
                                    className="w-full h-44 rounded-xl overflow-hidden bg-surface-white shadow-sm ring-1 ring-border-subtle/60 my-space-xs">
                                    <img
                                        src="/assets/AnakRemaja.png"
                                        alt="Ilustrasi anak remaja pelajar & gamer menggunakan ponsel"
                                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 zoom-on-hover"
                                        loading="lazy" />
                                </div>
                                <div className="py-space-xs">
                                    <h3
                                        className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors leading-relaxed">
                                        Jalur Pelajar & Gamer</h3>
                                    <p
                                        className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                                        Perlindungan dari jebakan akun game, top-up ilegal, dan rayuan kerja paruh waktu
                                        palsu.</p>
                                </div>
                                <div className="space-y-2 pt-space-sm">
                                    <span className="font-label-sm text-label-sm text-text-muted block pb-space-xs">Fokus
                                        Modus Utama:</span>
                                    <div className="flex items-start gap-2 py-0.5">
                                        <span
                                            className="material-symbols-outlined text-danger-red text-[18px] shrink-0 mt-0.5">warning</span>
                                        <span className="font-body-sm text-body-sm text-on-surface leading-relaxed">Joki
                                            Game & Diamond Murah Palsu</span>
                                    </div>
                                    <div className="flex items-start gap-2 py-0.5">
                                        <span
                                            className="material-symbols-outlined text-danger-red text-[18px] shrink-0 mt-0.5">warning</span>
                                        <span className="font-body-sm text-body-sm text-on-surface leading-relaxed">Komisi
                                            Like / Follow Medsos Ilegal</span>
                                    </div>
                                    <div className="flex items-start gap-2 py-0.5">
                                        <span
                                            className="material-symbols-outlined text-danger-red text-[18px] shrink-0 mt-0.5">warning</span>
                                        <span className="font-body-sm text-body-sm text-on-surface leading-relaxed">Jebakan
                                            Pinjol Atas Nama Teman</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-space-lg">
                                <button
                                    className="w-full h-12 rounded-xl bg-surface-white text-secondary font-label-md text-label-md shadow-sm group-hover:bg-secondary-container group-hover:text-on-secondary-fixed transition-all flex items-center justify-center gap-space-xs font-semibold">
                                    <span>Pilih Jalur Pelajar</span>
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                        {/*  Kartu 2: Karier & Finansial  */}
                        <div
                            className="group flex flex-col justify-between p-space-xl rounded-2xl bg-surface-cream hover:bg-surface-container transition-all duration-300 hover:-translate-y-1 shadow-sm border border-border-subtle/50 reveal reveal-2">
                            <div className="flex flex-col gap-space-md">
                                <div className="flex items-center justify-between pb-space-xs">
                                    <span
                                        className="inline-flex items-center gap-1 px-space-sm py-1.5 rounded-full bg-primary-container text-on-primary-fixed font-label-sm text-label-sm font-semibold">
                                        <span className="material-symbols-outlined text-[16px]">work</span>Usia 18–59 Tahun
                                    </span>
                                    <span
                                        className="font-label-sm text-label-sm text-primary font-semibold">Terpopuler</span>
                                </div>
                                <div
                                    className="w-full h-44 rounded-xl overflow-hidden bg-surface-white shadow-sm ring-1 ring-border-subtle/60 my-space-xs">
                                    <img
                                        src="/assets/Dewasa.png"
                                        alt="Ilustrasi profesional dewasa bekerja dengan laptop"
                                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 zoom-on-hover"
                                        loading="lazy" />
                                </div>
                                <div className="py-space-xs">
                                    <h3
                                        className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors leading-relaxed">
                                        Jalur Karier & Finansial</h3>
                                    <p
                                        className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                                        Bedah malware pencuri rekening, rekrutmen abal-abal, dan skema ponzi modern.</p>
                                </div>
                                <div className="space-y-2 pt-space-sm">
                                    <span className="font-label-sm text-label-sm text-text-muted block pb-space-xs">Fokus
                                        Modus Utama:</span>
                                    <div className="flex items-start gap-2 py-0.5">
                                        <span
                                            className="material-symbols-outlined text-danger-red text-[18px] shrink-0 mt-0.5">verified_user</span>
                                        <span className="font-body-sm text-body-sm text-on-surface leading-relaxed">Malware
                                            APK Paket & Undangan Nikah</span>
                                    </div>
                                    <div className="flex items-start gap-2 py-0.5">
                                        <span
                                            className="material-symbols-outlined text-danger-red text-[18px] shrink-0 mt-0.5">verified_user</span>
                                        <span
                                            className="font-body-sm text-body-sm text-on-surface leading-relaxed">Investasi
                                            Kripto / Forex Tanpa Izin OJK</span>
                                    </div>
                                    <div className="flex items-start gap-2 py-0.5">
                                        <span
                                            className="material-symbols-outlined text-danger-red text-[18px] shrink-0 mt-0.5">verified_user</span>
                                        <span
                                            className="font-body-sm text-body-sm text-on-surface leading-relaxed">Loker
                                            Paruh Waktu Berbayar Deposit</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-space-lg">
                                <button
                                    className="w-full h-12 rounded-xl bg-surface-white text-primary font-label-md text-label-md shadow-sm group-hover:bg-primary group-hover:text-on-primary transition-all flex items-center justify-center gap-space-xs font-semibold">
                                    <span>Pilih Jalur Karier</span>
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                        {/*  Kartu 3: Jalur Tenang & Aman Lansia  */}
                        <div
                            className="group flex flex-col justify-between p-space-xl rounded-2xl bg-surface-cream hover:bg-surface-container transition-all duration-300 hover:-translate-y-1 shadow-sm border border-border-subtle/50 reveal reveal-3">
                            <div className="flex flex-col gap-space-md">
                                <div className="flex items-center justify-between pb-space-xs">
                                    <span
                                        className="inline-flex items-center gap-1 px-space-sm py-1.5 rounded-full bg-safe-green-light text-tertiary-container font-label-sm text-label-sm font-semibold">
                                        <span
                                            className="material-symbols-outlined text-[16px]">accessibility_new</span>Aksesibilitas
                                        Ekstra (60+)
                                    </span>
                                    <span className="font-label-sm text-label-sm text-text-muted">Ramah Mata</span>
                                </div>
                                <div
                                    className="w-full h-44 rounded-xl overflow-hidden bg-surface-white shadow-sm ring-1 ring-border-subtle/60 my-space-xs">
                                    <img
                                        src="/assets/Lansia.png"
                                        alt="Ilustrasi lansia tenang memegang ponsel"
                                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 zoom-on-hover"
                                        loading="lazy" />
                                </div>
                                <div className="py-space-xs">
                                    <h3
                                        className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-relaxed whitespace-nowrap tracking-tight">
                                        Jalur Tenang & Aman Lansia</h3>
                                    <p
                                        className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                                        Dirancang khusus dengan tulisan ekstra besar, bahasa santai, dan panduan
                                        menenangkan.</p>
                                </div>
                                <div className="space-y-2 pt-space-sm">
                                    <span className="font-label-sm text-label-sm text-text-muted block pb-space-xs">Fokus
                                        Modus Utama:</span>
                                    <div className="flex items-start gap-2 py-0.5">
                                        <span
                                            className="material-symbols-outlined text-danger-red text-[18px] shrink-0 mt-0.5">warning</span>
                                        <span className="font-body-sm text-body-sm text-on-surface leading-relaxed">Telepon
                                            Anak Kecelakaan / Darurat Palsu</span>
                                    </div>
                                    <div className="flex items-start gap-2 py-0.5">
                                        <span
                                            className="material-symbols-outlined text-danger-red text-[18px] shrink-0 mt-0.5">warning</span>
                                        <span className="font-body-sm text-body-sm text-on-surface leading-relaxed">Surat
                                            Tagihan & Pajak Catut Pemerintah</span>
                                    </div>
                                    <div className="flex items-start gap-2 py-0.5">
                                        <span
                                            className="material-symbols-outlined text-danger-red text-[18px] shrink-0 mt-0.5">warning</span>
                                        <span
                                            className="font-body-sm text-body-sm text-on-surface leading-relaxed">Permintaan
                                            Kode SMS OTP Secara Paksa</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-space-lg">
                                <button
                                    className="w-full h-12 rounded-xl bg-surface-white text-tertiary font-label-md text-label-md shadow-sm group-hover:bg-tertiary group-hover:text-on-tertiary transition-all flex items-center justify-center gap-space-xs font-semibold">
                                    <span>Pilih Jalur Lansia (Huruf Besar)</span>
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}
