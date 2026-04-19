import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ResultsShowcase } from "@/components/ResultsShowcase";
import heroMri from "@/assets/hero-mri.jpg";
import mriBefore from "@/assets/mri-before.jpg";
import mriAfter from "@/assets/mri-after.jpg";
import logo from "@/assets/turbomr-wordmark.png";
import {
  Zap, Shield, TrendingUp, CheckCircle2, Activity, Cpu, Server,
  Sparkles, Clock, Stethoscope, MessageCircle, ArrowRight, BarChart3,
  Menu, X,
} from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "5511530443453";
const WHATSAPP_DISPLAY = "(11) 5304-3453";
const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const stats = [
  { icon: Zap, value: "50%", label: "Mais Rápido" },
  { icon: Sparkles, value: "Ultra", label: "Resolução" },
  { icon: Server, value: "Zero", label: "Novos Equipamentos" },
  { icon: TrendingUp, value: "+40%", label: "Capacidade" },
];

const pillars = [
  {
    icon: Zap,
    tag: "Velocidade",
    title: "Eficiência Operacional",
    points: [
      "Redução média de 40–50% no tempo de aquisição",
      "Protocolos otimizados sem perda de dados",
      "Processamento rápido em ~2 min por série",
    ],
  },
  {
    icon: Sparkles,
    tag: "Qualidade",
    title: "Precisão Diagnóstica",
    points: [
      "Advanced Denoise, Super-resolução e nitidez",
      "Imagens limpas sem artefatos artificiais",
      "Preserva metadados DICOM e melhora SNR",
    ],
  },
  {
    icon: TrendingUp,
    tag: "Valor",
    title: "Impacto no Negócio",
    points: [
      "Mais exames/dia = maior receita por sala",
      "Melhor experiência paciente e equipe",
      "Processamento local seguro (LGPD compliant)",
    ],
  },
];

const pipeline = [
  { n: "01", title: "Denoising", desc: "Redes neurais profundas removem o ruído da aquisição rápida, preservando estrutura do sinal.", tag: "↓ Ruído (SNR)" },
  { n: "02", title: "Super-Resolução", desc: "Recuperação inteligente da resolução espacial. Reconstrói detalhes finos e bordas.", tag: "Matriz Elevada" },
  { n: "03", title: "Nitidez Final", desc: "Ajuste fino de contraste e realce de bordas anatômicas para qualidade superior à original.", tag: "Diagnóstico Claro" },
];

const flow = [
  { icon: Activity, title: "Aquisição", desc: "RM GE / Siemens / Philips com protocolo otimizado" },
  { icon: ArrowRight, title: "Envio", desc: "Rede local via DICOM C-STORE" },
  { icon: Cpu, title: "TurboMR IA", desc: "Servidor on-premise: denoise + super-res + nitidez" },
  { icon: Server, title: "Retorno", desc: "Integração automática com PACS / Workstation" },
  { icon: Stethoscope, title: "Laudo", desc: "Radiologista lauda com qualidade superior" },
];

const cases = [
  { region: "Crânio (Neuro)", standard: "21:30", turbo: "11:02", reduction: 59 },
  { region: "Cervical", standard: "11:22", turbo: "05:18", reduction: 53 },
  { region: "Lombar", standard: "10:19", turbo: "04:59", reduction: 52 },
  { region: "Joelho", standard: "09:56", turbo: "05:47", reduction: 42 },
  { region: "Tornozelo", standard: "19:20", turbo: "09:58", reduction: 48 },
  { region: "Quadril", standard: "14:47", turbo: "08:54", reduction: 40 },
  { region: "Ombro", standard: "10:21", turbo: "06:44", reduction: 35 },
  { region: "Punho", standard: "20:11", turbo: "08:36", reduction: 57 },
];

const faqs = [
  { q: "Como funciona a integração com meu PACS?", a: "O TurboMR recebe imagens via DICOM C-STORE e devolve as séries processadas automaticamente para o PACS. Sem mudanças no fluxo do radiologista." },
  { q: "Preciso trocar meu equipamento de Ressonância?", a: "Não. O TurboMR é compatível com equipamentos GE, Siemens e Philips. Trabalhamos sobre a aquisição existente, sem nenhum hardware adicional na sala de exame." },
  { q: "A IA cria artefatos ou inventa estruturas?", a: "Não. Nosso pipeline preserva o sinal original e apenas remove ruído e recupera resolução. Sem 'alucinações' — 100% compatível DICOM." },
  { q: "Os dados saem do hospital?", a: "Não. Todo o processamento é local (on-premise). Nenhuma imagem trafega pela internet. Totalmente compatível com a LGPD." },
  { q: "A qualidade diagnóstica fica comprometida?", a: "Pelo contrário. A IA aumenta SNR e nitidez, permitindo visualizar detalhes anatômicos sutis com mais clareza, mesmo em aquisições aceleradas." },
  { q: "O radiologista precisa de treinamento?", a: "Não. As imagens chegam ao PACS como séries padrão, prontas para laudo. O fluxo de leitura permanece idêntico." },
];

const navLinks = [
  { href: "#solucao", label: "Solução" },
  { href: "#tecnologia", label: "Tecnologia" },
  { href: "#comparativo", label: "Antes/Depois" },
  { href: "#casos", label: "Resultados" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "FAQ" },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/85 border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center group" aria-label="TurboMR">
            <img
              src={logo}
              alt="TurboMR"
              className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="relative hover:text-foreground transition-colors after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="gradient-primary text-white shadow-glow hover:opacity-90 border-0 hidden sm:inline-flex">
              <a href={waLink("Olá! Quero conhecer o TurboMR.")} target="_blank" rel="noopener">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </Button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <Button asChild size="sm" className="mt-2 gradient-primary text-white border-0">
                <a href={waLink("Olá! Quero conhecer o TurboMR.")} target="_blank" rel="noopener">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-28 overflow-hidden gradient-hero">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/4 -right-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-primary-glow/20 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -left-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="text-white opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-medium">AI-Powered Radiology</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
                Ressonância Magnética <span className="gradient-text">50% mais rápida</span> com IA.
              </h1>
              <p className="text-base sm:text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
                A solução definitiva de processamento de RM baseada em inteligência artificial — exames mais rápidos, nítidos e eficientes. Sem trocar de equipamento.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90 font-semibold animate-pulse-glow">
                  <a href={waLink("Olá! Tenho interesse no teste gratuito de 15 dias do TurboMR.")} target="_blank" rel="noopener">
                    <MessageCircle className="w-5 h-5" />
                    Teste 15 dias grátis
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">
                  <a href="#solucao">
                    Ver como funciona
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-3 sm:p-4 opacity-0 animate-scale-in hover-lift"
                    style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                  >
                    <s.icon className="w-5 h-5 text-accent mb-2" />
                    <div className="text-xl sm:text-2xl font-bold">{s.value}</div>
                    <div className="text-[11px] sm:text-xs text-white/60">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative opacity-0 animate-fade-in-right" style={{ animationDelay: "0.3s" }}>
              <div className="absolute -inset-4 gradient-primary rounded-3xl blur-2xl opacity-40 animate-pulse-glow" />
              <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                <BeforeAfter
                  beforeSrc={mriBefore}
                  afterSrc={mriAfter}
                  alt="Comparativo RM acelerada vs processada com TurboMR"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section id="solucao" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-2xl mb-14 sm:mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">A Solução</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Três dimensões. Um único pipeline.</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Combinamos IA de ponta com protocolos otimizados para entregar resultados superiores em velocidade, qualidade e valor.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <Reveal key={p.tag} delay={i * 120}>
                <Card className="p-7 sm:p-8 shadow-card hover-lift border-border/50 group h-full">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-glow">
                    <p.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{p.tag}</p>
                  <h3 className="text-xl font-bold mb-4">{p.title}</h3>
                  <ul className="space-y-3">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY PIPELINE */}
      <section id="tecnologia" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-float" />
        <div className="relative max-w-7xl mx-auto">
          <Reveal className="max-w-2xl mb-14 sm:mb-16">
            <p className="text-sm font-semibold text-primary-glow uppercase tracking-wider mb-3">Core Technology</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">O que a IA pode fazer para sua Ressonância?</h2>
            <p className="text-base sm:text-lg text-white/70">
              Transforma a aquisição de exames inteiros com redução de tempo — imagine fazer uma coluna lombar com menos de 5 minutos em equipamentos de 1,5T!
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pipeline.map((step, i) => (
              <Reveal key={step.n} delay={i * 150}>
                <div className="relative p-7 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover-lift h-full">
                  <div className="text-5xl sm:text-6xl font-bold gradient-text mb-4">{step.n}</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-white/70 mb-6 text-sm leading-relaxed">{step.desc}</p>
                  <div className="inline-flex px-3 py-1.5 rounded-full bg-primary-glow/20 text-primary-glow text-xs font-semibold border border-primary-glow/30">
                    {step.tag}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="grid sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3"><Clock className="w-6 h-6 text-accent" /><div><div className="font-bold">~2 minutos</div><div className="text-xs text-white/60">por série</div></div></div>
              <div className="flex items-center gap-3"><Shield className="w-6 h-6 text-accent" /><div><div className="font-bold">100% DICOM</div><div className="text-xs text-white/60">compatível</div></div></div>
              <div className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-accent" /><div><div className="font-bold">Sem artefatos</div><div className="text-xs text-white/60">zero alucinações</div></div></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FLOW */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-2xl mb-14 sm:mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Visão Geral Técnica</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Mapa completo da solução.</h2>
            <p className="text-base sm:text-lg text-muted-foreground">Fluxo contínuo, seguro e automatizado: da aquisição ao diagnóstico em minutos.</p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
            {flow.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <Card className="p-4 sm:p-5 h-full shadow-card hover-lift border-border/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-primary mb-1">ETAPA {i + 1}</div>
                  <h3 className="font-bold text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              { icon: Shield, t: "Privacidade Total", d: "Dados processados localmente. Nenhuma imagem sai da rede do hospital (LGPD)." },
              { icon: CheckCircle2, t: "Metadados Preservados", d: "Mantém todas as tags DICOM originais para compatibilidade total com o PACS." },
              { icon: Activity, t: "Alta Disponibilidade", d: "Sistema 24/7 com fila resiliente e monitoramento contínuo." },
            ].map((b, i) => (
              <Reveal key={b.t} delay={i * 120}>
                <div className="flex gap-4 p-5 rounded-xl bg-muted/40 hover-lift h-full">
                  <b.icon className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">{b.t}</h4>
                    <p className="text-sm text-muted-foreground">{b.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER COMPARISON */}
      <section id="comparativo" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="relative max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Comparativo Visual</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Antes vs. <span className="gradient-text">Depois</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Arraste o controle para comparar a aquisição rápida (com ruído) e o resultado final processado pela IA do TurboMR.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            <Reveal className="lg:col-span-3">
              <BeforeAfter
                beforeSrc={mriBefore}
                afterSrc={mriAfter}
                beforeLabel="Aquisição rápida"
                afterLabel="TurboMR IA"
                alt="Comparativo de ressonância magnética cerebral antes e depois do processamento TurboMR"
              />
            </Reveal>

            <Reveal delay={150} className="lg:col-span-2 space-y-5">
              {[
                { icon: Sparkles, t: "Ruído reduzido", d: "Advanced Denoise elimina o ruído da aquisição acelerada sem apagar detalhes anatômicos." },
                { icon: Zap, t: "Resolução recuperada", d: "Super-resolução reconstrói matriz e bordas finas, revelando estruturas sutis." },
                { icon: CheckCircle2, t: "Diagnóstico mais claro", d: "Imagem final com nitidez e contraste superiores, pronta para laudo no PACS." },
              ].map((b) => (
                <div key={b.t} className="flex gap-4 p-5 rounded-xl bg-card border border-border/50 shadow-card hover-lift">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0 shadow-glow">
                    <b.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{b.t}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.d}</p>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground italic px-1">
                * Imagens ilustrativas para demonstração do efeito do pipeline.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RESULTS / CASES */}
      <section id="casos" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-end mb-14 sm:mb-16">
            <Reveal>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Performance Comprovada</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Resultados reais de POC.</h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Dados de validação clínica em instituições de referência. Redução massiva de tempo, ganho de capacidade e qualidade superior.
              </p>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              <Reveal delay={100}>
                <Card className="p-6 gradient-primary text-white shadow-glow border-0 hover-lift h-full">
                  <BarChart3 className="w-6 h-6 mb-3 opacity-80" />
                  <div className="text-3xl sm:text-4xl font-bold mb-1">48%</div>
                  <div className="text-xs sm:text-sm text-white/80">Redução média total</div>
                </Card>
              </Reveal>
              <Reveal delay={200}>
                <Card className="p-6 bg-secondary text-white border-0 hover-lift h-full">
                  <Sparkles className="w-6 h-6 mb-3 opacity-80" />
                  <div className="text-3xl sm:text-4xl font-bold mb-1">500+</div>
                  <div className="text-xs sm:text-sm text-white/70">Protocolos criados</div>
                </Card>
              </Reveal>
            </div>
          </div>

          <Reveal>
            <Card className="overflow-hidden border-border/50 shadow-elegant">
              <div className="grid grid-cols-12 gap-2 sm:gap-4 p-3 sm:p-4 bg-secondary text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                <div className="col-span-4">Região</div>
                <div className="col-span-2 text-right">Padrão</div>
                <div className="col-span-2 text-right">TurboMR</div>
                <div className="col-span-4 text-right">Redução</div>
              </div>
              {cases.map((c, i) => (
                <div
                  key={c.region}
                  className="grid grid-cols-12 gap-2 sm:gap-4 p-3 sm:p-4 items-center border-b border-border last:border-0 hover:bg-muted/30 transition-colors text-sm"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="col-span-4 font-semibold text-xs sm:text-sm">{c.region}</div>
                  <div className="col-span-2 text-right text-muted-foreground tabular-nums text-xs sm:text-sm">{c.standard}</div>
                  <div className="col-span-2 text-right font-bold text-primary tabular-nums text-xs sm:text-sm">{c.turbo}</div>
                  <div className="col-span-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full gradient-primary rounded-full transition-all duration-1000"
                          style={{ width: `${c.reduction}%` }}
                        />
                      </div>
                      <span className="font-bold text-success text-xs sm:text-sm tabular-nums w-10 sm:w-12 text-right">-{c.reduction}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </Reveal>

          <Reveal>
            <p className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
              Com exames <span className="font-semibold text-foreground">50% mais rápidos</span>, sua agenda ganha flexibilidade para encaixes, urgências e menos horas extras.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROVEN RESULTS — IMAGE COMPARISONS */}
      <section id="resultados-imagens" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Resultados Comprovados em Imagens</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Veja a diferença, <span className="gradient-text">série por série</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Casos clínicos reais comparando o protocolo padrão (Rotina) ao processamento TurboMR — mesma anatomia, mesmo paciente, em uma fração do tempo.
            </p>
          </Reveal>

          <Reveal>
            <ResultsShowcase />
          </Reveal>

          <Reveal>
            <p className="text-center text-xs text-muted-foreground mt-8 italic">
              Imagens reais de casos de validação clínica — Mar/2026.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section id="planos" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Modelos Comerciais</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Comece sem compromisso.</h2>
            <p className="text-base sm:text-lg text-muted-foreground">Escolha a opção que melhor se adapta ao volume e fluxo de caixa da sua instituição.</p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={100}>
              <Card className="relative p-7 sm:p-8 border-2 border-primary shadow-glow hover-lift h-full">
                <div className="absolute -top-3 left-8 px-3 py-1 rounded-full gradient-primary text-white text-xs font-bold">RECOMENDADO</div>
                <h3 className="text-2xl font-bold mb-2">Licença Anual</h3>
                <p className="text-muted-foreground text-sm mb-6">Ilimitada por equipamento</p>
                <ul className="space-y-3 mb-8">
                  {["Processamento ilimitado 24/7", "Suporte técnico dedicado", "Atualizações inclusas", "Treinamento da equipe"].map((f) => (
                    <li key={f} className="flex gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />{f}</li>
                  ))}
                </ul>
                <Button asChild className="w-full gradient-primary text-white border-0 hover:opacity-90">
                  <a href={waLink("Quero consultar valores da Licença Anual TurboMR.")} target="_blank" rel="noopener">Consultar valores</a>
                </Button>
              </Card>
            </Reveal>

            <Reveal delay={200}>
              <Card className="p-7 sm:p-8 border-border/50 shadow-card hover-lift h-full">
                <h3 className="text-2xl font-bold mb-2">Pay-per-Use</h3>
                <p className="text-muted-foreground text-sm mb-6">Por exame processado</p>
                <ul className="space-y-3 mb-8">
                  {["Sem investimento inicial", "Escalável conforme demanda", "Faturamento mensal", "Mesma qualidade técnica"].map((f) => (
                    <li key={f} className="flex gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />{f}</li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <a href={waLink("Quero entender o modelo Pay-per-Use do TurboMR.")} target="_blank" rel="noopener">Saber mais</a>
                </Button>
              </Card>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="mt-8 p-6 rounded-2xl gradient-accent text-secondary text-center hover-lift">
              <p className="font-bold text-lg">🎁 Período de teste gratuito — 15 dias</p>
              <p className="text-sm opacity-80 mt-1">Validamos em sua estrutura, sem compromisso.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Esclarecendo dúvidas</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Perguntas frequentes</h2>
          </Reveal>
          <Reveal>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
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
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-primary-glow/20 blur-3xl animate-pulse-glow" />
        <Reveal className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6">Pronto para acelerar sua RM?</h2>
          <p className="text-base sm:text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Receba uma proposta personalizada e inicie o piloto de 15 dias na sua clínica. Implementação simples, sem interrupção da operação.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90 font-semibold animate-pulse-glow">
              <a href={waLink("Olá! Quero receber uma proposta TurboMR para minha clínica.")} target="_blank" rel="noopener">
                <MessageCircle className="w-5 h-5" />
                <span className="hidden sm:inline">Falar no WhatsApp</span> {WHATSAPP_DISPLAY}
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/60">Resposta em horário comercial • Sem compromisso</p>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary text-white/70">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <img src={logo} alt="TurboMR" className="h-8 w-auto object-contain brightness-0 invert" />
          <div className="text-sm text-center md:text-right">
            <a href={waLink("Olá!")} target="_blank" rel="noopener" className="hover:text-white transition-colors inline-flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <p className="mt-1 text-xs">© {new Date().getFullYear()} TurboMR. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={waLink("Olá! Quero saber mais sobre o TurboMR.")}
        target="_blank"
        rel="noopener"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-success flex items-center justify-center shadow-glow hover:scale-110 transition-transform animate-pulse-glow"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
};

export default Index;
