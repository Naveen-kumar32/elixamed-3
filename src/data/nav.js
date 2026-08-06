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

// Products mega menu — categories (left column) + one featured capability
// (right column). Category slugs must match src/data/products.js categories.
export const productMegaMenu = {
  categories: [
    { slug: 'oral-solids', label: 'Oral Solids', hint: 'Tablets & capsules' },
    { slug: 'oral-liquids', label: 'Oral Liquids', hint: 'Syrups & suspensions' },
    { slug: 'topical', label: 'Topical', hint: 'Ointments, creams & gels' },
    { slug: 'sterile-injectables', label: 'Sterile Injectables', hint: 'IV infusions & injections' },
    { slug: 'nutraceuticals', label: 'Nutraceuticals', hint: 'Supplements & wellness' },
  ],
  featured: {
    eyebrow: 'Flagship category',
    title: 'Sterile Injectables',
    description: 'Cold-chain verified storage and handling — our most temperature-sensitive category.',
    href: '/products?category=sterile-injectables',
    cta: 'Explore sterile injectables',
  },
}
