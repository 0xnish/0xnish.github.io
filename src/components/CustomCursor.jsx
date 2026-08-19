import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    let mx = 0, my = 0

    const onMove = e => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'; dot.style.top = my + 'px'
      dot.style.opacity = '1'
    }
    document.addEventListener('mousemove', onMove)

    const onTouchMove = e => {
      const t = e.touches[0]
      mx = t.clientX; my = t.clientY
      dot.style.left = mx + 'px'; dot.style.top = my + 'px'
      dot.style.opacity = '1'
    }
    const onTouchEnd = () => { dot.style.opacity = '0' }

    document.addEventListener('touchmove', onTouchMove, { passive: true })
    document.addEventListener('touchend', onTouchEnd)

    function addHover() {
      document.querySelectorAll('a,button,input,[role="button"],.donate-card').forEach(el => {
        el.addEventListener('mouseenter', () => dot.classList.add('h'))
        el.addEventListener('mouseleave', () => dot.classList.remove('h'))
      })
    }
    addHover()
    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
      observer.disconnect()
    }
  }, [])

  return <div id="cur" ref={dotRef}></div>
}
