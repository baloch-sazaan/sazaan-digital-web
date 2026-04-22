import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';
import { Icon } from './Primitives';

import { FloatingNav } from './ui/floating-navbar';

const Logo = () => (
  <div className="flex flex-col items-start leading-[0.8]">
    <span className="gradient-text text-xl md:text-2xl font-black tracking-tighter uppercase">Sazaan</span>
    <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase ml-0.5">Digital</span>
  </div>
);

export const Navbar = ({ page, setPage }: { page: string, setPage: (p: string) => void }) => {
  const navItems = [
    { name: 'Home', action: () => { console.log('Navigating to Home'); setPage('home'); window.scrollTo(0, 0); } },
    { name: 'Services', action: () => { console.log('Navigating to Services'); setPage('services'); window.scrollTo(0, 0); } },
    { name: 'Work', action: () => { console.log('Navigating to Work'); setPage('work'); window.scrollTo(0, 0); } },
    { name: 'Contact', action: () => { console.log('Navigating to Contact'); setPage('contact'); window.scrollTo(0, 0); } },
  ];

  const [visible, setVisible] = useState(true);

  useLenis(({ scroll, velocity, direction }) => {
    // direction: 1 for down, -1 for up
    if (scroll < 10) {
      setVisible(true);
    } else if (direction > 0 && velocity > 0.5) {
      // Scrolling down fast enough
      setVisible(false);
    } else if (direction < 0) {
      // Any upward movement reveals
      setVisible(true);
    }
  });

  return (
    <header role="banner">
      {/* Top Branding Bar */}
      <motion.div 
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-[999998] p-4 pt-8 flex justify-between items-center pointer-events-none"
      >
        <button
          onClick={() => { console.log('Logo click - Home'); setPage('home'); window.scrollTo(0, 0); }}
          className="pointer-events-auto ml-4 focus-visible:outline-orange-light rounded-lg transition-transform hover:scale-105 active:scale-95"
          aria-label="Sazaan Digital - Home"
          style={{ display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <Logo />
        </button>

        <nav className="pointer-events-auto flex gap-3 mr-4" aria-label="Social Links">
          {[
            { name: 'share', label: 'Instagram', url: 'https://instagram.com/sazaandigital' },
            { name: 'mail', label: 'Contact', action: () => { console.log('Contact click'); setPage('contact'); window.scrollTo(0, 0); } }
          ].map(s => {
            const Tag = s.url ? 'a' : 'button';
            const props = s.url ? { href: s.url, target: '_blank', rel: 'noopener noreferrer' } : { onClick: s.action };
            return (
              <Tag 
                key={s.name}
                {...props as any}
                aria-label={s.label}
                className="w-12 h-12 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-orange-light hover:border-orange-light/20 transition-all duration-300"
              >
                <Icon name={s.name} size={18} />
              </Tag>
            );
          })}
        </nav>
      </motion.div>

      {/* Smart Floating Nav */}
      <nav aria-label="Main Navigation">
        <FloatingNav navItems={navItems} setPage={setPage} visibleExternal={visible} />
      </nav>
    </header>
  );
};

export const Footer = ({ setPage }: { setPage: (p: string) => void }) => {
  const socialLinks = [
    { name: 'globe', label: 'Back to Home', action: () => { setPage('home'); window.scrollTo(0, 0); } },
    { name: 'share', label: 'Follow us on Instagram', url: 'https://instagram.com/sazaandigital' },
    { name: 'mail', label: 'Email us', url: 'mailto:baloch@sazaandigital.com' }
  ];

  return (
    <footer className="relative overflow-hidden pt-24 pb-12 z-[2]" style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border)',
    }}>
      <div className="noise" />
      <div className="aurora" style={{ opacity: 0.2 }} />
      <div className="container relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
        <div>
          <div className="mb-6">
            <Logo />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 14, maxWidth: 300, lineHeight: 1.6 }}>
            We build what your competitors can't ignore. Websites, SEO, automation and social — for local businesses that want to dominate online.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
            {socialLinks.map(s => {
              const Tag = s.url ? 'a' : 'button';
              const props = s.url ? { href: s.url, target: '_blank', rel: 'noopener noreferrer' } : { onClick: s.action };
              
              return (
                <Tag 
                  key={s.name} 
                  {...props as any}
                  aria-label={s.label}
                  style={{
                    width: 44, height: 44, borderRadius: 10,
                    border: '1px solid var(--border)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                    background: 'transparent',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--orange-light)'; e.currentTarget.style.borderColor = 'rgba(255,176,124,0.3)'; e.currentTarget.style.background = 'rgba(255,176,124,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  <Icon name={s.name} size={16} />
                </Tag>
              );
            })}
          </div>
        </div>

        <div>
          <div className="section-label" style={{ marginBottom: 18 }}>Navigate</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['home','Home'], ['services','Services'], ['work','Work'], ['contact','Contact']].map(([k, l]) => (
              <button key={k} onClick={() => { setPage(k); window.scrollTo(0, 0); }} style={{
                textAlign: 'left', color: 'var(--text-muted)', fontSize: 14, width: 'fit-content',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >{l}</button>
            ))}
          </div>
        </div>

        <div>
          <div className="section-label" style={{ marginBottom: 18 }}>Contact</div>
          <a href="mailto:baloch@sazaandigital.com" style={{ color: 'var(--purple-light)', fontSize: 14, display: 'block' }}>baloch@sazaandigital.com</a>
          <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 10 }}>Remote — US & UK</div>
          <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 22, fontFamily: 'var(--font-mono)' }}>© 2026 Sazaan Digital</div>
        </div>
      </div>

      <div style={{
        textAlign: 'center', marginTop: 64,
        fontFamily: 'var(--font-heading)', fontWeight: 700,
        fontSize: 'clamp(60px, 18vw, 240px)', lineHeight: 0.9,
        letterSpacing: '-0.06em',
        background: 'linear-gradient(180deg, rgba(255, 201, 123,0.22) 0%, rgba(255, 176, 124,0.02) 100%)',
        WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent',
        userSelect: 'none', pointerEvents: 'none',
        paddingTop: 20,
      }}>SAZAAN</div>
    </footer>
  );
};

