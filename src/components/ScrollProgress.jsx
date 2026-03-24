import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const spRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      if (spRef.current) spRef.current.style.width = pct + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div id="sp" ref={spRef}></div>
}
