import React, { useState, useEffect, useRef, Component, ErrorInfo, ReactNode, lazy, Suspense } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m, useScroll, useSpring } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';

const isTouch =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;
import { Navbar, Footer } from './components/Chrome';
import { HeroSection } from './components/HomeSectionsA';
import { AuroraShader } from "./components/ui/aurora-shader";
import { dbService } from './services/db.service';

// Lazy-loaded components for better performance
const HeroParallaxDemo = lazy(() => import('./components/PortfolioGallery').then(m => ({ default: m.HeroParallaxDemo })));
const ServicesGlowingGrid = lazy(() => import('./components/ui/services-grid'));
const TerminalSection = lazy(() => import('./components/HomeSectionsB').then(m => ({ default: m.TerminalSection })));
const CTABannerSection = lazy(() => import('./components/HomeSectionsB').then(m => ({ default: m.CTABannerSection })));
const ServicesPage = lazy(() => import('./components/ServicesPage').then(m => ({ default: m.ServicesPage })));
const WorkPage = lazy(() => import('./components/WorkPage').then(m => ({ default: m.WorkPage })));
const ContactPage = lazy(() => import('./components/ContactPage').then(m => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./components/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const TechStackSection = lazy(() => import('./components/TechStackSection').then((m) => ({ default: m.TechStackSection })));
const AwardsSection = lazy(() => import('./components/AwardsSection').then((m) => ({ default: m.AwardsSection })));
const CustomCursor = lazy(() => import('./components/ui/CustomCursor'));
const ScrollToTop = lazy(() => import('./components/ui/scroll-to-top').then(m => ({ default: m.ScrollToTop })));

const VALID_PAGES = ['home', 'services', 'work', 'contact'] as const;

const BackgroundWrapper = () => (
  <div 
    className="fixed inset-0 z-[-1] pointer-events-none bg-[#050505]"
    style={{
      backgroundImage: `
        radial-gradient(circle at 50% 50%, rgba(255, 176, 124, 0.06), transparent 70%),
        radial-gradient(ellipse 80% 60% at 20% 80%, rgba(232, 130, 90, 0.08), transparent 60%),
        radial-gradient(ellipse 60% 50% at 80% 20%, rgba(255, 176, 124, 0.08), transparent 55%),
        linear-gradient(60deg, #000 0%, hsla(34, 68%, 60%, 0.05) 50%, #000 100%)
      `,
    }}
  >
    {/* Noise layer separated to allow for mix-blend-mode if needed, but simplified */}
    <div className="absolute inset-0 noise opacity-[0.02]" />
  </div>
);

const StructuredData = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Sazaan Digital",
    "description": "Elite Web Design, SEO, and Automation Agency for ambitious local businesses.",
    "url": "https://sazaandigital.com",
    "logo": "https://sazaandigital.com/favicon.png",
    "sameAs": [
      "https://dribbble.com/sazaandigital",
      "https://instagram.com/sazaandigital"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Remote",
      "addressRegion": "US & UK",
      "addressCountry": "US"
    }
  };

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Section error:', error, info); }
  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

const HomePage = ({ setPage }: { setPage: (page: string) => void }) => (
  <m.main
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    <HeroSection setPage={setPage} />
    <Suspense fallback={<div className="min-h-[600px] bg-black/20 animate-pulse" />}>
      <HeroParallaxDemo />
    </Suspense>
    <Suspense fallback={<div className="min-h-[500px]" />}>
      <ServicesGlowingGrid />
    </Suspense>
    <ErrorBoundary>
      <Suspense fallback={<div className="min-h-[500px]" />}>
        <TechStackSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <AwardsSection />
      </Suspense>
    </ErrorBoundary>
    <Suspense fallback={null}>
      <TerminalSection />
    </Suspense>
    <Suspense fallback={null}>
      <CTABannerSection setPage={setPage} />
    </Suspense>
  </m.main>
);

const PreloaderText = () => {
  const words = ["Building", "Optimizing", "Refining", "Scaling"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1200);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100); // Faster typing for better visibility in short window
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <div className="uv-loader">
      <span className="flex items-center gap-2" style={{ fontSize: 18, letterSpacing: '0.05em', color: '#fff', fontWeight: 600 }}>
        Sazaan is <span className="text-[#FFB07C] font-bold">{words[index].substring(0, subIndex)}</span>
        <m.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-[3px] h-[20px] bg-[#FFB07C] ml-1 align-middle"
        />
      </span>
    </div>
  );
};

export default function App() {
  const [page, setPageRaw] = useState<string>('home');
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001
  });

  // Ensure we start at the top on initial mount/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // 1.2s total duration for a premium, non-laggy feel
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    dbService.syncPendingSubmissions();
  }, []);

  const setPage = (p: string) => {
    setPageRaw(p);
  };

  useEffect(() => {
    if (page) {
      window.scrollTo(0, 0);
      dbService.trackPageView(page);
    }
  }, [page]);

  const isValidPage = (VALID_PAGES as readonly string[]).includes(page);
  const showFooter = page !== 'contact' && isValidPage;

  const inner = (
    <LazyMotion features={domAnimation}>
      <div className="relative w-full overflow-x-hidden">
        <m.div
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300 origin-[0%] z-[99999] pointer-events-none"
          style={{ scaleX }}
        />
        <StructuredData />
        {isValidPage && <Navbar page={page} setPage={setPage} />}

        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <BackgroundWrapper />

        <AnimatePresence>
          {loading && (
            <m.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              className="preloader-root"
              aria-hidden={!loading}
            >
              <div className="preloader-logo">
                <img
                  src="/favicon.png"
                  alt="Sazaan Digital"
                  fetchPriority="high"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18 }}
                />
                <div className="preloader-logo-ring" aria-hidden="true" />
              </div>
              <div className="uv-card" aria-live="polite">
                <PreloaderText />
              </div>
              <div className="preloader-progress" role="progressbar" aria-label="Loading Sazaan Digital" />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: '1rem' }}>
                Sazaan Digital — Est. 2026
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <main id="main-content" role="main" className="relative w-full">
          <AnimatePresence mode="wait">
            {page === 'home' && (
              <ErrorBoundary key="home">
                <HomePage setPage={setPage} />
              </ErrorBoundary>
            )}
            {page === 'services' && (
              <ErrorBoundary key="services">
                <Suspense fallback={<div className="fixed inset-0 bg-black z-50 flex items-center justify-center text-orange-light font-mono">LOADING_SERVICES...</div>}>
                  <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ServicesPage setPage={setPage} />
                  </m.div>
                </Suspense>
              </ErrorBoundary>
            )}
            {page === 'work' && (
              <ErrorBoundary key="work">
                <Suspense fallback={<div className="fixed inset-0 bg-black z-50 flex items-center justify-center text-orange-light font-mono">LOADING_WORK...</div>}>
                  <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <WorkPage setPage={setPage} />
                  </m.div>
                </Suspense>
              </ErrorBoundary>
            )}
            {page === 'contact' && (
              <ErrorBoundary key="contact">
                <Suspense fallback={<div className="fixed inset-0 bg-black z-50 flex items-center justify-center text-orange-light font-mono">LOADING_CONTACT...</div>}>
                  <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ContactPage setPage={setPage} />
                  </m.div>
                </Suspense>
              </ErrorBoundary>
            )}
            {!isValidPage && (
              <Suspense fallback={null}>
                <NotFoundPage key="404" setPage={setPage} />
              </Suspense>
            )}
          </AnimatePresence>
          {showFooter && <Footer setPage={setPage} />}
        </main>
      </div>
    </LazyMotion>
  );

  return (
    <ReactLenis root options={{ lerp: 0.11, duration: 1.0, smoothWheel: true, wheelMultiplier: 1.0, touchMultiplier: 1.8, infinite: false }}>
      {inner}
    </ReactLenis>
  );
}
