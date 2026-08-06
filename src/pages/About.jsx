import { EditorialHero } from '../components/organisms/HeroVariants'
import { Reveal } from '../components/molecules/Reveal'
import { Card } from '../components/molecules/Card'
import { PullQuote } from '../components/molecules/PullQuote'
import { Eyebrow } from '../components/atoms/Eyebrow'
import { Button } from '../components/atoms/Button'
import { Icon } from '../components/atoms/Icon'
import { company } from '../data/company'

// content-visibility:auto was tried here for below-fold sections (Part C10)
// but removed: it demonstrably skipped rendering below-fold content during
// automated full-page capture (screenshot tools, and by extension any
// context that renders the page without genuine incremental scrolling --
// print/PDF export, some crawlers). Not worth the risk for a page this size.
const BELOW_FOLD = ''

// ---- Section 2: Mission pull-quote --------------------------------------
function MissionQuote() {
  return (
    <section aria-label="Our mission" className={['bg-white pb-20 pt-14 sm:pb-28 sm:pt-16', BELOW_FOLD].join(' ')}>
      <Reveal direction="scale" className="mx-auto max-w-4xl px-6">
        <PullQuote>
          We believe pharmaceutical distribution should be{' '}
          <strong>boring, predictable and rigorously verified</strong> — not exciting. Trust is built one confirmed
          batch at a time.
        </PullQuote>
      </Reveal>
    </section>
  )
}

// ---- Section 3: Story timeline (the only vertical timeline on site) ----
function StoryTimeline() {
  return (
    <section aria-label="Our story" className={['bg-white py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <Eyebrow>Our story</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
            Fifteen years, <span className="text-brand-700">five milestones.</span>
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <span aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-px bg-brand-500 sm:left-1/2" />
          <ol className="space-y-12">
            {company.timeline.map((item, i) => {
              const isEven = i % 2 === 0
              const content = (
                <div>
                  <p className="font-mono text-sm text-brand-700">{item.year}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink-700">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-500">{item.description}</p>
                </div>
              )
              return (
                <Reveal as="li" key={item.year} direction={isEven ? 'left' : 'right'} delay={i * 70} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-500 ring-4 ring-white sm:left-1/2"
                  />
                  <div className="pl-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:pl-0">
                    {isEven ? (
                      <>
                        <div className="sm:text-right">{content}</div>
                        <div aria-hidden="true" className="hidden sm:block" />
                      </>
                    ) : (
                      <>
                        <div aria-hidden="true" className="hidden sm:block" />
                        <div>{content}</div>
                      </>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

// ---- Section 4: Values grid ---------------------------------------------
function ValuesGrid() {
  return (
    <section aria-label="Our values" className={['bg-brand-100 py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>What we stand for</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
            Four commitments <span className="text-[1.1em] text-brand-700">that don&rsquo;t change.</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {company.values.map((value, i) => (
            <Reveal key={value.title} direction="up" delay={i * 90}>
              <Card hover variant="outline" className="h-full p-6">
                <Icon name={value.icon} size={26} className="text-brand-600" />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-700">{value.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{value.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- Section 5: Our expertise (replaces leadership — no invented faces) -
function ExpertiseSection() {
  return (
    <section aria-label="Our expertise" className={['mx-auto max-w-7xl px-6 py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <Reveal>
        <Eyebrow>Our expertise</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-display-2 font-display font-semibold text-ink-700 text-balance">
          Capability, <span className="text-brand-700">not headcount.</span>
        </h2>
        <p className="mt-4 max-w-[60ch] text-ink-500">
          We describe our team by what it can do — four disciplines that cover every stage from sourcing to
          delivery.
        </p>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {company.expertise.map((item, i) => (
          <Reveal key={item.title} direction={i % 2 === 0 ? 'left' : 'right'} delay={Math.floor(i / 2) * 90}>
            <Card variant="outline" hover className="flex h-full gap-4 p-6">
              <Icon name={item.icon} size={24} className="mt-0.5 shrink-0 text-brand-600" />
              <div>
                <h3 className="font-display text-lg font-semibold text-ink-700">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-500">{item.description}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ---- Section 6: Numbers strip (distinct from Home's band — unity via ---
// ---- Fraunces + mono, variation via inline/bordered, no count-up) ------
function NumbersStrip() {
  return (
    <section aria-label="ElixaMed by the numbers" className={['bg-brand-500 py-16', BELOW_FOLD].join(' ')}>
      <Reveal
        as="div"
        direction="scale"
        className="mx-auto flex max-w-4xl flex-wrap justify-center gap-y-8 px-6 sm:flex-nowrap sm:divide-x sm:divide-ink-500/15"
      >
        {company.stats.about.map((stat) => (
          <div key={stat.label} className="flex-1 px-8 text-center">
            <p className="font-display text-3xl font-semibold text-ink-900">
              {stat.value}
              {stat.suffix}
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink-900/70">{stat.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

// ---- Section 7: Facility / infrastructure split -------------------------
function FacilitySplit() {
  return (
    <section aria-label="Our facility" className={['bg-white py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal direction="left">
          <Eyebrow>Infrastructure</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
            One warehouse, <span className="text-[1.1em] text-brand-700">five product categories.</span>
          </h2>
          <p className="mt-4 max-w-[52ch] text-ink-500">
            Our Chennai warehouse holds dedicated, temperature-monitored storage for oral solids, oral liquids,
            topicals, sterile injectables and nutraceuticals — each handled to its own storage requirement.
          </p>
        </Reveal>
        <Reveal direction="right" delay={70}>
          <figure>
            <img
              src="/images/wholesale-forklift-pallets.jpg"
              alt="Forklift moving palletized stock through warehouse racking"
              loading="lazy"
              width={1800}
              height={1400}
              className="aspect-[8/5] w-full rounded-card object-cover shadow-md"
            />
            <figcaption className="mt-3 font-mono text-xs uppercase tracking-wide text-ink-500/60">
              FIG. 01 — Distribution warehouse, Chennai
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

// ---- Section 8: CTA ------------------------------------------------------
function PartnerCTA() {
  return (
    <section aria-label="Partner with us" className={['mx-auto max-w-7xl px-6 py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <Reveal direction="scale">
        <Card variant="outline" className="flex flex-col items-start gap-6 p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-display-3 font-display font-semibold text-ink-700 text-balance">Partner with us.</h2>
            <p className="mt-2 max-w-[52ch] text-ink-500">Whether it&rsquo;s a first bulk order or a standing supply account, our team is ready to talk.</p>
          </div>
          <span className="gradient-border-run shrink-0 rounded-btn p-[3px]">
            <Button to="/contact" icon="ArrowRight">
              Get in touch
            </Button>
          </span>
        </Card>
      </Reveal>
    </section>
  )
}

export default function About() {
  return (
    <>
      <EditorialHero />
      <MissionQuote />
      <StoryTimeline />
      <ValuesGrid />
      <ExpertiseSection />
      <NumbersStrip />
      <FacilitySplit />
      <PartnerCTA />
    </>
  )
}
