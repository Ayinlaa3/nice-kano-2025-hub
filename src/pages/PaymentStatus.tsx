import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, CheckCircle2, Clock, XCircle, RefreshCw } from "lucide-react";

type Result = {
  found: boolean;
  id?: string;
  fullName?: string;
  emailMasked?: string;
  category?: string;
  amount?: number | null;
  ticketCode?: string | null;
  daysAttending?: string[] | null;
  rrr?: string | null;
  paymentStatus?: string;
  status?: string;
  paidAt?: string | null;
  createdAt?: string | null;
  message?: string;
};

const statusMeta = (s?: string) => {
  switch ((s ?? "").toLowerCase()) {
    case "paid":
      return { label: "PAID", icon: CheckCircle2, tone: "text-brand-primary", bg: "bg-brand-primary/10" };
    case "rejected":
    case "failed":
      return { label: "FAILED", icon: XCircle, tone: "text-destructive", bg: "bg-destructive/10" };
    default:
      return { label: "PENDING", icon: Clock, tone: "text-brand-yellow", bg: "bg-brand-yellow/10" };
  }
};

export default function PaymentStatus() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [reverifying, setReverifying] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lookup = async (value?: string) => {
    const q = (value ?? code).trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    setResult(null);
    const { data, error } = await supabase.functions.invoke("payment-status", {
      body: { code: q },
    });
    setLoading(false);
    if (error) {
      setError("We couldn't reach the server. Please try again.");
      return;
    }
    setResult(data as Result);
  };

  const reverify = async () => {
    if (!result?.id) return;
    setReverifying(true);
    await supabase.functions.invoke("remita-verify", { body: { id: result.id } });
    setReverifying(false);
    await lookup(code);
  };

  const meta = result?.found ? statusMeta(result.paymentStatus) : null;
  const Icon = meta?.icon;

  return (
    <div className="container mx-auto py-16 max-w-2xl">
      <Helmet>
        <title>Check Payment Status | NICE Conference 2026</title>
        <meta
          name="description"
          content="Check the payment status of your NICE Conference 2026 registration using your ticket code or RRR."
        />
      </Helmet>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Check Your Payment Status</h1>
        <p className="text-sm text-muted-foreground">
          Enter your ticket code, Remita RRR, or registration reference to see the status of your payment.
        </p>
      </div>

      <Card className="border-t-4 border-t-brand-primary">
        <CardHeader>
          <CardTitle className="text-lg">Registration Lookup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            className="flex flex-col sm:flex-row gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              lookup();
            }}
          >
            <div className="flex-1">
              <Label htmlFor="code" className="sr-only">
                Registration code
              </Label>
              <Input
                id="code"
                placeholder="e.g. NICE-2026-XXXX or your RRR"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                autoFocus
              />
            </div>
            <Button type="submit" variant="professional" disabled={loading || !code.trim()}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
              Check Status
            </Button>
          </form>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {result && !result.found && (
            <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
              {result.message ?? "No registration matched that code."} Double-check your ticket code or RRR from
              your confirmation email.
            </div>
          )}

          {result?.found && meta && Icon && (
            <div className="rounded-xl border p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${meta.bg}`}>
                  <Icon className={`h-5 w-5 ${meta.tone}`} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Payment Status</div>
                  <Badge className={`${meta.bg} ${meta.tone} border-0`}>{meta.label}</Badge>
                </div>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div>
                  <dt className="text-muted-foreground">Name</dt>
                  <dd className="font-medium">{result.fullName ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="font-medium">{result.emailMasked ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="font-medium">{result.category ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Amount</dt>
                  <dd className="font-medium">
                    {result.amount != null
                      ? new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
                          result.amount,
                        )
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Ticket Code</dt>
                  <dd className="font-mono font-semibold text-brand-primary tracking-wider">
                    {result.ticketCode ?? "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Remita RRR</dt>
                  <dd className="font-mono">{result.rrr ?? "—"}</dd>
                </div>
                {result.paidAt && (
                  <div className="sm:col-span-2">
                    <dt className="text-muted-foreground">Paid At</dt>
                    <dd className="font-medium">{new Date(result.paidAt).toLocaleString("en-NG")}</dd>
                  </div>
                )}
              </dl>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                {result.paymentStatus !== "paid" && (
                  <Button variant="outline" onClick={reverify} disabled={reverifying}>
                    {reverifying ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Re-check with Remita
                  </Button>
                )}
                {result.id && (
                  <Button asChild variant="professional">
                    <Link to={`/registration/remita-callback?reg=${result.id}`}>
                      Open Full Receipt
                    </Link>
                  </Button>
                )}
              </div>

              {result.paymentStatus !== "paid" && (
                <p className="text-xs text-muted-foreground">
                  If you have already paid via bank with your RRR, click <strong>Re-check with Remita</strong>{" "}
                  to sync the latest status.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground mt-6">
        Need help? Email{" "}
        <a href="mailto:conference@nicengineers.com" className="text-brand-primary underline">
          conference@nicengineers.com
        </a>
      </p>
    </div>
  );
}
