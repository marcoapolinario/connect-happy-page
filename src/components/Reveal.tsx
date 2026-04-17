import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
}

export const Reveal = ({ children, className, delay = 0, ...rest }: RevealProps) => {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </div>
  );
};
