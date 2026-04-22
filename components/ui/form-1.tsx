import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "../Primitives";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; message: string }) => void;
  status: "idle" | "sending";
}

export default function ContactForm({ onSubmit, status }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    onSubmit(formData);
  };

  const isSending = status === "sending";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-white/40 ml-2">
              Full Name
            </label>
            <div className="relative group">
              <input
                required
                id="name"
                type="text"
                disabled={isSending}
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={cn(
                  "w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white outline-none transition-all duration-300",
                  "focus:border-orange-light/50 focus:bg-white/[0.05] group-hover:border-white/20",
                  "placeholder:text-white/10"
                )}
              />
              <div className="absolute inset-0 rounded-2xl bg-orange-light/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-white/40 ml-2">
              Email Address
            </label>
            <div className="relative group">
              <input
                required
                id="email"
                type="email"
                disabled={isSending}
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={cn(
                  "w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white outline-none transition-all duration-300",
                  "focus:border-orange-light/50 focus:bg-white/[0.05] group-hover:border-white/20",
                  "placeholder:text-white/10"
                )}
              />
              <div className="absolute inset-0 rounded-2xl bg-orange-light/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-white/40 ml-2">
            Project Details
          </label>
          <div className="relative group">
            <textarea
              required
              id="message"
              rows={5}
              disabled={isSending}
              placeholder="Tell us about your brand goals..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={cn(
                "w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white outline-none transition-all duration-300 resize-none",
                "focus:border-orange-light/50 focus:bg-white/[0.05] group-hover:border-white/20",
                "placeholder:text-white/10"
              )}
            />
            <div className="absolute inset-0 rounded-2xl bg-orange-light/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSending}
            className={cn(
              "group relative w-full overflow-hidden rounded-2xl bg-orange-light px-8 py-5 text-black font-bold transition-all duration-300",
              "hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed",
              "shadow-[0_0_30px_rgba(255,176,124,0.2)] hover:shadow-[0_0_50px_rgba(255,176,124,0.3)]"
            )}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              {isSending ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <>
                  <span>SEND SIGNAL</span>
                  <Icon name="arrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer" />
          </button>
        </div>
        
        <p className="text-center text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
          Secure encryption enabled — end-to-end delivery
        </p>
      </form>
    </motion.div>
  );
}
