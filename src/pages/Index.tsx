import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ResultsShowcase } from "@/components/ResultsShowcase";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { NeuralWave } from "@/components/NeuralWave";
import { useI18n } from "@/i18n";
import mriBefore from "@/assets/mri-before.jpg";
import mriAfter from "@/assets/mri-after.jpg";
import featureNoiseBefore from "@/assets/results/cervical-s2-original.jpg";
import featureNoiseAfter from "@/assets/results/cervical-s2-turbo.jpg";
import featureResBefore from "@/assets/results/joelho-s1-original.jpg";
import featureResAfter from "@/assets/results/joelho-s1-turbo-v2.jpg";
import featureDiagBefore from "@/assets/results/lombar-s1-original.jpg";
import featureDiagAfter from "@/assets/results/lombar-s1-turbo.jpg";
import step1Img from "@/assets/howitworks/step1.jpg";
import step2Img from "@/assets/howitworks/step2.jpg";
import step3Img from "@/assets/howitworks/step3.jpg";
import {
  Zap, Shield, TrendingUp, CheckCircle2, Activity, Cpu, Server,
  Sparkles, Clock, Stethoscope, MessageCircle, ArrowRight, BarChart3,
  Menu, X, ShieldCheck, FileCheck, Lock, ExternalLink,
  Mail, Phone, Linkedin, Instagram, Youtube, Building2, HeartPulse, UserRound, Briefcase,
} from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "551153043453";
const WHATSAPP_DISPLAY = "(11) 5304-3453";
const APP_URL = "https://app.turbomr.com";
const COMERCIAL_URL = "https://comercial.turbomr.com";
const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const statIcons = [Zap, Sparkles, Server, TrendingUp];
const statValues = ["50%", "Ultra", "Zero", "+40%"];
const statLabelKeys = ["stats.faster", "stats.resolution", "stats.noEquipment", "stats.capacity"];

const pillarIcons = [Zap, Sparkles, TrendingUp];
const pipelineNumbers = ["01", "02", "03"];
const flowIcons = [Activity, ArrowRight, Cpu, Server, Stethoscope];

const cases = [
  { regionKey: "Crânio (Neuro)", standard: "21:30", turbo: "11:02", reduction: 59 },
  { regionKey: "Cervical", standard: "11:22", turbo: "05:18", reduction: 53 },
  { regionKey: "Lombar", standard: "10:19", turbo: "04:59", reduction: 52 },
  { regionKey: "Joelho", standard: "09:56", turbo: "05:47", reduction: 42 },
  { regionKey: "Tornozelo", standard: "19:20", turbo: "09:58", reduction: 48 },
  { regionKey: "Quadril", standard: "14:47", turbo: "08:54", reduction: 40 },
  { regionKey: "Ombro", standard: "10:21", turbo: "06:44", reduction: 35 },
  { regionKey: "Punho", standard: "20:11", turbo: "08:36", reduction: 57 },
];

const navLinks = [
  { href: "#solucao", key: "nav.solucao" },
  { href: "#tecnologia", key: "nav.comoFunciona" },
  { href: "#beneficios", key: "nav.beneficios" },
  { href: "#casos", key: "nav.resultados" },
  { href: "#contato", key: "nav.contato" },
];

const audienceBenefits = [
  {
    icon: Building2,
    tagKey: "benefits.cards.0.tag",
    titleKey: "benefits.cards.0.title",
    pointsKey: "benefits.cards.0.points",
  },
  {
    icon: HeartPulse,
    tagKey: "benefits.cards.1.tag",
    titleKey: "benefits.cards.1.title",
    pointsKey: "benefits.cards.1.points",
  },
  {
    icon: UserRound,
    tagKey: "benefits.cards.2.tag",
    titleKey: "benefits.cards.2.title",
    pointsKey: "benefits.cards.2.points",
  },
];


const Index = () => {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const compareImages = [
    { before: featureNoiseBefore, after: featureNoiseAfter },
    { before: featureResBefore, after: featureResAfter },
    { before: featureDiagBefore, after: featureDiagAfter },
  ];

  const complianceIcons = [ShieldCheck, FileCheck, Lock, Shield];
  const flowBoxIcons = [Shield, CheckCircle2, Activity];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/60">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center group shrink-0" aria-label="TurboMR">
            <Logo className="transition-transform group-hover:scale-[1.02]" />
          </a>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="relative hover:text-foreground transition-colors after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">
                {t(l.key)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button asChild size="sm" variant="ghost" className="hidden md:inline-flex font-medium">
              <a href={waLink(t("wa.header"))} target="_blank" rel="noopener">
                <MessageCircle className="w-4 h-4" />
                {t("common.whatsapp")}
              </a>
            </Button>
            <Button asChild size="sm" className="gradient-primary text-white shadow-glow hover:opacity-90 border-0 font-semibold">
              <a href={APP_URL} target="_blank" rel="noopener">
                {t("nav.acesso")}
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={t("nav.menu")}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl animate-fade-in">
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                >
                  {t(l.key)}
                </a>
              ))}
              <Button asChild size="sm" className="mt-2 gradient-primary text-white border-0">
                <a href={waLink(t("wa.header"))} target="_blank" rel="noopener">
                  <MessageCircle className="w-4 h-4" />
                  {t("common.whatsapp")} {WHATSAPP_DISPLAY}
                </a>
              </Button>
            </div>
          </div>
        )}
      </header>


      {/* HERO */}
      <section className="relative pt-16 pb-16 lg:pt-24 lg:pb-28 overflow-hidden gradient-hero">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/4 -right-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-primary-glow/20 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -left-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="text-white opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="status-pill mb-6">
                <span className="live-dot" />
                <span>{t("hero.badge")}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] mb-6">
                {t("hero.titleStart")} <span className="gradient-text">{t("hero.titleHighlight")}</span> {t("hero.titleEnd")}
              </h1>
              <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl hover-glow transition-all">
                  <a href={waLink(t("wa.demo"))} target="_blank" rel="noopener">
                    <MessageCircle className="w-5 h-5" />
                    {t("hero.ctaDemo")}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/5 border-white/15 text-white hover:bg-white/10 hover:text-white hover:border-white/25 rounded-xl backdrop-blur-sm">
                  <a href={waLink(t("wa.trial"))} target="_blank" rel="noopener">
                    {t("hero.ctaTrial")}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {statIcons.map((Icon, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-3 sm:p-4 opacity-0 animate-scale-in hover-lift"
                    style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                  >
                    <Icon className="w-5 h-5 text-accent mb-2" />
                    <div className="text-xl sm:text-2xl font-bold">{statValues[i]}</div>
                    <div className="text-[11px] sm:text-xs text-white/60">{t(statLabelKeys[i])}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative opacity-0 animate-fade-in-right lg:justify-self-end w-full max-w-[560px] mx-auto" style={{ animationDelay: "0.3s" }}>
              <div className="absolute -inset-6 gradient-primary rounded-[2rem] blur-3xl opacity-30 animate-pulse-glow" />
              <div className="relative rounded-2xl overflow-hidden shadow-elegant border border-white/10">
                <BeforeAfter
                  beforeSrc={mriBefore}
                  afterSrc={mriAfter}
                  alt={t("hero.imageAlt")}
                  imageFit="contain"
                  priority
                />
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-white/70">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>{t("hero.imageCaption")}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section id="solucao" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-2xl mb-14 sm:mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t("pillars.kicker")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t("pillars.title")}</h2>
            <p className="text-base sm:text-lg text-muted-foreground">{t("pillars.subtitle")}</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {(t("pillars.items") as any[]).map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <Reveal key={i} delay={i * 120}>
                  <Card className="p-7 sm:p-8 shadow-card hover-lift border-border/50 group h-full">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-glow">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{p.tag}</p>
                    <h3 className="text-xl font-bold mb-4">{p.title}</h3>
                    <ul className="space-y-3">
                      {p.points.map((pt: string) => (
                        <li key={pt} className="flex gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="tecnologia" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-float" />
        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 sm:mb-16">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-glow/10 border border-primary-glow/30 mb-4">
                  <Cpu className="w-3.5 h-3.5 text-primary-glow" />
                  <span className="text-xs font-semibold text-primary-glow uppercase tracking-wider">{t("tech.kicker")}</span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
                  Como <span className="gradient-text">funciona</span>
                </h2>
              </div>
              <p className="text-base sm:text-lg text-white/70 max-w-md leading-relaxed">
                {t("tech.subtitle")}
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-6 items-stretch">
            {(t("tech.pipeline") as any[]).map((step, i) => {
              const imgs = [step1Img, step2Img, step3Img];
              const CardIcon = [Cpu, Sparkles, CheckCircle2][i];
              return (
                <Reveal key={i} delay={i * 150}>
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="w-12 h-12 rounded-full border-2 border-primary-glow flex items-center justify-center mb-4 bg-secondary shadow-glow">
                      <span className="text-lg font-bold text-primary-glow">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed mb-5 max-w-[260px]">{step.desc}</p>

                    <div className="relative w-full rounded-2xl mb-4 aspect-square overflow-hidden">
                      {i === 1 ? (
                        <NeuralWave className="absolute inset-0" />
                      ) : (
                        <img
                          src={imgs[i]}
                          alt={step.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </div>

                    <div className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex items-start gap-3 text-left mt-auto">
                      <div className="w-10 h-10 rounded-full border border-primary-glow/50 bg-primary-glow/10 flex items-center justify-center shrink-0">
                        <CardIcon className="w-4 h-4 text-primary-glow" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-primary-glow uppercase tracking-wider mb-1">{step.imgTag || step.cardTag}</div>
                        <p className="text-xs text-white/70 leading-relaxed">{step.cardDesc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-12 flex justify-center">
              <div className="inline-flex items-center gap-4 rounded-full border border-primary-glow/40 bg-white/5 backdrop-blur-sm px-6 py-3">
                <div className="w-10 h-10 rounded-full border border-primary-glow/60 bg-primary-glow/10 flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4 text-primary-glow" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm">{t("tech.footer.title")}</div>
                  <div className="text-xs text-white/60">{t("tech.footer.desc")}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMPLIANCE & CERTIFICATIONS */}
      <section id="conformidade" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-2xl mb-12 sm:mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t("compliance.kicker")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t("compliance.title")}</h2>
            <p className="text-base sm:text-lg text-muted-foreground">{t("compliance.subtitle")}</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            <Reveal>
              <Card className="p-6 h-full border-border/50 shadow-card hover-lift">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{t("compliance.cards.hipaaTag")}</div>
                <h3 className="font-bold text-base mb-2">{t("compliance.cards.hipaaTitle")}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t("compliance.cards.hipaaDesc")}</p>
              </Card>
            </Reveal>

            <Reveal delay={120}>
              <Card className="p-6 h-full border-border/50 shadow-card hover-lift">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <FileCheck className="w-6 h-6 text-primary" />
                </div>
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{t("compliance.cards.anvisaTag")}</div>
                <h3 className="font-bold text-base mb-2 tabular-nums">2535141860220244</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{t("compliance.cards.anvisaDesc")}</p>
                <a
                  href="https://consultas.anvisa.gov.br/#/saude/25351418602202446/?cnpj=23978673000116"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  {t("compliance.cards.anvisaCta")} <ExternalLink className="w-3 h-3" />
                </a>
              </Card>
            </Reveal>

            <Reveal delay={240}>
              <Card className="p-6 h-full border-border/50 shadow-card hover-lift">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{t("compliance.cards.lgpdTag")}</div>
                <h3 className="font-bold text-base mb-2">{t("compliance.cards.lgpdTitle")}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t("compliance.cards.lgpdDesc")}</p>
              </Card>
            </Reveal>

            <Reveal delay={360}>
              <Card className="p-6 h-full border-border/50 shadow-card hover-lift">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{t("compliance.cards.digitalTag")}</div>
                <h3 className="font-bold text-base mb-2">{t("compliance.cards.digitalTitle")}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t("compliance.cards.digitalDesc")}</p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-2xl mb-14 sm:mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t("flow.kicker")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t("flow.title")}</h2>
            <p className="text-base sm:text-lg text-muted-foreground">{t("flow.subtitle")}</p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
            {(t("flow.steps") as any[]).map((step, i) => {
              const Icon = flowIcons[i];
              return (
                <Reveal key={i} delay={i * 100}>
                  <Card className="p-4 sm:p-5 h-full shadow-card hover-lift border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-primary mb-1">{t("flow.stage")} {i + 1}</div>
                    <h3 className="font-bold text-sm mb-2">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {(t("flow.boxes") as any[]).map((b, i) => {
              const Icon = flowBoxIcons[i];
              return (
                <Reveal key={i} delay={i * 120}>
                  <div className="flex gap-4 p-5 rounded-xl bg-muted/40 hover-lift h-full">
                    <Icon className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm mb-1">{b.t}</h4>
                      <p className="text-sm text-muted-foreground">{b.d}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER COMPARISON */}
      <section id="comparativo" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="relative max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t("compare.kicker")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t("compare.titleStart")} <span className="gradient-text">{t("compare.titleHighlight")}</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">{t("compare.subtitle")}</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {(t("compare.items") as any[]).map((f, i) => {
              const Icons = [Sparkles, Zap, CheckCircle2];
              const Icon = Icons[i];
              const imgs = compareImages[i];
              return (
                <Reveal key={i} delay={i * 120}>
                  <Card className="p-6 shadow-card hover-lift border-border/50 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0 shadow-glow">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold">{f.title}</h3>
                    </div>
                    <BeforeAfter
                      beforeSrc={imgs.before}
                      afterSrc={imgs.after}
                      beforeLabel={t("compare.beforeLabel")}
                      afterLabel={t("compare.afterLabel")}
                      alt={f.alt}
                      className="mb-4"
                    />
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground italic text-center mt-8">
            {t("compare.footnote")}
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="beneficios" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t("benefits.kicker")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t("benefits.title")}</h2>
            <p className="text-base sm:text-lg text-muted-foreground">{t("benefits.subtitle")}</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {audienceBenefits.map((b, i) => {
              const Icon = b.icon;
              const points = t(b.pointsKey) as string[];
              return (
                <Reveal key={i} delay={i * 120}>
                  <Card className="glass-card p-7 sm:p-8 h-full hover-lift group">
                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{t(b.tagKey)}</p>
                    <h3 className="text-xl font-bold mb-5">{t(b.titleKey)}</h3>
                    <ul className="space-y-3">
                      {points.map((p) => (
                        <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESULTS / CASES */}
      <section id="casos" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-end mb-14 sm:mb-16">
            <Reveal>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t("results.kicker")}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t("results.title")}</h2>
              <p className="text-base sm:text-lg text-muted-foreground">{t("results.subtitle")}</p>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              <Reveal delay={100}>
                <Card className="p-6 gradient-primary text-white shadow-glow border-0 hover-lift h-full">
                  <BarChart3 className="w-6 h-6 mb-3 opacity-80" />
                  <div className="text-3xl sm:text-4xl font-bold mb-1">{t("results.metric1Value")}</div>
                  <div className="text-xs sm:text-sm text-white/80">{t("results.metric1Label")}</div>
                </Card>
              </Reveal>
              <Reveal delay={200}>
                <Card className="p-6 bg-secondary text-white border-0 hover-lift h-full">
                  <Sparkles className="w-6 h-6 mb-3 opacity-80" />
                  <div className="text-3xl sm:text-4xl font-bold mb-1">{t("results.metric2Value")}</div>
                  <div className="text-xs sm:text-sm text-white/70">{t("results.metric2Label")}</div>
                </Card>
              </Reveal>
            </div>
          </div>

          <Reveal>
            <Card className="overflow-hidden border-border/50 shadow-elegant">
              {/* Header — somente em sm+ */}
              <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-secondary text-white text-xs font-semibold uppercase tracking-wider">
                <div className="col-span-4">{t("results.table.region")}</div>
                <div className="col-span-2 text-right">{t("results.table.standard")}</div>
                <div className="col-span-2 text-right">{t("results.table.turbo")}</div>
                <div className="col-span-4 text-right">{t("results.table.reduction")}</div>
              </div>
              {cases.map((c, i) => (
                <div
                  key={c.regionKey}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {/* Mobile: card empilhado */}
                  <div className="sm:hidden p-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-sm">{t(`results.regions.${c.regionKey}`)}</span>
                      <span className="font-bold text-success text-sm tabular-nums">-{c.reduction}%</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div>
                        <div className="text-muted-foreground uppercase tracking-wider text-[10px] mb-0.5">{t("results.table.standard")}</div>
                        <div className="tabular-nums font-medium">{c.standard}</div>
                      </div>
                      <div>
                        <div className="text-primary uppercase tracking-wider text-[10px] mb-0.5">{t("results.table.turbo")}</div>
                        <div className="tabular-nums font-bold text-primary">{c.turbo}</div>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full gradient-primary rounded-full transition-all duration-1000" style={{ width: `${c.reduction}%` }} />
                    </div>
                  </div>

                  {/* Desktop: grade 12 colunas */}
                  <div className="hidden sm:grid grid-cols-12 gap-4 p-4 items-center text-sm">
                    <div className="col-span-4 font-semibold">{t(`results.regions.${c.regionKey}`)}</div>
                    <div className="col-span-2 text-right text-muted-foreground tabular-nums">{c.standard}</div>
                    <div className="col-span-2 text-right font-bold text-primary tabular-nums">{c.turbo}</div>
                    <div className="col-span-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full gradient-primary rounded-full transition-all duration-1000" style={{ width: `${c.reduction}%` }} />
                        </div>
                        <span className="font-bold text-success tabular-nums w-12 text-right">-{c.reduction}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </Reveal>

          <Reveal>
            <p className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
              {t("results.footnote1")} <span className="font-semibold text-foreground">{t("results.footnoteHighlight")}</span>{t("results.footnote2")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROVEN RESULTS — IMAGE COMPARISONS */}
      <section id="resultados-imagens" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-5xl mx-auto">

          <Reveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t("showcase.kicker")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t("showcase.titleStart")} <span className="gradient-text">{t("showcase.titleHighlight")}</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">{t("showcase.subtitle")}</p>
          </Reveal>

          <Reveal>
            <ResultsShowcase />
          </Reveal>

          <Reveal>
            <p className="text-center text-xs text-muted-foreground mt-8 italic">
              {t("showcase.footnote")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section id="planos" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t("pricing.kicker")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t("pricing.title")}</h2>
            <p className="text-base sm:text-lg text-muted-foreground">{t("pricing.subtitle")}</p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={100}>
              <Card className="relative p-7 sm:p-8 border-2 border-primary shadow-glow hover-lift h-full">
                <div className="absolute -top-3 left-8 px-3 py-1 rounded-full gradient-primary text-white text-xs font-bold">{t("pricing.recommended")}</div>
                <h3 className="text-2xl font-bold mb-2">{t("pricing.annualTitle")}</h3>
                <p className="text-muted-foreground text-sm mb-6">{t("pricing.annualSub")}</p>
                <ul className="space-y-3 mb-8">
                  {(t("pricing.annualFeatures") as string[]).map((f) => (
                    <li key={f} className="flex gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />{f}</li>
                  ))}
                </ul>
                <Button asChild className="w-full gradient-primary text-white border-0 hover:opacity-90">
                  <a href={waLink(t("wa.annual"))} target="_blank" rel="noopener">{t("pricing.annualCta")}</a>
                </Button>
              </Card>
            </Reveal>

            <Reveal delay={200}>
              <Card className="p-7 sm:p-8 border-border/50 shadow-card hover-lift h-full">
                <h3 className="text-2xl font-bold mb-2">{t("pricing.ppuTitle")}</h3>
                <p className="text-muted-foreground text-sm mb-6">{t("pricing.ppuSub")}</p>
                <ul className="space-y-3 mb-8">
                  {(t("pricing.ppuFeatures") as string[]).map((f) => (
                    <li key={f} className="flex gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />{f}</li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <a href="/lp">{t("pricing.ppuCta")}</a>
                </Button>
              </Card>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="mt-8 p-6 rounded-2xl gradient-accent text-secondary text-center hover-lift">
              <p className="font-bold text-lg">{t("pricing.trialTitle")}</p>
              <p className="text-sm opacity-80 mt-1">{t("pricing.trialSub")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t("faq.kicker")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t("faq.title")}</h2>
          </Reveal>
          <Reveal>
            <Accordion type="single" collapsible className="space-y-3">
              {(t("faq.items") as any[]).map((f, i) => (
                <AccordionItem key={i} value={`i${i}`} className="bg-card border border-border rounded-xl px-6 hover:border-primary/40 transition-colors">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="contato" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-primary-glow/20 blur-3xl animate-pulse-glow" />
        <Reveal className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6">{t("cta.title")}</h2>
          <p className="text-base sm:text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90 font-semibold animate-pulse-glow">
              <a href={waLink(t("wa.proposal"))} target="_blank" rel="noopener">
                <MessageCircle className="w-5 h-5" />
                {t("cta.btn")}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">
              <a href={APP_URL} target="_blank" rel="noopener">
                {t("cta.btnApp")}
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/60">{t("cta.note")}</p>
        </Reveal>
      </section>


      {/* FOOTER */}
      <footer className="bg-secondary text-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-12 mb-12">
            <div className="flex flex-col gap-5 shrink-0 md:max-w-xs">
              <Logo variant="light" symbolClassName="h-11 w-11" wordmarkClassName="text-2xl" />
              <p className="text-sm text-white/60 leading-relaxed">{t("footer.tagline")}</p>
              <Button asChild size="sm" className="self-start glass-dark text-white border-white/20 hover:bg-white/10">
                <a href={COMERCIAL_URL} target="_blank" rel="noopener">
                  <Briefcase className="w-4 h-4" />
                  {t("footer.commercial")}
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 flex-1 md:max-w-3xl">

              {/* Coluna 1 — Navegação */}
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t("footer.menu")}</h3>
                <ul className="space-y-2.5">
                  {navLinks.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-sm hover:text-white transition-colors">
                        {t(l.key)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coluna 2 — Contato */}
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t("footer.contact")}</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="mailto:contato@turbomr.com" className="flex items-center gap-2.5 text-sm hover:text-white transition-colors">
                      <Mail className="w-4 h-4 text-primary-glow shrink-0" />
                      contato@turbomr.com
                    </a>
                  </li>
                  <li>
                    <a href={waLink(t("wa.default"))} target="_blank" rel="noopener" className="flex items-center gap-2.5 text-sm hover:text-white transition-colors">
                      <MessageCircle className="w-4 h-4 text-primary-glow shrink-0" />
                      {t("common.whatsapp")} {WHATSAPP_DISPLAY}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-2.5 text-sm hover:text-white transition-colors">
                      <Phone className="w-4 h-4 text-primary-glow shrink-0" />
                      {WHATSAPP_DISPLAY}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Coluna 3 — Redes Sociais */}
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t("footer.follow")}</h3>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/company/turbomr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/turbomri"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.youtube.com/@turbomri"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Segurança e regulamentação — miniatura */}
          <div className="border-t border-white/10 pt-6 mb-6">
            <p className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-3">{t("footer.compliance")}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-glow" /> HIPAA
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-primary-glow" /> Anvisa 2535141860220244
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-primary-glow" /> LGPD
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-primary-glow" /> {t("compliance.cards.digitalTag")}
              </span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
            <p>© {new Date().getFullYear()} TurboMR. {t("footer.rights")}</p>
            <a href="#conformidade" className="hover:text-white transition-colors">{t("footer.privacy")}</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={waLink(t("wa.default"))}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp"
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-success flex items-center justify-center shadow-glow hover:scale-110 transition-transform animate-pulse-glow"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </a>
    </div>
  );
};

export default Index;
