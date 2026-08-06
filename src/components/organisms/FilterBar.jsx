import { useRef, useState } from 'react'
import { Icon } from '../atoms/Icon'
import { FilterChip } from '../molecules/FilterChip'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function radioKeyNav(e, options, value, onChange, containerRef) {
  if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) return
  e.preventDefault()
  const idx = options.findIndex((o) => o.value === value)
  const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1
  const next = options[(idx + dir + options.length) % options.length]
  onChange(next.value)
  containerRef.current?.querySelector(`[data-value="${next.value}"]`)?.focus()
}

function RadioPill({ option, checked, onSelect, containerRef, options, value, onChange }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      data-value={option.value}
      tabIndex={checked ? 0 : -1}
      onClick={onSelect}
      onKeyDown={(e) => radioKeyNav(e, options, value, onChange, containerRef)}
      className={[
        'shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors',
        checked ? 'bg-brand-500 text-[#1A1F23]' : 'bg-white text-ink-700 hover:bg-brand-100 hover:text-brand-700',
      ].join(' ')}
    >
      {option.label}
    </button>
  )
}

/**
 * Products' faceted filter system: category radiogroup (≤5 visible + a
 * "More" popover for overflow), active-filter chips, and a live result
 * count. Collapses to a bottom sheet below `lg`.
 */
export function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onClearSearch,
  resultCount,
  totalCount,
  maxVisible = 5,
}) {
  const reducedMotion = usePrefersReducedMotion()
  const [moreOpen, setMoreOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const moreRef = useRef(null)
  const moreTriggerRef = useRef(null)
  const sheetRef = useRef(null)
  const sheetTriggerRef = useRef(null)
  const touchStartY = useRef(null)

  const allOption = { value: 'all', label: 'All' }
  const categoryOptions = categories.map((c) => ({ value: c.slug, label: c.label }))
  const overflow = categoryOptions.length > maxVisible
  const visibleCats = overflow ? categoryOptions.slice(0, maxVisible) : categoryOptions
  const hiddenCats = overflow ? categoryOptions.slice(maxVisible) : []
  const activeIsHidden = hiddenCats.some((o) => o.value === activeCategory)
  const radioOptions = [allOption, ...categoryOptions]

  const closeMore = (refocus) => {
    setMoreOpen(false)
    if (refocus) moreTriggerRef.current?.focus()
  }
  const closeSheet = () => {
    setSheetOpen(false)
    sheetTriggerRef.current?.focus()
  }

  useFocusTrap(moreRef, { active: moreOpen, onEscape: () => closeMore(true) })
  useFocusTrap(sheetRef, { active: sheetOpen, onEscape: closeSheet })

  const activeCategoryLabel = categories.find((c) => c.slug === activeCategory)?.label

  const chips = []
  if (activeCategory !== 'all' && activeCategoryLabel) {
    chips.push({ key: 'category', label: activeCategoryLabel, onRemove: () => onCategoryChange('all') })
  }
  if (searchQuery.trim()) {
    chips.push({ key: 'search', label: `"${searchQuery.trim()}"`, onRemove: onClearSearch })
  }

  return (
    <div className="border-y border-ink-500/10 py-6">
      {/* Desktop */}
      <div className="hidden items-center justify-between gap-6 lg:flex">
        <div role="radiogroup" aria-label="Filter by category" className="flex flex-1 flex-wrap items-center gap-2">
          <RadioPill
            option={allOption}
            checked={activeCategory === 'all'}
            onSelect={() => onCategoryChange('all')}
            containerRef={moreRef}
            options={radioOptions}
            value={activeCategory}
            onChange={onCategoryChange}
          />
          {visibleCats.map((opt) => (
            <RadioPill
              key={opt.value}
              option={opt}
              checked={activeCategory === opt.value}
              onSelect={() => onCategoryChange(opt.value)}
              containerRef={moreRef}
              options={radioOptions}
              value={activeCategory}
              onChange={onCategoryChange}
            />
          ))}

          {overflow && (
            <div className="relative">
              <button
                ref={moreTriggerRef}
                type="button"
                aria-haspopup="true"
                aria-expanded={moreOpen}
                aria-controls="category-more-popover"
                onClick={() => setMoreOpen((o) => !o)}
                className={[
                  'flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  activeIsHidden ? 'bg-brand-500 text-[#1A1F23]' : 'bg-white text-ink-700 hover:bg-brand-100 hover:text-brand-700',
                ].join(' ')}
              >
                {activeIsHidden ? categoryOptions.find((o) => o.value === activeCategory)?.label : 'More'}
                <Icon name="ChevronDown" size={14} className={moreOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>
              {moreOpen && (
                <div
                  id="category-more-popover"
                  ref={moreRef}
                  role="menu"
                  aria-label="More categories"
                  className="absolute left-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-card border border-ink-500/10 bg-white p-1.5 shadow-lg"
                >
                  {hiddenCats.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        onCategoryChange(opt.value)
                        closeMore(true)
                      }}
                      className={[
                        'block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                        activeCategory === opt.value ? 'bg-brand-500 text-[#1A1F23]' : 'text-ink-700 hover:bg-brand-50 hover:text-brand-700',
                      ].join(' ')}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile trigger */}
      <div className="flex items-center justify-between gap-4 lg:hidden">
        <button
          ref={sheetTriggerRef}
          type="button"
          onClick={() => setSheetOpen(true)}
          aria-haspopup="dialog"
          className="flex h-11 items-center gap-2 rounded-full border border-brand-500/30 bg-brand-50 px-4 text-sm font-medium text-ink-700 hover:bg-brand-100"
        >
          <Icon name="SlidersHorizontal" size={16} />
          Filters
          {chips.length > 0 && <span className="rounded-full bg-clinical-600 px-1.5 py-0.5 text-xs text-white">{chips.length}</span>}
        </button>
      </div>

      {/* Active filter chips + result count — shared across breakpoints */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <FilterChip key={chip.key} label={chip.label} onRemove={chip.onRemove} />
          ))}
        </div>
        <p aria-live="polite" className="font-mono text-xs uppercase tracking-wide text-ink-500/70">
          Showing {resultCount} of {totalCount}
        </p>
      </div>

      {/* Mobile bottom sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button type="button" aria-label="Close filters" className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={closeSheet} />
          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Filter products"
            onPointerDown={(e) => {
              touchStartY.current = e.clientY
            }}
            onPointerUp={(e) => {
              if (touchStartY.current != null && e.clientY - touchStartY.current > 60) closeSheet()
              touchStartY.current = null
            }}
            className={[
              'absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white p-6 shadow-lg',
              reducedMotion ? '' : 'animate-sheet-in',
            ].join(' ')}
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-ink-500/20" aria-hidden="true" />
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-ink-700">Filters</span>
              <button type="button" onClick={closeSheet} aria-label="Close filters" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-brand-100">
                <Icon name="X" size={22} />
              </button>
            </div>

            <p className="mt-6 mb-2 font-mono text-xs uppercase tracking-wide text-ink-500/60">Category</p>
            <div role="radiogroup" aria-label="Filter by category" className="flex flex-wrap gap-2">
              <RadioPill
                option={allOption}
                checked={activeCategory === 'all'}
                onSelect={() => onCategoryChange('all')}
                containerRef={sheetRef}
                options={radioOptions}
                value={activeCategory}
                onChange={onCategoryChange}
              />
              {categoryOptions.map((opt) => (
                <RadioPill
                  key={opt.value}
                  option={opt}
                  checked={activeCategory === opt.value}
                  onSelect={() => onCategoryChange(opt.value)}
                  containerRef={sheetRef}
                  options={radioOptions}
                  value={activeCategory}
                  onChange={onCategoryChange}
                />
              ))}
            </div>

            <button type="button" onClick={closeSheet} className="mt-8 h-12 w-full rounded-btn bg-brand-500 text-[#1A1F23] font-medium transition-colors hover:bg-brand-600">
              Show {resultCount} results
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
