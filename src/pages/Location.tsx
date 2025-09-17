import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Camera, Utensils } from "lucide-react";
import dyePits3 from "@/assets/dye-pits3.jpg";
import heroGreen from "@/assets/hero-green-building.jpg";
import gidanMakama from "@/assets/Gidan-Makama.jpg"
import kanoWalls from "@/assets/kano-city-walls.jpg";
import emirsPalace from "@/assets/emirs-palace.jpg";
import dyePits from "@/assets/dye-pits.jpg";
import kurmiMarket from "@/assets/kurmi-market.jpg";
import muritalaFlyover from "@/assets/muritala-flyover.jpg"
import dyePits2 from "@/assets/dye-pits2.jpg";
import networkRoad from "@/assets/network-road.jpg";
import gidanMakama2 from "@/assets/Gidan-Makama2.jpg"
import hotelFront from "@/assets/hotel-front.jpg"
import dalaHill from "@/assets/dala-hill.jpg"
import kanoGidinan from "@/assets/kano-gidinan.jpg"
import kilishi from "@/assets/Kilishi_.jpeg"
import dambeBoxing from "@/assets/DambeHausa-Boxing.jpg"
import horseDubara from "@/assets/horse.jpg"
import kanoMosque from "@/assets/kano-mosque-2.jpeg"
import kanoState from "@/assets/Kano-state.jpeg"
import masaFood  from "@/assets/Masa.jpg"
import dubarFestival  from "@/assets/dubar-festival.jpg" 
import artisticWork  from "@/assets/artistic-work.jpeg"
import kunuFood  from "@/assets/Tigernut-drink.jpg"
import dubarFestival2  from "@/assets/dubar-festival2.jpg" 
import dubarPrayer  from "@/assets/durbar-prayer.jpg" 
import dyePits4  from "@/assets/dye-pit4.jpg" 
import furaNono  from "@/assets/Fura-Da-Nono.jpg" 
import dubarFestival4  from "@/assets/durbar-festival4.jpg"
import pottery  from "@/assets/pottery.jpeg"
import dubarFestival3  from "@/assets/durbar-festival3.jpg"
import calabash  from "@/assets/Calabashes.jpeg" 
import suyaFood  from "@/assets/suya.jpeg"
import { link } from "fs";


export default function Location() {
  const tourHighlights = [
    {
      title: "Kano City Walls & Ancient Gates",
      description: "Marvel at one of Africa's largest ancient defensive walls, a UNESCO heritage candidate that once protected the thriving city.",
      image: kanoWalls,
      icon: <MapPin className="w-5 h-5" />
    },
    {
      title: "Emir's Palace (Gidan Rumfa)",
      description: "Built in the 15th century, this grand palace remains the seat of traditional authority and is a stunning example of Hausa royal architecture.",
      image: emirsPalace,
      icon: <Star className="w-5 h-5" />
    },
    {
      title: "Kurmi Market",
      description: "Established in the 15th century, Kurmi remains a bustling market for textiles, spices, handmade crafts, jewelry, and world-famous leather products.",
      image: kurmiMarket,
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: "Dye Pits of Kofar Mata",
      description: "Visit the ancient indigo dyeing pits, some of the oldest in Africa, where traditional fabric dyeing techniques are still practiced.",
      image: dyePits,
      icon: <Clock className="w-5 h-5" />
    }
  ];

  const restaurants = [
    {
      name: "Bristol Palace Hotel Restaurant",
      cuisine: "Local & Continental",
      description: "Offers a fusion of local and continental cuisine in a luxurious setting. The suya platters and grilled fish are highly recommended.",
      specialty: "Suya Platters & Grilled Fish",
      link:"https://maps.app.goo.gl/J8cjiBj8MMK8r5RN8",

    },
    {
      name: "Cilantro Restaurant",
      cuisine: "Indian, Chinese & Nigerian",
      description: "A favorite among locals and visitors alike, serving Indian, Chinese, and Nigerian delicacies.",
      specialty: "Butter Chicken & Tandoori Grill",
      link:"https://maps.app.goo.gl/uYSMsryRA3rqJWAj6",
    },
    {
      name: "Amala Plus",
      cuisine: "Traditional Nigerian",
      description: "Famous for affordable and delicious Nigerian classics like jollof rice, efo riro, and pounded yam with egusi soup.",
      specialty: "Jollof Rice & Egusi Soup",
      link:"https://maps.app.goo.gl/AAzDuuw83zCtamUb7",
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Location: Kano, Nigeria | NICE Kano 2025</title>
        <meta name="description" content="Welcome to Kano – The Jewel of Northern Nigeria. Discover the cultural capital's rich history, heritage sites, and conference venue details." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/location"} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-primary/90 to-primary-foreground/80 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative container mx-auto h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to Kano
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              The Jewel of Northern Nigeria
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-80">
              We are excited to welcome you to Kano, the host city of the 23rd International Civil Engineering Conference & Annual General Meeting (AGM).
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-12 px-4 space-y-16">
        {/* Introduction */}
        <section className="text-center max-w-4xl mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed">
            As the commercial and cultural capital of Northern Nigeria, Kano offers an extraordinary blend of history, tradition, innovation, and warm hospitality. From ancient monuments and centuries-old markets to modern hotels and vibrant cuisine, Kano promises an unforgettable experience for all conference attendees and guests.
          </p>
        </section>

        {/* Cultural Significance */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Kano's Cultural & Historical Significance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Ancient Heritage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">One of West Africa's oldest cities with over a thousand years of recorded history.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Cultural Heart</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Home of the Hausa civilization, preserving traditions of language, dress, music, and crafts.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Trade Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">For centuries, a hub of trans-Saharan trade, famed for leatherworks and scholarship.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Living Heritage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Proudly combines deep-rooted traditions with Nigeria's growth as a modern nation.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Conference Venue */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Conference Venue</h2>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card className="p-0 overflow-hidden hover:shadow-xl transition-shadow">
              <iframe
                title="Coronation Hall, Kano Government House"
                className="w-full h-[360px] md:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Coronation+Hall,+Kano+Government+House&output=embed"
              />
            </Card>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-3">Coronation Hall, Kano Government House</h3>
                <p className="text-muted-foreground">Coronation Hall within Kano Government House offers a secure, central location ideal for high-profile conferences and ceremonies.</p>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Central access to hotels and transport networks</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-primary" />
                  <span>Proximity to cultural attractions</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Ample security and logistics support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* City Tour */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Kano City Tour</h2>
            <Badge variant="secondary" className="text-sm">Exclusive for Conference Attendees</Badge>
            <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
              As part of the conference, we are pleased to offer delegates a guided Kano City Tour designed to immerse you in the city's cultural richness, architectural marvels, and everyday life.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {tourHighlights.map((highlight, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={highlight.image} 
                    alt={highlight.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    {highlight.icon}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{highlight.title}</CardTitle>
                  <CardDescription>{highlight.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Dining */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Food & Dining in Kano</h2>
            <p className="text-muted-foreground">Kano is known for its flavorful Northern Nigerian cuisine as well as a variety of international dining options</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {restaurants.map((restaurant, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                  <a href={restaurant.link} target="_blank" rel="noreferrer">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                    <Utensils className="w-5 h-5 text-primary" />
                    <Badge variant="outline">{restaurant.cuisine}</Badge>
                  </div>
                  <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                  <CardDescription className="text-sm">{restaurant.description}</CardDescription>
                </CardHeader>
                    </a>
                <CardContent>
                  <div className="bg-accent/50 rounded-lg p-3">
                    <p className="text-sm font-medium">Must Try: {restaurant.specialty}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Attendees Will Love Kano */}
        <section className="bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Why Attendees Will Love Kano</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">History Meets Modernity</h3>
              <p className="text-sm text-muted-foreground">Walk through thousand-year-old walls, then enjoy dinner at a 5-star hotel</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Cultural Melting Pot</h3>
              <p className="text-sm text-muted-foreground">Hausa heritage blended with influences from across Nigeria and beyond</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Northern Hospitality</h3>
              <p className="text-sm text-muted-foreground">Locals are known for their friendliness and generosity</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Discovery & Adventure</h3>
              <p className="text-sm text-muted-foreground">Make your conference trip about learning, networking, and adventure</p>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[dyePits2, kanoState, kanoWalls, emirsPalace, dyePits, dalaHill, kanoGidinan,hotelFront,gidanMakama,muritalaFlyover,kurmiMarket,dyePits3,gidanMakama2,networkRoad,dambeBoxing, kanoMosque, kilishi,
              horseDubara,masaFood,dubarFestival,artisticWork,kunuFood,dubarFestival2,dubarPrayer,dyePits4,furaNono,dubarFestival4,pottery,dubarFestival3,calabash,suyaFood
            ].map((src, i) => (
              <div key={i} className="group relative overflow-hidden rounded-lg aspect-square">
                <img 
                  src={src} 
                  alt="Kano landmark" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}