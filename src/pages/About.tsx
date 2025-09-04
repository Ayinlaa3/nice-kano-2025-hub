import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function About() {
  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet>
        <title>About the Conference | NICE Kano 2025</title>
        <meta name="description" content="Learn about the NICE 23rd International Civil Engineering Conference & AGM, theme, and objectives." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/about"} />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">About the Conference</h1>
        <p className="text-muted-foreground mt-2">Integration of Innovative Construction Towards Sustainable Civil Infrastructure Development.</p>
      </header>

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p>
          The NICE 23rd International Civil Engineering Conference & AGM is Nigeria’s premier gathering for civil engineers, industry leaders, academics, and students. Over three days, participants explore cutting-edge solutions that shape sustainable, resilient infrastructure across the nation.
        </p>
        <h2>Why You Should Attend</h2>
        <ul>
          <li>Discover innovations in sustainable construction and materials</li>
          <li>Network with leaders across public and private sectors</li>
          <li>Advance your career through mentorship and knowledge sharing</li>
          <li>Engage sponsors and exhibitors driving infrastructure change</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">2025 NICE AGM Conference Planning Committee</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Sub-Committees</h3>
          <Accordion type="single" collapsible className="w-full">
            {/* Publicity/Transportation/Registration */}
            <AccordionItem value="publicity">
              <AccordionTrigger className="text-left">
                <div>
                  <h4 className="font-semibold">Publicity/Transportation/Registration</h4>
                  <p className="text-sm text-muted-foreground">Protocols, Media interface, Press briefings, Transportation, Banners & Industrial Visits</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p className="font-medium text-primary">ENGR. JOAN NWEKE, FNICE (Head) - 08030480459</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>ENGR. ALEX A. IFEAGWUZI, FNICE</li>
                    <li>ENGR. USMAN M. FALALU, FNICE</li>
                    <li>ENGR. FESTUS IGBOEKWU, FNICE</li>
                    <li>ENGR. TOPE BOAZ</li>
                    <li>ENGR. MAGDALENE DEMESI</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Venue & Accommodation */}
            <AccordionItem value="venue">
              <AccordionTrigger className="text-left">
                <div>
                  <h4 className="font-semibold">Venue & Accommodation</h4>
                  <p className="text-sm text-muted-foreground">Venue, accommodation for National Exco, BOT members, hotel provisions & Exhibitions</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p className="font-medium text-primary">ENGR. USMAN TIJANI (Head) - 08039351937</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>ENGR. O. SHARAFADEEN, FNICE</li>
                    <li>ENGR. MRS. DEMESI O. MAGDALENE, FNICE</li>
                    <li>ENGR. ABIOLA BASHIRU</li>
                    <li>ENGR. FAITH OKO-UKONI</li>
                    <li>ENGR. MADA ABASS</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Technical */}
            <AccordionItem value="technical">
              <AccordionTrigger className="text-left">
                <div>
                  <h4 className="font-semibold">Technical</h4>
                  <p className="text-sm text-muted-foreground">Conference sub-themes, technical presentations, paper review & communique production</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p className="font-medium text-primary">PROF. ALHASSAN HASHIM MOHAMMED, FNICE (Head) - 08103102219</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>ENGR. SALISU USMAN</li>
                    <li>ENGR. MRS. EBIEREN OTUARO</li>
                    <li>ENGR. DELE FADIPE, MNICE</li>
                    <li>ENGR. IBRAHIM IDRIS</li>
                    <li>ENGR. ISMAIL ADEYEMI</li>
                    <li>ENGR. VEN. SAMUEL OGUNDARE</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Spouses Programme */}
            <AccordionItem value="spouses">
              <AccordionTrigger className="text-left">
                <div>
                  <h4 className="font-semibold">Spouses Programme</h4>
                  <p className="text-sm text-muted-foreground">Registration package, Tours to places of interests & Talk programmes</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p className="font-medium text-primary">ENGR. O. SHARAFADEEN, FNICE (Head) - 08091543346</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>ENGR. MRS. DEMESI MAGDALENE, FNICE</li>
                    <li>ENGR. MRS. EBIEREN OTUARO</li>
                    <li>ENGR. MADA ABASS</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Food & Entertainment */}
            <AccordionItem value="food">
              <AccordionTrigger className="text-left">
                <div>
                  <h4 className="font-semibold">Food & Entertainment</h4>
                  <p className="text-sm text-muted-foreground">Musical band, DJs, ushers, Cultural troupes & Food provisions</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p className="font-medium text-primary">ENGR. ETAGHENE OGHO, FNICE (Head) - 08039535000</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>ENGR. ELISABETH ABODUNRIN</li>
                    <li>ENGR. BEEDEE BOTT</li>
                    <li>ENGR. FAITH OKO-UKONI</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Students Programme */}
            <AccordionItem value="students">
              <AccordionTrigger className="text-left">
                <div>
                  <h4 className="font-semibold">Students' (NICESA) Programmes</h4>
                  <p className="text-sm text-muted-foreground">Registration package & NICESA group programmes</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p className="font-medium text-primary">ENGR. DR. LOLA ADETONA, FNICE (Head) - 07034894522</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>ENGR. IBRAHIM IDRIS</li>
                    <li>ENGR. SALISU USMAN</li>
                    <li>ENGR. DELE FADIPE, MNICE</li>
                    <li>ENGR. ABIOLA BASHIRU</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Fund Raising/Finance */}
            <AccordionItem value="finance">
              <AccordionTrigger className="text-left">
                <div>
                  <h4 className="font-semibold">Fund Raising/Finance</h4>
                  <p className="text-sm text-muted-foreground">Conference sponsorship & Fund generation</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p className="font-medium text-primary">ENGR. BEMIGHO OFOEYENO, FNICE (Chairman) - 08023318732</p>
                  <p className="font-medium text-secondary">ENGR. DATTI AHMAD, FNICE (Alternate Chairman)</p>
                  <p className="font-medium">ENGR. MARYAM ABUBAKAR BALLA (Secretary)</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>ENGR. USMAN TIJANI</li>
                    <li>ENGR. PROF. HASSIM ALHASSAN</li>
                    <li>ENGR. MADA ABASS</li>
                    <li>ENGR. VEN. SAMUEL OGUNDARE</li>
                    <li>ENGR. ALEX IFEAGWUZI</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Coordinating */}
            <AccordionItem value="coordinating">
              <AccordionTrigger className="text-left">
                <div>
                  <h4 className="font-semibold">Coordinating</h4>
                  <p className="text-sm text-muted-foreground">General coordination of all CPC activities & Interface between CPC and EXCO</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>ENGR. BEMIGHO OFOEYENO, FNICE</li>
                    <li>ENGR. DATTI AHMAD, FNICE</li>
                    <li>ENGR. MARYAM ABUBAKAR BALLA</li>
                    <li>ENGR. OLUMOH SHARAFADEEN, FNICE</li>
                    <li>ENGR. DAVID TOPE BOAZ, FNICE</li>
                    <li>ENGR. USMAN TIJANI</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Local Organizing Committee */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Local Organizing Committee (LOC)</h3>
          <Card>
            <CardHeader>
              <CardTitle>Committee Structure</CardTitle>
              <CardDescription>
                Coordinates all activities and tasks related to the host venue, organizes industrial visits, 
                provides travel route advisories, and liaises with local enforcement and safety agencies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-semibold text-primary">Engr. Prof. Hassim Alhassan (Chairman) - 08103102219</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <p className="font-semibold text-secondary">Engr. Datti Ahmed (Alternate Chairman)</p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <p className="font-semibold">Engr. Maryam Abubakar Balla (Secretary) - 08038111882</p>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Committee Members</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>• Engr. Dr. Muttaqa Uba Zango</div>
                    <div>• Engr. Marwan Ahmad Aminu</div>
                    <div>• Engr. Murtala Alhaji Garba</div>
                    <div>• Engr. Auwalu Alhaji Musa</div>
                    <div>• Engr. Mansur Yakubu</div>
                    <div>• Engr. Ramatu Ahmad Aminu</div>
                    <div>• Engr. Muhammad Musa Adamu</div>
                    <div>• Engr. Mamman Hussaini Jatau</div>
                    <div>• Engr. Magaji Hussaini</div>
                    <div>• Engr. Kabiru Yusuf</div>
                    <div>• Engr. Samuel Gbolahan Olushola</div>
                    <div>• Engr. Usman Falalu Mohammed</div>
                    <div>• Engr. Dr. Gambo Haruna Yunusa</div>
                    <div>• Yusuf Suleiman Yusuf</div>
                    <div>• Engr. Dr. Samaila Saleh</div>
                    <div>• Engr. Badayi Ahmad Idris</div>
                    <div>• Engr. Amana Jaafar</div>
                    <div>• Saudat Shamsu Ahmad</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
