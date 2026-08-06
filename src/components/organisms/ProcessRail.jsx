import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * THE PROCESS RAIL — horizontal scroll-snap, 6 stages, Fraunces numerals,
 * progress dots synced to scroll position via IntersectionObserver, full
 * arrow-key/Home/End keyboard operation. Stacks vertically below 640px
 * (native touch scroll handles drag on touch devices; no custom gesture
 * code needed there).
 */
export function ProcessRail({ steps }) {
  const railRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = usePrefersReducedMotion()
  const suppressRef = useRef(false)
  const suppressTimerRef = useRef(null)

  useEffect(() => {
    const container = railRef.current
    if (!container) return undefined
    const cards = Array.from(container.querySelectorAll('[data-rail-card]'))

    // A callback batch only contains entries whose ratio crossed a
    // threshold since the last check — not every observed card — so
    // comparing only within one batch (or worse, letting the last entry
    // in forEach order win) picks the wrong card whenever a wide viewport
    // keeps 2+ cards simultaneously above 0.6. Keeping a persistent
    // index→ratio map and always recomputing the true max fixes both the
    // wrong-initial-card and the "arrow key jumps two stages" bugs.
    const ratios = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        // An explicit jump (keyboard/dot-click) already set the intended
        // index directly; ignore the observer while its scroll animation
        // is still settling so a same-tie-breaks-toward-the-wrong-card
        // situation at the very end of the rail can't fight back and undo
        // what the user actually asked for.
        if (suppressRef.current) return
        entries.forEach((entry) => {
          ratios.set(Number(entry.target.dataset.index), entry.isIntersecting ? entry.intersectionRatio : 0)
        })
        let bestIndex = null
        let bestRatio = 0.6
        ratios.forEach((ratio, index) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestIndex = index
          }
        })
        if (bestIndex != null) setActiveIndex(bestIndex)
      },
      { root: container, threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] },
    )
    cards.forEach((c) => observer.observe(c))
    return () => {
      observer.disconnect()
      if (suppressTimerRef.current) clearTimeout(suppressTimerRef.current)
    }
  }, [steps.length])

  const scrollToIndex = (idx) => {
    const container = railRef.current
    const card = container?.querySelector(`[data-index="${idx}"]`)
    suppressRef.current = true
    if (suppressTimerRef.current) clearTimeout(suppressTimerRef.current)
    card?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', inline: 'start', block: 'nearest' })
    setActiveIndex(idx)
    suppressTimerRef.current = setTimeout(() => {
      suppressRef.current = false
    }, 700)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollToIndex(Math.min(activeIndex + 1, steps.length - 1))
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollToIndex(Math.max(activeIndex - 1, 0))
    } else if (e.key === 'Home') {
      e.preventDefault()
      scrollToIndex(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      scrollToIndex(steps.length - 1)
    }
  }

  return (
    <div>
      <div
        ref={railRef}
        role="group"
        aria-label="Process stages, scrollable"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 max-sm:flex-col max-sm:snap-none max-sm:overflow-visible"
      >
        {steps.map((step, i) => (
          <div
            key={step.number}
            data-rail-card
            data-index={i}
            className="colorful-hover w-[85vw] max-w-sm shrink-0 snap-start rounded-card border border-brand-500/20 bg-white p-8 shadow-md sm:w-96 max-sm:w-full"
          >
            <p className="font-display text-5xl font-semibold text-brand-600/45">{step.number}</p>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink-700">{step.title}</h3>
            <p className="mt-2 text-ink-500">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Plain labeled buttons, not role="tab": these jump a scroll-snap
          carousel, they don't switch between tabpanels, so real tab
          semantics would promise screen readers an interaction model this
          isn't. aria-current marks the active position instead. */}
      <div role="group" aria-label="Jump to process stage" className="mt-2 flex items-center justify-center gap-2">
        {steps.map((step, i) => (
          <button
            key={step.number}
            type="button"
            aria-current={i === activeIndex ? 'true' : undefined}
            aria-label={`Stage ${step.number}: ${step.title}`}
            onClick={() => scrollToIndex(i)}
            className={['h-2 rounded-full transition-all duration-300', i === activeIndex ? 'w-6 bg-brand-500' : 'w-2 bg-ink-500/20 hover:bg-brand-300'].join(
              ' ',
            )}
          />
        ))}
      </div>
    </div>
  )
}
