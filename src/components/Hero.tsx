import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CountdownTimer } from "@/components/CountdownTimer";
import { CONFERENCE } from "@/config/conference";


// ✅ Your hero images
import heroBridge from "@/assets/hero-bridge.jpg";
import heroGreen from "@/assets/hero-green-building.jpg";
import heroHighway from "@/assets/hero-highway.jpg";
import heroConstruction from "@/assets/hero-construction.jpg";
import heroSustainable from "@/assets/hero-sustainable.jpg";
import heroEngineer from "@/assets/black-engineer.jpg";
import heroBalcony from "@/assets/hero-balcony.jpg"
import heroProject from "@/assets/hero-working-housing-project.jpg"
import heroConstructionEng from "@/assets/hero-construction-engineer.jpg"
import heroDrawings from "@/assets/drawings.jpg"
import heroSky from "@/assets/skyscrapper.jpg"
import heroArchitecture from "@/assets/architecture.jpg"



export default function Hero() {
  return (
    <section id="top" className="relative h-[80vh] min-h-[650px] max-h-[800px] overflow-hidden">
      {/* Background Image Carousel */}
      <Carousel
        className="absolute inset-0 w-full h-full"
        opts={{ loop: true, align: "start" }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {[heroBridge, heroGreen, heroHighway, heroConstruction, heroArchitecture, heroSustainable,heroEngineer,heroDrawings, heroBalcony,heroConstructionEng,heroProject,heroSky].map(
            (src, idx) => (
              <CarouselItem key={idx}>
                <div className="relative h-full w-full">
                  {/* Background Image */}
                  <img
                    src={src}
                    alt="NICE Kano 2025 hero visual"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
              </CarouselItem>
            )
          )}
        </CarouselContent>

        {/* Nav buttons */}
        <CarouselPrevious className="hidden sm:flex z-30" />
        <CarouselNext className="hidden sm:flex z-30" />
      </Carousel>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Static Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14 text-left max-w-6xl mx-auto z-20">
        {/* Countdown */}
        <div className="mb-6 max-w-md animate-fade-in">
          <CountdownTimer targetDate={CONFERENCE.dates.countdownTarget} />
        </div>

        {/* Date & Venue */}
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-red/90 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 mb-6">
          <CalendarDays className="h-5 w-5" /> {CONFERENCE.dates.display}
          <span className="mx-2 text-brandYellow">•</span>
          <MapPin className="h-5 w-5" /> {CONFERENCE.venue.name}
        </div>

        {/* Title */}
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white drop-shadow-lg">
          {CONFERENCE.theme}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-white/90 max-w-3xl text-base sm:text-lg animate-fade-in delay-150 font-medium">
          {CONFERENCE.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <Button asChild variant="hero" size="xl">
            <Link to="/registration">Register Now</Link>
          </Button>
          <Button asChild variant="cultural" size="xl">
            <Link to="/sponsorships">Sponsor Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
