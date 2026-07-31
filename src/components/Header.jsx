import { useEffect, useRef, useState } from 'react'

export default function Header({ isLight, toggleTheme }) {
  const [logoText, setLogoText] = useState('')
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [themeSpin, setThemeSpin] = useState(false)
  const audioRef = useRef(null)

  // Logo type animation
  useEffect(() => {
    const name = 'Nishanth'
    let i = 0
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setLogoText(name.slice(0, i))
        if (i >= name.length) clearInterval(interval)
      }, 120)
      return () => clearInterval(interval)
    }, 1200)
    return () => clearTimeout(t)
  }, [])

  // Donate icon animation
  useEffect(() => {
    const heart = document.getElementById('donateNavIcon')
    const wrap = document.querySelector('.donate-text')
    const baseColor = () => document.body.classList.contains('light') ? '#fff' : '#000'
    if (heart) { heart.textContent = '♥'; heart.style.color = baseColor() }
    if (wrap) {
      wrap.innerHTML = 'Donate'.split('').map(l => `<span class="dl">${l}</span>`).join('')
    }
    const letters = wrap ? wrap.querySelectorAll('.dl') : []
    const on = { color: '#33ff99', textShadow: '0 0 10px rgba(51,255,51,.6)' }
    const off = { color: '', textShadow: 'none' }

    function animateBeat() {
      if (heart) {
        heart.style.transition = 'transform .18s ease, color .18s ease'
        heart.style.transform = 'scale(1.4)'
        heart.style.color = '#ff1a1a'
        setTimeout(() => {
          heart.style.transition = 'transform .22s ease, color .3s ease'
          heart.style.transform = 'scale(1)'
          heart.style.color = baseColor()
        }, 200)
      }
      letters.forEach((l, i) => {
        setTimeout(() => {
          l.style.transition = 'color .18s ease, text-shadow .18s ease'
          Object.assign(l.style, on)
          setTimeout(() => {
            l.style.transition = 'color .3s ease, text-shadow .3s ease'
            Object.assign(l.style, off)
          }, 300)
        }, i * 55)
      })
    }
    const t1 = setTimeout(animateBeat, 800)
    const interval = setInterval(animateBeat, 2000)
    return () => { clearTimeout(t1); clearInterval(interval) }
  }, [])

  const handleToggleTheme = () => {
    setThemeSpin(true)
    setTimeout(() => setThemeSpin(false), 520)
    toggleTheme()
    const heart = document.getElementById('donateNavIcon')
    if (heart) heart.style.color = !isLight ? '#fff' : '#000'
  }

  const handleToggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music.mp3')
      audioRef.current.loop = true
      audioRef.current.preload = 'none'
    }
    if (!musicPlaying) {
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {})
    } else {
      audioRef.current.pause()
      setMusicPlaying(false)
    }
  }

  return (
    <header>
      <a href="#home" className="logo">
        <span className="logo-prompt">~$</span>&nbsp;
        <span className="logo-text" id="logoText">{logoText}</span>
        <span className="logo-cursor">&#9611;</span>
      </a>
      <nav>
        <span className="nav-hidden-mobile">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </span>
        <button
          className={`nav-theme${themeSpin ? ' theme-spinning' : ''}`}
          onClick={handleToggleTheme}
          aria-label="Toggle light mode"
        >
          <span className="theme-icon-dark">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </span>
          <span className="theme-icon-light">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </span>
        </button>
        <button
          className={`nav-music${musicPlaying ? ' music-playing' : ''}`}
          id="musicBtn"
          onClick={handleToggleMusic}
          aria-label="Toggle music"
        >
          <span className="mnote" id="mNote">
            <span className="mnote-inner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            </span>
          </span>
          <span className="mdiv"></span>
          <span className="mplay" id="mPlay">
            <svg className={`ico-play`} width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
            <svg className={`ico-pause`} width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="3" width="4" height="18" rx="1.5"/><rect x="15" y="3" width="4" height="18" rx="1.5"/></svg>
          </span>
        </button>
        <a href="#donate" className="nav-donate">
          <span className="donate-icon" id="donateNavIcon">&#9829;</span>
          <span className="donate-text">Donate</span>
        </a>
      </nav>
    </header>
  )
}
