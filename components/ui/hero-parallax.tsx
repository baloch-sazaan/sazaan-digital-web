import React, { useEffect, useState } from "react";
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

/* Mobile: flat 2-column grid — no scroll-linked transforms, no springs */
const MobileGallery = ({ products }: { products: { title: string; link: string; thumbnail: string }[] }) => (
  <section className="px-4 pt-6 pb-20">
    <div className="grid grid-cols-2 gap-4 mt-2">
      {products.slice(0, 6).map((p) => (
        <a
          key={p.title}
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative rounded-2xl overflow-hidden aspect-[4/3] block"
        >
          <img
            src={p.thumbnail}
            alt={p.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-left-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <span className="absolute bottom-2 left-3 text-white text-xs font-semibold truncate max-w-[90%]">{p.title}</span>
        </a>
      ))}
    </div>
  </section>
);

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
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
      <MobileGallery products={products} />
    </>
  );

  return <HeroParallaxDesktop products={products} />;
};

const HeroParallaxDesktop = ({
  products,
}: {
  products: { title: string; link: string; thumbnail: string }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 120, damping: 25, bounce: 0 };

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
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full w-full"
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0 filter grayscale-[10%] brightness-90 group-hover/product:grayscale-0 group-hover/product:brightness-100 transition-all duration-500"
          alt={product.title}
          loading="lazy"
          decoding="async"
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </m.div>
  );
};
