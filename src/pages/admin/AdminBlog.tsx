import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllPostsAdmin, type BlogPostWithCategory } from "@/lib/blog";
import {
  Plus, Edit, Trash2, Eye, EyeOff, LogOut, Loader2, Search, ExternalLink,
} from "lucide-react";
import logo from "@/assets/turbomr-logo-upload.png";

const AdminBlog = () => {
  const { signOut, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPostWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchAllPostsAdmin();
      setPosts(data);
    } catch (e: any) {
      toast({ title: "Erro ao carregar", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const togglePublish = async (post: BlogPostWithCategory) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({
        published: !post.published,
        published_at: !post.published ? new Date().toISOString() : post.published_at,
      })
      .eq("id", post.id);
    if (error) return toast({ title: "Erro", description: error.message, variant: "destructive" });
    toast({ title: post.published ? "Despublicado" : "Publicado!" });
    load();
  };

  const remove = async (post: BlogPostWithCategory) => {
    if (!confirm(`Apagar "${post.title}"? Esta ação não pode ser desfeita.`)) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", post.id);
    if (error) return toast({ title: "Erro", description: error.message, variant: "destructive" });
    toast({ title: "Apagado" });
    load();
  };

  const filtered = posts.filter(
    (p) => !search || p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Blog — TurboMR</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="border-b border-border bg-background/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/"><img src={logo} alt="TurboMR" className="h-10 w-auto" /></Link>
            <span className="text-sm text-muted-foreground hidden sm:inline">/ Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden md:inline">{user?.email}</span>
            <Button size="sm" variant="ghost" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Posts do Blog</h1>
            <p className="text-sm text-muted-foreground">{posts.length} artigo(s) no total</p>
          </div>
          <Button asChild>
            <Link to="/admin/blog/novo"><Plus className="w-4 h-4" /> Novo post</Link>
          </Button>
        </div>

        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-11 rounded-xl max-w-md"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <Card className="p-12 text-center text-muted-foreground">
            Nenhum post. <Link to="/admin/blog/novo" className="text-primary hover:underline">Criar o primeiro</Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => (
              <Card key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded " +
                        (p.published ? "bg-success/15 text-success" : "bg-muted text-muted-foreground")
                      }
                    >
                      {p.published ? "Publicado" : "Rascunho"}
                    </span>
                    {p.blog_categories && (
                      <span className="text-[10px] text-muted-foreground">{p.blog_categories.name}</span>
                    )}
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(p.updated_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <h3 className="font-bold truncate">{p.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">/{p.slug}</p>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  {p.published && (
                    <Button asChild size="sm" variant="ghost">
                      <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => togglePublish(p)} title={p.published ? "Despublicar" : "Publicar"}>
                    {p.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button asChild size="sm" variant="ghost">
                    <Link to={`/admin/blog/editar/${p.id}`}><Edit className="w-4 h-4" /></Link>
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => remove(p)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminBlog;
