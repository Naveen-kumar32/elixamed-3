import { ProcessHero } from '../components/organisms/HeroVariants'
import { ProcessRail } from '../components/organisms/ProcessRail'
import { LedgerList } from '../components/organisms/LedgerList'
import { FAQSection } from '../components/organisms/FAQSection'
import { Reveal } from '../components/molecules/Reveal'
import { Card } from '../components/molecules/Card'
import { Accordion } from '../components/molecules/Accordion'
import { Tabs } from '../components/molecules/Tabs'
import { QuickActionChip } from '../components/molecules/QuickActionChip'
import { Eyebrow } from '../components/atoms/Eyebrow'
import { Button } from '../components/atoms/Button'
import { Icon } from '../components/atoms/Icon'
import { useReveal } from '../hooks/useReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { company } from '../data/company'
import { faqs } from '../data/faqs'

// content-visibility:auto was tried here for below-fold sections (Part C10)
// but removed: it demonstrably skipped rendering below-fold content during
// automated full-page capture (screenshot tools, and by extension any
// context that renders the page without genuine incremental scrolling --
// print/PDF export, some crawlers). Not worth the risk for a page this size.
const BELOW_FOLD = ''
const DONUT_COLORS = ['#F47920', '#00ABC2', '#00606E', '#C2560B', '#7DDEE8']

// ElixaMed is a wholesale distributor, not a manufacturer — every service
// below is written from the distributor's side (sourcing, warehousing,
// dispatch, retailer support), not contract manufacturing.
const SERVICES = [
  {
    icon: 'ShoppingCart',
    title: 'Bulk Wholesale Supply',
    summary: 'Bulk sourcing and supply across all five categories, at wholesale pricing.',
    details: 'We hold verified stock across every category and fulfil bulk orders directly from our Chennai warehouse.',
  },
  {
    icon: 'Truck',
    title: 'Retailer & Pharmacy Distribution',
    summary: 'Reliable, scheduled delivery to retail pharmacies and medical stores.',
    details: 'Standing-order and one-off delivery routes across 15+ cities, with dedicated account support for every retail partner.',
  },
  {
    icon: 'ThermometerSnowflake',
    title: 'Cold-Chain Logistics',
    summary: 'Temperature-controlled storage and transport for sensitive formulations.',
    details: 'WHO-guideline cold-chain handling from warehouse to retailer, with a continuous temperature log for every shipment.',
  },
  {
    icon: 'Warehouse',
    title: 'Warehousing & Inventory',
    summary: 'Stock management and just-in-time replenishment for standing accounts.',
    details: 'Real-time stock visibility and reorder support, so retail partners rarely run out of fast-moving lines.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Sourcing & Vendor Verification',
    summary: 'Every product sourced from a verified, licensed manufacturer or super-stockist.',
    details: 'We check manufacturing licenses, GMP certification and batch documentation before any product enters our warehouse.',
  },
  {
    icon: 'Handshake',
    title: 'Credit & Account Support',
    summary: 'Flexible ordering and credit terms for standing retail accounts.',
    details: 'Dedicated account managers, flexible payment cycles and priority dispatch for long-term retail partners.',
  },
]

const CAPABILITY_TABS = [
  {
    title: 'Sourcing & Verification',
    description: 'We source across all five categories from certified manufacturers and super-stockists, verifying documentation before stock is accepted.',
    points: ['Manufacturer license & GMP certificate checked', 'Certificate of Analysis verified per batch', 'Grey-market and unverified supply refused'],
  },
  {
    title: 'Warehousing & Cold-Chain',
    description: 'Temperature-monitored storage across our Chennai warehouse, with dedicated cold-chain handling for sensitive formulations.',
    points: ['WHO cold-chain guideline compliance', 'Real-time stock visibility', '96% on-time dispatch'],
  },
  {
    title: 'Distribution & Retailer Support',
    description: 'Scheduled and on-demand delivery to 40+ retail partners, backed by dedicated account support.',
    points: ['15+ cities served', 'Standing-order replenishment', 'Dedicated account managers'],
  },
]

// ---- Section 2: Services overview grid -----------------------------------
function ServicesGrid() {
  return (
    <section aria-label="Our services" className={['bg-white pb-24 pt-16 sm:pb-32 sm:pt-20', BELOW_FOLD].join(' ')}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>What we offer</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
            Six services, <span className="text-[1.1em] text-brand-700">one accountable team.</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} direction={['left', 'up', 'right'][i % 3]} delay={Math.floor(i / 3) * 90 + (i % 3) * 60}>
              <Card variant="outline" hover className="h-full p-6">
                <Icon name={service.icon} size={26} className="text-brand-600" />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-700">{service.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{service.summary}</p>
                <Accordion.Item bare question="Details" className="mt-3 border-t border-ink-500/10">
                  <p className="text-sm text-ink-500">{service.details}</p>
                </Accordion.Item>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- Section 3: THE PROCESS RAIL ------------------------------------------
function ProcessRailSection() {
  return (
    <section aria-label="Our process, in detail" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>The process</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
            Six stages, <span className="text-brand-700">start to finish.</span>
          </h2>
          <p className="mt-3 max-w-[60ch] text-ink-500">Scroll horizontally, or use the arrow keys — Home and End jump to the first and last stage.</p>
        </Reveal>
        <div className="mt-10">
          <ProcessRail steps={company.processSteps} />
        </div>
      </div>
    </section>
  )
}

// ---- Section 4: Capability deep-dive tabs --------------------------------
function CapabilityTabs() {
  return (
    <section aria-label="Capability deep dive" className={['bg-brand-100 py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>Deep dive</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
            Three capabilities, <span className="text-brand-700">closer up.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <Reveal direction="left" className="lg:col-span-5">
            <img
              src="/images/wholesale-loading-dock.jpg"
              alt="Forklift loading a pallet through a warehouse truck loading dock"
              loading="lazy"
              width={1800}
              height={1400}
              className="aspect-[4/5] w-full rounded-card object-cover shadow-md"
            />
          </Reveal>

          <Reveal direction="right" delay={100} className="lg:col-span-7">
            <Tabs>
              <Tabs.List aria-label="Capabilities" className="flex gap-8 border-b border-ink-500/10">
                {CAPABILITY_TABS.map((tab, i) => (
                  <Tabs.Tab key={tab.title} index={i}>
                    {tab.title}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
              <Tabs.Panels className="mt-8 min-h-48">
                {CAPABILITY_TABS.map((tab, i) => (
                  <Tabs.Panel key={tab.title} index={i}>
                    <p className="max-w-[60ch] text-ink-500">{tab.description}</p>
                    <ul className="mt-5 space-y-3">
                      {tab.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-ink-700">
                          <Icon name="CheckCircle2" size={18} className="mt-0.5 shrink-0 text-clinical-600" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </Tabs.Panel>
                ))}
              </Tabs.Panels>
            </Tabs>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ---- Section 5: Data-viz band (hand-built SVG, from real stats only) ----
function DonutChart({ data }) {
  const [ref, isVisible] = useReveal({ threshold: 0.4 })
  const reducedMotion = usePrefersReducedMotion()
  const size = 220
  const stroke = 28
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const total = data.reduce((sum, d) => sum + d.value, 0)

  let cumulative = 0

  return (
    <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Distribution share by category">
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#0B2E33" strokeOpacity="0.06" strokeWidth={stroke} />
        {data.map((d, i) => {
          const segment = (d.value / total) * circumference
          const dashOffset = -cumulative
          cumulative += segment
          return (
            <circle
              key={d.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={DONUT_COLORS[i % DONUT_COLORS.length]}
              strokeWidth={stroke}
              strokeDashoffset={dashOffset}
              style={{
                strokeDasharray: isVisible || reducedMotion ? `${segment} ${circumference - segment}` : `0 ${circumference}`,
                transition: reducedMotion ? 'none' : `stroke-dasharray 900ms var(--ease-signature) ${i * 100}ms`,
              }}
            />
          )
        })}
      </g>
    </svg>
  )
}

function BarChart({ data }) {
  const [ref, isVisible] = useReveal({ threshold: 0.3 })
  const reducedMotion = usePrefersReducedMotion()
  const max = Math.max(...data.map((d) => d.value))

  return (
    <div ref={ref} className="space-y-4">
      {data.map((d, i) => (
        <div key={d.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium text-ink-700">{d.label}</span>
            <span className="font-mono text-ink-500/70">{d.value}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink-900/[0.06]">
            <div
              className="h-full rounded-full bg-clinical-600"
              style={{
                width: isVisible || reducedMotion ? `${(d.value / max) * 100}%` : '0%',
                transition: reducedMotion ? 'none' : `width 700ms var(--ease-signature) ${i * 90}ms`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function DataVizBand() {
  const data = company.categoryShare
  return (
    <section aria-label="Distribution share by category" className={['bg-gradient-to-br from-brand-200 via-brand-50 to-clinical-200 py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>By the numbers</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
            Where our <span className="text-[1.1em] text-brand-700">stock moves.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left" className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center lg:justify-start">
            <DonutChart data={data} />
            <ul className="space-y-2">
              {data.map((d, i) => (
                <li key={d.label} className="flex items-center gap-2 text-sm">
                  <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: DONUT_COLORS[i % DONUT_COLORS.length] }} />
                  <span className="text-ink-700">{d.label}</span>
                  <span className="font-mono text-ink-500/60">{d.value}%</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal direction="right" delay={100}>
            <BarChart data={data} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ---- Section 6: SLA / engagement model (ledger, shared with Quality) ----
function SLASection() {
  const items = company.slaRows.map((row) => ({ primary: row.label, meta: row.commitment }))
  return (
    <section aria-label="Service level commitments" className={['bg-clinical-800 py-24 text-white sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <Eyebrow tone="onDark">Engagement model</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-white text-balance">
            What to expect, <span className="text-brand-100">and when.</span>
          </h2>
        </Reveal>
        <Reveal direction="scale" delay={70}>
          <LedgerList items={items} tone="onDark" className="mt-10" />
        </Reveal>
      </div>
    </section>
  )
}

// ---- Section 8: CTA -------------------------------------------------------
function ServicesCTA() {
  return (
    <section aria-label="Discuss your requirement" className={['mx-auto max-w-7xl px-6 py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <Reveal direction="scale">
        <Card variant="elevated" className="grid grid-cols-1 gap-8 p-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-display-3 font-display font-semibold text-ink-700 text-balance">Discuss your requirement.</h2>
            <p className="mt-3 max-w-[48ch] text-ink-500">
              New retail account, bulk order, or just exploring options — talk to our team directly.
            </p>
            <span className="gradient-border-run mt-6 inline-block rounded-btn p-[3px]">
              <Button to="/contact?subject=services" icon="ArrowRight">
                Start a conversation
              </Button>
            </span>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <QuickActionChip icon="Phone" label="Call us" href={`tel:${company.phone.href}`} />
            <QuickActionChip icon="Mail" label="Email us" href={`mailto:${company.email.href}`} />
          </div>
        </Card>
      </Reveal>
    </section>
  )
}

export default function Services() {
  return (
    <>
      <ProcessHero steps={company.processSteps} />
      <ServicesGrid />
      <ProcessRailSection />
      <CapabilityTabs />
      <DataVizBand />
      <SLASection />
      <FAQSection
        eyebrow="FAQ"
        title="Service questions"
        items={faqs.services}
        className={['mx-auto max-w-7xl px-6 py-24 sm:py-32', BELOW_FOLD].join(' ')}
      />
      <ServicesCTA />
    </>
  )
}
