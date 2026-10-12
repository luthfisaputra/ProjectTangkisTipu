import { useEffect, useMemo, useRef, useState } from 'react'

// ============================================================
// SEED DATA — semua konten bertema TangkisTipu
// ============================================================

const POSTS_SEED = [
  {
    id: 'p1',
    author: 'Rina Kartika',
    handle: '@rinakartika',
    verified: false,
    time: '12m',
    tag: 'Curhat Korban',
    text: 'Aku mau curhat ya. Minggu lalu ibuku hampir transfer Rp25 juta ke orang yang nelpon ngaku kalau aku kecelakaan. Suaranya persis aku katanya, padahal aku lagi di kantor. Untung aja ibu nelpon aku dulu sebelum transfer. Teman-teman, tolong ingatkan orang tua kalian ya. Modus suara AI ini beneran nyata dan ngeri banget.',
    image: null,
    likes: 342,
  },
  {
    id: 'p2',
    author: 'Bagas Prasetyo',
    handle: '@bagaspr',
    verified: true,
    time: '1j',
    tag: 'Edukasi',
    text: 'PSA PENTING 🚨\n\nKalau ada yang minta kode OTP lewat chat, telepon, atau email — itu 100% PENIPUAN.\n\nBank, OJK, e-wallet, marketplace, kurir paket — TIDAK ADA yang pernah minta OTP kamu.\n\nOTP itu kunci rekeningmu. Sekali kamu kasih, dana bisa ludes dalam hitungan detik. Tolong save & share ke keluarga, terutama yang lansia.',
    image: null,
    likes: 891,
  },
  {
    id: 'p3',
    author: 'Sari Wulandari',
    handle: '@sariw',
    verified: false,
    time: '2j',
    tag: 'Modus Baru',
    text: 'Baru banget kena modus baru: WhatsApp dari nomor asing kirim file "resi_paket.apk" ngaku dari JNE. Katanya paketku tertahan. Aku hampir buka, untung ingat thread di sini. Ternyata itu APK pencuri OTP. Sekarang aku share ke grup keluarga biar yang lain waspada. Hati-hati ya, modus APK makin rapi tampilannya.',
    image: null,
    likes: 156,
  },
  {
    id: 'p4',
    author: 'Dimas Aditya',
    handle: '@dimasaditya',
    verified: true,
    time: '4j',
    tag: 'Tips Aman',
    text: '5 aturan yang aku pegang supaya nggak kena tipu online:\n\n1. Tidak ada yang namanya "untung pasti" — kalau dijanjikan pasti untung, itu investasi bodong.\n2. Rekening pribadi untuk bayar investasi = red flag.\n3. Diminta setor dulu buat kerja? Penipuan.\n4. Link aneh jangan diklik, buka aplikasi resmi langsung.\n5. Ragu? Telepon orang yang kamu percaya dulu sebelum transfer.',
    image: null,
    likes: 412,
  },
  {
    id: 'p5',
    author: 'Chef Andi',
    handle: '@chefandi',
    verified: false,
    time: '6j',
    tag: 'Curhat Korban',
    text: 'Setahun lalu aku kena investasi robot trading. Rugi Rp18 juta. Awalnya cuma iseng setor Rp500 ribu, cair terus. Waktu aku berani setor besar — platformnya hilang. Pelajaran mahal: kalau profit dijanjikan tetap per hari/minggu, itu palsu. Investasi asli selalu ada risiko. Sekarang aku edukasi teman-teman warung biar nggak kena.',
    image: null,
    likes: 287,
  },
  {
    id: 'p6',
    author: 'Nabila Putri',
    handle: '@nabilaputri',
    verified: false,
    time: '10j',
    tag: 'Modus Baru',
    text: 'Reminder buat teman-teman pelajar & mahasiswa 👇\n\nTugas like/follow TikTok berbayar Rp20.000 per tugas itu PENIPUAN. Aku kena waktu SMA, dapat Rp30.000 pertama, terus diminta top up Rp300.000 buat "naik VIP". Uang nggak balik, admin blokir aku. Tolong jangan tergiur uang jajan instan ya. Uang susah dicari, jangan sampai habis buat penipu.',
    image: null,
    likes: 623,
  },
  {
    id: 'p7',
    author: 'Bu Ratna',
    handle: '@ratna.lansia',
    verified: false,
    time: '1h',
    tag: 'Curhat Korban',
    text: 'Saya ibu rumah tangga umur 65. Kemarin dapat WhatsApp dari nomor baru ngaku anak saya yang lagi ganti nomor. Diminta transfer Rp10 juta buat keperluan mendesak. Hampir saja saya transfer, untung cucu saya pulang dan bilang itu penipuan. Sekarang saya belajar pakai aplikasi ini. Terima kasih untuk edukasinya, sangat membantu orang tua seperti saya.',
    image: null,
    likes: 178,
  },
  {
    id: 'p8',
    author: 'Fajar Nugroho',
    handle: '@fajarn',
    verified: false,
    time: '1h',
    tag: 'Tips Aman',
    text: 'Buat yang belum tahu: kalau sudah terlanjur transfer ke penipu, GOLDEN PERIOD-nya cuma 1-2 jam.\n\nLangkah cepat:\n1. Telepon bank, minta rekening penipu diblokir.\n2. Lapor iasc.ojk.go.id + cekrekening.id.\n3. Screenshot semua chat & bukti transfer.\n4. Bikin laporan polisi.\n\nSemakin cepat, semakin besar peluang uang kembali. Jangan malu, jangan diem aja.',
    image: null,
    likes: 234,
  },
]

const COMMENTS_SEED = {
  p1: [
    {
      id: 'c1',
      author: 'Bu Ratna',
      handle: '@ratna.lansia',
      time: '8m',
      text: 'Terima kasih sudah share. Saya juga hampir kena modus serupa. Sekarang saya selalu telepon anak saya dulu sebelum transfer apa pun.',
      replies: [
        {
          id: 'r1',
          author: 'Rina Kartika',
          handle: '@rinakartika',
          time: '5m',
          text: 'Betul Bu. Lebih baik repot telepon dulu daripada uang hilang. Semangat terus ya Bu.',
        },
      ],
    },
    {
      id: 'c2',
      author: 'Fajar Nugroho',
      handle: '@fajarn',
      time: '2m',
      text: 'Suara AI sekarang bisa ditiru cuma dari 3 detik rekaman story kita di IG. Please, batasi posting voice note publik ya.',
      replies: [],
    },
  ],
  p2: [
    {
      id: 'c3',
      author: 'Dimas Aditya',
      handle: '@dimasaditya',
      time: '45m',
      text: 'Screenshot & share ke grup keluarga udah aku lakuin. Yang paling penting sih emang edukasi ke orang tua.',
      replies: [],
    },
    {
      id: 'c4',
      author: 'Chef Andi',
      handle: '@chefandi',
      time: '30m',
      text: 'Aku tempelin notes ini di meja kasir warung. Banyak yang tanya, lumayan jadi bahan edukasi.',
      replies: [
        {
          id: 'r2',
          author: 'Bagas Prasetyo',
          handle: '@bagaspr',
          time: '20m',
          text: 'Ide bagus Pak! Boleh aku tiru buat komunitas RT juga?',
        },
      ],
    },
  ],
  p3: [
    {
      id: 'c5',
      author: 'Rina Kartika',
      handle: '@rinakartika',
      time: '1h',
      text: 'Aku juga pernah dapat APK ngaku undangan nikah. Sekarang whatsapp dari nomor asing langsung aku blokir.',
      replies: [],
    },
  ],
  p6: [
    {
      id: 'c6',
      author: 'Sari Wulandari',
      handle: '@sariw',
      time: '5h',
      text: 'Aku kena juga waktu kuliah. Rugi Rp450 ribu. Sekarang aku edukasi adik kelas biar nggak kena.',
      replies: [
        {
          id: 'r3',
          author: 'Nabila Putri',
          handle: '@nabilaputri',
          time: '3h',
          text: 'Semangat kak! Setidaknya kita bisa jadi warning buat yang lain.',
        },
      ],
    },
  ],
  p8: [
    {
      id: 'c7',
      author: 'Bagas Prasetyo',
      handle: '@bagaspr',
      time: '45m',
      text: 'Tambahan: simpan nomor call center bank di kontak HP. Waktu panik, kita nggak sempat googling.',
      replies: [],
    },
  ],
}

const TRENDING = [
  'Curhat Korban',
  'Modus Baru',
  'Tips Aman',
  'Edukasi',
  'APK Palsu',
  'Phishing & OTP',
]

const TAG_OPTIONS = [
  'Umum',
  'Curhat Korban',
  'Modus Baru',
  'Tips Aman',
  'Edukasi',
  'Pinjol Ilegal',
  'APK Palsu',
  'Phishing & OTP',
  'Investasi Bodong',
  'Penipuan Online Shop',
]

// ============================================================
// HELPERS
// ============================================================

function getAvatarInitial(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function countComments(comments) {
  if (!comments) return 0
  return comments.reduce((sum, c) => sum + 1 + (c.replies?.length || 0), 0)
}

const isOwnPost = (p) => p && (p.author === 'Kamu' || p.handle === '@kamu')

// ============================================================
// SUB-COMPONENTS
// ============================================================

// Desktop sidebar (hanya tampil di lg+)
function SidebarNav({ active, onChange }) {
  const items = [
    { id: 'upload', label: 'Upload', icon: 'add_circle', desc: 'Bagikan cerita atau tips' },
    { id: 'explore', label: 'Explore', icon: 'explore', desc: 'Jelajahi cerita & edukasi' },
    { id: 'markah', label: 'Markah', icon: 'bookmark', desc: 'Postingan yang kamu simpan' },
  ]

  return (
    <nav
      className="bg-surface-white rounded-2xl border border-border-subtle shadow-sm p-2 flex flex-col gap-1"
      aria-label="Navigasi komunitas"
    >
      {items.map((it) => {
        const isActive = active === it.id
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => onChange(it.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
              isActive
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="material-symbols-outlined text-[22px] shrink-0">{it.icon}</span>
            <span className="flex flex-col min-w-0">
              <span className={`font-label-md text-label-md font-semibold ${isActive ? 'text-on-primary' : 'text-on-surface'}`}>
                {it.label}
              </span>
              <span className={`text-[11px] ${isActive ? 'text-on-primary/80' : 'text-text-muted'}`}>
                {it.desc}
              </span>
            </span>
          </button>
        )
      })}
    </nav>
  )
}

// Mobile bottom navigation (hanya tampil di < lg)
function MobileBottomNav({ active, onChange }) {
  const items = [
    { id: 'upload', label: 'Upload', icon: 'add_circle' },
    { id: 'explore', label: 'Explore', icon: 'explore' },
    { id: 'markah', label: 'Markah', icon: 'bookmark' },
  ]

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-white border-t border-border-subtle shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      aria-label="Navigasi komunitas mobile"
    >
      <div className="flex items-stretch justify-around max-w-lg mx-auto">
        {items.map((it) => {
          const isActive = active === it.id
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onChange(it.id)}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 min-w-[64px] transition-colors"
              aria-current={isActive ? 'page' : undefined}
              aria-label={it.label}
            >
              <span
                className={`material-symbols-outlined text-[24px] transition-colors ${
                  isActive ? 'text-primary' : 'text-text-muted'
                }`}
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {it.icon}
              </span>
              <span
                className={`font-label-sm text-[11px] transition-colors ${
                  isActive ? 'text-primary font-bold' : 'text-text-muted font-semibold'
                }`}
              >
                {it.label}
              </span>
              {isActive && (
                <span className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

// Chips trending horizontal untuk mobile
function MobileTrendingChips({ activeTag, onSelectTag }) {
  return (
    <div className="lg:hidden bg-surface-white rounded-2xl border border-border-subtle shadow-sm p-3 pop-in">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-[18px]">trending_up</span>
          <span className="font-label-sm text-label-sm text-on-surface font-bold">Trending Modus</span>
        </div>
        {activeTag && (
          <button
            type="button"
            onClick={() => onSelectTag(activeTag)}
            className="text-[11px] text-primary font-semibold hover:underline"
          >
            Reset
          </button>
        )}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {TRENDING.map((tag) => {
          const isActive = activeTag === tag
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onSelectTag(tag)}
              className={`shrink-0 inline-flex items-center gap-1 h-8 px-3 rounded-full font-label-sm text-label-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-text-muted hover:bg-surface-container'
              }`}
              aria-pressed={isActive}
            >
              <span className="material-symbols-outlined text-[14px]">sell</span>
              <span>{tag}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Info etika versi mobile — compact
function MobileInfoPanel() {
  return (
    <div className="lg:hidden bg-surface-card-subtle rounded-2xl border border-border-subtle p-4 pop-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="material-symbols-outlined text-primary text-[20px]">shield</span>
        <span className="font-label-md text-label-md text-on-surface font-bold">Etika Berbagi</span>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] text-text-muted">
        <li className="flex items-start gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-tertiary mt-0.5 shrink-0">check_circle</span>
          <span>Cerita pengalaman pribadi, bukan rumor.</span>
        </li>
        <li className="flex items-start gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-tertiary mt-0.5 shrink-0">check_circle</span>
          <span>Sensor data pribadi & nomor rekening.</span>
        </li>
        <li className="flex items-start gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-tertiary mt-0.5 shrink-0">check_circle</span>
          <span>Dukung korban, jangan menghakimi.</span>
        </li>
        <li className="flex items-start gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-danger-red mt-0.5 shrink-0">cancel</span>
          <span>Tanpa ujaran kebencian atau spam.</span>
        </li>
      </ul>
    </div>
  )
}

function Composer({ onSubmit, onToast }) {
  const [text, setText] = useState('')
  const [tag, setTag] = useState('Umum')
  const [image, setImage] = useState(null)
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      onToast('Ukuran gambar maksimal 5 MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => setImage(ev.target.result)
    reader.readAsDataURL(file)
  }

  const canPost = text.trim().length > 0 || image

  const submit = () => {
    if (!canPost) return
    onSubmit({ text: text.trim(), tag, image })
    setText('')
    setTag('Umum')
    setImage(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-surface-white border border-border-subtle shadow-sm pop-in">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">account_circle</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-label-md text-label-md text-on-surface font-semibold">Bagikan cerita atau edukasimu</span>
          <span className="text-[11px] text-text-muted">Curhat korban · Modus baru · Tips aman</span>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ceritakan pengalamanmu, modus yang kamu temui, atau tips agar orang lain tidak tertipu..."
        rows={4}
        maxLength={500}
        className="w-full resize-none outline-none bg-transparent font-body-md text-body-md text-on-surface placeholder:text-text-muted mb-2"
      />
      <div className="text-[11px] text-text-muted text-right mb-2">{text.length}/500</div>

      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 -mx-1 px-1">
        <span className="material-symbols-outlined text-[18px] text-text-muted shrink-0">sell</span>
        {TAG_OPTIONS.map((t) => {
          const isActive = tag === t
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              className={`shrink-0 h-7 px-3 rounded-full font-label-sm text-label-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-text-muted hover:bg-surface-container'
              }`}
            >
              {t}
            </button>
          )
        })}
      </div>

      {image && (
        <div className="relative mb-3 rounded-xl overflow-hidden bg-surface-container max-h-[320px]">
          <img src={image} alt="Pratinjau" className="w-full h-auto object-cover" />
          <button
            type="button"
            onClick={() => { setImage(null); if (fileRef.current) fileRef.current.value = '' }}
            className="absolute top-2 right-2 w-9 h-9 rounded-full bg-on-surface/70 text-on-primary flex items-center justify-center backdrop-blur-sm hover:bg-on-surface"
            aria-label="Hapus gambar"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-border-subtle/60">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-10 h-10 rounded-lg hover:bg-surface-container-low flex items-center justify-center text-primary transition-colors"
            aria-label="Unggah gambar"
          >
            <span className="material-symbols-outlined text-[22px]">image</span>
          </button>
          <span className="hidden sm:inline-flex items-center gap-1 ml-2 px-2.5 py-1 rounded-full bg-surface-container-low text-[11px] font-semibold text-text-muted">
            <span className="material-symbols-outlined text-[14px]">public</span>
            Anyone can reply
          </span>
        </div>
        <button
          type="button"
          onClick={submit}
          disabled={!canPost}
          className={`h-10 px-5 rounded-full font-label-md text-label-md font-semibold transition-colors ${
            canPost
              ? 'bg-primary text-on-primary hover:bg-primary-container shadow-sm'
              : 'bg-surface-container text-text-muted cursor-not-allowed'
          }`}
        >
          Post
        </button>
      </div>
    </div>
  )
}

function CommentItem({ c, small = false, onReply, replyOpen = false, showReplyButton = true }) {
  return (
    <div className="flex items-start gap-2">
      <div className={`${small ? 'w-7 h-7 text-[10px]' : 'w-8 h-8 text-[12px]'} rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0 font-bold`}>
        {getAvatarInitial(c.author)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 flex-wrap text-[12px]">
          <span className="font-semibold text-on-surface truncate">{c.author}</span>
          <span className="text-text-muted truncate">{c.handle}</span>
          <span className="text-text-muted">·</span>
          <span className="text-text-muted whitespace-nowrap">{c.time}</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface whitespace-pre-line break-words mt-0.5">{c.text}</p>
        {showReplyButton && onReply && (
          <button
            type="button"
            onClick={onReply}
            className={`mt-1 text-[11px] font-semibold transition-colors ${
              replyOpen ? 'text-primary' : 'text-text-muted hover:text-primary'
            }`}
          >
            {replyOpen ? 'Batal balas' : 'Balas'}
          </button>
        )}
      </div>
    </div>
  )
}

function CommentSection({ comments, onAddComment, onAddReply }) {
  const [text, setText] = useState('')
  const [replyTo, setReplyTo] = useState(null)
  const [replyText, setReplyText] = useState('')

  const submitComment = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    onAddComment(t)
    setText('')
  }

  const submitReply = (commentId) => (e) => {
    e.preventDefault()
    const t = replyText.trim()
    if (!t) return
    onAddReply(commentId, t)
    setReplyText('')
    setReplyTo(null)
  }

  const toggleReply = (commentId) => {
    setReplyTo((prev) => (prev === commentId ? null : commentId))
    setReplyText('')
  }

  return (
    <div className="mt-3 pt-3 border-t border-border-subtle/60 flex flex-col gap-3 pop-in">
      {comments.length === 0 ? (
        <p className="text-[12px] text-text-muted italic text-center py-3">
          Belum ada komentar. Bagikan pengalaman atau dukunganmu!
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {comments.map((c) => {
            const hasReplies = c.replies && c.replies.length > 0
            return (
              <li key={c.id} className="flex flex-col gap-2">
                <CommentItem
                  c={c}
                  onReply={() => toggleReply(c.id)}
                  replyOpen={replyTo === c.id}
                />

                {hasReplies && (
                  <ul className="flex flex-col gap-3 ml-6 sm:ml-10 pl-3 border-l-2 border-border-subtle">
                    {c.replies.map((r) => (
                      <li key={r.id}>
                        <CommentItem c={r} small showReplyButton={false} />
                      </li>
                    ))}
                  </ul>
                )}

                {replyTo === c.id && (
                  <form
                    onSubmit={submitReply(c.id)}
                    className="ml-6 sm:ml-10 flex items-center gap-2 pop-in"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 text-[10px] font-bold">
                      KM
                    </div>
                    <input
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Balas ${c.author}...`}
                      autoFocus
                      className="flex-1 min-w-0 h-10 px-3.5 rounded-full bg-surface-container-low border border-border-subtle focus:outline-none focus:border-primary font-body-sm text-body-sm text-on-surface placeholder:text-text-muted"
                    />
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className={`h-10 px-4 rounded-full font-label-sm text-label-sm font-semibold transition-colors shrink-0 ${
                        replyText.trim()
                          ? 'bg-primary text-on-primary hover:bg-primary-container'
                          : 'bg-surface-container text-text-muted cursor-not-allowed'
                      }`}
                    >
                      Kirim
                    </button>
                  </form>
                )}
              </li>
            )
          })}
        </ul>
      )}

      <form onSubmit={submitComment} className="flex items-center gap-2 pt-1">
        <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 text-[11px] font-bold">
          KM
        </div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tulis komentar atau dukungan..."
          className="flex-1 min-w-0 h-10 px-3.5 rounded-full bg-surface-container-low border border-border-subtle focus:outline-none focus:border-primary font-body-sm text-body-sm text-on-surface placeholder:text-text-muted"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className={`h-10 px-4 sm:px-5 rounded-full font-label-sm text-label-sm font-semibold transition-colors shrink-0 ${
            text.trim()
              ? 'bg-primary text-on-primary hover:bg-primary-container shadow-sm'
              : 'bg-surface-container text-text-muted cursor-not-allowed'
          }`}
        >
          Kirim
        </button>
      </form>
    </div>
  )
}

function PostCard({
  p,
  liked,
  bookmarked,
  commentsOpen,
  comments,
  menuOpen,
  onLike,
  onBookmark,
  onToggleComments,
  onToggleMenu,
  onRequestDelete,
  onAddComment,
  onAddReply,
  onToast,
}) {
  const totalComments = countComments(comments)
  const own = isOwnPost(p)

  const handleMenuClick = (e) => {
    e.stopPropagation()
    if (own) {
      onToggleMenu(p.id)
    } else {
      onToast('Menu postingan akan segera tersedia.')
    }
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    onRequestDelete(p)
  }

  return (
    <article className="p-4 rounded-2xl bg-surface-white border border-border-subtle shadow-sm hover:shadow-md transition-shadow pop-in">
      <header className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0 font-bold text-[14px]">
          {getAvatarInitial(p.author)}
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-label-md text-label-md text-on-surface font-semibold truncate">{p.author}</span>
            {p.verified && (
              <span className="material-symbols-outlined text-[14px] text-primary shrink-0" aria-label="Terverifikasi">verified</span>
            )}
            <span className="text-[12px] text-text-muted truncate">{p.handle}</span>
            <span className="text-text-muted">·</span>
            <span className="text-[12px] text-text-muted whitespace-nowrap">{p.time}</span>
          </div>
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            data-menu-button
            onClick={handleMenuClick}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              menuOpen ? 'bg-surface-container text-primary' : 'hover:bg-surface-container-low text-text-muted'
            }`}
            aria-label="Menu postingan"
            aria-expanded={own ? menuOpen : undefined}
            aria-haspopup={own ? 'menu' : undefined}
          >
            <span className="material-symbols-outlined text-[18px]">more_horiz</span>
          </button>

          {own && menuOpen && (
            <div
              data-menu-dropdown
              className="absolute right-0 top-full mt-1 z-50 bg-surface-white border border-border-subtle rounded-xl shadow-xl min-w-[200px] overflow-hidden pop-in"
              role="menu"
            >
              <button
                type="button"
                role="menuitem"
                onClick={handleDeleteClick}
                className="w-full text-left px-4 py-3.5 hover:bg-danger-red-light text-danger-red font-label-sm text-label-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                Hapus Postingan
              </button>
            </div>
          )}
        </div>
      </header>

      {p.tag && p.tag !== 'Umum' && (
        <div className="mb-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-low text-text-muted text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[12px]">sell</span>
            {p.tag}
          </span>
        </div>
      )}

      <p className="font-body-md text-body-md text-on-surface mb-3 whitespace-pre-line break-words">{p.text}</p>

      {p.image && (
        <div className="rounded-xl overflow-hidden mb-3 bg-surface-container max-h-[420px]">
          <img src={p.image} alt="" className="w-full h-auto object-cover" loading="lazy" />
        </div>
      )}

      <footer className="flex items-center justify-around pt-3 border-t border-border-subtle/60">
        <button
          type="button"
          onClick={() => onLike(p.id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
            liked
              ? 'text-danger-red bg-danger-red-light'
              : 'text-text-muted hover:bg-surface-container-low hover:text-danger-red'
          }`}
          aria-label={liked ? 'Batal suka' : 'Suka'}
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
          <span className="text-[12px] font-semibold">{p.likes + (liked ? 1 : 0)}</span>
        </button>

        <button
          type="button"
          onClick={() => onToggleComments(p.id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
            commentsOpen
              ? 'text-primary bg-primary-fixed'
              : 'text-text-muted hover:bg-surface-container-low hover:text-primary'
          }`}
          aria-label={commentsOpen ? 'Tutup komentar' : 'Buka komentar'}
          aria-expanded={commentsOpen}
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: commentsOpen ? "'FILL' 1" : "'FILL' 0" }}
          >
            chat_bubble
          </span>
          <span className="text-[12px] font-semibold">{totalComments}</span>
        </button>

        <button
          type="button"
          onClick={() => onBookmark(p.id)}
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
            bookmarked
              ? 'text-primary bg-primary-fixed shadow-sm'
              : 'text-text-muted hover:bg-surface-container-low hover:text-primary'
          }`}
          aria-label={bookmarked ? 'Hapus dari markah' : 'Simpan ke markah'}
          aria-pressed={bookmarked}
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: bookmarked ? "'FILL' 1" : "'FILL' 0" }}
          >
            bookmark
          </span>
        </button>
      </footer>

      {commentsOpen && (
        <CommentSection
          comments={comments}
          onAddComment={(t) => onAddComment(p.id, t)}
          onAddReply={(cid, t) => onAddReply(p.id, cid, t)}
        />
      )}
    </article>
  )
}

function EmptyState({ icon, title, desc, actionLabel, onAction }) {
  return (
    <div className="p-8 sm:p-10 rounded-2xl bg-surface-white border border-border-subtle shadow-sm flex flex-col items-center text-center gap-3 pop-in">
      <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-text-muted">
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
      </div>
      <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">{title}</h4>
      <p className="font-body-sm text-body-sm text-text-muted max-w-sm">{desc}</p>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-2 h-10 px-5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

function TrendsPanel({ activeTag, onSelectTag }) {
  return (
    <div className="p-4 rounded-2xl bg-surface-white border border-border-subtle shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="font-label-md text-label-md text-on-surface font-bold">Trending Modus</span>
        <span className="material-symbols-outlined text-[18px] text-text-muted">trending_up</span>
      </div>
      <ul className="flex flex-col gap-1">
        {TRENDING.map((tag) => {
          const isActive = activeTag === tag
          return (
            <li key={tag}>
              <button
                type="button"
                onClick={() => onSelectTag(tag)}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg transition-colors text-left ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'hover:bg-surface-container-low'
                }`}
                aria-pressed={isActive}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[16px] shrink-0 ${
                      isActive ? 'text-on-primary' : 'text-primary'
                    }`}
                  >
                    sell
                  </span>
                  <span
                    className={`font-label-sm text-label-sm font-semibold truncate ${
                      isActive ? 'text-on-primary' : 'text-on-surface'
                    }`}
                  >
                    {tag}
                  </span>
                </span>
                <span
                  className={`material-symbols-outlined text-[16px] shrink-0 ${
                    isActive ? 'text-on-primary' : 'text-text-muted'
                  }`}
                >
                  {isActive ? 'check' : 'chevron_right'}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="mt-3 text-[11px] text-text-muted leading-relaxed">
        Klik salah satu topik untuk melihat semua cerita dan tips terkait.
      </p>
    </div>
  )
}

function InfoPanel() {
  return (
    <div className="p-4 rounded-2xl bg-surface-card-subtle border border-border-subtle">
      <div className="flex items-center gap-2 mb-2 text-primary">
        <span className="material-symbols-outlined text-[20px]">shield</span>
        <span className="font-label-md text-label-md font-bold">Etika Berbagi</span>
      </div>
      <ul className="flex flex-col gap-1.5 text-[12px] text-text-muted">
        <li className="flex items-start gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-tertiary mt-0.5 shrink-0">check_circle</span>
          <span>Cerita pengalaman pribadi, bukan rumor.</span>
        </li>
        <li className="flex items-start gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-tertiary mt-0.5 shrink-0">check_circle</span>
          <span>Sensor data pribadi & nomor rekening sebelum share.</span>
        </li>
        <li className="flex items-start gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-tertiary mt-0.5 shrink-0">check_circle</span>
          <span>Dukung korban, jangan menghakimi.</span>
        </li>
        <li className="flex items-start gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-danger-red mt-0.5 shrink-0">cancel</span>
          <span>Tanpa ujaran kebencian atau spam.</span>
        </li>
      </ul>
    </div>
  )
}

function ConfirmDeleteModal({ post, onCancel, onConfirm }) {
  if (!post) return null
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-title"
      onClick={onCancel}
    >
      <div
        className="bg-surface-white rounded-2xl shadow-xl max-w-sm w-full p-5 flex flex-col gap-4 pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-danger-red-light text-danger-red flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">delete</span>
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <h3 id="delete-title" className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Hapus postingan ini?
            </h3>
            <p className="font-body-sm text-body-sm text-text-muted">
              Postingan beserta semua komentar di dalamnya akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
        </div>

        {post.text && (
          <div className="p-3 rounded-xl bg-surface-container-low text-[12px] text-text-muted line-clamp-3 italic">
            "{post.text.slice(0, 120)}{post.text.length > 120 ? '…' : ''}"
          </div>
        )}

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 px-4 rounded-full bg-surface-container-low text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 px-5 rounded-full bg-danger-red text-on-error font-label-md text-label-md font-semibold hover:opacity-90 transition-opacity"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function Komunitas() {
  const [active, setActive] = useState('explore')
  const [posts, setPosts] = useState(POSTS_SEED)
  const [commentsByPost, setCommentsByPost] = useState(COMMENTS_SEED)
  const [openComments, setOpenComments] = useState(() => new Set())
  const [likedIds, setLikedIds] = useState(() => new Set())
  const [bookmarkIds, setBookmarkIds] = useState(() => new Set())
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast, setToast] = useState('')

  const showToast = (msg) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 3000)
  }

  useEffect(() => {
    if (!openMenuId) return
    const handleDocClick = (e) => {
      if (e.target.closest && e.target.closest('[data-menu-dropdown]')) return
      if (e.target.closest && e.target.closest('[data-menu-button]')) return
      setOpenMenuId(null)
    }
    document.addEventListener('mousedown', handleDocClick)
    return () => document.removeEventListener('mousedown', handleDocClick)
  }, [openMenuId])

  const toggleLike = (postId) => {
    setLikedIds((prev) => {
      const next = new Set(prev)
      if (next.has(postId)) next.delete(postId)
      else next.add(postId)
      return next
    })
  }

  const toggleBookmark = (postId) => {
    setBookmarkIds((prev) => {
      const next = new Set(prev)
      if (next.has(postId)) {
        next.delete(postId)
        showToast('Dihapus dari markah.')
      } else {
        next.add(postId)
        showToast('Disimpan ke markah.')
      }
      return next
    })
  }

  const toggleComments = (postId) => {
    setOpenComments((prev) => {
      const next = new Set(prev)
      if (next.has(postId)) next.delete(postId)
      else next.add(postId)
      return next
    })
  }

  const toggleMenu = (postId) => {
    setOpenMenuId((prev) => (prev === postId ? null : postId))
  }

  const requestDelete = (post) => {
    setOpenMenuId(null)
    setDeleteTarget(post)
  }

  const cancelDelete = () => setDeleteTarget(null)

  const confirmDelete = () => {
    if (!deleteTarget) return
    const id = deleteTarget.id
    setPosts((prev) => prev.filter((p) => p.id !== id))
    setCommentsByPost((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    setBookmarkIds((prev) => {
      const next = new Set(prev); next.delete(id); return next
    })
    setLikedIds((prev) => {
      const next = new Set(prev); next.delete(id); return next
    })
    setOpenComments((prev) => {
      const next = new Set(prev); next.delete(id); return next
    })
    setDeleteTarget(null)
    showToast('Postingan berhasil dihapus.')
  }

  const addComment = (postId, text) => {
    const newComment = {
      id: 'c-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      author: 'Kamu',
      handle: '@kamu',
      time: 'baru saja',
      text,
      replies: [],
    }
    setCommentsByPost((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }))
  }

  const addReply = (postId, commentId, text) => {
    const newReply = {
      id: 'r-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      author: 'Kamu',
      handle: '@kamu',
      time: 'baru saja',
      text,
    }
    setCommentsByPost((prev) => ({
      ...prev,
      [postId]: (prev[postId] || []).map((c) =>
        c.id === commentId
          ? { ...c, replies: [...(c.replies || []), newReply] }
          : c
      ),
    }))
  }

  const submitPost = ({ text, tag, image }) => {
    const newId = 'p-' + Date.now()
    const newPost = {
      id: newId,
      author: 'Kamu',
      handle: '@kamu',
      verified: false,
      time: 'baru saja',
      tag,
      text,
      image,
      likes: 0,
    }
    setPosts((prev) => [newPost, ...prev])
    setCommentsByPost((prev) => ({ ...prev, [newId]: [] }))
    setSelectedTag(null)
    setActive('explore')
    showToast('Postingan berhasil dibagikan!')
  }

  const handleSelectTrending = (tag) => {
    setSelectedTag((prev) => (prev === tag ? null : tag))
    setSearch('')
    setActive('explore')
    setOpenMenuId(null)
  }

  const clearSelectedTag = () => setSelectedTag(null)

  const searchFiltered = useMemo(() => {
    let result = posts
    if (selectedTag) {
      result = result.filter((p) => p.tag === selectedTag)
    }
    const q = search.trim().toLowerCase()
    if (q) {
      result = result.filter(
        (p) =>
          p.text.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          (p.tag && p.tag.toLowerCase().includes(q)) ||
          (p.handle && p.handle.toLowerCase().includes(q))
      )
    }
    return result
  }, [posts, search, selectedTag])

  const markahPosts = useMemo(
    () => posts.filter((p) => bookmarkIds.has(p.id)),
    [posts, bookmarkIds]
  )

  const feedPosts = active === 'explore' ? searchFiltered : markahPosts

  const exploreEmptyTitle = selectedTag
    ? `Belum ada postingan dengan tag "${selectedTag}"`
    : search
      ? 'Tidak ada postingan'
      : 'Belum ada postingan'
  const exploreEmptyDesc = selectedTag
    ? 'Jadilah yang pertama membagikan cerita atau tips dengan tag ini.'
    : search
      ? 'Coba kata kunci lain atau lihat semua postingan terbaru.'
      : 'Bagikan pengalaman atau tips anti-penipuanmu!'
  const exploreEmptyAction = selectedTag
    ? 'Bagikan Sekarang'
    : search
      ? 'Hapus pencarian'
      : 'Bagikan Cerita'
  const exploreEmptyOnAction = () => {
    if (search) { setSearch(''); return }
    if (selectedTag) { setActive('upload'); return }
    setActive('upload')
  }

  return (
    <main className="w-full bg-surface-cream min-h-screen">
      {toast && (
        <div
          className="fixed top-20 sm:top-24 right-3 left-3 sm:left-auto sm:right-6 z-[110] flex items-center gap-3 p-3 pr-4 bg-surface-white rounded-xl shadow-xl pop-in sm:max-w-[calc(100%-3rem)] sm:ml-auto"
          role="status"
          aria-live="polite"
        >
          <div className="w-9 h-9 rounded-full bg-safe-green-light flex items-center justify-center text-tertiary shrink-0">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
          </div>
          <span className="font-label-md text-label-md text-on-surface">{toast}</span>
        </div>
      )}

      <ConfirmDeleteModal
        post={deleteTarget}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />

      {/* Container: pb besar di mobile untuk bottom nav */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-margin md:px-margin-tablet lg:px-margin-desktop pt-space-lg sm:pt-space-xl pb-28 lg:pb-space-xl">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-space-lg">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="font-display text-[26px] sm:text-[30px] lg:text-display text-primary tracking-tight leading-tight">
                Komunitas
              </h1>
              <p className="font-body-sm sm:font-body-md text-body-sm sm:text-body-md text-text-muted mt-0.5 sm:mt-1">
                Curhat korban, modus baru, dan edukasi anti-penipuan
              </p>
            </div>
          </div>

          {/* Search — selalu tampil, hanya aktif di explore */}
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari cerita, modus, atau tag..."
              className="w-full h-11 pl-11 pr-4 rounded-full bg-surface-white border border-border-subtle focus:outline-none focus:border-primary font-body-sm text-body-sm text-on-surface placeholder:text-text-muted transition-colors"
            />
          </div>
        </div>

        {/* Grid: sidebar + main + right panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">

          {/* Sidebar desktop */}
          <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 self-start w-full">
            <SidebarNav active={active} onChange={setActive} />
          </aside>

          {/* Main content */}
          <section
            key={active}
            className="lg:col-span-6 flex flex-col gap-3 sm:gap-4 min-w-0"
          >
            {/* UPLOAD */}
            {active === 'upload' && (
              <>
                <Composer onSubmit={submitPost} onToast={showToast} />
                <div className="p-4 rounded-2xl bg-surface-card-subtle border border-border-subtle flex items-start gap-3 pop-in">
                  <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">tips_and_updates</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-label-sm text-label-sm font-bold text-secondary uppercase tracking-wider">
                      Tips Berbagi
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface">
                      Ceritakan pengalamanmu dengan jelas: modusnya apa, cara pelaku mendekati, dan apa yang bisa dipelajari.
                      <strong> Sensor nama, nomor, dan rekening</strong> sebelum posting.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* EXPLORE */}
            {active === 'explore' && (
              <>
                {/* Trending chips khusus mobile */}
                <MobileTrendingChips activeTag={selectedTag} onSelectTag={handleSelectTrending} />

                {/* Filter chip aktif */}
                {selectedTag && (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-primary-fixed border border-primary/20 pop-in">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0">filter_alt</span>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
                        Filter Aktif
                      </span>
                      <span className="font-label-sm text-label-sm text-primary font-semibold truncate">
                        {selectedTag}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={clearSelectedTag}
                      className="w-8 h-8 rounded-full hover:bg-primary/10 flex items-center justify-center text-primary transition-colors shrink-0"
                      aria-label="Hapus filter"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                )}

                {feedPosts.length === 0 ? (
                  <EmptyState
                    icon={selectedTag ? 'sell' : 'search_off'}
                    title={exploreEmptyTitle}
                    desc={exploreEmptyDesc}
                    actionLabel={exploreEmptyAction}
                    onAction={exploreEmptyOnAction}
                  />
                ) : (
                  feedPosts.map((p) => (
                    <PostCard
                      key={p.id}
                      p={p}
                      liked={likedIds.has(p.id)}
                      bookmarked={bookmarkIds.has(p.id)}
                      commentsOpen={openComments.has(p.id)}
                      comments={commentsByPost[p.id] || []}
                      menuOpen={openMenuId === p.id}
                      onLike={toggleLike}
                      onBookmark={toggleBookmark}
                      onToggleComments={toggleComments}
                      onToggleMenu={toggleMenu}
                      onRequestDelete={requestDelete}
                      onAddComment={addComment}
                      onAddReply={addReply}
                      onToast={showToast}
                    />
                  ))
                )}

                {/* Info etika versi mobile, di bawah feed */}
                <MobileInfoPanel />
              </>
            )}

            {/* MARKAH */}
            {active === 'markah' && (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[24px]">bookmark</span>
                    Markah
                  </h2>
                  <span className="font-label-sm text-label-sm text-text-muted">
                    {markahPosts.length} postingan
                  </span>
                </div>
                {markahPosts.length === 0 ? (
                  <EmptyState
                    icon="bookmark_border"
                    title="Belum ada markah"
                    desc="Ketuk ikon bookmark di postingan orang lain untuk menyimpannya di sini."
                    actionLabel="Jelajahi Postingan"
                    onAction={() => setActive('explore')}
                  />
                ) : (
                  markahPosts.map((p) => (
                    <PostCard
                      key={p.id}
                      p={p}
                      liked={likedIds.has(p.id)}
                      bookmarked={bookmarkIds.has(p.id)}
                      commentsOpen={openComments.has(p.id)}
                      comments={commentsByPost[p.id] || []}
                      menuOpen={openMenuId === p.id}
                      onLike={toggleLike}
                      onBookmark={toggleBookmark}
                      onToggleComments={toggleComments}
                      onToggleMenu={toggleMenu}
                      onRequestDelete={requestDelete}
                      onAddComment={addComment}
                      onAddReply={addReply}
                      onToast={showToast}
                    />
                  ))
                )}
              </>
            )}
          </section>

          {/* Panel kanan desktop */}
          <aside className="hidden lg:flex lg:col-span-3 lg:sticky lg:top-24 self-start flex-col gap-4">
            <TrendsPanel activeTag={selectedTag} onSelectTag={handleSelectTrending} />
            <InfoPanel />
          </aside>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <MobileBottomNav active={active} onChange={setActive} />
    </main>
  )
}