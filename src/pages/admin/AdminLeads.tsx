import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Download, Trash2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AdminNav } from "@/components/admin/AdminNav";

interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  role: string;
  company: string;
  phone: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  interest: string | null;
  message: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
  page_url: string | null;
  referrer: string | null;
  device: string | null;
  browser: string | null;
  locale: string | null;
}

const CSV_COLUMNS: (keyof Lead)[] = [
  "created_at","name","email","role","company","phone","city","state","country",
  "interest","message","utm_source","utm_medium","utm_campaign","utm_content","utm_term",
  "gclid","fbclid","page_url","referrer","device","browser","locale",
];

const csvEscape = (v: unknown) => {
  if (v === null || v === undefined) return "";
  const s = String(v).replace(/"/g, '""');
  return /[",\n\r]/.test(s) ? `"${s}"` : s;
};

const AdminLeads = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2000);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      setLeads((data ?? []) as Lead[]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    if (!search) return leads;
    const s = search.toLowerCase();
    return leads.filter((l) =>
      [l.name, l.email, l.company, l.utm_source, l.utm_campaign]
        .some((f) => f?.toLowerCase().includes(s))
    );
  }, [leads, search]);

  const exportCsv = () => {
    const header = CSV_COLUMNS.join(",");
    const rows = filtered.map((l) =>
      CSV_COLUMNS.map((c) => csvEscape(l[c])).join(",")
    );
    const blob = new Blob([`\uFEFF${header}\n${rows.join("\n")}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `turbomr-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const remove = async (l: Lead) => {
    if (!confirm(`Apagar lead ${l.email}?`)) return;
    const { error } = await supabase.from("leads").delete().eq("id", l.id);
    if (error) return toast({ title: "Erro", description: error.message, variant: "destructive" });
    toast({ title: "Lead apagado" });
    load();
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Leads — TurboMR Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">Leads <span className="text-muted-foreground text-base font-normal">({filtered.length})</span></h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nome, empresa, UTM…"
                className="pl-8 w-64"
              />
            </div>
            <Button size="sm" onClick={exportCsv} disabled={filtered.length === 0}>
              <Download className="w-4 h-4" /> Exportar CSV
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              Nenhum lead ainda. Assim que alguém enviar formulário, aparece aqui.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="p-3 font-medium">Data</th>
                    <th className="p-3 font-medium">Nome</th>
                    <th className="p-3 font-medium">Empresa</th>
                    <th className="p-3 font-medium">Email</th>
                    <th className="p-3 font-medium">Origem</th>
                    <th className="p-3 font-medium">Campanha</th>
                    <th className="p-3 font-medium">Página</th>
                    <th className="p-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr key={l.id} className="border-t border-border hover:bg-muted/30">
                      <td className="p-3 whitespace-nowrap text-muted-foreground text-xs">
                        {new Date(l.created_at).toLocaleString("pt-BR")}
                      </td>
                      <td className="p-3 font-medium">{l.name}</td>
                      <td className="p-3">{l.company}</td>
                      <td className="p-3">
                        <a href={`mailto:${l.email}`} className="text-primary hover:underline">
                          {l.email}
                        </a>
                      </td>
                      <td className="p-3 text-xs">
                        {l.utm_source ?? <span className="text-muted-foreground">—</span>}
                        {l.utm_medium ? ` / ${l.utm_medium}` : ""}
                      </td>
                      <td className="p-3 text-xs">
                        {l.utm_campaign ?? <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="p-3 text-xs max-w-[220px] truncate" title={l.page_url ?? ""}>
                        {l.page_url ?? <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="sm" onClick={() => remove(l)} aria-label="Apagar">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default AdminLeads;
