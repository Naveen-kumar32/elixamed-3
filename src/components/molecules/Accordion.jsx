import { Children, cloneElement, createContext, isValidElement, useContext, useId, useState } from 'react'
import { Icon } from '../atoms/Icon'

const AccordionContext = createContext(null)

/**
 * Compound accordion — coordinates "only one open at a time" across its
 * Accordion.Item children. Used for every FAQ block on the site.
 */
export function Accordion({ children, defaultOpenIndex = 0, className = '' }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex)
  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i))

  return (
    <AccordionContext.Provider value={{ openIndex, toggle }}>
      <div className={className}>
        {Children.map(children, (child, i) => (isValidElement(child) ? cloneElement(child, { _index: i }) : child))}
      </div>
    </AccordionContext.Provider>
  )
}

/**
 * Accordion.Item also works standalone (no <Accordion> ancestor) with its
 * own local open state — used for Services' per-card "Details" disclosure,
 * which needs independent toggles rather than coordinated single-open.
 */
function AccordionItem({ _index, question, children, className = '', bare = false }) {
  const ctx = useContext(AccordionContext)
  const [localOpen, setLocalOpen] = useState(false)
  const isOpen = ctx ? ctx.openIndex === _index : localOpen
  const id = useId()

  const handleToggle = () => (ctx ? ctx.toggle(_index) : setLocalOpen((o) => !o))

  return (
    <div className={[bare ? '' : 'border-b border-ink-500/10', className].join(' ')}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={handleToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left font-medium text-ink-700 transition-colors hover:text-brand-700"
      >
        <span>{question}</span>
        <Icon name={isOpen ? 'Minus' : 'Plus'} size={18} className="shrink-0 text-brand-600" />
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="pb-4 pr-8 leading-relaxed text-ink-500">{children}</div>
        </div>
      </div>
    </div>
  )
}

Accordion.Item = AccordionItem
