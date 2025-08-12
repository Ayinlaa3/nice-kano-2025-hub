import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const TIERS = [
  { name: "Platinum", price: "TBA", perks: ["Prime logo placement", "Keynote slot", "Premium booth"], color: "bg-brand/10" },
  { name: "Gold", price: "TBA", perks: ["Logo on materials", "Panel slot", "Standard booth"], color: "bg-brand/10" },
  { name: "Silver", price: "TBA", perks: ["Logo on website", "Two delegate passes"], color: "bg-brand/10" },
  { name: "Bronze", price: "TBA", perks: ["Logo at venue", "One delegate pass"], color: "bg-brand/10" },
];

export default function Sponsorships() {
  const { toast } = useToast();

  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet>
        <title>Sponsorships & Exhibitions | NICE Kano 2025</title>
        <meta name="description" content="Explore sponsorship tiers and exhibition opportunities for NICE Kano 2025." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/sponsorships"} />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Sponsorships & Exhibitions</h1>
        <p className="text-muted-foreground mt-2">Partner with NICE to reach Nigeria’s leading civil engineering community.</p>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {TIERS.map((t) => (
          <Card key={t.name} className={`p-5 ring-1 ring-brand/10 ${t.color}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{t.name}</h3>
              <Badge variant="secondary">{t.price}</Badge>
            </div>
            <ul className="mt-3 grid gap-2 list-disc pl-5 text-sm">
              {t.perks.map((p) => (<li key={p}>{p}</li>))}
            </ul>
            <Button variant="brand" className="mt-4 w-full">Choose {t.name}</Button>
          </Card>
        ))}
      </section>

      <section className="mt-12 grid lg:grid-cols-2 gap-6 items-start">
        <Card className="p-5">
          <h2 className="font-semibold">Exhibition Details</h2>
          <ul className="mt-3 list-disc pl-5 grid gap-2 text-sm">
            <li>Booth sizes and pricing: TBA</li>
            <li>Includes power, table, and two chairs</li>
            <li>Located adjacent to technical session halls</li>
          </ul>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold">Downloads</h2>
          <Button
            variant="outline"
            className="mt-3"
            onClick={() => toast({ title: "Prospectus", description: "Sponsorship prospectus will be available soon." })}
          >
            Download Sponsorship Prospectus
          </Button>
        </Card>
      </section>
    </div>
  );
}
