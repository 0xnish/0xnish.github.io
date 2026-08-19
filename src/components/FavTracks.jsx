import { useEffect, useState, useRef, useCallback } from 'react'

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

const COLS = 5
const LEAVE_DELAY = 200

export default function FavTracks() {
  const [active, setActive] = useState(null)
  const [playing, setPlaying] = useState(null)
  const [progress, setProgress] = useState({})
  const [hovered, setHovered] = useState(null)
  const timers = useRef({})
  const leaveTimer = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('ft-visible')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.ft-card').forEach(c => io.observe(c))
    return () => io.disconnect()
  }, [])

  const stopAll = useCallback(() => {
    Object.values(timers.current).forEach(clearInterval)
    timers.current = {}
  }, [])

  const togglePlay = useCallback((i) => {
    if (playing === i) {
      clearInterval(timers.current[i])
      delete timers.current[i]
      setPlaying(null)
    } else {
      stopAll()
      setPlaying(i)
      timers.current[i] = setInterval(() => {
        setProgress(p => {
          const cur = p[i] || 0
          if (cur >= 100) {
            clearInterval(timers.current[i])
            delete timers.current[i]
            setPlaying(null)
            return { ...p, [i]: 0 }
          }
          return { ...p, [i]: cur + 0.5 }
        })
      }, 100)
    }
  }, [playing, stopAll])

  useEffect(() => () => stopAll(), [stopAll])

  const getNeighborTier = (idx) => {
    if (hovered === null) return 0
    if (idx === hovered) return 2
    const hoverRow = Math.floor(hovered / COLS)
    const hoverCol = hovered % COLS
    const row = Math.floor(idx / COLS)
    const col = idx % COLS
    const isAdjacent =
      (Math.abs(row - hoverRow) === 1 && col === hoverCol) ||
      (Math.abs(col - hoverCol) === 1 && row === hoverRow)
    return isAdjacent ? 1 : 0
  }

  const onEnter = (i) => {
    clearTimeout(leaveTimer.current)
    setHovered(i)
  }

  const onLeave = () => {
    leaveTimer.current = setTimeout(() => setHovered(null), LEAVE_DELAY)
  }

  return (
    <section className="favtracks-section" id="favtracks">
      <div className="sec-label">
        <span className="bracket">[ </span>Fav Tracks<span className="bracket"> ]</span>
        <span className="sec-label-line"></span>
      </div>
      <h2 className="rv">Tracks that <em>keep me going.</em></h2>
      <div className="ft-grid">
        {tracks.map((t, i) => {
          const tier = getNeighborTier(i)
          return (
            <div
              className={`ft-card${playing === i ? ' ft-active' : ''}`}
              key={i}
              data-tier={tier}
              onMouseEnter={() => onEnter(i)}
              onMouseLeave={onLeave}
              style={{ zIndex: tier === 2 ? 10 : tier === 1 ? 5 : 1 }}
            >
              <div className="ft-glow"></div>
              <div className="ft-row">
                <button className="ft-play" onClick={() => togglePlay(i)} aria-label={playing === i ? 'Pause' : 'Play'}>
                  {playing === i
                    ? <svg width="8" height="9" viewBox="0 0 8 9"><rect x="0" y="0" width="2.5" height="9" rx="0.8" fill="currentColor"/><rect x="5.5" y="0" width="2.5" height="9" rx="0.8" fill="currentColor"/></svg>
                    : <svg width="8" height="9" viewBox="0 0 8 9"><polygon points="0,0 8,4.5 0,9" fill="currentColor"/></svg>
                  }
                </button>
                <span className="ft-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="ft-eq">
                  <span className="ft-bar" style={{ animationDelay: '0s' }}></span>
                  <span className="ft-bar" style={{ animationDelay: '0.12s' }}></span>
                  <span className="ft-bar" style={{ animationDelay: '0.24s' }}></span>
                </div>
                <div className="ft-info">
                  <div className="ft-title">{t.title}</div>
                  <div className="ft-artist">{t.artist}</div>
                </div>
                <span className="ft-dur">{t.dur}</span>
              </div>
              <div className="ft-prog-wrap">
                <div className="ft-prog" style={{ width: `${progress[i] || 0}%` }}></div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
