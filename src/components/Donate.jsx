import { useEffect, useRef } from 'react'

function CometBorder({ color }) {
  return null // Handled via CSS animation from portfolio.css
}

export default function Donate() {
  const upiRef = useRef(null)

  useEffect(() => {
    // Comet border animation for UPI and BMC buttons
    const configs = [
      { id: 'upiCopyBtn', color: '#ff0000' },
      { id: 'bmcPayBtn', color: '#0099ff' },
    ]
    const phases = [
      { name: 'forward', duration: 2000 },
      { name: 'reverse', duration: 2000 },
      { name: 'blink', duration: 2000 },
      { name: 'fast', duration: 1500 },
      { name: 'pause', duration: 800 },
      { name: 'double', duration: 2000 },
      { name: 'stretch', duration: 2000 },
      { name: 'strobe', duration: 1500 },
      { name: 'crawl', duration: 3000 },
      { name: 'pingpong', duration: 2000 },
      { name: 'breathe', duration: 2000 },
      { name: 'accelerate', duration: 2000 },
    ]
    const totalCycle = phases.reduce((s, p) => s + p.duration, 0)

    function getPhase(elapsed) {
      let t = elapsed % totalCycle
      for (const p of phases) {
        if (t < p.duration) return { phase: p.name, t, duration: p.duration }
        t -= p.duration
      }
    }

    const rafs = []
    configs.forEach(({ id, color }) => {
      const btn = document.getElementById(id)
      if (!btn) return
      const ns = 'http://www.w3.org/2000/svg'
      const svg = document.createElementNS(ns, 'svg')
      svg.setAttribute('aria-hidden', 'true')
      svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;overflow:visible;'
      const rect1 = document.createElementNS(ns, 'rect')
      const rect2 = document.createElementNS(ns, 'rect')
      ;[rect1, rect2].forEach(r => {
        r.setAttribute('fill', 'none')
        r.setAttribute('stroke', color)
        r.setAttribute('stroke-width', '2')
        r.setAttribute('stroke-opacity', '0.9')
        svg.appendChild(r)
      })
      rect2.style.display = 'none'
      btn.appendChild(svg)

      let raf
      const startTime = performance.now()

      function run() {
        const W = btn.offsetWidth, H = btn.offsetHeight
        const perim = 2 * (W + H)
        ;[rect1, rect2].forEach(r => {
          r.setAttribute('width', W - 2)
          r.setAttribute('height', H - 2)
          r.setAttribute('x', '1')
          r.setAttribute('y', '1')
        })

        function frame(now) {
          const elapsed = now - startTime
          const { phase, t, duration } = getPhase(elapsed)
          const progress = t / duration
          let tail = perim * 0.2, offset = 0, opacity = '0.9', showRect2 = false

          if (phase === 'forward') offset = -(perim * progress)
          else if (phase === 'reverse') offset = perim * progress
          else if (phase === 'blink') { opacity = Math.sin(progress * Math.PI * 8) > 0 ? '0.9' : '0'; offset = -(perim * progress) }
          else if (phase === 'fast') { offset = -(perim * progress / 0.4); tail = perim * 0.1 }
          else if (phase === 'pause') { offset = 0; opacity = '0.2' }
          else if (phase === 'double') { showRect2 = true; tail = perim * 0.15; offset = -(perim * progress); rect2.setAttribute('stroke-dasharray', `${tail} ${perim - tail}`); rect2.setAttribute('stroke-dashoffset', -(perim * progress) + perim / 2); rect2.setAttribute('stroke-opacity', '0.9') }
          else if (phase === 'stretch') { tail = perim * (0.05 + 0.45 * Math.sin(progress * Math.PI)); offset = -(perim * progress) }
          else if (phase === 'strobe') { opacity = Math.floor(progress * 20) % 2 === 0 ? '0.9' : '0'; offset = -(perim * progress * 2); tail = perim * 0.12 }
          else if (phase === 'crawl') { offset = -(perim * progress * 0.5); tail = perim * 0.4; opacity = '0.6' }
          else if (phase === 'pingpong') { offset = -(perim * 0.5 * (1 + Math.sin(progress * Math.PI * 2)) * 0.5); tail = perim * 0.15 }
          else if (phase === 'breathe') { opacity = String(0.2 + 0.7 * Math.abs(Math.sin(progress * Math.PI * 2))); offset = -(perim * progress * 0.5); tail = perim * 0.25 }
          else if (phase === 'accelerate') { offset = -(perim * progress * progress); tail = perim * (0.05 + 0.2 * progress) }

          rect1.setAttribute('stroke-dasharray', `${tail} ${perim - tail}`)
          rect1.setAttribute('stroke-dashoffset', offset)
          rect1.setAttribute('stroke-opacity', opacity)
          rect2.style.display = showRect2 ? '' : 'none'
          raf = requestAnimationFrame(frame)
        }
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(frame)
        rafs.push(() => cancelAnimationFrame(raf))
      }
      requestAnimationFrame(run)
      const onResize = () => { cancelAnimationFrame(raf); run() }
      window.addEventListener('resize', onResize)
      rafs.push(() => window.removeEventListener('resize', onResize))
    })
    return () => rafs.forEach(fn => fn())
  }, [])

  const copyUPI = () => {
    const upiId = 'coder-nishanth@airtel'
    const btn = document.getElementById('upiCopyBtn')
    const icoCopy = btn?.querySelector('.ico-copy')
    const icoCheck = btn?.querySelector('.ico-check')
    const label = btn?.querySelector('.copy-label')

    function onCopied() {
      if (btn) btn.classList.add('copied')
      if (icoCopy) icoCopy.style.display = 'none'
      if (icoCheck) icoCheck.style.display = 'block'
      if (label) label.textContent = 'Copied'
      setTimeout(() => {
        if (btn) btn.classList.remove('copied')
        if (icoCopy) icoCopy.style.display = 'block'
        if (icoCheck) icoCheck.style.display = 'none'
        if (label) label.textContent = 'Copy'
      }, 2000)
    }

    navigator.clipboard.writeText(upiId).then(onCopied).catch(() => {
      const ta = document.createElement('textarea')
      ta.value = upiId
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
      onCopied()
    })
  }

  return (
    <section id="donate" className="donate-section">
      <div className="sec-label rv">
        <span className="bracket">[ </span>Support My Work<span className="bracket"> ]</span>
        <span className="sec-label-line"></span>
      </div>
      <div className="donate-bento">
        {/* Header tile */}
        <div className="db-tile db-header rv">
          <div className="db-header-eyebrow">No VC Funding &middot; Just Vibes</div>
          <div className="db-header-title">Fuel the<br /><em>commits.</em></div>
          <p className="db-header-desc">No bugs were harmed in the making of this site. But coffee was consumed. Help keep the servers warm and the pull requests flowing.</p>
        </div>

        {/* UPI tile */}
        <div className="db-tile db-upi rv" style={{ transitionDelay: '.08s' }}>
          <div className="db-tile-border"></div>
          <div className="db-tile-label">01 &mdash; UPI Payment</div>
          <div className="db-tile-heading">Pay via <em>UPI</em></div>
          <div className="db-bmc-desc" style={{ fontSize: '.63rem', lineHeight: '1.85', letterSpacing: '.05em', color: 'rgba(210,208,220,.75)', fontFamily: "'DM Mono',monospace", marginTop: '4px' }}>
            Support my work instantly via UPI from any app — zero fees, India only.
          </div>
          <button className="db-btn db-btn-upi db-btn-bmc" id="upiCopyBtn" onClick={copyUPI} aria-label="Copy UPI ID" style={{ position: 'relative' }}>
            <span className="upi-id-text">coder-nishanth@airtel</span>
            <span className="upi-copy-action">
              <svg className="ico-copy" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <svg className="ico-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'none' }}>
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span className="copy-label">Copy</span>
            </span>
          </button>
          <div className="db-tile-badge"><span className="db-dot db-dot-green"></span>Instant &middot; India &middot; Zero Fees</div>
        </div>

        {/* BMC tile */}
        <div className="db-tile db-bmc rv" style={{ transitionDelay: '.16s' }}>
          <div className="db-tile-border"></div>
          <div className="db-tile-label">02 &mdash; Buy Me a Coffee</div>
          <div className="db-tile-heading">Global <em>Support</em></div>
          <div className="db-bmc-desc" style={{ fontSize: '.63rem', lineHeight: '1.85', letterSpacing: '.05em', color: 'rgba(210,208,220,.75)', fontFamily: "'DM Mono',monospace", marginTop: '4px' }}>
            Support my work from anywhere in the world via card, PayPal, or UPI.
          </div>
          <a className="db-btn db-btn-bmc" id="bmcPayBtn" href="https://buymeacoffee.com/nishanth" target="_blank" rel="noopener" style={{ position: 'relative' }}>
            <span>Support on BMC</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <div className="db-tile-badge"><span className="db-dot db-dot-yellow"></span>Global &middot; Card &middot; PayPal</div>
        </div>
      </div>
    </section>
  )
}
