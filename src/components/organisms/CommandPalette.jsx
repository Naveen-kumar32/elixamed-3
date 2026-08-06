import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes, productMegaMenu } from '../../data/nav'
import { Icon } from '../atoms/Icon'
import { useFocusTrap } from '../../hooks/useFocusTrap'

// Lightweight subsequence fuzzy match — no library, good enough for a
// six-route, five-category index.
function fuzzyMatch(query, text) {
  if (!query) return true
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  let qi = 0
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++
  }
  return qi === q.length
}

const routeItems = routes.map((r) => ({ group: 'Pages', label: r.label, hint: r.path, href: r.path, icon: 'ArrowRight' }))
const categoryItems = productMegaMenu.categories.map((c) => ({
  group: 'Product categories',
  label: c.label,
  hint: c.hint,
  href: `/products?category=${c.slug}`,
  icon: 'Layers',
}))
const allItems = [...routeItems, ...categoryItems]

/**
 * ⌘K / Ctrl+K command palette — fuzzy-filters routes and product
 * categories from data files. Dialog with aria-modal, focus trap, full
 * arrow-key + Enter + Escape keyboard operation.
 */
export function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const results = useMemo(
    () => allItems.filter((item) => fuzzyMatch(query, item.label) || fuzzyMatch(query, item.hint)),
    [query],
  )

  useEffect(() => {
    if (!open) return undefined
    setQuery('')
    setActiveIndex(0)
    const raf = requestAnimationFrame(() => inputRef.current?.focus())
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  useEffect(() => setActiveIndex(0), [query])

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  useFocusTrap(dialogRef, { active: open, onEscape: onClose })

  if (!open) return null

  const goTo = (href) => {
    navigate(href)
    onClose()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[activeIndex]) goTo(results[activeIndex].href)
    }
  }

  const activeId = results[activeIndex] ? `cmdk-item-${activeIndex}` : undefined

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]">
      <button type="button" aria-label="Close search" className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-xl overflow-hidden rounded-card border border-ink-500/10 bg-white shadow-lg"
      >
        <div className="flex items-center gap-3 border-b border-ink-500/10 px-5 py-4">
          <Icon name="Search" size={18} className="shrink-0 text-ink-500/60" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={activeId}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search pages and product categories…"
            className="w-full min-w-0 flex-1 border-0 bg-transparent text-base text-ink-700 outline-none placeholder:text-ink-500/50"
          />
          <kbd className="shrink-0 rounded border border-ink-500/20 px-1.5 py-0.5 font-mono text-xs text-ink-500/60">Esc</kbd>
        </div>

        <ul id="cmdk-list" ref={listRef} role="listbox" aria-label="Search results" className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && <li className="px-4 py-6 text-center text-sm text-ink-500">No matches — try a different search.</li>}
          {results.map((item, i) => (
            <li key={item.href + item.label} data-index={i} id={`cmdk-item-${i}`} role="option" aria-selected={i === activeIndex}>
              <button
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => goTo(item.href)}
                className={['flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors', i === activeIndex ? 'bg-brand-50' : ''].join(
                  ' ',
                )}
              >
                <Icon name={item.icon} size={16} className="shrink-0 text-brand-600" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink-700">{item.label}</span>
                  <span className="block truncate text-xs text-ink-500">{item.hint}</span>
                </span>
                <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-wide text-ink-500/50">{item.group}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 border-t border-ink-500/10 px-5 py-3 font-mono text-[0.65rem] uppercase tracking-wide text-ink-500/50">
          <span className="flex items-center gap-1">
            <Icon name="CornerDownLeft" size={12} /> Select
          </span>
          <span>↑↓ Navigate</span>
          <span>Esc Close</span>
        </div>
      </div>
    </div>
  )
}
