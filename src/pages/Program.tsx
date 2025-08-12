import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const schedule = {
  day1: [
    { time: "09:00 - 10:00", title: "Opening Ceremony", venue: "Coronation Hall", tags: ["Plenary"], desc: "Welcome remarks and keynote." },
    { time: "10:30 - 12:00", title: "Technical Session I", venue: "Main Auditorium", tags: ["Technical Session"], desc: "Innovations in sustainable construction." },
  ],
  day2: [
    { time: "09:00 - 10:30", title: "Workshop: BIM in Practice", venue: "Workshop Room A", tags: ["Workshop"], desc: "Hands-on demonstrations." },
    { time: "11:00 - 12:30", title: "Networking Brunch", venue: "Exhibition Foyer", tags: ["Networking"], desc: "Industry meet-and-greet." },
  ],
  day3: [
    { time: "09:00 - 11:00", title: "Fellows Roundtable", venue: "Council Chamber", tags: ["Roundtable"], desc: "Leadership discussions." },
    { time: "18:00 - 21:00", title: "Dinner, Awards, Cultural Gala", venue: "Banquet Hall", tags: ["Gala"], desc: "Celebration of achievers." },
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
