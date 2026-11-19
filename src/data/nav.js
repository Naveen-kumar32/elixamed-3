import { categories, products } from './products'

// Central navigation model. Order is deliberate — serial-position effect:
// Products leads the non-Home items (best recall), Contact anchors the end
// (terminal, action-oriented). Breadcrumbs and the command palette both
// read from this file so route labels never drift out of sync.

export const routes = [
  { path: '/', label: 'Home', crumb: 'Home' },
  { path: '/products', label: 'Products', crumb: 'Products' },
  { path: '/services', label: 'Services', crumb: 'Services' },
  { path: '/about', label: 'About', crumb: 'About' },
  { path: '/quality', label: 'Quality', crumb: 'Quality' },
  { path: '/contact', label: 'Contact', crumb: 'Contact' },
]

// Products mega menu — categories (left) + one featured category (right).
// Built from src/data/products.js so labels and counts can never drift.

const countIn = (slug) => products.filter((p) => p.category === slug).length

export const productMegaMenu = {
  total: products.length,
  categories: categories.map((c) => ({ slug: c.slug, label: c.label, hint: `${countIn(c.slug)} products` })),
  featured: {
    eyebrow: 'Flagship range',
    title: 'Antibiotics',
    description: `${countIn('beta-lactams') + countIn('other-antibiotics')} products — meropenem, ceftazidime-avibactam, polymyxin B, colistimethate, vancomycin and more.`,
    href: '/products?category=beta-lactams',
    cta: 'Explore antibiotics',
  },
}
