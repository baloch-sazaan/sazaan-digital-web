import React from 'react';
import { Reveal, SectionLabel } from './Primitives';

const TECH = [
  { name: 'React',       icon: '⚛️',  color: '#61DAFB' },
  { name: 'TypeScript',  icon: 'TS',  color: '#3178C6' },
  { name: 'Next.js',     icon: '▲',   color: '#ffffff' },
  { name: 'Node.js',     icon: '⬡',   color: '#339933' },
  { name: 'Tailwind',    icon: '🌊',  color: '#06B6D4' },
  { name: 'PostgreSQL',  icon: '🐘',  color: '#4169E1' },
  { name: 'Supabase',    icon: '⚡',  color: '#3ECF8E' },
  { name: 'Figma',       icon: '◈',   color: '#F24E1E' },
  { name: 'Vercel',      icon: '▲',   color: '#ffffff' },
  { name: 'Docker',      icon: '🐋',  color: '#2496ED' },
  { name: 'Git',         icon: '⑂',   color: '#F05032' },
  { name: 'AWS',         icon: '☁',   color: '#FF9900' },
];

const ROW2 = [
  { name: 'Firebase',    icon: '🔥',  color: '#FFCA28' },
  { name: 'Prisma',      icon: '△',   color: '#5A67D8' },
  { name: 'Framer',      icon: '◉',   color: '#0055FF' },
  { name: 'GraphQL',     icon: '◈',   color: '#E10098' },
  { name: 'Cloudflare',  icon: '☁',   color: '#F48120' },
  { name: 'Nginx',       icon: '⚙',   color: '#009639' },
  { name: 'Flutter',     icon: '◐',   color: '#02569B' },
  { name: 'GitHub',      icon: '⊙',   color: '#ffffff' },
  { name: 'Stripe',      icon: '◈',   color: '#635BFF' },
  { name: 'Redis',       icon: '◇',   color: '#DC382D' },
  { name: 'Python',      icon: '🐍',  color: '#3776AB' },
  { name: 'Three.js',    icon: '△',   color: '#ffffff' },
];

const Badge = ({ name, icon, color }: { name: string; icon: string; color: string }) => (
  <div
    className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03] shrink-0"
    style={{ backdropFilter: 'blur(4px)' }}
  >
    <span className="text-xl leading-none" style={{ color }} aria-hidden="true">{icon}</span>
    <span className="text-sm font-semibold text-white/80 tracking-wide whitespace-nowrap">{name}</span>
  </div>
);

export const TechStackSection = () => {
  const doubled1 = [...TECH, ...TECH];
  const doubled2 = [...ROW2, ...ROW2];

  return (
    <section className="section bg-[#050505] overflow-hidden relative py-20 lg:py-40 border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,176,124,0.07),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* Fade masks on left/right */}
      <div
        className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #050505, transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #050505, transparent)' }}
      />

      <div className="container mx-auto px-4 relative z-10 mb-16">
        <Reveal>
          <div className="text-center">
            <SectionLabel center>Our Tech Stack</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mt-6 leading-[1.1]">
              <span className="text-white">Cutting edge.</span><br />
              <span className="text-orange-light serif italic lowercase">Always.</span>
            </h2>
            <p className="text-white/40 text-base mt-5 max-w-md mx-auto">
              Built with the best tools in the industry — handpicked for performance, scale, and speed.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Marquee row 1 — left */}
      <div className="flex gap-4 mb-4 overflow-hidden">
        <div className="flex gap-4 animate-marquee-left">
          {doubled1.map((t, i) => <Badge key={`r1-${i}`} {...t} />)}
        </div>
      </div>

      {/* Marquee row 2 — right */}
      <div className="flex gap-4 overflow-hidden">
        <div className="flex gap-4 animate-marquee-right">
          {doubled2.map((t, i) => <Badge key={`r2-${i}`} {...t} />)}
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
          will-change: transform;
        }
        .animate-marquee-right {
          animation: marquee-right 28s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left,
          .animate-marquee-right { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default TechStackSection;
