import { DarkHero } from '../components/organisms/HeroVariants'
import { LedgerList } from '../components/organisms/LedgerList'
import { Reveal } from '../components/molecules/Reveal'
import { Card } from '../components/molecules/Card'
import { PullQuote } from '../components/molecules/PullQuote'
import { Tooltip } from '../components/atoms/Tooltip'
import { Eyebrow } from '../components/atoms/Eyebrow'
import { Button } from '../components/atoms/Button'
import { NoiseOverlay } from '../components/atoms/NoiseOverlay'
import { useReveal } from '../hooks/useReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { company } from '../data/company'

// content-visibility:auto was tried here for below-fold sections (Part C10)
// but removed: it demonstrably skipped rendering below-fold content during
// automated full-page capture (screenshot tools, and by extension any
// context that renders the page without genuine incremental scrolling --
// print/PDF export, some crawlers). Not worth the risk for a page this size.
const BELOW_FOLD = ''

const QUALITY_STEPS = [
  { title: 'Manufacturer Verification', description: 'Every source is checked for valid licensing and GMP certification before we accept stock.' },
  { title: 'Incoming Batch Check', description: 'Certificate of Analysis and batch documentation verified against the physical consignment on arrival.' },
  { title: 'Storage & Handling', description: 'Stock is warehoused under monitored conditions, with cold-chain handling for sensitive formulations.' },
  { title: 'Dispatch Verification', description: 'Every outgoing order is checked against its documentation before it leaves our warehouse.' },
]

// ---- Section 2: Compliance intro (dark, two-column, drop cap) -----------
function ComplianceIntro() {
  return (
    <section aria-label="Compliance overview" className={['relative bg-ink-900 py-20 text-white sm:py-28', BELOW_FOLD].join(' ')}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal direction="left">
          <p className="text-body-lg leading-[1.7] text-white/80 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-7xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-clinical-300">
            Compliance at ElixaMed isn&rsquo;t a department — it&rsquo;s a structural constraint on every
            consignment, from manufacturer verification through retailer delivery. Every source is checked against
            wholesale licensing standards, and every certification is renewed on schedule, not chased after the
            fact.
          </p>
        </Reveal>
        <Reveal direction="right" delay={100}>
          <p className="text-body-lg leading-[1.7] text-white/80">
            That discipline shows up in what we can document: manufacturer certification records, cold-chain logs,
            and a Certificate of Analysis for every shipment. Six certifications, zero exceptions.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ---- Section 3: Certifications ledger (dark) -----------------------------
function CertificationsLedger() {
  const items = company.certifications.map((cert) => ({ primary: cert.name, secondary: cert.body, detail: cert.detail }))
  return (
    <section aria-label="Certifications" className={['bg-ink-900 py-24 text-white sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <Eyebrow tone="onDark">Certifications</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-white text-balance">Six certifications, independently audited.</h2>
          <p className="mt-3 max-w-[60ch] text-white/60">Hover or focus a row for detail.</p>
        </Reveal>
        <Reveal direction="scale" delay={70}>
          <LedgerList items={items} tone="onDark" className="mt-10" />
        </Reveal>
      </div>
    </section>
  )
}

// ---- Section 4: Quality process stepper (dark, draw-on-reveal seals) ----
function SealIcon({ isVisible, reducedMotion, delay = 0 }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true" className="shrink-0">
      <circle
        cx="28"
        cy="28"
        r="24"
        stroke="#7DDEE8"
        strokeWidth="2.5"
        style={{
          strokeDasharray: 151,
          strokeDashoffset: reducedMotion ? 0 : isVisible ? 0 : 151,
          transition: reducedMotion ? 'none' : `stroke-dashoffset 900ms var(--ease-signature) ${delay}ms`,
        }}
      />
      <path
        d="M18 29l7 7 13-15"
        stroke="#7DDEE8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 34,
          strokeDashoffset: reducedMotion ? 0 : isVisible ? 0 : 34,
          transition: reducedMotion ? 'none' : `stroke-dashoffset 500ms var(--ease-signature) ${delay + 550}ms`,
        }}
      />
    </svg>
  )
}

function QualityProcessStepper() {
  const [ref, isVisible] = useReveal({ threshold: 0.2 })
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section aria-label="Quality process" className={['bg-ink-900 py-24 text-white sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <Eyebrow tone="onDark">Our process</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-white text-balance">Four checkpoints, every batch.</h2>
        </Reveal>
        <div ref={ref} className="mt-14 space-y-10">
          {QUALITY_STEPS.map((step, i) => (
            <div key={step.title} className="flex gap-5">
              <SealIcon isVisible={isVisible} reducedMotion={reducedMotion} delay={i * 150} />
              <div className="pt-2">
                <p className="font-mono text-xs uppercase tracking-wide text-clinical-300/70">Step {i + 1}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-sm text-white/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- Section 5: Testing standards grid (light — intentional variance) --
function TestingStandardsGrid() {
  return (
    <section aria-label="Testing standards" className={['bg-brand-100 py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>Verification standards</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
            Verified against <span className="text-[1.1em] text-brand-700">recognized pharmacopeia.</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          <Reveal direction="left" className="lg:col-span-4">
            <img
              src="/images/quality-testing.jpg"
              alt="Lab technician using a pipette with a rack of test tubes"
              loading="lazy"
              width={1400}
              height={1000}
              className="aspect-[4/3] w-full rounded-card object-cover shadow-md sm:aspect-[16/9] lg:aspect-auto lg:h-full"
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {company.testingStandards.map((standard, i) => (
              <Reveal key={standard.acronym} direction={i % 2 === 0 ? 'up' : 'scale'} delay={i * 70}>
                <Card variant="sharp" hover className="h-full p-6">
                  <p className="font-mono text-2xl font-medium text-brand-700">
                    <Tooltip label={standard.name}>{standard.acronym}</Tooltip>
                  </p>
                  <p className="mt-2 text-sm text-ink-500">{standard.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- Section 6: Documentation & traceability (light, batch-record motif)
function DocumentationSplit() {
  return (
    <section aria-label="Documentation and traceability" className={['bg-white py-24 sm:py-32', BELOW_FOLD].join(' ')}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal direction="left">
          <Eyebrow>Documentation</Eyebrow>
          <h2 className="mt-3 text-display-2 font-display font-semibold text-ink-700 text-balance">
            Every batch, <span className="text-brand-700">fully traceable.</span>
          </h2>
          <p className="mt-4 max-w-[52ch] text-ink-500">
            Full batch documentation is retained and available on request — from manufacturer certification through
            retailer delivery.
          </p>
          <Button href={`mailto:${company.qualityEmail.href}`} variant="secondary" icon="FileText" className="mt-6">
            Request documentation
          </Button>
        </Reveal>
        <Reveal direction="right" delay={100} className="space-y-5">
          <img
            src="/images/quality-documentation.jpg"
            alt="Lab technician in a coat pouring a sample into labeled vials for testing"
            loading="lazy"
            width={1400}
            height={1000}
            className="aspect-[7/5] w-full rounded-card object-cover shadow-md"
          />
          <div className="rounded-sharp border border-ink-500/15 bg-white p-6 font-mono text-sm shadow-md">
            <p className="border-b border-dashed border-ink-500/20 pb-3 text-xs uppercase tracking-wide text-ink-500/60">
              Batch Record — Sample Index
            </p>
            <ul className="mt-3 space-y-2.5">
              {company.documentation.map((doc, i) => (
                <li key={doc} className="flex items-start gap-3 text-ink-700">
                  <span className="text-brand-600">{String(i + 1).padStart(2, '0')}</span>
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ---- Section 7: Policy statement (light, unity with About's pull-quote) -
function PolicyStatement() {
  return (
    <section aria-label="Our quality policy" className={['bg-brand-100 py-20 sm:py-28', BELOW_FOLD].join(' ')}>
      <Reveal direction="scale" className="mx-auto max-w-4xl px-6">
        <PullQuote>
          Every batch that leaves ElixaMed carries its manufacturer&rsquo;s Certificate of Analysis.{' '}
          <strong>If it isn&rsquo;t verified, it isn&rsquo;t shipped</strong> — that is the one policy we never
          revise.
        </PullQuote>
      </Reveal>
    </section>
  )
}

// ---- Section 8: CTA (dark, orange button verified 5.23:1) ---------------
function ComplianceCTA() {
  return (
    <section
      aria-label="Request compliance documentation"
      className={['relative overflow-hidden bg-ink-900 py-24 text-center text-white sm:py-32', BELOW_FOLD].join(' ')}
    >
      <NoiseOverlay />
      <Reveal direction="scale" className="relative mx-auto max-w-2xl px-6">
        <h2 className="text-display-2 font-display font-semibold text-white text-balance">Need our compliance documentation?</h2>
        <p className="mt-4 text-white/70">Certificates, batch records and regulatory dossiers — available on request.</p>
        <Button to="/contact?subject=quality" variant="onDark" icon="ArrowRight" className="mt-8">
          Request compliance documentation
        </Button>
      </Reveal>
    </section>
  )
}

export default function Quality() {
  return (
    <>
      <DarkHero
        eyebrow="Quality & Compliance"
        title="Every batch, verified and traceable."
        description="Six certifications, verified sourcing, and a Certificate of Analysis on every shipment — quality isn't a claim here, it's a paper trail."
      />
      <ComplianceIntro />
      <CertificationsLedger />
      <QualityProcessStepper />
      <TestingStandardsGrid />
      <DocumentationSplit />
      <PolicyStatement />
      <ComplianceCTA />
    </>
  )
}
