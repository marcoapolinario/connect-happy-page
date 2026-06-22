
# Landing Page de Conversão — TurboMR (Google Ads)

## Objetivo
Capturar leads qualificados vindos do Google Ads e levá-los rapidamente para **WhatsApp** ou **e-mail**, com mensagem focada em **ROI/lucratividade** do parque de RM — não em "tecnologia bonita".

## Persona principal
**Diretor/Gestor de clínica de diagnóstico por imagem** (ou dono de rede pequena/média no Brasil)
- Dor #1: fila de espera longa, agenda saturada, RM é o gargalo e o ativo mais caro
- Dor #2: custo por exame alto (técnico, energia, ocupação de sala), margem comprimida por convênios
- Dor #3: pressão para trocar/atualizar equipamento (CAPEX alto) vs. fazer mais com o que já tem
- KPIs que ele olha: exames/dia por sala, ticket médio, taxa de ocupação, NPS do paciente
- Decisor secundário: coordenador técnico / físico médico (valida qualidade de imagem)

## Persona secundária
**Radiologista chefe** — preocupado com qualidade diagnóstica e conforto do paciente (menos tempo no tubo = menos movimento = menos repetição).

## Análise competitiva — o que copiar e o que evitar

**SwiftMR (AIRS Medical, Coreia)**
- Mensagem: "Faster Scans, Superior Image Quality" + prova social global (países, hospitais, estudos)
- Demo: upload de DICOM → recebe comparativo no e-mail (excelente gerador de lead qualificado)
- Foco em radiologista, não em gestor financeiro

**Subtle Medical (EUA)**
- SubtleMR / SubtlePET, FDA cleared, foco institucional/enterprise
- Site corporativo, ciclo de venda longo, pouca conversão direta

**Gap que a TurboMR explora**
- Falam para o radiologista; **ninguém fala para o dono que quer ROI em R$**
- Ninguém oferece atendimento consultivo rápido em PT-BR via WhatsApp
- Posicionamento TurboMR: "**Até 2x mais exames por dia no mesmo equipamento, sem trocar a máquina**"

## Estrutura da landing page (rota nova `/lp-ads`)

```text
1. HERO  (above the fold — decide o clique do anúncio)
   H1: Dobre a capacidade da sua Ressonância
       sem trocar o equipamento
   Sub: IA que reduz o tempo de aquisição em até 50% mantendo
        qualidade diagnóstica. Mais exames/dia, mesma sala, mais lucro.
   [Falar no WhatsApp]  [Agendar demonstração]
   Selo: "Compatível com GE, Siemens, Philips, Canon"

2. BARRA DE DORES (3 cards curtos)
   - Agenda lotada e fila de 30+ dias
   - Custo por exame em alta, margem caindo
   - CAPEX de equipamento novo: R$ 3-8 mi

3. PROPOSTA DE VALOR EM R$ (calculadora simples ou números fixos)
   "Clínica média: +6 exames/dia × R$ 450 × 22 dias = +R$ 59.400/mês"
   3 métricas grandes: -50% tempo, +2x throughput, ROI < 6 meses

4. COMO FUNCIONA (3 passos — reaproveita seção atual)
   Imagem ruidosa → Processamento IA → Imagem aprimorada

5. PROVA DE QUALIDADE
   Slider antes/depois (componente BeforeAfter já existe)
   Quote de radiologista + logos de fabricantes compatíveis

6. PARA QUEM É (qualifica o lead)
   ✓ Clínicas com 1+ RM 1.5T ou 3T
   ✓ Volume > 300 exames/mês
   ✓ Quer aumentar receita sem CAPEX

7. FAQ (objeções clássicas)
   - É aprovado pela Anvisa/FDA?
   - Funciona no meu equipamento?
   - Quanto custa? (resposta: modelo por exame, sem CAPEX)
   - Quanto tempo de implantação?

8. CTA FINAL — formulário curto + WhatsApp
   Campos: Nome, Clínica, WhatsApp, Quantos equipamentos de RM
   Botão grande: [Quero falar com um especialista]
   Botão flutuante WhatsApp persistente em toda a página

9. Footer mínimo (sem menu — LP de ads não tem fuga)
```

## Conversão / tracking
- Botão WhatsApp com `wa.me/<numero>` + mensagem pré-preenchida ("Vim do Google, quero saber sobre TurboMR")
- Form submete via edge function `notify-lead` já existente → e-mail
- Evento `gtag('event', 'generate_lead')` no submit e no clique do WhatsApp (preparado para Google Ads conversion tag — o usuário cola o ID depois)
- Sem menu de navegação no topo (só logo) para reduzir fuga — boa prática de LP paga

## SEO / Meta (Helmet por rota)
- `<title>` "TurboMR — Dobre a capacidade da sua Ressonância | IA Médica"
- meta description com CTA e número
- canonical `/lp-ads`, og:image (gerar 1 imagem 1200x630 — pergunto antes)
- `noindex` opcional se for só para tráfego pago (pergunto)

## Detalhes técnicos
- Nova rota `/lp-ads` em `src/App.tsx` → `src/pages/LpAds.tsx`
- Reaproveita: `BeforeAfter`, `Reveal`, `NeuralWave`, tokens do `index.css`
- Adiciona componente `WhatsAppFAB` (botão flutuante)
- i18n: PT-BR como default (público-alvo BR), strings em `src/i18n/pt.json` sob chave `lpAds.*`
- Form: mesma edge function `notify-lead`, adiciona campo `equipmentCount` e `source: "google-ads"`
- Mantém `/lp` atual intacto (LP institucional existente)

## Perguntas rápidas antes de codar
1. **Número do WhatsApp** e **e-mail** que recebem os leads?
2. **Faixa de preço/modelo comercial** posso citar? (ex.: "por exame", "mensalidade") ou só "fale conosco"?
3. Quer **calculadora interativa de ROI** ou números fixos bastam?
4. Já tem **Google Ads Conversion ID** para eu preparar o gtag? (se não, deixo placeholder)
