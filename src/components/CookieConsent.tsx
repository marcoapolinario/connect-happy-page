import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "cookie-consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const handleChoice = (choice: "accepted" | "declined") => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentimento de Cookies"
      className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Cookie className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold leading-tight text-foreground">
          Consentimento de Cookies
        </h3>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Este site utiliza cookies para ajudá-lo a ter uma experiência de
        navegação superior e mais relevante no site.
      </p>

      <button
        type="button"
        onClick={() => handleChoice("accepted")}
        className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Read more...
      </button>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button onClick={() => handleChoice("accepted")} className="w-full">
          Accept
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleChoice("declined")}
          className="w-full"
        >
          Decline
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
