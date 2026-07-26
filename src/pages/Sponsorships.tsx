import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { payWithRemita } from "@/lib/remitaWidget";

const TIERS = [
  { name: "Platinum", price: "₦15,000,000", amount: 15000000, perks: ["Prime logo placement on stage backdrop & website","2 premium booths at Construction Expo Africa","5 complimentary full-access registrations","Keynote acknowledgment at opening session","5-minute video ad before plenary sessions","Centre-spread ad in event brochure","Exclusive premium table at Business Roundtable"], color: "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20", icon: "👑" },
  { name: "Gold", price: "₦10,000,000", amount: 10000000, perks: ["Prominent logo on stage banners & website","1 standard booth at expo","3 full conference registrations","Acknowledgement at opening & closing ceremonies","3-minute video at selected session","Full-page inner cover advert in brochure","Option to host branded workshop"], color: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20", icon: "🥇" },
  { name: "Silver", price: "₦5,000,000", amount: 5000000, perks: ["Logo on website & program brochure","1 standard booth at expo","1 full conference registration","Mention during general sessions","Full-page advert in brochure","Flyer in delegate bag","Access to networking lounge"], color: "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20", icon: "🥈" },
  { name: "Bronze", price: "₦3,000,000", amount: 3000000, perks: ["Logo on select banners & website","One exhibitor pass","Logo slide at closing session","Branded banner at exhibition entrance","Mention in sponsor thank you section"], color: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20", icon: "🥉" },
  { name: "Supporter", price: "₦1,000,000", amount: 1000000, perks: ["Name listed on website & brochure","Mention during closing remarks","Certificate of appreciation from NICE","Social media recognition"], color: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20", icon: "🤝" },
];

const ADD_ONS = [
  { name: "Conference Bag Branding", price: "₦500,000", amount: 500000, note: "Exclusive to 1 sponsor" },
  { name: "Delegate Notepad or Pen", price: "₦200,000", amount: 200000, note: "Branded item in all kits" },
  { name: "Side Workshop Session", price: "₦1,000,000", amount: 1000000, note: "60-minute hosted session" },
  { name: "Coffee/Tea Stand Branding", price: "₦300,000", amount: 300000, note: "2 spots available" },
  { name: "Charging Station Branding", price: "₦250,000", amount: 250000, note: "1 sponsor only" },
  { name: "Centre Spread Brochure Advert", price: "₦500,000", amount: 500000, note: "1 slot available" },
  { name: "Full Page Brochure Advert", price: "₦300,000", amount: 300000, note: "" },
  { name: "Half-page Brochure Advert", price: "₦150,000", amount: 150000, note: "A5 landscape design accepted" },
];


const BOOTH_OPTIONS = [
  { name: "Standard Booth (3m x 3m)=(9m²)", earlyBird: "₦350,000", standard: "₦500,000", amount: 500000 },
  { name: "Premium Booth (3m x 6m)=(18m²)", earlyBird: "₦600,000", standard: "₦900,000", amount: 900000 },
  { name: "Vendor's Option (Outside The Hall)", standard: "₦70,000", amount: 70000 },
];

type PresetTier = { name: string; amount: number };

interface ApplyForm {
  orgName: string;
  industry: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  address: string;
  applicationType: "sponsorship" | "exhibition" | "both";
  package: string;
  boothType: string;
  notes: string;
  totalAmount: number;
}

const emptyForm: ApplyForm = {
  orgName: "", industry: "", contactName: "", contactTitle: "",
  contactEmail: "", contactPhone: "", website: "", address: "",
  applicationType: "sponsorship", package: "", boothType: "",
  notes: "", totalAmount: 0,
};

export default function Sponsorships() {
  const { toast } = useToast();
  const [applyOpen, setApplyOpen] = useState(false);
  const [form, setForm] = useState<ApplyForm>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const openApply = (preset?: {
    applicationType?: ApplyForm["applicationType"];
    package?: string;
    boothType?: string;
    amount?: number;
  }) => {
    setForm({
      ...emptyForm,
      applicationType: preset?.applicationType ?? "sponsorship",
      package: preset?.package ?? "",
      boothType: preset?.boothType ?? "",
      totalAmount: preset?.amount ?? 0,
    });
    setApplyOpen(true);
  };

  const submitApplication = async () => {
    if (!form.orgName || !form.contactName || !form.contactEmail || !form.contactPhone || !form.totalAmount) {
      toast({ title: "Missing details", description: "Fill organisation, contact, and amount.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("sponsorship-initiate", {
        body: { ...form, origin: window.location.origin },
      });
      if (error || !data?.success) {
        throw new Error(data?.error || error?.message || "Could not start payment");
      }
      const callbackUrl = `/sponsorships/callback?app=${data.id}`;
      await payWithRemita({
        rrr: data.rrr,
        merchantId: data.fields.merchantId,
        orderId: data.id,
        onSuccess: () => {
          window.location.href = callbackUrl;
        },
        onClose: () => {
          toast({
            title: "Payment window closed",
            description: `If you completed payment, check status with RRR ${data.rrr}.`,
          });
          setSubmitting(false);
        },
        onError: (resp) => {
          console.error("Remita widget error", resp);
          toast({
            title: "Payment error",
            description: `Could not load the payment widget. Your RRR is ${data.rrr} — pay at any bank or on the Remita app, then verify from the sponsorship status page.`,
            variant: "destructive",
          });
          setSubmitting(false);
        },
      });
    } catch (err) {
      toast({
        title: "Application failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 md:py-16 space-y-12">
      <Helmet title="Sponsors & Exhibitions | NICE Lagos 2026">
        <meta name="description" content="Partner with NICE Lagos 2026 — sponsorship tiers, exhibition booths, and add-ons for Nigeria's premier civil engineering conference." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/sponsorships"} />
      </Helmet>

      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">NICE 2026 International Conference &amp; AGM</h1>
        <h2 className="text-xl md:text-2xl text-brand-primary font-semibold mb-2">Sponsors &amp; Exhibitions</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Partner with NICE to reach Nigeria's leading civil engineering community and showcase your brand at Africa's premier
          infrastructure development conference, live in Lagos.
        </p>
      </header>

      {/* Sponsorship Packages */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">Sponsorship Packages &amp; Detailed Benefits</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <Card key={tier.name} className={`p-6 ring-1 ring-brand/10 ${tier.color} hover:shadow-lg transition-shadow`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{tier.icon}</span>
                  <h3 className="text-xl font-bold">{tier.name}</h3>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">{tier.price}</Badge>
              </div>
              <ul className="space-y-2 mb-6">
                {tier.perks.map((perk, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-brand-primary text-xs mt-1">•</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <Button
                variant="hero"
                className="w-full"
                onClick={() =>
                  openApply({
                    applicationType: "sponsorship",
                    package: tier.name,
                    amount: tier.amount,
                  })
                }
              >
                Apply for {tier.name}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Add-Ons */}
      <section>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">📦 Add-On Opportunities</h2>
          <p className="text-muted-foreground mb-6">Available to all sponsors for enhanced visibility and engagement</p>
          <div className="grid md:grid-cols-2 gap-4">
            {ADD_ONS.map((addon, index) => (
              <div key={index} className="flex justify-between items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="min-w-0">
                  <h4 className="font-medium text-sm">{addon.name}</h4>
                  {addon.note && <p className="text-xs text-muted-foreground">{addon.note}</p>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline">{addon.price}</Badge>
                  <Button
                    size="sm"
                    variant="professional"
                    onClick={() =>
                      openApply({
                        applicationType: "sponsorship",
                        package: `Add-On: ${addon.name}`,
                        amount: addon.amount,
                      })
                    }
                  >
                    Apply
                  </Button>
                </div>
              </div>
            ))}

          </div>
        </Card>
      </section>

      {/* Exhibition */}
      <section>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Construction Expo Africa – Exhibition Opportunity</h2>
          <p className="text-muted-foreground mb-6">
            Held alongside the conference, the Construction Expo Africa will host over 50 brands in civil engineering,
            technology, building materials, digital solutions, and infrastructure services.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Booth Options:</h3>
              <div className="space-y-3">
                {BOOTH_OPTIONS.map((booth, index) => (
                  <div key={index} className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium">{booth.name}</h4>
                    <div className="flex gap-4 mt-2 mb-3 flex-wrap">
                      {booth.earlyBird && <Badge variant="secondary">Early Bird: {booth.earlyBird}</Badge>}
                      <Badge variant="outline">Standard: {booth.standard}</Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="professional"
                      onClick={() =>
                        openApply({
                          applicationType: "exhibition",
                          boothType: booth.name,
                          amount: booth.amount,
                        })
                      }
                    >
                      Book this booth
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Includes:</h3>
              <ul className="space-y-2">
                {[
                  "Booth structure and name panel",
                  "2 exhibitor tags",
                  "Listing in conference materials",
                  "Power, table, and chairs setup",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <span className="text-brand-primary">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* How to Partner */}
      <section>
        <Card className="p-6 bg-gradient-to-r from-brand/5 to-brand/10 text-center">
          <h2 className="text-2xl font-bold mb-4">How to Partner</h2>
          <p className="text-muted-foreground mb-4">
            Click any package above to apply and pay securely via Remita, or contact the sponsorship desk.
          </p>
          <div className="bg-background/80 p-4 rounded-lg mb-4 inline-block text-left">
            <div className="space-y-1 text-sm">
              <p><strong>📧 Email:</strong> sponsorship@nicehq.org</p>
              <p><strong>📞 Phone:</strong> +234 802 331 8732</p>
            </div>
          </div>
          <div>
            <Button variant="hero" onClick={() => openApply()}>
              Start a Custom Application
            </Button>
          </div>
        </Card>
      </section>

      {/* Application Dialog */}
      <Dialog open={applyOpen} onOpenChange={(o) => !submitting && setApplyOpen(o)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sponsorship / Exhibition Application</DialogTitle>
            <DialogDescription>
              Complete this form to generate a Remita payment link. You'll be redirected to Remita to complete payment.
            </DialogDescription>
          </DialogHeader>

          <div className="grid sm:grid-cols-2 gap-4 py-2">
            <div className="sm:col-span-2 space-y-1.5">
              <Label>Organisation Name *</Label>
              <Input value={form.orgName} onChange={(e) => setForm({ ...form, orgName: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Industry</Label>
              <Input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Website</Label>
              <Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://…" />
            </div>
            <div className="space-y-1.5">
              <Label>Contact Name *</Label>
              <Input value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Contact Title</Label>
              <Input value={form.contactTitle} onChange={(e) => setForm({ ...form, contactTitle: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Contact Email *</Label>
              <Input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Contact Phone *</Label>
              <Input value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label>Address</Label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>

            <div className="space-y-1.5">
              <Label>Application Type *</Label>
              <Select
                value={form.applicationType}
                onValueChange={(v) => setForm({ ...form, applicationType: v as ApplyForm["applicationType"] })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sponsorship">Sponsorship</SelectItem>
                  <SelectItem value="exhibition">Exhibition</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Package</Label>
              <Select
                value={form.package || "__none"}
                onValueChange={(v) => {
                  const tier = TIERS.find((t) => t.name === v);
                  setForm({
                    ...form,
                    package: v === "__none" ? "" : v,
                    totalAmount: tier ? tier.amount : form.totalAmount,
                  });
                }}
              >
                <SelectTrigger><SelectValue placeholder="Select a package" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none">None</SelectItem>
                  {TIERS.map((t) => (
                    <SelectItem key={t.name} value={t.name}>{t.name} — {t.price}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Booth Type (if any)</Label>
              <Input value={form.boothType} onChange={(e) => setForm({ ...form, boothType: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Total Amount (₦) *</Label>
              <Input
                type="number"
                min={0}
                value={form.totalAmount || ""}
                onChange={(e) => setForm({ ...form, totalAmount: Number(e.target.value) || 0 })}
              />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label>Notes</Label>
              <Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setApplyOpen(false)} disabled={submitting}>Cancel</Button>
            <Button variant="professional" onClick={submitApplication} disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Continue to Remita Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
