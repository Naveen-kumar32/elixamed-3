import { Icon } from '../atoms/Icon'

/**
 * Call / Email / Directions chip — tel:/mailto:/maps hrefs, 48px touch
 * target. Reused on both Contact's quick-action row and Services' CTA.
 */
export function QuickActionChip({ icon, label, href, tone = 'default', className = '' }) {
  const toneClasses =
    tone === 'onDark'
      ? 'bg-white/10 border-white/20 text-white hover:border-brand-500 hover:bg-brand-500 hover:text-[#1A1F23]'
      : 'bg-white border-brand-500/25 text-ink-700 hover:border-brand-500 hover:bg-brand-500 hover:text-[#1A1F23]'

  return (
    <a
      href={href}
      className={[
        'inline-flex h-12 items-center gap-2 rounded-full border px-5 text-sm font-medium shadow-xs',
        'transition-all duration-200 hover:-translate-y-px hover:shadow-md',
        toneClasses,
        className,
      ].join(' ')}
    >
      <Icon name={icon} size={18} />
      {label}
    </a>
  )
}
