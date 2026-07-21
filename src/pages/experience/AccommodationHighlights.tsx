import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Star, Wallet } from "lucide-react";

const TIERS = [
  {
    icon: Star,
    tier: "Premium (5★)",
    price: "₦220,000 – ₦780,000 / night",
    picks: ["Sheraton Lagos, Ikeja", "Radisson Blu Anchorage, VI", "Lagos Continental, VI", "Southern Sun Ikoyi"],
    note: "Ideal for VIP delegates and international guests seeking full-service luxury.",
  },
  {
    icon: Building2,
    tier: "Business (4★)",
    price: "₦120,000 – ₦280,000 / night",
    picks: ["Protea Hotel Ikeja Select", "Best Western Plus Ikeja", "Ibis Lagos Ikeja (upper tier)"],
    note: "Reliable business-class comfort within 5–15 minutes of the venue.",
  },
  {
    icon: Wallet,
    tier: "Value (3★)",
    price: "₦60,000 – ₦120,000 / night",
    picks: ["Elomaz Hotel & Suites, Alausa", "Bolingo Hotel & Towers, GRA", "Ibis Lagos Ikeja (standard)"],
    note: "Great value picks close to the venue for members mindful of budget.",
  },
];

export default function AccommodationHighlights() {
  return (
    <div className="container mx-auto py-12 md:py-16 space-y-12">
      <Helmet title="Accommodation Highlights | Experience Lagos | NICE Lagos 2026">
        <meta name="description" content="Curated hotel highlights across Ikeja, Alausa, Ikoyi and VI for delegates attending NICE Lagos 2026." />
      </Helmet>

      <header className="max-w-3xl">
        <Badge className="bg-brand-primary/10 text-brand-primary mb-3">Experience Lagos · Accommodation</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Where to Stay</h1>
        <p className="text-lg text-muted-foreground">
          Curated hotel tiers around Ikeja, Alausa, Ikoyi and Victoria Island — with the full directory available on the Hotels & Travel page.
        </p>
        <p className="text-xs text-muted-foreground mt-2 italic">
          Rates below are indicative. Confirmed delegate rates will be published closer to the conference.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        {TIERS.map((t) => (
          <Card key={t.tier} className="p-6 flex flex-col">
            <t.icon className="w-8 h-8 text-brand-primary mb-3" />
            <h2 className="text-xl font-semibold">{t.tier}</h2>
            <p className="text-brand-primary font-medium mt-1">{t.price}</p>
            <ul className="mt-4 space-y-1 text-sm">
              {t.picks.map((p) => (
                <li key={p} className="text-muted-foreground">• {p}</li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-4 flex-1">{t.note}</p>
          </Card>
        ))}
      </section>

      <div className="text-center">
        <Button asChild variant="professional" size="lg">
          <Link to="/hotels-travel">See Full Hotel Directory</Link>
        </Button>
      </div>
    </div>
  );
}
