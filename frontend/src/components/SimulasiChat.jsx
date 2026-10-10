export default function SimulasiChat({ feedback, setFeedback }) {
  return (
    <>
            <section className="w-full py-space-2xl max-w-[1200px] mx-auto px-margin-desktop"
                id="simulasi-chat">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
                    {/*  Kolom Kiri: 3 Langkah Edukasi (5 Kolom)  */}
                    <div className="lg:col-span-5 flex flex-col gap-space-lg">
                        <div className="flex flex-col gap-space-sm pb-space-xs reveal">
                            <span
                                className="font-label-md text-label-md text-secondary uppercase tracking-wider bg-warning-yellow-light px-space-md py-1.5 rounded-full self-start mb-space-xs font-semibold">Alur
                                Belajar Interaktif</span>
                            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight leading-relaxed">3
                                Langkah Lindungi Diri dari Modus Penipuan</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed pt-space-xs">
                                Dirancang sederhana agar siapa pun dapat berlatih mengambil keputusan aman saat menerima
                                pesan mencurigakan.</p>
                        </div>
                        <div className="flex flex-col gap-space-md">
                            <div
                                className="flex items-start gap-space-md p-space-md rounded-2xl bg-surface-white shadow-sm border border-border-subtle/40 reveal">
                                <div
                                    className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm shrink-0 font-bold">
                                    1</div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-label-lg text-label-lg text-on-surface leading-relaxed font-bold">
                                        Belajar Modus</h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Pahami
                                        ciri-ciri jebakan rekayasa sosial seperti file APK, tautan phishing, dan surat
                                        tagihan palsu.</p>
                                </div>
                            </div>
                            <div
                                className="flex items-start gap-space-md p-space-md rounded-2xl bg-surface-white shadow-sm border border-border-subtle/40 reveal reveal-2">
                                <div
                                    className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-fixed font-headline-sm text-headline-sm shrink-0 font-bold">
                                    2</div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-label-lg text-label-lg text-on-surface leading-relaxed font-bold">
                                        Coba Simulasi</h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                        Praktikkan respons langsung pada simulasi obrolan realistis di sebelah kanan
                                        tanpa risiko data bocor.</p>
                                </div>
                            </div>
                            <div
                                className="flex items-start gap-space-md p-space-md rounded-2xl bg-surface-white shadow-sm border border-border-subtle/40 reveal reveal-3">
                                <div
                                    className="w-10 h-10 rounded-xl bg-safe-green-light flex items-center justify-center text-tertiary-container font-headline-sm text-headline-sm shrink-0 font-bold">
                                    3</div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-label-lg text-label-lg text-on-surface leading-relaxed font-bold">
                                        Uji Dirimu</h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                        Dapatkan skor kewaspadaan digital serta rekomendasi langkah perlindungan yang
                                        tepat untuk keluargamu.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  Kolom Kanan: Cuplikan Interaktif Simulator Chat (7 Kolom)  */}
                    <div className="lg:col-span-7 flex flex-col items-center">
                        {/*  Interactive Chat Sandbox Frame  */}
                        <div
                            className="w-full max-w-[540px] rounded-3xl bg-surface-white shadow-2xl overflow-hidden border border-border-subtle/60 reveal reveal-2">
                            {/*  Chat App Header  */}
                            <div
                                className="bg-primary px-space-md py-space-sm flex items-center justify-between text-on-primary">
                                <div className="flex items-center gap-space-sm">
                                    <div
                                        className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center font-label-md text-label-md">
                                        <span className="material-symbols-outlined text-[22px]">local_shipping</span>
                                    </div>
                                    <div>
                                        <span className="font-label-md text-label-md block leading-tight font-semibold">+62
                                            812-XXXX-9901</span>
                                        <span className="font-label-sm text-label-sm text-primary-fixed-dim block">Kurir
                                            Ekspedisi Prioritas</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-space-xs text-primary-fixed-dim">
                                    <span className="material-symbols-outlined text-[20px]">videocam</span>
                                    <span className="material-symbols-outlined text-[20px]">call</span>
                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                </div>
                            </div>
                            {/*  Chat Body Simulation  */}
                            <div className="p-space-lg bg-surface-card-subtle flex flex-col gap-space-md min-h-[340px]">
                                {/*  Incoming Suspicious Message  */}
                                <div className="flex flex-col items-start max-w-[88%] self-start">
                                    <div
                                        className="p-space-md rounded-2xl rounded-tl-xs bg-surface-white shadow-sm flex flex-col gap-2 border border-border-subtle/30">
                                        <span className="font-body-md text-body-md text-on-surface leading-snug">
                                            Halo Kak, paket Anda tertahan di gudang logistik karena nomor resi sobek.
                                            Silakan pasang aplikasi verifikasi berikut untuk cetak ulang resi Anda:
                                        </span>
                                        {/*  Fake APK File Attachment Box  */}
                                        <div
                                            className="flex items-center gap-space-sm p-space-sm rounded-xl bg-danger-red-light">
                                            <div
                                                className="w-10 h-10 rounded-lg bg-danger-red text-on-error flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-[22px]">android</span>
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span
                                                    className="font-label-md text-label-md text-danger-red truncate font-semibold">Resi_Paket_Exp.apk</span>
                                                <span className="font-label-sm text-label-sm text-text-muted">4.8 MB • Paket
                                                    Ekspedisi</span>
                                            </div>
                                        </div>
                                        <span className="font-label-sm text-label-sm text-text-muted self-end">14:22</span>
                                    </div>
                                </div>
                                {/*  Red Alert Threat Explanation Box  */}
                                <div
                                    className="p-space-md rounded-2xl bg-danger-red text-on-error shadow-sm flex items-start gap-space-sm">
                                    <span className="material-symbols-outlined text-[24px] shrink-0 mt-0.5">gpp_maybe</span>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-label-md font-bold">Tanda Bahaya
                                            Terdeteksi!</span>
                                        <span className="font-body-sm text-body-sm opacity-95">
                                            Ekstensi file <strong>.APK</strong> bukan foto resi resmi. File ini adalah
                                            malware trojan yang dapat menyadap SMS OTP m-Banking tanpa Anda sadari.
                                        </span>
                                    </div>
                                </div>
                                {/*  Dynamic Decision Result Area  */}
                                {feedback && (
                                    <div className="p-space-md rounded-2xl bg-safe-green-light text-tertiary-container shadow-sm flex items-start gap-space-sm"
                                    id="simulation-feedback">
                                    <span
                                        className="material-symbols-outlined text-[24px] shrink-0 mt-0.5">check_circle</span>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-label-md font-bold">Keputusan Sangat
                                            Tepat!</span>
                                        <span className="font-body-sm text-body-sm">
                                            Anda berhasil menghindari penyadapan SMS OTP. Ingat: Ekspedisi resmi tidak
                                            pernah meminta unduh aplikasi via pesan pribadi.
                                        </span>
                                    </div>
                                </div>
                                )}
                            </div>
                            {/*  Scenario Action Footer  */}
                            <div
                                className="p-space-md bg-surface-white shadow-inner flex flex-col gap-space-xs border-t border-border-subtle/50">
                                <span className="font-label-sm text-label-sm text-text-muted text-center font-medium">Apa
                                    tindakan pertamamu?</span>
                                <div className="grid grid-cols-2 gap-space-sm pt-1">
                                    <button
                                        className="h-12 px-space-sm rounded-xl bg-danger-red-light text-danger-red font-label-md text-label-md hover:bg-danger-red hover:text-on-error transition-all flex items-center justify-center gap-1 font-semibold"
                                        onClick={() => alert('Awas! Tombol ini membahayakan data ponsel Anda pada situasi nyata. Latihlah respons aman!')}>
                                        <span className="material-symbols-outlined text-[18px]">file_open</span>
                                        <span>Klik Link File APK</span>
                                    </button>
                                    <button
                                        className="h-12 px-space-sm rounded-xl bg-safe-green-light text-tertiary-container font-label-md text-label-md hover:bg-tertiary-container hover:text-on-tertiary transition-all flex items-center justify-center gap-1 shadow-sm font-semibold"
                                        onClick={() => setFeedback(true)}>
                                        <span className="material-symbols-outlined text-[18px]">shield</span>
                                        <span>Blokir & Laporkan</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}
