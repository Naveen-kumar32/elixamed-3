import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigationType, useSearchParams } from 'react-router-dom'
import { CompactHero } from '../components/organisms/HeroVariants'
import { FilterBar } from '../components/organisms/FilterBar'
import { FAQSection } from '../components/organisms/FAQSection'
import { Reveal } from '../components/molecules/Reveal'
import { Card } from '../components/molecules/Card'
import { Accordion } from '../components/molecules/Accordion'
import { Eyebrow } from '../components/atoms/Eyebrow'
import { Badge } from '../components/atoms/Badge'
import { Button } from '../components/atoms/Button'
import { Icon } from '../components/atoms/Icon'
import { Skeleton } from '../components/atoms/Skeleton'
import { NoiseOverlay } from '../components/atoms/NoiseOverlay'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { categories, products, comparisonAttributes, comparisonData } from '../data/products'
import { faqs } from '../data/faqs'

// content-visibility:auto was tried here for below-fold sections (Part C10)
// but removed: it demonstrably skipped rendering below-fold content during
// automated full-page capture (screenshot tools, and by extension any
// context that renders the page without genuine incremental scrolling --
// print/PDF export, some crawlers). Not worth the risk for a page this size.
const BELOW_FOLD = ''
const PAGE_SIZE = 12

const CATEGORY_IMAGE = {
  'oral-solids': '/images/category-oral-solids.jpg',
  'oral-liquids': '/images/category-oral-liquids.jpg',
  topical: '/images/category-topical.jpg',
  'sterile-injectables': '/images/category-sterile.jpg',
  nutraceuticals: '/images/category-nutraceuticals.jpg',
}

function computeResults(category, query) {
  let list = products
  if (category !== 'all') list = list.filter((p) => p.category === category)
  if (query.trim()) {
    const q = query.trim().toLowerCase()
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.generic.toLowerCase().includes(q))
  }
  return [...list].sort((a, b) => a.name.localeCompare(b.name))
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

function ProductCard({ product }) {
  const cat = categories.find((c) => c.slug === product.category)
  return (
    <Card variant="outline" hover className="flex h-full flex-col overflow-hidden p-0">
      <img
        src={CATEGORY_IMAGE[product.category]}
        alt=""
        loading="lazy"
        width={900}
        height={900}
        className="aspect-square w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <Badge variant="clinical" mono>
          {cat?.label}
        </Badge>
        <h3 className="mt-3 font-display text-lg font-semibold text-ink-700">{product.name}</h3>
        <p className="mt-1 text-sm text-ink-500">{product.generic}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.packSizes.map((size) => (
            <Badge key={size} variant="neutral">
              {size}
            </Badge>
          ))}
        </div>
        <p className="mt-auto pt-3 text-xs uppercase tracking-wide text-ink-500/50">{product.form}</p>
      </div>
    </Card>
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

// ---- Section 4: Category explainer band ---------------------------------
function CategoryExplainer() {
  return (
    <section aria-label="Category details" className={['bg-white py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>Categories in depth</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
            What each <span className="text-[1.1em] text-brand-700">category includes.</span>
          </h2>
        </Reveal>

        <div className="mt-14 space-y-16">
          {categories.map((cat, i) => {
            const isEven = i % 2 === 0
            return (
              <Reveal
                key={cat.slug}
                direction={isEven ? 'left' : 'right'}
                className={['grid grid-cols-1 gap-10 lg:items-center lg:gap-16', isEven ? 'lg:grid-cols-[1.618fr_1fr]' : 'lg:grid-cols-[1fr_1.618fr]'].join(
                  ' ',
                )}
              >
                <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                  <Badge variant="clinical" mono>
                    {cat.label}
                  </Badge>
                  <h3 className="mt-3 text-xl font-display font-semibold text-brand-700">{cat.hint}</h3>
                  <p className="mt-2 max-w-[56ch] text-ink-500">{cat.description}</p>
                  <Accordion.Item bare question="View specifications" className="mt-4 border-t border-ink-500/10">
                    <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                      {comparisonAttributes.map((attr) => (
                        <div key={attr.key} className="flex justify-between gap-4 border-b border-ink-500/5 py-1.5 text-sm sm:block sm:border-0 sm:py-0">
                          <dt className="text-ink-500/70">{attr.label}</dt>
                          <dd className="font-medium text-ink-700">{comparisonData[cat.slug][attr.key]}</dd>
                        </div>
                      ))}
                    </dl>
                  </Accordion.Item>
                </div>
                <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                  <img
                    src={CATEGORY_IMAGE[cat.slug]}
                    alt={`Representative product photography for the ${cat.label} category`}
                    loading="lazy"
                    width={900}
                    height={900}
                    className="mx-auto aspect-square w-full max-w-xs rounded-card object-cover shadow-md"
                  />
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ---- Section 5: Feature comparison table --------------------------------
function ComparisonTable() {
  return (
    <section aria-label="Feature comparison" className={['bg-brand-100 py-24 sm:py-32', BELOW_FOLD].join(' ')}>
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
                <th scope="col" className="sticky left-0 z-10 bg-white p-4 font-mono text-xs uppercase tracking-wide text-brand-700">
                  Attribute
                </th>
                {categories.map((cat) => (
                  <th key={cat.slug} scope="col" className="whitespace-nowrap p-4 font-medium text-ink-700">
                    {cat.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonAttributes.map((attr) => (
                <tr key={attr.key} className="border-b border-ink-500/10 last:border-0 hover:bg-brand-50/70">
                  <th scope="row" className="sticky left-0 z-10 bg-white p-4 font-medium text-ink-700 whitespace-nowrap">
                    {attr.label}
                  </th>
                  {categories.map((cat) => (
                    <td key={cat.slug} className="p-4 text-ink-500">
                      {comparisonData[cat.slug][attr.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
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
        <Reveal delay={210}>
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
            <p className="mt-2 max-w-[52ch] text-ink-500">We&rsquo;ll send specifications, pack sizes and MOQs for any category.</p>
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

          <div className="mt-8">
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

            {status === 'success' && results.length > 0 && (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {pageItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <Pagination page={pageClamped} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            )}
          </div>
        </div>
      </section>

      <CategoryExplainer />
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
    </>
  )
}
