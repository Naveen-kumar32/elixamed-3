import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Eyebrow } from '../atoms/Eyebrow'
import { Icon } from '../atoms/Icon'
import { LEGAL_UPDATED } from '../../data/legal'

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/**
 * Long-form legal document: soft-wash header, sticky table of contents on
 * desktop, numbered sections. Content lives in src/data/legal.js.
 */
export function LegalPage({ doc, eyebrow, otherLink }) {
  useEffect(() => {
    const prev = document.title
    document.title = `${doc.title} — Elixamed Lifecare`
    return () => {
      document.title = prev
    }
  }, [doc.title])

  return (
    <>
      <header className="bg-gradient-to-br from-brand-100 via-brand-50 to-clinical-50">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-display-2 font-display font-semibold text-ink-700 text-balance">{doc.title}</h1>
          <p className="mt-4 max-w-[62ch] text-body-lg text-ink-500">{doc.intro}</p>
          <p className="mt-6 font-mono text-xs uppercase tracking-wide text-ink-500/70">Last updated: {LEGAL_UPDATED}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-500/60">On this page</p>
            <ol className="mt-4 space-y-2 border-l border-ink-500/10 text-sm">
              {doc.sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${slugify(s.heading)}`} className="-ml-px block border-l border-transparent pl-4 text-ink-500 hover:border-brand-500 hover:text-brand-700">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <article className="max-w-[68ch]">
          {doc.sections.map((s, i) => (
            <section
              key={s.heading}
              id={slugify(s.heading)}
              aria-labelledby={`${slugify(s.heading)}-h`}
              className={[
                'scroll-mt-28',
                i > 0 ? 'mt-12' : '',
                s.highlight ? 'rounded-card border border-brand-500/25 bg-brand-50 p-6 sm:p-8' : '',
              ].join(' ')}
            >
              <h2 id={`${slugify(s.heading)}-h`} className="flex items-baseline gap-3 font-display text-2xl font-semibold text-ink-700">
                <span className="font-mono text-sm text-brand-600">{String(i + 1).padStart(2, '0')}</span>
                {s.heading}
              </h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-ink-500">
                  {p}
                </p>
              ))}
              {s.points && (
                <ul className="mt-4 space-y-2.5">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex gap-3 leading-relaxed text-ink-500">
                      <Icon name="Check" size={18} className="mt-1 shrink-0 text-brand-600" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink-500/10 pt-8 text-sm">
            <Link to={otherLink.to} className="link-underline inline-flex items-center gap-1.5 font-medium text-brand-700">
              {otherLink.label} <Icon name="ArrowRight" size={15} />
            </Link>
            <Link to="/contact" className="link-underline inline-flex items-center gap-1.5 font-medium text-brand-700">
              Contact us <Icon name="ArrowRight" size={15} />
            </Link>
          </div>
        </article>
      </div>
    </>
  )
}
