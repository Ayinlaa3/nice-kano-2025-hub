import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const BodySchema = z.object({
  id: z.string().uuid(),
  action: z.enum(["confirm", "reject"]),
  note: z.string().trim().max(500).optional().nullable(),
});

const FROM_EMAIL =
  Deno.env.get("CONFERENCE_FROM_EMAIL") ?? "NICE Conference <conference@nicehq.org>";
const SUPPORT_EMAIL = Deno.env.get("CONFERENCE_SUPPORT_EMAIL") ?? "conference@nicehq.org";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function sendEmail(to: string, subject: string, html: string) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) return;
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
    });
    if (!r.ok) console.error("resend failed", await r.text());
  } catch (e) {
    console.error("resend error", e);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const auth = req.headers.get("Authorization");
    if (!auth?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);
    const authClient = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
    const { data: claims, error: cErr } = await authClient.auth.getClaims(auth.replace("Bearer ", ""));
    if (cErr || !claims?.claims?.sub) return json({ error: "Unauthorized" }, 401);
    const userId = claims.claims.sub as string;

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: isAdmin } = await admin.rpc("is_admin_role", { _user_id: userId });
    if (!isAdmin) return json({ error: "Forbidden" }, 403);

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) return json({ error: "Invalid input" }, 400);
    const { id, action, note } = parsed.data;

    const { data: app } = await admin.from("conference_sponsorships").select("*").eq("id", id).maybeSingle();
    if (!app) return json({ error: "Application not found" }, 404);

    const now = new Date().toISOString();
    if (action === "reject") {
      await admin.from("conference_sponsorships").update({
        payment_status: "rejected", admin_note: note ?? null, verified_by: userId, verified_at: now, updated_at: now,
      }).eq("id", id);
      await sendEmail(app.contact_email, "Sponsorship payment could not be verified — NICE Conference 2026", `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
          <h2 style="color:#b91c1c;margin:0 0 8px">We could not verify your payment</h2>
          <p>Hello ${app.contact_name},</p>
          <p>We were unable to verify the payment receipt uploaded for application <strong>${app.application_no}</strong> (${app.org_name}).</p>
          ${note ? `<p><strong>Note from the secretariat:</strong> ${note}</p>` : ""}
          <p>Please reply to this email with proof of your transfer, or contact ${SUPPORT_EMAIL}.</p>
          <p>— NICE Conference Secretariat</p>
        </div>`);
      return json({ success: true, status: "rejected" });
    }

    await admin.from("conference_sponsorships").update({
      payment_status: "paid", paid_at: now, admin_note: note ?? app.admin_note ?? null,
      verified_by: userId, verified_at: now, updated_at: now,
    }).eq("id", id);

    const amount = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(Number(app.total_amount));
    const row = (k: string, v: string) =>
      `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px">${k}</td><td style="padding:6px 0;text-align:right;font-size:13px"><strong>${v}</strong></td></tr>`;
    await sendEmail(app.contact_email, `🎉 Payment confirmed — NICE Conference 2026 (${app.application_no})`, `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
        <h2 style="color:#0A7B34;margin:0 0 8px">🎉 Payment Confirmed — Thank You for Partnering!</h2>
        <p>Hello ${app.contact_name},</p>
        <p>Your bank transfer has been verified by the NICE secretariat. This email is your official receipt for the <strong>NICE 24th International Conference &amp; AGM 2026 (Lagos)</strong>.</p>
        <table style="width:100%;border-collapse:collapse;border-top:1px solid #e5e7eb;margin-top:12px">
          ${row("Application No", app.application_no)}
          ${row("Organisation", app.org_name)}
          ${row("Type", app.application_type)}
          ${app.package ? row("Package", app.package) : ""}
          ${app.booth_type ? row("Booth", app.booth_type) : ""}
          ${row("Amount paid", amount)}
          ${row("Payment method", "Bank transfer (verified)")}
          ${row("Status", "PAID")}
        </table>
        <p style="margin-top:20px"><strong>Venue:</strong> Academy Guest House &amp; Events Halls, Ikeja, Lagos<br/>
           <strong>Dates:</strong> 20–22 October 2026</p>
        <p style="font-size:12px;color:#6b7280">Our team will contact you about next steps. Questions? ${SUPPORT_EMAIL}</p>
        <p>— NICE Conference Secretariat</p>
      </div>`);

    return json({ success: true, status: "paid" });
  } catch (e) {
    console.error("admin-confirm-sponsorship error", e);
    return json({ error: "Unexpected error" }, 500);
  }
});
