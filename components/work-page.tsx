import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Reveal, SectionLabel, Icon, TextReveal, SEOMetadata } from './primitives';
import { PointerHighlight } from './ui/pointer-highlight';
import { Project } from '../types';
import { HiFiParallaxImage } from './motion/HiFiParallaxImage';
import { ScrollScrubText } from './motion/ScrollScrubText';

const FALLBACK_WORK: Project[] = [
  { 
    id: '1', 
    tag: 'seo', 
    cat: 'Search / Visibility', 
    title: 'Nexus Global', 
    description: 'High-precision visibility architecture for a premier fintech hub. Engineered for regional dominance and sub-millisecond index responsiveness.', 
    fullSummary: 'A complete architectural overhaul for Nexus Global. We implemented a headless CMS strategy and technical SEO foundation that secured first-page positions for high-value financial keywords across Southeast Asia, resulting in a 400% increase in qualified organic leads.',
    features: ['Technical SEO Audit', 'Edge Content Delivery', 'Global Authority Scaling', 'Performance Architecture'],
    metric: '400% Organic+', 
    status: 'Live', 
    accent: '#E8FF3A', 
    published: true,
    screenshot_url: '/professional_portfolio_mockup_1776819825094.webp'
  },
  { 
    id: '2', 
    tag: 'crm', 
    cat: 'Systems / Management', 
    title: 'Koda Logistics', 
    description: 'Bespoke operational architecture for a pan-European supply chain. Consolidating fragmented data streams into a unified logistics engine.', 
    fullSummary: 'Consolidating cross-border logistics data into a single source of truth. We developed a custom dashboard for real-time tracking and automated carrier management, reducing operational friction by 65% and saving thousands of manual man-hours annually.',
    features: ['Unified Logistics Engine', 'Pipeline Automation', 'Carrier Portal', 'Real-time Telemetry'],
    metric: '65% Frictionless', 
    status: 'Live', 
    accent: '#E8FF3A', 
    published: true,
    screenshot_url: '/agency_crm_dashboard_1776819849378.webp'
  },
  { 
    id: '3', 
    tag: 'automation', 
    cat: 'AI / Efficiency', 
    title: 'Stellar Health', 
    description: 'Autonomous workflow integration for a distributed telemedicine network. Eliminating administrative load through strategic AI deployment.', 
    fullSummary: 'Integration of autonomous processing agents into high-security health data systems. We audited patient on-boarding workflows and replaced manual verification with automated AI logic that reduced processing time by 85% while maintaining HIPAA compliance.',
    features: ['Autonomous AI Agents', 'HIPAA Secure Logic', 'System Integration', 'Scalable Workflows'],
    metric: '85% Efficiency+', 
    status: 'Live', 
    accent: '#E8FF3A', 
    published: true,
    screenshot_url: '/ai_automation_workflow_1776819873461.webp'
  },
];

export const WorkPage = ({ setPage, setSelectedProject }: { setPage: (p: string) => void, setSelectedProject: (p: Project | null) => void }) => {
  const [filter, setFilter] = useState<string>('all');
  const [work] = useState<Project[]>(FALLBACK_WORK);
  
  const filters = [
    ['all', 'ALL PROJECTS'], 
    ['seo', 'SEO'], 
    ['crm', 'CRM'],
    ['automation', 'AUTOMATIONS']
  ];

  const visible = React.useMemo(() => 
    filter === 'all' ? work : work.filter(w => w.tag === filter),
  [filter, work]);

  return (
    <m.main
      initial="hidden"
      animate="show"
      exit="exit"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        },
        exit: { opacity: 0, transition: { duration: 0.2 } }
      }}
      className="bg-[#0A0A0A]"
    >
      <SEOMetadata 
        title="Our Systems & Architecture" 
        description="View our latest projects in digital architecture, custom system design, and high-performance web development."
        keywords="web design portfolio, system architecture, Sazaan Studios projects"
        canonical="https://sazaanstudio.space/work"
      />
      <section className="pt-40 pb-24 border-b border-[#222222]">
        <div className="container">
          <m.div variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}>
            <SectionLabel>Our Portfolio</SectionLabel>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-end mt-10">
            <m.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="lg:col-span-8"
            >
              <h1 className="text-[clamp(2.5rem,8vw,6.5rem)] font-black text-white font-barlow uppercase leading-[1.05] tracking-tightest">
                <TextReveal>Build Your</TextReveal> <br />
                <span className="italic text-[#E8FF3A] bg-black px-6 -ml-4 inline-block whitespace-nowrap">
                  <TextReveal delay={0.3}>Digital Presence</TextReveal>
                </span>
              </h1>
            </m.div>

            <m.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }} 
              className="lg:col-span-4"
            >
                <ScrollScrubText 
                  text="We engineer high-performance systems for those who demand technical excellence. Explore our architecture."
                  className="text-lg font-dmsans text-[#A0A0A0] leading-relaxed mb-8"
                  wordClassName="opacity-25"
                />
                <div className="flex flex-col gap-6">
                    <div className="text-xl md:text-2xl font-black font-barlow tracking-tight text-white uppercase leading-tight">
                      The best way to grow is to{' '}
                      <PointerHighlight>
                        <span className="bg-[#E8FF3A] px-2">collaborate</span>
                      </PointerHighlight>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedProject({
                        id: 'overview',
                        tag: 'architecture',
                        cat: 'Philosophy',
                        title: 'The Modern Standard',
                        description: 'Strategic growth engine for modern scaling businesses.',
                        fullSummary: 'We do not build generic websites. We build modern digital foundations. Our focus is on high-performance, high-conversion systems that make our clients the undisputed authority in their industry.',
                        features: ['High-Performance Build', 'Modern UI/UX', 'Automation Systems', 'Strategic Design'],
                        metric: '100% Quality',
                        status: 'Active',
                        accent: '#E8FF3A',
                        published: true
                      })}
                      className="group flex items-center gap-3 text-white font-bold tracking-widest text-xs uppercase"
                    >
                      <div className="w-10 h-10 rounded-full border border-[#222222] flex items-center justify-center group-hover:bg-[#E8FF3A] group-hover:border-[#E8FF3A] transition-all">
                        <Icon name="zap" size={14} />
                      </div>
                      <span>Section Manifesto</span>
                    </button>
                </div>
            </m.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="flex gap-4 flex-wrap mb-16" role="group" aria-label="Filter work">
            {filters.map(([k, l], i) => (
              <m.button 
                key={k} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setFilter(k)} 
                className={`px-8 py-3 rounded-none text-xs font-bold font-dmsans tracking-widest uppercase transition-all border ${
                  filter === k ? 'bg-[#E8FF3A] border-[#111111] text-black' : 'bg-[#111111] border-[#222222] text-[#888888] hover:border-white'
                }`}
              >
                {l}
              </m.button>
            ))}
          </div>

          <m.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {visible.map((w) => (
              <m.a
                key={w.id}
                href="#work"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group bg-[#111111] border border-[#222222] rounded-none overflow-hidden flex flex-col hover:border-[#E8FF3A] transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl no-underline"
                onClick={(e) => { e.preventDefault(); setSelectedProject(w); }}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(w); } }}
                role="button"
                tabIndex={0}
                aria-label={`View project: ${w.title}`}
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-[#050505] border-b border-[#222222]">
                  <HiFiParallaxImage 
                    src={w.screenshot_url || ''} 
                    alt={w.title} 
                    width={800}
                    height={500}
                    loading="lazy"
                    parallaxStrength={0.1}
                    containerClassName="rounded-none h-full"
                    className="grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute bottom-4 left-6 z-50">
                    <span className="text-[10px] font-bold tracking-widest text-[#888888] uppercase font-dmsans bg-black px-2 py-1 border border-[#222222]">
                      {w.cat}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h2 className="text-2xl font-black font-barlow text-white uppercase tracking-tight group-hover:text-[#E8FF3A] inline-block self-start transition-all">
                    {w.title}
                  </h2>
                  <p className="text-sm font-dmsans text-[#A0A0A0] mt-4 mb-8 leading-relaxed">
                    {w.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-[#222222] flex justify-between items-center">
                    <div>
                      <div className="text-[10px] font-bold text-[#555555] uppercase tracking-widest mb-1">Result</div>
                      <div className="text-lg font-black font-barlow text-[#E8FF3A] uppercase">{w.metric}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-[#555555] uppercase tracking-widest mb-1">Status</div>
                      <div className="text-lg font-black font-barlow text-white uppercase">{w.status}</div>
                    </div>
                  </div>
                </div>
              </m.a>
            ))}
          </m.div>
        </div>
      </section>
    </m.main>
  );
};

