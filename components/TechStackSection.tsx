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

const TechCard = ({ name, icon, color, desc, index }: { name: string; icon: string; color: string; desc: string; index: number }) => (
  <m.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    className="group relative p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-orange-light/20 transition-all duration-500"
  >
    <div className="flex flex-col gap-4">
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border border-white/10 bg-black/40 group-hover:scale-110 transition-transform duration-500"
        style={{ color }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-white font-bold tracking-tight text-lg">{name}</h3>
        <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">{desc}</p>
      </div>
    </div>
    
    {/* Subtle glow on hover */}
    <div 
      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        background: `radial-gradient(circle at 50% 100%, ${color}15 0%, transparent 70%)`
      }}
    />
  </m.div>
);

export const TechStackSection = () => {
  return (
    <section className="section bg-[#050505] relative py-24 lg:py-48 overflow-hidden">
      {/* Background Silicon Grid (Faded) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <Reveal>
              <SectionLabel>Our Tech Intelligence</SectionLabel>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mt-6 leading-[1.05] text-white">
                Engineered for<br />
                <span className="text-orange-light serif italic lowercase">extreme performance.</span>
              </h2>
            </Reveal>
          </div>
          <m.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-white/40 text-lg max-w-sm"
          >
            We don't just build websites. We build scalable digital infrastructure that crushes your competition.
          </m.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {TECH.map((t, i) => (
            <TechCard key={t.name} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
