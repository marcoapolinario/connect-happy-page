import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  wordmarkClassName?: string;
  symbolClassName?: string;
  variant?: "default" | "light";
  showWordmark?: boolean;
}

export const Logo = ({
  className,
  wordmarkClassName,
  symbolClassName,
  variant = "default",
  showWordmark = true,
}: LogoProps) => {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src="/favicon.png"
        alt=""
        aria-hidden
        className={cn("h-9 w-9 sm:h-10 sm:w-10 object-contain shrink-0", symbolClassName)}
      />
      {showWordmark && (
        <span
          className={cn(
            "font-bold tracking-tight text-xl sm:text-2xl leading-none",
            variant === "light" ? "text-white" : "text-foreground",
            wordmarkClassName,
          )}
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          Turbo<span className="text-primary">MR</span>
        </span>
      )}
    </span>
  );
};
