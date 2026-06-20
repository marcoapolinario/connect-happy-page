import { useId } from "react";

/**
 * Animated neural-wave visualization used in the "Como funciona" step 2.
 * Pure SVG/CSS — no GIF download, runs at 60fps, theme-aware (uses --primary).
 */
export const NeuralWave = ({ className }: { className?: string }) => {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`relative w-full h-full overflow-hidden rounded-2xl bg-[#061425] ${className ?? ""}`}>
      {/* Ambient particles */}
      <div className="absolute inset-0 opacity-70">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-primary"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              opacity: 0.35 + ((i % 5) * 0.1),
              filter: "blur(0.5px)",
              animation: `nw-twinkle ${3 + (i % 4)}s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Radial glow behind brain */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-2/3 h-2/3 rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.35) 0%, transparent 70%)",
            animation: "nw-pulse 3.5s ease-in-out infinite",
          }}
        />
      </div>

      {/* Wave streams from both sides into the brain */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3, 4].map((i) => {
          const y = 120 + i * 30;
          return (
            <g key={`l-${i}`}>
              <path
                d={`M -50 ${y} Q 100 ${y - 20 + i * 4} 200 200`}
                fill="none"
                stroke={`url(#grad-${id})`}
                strokeWidth="1.2"
                strokeDasharray="3 6"
                style={{
                  animation: `nw-dash 2.5s linear ${i * 0.25}s infinite`,
                }}
              />
              <path
                d={`M 450 ${y} Q 300 ${y - 20 + i * 4} 200 200`}
                fill="none"
                stroke={`url(#grad-${id})`}
                strokeWidth="1.2"
                strokeDasharray="3 6"
                style={{
                  animation: `nw-dash 2.5s linear ${i * 0.25 + 0.4}s infinite`,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Brain icon center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative w-[38%] aspect-square rounded-2xl border-2 border-primary/70 bg-primary/5 backdrop-blur-sm flex items-center justify-center shadow-[0_0_40px_hsl(var(--primary)/0.45)]"
          style={{ animation: "nw-pulse 3.5s ease-in-out infinite" }}
        >
          <svg
            viewBox="0 0 64 64"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3/5 h-3/5"
            aria-hidden
          >
            <path d="M32 12v40" />
            <path d="M32 14c-4-4-12-3-12 4 0 2 1 4 2 5-3 1-5 4-5 7s2 6 5 7c-1 2-2 4-2 6 0 5 5 8 12 8" />
            <path d="M32 14c4-4 12-3 12 4 0 2-1 4-2 5 3 1 5 4 5 7s-2 6-5 7c1 2 2 4 2 6 0 5-5 8-12 8" />
            <circle cx="22" cy="24" r="1.2" fill="hsl(var(--primary))" />
            <circle cx="42" cy="24" r="1.2" fill="hsl(var(--primary))" />
            <circle cx="20" cy="38" r="1.2" fill="hsl(var(--primary))" />
            <circle cx="44" cy="38" r="1.2" fill="hsl(var(--primary))" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes nw-dash {
          to { stroke-dashoffset: -90; }
        }
        @keyframes nw-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.92; }
        }
        @keyframes nw-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="nw-"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
};
