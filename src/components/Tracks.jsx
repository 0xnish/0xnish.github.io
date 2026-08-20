import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'

const tracks = [
  { title: 'Blinding Lights', artist: 'The Weeknd', dur: '3:20' },
  { title: 'Levitating', artist: 'Dua Lipa', dur: '3:23' },
  { title: 'Starboy', artist: 'The Weeknd', dur: '3:50' },
  { title: 'Save Your Tears', artist: 'The Weeknd', dur: '3:35' },
  { title: 'Get Lucky', artist: 'Daft Punk', dur: '6:09' },
  { title: 'Midnight City', artist: 'M83', dur: '4:03' },
  { title: 'The Less I Know', artist: 'Tame Impala', dur: '3:36' },
  { title: 'Resonance', artist: 'HOME', dur: '3:32' },
  { title: 'After Dark', artist: 'Mr.Kitty', dur: '4:26' },
  { title: 'Sweater Weather', artist: 'The Neighbourhood', dur: '4:00' },
  { title: 'Electric Feel', artist: 'MGMT', dur: '3:49' },
  { title: 'Nightcall', artist: 'Kavinsky', dur: '4:16' },
  { title: 'Dissolve', artist: 'Absofacto', dur: '3:31' },
  { title: 'Heat Waves', artist: 'Glass Animals', dur: '3:58' },
  { title: 'The Hills', artist: 'The Weeknd', dur: '4:02' },
  { title: 'Retrograde', artist: 'James Blake', dur: '3:42' },
  { title: 'Breathe Deeper', artist: 'Tame Impala', dur: '6:12' },
  { title: 'Nights', artist: 'Frank Ocean', dur: '5:07' },
  { title: 'Pink + White', artist: 'Frank Ocean', dur: '3:04' },
  { title: 'Sierra', artist: 'M83', dur: '5:35' },
  { title: 'Closer', artist: 'Nine Inch Nails', dur: '6:14' },
  { title: 'Crystalised', artist: 'The XX', dur: '3:22' },
  { title: 'Intro', artist: 'The XX', dur: '2:07' },
  { title: 'Night Owl', artist: 'Gerry Cinnamon', dur: '3:45' },
  { title: 'Sleepwalking', artist: 'The Chain Gang of 1974', dur: '3:58' },
]

const N = tracks.length
const ANGLE = 360 / N

function getLayout() {
  if (typeof window === 'undefined') return { w: 200, h: 280, r: 900, d: 0.35, m: 1.2, f: 0.95 }
  const w = window.innerWidth
  if (w <= 540)  return { w: 130, h: 190, r: 580, d: 0.5,  m: 1.05, f: 0.92 }
  if (w <= 1024) return { w: 170, h: 240, r: 750, d: 0.4,  m: 1.1,  f: 0.94 }
  return { w: 200, h: 280, r: 900, d: 0.35, m: 1.2, f: 0.95 }
}

function wrap(i) {
  return ((i % N) + N) % N
}

function rotationFor(index) {
  return index * ANGLE
}

function readRotation(el) {
  const v = gsap.getProperty(el, 'rotationY')
  return typeof v === 'string' ? parseFloat(v) || 0 : v || 0
}

export default function Tracks() {
  const [layout, setLayout] = useState(getLayout)

  const ringRef = useRef(null)
  const dragRef = useRef(null)
  const cardsRef = useRef([])
  const raf = useRef(null)
  const timer = useRef(null)
  const idx = useRef(0)
  const dragActive = useRef(false)
  const dragStartX = useRef(0)
  const lastMoveX = useRef(0)
  const velocity = useRef(0)
  const isPaused = useRef(false)
  const reducedMotion = useRef(false)

  function stopTimer() {
    if (timer.current) { clearInterval(timer.current); timer.current = null }
  }

  function stopRaf() {
    if (raf.current) { cancelAnimationFrame(raf.current); raf.current = null }
  }

  const snapTo = useCallback((i) => {
    const ring = ringRef.current
    if (!ring) return
    const next = wrap(i)
    idx.current = next
    gsap.to(ring, { rotationY: rotationFor(next), duration: 0.7, ease: 'power3.out' })
  }, [])

  const goNext = useCallback(() => snapTo(idx.current + 1), [snapTo])
  const goPrev = useCallback(() => snapTo(idx.current - 1), [snapTo])

  const startAutoPlay = useCallback(() => {
    stopTimer()
    timer.current = setInterval(() => {
      if (!isPaused.current) goNext()
    }, 2500)
  }, [goNext])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fn = (e) => { reducedMotion.current = e.matches }
    fn(mq)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
    const fn = () => setLayout(getLayout())
    fn()
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  useLayoutEffect(() => {
    const ring = ringRef.current
    const drag = dragRef.current
    const cards = cardsRef.current.filter(Boolean)
    if (!ring || !drag || !cards.length) return

    gsap.set(ring, { rotationY: rotationFor(0), transformStyle: 'preserve-3d' })

    gsap.set(cards, {
      rotateY: (i) => -i * ANGLE,
      transformOrigin: `50% 50% ${layout.r}px`,
      z: -layout.r,
      width: layout.w,
      height: layout.h,
      left: '50%',
      top: '50%',
      xPercent: -50,
      yPercent: -50,
      backfaceVisibility: 'hidden',
    })

    if (!reducedMotion.current) {
      gsap.from(cards, { y: 100, opacity: 0, duration: 1, stagger: 0.06, ease: 'expo.out' })
    }

    function snapNearest() {
      const rot = readRotation(ring)
      const nearest = Math.round(rot / ANGLE)
      snapTo(nearest)
      startAutoPlay()
    }

    function onDown(e) {
      stopTimer()
      stopRaf()
      dragActive.current = true
      dragStartX.current = e.clientX
      lastMoveX.current = e.clientX
      velocity.current = 0
      drag.setPointerCapture(e.pointerId)
    }

    function onMove(e) {
      if (!dragActive.current) return
      const dx = e.clientX - lastMoveX.current
      velocity.current = dx * layout.m
      lastMoveX.current = e.clientX
      gsap.set(ring, { rotationY: `-=${dx * layout.d}` })
    }

    function onUp() {
      if (!dragActive.current) return
      dragActive.current = false

      if (Math.abs(velocity.current) < 0.1) {
        snapNearest()
        return
      }

      function tick() {
        velocity.current *= layout.f
        if (Math.abs(velocity.current) < 0.1) {
          velocity.current = 0
          snapNearest()
          return
        }
        gsap.set(ring, { rotationY: `-=${velocity.current}` })
        raf.current = requestAnimationFrame(tick)
      }
      raf.current = requestAnimationFrame(tick)
    }

    drag.addEventListener('pointerdown', onDown)
    drag.addEventListener('pointermove', onMove)
    drag.addEventListener('pointerup', onUp)
    drag.addEventListener('pointercancel', onUp)

    return () => {
      drag.removeEventListener('pointerdown', onDown)
      drag.removeEventListener('pointermove', onMove)
      drag.removeEventListener('pointerup', onUp)
      drag.removeEventListener('pointercancel', onUp)
    }
  }, [layout, snapTo, startAutoPlay])

  useEffect(() => {
    if (!isPaused.current) startAutoPlay()
    return stopTimer
  }, [startAutoPlay])

  function onEnter() { isPaused.current = true; stopTimer() }
  function onLeave() { isPaused.current = false; startAutoPlay() }
  function onKey(e) {
    if (e.key === 'ArrowRight') goNext()
    if (e.key === 'ArrowLeft') goPrev()
  }

  return (
    <section className="tracks-section" id="tracks" onKeyDown={onKey} tabIndex={0}>
      <div className="sec-label">
        <span className="bracket">[ </span>Tracks<span className="bracket"> ]</span>
        <span className="sec-label-line"></span>
      </div>
      <h2>Music I <em>live by.</em></h2>

      <div className="tracks-carousel" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <div className="tracks-scene">
          <div className="tracks-ring" ref={ringRef}>
            {tracks.map((t, i) => (
              <div className="tracks-card" key={i} ref={(el) => { cardsRef.current[i] = el }}>
                <div className="tracks-card-inner">
                  <span className="tracks-card-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="tracks-card-title">{t.title}</span>
                  <span className="tracks-card-artist">{t.artist}</span>
                  <span className="tracks-card-dur">{t.dur}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="tracks-drag" ref={dragRef} />
        </div>
        <div className="tracks-fade tracks-fade--left" />
        <div className="tracks-fade tracks-fade--right" />
      </div>
    </section>
  )
}
