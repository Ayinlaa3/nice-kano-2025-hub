import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

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
  amount: z.number().positive(),
  earlyBird: z.boolean().optional().default(false),
  origin: z.string().url(),
});

async function sha512Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-512", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function parseRemitaResponse(text: string): any {
  // Remita returns JSONP-style: jsonp ({...})
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Unexpected Remita response: " + text.slice(0, 200));
  return JSON.parse(text.slice(start, end + 1));
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

    const baseUrl = Deno.env.get("REMITA_BASE_URL")!.replace(/\/$/, "");
    const merchantId = Deno.env.get("REMITA_MERCHANT_ID")!;
    const apiKey = Deno.env.get("REMITA_API_KEY")!;
    const serviceTypeId = Deno.env.get("REMITA_SERVICE_TYPE_ID")!;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const id = crypto.randomUUID();
    const orderId = id.replace(/-/g, "").slice(0, 20);
    const amount = b.amount.toFixed(2);

    // Insert pending row first
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
      payment_method: "remita",
      remita_reference: orderId,
      payment_status: "pending",
    });
    if (insertError) {
      console.error("insert error", insertError);
      return new Response(JSON.stringify({ error: "Failed to create registration" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate RRR
    const apiHash = await sha512Hex(`${merchantId}${serviceTypeId}${orderId}${amount}${apiKey}`);
    const initUrl = `${baseUrl}/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/payment/init`;
    const initResp = await fetch(initUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `remitaConsumerKey=${merchantId},remitaConsumerSecret=${apiKey}`,
      },
      body: JSON.stringify({
        serviceTypeId,
        amount,
        orderId,
        payerName: b.fullName,
        payerEmail: b.email,
        payerPhone: b.phone,
        description: `NICE Conference Registration (${b.category})`,
      }),
    });
    const initText = await initResp.text();
    let initData: any;
    try {
      initData = parseRemitaResponse(initText);
    } catch (e) {
      console.error("remita init parse error", initText);
      return new Response(JSON.stringify({ error: "Remita did not return a valid response" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rrr = initData?.RRR ?? initData?.rrr;
    if (!rrr) {
      console.error("remita init failed", initData);
      return new Response(
        JSON.stringify({ error: "Could not generate Remita RRR", remita: initData }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    await supabase.from("conference_registrations").update({ remita_rrr: String(rrr) }).eq("id", id);

    const responseUrl = `${b.origin.replace(/\/$/, "")}/registration/remita-callback?reg=${id}`;
    const redirectHash = await sha512Hex(`${merchantId}${String(rrr)}${apiKey}`);
    const gatewayUrl = `${baseUrl}/remita/ecomm/finalize.reg`;

    return new Response(
      JSON.stringify({
        success: true,
        id,
        rrr: String(rrr),
        gatewayUrl,
        fields: {
          merchantId,
          rrr: String(rrr),
          hash: redirectHash,
          responseurl: responseUrl,
        },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("remita-initiate error", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
