import React, { useState, useEffect } from "react"
import { m, AnimatePresence } from "framer-motion"
import { createPortal } from 'react-dom';
import { Icon, SEOMetadata } from "./primitives"
import emailjs from '@emailjs/browser';
import { dbService, type ContactSubmission } from '../services/db.service';

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
    <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
  </svg>
);

const FeedbackModal = ({ status, onClose, title, message }: { status: 'success' | 'error' | 'info', onClose: () => void, title?: string, message?: string }) => {
  const modalContent = (
    <m.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000000] flex items-center justify-center p-4 sm:p-6 bg-[#F7F7F5]/90 backdrop-blur-md"
      onClick={onClose}
    >
      <m.div
        initial={{ scale: 0.98, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0, y: 10 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] bg-white border border-[#E2E2DE] rounded-none p-10 sm:p-16 text-center shadow-none overflow-hidden"
      >
        <div className={`absolute top-0 left-0 w-full h-2 ${status === 'success' ? 'bg-[#E8FF3A]' : status === 'info' ? 'bg-[#E2E2DE]' : 'bg-red-500'}`} />
        
        <div className={`w-28 h-28 mx-auto mb-10 rounded-full flex items-center justify-center border border-[#E2E2DE] ${status === 'success' ? 'bg-[#E8FF3A]' : 'bg-[#F7F7F5]'}`}>
          <Icon 
            name={status === 'success' ? 'checkCircle' : status === 'info' ? 'alertCircle' : 'share'} 
            size={48} 
            className="text-[#111111]" 
          />
        </div>

        <h2 className="text-4xl sm:text-5xl font-black text-[#111111] mb-6 uppercase tracking-tightest leading-none font-barlow italic">
          {title || (status === 'success' ? 'TRANSMITTED' : status === 'info' ? 'HOLD UP' : 'ERROR')}
        </h2>
        
        <p className="text-[#555555] font-bold font-dmsans leading-relaxed mb-12 text-base sm:text-lg">
          {message || (status === 'success' 
            ? "Your architecture inquiry is received. Expect a response within 24 hours."
            : status === 'info' ? "Please accept the privacy policy to continue your transmission." : "Architecture transmission failed. Verify details and retry.")}
        </p>

        <button 
          onClick={onClose}
          className="w-full py-6 rounded-none bg-[#E8FF3A] text-[#111111] font-black text-xl uppercase font-barlow tracking-widest hover:bg-[#111111] hover:text-white transition-all border border-[#111111]"
        >
          {status === 'info' ? 'ACCEPT & CLOSE' : 'CONTINUE'}
        </button>
      </m.div>
    </m.div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
};

export const ContactPage = ({ setPage }: { setPage: (p: string) => void }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'info'>('idle');
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    agreed: false
  });

  const EJS_PUBLIC_KEY = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string) || "";
  const EJS_SERVICE = (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) || "";
  const EJS_TMPL_NOTIFY = (import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFY as string) || "";
  const EJS_TMPL_CONFIRM = (import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRM as string) || "";

  useEffect(() => {
    if (EJS_PUBLIC_KEY) {
      try {
        emailjs.init(EJS_PUBLIC_KEY);
      } catch {
        // silent
      }
    }
  }, [EJS_PUBLIC_KEY]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (status === 'sending') return;

    if (formData.agreed !== true) {
      setStatus('info');
      setShowModal(true);
      return;
    }

    setStatus('sending');

    if (!EJS_PUBLIC_KEY || !EJS_SERVICE || !EJS_TMPL_NOTIFY) {
      setStatus('error');
      setShowModal(true);
      return;
    }

    const sanitizedCompany = formData.company?.trim() || "-";
    const sanitizedPhone = formData.phone?.trim() || "-";

    const templateParams = {
      to_email: 'baloch@sazaanstudio.space',
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      company: sanitizedCompany,
      phone: sanitizedPhone,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    const autoReplyParams = {
      to_email: formData.email,
      name: formData.firstName,
      email: formData.email,
      message: formData.message,
      company: sanitizedCompany,
      phone: sanitizedPhone,
    };

    try {
      if (!formData.agreed) throw new Error('Internal Guard: Privacy agreement missing');

      await emailjs.send(EJS_SERVICE, EJS_TMPL_NOTIFY, templateParams, EJS_PUBLIC_KEY);

      await dbService.saveContactSubmission({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: sanitizedCompany,
        phone: sanitizedPhone,
        message: formData.message
      });

      emailjs.send(EJS_SERVICE, EJS_TMPL_CONFIRM, autoReplyParams, EJS_PUBLIC_KEY).catch(() => {});

      setStatus('success');
      setShowModal(true);
      setFormData({ firstName: '', lastName: '', email: '', company: '', phone: '', message: '', agreed: false });
    } catch {
      setStatus('error');
      setShowModal(true);
    }
  };

  return (
    <m.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative isolate bg-[#F7F7F5] px-6 py-24 sm:py-32 lg:px-8 overflow-hidden min-h-screen pt-40"
    >
      <SEOMetadata 
        title="Contact Our AI Studio" 
        description="Ready to scale your US medical clinic or cafe with AI? Secure your industry authority today with our premium automation and lead generation solutions."
        keywords="contact AI automation agency, medical clinic marketing USA, cafe automation inquiry, hospitality AI solutions"
        canonical="https://sazaanstudio.space/#contact"
      />
      {/* Back Button */}
      <div className="max-w-2xl mx-auto mb-12">
        <button 
          onClick={() => { setPage('home'); }}
          className="group flex items-center gap-4 text-[#111111]/40 hover:text-[#111111] transition-all duration-300 font-bold tracking-widest text-xs uppercase cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full border border-[#E2E2DE] bg-white flex items-center justify-center group-hover:border-[#E8FF3A] group-hover:bg-[#E8FF3A] transition-all">
            <Icon name="share" size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform text-[#111111]" />
          </div>
          <span className="font-dmsans">Exit to Terminal</span>
        </button>
      </div>

      <div className="mx-auto max-w-2xl text-center relative z-10">
        <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-black tracking-tightest text-[#111111] font-barlow uppercase leading-none">
          Build Your <span className="italic whitespace-nowrap">Digital Presence</span>
        </h1>
        <p className="mt-8 text-lg font-dmsans text-[#555555] leading-relaxed max-w-lg mx-auto uppercase tracking-wider">
          Secure your industry authority. We architect high-performance experiences for creative studios and scaling enterprises.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="mx-auto mt-16 max-w-xl sm:mt-24 relative z-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-widest text-[#555555] mb-2 font-dmsans">
              First name
            </label>
            <div className="mt-2.5">
              <input
                required
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full rounded-none border border-[#E2E2DE] bg-white px-4 py-5 text-base text-[#111111] outline-none focus:border-[#E8FF3A] transition-all font-dmsans"
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-widest text-[#555555] mb-2 font-dmsans">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                required
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full rounded-none border border-[#E2E2DE] bg-white px-4 py-5 text-base text-[#111111] outline-none focus:border-[#E8FF3A] transition-all font-dmsans"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-xs font-bold uppercase tracking-widest text-[#555555] mb-2 font-dmsans">
              Niche / Company
            </label>
            <div className="mt-2.5">
              <input
                id="company"
                name="company"
                type="text"
                placeholder="e.g. Creative Studio, Tech Enterprise"
                autoComplete="organization"
                value={formData.company}
                onChange={handleChange}
                className="block w-full rounded-none border border-[#E2E2DE] bg-white px-4 py-5 text-base text-[#111111] outline-none focus:border-[#E8FF3A] transition-all font-dmsans placeholder:text-[#BBBBBB]"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-[#555555] mb-2 font-dmsans">
              Email Address
            </label>
            <div className="mt-2.5">
              <input
                required
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-none border border-[#E2E2DE] bg-white px-4 py-5 text-base text-[#111111] outline-none focus:border-[#E8FF3A] transition-all font-dmsans"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-[#555555] mb-2 font-dmsans">
              Phone number
            </label>
            <div className="mt-2.5">
              <div className="flex border border-[#E2E2DE] bg-white focus-within:border-[#E8FF3A] transition-all">
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    aria-label="Country"
                    className="col-start-1 row-start-1 w-full appearance-none bg-transparent py-5 pr-10 pl-4 text-base text-[#111111] focus:outline-none sm:text-sm font-dmsans"
                  >
                    <option value="US">US</option>
                    <option value="PK">PK</option>
                    <option value="UK">UK</option>
                  </select>
                  <div className="pointer-events-none col-start-1 row-start-1 mr-3 size-4 self-center justify-self-end text-[#111111]/40">
                    <ChevronDownIcon />
                  </div>
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="123-456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block min-w-0 grow bg-transparent py-5 pr-4 pl-2 text-base text-[#111111] outline-none sm:text-sm font-dmsans placeholder:text-[#BBBBBB]"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-[#555555] mb-2 font-dmsans">
              Transmission Details
            </label>
            <div className="mt-2.5">
              <textarea
                required
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="block w-full rounded-none border border-[#E2E2DE] bg-white px-4 py-5 text-base text-[#111111] outline-none focus:border-[#E8FF3A] transition-all font-dmsans"
              />
            </div>
          </div>
          <div className="flex gap-x-4 sm:col-span-2 items-center">
            <div className="flex h-6 items-center">
              <input
                id="agreed"
                name="agreed"
                type="checkbox"
                checked={formData.agreed}
                onChange={handleChange}
                className="size-5 h-5 w-5 rounded-none border-[#E2E2DE] text-[#E8FF3A] focus:ring-[#E8FF3A]"
              />
            </div>
            <label htmlFor="agreed" className="text-xs font-bold text-[#555555] font-dmsans uppercase tracking-wider">
              I agree to the{' '}
              <button 
                type="button"
                onClick={() => setPage('privacy-policy')}
                className="text-[#111111] border-b border-[#111111] hover:bg-[#E8FF3A] transition-all"
              >
                Privacy Architecture
              </button>
              .
            </label>
          </div>
        </div>
        <div className="mt-12">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="block w-full rounded-none bg-[#E8FF3A] px-6 py-6 text-center text-xl font-black text-[#111111] uppercase font-barlow tracking-widest hover:bg-[#111111] hover:text-white transition-all border border-[#111111] disabled:opacity-50"
          >
            {status === 'sending' ? 'Transmitting...' : "Initiate Architecture"}
          </button>
        </div>
        
        <div className="mt-12 text-center">
          <button 
            type="button"
            onClick={() => setPage('privacy-policy')}
            className="text-[10px] font-bold text-[#555555]/40 uppercase tracking-widest hover:text-[#111111] transition-colors"
          >
            Privacy Policy
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showModal && (
          <FeedbackModal 
            status={status === 'success' ? 'success' : status === 'info' ? 'info' : 'error'} 
            onClose={() => setShowModal(false)} 
          />
        )}
      </AnimatePresence>
    </m.main>
  )
}

