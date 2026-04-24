import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Reveal, SectionLabel, Icon } from './Primitives';
import { Project } from '../types';

const FALLBACK_WORK: Project[] = [
  { 
    id: '1', 
    tag: 'web', 
    cat: 'Creative / Digital', 
    title: 'Personal Creative Portfolio', 
    description: 'A high-performance, minimalist portfolio engineered for a creative professional. Optimized for cinematic impact and lightning-fast load times.', 
    fullSummary: 'This project involved building a unique digital presence for an elite creative director. The focus was on raw performance and aesthetic precision, utilizing custom shaders and motion physics to create an immersive scrollytelling experience. We prioritized asset optimization to ensure a 100/100 Lighthouse score while maintaining "Apple-level" visual fidelity.',
    features: ['Custom Motion Engine', 'Asset Optimization (WebP)', 'Responsive Design System', 'Dark Mode UI/UX', 'SEO Architecture'],
    metric: '+45% Engagement', 
    status: 'Live', 
    accent: '#FFB07C', 
    published: true,
    screenshot_url: '/professional_portfolio_mockup_1776819825094.webp'
  },
  { 
    id: '2', 
    tag: 'agency', 
    cat: 'Systems / CRM', 
    title: 'Agency Management CRM', 
    description: 'A comprehensive custom CRM developed for a USA-based agency. Features automated client handling, lead tracking, and project workflow optimization.', 
    fullSummary: 'Our mission was to streamline backend operations for a scaling marketing agency. We developed a bespoke CRM that consolidated disparate tools into a single source of truth. The system automates lead intake, automates reporting, and reduces manual data entry by over 50%.',
    features: ['Automated Lead Routing', 'Client Portal', 'Invoicing API Integration', 'Real-time Analytics Dashboard', 'Custom Webhooks'],
    metric: '2x Efficiency', 
    status: 'Live', 
    accent: '#FF9B1A', 
    published: true,
    screenshot_url: '/agency_crm_dashboard_1776819849378.webp'
  },
  { 
    id: '5', 
    tag: 'agency', 
    cat: 'AI / Automation', 
    title: 'AI Workflow Integration', 
    description: 'Bespoke AI automation infrastructure for a company looking to eliminate manual bottlenecks. Implementation of secure, automated business processes.', 
    fullSummary: 'Integration of LLMs into internal document processing pipelines. We audited existing manual workflows and replaced them with intelligent automation that categorizes, summarizes, and routes data with 99% accuracy. This transition allowed our client to reallocate 20+ hours of team labor per week.',
    features: ['Natural Language Processing', 'Automated QA Loops', 'Document Vectorization', 'Slack Integration', 'Security Governance'],
    metric: '-75% Ops Time', 
    status: 'Live', 
    accent: '#FFC97B', 
    published: true,
    screenshot_url: '/ai_automation_workflow_1776819873461.webp'
  },
  { 
    id: '3', 
    tag: 'seo', 
    cat: 'Search / Visibility', 
    title: 'Local SEO Domination', 
    description: 'Strategic SEO campaign for a multi-location service business. Focused on local ranking factors, content authority, and conversion optimization.', 
    fullSummary: 'An intense 6-month SEO overhaul for a highly competitive local niche. We performed deep technical remediation, optimized Google Business Profiles for 12 locations, and executed a high-authority backlink strategy. The result was a complete first-page takeover for all primary keywords.',
    features: ['Technical SEO Audit', 'GBP Optimization', 'Local Backlink Sourcing', 'Content Strategy', 'Conversion Rate Optimization'],
    metric: '#1 Rankings', 
    status: 'Live', 
    accent: '#FFC97B', 
    published: true,
    screenshot_url: '/luxury_real_estate_mockup_1776820888718.webp'
  },
  { 
    id: '4', 
    tag: 'brand', 
    cat: 'Identity / Print', 
    title: 'The Foundry Brand Identity', 
    description: 'Complete visual identity system for a modern manufacturing group. From logo design to digital brand guidelines and visual storytelling.', 
    fullSummary: 'Developing a cohesive brand language that bridges the gap between industrial strength and digital modernism. We crafted a comprehensive suite of assets, including typography pairings, color systems, and digital guidelines that ensure consistency across all marketing touchpoints.',
    features: ['Core Identity System', 'Visual Brand Guidelines', 'Stationery Design', 'Digital Asset Library', 'Brand Voice Definition'],
    metric: 'High Authority', 
    status: 'Live', 
    accent: '#FFB07C', 
    published: true,
    screenshot_url: '/creative_agency_mockup_1776820859927.webp'
  },
];

const LazyImage = React.memo(({ src, alt, accent }: { src: string, alt: string, accent: string }) => {
  const [isInView, setIsInView] = useState(false);
  
  return (
    <m.div 
      className="w-full h-full relative"
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      viewport={{ margin: "200px" }}
    >
      {isInView ? (
        <m.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          whileHover={{ opacity: 0.8 }}
          src={src} 
          alt={alt}
          width={320}
          height={200}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 will-change-transform"
          style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-12 h-12 rounded-full border border-white/5 animate-pulse" style={{ background: `${accent}05` }} />
        </div>
      )}
    </m.div>
  );
});

export const WorkPage = ({ setPage, setSelectedProject }: { setPage: (p: string) => void, setSelectedProject: (p: Project | null) => void }) => {
  const [filter, setFilter] = useState<string>('all');
  const [work, setWork] = useState<Project[]>(FALLBACK_WORK);
  
  const filters = [
    ['all', 'All Work'], 
    ['web', 'Websites'], 
    ['agency', 'Agency'],
    ['seo', 'SEO'], 
    ['brand', 'Brand']
  ];

  const visible = React.useMemo(() => 
    filter === 'all' ? work : work.filter(w => w.tag === filter),
  [filter, work]);

  return (
    <m.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative' }}
    >
      <section style={{ minHeight: '55vh', display: 'flex', alignItems: 'flex-end', paddingTop: 'clamp(100px, 20vw, 160px)', paddingBottom: 60, position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal><SectionLabel>Our Work</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h1 className="h1" style={{ marginTop: 20, maxWidth: 900 }}>
              <span style={{ color: '#fff' }}>Built to perform.</span><br />
              <span className="gradient-text">Designed to impress.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12">
              <p className="body-lg max-w-lg">
                High-performance solutions. Real-world impact. A showcase of elite digital craftsmanship and automated workflows.
              </p>
              <button 
                onClick={() => setSelectedProject({
                  id: 'overview',
                  tag: 'agency',
                  cat: 'Work Overview',
                  title: 'Our Digital Philosophy',
                  description: 'A summary of how Sazaan Digital approaches development and design.',
                  fullSummary: 'At Sazaan Digital, we don\'t just build websites; we engineer digital assets. Our philosophy centers on "Zero Latency Design"—the belief that every millisecond of load time is a barrier to conversion. We combine brutalist-modern aesthetics with extreme technical optimization. \n\nThis section showcases our expertise in three core pillars: \n1. Performance Engineering (React/Vite/Shaders)\n2. Automation Architecture (Custom CRM/AI integration)\n3. Growth Systems (Technical SEO/Data Analytics). \n\nEvery project here is a testament to our commitment to making local businesses dominate their global competitors through superior technology.',
                  features: ['Performance-First Architecture', 'Conversion-Led Design', 'Scalable Automation', 'Data-Driven SEO', 'Premium Brand Identity'],
                  metric: '100% Quality',
                  status: 'Standard',
                  accent: '#FFB07C',
                  published: true
                })}
                className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/80 text-xs font-mono uppercase tracking-widest hover:bg-orange-light/10 hover:border-orange-light/30 transition-all flex items-center gap-2"
              >
                <Icon name="zap" size={14} className="text-orange-light" />
                Section Summary
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--secondary" style={{ paddingTop: 80, paddingBottom: 128, position: 'relative', overflow: 'hidden' }}>
        <div className="warm-glow" style={{ opacity: 0.4 }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div 
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}
            role="group"
            aria-label="Filter our work by category"
          >
            {filters.map(([k, l], i) => (
              <m.button 
                key={k} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => setFilter(k)} 
                aria-pressed={filter === k}
                style={{
                  padding: '10px 18px', borderRadius: 999,
                  minHeight: 44,
                  background: filter === k ? 'rgba(255, 176, 124,0.15)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${filter === k ? 'rgba(255, 176, 124,0.4)' : 'var(--border)'}`,
                  color: filter === k ? '#fff' : 'var(--text-secondary)',
                  fontSize: 13, fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s ease',
                }}
              >
                {l}
              </m.button>
            ))}
          </div>

          <m.div 
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05, delayChildren: 0.2 }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 28 }}
          >
            {visible.map((w, i) => (
              <m.div
                key={w.title}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="group bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col w-full h-full transition-all duration-300 hover:border-orange-light/40 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(255,176,124,0.08)] cursor-pointer focus-visible:outline-orange-light will-change-transform"
                style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px', transform: 'translateZ(0)' }}
                onClick={() => setSelectedProject(w)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(w);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View full details for project ${w.title}`}
              >
                <div style={{
                  aspectRatio: '16 / 10',
                  background: `linear-gradient(135deg, ${w.accent}10, var(--bg-card))`,
                  position: 'relative', overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-[opacity]" />
                  <div style={{ position: 'absolute', top: -40, right: -40, width: 240, height: 240, borderRadius: '50%', background: w.accent, opacity: 0.1, filter: 'blur(60px)' }} />
                  {w.screenshot_url ? (
                    <LazyImage 
                      src={w.screenshot_url} 
                      alt={w.title}
                      accent={w.accent}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full" style={{ opacity: 0.2 }}>
                      <svg width="120" height="120" viewBox="0 0 120 120">
                        <rect width="100%" height="100%" fill="none" stroke={w.accent} strokeWidth="1" strokeDasharray="4 4" rx="12" />
                      </svg>
                    </div>
                  )}
                  <div style={{
                    position: 'absolute', bottom: 16, left: 20,
                    fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--orange-light)',
                    letterSpacing: '0.25em', textTransform: 'uppercase',
                    opacity: 0.8
                  }}>{w.cat}</div>
                </div>

                <div className="w-full flex-1 flex flex-col p-8">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-white group-hover:text-orange-light transition-colors">{w.title}</h3>
                  </div>
                  <p className="body mb-8" style={{ marginTop: 10, fontSize: 14 }}>{w.description}</p>
                  <div style={{ marginTop: 'auto', paddingTop: 24, display: 'flex', gap: 24, borderTop: '1px solid var(--border)' }}>
                    <div>
                      <div className="caption" style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>Result</div>
                      <div className="font-heading" style={{ color: 'var(--orange-light)', fontSize: 18, fontWeight: 600, marginTop: 4 }}>{w.metric}</div>
                    </div>
                    <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 24 }}>
                      <div className="caption" style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>Status</div>
                      <div className="font-heading" style={{ color: '#fff', fontSize: 18, fontWeight: 600, marginTop: 4 }}>{w.status}</div>
                    </div>
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>
    </m.main>
  );
};
