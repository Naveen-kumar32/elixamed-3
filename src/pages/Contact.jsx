import { MicroHero } from '../components/organisms/HeroVariants'
import { ContactCard } from '../components/organisms/ContactCard'
import { FAQSection } from '../components/organisms/FAQSection'
import { Reveal } from '../components/molecules/Reveal'
import { QuickActionChip } from '../components/molecules/QuickActionChip'
import { Eyebrow } from '../components/atoms/Eyebrow'
import { Icon } from '../components/atoms/Icon'
import { company } from '../data/company'
import { faqs } from '../data/faqs'

// content-visibility:auto was tried here for below-fold sections (Part C10)
// but removed: it demonstrably skipped rendering below-fold content during
// automated full-page capture (screenshot tools, and by extension any
// context that renders the page without genuine incremental scrolling --
// print/PDF export, some crawlers). Not worth the risk for a page this size.
const BELOW_FOLD = ''
const MAPS_HREF = company.address.mapHref || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address.mapQuery)}`

// ---- Section 2: Quick-action chips ---------------------------------------
function QuickActions() {
  return (
    <section aria-label="Quick actions" className="bg-white py-8">
      <Reveal direction="up" className="mx-auto flex max-w-7xl flex-wrap gap-3 px-6">
        <QuickActionChip icon="Phone" label="Call us" href={`tel:${company.phone.href}`} />
        <QuickActionChip icon="Mail" label="Email us" href={`mailto:${company.email.href}`} />
        <QuickActionChip icon="Navigation" label="Get directions" href={MAPS_HREF} />
      </Reveal>
    </section>
  )
}

// ---- Section 4: Map / directions split -----------------------------------
function MapSplit() {
  return (
    <section aria-label="Location" className={['bg-white py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal direction="left">
          <Eyebrow>Location</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
            Find us <span className="text-brand-700">in Chennai.</span>
          </h2>
          <p className="mt-4 text-ink-500">
            {company.address.line1}
            <br />
            {company.address.line2}
          </p>
          <a
            href={MAPS_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-6 inline-flex items-center gap-1.5 font-medium text-brand-700"
          >
            Get directions <Icon name="ArrowUpRight" size={16} />
          </a>
        </Reveal>
        <Reveal direction="right" delay={100}>
          <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" aria-label="Open our location in Google Maps" className="block">
            <img
              src="/illustrations/contact-map.svg"
              alt=""
              loading="lazy"
              width={800}
              height={480}
              className="aspect-[5/3] w-full rounded-card object-cover shadow-md transition-opacity hover:opacity-90"
            />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

// ---- Section 5: Office hours + response time -----------------------------
function HoursSection() {
  return (
    <section aria-label="Office hours" className={['bg-brand-500 py-20 text-ink-900', BELOW_FOLD].join(' ')}>
      <Reveal direction="scale" className="mx-auto max-w-2xl px-6 text-center">
        <Eyebrow className="justify-center">Office hours</Eyebrow>
        <div className="mx-auto mt-6 inline-flex flex-col gap-2 text-left">
          {company.hours.map((h) => (
            <div key={h.days} className="flex justify-between gap-8 text-sm">
              <span className="text-ink-900/75">{h.days}</span>
              <span className="font-medium text-ink-900">{h.time}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 font-medium text-ink-900">
          <Icon name="Clock4" size={18} />
          {company.responseTime}
        </p>
      </Reveal>
    </section>
  )
}

export default function Contact() {
  return (
    <>
      <MicroHero anchor="#contact-form" />
      <QuickActions />

      <section aria-label="Contact form" className="bg-white px-6 pb-24 sm:pb-32">
        <Reveal direction="scale" className="mx-auto max-w-5xl">
          <ContactCard />
        </Reveal>
      </section>

      <MapSplit />
      <HoursSection />

      <FAQSection
        eyebrow="FAQ"
        title="Before you reach out"
        items={faqs.contact}
        className={['mx-auto max-w-7xl px-6 py-24 sm:py-32', BELOW_FOLD].join(' ')}
      />
    </>
  )
}
