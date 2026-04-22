import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BodySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  role: z.string().trim().min(1).max(120),
  company: z.string().trim().min(1).max(200),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  locale: z.string().max(20).nullable().optional(),
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

    // Lead já foi gravado no banco pelo cliente. Aqui registramos
    // a notificação para o time. O envio de email para
    // contato@turbomr.com será ativado assim que o domínio de
    // envio estiver verificado.
    console.log("[notify-lead] novo lead", {
      name: lead.name,
      email: lead.email,
      role: lead.role,
      company: lead.company,
      hasMessage: !!lead.message,
      locale: lead.locale ?? null,
      receivedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ ok: true, queuedEmail: false }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("[notify-lead] error", err);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
