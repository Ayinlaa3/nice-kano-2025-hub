import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

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
  addons: z.array(z.object({ name: z.string(), price: z.number().optional() })).optional(),
  notes: z.string().trim().max(1000).optional().nullable(),
  totalAmount: z.number().positive(),
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
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Unexpected Remita response: " + text.slice(0, 200));
  return JSON.parse(text.slice(start, end + 1));
}

function normalizeRemitaBaseUrl(rawBase: string): string {
  let baseUrl = rawBase.trim().replace(/\/+$/, "");
  try {
    const u = new URL(baseUrl);
    return `${u.protocol}//${u.host}`;
  } catch {
    return baseUrl;
  }
}

async function buildInlinePublicKey(merchantId: string, serviceTypeId: string, apiKey: string): Promise<string> {
  const publicKeyHash = await sha512Hex(`${merchantId}${serviceTypeId}${apiKey}`);
  return btoa(`${merchantId}|${serviceTypeId}|${publicKeyHash}`);
}

async function nextApplicationNo(supabase: any): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `NICE-CONF-SPON/${year}/`;
  const { count } = await supabase
    .from("conference_sponsorships")
    .select("id", { count: "exact", head: true })
    .like("application_no", `${prefix}%`);
  const seq = String((count ?? 0) + 1).padStart(3, "0");
  return `${prefix}${seq}`;
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

    const rawBase = Deno.env.get("REMITA_BASE_URL");
    const merchantId = Deno.env.get("REMITA_MERCHANT_ID");
    const apiKey = Deno.env.get("REMITA_API_KEY");
    const serviceTypeId = Deno.env.get("REMITA_SERVICE_TYPE_ID");

    if (!rawBase || !merchantId || !apiKey || !serviceTypeId) {
      console.error("sponsorship remita env missing", {
        hasBase: !!rawBase,
        hasMerchant: !!merchantId,
        hasApiKey: !!apiKey,
        hasService: !!serviceTypeId,
      });
      return new Response(JSON.stringify({ error: "Sponsorship payment gateway is not configured. Please contact the organisers." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const baseUrl = normalizeRemitaBaseUrl(rawBase);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const id = crypto.randomUUID();
    const orderId = id.replace(/-/g, "").slice(0, 20);
    const amount = b.totalAmount.toFixed(2);
    const applicationNo = await nextApplicationNo(supabase);

    const { error: insertError } = await supabase.from("conference_sponsorships").insert({
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
      addons: b.addons ?? null,
      notes: b.notes ?? null,
      total_amount: b.totalAmount,
      currency: "NGN",
      remita_order_id: orderId,
      payment_status: "pending_payment",
    });
    if (insertError) {
      console.error("sponsorship insert error", insertError);
      return new Response(JSON.stringify({ error: "Failed to create application" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiHash = await sha512Hex(`${merchantId}${serviceTypeId}${orderId}${amount}${apiKey}`);
    const initUrl = `${baseUrl}/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit`;
    const initResp = await fetch(initUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `remitaConsumerKey=${merchantId},remitaConsumerToken=${apiHash}`,
      },
      body: JSON.stringify({
        serviceTypeId,
        amount,
        orderId,
        payerName: b.contactName,
        payerEmail: b.contactEmail,
        payerPhone: b.contactPhone,
        description: `NICE Conference Sponsorship (${b.applicationType}${b.package ? " – " + b.package : ""})`,
      }),
    });
    const initText = await initResp.text();
    let initData: any;
    try {
      initData = parseRemitaResponse(initText);
    } catch {
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

    const responseUrl = `${b.origin.replace(/\/$/, "")}/sponsorships/remita-callback?app=${id}`;
    const redirectHash = await sha512Hex(`${merchantId}${String(rrr)}${apiKey}`);
    const gatewayUrl = `${baseUrl}/remita/ecomm/finalize.reg`;
    const paymentUrl = `${gatewayUrl}?merchantId=${merchantId}&rrr=${rrr}&hash=${redirectHash}&responseurl=${encodeURIComponent(responseUrl)}`;
    const inlinePublicKey = await buildInlinePublicKey(merchantId, serviceTypeId, apiKey);

    await supabase
      .from("conference_sponsorships")
      .update({ remita_rrr: String(rrr) })
      .eq("id", id);

    return new Response(
      JSON.stringify({
        success: true,
        id,
        orderId,
        applicationNo,
        rrr: String(rrr),
        gatewayUrl,
        fields: {
          merchantId,
          publicKey: inlinePublicKey,
          serviceTypeId,
          widgetHost: `${baseUrl}/payment/v1`,
          rrr: String(rrr),
          hash: redirectHash,
          responseurl: responseUrl,
        },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("sponsorship-initiate error", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
