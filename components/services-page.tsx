import React from 'react';
import { m } from 'framer-motion';
import { SectionLabel, Reveal, Icon, TextReveal, SEOMetadata } from './primitives';

export const ServicesPage = ({ setPage }: { setPage: (p: string) => void }) => {
  const services = [
    { 
      icon: 'code', 
      cat: 'DEVELOPMENT', 
      title: 'Full-Stack Development', 
      desc: 'High-performance web applications built for creative studios and scaling businesses.', 
      bullets: ['Scalable Systems Architecture', 'Bespoke Business Hubs', 'Seamless Data Integration'] 
    },
    { 
      icon: 'search', 
      cat: 'SEO', 
      title: 'Strategic Growth & SEO', 
      desc: 'Technical search strategies designed to build your brand authority and market presence.', 
      bullets: ['Search Performance Audit', 'Content Strategy', 'Market Positioning'] 
    },
    { 
      icon: 'zap', 
      cat: 'SYSTEMS', 
      title: 'Operational Automation', 
      desc: 'Eliminate manual bottlenecks. Automate complex business logic and operational lifecycles.', 
      bullets: ['Workflow Engineering', 'Integrated CRM Logic', 'Autonomous Process Agents'] 
    },
    { 
      icon: 'sparkles', 
      cat: 'DESIGN', 
      title: 'UI/UX Design Systems', 
      desc: 'User-centric visual identities and interfaces that capture your brand essence.', 
      bullets: ['Interface Design', 'Visual Brand Systems', 'User Experience Strategy'] 
    },
    { 
      icon: 'bot', 
      cat: 'AUTOMATION', 
      title: 'AI Business Solutions', 
      desc: 'Custom AI integration designed to streamline your business workflows and operations.', 
      bullets: ['Workflow Automation', 'AI-Driven Insights', 'Process Optimization'] 
    },
    { 
      icon: 'share', 
      cat: 'GROWTH', 
      title: 'Systemic Content Flow', 
      desc: 'High-fidelity content architecture for brands that value substance over noise.', 
      bullets: ['Strategic Narrative Systems', 'Industry Authority Pieces', 'Growth-Focused Content'] 
    },
  ];

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
        title="Custom Web Design & AI Automation Services" 
        description="Transform your local business with advanced AI automation, smart lead generation, and custom web design systems. Scale your clinic or cafe with Sazaan Studios."
        keywords="web design services, AI automation for business, custom website development, medical clinic automation, Sazaan Studios"
        canonical="https://sazaanstudio.space/services"
      />
      <section className="pt-40 pb-24 border-b border-[#222222]">
        <div className="container">
          <m.div variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}>
            <SectionLabel>Our Services</SectionLabel>
          </m.div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mt-10">
            <m.div variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}>
              <h1 className="text-[clamp(2.5rem,9vw,8rem)] font-black text-white font-barlow uppercase leading-[0.85] tracking-tightest">
                <TextReveal>Digital</TextReveal> <span className="italic whitespace-nowrap"><TextReveal delay={0.2}>Solutions.</TextReveal></span>
              </h1>
            </m.div>
            
            <m.div variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }} className="max-w-md">
                <p className="text-lg font-dmsans text-[#A0A0A0] leading-relaxed mb-8">
                  We provide comprehensive digital solutions tailored for creative studios and modern businesses. We bridge the gap between vision and execution.
                </p>
                <div className="flex gap-4">
                    <div className="w-12 h-[1px] bg-[#222222] mt-3" />
                    <span className="text-[10px] font-bold text-[#888888] uppercase tracking-[0.3em]">Modern Development Agency</span>
                </div>
            </m.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-[#222222] border border-[#222222]">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div 
                  className="bg-[#111111] p-10 h-full flex flex-col group hover:bg-[#161616] transition-colors duration-500 cursor-pointer" 
                  onClick={() => setPage('contact')}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setPage('contact'); }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Inquire about ${s.title}`}
                >
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-10 h-10 border border-[#222222] flex items-center justify-center group-hover:border-[#E8FF3A] transition-colors">
                        <Icon name={s.icon} size={16} className="text-[#888888] group-hover:text-[#E8FF3A]" />
                    </div>
                    <span className="text-[10px] font-bold font-dmsans tracking-widest text-[#555555] uppercase group-hover:text-[#E8FF3A]">
                        {s.cat}
                    </span>
                  </div>

                  <h3 className="text-3xl font-black font-barlow text-white uppercase leading-none tracking-tight mb-6 group-hover:text-[#E8FF3A] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm font-dmsans text-[#A0A0A0] leading-relaxed mb-10 group-hover:text-white/90">
                    {s.desc}
                  </p>

                  <ul className="space-y-4 mb-12">
                    {s.bullets.map(b => (
                      <li key={b} className="flex items-center gap-3 text-[11px] font-bold font-dmsans text-[#888888] uppercase tracking-wider group-hover:text-white transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E8FF3A] border border-black group-hover:bg-white" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8 border-t border-[#222222] flex justify-between items-center group-hover:border-[#E8FF3A]/20">
                    <span className="text-[10px] font-bold text-[#888888] uppercase tracking-widest group-hover:text-[#E8FF3A]">Inquire Now</span>
                    <Icon name="arrowUpRight" size={14} className="text-[#888888] group-hover:text-[#E8FF3A]" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </m.main>
  );
};


