import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, Trash2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AdminNav } from "@/components/admin/AdminNav";
import { invalidatePageSeoCache } from "@/lib/pageSeo";

interface Row {
  id?: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  og_image: string;
  noindex: boolean;
}

const DEFAULT_PATHS = ["/", "/lp", "/lp-ads", "/blog"];

const AdminSeo = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("page_seo" as any)
      .select("*")
      .order("path");
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      setRows([]);
    } else {
      const existing = (data ?? []) as any[];
      const mapped: Row[] = existing.map((r) => ({
        id: r.id,
        path: r.path,
        title: r.title ?? "",
        description: r.description ?? "",
        keywords: (r.keywords ?? []).join(", "),
        og_image: r.og_image ?? "",
        noindex: !!r.noindex,
      }));
      // Suggest defaults for common paths that don't have a row yet.
      const paths = new Set(mapped.map((r) => r.path));
      for (const p of DEFAULT_PATHS) {
        if (!paths.has(p)) {
          mapped.push({ path: p, title: "", description: "", keywords: "", og_image: "", noindex: false });
        }
      }
      setRows(mapped);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async (row: Row, index: number) => {
    if (!row.path.trim()) {
      toast({ title: "Path obrigatório", variant: "destructive" });
      return;
    }
    setSaving(row.path);
    const payload = {
      path: row.path.trim(),
      title: row.title.trim() || null,
      description: row.description.trim() || null,
      keywords: row.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      og_image: row.og_image.trim() || null,
      noindex: row.noindex,
    };
    const { data, error } = await supabase
      .from("page_seo" as any)
      .upsert(payload, { onConflict: "path" })
      .select()
      .single();
    setSaving(null);
    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
      return;
    }
    invalidatePageSeoCache(row.path);
    setRows((rs) => rs.map((r, i) => (i === index ? { ...r, id: (data as any).id } : r)));
    toast({ title: "SEO salvo" });
  };

  const remove = async (row: Row, index: number) => {
    if (row.id) {
      if (!confirm(`Remover overrides de SEO para ${row.path}?`)) return;
      const { error } = await supabase.from("page_seo" as any).delete().eq("id", row.id);
      if (error) return toast({ title: "Erro", description: error.message, variant: "destructive" });
      invalidatePageSeoCache(row.path);
    }
    setRows((rs) => rs.filter((_, i) => i !== index));
    toast({ title: "Removido" });
  };

  const addNew = () => {
    setRows((rs) => [
      ...rs,
      { path: "", title: "", description: "", keywords: "", og_image: "", noindex: false },
    ]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Auto-SEO — TurboMR Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminNav />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Auto-SEO por rota</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sobrescreva Meta Title, Description, keywords, OG image e noindex por rota do site. Deixe em branco para usar os defaults do código.
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={addNew}>
            <Plus className="w-4 h-4" /> Nova rota
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            {rows.map((row, i) => (
              <Card key={row.id ?? `new-${i}`} className="p-5 space-y-3">
                <div className="grid sm:grid-cols-[1fr_auto] gap-3 items-start">
                  <div>
                    <Label>Caminho da rota</Label>
                    <Input
                      value={row.path}
                      onChange={(e) =>
                        setRows((rs) => rs.map((r, j) => (i === j ? { ...r, path: e.target.value } : r)))
                      }
                      placeholder="/exemplo"
                    />
                  </div>
                  <div className="flex items-end gap-2 pt-6">
                    <Label className="text-sm">noindex</Label>
                    <Switch
                      checked={row.noindex}
                      onCheckedChange={(v) =>
                        setRows((rs) => rs.map((r, j) => (i === j ? { ...r, noindex: v } : r)))
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label>Meta Title (≤60 chars ideal)</Label>
                  <Input
                    maxLength={120}
                    value={row.title}
                    onChange={(e) =>
                      setRows((rs) => rs.map((r, j) => (i === j ? { ...r, title: e.target.value } : r)))
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">{row.title.length} / 60 caracteres</p>
                </div>

                <div>
                  <Label>Meta Description (≤160 chars ideal)</Label>
                  <Textarea
                    maxLength={320}
                    rows={2}
                    value={row.description}
                    onChange={(e) =>
                      setRows((rs) => rs.map((r, j) => (i === j ? { ...r, description: e.target.value } : r)))
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">{row.description.length} / 160 caracteres</p>
                </div>

                <div>
                  <Label>Keywords (separadas por vírgula)</Label>
                  <Input
                    value={row.keywords}
                    onChange={(e) =>
                      setRows((rs) => rs.map((r, j) => (i === j ? { ...r, keywords: e.target.value } : r)))
                    }
                    placeholder="IA MRI, aceleração ressonância, TurboMR"
                  />
                </div>

                <div>
                  <Label>OG Image (URL absoluta)</Label>
                  <Input
                    value={row.og_image}
                    onChange={(e) =>
                      setRows((rs) => rs.map((r, j) => (i === j ? { ...r, og_image: e.target.value } : r)))
                    }
                    placeholder="https://…"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <Button variant="ghost" size="sm" onClick={() => remove(row, i)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" onClick={() => save(row, i)} disabled={saving === row.path}>
                    {saving === row.path ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Salvar
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

export default AdminSeo;
