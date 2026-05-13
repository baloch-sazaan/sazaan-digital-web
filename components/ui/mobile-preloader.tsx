import React, { useEffect, useState } from "react";
import { m } from "framer-motion";

/**
 * Mobile-Optimized Preloader
 * Extremely lightweight, fast-loading visual for mobile devices.
 * Aimed at reducing TBT and improving perceived performance.
 */
const MobilePreloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Mobile progress is much faster
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400); // Shorter exit delay
          return 100;
        }
        // Big jumps for mobile to feel "shooting fast"
        const inc = Math.random() > 0.5 ? 25 : 10;
        return Math.min(100, prev + inc);
      });
    }, 60); // Faster interval
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <m.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="fixed inset-0 z-[9999999] bg-[#0A0A0A] flex flex-col items-center justify-center font-barlow"
    >
      {/* Minimalist Progress Line */}
      <div className="w-48 h-[2px] bg-white/5 relative overflow-hidden mb-8">
        <m.div 
          className="absolute inset-y-0 left-0 bg-[#E8FF3A]"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.1 }}
        />
      </div>

      {/* High-Impact Minimal Text */}
      <div className="flex flex-col items-center">
        <m.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-white tracking-tighter"
        >
          {Math.round(progress)}
        </m.span>
        <m.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="text-[10px] font-bold text-[#E8FF3A] uppercase tracking-[0.6em] mt-2"
        >
          INIT_SEQUENCE
        </m.span>
      </div>

      {/* Background Glitch Accent (Lightweight) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#E8FF3A] animate-pulse" style={{ top: '20%' }} />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#E8FF3A] animate-pulse" style={{ top: '80%', animationDelay: '1s' }} />
      </div>
    </m.div>
  );
};

export default MobilePreloader;
