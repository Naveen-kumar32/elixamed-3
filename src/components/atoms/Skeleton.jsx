/**
 * Shimmer placeholder block — Products grid's ~300ms filter-change loading
 * state, and route-level Suspense fallbacks. Reduced-motion collapses the
 * shimmer to a static tint via the global animation-duration override.
 */
export function Skeleton({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={[
        'animate-shimmer rounded-btn bg-[length:200%_100%]',
        'bg-[linear-gradient(90deg,rgb(11_46_51/0.06)_25%,rgb(11_46_51/0.12)_37%,rgb(11_46_51/0.06)_63%)]',
        className,
      ].join(' ')}
    />
  )
}
