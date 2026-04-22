import React from "react";
import { motion } from "framer-motion";

interface AwardBadgeProps {
  overline: string;
  mainText: string;
  place?: number;
}

export const AwardBadge = ({ overline, mainText, place }: AwardBadgeProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative flex flex-col items-center p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all hover:bg-white/[0.08] hover:border-orange-500/30 w-full md:w-[300px]"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {place && (
        <div className="mb-6 w-12 h-12 rounded-full border border-orange-500/30 flex items-center justify-center text-orange-light font-mono text-xl relative">
          <span className="relative z-10">{place}</span>
          <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-sm" />
        </div>
      )}

      <span className="text-[10px] tracking-[0.2em] font-mono text-gray-500 uppercase mb-3">
        {overline}
      </span>
      
      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
        {mainText}
      </h3>

      <div className="mt-6 w-8 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-orange-500/50 transition-all duration-300" />
    </motion.div>
  );
};
