import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Plane, Building2, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { CONFERENCE } from "@/config/conference";

const LANDMARKS = [
  {
    title: "Eko Atlantic City",
    description: "A globally recognised coastal reclamation and smart-city project rising along the Atlantic — a living case study in resilient marine infrastructure.",
  },
  {
    title: "Lekki–Ikoyi Cable-Stayed Bridge",
    description: "An iconic 1.36 km cable-stayed structure symbolising modern Nigerian bridge engineering and Lagos' relentless growth.",
  },
  {
    title: "Third Mainland Bridge",
    description: "One of Africa's longest bridges, connecting Lagos Island to the Mainland — a triumph of long-span marine engineering.",
  },
  {
    title: "Lekki Deep Sea Port",
    description: "West Africa's deepest seaport and a flagship PPP mega-project transforming regional trade and logistics.",
  },
  {
    title: "Nike Art Gallery, Lekki",
    description: "The largest art gallery in West Africa — a five-storey celebration of Nigerian creativity, textiles and sculpture.",
  },
  {
    title: "New Afrika Shrine",
    description: "Home of Afrobeat and Fela Kuti's musical legacy — a vibrant cultural landmark in Ikeja.",
  },
];

export default function Location() {
  return (
    <>
      <Helmet title={`Location: Lagos, Nigeria | ${CONFERENCE.shortName}`}>
        <meta name="description" content={`Welcome to Lagos — the megacity host of NICE ${CONFERENCE.year}. Discover the venue, landmarks and delegate experience.`} />
      </Helmet>

      <div className="container mx-auto py-12 md:py-16 space-y-16">
        {/* Hero */}
        <section className="text-center max-w-4xl mx-auto">
          <Badge className="bg-brand-primary/10 text-brand-primary mb-4">Host City · Lagos, Nigeria</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Lagos
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Africa's most dynamic megacity — the commercial heartbeat of Nigeria and a living laboratory of civil engineering at scale.
          </p>
          <p className="text-lg text-muted-foreground">
            NICE proudly welcomes you to Lagos for the {CONFERENCE.edition} — three days of ideas, infrastructure and unforgettable culture.
          </p>
        </section>

        {/* Why Lagos */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Why Lagos?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <Building2 className="w-8 h-8 text-brand-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">A Living Case Study</h3>
              <p className="text-sm text-muted-foreground">From coastal defences and deep-sea ports to elevated rails and cable-stayed bridges — Lagos is where civil engineering meets ambition.</p>
            </Card>
            <Card className="p-6">
              <Compass className="w-8 h-8 text-brand-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">Africa's Growth Engine</h3>
              <p className="text-sm text-muted-foreground">Home to over 20 million people, Lagos contributes a significant share of Nigeria's GDP and drives West African commerce, innovation and culture.</p>
            </Card>
            <Card className="p-6">
              <Plane className="w-8 h-8 text-brand-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">Globally Connected</h3>
              <p className="text-sm text-muted-foreground">Direct flights from London, Dubai, Addis, Johannesburg, Atlanta and beyond via Murtala Muhammed International Airport.</p>
            </Card>
          </div>
        </section>

        {/* Venue */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-2">Conference Venue</h2>
          <p className="text-center text-muted-foreground mb-8">
            All plenary and technical sessions will take place at:
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-center">
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
              <Badge className="bg-brand-primary/10 text-brand-primary mb-3">Official Venue</Badge>
              <h3 className="text-2xl font-semibold mb-2">{CONFERENCE.venue.name}</h3>
              <p className="text-muted-foreground mb-4">
                A modern, secure conference facility located in the Agidingbi–Ikeja Central Business District — the administrative and business heart of Lagos State. It offers world-class halls, exhibition space, ample parking and easy access from Murtala Muhammed International Airport.
              </p>
              <p className="text-sm flex items-start gap-2 mb-4"><MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />{CONFERENCE.venue.address}</p>
              <div className="flex gap-3">
                <Button asChild variant="professional" size="sm">
                  <Link to="/registration">Register Now</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/hotels-travel">Hotels & Travel</Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Landmarks */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-2">Lagos Landmarks & Experiences</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Between sessions, explore the landmarks that make Lagos one of the most exciting cities on the African continent.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LANDMARKS.map((l) => (
              <Card key={l.title} className="p-5 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2">{l.title}</h3>
                <p className="text-sm text-muted-foreground">{l.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
