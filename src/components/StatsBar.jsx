import { useEffect, useRef } from 'react'
import { stats } from '../helper/constants'

function StatItem({ target, label, isInfinity, delay }) {
  const numRef = useRef(null)
  const itemRef = useRef(null)

  useEffect(() => {
    if (isInfinity) return
    const sio = new IntersectionObserver(e => {
      e.forEach(x => {
        if (x.isIntersecting) {
          const el = numRef.current
          if (!el || el.dataset.done) return
          el.dataset.done = '1'
          const sfx = target === 24 ? '/7' : '+'
          let start = null
          requestAnimationFrame(function step(ts) {
            if (!start) start = ts
            const p = Math.min((ts - start) / 2400, 1)
            const ease = 1 - Math.pow(1 - p, 3)
            el.textContent = Math.round(ease * target) + sfx
            if (p < 1) requestAnimationFrame(step)
          })
          sio.disconnect()
        }
      })
    }, { threshold: .2 })
    if (itemRef.current) sio.observe(itemRef.current)
    return () => sio.disconnect()
  }, [target, isInfinity])

  const handleClick = e => {
    const el = itemRef.current
    if (!el) return
    const r = document.createElement('div')
    r.className = 'stat-ripple'
    const b = el.getBoundingClientRect()
    const size = Math.max(b.width, b.height)
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - b.left - size / 2}px;top:${e.clientY - b.top - size / 2}px`
    el.appendChild(r)
    setTimeout(() => r.remove(), 700)
  }

  return (
    <div className="stat rv" style={{ transitionDelay: delay }} ref={itemRef} onClick={handleClick}>
      <div className="stat-num" ref={numRef} data-target={target}>
        {isInfinity ? '\u221e' : '0'}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function StatsBar() {
  return (
    <div className="stats-bar">
      {stats.map((s, i) => (
        <StatItem key={i} target={s.target} label={s.label} isInfinity={s.isInfinity} delay={s.delay} />
      ))}
    </div>
  )
}
