import React from 'react';
import { m as motion } from 'framer-motion';
import { Icon, Reveal, TextReveal } from './primitives';
import { ContainerScroll } from './ui/container-scroll-animation';
import HeroBackgroundDecoration from './ui/hero-background-decoration';
import { HiFiParallaxImage } from './motion/HiFiParallaxImage';
import { ScrollScrubText } from './motion/ScrollScrubText';

import laptopImg from '@/assets/img/laptop-hero.webp';

const PrestigeCircle = () => {
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] },
                opacity: { duration: 0.5 },
            },
        },
    };

    return (
        <div className="absolute -inset-x-[5%] -inset-y-[5%] w-[110%] h-[110%] pointer-events-none z-0">
            <motion.svg
                width="100%"
                height="100%"
                viewBox="0 0 1200 600"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full h-full"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M 950 90 
                       C 1250 300, 1050 480, 600 520
                       C 250 520, 150 480, 150 300
                       C 150 120, 350 80, 600 80
                       C 850 80, 950 180, 950 180"
                    fill="none"
                    strokeWidth="12"
                    stroke="#E8FF3A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={draw}
                    className="opacity-90"
                />
            </motion.svg>
        </div>
    );
};

export const HeroSection = ({ setPage }: { setPage: (p: string) => void }) => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 sm:pt-40 md:pt-48 bg-[#F7F7F5]">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <HeroBackgroundDecoration />
      </div>
      
      <ContainerScroll
        titleComponent={
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                }
            }}
            className="flex flex-col items-center mb-16 md:mb-32 relative z-10"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="relative inline-block px-4 sm:px-12 py-4"
            >
              <h1
                className="text-[#111111] text-[clamp(2.5rem,10vw,8rem)] font-black mt-0 leading-[0.9] tracking-tightest text-center uppercase font-barlow relative z-10"
              >
                <TextReveal>Modern</TextReveal><br />
                <span className="italic">
                  <TextReveal delay={0.2}>DEVELOPMENT</TextReveal>
                </span>
              </h1>
              <PrestigeCircle />
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="mt-10 max-w-xl mx-auto text-center"
            >
              <ScrollScrubText 
                text="Full-stack engineering and UI/UX design for creative studios and modern businesses. We build the tools that power your vision."
                className="text-[#555555] font-dmsans text-lg leading-relaxed uppercase tracking-wider justify-center"
                wordClassName="opacity-20"
              />
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12 px-6 w-full"
            >
              <button
                className="btn btn-primary w-full sm:w-auto min-h-[56px] px-10"
                onClick={() => setPage('contact')}
              >
                Start Your Project <Icon name="arrowRight" size={14} />
              </button>
              <button
                className="btn btn-ghost w-full sm:w-auto min-h-[56px] px-10"
                onClick={() => setPage('work')}
              >
                View Systems
              </button>
            </motion.div>
          </motion.div>
        }
      >
        <HiFiParallaxImage 
          src={laptopImg}
          alt="Sazaan Studios — Digital Architecture"
          parallaxStrength={0.15}
          priority={true}
          containerClassName="rounded-none border border-[#E2E2DE]"
        />
      </ContainerScroll>
    </section>
  );
};
