import React from "react";
import { AwardBadge } from "./ui/award-badge";
import { Reveal, SectionLabel } from "./Primitives";

export const AwardsSection = () => {
  return (
    <section className="bg-[#050505] py-24 md:py-32 overflow-hidden border-t border-white/5 relative">
      {/* Tonality Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,176,124,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,176,124,0.04),transparent_70%)]" />
      </div>
      <div className="noise opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <Reveal>
          <div className="mb-16">
            <SectionLabel center>Client Promise</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mt-6">
              <span className="text-white">Transparent process.</span><br />
              <span className="text-orange-light serif italic lowercase">Predictable results.</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mt-6 text-lg">
              We run tight operations. You get clear timelines, robust systems, 
              and a dedicated partner for your digital growth.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <AwardBadge 
              overline="COMMUNICATION" 
              mainText="Clear Project Timelines"
              place={1} 
            />
            <AwardBadge 
              overline="DELIVERY" 
              mainText="End-to-End Testing"
              place={2} 
            />
            <AwardBadge 
              overline="PARTNERSHIP" 
              mainText="Active Maintenance"
              place={3} 
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AwardsSection;
