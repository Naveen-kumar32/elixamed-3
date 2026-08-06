const variants = {
  brand: 'bg-brand-50 text-brand-700',
  clinical: 'bg-white text-clinical-700 border border-clinical-500/25',
  neutral: 'bg-ink-900/5 text-ink-500',
  outline: 'bg-transparent text-ink-500 border border-ink-500/25',
  onDark: 'bg-white/10 text-clinical-300 border border-white/15',
}

/**
 * Small pill label for category tags, spec chips and cert mini-badges.
 * `mono` switches the label to IBM Plex Mono (used for spec/batch strings).
 */
export function Badge({ variant = 'neutral', mono = false, className = '', children, ...rest }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium leading-none',
        mono ? 'font-mono uppercase tracking-wide' : '',
        variants[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </span>
  )
}
