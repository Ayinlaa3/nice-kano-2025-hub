import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function SponsorshipCallback() {
  const [params] = useSearchParams();
  const appId = params.get("app");
  const [state, setState] = useState<"checking" | "paid" | "pending" | "failed">("checking");
  const [applicationNo, setApplicationNo] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!appId) {
        setState("failed");
        return;
      }
      const { data, error } = await supabase.functions.invoke("sponsorship-verify", {
        body: { id: appId },
      });
      if (cancelled) return;
      if (error || !data) {
        setState("failed");
        return;
      }
      setApplicationNo(data.applicationNo ?? null);
      setState(data.paid ? "paid" : "pending");
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [appId]);

  return (
    <div className="container mx-auto py-16 max-w-lg">
      <Helmet title="Sponsorship Payment Status | NICE Conference">
        <meta name="robots" content="noindex" />
      </Helmet>
      <Card className="border-t-4 border-t-brand-primary text-center">
        <CardHeader>
          <div className="mx-auto mb-2 h-14 w-14 rounded-full bg-brand-primary/10 flex items-center justify-center">
            {state === "checking" && <Loader2 className="h-7 w-7 animate-spin text-brand-primary" />}
            {state === "paid" && <CheckCircle2 className="h-7 w-7 text-brand-primary" />}
            {state === "pending" && <Clock className="h-7 w-7 text-brand-yellow" />}
            {state === "failed" && <XCircle className="h-7 w-7 text-destructive" />}
          </div>
          <CardTitle>
            {state === "checking" && "Verifying your sponsorship payment…"}
            {state === "paid" && "Sponsorship confirmed"}
            {state === "pending" && "Payment pending"}
            {state === "failed" && "Verification issue"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {applicationNo && (
            <p className="text-sm">
              Application No: <span className="font-mono font-semibold">{applicationNo}</span>
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            {state === "paid"
              ? "Thank you for partnering with NICE. Our sponsorship desk will be in touch shortly."
              : state === "pending"
                ? "Your Remita payment is still being processed. This page will show the confirmed status once it clears."
                : "We could not verify your payment automatically. Please contact sponsorship@nicehq.org."}
          </p>
          <Button asChild variant="professional">
            <Link to="/sponsorships">Back to Sponsorships</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
