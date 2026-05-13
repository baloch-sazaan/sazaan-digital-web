import React from "react";
import { m as motion } from "framer-motion";
import { Terminal, Search, Video, Settings, Lock } from "lucide-react";
import { SectionLabel } from "../primitives";

export default function ServicesGlowingGrid({ setPage }: { setPage: (p: string) => void }) {
  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-start mb-16 md:mb-24">
          <div className="mb-6">
            <SectionLabel>Our Expertise</SectionLabel>
          </div>
          <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black tracking-tightest text-white max-w-4xl leading-[0.9] uppercase font-barlow">
            Building <br />
            <span className="text-white italic">Digital Authority</span>
          </h2>
        </div>

        <motion.ul 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2"
        >
          <motion.li 
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5] will-change-[transform,opacity]"
          >
            <GridItem
              area="h-full"
              icon={<Terminal className="h-4 w-4" />}
              title="FULL-STACK DEVELOPMENT"
              description="Bespoke, high-performance web applications tailored for creative studios and scaling businesses. Built for a professional digital presence."
              onClick={() => setPage('services')}
            />
          </motion.li>
          <motion.li 
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5] will-change-[transform,opacity]"
          >
            <GridItem
              area="h-full"
              icon={<Settings className="h-4 w-4" />}
              title="SYSTEM AUTOMATION"
              description="Strategic booking funnels and CRM workflows that operate autonomously. We build the engine; you focus on your vision."
              onClick={() => setPage('services')}
            />
          </motion.li>
          <motion.li 
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8] will-change-[transform,opacity]"
          >
            <GridItem
              area="h-full"
              icon={<Lock className="h-4 w-4" />}
              title="SYSTEM INTEGRITY"
              description="Uninterrupted maintenance and real-time infrastructure optimization. Your digital presence, protected and perfected 24/7."
              onClick={() => setPage('services')}
            />
          </motion.li>
          <motion.li 
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13] will-change-[transform,opacity]"
          >
            <GridItem
              area="h-full"
              icon={<Video className="h-4 w-4" />}
              title="UI/UX DESIGN"
              description="Visual storytelling that captures brand essence. Modern, user-centric interfaces tailored for the premium creative aesthetic."
              onClick={() => setPage('services')}
            />
          </motion.li>
          <motion.li 
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13] will-change-[transform,opacity]"
          >
            <GridItem
              area="h-full"
              icon={<Search className="h-4 w-4" />}
              title="STRATEGIC GROWTH"
              description="Targeted SEO and positioning strategies to ensure your brand stands out as the preferred choice in your industry."
              onClick={() => setPage('services')}
            />
          </motion.li>
        </motion.ul>
      </div>
    </section>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  onClick?: () => void;
}

const GridItem = React.memo(({ icon, title, description, onClick }: GridItemProps) => {
  return (
    <a 
      href="#services"
      onClick={(e) => { e.preventDefault(); if(onClick) onClick(); }}
      className="relative block h-full rounded-none border border-[#222222] p-1 group hover:border-[#E8FF3A] transition-colors duration-500 cursor-pointer bg-[#0A0A0A] no-underline"
      aria-label={`Learn more about ${title}`}
    >
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-none p-8 bg-[#111111]">
          <div className="relative flex flex-1 flex-col justify-between gap-6">
            <div className="w-fit rounded-lg border border-[#222222] bg-[#0A0A0A] p-3 text-white group-hover:bg-[#E8FF3A] group-hover:border-[#E8FF3A] transition-all duration-500 group-hover:text-black">
              {icon}
            </div>
            <div className="space-y-4">
              <h2 className="tracking-tight font-barlow text-[clamp(1.2rem,3vw,2rem)] font-black text-white uppercase leading-tight">
                {title}
              </h2>
              <p className="text-[clamp(0.9rem,2vw,1.1rem)] text-[#888888] font-dmsans leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </a>
  );
});

export { ServicesGlowingGrid };

