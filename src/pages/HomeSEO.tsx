import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function HomeSEO() {
  return (
    <Helmet>
      <title>NICE Kano 2025 — Home</title>
      <meta name="description" content="NICE 23rd International Civil Engineering Conference & AGM. 21–23 Oct 2025, Kano. Register and explore sponsorships." />
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
