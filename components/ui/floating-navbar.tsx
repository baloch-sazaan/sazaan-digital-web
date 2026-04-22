import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href?: string;
  link?: string;
  action?: () => void;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
  setPage: (page: string) => void;
  visibleExternal?: boolean;
}

export const FloatingNav = ({ navItems, className, setPage, visibleExternal }: FloatingNavProps) => {
  const [open, setOpen] = useState(false);
  const visible = visibleExternal ?? true;

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    // Prevent hash jump; SPA navigation handled by action
    if (!item.link || item.link.startsWith('#')) e.preventDefault();
    if (item.action) {
      item.action();
    } else if (item.link && !item.link.startsWith('#')) {
      window.location.href = item.link;
    }
    setOpen(false);
  };

  const linkClass =
    "relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 hover:text-orange-light transition-colors duration-200 rounded-full hover:bg-white/5 active:scale-95 cursor-pointer pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-light focus-visible:ring-offset-1 focus-visible:ring-offset-black";

  const mobileLinkClass =
    "w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white/50 hover:text-orange-light hover:bg-white/5 rounded-xl transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-light focus-visible:ring-offset-1 focus-visible:ring-offset-black";

  return (
    // Outer wrapper: always in DOM, always positioned, never blocks clicks when hidden
    <div
      className={cn(
        "fixed inset-x-0 top-6 md:top-10 z-[999999] flex justify-center pointer-events-none",
        className
      )}
    >
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: visible ? 0 : -80,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-auto w-[92%] md:w-auto border border-white/10 rounded-3xl md:rounded-full bg-black/80 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden",
        )}
      >
        {/* ── Desktop Layout ── */}
        <div className="hidden md:flex items-center gap-1 px-4 py-2">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href ?? item.link ?? '#'}
              onClick={(e) => handleNavClick(e, item)}
              className={linkClass}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* ── Mobile Layout ── */}
        <div className="flex md:hidden flex-col w-full">
          {/* Mobile Header Row */}
          <div className="flex items-center justify-between px-5 py-3">
            <span className="text-[10px] font-black tracking-[0.25em] text-orange-light uppercase">
              Menu
            </span>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className="p-2 -mr-1 text-white/60 hover:text-orange-light transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-light"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Mobile Dropdown Links */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden border-t border-white/10"
              >
                <div className="flex flex-col py-2 px-3">
                  {navItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href ?? item.link ?? '#'}
                      onClick={(e) => handleNavClick(e, item)}
                      className={mobileLinkClass}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
