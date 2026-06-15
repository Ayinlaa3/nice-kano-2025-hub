import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { PAST_CONFERENCES } from "@/config/pastConferences";

export default function PastConferences() {
  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet title="Past Conferences | NICE Conference Archive">
        <meta
          name="description"
          content="Browse the archive of past NICE International Civil Engineering Conferences, including reports, themes, and highlights from previous editions."
        />
        <link
          rel="canonical"
          href={typeof window !== "undefined" ? window.location.href : "/past-conferences"}
        />
      </Helmet>

      <header className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold">Past Conferences</h1>
        <p className="text-muted-foreground mt-2">
          A living archive of the NICE International Civil Engineering Conference
          &amp; AGM. Explore highlights, themes, and reports from previous
          editions.
        </p>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PAST_CONFERENCES.map((c) => (
          <Card
            key={c.slug}
            className="p-6 cultural-card border-t-4 border-t-brand-primary flex flex-col"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-brand-primary">
                {c.year}
              </span>
              {c.status === "report" ? (
                <Badge className="bg-brand-primary/10 text-brand-primary">
                  Full Report
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" /> Coming soon
                </Badge>
              )}
            </div>
            <h2 className="mt-3 font-semibold">{c.edition}</h2>
            <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {c.city}
            </p>
            {c.theme && (
              <p className="mt-3 text-sm text-muted-foreground line-clamp-3 flex-1">
                {c.theme}
              </p>
            )}
            <Link
              to={`/past-conferences/${c.slug}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:gap-2.5 transition-all"
            >
              View edition <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        ))}
      </section>
    </div>
  );
}
