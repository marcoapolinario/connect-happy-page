
# TurboMR — SEO Avançado, GTM e Estrutura de Marketing

Escopo enorme. Vou entregar em **3 ondas incrementais**. Cada onda é independente e utilizável. Detalho a Onda 1 com precisão; Ondas 2 e 3 ficam em alto nível pra você validar antes.

Assumo que **este** é o projeto TurboMR (não confundir com o pedido anterior de gestão financeira, que fica separado).

---

## Premissas e recortes honestos

- **Lighthouse ≥90 em tudo**: perseguível, não garantível 100% do tempo — depende de fontes/imagens do usuário e do runtime do Lovable. Vou otimizar até o teto viável e reportar o resultado real.
- **SPA (Vite + React)**: crawlers modernos (Google, Bing) executam JS e leem `react-helmet-async` sem problema. Preview no LinkedIn/Slack/Facebook lê só o `index.html` estático — não há como ter OG dinâmico por rota sem SSR. Vou deixar OG sitewide sólido no `index.html` e OG por rota via Helmet pro Google.
- **reCAPTCHA / rate limit / headers de segurança**: reCAPTCHA v3 exige chave do usuário (peço quando chegarmos lá). Headers HTTP e rate-limit real são do hosting Lovable — o que posso fazer no app é honeypot + validação Zod + throttle client-side + edge function com verificação. Vou entregar isso e ser claro sobre o que fica no hosting.
- **Auto-SEO "IA sugere keywords"**: cabe, mas só faz sentido depois que o admin do blog tiver mais tração. Fica na Onda 3.
- **Dashboard "visitantes / origem / tempo médio"**: esses dados vivem no GA4, não no banco. O dashboard interno vai focar no que temos em primeira mão — **leads, conversões, cliques em WhatsApp/e-mail, UTMs, funil** — e linkar pro GA4 pra métricas de audiência. Duplicar GA4 no banco é caro e impreciso.

---

## Onda 1 — SEO técnico + GTM + Consent Mode + Lead enrichment (este ciclo)

### 1.1 SEO técnico
- **Helmet por rota** já existe no Blog/BlogPost. Vou estender pra `Index`, `Lp`, `LpAds`, `Blog` (lista), `NotFound`:
  - `<title>` único (≤60 chars) + `<meta description>` (≤160) por rota, em PT/EN/ES quando aplicável.
  - `<link rel="canonical">` self-referente por rota.
  - `og:title/description/url/type/image` e `twitter:card` por rota.
  - **JSON-LD**: `Organization` + `WebSite` sitewide no `index.html`; `SoftwareApplication` (produto TurboMR) na home; `Article` + `BreadcrumbList` no post; `FAQPage` onde houver FAQ; `BreadcrumbList` no `/blog`.
- **Heading audit**: garantir 1 `<h1>` por página, hierarquia H2/H3 correta em Index/Lp/LpAds/Blog.
- **Alt text**: varrer todos os `<img>` do projeto e preencher alt semântico (não "auto por IA" — texto real por contexto).
- **Imagens**: componente `<Img>` com `loading="lazy"`, `decoding="async"`, `width/height` para evitar CLS. Onde o arquivo original for grande, converto pra WebP no build via `sharp` (script `prebuild`).
- **Fontes**: preload já existe pro Space Grotesk/Inter; adicionar `font-display: swap` e verificar preconnect.
- **Sitemap**: o gerador já existe (`scripts/generate-sitemap.ts`). Vou estender pra incluir `/lp-ads` e checar `lastmod` de posts. `robots.txt` já está adequado — só ajusto se necessário.
- **URLs amigáveis + 301**: rotas atuais já são limpas. Não vou inventar redirects sem pedido explícito.

### 1.2 GTM + Data Layer + GA4 + Clarity
GTM (`GTM-MFS82RMD`) já está no `index.html`. Vou:
- Criar `src/lib/analytics.ts` com API única: `track(event, params)`, `identify(traits)`, `pageview(path)`.
- Push tipado no `window.dataLayer` — events padronizados:
  - `page_view`, `scroll_depth` (25/50/75/100), `cta_click`, `whatsapp_click`, `email_click`, `phone_click`, `form_start`, `form_submit`, `lead_conversion`, `demo_request`, `poc_request`, `video_play`, `video_complete`, `download`, `section_view`, `outbound_click`, `time_on_page`.
- Hook `useScrollTracking()` no layout raiz.
- `pageview` disparado em cada mudança de rota via listener do `react-router`.
- **GA4**: continua sendo carregado pelo tag `gtag.js` que já existe **ou** movo pro GTM (recomendado — evita duplicidade). Vou consolidar via GTM e remover o `gtag.js` inline pra não medir duas vezes. Você configura os eventos-conversão dentro do GA4 (te entrego a lista pronta pra colar).
- **Clarity**: carregado condicionalmente após consentimento analítico (script injetado). Precisa do **Project ID do Clarity** — te peço na aprovação.

### 1.3 Consent Mode v2 + LGPD
Refatorar o `CookieConsent` atual (hoje é binário aceitar/recusar) para:
- Banner + modal "Preferências" com 3 categorias: **necessários** (sempre on), **analíticos**, **marketing**.
- Persistir escolha em `localStorage` + cookie primário `tmr_consent` (1 ano).
- Disparar `gtag('consent', 'update', {...})` com `ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization` — Consent Mode v2 completo.
- Estado default `denied` antes de decisão (via `gtag('consent','default',...)` inline no `index.html`, **antes** do GTM).
- Emitir evento `consent_update` no dataLayer.
- Copy em PT/EN/ES via i18n existente.

### 1.4 Enriquecimento e captura de leads
Tabela `leads` já existe. Vou:
- Adicionar colunas: `phone`, `city`, `state`, `country`, `interest`, `page_url`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `fbclid`, `device`, `browser`, `user_agent`. Migração com defaults nullable pra não quebrar dados atuais.
- `src/lib/attribution.ts`: captura UTMs/GCLID/FBCLID na primeira visita, salva em `sessionStorage` + cookie primário de 90 dias, injeta em todo formulário e clique de WhatsApp.
- Botão WhatsApp (FAB e CTAs): mensagem contextual pela rota + parâmetros UTM na string; evento `whatsapp_click` no GTM antes da navegação.
- Edge function `notify-lead` já existe — estendo pra receber os novos campos, validar com Zod (limites e sanitização) e logar. Envio de e-mail via Resend fica pronto pra ligar assim que o domínio de envio for verificado (já é config existente).
- **Anti-spam**: campo honeypot invisível + throttle 1 submissão/30s por sessão + validação Zod estrita. reCAPTCHA v3 fica pra Onda 2 (precisa das chaves).

---

## Onda 2 — Landing pages reutilizáveis + Dashboard interno + reCAPTCHA

- Componente `<LandingPageTemplate>` com slots: hero, benefícios, CTA, formulário, FAQ (`FAQPage` schema), depoimentos, cases, WhatsApp. Nova LP = 1 arquivo de config + rota.
- `/admin/dashboard`: cards de leads (dia/semana/mês), origem (breakdown UTM), taxa de conversão por página, top páginas de origem, cliques em WhatsApp/e-mail (do dataLayer refletido via evento no backend opcional), funil visão simples. Link "Ver audiência completa no GA4".
- `/admin/leads`: lista, filtros por UTM/período, export CSV.
- reCAPTCHA v3 nos formulários (peço `RECAPTCHA_SITE_KEY` + `RECAPTCHA_SECRET`).

## Onda 3 — Auto-SEO, integrações CRM e otimizações finas

- **Admin SEO por rota**: tabela `page_seo` (path, title, description, og_image, keywords, schema_json) editável no admin, aplicada via hook em cada rota. Fallback pros defaults hardcoded.
- **Sugestão de keywords por IA**: edge function usando Lovable AI Gateway analisa o conteúdo da página e sugere title/description/keywords baseado nas queries alvo (a lista longa que você passou).
- Conversão de imagens do projeto pra WebP no `prebuild`.
- Conectores prontos: RD Station, HubSpot (edge function `sync-lead` que dispara sob feature flag).
- Meta Pixel e LinkedIn Insight Tag disparados via GTM sob consentimento de marketing.

---

## O que vou tocar na Onda 1 (arquivos)

- `index.html` — Consent Mode default `denied`, JSON-LD Organization+WebSite, remoção do gtag duplicado, meta tags base.
- `src/lib/analytics.ts` **(novo)** — API única de tracking.
- `src/lib/attribution.ts` **(novo)** — captura/persistência de UTMs, GCLID, FBCLID.
- `src/lib/consent.ts` **(novo)** — estado de consentimento + Consent Mode v2.
- `src/components/CookieConsent.tsx` — refactor pra 3 categorias + modal.
- `src/components/SEO.tsx` **(novo)** — wrapper Helmet reutilizável (title/desc/canonical/OG/JSON-LD).
- `src/components/WhatsAppFAB.tsx` — injeta UTMs e dispara evento antes de abrir.
- `src/pages/Index.tsx`, `Lp.tsx`, `LpAds.tsx`, `Blog.tsx`, `BlogPost.tsx`, `NotFound.tsx` — SEO por rota + tracking de scroll/CTA/section_view.
- `supabase/functions/notify-lead/index.ts` — aceitar campos de atribuição, sanitizar, honeypot check.
- **Migração** — adicionar colunas de atribuição à tabela `leads`.
- `scripts/generate-sitemap.ts` — incluir `/lp-ads`.

Nenhum arquivo é reescrito sem necessidade; uso edits pontuais.

---

## Perguntas pra fechar a Onda 1

1. **Clarity Project ID** — qual é? (sem ele não instalo)
2. **GA4 via GTM**: confirma que posso **remover o `gtag.js` inline** do `index.html` e centralizar no GTM? (evita medição dupla — recomendo sim)
3. **E-mail comercial** que deve receber notificação de lead? (hoje só logamos; posso ligar Resend agora se o domínio já estiver verificado — se não, deixo o hook pronto)
4. **WhatsApp**: mantemos o número atual `551153043453`?

Respondendo (ou dizendo "toca ficha com defaults sensatos"), parto pra implementação da Onda 1.
