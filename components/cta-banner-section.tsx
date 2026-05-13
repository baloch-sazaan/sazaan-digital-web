import React from 'react';
import { Reveal, SectionLabel, Icon, Magnetic } from './primitives';

export const CTABannerSection = ({ setPage }: { setPage: (p: string) => void }) => {
  return (
    <section className="bg-[#F7F7F5] py-24 md:py-40">
      <div className="container relative z-10">
        <Reveal>
          <div className="max-w-[880px] mx-auto p-[clamp(48px,8vw,96px)_clamp(28px,6vw,72px)] bg-white border border-[#E2E2DE] text-center relative overflow-hidden">
            <div className="section-label !bg-[#111111] !text-[#E8FF3A] border-none mx-auto mb-8">Collaborate</div>
            <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black font-barlow text-[#111111] uppercase tracking-tightest leading-[0.95]">
              Building your <span className="italic whitespace-nowrap">digital presence.</span>
            </h2>
            <p className="text-[clamp(0.9rem,2vw,1.1rem)] font-dmsans text-[#555555] mt-6 max-w-md mx-auto">
              We specialize in custom solutions for creative studios and modern businesses. Ready to scale your digital presence?
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              <Magnetic>
                <button 
                  className="px-10 py-4 bg-[#111111] text-white font-bold font-dmsans text-[clamp(0.85rem,1.5vw,1rem)] uppercase tracking-widest hover:bg-[#E8FF3A] hover:text-[#111111] transition-all"
                  onClick={() => setPage('contact')}
                >
                  Start Project <Icon name="arrowRight" size={14} />
                </button>
              </Magnetic>
              <Magnetic>
                <a 
                  className="px-10 py-4 border border-[#E2E2DE] text-[#111111] font-bold font-dmsans text-[clamp(0.85rem,1.5vw,1rem)] uppercase tracking-widest hover:border-[#111111] transition-all"
                  href="mailto:hello@sazaanstudio.space?subject=Project%20Inquiry"
                >
                  Email Manifesto
                </a>
              </Magnetic>
            </div>
            
            {/* Architectural accent */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-[#E2E2DE] -mr-12 -mt-12" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-[#E2E2DE] -ml-12 -mb-12" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

