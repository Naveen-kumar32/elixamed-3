import { useReveal } from '../../hooks/useReveal'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

// Hidden-state transform per direction — all resolve to translate-0/scale-100
// opacity-100 once visible, so only the "before" state differs.
const HIDDEN = {
  up: 'opacity-0 translate-y-4',
  down: 'opacity-0 -translate-y-4',
  left: 'opacity-0 translate-x-10',
  right: 'opacity-0 -translate-x-10',
  scale: 'opacity-0 scale-95',
  none: 'opacity-0',
}

const VISIBLE = 'opacity-100 translate-x-0 translate-y-0 scale-100'

/**
 * The site's scroll-reveal wrapper — fade-up by default, with slide-left /
 * slide-right / slide-down / scale-in variants (`direction` prop) so the
 * motion vocabulary has range across sections instead of one animation
 * repeated everywhere. `delay` (ms) staggers siblings (~70ms apart).
 * Reduced motion renders children immediately with no transform/opacity.
 */
export function Reveal({ children, delay = 0, direction = 'up', className = '', as: Tag = 'div' }) {
  const [ref, isVisible] = useReveal()
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Tag
      ref={ref}
      className={[
        'transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]',
        isVisible ? VISIBLE : HIDDEN[direction],
        className,
      ].join(' ')}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
