import { useEffect, useState } from "react";
import { fetchPageSeo, type PageSeoRow } from "@/lib/pageSeo";

/** Loads override SEO row for the given path (null while loading / when absent). */
export const usePageSeo = (path: string) => {
  const [seo, setSeo] = useState<PageSeoRow | null>(null);

  useEffect(() => {
    let alive = true;
    fetchPageSeo(path).then((row) => {
      if (alive) setSeo(row);
    });
    return () => {
      alive = false;
    };
  }, [path]);

  return seo;
};
