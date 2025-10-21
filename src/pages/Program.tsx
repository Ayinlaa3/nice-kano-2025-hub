import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { time } from "console";

const schedule = {
  day1: [
    { time: "All Day", title: "Delegates Arrival and On-site Registration", venue: "Coronation Hall", tags: ["Registration"], desc: "Welcome and registration for all conference delegates." },
    { time: "9:00 AM - 5:00 PM", title: "Arrival/Registration of Delegates", venue: "Coronation Hall", tags: [""], desc: "" },
    { time: "9:00 AM - 6:00 PM", title: "Exhibition", venue: "Coronation Hall Exterior", tags: ["Exhibition"], desc: "" },
    {time:	"11:00am – 2:00pm",	title:"Technical Tour", venue:"Site Event",	tags:["Tour"], desc:	"Guided technical tours to local engineering sites of interest."},
    { time: "11:00am – 2:00pm", title: "Kano Tour", venue: " Kano City Tour", tags: ["Tour"], desc: "Explore the city's rich history, traditional architecture, and scenic views that reflect its deep cultural roots."},
    { time: "3:00pm  – 5:00pm", title: "Construction Tech Innovation  Showcase/ Challenge", venue: "Coronation Hall", tags: ["Showcase"], desc: "Showcasing innovative construction technologies and solutions." },
    { time: "6:00 PM -8:00PM", title: "Chairman's Cocktail & Engineering Business Roundtable", venue: "Coronation Hall", tags: ["Networking"], desc: "Evening of networking and business discussions, connecting engineers and business owners to investors and business opportunities." },
  ],
  // day2: [
  //   { time: "8:00 AM", title: "Arrival, Registration & Welcome Tea", venue: "Coronation Hall", tags: ["Registration"], desc: "Morning registration and welcome refreshments." },
  //   { time: "All Day", title: "Construction Expo Africa (CEA)", venue: "Coronation Hall Exterior", tags: ["Exhibition"], desc: "Ongoing construction industry exhibition and trade show." },
  //   { time: "10:00 AM", title: "Opening Ceremony", venue: "Coronation Hall", tags: ["Ceremony"], desc: "Official conference opening with keynote addresses." },
  //   { time: "12:00 NOON", title: "Special Plenary I, II & III", venue: "Coronation Hall", tags: ["Plenary"], desc: "Key plenary sessions with distinguished speakers." },
  //   { time: "1:00 PM", title: "Panel Discussion 1 and Live TV Broadcast", venue: "Coronation Hall", tags: ["Panel", "Media"], desc: "Televised panel discussion on key industry topics." },
  //   { time: "2:30 PM - 5:00 PM", title: "NICESA Innovation Hub & Parallel Workshops", venue: "Coronation Hall", tags: ["Workshop"], desc: "Parallel workshops on construction technology and innovation." },
  //   { time: "3:00 PM - 5:00 PM", title: "Young Engineers Career Clinic", venue: "Tahir Guest Palace", tags: ["Career"], desc: "Career guidance and mentorship for graduate and young engineers, with job placement opportunities." },
  //   { time: "2:30 PM - 5:00 PM", title: "Concurrent Technical Sessions", venue: "Tahir Guest Palace", tags: ["Technical Session"], desc: "Multiple technical sessions running concurrently." },
  //   { time: "5:30 PM - 8:00 PM", title: "Fellows Roundtable & Fellowship Conferment", venue: "Tahir Guest Palace", tags: ["Fellowship"], desc: "Fellowship discussions and conferment ceremony." },
  // ],


  day2: [
  { time: "9:00 AM – 5:00 PM", title: "Registration of Delegates", tags: ["Registration"], desc: "On-site registration for delegates." },
  { time: "9:00 AM – 9:15 AM", title: "Arrival of Civil Engineers and Guests", tags: ["Arrival"], desc: "Welcoming attendees to the conference venue." },
  { time: "9:15 AM – 9:25 AM", title: "Arrival of NICE National Chairman", tags: ["Arrival"], desc: "Arrival of the National Chairman of NICE." },
  { time: "9:25 AM – 9:30 AM", title: "Arrival of Keynote Speaker", tags: ["Arrival"], desc: "Arrival of the keynote speaker." },
  { time: "9:30 AM – 9:35 AM", title: "Arrival of Chairman of the Occasion", tags: ["Arrival"], desc: "Arrival of the chairman of the occasion." },
  { time: "9:35 AM – 9:40 AM", title: "Arrival of Guests of Honour", tags: ["Arrival"], desc: "Arrival of guests of honour." },
  { time: "9:40 AM – 9:45 AM", title: "Arrival of the Special Guest of Honour", tags: ["Arrival"], desc: "Arrival of the special guest of honour." },
  { time: "9:45 AM – 9:50 AM", title: "Arrival of Distinguished Guest of Honour and Chief Host", tags: ["Arrival"], desc: "Arrival of distinguished guest of honour and chief host." },
  { time: "9:50 AM – 10:00 AM", title: "National Anthem", tags: ["Ceremony"], desc: "Recitation of the national anthem." },
  { time: "10:00 AM – 10:05 AM", title: "Opening Prayer", tags: ["Ceremony"], desc: "Prayer to officially open the program." },
  { time: "10:05 AM – 10:15 AM", title: "Welcome Address", speaker: "Engr. Tokunbo Ajanaku, FNSE, FNICE, PMP", tags: ["Address"], desc: "Welcome remarks by the National Chairman." },
  { time: "10:15 AM – 10:30 AM", title: "Keynote Address", speaker: "Engr. Sen. Rabiu Musa Kwankwanso, FNSE (Fmr. Gov. Kano State)", tags: ["Keynote"], desc: "Keynote presentation by the former governor of Kano State." },
  { time: "10:30 AM – 10:45 AM", title: "Remarks by Chairman of the Occasion", speaker: "Engr. Margaret Aina Oguntala, FNSE", tags: ["Remarks"], desc: "Speech by the chairman of the occasion." },
  { time: "10:45 AM – 10:55 AM", title: "Remarks by Guest of Honour", tags: ["Remarks"], desc: "Address by guest of honour." },
  { time: "10:55 AM – 11:05 AM", title: "Remarks by Special Guest of Honour", tags: ["Remarks"], desc: "Address by special guest of honour." },
  { time: "11:05 AM – 11:15 AM", title: "Remarks by Distinguished Guest of Honour", speaker: "H.E. Alh. Abba Kabir Yusuf", tags: ["Remarks"], desc: "Remarks by the distinguished guest of honour and chief host." },
  { time: "11:15 AM – 11:25 AM", title: "Goodwill Messages", tags: ["Remarks"], desc: "Goodwill messages from dignitaries and partners." },
  { time: "11:25 AM – 11:55 AM", title: "Presentation of the NICE 2025 Achievements", tags: ["Presentation"], desc: "Showcasing achievements and milestones of NICE 2025." },
  { time: "11:55 AM – 12:20 PM", title: "NICE Special Awards", tags: ["Awards"], desc: "Award presentation ceremony recognizing excellence." },
  { time: "12:20 PM – 12:30 PM", title: "Vote of Thanks", speaker: "Engr. Dr. Bemigho Ofoeyeno, FNSE, FNICE", tags: ["Remarks"], desc: "Vote of thanks by the CPC Chairman." },
  { time: "12:30 PM – 12:35 PM", title: "Closing Prayer & National Pledge", tags: ["Ceremony"], desc: "Closing prayer and recitation of the national pledge." },
  { time: "12:45 PM – 1:00 PM", title: "Opening of Exhibition", tags: ["Exhibition"], desc: "Official opening of the Construction Expo Africa (CEA)." },
  { time: "1:00 PM – 2:00 PM", title: "Lunch Break", tags: ["Break"], desc: "Lunch and networking session." },
  { time: "2:00 PM – 5:00 PM", title: "Plenary Session & Panel Session", tags: ["Plenary", "Panel"], desc: "Engaging plenary and panel discussions on engineering innovations." },
  { time: "2:00 PM – 5:00 PM", title: "Spouses’ Programs", tags: ["Social"], desc: "Specially curated programs for spouses of participants." },
  { time: "2:00 PM – 3:00 PM", title: "NICESA Innovation Workshop", tags: ["Workshop"], desc: "Hands-on workshop on engineering and construction innovation." },
  { time: "2:00 PM – 3:00 PM", title: "Graduate Career Clinic & Workshop", tags: ["Career"], desc: "Career clinic and mentorship for graduate members." },
  { time: "3:00 PM – 3:45 PM", title: "Young Engineers Innovation Challenge", tags: ["Competition"], desc: "Innovation challenge session for young engineers." },
  { time: "4:00 PM – 5:00 PM", title: "Young Engineers Mentorship Session", tags: ["Mentorship"], desc: "Interactive mentorship session for young engineers." },
  { time: "7:00 PM – 9:00 PM", title: "Fellows’ Roundtable", tags: ["Fellowship"], desc: "Exclusive roundtable for fellows and conferees only." },
  { time: "7:00 PM – 9:00 PM", title: "Graduate Members’ Night", tags: ["Social"], desc: "Networking and relaxation event for graduate members." },
  { time: "7:00 PM – 9:00 PM", title: "Students’ Dinner", tags: ["Social"], desc: "Dinner event for student participants." }
],

  // day3: [
  //   { time: "9:00 AM", title: "Special Plenary Session IV & V", venue: "Coronation Hall", tags: ["Plenary"], desc: "Continuation of special plenary sessions." },
  //   { time: "10:00 AM", title: "Panel Discussion 2", venue: "Coronation Hall", tags: ["Panel"], desc: "Second major panel discussion of the conference." },
  //   { time: "Ongoing", title: "NICESA Innovation Hub & Parallel Workshops", venue: "Coronation Hall", tags: ["Workshop"], desc: "Continued innovation workshops and clinics." },
  //   { time: "11:30 AM - 2:00 PM", title: "Annual General Meeting (AGM)", venue: "Coronation Hall", tags: ["AGM"], desc: "NICE Annual General Meeting for members." },
  //   { time: "6:00 PM - 9:00 PM", title: "AGM Dinner, Awards & Honours Night, and Cultural Gala", venue: "Tahir Guest Palace", tags: ["Gala", "Awards"], desc: "Closing dinner with awards ceremony and cultural performances." },
  // ],

day3: [
  { time: "9:00 AM – 6:00 PM", title: "Registration of Delegates", tags: ["Registration"], desc: "On-site registration continues for all delegates." },
  { time: "9:00 AM – 9:15 AM", title: "Arrival of Civil Engineers and Guests", tags: ["Arrival"], desc: "Arrival and welcome of participants and guests." },
  { time: "9:15 AM – 9:25 AM", title: "Arrival of NICE National Chairman", tags: ["Arrival"], desc: "Arrival of the National Chairman of NICE." },
  { time: "9:25 AM – 9:30 AM", title: "National Anthem", tags: ["Ceremony"], desc: "Recitation of the national anthem." },
  { time: "9:30 AM – 9:35 AM", title: "National Prayer", tags: ["Ceremony"], desc: "National prayer to open the day's activities." },
  { time: "9:35 AM – 11:00 AM", title: "Plenary Session", tags: ["Plenary"], desc: "Morning plenary session featuring presentations and discussions." },
  { time: "11:00 AM – 11:30 AM", title: "Coffee/Snacks Break", tags: ["Break"], desc: "Networking and refreshments break." },
  { time: "11:30 AM – 12:30 PM", title: "Continuation of Plenary Session", tags: ["Plenary"], desc: "Continuation of the plenary session with additional speakers." },
  { time: "12:30 PM – 1:00 PM", title: "Lunch Break", tags: ["Break"], desc: "Lunch and informal networking among participants." },
  { time: "1:00 PM – 1:30 PM", title: "Communique / Conference Closing", tags: ["Closing"], desc: "Presentation of conference communique and official closing." },
  { time: "1:30 PM – 2:00 PM", title: "Accreditation of AGM", tags: ["AGM"], desc: "Accreditation process for the Annual General Meeting." },
  { time: "2:00 PM – 4:00 PM", title: "Annual General Meeting / Elections", tags: ["AGM", "Elections"], desc: "Annual meeting of NICE members, including elections." },
  { time: "1:30 PM – 3:00 PM", title: "NICESA Innovation Workshop", tags: ["Workshop"], desc: "Interactive innovation workshop for NICESA participants." },
  { time: "1:30 PM – 3:00 PM", title: "Graduate Career Fair", tags: ["Career"], desc: "Career fair providing networking and job opportunities for graduates." },
  { time: "3:00 PM – 4:00 PM", title: "Young Engineers Join the AGM (After Election)", tags: ["Engagement"], desc: "Young engineers participate in the AGM following the election." },
  { time: "4:00 PM – 4:30 PM", title: "National Chairman Meets the Young Engineers", tags: ["Engagement"], desc: "Interactive session between the National Chairman and young engineers." },
  { time: "6:00 PM – 9:00 PM", title: "Annual Dinner & NICE Awards", tags: ["Dinner", "Awards"], desc: "Annual dinner event featuring the presentation of NICE Group Dynamics results and awards." }
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
