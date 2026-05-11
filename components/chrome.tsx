import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Home, Briefcase, Layers, MessageCircle, Menu, X } from 'lucide-react';
import { LimelightNav, NavItem } from './ui/limelight-nav';
import { Icon } from './primitives';

const Logo = () => (
  <div className="flex items-center gap-1">
    <div className="flex flex-col items-start leading-[0.85]">
      <span className="text-white text-2xl md:text-3xl font-black font-barlow tracking-tightest uppercase">Sazaan</span>
      <span className="text-[#E8FF3A] text-[10px] font-bold font-barlow tracking-[0.4em] uppercase">Studio</span>
    </div>
  </div>
);

const NAV_LINKS = [
  { label: 'Home', id: 'home', icon: <Home /> },
  { label: 'Services', id: 'services', icon: <Briefcase /> },
  { label: 'Work', id: 'work', icon: <Layers /> },
  { label: 'Contact', id: 'contact', icon: <MessageCircle /> },
] as const;

export const Navbar = ({ page, setPage }: { page: string; setPage: (p: string) => void }) => {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleRef = React.useRef(true);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);

  // Simplified scroll visibility logic for native scroll
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < 60) {
        setVisible(true);
      } else if (currentScroll > lastScroll && currentScroll > 60) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScroll = currentScroll;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (id: string) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setMenuOpen(false);
  };

  const navItems: NavItem[] = NAV_LINKS.map(link => ({
    id: link.id,
    label: link.label,
    icon: link.icon,
    onClick: () => navigate(link.id)
  }));

  const activeIndex = NAV_LINKS.findIndex(l => l.id === page);

  const iconBtn =
    'w-10 h-10 rounded-full border border-[#222222] bg-[#111111] flex items-center justify-center ' +
    'text-white hover:bg-[#161616] hover:border-[#E8FF3A] ' +
    'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8FF3A]';

  const mobileNavLinkClass = (id: string) =>
    'px-4 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-150 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8FF3A] ' +
    (page === id
      ? 'text-[#E8FF3A] bg-[#E8FF3A]/10'
      : 'text-[#888888] hover:text-white');

  return (
    <header role="banner">
      <m.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-[999999] pointer-events-none"
        style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
      >
        <div className="relative w-full flex items-center justify-between px-4 md:px-8 py-4 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#222222] pointer-events-auto">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); navigate('home'); }}
            aria-label="Sazaan Studio — Home"
            className="flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8FF3A] hover:opacity-80 transition-opacity active:scale-95 min-h-[44px]"
          >
            <Logo />
          </a>

          <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <LimelightNav 
              items={navItems} 
              defaultActiveIndex={activeIndex >= 0 ? activeIndex : 0}
              onTabChange={(idx) => navigate(NAV_LINKS[idx].id)}
            />
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); navigate('contact'); }}
              aria-label="Get in touch"
              className="hidden lg:flex btn btn-primary py-2 px-6 text-xs min-h-[44px] items-center"
            >
              Start a Project
            </a>
            <button
              className={`md:hidden ${iconBtn}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </m.div>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-nav"
            role="navigation"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[73px] z-[999998] md:hidden bg-[#0A0A0A]"
          >
            <div className="flex flex-col py-8 px-6 gap-2">
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
    { name: 'share', label: 'Instagram', url: 'https://instagram.com/sazaanstudio' },
    { name: 'mail', label: 'Email', url: 'mailto:hello@sazaanstudio.space' }
  ];



  return (
    <footer
      className="relative overflow-hidden pt-24 pb-12 z-[2] bg-[#0A0A0A] border-t border-[#222222]"
      aria-label="Site footer"
    >
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12">
          <div>
            <Logo />
            <p className="text-sm leading-relaxed text-[#CCCCCC] max-w-[300px] mt-6 font-dmsans">
              Digital solutions for creative studios and modern businesses. We build high-performance systems for brands that demand technical excellence.
            </p>
            <div className="flex gap-3 mt-8">
              {socialLinks.map(s => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer-icon-btn"
                >
                  <Icon name={s.name} size={18} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <div className="section-label">Navigate</div>
            <ul className="flex flex-col gap-4 mt-6">
              {[['home','Home'], ['services','Services'], ['work','Work'], ['contact','Contact'], ['privacy-policy', 'Privacy Policy']].map(([k, l]) => (
                <li key={k}>
                  <a
                    href={`#${k}`}
                    onClick={(e) => { e.preventDefault(); setPage(k); window.scrollTo({ top: 0, behavior: 'instant' }); }}
                    className="footer-nav-btn font-dmsans font-medium block py-2 min-h-[44px] flex items-center"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Specialties navigation">
            <div className="section-label">Focus</div>
            <ul className="flex flex-col gap-4 mt-6">
              {[
                'Search Engine Optimization',
                'Advanced CRM Systems',
                'Business Automation',
                'Digital Architecture',
                'Performance Engineering'
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#services"
                    onClick={(e) => { e.preventDefault(); setPage('services'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
                    className="footer-nav-btn font-dmsans font-medium block py-2 min-h-[44px] flex items-center text-left"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="section-label">Contact</div>
            <div className="flex flex-col items-start gap-4 mt-6">
              <a
                href="mailto:hello@sazaanstudio.space"
                className="text-white text-lg font-black font-barlow uppercase tracking-tight hover:text-[#E8FF3A] transition-colors"
              >
                hello@sazaanstudio.space
              </a>
              <p className="text-[#BBBBBB] text-sm font-dmsans">Available Worldwide</p>
              <p className="text-[#BBBBBB] text-[10px] mt-8 font-bold uppercase tracking-widest">© 2026 Sazaan Studio</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="text-center mt-24 select-none pointer-events-none text-[#666666]"
        role="presentation"
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 900,
          fontSize: 'clamp(60px, 20vw, 300px)',
          lineHeight: 0.8,
          letterSpacing: '-0.05em',
          textTransform: 'uppercase'
        }}
      >
        SAZAAN
      </div>
    </footer>
  );
};


