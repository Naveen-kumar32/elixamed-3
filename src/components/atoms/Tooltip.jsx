import { useId, useState } from 'react'

/**
 * Popover-lite tooltip: hover + focus, role="tooltip", closes on Escape.
 * Wraps its trigger in a focusable span so keyboard users reach it too.
 */
export function Tooltip({ label, children, className = '' }) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <span
      className={['relative inline-flex', className].join(' ')}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false)
      }}
    >
      <span tabIndex={0} aria-describedby={open ? id : undefined} className="cursor-help border-b border-dotted border-current outline-none">
        {children}
      </span>
      {open && (
        <span
          role="tooltip"
          id={id}
          className="absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-56 -translate-x-1/2 rounded-lg bg-ink-900 px-3 py-2 text-xs font-normal leading-snug text-white shadow-lg"
        >
          {label}
          <span aria-hidden="true" className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-ink-900" />
        </span>
      )}
    </span>
  )
}
