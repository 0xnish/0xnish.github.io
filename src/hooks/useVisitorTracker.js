import { useEffect } from 'react'

const ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxDzQktCrxKCDtLZG17V3bLf5nzV9WDwQcjHrsQz4rMFMd3dm2CgTqPF2AcgyAIuLbY/exec'

function detectOs(ua) {
  const android = ua.match(/Android ([\d.]+)/)
  if (android) return `Android ${android[1]}`
  if (/iPhone|iPad|iPod/.test(ua)) {
    const m = ua.match(/OS ([\d_]+)/)
    return m ? `iOS ${m[1].replace(/_/g, '.')}` : 'iOS'
  }
  if (/Windows/.test(ua)) {
    const m = ua.match(/Windows NT ([\d.]+)/)
    const names = {
      '10.0': 'Windows 10',
      '6.3': 'Windows 8.1',
      '6.2': 'Windows 8',
      '6.1': 'Windows 7',
      '6.0': 'Windows Vista',
      '5.1': 'Windows XP',
    }
    return m ? names[m[1]] || `Windows ${m[1]}` : 'Windows'
  }
  if (/Mac OS X/.test(ua)) {
    const m = ua.match(/Mac OS X ([\d_.]+)/)
    return m ? `macOS ${m[1].replace(/_/g, '.')}` : 'macOS'
  }
  if (/CrOS/.test(ua)) return 'Chrome OS'
  if (/Linux/.test(ua)) return 'Linux'
  return ''
}

function detectDeviceModel(ua) {
  if (/iPhone/.test(ua)) return 'iPhone'
  if (/iPad/.test(ua)) return 'iPad'
  if (/Macintosh/.test(ua)) return 'Macintosh'
  const m = ua.match(/; ?([^;]+) Build\//)
  return m ? m[1].trim() : ''
}

function detectDevice() {
  const ua = navigator.userAgent
  const device = /Mobi|Android|iPhone/i.test(ua)
    ? /iPad|Tablet/i.test(ua)
      ? 'Tablet'
      : 'Mobile'
    : 'Desktop'
  const os = detectOs(ua)
  const browserMatch = ua.match(/(Edg|Chrome|Firefox|Safari|OPR|MSIE)[/\s]([\d.]+)/)
  const browser = browserMatch ? `${browserMatch[1]} ${browserMatch[2]}` : 'Unknown'
  const deviceModel = detectDeviceModel(ua)
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
      const referrer = document.referrer || ''
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
          referrer,
        }),
      }).catch(() => {
        // tracking is best-effort, never block the page
      })
    })()
  }, [])
}
