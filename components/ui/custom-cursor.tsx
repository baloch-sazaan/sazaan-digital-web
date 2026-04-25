import React, { useEffect, useRef, useState } from 'react';
import { m, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const visibleRef = useRef(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Removed spring to ensure 1:1 speed with native cursor
  const cursorX = mouseX;
  const cursorY = mouseY;

  useEffect(() => {
    const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;
    const isMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    
    if (!isLargeScreen || !isMouse) {
      setIsVisible(false);
      return;
    }

    let rafId: number | null = null;
    const latest = { x: 0, y: 0 };

    const moveMouse = (e: MouseEvent) => {
      latest.x = e.clientX;
      latest.y = e.clientY;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        mouseX.set(latest.x);
        mouseY.set(latest.y);
        if (!visibleRef.current) {
          visibleRef.current = true;
          setIsVisible(true);
        }
        rafId = null;
      });
    };

    const handleExit = () => { visibleRef.current = false; setIsVisible(false); };
    const handleEnter = () => { visibleRef.current = true; setIsVisible(true); };

    window.addEventListener('mousemove', moveMouse, { passive: true });
    document.addEventListener('mouseleave', handleExit);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseleave', handleExit);
      document.removeEventListener('mouseenter', handleEnter);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <m.div
      className="hidden lg:block fixed top-0 left-0 w-8 h-8 pointer-events-none z-[2100000]"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        x: '-2px', // Slight offset for tip alignment
        y: '-2px',
        opacity: 1,
        willChange: 'transform',
      }}
    >
      {/* Premium Glow Aura */}
      <m.div 
        className="absolute inset-0 bg-[#3B82F6] rounded-full blur-xl opacity-20 scale-150"
        animate={{ 
          scale: [1.5, 1.8, 1.5],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <img 
        src="https://img.icons8.com/color-pixels/32/blue-pointer.png" 
        alt="Blue Pointer" 
        className="w-full h-full relative z-10"
      />
    </m.div>
  );
};

export default CustomCursor;
