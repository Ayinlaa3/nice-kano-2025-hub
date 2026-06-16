import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const BodySchema = z.object({
  id: z.string().uuid(),
});

async function sha512Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-512", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function parseRemitaResponse(text: string): any {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Unexpected Remita response");
  return JSON.parse(text.slice(start, end + 1));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { id } = parsed.data;

    const baseUrl = Deno.env.get("REMITA_BASE_URL")!.replace(/\/$/, "");
    const merchantId = Deno.env.get("REMITA_MERCHANT_ID")!;
    const apiKey = Deno.env.get("REMITA_API_KEY")!;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: reg, error } = await supabase
      .from("conference_registrations")
      .select("id, remita_rrr, payment_status")
      .eq("id", id)
      .maybeSingle();
    if (error || !reg) {
      return new Response(JSON.stringify({ error: "Registration not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!reg.remita_rrr) {
      return new Response(JSON.stringify({ error: "No Remita RRR on this registration" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rrr = reg.remita_rrr;
    const statusHash = await sha512Hex(`${rrr}${apiKey}${merchantId}`);
    const statusUrl = `${baseUrl}/remita/exapp/api/v1/send/api/echannelsvc/${merchantId}/${rrr}/${statusHash}/status.reg`;
    const resp = await fetch(statusUrl, { headers: { "Content-Type": "application/json" } });
    const text = await resp.text();
    let data: any;
    try {
      data = parseRemitaResponse(text);
    } catch {
      console.error("remita status parse error", text);
      return new Response(JSON.stringify({ error: "Could not read Remita status" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const code = String(data?.status ?? "");
    // "00" = successful, "01" = pending, others = failed
    const paid = code === "00" || String(data?.message ?? "").toLowerCase().includes("success");

    if (paid && reg.payment_status !== "paid") {
      await supabase
        .from("conference_registrations")
        .update({ payment_status: "paid", verified_at: new Date().toISOString() })
        .eq("id", id);
    }

    return new Response(
      JSON.stringify({ success: true, paid, status: code, message: data?.message ?? null }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("remita-verify error", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
