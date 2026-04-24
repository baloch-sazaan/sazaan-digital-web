import React from 'react';
import { Reveal, SectionLabel, Icon, Magnetic } from './Primitives';

export const CTABannerSection = ({ setPage }: { setPage: (p: string) => void }) => {
  return (
    <section className="section bg-[#050505] overflow-hidden relative py-24 md:py-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,176,124,0.05),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      <div className="container relative z-10">
        <Reveal>
          <div className="max-w-[880px] mx-auto p-[clamp(48px,8vw,96px)_clamp(28px,6vw,72px)] rounded-[32px] bg-[#0d0d0d] border border-[rgba(255,176,124,0.15)] shadow-[0_40px_100px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] text-center relative overflow-hidden">
            <div className="grid-bg opacity-40" />
            <div className="hairline mx-auto mb-6" />
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
                <a className="btn btn-ghost" style={{ fontFamily: 'var(--font-button)' }} href="mailto:baloch@sazaandigital.com?subject=Project%20inquiry&body=Hi%20Sazaan%2C%0A%0AI'd%20like%20to%20talk%20about...">
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
