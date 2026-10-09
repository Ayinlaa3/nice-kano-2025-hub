import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const FROM_EMAIL =
  Deno.env.get("CONFERENCE_FROM_EMAIL") ?? "NICE Conference <conference@nicehq.org>";
const SUPPORT_EMAIL = Deno.env.get("CONFERENCE_SUPPORT_EMAIL") ?? "conference@nicehq.org";

const BodySchema = z.object({
  orgName: z.string().trim().min(2).max(160),
  industry: z.string().trim().max(120).optional().nullable(),
  contactName: z.string().trim().min(2).max(120),
  contactTitle: z.string().trim().max(120).optional().nullable(),
  contactEmail: z.string().trim().email().max(160),
  contactPhone: z.string().trim().min(6).max(30),
  website: z.string().trim().max(200).optional().nullable(),
  address: z.string().trim().max(250).optional().nullable(),
  applicationType: z.enum(["sponsorship", "exhibition", "both"]),
  package: z.string().trim().max(80).optional().nullable(),
  boothType: z.string().trim().max(120).optional().nullable(),
  notes: z.string().trim().max(1000).optional().nullable(),
  totalAmount: z.number().positive(),
  receipt: z.object({
    filename: z.string().min(1).max(200),
    contentType: z.string().min(1).max(120),
    data: z.string().min(1),
  }),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

function b64ToBytes(b64: string): Uint8Array {
  const clean = b64.includes(",") ? b64.split(",")[1] : b64;
  const bin = atob(clean);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return json({ error: "Invalid input", details: parsed.error.flatten().fieldErrors }, 400);
    }
    const b = parsed.data;
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const bytes = b64ToBytes(b.receipt.data);
    if (bytes.length > 8 * 1024 * 1024) return json({ error: "Receipt too large (max 8MB)" }, 400);

    const id = crypto.randomUUID();
    const safeName = b.receipt.filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100);
    const receiptPath = `sponsorships/${id}/${safeName}`;
    const { error: upErr } = await supabase.storage
      .from("payments")
      .upload(receiptPath, bytes, { contentType: b.receipt.contentType, upsert: false });
    if (upErr) {
      console.error("upload error", upErr);
      return json({ error: "Failed to store receipt" }, 500);
    }

    const year = new Date().getFullYear();
    const prefix = `NICE-CONF-SPON/${year}/`;
    const { count } = await supabase
      .from("conference_sponsorships")
      .select("id", { count: "exact", head: true })
      .like("application_no", `${prefix}%`);
    const applicationNo = `${prefix}${String((count ?? 0) + 1).padStart(3, "0")}`;

    const { error: insErr } = await supabase.from("conference_sponsorships").insert({
      id,
      application_no: applicationNo,
      org_name: b.orgName,
      industry: b.industry ?? null,
      contact_name: b.contactName,
      contact_title: b.contactTitle ?? null,
      contact_email: b.contactEmail,
      contact_phone: b.contactPhone,
      website: b.website ?? null,
      address: b.address ?? null,
      application_type: b.applicationType,
      package: b.package ?? null,
      booth_type: b.boothType ?? null,
      notes: b.notes ?? null,
      total_amount: b.totalAmount,
      currency: "NGN",
      payment_method: "bank_transfer_receipt",
      receipt_path: receiptPath,
      payment_status: "pending",
    });
    if (insErr) {
      console.error("insert error", insErr);
      return json({ error: "Failed to save application" }, 500);
    }

    const key = Deno.env.get("RESEND_API_KEY");
    if (key) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to: [b.contactEmail],
            subject: `Sponsorship application received — pending confirmation (${applicationNo})`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
                <h2 style="color:#0A7B34;margin:0 0 8px">Application received — awaiting confirmation</h2>
                <p>Hello ${b.contactName},</p>
                <p>Thank you for partnering with the <strong>NICE 24th International Conference &amp; AGM 2026 (Lagos)</strong>. We have received your application for <strong>${b.orgName}</strong> together with your bank transfer receipt.</p>
                <p>Your application is currently <strong>PENDING</strong>. Our secretariat will verify your transfer and email your official confirmation once approved.</p>
                <p><strong>Application No:</strong> ${applicationNo}<br/>
                   <strong>Package / Booth:</strong> ${b.package || b.boothType || b.applicationType}<br/>
                   <strong>Amount:</strong> NGN ${b.totalAmount.toLocaleString("en-NG")}</p>
                <p style="font-size:12px;color:#6b7280">Questions? Contact ${SUPPORT_EMAIL}.</p>
                <p>— NICE Conference Secretariat</p>
              </div>`,
          }),
        });
      } catch (e) {
        console.error("email error", e);
      }
    }

    return json({ success: true, id, applicationNo });
  } catch (e) {
    console.error("sponsorship-submit-receipt error", e);
    return json({ error: "Unexpected error" }, 500);
  }
});
