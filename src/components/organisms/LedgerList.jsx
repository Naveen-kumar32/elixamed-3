/**
 * Mono-indexed ledger rows — shared vocabulary between Quality's
 * certifications list and Services' SLA table (repetition principle).
 * Row hover (or keyboard focus, for rows that carry a `detail` line)
 * reveals the supplementary detail line.
 */
export function LedgerList({ items, tone = 'onDark', className = '' }) {
  const isDark = tone === 'onDark'

  return (
    <div className={['divide-y', isDark ? 'divide-white/10' : 'divide-ink-500/10', className].join(' ')}>
      {items.map((item, i) => (
        <div
          key={item.primary}
          tabIndex={item.detail ? 0 : -1}
          className={[
            'group rounded-lg px-3 py-5 outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-brand-500/50',
            isDark ? 'hover:bg-brand-500/10' : 'hover:bg-brand-50',
          ].join(' ')}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <div className="flex items-baseline gap-4">
              <span className={['font-mono text-sm', isDark ? 'text-clinical-300' : 'text-clinical-600'].join(' ')}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={['font-display text-lg font-medium', isDark ? 'text-white' : 'text-ink-700'].join(' ')}>
                {item.primary}
              </span>
            </div>
            {item.meta && (
              <span className={['font-mono text-sm', isDark ? 'text-white/50' : 'text-ink-500/60'].join(' ')}>{item.meta}</span>
            )}
          </div>

          {item.secondary && (
            <p className={['mt-1 pl-9 text-sm', isDark ? 'text-clinical-300/80' : 'text-ink-500'].join(' ')}>{item.secondary}</p>
          )}

          {item.detail && (
            <p
              className={[
                'grid max-h-0 overflow-hidden pl-9 text-sm opacity-0 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]',
                'group-hover:max-h-20 group-hover:opacity-100 group-hover:pt-2',
                'group-focus-visible:max-h-20 group-focus-visible:opacity-100 group-focus-visible:pt-2',
                isDark ? 'text-white/70' : 'text-ink-500',
              ].join(' ')}
            >
              {item.detail}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
