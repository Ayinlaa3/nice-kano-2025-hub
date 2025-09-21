import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay"
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
import { CalendarDays, MapPin, Building2, HardHat, Users, Briefcase, Award, GraduationCap, Handshake, Landmark, Beer, Presentation, ChevronDown, Mic, Star, Play, Users2 } from "lucide-react";
import { useMemo, useState } from "react";
import Hero from "@/components/Hero";
import { IllBeThere } from "@/components/IllBeThere";

// Import sponsor logos
import sponsor1 from "@/assets/sponsors/sponsor01.png";
import sponsor2 from "@/assets/sponsors/sponsor02.png";
import sponsor3 from "@/assets/sponsors/sponsor03.png";
import sponsor4 from "@/assets/sponsors/sponsor04.png";
import sponsor5 from "@/assets/sponsors/sponsor05.png";
import sponsor6 from "@/assets/sponsors/sponsor06.png";




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
    name: "T.B.D",
    title: "Keynote Speaker",
    position: " ",
    topic: " ",
    image: "/placeholder.svg"
  },
  {
    name: "T.B.D",
    title: "Engineering Roundtable Speaker",
    position: " ",
    topic: "Unlocking the Potentials of SMEs in the Nigerian Construction Industry:Opportunities, Partnerships, and Policy Support",
    image: "/placeholder.svg"
  },
  {
    name: "T.B.D",
    title: "Fellows Roundtable Speaker",
    position: " ",
    topic: "The Future of Civil Engineering Leadership in Nigeria: Charting Pathways for Innovation, Mentorship, and Sustainable Impact",
    image: "/placeholder.svg"
  },
  {
    name: "T.B.D",
    title: "Special Guest of Honour",
    position: " ",
    topic: " ",
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

        {/* Publicity Section - Video Invitations */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-kano-heritage/10 via-brand/5 to-vibrant/10">
          <div className="container mx-auto px-6 lg:px-12 xl:px-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Conference Spotlight</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Hear directly from NICE leaders and get a preview of what awaits you at Kano 2025
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Conference Jingle */}
              <Card className="group overflow-hidden cultural-card border-l-4 border-l-brand-red hover:border-l-vibrant transition-all duration-300">
                <div className="relative aspect-video bg-gradient-to-br from-brand/20 to-kano-heritage/30 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <img 
                    src={heroBridge} 
                    alt="NICE Kano 2025 Conference Jingle" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-6 w-6 text-brand ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-brand-red text-white px-2 py-1 rounded text-xs font-medium">
                      OFFICIAL VIDEO JINGLE
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">NICE Kano 2025 - Official Conference Jingle</h3>
                  <p className="text-sm text-muted-foreground">
                    Experience the excitement and vision for Nigeria's premier civil engineering conference, holding live in the city of Kano
                  </p>
                </div>
              </Card>

              {/* NICE Chairman Invitation */}
              <Card className="group overflow-hidden cultural-card border-l-4 border-l-vibrant hover:border-l-brand transition-all duration-300">
                <div className="relative aspect-video bg-gradient-to-br from-vibrant/20 to-brand/30 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <img 
                    src="/src/assets/leader-tokunbo.jpg" 
                    alt="NICE NATIONAL CHAIRMAN Invitation" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-6 w-6 text-vibrant ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-vibrant text-black px-2 py-1 rounded text-xs font-medium">
                      NATIONAL CHAIRMAN
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">National Chairman's Invite</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    
                  </p>
                  <p className="text-sm text-muted-foreground">
                    A personal invitation from the National Chairman of the Nigerian Institution of Civil Engineers, Engr. Tokunbo Ajanaku, FNSE, FNICE, PMP to join us in Kano for a 3-day powerpacked.
                  </p>
                </div>
              </Card>

              {/* Kano Branch Chairman */}
              <Card className="group overflow-hidden cultural-card border-l-4 border-l-kano-heritage hover:border-l-brandYellow transition-all duration-300">
                <div className="relative aspect-video bg-gradient-to-br from-kano-heritage/20 to-brandYellow/30 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <img 
                    src="/src/assets/leader-balla.jpg" 
                    alt="Kano Branch Chairman Welcome" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-6 w-6 text-kano-heritage ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-kano-heritage text-white px-2 py-1 rounded text-xs font-medium">
                      HOST WELCOME
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Kano Welcomes You</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                      
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Welcome message from Kano, led by the Branch Chairman Engr. Maryam Abubakar-Balla, FNSE, FNICE and the Conference LOC Chairman Prof. Hassim Alhassan, FNSE, FNICE welcomes you the warmth and heritage that awaits you in ancient Kano.
                    </p>
                </div>
              </Card>

              {/* Board of Trustees Chairman */}
              <Card className="group overflow-hidden cultural-card border-l-4 border-l-brand hover:border-l-brand-red transition-all duration-300">
                <div className="relative aspect-video bg-gradient-to-br from-brand/20 to-brand-red/30 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <img 
                    src="/src/assets/senkila.png" 
                    alt="Conference Chairman Message" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-6 w-6 text-brand ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-brand text-white px-2 py-1 rounded text-xs font-medium">
                      BOT CHAIRMAN
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">BOT Confirmation</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Engr. Sen. Adefemi Kila, FNSE, FNICE - Board of Trustees Chairman
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Hear from the Chairman of the Board of Trustees on the innovative programs and opportunities at Kano 2025
                  </p>
                </div>
              </Card>

              {/* Conference CPC Chairman */}
              <Card className="group overflow-hidden cultural-card border-l-4 border-l-brandYellow hover:border-l-vibrant transition-all duration-300">
                <div className="relative aspect-video bg-gradient-to-br from-brandYellow/20 to-vibrant/30 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <img 
                    src="/src/assets/leader-ofoeyeno.jpg" 
                    alt="Young Engineers Message" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-6 w-6 text-brandYellow ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-brandYellow text-white px-2 py-1 rounded text-xs font-medium">
                      CPC CHAIRMAN's INVITE
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Mega Planning from the CPC</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Engr. Dr. Bemigho Ofoeyeno, FNSE, FNICE - CPC Chairman
                  </p>
                  <p className="text-sm text-muted-foreground">
                    The Central Planning Committee Chairman warmly invites you to the 23rd Annual International Conference and General Meeting 
                  </p>
                </div>
              </Card>

              {/* Cultural Heritage Showcase */}
              <Card className="group overflow-hidden cultural-card border-l-4 border-l-brand-red hover:border-l-kano-heritage transition-all duration-300">
                <div className="relative aspect-video bg-gradient-to-br from-brand-red/20 to-kano-heritage/30 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <img 
                    src="/src/assets/kano-city-walls.jpg" 
                    alt="Kano Cultural Heritage" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-6 w-6 text-brand-red ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-brand-red text-white px-2 py-1 rounded text-xs font-medium">
                      CULTURAL HERITAGE
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Discover Kano Heritage</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore 1000 years of history, culture, and architectural marvels in ancient Kano
                  </p>
                </div>
              </Card>
            </div>

            <div className="text-center mt-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users2 className="h-4 w-4" />
                  <span>800+ Expected Attendees</span>
                </div>
                <div className="h-4 w-px bg-border"></div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Presentation className="h-4 w-4" />
                  <span>50+ Technical Sessions</span>
                </div>
                <div className="h-4 w-px bg-border"></div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-4 w-4" />
                  <span>3 Days of Excellence</span>
                </div>
              </div>
              <Button asChild size="lg" className="bg-gradient-to-r from-brand to-vibrant hover:from-brand/90 hover:to-vibrant/90">
                <a href={REG_FORM} target="_blank" rel="noopener noreferrer">
                  Join These Leaders - Register Now
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* I'll Be There Generator */}
        <IllBeThere />

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
                <Button variant="professional" size="lg">
                  <a href="/sponsorships">Become a Sponsor</a>
                  </Button>
                <Button asChild variant="cultural" size="lg">
                  <a href="/contact">Request Media Kit</a>
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
  <h3 className="text-center text-lg font-semibold mb-6 text-muted-foreground">
    Our Valued Partners and Sponsors
  </h3>
  <Carousel
    opts={{ loop: true }}
    plugins={[
      Autoplay({ delay: 2500, stopOnInteraction: false })
    ]}
    className="w-full"
  >
    <CarouselContent className="items-center">
      {[
        { name: "BuildCore Engineering", logo: sponsor1 },
        { name: "TechBuild Solutions", logo: sponsor2 },
        { name: "Sterling Infrastructure Ltd", logo: sponsor3 },
        { name: "Pinnacle Engineering Group", logo: sponsor4 },
        { name: "Nexus Construction Technologies", logo: sponsor5 },
        { name: "Atlas Civil Works", logo: sponsor6 },
      ].map((sponsor, i) => (
        <CarouselItem
          key={i}
          className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
        >
          <div className="p-4">
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-16 w-auto mx-auto opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-110 object-contain"
              loading="lazy"
            />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
</div>
        </section>

{/* Travel moved to dedicated page */}

{/* Contact moved to dedicated page */}
      </main>
      <script defer src="https://vercel.com/analytics/script.js"></script>


{/* Footer moved to MainLayout */}
    </>
  );
};

export default Index;