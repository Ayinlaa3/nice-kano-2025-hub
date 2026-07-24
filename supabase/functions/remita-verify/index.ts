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

async function sendTicketEmail(opts: {
  toEmail: string;
  toName: string;
  ticketCode: string;
  category: string;
  daysAttending: string[] | null;
}) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) {
    console.warn("RESEND_API_KEY not set; skipping email");
    return;
  }
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&data=${encodeURIComponent(opts.ticketCode)}`;
  const days = (opts.daysAttending ?? []).map((d) => `Day ${d}`).join(", ") || "All days";
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
      <h2 style="color:#0A7B34;margin:0 0 8px">NICE Conference 2026 — Ticket Confirmed</h2>
      <p>Hello ${opts.toName},</p>
      <p>Your payment has been received and your registration is confirmed. Present this ticket (QR code) at check-in.</p>
      <div style="text-align:center;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin:20px 0">
        <img src="${qrUrl}" alt="Ticket QR" width="220" height="220" style="display:block;margin:0 auto" />
        <p style="font-family:monospace;font-size:20px;letter-spacing:2px;margin:12px 0 0;color:#0A7B34"><strong>${opts.ticketCode}</strong></p>
        <p style="font-size:12px;color:#6b7280;margin:4px 0 0">Your ticket code</p>
      </div>
      <p><strong>Category:</strong> ${opts.category}<br/>
         <strong>Days attending:</strong> ${days}</p>
      <p style="font-size:12px;color:#6b7280">If you have any questions, reply to this email or contact conference@nicengineers.com.</p>
      <p>See you in Lagos!<br/>— NICE Conference Secretariat</p>
    </div>`;
  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "NICE Conference <conference@nicengineers.com>",
        to: [opts.toEmail],
        subject: `Your NICE Conference 2026 Ticket — ${opts.ticketCode}`,
        html,
      }),
    });
    if (!resp.ok) {
      console.error("resend failed", await resp.text());
    }
  } catch (e) {
    console.error("resend error", e);
  }
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
      .select("id, remita_rrr, remita_reference, payment_status, ticket_code, full_name, email, phone, organization, institution, category, days_attending, amount, verified_at, created_at")
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
    const paid = code === "00" || String(data?.message ?? "").toLowerCase().includes("success");

    if (paid && reg.payment_status !== "paid") {
      await supabase
        .from("conference_registrations")
        .update({
          payment_status: "paid",
          verified_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (reg.ticket_code && reg.email) {
        await sendTicketEmail({
          toEmail: reg.email,
          toName: reg.full_name ?? "Delegate",
          ticketCode: reg.ticket_code,
          category: reg.category ?? "",
          daysAttending: (reg.days_attending as string[] | null) ?? null,
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        paid,
        status: code,
        message: data?.message ?? null,
        ticketCode: reg.ticket_code,
        daysAttending: reg.days_attending,
      }),
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
