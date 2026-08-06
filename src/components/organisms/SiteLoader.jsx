export function SiteLoader() {
  return (
    <div className="site-loader fixed inset-0 z-[100] grid place-items-center text-white" role="status" aria-live="polite" aria-label="Loading website">
      <div className="flex flex-col items-center gap-5">
        <div className="site-loader-mark grid h-28 w-28 place-items-center rounded-full bg-white/10 shadow-lg shadow-ink-900/30">
          <img
            src="/images/icon/Elixamed%202000x2000.png"
            alt=""
            width={2000}
            height={2000}
            className="h-20 w-20 object-contain"
          />
        </div>
        <div className="text-center">
          <p className="font-display text-2xl font-semibold text-white">ElixaMed</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-brand-100">Loading verified supply</p>
        </div>
      </div>
    </div>
  )
}
