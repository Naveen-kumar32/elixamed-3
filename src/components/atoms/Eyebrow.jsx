/**
 * Mono, uppercase, tracked-out label with a 24px gradient tick — the
 * eyebrow→heading→body scan order used at the top of nearly every section.
 */
export function Eyebrow({ tone = 'default', className = '', children }) {
  const color = tone === 'onDark' ? 'text-brand-100' : 'text-brand-700'
  return (
    <p className={['flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.14em]', color, className].join(' ')}>
      <span aria-hidden="true" className="h-0.5 w-6 shrink-0 bg-signature-gradient" />
      {children}
    </p>
  )
}
