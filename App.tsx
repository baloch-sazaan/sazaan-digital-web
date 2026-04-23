import React, { useState, useEffect, useRef, Component, ErrorInfo, ReactNode, lazy, Suspense } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m, useScroll, useSpring } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';

const isTouch =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;
import { Navbar, Footer } from './components/Chrome';
import { HeroSection } from './components/HomeSectionsA';
import { AuroraShader } from "./components/ui/aurora-shader";
import { ProjectModal, Project } from './components/ProjectModal';
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
        linear-gradient(60deg, #000 0%, hsla(34, 68%, 60%, 0.04) 50%, #000 100%)
      `,
      willChange: 'transform',
      transform: 'translateZ(0)', // Force GPU layer
      backfaceVisibility: 'hidden',
    }}
  >
    {/* Noise layer separated to allow for mix-blend-mode if needed, but simplified */}
    <div className="absolute inset-0 noise opacity-[0.015] pointer-events-none" style={{ transform: 'translateZ(0)' }} />
  </div>
);

const StructuredData = () => {
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
  </m.main>
);



export default function App() {
  const [page, setPageRaw] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    // Immediate hydration signal for the static splash screen
    const t = setTimeout(() => {
      document.body.classList.add('app-ready');
    }, 100);
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

  // Global scroll lock for modals
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

        {/* Splash screen is handled in index.html for maximum performance */}

        <main id="main-content" role="main" className="relative w-full">
          <AnimatePresence mode="wait">
            {page === 'home' && (
              <m.div 
                key="home"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ErrorBoundary>
                  <HomePage setPage={setPage} />
                </ErrorBoundary>
              </m.div>
            )}
            {page === 'services' && (
              <m.div 
                key="services"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ErrorBoundary>
                  <Suspense fallback={<div className="relative min-h-screen bg-[#050505] flex items-center justify-center text-orange-light/20 font-mono tracking-widest text-[10px] uppercase">SZN_LOADING</div>}>
                    <ServicesPage setPage={setPage} />
                  </Suspense>
                </ErrorBoundary>
              </m.div>
            )}
            {page === 'work' && (
              <m.div 
                key="work"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ErrorBoundary>
                  <Suspense fallback={<div className="relative min-h-screen bg-[#050505] flex items-center justify-center text-orange-light/20 font-mono tracking-widest text-[10px] uppercase">SZN_LOADING</div>}>
                    <WorkPage setPage={setPage} setSelectedProject={setSelectedProject} />
                  </Suspense>
                </ErrorBoundary>
              </m.div>
            )}
            {page === 'contact' && (
              <m.div 
                key="contact"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ErrorBoundary>
                  <Suspense fallback={<div className="relative min-h-screen bg-[#050505] flex items-center justify-center text-orange-light/20 font-mono tracking-widest text-[10px] uppercase">SZN_LOADING</div>}>
                    <ContactPage setPage={setPage} />
                  </Suspense>
                </ErrorBoundary>
              </m.div>
            )}
            {!isValidPage && (
              <Suspense fallback={null}>
                <NotFoundPage key="404" setPage={setPage} />
              </Suspense>
            )}
          </AnimatePresence>
          {showFooter && <Footer setPage={setPage} />}
        </main>
        
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );

  return (
    <ReactLenis root options={{ lerp: 0.11, duration: 1.0, smoothWheel: true, wheelMultiplier: 1.0, touchMultiplier: 1.8, infinite: false }}>
      {inner}
    </ReactLenis>
  );
}
