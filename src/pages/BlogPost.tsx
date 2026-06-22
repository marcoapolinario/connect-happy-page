import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { Loader2, Clock, ArrowLeft, MessageCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogLayout } from "@/components/blog/BlogLayout";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { BlogCard } from "@/components/blog/BlogCard";
import { fetchPostBySlug, fetchPublishedPosts, type BlogPostWithCategory } from "@/lib/blog";

const SITE_URL = "https://connect-happy-page.lovable.app";
const WHATSAPP = "551153043453";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostWithCategory | null>(null);
  const [related, setRelated] = useState<BlogPostWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);
    fetchPostBySlug(slug)
      .then(async (p) => {
        if (!p) {
          setNotFound(true);
          return;
        }
        setPost(p);
        const all = await fetchPublishedPosts({ limit: 12 });
        setRelated(
          all
            .filter((x) => x.id !== p.id && x.blog_categories?.slug === p.blog_categories?.slug)
            .slice(0, 3)
        );
        window.scrollTo(0, 0);
      })
      .catch((e) => console.error("[blog-post]", e))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <BlogLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </BlogLayout>
    );
  }

  if (notFound || !post) {
    return (
      <BlogLayout>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-3">Artigo não encontrado</h1>
          <Button asChild className="mt-6">
            <Link to="/blog"><ArrowLeft className="w-4 h-4" /> Voltar ao blog</Link>
          </Button>
        </div>
      </BlogLayout>
    );
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    : "";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image_url || undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: "TurboMR" },
    publisher: {
      "@type": "Organization",
      name: "TurboMR",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <BlogLayout>
      <Helmet>
        <title>{title} | TurboMR</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        {post.cover_image_url && <meta property="og:image" content={post.cover_image_url} />}
        <meta name="twitter:card" content="summary_large_image" />
        {post.cover_image_url && <meta name="twitter:image" content={post.cover_image_url} />}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
          <nav className="text-xs text-muted-foreground mb-5">
            <Link to="/" className="hover:text-primary">Home</Link> /{" "}
            <Link to="/blog" className="hover:text-primary">Blog</Link>
            {post.blog_categories && (
              <>
                {" / "}
                <span>{post.blog_categories.name}</span>
              </>
            )}
          </nav>
          {post.blog_categories && (
            <span className="status-pill mb-4">{post.blog_categories.name}</span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 tracking-tight">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-5">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {date}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.reading_minutes} min</span>
          </div>
        </div>
      </section>

      {/* Capa */}
      {post.cover_image_url && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-2xl border border-border/50 shadow-elegant"
          />
        </div>
      )}

      {/* Conteúdo */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <MarkdownRenderer content={post.content_md} />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
            {post.tags.map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl gradient-hero border border-primary/30 text-center">
          <h3 className="text-2xl font-bold mb-3">Quer ver o TurboMR na sua clínica?</h3>
          <p className="text-muted-foreground mb-5">
            Aumente em até 2x os exames/dia sem trocar o equipamento.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-success text-success-foreground hover:bg-success/90">
              <a href={`https://wa.me/${WHATSAPP}?text=Vim%20do%20artigo%20${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/lp-ads">Conhecer a solução</Link>
            </Button>
          </div>
        </div>
      </article>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="border-t border-border py-12 bg-muted/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold mb-6">Leia também</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => <BlogCard key={p.id} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </BlogLayout>
  );
};

export default BlogPostPage;
