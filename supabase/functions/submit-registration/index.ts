import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const RECEIPT_METHODS = ["nice_portal_receipt", "bank_transfer_receipt"] as const;

const BodySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().max(250).optional().nullable(),
  institution: z.string().trim().max(160).optional().nullable(),
  position: z.string().trim().max(120).optional().nullable(),
  chapter: z.string().trim().max(120).optional().nullable(),
  membershipStatus: z.string().trim().max(120).optional().nullable(),
  dietary: z.string().trim().max(300).optional().nullable(),
  comments: z.string().trim().max(500).optional().nullable(),
  category: z.string().trim().min(1).max(60),
  amount: z.number().nonnegative(),
  earlyBird: z.boolean().optional().default(false),
  paymentMethod: z.enum(RECEIPT_METHODS),
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

    const { error: insertError } = await supabase.from("conference_registrations").insert({
      id,
      full_name: b.fullName,
      email: b.email,
      phone: b.phone,
      address: b.address ?? null,
      institution: b.institution ?? null,
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
      payment_status: "submitted",
    });

    if (insertError) {
      console.error("insert error", insertError);
      return new Response(JSON.stringify({ error: "Failed to save registration" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ success: true, id, reference: id.slice(0, 8).toUpperCase() }),
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
