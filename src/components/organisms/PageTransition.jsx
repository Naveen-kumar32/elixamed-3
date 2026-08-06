import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const ANIMATION_MS = 240

/**
 * Route-change fade+8px-rise (240ms), keyed on location.pathname so React
 * remounts the wrapper (and its CSS enter-animation) when the ROUTE changes.
 * Deliberately NOT keyed on location.key: that changes on every history
 * entry, including in-page setSearchParams() calls (e.g. Products syncing
 * its category filter to the URL) — keying on it would remount the page
 * every time a page updates its own query string, which previously caused
 * exactly that: an update-search-params → remount → re-run-mount-effect →
 * update-search-params-again loop. Pathname-only keying still replays the
 * transition on every real navigation and leaves in-page param updates alone.
 *
 * The animation class is removed once it finishes playing, rather than left
 * on indefinitely: a CSS animation's fill-mode keeps applying its final
 * keyframe's computed style even after it ends, and `transform: translateY(0)`
 * — visually a no-op — still counts as "transform is not none" per spec,
 * which makes this wrapper a new containing block for any `position: fixed`
 * descendant. Left in place, that silently broke every fixed-position
 * overlay rendered by a page component (e.g. the Products filter bottom
 * sheet positioned itself relative to this div instead of the viewport).
 * Dropping the class after the animation settles restores the viewport as
 * the containing block for the rest of the page's lifetime.
 *
 * Always resets scroll to top; animation itself is skipped entirely under
 * prefers-reduced-motion (opacity/position snap straight to final state).
 */
export function PageTransition({ children }) {
  const location = useLocation()
  const reducedMotion = usePrefersReducedMotion()
  const [animating, setAnimating] = useState(!reducedMotion)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (reducedMotion) return undefined
    setAnimating(true)
    const t = setTimeout(() => setAnimating(false), ANIMATION_MS + 20)
    return () => clearTimeout(t)
  }, [location.pathname, reducedMotion])

  return (
    <div key={location.pathname} className={animating ? 'animate-page-enter' : ''}>
      {children}
    </div>
  )
}
