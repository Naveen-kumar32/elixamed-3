import { forwardRef } from 'react'

/**
 * Bare styled input/textarea/select — used directly (Products search) or
 * wrapped by the FormField molecule (label + error). Never color-only for
 * error state: pair `invalid` with visible error text at the call site.
 */
export const Input = forwardRef(function Input(
  { as = 'input', invalid = false, className = '', ...rest },
  ref,
) {
  const Tag = as
  return (
    <Tag
      ref={ref}
      aria-invalid={invalid || undefined}
      className={[
        'w-full rounded-btn border bg-white px-4 py-3 text-[0.95rem] text-ink-700',
        'placeholder:text-ink-500/50 transition-colors duration-150',
        'focus:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-500/40 focus-visible:border-brand-500',
        invalid ? 'border-red-500' : 'border-ink-500/20 hover:border-brand-500/60',
        as === 'textarea' ? 'min-h-32 resize-y' : '',
        className,
      ].join(' ')}
      {...rest}
    />
  )
})
