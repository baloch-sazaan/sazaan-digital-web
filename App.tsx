import React, { useState, useEffect, useRef, Component, ErrorInfo, ReactNode, lazy, Suspense } from 'react';
import { AnimatePresence, LazyMotion, m, useScroll, useSpring } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';

import { HeroSection } from './components/home-sections-a';
import { SEOMetadata } from './components/primitives';
import { Project } from './types';
import { dbService } from './services/db.service';

const loadFeatures = () => import('framer-motion').then(mod => mod.domAnimation);

const isTouch =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

// Lazy-loaded components for better performance
const Navbar = lazy(() => import('./components/chrome').then(m => ({ default: m.Navbar })));
const Footer = lazy(() => import('./components/chrome').then(m => ({ default: m.Footer })));
const ServicesGlowingGrid = lazy(() => import('./components/ui/services-grid'));
const CTABannerSection = lazy(() => import('./components/cta-banner-section').then(m => ({ default: m.CTABannerSection })));
const ServicesPage = lazy(() => import('./components/services-page').then(m => ({ default: m.ServicesPage })));
const WorkPage = lazy(() => import('./components/work-page').then(m => ({ default: m.WorkPage })));
const ContactPage = lazy(() => import('./components/contact-page').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./components/privacy-policy-page').then(m => ({ default: m.PrivacyPolicyPage })));
const NotFoundPage = lazy(() => import('./components/not-found-page').then(m => ({ default: m.NotFoundPage })));
const ProjectModal = lazy(() => import('./components/project-modal').then(m => ({ default: m.ProjectModal })));

const Testimonials = lazy(() => import('./components/ui/unique-testimonial').then((m) => ({ default: m.Testimonials })));
const RevealImageList = lazy(() => import('./components/ui/reveal-images').then((m) => ({ default: m.RevealImageList })));
const CustomCursor = lazy(() => import('./components/ui/custom-cursor'));
import Preloader from './components/ui/preloader';
import MobilePreloader from './components/ui/mobile-preloader';
const ScrollToTop = lazy(() => import('./components/ui/scroll-to-top').then(m => ({ default: m.ScrollToTop })));

const VALID_PAGES = ['home', 'services', 'work', 'contact', 'privacy-policy'] as const;

const BackgroundWrapper = React.memo(() => (
  <div 
    className="fixed inset-0 z-[-1] pointer-events-none bg-[#0A0A0A]"
    style={{ contain: 'strict' }}
  />
));

const LoadingSkeleton = ({ className = "h-96" }: { className?: string }) => (
  <div className={`w-full ${className} bg-[#E2E2DE]/30 animate-pulse flex items-center justify-center`}>
    <div className="w-10 h-10 border-2 border-[#111111]/10 border-t-[#111111] rounded-full animate-spin" />
  </div>
);

const StructuredData = React.memo(() => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Sazaan Studios",
    "url": "https://sazaanstudio.space",
    "logo": "https://sazaanstudio.space/favicon.webp",
    "image": "https://sazaanstudio.space/favicon.webp",
    "description": "Sazaan Studios builds fast, custom websites and automation systems for cafes, clinics, and local businesses in the US and UK. Based in Islamabad. Get a free audit.",
    "priceRange": "$$$",
    "email": "hello@sazaanstudio.space",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Islamabad",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.6844",
      "longitude": "73.0479"
    },
    "areaServed": ["US", "UK", "Islamabad"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Sazaan Studios Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Medical Clinic Web Design",
            "description": "Custom high-converting websites for medical clinics and healthcare providers."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cafe & Restaurant Systems",
            "description": "Modern website and ordering systems for cafes and local hospitality businesses."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Workflow Automation",
            "description": "Custom AI integration to streamline local business operations and lead generation."
          }
        }
      ]
    },
    "keywords": "web design, AI automation, clinic websites, cafe automation, Sazaan Studios, US UK local business marketing"
  };

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
});

class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("System Runtime Crash:", error, errorInfo);
    
    // Auto-recovery for chunk load errors (common in SPAs after deployment)
    const isChunkError = error.message.includes('fetch') || 
                        error.message.includes('dynamically imported') ||
                        error.message.includes('Loading chunk');
    
    if (isChunkError) {
      console.warn("Detected chunk load failure. Self-healing via reload...");
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="fixed inset-0 z-[1000000] bg-black flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 border-2 border-[#E8FF3A] flex items-center justify-center mb-8 animate-pulse">
             <span className="text-[#E8FF3A] font-barlow font-black text-2xl">!</span>
          </div>
          <h1 className="text-[#E8FF3A] font-barlow font-black text-5xl uppercase tracking-tightest italic mb-4">
            SYSTEM_ERROR
          </h1>
          <p className="text-[#BBBBBB] font-dmsans max-w-md mb-12 uppercase tracking-widest text-[10px] leading-relaxed">
            Our systems encountered a runtime interruption. This usually occurs during background updates or synchronization cycles.
          </p>
          <button 
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = '/'; 
            }}
            className="px-8 py-4 bg-[#E8FF3A] text-black font-barlow font-black uppercase tracking-widest hover:bg-white transition-colors"
          >
            RESTORE SYSTEM
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
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    <SEOMetadata 
      title="Sazaan Studios | Web Design & Automation for Local Businesses" 
      description="Sazaan Studios builds fast, custom websites and automation systems for cafes, clinics, and local businesses in the US and UK. Based in Islamabad. Get a free audit."
      keywords="custom web design, AI business automation, medical clinic websites, cafe website systems, Sazaan Studios, US UK digital agency"
      canonical="https://sazaanstudio.space/"
    />
    <HeroSection setPage={setPage} />
    <Suspense fallback={<LoadingSkeleton className="h-[500px]" />}>
      <ServicesGlowingGrid setPage={setPage} />
    </Suspense>
    <Suspense fallback={<LoadingSkeleton className="h-[600px]" />}>
      <RevealImageList />
    </Suspense>
    <Suspense fallback={<LoadingSkeleton className="h-[400px]" />}>
      <Testimonials />
    </Suspense>
    <Suspense fallback={<LoadingSkeleton className="h-[300px]" />}>
      <CTABannerSection setPage={setPage} />
    </Suspense>
  </m.section>
);

const ScrollProgress = React.memo(() => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  
  return (
    <m.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[5px] bg-[#E8FF3A] origin-[0%] z-[999999] pointer-events-none"
      style={{ scaleX }}
    />
  );
});

export default function App() {
  const [page, setPageRaw] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash && (VALID_PAGES as readonly string[]).includes(hash)) return hash;
      
      const path = window.location.pathname.replace('/', '');
      if (path && (VALID_PAGES as readonly string[]).includes(path)) return path;
      if (path === 'privacy') return 'privacy-policy'; // Alias
      
      return 'home';
    }
    return 'home';
  });

  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const lenis = useLenis();

  const setPage = (newPage: string) => {
    if (newPage === page) return;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    window.history.pushState({ page: newPage }, '', `#${newPage}`);
    setPageRaw(newPage);
  };

  useEffect(() => {
    if (!isTouch) {
      document.documentElement.classList.add('md:cursor-none');
    }
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setPageRaw(event.state.page);
      } else {
        const hash = window.location.hash.replace('#', '');
        setPageRaw(hash || 'home');
      }
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []); // Only once

  useEffect(() => {
    window.history.replaceState({ page }, '', window.location.hash || '#home');
  }, [page]);



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

  const isValidPage = (VALID_PAGES as readonly string[]).includes(page as any);
  const showFooter = page !== 'contact' && isValidPage;

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          isTouch ? (
            <MobilePreloader onComplete={() => setIsLoading(false)} />
          ) : (
            <Preloader onComplete={() => setIsLoading(false)} />
          )
        )}
      </AnimatePresence>
      
      {!isLoading && (
        <LazyMotion features={loadFeatures}>
          <ErrorBoundary>
            <ScrollProgress />
            <StructuredData />
            {isValidPage && <Suspense fallback={null}><Navbar page={page} setPage={setPage} /></Suspense>}
            <Suspense fallback={null}><CustomCursor /></Suspense>
            <Suspense fallback={null}><ScrollToTop /></Suspense>
            <BackgroundWrapper />

            <main id="main-content" role="main" className="relative min-h-screen overflow-x-hidden">
              <AnimatePresence mode="wait">
                  {page === 'home' && (
                    <m.div 
                      key="home" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }} 
                      transition={{ duration: 0.15 }} 
                      className="relative"
                    >
                      <HomePage setPage={setPage} />
                    </m.div>
                  )}
                  {page === 'services' && (
                    <m.div 
                      key="services" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }} 
                      transition={{ duration: 0.15 }} 
                      className="relative"
                    >
                      <Suspense fallback={<LoadingSkeleton className="h-screen" />}><ServicesPage setPage={setPage} /></Suspense>
                    </m.div>
                  )}
                  {page === 'work' && (
                    <m.div 
                      key="work" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }} 
                      transition={{ duration: 0.15 }} 
                      className="relative"
                    >
                      <Suspense fallback={<LoadingSkeleton className="h-screen" />}><WorkPage setPage={setPage} setSelectedProject={setSelectedProject} /></Suspense>
                    </m.div>
                  )}
                  {page === 'contact' && (
                    <m.div 
                      key="contact" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }} 
                      transition={{ duration: 0.15 }} 
                      className="relative"
                    >
                      <Suspense fallback={<LoadingSkeleton className="h-screen" />}><ContactPage setPage={setPage} /></Suspense>
                    </m.div>
                  )}
                  {page === 'privacy-policy' && (
                    <m.div 
                      key="privacy-policy" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }} 
                      transition={{ duration: 0.15 }} 
                      className="relative"
                    >
                      <Suspense fallback={<LoadingSkeleton className="h-screen" />}><PrivacyPolicyPage /></Suspense>
                    </m.div>
                  )}
                  {!isValidPage && (
                    <Suspense fallback={<LoadingSkeleton className="h-screen" />}><NotFoundPage key="404" setPage={setPage} /></Suspense>
                  )}
              </AnimatePresence>
              {showFooter && <Suspense fallback={null}><Footer setPage={setPage} /></Suspense>}
            </main>

            <AnimatePresence>
              {selectedProject && (
                <Suspense fallback={null}>
                  <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                </Suspense>
              )}
            </AnimatePresence>
          </ErrorBoundary>
        </LazyMotion>
      )}
    </>
  );
}
