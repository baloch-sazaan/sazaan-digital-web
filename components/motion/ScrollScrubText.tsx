import React, { useRef, useMemo } from 'react';
import { m, useScroll, useTransform, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollScrubTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

/**
 * ScrollScrubText - A high-impact text component that reveals word-by-word
 * synchronized with the scroll progress.
 */
export const ScrollScrubText: React.FC<ScrollScrubTextProps> = ({
  text,
  className,
  wordClassName
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = useMemo(() => text.split(" "), [text]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "start 20%"] // Triggers as it moves through the viewport
  });

  return (
    <p 
      ref={containerRef}
      className={cn(
        "flex flex-wrap gap-x-[0.3em] gap-y-[0.1em] font-barlow font-black uppercase tracking-tightest",
        className
      )}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        
        return (
          <Word 
            key={i} 
            range={[start, end]} 
            progress={scrollYProgress}
            className={wordClassName}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
};

interface WordProps {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
  className?: string;
}

const Word: React.FC<WordProps> = ({ children, range, progress, className }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <m.span 
      style={{ opacity, willChange: 'opacity' }}
      className={cn("inline-block", className)}
    >
      {children}
    </m.span>
  );
};
