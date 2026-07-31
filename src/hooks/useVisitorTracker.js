import { useEffect } from 'react'

const ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxDzQktCrxKCDtLZG17V3bLf5nzV9WDwQcjHrsQz4rMFMd3dm2CgTqPF2AcgyAIuLbY/exec'

function detectDevice() {
  const ua = navigator.userAgent
  const device = /Mobi|Android|iPhone/i.test(ua)
    ? /iPad|Tablet/i.test(ua)
      ? 'Tablet'
      : 'Mobile'
    : 'Desktop'
  const osMatch = ua.match(/Windows NT [\d.]+|Android [\d.]+|iPhone OS [\d_]+|Mac OS X [\d_]+|Linux/)
  const os = (osMatch ? osMatch[0].replace(/_/g, '.') : '')
    .replace('Windows NT 10.0', 'Windows 10')
    .replace('Windows NT 6.3', 'Windows 8.1')
    .replace('Windows NT 6.1', 'Windows 7')
    .replace('Windows NT 5.1', 'Windows XP')
    .replace('Mac OS X', 'macOS')
    .replace('iPhone OS', 'iOS')
  const browserMatch = ua.match(/(Edg|Chrome|Firefox|Safari|OPR|MSIE)[/\s]([\d.]+)/)
  const browser = browserMatch ? `${browserMatch[1]} ${browserMatch[2]}` : 'Unknown'
  const modelMatch = ua.match(/(SM-[A-Za-z0-9]+|Pixel [\dA-Za-z]+|iPhone|iPad|Macintosh)/)
  const deviceModel = modelMatch ? modelMatch[1] : ''
  return { device, deviceModel, os, browser }
}

async function getIpInfo() {
  try {
    const res = await fetch('https://ipwho.is/')
    if (!res.ok) return {}
    const d = await res.json()
    return {
      ip: d.ip || '',
      country: d.country || '',
      city: d.city || '',
      region: d.region || '',
      isp: d.connection?.isp || '',
      timezone: d.timezone?.id || '',
    }
  } catch {
    return {}
  }
}

export default function useVisitorTracker() {
  useEffect(() => {
    if (sessionStorage.getItem('vt')) return
    sessionStorage.setItem('vt', '1')

    ;(async () => {
      const info = await getIpInfo()
      const { device, deviceModel, os, browser } = detectDevice()
      fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          ...info,
          language: navigator.language || '',
          device,
          deviceModel,
          os,
          browser,
          screen: `${screen.width}x${screen.height}`,
          referrer: document.referrer || '',
        }),
      }).catch(() => {
        // tracking is best-effort, never block the page
      })
    })()
  }, [])
}
