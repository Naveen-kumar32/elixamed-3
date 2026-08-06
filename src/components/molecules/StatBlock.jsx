import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

// Cubic ease-out — matches the site's --ease-signature curve closely enough
// for a numeric tween (a full cubic-bezier solve isn't worth it here).
function easeOut(t) {
  return 1 - (1 - t) ** 3
}

/**
 * Fraunces numeral + mono label. Counts up from 0 on scroll reveal (~1s),
 * unless `countUp` is false (About's numbers strip intentionally varies —
 * "unity with variation") or the user prefers reduced motion, in which case
 * the final value renders immediately.
 */
export function StatBlock({ value, suffix = '', decimals = 0, label, countUp = true, duration = 1000, tone = 'default', className = '' }) {
  const [ref, isVisible] = useReveal({ threshold: 0.4 })
  const reducedMotion = usePrefersReducedMotion()
  const shouldAnimate = countUp && !reducedMotion
  const [display, setDisplay] = useState(shouldAnimate ? 0 : value)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!isVisible || !shouldAnimate) {
      if (!shouldAnimate) setDisplay(value)
      return undefined
    }

    const start = performance.now()
    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(1, elapsed / duration)
      setDisplay(value * easeOut(progress))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isVisible, shouldAnimate, value, duration])

  const numeralColor = tone === 'onDark' ? 'text-white' : 'text-ink-700'
  const labelColor = tone === 'onDark' ? 'text-clinical-300' : 'text-ink-500'

  return (
    <div ref={ref} className={className}>
      <p className={['font-display text-display-2 font-semibold tabular-nums', numeralColor].join(' ')}>
        {display.toFixed(decimals)}
        {suffix}
      </p>
      <p className={['mt-2 font-mono text-xs uppercase tracking-wide', labelColor].join(' ')}>{label}</p>
    </div>
  )
}
