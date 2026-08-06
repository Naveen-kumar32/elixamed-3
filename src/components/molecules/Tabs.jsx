import { Children, cloneElement, createContext, isValidElement, useContext, useEffect, useId, useRef, useState } from 'react'

const TabsContext = createContext(null)

/**
 * Compound tabs (Tabs.List / Tabs.Tab / Tabs.Panels / Tabs.Panel) with
 * roving tabindex and automatic-activation arrow-key navigation per the
 * ARIA APG tabs pattern. Panels crossfade over 200ms.
 */
export function Tabs({ children, defaultIndex = 0, className = '' }) {
  const [active, setActive] = useState(defaultIndex)
  const id = useId()
  return (
    <TabsContext.Provider value={{ active, setActive, id }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

function TabsList({ children, 'aria-label': ariaLabel, className = '' }) {
  const { active, setActive } = useContext(TabsContext)
  const listRef = useRef(null)

  const onKeyDown = (e) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return
    const tabs = Array.from(listRef.current.querySelectorAll('[role="tab"]'))
    const count = tabs.length
    if (!count) return
    let next = active
    if (e.key === 'ArrowRight') next = (active + 1) % count
    if (e.key === 'ArrowLeft') next = (active - 1 + count) % count
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = count - 1
    e.preventDefault()
    setActive(next)
    tabs[next]?.focus()
  }

  return (
    <div ref={listRef} role="tablist" aria-label={ariaLabel} className={className} onKeyDown={onKeyDown}>
      {children}
    </div>
  )
}

function Tab({ index, children, className = '' }) {
  const { active, setActive, id } = useContext(TabsContext)
  const isActive = active === index
  return (
    <button
      type="button"
      role="tab"
      id={`${id}-tab-${index}`}
      aria-selected={isActive}
      aria-controls={`${id}-panel-${index}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActive(index)}
      className={[
        'relative shrink-0 whitespace-nowrap px-1 pb-3 text-sm font-medium transition-colors duration-200 sm:text-base',
        isActive ? 'text-brand-700' : 'text-ink-500 hover:text-brand-700',
        className,
      ].join(' ')}
    >
      {children}
      <span
        aria-hidden="true"
        className={[
          'absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-signature-gradient transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)]',
          isActive ? 'scale-x-100' : 'scale-x-0',
        ].join(' ')}
      />
    </button>
  )
}

function Panels({ children, className = '' }) {
  const { active } = useContext(TabsContext)
  const [prev, setPrev] = useState(null)
  const prevRef = useRef(active)

  useEffect(() => {
    if (prevRef.current !== active) {
      setPrev(prevRef.current)
      prevRef.current = active
      const t = setTimeout(() => setPrev(null), 200)
      return () => clearTimeout(t)
    }
    return undefined
  }, [active])

  return (
    <div className={['relative', className].join(' ')}>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return null
        const idx = child.props.index
        if (idx === active) return cloneElement(child, { _state: 'entering' })
        if (idx === prev) return cloneElement(child, { _state: 'leaving' })
        return null
      })}
    </div>
  )
}

function Panel({ index, children, className = '', _state }) {
  const { id } = useContext(TabsContext)
  if (!_state) return null
  return (
    <div
      id={`${id}-panel-${index}`}
      role="tabpanel"
      aria-labelledby={`${id}-tab-${index}`}
      tabIndex={0}
      className={[
        _state === 'entering' ? 'relative opacity-100' : 'absolute inset-0 opacity-0',
        'transition-opacity duration-200 ease-out',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

Tabs.List = TabsList
Tabs.Tab = Tab
Tabs.Panels = Panels
Tabs.Panel = Panel
