import { useId } from 'react'

/**
 * THE single noise-texture primitive (Part B) — feTurbulence grain at
 * opacity .03, mix-blend-overlay. Used on the hero and dark sections only,
 * to break up flat gradient fills. Purely decorative: aria-hidden.
 */
export function NoiseOverlay({ className = '' }) {
  const id = useId()
  const filterId = `elx-noise-${id}`

  return (
    <svg className={['noise-layer', className].join(' ')} aria-hidden="true" focusable="false">
      <filter id={filterId}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  )
}
