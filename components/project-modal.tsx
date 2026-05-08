import React, { useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import { Icon, SectionLabel } from './primitives';

import { Project } from '../types';

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
      className="fixed inset-0 z-[2000000] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
    >
      <m.div 
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#111111] border border-[#222222] rounded-none overflow-hidden flex flex-col md:flex-row shadow-none"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-white hover:bg-[#E8FF3A] hover:border-[#E8FF3A] hover:text-black transition-all focus-visible:ring-2 focus-visible:ring-[#E8FF3A] focus-visible:outline-none"
        >
          <Icon name="x" size={20} />
        </button>

        {/* Left Side: Media */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-black border-r border-[#222222] p-1">
          {project.screenshot_url ? (
            <img 
              src={project.screenshot_url} 
              alt={project.title}
              decoding="async"
              className="w-full h-full object-cover grayscale-[100%] contrast-[1.1] opacity-90"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-white opacity-10">
               <Icon name="globe" size={80} />
             </div>
          )}
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar bg-[#111111]">
          <SectionLabel>{project.cat}</SectionLabel>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-6 mb-8 leading-none font-barlow uppercase tracking-tightest">
            {project.title}
          </h2>
          
          <div className="grid grid-cols-2 gap-8 mb-12 pb-10 border-b border-[#222222]">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#888888] mb-2 font-dmsans font-bold">Metric Peak</div>
              <div className="text-2xl md:text-3xl font-black text-black font-barlow uppercase bg-[#E8FF3A] inline-block px-2">
                {project.metric}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#888888] mb-2 font-dmsans font-bold">Lifecycle</div>
              <div className="text-2xl md:text-3xl font-black text-white font-barlow uppercase">
                {project.status}
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h4 className="text-[11px] uppercase tracking-widest text-[#888888] mb-4 font-dmsans font-bold">Summary</h4>
            <p className="text-lg leading-relaxed text-white font-dmsans">
              {project.fullSummary || project.description}
            </p>
          </div>

          {project.features && (
            <div className="mb-12">
              <h4 className="text-[11px] uppercase tracking-widest text-[#888888] mb-4 font-dmsans font-bold">Core Features</h4>
              <div className="flex flex-wrap gap-3">
                {project.features.map(f => (
                  <span key={f} className="px-4 py-2 rounded-none bg-[#0A0A0A] border border-[#222222] text-[11px] text-white font-bold font-dmsans uppercase tracking-wider">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={() => window.location.href = 'mailto:baloch@sazaanstudio.space?subject=Architecture Inquiry: ' + project.title}
            className="btn btn-primary w-full md:w-auto px-10 py-5"
          >
            Inquire about architecture <Icon name="arrowRight" size={14} />
          </button>
        </div>
      </m.div>
    </m.div>
  );
};

