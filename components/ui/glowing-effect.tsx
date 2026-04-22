import React, { useCallback, useEffect, useRef } from "react";

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  inactiveZone?: number;
  proximity?: number;
  borderWidth?: number;
}

export const GlowingEffect = ({
  spread = 40,
  glow = true,
  disabled = false,
  inactiveZone = 0.01,
  proximity = 64,
  borderWidth = 1,
}: GlowingEffectProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || disabled) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;

      // Distance from center as fraction (0 = center, 1 = edge)
      const cx = Math.abs(x / w - 0.5) * 2;
      const cy = Math.abs(y / h - 0.5) * 2;
      const inInactiveZone = cx < inactiveZone && cy < inactiveZone;

      if (inInactiveZone) {
        ref.current.style.setProperty("--opacity", "0");
        return;
      }

      // Distance from element edges (negative = inside)
      const distToEdge = Math.min(
        x, y, w - x, h - y,
        Math.sqrt((e.clientX - rect.left) ** 2 + (e.clientY - rect.top) ** 2)
      );

      const isNear =
        e.clientX >= rect.left - proximity &&
        e.clientX <= rect.right + proximity &&
        e.clientY >= rect.top - proximity &&
        e.clientY <= rect.bottom + proximity;

      const opacity = isNear ? 1 : 0;

      ref.current.style.setProperty("--x", `${x}px`);
      ref.current.style.setProperty("--y", `${y}px`);
      ref.current.style.setProperty("--spread", `${spread}px`);
      ref.current.style.setProperty("--opacity", `${opacity}`);
    },
    [disabled, inactiveZone, proximity, spread]
  );

  useEffect(() => {
    if (disabled) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [disabled, handleMouseMove]);

  if (disabled) return null;

  return (
    <div
      ref={ref}
      style={
        {
          "--x": "50%",
          "--y": "50%",
          "--spread": `${spread}px`,
          "--opacity": "0",
          "--border-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
      className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
    >
      {glow && (
        <div
          className="absolute rounded-[inherit]"
          style={{
            inset: `-${borderWidth}px`,
            background: `radial-gradient(var(--spread) circle at var(--x) var(--y), rgba(255,176,124,0.6), transparent 100%)`,
            opacity: "var(--opacity)" as unknown as number,
            transition: "opacity 0.3s ease",
          }}
        />
      )}
    </div>
  );
};
