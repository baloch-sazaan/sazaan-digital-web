import React from 'react';
import { Icon, SEOMetadata } from './primitives';

export const NotFoundPage = ({ setPage }: { setPage: (p: string) => void }) => {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-[#F7F7F5]">
      <SEOMetadata 
        title="Page Not Found | Sazaan Digital" 
        description="The page you are looking for does not exist. Return to the home page of Sazaan Digital."
        keywords="404, not found, Sazaan Digital"
        noindex={true}
      />
      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div
          className="font-barlow font-black leading-none tracking-tightest mb-4 select-none text-[#111111] opacity-10"
          style={{
            fontSize: 'clamp(120px, 30vw, 300px)',
          }}
        >
          404
        </div>

        <div className="-mt-16 sm:-mt-24 md:-mt-32 relative z-20">
          <h1 className="text-[#111111] font-black font-barlow uppercase tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', lineHeight: 0.9 }}>
            Page <span className="italic text-[#BBBBBB]">Lost.</span>
          </h1>
          <p className="font-dmsans text-[#555555] mb-10 max-w-sm mx-auto text-[clamp(0.9rem,2vw,1.1rem)]">
            The architectural foundation for this URL does not exist. Return to the mainframe.
          </p>

          <button
            className="px-10 py-4 bg-[#111111] text-white font-bold font-dmsans text-[clamp(0.85rem,1.5vw,1rem)] uppercase tracking-widest hover:bg-[#E8FF3A] hover:text-[#111111] transition-all"
            onClick={() => setPage('home')}
          >
            Back to Base <Icon name="arrowRight" size={14} />
          </button>

          <div className="flex gap-8 justify-center mt-12 flex-wrap">
            {([['home', 'HOME'], ['services', 'SERVICES'], ['work', 'WORK'], ['contact', 'CONTACT']] as const).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setPage(k)}
                className="text-[clamp(0.85rem,1.5vw,1rem)] font-bold font-dmsans tracking-widest text-[#BBBBBB] hover:text-[#111111] transition-colors"
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Architectural accents */}
      <div className="absolute top-12 left-12 w-24 h-[1px] bg-[#E2E2DE]" />
      <div className="absolute top-12 left-12 h-24 w-[1px] bg-[#E2E2DE]" />
      <div className="absolute bottom-12 right-12 w-24 h-[1px] bg-[#E2E2DE]" />
      <div className="absolute bottom-12 right-12 h-24 w-[1px] bg-[#E2E2DE]" />
    </main>
  );
};

