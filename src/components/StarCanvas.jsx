import { useState, useEffect } from 'react'
import { Particles } from './magicui/particles'

export default function StarCanvas({ isLight }) {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768 || navigator.maxTouchPoints > 0)
  }, [])

  if (isMobile) return null

  return (
    <Particles
      id="starCanvas"
      className="fixed inset-0 z-0"
      quantity={180}
      staticity={15}
      ease={40}
      color={isLight ? '#c13d10' : '#ffffff'}
    />
  )
}
