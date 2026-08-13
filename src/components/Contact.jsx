import { useEffect } from 'react'
import { links } from '../helper/constants'

const igGradient = (
  <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
    <defs>
      <radialGradient id="ig2" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497"/>
        <stop offset="5%" stopColor="#fdf497"/>
        <stop offset="45%" stopColor="#fd5949"/>
        <stop offset="60%" stopColor="#d6249f"/>
        <stop offset="90%" stopColor="#285AEB"/>
      </radialGradient>
    </defs>
  </svg>
)

export default function Contact() {
  useEffect(() => {
    const cio = new IntersectionObserver(e => {
      e.forEach(x => {
        if (x.isIntersecting) {
          document.querySelectorAll('.ci').forEach(c => c.classList.add('visible'))
          cio.disconnect()
        }
      })
    }, { threshold: .2 })
    const cl = document.getElementById('clinks')
    if (cl) cio.observe(cl)
    return () => cio.disconnect()
  }, [])

  return (
    <section className="contact-section" id="contact">
      {igGradient}
      <div className="sec-label">
        <span className="bracket">[ </span>Let's Connect<span className="bracket"> ]</span>
        <span className="sec-label-line"></span>
      </div>
      <h2 className="rv">Let's build<br />something <em>great.</em></h2>
      <div className="contact-links" id="clinks">
        <a href={links.email} className="ci ci-email">
          <div className="ci-content">
            <div className="ci-iw">
              <svg viewBox="0 0 48 48" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"/>
                <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"/>
                <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/>
                <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"/>
                <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0C43.076,8,45,9.924,45,12.298z"/>
              </svg>
            </div>
            <div className="ci-label">Email</div>
            <div className="ci-val">{links.emailDisplay}</div>
          </div>
        </a>
        <a href={links.github} target="_blank" rel="noopener" className="ci ci-github">
          <div className="ci-content">
            <div className="ci-iw">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path fill="#24292e" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </div>
            <div className="ci-label">GitHub</div>
            <div className="ci-val">{links.githubDisplay}</div>
          </div>
        </a>
        <a href={links.linkedin} target="_blank" rel="noopener" className="ci ci-linkedin">
          <div className="ci-content">
            <div className="ci-iw">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <div className="ci-label">LinkedIn</div>
            <div className="ci-val">{links.linkedinDisplay}</div>
          </div>
        </a>
        <a href={links.instagram} target="_blank" rel="noopener" className="ci ci-instagram">
          <div className="ci-content">
            <div className="ci-iw">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig2)"/>
                <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.8"/>
                <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
              </svg>
            </div>
            <div className="ci-label">Instagram</div>
            <div className="ci-val">{links.instagramDisplay}</div>
          </div>
        </a>
      </div>
    </section>
  )
}
