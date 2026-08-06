import { Icon } from '../atoms/Icon'

/** Active-filter chip with a dismiss ×, used in Products' faceted filter bar. */
export function FilterChip({ label, onRemove, className = '' }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full bg-brand-50 py-1.5 pl-3 pr-2 text-sm font-medium text-brand-700',
        className,
      ].join(' ')}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter: ${label}`}
        className="rounded-full p-0.5 transition-colors hover:bg-clinical-600 hover:text-white"
      >
        <Icon name="X" size={14} />
      </button>
    </span>
  )
}
