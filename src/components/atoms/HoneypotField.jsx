import { useId } from 'react'

/**
 * Anti-spam trap field: visually hidden AND hidden from assistive tech, so
 * real users never see or reach it while bots that blindly fill every
 * input often will. Any non-empty value at submit time signals a bot.
 */
export function HoneypotField({ value, onChange, label = 'Company' }) {
  const id = useId()
  return (
    <div aria-hidden="true" className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" style={{ clip: 'rect(0,0,0,0)' }}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" name="company" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}
