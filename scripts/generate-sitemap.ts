// Executa antes de `vite dev` e `vite build` (predev/prebuild); escreve public/sitemap.xml.
// Inclui rotas estáticas + posts publicados do blog.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://connect-happy-page.lovable.app";
const SUPABASE_URL = "https://uqmxjwkceokrayuoavxc.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxbXhqd2tjZW9rcmF5dW9hdnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4Mjk0MDYsImV4cCI6MjA5MjQwNTQwNn0.fmBdzbJj0xBSQV0GJwrySIrIDyqtOU3YK4Q6h_a8J68";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/lp", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "daily", priority: "0.9" },
];

async function fetchBlogEntries(): Promise<SitemapEntry[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,updated_at&published=eq.true&order=published_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    );
    if (!res.ok) {
      console.warn(`[sitemap] failed to fetch posts: ${res.status}`);
      return [];
    }
    const posts = (await res.json()) as Array<{ slug: string; updated_at: string }>;
    return posts.map((p) => ({
      path: `/blog/${p.slug}`,
      lastmod: new Date(p.updated_at).toISOString().slice(0, 10),
      changefreq: "monthly" as const,
      priority: "0.8",
    }));
  } catch (err) {
    console.warn("[sitemap] error fetching posts:", err);
    return [];
  }
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

async function main() {
  const blogEntries = await fetchBlogEntries();
  const all = [...staticEntries, ...blogEntries];
  writeFileSync(resolve("public/sitemap.xml"), generateSitemap(all));
  console.log(`sitemap.xml written (${all.length} entries — ${blogEntries.length} posts)`);
}

main();
