import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { MapPin, Car, Building2, HelpCircle } from "lucide-react";
import { CONFERENCE } from "@/config/conference";

const SECTIONS = [
  { to: "/experience/venue", icon: MapPin, title: "Venue Guide", desc: `Everything about ${CONFERENCE.venue.shortName} — halls, access, parking and amenities.` },
  { to: "/experience/transport", icon: Car, title: "Transport Tips", desc: "Airport transfers, ride-hailing, traffic patterns and shuttle info for Lagos." },
  { to: "/experience/accommodation", icon: Building2, title: "Accommodation Highlights", desc: "Curated hotel picks around Ikeja, Alausa and beyond with delegate-friendly rates." },
  { to: "/experience/faq", icon: HelpCircle, title: "Delegate FAQ", desc: "Answers to the most common questions from first-time Lagos delegates." },
];

export default function ExperienceLagos() {
  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet title="Experience Lagos | NICE Lagos 2026">
        <meta name="description" content="Your delegate hub for NICE Lagos 2026 — venue, transport, accommodation and FAQs to help you make the most of Lagos." />
      </Helmet>
      <header className="text-center mb-12 max-w-3xl mx-auto">
        <p className="text-brand-primary font-semibold uppercase tracking-widest text-sm mb-3">This Is Lagos</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience Lagos</h1>
        <p className="text-lg text-muted-foreground">
          Your delegate hub for {CONFERENCE.edition}. Everything you need to arrive, stay and thrive in Africa's most dynamic megacity.
        </p>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        {SECTIONS.map((s) => (
          <Link key={s.to} to={s.to} className="group">
            <Card className="p-6 h-full hover:shadow-lg hover:border-brand-primary/40 transition-all">
              <s.icon className="w-10 h-10 text-brand-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-brand-primary transition-colors">{s.title}</h2>
              <p className="text-muted-foreground">{s.desc}</p>
              <span className="text-sm text-brand-primary mt-4 inline-block">Explore →</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
