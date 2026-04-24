import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

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

  // Set the top coordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
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
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-orange-light shadow-[0_0_20px_rgba(255,176,124,0.15)] transition-all hover:bg-black/80 active:scale-95"
          >
            <ChevronUp size={24} strokeWidth={3} />
          </m.button>
        )}
      </AnimatePresence>
    </div>
  );
};
