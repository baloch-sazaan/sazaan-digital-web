import React, { useMemo, useRef } from 'react';
import { m, useInView } from 'framer-motion';

const HeroBackgroundDecoration = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "0px" });

  const stars = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5
    }));
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Dot Grid - Static for performance */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#111111 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Twinkling Stars — only mounted when section is in viewport */}
      {isInView && (
        <div className="absolute inset-0">
          {stars.map((star) => (
            <m.div
              key={star.id}
              initial={{ opacity: 0.1 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut"
              }}
              className="absolute bg-[#111111] rounded-full"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                translateZ: 0
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroBackgroundDecoration;
