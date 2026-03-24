import { useState, useEffect } from 'react'

export function useTheme() {
  const [isLight, setIsLight] = useState(() => {
    return localStorage.getItem('theme') === 'light' ||
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

  const toggle = () => setIsLight(v => !v)
  return { isLight, toggle }
}
