import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HOTELS = [
  {
    name: "Dan Yaya Guest Palace",
    address: "Foundation Road Behind Naptip Tarauni / Dangi Zaria Road, Tarauni LGA",
    priceRange: "₦40,000 - ₦80,000/night",
    distance: "15 mins drive",
    amenities: ["Wi‑Fi", "VIP Rooms", "Executive Rooms"],
    contact: "08131852222",
    link: "#",
    rooms: ["VIP Danyaya: ₦80,000", "VIP Kano: ₦50,000", "Executive Tarauni: ₦40,000", "Executive Bichi: ₦40,000"]
  },
  {
    name: "Guest Pride Hotel",
    address: "No. 46, Marhaba, Farm Centre Commercial Layout, Kano",
    priceRange: "₦21,500 - ₦134,375/night",
    distance: "15 mins drive",
    amenities: ["Wi‑Fi", "Breakfast", "Business Suite", "Kitchen"],
    contact: "08055247274, 08037055158",
    link: "#",
    rooms: ["Standard: ₦53,750", "Standard Twin: ₦64,500", "Business Suite: ₦80,625", "Executive Suite: ₦134,375", "Driver's Lodge: ₦21,500"]
  },
  {
    name: "City King Hotel & Towers",
    address: "Ali Rano Link, Off Guda Abdullahi Road, Kano",
    priceRange: "₦65,000 - ₦225,000/night",
    distance: "15 mins drive",
    amenities: ["Wi‑Fi", "Luxury Suites", "Royal Service"],
    contact: "09160726060, 08028938723",
    link: "#",
    rooms: ["Queen Suites: ₦65,000", "Royal Suites: ₦77,000", "Royal Twins: ₦85,000", "Sultanate Suites: ₦120,000", "Presidential: ₦225,000"]
  },
  {
    name: "City Center Hotels",
    address: "No.47 Justice Dahiru Mustapha Street, Behind Assalam College, Farm Center",
    priceRange: "₦39,400 - ₦114,000/night",
    distance: "15 mins drive",
    amenities: ["Wi‑Fi", "Executive Rooms", "VIP Service"],
    contact: "09127727750, 09127727760",
    link: "#",
    rooms: ["Mini Standard: ₦39,400", "Deluxe: ₦51,250", "Executive Deluxe: ₦56,400", "Royal Suites: ₦66,900", "Executive VIP: ₦104,000"]
  },
  {
    name: "Rayhaan Hotels",
    address: "No. 27,28 Zaria Road, Opposite AKTH Southern Gate, Unguwa uku",
    priceRange: "₦33,000 - ₦96,000/night",
    distance: "25 mins drive",
    amenities: ["Wi‑Fi", "Restaurant", "Standard to Suite Options"],
    contact: "09038024166, 08039642061",
    link: "#",
    rooms: ["Standard: ₦33,000", "Executive: ₦35,000", "Luxury: ₦40,000", "VIP: ₦55,000", "Deluxe: ₦60,000", "Royal: ₦70,000", "Suite: ₦96,000"]
  },
  {
    name: "Bayco Guest Palace",
    address: "No.286 Kwanar Masallaci, Yar Akwa Qtrs, Zaria Road, Tarauni LGA",
    priceRange: "₦19,000 - ₦35,000/night",
    distance: "25 mins drive",
    amenities: ["Wi‑Fi", "Budget Friendly", "Royal Suites"],
    contact: "064892226",
    link: "#",
    rooms: ["Mini Standard: ₦19,000", "Super Standard: ₦21,000", "King Delight: ₦26,000", "Royal Suite: ₦35,000"]
  },
  {
    name: "AJIMS",
    address: "No. 527 Behind Matrix Filling Station Opposite Zenith Bank, Na'ibawa",
    priceRange: "₦20,000 - ₦45,000/night",
    distance: "25 mins drive",
    amenities: ["Wi‑Fi", "Standard Rooms", "Executive Suites"],
    contact: "Contact via hotel",
    link: "#",
    rooms: ["Mini Standard: ₦20,000", "Standard: ₦25,000", "Executive: ₦35,000", "Executive Suite: ₦40,000", "Deluxe: ₦45,000"]
  },
  {
    name: "Prince Hotel",
    address: "Tamandu Road, off Audu Bako Way, Nassarawa GRA",
    priceRange: "₦50,000 - ₦315,900/night",
    distance: "10 mins drive",
    amenities: ["Wi‑Fi", "Presidential Suite", "Ambassador Suite", "Full Service"],
    contact: "08033773923, 08097697979",
    link: "#",
    rooms: ["Standard: ₦60,750", "Executive: ₦72,900", "King Size: ₦85,050", "VIP Suite: ₦121,500", "Presidential: ₦315,900"]
  },
  {
    name: "Chilla Hotel",
    address: "No. 110, Audu Bako Way",
    priceRange: "₦34,000 - ₦64,000/night",
    distance: "10 mins drive",
    amenities: ["Wi‑Fi", "Deluxe Rooms", "Executive Service"],
    contact: "08152525275",
    link: "#",
    rooms: ["Deluxe: ₦34,000", "Royal: ₦44,000", "Luxury: ₦54,000", "Executive: ₦64,000", "Diplomate: ₦64,000"]
  },
  {
    name: "QuarterHouse Hotel",
    address: "No.1 Tamandu close, Nassarawa GRA",
    priceRange: "₦31,000 - ₦120,000/night",
    distance: "15 mins drive",
    amenities: ["Wi‑Fi", "Studio Rooms", "Royal Suites"],
    contact: "08100935004",
    link: "#",
    rooms: ["Single: ₦35,000", "Executive Studio: ₦45,000", "Luxury Suite: ₦55,000", "Executive Suite: ₦66,000", "Royal Suite: ₦120,000"]
  },
  {
    name: "Central Hotel Limited Kano",
    address: "No.1 Bompai Road, Kano State",
    priceRange: "₦30,000 - ₦45,000/night",
    distance: "15 mins drive",
    amenities: ["Wi‑Fi", "Heritage Suites", "Executive Service"],
    contact: "08106350000, 08024203311",
    link: "#",
    rooms: ["Imperial Suite: ₦30,000", "Heritage Suite: ₦40,000", "Heritage Double: ₦45,000", "Executive Superior: ₦45,000"]
  },
  {
    name: "Aljazeerah Hotel",
    address: "No.33 Gashash Road, along Race Course Road",
    priceRange: "₦26,202 - ₦57,980/night",
    distance: "10 mins drive",
    amenities: ["Wi‑Fi", "Business Deluxe", "Economy Options"],
    contact: "08148808800, 07008808800",
    link: "#",
    rooms: ["Economy: ₦26,202", "Standard: ₦28,990", "Deluxe: ₦35,680", "Business Deluxe: ₦43,485", "Alzaeera Suite: ₦57,980"]
  },
  {
    name: "GK Guest Palace",
    address: "No.38 Gashash Road, Behind Daula Hotel, off Race course road",
    priceRange: "₦48,600 - ₦102,000/night",
    distance: "10 mins drive",
    amenities: ["Wi‑Fi", "Deluxe Rooms", "Royal Service"],
    contact: "09092888807, 09092888808, 08078884888",
    link: "#",
    rooms: ["Economic: ₦48,600", "Standard: ₦60,750", "GK Deluxe: ₦72,900", "Royal: ₦79,000", "GK Royal: ₦102,000"]
  },
  {
    name: "Ni'imah Guest Palace",
    address: "No.38 Suleiman Crescent, Kano",
    priceRange: "₦50,000 - ₦120,000/night",
    distance: "15 mins drive",
    amenities: ["Wi‑Fi", "Business Suite", "Ambassador Suite"],
    contact: "08024332464",
    link: "#",
    rooms: ["Economy: ₦50,000", "Standard: ₦60,000", "First Class: ₦60,000", "Business Suite: ₦85,000", "Governor's Lodge: ₦120,000"]
  },
  {
    name: "Tahir Guest Palace",
    address: "No.4 Ibrahim Natsugune road, off Ahmadu Bello Way Nassara",
    priceRange: "₦59,250 - ₦132,425/night",
    distance: "15 mins drive",
    amenities: ["Wi‑Fi", "Bed & Breakfast", "VIP Suites", "Conference Venue"],
    contact: "08050298536",
    link: "#",
    rooms: ["Deluxe: ₦67,250", "Super Deluxe: ₦88,580", "VIP Suite: ₦90,850", "Executive Royal: ₦108,725", "Executive VIP: ₦132,425"]
  },
  {
    name: "Nassarawa Guest House",
    address: "No.314 Lamido Road Kano",
    priceRange: "₦20,000 - ₦200,000/night",
    distance: "15 mins drive",
    amenities: ["Wi‑Fi", "Executive Suites", "Presidential Suite"],
    contact: "064639678, 08034501789",
    link: "#",
    rooms: ["Economy: ₦20,000", "Room A: ₦25,000", "Double: ₦28,000", "Executive Suite: ₦60,000", "Presidential: ₦200,000"]
  },
  {
    name: "La Sultana Hotel Apartment",
    address: "No.73 Sultan Road, Nassarawa Kano",
    priceRange: "₦50,000 - ₦150,000/night",
    distance: "10 mins drive",
    amenities: ["Wi‑Fi", "Apartment Style", "Presidential Suite"],
    contact: "09064777764",
    link: "#",
    rooms: ["Standard Suites: ₦50,000", "Luxury Suites: ₦60,000", "Presidential Suite: ₦150,000"]
  },
  {
    name: "R & K Guest Palace",
    address: "Airport Road, opposite Aminu Kano International Airport",
    priceRange: "₦35,000 - ₦200,000/night",
    distance: "20 mins drive",
    amenities: ["Wi‑Fi", "Pool", "Airport Proximity", "Apartments"],
    contact: "09022009040",
    link: "#",
    rooms: ["Standard: ₦37,000", "Deluxe: ₦45,000", "Classic Suite: ₦55,000", "Ambassador: ₦80,000", "3 Bedroom Apt: ₦200,000"]
  },
  {
    name: "Bon Hotel Kano",
    address: "No.38 Lafia Road off Ahmadu Bello Way, Nassarawa GRA",
    priceRange: "₦78,000 - ₦390,000/night",
    distance: "15 mins drive",
    amenities: ["Wi‑Fi", "Luxury Hotel", "Presidential Suite", "Chalet Options"],
    contact: "09122495109",
    link: "#",
    rooms: ["Classic: ₦78,000", "Deluxe: ₦90,000", "Classic Suite: ₦120,000", "Executive Suite: ₦150,000", "Presidential: ₦390,000"]
  }
];

export default function HotelsTravel() {
  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet>
        <title>Hotels & Travel | NICE Kano 2025</title>
        <meta name="description" content="Recommended hotels near the venue and travel tips for attendees visiting Kano for NICE 2025." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/hotels-travel"} />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Hotels & Travel</h1>
        <p className="text-muted-foreground mt-2">Plan your stay with curated hotel options and essential travel tips.</p>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {HOTELS.map((h) => (
          <Card key={h.name} className="p-5 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg">{h.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{h.address}</p>
            <p className="text-sm text-muted-foreground">{h.distance} from venue</p>
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
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Essential Travel Information</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Getting to Kano</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">✈️</span>
                <div>
                  <strong>By Air:</strong> Fly into Mallam Aminu Kano International Airport (KAN). Major airlines include Arik Air, Air Peace, and Azman Air with direct flights from Lagos, Abuja, and Port Harcourt.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🚗</span>
                <div>
                  <strong>By Road:</strong> Kano is well-connected by road. The journey from Abuja takes approximately 6-7 hours via A1 highway.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🚂</span>
                <div>
                  <strong>By Rail:</strong> Nigerian Railway Corporation operates services from Lagos to Kano (though schedules may vary).
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Getting Around Kano</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">🚖</span>
                <div>
                  <strong>Taxis:</strong> Use reputable taxi services or ride-hailing apps. Always negotiate fares beforehand for regular taxis.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🚌</span>
                <div>
                  <strong>Hotel Shuttles:</strong> Many hotels offer complimentary airport pickup and conference venue transfers.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🏨</span>
                <div>
                  <strong>Conference Transport:</strong> Organized shuttle services will be available between major hotels and the conference venue.
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Safety & Security</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">🆔</span>
                <div>
                  <strong>Documentation:</strong> Always carry valid government-issued ID and your conference badge.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🏛️</span>
                <div>
                  <strong>Local Customs:</strong> Respect local traditions and dress modestly, especially when visiting cultural sites.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">📱</span>
                <div>
                  <strong>Emergency Contacts:</strong> Save local emergency numbers: Police (199), Medical Emergency (112).
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">What to Pack</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">🌡️</span>
                <div>
                  <strong>Climate:</strong> Pack light, breathable clothing for warm weather. Bring a light jacket for air-conditioned venues.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">💼</span>
                <div>
                  <strong>Business Attire:</strong> Formal business wear for conference sessions, smart casual for evening events.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">💊</span>
                <div>
                  <strong>Health:</strong> Bring any personal medications and consider basic first aid items.
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Currency & Payments</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">💰</span>
                <div>
                  <strong>Currency:</strong> Nigerian Naira (₦). Most hotels and restaurants accept major credit cards.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🏧</span>
                <div>
                  <strong>ATMs:</strong> Widely available throughout the city. Banks typically operate Monday-Friday, 8AM-4PM.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">📱</span>
                <div>
                  <strong>Mobile Payments:</strong> Popular mobile money platforms include Paystack, Flutterwave, and bank mobile apps.
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Communication</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">📞</span>
                <div>
                  <strong>Local SIM Cards:</strong> Available at the airport from MTN, Airtel, Glo, and 9mobile for affordable local calls and data.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🌐</span>
                <div>
                  <strong>Internet:</strong> Most hotels offer complimentary Wi-Fi. Mobile data is reliable throughout the city.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">🗣️</span>
                <div>
                  <strong>Language:</strong> English is the official language. Local languages include Hausa and Fulani.
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
