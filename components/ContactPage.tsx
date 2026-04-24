import React, { useState, useEffect } from "react"
import { m, AnimatePresence } from "framer-motion"
import { createPortal } from 'react-dom';
import { Icon } from "./Primitives"
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <m.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[440px] bg-[#0A0A0A] border border-white/10 rounded-[40px] p-8 sm:p-12 text-center shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden"
      >
        <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${status === 'success' ? 'from-orange-light to-orange-400' : status === 'info' ? 'from-orange-light/40 to-orange-light/10' : 'from-red-500 to-red-600'}`} />
        
        <div className={`w-24 h-24 mx-auto mb-8 rounded-[32px] rotate-3 flex items-center justify-center border-2 ${status === 'success' ? 'border-orange-light/20 bg-orange-light/5' : status === 'info' ? 'border-white/10 bg-white/5' : 'border-red-500/20 bg-red-500/5'}`}>
          <m.div
             animate={status === 'info' ? { y: [0, -4, 0], rotate: [0, 5, -5, 0] } : {}}
             transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <Icon 
              name={status === 'success' ? 'checkCircle' : status === 'info' ? 'alertCircle' : 'share'} 
              size={48} 
              className={`${status === 'success' ? 'text-orange-light' : status === 'info' ? 'text-orange-light/60' : 'text-red-500'} -rotate-3`} 
            />
          </m.div>
        </div>

        <h3 className="text-3xl sm:text-4xl font-heading font-black text-white mb-4 uppercase tracking-tighter leading-tight italic">
          {title || (status === 'success' ? 'LOCKED IN' : status === 'info' ? 'HOLD UP' : 'ERROR')}
        </h3>
        
        <p className="text-white/50 font-medium leading-relaxed mb-10 text-base sm:text-lg">
          {message || (status === 'success' 
            ? "We've received your inquiry. Our team will get back to you within 24 hours."
            : status === 'info' ? "You need to press the privacy policy button to continue." : "Submission failed. Please check your details and try again.")}
        </p>

        <button 
          onClick={onClose}
          className="w-full py-5 rounded-2xl bg-orange-light text-black font-black text-lg sm:text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(255,176,124,0.1)]"
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
        // silent — EmailJS init failure handled at send time
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

    // 1. Fallback Logic for Optional Fields
    const sanitizedCompany = formData.company?.trim() || "-";
    const sanitizedPhone = formData.phone?.trim() || "-";

    // Primary Notification Payload (Internal — sent to YOUR inbox)
    const templateParams = {
      to_email: 'baloch@sazaandigital.com', // Always routes to agency inbox
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      company: sanitizedCompany,
      phone: sanitizedPhone,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    // Autoresponder Payload (Client — sent to the USER's email only)
    const autoReplyParams = {
      to_email: formData.email, // Routes to the user who submitted the form
      name: formData.firstName,
      email: formData.email,
      message: formData.message,
      company: sanitizedCompany,
      phone: sanitizedPhone,
    };

    try {
      // Secondary fail-safe check
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

      // Confirmation email — non-blocking, best-effort
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
      className="relative isolate bg-[#050505] px-6 py-24 sm:py-32 lg:px-8 overflow-hidden min-h-screen pt-40"
    >
      {/* Back Button */}
      <div className="max-w-2xl mx-auto mb-12">
        <button 
          onClick={() => { setPage('home'); }}
          className="group flex items-center gap-3 text-white/40 hover:text-orange-light transition-all duration-300 font-bold tracking-widest text-xs uppercase cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-orange-light/30 group-hover:bg-orange-light/5 transition-all">
            <Icon name="share" size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span>Back to Home</span>
        </button>
      </div>
      {/* Background Ambience */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#FFB07C] to-[#9089fc] opacity-10 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto max-w-2xl text-center relative z-10">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">Let's build something elite</h2>
        <p className="mt-4 text-lg/8 text-white/40">
          Ready to dominate your market with high-performance web experiences and AI-driven workflows? Let's talk.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20 relative z-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm/6 font-semibold text-white">
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
                className="block w-full rounded-xl bg-white/5 px-3.5 py-4 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/20 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-light transition-all"
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm/6 font-semibold text-white">
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
                className="block w-full rounded-xl bg-white/5 px-3.5 py-4 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/20 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-light transition-all"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm/6 font-semibold text-white">
              Company
            </label>
            <div className="mt-2.5">
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                value={formData.company}
                onChange={handleChange}
                className="block w-full rounded-xl bg-white/5 px-3.5 py-4 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/20 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-light transition-all"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6 font-semibold text-white">
              Email
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
                className="block w-full rounded-xl bg-white/5 px-3.5 py-4 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/20 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-light transition-all"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm/6 font-semibold text-white">
              Phone number
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-xl bg-white/5 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-orange-light transition-all">
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    aria-label="Country"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-xl bg-transparent py-4 pr-7 pl-3.5 text-base text-white/60 focus:outline-none sm:text-sm/6 [&>option]:bg-[#0d0d0d] [&>option]:text-white"
                  >
                    <option value="US">US</option>
                    <option value="PK">PK</option>
                    <option value="UK">UK</option>
                  </select>
                  <div className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-orange-light/40">
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
                  className="block min-w-0 grow bg-transparent py-4 pr-3 pl-1 text-base text-white placeholder:text-white/20 focus:outline-none sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm/6 font-semibold text-white">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                required
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="block w-full rounded-xl bg-white/5 px-3.5 py-4 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/20 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-light transition-all"
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
                className="size-4 h-4 w-4 rounded border-white/10 bg-white/5 text-orange-light focus:ring-orange-light focus:ring-offset-[#050505]"
              />
            </div>
            <label htmlFor="agreed" className="text-sm/6 text-white/40">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold whitespace-nowrap text-orange-light hover:underline">
                privacy policy
              </a>
              .
            </label>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="block w-full rounded-xl bg-orange-light px-3.5 py-4 text-center text-lg font-bold text-black shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-orange-950/20"
          >
            {status === 'sending' ? 'Transmitting...' : "Let's talk"}
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
