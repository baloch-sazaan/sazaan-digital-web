import React from "react";

export interface SiliconShaderProps {
  className?: string;
}

export const AuroraShader: React.FC<SiliconShaderProps> = ({ className }) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className ?? ""}`}
    >
      {/* 3D Perspective Grid */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 176, 124, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 176, 124, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-20%) translateZ(0)',
          transformOrigin: 'top',
        }}
      />

      {/* Floating Silicon Glows - Very Light CSS Animations */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.08] animate-float-slow"
        style={{
          background: 'radial-gradient(circle, var(--accent-sunset, #FFB07C) 0%, transparent 70%)',
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-[0.05] animate-float-reverse"
        style={{
          background: 'radial-gradient(circle, var(--orange-light, #FFC99D) 0%, transparent 70%)',
          filter: 'blur(100px)',
          willChange: 'transform',
        }}
      />

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(5%, 5%, 0); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-5%, -5%, 0); }
        }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 25s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
