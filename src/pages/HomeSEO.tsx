import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function HomeSEO() {
  return (
    <Helmet title="NICE Lagos 2026 — Home">
      <meta name="description" content="NICE 24th International Civil Engineering Conference & AGM. 20–22 Oct 2026, Lagos. Register and explore sponsorships." />
      <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/"} />
    </Helmet>
  );
}

// Placeholder export if needed by future enhancements
export const CTAButtons = () => (
  <div className="mt-6 flex flex-wrap gap-3">
    <Button variant="hero">Register Now</Button>
    <Button variant="cultural">Sponsor Us</Button>
  </div>
);
