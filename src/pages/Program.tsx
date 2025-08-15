import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const schedule = {
  day1: [
    { time: "All Day", title: "Delegates Arrival and On-site Registration", venue: "Coronation Hall", tags: ["Registration"], desc: "Welcome and registration for all conference delegates." },
    { time: "9:00 AM - 2:00 PM", title: "Technical Project Site Visit and Technical Presentation", venue: "Designated Project Site", tags: ["Site Visit"], desc: "Field visit with technical presentations on project implementation." },
    { time: "All Day", title: "Kano City Tour", venue: "Various Locations", tags: ["Tourism"], desc: "Paid tour of attractive and iconic places in Kano." },
    { time: "All Day", title: "Courtesy Visits to Royal Fathers and Senior Civil Engineers", venue: "Various Locations", tags: ["Courtesy"], desc: "Official visits to traditional rulers and senior engineers in Kano." },
    { time: "3:00 PM - 5:00 PM", title: "ConTech Innovation Hub & NICESA Innovation Clinic", venue: "Coronation Hall Exterior", tags: ["Innovation"], desc: "Technology innovation showcase and clinic sessions." },
    { time: "6:00 PM", title: "Chairman's Cocktail & Engineering Business Roundtable", venue: "Tahir Guest Palace", tags: ["Networking"], desc: "Evening networking with business discussions." },
  ],
  day2: [
    { time: "8:00 AM", title: "Arrival, Registration & Welcome Tea", venue: "Coronation Hall", tags: ["Registration"], desc: "Morning registration and welcome refreshments." },
    { time: "All Day", title: "Construction Expo Africa (CEA)", venue: "Coronation Hall Exterior", tags: ["Exhibition"], desc: "Ongoing construction industry exhibition and trade show." },
    { time: "10:00 AM", title: "Opening Ceremony", venue: "Coronation Hall", tags: ["Ceremony"], desc: "Official conference opening with keynote addresses." },
    { time: "12:00 NOON", title: "Special Plenary I & II", venue: "Coronation Hall", tags: ["Plenary"], desc: "Key plenary sessions with distinguished speakers." },
    { time: "1:00 PM", title: "Panel Discussion 1 and Live TV Broadcast", venue: "Coronation Hall", tags: ["Panel", "Media"], desc: "Televised panel discussion on key industry topics." },
    { time: "2:30 PM - 5:00 PM", title: "ConTech Innovation Hub & NICESA Parallel Workshops", venue: "Coronation Hall", tags: ["Workshop"], desc: "Parallel workshops on construction technology and innovation." },
    { time: "3:00 PM - 5:00 PM", title: "Young Engineers Career Clinic", venue: "Tahir Guest Palace", tags: ["Career"], desc: "Career guidance and mentorship for young engineers." },
    { time: "2:30 PM - 5:00 PM", title: "Concurrent Technical Sessions", venue: "Tahir Guest Palace", tags: ["Technical Session"], desc: "Multiple technical sessions running concurrently." },
    { time: "5:30 PM - 8:00 PM", title: "Fellows Roundtable & Fellowship Conferment", venue: "Tahir Guest Palace", tags: ["Fellowship"], desc: "Fellowship discussions and conferment ceremony." },
  ],
  day3: [
    { time: "9:00 AM", title: "Special Plenary Session III & IV", venue: "Coronation Hall", tags: ["Plenary"], desc: "Continuation of special plenary sessions." },
    { time: "10:00 AM", title: "Panel Discussion 2", venue: "Coronation Hall", tags: ["Panel"], desc: "Second major panel discussion of the conference." },
    { time: "Ongoing", title: "ConTech Innovation Hub & NICESA Parallel Workshops", venue: "Coronation Hall", tags: ["Workshop"], desc: "Continued innovation workshops and clinics." },
    { time: "11:30 AM - 2:00 PM", title: "Annual General Meeting (AGM)", venue: "Coronation Hall", tags: ["AGM"], desc: "NICE Annual General Meeting for members." },
    { time: "2:30 PM - 5:00 PM", title: "Concurrent Technical Sessions Continue", venue: "Tahir Guest Palace", tags: ["Technical Session"], desc: "Final technical sessions of the conference." },
    { time: "6:00 PM - 9:00 PM", title: "AGM Dinner, Awards & Honours Night, and Cultural Gala", venue: "Tahir Guest Palace", tags: ["Gala", "Awards"], desc: "Closing dinner with awards ceremony and cultural performances." },
  ],
};

export default function Program() {
  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet>
        <title>Program Schedule | NICE Kano 2025</title>
        <meta name="description" content="Explore the 3-day program schedule for NICE Kano 2025: sessions, workshops, networking, and gala." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/program"} />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Program Schedule</h1>
        <p className="text-muted-foreground mt-2">Review sessions by day. Times and venues are subject to updates.</p>
      </header>

      <Tabs defaultValue="day1" className="w-full">
        <TabsList>
          <TabsTrigger value="day1">Day 1</TabsTrigger>
          <TabsTrigger value="day2">Day 2</TabsTrigger>
          <TabsTrigger value="day3">Day 3</TabsTrigger>
        </TabsList>
        {(["day1","day2","day3"] as const).map((day) => (
          <TabsContent key={day} value={day} className="mt-6 grid gap-4">
            {schedule[day].map((s, i) => (
              <Card key={i} className="p-5 grid md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-sm text-muted-foreground">{s.time}</div>
                <div className="md:col-span-7">
                  <h3 className="font-medium">{s.title}</h3>
                  {s.desc && <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>}
                </div>
                <div className="md:col-span-3 flex items-start md:items-center justify-between md:justify-end gap-3">
                  <span className="text-sm">{s.venue}</span>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <Badge key={t} variant="secondary">{t}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
