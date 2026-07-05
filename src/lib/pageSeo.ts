// Auto-SEO: override per-route SEO from the page_seo table.
import { supabase } from "@/integrations/supabase/client";

export interface PageSeoRow {
  id: string;
  path: string;
  title: string | null;
  description: string | null;
  keywords: string[];
  og_image: string | null;
  schema_json: unknown | null;
  noindex: boolean;
  updated_at: string;
}

const cache = new Map<string, PageSeoRow | null>();

export const fetchPageSeo = async (path: string): Promise<PageSeoRow | null> => {
  if (cache.has(path)) return cache.get(path)!;
  const { data, error } = await supabase
    .from("page_seo" as any)
    .select("*")
    .eq("path", path)
    .maybeSingle();
  if (error) {
    cache.set(path, null);
    return null;
  }
  cache.set(path, (data as unknown as PageSeoRow) ?? null);
  return (data as unknown as PageSeoRow) ?? null;
};

export const invalidatePageSeoCache = (path?: string) => {
  if (path) cache.delete(path);
  else cache.clear();
};
