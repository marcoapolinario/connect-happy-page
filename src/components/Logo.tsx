import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  wordmarkClassName?: string;
  symbolClassName?: string;
  variant?: "default" | "light";
  showWordmark?: boolean;
  showTagline?: boolean;
}

/**
 * TurboMR wordmark — Montserrat, "Turbo" em azul profundo (ou branco na versão
 * negativa) + "MR." em azul turbo, com tagline opcional "Imagens em menos tempo".
 */
export const Logo = ({
  className,
  wordmarkClassName,
  symbolClassName,
  variant = "default",
  showWordmark = true,
  showTagline = false,
}: LogoProps) => {
  const isLight = variant === "light";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src="/favicon.png"
        alt=""
        aria-hidden
        className={cn("h-9 w-9 sm:h-10 sm:w-10 rounded-lg object-contain shrink-0", symbolClassName)}
      />
      {showWordmark && (
        <span className="inline-flex flex-col leading-none">
          <span
            className={cn(
              "font-extrabold tracking-tight text-xl sm:text-2xl leading-none",
              isLight ? "text-white" : "text-foreground",
              wordmarkClassName,
            )}
          >
            Turbo<span className={isLight ? "text-primary-glow" : "text-primary"}>MR.</span>
          </span>
          {showTagline && (
            <span
              className={cn(
                "mt-1 text-[9px] sm:text-[10px] font-semibold uppercase",
                isLight ? "text-white/70" : "text-muted-foreground",
              )}
              style={{ letterSpacing: "0.28em" }}
            >
              Imagens em menos tempo
            </span>
          )}
        </span>
      )}
    </span>
  );
};
