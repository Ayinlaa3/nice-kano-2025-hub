import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function RemitaCallback() {
  const [params] = useSearchParams();
  const regId = params.get("reg");
  const [state, setState] = useState<"checking" | "paid" | "pending" | "failed">("checking");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const verify = async () => {
      if (!regId) {
        setState("failed");
        setMessage("Missing registration reference.");
        return;
      }
      const { data, error } = await supabase.functions.invoke("remita-verify", {
        body: { id: regId },
      });
      if (cancelled) return;
      if (error || !data) {
        setState("failed");
        setMessage("We could not verify your payment automatically. Please contact support.");
        return;
      }
      if (data.paid) {
        setState("paid");
      } else {
        setState("pending");
        setMessage(data.message ?? "Your payment is still being processed.");
      }
    };
    verify();
    return () => {
      cancelled = true;
    };
  }, [regId]);

  return (
    <div className="container mx-auto py-16 max-w-lg">
      <Helmet title="Payment Status | NICE Conference">
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
            {state === "checking" && "Verifying your payment…"}
            {state === "paid" && "Payment successful"}
            {state === "pending" && "Payment pending"}
            {state === "failed" && "Verification issue"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {state === "paid"
              ? "Your conference registration payment has been confirmed. A confirmation will follow by email."
              : message ?? "Please wait while we confirm your Remita payment."}
          </p>
          {regId && (
            <p className="text-xs text-muted-foreground">
              Reference: <span className="font-mono">{regId.slice(0, 8).toUpperCase()}</span>
            </p>
          )}
          <Button asChild variant="professional">
            <Link to="/registration">Back to Registration</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
