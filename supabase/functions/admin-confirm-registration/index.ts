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

const money = (n: number | null) =>
  n == null
    ? "—"
    : new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(n);

async function sendEmail(opts: { toEmail: string; subject: string; html: string }) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) {
    console.warn("RESEND_API_KEY not set; skipping email");
    return;
  }
  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [opts.toEmail],
        subject: opts.subject,
        html: opts.html,
      }),
    });
    if (!resp.ok) console.error("resend failed", await resp.text());
  } catch (e) {
    console.error("resend error", e);
  }
}

function ticketHtml(opts: {
  toName: string;
  toEmail: string;
  ticketCode: string;
  category: string;
  daysAttending: string[] | null;
  amount: number | null;
  confirmedAt: string;
}) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&data=${encodeURIComponent(opts.ticketCode)}`;
  const days = (opts.daysAttending ?? []).map((d) => `Day ${d}`).join(", ") || "All days";
  const confirmedOn = new Date(opts.confirmedAt).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px">${k}</td><td style="padding:6px 0;text-align:right;font-size:13px"><strong>${v}</strong></td></tr>`;
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
      <h2 style="color:#0A7B34;margin:0 0 8px">🎉 Payment Confirmed — You're In!</h2>
      <p>Hello ${opts.toName},</p>
      <p>Your bank transfer has been verified by the NICE secretariat and your registration for the <strong>NICE 24th International Conference &amp; AGM 2026 (Lagos)</strong> is now confirmed. This email is your official receipt and entry badge — present the QR code below at check-in.</p>

      <div style="text-align:center;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin:20px 0">
        <img src="${qrUrl}" alt="Ticket QR code" width="220" height="220" style="display:block;margin:0 auto" />
        <p style="font-family:monospace;font-size:20px;letter-spacing:2px;margin:12px 0 0;color:#0A7B34"><strong>${opts.ticketCode}</strong></p>
        <p style="font-size:12px;color:#6b7280;margin:4px 0 0">Your ticket code — scanned at entry</p>
      </div>

      <h3 style="font-size:15px;margin:24px 0 4px">Payment receipt</h3>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #e5e7eb">
        ${row("Receipt reference", opts.ticketCode)}
        ${row("Delegate", opts.toName)}
        ${row("Email", opts.toEmail)}
        ${row("Category", opts.category)}
        ${row("Amount paid", money(opts.amount))}
        ${row("Payment method", "Bank transfer (verified)")}
        ${row("Confirmed on", confirmedOn)}
        ${row("Status", "PAID")}
      </table>

      <p style="margin-top:20px"><strong>Days attending:</strong> ${days}<br/>
         <strong>Venue:</strong> Academy Guest House &amp; Events Halls, Ikeja, Lagos<br/>
         <strong>Dates:</strong> 20–22 October 2026</p>
      <p style="font-size:12px;color:#6b7280">Questions? Reply to this email or contact ${SUPPORT_EMAIL}.</p>
      <p>See you in Lagos!<br/>— NICE Conference Secretariat</p>
    </div>`;
}

function rejectedHtml(opts: { toName: string; note: string | null }) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
      <h2 style="color:#b91c1c;margin:0 0 8px">We could not verify your payment</h2>
      <p>Hello ${opts.toName},</p>
      <p>We were unable to verify the payment receipt you uploaded for the NICE 24th International Conference &amp; AGM 2026.</p>
      ${opts.note ? `<p><strong>Note from the secretariat:</strong> ${opts.note}</p>` : ""}
      <p>Please reply to this email with proof of your transfer, or register again and pay via Remita for instant confirmation.</p>
      <p style="font-size:12px;color:#6b7280">Support: ${SUPPORT_EMAIL}</p>
      <p>— NICE Conference Secretariat</p>
    </div>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

    const token = authHeader.replace("Bearer ", "");
    const authClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
    );
    const { data: claims, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || !claims?.claims?.sub) return json({ error: "Unauthorized" }, 401);
    const userId = claims.claims.sub as string;

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: isAdmin, error: roleError } = await admin.rpc("is_admin_role", {
      _user_id: userId,
    });
    if (roleError || !isAdmin) return json({ error: "Forbidden" }, 403);

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return json({ error: "Invalid input", details: parsed.error.flatten().fieldErrors }, 400);
    }
    const { id, action, note } = parsed.data;

    const { data: reg, error: regError } = await admin
      .from("conference_registrations")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (regError || !reg) return json({ error: "Registration not found" }, 404);

    const now = new Date().toISOString();

    if (action === "reject") {
      await admin
        .from("conference_registrations")
        .update({
          payment_status: "rejected",
          status: "rejected",
          admin_note: note ?? null,
          verified_by: userId,
          verified_at: now,
        })
        .eq("id", id);

      if (reg.email) {
        await sendEmail({
          toEmail: reg.email,
          subject: "Payment could not be verified — NICE Conference 2026",
          html: rejectedHtml({ toName: reg.full_name ?? "Delegate", note: note ?? null }),
        });
      }
      return json({ success: true, status: "rejected" });
    }

    await admin
      .from("conference_registrations")
      .update({
        payment_status: "paid",
        status: "confirmed",
        admin_note: note ?? reg.admin_note ?? null,
        verified_by: userId,
        verified_at: now,
      })
      .eq("id", id);

    let emailed = false;
    if (reg.email && reg.ticket_code && !reg.success_email_sent_at) {
      await sendEmail({
        toEmail: reg.email,
        subject: `🎉 You're in! NICE Conference 2026 — Ticket ${reg.ticket_code}`,
        html: ticketHtml({
          toName: reg.full_name ?? "Delegate",
          toEmail: reg.email,
          ticketCode: reg.ticket_code,
          category: reg.category ?? "",
          daysAttending: (reg.days_attending as string[] | null) ?? null,
          amount: reg.amount != null ? Number(reg.amount) : null,
          confirmedAt: now,
        }),
      });
      await admin
        .from("conference_registrations")
        .update({ success_email_sent_at: now })
        .eq("id", id);
      emailed = true;
    }

    return json({ success: true, status: "paid", emailed, ticketCode: reg.ticket_code });
  } catch (e) {
    console.error("admin-confirm-registration error", e);
    return json({ error: "Unexpected error" }, 500);
  }
});
