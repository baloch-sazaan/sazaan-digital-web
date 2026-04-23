import React from 'react';
import { m } from 'framer-motion';
import { Reveal, SectionLabel, Icon } from './Primitives';

export const ServicesPage = ({ setPage }: { setPage: (p: string) => void }) => {
  const services = [
    { icon: 'code', cat: 'Build', title: 'Web Design & Development', desc: 'Custom Next.js and Shopify sites that load fast, look premium, and convert visitors into customers.', bullets: ['Figma → code handoff', 'CMS your team can actually use', 'Core Web Vitals passing'] },
    { icon: 'search', cat: 'Visibility', title: 'SEO & Local Search', desc: 'Technical SEO, content strategy, and Google Business Profile optimization to dominate your area.', bullets: ['Technical audit & fixes', 'Local citations', 'Monthly reporting'] },
    { icon: 'zap', cat: 'Ops', title: 'Automation & CRM', desc: 'Connect the tools you already use. Automate intake, booking, invoicing and follow-up.', bullets: ['Zapier / Make builds', 'HubSpot / GoHighLevel', 'Custom API integrations'] },
    { icon: 'share', cat: 'Content', title: 'Social Media Management', desc: 'Daily posting, community management, and content that actually sounds like your brand.', bullets: ['Content calendar', 'Reels & shorts', 'Community replies'] },
    { icon: 'trending', cat: 'Growth', title: 'Paid Ads', desc: 'Meta and Google campaigns with tracking that works. No black-box reporting.', bullets: ['Meta & Google Ads', 'Conversion tracking', 'Weekly optimization'] },
    { icon: 'sparkles', cat: 'Brand', title: 'Brand & Identity', desc: 'Logos, wordmarks, guidelines, and brand kits. A foundation your marketing can rest on.', bullets: ['Logo & wordmark', 'Visual guidelines', 'Social templates'] },
    { icon: 'bot', cat: 'Support', title: 'AI Chat & Assistants', desc: 'Custom chat agents trained on your site, docs and FAQs. 24/7 lead qualification.', bullets: ['Site-embedded chat', 'Lead routing', 'CRM sync'] },
    { icon: 'layers', cat: 'Strategy', title: 'Fractional CMO', desc: 'Monthly strategy, roadmap, and accountability — without a full-time hire.', bullets: ['Quarterly roadmap', 'Weekly check-ins', 'KPI dashboard'] },
    { icon: 'briefcase', cat: 'Care', title: 'Ongoing Retainer', desc: 'Everything above, bundled. One team, one invoice, predictable growth.', bullets: ['Dedicated lead', 'Priority response', 'Quarterly reviews'] },
  ];

  return (
    <m.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative' }}
    >
      <section style={{
        minHeight: '55vh', display: 'flex', alignItems: 'flex-end',
        paddingTop: 'clamp(100px, 20vw, 160px)', paddingBottom: 60,
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal><SectionLabel>Our Capability</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h1 className="h1" style={{ marginTop: 20, maxWidth: 900 }}>
              <span style={{ color: '#fff' }}>Every service you need</span><br />
              <span className="gradient-text">to dominate online</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="body-lg" style={{ marginTop: 22, maxWidth: 560 }}>
              Pick one. Pick all. We'll tell you straight what you actually need — and what you don't.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--secondary" style={{ paddingTop: 96, paddingBottom: 128, position: 'relative' }}>
        <div className="warm-glow" style={{ opacity: 0.4 }} />
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 20 }}>
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <div 
                  className="card group focus-visible:outline-orange-light" 
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={() => setPage('contact')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setPage('contact');
                    }
                  }}
                  aria-label={`Learn more about our ${s.title} services`}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div className="icon-tile-sm"><Icon name={s.icon} size={16} /></div>
                    <span className="chip" style={{ padding: '4px 10px', fontSize: 9 }}>{s.cat}</span>
                  </div>

                  <h3 className="font-heading" style={{ fontSize: 22, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}>{s.title}</h3>
                  <p className="body" style={{ marginTop: 12, fontSize: 14 }}>{s.desc}</p>

                  <ul style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10, listStyle: 'none' }}>
                    {s.bullets.map(b => (
                      <li key={b} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-mono)' }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent-sunset)', boxShadow: '0 0 8px var(--accent-sunset)' }} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div style={{
                    marginTop: 32, paddingTop: 20,
                    borderTop: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent-sunset)', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 600 }}>
                      Explore Service <Icon name="arrowRight" size={12} />
                    </span>
                    <Icon name="arrowUpRight" size={14} style={{ color: 'rgba(255,255,255,0.3)' }} className="group-hover:text-amber-200 transition-colors" />
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

