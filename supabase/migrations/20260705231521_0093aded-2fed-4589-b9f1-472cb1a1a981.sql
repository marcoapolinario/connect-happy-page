
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS state text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS interest text,
  ADD COLUMN IF NOT EXISTS page_url text,
  ADD COLUMN IF NOT EXISTS referrer text,
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS utm_content text,
  ADD COLUMN IF NOT EXISTS utm_term text,
  ADD COLUMN IF NOT EXISTS gclid text,
  ADD COLUMN IF NOT EXISTS fbclid text,
  ADD COLUMN IF NOT EXISTS device text,
  ADD COLUMN IF NOT EXISTS browser text,
  ADD COLUMN IF NOT EXISTS user_agent text;

-- Ajusta a policy de INSERT para permitir os novos campos opcionais com limites de tamanho sensatos.
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;
CREATE POLICY "Anyone can submit a lead" ON public.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(trim(name)) BETWEEN 1 AND 120
    AND length(trim(email)) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(trim(role)) BETWEEN 1 AND 120
    AND length(trim(company)) BETWEEN 1 AND 200
    AND (message IS NULL OR length(message) <= 2000)
    AND (phone IS NULL OR length(phone) <= 40)
    AND (city IS NULL OR length(city) <= 120)
    AND (state IS NULL OR length(state) <= 120)
    AND (country IS NULL OR length(country) <= 120)
    AND (interest IS NULL OR length(interest) <= 200)
    AND (page_url IS NULL OR length(page_url) <= 500)
    AND (referrer IS NULL OR length(referrer) <= 500)
    AND (utm_source IS NULL OR length(utm_source) <= 200)
    AND (utm_medium IS NULL OR length(utm_medium) <= 200)
    AND (utm_campaign IS NULL OR length(utm_campaign) <= 200)
    AND (utm_content IS NULL OR length(utm_content) <= 200)
    AND (utm_term IS NULL OR length(utm_term) <= 200)
    AND (gclid IS NULL OR length(gclid) <= 200)
    AND (fbclid IS NULL OR length(fbclid) <= 200)
    AND (device IS NULL OR length(device) <= 40)
    AND (browser IS NULL OR length(browser) <= 80)
    AND (user_agent IS NULL OR length(user_agent) <= 500)
  );
