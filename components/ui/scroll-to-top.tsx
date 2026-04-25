import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useLenis } from '@studio-freight/react-lenis';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const lenis = useLenis();
  
  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        toggleVisibility();
        rafId = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[6000] md:hidden">
      <AnimatePresence>
        {isVisible && (
          <m.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E2E2DE] bg-white backdrop-blur-md text-[#111111] transition-all hover:bg-[#E8FF3A] hover:border-[#111111] active:scale-95"
          >
            <ChevronUp size={24} strokeWidth={3} />
          </m.button>
        )}
      </AnimatePresence>
    </div>
  );
};
