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
}: {
  navItems: {
    name: string;
    link?: string;
    icon?: React.ReactElement;
    action?: () => void;
  }[];
  className?: string;
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
          "flex flex-col md:flex-row w-[90%] md:max-w-fit fixed top-8 md:top-12 inset-x-0 mx-auto border border-white/[0.1] rounded-3xl md:rounded-full bg-black/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[5000] px-6 py-3 md:py-4 items-center justify-between md:justify-center overflow-hidden transition-all duration-300",
          open ? "max-h-[400px]" : "max-h-[64px] md:max-h-[80px]",
          className
        )}
      >
        {/* Mobile Header */}
        <div className="flex w-full md:w-auto items-center justify-between md:hidden">
            <span className="text-sm font-bold tracking-tighter text-orange-light">SAZAAN</span>
            <button 
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                className="p-2 text-white hover:text-orange-light transition-colors"
            >
                {open ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>

        {/* Nav Items */}
        <div className={cn(
            "flex flex-col md:flex-row items-center gap-4 md:gap-8 mt-6 md:mt-0 transition-opacity duration-300",
            !open && "opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto"
        )}>
          {navItems.map((navItem, idx: number) => (
            <button
              key={`link=${idx}`}
              onClick={() => {
                setOpen(false);
                if (navItem.action) {
                  navItem.action();
                } else if (navItem.link) {
                  const element = document.getElementById(navItem.link.replace('#', ''));
                  if(element) element.scrollIntoView({ behavior: 'smooth' });
                  else window.location.href = navItem.link;
                }
              }}
              className={cn(
                "relative items-center flex space-x-1 text-gray-300 hover:text-orange-light transition-colors duration-200 py-2 md:py-0 w-full md:w-auto text-center justify-center font-medium"
              )}
            >
              <span className="text-sm">{navItem.name}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
