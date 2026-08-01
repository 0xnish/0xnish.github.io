import { useEffect, useRef } from 'react'
import { upiId, bmcLink } from '../helper/constants'

export default function Donate() {
  const heartTimers = useRef({})

  useEffect(() => () => {
    Object.values(heartTimers.current).forEach(t => clearInterval(t))
  }, [])
  const copyUPI = () => {
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

  const spawnHearts = btn => {
    const r = btn.getBoundingClientRect()
    const heartCount = 10
    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('span')
      heart.className = 'db-heart'
      heart.textContent = '\u2665'
      const angle = -Math.PI * 0.9 + Math.random() * Math.PI * 1.8
      const dist = 34 + Math.random() * 56
      const dx = Math.cos(angle) * dist
      const dy = Math.sin(angle) * dist
      const dur = 0.6 + Math.random() * 0.5
      const size = 9 + Math.random() * 9
      const x = r.left + Math.random() * r.width
      const y = r.top + Math.random() * r.height
      heart.style.left = x + 'px'
      heart.style.top = y + 'px'
      heart.style.fontSize = size + 'px'
      heart.style.setProperty('--hx', dx + 'px')
      heart.style.setProperty('--hy', dy + 'px')
      heart.style.setProperty('--rot', (Math.random() * 120 - 60).toFixed(1) + 'deg')
      heart.style.animationDuration = dur + 's'
      document.body.appendChild(heart)
      setTimeout(() => heart.remove(), dur * 1000 + 100)
    }
  }

  const startHearts = (id, btn) => {
    if (heartTimers.current[id]) return
    spawnHearts(btn)
    heartTimers.current[id] = setInterval(() => spawnHearts(btn), 240)
  }

  const stopHearts = id => {
    if (heartTimers.current[id]) {
      clearInterval(heartTimers.current[id])
      heartTimers.current[id] = null
    }
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
        <div className="db-tile db-upi rv" style={{ transitionDelay: '.09s' }}>
          <div className="db-tile-label">01 &mdash; UPI Payment</div>
          <div className="db-tile-heading">Pay via <em>UPI</em></div>
          <div className="db-bmc-desc" style={{ fontSize: '.75rem', lineHeight: '1.85', letterSpacing: '.05em', color: 'rgba(232, 228, 220, 1)', fontFamily: "'Alan Sans',sans-serif", marginTop: '4px' }}>
            Support my work instantly via UPI from any app — zero fees, India only.
          </div>
          <button className="db-btn db-btn-upi db-btn-bmc" id="upiCopyBtn" onClick={copyUPI} onMouseEnter={e => startHearts('upi', e.currentTarget)} onMouseLeave={() => stopHearts('upi')} aria-label="Copy UPI ID" style={{ position: 'relative' }}>
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
        <div className="db-tile db-bmc rv" style={{ transitionDelay: '.18s' }}>
          <div className="db-tile-label">02 &mdash; Buy Me a Coffee</div>
          <div className="db-tile-heading">Global <em>Support</em></div>
          <div className="db-bmc-desc" style={{ fontSize: '.75rem', lineHeight: '1.85', letterSpacing: '.05em', color: 'rgba(232, 228, 220, 1)', fontFamily: "'Alan Sans',sans-serif", marginTop: '4px' }}>
            Support my work from anywhere in the world via card, PayPal, or UPI.
          </div>
          <a className="db-btn db-btn-bmc" id="bmcPayBtn" href={bmcLink} target="_blank" rel="noopener" onMouseEnter={e => startHearts('bmc', e.currentTarget)} onMouseLeave={() => stopHearts('bmc')} style={{ position: 'relative' }}>
            <span>Support on BMC</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <div className="db-tile-badge"><span className="db-dot db-dot-yellow"></span>Global &middot; Card &middot; PayPal</div>
        </div>
      </div>

      {/* Dark mode override for description text */}
      <style>{`
        @media (prefers-color-scheme: dark) {
          .db-bmc-desc {
            color: rgba(232, 228, 220, 1) !important;
          }
        }
      `}</style>
    </section>
  )
}
