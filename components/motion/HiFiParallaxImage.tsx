import React, { useRef } from 'react';
import { m, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HiFiParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  overlayColor?: string;
  parallaxStrength?: number;
  priority?: boolean;
}

export const HiFiParallaxImage: React.FC<HiFiParallaxImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  overlayColor = "#000000",
  parallaxStrength = 0.2,
  priority = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth out the scroll progress for a high-fidelity feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scale: 1.2 -> 1.0 (Zoom out as we scroll past)
  const scale = useTransform(smoothProgress, [0, 1], [1 + parallaxStrength, 1]);
  
  // Y-Parallax: Subtle offset for depth
  const y = useTransform(smoothProgress, [0, 1], ["-10%", "10%"]);

  // Overlay Opacity: 0.6 -> 0 -> 0.6 (Brightest in the center of viewport)
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.5, 0, 0.5]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden w-full h-full rounded-2xl bg-[#E2E2DE]",
        containerClassName
      )}
      style={{ willChange: 'transform', position: 'relative' }}
    >
      <m.div 
        style={{ scale, y, willChange: 'transform' }}
        className="w-full h-full relative"
      >
        <img 
          src={src} 
          alt={alt}
          {...(priority ? { fetchpriority: "high" } : { loading: "lazy" })}
          className={cn(
            "w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700",
            className
          )}
        />
        
        {/* Dynamic Shadow/Light Overlay */}
        <m.div 
          style={{ 
            opacity: overlayOpacity, 
            backgroundColor: overlayColor,
            willChange: 'opacity' 
          }}
          className="absolute inset-0 pointer-events-none"
        />
      </m.div>
    </div>
  );
};
