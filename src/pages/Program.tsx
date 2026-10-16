import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

type Session = { time: string; title: string; venue?: string; speaker?: string; tags: string[]; desc: string };


const schedule: Record<"day1" | "day2" | "day3", Session[]> = {
  day1: [
    { time: "All Day", title: "Delegates Arrival and Check-in", venue: "Academy Guest House & Events Halls", tags: ["Check-in"], desc: "Welcome and check-in for pre-registered conference delegates." },
    { time: "9:00 AM - 5:00 PM", title: "Arrival / Delegate Check-in", venue: "Academy Guest House & Events Halls", tags: ["Check-in"], desc: "" },
    { time: "9:00 AM - 6:00 PM", title: "Exhibition", venue: "Academy Guest House & Events Halls Exterior", tags: ["Exhibition"], desc: "" },
    { time: "9:00 AM – 2:00 PM", title: "Technical Tour", venue: "Site Event", tags: ["Tour"], desc: "Guided technical tours to engineering sites of interest: Opebi-Mende Bridge, Egan/Ayobo Bridge, VXL Nigeria Limited, LSPDC (Monday), and Airport Upgrade Construction by FAAN." },
    { time: "10:00 AM – 4:00 PM", title: "Lagos Tour", venue: "Lagos City Tour", tags: ["Tour"], desc: "Explore Lagos — its vibrant culture, landmarks, and scenic views."},
    { time: "3:00pm  – 5:00pm", title: "Construction Tech Innovation  Showcase/ Challenge", venue: "Academy Guest House & Events Halls", tags: ["Showcase"], desc: "Showcasing innovative construction technologies and solutions." },
    { time: "6:00 PM – 8:00 PM", title: "Chairman's Cocktail", venue: "Academy Guest House & Events Halls", tags: ["Networking"], desc: "Evening of networking and felicitations." },
  ],

  day2: [
  { time: "9:00 AM – 5:00 PM", title: "Arrival of Delegates", tags: ["Check-in"], desc: "Check-in of delegates." },
  { time: "9:00 AM – 9:15 AM", title: "Arrival of Civil Engineers and Guests", tags: ["Arrival"], desc: "Welcoming attendees to the conference venue." },
  { time: "9:15 AM – 9:25 AM", title: "Arrival of NICE National Chairman", tags: ["Arrival"], desc: "Arrival of the National Chairman of NICE." },
  { time: "9:25 AM – 9:30 AM", title: "Arrival of Keynote Speaker", tags: ["Arrival"], desc: "Arrival of the keynote speaker." },
  { time: "9:30 AM – 9:35 AM", title: "Arrival of Chairman of the Occasion", tags: ["Arrival"], desc: "Arrival of the chairman of the occasion." },
  { time: "9:35 AM – 9:40 AM", title: "Arrival of Guests of Honour", tags: ["Arrival"], desc: "Arrival of guests of honour." },
  { time: "9:40 AM – 9:45 AM", title: "Arrival of the Special Guest of Honour", tags: ["Arrival"], desc: "Arrival of the special guest of honour." },
  { time: "9:45 AM – 9:50 AM", title: "Arrival of Distinguished Guest of Honour and Chief Host", tags: ["Arrival"], desc: "Arrival of distinguished guest of honour and chief host." },
  { time: "9:50 AM – 10:00 AM", title: "National Anthem", tags: ["Ceremony"], desc: "Rendition of the national anthem." },
  { time: "10:00 AM – 10:05 AM", title: "Opening Prayer", tags: ["Ceremony"], desc: "Prayer to officially open the program." },
  { time: "10:05 AM – 10:15 AM", title: "Welcome Address", speaker: "Engr. Tokunbo Ajanaku, FNSE, FNICE, PMP", tags: ["Address"], desc: "Welcome remarks by the National Chairman." },
  { time: "10:15 AM – 10:30 AM", title: "Keynote Address", speaker: "Keynote Speaker (To Be Announced)", tags: ["Keynote"], desc: "Keynote presentation on sustainable and resilient infrastructure for economic growth." },
  { time: "10:30 AM – 10:45 AM", title: "Remarks by Chairman of the Occasion", speaker: "Engr. Ali Alimasuya Rabiu, FNSE, FNICE, FAEng, MFR", tags: ["Remarks"], desc: "Speech by the chairman of the occasion." },
  { time: "10:45 AM – 10:55 AM", title: "Remarks by Royal Father of the Day", speaker: "Oba Riliwan Osuolale Akiolu — The Oba of Lagos", tags: ["Remarks"], desc: "Address by Royal Father of the Day." },
  { time: "10:55 AM – 11:05 AM", title: "Remarks by Special Guest of Honour", speaker: "Hon. Minister of State for Works", tags: ["Remarks"], desc: "Address by special guest of honour." },
  { time: "11:05 AM – 11:15 AM", title: "Remarks by Distinguished Guest of Honour", speaker: "H.E. Gov. Babajide Olusola Sanwo-Olu", tags: ["Remarks"], desc: "Remarks by the distinguished guest of honour and chief host." },
  { time: "11:15 AM – 11:25 AM", title: "Goodwill Messages", tags: ["Remarks"], desc: "Goodwill messages from dignitaries and partners." },
  { time: "11:25 AM – 11:55 AM", title: "Presentation of the NICE 2026 Achievements", tags: ["Media Presentation"], desc: "Showcasing achievements and milestones of NICE 2026." },
  { time: "11:55 AM – 12:20 PM", title: "NICE Special Awards", tags: ["Awards"], desc: "Award presentation ceremony recognizing excellence." },
  { time: "12:20 PM – 12:30 PM", title: "Vote of Thanks", speaker: "Engr. Saliu Alao Lawal, FNSE, FNICE", tags: ["Remarks"], desc: "Vote of thanks by the CPC Chairman." },
  { time: "12:30 PM – 12:35 PM", title: "Closing Prayer & National Pledge", tags: ["Ceremony"], desc: "Closing prayer and recitation of the national pledge." },
  { time: "12:45 PM – 1:00 PM", title: "Opening of Exhibition", tags: ["Exhibition"], desc: "Official opening of the Construction Expo Africa (CEA)." },
  { time: "1:00 PM – 2:00 PM", title: "Lunch Break", tags: ["Break"], desc: "Lunch and networking session." },
  { time: "2:00 PM – 5:00 PM", title: "Plenary Session & Panel Session", tags: ["Plenary", "Panel"], desc: "Engaging plenary and panel discussions on engineering innovations." },
  { time: "2:00 PM – 5:00 PM", title: "Spouses’ Programs", tags: ["Social"], desc: "Specially curated programs for spouses of participants." },
  { time: "2:00 PM – 3:00 PM", title: "Construction Tech Innovation Showcase/ Challenge", tags: ["Workshop"], desc: "Showcasing innovative construction technologies and solutions." },
  { time: "2:00 PM – 3:00 PM", title: "Graduate Career Clinic & Workshop", tags: ["Career"], desc: "Career clinic and mentorship for graduate members." },
  { time: "3:00 PM – 4:00 PM", title: "AI Workshop", tags: ["Workshop"], desc: "Expert-led workshop on Artificial Intelligence. CONTECH to provide facilitators." },
  { time: "4:00 PM – 6:00 PM", title: "Young Engineers Mentorship Session", speaker: "Engr. Kingsley Erifeta, Engr. Donald Okeke", tags: ["Mentorship"], desc: "Interactive mentorship session for young engineers." },
  { time: "7:00 PM – 9:00 PM", title: "Fellows’ Roundtable", speaker: "Engr. Mrs. Aramide Adeyoye", tags: ["Fellowship"], desc: "Exclusive roundtable for fellows and conferees only." },
  { time: "7:00 PM – 9:00 PM", title: "Young Engineers’ Night", speaker: "Engr. ", tags: ["Social"], desc: "Networking and relaxation event for students and graduate members. Coordinated by Engr. Emeka Ibeh, Prof. T. E. Adejumo, and Engr. Samuel Ukata." }
],


day3: [
  { time: "9:00 AM – 6:00 PM", title: "Check-in of Delegates", tags: ["Check-in"], desc: "On-site check-in of delegates continues." },
  { time: "9:00 AM – 9:15 AM", title: "Arrival of Civil Engineers and Guests", tags: ["Arrival"], desc: "Arrival and welcome of participants and guests." },
  { time: "9:15 AM – 9:25 AM", title: "Arrival of NICE National Chairman", tags: ["Arrival"], desc: "Arrival of the National Chairman of NICE." },
  { time: "9:25 AM – 9:30 AM", title: "National Anthem", tags: ["Ceremony"], desc: "Recitation of the national anthem." },
  { time: "9:30 AM – 9:35 AM", title: "National Prayer", tags: ["Ceremony"], desc: "National prayer to open the day's activities." },
  { time: "9:35 AM – 11:00 AM", title: "Plenary Session", tags: ["Plenary"], desc: "Morning plenary session featuring presentations and discussions." },
  { time: "10:00 AM – 11:30 AM", title: "Coffee/Snacks Break", tags: ["Break"], desc: "Networking and refreshments break." },
  { time: "11:30 AM – 12:30 PM", title: "Engineering Business Roundtable", speaker: "Mr. Oludele James Clinton / Engr. Kola Osinowo", tags: ["Plenary"], desc: "Engineering Entrepreneurship and Financials." },
  { time: "12:30 PM – 1:00 PM", title: "Communique / Conference Closing", tags: ["Closing"], desc: "Presentation of conference communique and official closing." },
  { time: "1:00 PM – 1:30 PM", title: "Lunch Break", tags: ["Break"], desc: "Lunch and informal networking among participants." },
  { time: "1:30 PM – 2:00 PM", title: "Accreditation of AGM", tags: ["AGM"], desc: "Accreditation process for the Annual General Meeting." },
  { time: "2:00 PM – 4:00 PM", title: "Annual General Meeting / Elections", tags: ["AGM", "Elections"], desc: "Annual meeting of NICE members, including elections." },
  { time: "1:30 PM – 3:00 PM", title: "NICESA Innovation Workshop", tags: ["Workshop"], desc: "Interactive innovation workshop for NICESA participants." },
  { time: "1:30 PM – 3:00 PM", title: "Graduate Career Fair", tags: ["Career"], desc: "Career fair providing networking and job opportunities for graduates." },
  { time: "3:00 PM – 4:00 PM", title: "Young Engineers Join the AGM (After Election)", tags: ["Engagement"], desc: "Young engineers participate in the AGM following the election." },
  { time: "4:00 PM – 4:30 PM", title: "National Chairman Meets the Young Engineers", tags: ["Engagement"], desc: "Interactive session between the National Chairman and young engineers." },
  { time: "6:00 PM – 9:00 PM", title: "Annual Dinner & NICE Awards", speaker: "H.E. Dr. Obafemi Kadiri Hamzat, FNSE", tags: ["Dinner", "Awards"], desc: "Annual dinner event featuring the presentation of NICE Group Dynamics results and awards." }
],


};

export default function Program() {
  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet title="Programme / Schedule | NICE Lagos 2026">
        <meta name="description" content="Explore the provisional 3-day programme for NICE Lagos 2026: sessions, workshops, networking, and gala." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/program"} />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Programme / Schedule</h1>
        <p className="text-muted-foreground mt-2">Provisional schedule for Tuesday 20–Thursday 22 October 2026. Sessions, times and venues are in draft and subject to updates.</p>
        <p className="text-sm text-accent mt-3">Registration closes Wednesday, 14 October. The arrival desks are for pre-registered delegate check-in only.</p>

      </header>

      <Tabs defaultValue="day1" className="w-full">
        <TabsList className="h-auto flex flex-wrap justify-start gap-1">
          <TabsTrigger value="day1">Tue 20 Oct · Day 1</TabsTrigger>
          <TabsTrigger value="day2">Wed 21 Oct · Day 2</TabsTrigger>
          <TabsTrigger value="day3">Thu 22 Oct · Day 3</TabsTrigger>
        </TabsList>
        {(["day1","day2","day3"] as const).map((day) => (
          <TabsContent key={day} value={day} className="mt-6 grid gap-4">
            {schedule[day].map((s, i) => (
              <Card key={i} className="p-5 grid md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-sm text-muted-foreground">{s.time}</div>
                <div className="md:col-span-7">
                  <h3 className="font-medium">{s.title}</h3>
                  {s.desc && <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>}
                  {s.speaker && <p className="text-sm text-accent mt-2">{s.speaker}</p>}
                  {s.title.includes("Career") && <Link className="inline-block text-sm text-accent underline mt-2" to="/career-fair">Graduate Career Fair details</Link>}
                  {s.title === "Lagos Tour" && <Link className="inline-block text-sm text-accent underline mt-2" to="/lagos-city-tour">Explore the Lagos City Tour</Link>}
                  {s.title.startsWith("Construction Tech Innovation") && <Link className="inline-block text-sm text-accent underline mt-2" to="/innovationchallenge">Challenge details & application</Link>}
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
