import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BriefcaseBusiness, FileCheck, GraduationCap, Users, ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SUPPORT_CONTACTS, whatsappLink, CONFERENCE_EMAIL } from "@/config/contacts";
import { CONFERENCE } from "@/config/conference";
import flyer from "@/assets/Graduate_Career_fair.png.asset.json";
import citibim from "@/assets/career-fair/citibim-supplied.jpeg.asset.json";
import lspwc from "@/assets/career-fair/lspwc-supplied.png.asset.json";
import planover from "@/assets/career-fair/planover.jpeg.asset.json";
import hooluc from "@/assets/career-fair/hooluc.png.asset.json";
import soilsmart from "@/assets/career-fair/soilsmart.jpeg.asset.json";
import godrej from "@/assets/career-fair/godrej.jpeg.asset.json";
import vxl from "@/assets/career-fair/vxl-supplied.png.asset.json";

const companies: { name: string; website?: string; logo?: string }[] = [
  { name: "Planover Engineering Ltd.", website: "https://planoverengcol.com/", logo: planover.url },
  { name: "CitiBIM Nigeria Ltd.", website: "https://citibim.com/", logo: citibim.url },
  { name: "Hooluc Integrated Services Ltd.", website: "https://www.hooluc.com/", logo: hooluc.url },
  { name: "Lagos State Public Works Corporation", website: "https://publicworks.lagosstate.gov.ng/", logo: lspwc.url },
  { name: "Soilsmart Engineering", logo: soilsmart.url },
  { name: "Modehouse Projekts Ltd." },
  { name: "Godrej Nigeria Ltd.", website: "https://www.godrejafrica.com/", logo: godrej.url },
  { name: "VXL Nigeria Ltd.", website: "http://vxlnigeria.com/", logo: vxl.url },
];
const opportunities = [
  { icon: Users, title: "Live Interviews", desc: "Conduct on-the-spot interviews with qualified candidates." },
  { icon: FileCheck, title: "CV Review & Career Guidance", desc: "Review CVs and provide constructive feedback on skills and career readiness." },
  { icon: GraduationCap, title: "Internship Opportunities", desc: "Offer paid or unpaid internship placements, subject to your organisation’s policy." },
  { icon: BriefcaseBusiness, title: "Full-time Recruitment", desc: "Identify and recruit qualified candidates for full-time positions where vacancies exist." },
];
export default function CareerFair() {
  const support = SUPPORT_CONTACTS.find((c) => c.name === "Oluwatosin");
  return <div className="container mx-auto py-12 md:py-20 space-y-14">
    <Helmet title="Graduate Career Fair | NICE Lagos 2026"><meta name="description" content="Meet confirmed organisations at the NICE Lagos 2026 Career Fair for graduate and young civil engineers. Live interviews, CV reviews, career guidance, internships and recruitment." /><link rel="canonical" href="https://conference.nicehq.org/career-fair" /></Helmet>
    <header className="space-y-6 max-w-4xl"><Badge variant="outline">Graduate & Young Civil Engineers</Badge><h1 className="text-4xl md:text-6xl">Graduate Career Fair</h1><p className="text-2xl text-accent">Your next opportunity starts here.</p><p className="text-lg text-muted-foreground leading-relaxed">Meet civil engineering, construction, infrastructure and related companies at NICE Lagos 2026. Connect directly with HR teams through live interviews, CV reviews and career guidance.</p><div className="flex flex-wrap gap-3"><Button asChild variant="professional" size="lg"><a href="#organisations">Meet the Confirmed Organisations</a></Button>{support && <Button asChild variant="outline" size="lg"><a href={whatsappLink(support)} target="_blank" rel="noopener noreferrer">Career Fair Enquiries <ArrowUpRight className="h-4 w-4" /></a></Button>}</div><div className="grid sm:grid-cols-2 gap-4 text-sm border-y border-border py-5"><p className="flex gap-2"><Clock className="h-4 w-4 text-accent shrink-0" />Thursday, 22 October 2026 · 1:30–3:00 PM</p><p className="flex gap-2"><MapPin className="h-4 w-4 text-accent shrink-0" />{CONFERENCE.venue.name}, Lagos</p></div><p className="text-sm text-muted-foreground">Graduate Career Clinic & Workshop: Wednesday, 21 October, 2:00–3:00 PM. Career Fair: Thursday, 22 October, 1:30–3:00 PM. Programme timings take precedence over those printed on the flyer.</p></header>
    <section><h2 className="text-3xl mb-6">What Companies Can Do</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{opportunities.map((o) => <article key={o.title} className="rounded-lg border border-border bg-card p-6"><o.icon className="h-8 w-8 text-accent mb-5" /><h3 className="text-xl mb-3">{o.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{o.desc}</p></article>)}</div></section>
    <section id="organisations" className="scroll-mt-24"><div className="mb-8"><Badge variant="outline" className="mb-3">Confirmed Participants</Badge><h2 className="text-3xl">Organisations Participating in the Career Fair</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{companies.map((company) => <article key={company.name} className="border border-border rounded-lg p-5 flex flex-col gap-4"><div className="h-20 flex items-center justify-center">{company.logo ? <img src={company.logo} alt={company.name + " logo"} className="h-full max-w-full object-contain bg-primary-foreground p-3 rounded-md" loading="lazy" /> : <BriefcaseBusiness className="h-10 w-10 text-muted-foreground" aria-hidden="true" />}</div><Badge variant="outline" className="self-start text-accent">Confirmed</Badge><h3 className="text-lg flex-1">{company.name}</h3>{company.website && <Button asChild variant="outline" size="sm"><a href={company.website} target="_blank" rel="noopener noreferrer">Visit Website <ArrowUpRight className="h-4 w-4" /></a></Button>}</article>)}</div></section>
    <section className="grid md:grid-cols-2 gap-10 border-y border-border py-10"><div><h2 className="text-3xl mb-5">Why Participate?</h2><h3 className="text-xl text-accent mb-2">Access Emerging Talent</h3><p className="text-muted-foreground mb-6">Connect with a pool of skilled, ready-to-work young civil engineers and graduates.</p><h3 className="text-xl text-accent mb-2">Career Engagement</h3><p className="text-muted-foreground">Showcase your organisation’s opportunities, build your brand and contribute to the growth of the next generation of civil engineering professionals.</p></div><div><h2 className="text-3xl mb-5">Bring Your HR Team</h2><p className="text-muted-foreground mb-5">Civil engineering, construction, infrastructure and related companies are invited to engage directly with qualified, motivated and talented young engineers.</p><p className="text-lg">Together, we build a stronger and more sustainable future!</p><div className="mt-6 flex flex-wrap gap-3"><Button asChild variant="professional"><a href={`mailto:${CONFERENCE_EMAIL}?subject=NICE%202026%20Career%20Fair%20Participation`}>Confirm Your Organisation’s Participation</a></Button><Button asChild variant="outline"><Link to="/registration">Conference Registration</Link></Button></div></div></section>
    <section className="max-w-3xl space-y-5"><h2 className="text-3xl">Official Career Fair Flyer</h2><a href={flyer.url} target="_blank" rel="noopener noreferrer"><img src={flyer.url} alt="Official NICE Lagos 2026 Career Fair flyer with graduate opportunities and company participation details" className="w-full h-auto rounded-lg" loading="lazy" /></a><p className="text-sm text-muted-foreground">For current enquiries and confirmation, contact Oluwatosin on +234 906 361 3889 or email {CONFERENCE_EMAIL}. These updated contacts replace the older enquiry details printed on the flyer.</p></section>
  </div>;
}