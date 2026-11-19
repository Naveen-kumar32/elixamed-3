import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SkipLink } from './components/atoms/SkipLink'
import { ScrollProgressBar } from './components/atoms/ScrollProgressBar'
import { Skeleton } from './components/atoms/Skeleton'
import { Button } from './components/atoms/Button'
import { Navbar } from './components/organisms/Navbar'
import { Footer } from './components/organisms/Footer'
import { PageTransition } from './components/organisms/PageTransition'
import { SiteLoader } from './components/organisms/SiteLoader'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Products = lazy(() => import('./pages/Products'))
const Services = lazy(() => import('./pages/Services'))
const Quality = lazy(() => import('./pages/Quality'))
const Contact = lazy(() => import('./pages/Contact'))
const Terms = lazy(() => import('./pages/Terms'))
const Privacy = lazy(() => import('./pages/Privacy'))

/** Route-level Suspense fallback — a skeleton shell, not a blank screen. */
function PageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <Skeleton className="h-10 w-2/3 max-w-md" />
      <Skeleton className="mt-6 h-4 w-full max-w-xl" />
      <Skeleton className="mt-2 h-4 w-full max-w-lg" />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-7xl flex-col items-start justify-center px-6 py-24">
      <p className="font-mono text-sm uppercase tracking-wide text-clinical-700">404</p>
      <h1 className="mt-3 text-display-2 font-display font-semibold text-ink-700">Page not found.</h1>
      <p className="mt-3 max-w-[50ch] text-ink-500">The page you’re looking for doesn’t exist or may have moved.</p>
      <Button to="/" className="mt-8" icon="ArrowRight">
        Back to home
      </Button>
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let readyTimer = null
    const fallbackTimer = window.setTimeout(() => setLoading(false), 1600)
    const finish = () => {
      readyTimer = window.setTimeout(() => setLoading(false), 650)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }

    return () => {
      window.clearTimeout(fallbackTimer)
      if (readyTimer) window.clearTimeout(readyTimer)
      window.removeEventListener('load', finish)
    }
  }, [])

  return (
    <>
      {loading && <SiteLoader />}
      <SkipLink />
      <ScrollProgressBar />
      <Navbar />

      <main id="main-content" className="pt-20">
        <PageTransition>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/quality" element={<Quality />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </main>

      <Footer />
    </>
  )
}

export default App
