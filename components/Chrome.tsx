import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';
import { Menu, X } from 'lucide-react';
import { Icon } from './Primitives';

const Logo = () => (
  <div className="flex flex-col items-start leading-[0.8]">
    <span className="gradient-text text-xl md:text-2xl font-black tracking-tighter uppercase">Sazaan</span>
    <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase ml-0.5">Digital</span>
  </div>
);

const NAV_LINKS = [
  { label: 'Home',     id: 'home'     },
  { label: 'Services', id: 'services' },
  { label: 'Work',     id: 'work'     },
  { label: 'Contact',  id: 'contact'  },
] as const;

export const Navbar = ({ page, setPage }: { page: string; setPage: (p: string) => void }) => {
  const [visible, setVisible]   = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // useLenis is proven to fire correctly alongside ReactLenis root
  useLenis((lenis: any) => {
    const { scroll, velocity, direction } = lenis;
    if (scroll < 60) {
      setVisible(true);
    } else if (direction > 0 && velocity > 0.5) {
      setVisible(false);
      setMenuOpen(false);
    } else if (direction < 0) {
      setVisible(true);
    }
  });

  const navigate = (id: string) => {
    setPage(id);
    window.scrollTo(0, 0);
    setMenuOpen(false);
  };

  const iconBtn =
    'w-10 h-10 rounded-xl border border-white/10 bg-black/30 flex items-center justify-center ' +
    'text-white/40 hover:text-orange-light hover:border-orange-light/20 hover:bg-orange-light/5 ' +
    'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-light';

  const navLinkClass = (id: string) =>
    'px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] rounded-full transition-all duration-200 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-light ' +
    (page === id
      ? 'text-orange-light bg-orange-light/10'
      : 'text-white/50 hover:text-orange-light hover:bg-white/5');

  const mobileNavLinkClass = (id: string) =>
    'px-4 py-3.5 text-sm font-bold uppercase tracking-[0.15em] rounded-xl transition-all duration-150 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-light ' +
    (page === id
      ? 'text-orange-light bg-orange-light/10'
      : 'text-white/50 hover:text-orange-light hover:bg-white/5');

  return (
    <header role="banner">
      {/* ── Navbar bar ── */}
      <m.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-[999999] pointer-events-none"
      >
        <div className="relative w-full flex items-center justify-between px-4 md:px-8 py-3 bg-black/70 backdrop-blur-2xl border-b border-white/[0.07] pointer-events-auto">

          {/* Left — Logo */}
          <button
            onClick={() => navigate('home')}
            aria-label="Sazaan Digital — Home"
            className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-light hover:opacity-80 transition-opacity active:scale-95"
          >
            <Logo />
          </button>

          {/* Center — Desktop nav links (absolutely centered so logo/icons don't shift it) */}
          <nav
            className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); navigate(link.id); }}
                aria-current={page === link.id ? 'page' : undefined}
                className={navLinkClass(link.id)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right — Social icons + mobile hamburger */}
          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com/sazaandigital"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Instagram"
              className={iconBtn}
            >
              <Icon name="share" size={16} />
            </a>
            <button
              onClick={() => navigate('contact')}
              aria-label="Contact us"
              className={iconBtn}
            >
              <Icon name="mail" size={16} />
            </button>

            <button
              className={`md:hidden ${iconBtn}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </m.div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-nav"
            role="navigation"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-[57px] left-0 w-full z-[999998] md:hidden bg-black/90 backdrop-blur-2xl border-b border-white/[0.07]"
          >
            <div className="flex flex-col py-2 px-4">
              {NAV_LINKS.map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); navigate(link.id); }}
                  aria-current={page === link.id ? 'page' : undefined}
                  className={mobileNavLinkClass(link.id)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
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
                  {...(props as any)}
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
                  onMouseEnter={e => { 
                    e.currentTarget.style.color = 'var(--orange-light)'; 
                    e.currentTarget.style.borderColor = 'rgba(255,176,124,0.3)'; 
                    e.currentTarget.style.background = 'rgba(255,176,124,0.05)'; 
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.color = 'var(--text-muted)'; 
                    e.currentTarget.style.borderColor = 'var(--border)'; 
                    e.currentTarget.style.background = 'transparent'; 
                  }}
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
          <a href="mailto:baloch@sazaandigital.com" style={{ color: 'var(--orange-light)', fontSize: 14, display: 'block' }}>baloch@sazaandigital.com</a>
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

