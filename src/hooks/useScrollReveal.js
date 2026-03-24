import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(e => {
      e.forEach(x => { if (x.isIntersecting) x.target.classList.add('on') })
    }, { threshold: .1 })
    document.querySelectorAll('.rv,.rl,.rr,.sk').forEach(el => io.observe(el))
    document.querySelectorAll('.sk').forEach((c, i) => {
      c.style.transitionDelay = (i * .09) + 's'
    })
    return () => io.disconnect()
  }, [])
}
