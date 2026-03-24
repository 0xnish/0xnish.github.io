import { useEffect } from 'react'

export default function AnimatedFavicon() {
  useEffect(() => {
    const S = 64
    const CHAR = '\u0BA8\u0BBF'
    const FLIP_DUR = 500
    const PAUSE_DUR = 2500
    const CYCLE = FLIP_DUR + PAUSE_DUR

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

    let rafId
    function draw() {
      const e = performance.now() - start
      const cp = e % CYCLE
      const scaleX = cp < FLIP_DUR ? Math.cos((cp / FLIP_DUR) * Math.PI) : 1
      ctx.clearRect(0, 0, S, S)
      ctx.save()
      ctx.translate(S / 2, S / 2)
      ctx.scale(scaleX, 1)
      ctx.font = "bold 44px 'Noto Sans Tamil', sans-serif"
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#ff6600'
      ctx.fillText(CHAR, 0, 2)
      ctx.restore()
      link.href = canvas.toDataURL('image/png')
    }

    function loop() { draw(); rafId = requestAnimationFrame(loop) }
    document.fonts.load("bold 44px 'Noto Sans Tamil'").then(() => {
      rafId = requestAnimationFrame(loop)
    }).catch(() => { rafId = requestAnimationFrame(loop) })

    return () => cancelAnimationFrame(rafId)
  }, [])

  return null
}
