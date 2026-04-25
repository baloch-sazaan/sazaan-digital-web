import React, { useMemo } from "react";
import { m as motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageSource {
  src: string;
  alt: string;
}

interface ShowImageListItemProps {
  text: string;
  images: [ImageSource, ImageSource];
}

const RevealImageListItem = React.memo(({ text, images }: ShowImageListItemProps) => {
  const container = "absolute -right-2 md:right-16 -top-12 md:-top-12 z-40 h-20 w-20 md:h-48 md:w-56 pointer-events-none block";
  const effect =
    "relative duration-500 shadow-xl sm:shadow-none sm:group-hover:shadow-2xl scale-100 sm:scale-90 sm:group-hover:scale-100 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 w-full h-full overflow-hidden transition-all rounded-xl md:rounded-2xl border border-[#E8FF3A]/30 bg-white";

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
      }}
      className="group relative h-fit w-full overflow-visible py-8 md:py-10 border-b border-[#111111]/10 last:border-0 cursor-crosshair flex flex-col sm:block will-change-[transform,opacity]"
    >
      <h3 className="text-3xl sm:text-6xl md:text-8xl font-black text-[#222222] transition-all duration-700 sm:group-hover:translate-x-8 sm:group-hover:text-[#111111] uppercase font-barlow italic leading-none pr-16 md:pr-0">
        {text}
      </h3>
      
      {/* Mobile-only visible images (Accessible fallback for small screens without hover) */}
      <div className="relative w-full h-32 mt-6 sm:hidden flex gap-4">
        <img 
          alt={images[0].alt} 
          src={images[0].src} 
          className="w-1/2 h-full object-cover rounded-xl border border-[#E8FF3A]/30 shadow-sm" 
          loading="lazy"
        />
        <img 
          alt={images[1].alt} 
          src={images[1].src} 
          className="w-1/2 h-full object-cover rounded-xl border border-[#E8FF3A]/30 shadow-sm" 
          loading="lazy"
        />
      </div>

      {/* Background Image (Stacked behind - Desktop Only) */}
      <motion.div 
        initial={{ opacity: 0, x: 20, rotate: 0 }}
        whileInView={{ opacity: 1, x: 0, rotate: -6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={cn(container, "hidden sm:block transition-all duration-700 sm:delay-75 sm:group-hover:-translate-y-4 sm:group-hover:-translate-x-4 sm:group-hover:-rotate-6 -translate-x-4 -translate-y-4 -rotate-6")}
      >
        <div className={cn(effect, "sm:delay-75")}>
          <img 
            alt={images[1].alt} 
            src={images[1].src} 
            className="h-full w-full object-cover grayscale sm:group-hover:grayscale-0 transition-all duration-1000 scale-110 sm:group-hover:scale-100" 
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>

      {/* Foreground Image - Desktop Only */}
      <motion.div
        initial={{ opacity: 0, x: -20, rotate: 0 }}
        whileInView={{ opacity: 1, x: 0, rotate: 12 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={cn(
          container,
          "hidden sm:block transition-all duration-500 sm:group-hover:translate-x-12 sm:group-hover:translate-y-8 sm:group-hover:rotate-12 translate-x-4 translate-y-2 rotate-12",
        )}
      >
        <div className={cn(effect)}>
          <img 
            alt={images[0].alt} 
            src={images[0].src} 
            className="h-full w-full object-cover grayscale sm:group-hover:grayscale-0 transition-all duration-1000 scale-110 sm:group-hover:scale-100" 
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>
    </motion.div>
  );
});

function RevealImageList() {
  const items: ShowImageListItemProps[] = [
    {
      text: "Elite Websites",
      images: [
        {
          src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500&auto=format&fit=crop",
          alt: "Web Development",
        },
        {
          src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop",
          alt: "Code Interface",
        },
      ],
    },
    {
      text: "SEO Engines",
      images: [
        {
          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop",
          alt: "Data Analytics",
        },
        {
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop",
          alt: "Growth Charts",
        },
      ],
    },
    {
      text: "Automation",
      images: [
        {
          src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500&auto=format&fit=crop",
          alt: "Technology System",
        },
        {
          src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=500&auto=format&fit=crop",
          alt: "Server Infrastructure",
        },
      ],
    },
    {
      text: "UI/UX Design",
      images: [
        {
          src: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=500&auto=format&fit=crop",
          alt: "High-Fidelity Interface Design",
        },
        {
          src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=500&auto=format&fit=crop",
          alt: "Premium Mobile UX Patterns",
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col gap-1 bg-[#F7F7F5] px-4 md:px-24 py-32 max-w-[1400px] mx-auto">
      <div className="mb-16">
        <h3 className="text-sm font-black uppercase text-[#111111]/60 tracking-[0.3em]">Core Capabilities</h3>
        <h2 className="text-4xl font-black text-[#111111] mt-4 uppercase font-barlow">WHAT WE PROVIDE</h2>
      </div>
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="flex flex-col"
      >
        {items.map((item, index) => (
          <RevealImageListItem key={index} text={item.text} images={item.images} />
        ))}
      </motion.div>
    </div>
  );
}

export { RevealImageList };
