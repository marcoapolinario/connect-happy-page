
# Blog SEO + Área Administrativa — TurboMR

## Objetivo
Construir um blog otimizado para SEO orgânico em PT-BR, com **10 artigos seed** sobre IA aplicada a Ressonância Magnética, baseados nos 3 PDFs anexados e em conteúdos de referência (SwiftMR/AIRS, Subtle Medical, VX Medical). Inclui **área admin** protegida para o usuário criar/editar/publicar novos posts depois.

## Personas-alvo do blog
- **Gestor/dono de clínica** (decisor financeiro): busca "como aumentar produtividade da RM", "ROI ressonância", "reduzir custo por exame"
- **Radiologista chefe / físico médico** (decisor técnico): busca "deep learning MRI reconstruction", "redução de tempo de aquisição com IA", "qualidade diagnóstica IA RM"

## Estrutura do blog

### Rotas (público)
- `/blog` — listagem de posts (paginada, filtro por categoria, busca)
- `/blog/:slug` — post individual com SEO completo + JSON-LD Article + breadcrumbs
- `/blog/categoria/:slug` — listagem por categoria

### Rotas (admin protegidas)
- `/admin/login` — login (Lovable Cloud auth com email/senha)
- `/admin/blog` — listagem com filtros (rascunho/publicado), busca
- `/admin/blog/novo` — criar post
- `/admin/blog/editar/:id` — editar
- Botão "publicar/despublicar", upload de imagem de capa

## Stack técnica

### Backend (Lovable Cloud / Supabase)
**Migração — tabelas e RLS:**

```text
public.profiles
  id uuid PK ← auth.users.id (cascade)
  display_name text
  created_at timestamptz

public.user_roles  (separada — evita escalada de privilégio)
  id uuid PK
  user_id uuid → auth.users
  role app_role enum ('admin','editor')
  UNIQUE (user_id, role)

public.blog_categories
  id uuid PK
  slug text UNIQUE
  name text
  description text

public.blog_posts
  id uuid PK
  slug text UNIQUE
  title text
  excerpt text         -- ~160 chars, meta description
  content_md text      -- markdown
  cover_image_url text
  category_id uuid → blog_categories
  author_id uuid → auth.users
  tags text[]
  meta_title text       -- opcional, fallback no title
  meta_description text -- opcional, fallback no excerpt
  reading_minutes int
  published boolean default false
  published_at timestamptz
  created_at, updated_at timestamptz
```

**Função `has_role(user_id, role)` SECURITY DEFINER** + trigger `handle_new_user` que cria profile automaticamente.

**RLS:**
- `blog_posts`: SELECT público quando `published = true`; INSERT/UPDATE/DELETE só para admin/editor
- `blog_categories`: SELECT público; mutação só admin
- `user_roles`: SELECT/INSERT só admin
- `profiles`: usuário lê/edita o próprio

**Storage bucket** `blog-covers` (público) para imagens de capa.

### Frontend
- Reaproveita design tokens existentes (navy + cyan)
- `react-markdown` + `remark-gfm` para renderizar conteúdo
- `prismjs` ou `rehype-highlight` (opcional) para syntax highlight
- `react-helmet-async` (instalar) para meta tags por rota
- JSON-LD Article + BreadcrumbList em cada post
- Editor admin: Textarea markdown com preview lado-a-lado (sem WYSIWYG complexo para já ir pra produção)

## SEO técnico
- `<title>`, `<meta description>`, canonical, og:image, og:title/description por post (Helmet)
- Sitemap dinâmico: substitui `public/sitemap.xml` por gerador `scripts/generate-sitemap.ts` que busca posts publicados via Supabase REST + lista rotas estáticas
- Schema.org `Article` por post + `BreadcrumbList`
- Links internos entre artigos relacionados (mesma categoria, manual via tags)
- `robots.txt` libera `/blog`, mantém `/lp-ads` com noindex
- Adiciona link "Blog" na nav principal do Index

## Os 10 artigos seed (PT-BR)

Baseados nos 3 PDFs anexados + benchmarks SwiftMR/Subtle/VX. Posts ~800-1500 palavras, com keywords planejadas pra busca BR.

1. **"Como a IA está acelerando a Ressonância Magnética em até 50%"** *(pilar — fonte: Deep Learning-Based Acceleration in MRI)*
2. **"Deep Learning na reconstrução de imagens de RM: o que mudou em 2025"** *(fonte: Current Status of AI-accelerated MRI)*
3. **"Evidências científicas das soluções comerciais de IA para RM"** *(fonte: Scientific evidence of commercial AI — overview SwiftMR, Subtle, etc.)*
4. **"ROI de IA em ressonância: quanto sua clínica pode ganhar"** *(persona gestor)*
5. **"SwiftMR vs Subtle Medical vs TurboMR: comparativo de softwares de IA para RM"** *(comparativo — keyword competidor)*
6. **"Como reduzir a fila de espera da Ressonância Magnética sem comprar equipamento novo"** *(persona gestor)*
7. **"Qualidade diagnóstica com aceleração por IA: o que dizem os radiologistas"** *(persona radiologista)*
8. **"Integração de softwares de IA ao PACS/DICOM: guia prático"** *(persona técnico)*
9. **"Anvisa, FDA e marcação CE: regulamentação de IA em radiologia no Brasil"** *(objeção comum)*
10. **"Conforto do paciente em RM: como exames mais rápidos mudam a experiência"** *(persona radiologista/operação)*

Cada post terá: capa (gerada com imagegen), excerpt SEO, 4-6 H2s, lista de fontes/referências quando aplicável, e CTA final para WhatsApp/`/lp-ads`.

## Autenticação (admin)
- Email/senha (sem signup público — só admin convidado)
- Página `/admin/login` simples
- Hook `useAuth` + `ProtectedRoute` que checa `has_role(auth.uid(), 'admin')`
- Botão "Sair"
- Auto-confirm email **ativado** na config (single-user admin, evita fricção)
- Após migração, instruir o usuário a se cadastrar uma vez e o sistema promove o **primeiro usuário a admin** (via trigger one-shot ou seed inicial — pergunto sobre o email dele abaixo)

## Entregáveis nessa execução
1. Migração SQL (auth tables + blog tables + RLS + storage bucket + trigger)
2. `react-helmet-async` instalado e configurado
3. Componentes: `BlogList`, `BlogPost`, `BlogCard`, `MarkdownRenderer`, `BlogAdminLayout`, `PostEditor`, `ProtectedRoute`, `useAuth`
4. Páginas: `/blog`, `/blog/:slug`, `/admin/login`, `/admin/blog`, `/admin/blog/novo`, `/admin/blog/editar/:id`
5. Sitemap dinâmico (gerador) cobrindo posts publicados
6. 10 posts seed inseridos via migração (markdown completo em cada um)
7. Link "Blog" adicionado à nav do Index
8. Robots.txt revisado

## Decisões automáticas (sem perguntar)
- **PT-BR** como idioma único do blog (público-alvo BR confirmado no briefing anterior)
- **Email/senha** para admin (sem Google OAuth — overkill para 1-2 admins)
- **Markdown** no editor (sem WYSIWYG — mais simples, mais robusto)
- **Imagens de capa** geradas com imagegen padronizadas para cada post (1200x630)

## Perguntas (mínimas)
1. **Qual o e-mail do admin** que será cadastrado? (vou seedar como admin no banco; senha você define no primeiro login via "esqueci a senha" ou pelo signup que ativo só dessa vez)
2. **Quer que eu já gere as 10 imagens de capa** (custa ~10 chamadas premium) ou prefere placeholders coloridos por categoria pra economizar?
