import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const BodySchema = z.object({
  code: z.string().trim().min(4).max(60),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Please enter a valid registration or ticket code." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const code = parsed.data.code.trim();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Match by ticket_code (case-insensitive), remita RRR, remita reference, or id
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(code);
    let query = supabase
      .from("conference_registrations")
      .select(
        "id, full_name, email, category, amount, ticket_code, days_attending, remita_rrr, remita_reference, payment_status, status, verified_at, created_at",
      )
      .limit(1);

    if (isUuid) {
      query = query.eq("id", code);
    } else {
      query = query.or(
        `ticket_code.ilike.${code},remita_rrr.eq.${code},remita_reference.eq.${code}`,
      );
    }

    const { data, error } = await query.maybeSingle();
    if (error) {
      console.error("payment-status query error", error);
      return new Response(JSON.stringify({ error: "Lookup failed. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!data) {
      return new Response(
        JSON.stringify({ found: false, message: "No registration found for that code." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const emailMasked = (data.email ?? "").replace(/(.).+(@.*)/, "$1***$2");
    return new Response(
      JSON.stringify({
        found: true,
        id: data.id,
        fullName: data.full_name,
        emailMasked,
        category: data.category,
        amount: data.amount,
        ticketCode: data.ticket_code,
        daysAttending: data.days_attending,
        rrr: data.remita_rrr,
        paymentStatus: data.payment_status,
        status: data.status,
        paidAt: data.paid_at,
        createdAt: data.created_at,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("payment-status error", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
