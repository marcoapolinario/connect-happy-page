import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { BlogLayout } from "@/components/blog/BlogLayout";
import { BlogCard } from "@/components/blog/BlogCard";
import { fetchPublishedPosts, fetchCategories, type BlogPostWithCategory, type BlogCategory } from "@/lib/blog";

const SITE_URL = "https://connect-happy-page.lovable.app";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPostWithCategory[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([fetchPublishedPosts(), fetchCategories()])
      .then(([p, c]) => {
        setPosts(p);
        setCategories(c);
      })
      .catch((e) => console.error("[blog]", e))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let out = posts;
    if (activeCat) out = out.filter((p) => p.blog_categories?.slug === activeCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return out;
  }, [posts, activeCat, search]);

  return (
    <BlogLayout>
      <Helmet>
        <title>Blog TurboMR — IA para Ressonância Magnética</title>
        <meta
          name="description"
          content="Artigos, guias e estudos sobre inteligência artificial aplicada à Ressonância Magnética: aceleração, qualidade de imagem, ROI e regulamentação."
        />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:title" content="Blog TurboMR — IA para Ressonância Magnética" />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="gradient-hero py-14 lg:py-20 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="status-pill mb-4"><span className="live-dot" /> Conteúdo técnico e estratégico</span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Blog <span className="gradient-text">TurboMR</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tudo sobre IA aplicada à Ressonância Magnética — para gestores, radiologistas e equipes técnicas.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-stretch md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar artigos…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-11 rounded-xl"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant={!activeCat ? "default" : "outline"} onClick={() => setActiveCat(null)}>
                Todas
              </Button>
              {categories.map((c) => (
                <Button
                  key={c.slug}
                  size="sm"
                  variant={activeCat === c.slug ? "default" : "outline"}
                  onClick={() => setActiveCat(c.slug)}
                >
                  {c.name}
                </Button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              Nenhum artigo encontrado.{" "}
              <Link to="/blog" className="text-primary hover:underline">
                Ver todos
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </BlogLayout>
  );
};

export default Blog;
