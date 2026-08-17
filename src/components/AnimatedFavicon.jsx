import { useEffect } from 'react'

export default function AnimatedFavicon() {
  useEffect(() => {
    const S = 64
    const TEXT = 'நிஷாந்த்'
    const FONT = "bold 36px 'Noto Sans Tamil', 'Latha', 'Vijaya', sans-serif"
    const SPEED = 50

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
    const start = performance.now()

    ctx.font = FONT
    const textWidth = ctx.measureText(TEXT).width

    let rafId
    function draw() {
      const t = (performance.now() - start) / 1000
      const offset = (t * SPEED) % (textWidth + S)

      ctx.clearRect(0, 0, S, S)
      ctx.font = FONT
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#ff6600'
      ctx.fillText(TEXT, S - offset, S / 2)

      link.href = canvas.toDataURL('image/png')
    }

    function loop() { draw(); rafId = requestAnimationFrame(loop) }
    document.fonts.load(FONT).then(() => {
      rafId = requestAnimationFrame(loop)
    }).catch(() => {
      rafId = requestAnimationFrame(loop)
    })

    return () => cancelAnimationFrame(rafId)
  }, [])

  return null
}
