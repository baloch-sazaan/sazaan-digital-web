import React, { useState, useEffect, useRef, Component, ErrorInfo, ReactNode, lazy, Suspense } from 'react';
import { AnimatePresence, LazyMotion, m, useScroll, useSpring } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';
import { Navbar, Footer } from './components/Chrome';
import { HeroSection } from './components/HomeSectionsA';
import { ProjectModal } from './components/ProjectModal';
import { Project } from './types';
import { dbService } from './services/db.service';

const loadFeatures = () => import('framer-motion').then(mod => mod.domAnimation);

const isTouch =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

// Lazy-loaded components for better performance
const HeroParallaxDemo = lazy(() => import('./components/PortfolioGallery').then(m => ({ default: m.HeroParallaxDemo })));
const ServicesGlowingGrid = lazy(() => import('./components/ui/services-grid'));
const TerminalSection = lazy(() => import('./components/HomeSectionsB').then(m => ({ default: m.TerminalSection })));
const CTABannerSection = lazy(() => import('./components/CTABannerSection').then(m => ({ default: m.CTABannerSection })));
const ServicesPage = lazy(() => import('./components/ServicesPage').then(m => ({ default: m.ServicesPage })));
const WorkPage = lazy(() => import('./components/WorkPage').then(m => ({ default: m.WorkPage })));
const ContactPage = lazy(() => import('./components/ContactPage').then(m => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./components/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const TechStackSection = lazy(() => import('./components/TechStackSection').then((m) => ({ default: m.TechStackSection })));
const AwardsSection = lazy(() => import('./components/AwardsSection').then((m) => ({ default: m.AwardsSection })));
const CustomCursor = lazy(() => import('./components/ui/CustomCursor'));
const ScrollToTop = lazy(() => import('./components/ui/scroll-to-top').then(m => ({ default: m.ScrollToTop })));

const VALID_PAGES = ['home', 'services', 'work', 'contact'] as const;

const BackgroundWrapper = React.memo(() => (
  <div 
    className="fixed inset-0 z-[-1] pointer-events-none bg-[#080808]"
    style={{
      backgroundImage: `
        radial-gradient(circle at 15% 15%, rgba(255, 176, 124, 0.12), transparent 50%),
        radial-gradient(circle at 85% 85%, rgba(232, 130, 90, 0.1), transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(255, 176, 124, 0.05), transparent 70%),
        radial-gradient(circle at 10% 90%, rgba(255, 176, 124, 0.04), transparent 40%),
        linear-gradient(180deg, #080808 0%, #030303 100%)
      `,
      contain: 'strict'
    }}
  >
    <div className="absolute inset-0 noise opacity-[0.015] pointer-events-none" style={{ contain: 'strict' }} />
  </div>
));

const StructuredData = React.memo(() => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Sazaan Digital",
    "description": "Elite Web Design, SEO, and Automation Agency for ambitious local businesses.",
    "url": "https://sazaandigital.com",
    "logo": "https://sazaandigital.com/favicon.webp",
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
});

class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Section error:', error, info); }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-12 text-center">
          <h3 className="text-orange-light font-heading text-2xl mb-4">SYSTEM_RECOVERY_REQUIRED</h3>
          <p className="text-white/40 mb-8 max-w-md">An unexpected error occurred in this module. Our digital architecture is self-healing, please refresh or return home.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-orange-light hover:text-black transition-all"
          >
            RETURN TO ORIGIN
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const HomePage = ({ setPage }: { setPage: (page: string) => void }) => (
  <m.section
    id="home-page"
    className="relative"
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    <HeroSection setPage={setPage} />
    <Suspense fallback={<div className="min-h-[400px] bg-white/[0.02] animate-pulse rounded-3xl mx-6" />}>
      <HeroParallaxDemo />
    </Suspense>
    <Suspense fallback={<div className="min-h-[500px]" />}>
      <ServicesGlowingGrid setPage={setPage} />
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
  </m.section>
);

export default function App() {
  const [page, setPageRaw] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      return hash || 'home';
    }
    return 'home';
  });

  const setPage = (newPage: string) => {
    if (newPage === page) return;
    setPageRaw(newPage);
    window.scrollTo({ top: 0, behavior: 'auto' });
    window.history.pushState({ page: newPage }, '', `#${newPage}`);
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setPageRaw(event.state.page);
      } else {
        const hash = window.location.hash.replace('#', '');
        setPageRaw(hash || 'home');
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', handlePopState);
    window.history.replaceState({ page }, '', window.location.hash || '#home');
    return () => window.removeEventListener('popstate', handlePopState);
  }, [page]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      document.body.classList.add('app-ready');
    }, 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    dbService.syncPendingSubmissions();
  }, []);

  useEffect(() => {
    if (page) {
      window.scrollTo(0, 0);
      dbService.trackPageView(page);
    }
  }, [page]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  const isValidPage = (VALID_PAGES as readonly string[]).includes(page);
  const showFooter = page !== 'contact' && isValidPage;

  const lenisOptions = {
    lerp: 0.12,
    duration: 1,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  };

  const inner = (
    <LazyMotion features={loadFeatures}>
      <ErrorBoundary>
        <m.div
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300 origin-[0%] z-[99999] pointer-events-none"
          style={{ scaleX }}
        />
        <StructuredData />
        {isValidPage && <Navbar page={page} setPage={setPage} />}
        <Suspense fallback={null}><CustomCursor /></Suspense>
        <Suspense fallback={null}><ScrollToTop /></Suspense>
        <BackgroundWrapper />
        <main id="main-content" role="main" className="relative min-h-screen">
          <AnimatePresence mode="wait">
            {page === 'home' && (
              <m.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="relative" style={{ contentVisibility: 'auto' }}>
                <HomePage setPage={setPage} />
              </m.div>
            )}
            {page === 'services' && (
              <m.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="relative" style={{ contentVisibility: 'auto' }}>
                <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}><ServicesPage setPage={setPage} /></Suspense>
              </m.div>
            )}
            {page === 'work' && (
              <m.div key="work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="relative" style={{ contentVisibility: 'auto' }}>
                <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}><WorkPage setPage={setPage} setSelectedProject={setSelectedProject} /></Suspense>
              </m.div>
            )}
            {page === 'contact' && (
              <m.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="relative" style={{ contentVisibility: 'auto' }}>
                <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}><ContactPage setPage={setPage} /></Suspense>
              </m.div>
            )}
            {!isValidPage && (
              <Suspense fallback={null}><NotFoundPage key="404" setPage={setPage} /></Suspense>
            )}
          </AnimatePresence>
          {showFooter && <Footer setPage={setPage} />}
        </main>
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>
      </ErrorBoundary>
    </LazyMotion>
  );

  return (
    <ReactLenis root options={lenisOptions}>
      {inner}
    </ReactLenis>
  );
}
