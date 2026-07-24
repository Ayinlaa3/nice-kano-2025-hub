import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MapPin,
  Wifi,
  Car,
  Utensils,
  Shield,
  Accessibility,
  Plane,
  Bus,
  Train,
  AlertTriangle,
  Clock,
  Star,
  Building2,
  Wallet,
  Music2,
  Landmark,
  Waves,
  Palette,
  Sparkles,
  Sun,
  CreditCard,
  Phone,
} from "lucide-react";
import { CONFERENCE } from "@/config/conference";

const VENUE_FEATURES = [
  { icon: Wifi, title: "Full A/V & Wi-Fi", desc: "Multi-room A/V rigs, live-stream capable, high-capacity Wi-Fi throughout." },
  { icon: Car, title: "Ample Parking", desc: "Secure on-site parking for delegates and VIP arrivals." },
  { icon: Utensils, title: "Catering & Lounges", desc: "Dedicated catering halls, coffee lounges and networking corners." },
  { icon: Shield, title: "24/7 Security", desc: "Controlled access, on-site security, CCTV and marshalled entry points." },
  { icon: Accessibility, title: "Accessibility", desc: "Step-free access, accessible restrooms and reserved seating on request." },
  { icon: Landmark, title: "Central Location", desc: "In the heart of Ikeja CBD, minutes from Alausa Secretariat and Ikeja City Mall." },
];

const HOTEL_TIERS = [
  {
    icon: Star,
    tier: "Premium (5★)",
    price: "₦220,000 – ₦780,000 / night",
    picks: ["Sheraton Lagos, Ikeja", "Radisson Blu Anchorage, VI", "Lagos Continental, VI", "Southern Sun Ikoyi"],
    note: "For VIP delegates and international guests seeking full-service luxury.",
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

const LANDMARKS = [
  { icon: Waves, title: "Lekki Conservation Centre", desc: "Africa's longest canopy walkway above a coastal rainforest reserve." },
  { icon: Palette, title: "Nike Art Gallery", desc: "Five floors of Nigerian art, textiles and sculpture in Lekki Phase 1." },
  { icon: Music2, title: "New Afrika Shrine", desc: "The living home of Afrobeat, hosting Femi and Made Kuti live." },
  { icon: Landmark, title: "Freedom Park, Lagos Island", desc: "Colonial-era prison turned cultural park — heritage, music and food." },
  { icon: Sparkles, title: "Lekki-Ikoyi Cable-Stayed Bridge", desc: "Iconic skyline crossing — best viewed at sunset from the Ikoyi side." },
  { icon: Sun, title: "Elegushi & Landmark Beaches", desc: "Weekend beach clubs, live DJs and grilled seafood on the Atlantic." },
];

const FOOD = [
  { name: "Jollof Rice", desc: "The one and only — try it at Terra Kulture, Cactus, or any roadside 'party jollof' pot." },
  { name: "Suya & Asun", desc: "Spicy grilled beef and peppered goat, best from a smoky evening mai suya stand." },
  { name: "Amala & Ewedu", desc: "Yam-flour swallow with jute-leaf soup — a Lagos institution at Amala Skye and Iya Eba." },
  { name: "Boli & Fish", desc: "Roasted plantain with grilled tilapia and pepper sauce — a Bar Beach classic." },
  { name: "Small Chops", desc: "Puff-puff, samosas, spring rolls and peppered gizzard — the unofficial Lagos snack." },
];

const CULTURE = [
  "Greet with a smile — 'How now?' and 'You dey kampe?' go a long way.",
  "Naira is king, but cards work in most hotels, malls and fine-dining spots.",
  "Traffic ('go-slow') is a way of life — build a 30-minute buffer into every plan.",
  "Fridays and Sundays are owambe days — expect drums, aso-ebi and celebrations.",
  "Lagos runs on generators, POS agents and hustle — keep small Naira notes handy.",
];

const CONNECTIVITY = [
  { label: "SIM cards", value: "MTN, Airtel, Glo and 9mobile kiosks at MMIA arrivals. Bring your passport for NIN registration." },
  { label: "Power", value: "230V, Type G (UK) sockets. Hotels have backup generators; carry a power bank for long days." },
  { label: "Currency", value: "Naira (₦). ATMs everywhere; notify your bank before travel. USD cash accepted at bureaux de change." },
  { label: "Tipping", value: "10% is appreciated in restaurants; ₦500–₦1,000 for porters and drivers." },
  { label: "Emergency", value: "Dial 112 for Police, LASEMA and medical response." },
];

const FAQS = [
  {
    q: "Do I need a visa to attend NICE Lagos 2026?",
    a: "Most non-ECOWAS nationals require a Nigerian visa. Apply through the Nigeria Immigration Service portal or your nearest Nigerian High Commission. NICE can issue a formal invitation letter on request after registration.",
  },
  {
    q: "Which airport should I fly into?",
    a: "Murtala Muhammed International Airport (LOS), Ikeja. The venue is 15–25 minutes away by road, and most partner hotels offer complimentary airport pickup on request.",
  },
  {
    q: "How safe is Lagos for delegates?",
    a: "Ikeja, Alausa, Ikoyi and Victoria Island — where the venue and partner hotels are located — are well-patrolled business districts. Use ride-hailing apps (Bolt, Uber, inDrive), keep valuables out of sight in traffic, and always carry your conference tag.",
  },
  {
    q: "What is the weather like in October?",
    a: "Warm and humid, roughly 24–31°C, with a chance of brief afternoon showers as the rainy season winds down. Pack breathable clothing, a light jacket for air-conditioned halls and a compact umbrella.",
  },
  {
    q: "Will there be shuttle service from partner hotels?",
    a: "Yes — organised shuttles will run between selected partner hotels and the venue on programme days. Details will be confirmed in your delegate pack.",
  },
  {
    q: "Can I pay in USD or by international card?",
    a: "The conference fee is billed in Naira (with an international delegate flat rate). International Visa/Mastercard payments are supported through Remita. Most Lagos hotels accept major international cards.",
  },
  {
    q: "Is there a spouse programme?",
    a: "Yes — the spouse programme includes guided tours of Lagos landmarks (Lekki Conservation Centre, Nike Art Gallery, New Afrika Shrine), cultural workshops and social activities. Included with main registration.",
  },
  {
    q: "What should I wear?",
    a: "Formal business attire for plenary and technical sessions; smart casual for evenings; comfortable closed shoes and light clothing for the technical site tour.",
  },
  {
    q: "How do I collect my delegate pack?",
    a: `Delegate packs are collected at the on-site registration desk at ${CONFERENCE.venue.shortName} from the evening before Day 1. Bring a valid ID and your registration confirmation.`,
  },
];

export default function ExperienceLagos() {
  return (
    <div className="container mx-auto py-12 md:py-16 space-y-16">
      <Helmet title={`Experience Lagos | NICE ${CONFERENCE.shortName}`}>
        <meta
          name="description"
          content="Your complete delegate guide to Lagos for NICE 2026 — venue, transport, hotels, landmarks, food, culture and FAQs."
        />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/experience"} />
      </Helmet>

      {/* Hero */}
      <header className="text-center max-w-3xl mx-auto">
        <p className="text-brand-primary font-semibold uppercase tracking-widest text-sm mb-3">This Is Lagos</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-brand-primary via-brand-green to-brand-red bg-clip-text text-transparent">
          Experience Lagos
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Everything you need to arrive, stay and thrive in Africa's most dynamic megacity during the {CONFERENCE.edition}.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
          <a href="#venue" className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition">Venue</a>
          <a href="#transport" className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition">Transport</a>
          <a href="#accommodation" className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition">Hotels</a>
          <a href="#landmarks" className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition">Landmarks</a>
          <a href="#food" className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition">Food</a>
          <a href="#culture" className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition">Culture</a>
          <a href="#essentials" className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition">Essentials</a>
          <a href="#faq" className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition">FAQ</a>
        </div>
      </header>

      {/* Venue */}
      <section id="venue" className="space-y-6 scroll-mt-24">
        <div className="max-w-3xl">
          <Badge className="bg-brand-primary/10 text-brand-primary mb-3">Venue</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{CONFERENCE.venue.name}</h2>
          <p className="text-muted-foreground">
            The official host venue — a modern, secure facility in the heart of Ikeja's Central Business District.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
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
            <h3 className="text-xl font-semibold mb-3">At a Glance</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />{CONFERENCE.venue.address}</li>
              <li><strong>Distance from MMIA:</strong> ~15–25 minutes by road</li>
              <li><strong>Nearest Landmarks:</strong> Lagos State Secretariat, Alausa; Ikeja City Mall</li>
              <li><strong>Public Transport:</strong> Uber, Bolt, inDrive; BRT along Mobolaji Bank Anthony Way</li>
              <li><strong>Capacity:</strong> Multiple halls for plenary, technical breakouts and exhibitions</li>
            </ul>
            <div className="mt-5 flex gap-3">
              <Button asChild variant="professional" size="sm"><Link to="/registration">Register Now</Link></Button>
              <Button asChild variant="outline" size="sm"><Link to="/location">Directions</Link></Button>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {VENUE_FEATURES.map((f) => (
            <Card key={f.title} className="p-5">
              <f.icon className="w-8 h-8 text-brand-primary mb-3" />
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Transport */}
      <section id="transport" className="space-y-6 scroll-mt-24">
        <div className="max-w-3xl">
          <Badge className="bg-brand-primary/10 text-brand-primary mb-3">Transport</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Getting Around Lagos</h2>
          <p className="text-muted-foreground">
            Lagos moves fast — with the right prep, so will you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <Plane className="w-8 h-8 text-brand-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Arriving by Air</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Fly into <strong>Murtala Muhammed International Airport (LOS)</strong>, Ikeja. Most partner hotels are within 10–25 minutes of the venue and offer complimentary airport pickup on request.
            </p>
            <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
              <li>Domestic terminal (MMA2) is a short drive from the international terminal.</li>
              <li>Arrival halls have MTN, Airtel, Glo and 9mobile SIM kiosks.</li>
              <li>Use only pre-booked or in-terminal official taxi services.</li>
            </ul>
          </Card>

          <Card className="p-6">
            <Car className="w-8 h-8 text-brand-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Ride-Hailing</h3>
            <p className="text-sm text-muted-foreground mb-3">
              <strong>Bolt, Uber</strong> and <strong>inDrive</strong> are widely available. Confirm the driver, plate and fare in-app before starting a trip.
            </p>
            <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
              <li>Airport pickups have a designated ride-hailing zone — follow signage.</li>
              <li>Fares surge sharply during rush hour; consider waiting 30 minutes.</li>
              <li>Cash and card are accepted; keep small Naira notes handy.</li>
            </ul>
          </Card>

          <Card className="p-6">
            <Bus className="w-8 h-8 text-brand-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">BRT & Local Buses</h3>
            <p className="text-sm text-muted-foreground mb-3">
              The <strong>BRT (Bus Rapid Transit)</strong> corridor along Mobolaji Bank Anthony Way and Ikorodu Road is a reliable, low-cost option around Ikeja and the mainland.
            </p>
            <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
              <li>Buy a Cowry card at any BRT terminal to tap and ride.</li>
              <li>Avoid unregulated "danfo" buses if you are unfamiliar with routes.</li>
            </ul>
          </Card>

          <Card className="p-6">
            <Train className="w-8 h-8 text-brand-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Lagos Rail</h3>
            <p className="text-sm text-muted-foreground mb-3">
              The <strong>Blue Line</strong> (Marina ↔ Mile 2) and <strong>Red Line</strong> (Oyingbo ↔ Agbado) offer air-conditioned, congestion-free travel. Ikeja is well served by the Red Line.
            </p>
            <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
              <li>Purchase a rail Cowry card or top up at any station.</li>
              <li>Check the latest LAMATA schedule before you travel.</li>
            </ul>
          </Card>

          <Card className="p-6 border-brand-primary/30">
            <Clock className="w-8 h-8 text-brand-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Traffic Windows</h3>
            <p className="text-sm text-muted-foreground">
              Lagos traffic peaks between <strong>7:00–10:00 AM</strong> and <strong>4:00–8:00 PM</strong> on weekdays. Plan movements outside these windows where possible; the conference programme is built around this reality.
            </p>
          </Card>

          <Card className="p-6 border-brand-primary/30">
            <AlertTriangle className="w-8 h-8 text-brand-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Safety on the Move</h3>
            <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
              <li>Keep valuables out of sight, especially in traffic.</li>
              <li>Share your live location with a trusted contact during rides.</li>
              <li>Emergency: dial <strong>112</strong> (Police / LASEMA / Medical).</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Accommodation */}
      <section id="accommodation" className="space-y-6 scroll-mt-24">
        <div className="max-w-3xl">
          <Badge className="bg-brand-primary/10 text-brand-primary mb-3">Where to Stay</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Accommodation Highlights</h2>
          <p className="text-muted-foreground">
            Curated hotel tiers around Ikeja, Alausa, Ikoyi and Victoria Island — with the full directory on the Hotels & Travel page.
          </p>
          <p className="text-xs text-muted-foreground mt-1 italic">
            Rates below are indicative. Confirmed delegate rates will be published closer to the conference.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {HOTEL_TIERS.map((t) => (
            <Card key={t.tier} className="p-6 flex flex-col">
              <t.icon className="w-8 h-8 text-brand-primary mb-3" />
              <h3 className="text-xl font-semibold">{t.tier}</h3>
              <p className="text-brand-primary font-medium mt-1">{t.price}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {t.picks.map((p) => (
                  <li key={p} className="text-muted-foreground">• {p}</li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground mt-4 flex-1">{t.note}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="professional" size="lg">
            <Link to="/hotels-travel">See Full Hotel Directory</Link>
          </Button>
        </div>
      </section>

      {/* Landmarks */}
      <section id="landmarks" className="space-y-6 scroll-mt-24">
        <div className="max-w-3xl">
          <Badge className="bg-brand-primary/10 text-brand-primary mb-3">Discover Lagos</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Landmarks & Experiences</h2>
          <p className="text-muted-foreground">
            When the sessions wrap, Lagos opens up. A short list to build your after-hours around.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LANDMARKS.map((l) => (
            <Card key={l.title} className="p-5 hover:border-brand-primary/40 transition">
              <l.icon className="w-8 h-8 text-brand-primary mb-3" />
              <h3 className="font-semibold mb-1">{l.title}</h3>
              <p className="text-sm text-muted-foreground">{l.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Food */}
      <section id="food" className="space-y-6 scroll-mt-24">
        <div className="max-w-3xl">
          <Badge className="bg-brand-primary/10 text-brand-primary mb-3">Taste Lagos</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Food You Must Try</h2>
          <p className="text-muted-foreground">
            You haven't done Lagos until your plate has told the story.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FOOD.map((f) => (
            <Card key={f.name} className="p-5">
              <h3 className="font-semibold text-lg text-brand-primary mb-1">{f.name}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Culture */}
      <section id="culture" className="space-y-6 scroll-mt-24">
        <div className="max-w-3xl">
          <Badge className="bg-brand-primary/10 text-brand-primary mb-3">Local Know-How</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Culture & Etiquette</h2>
          <p className="text-muted-foreground">
            A handful of unwritten rules that will make you feel like a local.
          </p>
        </div>
        <Card className="p-6">
          <ul className="grid md:grid-cols-2 gap-3 text-sm">
            {CULTURE.map((c, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-brand-primary font-bold">•</span>
                <span className="text-muted-foreground">{c}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Essentials */}
      <section id="essentials" className="space-y-6 scroll-mt-24">
        <div className="max-w-3xl">
          <Badge className="bg-brand-primary/10 text-brand-primary mb-3">Delegate Essentials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Connectivity, Money & Emergencies</h2>
          <p className="text-muted-foreground">
            Practical details to keep you connected, funded and safe throughout your stay.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {CONNECTIVITY.map((c) => (
            <Card key={c.label} className="p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-brand-primary/10 text-brand-primary shrink-0">
                  {c.label === "SIM cards" && <Phone className="w-5 h-5" />}
                  {c.label === "Power" && <Sparkles className="w-5 h-5" />}
                  {c.label === "Currency" && <CreditCard className="w-5 h-5" />}
                  {c.label === "Tipping" && <Wallet className="w-5 h-5" />}
                  {c.label === "Emergency" && <AlertTriangle className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{c.label}</h3>
                  <p className="text-sm text-muted-foreground">{c.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="space-y-6 scroll-mt-24 max-w-3xl mx-auto">
        <div>
          <Badge className="bg-brand-primary/10 text-brand-primary mb-3">FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Delegate FAQ</h2>
          <p className="text-muted-foreground">Quick answers for delegates travelling to Lagos.</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="text-center bg-gradient-to-r from-brand-primary/10 via-brand-green/10 to-brand-yellow/10 rounded-2xl p-10 md:p-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">See you in Lagos.</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Register today and lock in your seat at the {CONFERENCE.edition}.
        </p>
        <Button asChild variant="professional" size="lg">
          <Link to="/registration">Register Now</Link>
        </Button>
      </section>
    </div>
  );
}
