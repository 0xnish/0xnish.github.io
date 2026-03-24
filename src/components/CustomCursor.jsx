import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const curRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth <= 768 || navigator.maxTouchPoints > 0
    if (isMobile) return

    const cur = curRef.current
    const ring = ringRef.current
    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = e => {
      mx = e.clientX; my = e.clientY
      cur.style.left = mx + 'px'; cur.style.top = my + 'px'
    }
    document.addEventListener('mousemove', onMove)

    let rafId
    function loop() {
      rx += (mx - rx) * .1; ry += (my - ry) * .1
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    function addHover() {
      document.querySelectorAll('a,button,.donate-card').forEach(el => {
        el.addEventListener('mouseenter', () => { cur.classList.add('h'); ring.classList.add('h') })
        el.addEventListener('mouseleave', () => { cur.classList.remove('h'); ring.classList.remove('h') })
      })
    }
    addHover()

    const onClick = e => {
      const r = document.createElement('div')
      r.className = 'ripple-click'
      r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px'
      document.body.appendChild(r)
      setTimeout(() => r.remove(), 700)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cur" ref={curRef}></div>
      <div id="cur-ring" ref={ringRef}></div>
    </>
  )
}
