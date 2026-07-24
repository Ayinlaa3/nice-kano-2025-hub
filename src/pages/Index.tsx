import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import {
  ArrowRight,
  Building2,
  Cpu,
  Waves,
  Leaf,
  TrendingUp,
  Ship,
  Landmark,
  Users,
  Award,
  Sparkles,
  MapPin,
  CalendarDays,
} from "lucide-react";

import Hero from "@/components/Hero";
import { CONFERENCE } from "@/config/conference";
import bridge from "@/assets/lagos/third-mainland-bridge.jpg";
import ekoNight from "@/assets/lagos/eko-atlantic-night.jpg";
import lekkiBridge from "@/assets/lagos/lekki-ikoyi-bridge.jpg";
import port from "@/assets/lagos/lekki-port.jpg";

const subThemeIcons = [Leaf, Building2, Cpu, Waves, Ship, TrendingUp, Landmark];

const experiences = [
  { title: "Cultural Night", desc: "Afrobeats, drums, fashion & Lagos energy.", to: "/about" },
  { title: "Annual Dinner & Awards", desc: "Recognising excellence in civil engineering.", to: "/about" },
  { title: "Technical Site Tours", desc: "Lekki Port, Eko Atlantic, Third Mainland & more.", to: "/location" },
  { title: "Spouses Programme", desc: "Curated Lagos experiences for accompanying guests.", to: "/about" },
  { title: "Students & Young Engineers", desc: "Competitions, mentorship, career clinics.", to: "/innovationchallenge" },
  { title: "Exhibitions & Expo", desc: "Cutting-edge construction tech and materials.", to: "/sponsorships" },
];

const dayPreview = [
  {
    day: "Day 1",
    date: "Mon · 20 Oct",
    title: "Opening & Keynotes",
    body: "Grand opening, keynote addresses, plenary on sustainable infrastructure for economic growth.",
  },
  {
    day: "Day 2",
    date: "Tue · 21 Oct",
    title: "Technical Sessions & AGM",
    body: "Parallel technical tracks, business roundtable, NICE Annual General Meeting.",
  },
  {
    day: "Day 3",
    date: "Wed · 22 Oct",
    title: "Awards, Dinner & Tours",
    body: "Fellowship conferment, gala dinner, cultural night, technical site visits across Lagos.",
  },
];

const Index = () => {
  const eventJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: `NICE ${CONFERENCE.edition} & AGM — Lagos 2026`,
      startDate: CONFERENCE.dates.startISO,
      endDate: CONFERENCE.dates.endISO,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: CONFERENCE.venue.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: CONFERENCE.venue.address,
          addressLocality: CONFERENCE.venue.city,
          addressRegion: CONFERENCE.venue.region,
          addressCountry: CONFERENCE.venue.country,
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Nigerian Institution of Civil Engineers (NICE)",
        url: CONFERENCE.organiserUrl,
      },
      description: `Theme: ${CONFERENCE.theme}. ${CONFERENCE.tagline}`,
    }),
    []
  );

  return (
    <>
      <Helmet title="THIS IS LAGOS!!! · NICE 24th International Conference · Oct 2026">
        <meta
          name="description"
          content="Nigeria's premier civil engineering conference. Lagos, 20–22 October 2026. 3,000+ delegates, 30+ nations. Sustainable & resilient infrastructure for economic growth."
        />
        <script type="application/ld+json">{JSON.stringify(eventJsonLd)}</script>
      </Helmet>

      <Hero />

      {/* Marquee-style theme band */}
      <div className="border-y border-border/60 bg-card/50 backdrop-blur overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 py-4 flex items-center gap-6 text-sm text-muted-foreground whitespace-nowrap overflow-x-auto">
          <span className="text-accent font-medium uppercase tracking-widest">Theme</span>
          <span className="text-foreground/80">{CONFERENCE.theme}</span>
        </div>
      </div>

      {/* Why Lagos */}
      <section className="container mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-elegant ring-1 ring-border">
              <img
                src={ekoNight}
                alt="Lagos skyline"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-gradient-eko rounded-2xl p-6 shadow-gold">
              <div className="font-display text-5xl text-white leading-none">180+</div>
              <div className="text-xs uppercase tracking-widest text-white/90 mt-2">
                Years of Lagos<br />engineering legacy
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-accent">
              <Sparkles className="h-3.5 w-3.5" /> Why Lagos
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-tight">
              From <span className="italic text-gradient-gold">Ojuelegba to Lekki</span> —
              a city engineered by ambition, nutured by vision.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Lagos is West Africa's engineering laboratory. From the 1841 first-storey
              building to the Lekki Deep Sea Port, Third Mainland Bridge and Eko
              Atlantic City, this megacity of 21+ million tells the story of Nigerian
              civil engineering at its most audacious.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              For three days in October 2026, {CONFERENCE.organisationShort} brings
              the profession home to where it built its boldest chapters.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/about">Read the story <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="hover:text-accent">
                <Link to="/location">Explore the venue</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-themes */}
      <section className="bg-card/30 border-y border-border/60 py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <div className="text-xs uppercase tracking-[0.25em] text-accent mb-4">
              Conference Tracks
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Seven pillars of resilient infrastructure.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONFERENCE.subThemes.map((t, i) => {
              const Icon = subThemeIcons[i % subThemeIcons.length];
              return (
                <Card
                  key={t}
                  className="group p-8 bg-card border-border hover:border-accent/50 transition-all cultural-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-eko flex items-center justify-center shrink-0 shadow-green group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-accent/80 uppercase tracking-widest mb-1">
                        Track {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="font-display text-xl leading-snug">{t}</h3>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programme teaser */}
      <section className="container mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-accent mb-4">
              Three-day Programme
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight max-w-2xl">
              A choreography of ideas, industry & culture.
            </h2>
          </div>
          <Button asChild variant="ghost" className="hover:text-accent">
            <Link to="/program">View full programme <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {dayPreview.map((d) => (
            <Card
              key={d.day}
              className="relative overflow-hidden p-8 bg-card border-border hover:border-accent/40 transition-all cultural-card"
            >
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-radial-gold pointer-events-none" />
              <div className="text-xs uppercase tracking-widest text-accent">{d.date}</div>
              <div className="font-display text-5xl text-gradient-gold mt-2">{d.day}</div>
              <h3 className="font-display text-2xl mt-6">{d.title}</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed">{d.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Experience Lagos */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--background) / 0.9), hsl(var(--background) / 0.95)), url(${lekkiBridge})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <div className="text-xs uppercase tracking-[0.25em] text-accent mb-4">
              Beyond the Conference Hall
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              The full Lagos experience.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {experiences.map((e) => (
              <Link
                key={e.title}
                to={e.to}
                className="group block p-8 rounded-2xl bg-card/80 backdrop-blur border border-border hover:border-accent transition-all cultural-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-2xl">{e.title}</h3>
                  <ArrowRight className="h-5 w-5 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-muted-foreground leading-relaxed">{e.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <section className="container mx-auto px-6 lg:px-12 py-24">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-midnight border border-accent/30 p-10 md:p-20 shadow-elegant">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url(${bridge})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />

          <div className="relative max-w-2xl space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] text-accent">
              EARLY-BIRD RATES END 15 SEPT. 2026
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-tight">
              Your seat at Nigeria's engineering summit awaits.
            </h2>
            <p className="text-lg text-muted-foreground">
              Join 3,000+ delegates from 30+ nations for three days of ideas,
              industry and culture in Lagos.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="xl" className="bg-gradient-eko text-white shadow-gold hover:shadow-green group">
                <Link to="/registration">
                  Reserve your place
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground">
                <Link to="/sponsorships">Sponsor & exhibit</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-accent" /> {CONFERENCE.dates.displayLong}</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> {CONFERENCE.venue.name}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
