import { useEffect, useRef, useState } from 'react'

/**
 * IntersectionObserver-driven scroll reveal. Returns `[ref, isVisible]`.
 * Attach `ref` to the element you want to animate in; `isVisible` flips
 * true once it crosses the viewport threshold (and stays true by default —
 * `once: false` lets it toggle back off, used for scroll-synced highlighting).
 */
export function useReveal({ threshold = 0.08, rootMargin = '0px 0px 16% 0px', once = true } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, isVisible]
}
