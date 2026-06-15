import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mic, Clock } from "lucide-react";
import { CONFERENCE } from "@/config/conference";

export default function Speakers() {
  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet>
        <title>{`Conference Speakers | NICE ${CONFERENCE.shortName}`}</title>
        <meta
          name="description"
          content={`Speakers for the NICE ${CONFERENCE.edition} & AGM in Lagos will be announced soon. Stay tuned for keynote speakers, plenary sessions and panellists.`}
        />
        <link
          rel="canonical"
          href={typeof window !== "undefined" ? window.location.href : "/speakers"}
        />
      </Helmet>

      <header className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold">Conference Speakers</h1>
        <p className="text-muted-foreground mt-2">
          Our distinguished line-up of keynote speakers, plenary leads, and
          panellists for NICE Lagos 2026 is being finalised. Confirmed speakers
          will be published here as announcements are made.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Card
            key={idx}
            className="p-6 text-center cultural-card border-t-4 border-t-brand-red"
          >
            <div className="relative mb-4">
              <div className="h-24 w-24 rounded-full mx-auto bg-muted flex items-center justify-center ring-4 ring-brand-primary/20">
                <Mic className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <h2 className="font-semibold text-sm mb-1">To Be Announced</h2>
            <p className="text-xs text-brand-primary font-medium mb-2 inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> Coming soon
            </p>
            <p className="text-xs text-muted-foreground">
              Speaker details will be revealed shortly.
            </p>
          </Card>
        ))}
      </div>

      <div className="text-center mt-10">
        <p className="text-muted-foreground mb-4">
          Want to be the first to know? Register your interest today.
        </p>
        <Button asChild variant="professional">
          <Link to="/registration">Register Now</Link>
        </Button>
      </div>
    </div>
  );
}
