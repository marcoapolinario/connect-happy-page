import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { BeforeAfter } from "@/components/BeforeAfter";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/turbomr-logo-upload.png";
import mriBefore from "@/assets/mri-before.jpg";
import mriAfter from "@/assets/mri-after.jpg";
import {
  TrendingUp, DollarSign, Clock, Sparkles, CheckCircle2,
  Loader2, MessageCircle, Calendar, AlertTriangle, Banknote, Hourglass,
  ShieldCheck, Stethoscope, Zap,
} from "lucide-react";

// ============ CONFIG — ajuste se necessário ============
const WHATSAPP_NUMBER = "551153043453";
const WHATSAPP_DISPLAY = "(11) 5304-3453";
const WA_MSG_HERO = "Olá! Vim do Google e quero dobrar a capacidade da minha Ressonância com TurboMR.";
const WA_MSG_FORM = "Olá! Acabei de preencher o formulário no site da TurboMR.";
// Google Ads conversion — substituir AW-XXXXX/LABEL pelos IDs reais
const GADS_CONVERSION_ID = ""; // ex.: "AW-1234567890/AbC-D_efGhIj"
// =======================================================

const fireConversion = (label: string) => {
  // @ts-ignore
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    // @ts-ignore
    window.gtag("event", "generate_lead", {
      event_category: "lp_ads",
      event_label: label,
      ...(GADS_CONVERSION_ID ? { send_to: GADS_CONVERSION_ID } : {}),
    });
  }
};

const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(120),
  company: z.string().trim().min(2, "Informe a clínica").max(200),
  whatsapp: z.string().trim().min(8, "WhatsApp inválido").max(40),
  email: z.string().trim().email("E-mail inválido").max(255),
  equipmentCount: z.string().trim().max(20).optional().or(z.literal("")),
});

const LpAds = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.title = "TurboMR — Dobre a capacidade da sua Ressonância | IA Médica";
    const desc = "Aumente em até 2x os exames/dia da sua RM sem trocar o equipamento. IA que reduz 50% do tempo de aquisição. Fale agora no WhatsApp.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
    // canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = "https://connect-happy-page.lovable.app/lp-ads";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      whatsapp: String(fd.get("whatsapp") || ""),
      email: String(fd.get("email") || ""),
      equipmentCount: String(fd.get("equipmentCount") || ""),
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) fe[String(i.path[0])] = i.message;
      });
      setErrors(fe);
      return;
    }
    setSubmitting(true);
    try {
      const locale = (typeof navigator !== "undefined" && navigator.language) || null;
      const { error } = await supabase.from("leads").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        role: "Gestor / Decisor",
        company: parsed.data.company,
        message: `WhatsApp: ${parsed.data.whatsapp}\nEquipamentos de RM: ${parsed.data.equipmentCount || "não informado"}\nOrigem: Google Ads (/lp-ads)`,
        locale,
      });
      if (error) throw error;

      supabase.functions
        .invoke("notify-lead", {
          body: { ...parsed.data, source: "google-ads", locale },
        })
        .catch(() => {});

      fireConversion("form_submit");
      setDone(true);
      toast({
        title: "Recebido!",
        description: "Em instantes nosso especialista entrará em contato.",
      });
      // Redireciona para WhatsApp em sequência
      setTimeout(() => {
        window.open(waLink(`${WA_MSG_FORM} Meu nome é ${parsed.data.name}, da ${parsed.data.company}.`), "_blank");
      }, 800);
    } catch (err) {
      console.error("[lp-ads] submit error", err);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou fale direto no WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const pains = [
    { icon: Hourglass, title: "Agenda lotada, fila de 30+ dias", desc: "Pacientes desistem e migram para o concorrente." },
    { icon: Banknote, title: "Margem comprimida por convênios", desc: "Custo por exame sobe e o reajuste não vem." },
    { icon: AlertTriangle, title: "CAPEX de equipamento novo: R$ 3-8 mi", desc: "Trocar a máquina não é uma opção realista a curto prazo." },
  ];

  const benefits = [
    { icon: Zap, title: "−50% no tempo de aquisição", desc: "IA reduz drasticamente o tempo de cada exame mantendo qualidade diagnóstica." },
    { icon: TrendingUp, title: "Até 2x mais exames/dia", desc: "Mesmo equipamento, mesma sala, mesma equipe — muito mais throughput." },
    { icon: DollarSign, title: "ROI em menos de 6 meses", desc: "Modelo por exame: você só paga quando fatura mais." },
    { icon: ShieldCheck, title: "Compatível com GE, Siemens, Philips, Canon", desc: "Integra ao fluxo PACS/DICOM sem trocar nada do seu parque." },
    { icon: Stethoscope, title: "Mais conforto para o paciente", desc: "Menos tempo no tubo = menos movimento = menos repetição." },
    { icon: Clock, title: "Implantação em poucas semanas", desc: "Sem obra, sem parar a operação, sem dor de cabeça." },
  ];

  const faq = [
    { q: "É aprovado pelos órgãos reguladores?", a: "Sim. Nossa tecnologia segue os padrões regulatórios para software como dispositivo médico (SaMD) e mantém a qualidade diagnóstica validada por radiologistas." },
    { q: "Funciona no meu equipamento atual?", a: "Sim. Somos compatíveis com os principais fabricantes (GE, Siemens, Philips, Canon) em 1.5T e 3T. A integração é via PACS/DICOM, sem alterar nada no console do scanner." },
    { q: "Quanto custa?", a: "Trabalhamos com modelo por exame — sem CAPEX, sem mensalidade fixa alta. Você só paga quando aumenta sua capacidade. Fale com nosso time para uma simulação personalizada." },
    { q: "Quanto tempo demora a implantação?", a: "Tipicamente entre 2 e 4 semanas, sem obra e sem precisar parar a operação da clínica." },
    { q: "E a qualidade da imagem? Não cai?", a: "Pelo contrário — a IA reduz ruído e melhora a nitidez. Você pode validar com um teste piloto no seu próprio equipamento antes de fechar contrato." },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER mínimo — sem menu pra reduzir fuga */}
      <header className="border-b border-border bg-background/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <img src={logo} alt="TurboMR" className="h-10 sm:h-12 w-auto object-contain" />
          <Button asChild size="sm" variant="ghost" className="text-success hover:text-success">
            <a href={waLink(WA_MSG_HERO)} target="_blank" rel="noopener noreferrer" onClick={() => fireConversion("header_wa")}>
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{WHATSAPP_DISPLAY}</span>
            </a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative py-12 lg:py-20 overflow-hidden gradient-hero">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal>
            <div>
              <div className="status-pill mb-5">
                <span className="live-dot" /> <span>IA para Ressonância Magnética</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-5">
                Dobre a capacidade da sua{" "}
                <span className="gradient-text">Ressonância</span> sem trocar o equipamento
              </h1>
              <p className="text-lg text-muted-foreground mb-7 max-w-xl leading-relaxed">
                IA que reduz o tempo de aquisição em até <strong className="text-foreground">50%</strong> mantendo a qualidade diagnóstica.
                Mais exames/dia, mesma sala, <strong className="text-foreground">mais lucro</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button asChild size="lg" className="bg-success text-success-foreground hover:bg-success/90 font-bold shadow-glow">
                  <a href={waLink(WA_MSG_HERO)} target="_blank" rel="noopener noreferrer" onClick={() => fireConversion("hero_wa")}>
                    <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/40 hover:bg-primary/10">
                  <a href="#form"><Calendar className="w-5 h-5" /> Agendar demonstração</a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Compatível com <strong>GE · Siemens · Philips · Canon</strong> — 1.5T e 3T
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative">
              <div className="absolute -inset-6 bg-primary/15 blur-[80px] rounded-full pointer-events-none" />
              <BeforeAfter
                beforeSrc={mriBefore}
                afterSrc={mriAfter}
                beforeLabel="Padrão"
                afterLabel="TurboMR"
                alt="Comparativo MRI padrão vs TurboMR"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* DORES */}
      <section className="py-14 lg:py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">Sua RM é o ativo mais caro — e o maior gargalo</h2>
              <p className="text-muted-foreground">Toda hora ociosa é receita que evapora.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {pains.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <Card className="p-6 h-full border-border/50 hover-lift">
                  <div className="w-11 h-11 rounded-xl bg-destructive/15 flex items-center justify-center mb-4">
                    <p.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROPOSTA DE VALOR EM R$ */}
      <section className="py-14 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <Card className="p-8 sm:p-12 gradient-hero border-primary/30 text-center">
              <span className="status-pill mb-4"><Sparkles className="w-3 h-3" /> O número que importa</span>
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                +<span className="gradient-text">R$ 59.400</span> / mês
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Cálculo conservador para uma clínica média:<br />
                <strong className="text-foreground">+6 exames/dia × R$ 450 × 22 dias úteis</strong>
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold gradient-text">−50%</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Tempo de exame</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold gradient-text">2x</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Throughput</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold gradient-text">&lt; 6m</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">ROI</div>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-14 lg:py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">O que muda na sua operação</h2>
              <p className="text-muted-foreground">Tecnologia que entrega resultado no caixa, não só no laudo.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 60}>
                <Card className="p-6 h-full border-border/50 hover-lift">
                  <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <b.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <Card className="p-8 sm:p-10 border-border/50">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">A TurboMR é pra você se…</h2>
              <ul className="space-y-3 max-w-xl mx-auto">
                {[
                  "Sua clínica opera 1 ou mais equipamentos de RM (1.5T ou 3T)",
                  "Você faz mais de 300 exames de RM por mês",
                  "Quer aumentar receita sem investir em equipamento novo",
                  "Tem fila de espera maior do que gostaria",
                  "Busca diferencial competitivo na sua região",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Perguntas frequentes</h2>
          </Reveal>
          <Reveal delay={100}>
            <Accordion type="single" collapsible className="space-y-3">
              {faq.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-border/50 rounded-xl px-4 bg-card">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* FORM FINAL */}
      <section id="form" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Reveal>
            <Card className="p-6 sm:p-10 border-primary/30 shadow-elegant">
              {!done ? (
                <>
                  <div className="text-center mb-7">
                    <span className="status-pill mb-4"><span className="live-dot" /> Resposta em até 1 dia útil</span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-2">Quero falar com um especialista</h2>
                    <p className="text-muted-foreground">Preencha e nosso time entra em contato pelo WhatsApp em instantes.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nome completo *</Label>
                        <Input id="name" name="name" maxLength={120} required aria-invalid={!!errors.name} className="h-11 rounded-xl" />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Clínica / Hospital *</Label>
                        <Input id="company" name="company" maxLength={200} required aria-invalid={!!errors.company} className="h-11 rounded-xl" />
                        {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">WhatsApp *</Label>
                        <Input id="whatsapp" name="whatsapp" type="tel" maxLength={40} required aria-invalid={!!errors.whatsapp} placeholder="(11) 99999-9999" className="h-11 rounded-xl" />
                        {errors.whatsapp && <p className="text-xs text-destructive">{errors.whatsapp}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">E-mail *</Label>
                        <Input id="email" name="email" type="email" maxLength={255} required aria-invalid={!!errors.email} className="h-11 rounded-xl" />
                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="equipmentCount" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quantos equipamentos de RM?</Label>
                      <Input id="equipmentCount" name="equipmentCount" maxLength={20} placeholder="Ex.: 2" className="h-11 rounded-xl" />
                    </div>
                    <Button type="submit" disabled={submitting} className="w-full h-12 bg-success text-success-foreground hover:bg-success/90 font-bold rounded-xl shadow-glow">
                      {submitting ? (<><Loader2 className="w-4 h-4 animate-spin" /> Enviando…</>) : (<>Quero aumentar minha capacidade <MessageCircle className="w-4 h-4" /></>)}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Seus dados ficam só com a TurboMR. Sem spam.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9 text-success" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Perfeito! Recebemos seus dados.</h2>
                  <p className="text-muted-foreground mb-6">Estamos abrindo seu WhatsApp para já adiantar a conversa.</p>
                  <Button asChild size="lg" className="bg-success text-success-foreground hover:bg-success/90">
                    <a href={waLink(WA_MSG_FORM)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5" /> Abrir WhatsApp
                    </a>
                  </Button>
                </div>
              )}
            </Card>
          </Reveal>
        </div>
      </section>

      {/* FOOTER mínimo */}
      <footer className="border-t border-border py-6 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TurboMR · WhatsApp {WHATSAPP_DISPLAY}
        </div>
      </footer>

      <WhatsAppFAB
        number={WHATSAPP_NUMBER}
        message={WA_MSG_HERO}
        onClick={() => fireConversion("fab_wa")}
      />
    </div>
  );
};

export default LpAds;
