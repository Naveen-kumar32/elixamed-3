import { useId, useState } from 'react'
import { Icon } from '../atoms/Icon'
import { Input } from '../atoms/Input'
import { Button } from '../atoms/Button'
import { HoneypotField } from '../atoms/HoneypotField'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Email capture with inline validation, a success state, and a honeypot
 * anti-spam field. `variant="band"` is Home's full-width section;
 * `variant="compact"` is Footer's column-4 layout. Both share this
 * component so the validation/success logic only exists once.
 */
export function NewsletterBand({ variant = 'band', tone = 'default', className = '' }) {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | success
  const [error, setError] = useState('')
  const emailId = useId()
  const isDark = tone === 'onDark'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (honeypot) return // suspected bot — drop silently, no state change

    if (!email.trim()) {
      setError('Enter your email address.')
      setStatus('error')
      return
    }
    if (!EMAIL_RE.test(email)) {
      setError('Enter a valid email address.')
      setStatus('error')
      return
    }
    setError('')
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className={className}>
        <p className={['flex items-center gap-2 font-medium', isDark ? 'text-brand-100' : 'text-brand-700'].join(' ')}>
          <Icon name="CheckCircle2" size={18} />
          Subscribed — thanks for joining.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setEmail('')
          }}
          className={['link-underline mt-2 text-sm', isDark ? 'text-white/70' : 'text-ink-500'].join(' ')}
        >
          Use a different email
        </button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={className}>
      <div className={variant === 'band' ? 'flex flex-col gap-3 sm:flex-row' : 'flex flex-col gap-3'}>
        <div className="flex-1">
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <Input
            id={emailId}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === 'error') setStatus('idle')
            }}
            invalid={status === 'error'}
            aria-describedby={status === 'error' ? `${emailId}-error` : undefined}
            className={isDark ? 'border-white/20 bg-white/10 text-white placeholder:text-white/40' : ''}
          />
          {status === 'error' && (
            <p id={`${emailId}-error`} role="alert" className={['mt-1.5 flex items-center gap-1.5 text-sm', isDark ? 'text-red-400' : 'text-red-600'].join(' ')}>
              <Icon name="AlertCircle" size={14} />
              {error}
            </p>
          )}
        </div>

        <HoneypotField value={honeypot} onChange={setHoneypot} />

        <Button type="submit" variant={isDark ? 'onDark' : 'primary'} icon="ArrowRight" className="shrink-0">
          Subscribe
        </Button>
      </div>
    </form>
  )
}
