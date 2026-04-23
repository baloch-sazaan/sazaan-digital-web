import React, { useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import { Icon, SectionLabel } from './Primitives';

export interface Project {
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

export const ProjectModal = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap for accessibility
  useEffect(() => {
    if (!modalRef.current) return;
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    firstElement?.focus();
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, []);

  return (
    <m.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[2000000] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-3xl"
    >
      <m.div 
        ref={modalRef}
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
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 transition-all focus-visible:ring-2 focus-visible:ring-orange-light focus-visible:outline-none"
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
      </m.div>
    </m.div>
  );
};
