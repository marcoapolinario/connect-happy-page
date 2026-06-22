import { MessageCircle } from "lucide-react";

interface WhatsAppFABProps {
  number: string;
  message?: string;
  label?: string;
  onClick?: () => void;
}

export const WhatsAppFAB = ({
  number,
  message = "Olá! Vim do Google e quero saber mais sobre o TurboMR.",
  label = "Falar no WhatsApp",
  onClick,
}: WhatsAppFABProps) => {
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label={label}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-success px-4 py-3 text-success-foreground font-bold shadow-glow-strong hover:scale-105 transition-transform"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline text-sm">{label}</span>
    </a>
  );
};
