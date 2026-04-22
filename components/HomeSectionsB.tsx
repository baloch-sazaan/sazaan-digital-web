import React, { useState, useEffect, useRef } from 'react';
import { Reveal, SectionLabel, Icon, Magnetic } from './Primitives';

const TypingLine = ({ text, onComplete, color = 'var(--accent-sunset)' }: { text: string, onComplete?: () => void, color?: string }) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 30 + Math.random() * 40);
    return () => clearInterval(interval);
  }, [text]);

  return <div style={{ color, fontFamily: 'var(--font-mono)', fontSize: 13, marginBottom: 6, display: 'flex', gap: 10 }}>
    <span style={{ opacity: 0.5 }}>{text.startsWith('>') ? '' : ' '}</span>
    <span>{display}</span>
    {display.length < text.length && <span className="animate-pulse">_</span>}
  </div>;
};

export const TerminalSection = () => {
  const lines = [
    { t: 'cmd', v: '> npx sazaan init --client "your-business"' },
    { t: 'ok', v: '✓ Discovery call scheduled' },
    { t: 'ok', v: '✓ Brand + tech audit complete' },
    { t: 'cmd', v: '> sazaan build --stack next,tailwind,cms' },
    { t: 'log', v: 'compiling components ........... done' },
    { t: 'log', v: 'optimizing assets .............. done' },
    { t: 'log', v: 'connecting automations ......... done' },
    { t: 'ok', v: '✓ Deployed to production' },
    { t: 'cmd', v: '> sazaan grow --channels all' },
    { t: 'log', v: 'tracking 124 search terms' },
    { t: 'log', v: 'publishing 12 posts / week' },
  ];

  const [shown, setShown] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section bg-[#050505] overflow-hidden relative py-24 md:py-32 border-t border-white/5">
      {/* Rich Gradient Layer to match Icon Cloud/Tech Stack */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,176,124,0.08),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      <div className="noise opacity-20 pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-8">
        <Reveal>
          <div className="text-center mb-16 md:mb-24">
            <SectionLabel center>Our Process</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mt-8 leading-[1.1]">
              How we <span className="text-orange-light serif italic lowercase">ship</span>
            </h2>
          </div>
        </Reveal>

        <div ref={ref} style={{ position: 'relative', zIndex: 10 }}>
          <Reveal delay={0.1}>
              <div style={{
                maxWidth: 820, width: '100%', margin: '0 auto',
                background: '#0d0d0d',
                border: '1px solid rgba(255, 176, 124, 0.15)',
                borderRadius: 24,
                boxShadow: '0 40px 100px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                overflow: 'hidden',
                position: 'relative',
              }}>
              <div style={{
                position: 'absolute', inset: 0, 
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 176, 124, 0.02), rgba(255, 176, 124, 0.01), rgba(255, 176, 124, 0.02))',
                backgroundSize: '100% 4px, 3px 100%',
                pointerEvents: 'none', zIndex: 20, opacity: 0.2
              }} />

              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '12px 16px',
                background: 'rgba(255, 176, 124, 0.05)',
                borderBottom: '1px solid rgba(255, 176, 124, 0.15)',
              }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
                <div style={{ marginLeft: 'auto', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(255, 176, 124, 0.5)', letterSpacing: '0.1em' }}>bash — 80x24</div>
              </div>

              <div style={{ padding: 'clamp(12px, 4vw, 24px)', minHeight: 300, position: 'relative', overflowX: 'auto' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 176, 124, 0.05) 0%, transparent 80%)', pointerEvents: 'none' }} />
                {started && lines.slice(0, shown + 1).map((l, i) => (
                  <TypingLine 
                    key={i} 
                    text={l.v} 
                    color={l.t === 'cmd' ? '#fff' : l.t === 'ok' ? 'var(--accent-sunset)' : 'rgba(255, 176, 124, 0.7)'}
                    onComplete={() => {
                      if (i === shown && shown < lines.length - 1) {
                        setTimeout(() => setShown(s => s + 1), 300);
                      }
                    }} 
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-12 md:gap-24 justify-center mt-20 px-6">
            {[
              ['01', 'Audit', 'We analyze your current presence'],
              ['02', 'Build', 'We design and build your stack'],
              ['03', 'Grow', 'We manage and scale what works'],
            ].map(([n, t, d]) => (
              <div key={n} className="flex flex-col items-center max-w-[240px] text-center">
                <div style={{
                  width: 44, height: 44, margin: '0 auto 18px',
                  borderRadius: '50%',
                  background: 'rgba(255, 176, 124, 0.1)',
                  border: '1px solid rgba(255, 176, 124, 0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent-sunset)',
                  boxShadow: '0 0 20px rgba(255, 176, 124, 0.15)'
                }}>{n}</div>
                <div className="font-heading text-lg font-bold text-white mb-2">{t}</div>
                <div className="body text-sm text-center">{d}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export const CTABannerSection = ({ setPage }: { setPage: (p: string) => void }) => {
  return (
    <section className="section bg-[#050505] overflow-hidden relative py-24 md:py-40">
      {/* Rich Gradient Layer to match Icon Cloud/Terminal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,176,124,0.05),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>
      
      <div className="noise opacity-20 pointer-events-none" />
      <div className="container relative z-10">
        <Reveal>
          <div style={{
            maxWidth: 880, margin: '0 auto',
            padding: 'clamp(48px, 8vw, 96px) clamp(28px, 6vw, 72px)',
            borderRadius: 32,
            background: '#0d0d0d',
            border: '1px solid rgba(255, 176, 124, 0.15)',
            boxShadow: '0 40px 100px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div className="noise" />
            <div className="grid-bg" style={{ opacity: 0.4 }} />
            <div className="hairline" style={{ margin: '0 auto 24px' }} />
            <SectionLabel center>Let's work together</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22, position: 'relative' }}>
              <span style={{ color: '#fff' }}>Ready to get </span>
              <span className="gradient-text">found online?</span>
            </h2>
            <p className="body-lg" style={{ marginTop: 18, maxWidth: 480, marginInline: 'auto', position: 'relative' }}>
              Let's build something your competitors will wish they had. First call is free.
            </p>
            <div style={{ marginTop: 36, display: 'inline-flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
              <Magnetic>
                <button className="btn btn-primary" style={{ padding: '16px 40px', fontFamily: 'var(--font-button)' }} onClick={() => setPage('contact')}>
                  Let's Talk <Icon name="arrowRight" size={14} />
                </button>
              </Magnetic>
              <Magnetic>
                <a className="btn btn-ghost" style={{ fontFamily: 'var(--font-button)' }} href="mailto:hello@sazaandigital.com?subject=Project%20inquiry&body=Hi%20Sazaan%2C%0A%0AI'd%20like%20to%20talk%20about...">
                  Email Us
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

