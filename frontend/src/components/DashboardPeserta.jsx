import { useState } from 'react'
import { TRACKS } from '../data/jalurBelajar.jsx'
import { salinKode, unduhKartuPeserta } from '../utils/kartuPeserta.js'

const HIGHLIGHTS = [
  {
    icon: 'extension_off',
    title: 'Ekstensi .APK / .EXE Palsu',
    desc: 'Aplikasi pembobol SMS/OTP yang menyamar sebagai surat undangan, foto kurir, atau tagihan PLN.',
  },
  {
    icon: 'link_off',
    title: 'Domain Typo-squatting',
    desc: 'Tautan bank fiktif dengan ejaan mengecoh seperti bca-klikbpa.com atau bri-promo-poin.id.',
  },
]

const TIPS = [
  {
    icon: 'lightbulb',
    text: 'Lembaga resmi atau pihak perbankan tidak pernah meminta kode OTP atau mengirimkan berkas berformat .APK melalui pesan chat pribadi.',
  },
]

const LOCK_HINT = {
  pretest: 'Terkunci',
  modus: 'Selesaikan Pre-test dulu',
  simulasi: 'Selesaikan 8 Modus dulu',
  posttest: 'Selesaikan 8 Skenario dulu',
}

function getSteps(progres, onPretest, onPosttest, onModus, onSkenario, notify) {
  const pretestDone = progres.pretest !== null
  const modusDone = progres.modusDibaca >= 8
  const skenarioDone = progres.skenario >= 8
  const posttestDone = progres.posttest !== null

  const step1 = pretestDone
    ? { id: 'pretest', num: '1', state: 'done', title: 'Pre-test Kemampuan Awal', desc: '10 soal pilihan ganda telah dikerjakan untuk mengukur pemahaman awal rekayasa sosial.', badge: `Selesai • Skor: ${progres.pretest.skor}/10`, icon: 'check_circle', badgeIcon: 'done_all', actionLabel: 'Lihat Hasil Jawaban', actionIcon: 'visibility', onAction: () => notify('Halaman hasil pre-test akan segera dibuka.'), connectorClass: 'bg-tertiary' }
    : { id: 'pretest', num: '1', state: 'active', title: 'Pre-test Kemampuan Awal', desc: '10 soal pilihan ganda untuk mengukur pemahaman awal rekayasa sosial. Boleh dilewati.', badge: 'Belum Dikerjakan', icon: 'edit_document', badgeIcon: 'bolt', actionLabel: 'Mulai Pre-test', actionIcon: 'arrow_forward', onAction: () => onPretest(), connectorClass: 'border-dashed border-outline-variant' }

  const step2 = modusDone
    ? { id: 'modus', num: '2', state: 'done', title: 'Pelajari 8 Modus Populer', desc: 'Pinjol ilegal, file APK kurir paket, undangan pernikahan palsu, phishing bank, dan lainnya.', badge: 'Selesai • 8 Modus Dibaca', icon: 'done_all', badgeIcon: 'menu_book', actionLabel: 'Buka Katalog Modus', actionIcon: 'menu_book', onAction: () => onModus(), connectorClass: 'bg-primary' }
    : { id: 'modus', num: '2', state: pretestDone ? 'active' : 'upcoming', title: 'Pelajari 8 Modus Populer', desc: 'Pinjol ilegal, file APK kurir paket, undangan pernikahan palsu, phishing bank, dan lainnya.', badge: `${progres.modusDibaca} dari 8 modus dibaca`, icon: 'menu_book', badgeIcon: 'menu_book', actionLabel: 'Buka Katalog Modus', actionIcon: 'menu_book', onAction: () => onModus(), progressLabel: `${progres.modusDibaca} dari 8 modus dibaca`, progressWidth: (progres.modusDibaca / 8) * 100, connectorClass: 'border-dashed border-outline-variant' }

  const step3 = skenarioDone
    ? { id: 'simulasi', num: '3', state: 'done', title: 'Coba Simulasi Kasus Interaktif', desc: 'Hadapi percakapan manipulatif secara nyata di lingkungan aman tanpa risiko kerugian finansial.', badge: 'Selesai • 8 Skenario', icon: 'done_all', badgeIcon: 'bolt', actionLabel: 'Ulangi Simulasi', actionIcon: 'refresh', onAction: () => onSkenario(), connectorClass: 'bg-primary' }
    : { id: 'simulasi', num: '3', state: modusDone ? 'active' : 'upcoming', title: 'Coba Simulasi Kasus Interaktif', desc: 'Hadapi percakapan manipulatif secara nyata di lingkungan aman tanpa risiko kerugian finansial.', badge: `${progres.skenario} dari 8 skenario selesai`, icon: 'chat', badgeIcon: 'bolt', actionLabel: 'Mulai Simulasi', actionIcon: 'arrow_forward', onAction: () => onSkenario(), progressLabel: `${progres.skenario} dari 8 skenario selesai`, progressWidth: (progres.skenario / 8) * 100, connectorClass: 'border-dashed border-outline-variant' }

  const step4 = posttestDone
    ? { id: 'posttest', num: '4', state: 'done', title: 'Post-test & Evaluasi Akhir', desc: 'Post-test selesai. Dapatkan sertifikat kompetensi jika skor ≥ 8.', badge: `Selesai • Skor: ${progres.posttest.skor}/10`, icon: 'workspace_premium', badgeIcon: 'done_all', actionLabel: 'Lihat Sertifikat', actionIcon: 'workspace_premium', onAction: () => notify('Sertifikat kompetensimu akan segera dibuka.'), connectorClass: 'bg-primary' }
    : { id: 'posttest', num: '4', state: skenarioDone ? 'active' : 'locked', title: 'Post-test & Evaluasi Akhir', desc: 'Terbuka setelah menyelesaikan semua simulasi skenario. Dapatkan sertifikat kompetensi jika skor ≥ 8.', badge: skenarioDone ? 'Siap Dikerjakan' : 'Terkunci', icon: skenarioDone ? 'quiz' : 'lock', badgeIcon: skenarioDone ? 'bolt' : 'lock', actionLabel: 'Mulai Post-test', actionIcon: skenarioDone ? 'arrow_forward' : 'lock', onAction: () => onPosttest() }

  return [step1, step2, step3, step4]
}

function StepNode({ step }) {
  if (step.state === 'done') {
    return (
      <div
        className="relative z-10 w-12 h-12 rounded-full bg-safe-green-light border-2 border-tertiary text-tertiary flex items-center justify-center shrink-0 shadow-sm">
        <span className="material-symbols-outlined text-[24px]">{step.icon}</span>
      </div>
    )
  }
  if (step.state === 'active') {
    return (
      <div
        className="relative z-10 w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-md ring-4 ring-primary-fixed">
        <span className="material-symbols-outlined text-[24px]">{step.icon}</span>
      </div>
    )
  }
  return (
    <div
      className="relative z-10 w-12 h-12 rounded-full bg-surface-container border-2 border-outline-variant text-text-muted flex items-center justify-center shrink-0"
      aria-hidden="true">
      <span className="material-symbols-outlined text-[24px]">lock</span>
    </div>
  )
}

function StepCard({ step, onModul, onSimulasi, onNotice }) {
  const isActive = step.state === 'active'
  const isLocked = step.state === 'locked'
  const isUpcoming = step.state === 'upcoming'

  const SPOTLIGHT = {
    pretest: {
      icon: 'quiz',
      badge: 'Tes Awal • 10 Soal',
      title: 'Ukur Pengetahuanmu Sebelum Belajar',
      desc: 'Pre-test singkat untuk memetakan pemahaman awal tentang rekayasa sosial',
      tone: 'text-primary bg-primary-fixed',
    },
    modus: {
      icon: 'menu_book',
      badge: 'Katalog Modus',
      title: 'Modus Penipuan Populer di Indonesia',
      desc: 'Katalog modus penipuan yang paling sering menjerat korban',
      tone: 'text-danger-red bg-danger-red-light',
    },
    simulasi: {
      icon: 'apk_install',
      badge: 'Skenario Berikutnya',
      title: 'Pesan Kurir Paket: "Lihat Foto Resi.apk"',
      desc: 'Simulasi manipulasi WhatsApp kurir ekspedisi fiktif',
      tone: 'text-danger-red bg-danger-red-light',
    },
    posttest: {
      icon: 'workspace_premium',
      badge: 'Tes Akhir • 10 Soal',
      title: 'Buktikan Kompetensimu Setelah Belajar',
      desc: 'Post-test untuk mengukur peningkatan ketahanan dari penipuan digital',
      tone: 'text-primary bg-primary-fixed',
    },
  }
  const spotlight = SPOTLIGHT[step.id] || SPOTLIGHT.simulasi

  const handleAction = () => {
    if (step.onAction) { step.onAction(); return }
    if (step.id === 'modus') { onModul(); return }
    if (step.id === 'simulasi') { onSimulasi(); return }
    if (step.id === 'pretest') { onNotice('Halaman pre-test akan segera dibuka.'); return }
    onNotice('Post-test terbuka setelah semua simulasi skenario selesai.')
  }

  return (
    <div
      className={`flex-1 rounded-xl p-space-lg border transition-all ${isLocked || isUpcoming
        ? 'bg-surface-container-low border-outline-variant/40'
        : isActive
          ? 'bg-surface-white shadow-md border-2 border-primary/20 bg-gradient-to-br from-surface-white via-surface-white to-surface-container-low'
          : 'bg-surface-white shadow-sm border-safe-green-light/60 hover:shadow-md'}`}>
      {isActive ? (
        <div className="flex flex-col gap-space-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span
                  className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Langkah
                  {step.num} • Fokus Saat Ini</span>
                <span
                  className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                  <span className="material-symbols-outlined text-[14px]">{step.badgeIcon}</span>
                  {step.badge}
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary">{step.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{step.desc}</p>
            </div>
            {step.progressLabel ? (
              <div className="flex flex-col items-end gap-1 w-full md:w-auto shrink-0">
                <span className="font-label-sm text-label-sm text-primary-container font-semibold">{step.progressLabel}</span>
                <div className="w-full md:w-36 h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container rounded-full transition-all duration-500"
                    style={{ width: `${step.progressWidth || 0}%` }}></div>
                </div>
              </div>
            ) : null}
          </div>
          <div
            className="bg-surface-cream rounded-xl p-space-md flex flex-col md:flex-row items-center justify-between gap-space-md border border-border-subtle/50">
            <div className="flex items-center gap-space-md">
              <div
                className={`w-10 h-10 rounded-lg ${spotlight.tone} flex items-center justify-center shrink-0`}>
                <span className="material-symbols-outlined text-[22px]">{spotlight.icon}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-danger-red font-bold">{spotlight.badge}</span>
                <span className="font-label-lg text-label-lg text-on-surface">{spotlight.title}</span>
                <span className="font-body-sm text-body-sm text-text-muted">{spotlight.desc}</span>
              </div>
            </div>
            <button
              className="w-full md:w-auto h-12 px-space-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-xl inline-flex items-center justify-center gap-space-xs transition-all shadow-sm shrink-0"
              onClick={handleAction} type="button">
              <span>{step.actionLabel}</span>
              <span className="material-symbols-outlined text-[20px]">{step.actionIcon}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span
                className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">Langkah
                {step.num}</span>
              <span
                className={`inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${isLocked || isUpcoming
                  ? 'bg-surface-container-high text-text-muted'
                  : 'bg-safe-green-light text-tertiary'}`}>
                <span className="material-symbols-outlined text-[14px]">{step.badgeIcon}</span>
                {step.badge}
              </span>
              {step.id === 'pretest' && step.state !== 'done' && (
                <span
                  className="inline-flex px-space-xs py-0.5 rounded bg-surface-container text-text-muted font-label-sm text-label-sm">
                  Boleh dilewati
                </span>
              )}
            </div>
            <h3 className={`font-headline-sm text-headline-sm ${isLocked || isUpcoming ? 'text-text-muted' : 'text-on-surface'}`}>
              {step.title}</h3>
            <p className="font-body-sm text-body-sm text-text-muted">{step.desc}</p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            {isLocked || isUpcoming ? (
              <div
                className="w-full md:w-auto px-space-md py-space-sm rounded-xl bg-surface-container-high text-text-muted font-label-md text-label-md inline-flex items-center justify-center gap-space-xs"
                role="status">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>{LOCK_HINT[step.id] || 'Terkunci'}</span>
              </div>
            ) : (
              <button
                className="w-full md:w-auto px-space-md py-space-sm font-label-md text-label-md rounded-xl inline-flex items-center justify-center gap-space-xs transition-colors bg-surface-container hover:bg-surface-container-high text-primary"
                onClick={handleAction} type="button">
                <span className="material-symbols-outlined text-[16px]">{step.actionIcon}</span>
                <span>{step.actionLabel}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ProgressRing({ percent }) {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
        <path className="text-border-subtle"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none" stroke="currentColor" strokeWidth="3.5"></path>
        <path className="text-primary-container"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none" stroke="currentColor" strokeDasharray={`${percent}, 100`} strokeLinecap="round"
          strokeWidth="3.5"></path>
      </svg>
      <span className="absolute font-label-md text-label-md text-primary font-bold">{percent}%</span>
    </div>
  )
}

export default function DashboardPeserta({
  peserta,
  progres = { pretest: null, modusDibaca: 0, skenario: 0, posttest: null },
  onSelesaiPretest = () => {},
  onTambahModus = () => {},
  onTambahSkenario = () => {},
  onSelesaiPosttest = () => {},
  onModul = () => {},
  onSimulasi = () => {},
  onHome = () => {},
  onMulaiBaru = () => {},
}) {
  const token = peserta?.token || 'TKP-8924-X'
  const nickname = peserta?.nickname?.trim() || 'Kawan Waspada'
  const track = TRACKS[peserta?.track] || TRACKS[1]
  const classCode = (peserta?.classCode || '').trim()

  const [showRetake, setShowRetake] = useState(true)
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState('')

  const notify = (msg) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 3500)
  }

  const steps = getSteps(progres, onSelesaiPretest, onSelesaiPosttest, onTambahModus, onTambahSkenario, notify)
  const totalLangkah = steps.filter((s) => s.state === 'done').length
  const persen = Math.round((totalLangkah / 4) * 100)
  const tahapAktif = steps.findIndex((s) => s.state === 'active') + 1

  const copyCode = async () => {
    try {
      await salinKode(token)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      notify('Gagal menyalin. Catat manual: ' + token)
    }
  }

  const downloadCard = () => {
    try {
      unduhKartuPeserta({ token, nickname })
      notify('Kartu peserta tersimpan sebagai gambar.')
    } catch {
      notify('Unduhan gagal. Catat manual: ' + token)
    }
  }

  const handleKeluar = () => {
    const lanjut = window.confirm(
      'Kamu akan keluar dari perangkat ini. Simpan kodemu dulu agar bisa masuk lagi. Lanjutkan?'
    )
    if (lanjut) onMulaiBaru()
  }

  return (
    <main className="w-full bg-surface-cream min-h-screen">
      <div className="flex flex-col w-full">
        {/* Toast */}
        {toast && (
          <div
            className="fixed top-24 right-4 sm:right-6 z-50 flex items-center gap-space-md p-space-md bg-surface-white rounded-xl shadow-xl pop-in max-w-[calc(100%-2rem)]"
            role="status" aria-live="polite" style={{ boxShadow: '0 12px 32px rgba(15, 92, 115, 0.12)' }}>
            <div
              className="w-10 h-10 rounded-full bg-safe-green-light flex items-center justify-center text-tertiary shrink-0">
              <span className="material-symbols-outlined text-[22px]">check_circle</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface">{toast}</span>
          </div>
        )}

        {/* Banner Tes Ulang (muncul setelah post-test selesai) */}
        {showRetake && progres.posttest !== null && (
          <div
            className="w-full bg-secondary-container text-on-secondary-fixed py-space-md px-margin md:px-margin-tablet lg:px-margin-desktop shadow-sm fade-in">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md text-left">
                <div
                  className="w-10 h-10 rounded-xl bg-on-secondary-fixed/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px] text-on-secondary-fixed">update</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-space-xs">
                    <span
                      className="font-label-md text-label-md uppercase tracking-wider text-on-secondary-fixed">Masa
                      Evaluasi 14 Hari</span>
                    <span className="inline-block w-2 h-2 rounded-full bg-tertiary"></span>
                  </div>
                  <p className="font-headline-sm text-headline-sm text-on-secondary-fixed leading-tight">
                    🎉 Tes Ulang Sudah Dibuka! Cek apakah kamu masih ingat cara mengenali modus penipuan.</p>
                </div>
              </div>
              <div className="flex items-center gap-space-sm shrink-0 w-full md:w-auto justify-end">
                <button
                  className="flex items-center justify-center gap-space-xs px-space-lg py-space-sm bg-primary text-on-primary font-label-md text-label-md rounded-xl hover:bg-primary-container transition-all shadow-sm"
                  onClick={() => notify('Halaman tes ulang akan segera dibuka.')} type="button">
                  <span>Mulai Tes Ulang Sekarang</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <button
                  aria-label="Tutup notifikasi"
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-on-secondary-fixed/10 text-on-secondary-fixed transition-colors"
                  onClick={() => setShowRetake(false)} type="button">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Container */}
        <div className="max-w-[1200px] w-full mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/* Kolom Utama (8 kolom) */}
            <section className="lg:col-span-8 flex flex-col gap-space-xl">
              {/* Kartu Sambutan & Progres */}
              <div
                className="bg-surface-white p-space-lg sm:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-lg reveal">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                  <div className="flex flex-col gap-space-xs">
                    <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Halo,
                      {nickname}! 👋</h1>
                    <p className="font-body-md text-body-md text-text-muted">
                      {totalLangkah === 0
                        ? 'Mulai dari langkah pertama: kerjakan pre-test untuk memetakan pemahaman awalmu.'
                        : totalLangkah === 4
                          ? 'Selamat! Semua langkah selesai. Kamu bisa mengulang materi kapan saja.'
                          : 'Lanjutkan langkah pembelajaranmu untuk memperkuat ketahanan dari penipuan digital.'}
                    </p>
                  </div>
                  <div
                    className="bg-surface-cream px-space-lg py-space-md rounded-xl flex items-center gap-space-md shrink-0">
                    <ProgressRing percent={persen} />
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-text-muted">Status Kemajuan</span>
                      <span className="font-label-md text-label-md text-on-surface">{totalLangkah} dari 4 Selesai</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-space-xs pt-space-xs">
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="font-label-md text-label-md text-primary">Progres Pelatihan Keseluruhan</span>
                    <span className="font-label-md text-label-md text-primary-container">{persen}% Selesai{tahapAktif > 0 ? ` (Tahap ${tahapAktif} Aktif)` : ''}</span>
                  </div>
                  <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden p-0.5">
                    <div className="h-full bg-primary-container rounded-full transition-all duration-500"
                      style={{ width: `${persen}%` }}></div>
                  </div>
                </div>
              </div>

              {/* 4 Langkah Jalur Belajar */}
              <div className="flex flex-col gap-space-md reveal">
                <div className="flex items-center justify-between px-space-xs">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-3 h-3 rounded-full bg-primary-container"></div>
                    <h2 className="font-headline-md text-headline-md text-primary">4 Langkah Jalur Belajar</h2>
                  </div>
                  <span className="font-label-sm text-label-sm text-text-muted">Jalur: Edukasi Bertahap</span>
                </div>
                <div className="flex flex-col gap-space-md">
                  {steps.map((step, i) => (
                    <div key={step.id} className="relative flex items-start gap-space-md group">
                      {i < steps.length - 1 && (
                        <div
                          className={`absolute left-6 top-12 bottom-0 w-0.5 ${step.state === 'done'
                            ? step.connectorClass
                            : 'border-l-2 border-dashed border-outline-variant'} -mb-space-md z-0`}>
                        </div>
                      )}
                      <StepNode step={step} />
                      <StepCard step={step} onModul={onModul} onSimulasi={onSimulasi} onNotice={notify} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Indikator Kunci yang Dikuasai */}
              <div className="bg-surface-white rounded-xl p-space-lg sm:p-space-xl shadow-sm flex flex-col gap-space-lg reveal">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span
                      className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Modus
                      Berbahaya</span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      {progres.modusDibaca > 0 ? 'Indikator Kunci yang Telah Kamu Kuasai' : 'Indikator Kunci yang Perlu Dikuasai'}
                    </h3>
                  </div>
                  <button
                    className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1"
                    onClick={onModul} type="button">
                    <span>Semua Modus</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {HIGHLIGHTS.map((h) => (
                    <div key={h.title} className="p-space-md rounded-xl bg-surface-card-subtle flex items-start gap-space-md">
                      <div
                        className="w-10 h-10 rounded-lg bg-surface-white text-danger-red flex items-center justify-center shrink-0 shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">{h.icon}</span>
                      </div>
                      <div className="flex flex-col gap-space-xs">
                        <span className="font-label-md text-label-md text-on-surface">{h.title}</span>
                        <p className="font-body-sm text-body-sm text-text-muted">{h.desc}</p>
                        <div className={`flex items-center gap-1 font-label-sm text-label-sm font-semibold mt-1 ${progres.modusDibaca > 0 ? 'text-tertiary' : 'text-text-muted'}`}>
                          <span className="material-symbols-outlined text-[14px]">{progres.modusDibaca > 0 ? 'verified' : 'schedule'}</span>
                          {progres.modusDibaca > 0 ? 'Sudah Dipelajari' : 'Belum Dipelajari'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Sidebar (4 kolom) */}
            <aside className="lg:col-span-4 flex flex-col gap-space-lg">
              {/* Kartu Profil & Identitas */}
              <div className="bg-surface-white rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md reveal">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div
                      className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-[28px]">account_circle</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-primary">{nickname}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-tertiary text-[24px]">verified_user</span>
                </div>
                <div
                  className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[18px]">group</span>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">{track.label}</span>
                  </div>
                  <button
                    className="font-label-sm text-label-sm text-primary hover:underline font-semibold"
                    onClick={onMulaiBaru} type="button">
                    Ubah Profil
                  </button>
                </div>
                <button
                  className="w-full h-10 px-space-sm bg-surface-container hover:bg-surface-container-high text-danger-red font-label-md text-label-md rounded-lg flex items-center justify-center gap-1 transition-colors"
                  onClick={handleKeluar} type="button">
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>Keluar</span>
                </button>
                {classCode && (
                  <div
                    className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[18px]">school</span>
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold">Kode Kelas: {classCode}</span>
                    </div>
                  </div>
                )}
                <div className="bg-surface-cream rounded-xl p-space-md flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider font-semibold">KODE
                      AKSES PESERTA</span>
                    <span
                      className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary font-bold">
                      <span className="material-symbols-outlined text-[14px]">lock</span> Unik
                    </span>
                  </div>
                  <div
                    className="bg-surface-white px-space-md py-space-sm rounded-lg flex items-center justify-between shadow-sm">
                    <span className="font-mono font-bold text-headline-sm text-primary tracking-widest">{token}</span>
                    <button
                      className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary transition-colors"
                      onClick={copyCode} title="Salin Kode" type="button">
                      <span className="material-symbols-outlined text-[18px]">{copied ? 'check' : 'content_copy'}</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-space-xs mt-space-xs">
                    <button
                      className="h-10 px-space-sm bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm rounded-lg flex items-center justify-center gap-1 transition-colors"
                      onClick={copyCode} type="button">
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>
                      <span>Salin Kode</span>
                    </button>
                    <button
                      className="h-10 px-space-sm bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm rounded-lg flex items-center justify-center gap-1 transition-colors"
                      onClick={downloadCard} type="button">
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span>Unduh Kartu</span>
                    </button>
                  </div>
                  <p className="font-body-sm text-body-sm text-text-muted mt-space-xs">
                    🔒 <strong>Privasi Penuh:</strong> Tanpa email &amp; nomor telepon. Simpan kode ini di catatan
                    ponselmu agar skormu tetap tersambung kapan saja.
                  </p>
                </div>
              </div>

              {/* Pintasan Cepat */}
              <div className="flex flex-col gap-space-md reveal reveal-2">
                <div
                  className="bg-surface-white rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-space-sm">
                    <div
                      className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">campaign</span>
                    </div>
                    <div className="flex flex-col">
                      <span
                        className="font-label-sm text-label-sm text-danger-red font-bold uppercase">Aksi Nyata</span>
                      <h4 className="font-label-lg text-label-lg text-on-surface">Panduan Cara Melapor</h4>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-text-muted">
                    Daftar kontak langsung OJK 157, Satgas PASTI, Cek Rekening Komdigi, &amp; Patroli Siber Polri.
                  </p>
                  <button
                    className="mt-space-xs text-primary font-label-md text-label-md inline-flex items-center gap-1 hover:gap-2 transition-all self-start"
                    onClick={() => notify('Kanal pelaporan resmi akan segera dibuka.')} type="button">
                    <span>Buka Direktori Lapor Resmi</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
                <div
                  className="bg-surface-white rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-space-sm">
                    <div
                      className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">picture_as_pdf</span>
                    </div>
                    <div className="flex flex-col">
                      <span
                        className="font-label-sm text-label-sm text-secondary font-bold uppercase">Bahan Edukasi</span>
                      <h4 className="font-label-lg text-label-lg text-on-surface">Ringkasan Modus 1 Halaman</h4>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-text-muted">
                    Cetak atau bagikan ke keluarga, grup WhatsApp RT/RW, komunitas, &amp; rekan kerja.
                  </p>
                  <button
                    className="mt-space-xs text-secondary hover:text-on-secondary-fixed font-label-md text-label-md inline-flex items-center gap-1 transition-colors self-start"
                    onClick={() => notify('Lembar edukasi akan segera tersedia untuk diunduh.')} type="button">
                    <span>Unduh Lembar Edukasi (PDF &amp; JPG)</span>
                    <span className="material-symbols-outlined text-[16px]">download</span>
                  </button>
                </div>
              </div>

              {/* Tips Harian */}
              <div className="bg-warning-yellow-light rounded-xl p-space-lg flex flex-col gap-space-sm shadow-sm reveal reveal-3">
                <div className="flex items-center gap-space-xs text-secondary">
                  <span className="material-symbols-outlined text-[22px] text-secondary">lightbulb</span>
                  <span className="font-label-md text-label-md font-bold uppercase tracking-wider">Tips Cepat
                    Hari Ini</span>
                </div>
                {TIPS.map((tip) => (
                  <p key={tip.text} className="font-body-md text-body-md text-on-surface">
                    “{tip.text}”
                  </p>
                ))}
                <div className="pt-space-xs flex items-center justify-between text-body-sm text-text-muted">
                  <span className="font-label-sm text-label-sm">Prinsip: Sadar • Verifikasi • Tolak</span>
                  <span className="font-mono text-label-sm font-semibold text-secondary">#WaspadaBersama</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}
