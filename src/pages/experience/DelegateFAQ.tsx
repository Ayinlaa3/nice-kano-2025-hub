import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CONFERENCE } from "@/config/conference";

const FAQS = [
  {
    q: "Do I need a visa to attend NICE Lagos 2026?",
    a: "Most non-ECOWAS nationals require a Nigerian visa. Apply through the Nigeria Immigration Service portal or your nearest Nigerian High Commission. NICE can issue a formal invitation letter on request after registration.",
  },
  {
    q: "Which airport should I fly into?",
    a: "Murtala Muhammed International Airport (LOS), Ikeja. The venue is 15–25 minutes away by road, and most partner hotels offer complimentary airport pickup on request.",
  },
  {
    q: "How safe is Lagos for delegates?",
    a: "Ikeja, Alausa, Ikoyi and Victoria Island — where the venue and partner hotels are located — are the well-patrolled business districts of Lagos. Use ride-hailing apps (Bolt, Uber, inDrive), avoid displaying valuables in traffic, and always carry your conference tag.",
  },
  {
    q: "What is the weather like in October?",
    a: "Warm and humid, roughly 24–31°C, with a chance of brief afternoon showers as the rainy season winds down. Pack breathable clothing, a light jacket for air-conditioned halls and a compact umbrella.",
  },
  {
    q: "Will there be shuttle service from partner hotels?",
    a: "Yes — organised shuttles will run between selected partner hotels and the venue on programme days. Details will be confirmed in your delegate pack.",
  },
  {
    q: "Can I pay in USD or by international card?",
    a: "The conference fee is billed in Naira (with an international delegate flat rate). International Visa/Mastercard payments are supported through Remita. Most Lagos hotels accept major international cards.",
  },
  {
    q: "Is there a spouse programme?",
    a: "Yes. The spouse programme includes guided tours of Lagos landmarks (Lekki Conservation Centre, Nike Art Gallery, New Afrika Shrine), cultural workshops and social activities. Included with main registration.",
  },
  {
    q: "What should I wear?",
    a: "Formal business attire for plenary and technical sessions; smart casual for evenings; comfortable closed shoes and light clothing for the technical site tour.",
  },
  {
    q: "Will sessions be streamed or recorded?",
    a: "Selected sessions will be live-streamed and recorded for on-demand access via the NICE portal after the conference.",
  },
  {
    q: "How do I collect my delegate pack?",
    a: `Delegate packs are collected at the on-site registration desk at ${CONFERENCE.venue.shortName} from the evening before Day 1. Bring a valid ID and your registration confirmation.`,
  },
];

export default function DelegateFAQ() {
  return (
    <div className="container mx-auto py-12 md:py-16 max-w-3xl">
      <Helmet title="Delegate FAQ | Experience Lagos | NICE Lagos 2026">
        <meta name="description" content="Answers to common delegate questions about attending NICE Lagos 2026 — visa, travel, safety, weather, dress and more." />
      </Helmet>

      <header className="mb-10">
        <Badge className="bg-brand-primary/10 text-brand-primary mb-3">Experience Lagos · FAQ</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Delegate FAQ</h1>
        <p className="text-lg text-muted-foreground">Quick answers for delegates travelling to Lagos for the {CONFERENCE.edition}.</p>
      </header>

      <Accordion type="single" collapsible className="w-full">
        {FAQS.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
