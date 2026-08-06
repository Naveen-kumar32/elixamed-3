import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * Slow auto-advancing crossfade slideshow for hero image panels — 2–3
 * images, each held for `interval`ms, dimming out and the next fading in
 * over `fadeMs`, looping. The parent (`className`) sets the box (aspect
 * ratio, rounding, shadow); each image absolutely fills it with
 * object-cover. Reduced motion shows only the first image, statically —
 * the advance timer is never even created, not just visually frozen.
 */
export function ImageCrossfade({ images, interval = 5000, fadeMs = 1500, className = '', imgClassName = 'object-cover' }) {
  const [index, setIndex] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion || images.length <= 1) return undefined
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), interval)
    return () => clearInterval(timer)
  }, [reducedMotion, images.length, interval])

  return (
    <div className={['relative overflow-hidden', className].join(' ')}>
      {images.map((img, i) => {
        const visible = reducedMotion ? i === 0 : i === index
        return (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt || ''}
            loading={i === 0 ? 'eager' : 'lazy'}
            width={img.width}
            height={img.height}
            className={['absolute inset-0 h-full w-full transition-opacity', imgClassName, visible ? 'opacity-100' : 'opacity-0'].join(' ')}
            style={reducedMotion ? undefined : { transitionDuration: `${fadeMs}ms` }}
          />
        )
      })}
    </div>
  )
}
