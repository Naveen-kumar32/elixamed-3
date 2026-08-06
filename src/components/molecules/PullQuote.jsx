import { Divider } from '../atoms/Divider'

/**
 * Fraunces-italic pull-quote with a 2px gradient left rule — the one
 * deliberate "unity" motif shared between About's mission quote and
 * Quality's policy statement. Wrap the one phrase that should carry Von
 * Restorff emphasis in a <strong> at the call site (styled below).
 */
export function PullQuote({ children, tone = 'default', cite, className = '' }) {
  const textColor = tone === 'onDark' ? 'text-white' : 'text-ink-700'

  return (
    <figure className={['flex gap-6 sm:gap-8', className].join(' ')}>
      <Divider orientation="vertical" variant="gradient" className="shrink-0" />
      <blockquote className={['font-display text-display-3 italic leading-snug [&_strong]:not-italic [&_strong]:font-semibold [&_strong]:text-brand-700', textColor].join(' ')}>
        {children}
      </blockquote>
      {cite && <figcaption className="sr-only">{cite}</figcaption>}
    </figure>
  )
}
