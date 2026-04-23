import React, { useEffect, useRef, useState } from "react";
import {
  m,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto pt-10 md:pt-16 pb-4 md:pb-8 px-4 w-full left-0 top-0">
      <h2 className="text-2xl md:text-7xl font-bold text-white leading-tight">
        Our <span className="text-[#FFB07C]">Intelligence</span>
      </h2>
      <p className="max-w-2xl text-base md:text-xl mt-6 text-neutral-400">
        Everything you need. <br /> nothing you don't.
      </p>
    </div>
  );
};

type Product = { title: string; link: string; thumbnail: string };

/* Horizontal scroll row — slides in direction based on 'dir' prop */
const SlideRow = ({
  items,
  translateX,
}: {
  items: Product[];
  translateX: MotionValue<number>;
}) => (
  <m.div
    style={{ x: translateX }}
    className="flex gap-3 mb-3 will-change-transform"
  >
    {items.map((p) => (
      <div
        key={p.title}
        className="relative rounded-2xl overflow-hidden shrink-0 w-[55vw] aspect-[4/3] block cursor-default"
      >
        <img
          src={p.thumbnail}
          alt={p.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-left-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute bottom-2 left-3 text-white text-xs font-semibold truncate max-w-[90%]">
          {p.title}
        </span>
      </div>
    ))}
  </m.div>
);

/* Mobile: 3 scroll-linked horizontal rows — alternating direction */
const MobileParallaxGallery = ({ products }: { products: Product[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const spring = { stiffness: 60, damping: 30, restDelta: 0.001 };

  // Row 1: left → right
  const r1 = useSpring(useTransform(scrollYProgress, [0, 1], [-60, 80]),  spring);
  // Row 2: right → left
  const r2 = useSpring(useTransform(scrollYProgress, [0, 1], [60, -80]),  spring);
  // Row 3: left → right
  const r3 = useSpring(useTransform(scrollYProgress, [0, 1], [-60, 80]),  spring);

  const count = Math.ceil(products.length / 3);
  const row1 = products.slice(0, count);
  const row2 = products.slice(count, count * 2);
  const row3 = products.slice(count * 2);

  return (
    <div ref={ref} className="overflow-hidden px-4 pt-4 pb-20">
      <SlideRow items={row1} translateX={r1} />
      <SlideRow items={row2} translateX={r2} />
      <SlideRow items={row3} translateX={r3} />
    </div>
  );
};

export const HeroParallax = ({
  products,
}: {
  products: Product[];
}) => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (isMobile) return (
    <>
      <div className="max-w-7xl relative mx-auto pt-10 pb-2 px-4 w-full">
        <h2 className="text-2xl font-bold text-white leading-tight">
          Our <span className="text-[#FFB07C]">Intelligence</span>
        </h2>
        <p className="max-w-2xl text-base mt-3 text-neutral-400">
          Everything you need. <br /> nothing you don't.
        </p>
      </div>
      <MobileParallaxGallery products={products} />
    </>
  );

  return <HeroParallaxDesktop products={products} />;
};

const HeroParallaxDesktop = ({
  products,
}: {
  products: { title: string; link: string; thumbnail: string }[];
}) => {
  const count = Math.ceil(products.length / 3);
  const firstRow = products.slice(0, count);
  const secondRow = products.slice(count, count * 2);
  const thirdRow = products.slice(count * 2);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 160, damping: 28, bounce: 0 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.02], [0, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [350, 0]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[280vh] py-0 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <div className="sticky top-0 z-20">
        <m.div style={{ opacity: useTransform(scrollYProgress, [0, 0.25], [1, 0]) }}>
          <Header />
        </m.div>
      </div>
      <m.div style={{ rotateX, rotateZ, translateY, opacity }}>
        <m.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </m.div>
        <m.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </m.div>
        <m.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </m.div>
      </m.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <m.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-64 md:h-96 w-[20rem] md:w-[30rem] relative shrink-0"
    >
      <div className="block h-full w-full cursor-default">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0 filter grayscale-[10%] brightness-90 group-hover/product:grayscale-0 group-hover/product:brightness-100 transition-all duration-500"
          alt={product.title}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </m.div>
  );
};
