import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export const FloatingNav = ({
  navItems,
  className,
  setPage,
}: {
  navItems: {
    name: string;
    link?: string;
    icon?: React.ReactElement;
    action?: () => void;
  }[];
  className?: string;
  setPage: (page: string) => void;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = current - previous;

    // Show at the very top
    if (current < 10) {
      setVisible(true);
      return;
    }

    // Hide when scrolling down, Show when scrolling up
    if (diff > 5) {
      setVisible(false);
      setOpen(false);
    } else if (diff < -5) {
      setVisible(true);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex flex-col md:flex-row w-[92%] md:w-full md:max-w-4xl fixed top-6 md:top-10 inset-x-0 mx-auto border border-white/[0.1] rounded-2xl md:rounded-full bg-black/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-[5000] px-6 py-3 md:py-3 items-center justify-between overflow-hidden transition-all duration-300",
          open ? "max-h-[400px]" : "max-h-[64px] md:max-h-[70px]",
          className
        )}
      >
        {/* Brand/Logo Section - Always visible */}
        <div className="flex w-full md:w-auto items-center justify-between">
            <button 
              onClick={() => { setPage('home'); window.scrollTo({top: 0, behavior: 'smooth'}); setOpen(false); }}
              className="group flex items-center gap-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-light to-[#FF8C42] flex items-center justify-center font-black text-black text-xs">S</div>
              <span className="text-sm font-bold tracking-widest text-white group-hover:text-orange-light transition-colors">SAZAAN <span className="hidden sm:inline font-light text-white/50 group-hover:text-orange-light/50 transition-colors">DIGITAL</span></span>
            </button>
            
            <button 
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                className="md:hidden p-2 text-white hover:text-orange-light transition-colors"
            >
                {open ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>

        {/* Nav Items - Collapsible on Mobile, Visible on Desktop */}
        <div className={cn(
            "flex flex-col md:flex-row items-center gap-4 md:gap-8 mt-6 md:mt-0 transition-all duration-300",
            !open && "opacity-0 md:opacity-100 h-0 md:h-auto overflow-hidden md:overflow-visible pointer-events-none md:pointer-events-auto"
        )}>
          {navItems.map((navItem, idx: number) => (
            <button
              key={`link=${idx}`}
              onClick={() => {
                const targetPage = navItem.name.toLowerCase();
                setPage(targetPage);
                window.scrollTo({ top: 0, behavior: "smooth" });
                setOpen(false);
              }}
              className="relative px-4 py-2 text-sm font-bold uppercase tracking-widest text-gray-400 transition-all duration-200 hover:text-white active:scale-95 flex items-center justify-center w-full md:w-auto"
            >
              {navItem.name}
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
