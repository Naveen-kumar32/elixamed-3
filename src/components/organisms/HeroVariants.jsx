import { useEffect, useId, useRef, useState } from 'react'
import { Eyebrow } from '../atoms/Eyebrow'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
import { Input } from '../atoms/Input'
import { NoiseOverlay } from '../atoms/NoiseOverlay'
import { Card } from '../molecules/Card'
import { Reveal } from '../molecules/Reveal'
import { ImageCrossfade } from '../molecules/ImageCrossfade'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { company } from '../../data/company'

/** Home — full-bleed banner photo + scrim, rule-of-thirds headline, floating glass stat card. */
export function HomeHero() {
  const reducedMotion = usePrefersReducedMotion()
  const washRef = useRef(null)

  useEffect(() => {
    if (reducedMotion) return undefined
    let frame = null
    const onScroll = () => {
      if (frame != null) return
      frame = requestAnimationFrame(() => {
        frame = null
        if (washRef.current) washRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.3}px, 0)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame != null) cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  return (
    <section aria-label="Introduction" className="relative overflow-hidden pb-24 pt-32 text-white sm:pb-32 sm:pt-40">
      {/* Banner photo — real facility photograph (Unsplash License, free for
          commercial use), not the previous abstract wash. CSS background
          rather than <img>: it's a full-bleed decorative backdrop stretched
          to cover a fluid-height section, not content with an intrinsic
          aspect ratio. */}
      <div
        ref={washRef}
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/home-hero-facility.jpg')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900/95 via-ink-900/85 to-ink-900/55" />
      <NoiseOverlay />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <Eyebrow tone="onDark">{company.eyebrow}</Eyebrow>
          <h1
            className={[
              'mt-5 text-display-1 font-display font-semibold leading-[1.05] text-white text-balance',
              reducedMotion ? '' : 'animate-opsz',
            ].join(' ')}
          >
            Pharmaceutical distribution, <span className="text-[1.1em] text-clinical-300">delivered with trust.</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-body-lg leading-[1.7] text-white/80">
            86 hospital and critical-care products across eleven therapeutic categories, sourced from certified
            manufacturers and supplied to 40+ partners across Tamil Nadu — every batch verified before it ships.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button to="/products" icon="ArrowRight" variant="onDark">
              Explore products
            </Button>
            <Button to="/contact" variant="ghostOnDark">
              Talk to our team
            </Button>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <Card variant="glass" className={['ml-auto max-w-sm p-6', reducedMotion ? '' : 'animate-float'].join(' ')}>
            <p className="font-mono text-xs uppercase tracking-wide text-brand-700">Batch compliance rate</p>
            <p className="mt-2 text-display-1 font-display font-semibold text-ink-700">99.4%</p>
            <p className="mt-1 text-sm text-ink-500">Verified against manufacturer certification, every batch, no exceptions.</p>
          </Card>
        </div>
      </div>
    </section>
  )
}

/**
 * Shared split-hero template for About / Products / Services / Contact.
 * The desktop image is the clipped right-side surface itself, so every
 * inner hero has one consistent height and no floating white-framed photo.
 */
function SplitHero({ eyebrowIcon, eyebrowLabel, heading, description, images, children }) {
  return (
    <section
      aria-label={`${eyebrowLabel} introduction`}
      className="split-hero-frame relative overflow-hidden pb-12 pt-16 sm:pb-16 sm:pt-20 xl:h-[34rem] xl:pb-0 xl:pt-0"
    >
      <div aria-hidden="true" className="split-hero-media hidden xl:block">
        <ImageCrossfade images={images} className="h-full w-full" imgClassName="object-cover object-center" />
      </div>
      <div aria-hidden="true" className="split-hero-seam hidden xl:block" />
      <NoiseOverlay />
      <div className="split-hero-content relative z-10 mx-auto flex max-w-7xl flex-col px-6 xl:h-full xl:justify-center">
        <Reveal direction="left" className="relative z-10 py-4 xl:w-[54%] xl:py-0">
          <div className="flex items-center gap-2">
            <Icon name={eyebrowIcon} size={18} className="text-brand-600" />
            <span className="font-mono text-eyebrow font-semibold uppercase tracking-[0.14em] text-clinical-800">{eyebrowLabel}</span>
          </div>
          <h1 className="mt-5 text-display-1 font-display font-semibold leading-[1.05] text-ink-900 text-balance">{heading}</h1>
          <p className="mt-6 max-w-[52ch] text-body-lg leading-[1.7] text-ink-700/85">{description}</p>
          {children}
        </Reveal>

        <Reveal direction="right" delay={120} className="relative mt-8 xl:hidden">
          <div className="relative aspect-[6/5] w-full overflow-hidden rounded-card ring-4 ring-white/25 shadow-lg md:aspect-[16/9]">
            <ImageCrossfade images={images} className="h-full w-full" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/45 via-transparent to-brand-500/10" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** About — split hero, distribution-team photography crossfade. */
export function EditorialHero() {
  return (
    <SplitHero
      eyebrowIcon="Building2"
      eyebrowLabel="About Us"
      heading={
        <>
          Fifteen years of pharmaceutical distribution, <span className="text-[1.12em] text-brand-700">built on trust.</span>
        </>
      }
      description="ElixaMed began by supplying a single retailer in Chennai. Today, we source 86 hospital and critical-care products across eleven therapeutic categories from certified manufacturers and deliver to 40+ retail partners."
      images={[
        { src: '/images/wholesale-warehouse-aisle.jpg', alt: 'Rows of stocked warehouse shelving' },
        { src: '/images/wholesale-team-clipboard.jpg', alt: 'Two colleagues reviewing stock in a warehouse aisle' },
        { src: '/images/wholesale-aisle-motion.jpg', alt: 'Staff moving through a distribution warehouse' },
      ]}
    />
  )
}

/** Products — split hero, catalogue framing, running-border search box. */
export function CompactHero({ query, onQueryChange, onSubmit, products = [] }) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const listboxId = useId()
  const inputRef = useRef(null)

  const trimmed = query.trim().toLowerCase()
  const suggestions = trimmed
    ? products.filter((p) => [p.name, p.molecule, p.brand].some((f) => f?.toLowerCase().includes(trimmed))).slice(0, 6)
    : []

  useEffect(() => {
    setActiveIndex(-1)
  }, [query])

  const selectSuggestion = (product) => {
    onQueryChange(product.name)
    setOpen(false)
    onSubmit?.(product.name)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        selectSuggestion(suggestions[activeIndex])
      } else {
        // Plain Enter: jump to the (already filtering) results grid.
        setOpen(false)
        onSubmit?.(query)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <SplitHero
      eyebrowIcon="Package"
      eyebrowLabel="Catalogue"
      heading={
        <>
          {products.length} products, <span className="text-[1.12em] text-brand-700">ready to supply.</span>
        </>
      }
      description="Search by brand, molecule or product name, then filter by category below."
      images={[
        { src: '/images/wholesale-forklift-pallets.jpg', alt: 'Forklift moving pallets in a warehouse racking aisle' },
        { src: '/images/wholesale-warehouse-aisle.jpg', alt: 'Rows of stocked warehouse shelving' },
        { src: '/images/wholesale-loading-dock.jpg', alt: 'Forklift loading a pallet through a truck loading dock' },
      ]}
    >
      <div className="relative mt-6 max-w-md">
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>
        {/* Running gradient border — Von Restorff emphasis on the one
            control most worth noticing first on this page. */}
        <div className="gradient-border-run rounded-btn p-[3px]">
          <div className="relative rounded-[7px] bg-white">
            <Icon name="Search" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-500/50" />
            <Input
              id="product-search"
              ref={inputRef}
              role="combobox"
              aria-expanded={open && suggestions.length > 0}
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-activedescendant={activeIndex >= 0 ? `product-option-${activeIndex}` : undefined}
              value={query}
              onChange={(e) => {
                onQueryChange(e.target.value)
                setOpen(true)
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 120)}
              onKeyDown={onKeyDown}
              placeholder="Search e.g. teicoplanin, Enoxaflo…"
              autoComplete="off"
              className="border-0 pl-11"
            />
          </div>
        </div>
        {open && suggestions.length > 0 && (
          <ul
            id={listboxId}
            role="listbox"
            aria-label="Product suggestions"
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-card border border-ink-500/10 bg-white shadow-lg"
          >
            {suggestions.map((p, i) => (
              <li
                key={p.id}
                id={`product-option-${i}`}
                role="option"
                aria-selected={i === activeIndex}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectSuggestion(p)}
                onMouseEnter={() => setActiveIndex(i)}
                className={['cursor-pointer px-4 py-2.5 text-sm', i === activeIndex ? 'bg-brand-50 text-brand-700' : 'text-ink-700'].join(
                  ' ',
                )}
              >
                {p.name} <span className="text-ink-500/60">— {p.molecule}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SplitHero>
  )
}

/** Services — split hero, "end-to-end" wholesale framing. */
export function ProcessHero() {
  return (
    <SplitHero
      eyebrowIcon="Truck"
      eyebrowLabel="Services"
      heading={
        <>
          Distribution services, <span className="text-[1.12em] text-brand-700">from sourcing to shelf.</span>
        </>
      }
      description="New accounts and standing orders follow the same disciplined six-stage process."
      images={[
        { src: '/images/wholesale-truck-loading.jpg', alt: 'Workers loading a delivery truck with cargo' },
        { src: '/images/wholesale-loading-dock.jpg', alt: 'Forklift loading a pallet through a truck loading dock' },
        { src: '/images/wholesale-forklift-pallets.jpg', alt: 'Forklift moving pallets in a warehouse racking aisle' },
      ]}
    />
  )
}

/** Quality — dark hero, morphing-blob backdrop (paused under reduced motion). */
export function DarkHero({ eyebrow, title, description }) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section aria-label="Quality introduction" className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-brand-700 to-clinical-800 pb-24 pt-32 text-white sm:pb-28 sm:pt-40">
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <path
          d="M180 120C360 20 620 40 780 160C980 300 1040 520 860 660C660 800 320 760 160 600C20 460 40 200 180 120Z"
          fill="#00ABC2"
          className={reducedMotion ? undefined : 'animate-blob'}
          style={reducedMotion ? { opacity: 0.08 } : undefined}
        />
        <path
          d="M260 200C480 80 760 140 900 300C1040 460 980 640 780 700C580 760 320 700 200 560C90 430 80 300 260 200Z"
          fill="#F47920"
          className={reducedMotion ? undefined : 'animate-blob [animation-delay:-6s]'}
          style={reducedMotion ? { opacity: 0 } : undefined}
        />
      </svg>
      <NoiseOverlay />

      <Reveal direction="scale" className="relative mx-auto max-w-4xl px-6 text-center">
        <Eyebrow tone="onDark" className="justify-center">
          {eyebrow}
        </Eyebrow>
        <h1 className="mt-5 text-display-1 font-display font-semibold leading-[1.05] text-white text-balance">{title}</h1>
        <p className="mx-auto mt-6 max-w-[56ch] text-body-lg text-white/70">{description}</p>
      </Reveal>
    </section>
  )
}

/** Contact — split hero, immediate anchor-jump to the form. */
export function MicroHero({ anchor = '#contact-form' }) {
  return (
    <SplitHero
      eyebrowIcon="MessageCircle"
      eyebrowLabel="Contact"
      heading={
        <>
          Let&rsquo;s <span className="text-[1.15em] text-brand-700">talk.</span>
        </>
      }
      description="Whether you're a retailer placing a first order or a manufacturer looking to partner — we usually respond within one business day."
      images={[
        { src: '/images/wholesale-team-clipboard.jpg', alt: 'Two colleagues reviewing stock in a warehouse aisle' },
        { src: '/images/wholesale-aisle-motion.jpg', alt: 'Staff moving through a distribution warehouse' },
        { src: '/images/wholesale-warehouse-aisle.jpg', alt: 'Rows of stocked warehouse shelving' },
      ]}
    >
      <a href={anchor} className="link-underline mt-6 inline-flex items-center gap-1.5 font-mono text-sm uppercase tracking-wide text-brand-700">
        Jump to form
        <Icon name="ArrowRight" size={15} />
      </a>
    </SplitHero>
  )
}
