import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const TIERS = [
  { 
    name: "Platinum", 
    price: "₦15,000,000", 
    perks: [
      "Prime logo placement on stage backdrop & website",
      "2 premium booths at Construction Expo Africa",
      "5 complimentary full-access registrations",
      "Keynote acknowledgment at opening session",
      "5-minute video ad before plenary sessions",
      "Centre-spread ad in event brochure",
      "Exclusive premium table at Business Roundtable"
    ], 
    color: "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20",
    icon: "👑"
  },
  { 
    name: "Gold", 
    price: "₦10,000,000", 
    perks: [
      "Prominent logo on stage banners & website",
      "1 standard booth at expo",
      "3 full conference registrations",
      "Acknowledgement at opening & closing ceremonies",
      "3-minute video at selected session",
      "Full-page inner cover advert in brochure",
      "Option to host branded workshop"
    ], 
    color: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20",
    icon: "🥇"
  },
  { 
    name: "Silver", 
    price: "₦5,000,000", 
    perks: [
      "Logo on website & program brochure",
      "1 standard booth at expo",
      "1 full conference registration",
      "Mention during general sessions",
      "Full-page advert in brochure",
      "Flyer in delegate bag",
      "Access to networking lounge"
    ], 
    color: "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20",
    icon: "🥈"
  },
  { 
    name: "Bronze", 
    price: "₦3,000,000", 
    perks: [
      "Logo on select banners & website",
      "One exhibitor pass",
      "Logo slide at closing session",
      "Branded banner at exhibition entrance",
      "Mention in sponsor thank you section"
    ], 
    color: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
    icon: "🥉"
  },
  { 
    name: "Supporter", 
    price: "₦1,000,000", 
    perks: [
      "Name listed on website & brochure",
      "Mention during closing remarks",
      "Certificate of appreciation from NICE",
      "Social media recognition"
    ], 
    color: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
    icon: "🤝"
  },
];

const ADD_ONS = [
  { name: "Conference Bag Branding", price: "₦500,000", note: "Exclusive to 1 sponsor" },
  { name: "Delegate Notepad or Pen", price: "₦200,000", note: "Branded item in all kits" },
  { name: "Side Workshop Session", price: "₦1,000,000", note: "60-minute hosted session" },
  { name: "Coffee/Tea Stand Branding", price: "₦300,000", note: "2 spots available" },
  { name: "Charging Station Branding", price: "₦250,000", note: "1 sponsor only" },
  { name: "Centre Spread Brochure Advert", price: "₦500,000", note: "1 slot available" },
  { name: "Full Page Brochure Advert", price: "₦300,000", note: "" },
  { name: "Half-page Brochure Advert", price: "₦150,000", note: "A5 landscape design accepted" },
];

const BOOTH_OPTIONS = [
  { name: "Regular Booth (3m x 3m - 9m2)", earlyBird: "₦300,000", standard: "₦350,000" },
  { name: "Premium Booth (3m x 6m - 18m2)", earlyBird: "₦500,000", standard: "₦600,000" },
  { name: "Vendors' Option (Outside the Hall)", standard: "₦70,000" },
];

export default function Sponsorships() {
  const { toast } = useToast();

  return (
    <div className="container mx-auto py-12 md:py-16 space-y-12">
      <Helmet>
        <title>Sponsorships & Exhibitions | NICE Kano 2025</title>
        <meta name="description" content="Partner with NICE Kano 2025 - Explore sponsorship tiers and exhibition opportunities at Nigeria's premier civil engineering conference." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/sponsorships"} />
      </Helmet>

      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">NICE 2025 International Conference & AGM</h1>
        <h2 className="text-xl md:text-2xl text-brand-primary font-semibold mb-2">Sponsorship Proposal</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">Partner with NICE to reach Nigeria's leading civil engineering community and showcase your brand at Africa's premier infrastructure development conference.</p>
      </header>

      {/* About the Conference */}
      {/* <section>
        <Card className="p-6 justify-items-center">
          <h2 className="text-2xl font-bold mb-4">About the Conference</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              The Nigerian Institution of Civil Engineers (NICE) is pleased to present the 2025 International Civil Engineering Conference and Annual General Meeting, holding in Kano, Nigeria.
            </p>
            <div className="bg-brand/5 p-4 rounded-lg">
              <h3 className="font-semibold text-brand-primary mb-2">Theme:</h3>
              <p className="italic">"Integration of Construction Innovations Towards Sustainable and Economical Civil Infrastructure Development"</p>
            </div>
            <p className="text-muted-foreground">
              This conference brings together top civil engineers, policymakers, academics, students, corporate organizations, international bodies, and innovators to share knowledge and build the future of infrastructure across Africa.
            </p>
          </div>
        </Card>
      </section> */}

      {/* Conference Objectives */}
      <section>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Conference Objectives</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Showcase innovative technologies and engineering solutions",
              "Foster collaboration between government, academia, and industry",
              "Strengthen capacity-building through professional development",
              "Promote youth participation and sustainability in civil engineering",
              "Facilitate networking among industry leaders and upcoming professionals"
            ].map((objective, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">{objective}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Why Sponsor */}
      <section>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Why Sponsor KANO 2025?</h2>
          <p className="text-muted-foreground mb-4">
            Sponsoring this premier event offers unmatched visibility and brand positioning before an influential audience of over <strong>800+ professionals</strong>, including:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              "Top-tier engineers and consultants",
              "Federal and state government delegates", 
              "Private sector construction and consulting firms",
              "International partners and NGOs",
              "Engineering students and graduates"
            ].map((audience, index) => (
              <div key={index} className="bg-muted/50 p-3 rounded-lg text-sm text-center">
                {audience}
              </div>
            ))}
          </div>
          <div className="bg-brand/5 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Key sponsor benefits include:</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Brand recognition across digital, print, and venue materials",
                "Direct interaction with delegates at your exhibition booth",
                "Speaking opportunities and dedicated mentions at strategic sessions",
                "Featured placement on NICE platforms and publications",
                "Priority access to partnership and procurement discussions"
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-brand-primary">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>

      {/* Sponsorship Packages */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">Sponsorship Packages & Detailed Benefits</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <Card key={tier.name} className={`p-6 ring-1 ring-brand/10 ${tier.color} hover:shadow-lg transition-shadow`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{tier.icon}</span>
                  <h3 className="text-xl font-bold">{tier.name}</h3>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">{tier.price}</Badge>
              </div>
              <ul className="space-y-2 mb-6">
                {tier.perks.map((perk, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-brand-primary text-xs mt-1">•</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <Button 
                variant="hero" 
                className="w-full"
                onClick={() => toast({ 
                  title: `${tier.name} Sponsorship`, 
                  description: `Contact us at sponsorship@nicehq.org to secure your ${tier.name} sponsorship package.` 
                })}
              >
                Choose {tier.name}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Add-Ons */}
      <section>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">📦 Add-On Opportunities</h2>
          <p className="text-muted-foreground mb-6">Available to all sponsors for enhanced visibility and engagement</p>
          <div className="grid md:grid-cols-2 gap-4">
            {ADD_ONS.map((addon, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-medium text-sm">{addon.name}</h4>
                  {addon.note && <p className="text-xs text-muted-foreground">{addon.note}</p>}
                </div>
                <Badge variant="outline">{addon.price}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Construction Expo Africa */}
      <section>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Construction Expo Africa – Exhibition Opportunity</h2>
          <p className="text-muted-foreground mb-6">
            Held alongside the conference, the Construction Expo Africa will host over 50 brands in civil engineering, technology, building materials, digital solutions, and infrastructure services.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Booth Options:</h3>
              <div className="space-y-3">
                {BOOTH_OPTIONS.map((booth, index) => (
                  <div key={index} className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium">{booth.name}</h4>
                    <div className="flex gap-4 mt-2">
                      <Badge variant="secondary">Early Bird: {booth.earlyBird}</Badge>
                      <Badge variant="outline">Standard: {booth.standard}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Includes:</h3>
              <ul className="space-y-2">
                {[
                  "Booth structure and name panel",
                  "2 exhibitor tags", 
                  "Listing in conference materials",
                  "Power, table, and chairs setup"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <span className="text-brand-primary">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Target Audience */}
      <section>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Target Audience</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Civil Engineers and Built Environment Professionals",
              "Ministries of Works, Transport, Housing, and Environment",
              "Academia and Research Institutions",
              "Construction and Consulting Firms", 
              "International Donors and Development Agencies",
              "Media and Technology Service Providers",
              "Student Groups and Engineering Associations"
            ].map((audience, index) => (
              <div key={index} className="bg-gradient-to-r from-brand/5 to-brand/10 p-3 rounded-lg text-sm text-center font-medium">
                {audience}
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* How to Partner */}
      <section>
        <Card className="p-6 bg-gradient-to-r from-brand/5 to-brand/10">
          <h2 className="text-2xl font-bold mb-4">How to Partner</h2>
          <p className="text-muted-foreground mb-4">
            To confirm your sponsorship or book an exhibition booth, please contact:
          </p>
          <div className="bg-background/80 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-brand-primary mb-2">Sponsorship Desk – NICE 2025 CPC</h3>
            <div className="space-y-2 text-sm">
              <p><strong>📧 Email:</strong> sponsorship@nicehq.org</p>
              <p><strong>📞 Phone:</strong> +234 802 331 8732</p>
              <p><strong>🌐 Website:</strong> conference.nicehq.org</p>
            </div>
          </div>
          <Button 
            variant="hero" 
            className="w-full"
            onClick={() => toast({ 
              title: "Contact Information", 
              description: "Email: sponsorship@nicehq.org | Phone: +234 802 331 8732" 
            })}
          >
            Get in Touch
          </Button>
        </Card>
      </section>

      {/* Conclusion */}
      <section>
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Us in Shaping the Future</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We invite you to become part of this landmark event as we advance the practice of civil engineering and infrastructure development across Nigeria and Africa. Your support will not only strengthen the profession, it will place your brand at the center of innovation and transformation.
          </p>
          <p className="text-brand-primary font-semibold mt-4">We look forward to partnering with you.</p>
        </Card>
      </section>
    </div>
  );
}