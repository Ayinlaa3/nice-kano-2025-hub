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
        answer: "Registration is available online through our official website. Early bird registration offers significant discounts. You can also register at the venue during the conference days, though online pre-registration is highly recommended."
      },
      {
        question: "What are the registration fees?",
        answer: "Registration fees vary by membership status and registration period. NICE members enjoy discounted rates. Early bird rates are available until a specified deadline. Student rates are also available for NICESA members with valid student ID."
      },
      {
        question: "Are there group discounts available?",
        answer: "Yes, group discounts are available for organizations registering 5 or more participants. Contact our registration team for special group rates and payment arrangements."
      },
      {
        question: "What payment methods are accepted?",
        answer: "We accept bank transfers, online payments, and cash payments at designated collection points. All payment details and account information are provided during the registration process."
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
        answer: "The conference will be held from [specific dates]. The event includes technical sessions, plenary sessions, exhibitions, industrial visits, and social events spanning multiple days."
      },
      {
        question: "What is included in the conference program?",
        answer: "The program includes keynote presentations, technical paper sessions, plenary sessions, exhibitions, industrial visits to at least 2 locations, networking sessions, spouse programs, student (NICESA) activities, and cultural entertainment."
      },
      {
        question: "Are technical papers required for attendance?",
        answer: "Technical papers are not mandatory for attendance, but we encourage participants to submit papers for presentation. All papers undergo peer review by our technical committee."
      },
      {
        question: "Will there be continuing professional development (CPD) credits?",
        answer: "Yes, attendance at NICE Kano 2025 qualifies for CPD credits. Certificates will be issued to all registered participants who attend the required sessions."
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
        answer: "The conference will be held in Kano, Nigeria. Specific venue details, maps, and directions are available on our Location page. The venue is easily accessible and offers modern conference facilities."
      },
      {
        question: "Are there recommended hotels for accommodation?",
        answer: "Yes, we have partnered with several hotels to offer special rates for conference participants. A list of recommended accommodations with contact details and discount codes is available on our Hotels & Travel page."
      },
      {
        question: "Is transportation provided to/from the airport?",
        answer: "Airport pickup and transfer services can be arranged. Details about transportation options, including shuttle services and local transport recommendations, are provided in the pre-conference information pack."
      },
      {
        question: "What facilities are available at the venue?",
        answer: "The venue features modern conference halls, exhibition spaces, networking areas, audio-visual equipment, Wi-Fi connectivity, catering facilities, and parking. Accessibility features are also available."
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
        answer: "We have lined up distinguished speakers from industry, academia, and government. The complete list of speakers with their profiles and presentation topics is available on our Speakers page."
      },
      {
        question: "Can I submit a technical paper for presentation?",
        answer: "Yes, we welcome technical paper submissions. Papers should align with the conference themes and undergo peer review. Guidelines for paper submission, formatting requirements, and deadlines are available on our website."
      },
      {
        question: "Are presentation materials available after the conference?",
        answer: "Selected presentation materials and conference proceedings will be made available to registered participants. This includes key presentations, technical papers, and the conference communique."
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
        answer: "The conference includes a National Chairman's cocktail, opening ceremony cultural performances, networking dinners, and entertainment programs featuring local cultural troupes and musical performances."
      },
      {
        question: "Is there a spouse program?",
        answer: "Yes, we have a comprehensive spouse program including tours to places of interest, career and health talks, and cultural activities. Registration for the spouse program is available during main conference registration."
      },
      {
        question: "Are there activities for students (NICESA)?",
        answer: "Absolutely! NICESA participants have dedicated programs including mentorship sessions, competitions, presentations, and networking opportunities with practicing engineers."
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
        answer: "International participants may require a visa to enter Nigeria. We can provide invitation letters to assist with visa applications. Contact our secretariat for visa support documentation."
      },
      {
        question: "What should I pack for the conference?",
        answer: "Pack business attire for conference sessions, casual wear for industrial visits, and comfortable shoes for walking. Consider the local climate and include any personal medications you may need."
      },
      {
        question: "Are there industrial visits planned?",
        answer: "Yes, industrial visits to at least 2 different locations are included in the program. These visits provide practical insights into engineering projects and industrial operations in the Kano region."
      },
      {
        question: "Is local transport assistance available?",
        answer: "Yes, we provide guidance on local transportation options, route maps, and can arrange group transport for major conference activities and industrial visits."
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