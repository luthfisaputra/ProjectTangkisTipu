export const TRACKS = [
  {
    label: 'Anak & Remaja (10–17 Tahun)',
    desc: 'Fokus pada jebakan game online, link diamond ilegal, & phishing sosmed.',
  },
  {
    label: 'Dewasa (18–59 Tahun)',
    desc: 'Fokus pada APK surat tilang, penipuan kurir paket, loker palsu, & pinjol.',
  },
  {
    label: 'Lansia (60+ Tahun)',
    desc: 'Tampilan diperbesar, modus undian via SMS, & bantuan verifikasi keluarga.',
  },
]

const CODE_LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ'

export function generateParticipantId() {
  const num = Math.floor(1000 + Math.random() * 9000)
  const letter = CODE_LETTERS.charAt(Math.floor(Math.random() * CODE_LETTERS.length))
  return `TKP-${num}-${letter}`
}
