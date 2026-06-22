import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { BlogPostWithCategory } from "@/lib/blog";

const FALLBACK_GRADIENTS: Record<string, string> = {
  "tecnologia-ia": "from-primary/30 via-accent/20 to-primary/10",
  "gestao-clinica": "from-success/30 via-primary/20 to-accent/10",
  "qualidade-diagnostica": "from-accent/30 via-primary/20 to-success/10",
  "regulamentacao": "from-primary/20 via-muted to-primary/10",
};

export const BlogCard = ({ post }: { post: BlogPostWithCategory }) => {
  const catSlug = post.blog_categories?.slug ?? "tecnologia-ia";
  const fallback = FALLBACK_GRADIENTS[catSlug] ?? FALLBACK_GRADIENTS["tecnologia-ia"];
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    : "";

  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <Card className="overflow-hidden h-full border-border/50 hover-lift bg-card">
        <div className="relative aspect-video overflow-hidden">
          {post.cover_image_url ? (
            <img
              src={post.cover_image_url}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${fallback} grid-pattern`} />
          )}
          {post.blog_categories && (
            <span className="absolute top-3 left-3 status-pill">
              {post.blog_categories.name}
            </span>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span>{date}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.reading_minutes} min
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              Ler <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
