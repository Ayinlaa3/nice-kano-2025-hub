import { useEffect, useMemo, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { formatNaira } from "@/config/conference";
import { Loader2, FileText, LogOut, RefreshCw } from "lucide-react";

interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  institution: string | null;
  chapter: string | null;
  membership_status: string | null;
  category: string;
  amount: number;
  payment_method: string;
  payment_status: string;
  receipt_path: string | null;
  remita_rrr: string | null;
  remita_reference: string | null;
  admin_note: string | null;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  submitted: "bg-brand-yellow text-brand-gold-foreground",
  verified: "bg-brand-primary text-primary-foreground",
  paid: "bg-brand-primary text-primary-foreground",
  rejected: "bg-destructive text-destructive-foreground",
};

const METHOD_LABELS: Record<string, string> = {
  nice_portal_receipt: "NICE Portal Receipt",
  bank_transfer_receipt: "Bank Transfer Receipt",
  remita: "Remita",
};

export default function AdminRegistrations() {
  const { user, signOut } = useAuth();
  const [rows, setRows] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [methodFilter, setMethodFilter] = useState<string>("all");
  const [active, setActive] = useState<Registration | null>(null);
  const [note, setNote] = useState("");
  const [working, setWorking] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("conference_registrations")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load", description: error.message, variant: "destructive" });
    } else {
      setRows((data ?? []) as Registration[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (statusFilter === "all" || r.payment_status === statusFilter) &&
          (methodFilter === "all" || r.payment_method === methodFilter),
      ),
    [rows, statusFilter, methodFilter],
  );

  const viewReceipt = async (path: string) => {
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    const { data, error } = await supabase.functions.invoke("admin-receipt-url", {
      body: { path },
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    if (error || !data?.url) {
      toast({ title: "Could not open receipt", variant: "destructive" });
      return;
    }
    window.open(data.url, "_blank", "noopener,noreferrer");
  };

  const updateStatus = async (status: "verified" | "rejected") => {
    if (!active) return;
    setWorking(true);
    const { error } = await supabase
      .from("conference_registrations")
      .update({
        payment_status: status,
        admin_note: note || null,
        verified_by: user?.id ?? null,
        verified_at: new Date().toISOString(),
      })
      .eq("id", active.id);
    setWorking(false);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: `Registration ${status}` });
    setActive(null);
    setNote("");
    load();
  };

  return (
    <div className="container mx-auto py-10">
      <Helmet title="Conference Registrations | Admin">
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Conference Registrations</h1>
          <p className="text-muted-foreground text-sm">
            Verify payments and manage delegate registrations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={methodFilter} onValueChange={setMethodFilter}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All methods</SelectItem>
            <SelectItem value="nice_portal_receipt">NICE Portal Receipt</SelectItem>
            <SelectItem value="bank_transfer_receipt">Bank Transfer Receipt</SelectItem>
            <SelectItem value="remita">Remita</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {loading ? "Loading…" : `${filtered.length} registration(s)`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-brand-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">No registrations found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="p-3 font-medium">Delegate</th>
                    <th className="p-3 font-medium">Category</th>
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
                        <div className="font-medium">{r.full_name}</div>
                        <div className="text-xs text-muted-foreground">{r.email}</div>
                      </td>
                      <td className="p-3">{r.category}</td>
                      <td className="p-3">{formatNaira(Number(r.amount))}</td>
                      <td className="p-3">{METHOD_LABELS[r.payment_method] ?? r.payment_method}</td>
                      <td className="p-3">
                        <Badge className={STATUS_COLORS[r.payment_status] ?? ""}>
                          {r.payment_status}
                        </Badge>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setActive(r);
                            setNote(r.admin_note ?? "");
                          }}
                        >
                          Review
                        </Button>
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
          <DialogHeader>
            <DialogTitle>Review Registration</DialogTitle>
          </DialogHeader>
          {active && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Info label="Name" value={active.full_name} />
                <Info label="Email" value={active.email} />
                <Info label="Phone" value={active.phone} />
                <Info label="Institution" value={active.institution ?? "—"} />
                <Info label="Chapter" value={active.chapter ?? "—"} />
                <Info label="Membership" value={active.membership_status ?? "—"} />
                <Info label="Category" value={active.category} />
                <Info label="Amount" value={formatNaira(Number(active.amount))} />
                <Info
                  label="Method"
                  value={METHOD_LABELS[active.payment_method] ?? active.payment_method}
                />
                <Info label="Status" value={active.payment_status} />
                {active.remita_rrr && <Info label="Remita RRR" value={active.remita_rrr} />}
              </div>

              {active.receipt_path ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => viewReceipt(active.receipt_path!)}
                >
                  <FileText className="h-4 w-4 mr-2" /> View uploaded receipt
                </Button>
              ) : (
                <p className="text-xs text-muted-foreground">
                  No receipt uploaded (Remita payment).
                </p>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Admin note (optional)</label>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder="Reason / reference…"
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              variant="destructive"
              disabled={working}
              onClick={() => updateStatus("rejected")}
            >
              Reject
            </Button>
            <Button
              variant="professional"
              disabled={working}
              onClick={() => updateStatus("verified")}
            >
              {working && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Approve / Verify
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
