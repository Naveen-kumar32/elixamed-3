import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../../data/company'
import { routes } from '../../data/nav'
import { Icon } from '../atoms/Icon'
import { NewsletterBand } from './NewsletterBand'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function BackToTop() {
  const [visible, setVisible] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-white shadow-lg transition-transform duration-200 hover:-translate-y-1"
    >
      <Icon name="ArrowUp" size={20} />
    </button>
  )
}

/**
 * Global footer: brand / sitemap / contact / newsletter, legal strip, and
 * a Fitts-friendly 48px back-to-top button pinned bottom-right.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      <footer className="relative bg-ink-900 text-white/70">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div>
              <Link to="/" className="flex items-center">
                <img
                  src="/images/icon/Elixamed%202000x500.png"
                  alt="ElixaMed Lifecare Private Limited"
                  width={2000}
                  height={500}
                  className="h-12 w-auto max-w-[13rem] object-contain"
                />
              </Link>
              <p className="mt-4 max-w-[32ch] text-sm leading-relaxed">{company.tagline}</p>
            </div>

            <nav aria-label="Footer sitemap">
              <p className="font-mono text-xs uppercase tracking-wide text-clinical-300">Sitemap</p>
              <ul className="mt-4 space-y-2.5">
                {routes.map((r) => (
                  <li key={r.path}>
                    <Link to={r.path} className="link-underline text-sm text-white/70 hover:text-white">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-clinical-300">Contact</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <Icon name="MapPin" size={16} className="mt-0.5 shrink-0 text-clinical-300" />
                  <span>
                    {company.address.line1}
                    <br />
                    {company.address.line2}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon name="Phone" size={16} className="mt-0.5 shrink-0 text-clinical-300" />
                  <span>
                    <a href={`tel:${company.phone.href}`} className="link-underline hover:text-white">
                      {company.phone.display}
                    </a>
                    <br />
                    <a href={`tel:${company.mobile.href}`} className="link-underline hover:text-white">
                      {company.mobile.display}
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="Mail" size={16} className="shrink-0 text-clinical-300" />
                  <a href={`mailto:${company.email.href}`} className="link-underline hover:text-white">
                    {company.email.display}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-clinical-300">Stay updated</p>
              <p className="mt-4 text-sm">Occasional notes on new capabilities and certifications. No spam.</p>
              <NewsletterBand variant="compact" tone="onDark" className="mt-4" />
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8 text-xs text-white/50">
            <dl className="flex flex-wrap gap-x-6 gap-y-2 font-mono uppercase tracking-wide">
              {company.statutory.map((d) => (
                <div key={d.label} className="flex gap-1.5">
                  <dt>{d.label}:</dt>
                  <dd className="text-white/75">{d.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {year} {company.legalName}. All rights reserved.
              </p>
              <nav aria-label="Legal" className="flex gap-5">
                <Link to="/terms" className="link-underline hover:text-white">
                  Terms &amp; Conditions
                </Link>
                <Link to="/privacy" className="link-underline hover:text-white">
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
      <BackToTop />
    </>
  )
}
