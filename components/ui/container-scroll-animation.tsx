import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useSpring, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Spring config: high damping = slow/smooth settle, low stiffness = weighted feel
  const springConfig = isMobile
    ? { stiffness: 80, damping: 40, restDelta: 0.001 }
    : { stiffness: 140, damping: 35, restDelta: 0.001 };

  const rawRotate    = useTransform(scrollYProgress, [0, 1], isMobile ? [18, 0] : [20, 0]);
  const rawScale     = useTransform(scrollYProgress, [0, 1], isMobile ? [0.88, 1] : [1.05, 1]);
  const rawTranslate = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -60 : -100]);

  const rotate    = useSpring(rawRotate,    springConfig);
  const scale     = useSpring(rawScale,     springConfig);
  const translate = useSpring(rawTranslate, springConfig);

  return (
    <div
      className="h-[54rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
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
      }}
      className="max-w-5xl mx-auto text-center"
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
        boxShadow: isMobile 
          ? "0 10px 30px rgba(0,0,0,0.5)"
          : "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl mt-12 mx-auto h-[22rem] md:h-[40rem] w-full border-4 border-[#1a1a1a] p-1 md:p-2 bg-[#050505] rounded-[30px] shadow-2xl overflow-hidden"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-black md:rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
};
