import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const BodySchema = z.object({
  id: z.string().uuid(),
});

// Remita status codes considered "still pending" (payment not yet completed but not failed)
const PENDING_CODES = new Set(["", "021", "025", "041"]);

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
        from: "NICE Conference <conference@nicengineers.com>",
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

function successHtml(opts: {
  toName: string;
  ticketCode: string;
  category: string;
  daysAttending: string[] | null;
}) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&data=${encodeURIComponent(opts.ticketCode)}`;
  const days = (opts.daysAttending ?? []).map((d) => `Day ${d}`).join(", ") || "All days";
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
      <h2 style="color:#0A7B34;margin:0 0 8px">🎉 Congratulations — Registration Confirmed!</h2>
      <p>Hello ${opts.toName},</p>
      <p>Your payment has been received and your registration for the <strong>NICE 24th International Conference &amp; AGM 2026 (Lagos)</strong> is confirmed. Present this ticket (QR code) at check-in.</p>
      <div style="text-align:center;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin:20px 0">
        <img src="${qrUrl}" alt="Ticket QR" width="220" height="220" style="display:block;margin:0 auto" />
        <p style="font-family:monospace;font-size:20px;letter-spacing:2px;margin:12px 0 0;color:#0A7B34"><strong>${opts.ticketCode}</strong></p>
        <p style="font-size:12px;color:#6b7280;margin:4px 0 0">Your ticket code</p>
      </div>
      <p><strong>Category:</strong> ${opts.category}<br/>
         <strong>Days attending:</strong> ${days}<br/>
         <strong>Venue:</strong> Academy Guest House &amp; Events Halls, Ikeja, Lagos<br/>
         <strong>Dates:</strong> 20–22 October 2026</p>
      <p style="font-size:12px;color:#6b7280">Questions? Reply to this email or contact conference@nicengineers.com.</p>
      <p>See you in Lagos!<br/>— NICE Conference Secretariat</p>
    </div>`;
}

function pendingHtml(opts: {
  toName: string;
  rrr: string;
  amount: number | null;
  verifyUrl: string;
}) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
      <h2 style="color:#B45309;margin:0 0 8px">⏳ Complete Your Conference Payment</h2>
      <p>Hello ${opts.toName},</p>
      <p>We've reserved your slot for the <strong>NICE 24th International Conference &amp; AGM 2026</strong>, but your payment of <strong>${money(opts.amount)}</strong> has not been confirmed yet.</p>
      <div style="border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin:20px 0;background:#fffbeb">
        <p style="margin:0 0 6px;font-size:13px;color:#6b7280">Your Remita Retrieval Reference (RRR):</p>
        <p style="font-family:monospace;font-size:22px;letter-spacing:2px;margin:0;color:#B45309"><strong>${opts.rrr}</strong></p>
      </div>
      <p>You can complete your payment in two ways:</p>
      <ol>
        <li><strong>Online</strong> — Pay with a debit card, USSD or bank transfer on the Remita portal.</li>
        <li><strong>At any bank</strong> — Walk into any Nigerian bank branch and give the teller this RRR to pay.</li>
      </ol>
      <p>Once payment is done, click the button below to verify. As soon as Remita confirms your payment, your ticket &amp; QR code will be emailed to you automatically and your name will appear on the delegate list.</p>
      <p style="text-align:center;margin:24px 0">
        <a href="${opts.verifyUrl}" style="background:#0A7B34;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600;display:inline-block">Verify My Payment</a>
      </p>
      <p style="font-size:12px;color:#6b7280">Or paste this link in your browser:<br/>${opts.verifyUrl}</p>
      <p style="font-size:12px;color:#6b7280">Need help? Reply to this email or contact conference@nicengineers.com.</p>
      <p>— NICE Conference Secretariat</p>
    </div>`;
}

function failedHtml(opts: { toName: string; amount: number | null; rrr: string; retryUrl: string }) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
      <h2 style="color:#B91C1C;margin:0 0 8px">Payment Unsuccessful</h2>
      <p>Hello ${opts.toName},</p>
      <p>Unfortunately, your payment of <strong>${money(opts.amount)}</strong> for the <strong>NICE 24th International Conference &amp; AGM 2026</strong> could not be completed and your registration is <strong>not yet confirmed</strong>.</p>
      <p><strong>Remita RRR:</strong> <span style="font-family:monospace">${opts.rrr}</span></p>
      <p>Please try again — no charge was made to your account for a declined transaction. You can start a fresh registration here:</p>
      <p style="text-align:center;margin:24px 0">
        <a href="${opts.retryUrl}" style="background:#0A7B34;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600;display:inline-block">Register Again</a>
      </p>
      <p style="font-size:12px;color:#6b7280">If you believe this is an error or your account was debited, reply to this email with your RRR and we will investigate immediately.</p>
      <p>— NICE Conference Secretariat</p>
    </div>`;
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

    const origin = req.headers.get("origin") ?? req.headers.get("referer") ?? "";
    const originBase = (() => {
      try {
        return new URL(origin).origin;
      } catch {
        return "https://nicengineers.com";
      }
    })();

    const { data: reg, error } = await supabase
      .from("conference_registrations")
      .select(
        "id, remita_rrr, remita_reference, payment_status, ticket_code, full_name, email, phone, organization, institution, category, days_attending, amount, verified_at, created_at, pending_email_sent_at, failed_email_sent_at, success_email_sent_at",
      )
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

    const code = String(data?.status ?? "").trim();
    const message = String(data?.message ?? "");
    const paid = code === "00" || message.toLowerCase().includes("success");
    const stillPending = !paid && (PENDING_CODES.has(code) || /pending|not.*paid|payment.*reference/i.test(message));
    const failed = !paid && !stillPending;

    const verifyUrl = `${originBase}/registration/remita-callback?reg=${id}`;
    const registrationUrl = `${originBase}/registration`;

    // Transition -> PAID
    if (paid && reg.payment_status !== "paid") {
      await supabase
        .from("conference_registrations")
        .update({ payment_status: "paid", verified_at: new Date().toISOString() })
        .eq("id", id);

      if (!reg.success_email_sent_at && reg.ticket_code && reg.email) {
        await sendEmail({
          toEmail: reg.email,
          subject: `🎉 You're in! NICE Conference 2026 — Ticket ${reg.ticket_code}`,
          html: successHtml({
            toName: reg.full_name ?? "Delegate",
            ticketCode: reg.ticket_code,
            category: reg.category ?? "",
            daysAttending: (reg.days_attending as string[] | null) ?? null,
          }),
        });
        await supabase
          .from("conference_registrations")
          .update({ success_email_sent_at: new Date().toISOString() })
          .eq("id", id);
      }
    }

    // Transition -> PENDING (first time we see it as pending, notify user how to complete)
    if (stillPending && !reg.pending_email_sent_at && reg.email) {
      await sendEmail({
        toEmail: reg.email,
        subject: `Action needed: complete your NICE Conference 2026 payment (RRR ${rrr})`,
        html: pendingHtml({
          toName: reg.full_name ?? "Delegate",
          rrr,
          amount: reg.amount != null ? Number(reg.amount) : null,
          verifyUrl,
        }),
      });
      await supabase
        .from("conference_registrations")
        .update({ pending_email_sent_at: new Date().toISOString() })
        .eq("id", id);
    }

    // Transition -> FAILED
    if (failed) {
      if (reg.payment_status !== "rejected") {
        await supabase
          .from("conference_registrations")
          .update({ payment_status: "rejected" })
          .eq("id", id);
      }
      if (!reg.failed_email_sent_at && reg.email) {
        await sendEmail({
          toEmail: reg.email,
          subject: `NICE Conference 2026 — Payment unsuccessful`,
          html: failedHtml({
            toName: reg.full_name ?? "Delegate",
            amount: reg.amount != null ? Number(reg.amount) : null,
            rrr,
            retryUrl: registrationUrl,
          }),
        });
        await supabase
          .from("conference_registrations")
          .update({ failed_email_sent_at: new Date().toISOString() })
          .eq("id", id);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        paid,
        pending: stillPending,
        failed,
        status: code,
        message: data?.message ?? null,
        ticketCode: reg.ticket_code,
        daysAttending: reg.days_attending,
        verifyUrl,
        receipt: {
          fullName: reg.full_name,
          email: reg.email,
          phone: reg.phone,
          organization: reg.organization ?? reg.institution ?? null,
          category: reg.category,
          amount: reg.amount,
          rrr: reg.remita_rrr,
          reference: reg.remita_reference ?? null,
          ticketCode: reg.ticket_code,
          daysAttending: reg.days_attending,
          paidAt: paid ? (reg.verified_at ?? new Date().toISOString()) : null,
          registeredAt: reg.created_at,
        },
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
