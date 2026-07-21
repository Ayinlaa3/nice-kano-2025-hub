import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONFERENCE } from "@/config/conference";

// Placeholder Lagos partner hotels — to be replaced with confirmed rates/contacts
const HOTELS = [
  {
    name: "Radisson Blu Anchorage Hotel, Victoria Island",
    address: "1A Ozumba Mbadiwe Ave, Victoria Island, Lagos",
    priceRange: "₦280,000 - ₦650,000/night",
    distance: "35–50 mins from venue",
    amenities: ["Wi-Fi", "Airport Shuttle", "Pool", "Business Centre"],
    contact: "TBA",
    link: "https://maps.google.com/?q=Radisson+Blu+Anchorage+Lagos",
    rooms: ["Standard King: ₦280,000", "Business Suite: ₦420,000", "Executive Suite: ₦650,000"],
  },
  {
    name: "Sheraton Lagos Hotel, Ikeja",
    address: "30 Mobolaji Bank Anthony Way, Ikeja, Lagos",
    priceRange: "₦220,000 - ₦520,000/night",
    distance: "10 mins from venue",
    amenities: ["Wi-Fi", "Pool", "Gym", "Airport Shuttle"],
    contact: "TBA",
    link: "https://maps.google.com/?q=Sheraton+Lagos+Hotel+Ikeja",
    rooms: ["Classic Room: ₦220,000", "Club Room: ₦320,000", "Executive Suite: ₦520,000"],
  },
  {
    name: "Lagos Continental Hotel, Victoria Island",
    address: "52A Kofo Abayomi St, Victoria Island, Lagos",
    priceRange: "₦260,000 - ₦780,000/night",
    distance: "35–55 mins from venue",
    amenities: ["Wi-Fi", "Spa", "Pool", "Fine Dining"],
    contact: "TBA",
    link: "https://maps.google.com/?q=Lagos+Continental+Hotel",
    rooms: ["Deluxe Room: ₦260,000", "Executive Suite: ₦480,000", "Presidential Suite: ₦780,000"],
  },
  {
    name: "Ibis Lagos Ikeja",
    address: "Plot 27/29 Toyin Street, Ikeja, Lagos",
    priceRange: "₦95,000 - ₦160,000/night",
    distance: "8 mins from venue",
    amenities: ["Wi-Fi", "Breakfast", "24h Reception"],
    contact: "TBA",
    link: "https://maps.google.com/?q=Ibis+Lagos+Ikeja",
    rooms: ["Standard Twin: ₦95,000", "Standard Double: ₦110,000", "Family Room: ₦160,000"],
  },
  {
    name: "Southern Sun Ikoyi",
    address: "47 Alfred Rewane Rd, Ikoyi, Lagos",
    priceRange: "₦240,000 - ₦560,000/night",
    distance: "40–60 mins from venue",
    amenities: ["Wi-Fi", "Pool", "Restaurant", "Gym"],
    contact: "TBA",
    link: "https://maps.google.com/?q=Southern+Sun+Ikoyi",
    rooms: ["Superior Room: ₦240,000", "Deluxe Room: ₦320,000", "Executive Suite: ₦560,000"],
  },
  {
    name: "Best Western Plus Ikeja",
    address: "8 Mogambo Cl, Off Toyin St, Ikeja, Lagos",
    priceRange: "₦85,000 - ₦185,000/night",
    distance: "10 mins from venue",
    amenities: ["Wi-Fi", "Breakfast", "Airport Shuttle"],
    contact: "TBA",
    link: "https://maps.google.com/?q=Best+Western+Plus+Ikeja",
    rooms: ["Standard: ₦85,000", "Executive: ₦125,000", "Suite: ₦185,000"],
  },
  {
    name: "Protea Hotel Ikeja Select",
    address: "Plot 3 Mobolaji Bank Anthony Way, Ikeja, Lagos",
    priceRange: "₦180,000 - ₦360,000/night",
    distance: "12 mins from venue",
    amenities: ["Wi-Fi", "Restaurant", "Business Centre"],
    contact: "TBA",
    link: "https://maps.google.com/?q=Protea+Hotel+Ikeja+Select",
    rooms: ["Standard: ₦180,000", "Superior: ₦240,000", "Suite: ₦360,000"],
  },
  {
    name: "Elomaz Hotel & Suites, Alausa",
    address: "Alausa, Ikeja, Lagos",
    priceRange: "₦65,000 - ₦140,000/night",
    distance: "5 mins from venue",
    amenities: ["Wi-Fi", "Restaurant", "Parking"],
    contact: "TBA",
    link: "https://maps.google.com/?q=Elomaz+Hotel+Alausa",
    rooms: ["Standard: ₦65,000", "Executive: ₦95,000", "Suite: ₦140,000"],
  },
  {
    name: "Bolingo Hotel & Towers, GRA Ikeja",
    address: "GRA, Ikeja, Lagos",
    priceRange: "₦70,000 - ₦150,000/night",
    distance: "10 mins from venue",
    amenities: ["Wi-Fi", "Restaurant", "Bar"],
    contact: "TBA",
    link: "https://maps.google.com/?q=Bolingo+Hotel+Ikeja",
    rooms: ["Standard: ₦70,000", "Deluxe: ₦95,000", "Suite: ₦150,000"],
  },
];

const VERIFIED_HOTELS = new Set<string>([
  "Sheraton Lagos Hotel, Ikeja",
  "Ibis Lagos Ikeja",
  "Protea Hotel Ikeja Select",
]);

export default function HotelsTravel() {
  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet title="Hotels & Travel | NICE Lagos 2026">
        <meta name="description" content={`Recommended hotels and travel tips for delegates attending NICE Lagos 2026 at ${CONFERENCE.venue.shortName}, Agidingbi, Ikeja.`} />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/hotels-travel"} />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Hotels & Travel</h1>
        <p className="text-muted-foreground mt-2">
          Plan your stay around {CONFERENCE.venue.shortName}, Agidingbi, Ikeja, Lagos with curated hotel options and essential travel tips.
        </p>
        <p className="text-xs text-muted-foreground mt-2 italic">
          Rates below are indicative placeholders. Confirmed delegate rates will be published closer to the conference.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="inline-flex items-center gap-2">
            <Badge className="bg-brand-primary/10 text-brand-primary">Verified</Badge>
            Confirmed by the NICE logistics team
          </span>
          <span className="inline-flex items-center gap-2">
            <Badge variant="secondary">Not Verified</Badge>
            Listing pending confirmation
          </span>
        </div>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {HOTELS.map((h) => {
          const verified = VERIFIED_HOTELS.has(h.name);
          return (
            <Card key={h.name} className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-lg">{h.name}</h3>
                {verified ? (
                  <Badge className="bg-brand-primary/10 text-brand-primary shrink-0">Verified</Badge>
                ) : (
                  <Badge variant="secondary" className="shrink-0">Not Verified</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{h.address}</p>
              <p className="text-sm text-muted-foreground">{h.distance}</p>
              <p className="mt-2"><span className="font-medium text-primary">{h.priceRange}</span></p>

              <div className="mt-3 flex flex-wrap gap-2">
                {h.amenities.map((a) => (
                  <Badge key={a} variant="secondary">{a}</Badge>
                ))}
              </div>

              <div className="mt-3">
                <p className="text-sm font-medium mb-2">Available Rooms:</p>
                <div className="space-y-1">
                  {h.rooms.slice(0, 3).map((room, index) => (
                    <p key={index} className="text-xs text-muted-foreground">{room}</p>
                  ))}
                  {h.rooms.length > 3 && (
                    <p className="text-xs text-primary">+{h.rooms.length - 3} more room types</p>
                  )}
                </div>
              </div>

              <p className="text-sm mt-3">Contact: {h.contact}</p>
              <Button asChild variant="outline" className="mt-4 w-full">
                <a href={h.link} target="_blank" rel="noreferrer">View Details & Book</a>
              </Button>
            </Card>
          );
        })}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Essential Travel Information</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Getting to Lagos</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">✈️</span>
                <div>
                  <strong>By Air:</strong> Fly into Murtala Muhammed International Airport (LOS), Ikeja. The venue, {CONFERENCE.venue.shortName} in Agidingbi, Ikeja, is roughly 15–25 minutes away depending on traffic.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🚗</span>
                <div>
                  <strong>By Road:</strong> Lagos is well-connected via the Lagos–Ibadan Expressway, Lagos–Abeokuta Expressway, and coastal routes. Agidingbi sits within Ikeja's Central Business District.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🚆</span>
                <div>
                  <strong>By Rail:</strong> The Lagos Blue Line and Red Line rail services connect the Marina, Mile 2, Oshodi and Agbado corridors, with onward connections to Ikeja.
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Getting Around Lagos</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">🚖</span>
                <div>
                  <strong>Ride-hailing:</strong> Bolt, Uber and inDrive operate widely across Lagos. Confirm pickup points and fares in-app before travelling.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🚌</span>
                <div>
                  <strong>Hotel Shuttles:</strong> Most partner hotels offer airport pickup and conference venue transfers on request.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🏨</span>
                <div>
                  <strong>Conference Transport:</strong> Organised shuttle services will run between selected partner hotels and {CONFERENCE.venue.shortName} on programme days.
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Safety & Security</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">🆔</span>
                <div><strong>Documentation:</strong> Always carry valid government-issued ID and your conference tag.</div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🏛️</span>
                <div><strong>Local Customs:</strong> Lagos is cosmopolitan and welcoming; smart casual is widely acceptable outside conference sessions.</div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">📱</span>
                <div><strong>Emergency Contacts:</strong> Police (112 / 199), LASEMA (112), Medical Emergency (112).</div>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">What to Pack</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">🌡️</span>
                <div><strong>Climate:</strong> Warm and humid; pack light, breathable clothing and a light jacket for air-conditioned halls. An umbrella is useful for October showers.</div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">💼</span>
                <div><strong>Business Attire:</strong> Formal business wear for sessions, smart casual for evening events.</div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">💊</span>
                <div><strong>Health:</strong> Bring personal medications and consider basic first-aid essentials.</div>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Currency & Payments</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">💰</span>
                <div><strong>Currency:</strong> Nigerian Naira (₦). Most hotels and restaurants accept major debit cards.</div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🏧</span>
                <div><strong>ATMs:</strong> Widely available across Ikeja, VI and Lekki. POS operators are also common.</div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">📱</span>
                <div><strong>Mobile Payments:</strong> Paystack, Flutterwave, OPay and bank apps are widely used.</div>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Communication</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">📞</span>
                <div><strong>Local SIM Cards:</strong> Available at the airport from MTN, Airtel, Glo and 9mobile for affordable local calls and data.</div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🌐</span>
                <div><strong>Internet:</strong> Most hotels provide complimentary Wi-Fi; 4G/5G mobile data is reliable across Lagos.</div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🗣️</span>
                <div><strong>Language:</strong> English is the official language; Yoruba and Nigerian Pidgin are widely spoken.</div>
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
