import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'

// primary = brand-500 fill + charcoal text (6.01:1) — NEVER white text on orange.
// onDark = same orange fill, verified 5.23:1 on ink-900 sections.
const variants = {
  primary:
    'bg-brand-500 text-[#1A1F23] hover:bg-brand-600 active:bg-brand-700 shadow-xs hover:shadow-md',
  onDark:
    'bg-brand-500 text-[#1A1F23] hover:bg-brand-600 active:bg-brand-700 shadow-md',
  secondary:
    'bg-transparent text-ink-700 border border-ink-500/25 hover:border-brand-500 hover:bg-brand-500 hover:text-[#1A1F23]',
  ghost: 'bg-transparent text-ink-700 hover:bg-brand-50 hover:text-brand-700',
  ghostOnDark: 'bg-transparent text-white border border-white/30 hover:border-brand-500 hover:bg-brand-500 hover:text-[#1A1F23]',
}

const sizes = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-[0.95rem] gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
}

/**
 * Button primitive with smart polymorphism: pass `to` for an internal route
 * (react-router Link), `href` for a plain/external anchor, or nothing for a
 * real <button>. Variants: primary | onDark | secondary | ghost | ghostOnDark.
 */
export const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'right',
    className = '',
    children,
    to,
    href,
    ...rest
  },
  ref,
) {
  const classes = [
    'inline-flex items-center justify-center rounded-btn font-medium',
    'transition-all duration-200 ease-[cubic-bezier(.22,1,.36,1)]',
    'hover:-translate-y-px active:translate-y-0',
    'disabled:opacity-50 disabled:pointer-events-none disabled:translate-y-0',
    variants[variant],
    sizes[size],
    className,
  ].join(' ')

  const content = (
    <>
      {icon && iconPosition === 'left' && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <Icon name={icon} size={18} />}
    </>
  )

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button ref={ref} type={rest.type || 'button'} className={classes} {...rest}>
      {content}
    </button>
  )
})
