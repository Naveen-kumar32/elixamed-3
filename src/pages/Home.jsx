import { Link } from 'react-router-dom'
import { HomeHero } from '../components/organisms/HeroVariants'
import { FAQSection } from '../components/organisms/FAQSection'
import { NewsletterBand } from '../components/organisms/NewsletterBand'
import { Reveal } from '../components/molecules/Reveal'
import { StatBlock } from '../components/molecules/StatBlock'
import { Card } from '../components/molecules/Card'
import { Eyebrow } from '../components/atoms/Eyebrow'
import { Button } from '../components/atoms/Button'
import { Icon } from '../components/atoms/Icon'
import { Divider } from '../components/atoms/Divider'
import { NoiseOverlay } from '../components/atoms/NoiseOverlay'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { company } from '../data/company'
import { categories } from '../data/products'
import { faqs } from '../data/faqs'

// content-visibility:auto was tried here for below-fold sections (Part C10)
// but removed: it demonstrably skipped rendering below-fold content during
// automated full-page capture (screenshot tools, and by extension any
// context that renders the page without genuine incremental scrolling --
// print/PDF export, some crawlers). Not worth the risk for a page this size.
const BELOW_FOLD = ''

// ---- Section 2: Trust ticker -------------------------------------------
function TrustTicker() {
  const reducedMotion = usePrefersReducedMotion()
  const items = company.trustTicker

  return (
    <section aria-label="Certifications and partners" className={['border-y border-brand-700/20 bg-brand-500 py-6 text-ink-900', BELOW_FOLD].join(' ')}>
      <div className="group overflow-hidden">
        {reducedMotion ? (
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 px-6">
            {items.map((item) => (
              <span key={item} className="whitespace-nowrap font-mono text-sm uppercase tracking-wide text-ink-900/80">
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
            {[...items, ...items].map((item, i) => (
              <span key={`${item}-${i}`} className="whitespace-nowrap font-mono text-sm uppercase tracking-wide text-ink-900/80">
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ---- Section 3: "What we do" bento grid --------------------------------
function handleSpotlight(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
}

function BentoCell({ tone = 'light', running = false, className = '', children }) {
  const toneClasses = tone === 'dark' ? 'border-transparent bg-ink-900 text-white' : 'border-brand-500/20 bg-brand-50/80'
  return (
    <div className={[running ? 'gradient-border-run rounded-none p-[3px]' : '', 'h-full'].join(' ')}>
      <div
        onMouseMove={handleSpotlight}
        className={[
          'spotlight h-full border p-7 shadow-xs transition-shadow duration-300 hover:shadow-md',
          running ? 'rounded-none' : 'rounded-card',
          tone === 'dark' || running ? '' : 'colorful-hover',
          running ? 'border-transparent' : toneClasses,
          running ? (tone === 'dark' ? 'bg-ink-900 text-white' : 'bg-white') : '',
          className,
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  )
}

function WhatWeDoBento() {
  return (
    <section aria-label="What we do" className={['mx-auto max-w-7xl px-6 py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <Reveal>
        <Eyebrow>What we do</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-display-2 font-display font-semibold text-ink-700 text-balance">
          Five categories, one <span className="text-[1.1em] text-brand-700">verified</span> supply chain.
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
        <Reveal direction="left" className="lg:col-span-6">
          {/* Running border — the one flagship cell earns the Von Restorff treatment */}
          <BentoCell running>
            <Icon name="Syringe" size={28} className="text-clinical-600" />
            <p className="mt-4 font-mono text-xs uppercase tracking-wide text-ink-500/60">Flagship category</p>
            <h3 className="mt-2 text-xl font-display font-semibold text-ink-700">Sterile Injectables</h3>
            <p className="mt-2 max-w-[46ch] text-ink-500">
              Small-volume injections and large-volume IV infusions, held and moved under validated cold-chain
              conditions — our most temperature-sensitive category.
            </p>
            <Link to="/products?category=sterile-injectables" className="link-underline mt-4 inline-flex items-center gap-1.5 font-medium text-brand-700">
              Explore the category <Icon name="ArrowRight" size={15} />
            </Link>
          </BentoCell>
        </Reveal>

        <Reveal direction="right" className="lg:col-span-3" delay={70}>
          <BentoCell>
            <p className="font-mono text-xs uppercase tracking-wide text-ink-500/60">Live stat</p>
            <p className="mt-3 text-display-2 font-display font-semibold text-ink-700">99.4%</p>
            <p className="mt-1 text-sm text-ink-500">Verified batch compliance</p>
          </BentoCell>
        </Reveal>

        <Reveal direction="right" className="lg:col-span-3" delay={140}>
          <BentoCell>
            <Icon name="BadgeCheck" size={26} className="text-brand-600" />
            <p className="mt-3 font-display text-lg font-semibold text-ink-700">Wholesale Licensed</p>
            <p className="mt-1 text-sm text-ink-500">Every consignment GDP-verified before dispatch.</p>
          </BentoCell>
        </Reveal>

        <Reveal direction="scale" className="lg:col-span-4" delay={210}>
          <BentoCell>
            <Icon name="Pill" size={24} className="text-clinical-600" />
            <p className="mt-3 font-display text-lg font-semibold text-ink-700">Oral Solids</p>
            <p className="mt-1 text-sm text-ink-500">Tablets & capsules</p>
            <Link to="/products?category=oral-solids" className="link-underline mt-3 inline-block text-sm font-medium text-brand-700">
              Browse →
            </Link>
          </BentoCell>
        </Reveal>

        <Reveal direction="scale" className="lg:col-span-4" delay={280}>
          <BentoCell>
            <Icon name="FlaskConical" size={24} className="text-clinical-600" />
            <p className="mt-3 font-display text-lg font-semibold text-ink-700">Nutraceuticals</p>
            <p className="mt-1 text-sm text-ink-500">Supplements & wellness</p>
            <Link to="/products?category=nutraceuticals" className="link-underline mt-3 inline-block text-sm font-medium text-brand-700">
              Browse →
            </Link>
          </BentoCell>
        </Reveal>

        <Reveal direction="up" className="lg:col-span-4" delay={350}>
          <BentoCell tone="dark">
            <Icon name="ShieldCheck" size={24} className="text-clinical-300" />
            <p className="mt-3 font-display text-lg font-semibold text-white">Quality, in full</p>
            <p className="mt-1 text-sm text-white/70">Certifications, testing standards, traceability.</p>
            <Link to="/quality" className="link-underline mt-3 inline-block text-sm font-medium text-clinical-300">
              See our process →
            </Link>
          </BentoCell>
        </Reveal>
      </div>
    </section>
  )
}

// ---- Section 4: Why ElixaMed (moved up — leads with the strongest real
// ---- photograph right after the bento grid, golden-ratio 62/38 split) --
function WhyElixaMed() {
  return (
    <section aria-label="Why ElixaMed" className={['bg-clinical-800 py-24 text-white sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1.618fr_1fr] lg:items-center lg:gap-16">
        <Reveal direction="left">
          <img
            src="/images/wholesale-team-clipboard.jpg"
            alt="Two colleagues verifying stock together in a warehouse aisle"
            loading="lazy"
            width={1800}
            height={1400}
            className="aspect-[6/7] w-full max-w-lg rounded-card object-cover shadow-md sm:aspect-[4/3] lg:aspect-[6/7]"
          />
        </Reveal>
        <Reveal direction="right" delay={100}>
          <Eyebrow tone="onDark">Why ElixaMed</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-white text-balance">
            Built for partners who <span className="text-brand-100">audit</span> before they order.
          </h2>
          <ul className="mt-8 space-y-5">
            {company.values.map((value) => (
              <li key={value.title} className="flex gap-3">
                <Icon name="CheckCircle2" size={20} className="mt-0.5 shrink-0 text-brand-100" />
                <div>
                  <p className="font-medium text-white">{value.title}</p>
                  <p className="text-sm text-white/70">{value.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

// ---- Section 5: Stats band ---------------------------------------------
function StatsBand() {
  return (
    <section aria-label="Key numbers" className={['relative overflow-hidden bg-brand-500 py-24 text-ink-900 sm:py-32', BELOW_FOLD].join(' ')}>
      <NoiseOverlay />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <Divider variant="gradient" className="mb-10" />
        </Reveal>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {company.stats.home.map((stat, i) => (
            <Reveal key={stat.label} direction={i % 2 === 0 ? 'up' : 'scale'} delay={i * 70}>
              <StatBlock value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} label={stat.label} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- Section 6: Product categories preview -----------------------------
function ProductCategoriesPreview() {
  const featured = ['oral-solids', 'sterile-injectables', 'nutraceuticals'].map((slug) => categories.find((c) => c.slug === slug))
  const directions = ['left', 'up', 'right']

  return (
    <section aria-label="Product categories" className={['bg-clinical-800 py-24 text-white sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Catalogue</Eyebrow>
            <h2 className="mt-3 text-display-2 font-display font-semibold text-white text-balance">
              Distributed across <span className="text-[1.1em] text-brand-100">five categories.</span>
            </h2>
          </div>
          <Link to="/products" className="link-underline hidden items-center gap-1.5 font-medium text-brand-100 sm:inline-flex">
            View all products <Icon name="ArrowRight" size={16} />
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {featured.map((cat, i) => (
            <Reveal key={cat.slug} direction={directions[i]} delay={i * 70}>
              <Card hover variant="outline" as={Link} to={`/products?category=${cat.slug}`} className="block h-full p-7">
                <Icon name="Layers" size={26} className="text-clinical-600" />
                <h3 className="mt-4 text-lg font-display font-semibold text-ink-700">{cat.label}</h3>
                <p className="mt-1 text-sm text-ink-500">{cat.hint}</p>
                <p className="mt-3 text-sm text-ink-500">{cat.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Link to="/products" className="link-underline mt-8 inline-flex items-center gap-1.5 font-medium text-brand-100 sm:hidden">
          View all products <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </section>
  )
}

// ---- Section 7: Process teaser (steps 1–4 of 6, Zeigarnik) -------------
function ProcessTeaser() {
  const steps = company.processSteps.slice(0, 4)
  return (
    <section aria-label="Our process" className={['bg-brand-100 py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
            From enquiry <span className="text-brand-700">to supply.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} direction="up" delay={i * 90} className="relative">
              <p className="font-display text-3xl font-semibold text-brand-600/70">{step.number}</p>
              <h3 className="mt-3 font-medium text-ink-700">{step.title}</h3>
              <p className="mt-1 text-sm text-ink-500">{step.description}</p>
              {i < steps.length - 1 && <span aria-hidden="true" className="absolute -right-4 top-4 hidden h-px w-8 bg-ink-500/20 sm:block" />}
            </Reveal>
          ))}
        </div>

        <Reveal delay={280}>
          <Link to="/services" className="link-underline mt-10 inline-flex items-center gap-1.5 font-medium text-brand-700">
            See the full six-stage process <Icon name="ArrowRight" size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// ---- Section 9: Newsletter ----------------------------------------------
function NewsletterSection() {
  return (
    <section aria-label="Newsletter signup" className={['bg-white py-20', BELOW_FOLD].join(' ')}>
      <Reveal direction="scale" className="mx-auto max-w-2xl px-6 text-center">
        <Eyebrow className="justify-center">Stay updated</Eyebrow>
        <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
          Occasional notes, <span className="text-brand-700">no spam.</span>
        </h2>
        <p className="mt-3 text-ink-500">New capabilities, certifications and process updates — a few times a year.</p>
        <NewsletterBand className="mx-auto mt-8 max-w-md" />
      </Reveal>
    </section>
  )
}

// ---- Section 10: Final CTA ----------------------------------------------
function FinalCTA() {
  return (
    <section aria-label="Get in touch" className={['relative overflow-hidden bg-ink-900 py-24 text-center text-white sm:py-32', BELOW_FOLD].join(' ')}>
      <NoiseOverlay />
      <Reveal direction="scale" className="relative mx-auto max-w-2xl px-6">
        <h2 className="text-display-2 font-display font-semibold text-white text-balance">Ready to talk sourcing, supply, or documentation?</h2>
        <p className="mt-4 text-white/70">Our team responds within one business day.</p>
        <span className="gradient-border-run mt-8 inline-block rounded-btn p-[3px]">
          <Button to="/contact" variant="onDark" icon="ArrowRight">
            Get in touch
          </Button>
        </span>
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustTicker />
      <WhatWeDoBento />
      <WhyElixaMed />
      <StatsBand />
      <ProductCategoriesPreview />
      <ProcessTeaser />
      <FAQSection
        eyebrow="FAQ"
        title="Common questions"
        items={faqs.general}
        viewAllHref="/contact"
        viewAllLabel="More questions? Talk to us"
        className={['mx-auto max-w-7xl px-6 py-24 sm:py-32', BELOW_FOLD].join(' ')}
      />
      <NewsletterSection />
      <FinalCTA />
    </>
  )
}
