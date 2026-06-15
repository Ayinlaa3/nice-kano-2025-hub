import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Clock,
  MapPin,
  CalendarDays,
  Images,
  Users,
  Trophy,
  Sparkles,
} from "lucide-react";
import { getPastConference } from "@/config/pastConferences";

export default function PastConferenceDetail() {
  const { slug = "" } = useParams();
  const conference = getPastConference(slug);

  if (!conference) {
    return (
      <div className="container mx-auto py-20 text-center">
        <Helmet>
          <title>Edition Not Found | NICE Conference Archive</title>
        </Helmet>
        <h1 className="text-2xl font-bold">Edition not found</h1>
        <p className="text-muted-foreground mt-2">
          We couldn't find that conference edition.
        </p>
        <Button asChild className="mt-6" variant="professional">
          <Link to="/past-conferences">Back to Past Conferences</Link>
        </Button>
      </div>
    );
  }

  const isReport = conference.status === "report";

  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet>
        <title>{`${conference.year} — ${conference.edition} | NICE Archive`}</title>
        <meta
          name="description"
          content={
            conference.theme
              ? `NICE ${conference.edition} (${conference.year}), ${conference.city}. Theme: ${conference.theme}`
              : `NICE ${conference.edition} (${conference.year}) — report coming soon.`
          }
        />
        <link
          rel="canonical"
          href={typeof window !== "undefined" ? window.location.href : `/past-conferences/${slug}`}
        />
      </Helmet>

      <Link
        to="/past-conferences"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand-primary mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Past Conferences
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold">
            {conference.edition} — {conference.year}
          </h1>
          {isReport ? (
            <Badge className="bg-brand-primary/10 text-brand-primary">
              Full Report
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1">
              <Clock className="h-3 w-3" /> Coming soon
            </Badge>
          )}
        </div>
        <p className="mt-2 text-muted-foreground flex items-center gap-2">
          <MapPin className="h-4 w-4" /> {conference.city}
        </p>
        {conference.theme && (
          <p className="mt-2 text-lg text-brand-primary font-medium max-w-3xl">
            “{conference.theme}”
          </p>
        )}
      </header>

      {isReport ? (
        <Report2025 />
      ) : (
        <Card className="max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-muted flex items-center justify-center">
              <Clock className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">Report coming soon</h2>
            <p className="text-muted-foreground mt-2">
              We're compiling the archive for the {conference.edition} (
              {conference.year}). Details, highlights, and photos for this
              edition will be published here soon.
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link to="/past-conferences">Browse other editions</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Report2025() {
  return (
    <div className="space-y-12">
      {/* Quick facts */}
      <div className="grid sm:grid-cols-3 gap-4">
        <FactCard
          icon={<CalendarDays className="h-5 w-5" />}
          label="Dates"
          value="21–23 October 2025"
        />
        <FactCard
          icon={<MapPin className="h-5 w-5" />}
          label="Venue"
          value="Coronation Hall, Kano Government House"
        />
        <FactCard
          icon={<Users className="h-5 w-5" />}
          label="Delegates"
          value="800+ engineers & guests"
        />
      </div>

      {/* Overview */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Overview</h2>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          The NICE 23rd International Civil Engineering Conference &amp; AGM was
          hosted in the historic city of Kano, bringing together engineers,
          industry leaders, academics, students, and corporate partners for
          three days of knowledge sharing, innovation, and networking. The
          edition spotlighted innovative construction methods and sustainable
          infrastructure development across Nigeria and beyond.
        </p>
      </section>

      {/* Highlights */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand-primary" /> Event Highlights
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Keynote address by Engr. Sen. Rabiu Musa Kwankwaso, FNSE",
            "Technical site visits and the Kano city heritage tour",
            "Construction Tech Innovation Showcase & Challenge",
            "Chairman's Cocktail & Engineering Business Roundtable",
            "Annual General Meeting and NICE elections",
            "Annual Dinner, Awards & Cultural Gala",
          ].map((h) => (
            <Card key={h} className="p-4 border-l-4 border-l-brand-primary">
              <p className="text-sm">{h}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Dignitaries */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-brand-primary" /> Key Dignitaries
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ["Engr. Sen. Rabiu Musa Kwankwaso, FNSE", "Keynote Speaker / Guest of Honour"],
            ["H.E. Abba Kabir Yusuf", "Executive Governor of Kano State"],
            ["HRH. Muhammadu Sanusi II, CON", "Royal Father of the Day, Emir of Kano"],
            ["Arc. Musa Ahmed Dangiwa", "Hon. Minister for Housing & Urban Development"],
            ["Engr. Margaret A. Oguntala, FNSE", "President, Nigerian Society of Engineers"],
            ["H.E. Alh. Umar Namadi", "Executive Governor of Jigawa State"],
          ].map(([name, role]) => (
            <div
              key={name}
              className="rounded-lg border p-4 flex flex-col"
            >
              <span className="font-medium text-sm">{name}</span>
              <span className="text-xs text-muted-foreground mt-1">{role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Outcomes &amp; Impact</h2>
        <ul className="grid gap-2 list-disc pl-5 text-muted-foreground max-w-3xl">
          <li>Strengthened collaboration between engineers, policymakers, and industry.</li>
          <li>Showcased sustainable construction technologies and practical case studies.</li>
          <li>Advanced mentorship and career pathways for young engineers and students.</li>
          <li>Expanded partnerships with sponsors shaping Nigeria's infrastructure.</li>
        </ul>
      </section>

      {/* Gallery CTA */}
      <section>
        <Card className="p-6 bg-brand-primary/5 ring-1 ring-brand-primary/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              <Images className="h-5 w-5 text-brand-primary" /> Conference Gallery
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Browse photos and videos from the Kano 2025 conference.
            </p>
          </div>
          <Button asChild variant="professional">
            <Link to="/media-gallery">View Photos &amp; Videos</Link>
          </Button>
        </Card>
      </section>
    </div>
  );
}

function FactCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="font-medium text-sm">{value}</p>
        </div>
      </div>
    </Card>
  );
}
