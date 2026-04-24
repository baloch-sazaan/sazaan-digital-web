import React from 'react';
import { m } from 'framer-motion';
import { Reveal, SectionLabel } from './Primitives';

const TECH = [
  { name: 'React',       icon: '⚛️',  color: '#61DAFB', desc: 'Modern Frontend' },
  { name: 'TypeScript',  icon: 'TS',  color: '#3178C6', desc: 'Type Safety' },
  { name: 'Next.js',     icon: '▲',   color: '#ffffff', desc: 'Fast Delivery' },
  { name: 'Node.js',     icon: '⬡',   color: '#339933', desc: 'Scalable Ops' },
  { name: 'Tailwind',    icon: '🌊',  color: '#06B6D4', desc: 'Elite Styling' },
  { name: 'PostgreSQL',  icon: '🐘',  color: '#4169E1', desc: 'Secure Data' },
  { name: 'Supabase',    icon: '⚡',  color: '#3ECF8E', desc: 'Realtime Backend' },
  { name: 'Figma',       icon: '◈',   color: '#F24E1E', desc: 'Bespoke Design' },
  { name: 'Vercel',      icon: '▲',   color: '#ffffff', desc: 'Edge Hosting' },
  { name: 'Framer',      icon: '◉',   color: '#0055FF', desc: 'Cinematic UX' },
  { name: 'Cloudflare',  icon: '☁',   color: '#F48120', desc: 'Global Scale' },
  { name: 'GitHub',      icon: '⊙',   color: '#ffffff', desc: 'Version Control' },
];

const TechCard = ({ name, icon, color, desc, index }: {
  name: string; icon: string; color: string; desc: string; index: number;
}) => (
  <m.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-12% 0px' }}
    transition={{
      duration: 0.55,
      delay: Math.min(index * 0.045, 0.35),
      ease: [0.22, 1, 0.36, 1],
    }}
    whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
    className="group relative p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-orange-light/25 transition-colors duration-300 cursor-default"
    role="listitem"
    aria-label={`${name} — ${desc}`}
  >
    <div className="flex flex-col gap-3 sm:gap-4">
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl border border-white/10 bg-black/40 group-hover:scale-110 group-hover:border-white/20 transition-transform duration-300"
        style={{ color }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div>
        <h3 className="text-white font-bold tracking-tight text-sm sm:text-base leading-tight">{name}</h3>
        <p className="text-white/35 text-[10px] sm:text-xs mt-1 uppercase tracking-widest font-mono">{desc}</p>
      </div>
    </div>

    {/* Per-tech colour glow on hover */}
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
      style={{ background: `radial-gradient(circle at 50% 100%, ${color}18 0%, transparent 65%)` }}
      aria-hidden="true"
    />
  </m.div>
);

export const TechStackSection = () => (
  <section
    className="section bg-[#050505] relative py-24 lg:py-48 overflow-hidden"
    aria-labelledby="tech-heading"
  >
    {/* Subtle grid backdrop */}
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    />

    {/* Warm radial accent */}
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ background: 'radial-gradient(circle at 50% 60%, rgba(255,176,124,0.055) 0%, transparent 65%)' }}
    />

    <div className="container relative z-10">
      {/* Header row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12 mb-16 lg:mb-20">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Our Tech Intelligence</SectionLabel>
            <h2
              id="tech-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mt-4 leading-[1.05] text-white"
            >
              Engineered for<br />
              <span className="text-orange-light serif italic lowercase">extreme performance.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="text-white/40 text-base sm:text-lg max-w-xs lg:max-w-sm leading-relaxed">
            We don't just build websites. We build scalable digital infrastructure that crushes your competition.
          </p>
        </Reveal>
      </div>

      {/* Tech grid — 2 cols mobile → 3 tablet → 4 → 6 desktop */}
      <m.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4"
        role="list"
        aria-label="Technologies we use"
      >
        {TECH.map((t, i) => (
          <TechCard key={t.name} {...t} index={i} />
        ))}
      </m.div>
    </div>
  </section>
);

export default TechStackSection;
