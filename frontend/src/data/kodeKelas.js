// Data dummy hasil belajar kelompok untuk halaman Kode Kelas (admin).
// Daftar kelompoknya mengikuti kode kelas pada set soal milik App, sehingga
// halaman Set Soal, Kode Kelas, dan Dashboard Admin selalu sinkron:
// kode yang dibuat atau dihapus di Set Soal langsung terlihat di sini.

import { STATUS_META } from './setSoal.js'

// Nama kelompok komunitas contoh per kode (kode buatan admin baru memakai
// nama generik "Kelompok PR-XXXX").
const NAMA_KELOMPOK = {
  'PR-2312': { nama: 'RT 05 RW 07 - Warga Dewasa', catatan: 'Balai Warga RW 07, sesi pagi terpadu' },
  'PR-4078': { nama: 'SMAN 12 Jakarta - Kelas 8B', catatan: 'Lab Komputer 2, ekstrakurikuler literasi' },
  'PR-5510': { nama: 'Ibu-ibu PKK RW 03', catatan: 'Pertemuan bulanan, sesi finansial aman' },
  'PR-8834': { nama: 'Komunitas Lansia Sejahtera', catatan: 'Pertemuan rutin RW 04, pendampingan keluarga' },
}

// Nama panggilan anonim (tanpa NIK / nomor HP, sesuai aturan privasi project).
const NAMA_PESERTA = [
  'Pakde Bambang',
  'Bu Wahyu',
  'Mbah Hadi',
  'Bude Sri Rejeki',
  'Pak RT Joko',
  'Bu Siti Aminah',
  'Mas Anto',
  'Nenek Sumiati',
  'Pak Slamet',
  'Bu Endang',
  'Mbak Rina',
  'Kang Ujang',
]

const MODUS = [
  {
    label: 'Tugas Berkomisi (Like & Follow)',
    rawan: 'Sebagian peserta masih bersedia menyetor deposit awal demi komisi kecil yang dijanjikan.',
  },
  {
    label: 'APK Kurir Paket (.apk Fiktif)',
    rawan: 'Sebagian peserta masih ragu membedakan dokumen asli (.pdf) dengan aplikasi palsu (.apk) yang dikirim kurir fiktif.',
  },
  {
    label: 'Catut Bank Resmi (Phishing OTP)',
    rawan: 'Sebagian peserta masih bersedia menyebutkan kode OTP saat penelepon mengaku petugas bank.',
  },
  {
    label: 'Pinjol Ilegal & Transfer Nyasar',
    rawan: 'Sebagian peserta belum sadar biaya administrasi di muka adalah ciri pinjol ilegal.',
  },
]

// Status kelompok di halaman ini: mengikuti status set soalnya, plus "Selesai"
// yang muncul saat admin menonaktifkan sesi lewat tabel.
export const STATUS_KODE = {
  ...STATUS_META,
  selesai: { label: 'Selesai', icon: 'archive', pill: 'bg-surface-container-high text-on-surface-variant' },
}

export const STATUS_PESERTA = {
  lulus: { label: 'Lulus Kompeten', icon: 'verified', pill: 'bg-safe-green-light text-tertiary' },
  pendampingan: { label: 'Perlu Pendampingan', icon: 'priority_high', pill: 'bg-warning-yellow-light text-on-secondary-container' },
  tesulang: { label: 'Tes Ulang Selesai', icon: 'sync_saved_locally', pill: 'bg-primary-fixed text-on-primary-fixed-variant' },
  belum: { label: 'Belum Post-test', icon: 'pending', pill: 'bg-surface-container-high text-on-surface-variant' },
}

function hash(teks) {
  let h = 0
  for (let i = 0; i < teks.length; i += 1) h = (h * 31 + teks.charCodeAt(i)) >>> 0
  return h
}

function rerata(angka) {
  if (!angka.length) return 0
  return Math.round((angka.reduce((a, b) => a + b, 0) / angka.length) * 10) / 10
}

function inisialDari(nama) {
  return nama
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((kata) => kata[0])
    .join('')
    .toUpperCase()
}

// Data hasil belajar satu kelompok: daftar peserta anonim, rerata skor,
// komparasi per modus tipuan, dan skenario paling rawan.
// Nilainya selalu sama untuk kode yang sama (acak terkendali).
export function hasilKelompok(kode) {
  const h = hash(kode)
  const jumlah = 6 + (h % 5) // 6-10 peserta per kelompok
  const mulai = h % NAMA_PESERTA.length

  const peserta = []
  for (let i = 0; i < jumlah; i += 1) {
    const nama = NAMA_PESERTA[(mulai + i) % NAMA_PESERTA.length]
    const acak = hash(`${kode}-${i}`)
    const pre = 3 + (acak % 5) // skor pre-test 3-7
    const belum = i % 5 === 4
    const post = belum ? null : Math.min(10, pre + 2 + (acak % 3))
    const status = belum
      ? 'belum'
      : i % 5 === 3
        ? 'tesulang'
        : post - pre < 3
          ? 'pendampingan'
          : 'lulus'
    const catatan =
      status === 'belum'
        ? 'Belum menyelesaikan post-test'
        : status === 'tesulang'
          ? 'Siklus tes ulang 14 hari selesai'
          : status === 'pendampingan'
            ? 'Masih ragu pada modus paling rawan'
            : 'Sesi pre & post-test lengkap'
    peserta.push({
      nama,
      inisial: inisialDari(nama),
      kodeUnik: `TT-${String(acak % 10000).padStart(4, '0')}`,
      pre,
      post,
      status,
      catatan,
    })
  }

  const preRata = rerata(peserta.map((p) => p.pre))
  const postRata = rerata(peserta.filter((p) => p.post !== null).map((p) => p.post))
  const delta = Math.round((postRata - preRata) * 10) / 10
  const lulus = peserta.filter((p) => p.post !== null && p.post >= 8).length

  // Komparasi per modus dibentuk dari rerata kelompok + variasi tetap tiap topik.
  const variasi = [[0.4, 0.5], [-0.6, -1.1], [0.5, 0.6], [0.9, 0.1]]
  const modus = MODUS.map((m, i) => {
    const pre = Math.round((preRata + variasi[i][0]) * 10) / 10
    const post = Math.min(10, Math.round((postRata + variasi[i][1]) * 10) / 10)
    return { ...m, pre, post, delta: Math.round((post - pre) * 10) / 10 }
  })
  const rawan = modus.reduce((terendah, m) => (m.post < terendah.post ? m : terendah), modus[0])

  return { jumlah, peserta, preRata, postRata, delta, lulus, modus, rawan }
}

function jalurUtama(paket) {
  const hitung = {}
  paket.forEach((s) => {
    if (s.jalur) hitung[s.jalur] = (hitung[s.jalur] || 0) + 1
  })
  const teratas = Object.entries(hitung).sort((a, b) => b[1] - a[1])[0]
  return teratas ? teratas[0] : 'dewasa'
}

function statusDari(paket) {
  if (paket.some((s) => s.status === 'aktif')) return 'aktif'
  if (paket.some((s) => s.status === 'terjadwal')) return 'terjadwal'
  if (paket.some((s) => s.status === 'draf')) return 'draf'
  return 'selesai'
}

// Susun daftar kelompok dari set soal: satu kode kelas = satu baris kelompok.
export function daftarKelompok(sets = [], statusManual = {}) {
  const peta = new Map()
  sets.forEach((s) => {
    const kode = (s.kodeKelas || '').trim().toUpperCase()
    if (!kode) return
    if (!peta.has(kode)) peta.set(kode, [])
    peta.get(kode).push(s)
  })

  return [...peta.entries()].map(([kode, paket]) => {
    const contoh = NAMA_KELOMPOK[kode] || { nama: `Kelompok ${kode}`, catatan: 'Baru dibuat dari halaman Set Soal' }
    const rilis = paket.map((s) => s.rilis).filter(Boolean).sort()[0] || ''
    return {
      kode,
      nama: contoh.nama,
      catatan: contoh.catatan,
      jalur: jalurUtama(paket),
      rilis,
      jumlahSet: paket.length,
      status: statusManual[kode] || statusDari(paket),
      hasil: hasilKelompok(kode),
    }
  })
}

// Template pesan pengingat tes ulang yang disalin admin ke grup WhatsApp.
export function pesanPengingat(kelompok) {
  return [
    `Halo warga ${kelompok.nama} 🙏`,
    '',
    `Pengingat: sesi tes ulang evaluasi 14 hari untuk kelas ${kelompok.kode} sudah dibuka.`,
    'Silakan masuk lewat tangkistipu.id/masuk, lalu gunakan nama panggilan dan kode peserta masing-masing.',
    '',
    'Cukup 10 soal singkat, sekitar 5 menit. Mari saling jaga keluarga dari penipuan digital 🛡️',
  ].join('\n')
}
