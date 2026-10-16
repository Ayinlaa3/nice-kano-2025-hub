import { Link } from "react-router-dom";
import { ArrowRight, Bus, CalendarDays, CheckCircle2, Hotel, Lightbulb, MapPin, MessageCircle, Briefcase, HardHat, Sparkles } from "lucide-react";
import { SUPPORT_CONTACTS, whatsappLink } from "@/config/contacts";

const general = SUPPORT_CONTACTS.find((c) => c.role === "General support")!;

const ITEMS = [
  { icon: MessageCircle, title: "Delegate Support", desc: "Chat with our support team on WhatsApp.", href: whatsappLink(general), external: true },
  { icon: CheckCircle2, title: "Confirm My Payment", desc: "Check your status or get your badge resent.", to: "/payment-status" },
  { icon: CalendarDays, title: "Programme", desc: "Sessions, speakers and timings for all three days.", to: "/program" },
  { icon: HardHat, title: "Technical Visits", desc: "Tuesday 20 Oct, 9 AM–2 PM — bridge, airport and plant sites.", to: "/program" },
  { icon: Bus, title: "Lagos City Tour", desc: "Discover the stories of Lagos on Tuesday 20 Oct.", to: "/lagos-city-tour" },
  { icon: Hotel, title: "Hotels & Travel", desc: "Places to stay near the venue in Agidingbi.", to: "/hotels-travel" },
  { icon: Briefcase, title: "Graduate Career Fair", desc: "Clinic Wed 21 Oct; Career Fair Thu 22 Oct.", to: "/career-fair" },
  { icon: Lightbulb, title: "Innovation Challenge", desc: "Young engineers pitch construction-tech ideas.", to: "/innovationchallenge" },
  { icon: MapPin, title: "Venue & Directions", desc: "Academy Guest House & Events Halls, Agidingbi, Ikeja.", to: "/location" },
  { icon: Sparkles, title: "I Will Be Attending Flyer", desc: "Create and share your personalised flyer.", to: "/flyer" },
];

export default function DelegateHub() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ITEMS.map((item) => {
        const Icon = item.icon;
        const inner = (
          <>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <span className="flex-1">
              <span className="flex items-center gap-1 font-semibold text-foreground">
                {item.title}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{item.desc}</span>
            </span>
          </>
        );
        const cls = "group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary hover:shadow-lg";
        return item.external ? (
          <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
        ) : (
          <Link key={item.title} to={item.to!} className={cls}>{inner}</Link>
        );
      })}
    </div>
  );
}
