/** First focusable element on the page — jumps past chrome to <main>. */
export function SkipLink({ targetId = 'main-content' }) {
  return (
    <a href={`#${targetId}`} className="skip-link">
      Skip to content
    </a>
  )
}
