import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth <= 768 || navigator.maxTouchPoints > 0
    if (isMobile) return

    const dot = dotRef.current
    let mx = 0, my = 0

    const onMove = e => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'; dot.style.top = my + 'px'
    }
    document.addEventListener('mousemove', onMove)

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
      observer.disconnect()
    }
  }, [])

  return <div id="cur" ref={dotRef}></div>
}
