import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve((req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const accountName = "Nigerian Institution of Civil Engineers";

  const banks = [
    {
      bank: "Zenith Bank",
      accountName: Deno.env.get("NICE_ZENITH_BENEFICIARY") || accountName,
      accountNumber: Deno.env.get("NICE_ZENITH_ACCOUNT") || "",
    },
    {
      bank: "Ecobank",
      accountName: Deno.env.get("NICE_ECOBANK_BENEFICIARY") || accountName,
      accountNumber: Deno.env.get("NICE_ECOBANK_ACCOUNT") || "",
    },
    {
      bank: "Providus Bank",
      accountName: Deno.env.get("NICE_PROVIDUS_BENEFICIARY") || accountName,
      accountNumber: Deno.env.get("NICE_PROVIDUS_ACCOUNT") || "",
    },
  ].filter((b) => b.accountNumber);

  return new Response(JSON.stringify({ banks }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
