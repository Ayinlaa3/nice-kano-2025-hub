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
  session: "Fellows Roundtable"| "Plenary" | "Panel Session" | "Engr. Roundtable" | "Networking";
};

const DATA: Speaker[] = [
  { sn: 1, name: "SMEDAN DG", org: "T.B.D", topic: "Unlocking the Potentials of SMEs in the Nigerian Construction Industry", day: "day1", session: "Engr. Roundtable" },
  { sn: 2, name: " Dr. Zulfikar Adamu", org: "T.B.D", topic: " Smart Technologies in Infrastructure Development", day: "day2", session: "Plenary" },
  { sn: 3, name: "Dr. Sunday Popo-Ola ", org: "T.B.D", topic: "Economic Approaches through Modern Construction Methods", day: "day2", session: "Plenary" },
  { sn: 4, name: " Dr. Prisca Ndu ", org: "T.B.D", topic: "Modern Infrastructure Financing", day: "day2", session: "Plenary"},
  { sn: 5, name: "Dr. Zulfikar Adamu", org: "T.B.D", topic: "Panel", day: "day2", session: "Panel Session" },
  { sn: 6, name: "Dr. Sunday Popo-Ola", org: "T.B.D", topic: " ", day: "day2", session: "Panel Session" },
  { sn: 7, name: "Dr. Prisca Ndu", org: "T.B.D", topic: " ", day: "day2", session: "Panel Session" },
  { sn: 8, name: "Engr. Igbuan Okaisabor", org: "T.B.D", topic: "The Future of Civil Engineering Leadership in Nigeria: Charting Pathways for Innovation, Mentorship, and Sustainable Impact", day: "day2", session: "Fellows Roundtable", },
  { sn: 9, name: "Dr. Danjuma Waniko (President, GBCN)", org: "T.B.D", topic: "Resilient and Climate-Adaptive Infrastructure ", day: "day3", session: "Plenary" },
  { sn: 10, name: " Bo Asmus Kjeldgaard", org: "T.B.D", topic: " Policy, Governance, and Education for Innovation Adoption", day: "day3", session: "Plenary" },
  { sn: 11, name: " Engr. Okoronkwo Ndukalu", org: "T.B.D", topic: " ", day: "day3", session: "Panel Session" },
  { sn: 12, name: "Dr. Danjuma Waniko (President, GBCN)", org: "T.B.D", topic: " ", day: "day3", session: "Panel Session" },
  { sn: 13, name: " Bo Asmus Kjeldgaard", org: "T.B.D", topic: " ", day: "day3", session: "Panel Session" },

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
            <SelectItem value="Fellows Roundtable">Fellows Roundtable</SelectItem>
            <SelectItem value="Plenary">Plenary</SelectItem>
            <SelectItem value="Panel Session">Panel Session</SelectItem>
            <SelectItem value="Networking">Networking</SelectItem>
            <SelectItem value="Engr. Roundtable">Engr. Roundtable</SelectItem>
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
