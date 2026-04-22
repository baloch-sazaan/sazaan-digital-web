import React from "react";
import { Terminal, Search, Video, Settings, Lock } from "lucide-react";
import { SectionLabel } from "../Primitives";

export default function ServicesGlowingGrid() {
  return (
    <section className="relative py-24 md:py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-start mb-16 md:mb-24">
          <div className="mb-6">
            <SectionLabel>Our Intelligence</SectionLabel>
          </div>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white max-w-3xl leading-[1.1]">
            Everything you need. <br />
            <span className="text-orange-light italic serif lowercase">nothing you don't.</span>
          </h2>
        </div>

        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Terminal className="h-4 w-4 text-orange-light" />}
            title="High-End Web Build"
            description="Cinematic, high-performance websites built with the latest stack for speed, SEO, and extreme conversion."
          />

          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Settings className="h-4 w-4 text-orange-light" />}
            title="Lead Gen & CRM Ops"
            description="Automated funnels and CRM workflows that handle the boring stuff, globally and at scale."
          />

          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<Lock className="h-4 w-4 text-orange-light" />}
            title="Active Maintenance"
            description="Continuous optimization and dedicated support to keep your digital engine running at peak performance."
          />

          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<Video className="h-4 w-4 text-orange-light" />}
            title="Premium Media Management"
            description="Elite video and social content that captures attention and converts scroll-by traffic into loyal customers."
          />

          <GridItem
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={<Search className="h-4 w-4 text-orange-light" />}
            title="SEO & Rank Strategy"
            description="Aggressive SEO audits and content strategies to dominate your niche and stay found on page one."
          />
        </ul>
      </div>
    </section>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-white/10 p-2 md:rounded-3xl md:p-3 group hover:border-orange-light/20 transition-colors duration-500">
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 bg-[#0d0d0d]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-white/10 bg-white/[0.03] p-2 text-orange-light group-hover:scale-110 transition-transform duration-500">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="tracking-tighter font-heading text-xl md:text-2xl font-bold text-white">
                {title}
              </h3>
              <p className="text-sm md:text-base text-neutral-500 leading-relaxed group-hover:text-neutral-300 transition-colors duration-500">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
