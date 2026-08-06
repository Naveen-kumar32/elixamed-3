import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { routes, productMegaMenu } from '../../data/nav'
import { Icon } from '../atoms/Icon'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useFocusTrap } from '../../hooks/useFocusTrap'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function focusableIn(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE)).filter((el) => el.offsetParent !== null)
}

function GradientUnderline() {
  return <span aria-hidden="true" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-signature-gradient" />
}

/**
 * Sticky light navbar: shrinks 80→64px on scroll, gradient underline on
 * the active route, a Products mega menu (hover-intent + keyboard +
 * focus-trapped), and a mobile side drawer with a swipe-to-close gesture.
 */
export function Navbar() {
  const location = useLocation()
  const reducedMotion = usePrefersReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerProductsOpen, setDrawerProductsOpen] = useState(false)

  const megaRef = useRef(null)
  const megaTriggerRef = useRef(null)
  const drawerRef = useRef(null)
  const drawerTriggerRef = useRef(null)
  const closeTimer = useRef(null)
  const touchStartX = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMegaOpen(false)
    setDrawerOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!drawerOpen) return undefined
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusables = focusableIn(drawerRef.current)
    focusables[0]?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [drawerOpen])

  const openMega = () => {
    clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const closeMegaSoon = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150)
  }
  const closeMegaNow = (refocus) => {
    setMegaOpen(false)
    if (refocus) megaTriggerRef.current?.focus()
  }
  const closeDrawer = () => {
    setDrawerOpen(false)
    drawerTriggerRef.current?.focus()
  }

  useFocusTrap(megaRef, { active: megaOpen, onEscape: () => closeMegaNow(true) })
  useFocusTrap(drawerRef, { active: drawerOpen, onEscape: closeDrawer })

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 border-b border-ink-500/10 bg-white shadow-md shadow-ink-900/5 transition-[height] duration-300',
          scrolled ? 'h-16' : 'h-20',
        ].join(' ')}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center">
            <img
              src="/images/icon/Elixamed%202000x500.png"
              alt="ElixaMed Lifecare Private Limited"
              width={2000}
              height={500}
              className="h-9 w-auto max-w-[10.5rem] object-contain sm:h-10 sm:max-w-[12rem]"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {routes.map((r) =>
              r.path === '/products' ? (
                <div key={r.path} className="relative" onMouseEnter={openMega} onMouseLeave={closeMegaSoon}>
                  <div className="flex items-center">
                    <NavLink
                      to={r.path}
                      className={({ isActive }) =>
                        [
                          'relative rounded-full py-2 pl-4 pr-1 text-sm font-medium transition-colors',
                          isActive ? 'text-brand-700' : 'text-ink-700 hover:bg-brand-50 hover:text-brand-700',
                        ].join(' ')
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {r.label}
                          {isActive && <GradientUnderline />}
                        </>
                      )}
                    </NavLink>
                    <button
                      ref={megaTriggerRef}
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      aria-controls="products-mega-menu"
                      aria-label={megaOpen ? 'Hide product categories' : 'Show product categories'}
                      onClick={() => (megaOpen ? closeMegaNow(false) : openMega())}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault()
                          openMega()
                          requestAnimationFrame(() => focusableIn(megaRef.current)[0]?.focus())
                        }
                      }}
                      className="mr-1 flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-brand-500 hover:text-[#1A1F23]"
                    >
                      <Icon name="ChevronDown" size={15} className={['transition-transform duration-200', megaOpen ? 'rotate-180' : ''].join(' ')} />
                    </button>
                  </div>

                  {megaOpen && (
                    <div
                      id="products-mega-menu"
                      ref={megaRef}
                      role="menu"
                      aria-label="Product categories"
                      onMouseEnter={openMega}
                      onMouseLeave={closeMegaSoon}
                      className="absolute left-1/2 top-full z-10 mt-3 w-[32rem] -translate-x-1/2 rounded-card border border-brand-500/25 bg-white p-6 shadow-lg"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-500/60">Categories</p>
                          <ul className="space-y-0.5">
                            {productMegaMenu.categories.map((cat) => (
                              <li key={cat.slug}>
                                <Link
                                  to={`/products?category=${cat.slug}`}
                                  role="menuitem"
                                  className="-mx-3 block rounded-lg px-3 py-2 transition-colors hover:bg-brand-50"
                                >
                                  <span className="block text-sm font-medium text-ink-700">{cat.label}</span>
                                  <span className="block text-xs text-ink-500">{cat.hint}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-ink-900 via-clinical-800 to-brand-700 p-5 text-white">
                          <p className="font-mono text-xs uppercase tracking-wide text-clinical-300">{productMegaMenu.featured.eyebrow}</p>
                          <p className="mt-2 font-display text-lg font-semibold text-balance">{productMegaMenu.featured.title}</p>
                          <p className="mt-1.5 text-sm text-white/70">{productMegaMenu.featured.description}</p>
                          <Link
                            to={productMegaMenu.featured.href}
                            role="menuitem"
                            className="link-underline mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clinical-300"
                          >
                            {productMegaMenu.featured.cta}
                            <Icon name="ArrowRight" size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={r.path}
                  to={r.path}
                  end={r.path === '/'}
                  className={({ isActive }) =>
                    ['relative rounded-full px-4 py-2 text-sm font-medium transition-colors', isActive ? 'text-brand-700' : 'text-ink-700 hover:bg-brand-50 hover:text-brand-700'].join(
                      ' ',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {r.label}
                      {isActive && <GradientUnderline />}
                    </>
                  )}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              ref={drawerTriggerRef}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink-700 hover:bg-brand-50 lg:hidden"
            >
              <Icon name="Menu" size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={closeDrawer} />
          <div
            id="mobile-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onPointerDown={(e) => {
              touchStartX.current = e.clientX
            }}
            onPointerUp={(e) => {
              if (touchStartX.current != null && e.clientX - touchStartX.current > 60) closeDrawer()
              touchStartX.current = null
            }}
            className={[
              'absolute inset-y-0 right-0 flex h-full w-80 max-w-[85vw] flex-col bg-brand-50 p-6 shadow-lg',
              reducedMotion ? '' : 'animate-drawer-in',
            ].join(' ')}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-ink-700">Menu</span>
              <button type="button" onClick={closeDrawer} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-brand-500/20">
                <Icon name="X" size={22} />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-6 flex flex-1 flex-col overflow-y-auto">
              {routes.map((r) => (
                <div key={r.path}>
                  <div className="flex items-center">
                    <NavLink
                      to={r.path}
                      end={r.path === '/'}
                      className={({ isActive }) =>
                        ['flex-1 rounded-lg px-3 py-3.5 text-base font-medium transition-colors hover:bg-white', isActive ? 'bg-white text-brand-700' : 'text-ink-700'].join(' ')
                      }
                    >
                      {r.label}
                    </NavLink>
                    {r.path === '/products' && (
                      <button
                        type="button"
                        aria-expanded={drawerProductsOpen}
                        aria-label="Toggle product categories"
                        onClick={() => setDrawerProductsOpen((o) => !o)}
                        className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white"
                      >
                        <Icon name="ChevronDown" size={18} className={['transition-transform', drawerProductsOpen ? 'rotate-180' : ''].join(' ')} />
                      </button>
                    )}
                  </div>
                  {r.path === '/products' && drawerProductsOpen && (
                    <ul className="ml-3 space-y-0.5 border-l border-ink-500/10 pl-4">
                      {productMegaMenu.categories.map((cat) => (
                        <li key={cat.slug}>
                          <Link
                            to={`/products?category=${cat.slug}`}
                            className="block rounded-lg px-3 py-2.5 text-sm text-ink-500 hover:bg-white hover:text-brand-700"
                          >
                            {cat.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>

          </div>
        </div>
      )}
    </>
  )
}
