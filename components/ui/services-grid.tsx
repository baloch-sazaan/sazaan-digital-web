import React from "react";
import { m as motion } from "framer-motion";
import { Terminal, Search, Video, Settings, Lock } from "lucide-react";
import { SectionLabel } from "../primitives";

export default function ServicesGlowingGrid({ setPage }: { setPage: (p: string) => void }) {
  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-32 bg-[#F7F7F5]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-start mb-16 md:mb-24">
          <div className="mb-6">
            <SectionLabel>Our Expertise</SectionLabel>
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tightest text-[#111111] max-w-4xl leading-[0.9] uppercase font-barlow">
            Building <br />
            <span className="text-[#111111] italic">Digital Authority</span>
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
    <div 
      onClick={onClick}
        className="relative h-full rounded-none border border-[#E2E2DE] p-1 group hover:border-[#E8FF3A] transition-colors duration-500 cursor-pointer bg-[#F7F7F5]"
      >
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-none p-8 bg-white">
          <div className="relative flex flex-1 flex-col justify-between gap-6">
            <div className="w-fit rounded-lg border border-[#E2E2DE] bg-[#F7F7F5] p-3 text-[#111111] group-hover:bg-[#E8FF3A] group-hover:border-[#E8FF3A] transition-all duration-500">
              {icon}
            </div>
            <div className="space-y-4">
              <h3 className="tracking-tight font-barlow text-2xl font-black text-[#111111] uppercase leading-tight">
                {title}
              </h3>
              <p className="text-sm md:text-base text-[#555555] font-dmsans leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
});

export { ServicesGlowingGrid };

