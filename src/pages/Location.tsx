import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import heroBridge from "@/assets/hero-bridge.jpg";
import heroGreen from "@/assets/hero-green-building.jpg";
import heroHighway from "@/assets/hero-highway.jpg";

export default function Location() {
  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet>
        <title>Location: Kano, Nigeria | NICE Kano 2025</title>
        <meta name="description" content="Discover Kano’s culture and find the conference venue. View the map and photo gallery of Kano landmarks." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/location"} />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Kano: Culture, Heritage, and Hospitality</h1>
        <p className="text-muted-foreground mt-2">A historic city renowned for vibrant markets, crafts, and welcoming people.</p>
      </header>

      <section className="grid lg:grid-cols-2 gap-8 items-start">
        <Card className="p-0 overflow-hidden">
          <iframe
            title="Coronation Hall, Kano Government House"
            className="w-full h-[360px] md:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Coronation+Hall,+Kano+Government+House&output=embed"
          />
        </Card>
        <div>
          <h2 className="text-2xl font-semibold">About the Venue</h2>
          <p className="mt-3 text-muted-foreground">Coronation Hall within Kano Government House offers a secure, central location ideal for high-profile conferences and ceremonies.</p>
          <ul className="mt-4 list-disc pl-5 grid gap-2">
            <li>Central access to hotels and transport networks</li>
            <li>Proximity to cultural attractions</li>
            <li>Ample security and logistics support</li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Photo Gallery</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[heroBridge, heroGreen, heroHighway].map((src, i) => (
            <img key={i} src={src} alt="Kano landmark" className="w-full h-40 md:h-48 object-cover rounded-lg" loading="lazy" />
          ))}
        </div>
      </section>
    </div>
  );
}
