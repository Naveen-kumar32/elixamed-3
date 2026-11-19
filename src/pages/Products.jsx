import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigationType, useSearchParams } from 'react-router-dom'
import { CompactHero } from '../components/organisms/HeroVariants'
import { FilterBar } from '../components/organisms/FilterBar'
import { FAQSection } from '../components/organisms/FAQSection'
import { Reveal } from '../components/molecules/Reveal'
import { Card } from '../components/molecules/Card'
import { Eyebrow } from '../components/atoms/Eyebrow'
import { Badge } from '../components/atoms/Badge'
import { Button } from '../components/atoms/Button'
import { Icon } from '../components/atoms/Icon'
import { Skeleton } from '../components/atoms/Skeleton'
import { NoiseOverlay } from '../components/atoms/NoiseOverlay'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { categories, products, formatINR, categorySummary, priceListNote, orderTerms } from '../data/products'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { faqs } from '../data/faqs'

// content-visibility:auto was tried here for below-fold sections (Part C10)
// but removed: it demonstrably skipped rendering below-fold content during
// automated full-page capture (screenshot tools, and by extension any
// context that renders the page without genuine incremental scrolling --
// print/PDF export, some crawlers). Not worth the risk for a page this size.
const BELOW_FOLD = ''
const PAGE_SIZE = 24

const categoryOf = (slug) => categories.find((c) => c.slug === slug)

function computeResults(category, query) {
  let list = products
  if (category !== 'all') list = list.filter((p) => p.category === category)
  if (query.trim()) {
    const q = query.trim().toLowerCase()
    list = list.filter((p) => [p.name, p.molecule, p.brand, categoryOf(p.category)?.label].some((field) => field?.toLowerCase().includes(q)))
  }
  // Price-list order (S.No) — already grouped by category.
  return [...list].sort((a, b) => a.sno - b.sno)
}

// Production-shaped async loader: no real product API exists in this
// build, so this always resolves. Swapping in a real endpoint later means
// replacing only this function's body — the loading/error/retry states
// below already work correctly against it.
function fakeLoadProducts(category, query) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(computeResults(category, query)), 300)
  })
}

const FORM_ICON = { Tablet: 'Pill', Bottle: 'FlaskConical', Powder: 'Package', Tin: 'Package' }

/** Packshot if we have one, otherwise a neutral branded tile (never a fake photo). */
function ProductImage({ product, className = '' }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={`${product.name} pack`}
        loading="lazy"
        width={500}
        height={500}
        className={['aspect-square w-full object-contain', className].join(' ')}
      />
    )
  }
  const cat = categoryOf(product.category)
  return (
    <div
      role="img"
      aria-label={`${product.name} — photo not available`}
      className={[
        'flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-brand-50 via-white to-clinical-50 p-6 text-center',
        className,
      ].join(' ')}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-clinical-600 shadow-xs">
        <Icon name={FORM_ICON[product.form] || cat?.icon || 'Syringe'} size={26} />
      </span>
      <span className="font-display text-lg font-semibold leading-tight text-ink-700">{product.name}</span>
      <span className="font-mono text-[0.7rem] uppercase tracking-wide text-ink-500/70">
        {product.brand} · {product.form}
      </span>
    </div>
  )
}

function PriceBlock({ product, size = 'md' }) {
  return (
    <div>
      <p className={['font-display font-semibold text-ink-700', size === 'lg' ? 'text-2xl text-brand-700' : 'text-lg'].join(' ')}>
        {formatINR(product.offerPrice)}
        <span className="ml-1 font-sans text-xs font-normal text-ink-500/70">+ GST</span>
      </p>
      <p className="text-xs text-ink-500/70">
        MRP <span className="line-through">{formatINR(product.mrp)}</span>
      </p>
    </div>
  )
}

function ProductCard({ product, onOpen }) {
  const cat = categoryOf(product.category)
  return (
    <Card variant="outline" hover className="flex h-full flex-col overflow-hidden p-0">
      <button type="button" onClick={() => onOpen(product)} aria-label={`View details for ${product.name}`} className="block bg-white p-4">
        <ProductImage product={product} />
      </button>
      <div className="flex flex-1 flex-col border-t border-ink-500/10 p-5">
        <Badge variant="clinical" mono className="self-start">
          {cat?.label}
        </Badge>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink-700">{product.name}</h3>
        <p className="mt-1 text-sm text-ink-500">{product.molecule}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Badge variant="neutral">{product.form}</Badge>
          <Badge variant="neutral">{product.brand}</Badge>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <PriceBlock product={product} />
          <button
            type="button"
            onClick={() => onOpen(product)}
            className="link-underline inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-700"
          >
            Details <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </div>
    </Card>
  )
}

/** Price-list view — mirrors the printed product list (S.No … Offer Price). */
function PriceListTable({ items, onOpen }) {
  return (
    <div className="overflow-x-auto rounded-card border border-brand-500/25 bg-white shadow-md">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <caption className="sr-only">Product price list</caption>
        <thead>
          <tr className="bg-brand-500 text-[#1A1F23]">
            <th scope="col" className="px-4 py-3 font-semibold">S.No</th>
            <th scope="col" className="px-4 py-3 font-semibold">Brand</th>
            <th scope="col" className="px-4 py-3 font-semibold">Product</th>
            <th scope="col" className="px-4 py-3 font-semibold">Molecule</th>
            <th scope="col" className="px-4 py-3 font-semibold">Form</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">MRP (₹)</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">Offer Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p, i) => {
            const prev = items[i - 1]
            const newGroup = !prev || prev.category !== p.category
            return [
              newGroup && (
                <tr key={`${p.category}-head`} className="bg-brand-50">
                  <th scope="colgroup" colSpan={7} className="px-4 py-2.5 font-display text-base font-semibold text-brand-700">
                    {categoryOf(p.category)?.title}
                  </th>
                </tr>
              ),
              <tr key={p.id} className="border-b border-ink-500/10 last:border-0 hover:bg-brand-50/60">
                <td className="px-4 py-2.5 font-mono text-ink-500/70">{p.sno}</td>
                <td className="px-4 py-2.5 text-ink-500">{p.brand}</td>
                <th scope="row" className="px-4 py-2.5 font-medium text-ink-700">
                  <button type="button" onClick={() => onOpen(p)} className="link-underline text-left hover:text-brand-700">
                    {p.name}
                  </button>
                </th>
                <td className="px-4 py-2.5 text-ink-500">{p.molecule}</td>
                <td className="px-4 py-2.5 text-ink-500">{p.form}</td>
                <td className="px-4 py-2.5 text-right font-mono text-ink-500 tabular-nums">{formatINR(p.mrp).slice(1)}</td>
                <td className="px-4 py-2.5 text-right font-mono font-semibold text-ink-700 tabular-nums">{formatINR(p.offerPrice).slice(1)}</td>
              </tr>,
            ]
          })}
        </tbody>
      </table>
    </div>
  )
}

/** Product detail sheet: price-list facts + (where listed) the IndiaMART spec table. */
function ProductDialog({ product, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  useFocusTrap(dialogRef, { active: !!product, onEscape: onClose })

  useEffect(() => {
    if (!product) return undefined
    const prevOverflow = document.body.style.overflow
    const prevFocus = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [product])

  if (!product) return null
  const cat = categoryOf(product.category)
  const enquiryHref = `/contact?subject=products&product=${encodeURIComponent(`${product.name} (${product.molecule})`)}`
  const rows = [
    ['Brand', product.brand],
    ['Molecule', product.molecule],
    ['Form', product.form],
    ['Category', cat?.title],
    ...(product.moq ? [['Minimum order', product.moq]] : []),
    ...product.specs,
  ]

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" aria-label="Close details" className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-dialog-title"
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-card bg-white shadow-lg sm:rounded-card"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink-700 shadow-xs hover:bg-brand-50"
        >
          <Icon name="X" size={20} />
        </button>
        <div className="grid flex-1 grid-cols-1 overflow-y-auto md:grid-cols-[2fr_3fr]">
          <div className="flex items-start justify-center border-b border-ink-500/10 bg-white p-6 md:border-b-0 md:border-r">
            <ProductImage product={product} className="max-w-xs md:sticky md:top-0" />
          </div>
          <div className="p-6 sm:p-8">
            <Badge variant="clinical" mono>
              {cat?.label}
            </Badge>
            <h2 id="product-dialog-title" className="mt-3 pr-8 font-display text-2xl font-semibold text-ink-700 text-balance">
              {product.name}
            </h2>
            <p className="mt-1 text-ink-500">{product.molecule}</p>
            <div className="mt-4">
              <PriceBlock product={product} size="lg" />
            </div>
            <p className="mt-2 text-xs text-ink-500/60">{priceListNote}</p>

            <table className="mt-6 w-full border-collapse text-left text-sm">
              <caption className="sr-only">Details for {product.name}</caption>
              <tbody>
                {rows.map(([label, value]) => (
                  <tr key={label} className="border-b border-ink-500/10 last:border-0">
                    <th scope="row" className="w-2/5 py-2.5 pr-4 align-top font-normal text-ink-500">
                      {label}
                    </th>
                    <td className="py-2.5 font-medium text-ink-700">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {product.description && <p className="mt-6 leading-relaxed text-ink-500">{product.description}</p>}

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={enquiryHref} icon="ArrowRight">
                Request a quote
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-card border border-ink-500/10">
          <Skeleton className="aspect-square w-full rounded-none" />
          <div className="p-5">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="mt-3 h-5 w-2/3" />
            <Skeleton className="mt-2 h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null
  return (
    <nav aria-label="Product pages" className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-500/15 text-ink-700 disabled:opacity-30"
      >
        <Icon name="ChevronLeft" size={18} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === page ? 'page' : undefined}
          onClick={() => onPageChange(p)}
      className={[
        'flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors',
        p === page ? 'bg-brand-500 text-[#1A1F23]' : 'text-ink-500 hover:bg-brand-50 hover:text-brand-700',
          ].join(' ')}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-500/15 text-ink-700 disabled:opacity-30"
      >
        <Icon name="ChevronRight" size={18} />
      </button>
    </nav>
  )
}

// ---- Section 4: Category directory --------------------------------------
function CategoryExplainer({ onSelect }) {
  return (
    <section aria-label="Category details" className={['bg-white py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>Categories in depth</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
            {categories.length} therapeutic <span className="text-[1.1em] text-brand-700">categories.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const sum = categorySummary(cat.slug)
            return (
              <Reveal key={cat.slug} direction="up" delay={(i % 3) * 70}>
                <Card variant="outline" hover className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-clinical-600">
                      <Icon name={cat.icon} size={22} />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wide text-ink-500/60">
                      {sum.count} product{sum.count === 1 ? '' : 's'}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink-700">{cat.title}</h3>
                  <p className="mt-2 text-sm text-ink-500">{cat.description}</p>
                  <p className="mt-3 text-xs text-ink-500/70">
                    Offer from {formatINR(sum.minOffer)} · {sum.forms.join(', ')}
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelect(cat.slug)}
                    className="link-underline mt-auto inline-flex items-center gap-1.5 self-start pt-4 text-sm font-medium text-brand-700"
                  >
                    View {cat.label.toLowerCase()} <Icon name="ArrowRight" size={14} />
                  </button>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ---- Section 5: Categories at a glance (computed from the price list) ----
function ComparisonTable() {
  return (
    <section aria-label="Categories at a glance" className={['bg-brand-100 py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>Compare</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
            Categories <span className="text-brand-700">at a glance.</span>
          </h2>
        </Reveal>

        <Reveal delay={70} className="mt-10 overflow-x-auto rounded-card border border-brand-500/25 bg-white shadow-md">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-brand-500/25">
                {['Category', 'Products', 'Forms', 'Brands', 'Offer price range'].map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={['p-4 font-mono text-xs uppercase tracking-wide text-brand-700', i === 0 ? 'sticky left-0 z-10 bg-white' : ''].join(' ')}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => {
                const sum = categorySummary(cat.slug)
                return (
                  <tr key={cat.slug} className="border-b border-ink-500/10 last:border-0 hover:bg-brand-50/70">
                    <th scope="row" className="sticky left-0 z-10 bg-white p-4 font-medium text-ink-700">
                      {cat.label}
                    </th>
                    <td className="p-4 font-mono text-ink-500">{sum.count}</td>
                    <td className="p-4 text-ink-500">{sum.forms.join(', ')}</td>
                    <td className="p-4 text-ink-500">{sum.brands.join(', ')}</td>
                    <td className="whitespace-nowrap p-4 font-mono text-ink-500">
                      {sum.minOffer === sum.maxOffer ? formatINR(sum.minOffer) : `${formatINR(sum.minOffer)} – ${formatINR(sum.maxOffer)}`}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Reveal>
        <p className="mt-4 text-xs text-ink-500/70">{priceListNote}</p>
      </div>
    </section>
  )
}

// ---- Section 6: Quality cross-link band ----------------------------------
function QualityCrossLink() {
  return (
    <section aria-label="Quality assurance" className={['relative overflow-hidden bg-ink-900 py-16 text-white', BELOW_FOLD].join(' ')}>
      <NoiseOverlay />
      <Reveal className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <Icon name="ShieldCheck" size={32} className="shrink-0 text-clinical-300" />
          <div>
            <h2 className="font-display text-xl font-semibold text-white">Every batch verified before it ships.</h2>
            <p className="mt-1 text-sm text-white/70">Certifications, testing standards and traceability — see our full quality process.</p>
          </div>
        </div>
        <Link to="/quality" className="link-underline inline-flex shrink-0 items-center gap-1.5 font-medium text-clinical-300">
          Visit Quality <Icon name="ArrowRight" size={16} />
        </Link>
      </Reveal>
    </section>
  )
}

// ---- Section 7: Ordering / how to procure --------------------------------
const PROCURE_STEPS = [
  { icon: 'MessageCircle', title: 'Enquire', description: 'Tell us what you need — product, quantity, timeline.' },
  { icon: 'FileCheck2', title: 'Quote', description: 'We confirm feasibility and share formal pricing.' },
  { icon: 'Package', title: 'Supply', description: 'Production begins on a committed delivery schedule.' },
]

function ProcureSteps() {
  return (
    <section aria-label="How to procure" className={['bg-white py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>How to procure</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
            Three steps to a <span className="text-brand-700">standing order.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {PROCURE_STEPS.map((step, i) => (
            <Reveal key={step.title} direction={i === 0 ? 'left' : i === PROCURE_STEPS.length - 1 ? 'right' : 'up'} delay={i * 90} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-[#1A1F23]">
                <Icon name={step.icon} size={22} />
              </div>
              <p className="mt-4 font-mono text-xs uppercase tracking-wide text-ink-500/60">Step {i + 1}</p>
              <h3 className="mt-1 font-display text-lg font-semibold text-ink-700">{step.title}</h3>
              <p className="mt-1 text-sm text-ink-500">{step.description}</p>
              {i < PROCURE_STEPS.length - 1 && (
                <span aria-hidden="true" className="absolute -right-4 top-6 hidden h-px w-8 bg-ink-500/20 sm:block" />
              )}
            </Reveal>
          ))}
        </div>
        <Reveal delay={210} className="mt-12 rounded-card border border-brand-500/25 bg-brand-50 p-6 sm:p-8">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-ink-700">
            <Icon name="ReceiptText" size={20} className="text-brand-600" />
            Terms &amp; conditions
          </h3>
          <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-ink-500 marker:font-mono marker:text-brand-700">
            {orderTerms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-ink-500/70">{priceListNote}</p>
          <Link to="/terms" className="link-underline mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
            Read the full Terms &amp; Conditions <Icon name="ArrowRight" size={14} />
          </Link>
        </Reveal>
        <Reveal delay={260}>
          <Button to="/contact?subject=products" icon="ArrowRight" className="mt-10">
            Start an enquiry
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

// ---- Section 9: CTA -------------------------------------------------------
function RequestListCTA() {
  return (
    <section aria-label="Request product list" className={['mx-auto max-w-7xl px-6 py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <Reveal direction="scale">
        <Card variant="outline" className="flex flex-col items-start gap-6 p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-display-3 font-display font-semibold text-ink-700 text-balance">Need the full product list?</h2>
            <p className="mt-2 max-w-[52ch] text-ink-500">We&rsquo;ll send the current price list with MRP and offer prices for all {products.length} products.</p>
          </div>
          <span className="gradient-border-run shrink-0 rounded-btn p-[3px]">
            <Button to="/contact?subject=products" icon="ArrowRight">
              Request product list
            </Button>
          </span>
        </Card>
      </Reveal>
    </section>
  )
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [rawQuery, setRawQuery] = useState('')
  const [query, setQuery] = useState('')
  // The URL's ?category= is the single source of truth. Previously this was
  // copied into state once on mount, so clicking a mega-menu / Home category
  // link while already on /products changed the URL but not the grid.
  const paramCategory = searchParams.get('category')
  const category = categories.some((c) => c.slug === paramCategory) ? paramCategory : 'all'
  const setCategory = useCallback(
    (next) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev)
          if (next === 'all') params.delete('category')
          else params.set('category', next)
          return params
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('loading') // loading | success | error
  const [results, setResults] = useState([])
  const [retryToken, setRetryToken] = useState(0)
  const [openProduct, setOpenProduct] = useState(null)
  const [view, setView] = useState('grid') // grid | table
  const reducedMotion = usePrefersReducedMotion()
  const gridRef = useRef(null)

  // Debounce the search box so filtering/skeleton doesn't fire per keystroke.
  useEffect(() => {
    const t = setTimeout(() => setQuery(rawQuery), 300)
    return () => clearTimeout(t)
  }, [rawQuery])

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    fakeLoadProducts(category, query)
      .then((list) => {
        if (cancelled) return
        setResults(list)
        setStatus('success')
        setPage(1)
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [category, query, retryToken])

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const pageClamped = Math.min(page, totalPages)
  const pageItems = useMemo(() => results.slice((pageClamped - 1) * PAGE_SIZE, pageClamped * PAGE_SIZE), [results, pageClamped])

  const location = useLocation()
  const navigationType = useNavigationType()

  const scrollToCatalogue = useCallback(() => {
    gridRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
  }, [reducedMotion])

  // Arriving via a category link (mega menu, mobile drawer, Home cards) is a
  // PUSH navigation carrying ?category= — bring the filtered grid into view
  // so the click has a visible result instead of landing on the hero.
  // In-page filter changes use replace, so they never trigger this.
  useEffect(() => {
    if (navigationType !== 'PUSH' || !paramCategory) return undefined
    // Defer past PageTransition's scroll-to-top, which runs after this effect.
    const t = setTimeout(scrollToCatalogue, 80)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key])

  const handlePageChange = (next) => {
    setPage(next)
    gridRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
  }

  const clearFilters = () => {
    setCategory('all')
    setRawQuery('')
  }

  return (
    <>
      <CompactHero
        query={rawQuery}
        onQueryChange={setRawQuery}
        products={products}
        onSubmit={(value) => {
          setQuery(value) // skip the debounce — results are wanted now
          // Suggestions span every category; if the active category filter
          // would hide the match, widen to All rather than show "No matches".
          if (category !== 'all' && computeResults(category, value).length === 0 && computeResults('all', value).length > 0) {
            setCategory('all')
          }
          scrollToCatalogue()
        }}
      />

      <section aria-label="Filter and browse products" ref={gridRef} className="scroll-mt-24 bg-brand-50/80 pb-12 pt-8 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <FilterBar
            categories={categories}
            activeCategory={category}
            onCategoryChange={setCategory}
            searchQuery={rawQuery}
            onClearSearch={() => setRawQuery('')}
            resultCount={results.length}
            totalCount={products.length}
          />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-ink-500/70">{priceListNote}</p>
            <div role="group" aria-label="Display as" className="inline-flex rounded-full border border-ink-500/15 bg-white p-1">
              {[
                { value: 'grid', label: 'Cards', icon: 'LayoutGrid' },
                { value: 'table', label: 'Price list', icon: 'Table2' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={view === opt.value}
                  onClick={() => setView(opt.value)}
                  className={[
                    'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                    view === opt.value ? 'bg-brand-500 text-[#1A1F23]' : 'text-ink-500 hover:text-brand-700',
                  ].join(' ')}
                >
                  <Icon name={opt.icon} size={15} />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            {status === 'loading' && <GridSkeleton />}

            {status === 'error' && (
              <div role="alert" className="rounded-card border border-red-200 bg-red-50 p-12 text-center">
                <Icon name="AlertCircle" size={28} className="mx-auto text-red-600" />
                <p className="mt-3 font-medium text-red-700">Couldn&rsquo;t load products.</p>
                <button type="button" onClick={() => setRetryToken((t) => t + 1)} className="mt-4 font-medium text-red-700 underline">
                  Try again
                </button>
              </div>
            )}

            {status === 'success' && results.length === 0 && (
              <div className="rounded-card border border-ink-500/10 bg-white p-12 text-center">
                <Icon name="SlidersHorizontal" size={28} className="mx-auto text-ink-500/40" />
                <p className="mt-3 font-medium text-ink-700">No matches — clear filters</p>
                <button type="button" onClick={clearFilters} className="mt-4 rounded-btn bg-brand-500 px-5 py-2.5 text-sm font-medium text-[#1A1F23]">
                  Clear filters
                </button>
              </div>
            )}

            {status === 'success' && results.length > 0 && view === 'table' && <PriceListTable items={results} onOpen={setOpenProduct} />}

            {status === 'success' && results.length > 0 && view === 'grid' && (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {pageItems.map((product) => (
                    <ProductCard key={product.id} product={product} onOpen={setOpenProduct} />
                  ))}
                </div>
                <Pagination page={pageClamped} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            )}
          </div>
        </div>
      </section>

      <CategoryExplainer
        onSelect={(slug) => {
          setCategory(slug)
          scrollToCatalogue()
        }}
      />
      <ComparisonTable />
      <QualityCrossLink />
      <ProcureSteps />
      <FAQSection
        eyebrow="FAQ"
        title="Procurement questions"
        items={faqs.products}
        className={['mx-auto max-w-7xl px-6 py-24 sm:py-32', BELOW_FOLD].join(' ')}
      />
      <RequestListCTA />
      <ProductDialog product={openProduct} onClose={() => setOpenProduct(null)} />
    </>
  )
}
