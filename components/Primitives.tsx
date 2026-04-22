import React, { useState, useEffect, useRef } from 'react';
import { m } from 'framer-motion';

export const Icon = ({ name, size = 16, stroke = 2, className = '', style = {} }: { name: string, size?: number, stroke?: number, className?: string, style?: React.CSSProperties }) => {
  const s = { width: size, height: size, ...style };
  const common = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    className, style: s,
  };
  const paths: Record<string, React.ReactNode> = {
    arrowRight: <path d="M5 12h14M13 5l7 7-7 7" />,
    arrowUpRight: <path d="M7 17L17 7M7 7h10v10" />,
    chevronDown: <path d="M6 9l6 6 6-6" />,
    check: <path d="M5 13l4 4L19 7" />,
    checkCircle: <><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></>,
    alertCircle: <><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></>,
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    x: <path d="M18 6L6 18M6 6l12 12" />,
    globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></>,
    code: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
    zap: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
    layers: <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></>,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></>,
    trending: <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />,
    sparkles: <path d="M12 3l1.9 5.8a3 3 0 002 2L21 12l-5.1 1.2a3 3 0 00-2 2L12 21l-1.9-5.8a3 3 0 00-2-2L3 12l5.1-1.2a3 3 0 002-2L12 3z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
    mapPin: <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    bot: <><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M12 8V4M8 2h8M9 14h.01M15 14h.01" /></>,
    terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9l3 3-3 3M13 15h5" /></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></>,
    play: <path d="M5 3l14 9-14 9V3z" fill="currentColor" />,
    dribbble: <><circle cx="12" cy="12" r="10" /><path d="M8.5 2.5c3 3 5 8 5.5 18M21 8.5c-7 0-12 2-17 5.5M3 15c5-3 12-3 18 0" /></>,
    broadcast: <path d="M22 7.99992V11.9999M10.25 5.49991H6.8C5.11984 5.49991 4.27976 5.49991 3.63803 5.82689C3.07354 6.11451 2.6146 6.57345 2.32698 7.13794C2 7.77968 2 8.61976 2 10.2999L2 11.4999C2 12.4318 2 12.8977 2.15224 13.2653C2.35523 13.7553 2.74458 14.1447 3.23463 14.3477C3.60218 14.4999 4.06812 14.4999 5 14.4999V18.7499C5 18.9821 5 19.0982 5.00963 19.1959C5.10316 20.1455 5.85441 20.8968 6.80397 20.9903C6.90175 20.9999 7.01783 20.9999 7.25 20.9999C7.48217 20.9999 7.59826 20.9999 7.69604 20.9903C8.64559 20.8968 9.39685 20.1455 9.49037 19.1959C9.5 19.0982 9.5 18.9821 9.5 18.7499V14.4999H10.25C12.0164 14.4999 14.1772 15.4468 15.8443 16.3556C16.8168 16.8857 17.3031 17.1508 17.6216 17.1118C17.9169 17.0756 18.1402 16.943 18.3133 16.701C18.5 16.4401 18.5 15.9179 18.5 14.8736V5.1262C18.5 4.08191 18.5 3.55976 18.3133 3.2988C18.1402 3.05681 17.9169 2.92421 17.6216 2.88804C17.3031 2.84903 16.8168 3.11411 15.8443 3.64427C14.1772 4.55302 12.0164 5.49991 10.25 5.49991Z" />,
    burst: <path d="M12 2V22M19.0711 4.92893L4.92893 19.0711M22 12H2M19.0711 19.0711L4.92893 4.92893" />,
    eyeOrbit: <path d="M11.9995 12.0001H12.0095M15.535 15.5357C10.8488 20.222 5.46685 22.438 3.51423 20.4854C1.56161 18.5328 3.77769 13.1509 8.46398 8.46461C13.1503 3.77832 18.5322 1.56224 20.4848 3.51486C22.4374 5.46748 20.2213 10.8494 15.535 15.5357ZM15.535 8.46443C20.2213 13.1507 22.4374 18.5326 20.4848 20.4852C18.5321 22.4379 13.1502 20.2218 8.46394 15.5355C3.77765 10.8492 1.56157 5.4673 3.51419 3.51468C5.46681 1.56206 10.8487 3.77814 15.535 8.46443ZM12.4995 12.0001C12.4995 12.2763 12.2757 12.5001 11.9995 12.5001C11.7234 12.5001 11.4995 12.2763 11.4995 12.0001C11.4995 11.724 11.7234 11.5001 11.9995 11.5001C12.2757 11.5001 12.4995 11.724 12.4995 12.0001Z" />,
  };
  return <svg {...common}>{paths[name] || null}</svg>;
};

export const SectionLabel = ({ children, center = false }: { children: React.ReactNode, center?: boolean }) => (
  <div className="section-label" style={center ? { justifyContent: 'center' } : {}}>
    {children}
  </div>
);


export const Reveal = ({ children, delay = 0, as: As = 'div', className = '', style = {} }: { children: React.ReactNode, delay?: number, as?: React.ElementType, className?: string, style?: React.CSSProperties }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={className}
      style={style}
    >
      {children}
    </m.div>
  );
};


export const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const handleMouse = (e: React.MouseEvent) => {
    if (rafRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!ref.current) return;
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      setPosition({ x: (clientX - (left + width / 2)) * 0.35, y: (clientY - (top + height / 2)) * 0.35 });
    });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </m.div>
  );
};

