import React from "react";

export interface AuroraShaderProps {
  intensity?: number;
  className?: string;
}

export const AuroraShader: React.FC<AuroraShaderProps> = ({
  intensity = 1.0,
  className,
}) => {
  return (
    <div
      aria-hidden="true"
      data-aurora
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className ?? ""}`}
      style={{ opacity: 0.6 * intensity }}
    >
      {/* Static warm radial gradient — no animation, no GPU drain */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 80%, var(--accent-sunset, #e8825a) 0%, transparent 60%)," +
            "radial-gradient(ellipse 60% 50% at 80% 20%, var(--orange-light, #FFB07C) 0%, transparent 55%)",
          opacity: 0.18,
        }}
      />
    </div>
  );
};
