import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Wifi, Car, Utensils, Shield, Accessibility } from "lucide-react";
import { Link } from "react-router-dom";
import { CONFERENCE } from "@/config/conference";

const FEATURES = [
  { icon: Wifi, title: "Full A/V & Wi-Fi", desc: "Multi-room A/V rigs, live-stream capable, high-capacity Wi-Fi throughout." },
  { icon: Car, title: "Ample Parking", desc: "Secure on-site parking for delegates and VIP arrivals." },
  { icon: Utensils, title: "Catering & Lounges", desc: "Dedicated catering halls, coffee lounges and networking corners." },
  { icon: Shield, title: "24/7 Security", desc: "Controlled access, on-site security, CCTV and marshalled entry points." },
  { icon: Accessibility, title: "Accessibility", desc: "Step-free access, accessible restrooms and reserved seating available on request." },
];

export default function VenueGuide() {
  return (
    <div className="container mx-auto py-12 md:py-16 space-y-12">
      <Helmet title="Venue Guide | Experience Lagos | NICE Lagos 2026">
        <meta name="description" content={`Detailed venue guide for ${CONFERENCE.venue.shortName}, Agidingbi, Ikeja — the host venue for NICE Lagos 2026.`} />
      </Helmet>

      <header className="max-w-3xl">
        <Badge className="bg-brand-primary/10 text-brand-primary mb-3">Experience Lagos · Venue</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">{CONFERENCE.venue.name}</h1>
        <p className="text-lg text-muted-foreground">
          The official host venue for the {CONFERENCE.edition}. A modern, secure facility in the heart of Ikeja's Central Business District.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-8 items-start">
        <div className="w-full aspect-video overflow-hidden rounded-lg border">
          <iframe
            title={CONFERENCE.venue.name}
            width="100%"
            height="100%"
            loading="lazy"
            src="https://www.google.com/maps?q=Academy+Guest+House+Agidingbi+Ikeja+Lagos&output=embed"
            allowFullScreen
          />
        </div>
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-3">At a Glance</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />{CONFERENCE.venue.address}</li>
            <li><strong>Distance from MMIA:</strong> ~15–25 minutes by road</li>
            <li><strong>Nearest Landmarks:</strong> Lagos State Secretariat, Alausa; Ikeja City Mall</li>
            <li><strong>Public Transport:</strong> Uber, Bolt, inDrive; BRT along Mobolaji Bank Anthony Way</li>
            <li><strong>Capacity:</strong> Multiple halls suitable for plenary, technical breakouts and exhibitions</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <Button asChild variant="professional" size="sm"><Link to="/registration">Register Now</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/experience/transport">Transport Tips</Link></Button>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Facilities & Amenities</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <Card key={f.title} className="p-5">
              <f.icon className="w-8 h-8 text-brand-primary mb-3" />
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
