import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { company } from '../../data/company'
import { Eyebrow } from '../atoms/Eyebrow'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
import { Spinner } from '../atoms/Spinner'
import { HoneypotField } from '../atoms/HoneypotField'
import { FormField } from '../molecules/FormField'

const INTENT_OPTIONS = [
  { value: 'general', label: 'General' },
  { value: 'products', label: 'Products' },
  { value: 'services', label: 'Services' },
  { value: 'quality', label: 'Quality docs' },
]

const STEP_FIELDS = { 1: ['name'], 2: ['email', 'phone', 'message'] }

function formatPhoneMask(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  return digits.length <= 5 ? digits : `${digits.slice(0, 5)}-${digits.slice(5)}`
}

function validateField(name, values) {
  switch (name) {
    case 'name':
      return values.name.trim() ? undefined : 'Enter your name.'
    case 'email':
      if (!values.email.trim()) return 'Enter your email address.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return 'Enter a valid email address.'
      return undefined
    case 'phone': {
      const digits = values.phone.replace(/\D/g, '')
      if (!digits) return 'Enter your phone number.'
      if (digits.length < 10) return 'Enter a 10-digit phone number.'
      return undefined
    }
    case 'message':
      if (!values.message.trim()) return 'Enter a message.'
      if (values.message.trim().length < 10) return 'Say a little more — at least 10 characters.'
      return undefined
    default:
      return undefined
  }
}

function validateStep(step, values) {
  const errors = {}
  STEP_FIELDS[step].forEach((field) => {
    const err = validateField(field, values)
    if (err) errors[field] = err
  })
  return errors
}

// No real backend exists in this build. The await + try/catch below is
// deliberately production-shaped: wiring a real endpoint later just means
// replacing this function's body — the retry-without-clearing-fields path
// already works correctly, it simply never needs to trigger against a
// promise that always resolves.
function fakeSubmit() {
  return new Promise((resolve) => setTimeout(resolve, 900))
}

function initialIntentFrom(searchParams) {
  const subject = searchParams.get('subject')
  return INTENT_OPTIONS.some((o) => o.value === subject) ? subject : 'general'
}

/**
 * THE unified card (Part D, Contact §3): ink-900 info panel fused with a
 * white two-step form wizard. Intent pre-selects from ?subject=; back
 * preserves state (Zeigarnik); success offers "send another" — no dead end.
 */
export function ContactCard() {
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState(() => ({
    intent: initialIntentFrom(searchParams),
    name: '',
    organisation: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
  }))

  const update = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleBlur = (field) => {
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values) }))
  }

  const handleNext = (e) => {
    e.preventDefault()
    const stepErrors = validateStep(1, values)
    if (Object.keys(stepErrors).length) {
      setErrors((prev) => ({ ...prev, ...stepErrors }))
      return
    }
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e?.preventDefault?.()
    if (values.honeypot) return // suspected bot — drop silently

    const stepErrors = validateStep(2, values)
    if (Object.keys(stepErrors).length) {
      setErrors((prev) => ({ ...prev, ...stepErrors }))
      return
    }

    setStatus('submitting')
    try {
      await fakeSubmit()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const resetForm = () => {
    setValues({
      intent: initialIntentFrom(searchParams),
      name: '',
      organisation: '',
      email: '',
      phone: '',
      message: '',
      honeypot: '',
    })
    setErrors({})
    setStep(1)
    setStatus('idle')
  }

  const intentLabel = INTENT_OPTIONS.find((o) => o.value === values.intent)?.label ?? 'General'

  return (
    <div id="contact-form" className="overflow-hidden rounded-card border border-brand-500/20 shadow-lg lg:grid lg:grid-cols-5">
      {/* Info panel */}
      <div className="bg-gradient-to-br from-ink-900 via-clinical-800 to-brand-700 p-8 text-white sm:p-10 lg:col-span-2">
        <Eyebrow tone="onDark">Get in touch</Eyebrow>
        <h2 className="mt-4 text-2xl font-display font-semibold text-white text-balance">We&rsquo;d like to hear from you.</h2>
        <ul className="mt-8 space-y-6 text-sm">
          <li className="flex gap-3">
            <Icon name="MapPin" size={18} className="mt-0.5 shrink-0 text-clinical-300" />
            <span>
              {company.address.line1}
              <br />
              {company.address.line2}
            </span>
          </li>
          <li className="flex gap-3">
            <Icon name="Phone" size={18} className="mt-0.5 shrink-0 text-clinical-300" />
            <a href={`tel:${company.phone.href}`} className="link-underline">
              {company.phone.display}
            </a>
          </li>
          <li className="flex gap-3">
            <Icon name="Mail" size={18} className="mt-0.5 shrink-0 text-clinical-300" />
            <a href={`mailto:${company.email.href}`} className="link-underline">
              {company.email.display}
            </a>
          </li>
          <li className="flex gap-3">
            <Icon name="Clock" size={18} className="mt-0.5 shrink-0 text-clinical-300" />
            <span className="space-y-0.5">
              {company.hours.map((h) => (
                <span key={h.days} className="block">
                  {h.days}: {h.time}
                </span>
              ))}
            </span>
          </li>
        </ul>
      </div>

      {/* Form wizard */}
      <div className="bg-white p-8 sm:p-10 lg:col-span-3">
        {status === 'success' ? (
          <div>
            <Icon name="CheckCircle2" size={40} className="text-brand-600" />
            <h3 className="mt-4 text-2xl font-display font-semibold text-ink-700">Message received</h3>
            <p className="mt-2 text-ink-500">
              Thanks, {values.name.split(' ')[0] || 'there'} — we&rsquo;ve logged your <strong className="font-medium text-ink-700">{intentLabel}</strong> enquiry.{' '}
              {company.responseTime}
            </p>
            <dl className="mt-6 space-y-1.5 rounded-card bg-brand-50 p-4 text-sm text-ink-500">
              <div className="flex gap-2">
                <dt className="font-medium text-ink-700">Name:</dt>
                <dd>{values.name}</dd>
              </div>
              {values.organisation && (
                <div className="flex gap-2">
                  <dt className="font-medium text-ink-700">Organisation:</dt>
                  <dd>{values.organisation}</dd>
                </div>
              )}
              <div className="flex gap-2">
                <dt className="font-medium text-ink-700">Email:</dt>
                <dd>{values.email}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-ink-700">Phone:</dt>
                <dd>{values.phone}</dd>
              </div>
            </dl>
            <button type="button" onClick={resetForm} className="link-underline mt-6 font-medium text-brand-700">
              Send another message
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={step === 1 ? handleNext : handleSubmit}>
            <div className="mb-7 flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-wide text-ink-500/60">Step {step} of 2</p>
              <div className="flex gap-1.5" aria-hidden="true">
                <span className={['h-1.5 w-8 rounded-full', step >= 1 ? 'bg-brand-500' : 'bg-ink-500/15'].join(' ')} />
                <span className={['h-1.5 w-8 rounded-full', step >= 2 ? 'bg-brand-500' : 'bg-ink-500/15'].join(' ')} />
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-5">
                <FormField
                  as="select"
                  id="intent"
                  label="What can we help with?"
                  options={INTENT_OPTIONS}
                  value={values.intent}
                  onChange={(e) => update('intent', e.target.value)}
                />
                <FormField
                  id="contact-name"
                  label="Your name"
                  required
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => update('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  error={errors.name}
                />
                <FormField
                  id="organisation"
                  label="Organisation"
                  hint="Optional"
                  autoComplete="organization"
                  value={values.organisation}
                  onChange={(e) => update('organisation', e.target.value)}
                />
                <HoneypotField value={values.honeypot} onChange={(v) => update('honeypot', v)} />
                <Button type="submit" className="w-full" icon="ArrowRight">
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <FormField
                  id="contact-email"
                  type="email"
                  label="Email"
                  required
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => update('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  error={errors.email}
                />
                <FormField
                  id="contact-phone"
                  type="tel"
                  label="Phone"
                  required
                  autoComplete="tel"
                  placeholder="98765-43210"
                  value={values.phone}
                  onChange={(e) => update('phone', formatPhoneMask(e.target.value))}
                  onBlur={() => handleBlur('phone')}
                  error={errors.phone}
                />
                <FormField
                  as="textarea"
                  id="contact-message"
                  label="Message"
                  required
                  value={values.message}
                  onChange={(e) => update('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  error={errors.message}
                />

                {status === 'error' && (
                  <div role="alert" className="rounded-card border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <p className="flex items-center gap-2 font-medium">
                      <Icon name="AlertCircle" size={17} />
                      Something went wrong. Your details are safe — try again.
                    </p>
                    <button type="button" onClick={handleSubmit} className="mt-2 font-medium underline">
                      Try again
                    </button>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button type="button" variant="secondary" icon="ArrowLeft" iconPosition="left" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <span className="gradient-border-run flex-1 rounded-btn p-[3px]">
                    <Button type="submit" className="w-full justify-center" disabled={status === 'submitting'}>
                      {status === 'submitting' ? <Spinner size={18} /> : 'Send message'}
                    </Button>
                  </span>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
