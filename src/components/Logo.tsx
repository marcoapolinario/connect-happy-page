import { cn } from "@/lib/utils";
import logoPrimary from "@/assets/brand/turbomr-logo.png.asset.json";
import logoWhite from "@/assets/brand/turbomr-logo-white.png.asset.json";

interface LogoProps {
  className?: string;
  wordmarkClassName?: string;
  symbolClassName?: string;
  variant?: "default" | "light";
  showWordmark?: boolean;
  showTagline?: boolean;
}

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
    <span className={cn("inline-flex items-center", className)}>
      <img
        src={isLight ? logoWhite.url : logoPrimary.url}
        alt="TurboMR"
        className={cn("block h-8 w-auto object-contain sm:h-9", symbolClassName, wordmarkClassName)}
      />
      {showTagline && showWordmark && (
        <span className={cn("sr-only", isLight ? "text-white/70" : "text-muted-foreground")}>Imagens em menos tempo</span>
      )}
    </span>
  );
};
