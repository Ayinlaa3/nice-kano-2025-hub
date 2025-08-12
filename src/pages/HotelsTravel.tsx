import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HOTELS = [
  { name: "Bristol Palace Hotel", price: "₦120,000/night", distance: "3.2 km", amenities: ["Wi‑Fi", "Pool", "Gym"], contact: "+234 800 000 0000", link: "#" },
  { name: "Tahir Guest Palace", price: "₦80,000/night", distance: "2.8 km", amenities: ["Wi‑Fi", "Restaurant"], contact: "+234 800 000 0000", link: "#" },
  { name: "Grand Central Hotel", price: "₦60,000/night", distance: "4.5 km", amenities: ["Wi‑Fi"], contact: "+234 800 000 0000", link: "#" },
];

export default function HotelsTravel() {
  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet>
        <title>Hotels & Travel | NICE Kano 2025</title>
        <meta name="description" content="Recommended hotels near the venue and travel tips for attendees visiting Kano for NICE 2025." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/hotels-travel"} />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Hotels & Travel</h1>
        <p className="text-muted-foreground mt-2">Plan your stay with curated hotel options and essential travel tips.</p>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {HOTELS.map((h) => (
          <Card key={h.name} className="p-5">
            <h3 className="font-semibold">{h.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{h.distance} from venue</p>
            <p className="mt-2"><span className="font-medium">{h.price}</span></p>
            <div className="mt-3 flex flex-wrap gap-2">
              {h.amenities.map((a) => (
                <Badge key={a} variant="secondary">{a}</Badge>
              ))}
            </div>
            <p className="text-sm mt-3">Contact: {h.contact}</p>
            <Button asChild variant="outline" className="mt-4">
              <a href={h.link} target="_blank" rel="noreferrer">Booking link</a>
            </Button>
          </Card>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Travel Tips</h2>
        <ul className="mt-4 list-disc pl-5 grid gap-2">
          <li>Fly into Mallam Aminu Kano International Airport (KAN)</li>
          <li>Use registered taxis or hotel shuttles</li>
          <li>Carry valid ID and conference badge at all times</li>
          <li>Respect local customs and follow safety guidelines</li>
        </ul>
      </section>
    </div>
  );
}
