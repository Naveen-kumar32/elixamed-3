import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../data/nav'

/**
 * "Home / Section" trail, mono type, on every inner page. Home itself
 * renders nothing — it has no parent to trail back to.
 */
export function Breadcrumbs({ className = '' }) {
  const location = useLocation()
  const current = routes.find((r) => r.path === location.pathname)

  if (!current || current.path === '/') return null

  return (
    <nav aria-label="Breadcrumb" className={['font-mono text-xs uppercase tracking-wide text-ink-500/70', className].join(' ')}>
      <ol className="flex items-center gap-2">
        <li>
          <Link to="/" className="transition-colors hover:text-brand-700">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-ink-700">
          {current.crumb}
        </li>
      </ol>
    </nav>
  )
}
