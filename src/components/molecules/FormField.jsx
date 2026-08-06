import { forwardRef } from 'react'
import { Input } from '../atoms/Input'
import { Icon } from '../atoms/Icon'

/**
 * Label (above field, per brief) + input/textarea/select + error.
 * Error state is never color-only: icon + text always accompany the red
 * border. `options` renders a native <select> instead of a text input.
 */
export const FormField = forwardRef(function FormField(
  { label, id, error, hint, required, as = 'input', options, className = '', ...rest },
  ref,
) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink-700">
        {label}
        {required && (
          <span className="text-brand-700" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>

      {as === 'select' ? (
        <Input as="select" id={id} ref={ref} invalid={!!error} aria-describedby={describedBy} aria-invalid={!!error} required={required} {...rest}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Input>
      ) : (
        <Input as={as} id={id} ref={ref} invalid={!!error} aria-describedby={describedBy} aria-invalid={!!error} required={required} {...rest} />
      )}

      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
          <Icon name="AlertCircle" size={15} />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-500/70">
          {hint}
        </p>
      ) : null}
    </div>
  )
})
