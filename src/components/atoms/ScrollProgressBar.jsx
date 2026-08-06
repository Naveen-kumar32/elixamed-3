import { useScrollProgress } from '../../hooks/useScrollProgress'

/**
 * Fixed 3px gradient bar (Part C4) — one of the signature gradient's three
 * chrome-level uses. Purely reflects scroll position, so it needs no
 * separate reduced-motion gate (nothing animates on its own).
 */
export function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-signature-gradient"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
