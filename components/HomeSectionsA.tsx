import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon, SectionLabel, Magnetic } from './Primitives';
import { ContainerScroll } from './ui/container-scroll-animation';
import laptopImg from '@/assets/img/laptop-hero.webp';



const TypingWord = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const stateRef = useRef({ displayText: "", isDeleting: false, index: 0 });

  useEffect(() => {
    stateRef.current = { displayText, isDeleting, index };
  });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const { displayText: dt, isDeleting: del, index: idx } = stateRef.current;
      const currentWord = words[idx];

      if (!del) {
        const next = currentWord.substring(0, dt.length + 1);
        setDisplayText(next);
        if (next.length === currentWord.length) {
          setIsDeleting(true);
          timeout = setTimeout(tick, 1000);
        } else {
          timeout = setTimeout(tick, 120);
        }
      } else {
        const next = currentWord.substring(0, dt.length - 1);
        setDisplayText(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setIndex((idx + 1) % words.length);
          timeout = setTimeout(tick, 500);
        } else {
          timeout = setTimeout(tick, 60);
        }
      }
    };

    timeout = setTimeout(tick, 150);
    return () => clearTimeout(timeout);
  }, [words]);

  return (
    <span className="gradient-text italic font-serif lowercase inline-block min-w-[120px] md:min-w-[200px] text-center tracking-tight">
      {displayText}
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[3px] h-[0.7em] bg-orange-light ml-1 mb-[-0.1em] shadow-[0_0_10px_rgba(255,176,124,0.5)]"
      />
    </span>
  );
};


export const HeroSection = ({ setPage }: { setPage: (p: string) => void }) => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28 sm:pt-40 md:pt-64">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center mb-16 md:mb-32">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-white text-3xl sm:text-5xl md:text-7xl font-bold mt-6 leading-[1.05] tracking-tight text-center"
            >
              We build what you<br />
              <TypingWord words={["think", "need", "deserve", "want"]} />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="body-lg mt-8 max-w-lg mx-auto text-center"
            >
              Websites. SEO. Automation. Social — for local businesses that want to dominate online.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12 px-6 w-full"
            >
              <Magnetic>
                <button
                  className="btn btn-primary w-full sm:w-auto min-h-[56px]"
                  onClick={() => setPage('contact')}
                  aria-label="Contact us to get started with your project"
                >
                  Get Started <Icon name="arrowRight" size={14} aria-hidden="true" />
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  className="btn btn-ghost w-full sm:w-auto min-h-[56px]"
                  onClick={() => setPage('work')}
                  aria-label="View our portfolio of digital work"
                >
                  See Our Work
                </button>
              </Magnetic>
            </motion.div>
          </div>
        }
      >
        <img
          src={laptopImg}
          alt="Premium Agency Laptop"
          className="mx-auto rounded-2xl object-cover h-full w-full object-center transition-all duration-700"
          draggable={false}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          width={1200}
          height={800}
        />
      </ContainerScroll>
    </section>
  );
};





