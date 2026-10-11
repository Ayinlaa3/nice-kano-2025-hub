import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Rocket, Trophy, CalendarDays, ArrowUpRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SUPPORT_CONTACTS, whatsappLink } from "@/config/contacts";
import flyer1 from "@/assets/Innovation_Challenge_1.png.asset.json";
import flyer2 from "@/assets/Innovation_Challenge_2.png.asset.json";
import contech from "@/assets/contech-logo.png";

const APPLICATION_URL = "https://forms.gle/omcj9GfBGFwiAs577";
const themes = [
  ["Infrastructure Monitoring", "Develop technology-based solutions to monitor the condition, performance and safety of roads, bridges, buildings and other critical infrastructure."],
  ["Project & Cost Management", "Use AI models, BIM applications or digital tools to improve construction planning, cost management, productivity and project delivery."],
  ["Waste Management & Sustainability", "Promote sustainable construction, circular economy practices, recycling, waste reduction and environmentally responsible infrastructure development."],
  ["Construction Safety", "Improve safety with smart monitoring, digital systems, wearables, training tools and hazard detection."],
  ["Supply Chain & Logistics", "Improve construction supply chains, material tracking, logistics, procurement and access to reliable construction resources."],
  ["Smart Transportation & Traffic Solutions", "Address traffic congestion, transportation efficiency, road safety and urban mobility challenges through infrastructure or technology."],
];
const prizes = [
  { place: "1st place · Winner", amount: "₦1,000,000", benefits: ["Innovation Challenge trophy / award", "Recognition at the NICE Conference", "Mentorship with a distinguished industry professional", "Featured recognition on NICE communication platforms"] },
  { place: "2nd place · First runner-up", amount: "₦500,000", benefits: ["Recognition / award", "Mentorship opportunity", "Featured recognition in conference communications"] },
  { place: "3rd place · Second runner-up", amount: "₦300,000", benefits: ["Recognition / award", "Special recognition during the conference"] },
];
export default function InnovationChallenge() {
  const studentSupport = SUPPORT_CONTACTS.find((c) => c.name === "Salisu");
  return <div className="container mx-auto py-12 md:py-20 space-y-14">
    <Helmet title="Young Engineers Innovation Challenge 2026 | NICE Lagos">
      <meta name="description" content="Apply for the NICE 2026 Young Engineers Innovation Challenge in partnership with Contech. Teams of 3–5; deadline 15 October; challenge session 21 October, 3:00–3:45 PM. First prize ₦1,000,000." />
      <link rel="canonical" href="https://conference.nicehq.org/innovationchallenge" />
    </Helmet>
    <header className="max-w-4xl space-y-6">
      <Badge variant="outline"><Rocket className="w-4 h-4 mr-2" /> Ideas. Innovation. Impact.</Badge>
      <h1 className="text-4xl md:text-6xl leading-tight">Young Engineers <span className="text-accent">Innovation Challenge 2026</span></h1>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">An innovation platform for Nigeria’s next generation of engineers. Develop and showcase practical solutions to real challenges facing Nigeria’s infrastructure and built environment, pitch before experts and industry leaders, and gain recognition at the NICE Conference.</p>
      <div className="flex flex-wrap gap-3"><Button asChild variant="professional" size="lg"><a href={APPLICATION_URL} target="_blank" rel="noopener noreferrer">Submit Your Idea <ArrowUpRight className="w-4 h-4" /></a></Button><Button asChild variant="outline" size="lg"><a href="#challenge-themes">Explore the Themes</a></Button></div>
      <div className="flex flex-wrap gap-6 text-sm"><span className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-accent" />Submission deadline: Thursday, 15 October 2026</span><span className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-accent" />Challenge session: Wednesday, 21 October 2026 · 3:00–3:45 PM</span></div>
      <p className="text-sm text-muted-foreground">Applications submitted after the deadline will not be considered. Programme timings take precedence over the final-pitch date printed on the flyers.</p>
      <div className="flex items-center gap-4 border-t border-border pt-5"><span className="text-sm text-muted-foreground">NICE · In partnership with</span><img src={contech} alt="Contech" className="h-12 w-36 object-contain bg-primary-foreground rounded-md p-2" /></div>
    </header>
    <section><h2 className="text-3xl mb-6 flex items-center gap-3"><Trophy className="text-accent" />Prizes & Recognition</h2><div className="grid md:grid-cols-3 gap-5">{prizes.map((p) => <article key={p.place} className="border border-border rounded-lg p-6 bg-card"><p className="text-sm text-accent">{p.place}</p><h3 className="text-3xl mt-3 mb-5">{p.amount}</h3><ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">{p.benefits.map((b) => <li key={b}>{b}</li>)}</ul></article>)}</div></section>
    <section id="challenge-themes" className="scroll-mt-24"><h2 className="text-3xl mb-6">Six challenges. Practical solutions.</h2><div className="grid md:grid-cols-2 gap-5">{themes.map(([title, desc], i) => <article key={title} className="border border-border rounded-lg p-6"><span className="text-accent text-sm">0{i + 1}</span><h3 className="text-xl my-3">{title}</h3><p className="text-muted-foreground">{desc}</p></article>)}</div></section>
    <section className="grid md:grid-cols-2 gap-10 border-y border-border py-10"><div><h2 className="text-3xl mb-5 flex gap-3 items-center"><Users className="text-accent" />Who Can Participate?</h2><p className="text-muted-foreground mb-4">Young engineers and innovators with practical ideas capable of addressing challenges within Nigeria’s built environment and infrastructure sector.</p><ul className="list-disc pl-5 space-y-3 text-muted-foreground"><li>Teams must consist of 3–5 members.</li><li>Multidisciplinary teams are highly encouraged.</li><li>Combine expertise in engineering, technology, environmental sciences, architecture, business, data science and other relevant fields.</li></ul></div><div><h2 className="text-3xl mb-5">Evaluation Criteria</h2><dl className="space-y-4">{[["35%", "Innovation & originality"], ["30%", "Potential impact"], ["25%", "Feasibility"], ["10%", "Clarity of concept"]].map(([weight, label]) => <div key={label} className="flex justify-between border-b border-border pb-3 gap-3"><dt>{label}</dt><dd className="text-accent font-semibold">{weight}</dd></div>)}</dl></div></section>
    <section><h2 className="text-3xl mb-6">From Idea to Live Pitch</h2><ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{[["Submit your idea", "Submit your innovative concept through the application form."], ["Screening & finalist selection", "The Technical Committee reviews submissions against the evaluation criteria and selects the top five teams."], ["Live pitch", "Finalists present to expert judges and the conference audience. Each team receives a designated time to pitch and defend its innovation."], ["Winner announcement", "The top-performing teams are recognised during the NICE Conference Awards/Dinner."]].map(([title, desc], i) => <li key={title} className="border-t-2 border-accent pt-4"><span className="text-accent">0{i + 1}</span><h3 className="text-xl my-3">{title}</h3><p className="text-muted-foreground text-sm">{desc}</p></li>)}</ol></section>
    <section className="space-y-6"><h2 className="text-3xl">Challenge Flyers</h2><div className="grid md:grid-cols-2 gap-6 items-start">{[flyer1, flyer2].map((f, i) => <a key={f.url} href={f.url} target="_blank" rel="noopener noreferrer"><img src={f.url} alt={`Official Young Engineers Innovation Challenge flyer ${i + 1}`} className="w-full h-auto rounded-lg" loading="lazy" /></a>)}</div><p className="text-sm text-muted-foreground">For current enquiries, use the updated conference contacts below or the Students Matter support contact.</p></section>
    <section className="border-t border-border pt-8 space-y-5"><h2 className="text-3xl">Innovate. Build. Transform.</h2><p className="text-muted-foreground">Have an idea that can change Nigeria’s built environment? Turn your idea into impact.</p><div className="flex flex-wrap gap-3"><Button asChild variant="professional" size="lg"><a href={APPLICATION_URL} target="_blank" rel="noopener noreferrer">Apply Now <ArrowUpRight className="w-4 h-4" /></a></Button>{studentSupport && <Button asChild variant="outline"><a href={whatsappLink(studentSupport)} target="_blank" rel="noopener noreferrer">Contact Salisu</a></Button>}<Button asChild variant="ghost"><Link to="/program">View Conference Programme</Link></Button></div></section>
  </div>;
}