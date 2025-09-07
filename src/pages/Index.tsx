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
import heroConstruction from "@/assets/hero-construction.jpg";
import heroSustainable from "@/assets/hero-sustainable.jpg";
import { CalendarDays, MapPin, Building2, HardHat, Users, Briefcase, Award, GraduationCap, Handshake, Landmark, Beer, Presentation, ChevronDown, Mic, Star } from "lucide-react";
import { useMemo, useState } from "react";
import Hero from "@/components/Hero";




const REG_FORM = "https://forms.gle/HXocP4aGn5Pb1HmR6";

const activities = [
  { 
    title: "Technical Project Site Visit", 
    icon: Landmark,
    description: "Guided tours of major civil engineering projects in Kano, showcasing innovative construction techniques and sustainable infrastructure development."
  },
  { 
    title: "Construction Tech Expo", 
    icon: Building2,
    description: "Exhibition of cutting-edge construction technologies, materials, and equipment from leading industry players."
  },
  { 
    title: "Career Clinic for Graduates", 
    icon: GraduationCap,
    description: "Professional development sessions, CV reviews, and career guidance for young engineers and recent graduates."
  },
  { 
    title: "National Chairman's Cocktail", 
    icon: Beer,
    description: "Exclusive networking event hosted by the NICE National Chairman for distinguished members and special guests."
  },
  { 
    title: "Engineering Business Roundtable", 
    icon: Briefcase,
    description: "Strategic discussions on business opportunities, partnerships, and economic growth in the civil engineering sector."
  },
  { 
    title: "Technical Sessions", 
    icon: Presentation,
    description: "Paper presentations and research findings on innovative construction methods and sustainable infrastructure solutions."
  },
  { 
    title: "Fellowship Conferment & Fellows Roundtable", 
    icon: Award,
    description: "Recognition ceremony for new Fellows and strategic discussions among senior engineering professionals."
  },
  { 
    title: "Exhibitions", 
    icon: Handshake,
    description: "Trade exhibitions featuring construction companies, consulting firms, and technology providers showcasing their services."
  },
  { 
    title: "Students and Graduates Programs", 
    icon: Users,
    description: "Special programs designed for engineering students including competitions, mentorship sessions, and skill development workshops."
  },
  { 
    title: "Spouses Programs", 
    icon: Users,
    description: "Cultural tours, craft workshops, and social activities designed for accompanying spouses and family members."
  },
  { 
    title: "Annual General Meeting", 
    icon: HardHat,
    description: "Official NICE AGM covering institutional governance, financial reports, and strategic planning for the coming year."
  },
  { 
    title: "Dinner, Awards, and Cultural Gala", 
    icon: Award,
    description: "Grand closing ceremony featuring awards presentation, cultural performances, and celebration of engineering excellence."
  },
];

const speakers = [
  {
    name: "Prof. Adebayo Ogundimu",
    title: "Keynote Speaker",
    position: "Director General, Nigerian Building and Road Research Institute",
    topic: "Sustainable Infrastructure for Nigeria's Future",
    image: "/placeholder.svg"
  },
  {
    name: "Engr. Dr. Fatima Hassan",
    title: "Special Guest Speaker",
    position: "Federal Ministry of Works and Housing",
    topic: "Policy Framework for Infrastructure Development",
    image: "/placeholder.svg"
  },
  {
    name: "Prof. Michael Adeyemi",
    title: "Technical Speaker",
    position: "University of Lagos",
    topic: "Innovation in Construction Technology",
    image: "/placeholder.svg"
  },
  {
    name: "Engr. Sarah Abdullahi",
    title: "Industry Expert",
    position: "Managing Director, Northern Construction Ltd",
    topic: "Public-Private Partnerships in Infrastructure",
    image: "/placeholder.svg"
  }
];

const Index = () => {
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null);
  
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
      image: [heroBridge, heroGreen, heroHighway, heroConstruction, heroSustainable],
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
          content="Nigeria's premier civil engineering conference by NICE. 21–23 Oct 2025, Coronation Hall, Kano. Register and explore sponsorship opportunities."
        />
        <link
          rel="canonical"
          href={typeof window !== "undefined" ? window.location.href : "/"}
        />
        <script type="application/ld+json">{JSON.stringify(eventJsonLd)}</script>
      </Helmet>

{/* Header moved to MainLayout */}

<Hero />

      {/* About */}
      <main>
        <section id="about" className="container mx-auto px-6 lg:px-12 xl:px-16 py-16 md:py-20 animate-fade-in">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5">
              <div className="rounded-xl bg-gradient-to-br from-brand/5 via-kano-heritage/5 to-vibrant/5 ring-1 ring-brand/20 p-6 cultural-card">
                <img src={logo} alt="NICE logo" className="h-14 w-auto floating-animation" />
                <p className="mt-4 text-sm text-muted-foreground">
                  The Nigerian Institution of Civil Engineers (NICE) is the premier body for civil engineers in Nigeria, fostering excellence across construction, structural, highway, geotechnics, and water resources engineering.
                </p>
              </div>
            </div>
            <article className="md:col-span-7">
              <h2 className="text-2xl md:text-3xl font-bold">About the Conference</h2>
              <p className="mt-4 leading-relaxed">
                The NICE 23rd International Civil Engineering Conference & AGM brings together engineers, industry experts, academics, students, and corporate partners for three days of knowledge sharing, innovation, and networking. As Nigeria's premier civil engineering gathering, the conference catalyzes professional growth and showcases transformative solutions for resilient infrastructure.
              </p>
            </article>
          </div>
        </section>

        {/* Theme & Objectives */}
        <section id="theme" className="py-16 md:py-20 bg-brand/5">
          <div className="container mx-auto px-6 lg:px-12 xl:px-16 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-6">
              <h2 className="text-2xl md:text-3xl font-bold">Conference Theme</h2>
              <p className="mt-4">
                "Integration of Innovative Construction Towards Sustainable Civil Infrastructure Development" speaks to Nigeria's future—where modern methods, digital tools, and sustainable practices converge to deliver durable, cost-effective, and climate-resilient infrastructure.
              </p>
            </div>
            <aside className="md:col-span-6 mt-8 md:mt-0">
              <h3 className="font-semibold">Objectives</h3>
              <ul className="mt-4 grid gap-3 list-disc pl-5">
                <li className="transition-colors duration-300 hover:text-brand">Showcase cutting-edge construction technologies and sustainable practices.</li>
                <li className="transition-colors duration-300 hover:text-brand">Facilitate collaboration among engineers, policymakers, academia, and industry.</li>
                <li className="transition-colors duration-300 hover:text-brand">Highlight case studies and standards for resilient infrastructure delivery.</li>
                <li className="transition-colors duration-300 hover:text-brand">Support career advancement and mentorship for young engineers and students.</li>
                <li className="transition-colors duration-300 hover:text-brand">Strengthen partnerships with sponsors and exhibitors shaping Nigeria's infrastructure.</li>
              </ul>
            </aside>
          </div>
        </section>

        {/* Activities & Programs */}
        <section id="programs" className="container mx-auto px-6 lg:px-12 xl:px-16 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center">Activities & Programs</h2>
          <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
            A rich, multi-track experience designed for learning, collaboration, and celebration.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activities.map(({ title, icon: Icon, description }, idx) => (
              <Card 
                key={title} 
                className="p-5 cultural-card cursor-pointer border-l-4 border-l-transparent hover:border-l-vibrant"
                onClick={() => setExpandedActivity(expandedActivity === idx ? null : idx)}
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand/10 to-kano-heritage/20 ring-1 ring-brand/15 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-br hover:from-brand/20 hover:to-vibrant/20">
                    <Icon className="h-5 w-5 text-brand hover:text-vibrant transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{title}</h4>
                      <ChevronDown 
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                          expandedActivity === idx ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ${
                      expandedActivity === idx ? 'max-h-96 mt-3' : 'max-h-0'
                    }`}>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Conference Speakers */}
        <section id="speakers" className="py-16 md:py-20 bg-brandYellow/10">
          <div className="container mx-auto px-6 lg:px-12 xl:px-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Conference Speakers</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Learn from industry leaders, renowned academics, and policy makers shaping Nigeria's infrastructure future.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {speakers.map((speaker, idx) => (
                <Card key={idx} className="p-6 text-center cultural-card group border-t-4 border-t-brand-red">
                  <div className="relative mb-4">
                    <img 
                      src={speaker.image} 
                      alt={speaker.name}
                      className="h-24 w-24 rounded-full mx-auto object-cover ring-4 ring-brand group-hover:ring-brandYellow transition-all duration-300"
                    />
                    <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-brand-red ring-2 ring-white flex items-center justify-center">
                      <Mic className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{speaker.name}</h4>
                  <p className="text-xs text-brand font-medium mb-2">{speaker.title}</p>
                  <p className="text-xs text-muted-foreground mb-3">{speaker.position}</p>
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs font-medium">{speaker.topic}</p>
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <a href="/speakers">View All Speakers</a>
              </Button>
            </div>
          </div>
        </section>

{/* Fees moved to dedicated page */}

        {/* Sponsors CTA */}
        <section id="sponsors" className="py-16 md:py-20">
          <div className="container mx-auto px-6 lg:px-12 xl:px-16 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Call for Sponsors & Partners</h2>
              <p className="mt-4">
                Showcase your brand to Nigeria's leading civil engineering professionals. Sponsorship unlocks visibility across sessions, exhibition spaces, media, and curated networking opportunities.
              </p>
              <ul className="mt-4 grid gap-2 list-disc pl-5">
                <li className="transition-colors duration-300 hover:text-brand">Premium exposure at the Construction Tech Expo and exhibitions.</li>
                <li className="transition-colors duration-300 hover:text-brand">Speaking and panel opportunities for thought leadership.</li>
                <li className="transition-colors duration-300 hover:text-brand">Branded experiences at high-profile networking events.</li>
              </ul>
              <div className="mt-6 flex gap-3">
                <Button variant="professional" size="lg">Become a Sponsor</Button>
                <Button asChild variant="cultural" size="lg">
                  <a href="#contact">Request Media Kit</a>
                </Button>
              </div>
            </div>
            <Card className="p-6 bg-brand/5 ring-1 ring-brand/10 transition-all duration-300 hover:shadow-lg hover:bg-brand/10">
              <h3 className="font-semibold flex items-center gap-2">
                <Star className="h-5 w-5 text-brand" />
                Why Sponsor KANO 2025?
              </h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                Sponsoring this premier event offers unmatched visibility and brand positioning before an influential audience of over <span className="font-semibold text-brand">800+ professionals</span>, including:
              </p>
              <ul className="text-sm text-muted-foreground mt-3 grid gap-1 list-disc pl-4">
                <li>Top-tier engineers and consultants</li>
                <li>Federal and state government delegates</li>
                <li>Private sector construction and consulting firms</li>
                <li>International partners and NGOs</li>
                <li>Engineering students and graduates</li>
              </ul>
            </Card>
          </div>
          {/* Sponsors logo carousel */}
          <div className="container mx-auto px-6 lg:px-12 xl:px-16 mt-10">
            <Carousel opts={{ loop: true }}>
              <CarouselContent className="items-center">
                {Array.from({ length: 10 }).map((_, i) => (
                  <CarouselItem key={i} className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                    <img 
                      src="/placeholder.svg" 
                      alt={`Sponsor logo ${i+1}`} 
                      className="h-12 w-auto mx-auto opacity-80 transition-all duration-300 hover:opacity-100 hover:scale-110" 
                      loading="lazy" 
                    />
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