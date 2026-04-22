import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleExit = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseleave', handleExit);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseleave', handleExit);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99999] mix-blend-difference hidden md:block"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        x: '-50%',
        y: '-50%',
        backgroundColor: '#fff',
      }}
    >
      <div className="absolute inset-0 w-full h-full rounded-full bg-[#FFB07C]/20 blur-xl scale-[3] pointer-events-none" />
    </motion.div>
  );
};

export default CustomCursor;
