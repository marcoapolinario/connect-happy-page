import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/Reveal";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/i18n";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/turbomr-logo-upload.png";
import {
  TrendingUp, DollarSign, HeartPulse, Clock, Sparkles,
  CheckCircle2, ArrowLeft, Loader2,
} from "lucide-react";

const benefitIcons = [TrendingUp, DollarSign, HeartPulse, Clock, Sparkles];

const Lp = () => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.title = `${t("lp.metaTitle")}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("lp.metaDescription"));
    window.scrollTo(0, 0);
  }, [t]);

  const schema = z.object({
    name: z.string().trim().min(1, t("lp.errors.required")).max(120),
    email: z.string().trim().email(t("lp.errors.email")).max(255),
    role: z.string().trim().min(1, t("lp.errors.required")).max(120),
    company: z.string().trim().min(1, t("lp.errors.required")).max(200),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const raw = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      role: String(formData.get("role") || ""),
      company: String(formData.get("company") || ""),
      message: String(formData.get("message") || ""),
    };

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((iss) => {
        if (iss.path[0]) fieldErrors[String(iss.path[0])] = iss.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const locale = (typeof navigator !== "undefined" && navigator.language) || null;
      const { error } = await supabase.from("leads").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        role: parsed.data.role,
        company: parsed.data.company,
        message: parsed.data.message || null,
        locale,
      });
      if (error) throw error;

      // Fire-and-forget: notificar contato@turbomr.com (será ativado quando o domínio estiver verificado)
      supabase.functions
        .invoke("notify-lead", {
          body: { ...parsed.data, locale },
        })
        .catch(() => {
          // silencioso — o lead já foi salvo
        });

      setDone(true);
      toast({
        title: t("lp.toastSuccessTitle"),
        description: t("lp.toastSuccessDesc"),
      });
    } catch (err) {
      console.error("[lp] submit error", err);
      toast({
        title: t("lp.toastErrorTitle"),
        description: t("lp.toastErrorDesc"),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const benefits = (t("lp.benefits") as Array<{ title: string; desc: string }>) || [];
  const bullets = (t("lp.bullets") as string[]) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER simplificado */}
      <header className="border-b border-border bg-background">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center group" aria-label="TurboMR">
            <img src={logo} alt="TurboMR" className="h-20 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                {t("lp.back")}
              </Link>
            </Button>
            <LanguageSwitcher />
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative py-16 lg:py-20 overflow-hidden gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full mb-4">
                  {t("lp.kicker")}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                  {t("lp.h1")}
                </h1>
                <p className="text-lg text-muted-foreground mb-7 leading-relaxed">
                  {t("lp.subheadline")}
                </p>

                <ul className="space-y-3 mb-8">
                  {bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm sm:text-base">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* FORM */}
            <Reveal delay={150}>
              <Card id="form" className="p-6 sm:p-8 border-border/50 shadow-card">
                {!done ? (
                  <>
                    <h2 className="text-2xl font-bold mb-1">{t("lp.formTitle")}</h2>
                    <p className="text-sm text-muted-foreground mb-6">{t("lp.formSub")}</p>
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      <div>
                        <Label htmlFor="name">{t("lp.fields.name")}</Label>
                        <Input id="name" name="name" maxLength={120} required aria-invalid={!!errors.name} />
                        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <Label htmlFor="email">{t("lp.fields.email")}</Label>
                        <Input id="email" name="email" type="email" maxLength={255} required aria-invalid={!!errors.email} />
                        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="role">{t("lp.fields.role")}</Label>
                          <Input id="role" name="role" maxLength={120} required aria-invalid={!!errors.role} />
                          {errors.role && <p className="text-xs text-destructive mt-1">{errors.role}</p>}
                        </div>
                        <div>
                          <Label htmlFor="company">{t("lp.fields.company")}</Label>
                          <Input id="company" name="company" maxLength={200} required aria-invalid={!!errors.company} />
                          {errors.company && <p className="text-xs text-destructive mt-1">{errors.company}</p>}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="message">{t("lp.fields.message")}</Label>
                        <Textarea id="message" name="message" maxLength={2000} rows={4} />
                      </div>
                      <Button type="submit" disabled={submitting} className="w-full gradient-primary text-white border-0 shadow-glow hover:opacity-90">
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {t("lp.submitting")}
                          </>
                        ) : (
                          t("lp.submit")
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        {t("lp.privacy")}
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-9 h-9 text-success" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{t("lp.thanksTitle")}</h2>
                    <p className="text-muted-foreground">{t("lp.thanksDesc")}</p>
                  </div>
                )}
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full mb-3">
                {t("lp.benefitsKicker")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t("lp.benefitsTitle")}</h2>
              <p className="text-muted-foreground">{t("lp.benefitsSub")}</p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const Icon = benefitIcons[i % benefitIcons.length];
              return (
                <Reveal key={b.title} delay={i * 80}>
                  <Card className="p-6 border-border/50 hover-lift h-full">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Card className="p-8 sm:p-12 text-center gradient-hero border-border/50">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("lp.finalTitle")}</h2>
              <p className="text-lg text-muted-foreground mb-7 max-w-2xl mx-auto">{t("lp.finalSub")}</p>
              <Button asChild size="lg" className="gradient-primary text-white border-0 shadow-glow hover:opacity-90">
                <a href="#form">{t("lp.finalCta")}</a>
              </Button>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* FOOTER mínimo */}
      <footer className="border-t border-border py-6 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TurboMR
        </div>
      </footer>
    </div>
  );
};

export default Lp;
