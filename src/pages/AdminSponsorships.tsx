import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { formatNaira } from "@/config/conference";
import { FileText, Loader2, RefreshCw } from "lucide-react";

interface Sponsorship {
  id: string;
  application_no: string;
  org_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  application_type: string;
  package: string | null;
  booth_type: string | null;
  total_amount: number;
  payment_status: string;
  payment_method?: string;
  receipt_path?: string | null;
  admin_note?: string | null;
  remita_rrr: string | null;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-brand-yellow text-brand-gold-foreground",
  paid: "bg-brand-primary text-primary-foreground",
  verified: "bg-brand-primary text-primary-foreground",
  rejected: "bg-destructive text-destructive-foreground",
};

export default function AdminSponsorships() {
  const [rows, setRows] = useState<Sponsorship[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [active, setActive] = useState<Sponsorship | null>(null);
  const [note, setNote] = useState("");
  const [working, setWorking] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    // Abandoned Remita attempts use "pending_payment" and stay hidden.
    const { data, error } = await supabase
      .from("conference_sponsorships")
      .select("*")
      .in("payment_status", ["pending", "paid", "verified", "rejected"])
      .order("created_at", { ascending: false });
    if (error) toast({ title: "Failed to load", description: error.message, variant: "destructive" });
    else setRows((data ?? []) as unknown as Sponsorship[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(
    () => rows.filter((r) => statusFilter === "all" || r.payment_status === statusFilter),
    [rows, statusFilter],
  );

  const viewReceipt = async (path: string) => {
    const { data, error } = await supabase.functions.invoke("admin-receipt-url", { body: { path } });
    if (error || !data?.url) return toast({ title: "Could not open receipt", variant: "destructive" });
    window.open(data.url, "_blank", "noopener,noreferrer");
  };

  const act = async (action: "confirm" | "reject") => {
    if (!active) return;
    setWorking(true);
    const { data, error } = await supabase.functions.invoke("admin-confirm-sponsorship", {
      body: { id: active.id, action, note: note || null },
    });
    setWorking(false);
    if (error || !data?.success) {
      return toast({ title: "Update failed", description: data?.error || error?.message, variant: "destructive" });
    }
    toast({
      title: action === "confirm" ? "Payment confirmed" : "Application rejected",
      description: "The sponsor has been notified by email.",
    });
    setActive(null);
    setNote("");
    load();
  };

  return (
    <div className="container mx-auto py-10">
      <Helmet title="Sponsorship Applications | Admin"><meta name="robots" content="noindex" /></Helmet>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Sponsorship & Exhibition Applications</h1>
          <p className="text-muted-foreground text-sm">Review bank-transfer receipts and approve sponsors/exhibitors.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild><Link to="/admin/registrations">Delegate registrations</Link></Button>
          <Button variant="outline" size="sm" onClick={load}><RefreshCw className="h-4 w-4 mr-2" /> Refresh</Button>
        </div>
      </div>

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-44 mb-4"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Card>
        <CardHeader><CardTitle className="text-base">{loading ? "Loading…" : `${filtered.length} application(s)`}</CardTitle></CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-brand-primary" /></div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">No applications found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="p-3 font-medium">Organisation</th>
                    <th className="p-3 font-medium">Package / Booth</th>
                    <th className="p-3 font-medium">Amount</th>
                    <th className="p-3 font-medium">Method</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Date</th>
                    <th className="p-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-t">
                      <td className="p-3">
                        <div className="font-medium">{r.org_name}</div>
                        <div className="text-xs text-muted-foreground">{r.application_no} · {r.contact_email}</div>
                      </td>
                      <td className="p-3">{r.package || r.booth_type || r.application_type}</td>
                      <td className="p-3">{formatNaira(Number(r.total_amount))}</td>
                      <td className="p-3">{r.payment_method === "bank_transfer_receipt" ? "Bank Transfer Receipt" : "Remita"}</td>
                      <td className="p-3"><Badge className={STATUS_COLORS[r.payment_status] ?? ""}>{r.payment_status}</Badge></td>
                      <td className="p-3 text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="outline" onClick={() => { setActive(r); setNote(r.admin_note ?? ""); }}>Review</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Review Application</DialogTitle></DialogHeader>
          {active && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Info label="Application No" value={active.application_no} />
                <Info label="Organisation" value={active.org_name} />
                <Info label="Contact" value={active.contact_name} />
                <Info label="Phone" value={active.contact_phone} />
                <Info label="Email" value={active.contact_email} />
                <Info label="Type" value={active.application_type} />
                <Info label="Package / Booth" value={active.package || active.booth_type || "—"} />
                <Info label="Amount" value={formatNaira(Number(active.total_amount))} />
                <Info label="Status" value={active.payment_status} />
                {active.remita_rrr && <Info label="Remita RRR" value={active.remita_rrr} />}
              </div>
              {active.receipt_path ? (
                <Button variant="outline" className="w-full" onClick={() => viewReceipt(active.receipt_path!)}>
                  <FileText className="h-4 w-4 mr-2" /> View uploaded receipt
                </Button>
              ) : (
                <p className="text-xs text-muted-foreground">No receipt uploaded (Remita payment).</p>
              )}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Admin note (optional)</label>
                <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="destructive" disabled={working} onClick={() => act("reject")}>Reject</Button>
            <Button variant="professional" disabled={working} onClick={() => act("confirm")}>
              {working && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Approve Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="font-medium break-words">{value}</p>
    </div>
  );
}
