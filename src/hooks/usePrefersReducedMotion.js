import { useMediaQuery } from './useMediaQuery'

/**
 * Single gate for the entire motion system (Part E). Every parallax,
 * marquee, float, count-up, blob-morph and stroke-draw effect checks this
 * before animating — reduced means opacity-only, no exceptions.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
