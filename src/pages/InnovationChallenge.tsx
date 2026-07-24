import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Rocket, Clock, Bell } from "lucide-react";
import { CONFERENCE } from "@/config/conference";

export default function InnovationChallenge() {
  return (
    <div className="container mx-auto py-16 md:py-24">
      <Helmet title={`Young Engineers Innovation Challenge | NICE ${CONFERENCE.shortName}`}>
        <meta
          name="description"
          content={`The NICE ${CONFERENCE.year} Young Engineers Innovation Challenge is coming soon. Themes, prizes and applications will be announced ahead of the ${CONFERENCE.edition}.`}
        />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/innovationchallenge"} />
      </Helmet>

      <section className="max-w-3xl mx-auto text-center">
        <Badge className="mb-4 bg-brand-yellow text-brand-primary text-sm px-4 py-2">
          <Rocket className="w-4 h-4 mr-2 inline" />
          Innovation Challenge
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-primary via-brand-green to-brand-red bg-clip-text text-transparent">
          Young Engineers Innovation Challenge
        </h1>
        <p className="text-xl text-muted-foreground mb-10">
          Coming soon — this year's edition is being finalised and will be announced shortly.
        </p>

        <Card className="border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-brand-green/5 text-left">
          <CardContent className="pt-8 pb-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-brand-primary/10 text-brand-primary shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">Announcement pending</h2>
                <p className="text-muted-foreground">
                  The {CONFERENCE.year} Challenge themes, eligibility, prizes and application link are being finalised
                  by the Technical Committee. Full details will be published on this page ahead of the {CONFERENCE.edition}.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-brand-yellow/20 text-brand-primary shrink-0">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">Be the first to know</h2>
                <p className="text-muted-foreground">
                  Register your interest for the conference — challenge updates will be shared with all registered delegates by email.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild variant="professional" size="lg">
                <Link to="/registration">Register for the Conference</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact the Secretariat</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
