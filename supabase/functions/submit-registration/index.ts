import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const RECEIPT_METHODS = ["nice_portal_receipt", "bank_transfer_receipt"] as const;

const FROM_EMAIL =
  Deno.env.get("CONFERENCE_FROM_EMAIL") ?? "NICE Conference <conference@nicehq.org>";
const SUPPORT_EMAIL = Deno.env.get("CONFERENCE_SUPPORT_EMAIL") ?? "conference@nicehq.org";

async function sendEmail(opts: { toEmail: string; subject: string; html: string }) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) return;
  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ from: FROM_EMAIL, to: [opts.toEmail], subject: opts.subject, html: opts.html }),
    });
    if (!resp.ok) console.error("resend failed", await resp.text());
  } catch (e) {
    console.error("resend error", e);
  }
}

const BodySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().max(250).optional().nullable(),
  institution: z.string().trim().max(160).optional().nullable(),
  organization: z.string().trim().max(160).optional().nullable(),
  position: z.string().trim().max(120).optional().nullable(),
  chapter: z.string().trim().max(120).optional().nullable(),
  membershipStatus: z.string().trim().max(120).optional().nullable(),
  dietary: z.string().trim().max(300).optional().nullable(),
  comments: z.string().trim().max(500).optional().nullable(),
  category: z.string().trim().min(1).max(60),
  amount: z.number().nonnegative(),
  earlyBird: z.boolean().optional().default(false),
  paymentMethod: z.enum(RECEIPT_METHODS),
  daysAttending: z.array(z.enum(["1", "2", "3"])).min(1).max(3).optional().default(["1", "2", "3"]),
  receipt: z.object({
    filename: z.string().min(1).max(200),
    contentType: z.string().min(1).max(120),
    data: z.string().min(1), // base64 (no data: prefix)
  }),
});

function base64ToUint8Array(b64: string): Uint8Array {
  const clean = b64.includes(",") ? b64.split(",")[1] : b64;
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const b = parsed.data;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const id = crypto.randomUUID();

    // Upload receipt
    const bytes = base64ToUint8Array(b.receipt.data);
    if (bytes.length > 8 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: "Receipt too large (max 8MB)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const safeName = b.receipt.filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100);
    const receiptPath = `conference/${id}/${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from("payments")
      .upload(receiptPath, bytes, { contentType: b.receipt.contentType, upsert: false });
    if (uploadError) {
      console.error("upload error", uploadError);
      return new Response(JSON.stringify({ error: "Failed to store receipt" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: inserted, error: insertError } = await supabase.from("conference_registrations").insert({
      id,
      full_name: b.fullName,
      email: b.email,
      phone: b.phone,
      address: b.address ?? null,
      institution: b.institution ?? null,
      organization: b.organization ?? b.institution ?? null,
      position: b.position ?? null,
      chapter: b.chapter ?? null,
      membership_status: b.membershipStatus ?? null,
      dietary: b.dietary ?? null,
      comments: b.comments ?? null,
      category: b.category,
      amount: b.amount,
      early_bird_applied: b.earlyBird ?? false,
      payment_method: b.paymentMethod,
      receipt_path: receiptPath,
      days_attending: b.daysAttending,
      status: "pending",
      payment_status: "submitted",
    }).select("id, ticket_code").single();

    if (insertError) {
      console.error("insert error", insertError);
      return new Response(JSON.stringify({ error: "Failed to save registration" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const reference = inserted?.ticket_code ?? id.slice(0, 8).toUpperCase();

    await sendEmail({
      toEmail: b.email,
      subject: `Registration received — pending payment confirmation (${reference})`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
          <h2 style="color:#0A7B34;margin:0 0 8px">Registration received — awaiting confirmation</h2>
          <p>Hello ${b.fullName},</p>
          <p>We have received your registration for the <strong>NICE 24th International Conference &amp; AGM 2026 (Lagos)</strong> along with your bank transfer receipt.</p>
          <p>Your registration status is currently <strong>PENDING</strong>. Our secretariat will verify your transfer and, once confirmed, you will receive your official payment receipt and personalised conference badge (QR entry ticket) by email.</p>
          <p><strong>Reference:</strong> ${reference}<br/>
             <strong>Category:</strong> ${b.category}<br/>
             <strong>Amount:</strong> NGN ${b.amount.toLocaleString("en-NG")}</p>
          <p style="font-size:12px;color:#6b7280">Questions? Contact ${SUPPORT_EMAIL}.</p>
          <p>— NICE Conference Secretariat</p>
        </div>`,
    });

    return new Response(
      JSON.stringify({ success: true, id, reference }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("submit-registration error", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
