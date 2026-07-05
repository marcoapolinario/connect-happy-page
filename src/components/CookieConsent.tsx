import { useEffect, useState } from "react";
import { Cookie, Shield, BarChart3, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ConsentState,
  DEFAULT_CONSENT,
  acceptAll,
  applyConsent,
  getStoredConsent,
  rejectAll,
  saveConsent,
} from "@/lib/consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [prefs, setPrefs] = useState<ConsentState>(DEFAULT_CONSENT);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      // Re-apply on every load so GTM/Ads know the state after script boot.
      applyConsent(stored);
      return;
    }
    const t = window.setTimeout(() => setVisible(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  const handleAcceptAll = () => {
    acceptAll();
    setVisible(false);
  };
  const handleRejectAll = () => {
    rejectAll();
    setVisible(false);
  };
  const handleSavePrefs = () => {
    saveConsent(prefs);
    setPrefsOpen(false);
    setVisible(false);
  };

  if (!visible && !prefsOpen) return null;

  return (
    <>
      {visible && (
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
            <h3 className="text-lg font-semibold leading-tight text-foreground">
              Sua privacidade importa
            </h3>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Usamos cookies para melhorar sua experiência, medir o desempenho do site e personalizar
            campanhas. Você pode aceitar todos, recusar ou escolher categorias.
          </p>

          <button
            type="button"
            onClick={() => {
              setPrefs(getStoredConsent() ?? DEFAULT_CONSENT);
              setPrefsOpen(true);
            }}
            className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Preferências
          </button>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button onClick={handleAcceptAll} className="w-full">
              Aceitar todos
            </Button>
            <Button variant="secondary" onClick={handleRejectAll} className="w-full">
              Recusar
            </Button>
          </div>
        </div>
      )}

      <Dialog open={prefsOpen} onOpenChange={setPrefsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Preferências de cookies</DialogTitle>
            <DialogDescription>
              Escolha quais categorias você autoriza. Cookies necessários são obrigatórios para o
              funcionamento do site.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <PrefRow
              icon={<Shield className="h-4 w-4" />}
              title="Necessários"
              description="Essenciais para o funcionamento. Sempre ativos."
              checked
              disabled
            />
            <PrefRow
              icon={<BarChart3 className="h-4 w-4" />}
              title="Analíticos"
              description="Ajudam a entender como o site é usado (Google Analytics, Clarity)."
              checked={prefs.analytics}
              onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
            />
            <PrefRow
              icon={<Megaphone className="h-4 w-4" />}
              title="Marketing"
              description="Permitem mensuração de campanhas de mídia paga (Google Ads, Meta, LinkedIn)."
              checked={prefs.marketing}
              onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="secondary" onClick={handleRejectAll} className="w-full sm:w-auto">
              Recusar tudo
            </Button>
            <Button onClick={handleSavePrefs} className="w-full sm:w-auto">
              Salvar preferências
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface PrefRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}

const PrefRow = ({ icon, title, description, checked, disabled, onChange }: PrefRowProps) => (
  <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-3">
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
    <Switch checked={checked} disabled={disabled} onCheckedChange={onChange} />
  </div>
);

export default CookieConsent;
