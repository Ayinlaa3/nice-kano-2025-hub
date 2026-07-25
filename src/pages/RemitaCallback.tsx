import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Clock, XCircle, Download, RefreshCw } from "lucide-react";

type Receipt = {
  fullName: string | null;
  email: string | null;
  phone: string | null;
  organization: string | null;
  category: string | null;
  amount: number | null;
  rrr: string | null;
  reference: string | null;
  ticketCode: string | null;
  daysAttending: string[] | null;
  paidAt: string | null;
  registeredAt: string | null;
};

const POLL_INTERVAL_MS = 4000;
const MAX_POLLS = 45; // ~3 minutes

export default function RemitaCallback() {
  const [params] = useSearchParams();
  const regId = params.get("reg");
  const [state, setState] = useState<"checking" | "paid" | "pending" | "failed">("checking");
  const [message, setMessage] = useState<string | null>(null);
  const [ticketCode, setTicketCode] = useState<string | null>(null);
  const [daysAttending, setDaysAttending] = useState<string[] | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [pollCount, setPollCount] = useState(0);
  const pollCountRef = useRef(0);
  const [lastCheckedAt, setLastCheckedAt] = useState<Date | null>(null);
  const cancelledRef = useRef(false);

  const runVerify = async () => {
    if (!regId) {
      setState("failed");
      setMessage("Missing registration reference.");
      return "failed" as const;
    }
    const { data, error } = await supabase.functions.invoke("remita-verify", {
      body: { id: regId },
    });
    setLastCheckedAt(new Date());
    if (cancelledRef.current) return "cancelled" as const;
    if (error || !data) {
      setState("failed");
      setMessage("We could not reach Remita. Please retry or contact support.");
      return "failed" as const;
    }
    setTicketCode(data.ticketCode ?? null);
    setDaysAttending(Array.isArray(data.daysAttending) ? data.daysAttending : null);
    if (data.receipt) setReceipt(data.receipt as Receipt);
    if (data.paid) {
      setState("paid");
      return "paid" as const;
    }
    setState("pending");
    setMessage(data.message ?? "Awaiting confirmation from Remita.");
    return "pending" as const;
  };

  useEffect(() => {
    cancelledRef.current = false;
    pollCountRef.current = 0;
    setPollCount(0);
    let timer: number | undefined;

    const tick = async () => {
      const result = await runVerify();
      pollCountRef.current += 1;
      setPollCount(pollCountRef.current);
      if (cancelledRef.current) return;
      if (result === "pending" && pollCountRef.current < MAX_POLLS) {
        timer = window.setTimeout(tick, POLL_INTERVAL_MS);
      }
    };

    tick();
    return () => {
      cancelledRef.current = true;
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regId]);

  const qrSrc = ticketCode
    ? `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&data=${encodeURIComponent(ticketCode)}`
    : null;

  const downloadReceipt = () => {
    if (!receipt) return;
    const win = window.open("", "_blank", "width=720,height=900");
    if (!win) return;
    const money = (n: number | null) =>
      n == null ? "—" : new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(n);
    const fmt = (d: string | null) => (d ? new Date(d).toLocaleString("en-NG") : "—");
    const days = (receipt.daysAttending ?? []).map((d) => `Day ${d}`).join(", ") || "—";
    win.document.write(`<!doctype html><html><head><meta charset="utf-8"/>
      <title>NICE Conference 2026 Receipt — ${receipt.ticketCode ?? ""}</title>
      <style>
        *{box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#111;padding:32px;max-width:640px;margin:0 auto}
        h1{color:#0A7B34;margin:0 0 4px;font-size:22px}
        .sub{color:#6b7280;margin:0 0 24px;font-size:13px}
        table{width:100%;border-collapse:collapse;margin:16px 0}
        th,td{text-align:left;padding:10px 8px;border-bottom:1px solid #e5e7eb;font-size:14px;vertical-align:top}
        th{color:#374151;width:38%;font-weight:600}
        .badge{display:inline-block;background:#0A7B34;color:#fff;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:600;letter-spacing:0.5px}
        .foot{margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280}
        .ticket{font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-weight:700;color:#0A7B34;font-size:16px;letter-spacing:2px}
        @media print{.noprint{display:none}}
      </style></head><body>
      <h1>NICE Conference 2026 — Payment Receipt</h1>
      <p class="sub">24th International Conference &amp; AGM · Academy Guest House &amp; Events Halls, Ikeja, Lagos · 20–22 October 2026</p>
      <p><span class="badge">PAID</span></p>
      <table>
        <tr><th>Ticket Code</th><td class="ticket">${receipt.ticketCode ?? "—"}</td></tr>
        <tr><th>Full Name</th><td>${receipt.fullName ?? "—"}</td></tr>
        <tr><th>Email</th><td>${receipt.email ?? "—"}</td></tr>
        <tr><th>Phone</th><td>${receipt.phone ?? "—"}</td></tr>
        <tr><th>Organisation</th><td>${receipt.organization ?? "—"}</td></tr>
        <tr><th>Category</th><td>${receipt.category ?? "—"}</td></tr>
        <tr><th>Days Attending</th><td>${days}</td></tr>
        <tr><th>Amount Paid</th><td><strong>${money(receipt.amount)}</strong></td></tr>
        <tr><th>Remita RRR</th><td>${receipt.rrr ?? "—"}</td></tr>
        ${receipt.reference ? `<tr><th>Payment Reference</th><td>${receipt.reference}</td></tr>` : ""}
        <tr><th>Registered At</th><td>${fmt(receipt.registeredAt)}</td></tr>
        <tr><th>Paid At</th><td>${fmt(receipt.paidAt)}</td></tr>
      </table>
      <p class="foot">This is an electronically generated receipt from the Nigerian Institution of Civil Engineers.
      Present your ticket code at check-in. For queries: conference@nicengineers.com.</p>
      <p class="noprint" style="text-align:center;margin-top:24px">
        <button onclick="window.print()" style="background:#0A7B34;color:#fff;border:0;padding:10px 20px;border-radius:8px;font-size:14px;cursor:pointer">Print / Save as PDF</button>
      </p>
      <script>setTimeout(()=>window.print(),400)</script>
      </body></html>`);
    win.document.close();
  };

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
            {state === "pending" && <Clock className="h-7 w-7 text-brand-yellow animate-pulse" />}
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
              ? "Your conference registration is confirmed. Your ticket is below — a copy has also been emailed to you."
              : message ?? "Please wait while we confirm your Remita payment."}
          </p>

          {state === "pending" && (
            <div className="rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>
                  Auto-checking every {POLL_INTERVAL_MS / 1000}s · attempt {pollCount}/{MAX_POLLS}
                </span>
              </div>
              {lastCheckedAt && (
                <div className="mt-1">Last checked: {lastCheckedAt.toLocaleTimeString()}</div>
              )}
              {pollCount >= MAX_POLLS && (
                <Button size="sm" variant="outline" className="mt-3" onClick={() => { pollCountRef.current = 0; setPollCount(0); runVerify(); }}>
                  Check again
                </Button>
              )}
            </div>
          )}

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

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            {state === "paid" && receipt && (
              <Button variant="professional" onClick={downloadReceipt}>
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
            )}
            <Button asChild variant={state === "paid" ? "outline" : "professional"}>
              <Link to="/registration">Back to Registration</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
