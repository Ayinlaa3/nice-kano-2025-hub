import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import logo from "@/assets/nice-logo.svg";
import heroBridge from "@/assets/hero-bridge.jpg";
import heroGreen from "@/assets/hero-green-building.jpg";
import heroHighway from "@/assets/hero-highway.jpg";
import { CalendarDays, MapPin, Building2, HardHat, Users, Briefcase, Award, GraduationCap, Handshake, Landmark, Beer, Presentation, PartyPopper, Phone, Mail, ExternalLink } from "lucide-react";
import { useMemo } from "react";

const REG_FORM = "https://forms.gle/HXocP4aGn5Pb1HmR6";

const activities = [
  { title: "Technical Project Site Visit", icon: Landmark },
  { title: "Construction Tech Expo", icon: Building2 },
  { title: "Career Clinic for Graduates", icon: GraduationCap },
  { title: "National Chairman’s Cocktail", icon: Beer },
  { title: "Engineering Business Roundtable", icon: Briefcase },
  { title: "Technical Sessions", icon: Presentation },
  { title: "Fellowship Conferment & Fellows Roundtable", icon: Award },
  { title: "Exhibitions", icon: Handshake },
  { title: "Celebration of Achievers", icon: PartyPopper },
  { title: "Students and Graduates Programs", icon: Users },
  { title: "Spouses Programs", icon: Users },
  { title: "Annual General Meeting", icon: HardHat },
  { title: "Dinner, Awards, and Cultural Gala", icon: Award },
];

const Index = () => {
  const { toast } = useToast();

  const eventJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name:
        "NICE 23rd International Civil Engineering Conference & AGM — Kano 2025",
      startDate: "2025-10-21",
      endDate: "2025-10-23",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "Coronation Hall, Kano Government House",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kano",
          addressRegion: "Kano State",
          addressCountry: "NG",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Nigerian Institution of Civil Engineers (NICE)",
        url: "https://nicehq.org",
      },
      url: typeof window !== "undefined" ? window.location.href : undefined,
      image: [heroBridge, heroGreen, heroHighway],
      description:
        "Theme: Integration of Innovative Construction Towards Sustainable Civil Infrastructure Development.",
    }),
    []
  );

// Contact form moved to dedicated page

  return (
    <>
      <Helmet>
        <title>NICE Kano 2025 Conference & AGM | 21–23 Oct 2025</title>
        <meta
          name="description"
          content="Nigeria’s premier civil engineering conference by NICE. 21–23 Oct 2025, Coronation Hall, Kano. Register and explore sponsorship opportunities."
        />
        <link
          rel="canonical"
          href={typeof window !== "undefined" ? window.location.href : "/"}
        />
        <script type="application/ld+json">{JSON.stringify(eventJsonLd)}</script>
      </Helmet>

{/* Header moved to MainLayout */}

      {/* Hero */}
      <section id="top" className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/0 to-background/80 pointer-events-none" />
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {[heroBridge, heroGreen, heroHighway].map((src, idx) => (
              <CarouselItem key={idx}>
                <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
                  <img
                    src={src}
                    alt="NICE Kano 2025 hero visual"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14 text-left max-w-6xl mx-auto">
                    <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand ring-1 ring-brand/20 mb-4">
                      <CalendarDays className="h-4 w-4" /> 21–23 Oct 2025
                      <span className="mx-2">•</span>
                      <MapPin className="h-4 w-4" /> Coronation Hall, Kano Government House
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight animate-enter">
                      Integration of Innovative Construction Towards Sustainable Civil Infrastructure Development
                    </h1>
                    <p className="mt-3 text-muted-foreground max-w-3xl">
                      The 23rd International Civil Engineering Conference and Annual General Meeting of the Nigerian Institution of Civil Engineers (NICE).
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button asChild variant="brand" size="xl" className="hover-scale">
                        <a href={REG_FORM} target="_blank" rel="noreferrer">
                          Register Now
                        </a>
                      </Button>
                      <Button asChild variant="brandSecondary" size="xl" className="hover-scale">
                        <a href="#sponsors">Sponsor Us</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      {/* About */}
      <main>
        <section id="about" className="container mx-auto py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5">
              <div className="rounded-xl bg-brand/5 ring-1 ring-brand/10 p-6">
                <img src={logo} alt="NICE logo" className="h-14 w-auto" />
                <p className="mt-4 text-sm text-muted-foreground">
                  The Nigerian Institution of Civil Engineers (NICE) is the premier body for civil engineers in Nigeria, fostering excellence across construction, structural, highway, geotechnics, and water resources engineering.
                </p>
              </div>
            </div>
            <article className="md:col-span-7">
              <h2 className="text-2xl md:text-3xl font-bold">About the Conference</h2>
              <p className="mt-4 leading-relaxed">
                The NICE 23rd International Civil Engineering Conference & AGM brings together engineers, industry experts, academics, students, and corporate partners for three days of knowledge sharing, innovation, and networking. As Nigeria’s premier civil engineering gathering, the conference catalyzes professional growth and showcases transformative solutions for resilient infrastructure.
              </p>
            </article>
          </div>
        </section>

        {/* Theme & Objectives */}
        <section id="theme" className="py-16 md:py-20 bg-muted/40">
          <div className="container mx-auto grid md:grid-cols-12 gap-8">
            <div className="md:col-span-6">
              <h2 className="text-2xl md:text-3xl font-bold">Conference Theme</h2>
              <p className="mt-4">
                “Integration of Innovative Construction Towards Sustainable Civil Infrastructure Development” speaks to Nigeria’s future—where modern methods, digital tools, and sustainable practices converge to deliver durable, cost-effective, and climate-resilient infrastructure.
              </p>
            </div>
            <aside className="md:col-span-6">
              <h3 className="font-semibold">Objectives</h3>
              <ul className="mt-4 grid gap-3 list-disc pl-5">
                <li>Showcase cutting-edge construction technologies and sustainable practices.</li>
                <li>Facilitate collaboration among engineers, policymakers, academia, and industry.</li>
                <li>Highlight case studies and standards for resilient infrastructure delivery.</li>
                <li>Support career advancement and mentorship for young engineers and students.</li>
                <li>Strengthen partnerships with sponsors and exhibitors shaping Nigeria’s infrastructure.</li>
              </ul>
            </aside>
          </div>
        </section>

        {/* Activities & Programs */}
        <section id="programs" className="container mx-auto py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center">Activities & Programs</h2>
          <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
            A rich, multi-track experience designed for learning, collaboration, and celebration.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activities.map(({ title, icon: Icon }) => (
              <Card key={title} className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-brand/10 ring-1 ring-brand/15 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <h4 className="font-medium">{title}</h4>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

{/* Fees moved to dedicated page */}

        {/* Sponsors CTA */}
        <section id="sponsors" className="py-16 md:py-20">
          <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Call for Sponsors & Partners</h2>
              <p className="mt-4">
                Showcase your brand to Nigeria’s leading civil engineering professionals. Sponsorship unlocks visibility across sessions, exhibition spaces, media, and curated networking opportunities.
              </p>
              <ul className="mt-4 grid gap-2 list-disc pl-5">
                <li>Premium exposure at the Construction Tech Expo and exhibitions.</li>
                <li>Speaking and panel opportunities for thought leadership.</li>
                <li>Branded experiences at high-profile networking events.</li>
              </ul>
              <div className="mt-6 flex gap-3">
                <Button variant="brand" size="lg">Become a Sponsor</Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#contact">Request Media Kit</a>
                </Button>
              </div>
            </div>
            <Card className="p-6 bg-brand/5 ring-1 ring-brand/10">
              <h3 className="font-semibold">Who should sponsor?</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Construction firms, materials manufacturers, equipment suppliers, tech companies, educational institutions, and development partners.
              </p>
            </Card>
          </div>
          {/* Sponsors logo carousel */}
          <div className="container mx-auto mt-10">
            <Carousel>
              <CarouselContent className="items-center">
                {Array.from({ length: 8 }).map((_, i) => (
                  <CarouselItem key={i} className="basis-1/2 sm:basis-1/4 lg:basis-1/6">
                    <img src="/placeholder.svg" alt={`Sponsor logo ${i+1}`} className="h-12 w-auto mx-auto opacity-80" loading="lazy" />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

{/* Travel moved to dedicated page */}

{/* Contact moved to dedicated page */}
      </main>

{/* Footer moved to MainLayout */}
    </>
  );
};

export default Index;
