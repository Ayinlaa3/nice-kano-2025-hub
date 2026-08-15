import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONFERENCE } from "@/config/conference";

// Delegate accommodation around Academy Guest House & Events Halls, Agidingbi, Ikeja.
// Addresses and phone numbers supplied by the NICE logistics team; rates are indicative
// street rates gathered from hotel websites and booking platforms.

type Hotel = {
  name: string;
  address: string;
  phone?: string;
  tier: "Premium" | "Business" | "Value" | "Apartment";
  priceRange: string;
  distance: string;
  amenities: string[];
  website?: string;
};

const ZONES: { zone: string; blurb: string; hotels: Hotel[] }[] = [
  {
    zone: "Agidingbi — closest to the venue",
    blurb: "Within 2–10 minutes of Academy Guest House & Events Halls. Best choice for early sessions.",
    hotels: [
      {
        name: "The Cordis Hotel, Ikeja",
        address: "12 Ashabi Cole Street, Off Agidingbi Road, Alausa, Ikeja 101233, Lagos",
        phone: "+234 700 880 8800",
        tier: "Premium",
        priceRange: "₦150,000 – ₦320,000/night",
        distance: "3 mins from venue",
        amenities: ["Indoor Pool", "Unity Spa", "3 Restaurants", "Business Centre", "Free Wi-Fi", "Free Parking", "Free Breakfast"],
        website: "https://www.thecordishotelikeja.com/",
      },
      {
        name: "De Meros Hotel & Suites",
        address: "Plot 4A Celestial Church Street, Off Amara Olu Street, Lateef Jakande Road, Agidingbi, Ikeja",
        phone: "+234 702 668 0595",
        tier: "Business",
        priceRange: "₦75,000 – ₦150,000/night",
        distance: "4 mins from venue",
        amenities: ["Pool", "Restaurant & Bar", "Free Wi-Fi", "Complimentary Breakfast", "Event Hall"],
      },
      {
        name: "Esporta Suites, Agidingbi",
        address: "Off Lateef Jakande Road, Beside FIRS, By Anchor Event Centre, Agidingbi, Ikeja",
        phone: "+234 906 950 9740",
        tier: "Business",
        priceRange: "₦70,000 – ₦140,000/night",
        distance: "4 mins from venue",
        amenities: ["Restaurant", "Free Wi-Fi", "Parking", "Business-friendly"],
      },
      {
        name: "De Grandeur Tower Apartments",
        address: "Plot 5A, Celestial Church Street, Off Amara Olu Street, Agidingbi, Ikeja",
        phone: "+234 702 658 8474",
        tier: "Apartment",
        priceRange: "₦90,000 – ₦180,000/night",
        distance: "4 mins from venue",
        amenities: ["Serviced Apartments", "Fitness Centre", "Lounge", "Kitchenette", "Free Wi-Fi"],
      },
      {
        name: "RT24 Hotel",
        address: "24 Abiodun Sobajo Street, Off Bayo Ajayi Street, Agidingbi, Ikeja",
        phone: "+234 810 139 9988",
        tier: "Value",
        priceRange: "₦55,000 – ₦110,000/night",
        distance: "5 mins from venue",
        amenities: ["Free Wi-Fi", "Restaurant", "Parking", "24h Reception"],
      },
      {
        name: "House 5 Royal Comfort",
        address: "Plot 6, Lateef Jakande Road, Agidingbi, Ikeja",
        phone: "+234 904 995 5551",
        tier: "Value",
        priceRange: "₦45,000 – ₦90,000/night",
        distance: "5 mins from venue",
        amenities: ["Standard & Executive Rooms", "Free Wi-Fi", "Parking"],
      },
      {
        name: "DFS Luxury Apartment",
        address: "11 Sadiku Street, Agidingbi, Ikeja",
        tier: "Apartment",
        priceRange: "₦70,000 – ₦140,000/night",
        distance: "6 mins from venue",
        amenities: ["Self-catering Apartments", "Kitchen", "Free Wi-Fi", "Parking"],
      },
      {
        name: "Dew Point Hotel",
        address: "36 Hakeem Balogun Street, Agidingbi, Ikeja 101233",
        tier: "Value",
        priceRange: "₦50,000 – ₦100,000/night",
        distance: "6 mins from venue",
        amenities: ["Free Wi-Fi", "Restaurant", "Parking"],
      },
      {
        name: "Event Centre Hotel",
        address: "1 Hakeem Balogun Street, Block B, Off Cadbury's, Agidingbi Road, Ikeja",
        phone: "+234 802 321 8218",
        tier: "Business",
        priceRange: "₦65,000 – ₦130,000/night",
        distance: "6 mins from venue",
        amenities: ["Event Centre", "Restaurant & Bar", "Free Wi-Fi", "Parking"],
      },
      {
        name: "Ostra Halls & Hotel",
        address: "Block K, 3 Otunba Jobi-Fele Way, Agidingbi, Ikeja 101233",
        phone: "+234 809 447 4987",
        tier: "Business",
        priceRange: "₦85,000 – ₦170,000/night",
        distance: "7 mins from venue",
        amenities: ["Conference Halls", "Restaurant", "Bar", "Free Wi-Fi", "Ample Parking"],
      },
    ],
  },
  {
    zone: "Alausa CBD — 5–15 minutes",
    blurb: "Around the Lagos State Secretariat and Ikeja City Mall, an easy drive to the venue.",
    hotels: [
      {
        name: "Martinos Hotels & Event Centre",
        address: "Plot 1, Otunba Jobi-Fele Way, CBD, Alausa, Ikeja",
        phone: "+234 913 605 7862",
        tier: "Business",
        priceRange: "₦80,000 – ₦160,000/night",
        distance: "7 mins from venue",
        amenities: ["Large Events Centre", "Restaurant", "Bar", "Free Wi-Fi", "Parking"],
      },
      {
        name: "Pearlwort Hotel & Suites",
        address: "7 Impressive Close, Behind NECA House, Off L.J. Dosumu Street, CBD, Alausa, Ikeja 101233",
        phone: "+234 908 705 0001",
        tier: "Business",
        priceRange: "₦95,000 – ₦190,000/night",
        distance: "8 mins from venue",
        amenities: ["Restaurant", "Bar", "Gym", "Free Wi-Fi", "Meeting Rooms"],
      },
      {
        name: "Protea Hotel by Marriott Ikeja Select",
        address: "Plot 2 Assbifi Road, Alausa, Ikeja, Lagos",
        phone: "+234 1 448 0800",
        tier: "Premium",
        priceRange: "₦180,000 – ₦360,000/night",
        distance: "9 mins from venue",
        amenities: ["24h Business Centre", "Restaurant", "Gym", "Free Wi-Fi", "Marriott Bonvoy"],
        website: "https://www.marriott.com/hotels/travel/lospi-protea-hotel-ikeja-select/",
      },
      {
        name: "The Autograph Executive Hotel",
        address: "24 Iyalla Street, Beside Ikeja City Mall, Alausa, Ikeja",
        phone: "+234 807 767 0550",
        tier: "Business",
        priceRange: "₦75,000 – ₦150,000/night",
        distance: "9 mins from venue",
        amenities: ["Restaurant", "Free Wi-Fi", "Parking", "Next to Ikeja City Mall"],
      },
      {
        name: "Demiral Hotel at The Place, Alausa",
        address: "3 Kafi Street, Opposite Ikeja City Mall, Off Obafemi Awolowo Way, Alausa, Ikeja",
        phone: "+234 812 077 9874",
        tier: "Business",
        priceRange: "₦85,000 – ₦170,000/night",
        distance: "9 mins from venue",
        amenities: ["The Place Restaurant", "Bar", "Free Wi-Fi", "Parking"],
      },
      {
        name: "The Place Alausa Hotel",
        address: "2 Kafi Street, Alausa, Ikeja",
        phone: "+234 812 077 9874",
        tier: "Business",
        priceRange: "₦80,000 – ₦160,000/night",
        distance: "9 mins from venue",
        amenities: ["Restaurant", "Free Wi-Fi", "Parking", "24h Reception"],
      },
      {
        name: "Bestab Luxury Suites",
        address: "3 Ishola Bello Close, Off Iyalla Street, Beside Ikeja City Mall, Alausa, Ikeja",
        phone: "+234 700 880 8800",
        tier: "Value",
        priceRange: "₦60,000 – ₦120,000/night",
        distance: "10 mins from venue",
        amenities: ["Free Wi-Fi", "Restaurant", "Parking"],
      },
      {
        name: "Deen Apartments",
        address: "15A Iyalla Street, Alausa, Ikeja",
        phone: "+234 708 454 4330",
        tier: "Apartment",
        priceRange: "₦65,000 – ₦130,000/night",
        distance: "10 mins from venue",
        amenities: ["Serviced Apartments", "Kitchen", "Free Wi-Fi", "Parking"],
      },
      {
        name: "Eeyilobe Guest House",
        address: "6B Makinde Street, Off Obafemi Awolowo Way, CBD, Alausa, Ikeja",
        phone: "+234 700 880 8800",
        tier: "Value",
        priceRange: "₦40,000 – ₦85,000/night",
        distance: "10 mins from venue",
        amenities: ["Free Wi-Fi", "Parking", "Budget-friendly"],
      },
      {
        name: "Max Court Hotel",
        address: "9 Itohan Avenue, Ikeja 101233, Lagos",
        tier: "Value",
        priceRange: "₦45,000 – ₦95,000/night",
        distance: "12 mins from venue",
        amenities: ["Free Wi-Fi", "Restaurant", "Parking"],
      },
    ],
  },
  {
    zone: "Obafemi Awolowo Way & Oregun — 10–25 minutes",
    blurb: "Along the main Ikeja corridor, convenient for airport arrivals and city access.",
    hotels: [
      {
        name: "De Rembrandt Hotel & Suites",
        address: "172 Obafemi Awolowo Way, Oregun, Ikeja 101233, Lagos",
        phone: "+234 802 955 5640",
        tier: "Premium",
        priceRange: "₦120,000 – ₦280,000/night",
        distance: "12 mins from venue",
        amenities: ["Outdoor Pool", "Fitness Centre", "Restaurant", "Bar", "Free Wi-Fi", "Near Ikeja City Mall"],
        website: "https://derembrandthotels.com/",
      },
      {
        name: "Royal Executive Suites",
        address: "117 Obafemi Awolowo Way, Ikeja, Lagos",
        tier: "Business",
        priceRange: "₦70,000 – ₦140,000/night",
        distance: "13 mins from venue",
        amenities: ["Spacious Rooms", "Restaurant", "Free Wi-Fi", "Parking"],
      },
      {
        name: "Swisscottage Suites",
        address: "18 Sunday Adigun Street, Oregun, Ikeja",
        phone: "+234 813 912 2900",
        tier: "Business",
        priceRange: "₦70,000 – ₦140,000/night",
        distance: "13 mins from venue",
        amenities: ["Restaurant", "Free Wi-Fi", "Parking"],
      },
      {
        name: "Esado Suites",
        address: "2 Akingbola Street, Oregun, Ikeja",
        phone: "+234 705 304 6000",
        tier: "Value",
        priceRange: "₦55,000 – ₦110,000/night",
        distance: "13 mins from venue",
        amenities: ["Free Wi-Fi", "Restaurant", "Parking"],
      },
      {
        name: "Q-NUTS Lounge & Suites",
        address: "17 Ikosi Road, Oregun, Ikeja",
        phone: "+234 916 988 2866",
        tier: "Value",
        priceRange: "₦50,000 – ₦100,000/night",
        distance: "14 mins from venue",
        amenities: ["Lounge & Bar", "Free Wi-Fi", "Parking"],
      },
      {
        name: "Juliet's Place Residence & Hotels",
        address: "5 Uwa Close, Oregun, Ikeja",
        phone: "+234 908 888 8996",
        tier: "Value",
        priceRange: "₦50,000 – ₦105,000/night",
        distance: "14 mins from venue",
        amenities: ["Free Wi-Fi", "Restaurant", "Parking"],
      },
      {
        name: "The Panache Luxury Apartment",
        address: "1 Oremeta Street, Oregun, Ikeja",
        phone: "+234 814 001 0573",
        tier: "Apartment",
        priceRange: "₦85,000 – ₦170,000/night",
        distance: "14 mins from venue",
        amenities: ["Luxury Apartments", "Kitchen", "Free Wi-Fi", "Parking"],
      },
      {
        name: "Presken Hotels @ Awolowo Way",
        address: "144 Obafemi Awolowo Way, Allen, Ikeja",
        phone: "+234 903 490 1279",
        tier: "Value",
        priceRange: "₦45,000 – ₦95,000/night",
        distance: "15 mins from venue",
        amenities: ["Restaurant", "Bar", "Free Wi-Fi", "Parking"],
      },
      {
        name: "Lagos Airport Hotel, Ikeja",
        address: "111 Obafemi Awolowo Way, Ikeja 101233, Lagos",
        phone: "+234 813 866 1114",
        tier: "Business",
        priceRange: "₦90,000 – ₦200,000/night",
        distance: "15 mins from venue",
        amenities: ["Pool", "Gardens", "Restaurant", "Event Halls", "Free Wi-Fi", "Ample Parking"],
      },
      {
        name: "Aotel Hotel Lagos Ikeja",
        address: "450 Obafemi Awolowo Way, Oba Akran, Ikeja",
        phone: "+234 904 750 8885",
        tier: "Business",
        priceRange: "₦70,000 – ₦150,000/night",
        distance: "18 mins from venue",
        amenities: ["Restaurant", "Bar", "Free Wi-Fi", "Parking"],
      },
    ],
  },
];

const TIER_STYLES: Record<Hotel["tier"], string> = {
  Premium: "bg-brand-primary/10 text-brand-primary",
  Business: "bg-primary/10 text-primary",
  Value: "bg-muted text-muted-foreground",
  Apartment: "bg-accent text-accent-foreground",
};

const mapLink = (h: Hotel) =>
  `https://maps.google.com/?q=${encodeURIComponent(`${h.name}, ${h.address}`)}`;

export default function HotelsTravel() {
  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet title="Hotels & Travel | NICE Lagos 2026">
        <meta name="description" content={`Recommended hotels near ${CONFERENCE.venue.shortName}, Agidingbi, Ikeja and essential travel tips for delegates attending NICE Lagos 2026.`} />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/hotels-travel"} />
      </Helmet>

      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Hotels & Travel</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Delegate accommodation around {CONFERENCE.venue.shortName}, Agidingbi, Ikeja, Lagos — grouped by
          how close each property sits to the conference venue.
        </p>
        <p className="text-xs text-muted-foreground mt-3 italic max-w-3xl">
          Rates shown are indicative street rates and drive times are estimates in normal Ikeja traffic.
          Please confirm availability and current pricing directly with each hotel. Negotiated NICE delegate
          rates will be published closer to the conference.
        </p>
      </header>

      {ZONES.map((z) => (
        <section key={z.zone} className="mb-14">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold">{z.zone}</h2>
            <p className="text-sm text-muted-foreground mt-1">{z.blurb}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {z.hotels.map((h) => (
              <Card key={h.name} className="p-5 flex flex-col hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg leading-snug">{h.name}</h3>
                  <Badge className={`${TIER_STYLES[h.tier]} shrink-0`}>{h.tier}</Badge>
                </div>

                <p className="text-sm text-muted-foreground mt-2">{h.address}</p>
                <p className="text-sm text-muted-foreground mt-1">{h.distance}</p>
                <p className="mt-2 font-medium text-primary">{h.priceRange}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {h.amenities.map((a) => (
                    <Badge key={a} variant="secondary">{a}</Badge>
                  ))}
                </div>

                <p className="text-sm mt-3">
                  {h.phone ? (
                    <>
                      Reservations:{" "}
                      <a href={`tel:${h.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">
                        {h.phone}
                      </a>
                    </>
                  ) : (
                    <span className="text-muted-foreground">Reservations: contact the hotel via its listing</span>
                  )}
                </p>

                <div className="mt-4 flex gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <a href={mapLink(h)} target="_blank" rel="noreferrer">Map</a>
                  </Button>
                  {h.website && (
                    <Button asChild className="flex-1">
                      <a href={h.website} target="_blank" rel="noreferrer">Website</a>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}


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
