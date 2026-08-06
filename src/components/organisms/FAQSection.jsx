import { Link } from 'react-router-dom'
import { Eyebrow } from '../atoms/Eyebrow'
import { Icon } from '../atoms/Icon'
import { Accordion } from '../molecules/Accordion'

/**
 * Eyebrow + heading + Accordion, with an optional "view all" link. Reused
 * (with different `items`) on Home, Products, Services and Contact.
 */
export function FAQSection({
  id,
  eyebrow = 'FAQ',
  title = 'Frequently asked questions',
  items,
  viewAllHref,
  viewAllLabel = 'All FAQs',
  className = '',
}) {
  return (
    <section id={id} aria-label={title} className={className}>
      <div className="mx-auto max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">{title}</h2>

        <Accordion className="mt-8 border-t border-ink-500/10">
          {items.map((item) => (
            <Accordion.Item key={item.q} question={item.q}>
              {item.a}
            </Accordion.Item>
          ))}
        </Accordion>

        {viewAllHref && (
          <div className="mt-8">
            <Link to={viewAllHref} className="link-underline inline-flex items-center gap-1.5 font-medium text-brand-700">
              {viewAllLabel}
              <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
