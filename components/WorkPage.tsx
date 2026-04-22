import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';
import { Reveal, SectionLabel, Icon } from './Primitives';
import { dbService } from '../services/db.service';

interface Project {
  id: string;
  tag: string;
  cat: string;
  title: string;
  description: string;
  fullSummary?: string;
  features?: string[];
  metric: string;
  status: string;
  accent: string;
  published: boolean;
  screenshot_url?: string;
}

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
    screenshot_url: '/professional_portfolio_mockup_1776819825094.png'
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
    screenshot_url: '/agency_crm_dashboard_1776819849378.png'
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
    screenshot_url: '/ai_automation_workflow_1776819873461.png'
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
    screenshot_url: '/luxury_real_estate_mockup_1776820888718.png'
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
    screenshot_url: '/creative_agency_mockup_1776820859927.png'
  },
];

const ProjectModal = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#0d0d0d] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 transition-all"
        >
          <Icon name="x" size={20} />
        </button>

        {/* Left Side: Media */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-white/5 border-r border-white/10">
          {project.screenshot_url ? (
            <img 
              src={project.screenshot_url} 
              alt={project.title}
              decoding="async"
              className="w-full h-full object-cover filter brightness-95"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center opacity-20">
               <Icon name="globe" size={80} />
             </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-60 md:hidden" />
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
          <SectionLabel>{project.cat}</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6 leading-tight">{project.title}</h2>
          
          <div className="grid grid-cols-2 gap-8 mb-10 pb-8 border-b border-white/5">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-mono">Metric Peak</div>
              <div className="text-xl md:text-2xl font-bold text-orange-light">{project.metric}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-mono">Lifecycle</div>
              <div className="text-xl md:text-2xl font-bold text-white">{project.status}</div>
            </div>
          </div>

          <div className="mb-10">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4 font-mono">Summary</h4>
            <p className="body-lg leading-relaxed text-white/80">
              {project.fullSummary || project.description}
            </p>
          </div>

          {project.features && (
            <div className="mb-10">
              <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4 font-mono">Core Features</h4>
              <div className="flex flex-wrap gap-2">
                {project.features.map(f => (
                  <span key={f} className="px-3 py-1.5 rounded-lg bg-orange-light/5 border border-orange-light/10 text-[11px] text-orange-light/80 font-medium">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={() => window.location.href = 'mailto:baloch@sazaandigital.com?subject=Project Inquiry: ' + project.title}
            className="btn btn-primary w-full md:w-auto"
          >
            Discuss project <Icon name="arrowRight" size={14} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const WorkPage = ({ setPage }: { setPage: (p: string) => void }) => {
  const [filter, setFilter] = useState<string>('all');
  const [work, setWork] = useState<Project[]>(FALLBACK_WORK);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const filters = [
    ['all', 'All Work'], 
    ['web', 'Websites'], 
    ['agency', 'Agency'],
    ['seo', 'SEO'], 
    ['brand', 'Brand']
  ];

  const lenis = useLenis();

  useEffect(() => {
    // Lock scroll when modal is open
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => { 
      document.body.style.overflow = ''; 
      lenis?.start();
    };
  }, [selectedProject, lenis]);

  const visible = filter === 'all' ? work : work.filter(w => w.tag === filter);

  return (
    <main style={{ position: 'relative' }}>
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
            <p className="body-lg" style={{ marginTop: 22, maxWidth: 520 }}>
              High-performance solutions. Real-world impact. A showcase of elite digital craftsmanship and automated workflows.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--secondary" style={{ paddingTop: 80, paddingBottom: 128, position: 'relative', overflow: 'hidden' }}>
        <div className="noise" />
        <div className="warm-glow" style={{ opacity: 0.4 }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div 
              style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}
              role="group"
              aria-label="Filter our work by category"
            >
              {filters.map(([k, l]) => (
                <button 
                  key={k} 
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
                </button>
              ))}
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 28 }}>
            {visible.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <div
                  className="group bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col w-full h-full transition-all duration-300 hover:border-orange-light/40 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(255,176,124,0.08)] cursor-pointer focus-visible:outline-orange-light"
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
                    background: `linear-gradient(135deg, ${w.accent}18, var(--bg-card))`,
                    position: 'relative', overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div style={{ position: 'absolute', top: -40, right: -40, width: 240, height: 240, borderRadius: '50%', background: w.accent, opacity: 0.15, filter: 'blur(60px)' }} />
                    {w.screenshot_url ? (
                      <img 
                        src={w.screenshot_url} 
                        alt={w.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 filter grayscale-[20%] brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                      />
                    ) : (
                      <svg className="mx-auto block" width="180" height="180" viewBox="0 0 180 180" style={{ opacity: 0.6 }}>
                        {Array.from({ length: 6 }).map((_, j) => (
                          <rect key={j} x={30 + j * 6} y={30 + j * 6} width={120 - j * 12} height={120 - j * 12} rx="12" fill="none" stroke={w.accent} strokeWidth="0.8" opacity={0.6 - j * 0.08} />
                        ))}
                      </svg>
                    )}
                    <div style={{
                      position: 'absolute', bottom: 16, left: 20,
                      fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--orange-light)',
                      letterSpacing: '0.25em', textTransform: 'uppercase',
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
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  );
};
