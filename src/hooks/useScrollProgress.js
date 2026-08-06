import { useEffect, useState } from 'react'

/**
 * Vertical scroll progress of the whole document, 0–1. Drives the fixed
 * top gradient bar. Throttled to one read per animation frame.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = null

    const measure = () => {
      frame = null
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0)
    }

    const onScroll = () => {
      if (frame == null) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame != null) cancelAnimationFrame(frame)
    }
  }, [])

  return progress
}
