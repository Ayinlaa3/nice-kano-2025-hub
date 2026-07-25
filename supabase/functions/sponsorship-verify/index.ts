import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const BodySchema = z.object({ id: z.string().uuid() });

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

async function sendConfirmationEmail(opts: {
  toEmail: string;
  contactName: string;
  orgName: string;
  applicationNo: string;
  totalAmount: number;
}) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) return;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
      <h2 style="color:#0A7B34;margin:0 0 8px">Sponsorship Payment Confirmed</h2>
      <p>Dear ${opts.contactName},</p>
      <p>Thank you! We have received your payment of <strong>₦${opts.totalAmount.toLocaleString()}</strong>
      for <strong>${opts.orgName}</strong>'s sponsorship of the NICE International Conference &amp; AGM 2026 (Lagos).</p>
      <p><strong>Application No:</strong> ${opts.applicationNo}</p>
      <p>Our sponsorship desk will be in touch shortly with next steps and branding requirements.</p>
      <p>— NICE Conference Secretariat</p>
    </div>`;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "NICE Conference <conference@nicengineers.com>",
        to: [opts.toEmail],
        subject: `Sponsorship confirmed — ${opts.applicationNo}`,
        html,
      }),
    });
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

    const { data: row, error } = await supabase
      .from("conference_sponsorships")
      .select("id, remita_rrr, payment_status, application_no, org_name, contact_name, contact_email, total_amount, paid_at")
      .eq("id", id)
      .maybeSingle();
    if (error || !row) {
      return new Response(JSON.stringify({ error: "Application not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!row.remita_rrr) {
      return new Response(JSON.stringify({ error: "No Remita RRR on this application" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rrr = row.remita_rrr;
    const statusHash = await sha512Hex(`${rrr}${apiKey}${merchantId}`);
    const statusUrl = `${baseUrl}/remita/exapp/api/v1/send/api/echannelsvc/${merchantId}/${rrr}/${statusHash}/status.reg`;
    const resp = await fetch(statusUrl, { headers: { "Content-Type": "application/json" } });
    const text = await resp.text();
    let data: any;
    try {
      data = parseRemitaResponse(text);
    } catch {
      return new Response(JSON.stringify({ error: "Could not read Remita status" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const code = String(data?.status ?? "");
    const paid = code === "00" || String(data?.message ?? "").toLowerCase().includes("success");

    if (paid && row.payment_status !== "paid") {
      await supabase
        .from("conference_sponsorships")
        .update({ payment_status: "paid", paid_at: new Date().toISOString() })
        .eq("id", id);

      if (!row.confirmation_email_sent_at && row.contact_email) {
        await sendConfirmationEmail({
          toEmail: row.contact_email,
          contactName: row.contact_name ?? "Partner",
          orgName: row.org_name ?? "your organisation",
          applicationNo: row.application_no ?? "",
          totalAmount: Number(row.total_amount ?? 0),
        });
        await supabase
          .from("conference_sponsorships")
          .update({ confirmation_email_sent_at: new Date().toISOString() })
          .eq("id", id);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        paid,
        applicationNo: row.application_no,
        orgName: row.org_name,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("sponsorship-verify error", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
