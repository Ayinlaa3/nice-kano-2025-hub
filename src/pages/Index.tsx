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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Thanks for reaching out. We will get back to you shortly.",
    });
  }

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

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto flex items-center justify-between py-3">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo} alt="NICE logo" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <p className="text-sm uppercase tracking-widest text-muted-foreground">
                Nigerian Institution of Civil Engineers
              </p>
              <p className="font-semibold">Kano 2025 Conference & AGM</p>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="story-link">About</a>
            <a href="#theme" className="story-link">Theme</a>
            <a href="#programs" className="story-link">Programs</a>
            <a href="#fees" className="story-link">Fees</a>
            <a href="#sponsors" className="story-link">Sponsors</a>
            <a href="#travel" className="story-link">Travel</a>
            <a href="#contact" className="story-link">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="brand" size="sm" className="hover-scale">
              <a href={REG_FORM} target="_blank" rel="noreferrer">
                Register Now
              </a>
            </Button>
            <Button asChild variant="brandSecondary" size="sm" className="hidden md:inline-flex hover-scale">
              <a href="#sponsors">Sponsor Us</a>
            </Button>
          </div>
        </div>
      </header>

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

        {/* Fees */}
        <section id="fees" className="py-16 md:py-20 bg-muted/40">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Categories of Payment & Fees</h2>
                <p className="text-muted-foreground mt-2">
                  Early bird closes <span className="font-semibold">15th September 2025</span>.
                </p>
              </div>
              <div className="rounded-full bg-brandYellow/20 text-brandYellow-foreground px-4 py-2 text-sm ring-1 ring-brandYellow/30 inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" /> Secure your spot early
              </div>
            </div>

            <div className="mt-8 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Early Bird</TableHead>
                    <TableHead>Late Registration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { c: "Corporate (Exhibitors & Partners)", e: "TBA", l: "TBA" },
                    { c: "NICE Members", e: "TBA", l: "TBA" },
                    { c: "Non-Members", e: "TBA", l: "TBA" },
                    { c: "Students", e: "TBA", l: "TBA" },
                  ].map((row) => (
                    <TableRow key={row.c}>
                      <TableCell className="font-medium">{row.c}</TableCell>
                      <TableCell>{row.e}</TableCell>
                      <TableCell>{row.l}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold">Payment Details</h3>
                <div className="mt-3 text-sm">
                  <p>
                    <span className="font-medium">Account No:</span> 3482017475
                  </p>
                  <p>
                    <span className="font-medium">Bank:</span> Ecobank Plc
                  </p>
                  <p>
                    <span className="font-medium">Payable to:</span> The Nigerian Institution of Civil Engineers
                  </p>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold">Need an Invoice?</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  For corporate or group registrations, request an invoice and our team will assist you.
                </p>
                <Button asChild variant="brand" className="mt-4 w-max">
                  <a href="#contact">Contact Finance</a>
                </Button>
              </Card>
            </div>
          </div>
        </section>

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
        </section>

        {/* Accommodation & Travel */}
        <section id="travel" className="py-16 md:py-20 bg-muted/40">
          <div className="container mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Accommodation</h2>
              <ul className="mt-4 grid gap-3">
                <li>
                  <span className="font-medium">Bristol Palace Hotel Kano</span> — High-end, centrally located.
                </li>
                <li>
                  <span className="font-medium">Tahir Guest Palace</span> — Business-friendly with great amenities.
                </li>
                <li>
                  <span className="font-medium">Grand Central Hotel</span> — Comfortable and accessible.
                </li>
                <li>
                  <span className="font-medium">Royal Tropicana Hotel</span> — Convenient and budget-friendly.
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Travel & Venue</h2>
              <p className="mt-4">
                Venue: <span className="font-medium">Coronation Hall, Kano Government House</span>.
              </p>
              <ul className="mt-3 grid gap-2 list-disc pl-5">
                <li>Fly into Mallam Aminu Kano International Airport (KAN).</li>
                <li>Use registered taxis or hotel shuttles for transfers.</li>
                <li>Allow extra time due to city traffic around peak hours.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="container mx-auto py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Contact & Support</h2>
              <p className="mt-3 text-muted-foreground">
                We’re here to help with registration, sponsorship, and general inquiries.
              </p>
              <div className="mt-6 grid gap-3 text-sm">
                <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> conference@nicehq.org</p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +234 800 000 0000</p>
                <p className="flex items-center gap-2"><ExternalLink className="h-4 w-4" /> <a className="story-link" href={REG_FORM} target="_blank" rel="noreferrer">Registration Form</a></p>
              </div>
            </div>
            <Card className="p-6">
              <form onSubmit={handleContactSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" name="email" placeholder="you@example.com" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="How can we assist you?" rows={5} required />
                </div>
                <div className="flex justify-end gap-3">
                  <Button type="reset" variant="outline">Reset</Button>
                  <Button type="submit" variant="brand">Send Message</Button>
                </div>
              </form>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-10 bg-background">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <img src={logo} alt="NICE logo" className="h-10 w-auto" />
            <p className="text-sm text-muted-foreground mt-3">
              Sustaining the world’s infrastructure through excellence in civil engineering.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="mt-3 grid gap-2 text-sm">
              <li><a href="#about" className="story-link">About</a></li>
              <li><a href="#theme" className="story-link">Theme</a></li>
              <li><a href="#programs" className="story-link">Programs</a></li>
              <li><a href="#fees" className="story-link">Fees</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Get Involved</h4>
            <ul className="mt-3 grid gap-2 text-sm">
              <li><a href="#sponsors" className="story-link">Sponsorship</a></li>
              <li><a href={REG_FORM} target="_blank" rel="noreferrer" className="story-link">Register</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              <li>© {new Date().getFullYear()} NICE</li>
              <li>All rights reserved.</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
