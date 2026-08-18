import { useEffect } from 'react'

export default function AnimatedFavicon() {
  useEffect(() => {
    const S = 64
    const TEXT = 'நி'
    const FONT = "bold 48px 'Noto Sans Tamil', 'Latha', 'Vijaya', sans-serif"

    const old = document.getElementById('faviconEl')
    if (old) old.remove()
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/png'
    link.id = 'faviconEl'
    document.head.appendChild(link)

    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = S
    const ctx = canvas.getContext('2d')

    function draw() {
      ctx.clearRect(0, 0, S, S)
      ctx.font = FONT
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      ctx.fillStyle = '#ff6600'
      ctx.fillText(TEXT, S / 2, S / 2 + 4)
      link.href = canvas.toDataURL('image/png')
    }

    document.fonts.load(FONT).then(draw).catch(draw)
  }, [])

  return null
}
