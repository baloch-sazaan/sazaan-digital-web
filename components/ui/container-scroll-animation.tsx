import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useSpring, useInView, m as motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px 0px" });
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 768
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Simplified spring config for better performance
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  const rawRotate    = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const rawScale     = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const rawTranslate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const rotate    = useSpring(rawRotate,    springConfig);
  const scale     = useSpring(rawScale,     springConfig);
  const translate = useSpring(rawTranslate, springConfig);

  return (
    <div
      className="h-[54rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
      style={{ position: 'relative' }}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{ perspective: '1000px' }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} isMobile={isMobile}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: React.ReactNode }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        willChange: 'transform',
      }}
      className="max-w-5xl mx-auto text-center relative"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
  isMobile,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  isMobile: boolean;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        translateY: translate,
        scale,
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
      className="max-w-5xl mt-12 mx-auto h-[22rem] md:h-[40rem] w-full border border-[#222222] p-1 md:p-2 bg-[#111111] rounded-[30px] overflow-hidden relative shadow-none"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-[#050505] md:rounded-2xl relative">
        {children}
      </div>
    </motion.div>
  );
};
