import { MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { withAttributionParams, getAttribution } from "@/lib/attribution";

interface WhatsAppFABProps {
  number: string;
  message?: string;
  label?: string;
  source?: string;
  onClick?: () => void;
}

/** Floating WhatsApp CTA. Appends UTMs to the wa.me URL text and fires analytics. */
export const WhatsAppFAB = ({
  number,
  message = "Olá! Vim do Google e quero saber mais sobre o TurboMR.",
  label = "Falar no WhatsApp",
  source = "fab",
  onClick,
}: WhatsAppFABProps) => {
  const attr = getAttribution();
  const utmSuffix =
    attr.utm_source || attr.utm_campaign
      ? ` [ref: ${[attr.utm_source, attr.utm_medium, attr.utm_campaign].filter(Boolean).join("/")}]`
      : "";
  const finalMessage = `${message}${utmSuffix}`;
  const baseHref = `https://wa.me/${number}?text=${encodeURIComponent(finalMessage)}`;
  const href = withAttributionParams(baseHref);

  const handleClick = () => {
    track("whatsapp_click", {
      source,
      number,
      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
      ...attr,
    });
    track("lead_conversion", { channel: "whatsapp", source });
    onClick?.();
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={label}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-success px-4 py-3 text-success-foreground font-bold shadow-glow-strong hover:scale-105 transition-transform"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline text-sm">{label}</span>
    </a>
  );
};
