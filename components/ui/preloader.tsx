import React, { useEffect, useState } from "react";
import { m } from "framer-motion";

/**
 * Cinematic Preloader Component
 * High-impact brand reveal with fluid counter and grid optics.
 * Optimized for: #E8FF3A background with black 'outgrid' and centered logo.
 */
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800); 
          return 100;
        }
        const inc = Math.random() > 0.8 ? 15 : 3;
        return Math.min(100, prev + inc);
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <m.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[9999999] bg-[#E8FF3A] flex items-center justify-center overflow-hidden font-barlow"
    >
      {/* Black Outgrid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.1] pointer-events-none">
        <div 
          className="w-full h-full" 
          style={{ 
            backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>

      {/* Decorative Crosshairs */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black -translate-x-1/2" />
          <div className="absolute left-0 top-1/2 w-full h-[1px] bg-black -translate-y-1/2" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* The Core Logo - Black Square with Yellow Bolt */}
        <m.div
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-24 h-24 md:w-32 md:h-32 bg-[#111111] rounded-[2rem] flex items-center justify-center shadow-2xl relative mb-12"
        >
            <m.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-[#E8FF3A]">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </m.div>
            
            {/* Spinning Aura */}
            <m.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border border-black/10 rounded-[2.5rem]"
            />
        </m.div>

        {/* Counter System */}
        <div className="overflow-hidden">
            <m.div 
                animate={{ y: progress === 100 ? -200 : 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
            >
                <div className="flex items-baseline gap-1">
                    <span className="text-[12vw] md:text-[7vw] font-black text-[#111111] tracking-tighter tabular-nums leading-none">
                        {Math.round(progress)}
                    </span>
                    <span className="text-xl font-bold text-[#111111]/40">%</span>
                </div>
                
                <div className="h-[12vw] md:h-[7vw] flex items-center">
                    <span className="text-[6vw] md:text-[3vw] font-black text-[#111111] tracking-widest uppercase">
                        INITIALIZING
                    </span>
                </div>
            </m.div>
        </div>

        {/* Status indicator */}
        <m.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-col items-center gap-2"
        >
            <div className="flex items-center gap-3 px-6 py-2 bg-black rounded-full shadow-lg">
                <div className="w-2 h-2 rounded-full bg-[#E8FF3A] animate-pulse" />
                <span className="text-[10px] font-bold text-[#E8FF3A] uppercase tracking-[0.4em]">Sazaan Digital Protocol</span>
            </div>
        </m.div>
      </div>

      {/* Edge HUD - Black variants */}
      <div className="absolute top-12 left-12 flex flex-col gap-1 opacity-20">
        <div className="text-[10px] text-black font-bold uppercase tracking-widest">System.Status_OK</div>
        <div className="w-16 h-[1.5px] bg-black" />
      </div>
      <div className="absolute bottom-12 right-12 flex flex-col items-end gap-1 opacity-20">
        <div className="text-[10px] text-black font-bold uppercase tracking-widest">Engine_v3.4.1</div>
        <div className="w-24 h-[1.5px] bg-black" />
      </div>
    </m.div>
  );
};

export default Preloader;
