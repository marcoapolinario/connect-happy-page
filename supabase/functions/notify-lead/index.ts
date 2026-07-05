import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const optStr = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal("")).or(z.null());

const BodySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  role: z.string().trim().min(1).max(120),
  company: z.string().trim().min(1).max(200),
  message: optStr(2000),
  locale: z.string().max(20).nullable().optional(),
  phone: optStr(40),
  city: optStr(120),
  state: optStr(120),
  country: optStr(120),
  interest: optStr(200),
  page_url: optStr(500),
  referrer: optStr(500),
  utm_source: optStr(200),
  utm_medium: optStr(200),
  utm_campaign: optStr(200),
  utm_content: optStr(200),
  utm_term: optStr(200),
  gclid: optStr(200),
  fbclid: optStr(200),
  device: optStr(40),
  browser: optStr(80),
  user_agent: optStr(500),
  // Honeypot — if filled, silently accept but do not log as lead.
  hp: optStr(200),
});

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const lead = parsed.data;

    // Honeypot triggered → look like success, but don't process.
    if (lead.hp && String(lead.hp).trim().length > 0) {
      console.log("[notify-lead] honeypot triggered — ignored");
      return new Response(JSON.stringify({ ok: true, queuedEmail: false }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Lead is persisted by the client in Supabase. Here we notify the team.
    // Resend delivery will be enabled once the sending domain is verified.
    console.log("[notify-lead] novo lead", {
      name: lead.name,
      email: lead.email,
      role: lead.role,
      company: lead.company,
      hasMessage: !!lead.message,
      locale: lead.locale ?? null,
      utm_source: lead.utm_source ?? null,
      utm_medium: lead.utm_medium ?? null,
      utm_campaign: lead.utm_campaign ?? null,
      gclid: lead.gclid ?? null,
      fbclid: lead.fbclid ?? null,
      device: lead.device ?? null,
      page_url: lead.page_url ?? null,
      receivedAt: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ ok: true, queuedEmail: false }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[notify-lead] error", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
