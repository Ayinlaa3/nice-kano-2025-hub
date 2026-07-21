import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Car, Bus, Train, AlertTriangle, Clock } from "lucide-react";
import { CONFERENCE } from "@/config/conference";

export default function TransportTips() {
  return (
    <div className="container mx-auto py-12 md:py-16 space-y-12">
      <Helmet title="Transport Tips | Experience Lagos | NICE Lagos 2026">
        <meta name="description" content="Airport transfers, ride-hailing, BRT, rail and traffic tips for delegates attending NICE Lagos 2026." />
      </Helmet>

      <header className="max-w-3xl">
        <Badge className="bg-brand-primary/10 text-brand-primary mb-3">Experience Lagos · Transport</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Getting Around Lagos</h1>
        <p className="text-lg text-muted-foreground">
          Lagos moves fast — with the right prep, so will you. Here's how to reach {CONFERENCE.venue.shortName} and navigate the city like a local.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <Plane className="w-8 h-8 text-brand-primary mb-3" />
          <h2 className="text-xl font-semibold mb-2">Arriving by Air</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Fly into <strong>Murtala Muhammed International Airport (LOS)</strong>, Ikeja. Most partner hotels are within 10–25 minutes of the venue and offer complimentary airport pickup on request.
          </p>
          <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
            <li>Domestic terminal (MMA2) is a short drive from the international terminal.</li>
            <li>Arrival halls have MTN, Airtel, Glo and 9mobile SIM kiosks.</li>
            <li>Use only pre-booked or in-terminal official taxi services.</li>
          </ul>
        </Card>

        <Card className="p-6">
          <Car className="w-8 h-8 text-brand-primary mb-3" />
          <h2 className="text-xl font-semibold mb-2">Ride-Hailing</h2>
          <p className="text-sm text-muted-foreground mb-3">
            <strong>Bolt, Uber</strong> and <strong>inDrive</strong> are widely available. Confirm the driver, plate and fare in-app before starting a trip.
          </p>
          <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
            <li>Airport pickups sometimes have a designated ride-hailing zone — follow signage.</li>
            <li>Fares surge sharply during rush hour; consider waiting 30 minutes.</li>
            <li>Cash and card are accepted; keep small Naira notes handy.</li>
          </ul>
        </Card>

        <Card className="p-6">
          <Bus className="w-8 h-8 text-brand-primary mb-3" />
          <h2 className="text-xl font-semibold mb-2">BRT & Local Buses</h2>
          <p className="text-sm text-muted-foreground mb-3">
            The <strong>BRT (Bus Rapid Transit)</strong> corridor along Mobolaji Bank Anthony Way and Ikorodu Road is a reliable, low-cost option to move around Ikeja and the mainland.
          </p>
          <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
            <li>Buy a Cowry card at any BRT terminal to tap and ride.</li>
            <li>Avoid unregulated "danfo" buses if you are unfamiliar with the routes.</li>
          </ul>
        </Card>

        <Card className="p-6">
          <Train className="w-8 h-8 text-brand-primary mb-3" />
          <h2 className="text-xl font-semibold mb-2">Lagos Rail</h2>
          <p className="text-sm text-muted-foreground mb-3">
            The <strong>Blue Line</strong> (Marina ↔ Mile 2) and <strong>Red Line</strong> (Oyingbo ↔ Agbado) offer air-conditioned, congestion-free travel. Ikeja is well served by the Red Line.
          </p>
          <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
            <li>Purchase a rail Cowry card or top-up at any station.</li>
            <li>Check the latest LAMATA schedule before you travel.</li>
          </ul>
        </Card>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-brand-primary/30">
          <Clock className="w-8 h-8 text-brand-primary mb-3" />
          <h2 className="text-xl font-semibold mb-2">Traffic Windows</h2>
          <p className="text-sm text-muted-foreground">
            Lagos traffic peaks between <strong>7:00–10:00 AM</strong> and <strong>4:00–8:00 PM</strong> on weekdays. Plan movements outside these windows where possible; the conference programme is built around this reality.
          </p>
        </Card>
        <Card className="p-6 border-brand-primary/30">
          <AlertTriangle className="w-8 h-8 text-brand-primary mb-3" />
          <h2 className="text-xl font-semibold mb-2">Safety on the Move</h2>
          <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
            <li>Keep valuables out of sight, especially in traffic.</li>
            <li>Share your live location with a trusted contact during rides.</li>
            <li>Emergency: dial <strong>112</strong> (Police / LASEMA / Medical).</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
