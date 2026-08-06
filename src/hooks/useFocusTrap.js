import { useEffect } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Shared focus-trap logic for the three places the brief requires it
 * (mega menu, mobile drawer, command palette): Tab/Shift+Tab cycle only
 * within `containerRef` while `active`, and Escape calls `onEscape`.
 */
export function useFocusTrap(containerRef, { active, onEscape } = {}) {
  useEffect(() => {
    if (!active) return undefined

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onEscape?.()
        return
      }
      if (e.key !== 'Tab' || !containerRef.current) return

      const focusables = Array.from(containerRef.current.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null,
      )
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [active, containerRef, onEscape])
}
