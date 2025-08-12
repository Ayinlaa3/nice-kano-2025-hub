import { Helmet } from "react-helmet-async";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo, useState } from "react";

type Speaker = {
  sn: number;
  name: string;
  org: string;
  topic: string;
  day: "day1" | "day2" | "day3";
  session: "Technical Session" | "Workshop" | "Plenary" | "Gala" | "Roundtable" | "Networking";
};

const DATA: Speaker[] = [
  { sn: 1, name: "Dr. A. Bello", org: "ABC Engineering – Director", topic: "Resilient Roads", day: "day1", session: "Technical Session" },
  { sn: 2, name: "Engr. C. Nwosu", org: "InfraTech – CTO", topic: "Innovative Materials", day: "day2", session: "Workshop" },
  { sn: 3, name: "Prof. H. Musa", org: "UNILAG – Professor", topic: "BIM & Sustainability", day: "day1", session: "Plenary" },
];

export default function Speakers() {
  const [day, setDay] = useState<string>("all");
  const [session, setSession] = useState<string>("all");

  const filtered = useMemo(() =>
    DATA.filter(s => (day === "all" || s.day === day) && (session === "all" || s.session === session)),
    [day, session]
  );

  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet>
        <title>Conference Speakers | NICE Kano 2025</title>
        <meta name="description" content="Meet the speakers for NICE Kano 2025. Filter by day or session to explore topics and presenters." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/speakers"} />
      </Helmet>

      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">Conference Speakers</h1>
        <p className="text-muted-foreground mt-2">Speaker list will be updated as confirmations arrive.</p>
      </header>

      <div className="flex flex-wrap gap-3 mb-6">
        <Select onValueChange={setDay} defaultValue="all">
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Day" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Days</SelectItem>
            <SelectItem value="day1">Day 1</SelectItem>
            <SelectItem value="day2">Day 2</SelectItem>
            <SelectItem value="day3">Day 3</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setSession} defaultValue="all">
          <SelectTrigger className="w-[220px]"><SelectValue placeholder="Session" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sessions</SelectItem>
            <SelectItem value="Plenary">Plenary</SelectItem>
            <SelectItem value="Technical Session">Technical Session</SelectItem>
            <SelectItem value="Workshop">Workshop</SelectItem>
            <SelectItem value="Networking">Networking</SelectItem>
            <SelectItem value="Roundtable">Roundtable</SelectItem>
            <SelectItem value="Gala">Gala</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S/N</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Organization & Position</TableHead>
              <TableHead>Presentation Topic</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((s) => (
              <TableRow key={s.sn}>
                <TableCell className="font-medium">{s.sn}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.org}</TableCell>
                <TableCell>{s.topic}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
