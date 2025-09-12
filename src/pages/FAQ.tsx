import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Phone, Mail, CreditCard, Plane, Clock } from "lucide-react";

const faqCategories = [
  {
    title: "Registration & Fees",
    icon: <CreditCard className="h-5 w-5" />,
    badge: "Essential",
    questions: [
      {
        question: "How do I register for NICE Kano 2025?",
        answer: "Register online through our Google Forms link: https://forms.gle/HXocP4aGn5Pb1HmR6. You can also register on-site during the conference days (October 21-23, 2025), though online pre-registration is strongly recommended for guaranteed admission."
      },
      {
        question: "What are the registration fees?",
        answer: "Registration fees vary by membership status. NICE members receive discounted rates compared to non-members. NICESA (student) members also have special rates with valid student ID. Early bird registration offers additional savings - contact info@nicekano2025.org for current pricing."
      },
      {
        question: "Are there group discounts available?",
        answer: "Yes, organizations registering 5 or more participants receive group discounts. Contact our registration team at info@nicekano2025.org for special group rates and flexible payment arrangements."
      },
      {
        question: "What payment methods are accepted?",
        answer: "We accept bank transfers and online payments. Nigerian Naira (₦) is the primary currency. Payment details and bank account information are provided during the online registration process."
      }
    ]
  },
  {
    title: "Event Schedule & Program",
    icon: <Calendar className="h-5 w-5" />,
    badge: "Program",
    questions: [
      {
        question: "When is NICE Kano 2025 taking place?",
        answer: "The conference runs from October 21-23, 2025 (3 days). Day 1 includes site visits and Chairman's cocktail, Day 2 features the opening ceremony and main sessions, Day 3 concludes with the AGM and awards gala."
      },
      {
        question: "What is included in the conference program?",
        answer: "The program includes: Technical Project Site Visits, Construction Tech Expo, Opening Ceremony, Special Plenary Sessions, Panel Discussions, Technical Paper Sessions, Fellowship Conferment, Career Clinic for Graduates, Spouse Programs, NICESA Activities, Chairman's Cocktail, and the Awards & Cultural Gala."
      },
      {
        question: "Are technical papers required for attendance?",
        answer: "No, technical papers are not mandatory for attendance. However, we encourage participants to submit papers for presentation. All submitted papers undergo peer review by our technical committee and align with the theme: 'Integration of Innovative Construction Towards Sustainable Civil Infrastructure Development.'"
      },
      {
        question: "Will there be continuing professional development (CPD) credits?",
        answer: "Yes, attendance at NICE Kano 2025 qualifies for CPD credits from the Council for the Regulation of Engineering in Nigeria (COREN). Certificates will be issued to all registered participants who attend the required sessions."
      }
    ]
  },
  {
    title: "Venue & Accommodation",
    icon: <MapPin className="h-5 w-5" />,
    badge: "Location",
    questions: [
      {
        question: "Where is the conference venue located?",
        answer: "The main venue is Coronation Hall at Kano Government House, centrally located with secure access. Additional sessions will be held at Tahir Guest Palace. Both venues offer modern conference facilities, A/V equipment, Wi-Fi, and ample parking."
      },
      {
        question: "Are there recommended hotels for accommodation?",
        answer: "Yes, we've curated 19 hotel options ranging from ₦19,000-₦390,000/night. Popular choices include Dan Yaya Guest Palace (₦40,000-₦80,000), Prince Hotel (₦50,000-₦315,900), and Bon Hotel Kano (₦78,000-₦390,000). Most are within 10-25 minutes of the venue."
      },
      {
        question: "Is transportation provided to/from the airport?",
        answer: "Many recommended hotels offer complimentary airport pickup services. Additionally, organized shuttle services will operate between major hotels and conference venues. Mallam Aminu Kano International Airport (KAN) is approximately 20-30 minutes from most hotels."
      },
      {
        question: "What facilities are available at the venue?",
        answer: "Coronation Hall features modern conference facilities, exhibition spaces for the Construction Expo Africa, networking areas, professional A/V equipment, reliable Wi-Fi, catering services, secure parking, and full accessibility features."
      }
    ]
  },
  {
    title: "Speakers & Presentations",
    icon: <Users className="h-5 w-5" />,
    badge: "Speakers",
    questions: [
      {
        question: "Who are the keynote speakers?",
        answer: "Our distinguished speakers include Prof. Adebayo Ogundimu (Director General, Nigerian Building and Road Research Institute), Engr. Dr. Fatima Hassan (Federal Ministry of Works and Housing), Prof. Michael Adeyemi (University of Lagos), and Engr. Sarah Abdullahi (Managing Director, Northern Construction Ltd)."
      },
      {
        question: "Can I submit a technical paper for presentation?",
        answer: "Yes, we welcome technical paper submissions aligned with our theme: 'Integration of Innovative Construction Towards Sustainable Civil Infrastructure Development.' Papers undergo peer review and should focus on sustainable practices, innovative construction methods, or infrastructure resilience."
      },
      {
        question: "Are presentation materials available after the conference?",
        answer: "Selected presentation materials and conference proceedings will be made available to registered participants post-conference. This includes keynote presentations, technical papers, panel discussion summaries, and the final conference communique."
      }
    ]
  },
  {
    title: "Networking & Social Events",
    icon: <Clock className="h-5 w-5" />,
    badge: "Social",
    questions: [
      {
        question: "What social events are planned?",
        answer: "Social events include: Chairman's Cocktail & Engineering Business Roundtable (Day 1), Opening Ceremony with cultural performances (Day 2), Fellows Roundtable (Day 2), and the grand AGM Dinner, Awards & Honours Night with Cultural Gala (Day 3) at Tahir Guest Palace."
      },
      {
        question: "Is there a spouse program?",
        answer: "Yes, we offer a comprehensive spouse program featuring guided tours of Kano's historic sites (Ancient City Walls, Emir's Palace, Kurmi Market, Dye Pits), cultural workshops, career talks, and social activities. Registration is included with main conference registration."
      },
      {
        question: "Are there activities for students (NICESA)?",
        answer: "NICESA participants enjoy dedicated programs including the Innovation Clinic, Career Clinic for Graduates, mentorship sessions with senior engineers, competitions, technical presentations, and special networking opportunities designed for students and young professionals."
      }
    ]
  },
  {
    title: "Travel & Logistics",
    icon: <Plane className="h-5 w-5" />,
    badge: "Travel",
    questions: [
      {
        question: "Do I need a visa to attend?",
        answer: "International participants may require a visa to enter Nigeria. We can provide official invitation letters to assist with visa applications. Contact our secretariat at info@nicekano2025.org for visa support documentation and processing guidance."
      },
      {
        question: "What should I pack for the conference?",
        answer: "Pack formal business attire for conference sessions, smart casual for evening events, comfortable clothing for site visits, light jacket for air-conditioned venues, comfortable walking shoes, and any personal medications. Kano has warm weather year-round."
      },
      {
        question: "Are there industrial visits planned?",
        answer: "Yes, Day 1 includes 'Technical Project Site Visit and Technical Presentation' (9:00 AM - 2:00 PM) featuring guided tours of major civil engineering projects in Kano, showcasing innovative construction techniques and sustainable infrastructure development."
      },
      {
        question: "Is local transport assistance available?",
        answer: "Yes, we provide shuttle services between major hotels and conference venues. Local transportation options include reputable taxis, ride-hailing apps, and hotel shuttles. Airport transfers are available through most recommended hotels."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions - NICE Kano 2025</title>
        <meta 
          name="description" 
          content="Find answers to common questions about NICE Kano 2025 International Conference and Annual General Meeting. Registration, venue, accommodation, and program details." 
        />
        <link rel="canonical" href={`${window.location.origin}/faq`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
          <div className="relative max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              Help Center
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about NICE Kano 2025 International Conference and Annual General Meeting
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" />
                  Need More Help?
                </CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Contact our conference team directly
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <p className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email: info@nicekano2025.org</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone: +234 XXX XXX XXXX</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="px-4 pb-20">
          <div className="max-w-6xl mx-auto space-y-8">
            {faqCategories.map((category, index) => (
              <Card key={index} className="border-muted/40 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {category.icon}
                    </div>
                    {category.title}
                    <Badge variant="secondary" className="ml-auto">
                      {category.badge}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`} className="border-muted/30">
                        <AccordionTrigger className="text-left hover:text-primary transition-colors px-4">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pt-2 pb-6 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-secondary/10 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
                <CardDescription>
                  Explore more information about the conference
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <a href="/program" className="p-4 rounded-lg border border-muted/40 hover:border-primary/40 transition-colors group">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-1">Conference Program</h3>
                  <p className="text-sm text-muted-foreground">Detailed schedule and sessions</p>
                </a>
                <a href="/location" className="p-4 rounded-lg border border-muted/40 hover:border-primary/40 transition-colors group">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-1">Venue & Location</h3>
                  <p className="text-sm text-muted-foreground">Maps and directions</p>
                </a>
                <a href="/contact" className="p-4 rounded-lg border border-muted/40 hover:border-primary/40 transition-colors group">
                  <Phone className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-1">Contact Us</h3>
                  <p className="text-sm text-muted-foreground">Get in touch directly</p>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}