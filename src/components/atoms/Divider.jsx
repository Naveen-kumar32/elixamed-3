/**
 * Divider atom. `variant="gradient"` uses the signature orange→teal gradient
 * and is reserved for the handful of anchor moments the brief names
 * explicitly (Home stats band, About/Quality pull-quote rules) — everywhere
 * else uses `solid`, so the gradient keeps its "one signature motif" weight.
 */
export function Divider({ variant = 'solid', orientation = 'horizontal', className = '', tone = 'default' }) {
  const isVertical = orientation === 'vertical'
  const base = isVertical ? 'w-[2px] h-full' : 'h-px w-full'
  const color =
    variant === 'gradient'
      ? 'bg-signature-gradient'
      : tone === 'onDark'
        ? 'bg-white/15'
        : 'bg-ink-500/15'

  return <span aria-hidden="true" className={[base, color, className].join(' ')} />
}
