import { useState, useEffect } from 'react'

export function useTheme() {
  const [isLight, setIsLight] = useState(() => {
    return localStorage.getItem('theme') !== 'dark' ||
      document.documentElement.classList.contains('light-init')
  })

  useEffect(() => {
    document.documentElement.classList.remove('light-init')
    if (isLight) {
      document.body.classList.add('light')
    } else {
      document.body.classList.remove('light')
    }
    localStorage.setItem('theme', isLight ? 'light' : 'dark')
  }, [isLight])

  const toggle = () => {
    document.documentElement.classList.add('theme-switching')
    const next = !document.body.classList.contains('light')
    if (next) {
      document.body.classList.add('light')
    } else {
      document.body.classList.remove('light')
    }
    localStorage.setItem('theme', next ? 'light' : 'dark')
    setIsLight(next)
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('theme-switching')
    })
  }
  return { isLight, toggle }
}
