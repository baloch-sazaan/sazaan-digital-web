"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";

export const PointerHighlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative inline-block px-1 rounded-sm transition-colors duration-500 cursor-default",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(60px circle at ${position.x}px ${position.y}px, rgba(232, 255, 58, 0.35), transparent 80%)`,
          zIndex: 0
        }}
      />
      <span className="relative z-10">{children}</span>
    </div>
  );
};
