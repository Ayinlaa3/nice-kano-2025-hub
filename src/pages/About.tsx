import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Building, Trophy, Globe, Phone, Mail } from "lucide-react";

// Import leadership photos
import leaderOfoeyeno from "@/assets/leader-ofoeyeno.jpg";
import leaderBalla from "@/assets/leader-balla.jpg";
import leaderAlhassan from "@/assets/leader-alhassan.jpg";
import leaderBoaz from "@/assets/leader-boaz.jpg";

export default function About() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About the Conference | NICE Kano 2025</title>
        <meta name="description" content="Learn about the NICE 23rd International Civil Engineering Conference & AGM, theme, and objectives." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/about"} />
      </Helmet>

      {/* Hero Section with Subtle Background */}
      <section className="relative bg-gradient-to-br from-brand-primary/20 via-brand-green/10 to-brand-muted/20 text-foreground py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <Badge className="mb-4 bg-brand-gold/90 text-brand-foreground hover:bg-brand-gold">23rd Edition</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-primary to-brand-gold bg-clip-text text-transparent">
              About the Conference
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Integration of Innovative Construction Towards Sustainable Civil Infrastructure Development
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="outline" className="border-border text-foreground hover:bg-muted">
                3 Days Conference
              </Badge>
              <Badge variant="outline" className="border-border text-foreground hover:bg-muted">
                International Speakers
              </Badge>
              <Badge variant="outline" className="border-border text-foreground hover:bg-muted">
                Networking Opportunities
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-brand-gold/10 to-brand-red/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-primary">Conference Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join Nigeria's largest gathering of civil engineering professionals and shape the future of infrastructure development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center cultural-card hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-brand-green/20 to-brand-green/10">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-brand-green/30">
                    <Users className="h-8 w-8 text-brand-green" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-brand-green mb-2">500+</h3>
                <p className="text-sm text-muted-foreground">Expected Participants</p>
                <Progress value={85} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="text-center cultural-card hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-brand-gold/20 to-brand-gold/10">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-brand-gold/30">
                    <Building className="h-8 w-8 text-brand-gold" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-brand-gold mb-2">50+</h3>
                <p className="text-sm text-muted-foreground">Industry Exhibitors</p>
                <Progress value={70} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="text-center cultural-card hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-brand-red/20 to-brand-red/10">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-brand-red/30">
                    <Trophy className="h-8 w-8 text-brand-red" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-brand-red mb-2">25+</h3>
                <p className="text-sm text-muted-foreground">Technical Sessions</p>
                <Progress value={90} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="text-center cultural-card hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-primary/20 to-primary/10">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/30">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">10+</h3>
                <p className="text-sm text-muted-foreground">Countries Represented</p>
                <Progress value={60} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Conference Overview */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-primary">About NICE Kano 2025</h2>
              <p className="text-lg mb-6 text-muted-foreground leading-relaxed">
                The NICE 23rd International Civil Engineering Conference & AGM is Nigeria's premier gathering for civil engineers, 
                industry leaders, academics, and students. Over three transformative days, participants explore cutting-edge solutions 
                that shape sustainable, resilient infrastructure across the nation and beyond.
              </p>
              <p className="text-lg mb-8 text-muted-foreground leading-relaxed">
                This year's theme focuses on integrating innovative construction methodologies with sustainable practices, 
                driving the evolution of civil infrastructure development in Africa and globally.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-l-4 border-brand-green bg-gradient-to-r from-brand-green/5 to-transparent">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-brand-green mb-2">Innovation Focus</h4>
                    <p className="text-sm text-muted-foreground">Latest construction technologies and methodologies</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-brand-gold bg-gradient-to-r from-brand-gold/5 to-transparent">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-brand-gold mb-2">Sustainability</h4>
                    <p className="text-sm text-muted-foreground">Environmental-conscious infrastructure solutions</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="animate-scale-in">
              <Card className="bg-gradient-to-br from-brand-primary to-brand-muted text-brand-foreground border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Conference Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                    <span>Keynote speeches by industry leaders</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                    <span>Technical paper presentations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                    <span>Industrial site visits</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                    <span>Networking sessions & exhibitions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                    <span>Awards & recognition ceremony</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Attend Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-primary">Why You Should Attend</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Join hundreds of professionals in advancing civil engineering excellence and sustainable infrastructure development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center cultural-card border-0 bg-gradient-to-b from-brand-green/10 to-brand-green/5 hover:from-brand-green/20 hover:to-brand-green/10">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-brand-green/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔬</span>
                </div>
                <h3 className="font-semibold mb-3 text-brand-green">Innovation Discovery</h3>
                <p className="text-sm text-muted-foreground">Explore cutting-edge sustainable construction materials and methodologies</p>
              </CardContent>
            </Card>

            <Card className="text-center cultural-card border-0 bg-gradient-to-b from-brand-gold/10 to-brand-gold/5 hover:from-brand-gold/20 hover:to-brand-gold/10">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-brand-gold/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-semibold mb-3 text-brand-gold">Professional Network</h3>
                <p className="text-sm text-muted-foreground">Connect with leaders across public and private sector organizations</p>
              </CardContent>
            </Card>

            <Card className="text-center cultural-card border-0 bg-gradient-to-b from-brand-red/10 to-brand-red/5 hover:from-brand-red/20 hover:to-brand-red/10">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-brand-red/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="font-semibold mb-3 text-brand-red">Career Growth</h3>
                <p className="text-sm text-muted-foreground">Advance your career through mentorship and knowledge sharing opportunities</p>
              </CardContent>
            </Card>

            <Card className="text-center cultural-card border-0 bg-gradient-to-b from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏗️</span>
                </div>
                <h3 className="font-semibold mb-3 text-primary">Industry Engagement</h3>
                <p className="text-sm text-muted-foreground">Engage with sponsors and exhibitors driving infrastructure transformation</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Conference Leadership Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-primary">Conference Leadership</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Meet the distinguished leaders guiding the 2025 NICE Conference & AGM organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Chairman of Central Planning Committee */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-brand-primary/10 to-brand-primary/5">
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={leaderOfoeyeno} 
                    alt="Engr. Dr. Bemigho Ofoeyeno" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2 text-brand-primary">Engr. Dr. Bemigho Ofoeyeno</h3>
                <p className="text-sm text-brand-primary/80 mb-1">FNSE, FNICE</p>
                <p className="text-sm font-semibold text-muted-foreground mb-3">Chairman, Central Planning Committee</p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>08023318732</span>
                </div>
              </CardContent>
            </Card>

            {/* Secretary of Central Planning Committee */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-brand-green/10 to-brand-green/5">
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={leaderBalla} 
                    alt="Engr. Maryam Abubakar Balla" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2 text-brand-green">Engr. Maryam Abubakar Balla</h3>
                <p className="text-sm text-brand-green/80 mb-1">FNSE, FNICE</p>
                <p className="text-sm font-semibold text-muted-foreground mb-3">Secretary, Central Planning Committee</p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>08038111882</span>
                </div>
              </CardContent>
            </Card>

            {/* Chairman of Local Organizing Committee */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-brand-gold/10 to-brand-gold/5">
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={leaderAlhassan} 
                    alt="Engr. Prof. Hassim Alhassan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2 text-brand-gold">Engr. Prof. Hassim Alhassan</h3>
                <p className="text-sm text-brand-gold/80 mb-1">FNSE, FNICE</p>
                <p className="text-sm font-semibold text-muted-foreground mb-3">Chairman, Local Organizing Committee</p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>08103102219</span>
                </div>
              </CardContent>
            </Card>

            {/* NICE Executive Secretary */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-brand-red/10 to-brand-red/5">
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={leaderBoaz} 
                    alt="Engr. David Boaz" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2 text-brand-red">Engr. David Boaz</h3>
                <p className="text-sm text-brand-red/80 mb-1">FNSE, FNICE</p>
                <p className="text-sm font-semibold text-muted-foreground mb-3">NICE Executive Secretary</p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>Contact via NICE Secretariat</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Committee Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-primary">Conference Organization</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Meet the dedicated professionals working tirelessly to deliver an exceptional conference experience.
            </p>
          </div>
          
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center">Sub-Committees</h3>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {/* Enhanced Committee Items with Brand Colors */}
              <AccordionItem value="publicity" className="border rounded-lg bg-gradient-to-r from-brand-green/5 to-transparent">
                <AccordionTrigger className="text-left px-6 hover:no-underline">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-green/20 rounded-full flex items-center justify-center">
                      <span className="text-brand-green text-xl">📢</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-green">Publicity/Transportation/Registration</h4>
                      <p className="text-sm text-muted-foreground">Media interface, Press briefings, Transportation & Industrial Visits</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-3 ml-16">
                    <div className="p-4 bg-brand-green/10 rounded-lg border-l-4 border-brand-green">
                      <p className="font-semibold text-brand-green">ENGR. JOAN NWEKE, FNICE (Committee Head)</p>
                      <p className="text-sm text-muted-foreground">📞 08030480459</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {["ENGR. ALEX A. IFEAGWUZI, FNICE", "ENGR. USMAN M. FALALU, FNICE", "ENGR. FESTUS IGBOEKWU, FNICE", "ENGR. TOPE BOAZ", "ENGR. MAGDALENE DEMESI"].map((member, idx) => (
                        <div key={idx} className="p-3 bg-card rounded border hover:shadow-md transition-shadow">
                          <p className="text-sm font-medium">{member}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="venue" className="border rounded-lg bg-gradient-to-r from-brand-gold/5 to-transparent">
                <AccordionTrigger className="text-left px-6 hover:no-underline">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center">
                      <span className="text-brand-gold text-xl">🏨</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-gold">Venue & Accommodation</h4>
                      <p className="text-sm text-muted-foreground">Venue management, accommodation & exhibitions coordination</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-3 ml-16">
                    <div className="p-4 bg-brand-gold/10 rounded-lg border-l-4 border-brand-gold">
                      <p className="font-semibold text-brand-gold">ENGR. USMAN TIJANI (Committee Head)</p>
                      <p className="text-sm text-muted-foreground">📞 08039351937</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {["ENGR. O. SHARAFADEEN, FNICE", "ENGR. MRS. DEMESI O. MAGDALENE, FNICE", "ENGR. ABIOLA BASHIRU", "ENGR. FAITH OKO-UKONI", "ENGR. MADA ABASS"].map((member, idx) => (
                        <div key={idx} className="p-3 bg-card rounded border hover:shadow-md transition-shadow">
                          <p className="text-sm font-medium">{member}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="technical" className="border rounded-lg bg-gradient-to-r from-brand-red/5 to-transparent">
                <AccordionTrigger className="text-left px-6 hover:no-underline">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-red/20 rounded-full flex items-center justify-center">
                      <span className="text-brand-red text-xl">🔬</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-red">Technical Committee</h4>
                      <p className="text-sm text-muted-foreground">Conference themes, paper review & technical sessions</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-3 ml-16">
                    <div className="p-4 bg-brand-red/10 rounded-lg border-l-4 border-brand-red">
                      <p className="font-semibold text-brand-red">PROF. ALHASSAN HASHIM MOHAMMED, FNICE (Committee Head)</p>
                      <p className="text-sm text-muted-foreground">📞 08103102219</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {["ENGR. SALISU USMAN", "ENGR. MRS. EBIEREN OTUARO", "ENGR. DELE FADIPE, MNICE", "ENGR. IBRAHIM IDRIS", "ENGR. ISMAIL ADEYEMI", "ENGR. VEN. SAMUEL OGUNDARE"].map((member, idx) => (
                        <div key={idx} className="p-3 bg-card rounded border hover:shadow-md transition-shadow">
                          <p className="text-sm font-medium">{member}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Continue with other committees using similar enhanced styling */}
              <AccordionItem value="spouses" className="border rounded-lg bg-gradient-to-r from-purple-500/5 to-transparent">
                <AccordionTrigger className="text-left px-6 hover:no-underline">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-purple-500 text-xl">👥</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-500">Spouses Programme</h4>
                      <p className="text-sm text-muted-foreground">Tours, talks & special programs for spouses</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-3 ml-16">
                    <div className="p-4 bg-purple-500/10 rounded-lg border-l-4 border-purple-500">
                      <p className="font-semibold text-purple-500">ENGR. O. SHARAFADEEN, FNICE (Committee Head)</p>
                      <p className="text-sm text-muted-foreground">📞 08091543346</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {["ENGR. MRS. DEMESI MAGDALENE, FNICE", "ENGR. MRS. EBIEREN OTUARO", "ENGR. MADA ABASS"].map((member, idx) => (
                        <div key={idx} className="p-3 bg-card rounded border hover:shadow-md transition-shadow">
                          <p className="text-sm font-medium">{member}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="food" className="border rounded-lg bg-gradient-to-r from-orange-500/5 to-transparent">
                <AccordionTrigger className="text-left px-6 hover:no-underline">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <span className="text-orange-500 text-xl">🎵</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-500">Food & Entertainment</h4>
                      <p className="text-sm text-muted-foreground">Catering, music, cultural performances & hospitality</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-3 ml-16">
                    <div className="p-4 bg-orange-500/10 rounded-lg border-l-4 border-orange-500">
                      <p className="font-semibold text-orange-500">ENGR. ETAGHENE OGHO, FNICE (Committee Head)</p>
                      <p className="text-sm text-muted-foreground">📞 08039535000</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {["ENGR. ELISABETH ABODUNRIN", "ENGR. BEEDEE BOTT", "ENGR. FAITH OKO-UKONI"].map((member, idx) => (
                        <div key={idx} className="p-3 bg-card rounded border hover:shadow-md transition-shadow">
                          <p className="text-sm font-medium">{member}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="students" className="border rounded-lg bg-gradient-to-r from-blue-500/5 to-transparent">
                <AccordionTrigger className="text-left px-6 hover:no-underline">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-500 text-xl">🎓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-500">Students' (NICESA) Programmes</h4>
                      <p className="text-sm text-muted-foreground">Student competitions, mentorship & career guidance</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-3 ml-16">
                    <div className="p-4 bg-blue-500/10 rounded-lg border-l-4 border-blue-500">
                      <p className="font-semibold text-blue-500">ENGR. DR. LOLA ADETONA, FNICE (Committee Head)</p>
                      <p className="text-sm text-muted-foreground">📞 07034894522</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {["ENGR. IBRAHIM IDRIS", "ENGR. SALISU USMAN", "ENGR. DELE FADIPE, MNICE", "ENGR. ABIOLA BASHIRU"].map((member, idx) => (
                        <div key={idx} className="p-3 bg-card rounded border hover:shadow-md transition-shadow">
                          <p className="text-sm font-medium">{member}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="finance" className="border rounded-lg bg-gradient-to-r from-green-600/5 to-transparent">
                <AccordionTrigger className="text-left px-6 hover:no-underline">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xl">💰</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-600">Fund Raising/Finance</h4>
                      <p className="text-sm text-muted-foreground">Sponsorship coordination & financial management</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-3 ml-16">
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="p-4 bg-green-600/10 rounded-lg border-l-4 border-green-600">
                        <p className="font-semibold text-green-600">ENGR. BEMIGHO OFOEYENO, FNICE</p>
                        <p className="text-xs text-muted-foreground">Chairman • 📞 08023318732</p>
                      </div>
                      <div className="p-4 bg-green-500/10 rounded-lg border-l-4 border-green-500">
                        <p className="font-semibold text-green-500">ENGR. DATTI AHMAD, FNICE</p>
                        <p className="text-xs text-muted-foreground">Alternate Chairman</p>
                      </div>
                      <div className="p-4 bg-green-400/10 rounded-lg border-l-4 border-green-400">
                        <p className="font-semibold text-green-400">ENGR. MARYAM ABUBAKAR BALLA</p>
                        <p className="text-xs text-muted-foreground">Secretary</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {["ENGR. USMAN TIJANI", "ENGR. PROF. HASSIM ALHASSAN", "ENGR. MADA ABASS", "ENGR. VEN. SAMUEL OGUNDARE", "ENGR. ALEX IFEAGWUZI"].map((member, idx) => (
                        <div key={idx} className="p-3 bg-card rounded border hover:shadow-md transition-shadow">
                          <p className="text-sm font-medium">{member}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="coordinating" className="border rounded-lg bg-gradient-to-r from-indigo-500/5 to-transparent">
                <AccordionTrigger className="text-left px-6 hover:no-underline">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                      <span className="text-indigo-500 text-xl">⚙️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-500">Coordinating Committee</h4>
                      <p className="text-sm text-muted-foreground">Overall coordination & EXCO interface</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-3 ml-16">
                    <div className="grid md:grid-cols-2 gap-3">
                      {["ENGR. BEMIGHO OFOEYENO, FNICE", "ENGR. DATTI AHMAD, FNICE", "ENGR. MARYAM ABUBAKAR BALLA", "ENGR. OLUMOH SHARAFADEEN, FNICE", "ENGR. DAVID TOPE BOAZ, FNICE", "ENGR. USMAN TIJANI"].map((member, idx) => (
                        <div key={idx} className="p-3 bg-card rounded border hover:shadow-md transition-shadow">
                          <p className="text-sm font-medium">{member}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Local Organizing Committee */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold mb-6 text-center">Local Organizing Committee (LOC)</h3>
            <Card className="border-0 shadow-xl bg-gradient-to-br from-brand-primary to-brand-muted text-brand-foreground">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-brand-foreground">Committee Leadership</CardTitle>
                <CardDescription className="text-brand-foreground/80">
                  Coordinating all venue activities, industrial visits, travel advisories, and local liaison services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-brand-foreground/10 rounded-lg border border-brand-foreground/20">
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-gold/30 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👑</span>
                    </div>
                    <h4 className="font-bold text-brand-gold mb-2">Chairman</h4>
                    <p className="font-semibold">Engr. Prof. Hassim Alhassan</p>
                    <p className="text-sm text-brand-foreground/70">📞 08103102219</p>
                  </div>
                  
                  <div className="text-center p-6 bg-brand-foreground/10 rounded-lg border border-brand-foreground/20">
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-red/30 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <h4 className="font-bold text-brand-red mb-2">Alternate Chairman</h4>
                    <p className="font-semibold">Engr. Datti Ahmed</p>
                    <p className="text-sm text-brand-foreground/70">Deputy Leadership</p>
                  </div>
                  
                  <div className="text-center p-6 bg-brand-foreground/10 rounded-lg border border-brand-foreground/20">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-400/30 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📝</span>
                    </div>
                    <h4 className="font-bold text-blue-400 mb-2">Secretary</h4>
                    <p className="font-semibold">Engr. Maryam Abubakar Balla</p>
                    <p className="text-sm text-brand-foreground/70">📞 08038111882</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold mb-4 text-center text-brand-foreground">Committee Members</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      "Engr. Dr. Muttaqa Uba Zango", "Engr. Marwan Ahmad Aminu", "Engr. Murtala Alhaji Garba",
                      "Engr. Auwalu Alhaji Musa", "Engr. Mansur Yakubu", "Engr. Ramatu Ahmad Aminu",
                      "Engr. Muhammad Musa Adamu", "Engr. Mamman Hussaini Jatau", "Engr. Magaji Hussaini",
                      "Engr. Kabiru Yusuf", "Engr. Samuel Gbolahan Olushola", "Engr. Usman Falalu Mohammed",
                      "Engr. Dr. Gambo Haruna Yunusa", "Yusuf Suleiman Yusuf", "Engr. Dr. Samaila Saleh",
                      "Engr. Badayi Ahmad Idris", "Engr. Amana Jaafar", "Saudat Shamsu Ahmad"
                    ].map((member, idx) => (
                      <div key={idx} className="p-3 bg-brand-foreground/10 rounded-lg border border-brand-foreground/20 hover:bg-brand-foreground/20 transition-colors">
                        <p className="text-sm font-medium text-brand-foreground">{member}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}