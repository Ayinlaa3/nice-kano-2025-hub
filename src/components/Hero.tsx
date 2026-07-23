import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { CalendarDays, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CountdownTimer } from "@/components/CountdownTimer";
import { CONFERENCE } from "@/config/conference";

// Lagos cinematic hero images (CDN assets)
import lagos1 from "@/assets/lagos-hero/This_is_lagos_1.jpg.asset.json";
import lagos2 from "@/assets/lagos-hero/This_is_lagos_2.jpg.asset.json";
import lagos3 from "@/assets/lagos-hero/This_is_lagos_3.jpg.asset.json";
import lagos4 from "@/assets/lagos-hero/This_is_lagos_4.jpg.asset.json";
import lagos5 from "@/assets/lagos-hero/This_is_lagos_5.jpg.asset.json";
import lagos6 from "@/assets/lagos-hero/This_is_lagos_6.jpg.asset.json";
import jkRandle from "@/assets/lagos-hero/JK-Randle-Centre.png.asset.json";
import lagFerry from "@/assets/lagos-hero/images-4-9-2.jpeg.asset.json";
import beachPavilion from "@/assets/lagos-hero/0_i6KophLt6FO56X_C.jpg.asset.json";
import obaPalace from "@/assets/lagos-hero/iga-idungaran.jpg.asset.json";
import lagos7 from "@/assets/lagos-hero/This_is_lagos_7.jpg.asset.json";
import lagos8 from "@/assets/lagos-hero/This_is_lagos_8.jpg.asset.json";
import lagos9 from "@/assets/lagos-hero/This_is_lagos_9.jpg.asset.json";
import lagos10 from "@/assets/lagos-hero/This_is_lagos_10.jpg.asset.json";
import lagos11 from "@/assets/lagos-hero/This_is_lagos_11.jpg.asset.json";
import elegushi from "@/assets/lagos-hero/elegushi_beach.png.asset.json";
import maskGroup from "@/assets/lagos-hero/mask-group.jpg.asset.json";
import canopyWalk from "@/assets/lagos-hero/b3.jpg.asset.json";
import nikeGallery from "@/assets/lagos-hero/Outside_Nike_Art_Gallery_4202980259.jpg.asset.json";
import lekkiEpe from "@/assets/lagos-hero/Lekki-Epe_Expressway_Sandfill_Bustop.jpg.asset.json";

const HERO_IMAGES = [
  { src: lagos5.url, alt: "Lagos Island aerial panorama" },
  { src: lagos4.url, alt: "Lekki-Ikoyi Link Bridge at dusk" },
  { src: lagos2.url, alt: "Lagos waterfront and expressway" },
  { src: lagos3.url, alt: "Lekki-Ikoyi Bridge aerial view" },
  { src: lagos1.url, alt: "Lekki-Ikoyi Bridge at night" },
  { src: lagos6.url, alt: "Lagos Yoruba heritage statues" },
  { src: jkRandle.url, alt: "JK Randle Centre for Yoruba Culture, Onikan" },
  { src: lagFerry.url, alt: "Lagos Ferry Services terminal" },
  { src: beachPavilion.url, alt: "Lagos beachfront pavilion architecture" },
  { src: obaPalace.url, alt: "Iga Idunganran — Oba of Lagos Palace" },
  { src: lagos7.url, alt: "Lagos elevated expressway interchange" },
  { src: lagos8.url, alt: "Lagos Blue Line rail on Marina waterfront" },
  { src: lagos9.url, alt: "Lagos highway interchange illuminated at night" },
  { src: lagos10.url, alt: "Lagos lagoon boat regatta with Nigerian flag" },
  { src: lagos11.url, alt: "Lekki Deep Sea coastal road with lamp columns" },
  { src: elegushi.url, alt: "Elegushi Beach, Lagos" },
  { src: maskGroup.url, alt: "Lagos leisure resort aerial rendering" },
  { src: canopyWalk.url, alt: "Lekki Conservation Centre canopy walkway" },
  { src: nikeGallery.url, alt: "Nike Art Gallery, Lekki" },
  { src: lekkiEpe.url, alt: "Lekki-Epe Expressway at dusk" },
];


export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[92vh] w-full overflow-hidden bg-background"
    >
      {/* Background carousel */}
      <Carousel
        className="absolute inset-0 h-full w-full"
        opts={{ loop: true, align: "start" }}
        plugins={[Autoplay({ delay: 6000, stopOnInteraction: false })]}
      >
        <CarouselContent className="h-full">
          {HERO_IMAGES.map((img, i) => (
            <CarouselItem key={i} className="relative h-[92vh] min-h-[720px]">
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover animate-ken-burns"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Cinematic overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background z-10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-background via-transparent to-primary/20 z-10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial-gold z-10" />

      {/* Subtle grain / vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 pt-28 pb-16 min-h-[92vh] flex flex-col justify-end">
        <div className="max-w-5xl space-y-8 animate-fade-in">
          {/* Edition badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-background/40 backdrop-blur-md px-4 py-1.5 text-xs md:text-sm uppercase tracking-[0.2em] text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            {CONFERENCE.edition}
          </div>

          {/* Massive display headline */}
          <div className="space-y-2">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.9] tracking-tight">
              <span className="block shimmer-gold italic">This is</span>
              <span className="block font-grotesk font-bold tracking-tight text-foreground">
                LAGOS
                <span className="text-accent">!!!</span>
              </span>
            </h1>
            <p className="max-w-3xl text-base md:text-lg text-foreground/80 leading-relaxed pt-4">
              {CONFERENCE.theme}
            </p>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/90 backdrop-blur px-4 py-2 text-sm font-medium text-primary-foreground ring-1 ring-primary-glow/40">
              <CalendarDays className="h-4 w-4" />
              {CONFERENCE.dates.display}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-background/50 backdrop-blur px-4 py-2 text-sm font-medium text-foreground ring-1 ring-border">
              <MapPin className="h-4 w-4 text-accent" />
              {CONFERENCE.venue.shortName}, {CONFERENCE.venue.region}
            </span>
          </div>

          {/* Countdown */}
          <div className="max-w-2xl">
            <CountdownTimer targetDate={CONFERENCE.dates.countdownTarget} />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild size="xl" className="bg-gradient-eko text-white shadow-gold hover:opacity-95 hover:shadow-green group">
              <Link to="/registration">
                Register Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground backdrop-blur"
            >
              <Link to="/sponsorships">Become a Sponsor</Link>
            </Button>
          </div>
        </div>

        {/* Stats ticker at bottom */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-border/40 pt-8">
          {CONFERENCE.stats.map((s) => (
            <div key={s.label} className="space-y-1">
              <div className="font-display text-3xl md:text-5xl text-gradient-gold leading-none">
                {s.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
