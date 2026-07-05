import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Loader2, Users, TrendingUp, MessageCircle, Globe, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AdminNav } from "@/components/admin/AdminNav";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Lead {
  id: string;
  created_at: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  page_url: string | null;
  device: string | null;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("id, created_at, utm_source, utm_medium, utm_campaign, page_url, device")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (error) {
        toast({ title: "Erro ao carregar leads", description: error.message, variant: "destructive" });
      } else {
        setLeads((data ?? []) as Lead[]);
      }
      setLoading(false);
    })();
  }, [toast]);

  const stats = useMemo(() => {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const inLast = (ms: number) =>
      leads.filter((l) => now - new Date(l.created_at).getTime() < ms).length;
    return {
      total: leads.length,
      today: inLast(day),
      week: inLast(7 * day),
      month: inLast(30 * day),
    };
  }, [leads]);

  const sourceBreakdown = useMemo(() => {
    const map = new Map<string, number>();
    for (const l of leads) {
      const key = l.utm_source ?? "(direto/orgânico)";
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [leads]);

  const topPages = useMemo(() => {
    const map = new Map<string, number>();
    for (const l of leads) {
      if (!l.page_url) continue;
      try {
        const path = new URL(l.page_url).pathname;
        map.set(path, (map.get(path) ?? 0) + 1);
      } catch {
        /* ignore */
      }
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [leads]);

  const campaigns = useMemo(() => {
    const map = new Map<string, number>();
    for (const l of leads) {
      if (!l.utm_campaign) continue;
      map.set(l.utm_campaign, (map.get(l.utm_campaign) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [leads]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard — TurboMR Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button asChild variant="outline" size="sm">
            <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">
              Ver audiência no GA4 <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <KPI icon={<Users className="w-5 h-5" />} label="Leads totais" value={stats.total} />
              <KPI icon={<TrendingUp className="w-5 h-5" />} label="Hoje" value={stats.today} />
              <KPI icon={<MessageCircle className="w-5 h-5" />} label="7 dias" value={stats.week} />
              <KPI icon={<Globe className="w-5 h-5" />} label="30 dias" value={stats.month} />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Origem dos leads (utm_source)</h2>
                  <Link to="/admin/leads" className="text-xs text-primary hover:underline">
                    ver todos
                  </Link>
                </div>
                <BarList items={sourceBreakdown} total={stats.total} />
              </Card>

              <Card className="p-6">
                <h2 className="font-semibold mb-4">Top páginas de origem</h2>
                <BarList items={topPages} total={stats.total} />
              </Card>

              <Card className="p-6 lg:col-span-2">
                <h2 className="font-semibold mb-4">Campanhas (utm_campaign)</h2>
                {campaigns.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma campanha rastreada ainda. Assim que rodar tráfego pago com UTMs, aparece aqui.
                  </p>
                ) : (
                  <BarList items={campaigns} total={stats.total} />
                )}
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

const KPI = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <Card className="p-5">
    <div className="flex items-center justify-between">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
      <div className="text-primary">{icon}</div>
    </div>
    <div className="mt-2 text-3xl font-bold tabular-nums">{value}</div>
  </Card>
);

const BarList = ({ items, total }: { items: [string, number][]; total: number }) => {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Sem dados ainda.</p>;
  }
  const max = Math.max(...items.map(([, v]) => v), 1);
  return (
    <ul className="space-y-3">
      {items.map(([label, value]) => (
        <li key={label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="truncate max-w-[70%]" title={label}>
              {label}
            </span>
            <span className="tabular-nums text-muted-foreground">
              {value} <span className="text-xs">({total ? Math.round((value / total) * 100) : 0}%)</span>
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${(value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AdminDashboard;
