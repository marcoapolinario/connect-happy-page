import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroMri from "@/assets/hero-mri.jpg";
import {
  Zap, Brain, Shield, TrendingUp, CheckCircle2, Activity, Cpu, Server,
  Sparkles, Clock, Stethoscope, MessageCircle, ArrowRight, BarChart3,
} from "lucide-react";

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
  {
    q: "Como funciona a integração com meu PACS?",
    a: "O TurboMR recebe imagens via DICOM C-STORE e devolve as séries processadas automaticamente para o PACS. Sem mudanças no fluxo do radiologista.",
  },
  {
    q: "Preciso trocar meu equipamento de Ressonância?",
    a: "Não. O TurboMR é compatível com equipamentos GE, Siemens e Philips. Trabalhamos sobre a aquisição existente, sem nenhum hardware adicional na sala de exame.",
  },
  {
    q: "A IA cria artefatos ou inventa estruturas?",
    a: "Não. Nosso pipeline preserva o sinal original e apenas remove ruído e recupera resolução. Sem 'alucinações' — 100% compatível DICOM.",
  },
  {
    q: "Os dados saem do hospital?",
    a: "Não. Todo o processamento é local (on-premise). Nenhuma imagem trafega pela internet. Totalmente compatível com a LGPD.",
  },
  {
    q: "A qualidade diagnóstica fica comprometida?",
    a: "Pelo contrário. A IA aumenta SNR e nitidez, permitindo visualizar detalhes anatômicos sutis com mais clareza, mesmo em aquisições aceleradas.",
  },
  {
    q: "O radiologista precisa de treinamento?",
    a: "Não. As imagens chegam ao PACS como séries padrão, prontas para laudo. O fluxo de leitura permanece idêntico.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">TurboMR</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#solucao" className="hover:text-foreground transition-colors">Solução</a>
            <a href="#tecnologia" className="hover:text-foreground transition-colors">Tecnologia</a>
            <a href="#casos" className="hover:text-foreground transition-colors">Resultados</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </div>
          <Button asChild size="sm" className="gradient-primary text-white shadow-glow hover:opacity-90 border-0">
            <a href={waLink("Olá! Quero conhecer o TurboMR.")} target="_blank" rel="noopener">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Falar no WhatsApp</span>
            </a>
          </Button>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden gradient-hero">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-primary-glow/20 blur-3xl animate-float" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-medium">AI-Powered Radiology</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
                Ressonância Magnética <span className="gradient-text">50% mais rápida</span> com IA.
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
                A solução definitiva de processamento de RM baseada em inteligência artificial — exames mais rápidos, nítidos e eficientes. Sem trocar de equipamento.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90 font-semibold">
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

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-4">
                    <s.icon className="w-5 h-5 text-accent mb-2" />
                    <div className="text-2xl font-bold">{s.value}</div>
                    <div className="text-xs text-white/60">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 gradient-primary rounded-3xl blur-2xl opacity-40" />
              <img
                src={heroMri}
                alt="Visualização de ressonância magnética cerebral processada com IA TurboMR"
                width={1536}
                height={1024}
                className="relative rounded-2xl shadow-elegant w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section id="solucao" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">A Solução</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Três dimensões. Um único pipeline.</h2>
            <p className="text-lg text-muted-foreground">
              Combinamos IA de ponta com protocolos otimizados para entregar resultados superiores em velocidade, qualidade e valor.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <Card key={p.tag} className="p-8 shadow-card hover:shadow-elegant transition-all border-border/50 group">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-glow">
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
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY PIPELINE */}
      <section id="tecnologia" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold text-primary-glow uppercase tracking-wider mb-3">Core Technology</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Pipeline sequencial de redes neurais.</h2>
            <p className="text-lg text-white/70">
              Transforma a aquisição acelerada em imagem diagnóstica premium em ~2 minutos por série.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pipeline.map((step) => (
              <div key={step.n} className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-6xl font-bold gradient-text mb-4">{step.n}</div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/70 mb-6 text-sm leading-relaxed">{step.desc}</p>
                <div className="inline-flex px-3 py-1.5 rounded-full bg-primary-glow/20 text-primary-glow text-xs font-semibold border border-primary-glow/30">
                  {step.tag}
                </div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3"><Clock className="w-6 h-6 text-accent" /><div><div className="font-bold">~2 minutos</div><div className="text-xs text-white/60">por série</div></div></div>
            <div className="flex items-center gap-3"><Shield className="w-6 h-6 text-accent" /><div><div className="font-bold">100% DICOM</div><div className="text-xs text-white/60">compatível</div></div></div>
            <div className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-accent" /><div><div className="font-bold">Sem artefatos</div><div className="text-xs text-white/60">zero alucinações</div></div></div>
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Visão Geral Técnica</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Mapa completo da solução.</h2>
            <p className="text-lg text-muted-foreground">Fluxo contínuo, seguro e automatizado: da aquisição ao diagnóstico em minutos.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {flow.map((step, i) => (
              <div key={step.title} className="relative">
                <Card className="p-5 h-full shadow-card hover:shadow-elegant transition-all border-border/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-xs font-bold text-primary mb-1">ETAPA {i + 1}</div>
                  <h3 className="font-bold text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </Card>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              { icon: Shield, t: "Privacidade Total", d: "Dados processados localmente. Nenhuma imagem sai da rede do hospital (LGPD)." },
              { icon: CheckCircle2, t: "Metadados Preservados", d: "Mantém todas as tags DICOM originais para compatibilidade total com o PACS." },
              { icon: Activity, t: "Alta Disponibilidade", d: "Sistema 24/7 com fila resiliente e monitoramento contínuo." },
            ].map((b) => (
              <div key={b.t} className="flex gap-4 p-5 rounded-xl bg-muted/40">
                <b.icon className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-sm mb-1">{b.t}</h4>
                  <p className="text-sm text-muted-foreground">{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS / CASES */}
      <section id="casos" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Performance Comprovada</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Resultados reais de POC.</h2>
              <p className="text-lg text-muted-foreground">
                Dados de validação clínica em instituições de referência. Redução massiva de tempo, ganho de capacidade e qualidade superior.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 gradient-primary text-white shadow-glow border-0">
                <BarChart3 className="w-6 h-6 mb-3 opacity-80" />
                <div className="text-4xl font-bold mb-1">48%</div>
                <div className="text-sm text-white/80">Redução média total</div>
              </Card>
              <Card className="p-6 bg-secondary text-white border-0">
                <Sparkles className="w-6 h-6 mb-3 opacity-80" />
                <div className="text-4xl font-bold mb-1">500+</div>
                <div className="text-sm text-white/70">Protocolos criados</div>
              </Card>
            </div>
          </div>

          <Card className="overflow-hidden border-border/50 shadow-elegant">
            <div className="grid grid-cols-12 gap-4 p-4 bg-secondary text-white text-xs font-semibold uppercase tracking-wider">
              <div className="col-span-4">Região</div>
              <div className="col-span-2 text-right">Padrão</div>
              <div className="col-span-2 text-right">TurboMR</div>
              <div className="col-span-4 text-right">Redução</div>
            </div>
            {cases.map((c) => (
              <div key={c.region} className="grid grid-cols-12 gap-4 p-4 items-center border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <div className="col-span-4 font-semibold">{c.region}</div>
                <div className="col-span-2 text-right text-muted-foreground tabular-nums">{c.standard}</div>
                <div className="col-span-2 text-right font-bold text-primary tabular-nums">{c.turbo}</div>
                <div className="col-span-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full gradient-primary rounded-full" style={{ width: `${c.reduction}%` }} />
                    </div>
                    <span className="font-bold text-success text-sm tabular-nums w-12 text-right">-{c.reduction}%</span>
                  </div>
                </div>
              </div>
            ))}
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Com exames <span className="font-semibold text-foreground">50% mais rápidos</span>, sua agenda ganha flexibilidade para encaixes, urgências e menos horas extras.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Modelos Comerciais</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Comece sem compromisso.</h2>
            <p className="text-lg text-muted-foreground">Escolha a opção que melhor se adapta ao volume e fluxo de caixa da sua instituição.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="relative p-8 border-2 border-primary shadow-glow">
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

            <Card className="p-8 border-border/50 shadow-card">
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
          </div>

          <div className="mt-8 p-6 rounded-2xl gradient-accent text-secondary text-center">
            <p className="font-bold text-lg">🎁 Período de teste gratuito — 15 dias</p>
            <p className="text-sm opacity-80 mt-1">Validamos em sua estrutura, sem compromisso.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Esclarecendo dúvidas</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Perguntas frequentes</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`i${i}`} className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-glow/20 blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Pronto para acelerar sua RM?</h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Receba uma proposta personalizada e inicie o piloto de 15 dias na sua clínica. Implementação simples, sem interrupção da operação.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90 font-semibold">
              <a href={waLink("Olá! Quero receber uma proposta TurboMR para minha clínica.")} target="_blank" rel="noopener">
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/60">Resposta em horário comercial • Sem compromisso</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary text-white/70">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">TurboMR</span>
          </div>
          <div className="text-sm text-center md:text-right">
            <a href={waLink("Olá!")} target="_blank" rel="noopener" className="hover:text-white transition-colors">
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-success flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
};

export default Index;
