import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const spRef = useRef(null)

  useEffect(() => {
    const bar = spRef.current
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        if (bar) bar.style.transform = `scaleX(${pct / 100})`
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div id="sp" ref={spRef}></div>
}
