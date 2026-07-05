
-- Auto-SEO por rota
CREATE TABLE public.page_seo (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  keywords TEXT[] NOT NULL DEFAULT '{}',
  og_image TEXT,
  schema_json JSONB,
  noindex BOOLEAN NOT NULL DEFAULT FALSE,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.page_seo TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_seo TO authenticated;
GRANT ALL ON public.page_seo TO service_role;

ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;

-- Leitura pública para o site aplicar os overrides
CREATE POLICY "Anyone can read page_seo" ON public.page_seo
  FOR SELECT USING (true);

CREATE POLICY "Admins manage page_seo" ON public.page_seo
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_page_seo_updated_at
  BEFORE UPDATE ON public.page_seo
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Acesso admin à tabela de leads (dashboard interno)
CREATE POLICY "Admins can read leads" ON public.leads
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads" ON public.leads
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads" ON public.leads
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
