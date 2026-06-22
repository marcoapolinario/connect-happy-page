import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { fetchCategories, slugify, calcReadingMinutes, type BlogCategory } from "@/lib/blog";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { ArrowLeft, Save, Loader2, Eye, Edit } from "lucide-react";
import logo from "@/assets/turbomr-logo-upload.png";

const PostEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [tagsStr, setTagsStr] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    if (!isEdit || !id) return;
    supabase.from("blog_posts").select("*").eq("id", id).maybeSingle().then(({ data, error }) => {
      if (error || !data) {
        toast({ title: "Erro ao carregar", variant: "destructive" });
        navigate("/admin/blog");
        return;
      }
      setTitle(data.title);
      setSlug(data.slug);
      setExcerpt(data.excerpt);
      setContent(data.content_md);
      setCoverUrl(data.cover_image_url ?? "");
      setCategoryId(data.category_id ?? "");
      setTagsStr(data.tags.join(", "));
      setMetaTitle(data.meta_title ?? "");
      setMetaDesc(data.meta_description ?? "");
      setPublished(data.published);
      setLoading(false);
    });
  }, [id, isEdit, navigate, toast]);

  useEffect(() => {
    if (!isEdit && title && !slug) setSlug(slugify(title));
  }, [title, isEdit, slug]);

  const handleSave = async (publish?: boolean) => {
    if (!title.trim() || !slug.trim() || !excerpt.trim() || !content.trim()) {
      toast({ title: "Faltam campos", description: "Título, slug, resumo e conteúdo são obrigatórios.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const willPublish = publish ?? published;
    const tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);
    const payload = {
      title: title.trim(),
      slug: slugify(slug),
      excerpt: excerpt.trim(),
      content_md: content,
      cover_image_url: coverUrl.trim() || null,
      category_id: categoryId || null,
      tags,
      meta_title: metaTitle.trim() || null,
      meta_description: metaDesc.trim() || null,
      reading_minutes: calcReadingMinutes(content),
      published: willPublish,
      published_at: willPublish ? (published ? undefined : new Date().toISOString()) : null,
      author_id: user?.id ?? null,
    };

    const { error } = isEdit
      ? await supabase.from("blog_posts").update(payload).eq("id", id!)
      : await supabase.from("blog_posts").insert(payload);

    setSaving(false);
    if (error) return toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });

    toast({ title: isEdit ? "Atualizado!" : "Criado!", description: willPublish ? "Publicado" : "Salvo como rascunho" });
    navigate("/admin/blog");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{isEdit ? "Editar" : "Novo"} post — Admin TurboMR</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="border-b border-border bg-background/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/"><img src={logo} alt="TurboMR" className="h-10 w-auto" /></Link>
            <Button asChild size="sm" variant="ghost">
              <Link to="/admin/blog"><ArrowLeft className="w-4 h-4" /><span className="hidden sm:inline">Voltar</span></Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => setShowPreview((v) => !v)}>
              {showPreview ? <Edit className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden sm:inline">{showPreview ? "Editar" : "Preview"}</span>
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleSave(false)} disabled={saving}>
              <Save className="w-4 h-4" /><span className="hidden sm:inline">Rascunho</span>
            </Button>
            <Button size="sm" onClick={() => handleSave(true)} disabled={saving} className="bg-success text-success-foreground hover:bg-success/90">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publicar"}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">{isEdit ? "Editar post" : "Novo post"}</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <Card className="p-5 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL) *</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="h-11 rounded-xl font-mono text-sm" />
                <p className="text-xs text-muted-foreground">/blog/{slugify(slug || "novo-post")}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Resumo / Meta Description (até 200 chars) *</Label>
                <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} maxLength={200} rows={2} className="rounded-xl" />
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <Label htmlFor="content">Conteúdo (Markdown) *</Label>
                <span className="text-xs text-muted-foreground">{calcReadingMinutes(content)} min de leitura</span>
              </div>
              {showPreview ? (
                <div className="min-h-[500px] p-4 rounded-xl bg-muted/30 border border-border">
                  <MarkdownRenderer content={content || "*Escreva algo para ver o preview…*"} />
                </div>
              ) : (
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={24}
                  className="font-mono text-sm rounded-xl"
                  placeholder={`## Seu título H2\n\nSeu parágrafo. **Negrito**, *itálico*, [link](https://).\n\n### Subtítulo\n\n- Item de lista\n- Outro item\n\n> Quote importante`}
                />
              )}
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="p-5 space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Publicação</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="published">Publicado</Label>
                <Switch id="published" checked={published} onCheckedChange={setPublished} />
              </div>
            </Card>

            <Card className="p-5 space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Categorização</h3>
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Escolher…" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input id="tags" value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} className="h-11 rounded-xl" />
              </div>
            </Card>

            <Card className="p-5 space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Capa</h3>
              <div className="space-y-2">
                <Label htmlFor="cover">URL da imagem de capa</Label>
                <Input id="cover" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="https://..." className="h-11 rounded-xl" />
                {coverUrl && (
                  <img src={coverUrl} alt="Capa" className="w-full aspect-video object-cover rounded-lg mt-2" />
                )}
              </div>
            </Card>

            <Card className="p-5 space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">SEO Avançado</h3>
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title (opcional)</Label>
                <Input id="metaTitle" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} maxLength={60} className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDesc">Meta Description (opcional)</Label>
                <Textarea id="metaDesc" value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} maxLength={160} rows={2} className="rounded-xl" />
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostEditor;
