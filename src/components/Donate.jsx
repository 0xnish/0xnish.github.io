import { useEffect } from 'react'

export default function Donate() {
  useEffect(() => {
    // Comet border animation for UPI and BMC buttons
    const configs = [
      { id: 'upiCopyBtn', color: '#ff0000' },
      { id: 'bmcPayBtn', color: '#ff0000' },
    ]
    const phases = [
      { name: 'forward', duration: 2000 },
      { name: 'reverse', duration: 2000 },
      { name: 'blink', duration: 1500 },
      { name: 'fast', duration: 1000 },
      { name: 'double', duration: 1500 },
      { name: 'strobe', duration: 1000 },
      { name: 'accelerate', duration: 1500 },
    ]
    const totalCycle = phases.reduce((s, p) => s + p.duration, 0)

    const rafs = []
    configs.forEach(({ id, color }) => {
      const btn = document.getElementById(id)
      if (!btn) return
      const ns = 'http://www.w3.org/2000/svg'
      const svg = document.createElementNS(ns, 'svg')
      svg.setAttribute('aria-hidden', 'true')
      svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;overflow:visible;'
      const path1 = document.createElementNS(ns, 'polyline')
      const path2 = document.createElementNS(ns, 'polyline')
      ;[path1, path2].forEach(r => {
        r.setAttribute('fill', 'none')
        r.setAttribute('stroke', color)
        r.setAttribute('stroke-width', '2')
        r.setAttribute('stroke-opacity', '0.9')
        r.setAttribute('stroke-linejoin', 'round')
        svg.appendChild(r)
      })
      path2.style.display = 'none'
      btn.appendChild(svg)

      let raf
      const startTime = performance.now()
      let cycleOffset = 0

      function getEndOffset(phaseName, perim) {
        switch (phaseName) {
          case 'forward':    return -(perim * 1)
          case 'reverse':    return perim * 1
          case 'blink':      return -(perim * 1)
          case 'fast':       return -(perim * 2.5)
          case 'double':     return -(perim * 1)
          case 'strobe':     return -(perim * 3.5)
          case 'accelerate': return -(perim * 3)
          default:           return 0
        }
      }

      function run() {
        const W = btn.offsetWidth, H = btn.offsetHeight
        const perim = 2 * (W + H)
        const mx = W / 2
        const pts = `${mx},1 ${W-1},1 ${W-1},${H-1} 1,${H-1} 1,1 ${mx},1`
        ;[path1, path2].forEach(r => r.setAttribute('points', pts))
        cycleOffset = phases.reduce((s, p) => s + getEndOffset(p.name, perim), 0)

        function frame(now) {
          const elapsed = now - startTime
          const cycleTime = elapsed % totalCycle
          let t = cycleTime
          let phaseName = '', phaseDuration = 0
          for (const p of phases) {
            if (t < p.duration) { phaseName = p.name; phaseDuration = p.duration; break }
            t -= p.duration
          }
          const progress = t / phaseDuration
          let tail = perim * 0.2, opacity = '0.9', showRect2 = false

          const cycleCount = Math.floor(elapsed / totalCycle)
          let withinCycleOffset = 0
          for (const p of phases) {
            if (p.name === phaseName) break
            withinCycleOffset += getEndOffset(p.name, perim)
          }
          const baseOffset = cycleCount * cycleOffset + withinCycleOffset

          let deltaOffset = 0
          if (phaseName === 'forward')    deltaOffset = -(perim * progress)
          else if (phaseName === 'reverse')    deltaOffset = perim * progress
          else if (phaseName === 'blink')      { opacity = Math.sin(progress * Math.PI * 8) > 0 ? '0.9' : '0'; deltaOffset = -(perim * progress) }
          else if (phaseName === 'fast')       { deltaOffset = -(perim * progress * 2.5); tail = perim * 0.1 }
          else if (phaseName === 'double')     { showRect2 = true; tail = perim * 0.15; deltaOffset = -(perim * progress); path2.setAttribute('stroke-dasharray', `${tail} ${perim - tail}`); path2.setAttribute('stroke-dashoffset', baseOffset + deltaOffset + perim / 2); path2.setAttribute('stroke-opacity', '0.9') }
          else if (phaseName === 'strobe')     { opacity = Math.floor(progress * 20) % 2 === 0 ? '0.9' : '0'; deltaOffset = -(perim * (1.5 + progress * 2)); tail = perim * 0.12 }
          else if (phaseName === 'accelerate') { deltaOffset = -(perim * (1 + progress * progress * 2)); tail = perim * (0.05 + 0.2 * progress) }

          const offset = baseOffset + deltaOffset

          path1.setAttribute('stroke-dasharray', `${tail} ${perim - tail}`)
          path1.setAttribute('stroke-dashoffset', offset)
          path1.setAttribute('stroke-opacity', opacity)
          path2.style.display = showRect2 ? '' : 'none'
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
          <div className="db-bmc-desc" style={{ fontSize: '.63rem', lineHeight: '1.85', letterSpacing: '.05em', color: '#333', fontFamily: "'DM Mono',monospace", marginTop: '4px' }}>
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
          <div className="db-bmc-desc" style={{ fontSize: '.63rem', lineHeight: '1.85', letterSpacing: '.05em', color: '#333', fontFamily: "'DM Mono',monospace", marginTop: '4px' }}>
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
