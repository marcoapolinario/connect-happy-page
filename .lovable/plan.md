## Redesign completo TurboMR — plano de execução

Vou reformular o site inteiro (rota `/`) seguindo a nova identidade da apresentação institucional e o benchmark Airs Medical SwiftMR. A rota `/lp` (landing de captura) será mantida como está.

### 1. Identidade visual e design system
- Atualizar `src/index.css` com nova paleta:
  - Deep Navy `#0A1A2F`, Petroleum `#0F2E47`, Dark Teal `#0E5C6E`, Turquoise `#22D3EE / #38BDF8`, White.
- Novos gradientes (hero, glass, radial turquoise) e sombras suaves.
- Tipografia: manter Space Grotesk (headings) + Inter (body), refinar tracking/pesos.
- Adicionar utilitários: `.glass-card`, `.glass-border`, `.kpi-card`, `.gradient-text-brand`.

### 2. Favicon e símbolo
- Extrair apenas o símbolo "T" do logo (sem o wordmark) com fundo transparente.
- Usar `imagegen--edit_image` sobre `image-10.png` para isolar o símbolo.
- Substituir `public/favicon.ico` e adicionar `<link rel="icon">` PNG no `index.html`.
- Criar componente `Logo` reutilizável (símbolo + wordmark "TurboMR") usado no header e footer.

### 3. Header
- Estrutura: Solução · Como Funciona · Benefícios · Resultados · Contato + botão **Acesso** (gradiente turquoise) → `https://app.turbomr.com`.
- Sempre visível, blur on scroll, mobile menu refinado.

### 4. Hero (inspirado em SwiftMR Airs Medical)
- Layout duas colunas, lado esquerdo: eyebrow badge "IA para Ressonância Magnética", headline forte, subheadline, 2 CTAs (Demonstração / Acesso), 3 mini KPIs (cards glass).
- Lado direito: comparador Antes/Depois em **container com largura máxima `max-w-[560px]`, aspect-square**, borda suave, sombra discreta — sem dominar a tela.
- Background: grid pattern sutil + radial glow turquoise.

### 5. Como Funciona
- 4 passos horizontais: Recepção → Processamento IA → Reconstrução → Resultado.
- Cards glass com ícones, linha conectora animada, scroll reveal.

### 6. Veja a Diferença Série por Série
- Refazer `ResultsShowcase`: grid de comparadores antes/depois, cada um em container `max-w-md` com aspect controlado.
- Tabs por modalidade (T1, T2, FLAIR, etc.) ou carousel responsivo.

### 7. Benefícios (3 colunas)
- Cards premium agrupados: **Clínicas** / **Médicos** / **Pacientes**, cada um com 3 bullets e ícone.

### 8. Resultados / KPIs
- 4 KPI cards grandes com números destacados (+300 exames/mês, –50% tempo, +nitidez, ROI acelerado).
- Estilo glass + gradiente turquoise no número.

### 9. Segurança & Compliance
- Faixa enterprise com badges: LGPD, HIPAA, Criptografia AES-256, Processamento seguro.
- Layout horizontal de selos + parágrafo de confiança.

### 10. CTA final
- Headline "Pronto para aumentar a produtividade da sua Ressonância Magnética?"
- Botão primário: Solicitar Demonstração (anchor #contato).
- Botão secundário: Acessar Plataforma → `https://app.turbomr.com`.
- Background gradient hero + radial glow.

### 11. Footer
- 4 colunas: Marca/Tagline · Navegação · Recursos · Contato.
- Botão destaque **Portal Comercial** → `https://comercial.turbomr.com`.
- Social: LinkedIn, Instagram. Link Política de Privacidade.

### 12. Responsividade e imagens
- Auditar imagens existentes em `src/assets`, substituir/regerar as que não combinarem com a nova paleta (priorizar geradas em tons navy/teal/turquoise).
- Todas as imagens com `max-width` controlado, `object-contain` quando necessário.
- Breakpoints: testar mobile (375), tablet (768), desktop (1280+).

### Arquivos a alterar/criar
- `index.html` — favicon, title/description atualizados.
- `src/index.css` — paleta, gradientes, utilitários.
- `src/pages/Index.tsx` — reescrita completa em seções modulares.
- `src/components/Logo.tsx` — novo.
- `src/components/Header.tsx`, `Footer.tsx`, `HeroSection.tsx`, `HowItWorks.tsx`, `BenefitsGrid.tsx`, `ResultsKpis.tsx`, `SecurityBand.tsx`, `FinalCta.tsx` — novos (extrair do Index monolítico).
- `src/components/ResultsShowcase.tsx` — refatorar contenção de imagens.
- `public/favicon.png` — novo símbolo.
- `src/i18n/{pt,en,es}.json` — atualizar copy para refletir novas seções.

### Fora de escopo (mantido)
- Rota `/lp`, edge function `notify-lead`, banco de leads, integração Resend, GA gtag, cookie consent.

### Detalhes técnicos
- Não mexer em `src/integrations/supabase/*`, `.env`, `supabase/config.toml`.
- Usar apenas tokens semânticos (sem cores hardcoded em componentes).
- Animações via classes existentes (`animate-fade-in`, `reveal`, `hover-lift`) + adições leves.
- Comparador Antes/Depois reaproveita `BeforeAfter.tsx` com novo wrapper de tamanho.

Posso prosseguir com a execução desse plano?