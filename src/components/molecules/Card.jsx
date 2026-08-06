const variants = {
  // Default surface card — most content cards site-wide.
  elevated: 'bg-white rounded-card shadow-md',
  // Lighter-weight card, used where several sit close together (bento cells).
  outline: 'bg-white rounded-card border border-ink-500/10',
  // Quality page's intentional variance — sharp 4px radius.
  sharp: 'bg-white rounded-sharp border border-ink-500/10 shadow-xs',
  // Glassmorphism — reserved for the hero float-card per Part C1.
  glass: 'bg-white/70 backdrop-blur-md rounded-card border border-white/40 shadow-lg',
  // Cards sitting on an ink-900 section.
  onDark: 'bg-white/5 rounded-card border border-white/10 text-white',
}

/**
 * Generic surface primitive. `variant` selects the visual treatment;
 * `hover` adds the shared lift+shadow interaction used across bento cells,
 * value cards, product cards, etc.
 */
export function Card({ variant = 'elevated', hover = false, as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag
      className={[
        variants[variant],
        hover ? 'colorful-hover transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:shadow-lg' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
