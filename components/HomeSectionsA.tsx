import React, { useRef, useState, useEffect } from 'react';
import { m as motion } from 'framer-motion';
import { Icon, SectionLabel, Magnetic, Reveal } from './Primitives';
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
    <span 
      className="gradient-text lowercase inline-flex items-center justify-center min-w-[120px] md:min-w-[200px] min-h-[1.5em] text-center tracking-normal"
      style={{ fontFamily: "'OffBit101', monospace", fontSize: '0.9em', fontWeight: 400 }}
    >
      {displayText}
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[3px] h-[0.7em] bg-orange-light ml-1 mb-[-0.1em] shadow-[0_0_10px_rgba(255,176,124,0.5)] flex-shrink-0"
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
            <Reveal delay={0.1}>
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-white text-3xl sm:text-5xl md:text-7xl font-normal mt-6 leading-[1.05] tracking-tight text-center"
                style={{ fontFamily: "'AfterRegular', sans-serif" }}
              >
                We build what you<br />
                <TypingWord words={["think", "need", "deserve", "want"]} />
              </motion.h1>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="body-lg mt-8 max-w-xl mx-auto text-center text-white/60">
                Build. Rank. Automate. Digital systems that scale local businesses
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12 px-6 w-full">
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
              </div>
            </Reveal>
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
          {...({ fetchpriority: "high" } as any)}
          width={782}
          height={588}
          sizes="(max-width: 782px) 100vw, 782px"
        />
      </ContainerScroll>
    </section>
  );
};





