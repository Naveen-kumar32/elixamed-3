import { useEffect, useState } from 'react'

/**
 * Subscribes to a CSS media query. Returns `false` on the server/first paint
 * and syncs synchronously with `matchMedia` on mount to avoid a flash.
 */
export function useMediaQuery(query) {
  const getMatch = () => (typeof window !== 'undefined' && 'matchMedia' in window ? window.matchMedia(query).matches : false)

  const [matches, setMatches] = useState(getMatch)

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return undefined
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()

    if (mql.addEventListener) {
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    }
    // Safari <14 fallback
    mql.addListener(onChange)
    return () => mql.removeListener(onChange)
  }, [query])

  return matches
}
