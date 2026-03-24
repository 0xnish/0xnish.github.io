import { useEffect } from 'react'
import { useTheme } from './hooks/useTheme'
import { useScrollReveal } from './hooks/useScrollReveal'

import AnimatedFavicon from './components/AnimatedFavicon'
import Loader from './components/Loader'
import StarCanvas from './components/StarCanvas'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import StatsBar from './components/StatsBar'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Donate from './components/Donate'
import Footer from './components/Footer'

export default function App() {
  const { isLight, toggle } = useTheme()
  useScrollReveal()

  // Nav active state
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('nav a')
    function onScroll() {
      const scrollY = window.scrollY
      let current = ''
      sections.forEach(sec => { if (scrollY >= sec.offsetTop - 120) current = sec.id })
      if (window.innerHeight + scrollY >= document.body.scrollHeight - 60)
        current = sections[sections.length - 1]?.id || ''
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <AnimatedFavicon />
      <Loader />
      <div id="sp"></div>
      <CustomCursor />
      <StarCanvas isLight={isLight} />
      <div className="grid-bg"></div>
      <div className="blob b1"></div>
      <div className="blob b2"></div>
      <div className="blob b3"></div>
      <div className="blob b4"></div>
      <div className="ptc" id="ptc"></div>
      <ScrollProgress />
      <Header isLight={isLight} toggleTheme={toggle} />
      <Hero />
      <Marquee />
      <About />
      <StatsBar />
      <Skills />
      <Experience />
      <Contact />
      <Donate />
      <Footer />
    </>
  )
}
