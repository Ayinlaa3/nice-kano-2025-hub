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
  const [ticketCode, setTicketCode] = useState<string | null>(null);
  const [daysAttending, setDaysAttending] = useState<string[] | null>(null);

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
      setTicketCode(data.ticketCode ?? null);
      setDaysAttending(Array.isArray(data.daysAttending) ? data.daysAttending : null);
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

  const qrSrc = ticketCode
    ? `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&data=${encodeURIComponent(ticketCode)}`
    : null;

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
              ? "Your conference registration is confirmed. Your ticket is below — a copy has also been emailed to you. Present the QR code at check-in."
              : message ?? "Please wait while we confirm your Remita payment."}
          </p>

          {state === "paid" && qrSrc && (
            <div className="rounded-xl border p-4 bg-muted/30">
              <img
                src={qrSrc}
                alt={`Ticket QR for ${ticketCode}`}
                width={220}
                height={220}
                className="mx-auto"
              />
              <p className="mt-3 font-mono text-lg tracking-widest text-brand-primary font-semibold">
                {ticketCode}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Your ticket code</p>
              {daysAttending && daysAttending.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Days attending: {daysAttending.map((d) => `Day ${d}`).join(", ")}
                </p>
              )}
            </div>
          )}

          {regId && state !== "paid" && (
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
