import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Building, Trophy, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      <Helmet title="About the Conference | NICE Lagos 2026">
        <meta name="description" content="Learn about the NICE 24th International Civil Engineering Conference & AGM, theme, and objectives, holding in Lagos." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/about"} />
      </Helmet>

      {/* Hero Section with Subtle Background */}
      <section className="relative bg-gradient-to-br from-brand-primary/20 via-brand-green/10 to-brand-muted/20 text-foreground py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <Badge className="mb-4 bg-brand-gold/90 text-secondary-foreground text-md hover:bg-brand-gold">24th Edition</Badge>
            <h1 className="text-4xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-brand-primary to-brand-gold bg-clip-text text-transparent">
              About the Conference
            </h1>
            <p className="text-xl md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Civil Engineering: Sustainable and Resilient Infrastructure for Economic Growth
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="outline" className="border-border text-foreground hover:bg-muted text-md">
                3 Days Conference
              </Badge>
              <Badge variant="outline" className="border-border text-foreground hover:bg-muted text-md">
                Reputable Speakers
              </Badge>
              <Badge variant="outline" className="border-border text-foreground hover:bg-muted text-md">
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
              Join Africa's largest gathering of civil engineering professionals and shape the future of infrastructure development.
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
                <h3 className="text-3xl font-bold text-brand-green mb-2">3000+</h3>
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
                <h3 className="text-3xl font-bold text-brand-yellow mb-2">50+</h3>
                <p className="text-sm text-muted-foreground">Industry CEA Exhibitors</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-primary">About the 24th International Civil Engineering Conference</h2>
              <p className="text-lg mb-6 text-muted-foreground leading-relaxed">
                The NICE 24th International Civil Engineering Conference & AGM is Nigeria's premier gathering for civil engineers, 
                industry leaders, academics, and students. Over three transformative days, participants explore cutting-edge solutions 
                that shape sustainable, resilient infrastructure across the nation and beyond, live in Lagos.
              </p>
              <p className="text-lg mb-8 text-muted-foreground leading-relaxed">
                This year's theme focuses on delivering sustainable and resilient infrastructure that drives economic growth, 
                advancing the evolution of civil infrastructure development in Africa and globally.
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
                    <span>Keynote & Plenary speeches by industry leaders</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                    <span>Technical paper presentations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                    <span>Industrial site visits and City Tours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                    <span>Business Roundtables</span>
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
      </div>
    </div>
  );
}
