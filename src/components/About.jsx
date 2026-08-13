import { useEffect } from 'react'
import { links, profile } from '../helper/constants'

export default function About() {
  useEffect(() => {
    const termIO = new IntersectionObserver(e => {
      e.forEach(x => {
        if (x.isIntersecting) {
          const lines = x.target.querySelectorAll('.tl')
          lines.forEach((l, i) => {
            l.style.opacity = 0
            setTimeout(() => {
              l.style.transition = 'opacity .3s ease'
              l.style.opacity = 1
            }, i * 80)
          })
          termIO.disconnect()
        }
      })
    }, { threshold: .3 })
    const tb = document.getElementById('termBody')
    if (tb) termIO.observe(tb)
    return () => termIO.disconnect()
  }, [])

  return (
    <section id="about">
      <div className="sec-label">
        <span className="bracket">[ </span>About me<span className="bracket"> ]</span>
        <span className="sec-label-line"></span>
      </div>
      <div className="about-grid">
        <div className="about-text rl">
          <h2>I build things<br />that <em>live</em> on the web.</h2>
          <p>Hey, I'm Nishanth &mdash; a software engineer currently working at <strong className="company-accent">{profile.company}</strong>, where I build robust and scalable software. I care deeply about the craft &mdash; from backend systems to pixel-perfect interfaces.</p>
          <p>When I'm not writing code, you'll find me on <a href={links.instagram} className="pill" target="_blank" rel="noopener">&#64;{links.instagramDisplay.slice(1)}</a> or building open-source on <a href={links.github} className="pill" target="_blank" rel="noopener">GitHub</a>.</p>
        </div>
        <div className="rr" style={{ transitionDelay: '.15s' }}>
          <div className="term">
            <div className="term-hd">
              <div className="dt dt-r"></div><div className="dt dt-y"></div><div className="dt dt-g"></div>
              <div className="term-title">nishanth.config.json</div>
            </div>
            <div className="term-body" id="termBody">
              <div className="tl tc">// Profile &mdash; Nishanth J P</div>
              <div className="tl">{'{'}</div>
              <div className="tl">&nbsp;&nbsp;<span className="tk">"name"</span>: <span className="ts">"{profile.name}"</span>,</div>
              <div className="tl">&nbsp;&nbsp;<span className="tk">"role"</span>: <span className="ts">"{profile.role}"</span>,</div>
              <div className="tl">&nbsp;&nbsp;<span className="tk">"company"</span>: <span className="ts">"{profile.company}"</span>,</div>
              <div className="tl">&nbsp;&nbsp;<span className="tk">"github"</span>: <span className="ts">"{profile.github}"</span>,</div>
              <div className="tl">&nbsp;&nbsp;<span className="tk">"instagram"</span>: <span className="ts">"{profile.instagram}"</span>,</div>
              <div className="tl">&nbsp;&nbsp;<span className="tk">"status"</span>: <span className="tv">available</span>,</div>
              <div className="tl">&nbsp;&nbsp;<span className="tk">"passion"</span>: [<span className="ts">"clean code"</span>, <span className="ts">"great UX"</span>, <span className="ts">"scalable systems"</span>]</div>
              <div className="tl">{'}'}</div>
              <div style={{ marginTop: '14px' }}><span className="tp">~ <span className="dollar">$</span></span> <span className="cblink"></span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
