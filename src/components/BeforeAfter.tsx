import { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt?: string;
  className?: string;
  imageFit?: "cover" | "contain";
}

export const BeforeAfter = ({
  beforeSrc,
  afterSrc,
  beforeLabel = "Antes",
  afterLabel = "Depois",
  alt = "Comparativo antes e depois",
  className,
  imageFit = "cover",
}: BeforeAfterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const draggingRef = useRef(false);
  const imageFitClass = imageFit === "contain" ? "object-contain" : "object-cover";

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      updateFromClientX(clientX);
    };
    const onUp = () => (draggingRef.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateFromClientX]);

  const startDrag = (clientX: number) => {
    draggingRef.current = true;
    updateFromClientX(clientX);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-square overflow-hidden rounded-2xl select-none shadow-elegant border border-border/50 bg-black cursor-ew-resize touch-none",
        className,
      )}
      onMouseDown={(e) => startDrag(e.clientX)}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-label={alt}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
      }}
    >
      <img
        src={afterSrc}
        alt={`${alt} - depois`}
        loading="lazy"
        width={1024}
        height={1024}
        className={cn("absolute inset-0 w-full h-full pointer-events-none", imageFitClass)}
        draggable={false}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt={`${alt} - antes`}
          loading="lazy"
          width={1024}
          height={1024}
          className={cn("absolute inset-0 w-full h-full pointer-events-none", imageFitClass)}
          draggable={false}
        />
      </div>

      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider">
        {beforeLabel}
      </div>
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-glow">
        {afterLabel}
      </div>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)] pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-elegant flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-secondary" fill="currentColor">
            <path d="M8 5l-5 7 5 7V5zM16 5v14l5-7-5-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
