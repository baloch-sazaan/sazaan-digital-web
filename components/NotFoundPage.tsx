import React from 'react';
import { Icon } from './Primitives';

export const NotFoundPage = ({ setPage }: { setPage: (p: string) => void }) => {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="noise" />
        <div className="aurora" style={{ opacity: 0.3 }} />
        <div className="grid-bg" style={{ opacity: 0.4 }} />
        <div className="glow-dot" style={{ top: '20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }} />
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div
          className="font-heading font-bold leading-none tracking-tight mb-4 select-none"
          style={{
            fontSize: 'clamp(96px, 20vw, 180px)',
            background: 'linear-gradient(180deg, rgba(255,176,124,0.8) 0%, rgba(255,176,124,0.06) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </div>

        <h1 className="text-white font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}>
          Sorry, that link isn't working
        </h1>
        <p className="body-lg mb-10 max-w-sm mx-auto" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}>
          The page you're looking for doesn't exist or may have moved. Press the button below to get back to the website.
        </p>

        <button
          className="btn btn-primary"
          style={{ padding: '16px 40px', fontFamily: 'var(--font-button)' }}
          onClick={() => setPage('home')}
        >
          Back to Website <Icon name="arrowRight" size={14} />
        </button>

        <div className="flex gap-6 justify-center mt-10 flex-wrap">
          {([['home', 'Home'], ['services', 'Services'], ['work', 'Work'], ['contact', 'Contact']] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setPage(k)}
              className="text-sm transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};
