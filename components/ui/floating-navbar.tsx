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
          "flex flex-col md:flex-row w-[90%] md:max-w-fit fixed top-8 md:top-12 inset-x-0 mx-auto border border-white/[0.1] rounded-3xl md:rounded-full bg-black/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-[9999] px-6 py-3 md:py-3 items-center justify-center overflow-hidden transition-all duration-300 pointer-events-auto",
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
          open ? "max-h-[400px]" : "max-h-[64px] md:max-h-[80px]",
          className
        )}
      >
        {/* Mobile Toggle - Only visible on small screens */}
        <div className="flex w-full md:hidden items-center justify-between">
            <span className="text-xs font-black tracking-widest text-orange-light">MENU</span>
            <button 
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                className="p-2 text-white hover:text-orange-light transition-colors"
            >
                {open ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>

        {/* Nav Items - Centered for both views */}
        <div className={cn(
            "flex flex-col md:flex-row items-center gap-6 md:gap-8 mt-6 md:mt-0 transition-all duration-300",
            !open && "opacity-0 md:opacity-100 h-0 md:h-auto overflow-hidden md:overflow-visible pointer-events-none md:pointer-events-auto"
        )}>
          {navItems.map((navItem, idx: number) => (
            <button
              key={`link=${idx}`}
              onClick={() => {
                if (navItem.action) {
                  navItem.action();
                } else if (navItem.link) {
                  const element = document.getElementById(navItem.link.replace('#', ''));
                  if(element) element.scrollIntoView({ behavior: 'smooth' });
                  else window.location.href = navItem.link;
                }
                setOpen(false);
              }}
              className="relative px-2 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 transition-all duration-200 hover:text-orange-light active:scale-95 flex items-center justify-center w-full md:w-auto"
            >
              {navItem.name}
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
