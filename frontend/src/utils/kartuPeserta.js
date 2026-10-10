export function salinKode(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
  }
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.position = 'fixed'
  ta.style.left = '-9999px'
  document.body.appendChild(ta)
  ta.focus()
  ta.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(ta)
  return ok ? Promise.resolve() : Promise.reject(new Error('copy gagal'))
}

export function unduhKartuPeserta({ token, nickname }) {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 630
  const ctx = canvas.getContext('2d')
  const sans = '"Plus Jakarta Sans", system-ui, sans-serif'

  ctx.fillStyle = '#FAF8F3'
  ctx.fillRect(0, 0, 1200, 630)

  const bar = ctx.createLinearGradient(0, 0, 1200, 0)
  bar.addColorStop(0, '#0f5c73')
  bar.addColorStop(0.5, '#90cfea')
  bar.addColorStop(1, '#febf14')
  ctx.fillStyle = bar
  ctx.fillRect(0, 0, 1200, 18)

  ctx.fillStyle = '#5C686C'
  ctx.font = `600 28px ${sans}`
  ctx.fillText('KARTU PESERTA ANONIM TANGKISTIPU', 80, 120)

  ctx.fillStyle = '#004356'
  ctx.font = `800 104px ${sans}`
  ctx.fillText(token, 80, 260)

  ctx.fillStyle = '#40484c'
  ctx.font = `600 36px ${sans}`
  ctx.fillText(`Nama panggilan: ${nickname}`, 80, 350)

  ctx.fillStyle = '#5C686C'
  ctx.font = `400 26px ${sans}`
  ctx.fillText('Tanpa nama asli, tanpa nomor HP, tanpa email.', 80, 450)
  ctx.fillText('Simpan kode ini baik-baik agar skormu tetap tersambung.', 80, 496)

  ctx.fillStyle = '#D64545'
  ctx.font = `600 26px ${sans}`
  ctx.fillText('TangkisTipu bukan kanal pelaporan resmi.', 80, 560)

  const link = document.createElement('a')
  link.download = `Kartu-TangkisTipu-${token}.png`
  link.href = canvas.toDataURL('image/png')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
