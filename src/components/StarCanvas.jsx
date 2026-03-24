import { useEffect, useRef } from 'react'

export default function StarCanvas({ isLight }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth <= 768 || navigator.maxTouchPoints > 0
    if (isMobile) return

    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    let W, H, stars = []

    function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.2 + .2, v: Math.random() * .3 + .05,
        a: Math.random(), da: Math.random() * .005 + .002,
        t: Math.random() > .7 ? 1 : 0
      })
    }

    let rafId
    function draw() {
      ctx.clearRect(0, 0, W, H)
      const light = document.body.classList.contains('light')
      const cols = light
        ? ['rgba(193,61,16,', 'rgba(220,50,30,']
        : ['rgba(200,169,126,', 'rgba(126,184,200,']
      stars.forEach(s => {
        s.a += s.da
        if (s.a > 1 || s.a < 0) s.da *= -1
        const alpha = light ? Math.max(s.a, 0.28) : s.a
        const radius = light ? s.r * 1.3 : s.r
        ctx.beginPath()
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = cols[s.t] + alpha + ')'
        ctx.fill()
        s.y -= s.v
        if (s.y < -5) { s.y = H + 5; s.x = Math.random() * W }
      })
      rafId = requestAnimationFrame(draw)
    }
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="starCanvas" ref={canvasRef} />
}
