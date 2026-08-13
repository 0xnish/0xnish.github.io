import AnimatedFavicon from '../components/AnimatedFavicon'
import Loader from '../components/Loader'
import StarCanvas from '../components/StarCanvas'
import CustomCursor from '../components/CustomCursor'
import ScrollProgress from '../components/ScrollProgress'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import StatsBar from '../components/StatsBar'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Donate from '../components/Donate'
import Footer from '../components/Footer'

export default function Features({ isLight, toggleTheme }) {
  return (
    <>
      <AnimatedFavicon />
      <Loader />
      <CustomCursor />
      <StarCanvas isLight={isLight} />
      <div className="grid-bg"></div>
      <div className="blob b1"></div>
      <div className="blob b2"></div>
      <div className="blob b3"></div>
      <div className="blob b4"></div>
      <div className="ptc" id="ptc"></div>
      <ScrollProgress />
      <Header isLight={isLight} toggleTheme={toggleTheme} />
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
