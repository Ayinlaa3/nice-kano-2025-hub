import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Users, Target, Trophy, CheckCircle2, Rocket, Activity, Calculator, Recycle, Shield, Truck, Car, Medal, Award } from "lucide-react";
import contechLogo from "@/assets/contech-logo.png";
import niceLogo from "@/assets/nice-logo.svg";

const APPLICATION_FORM = "https://forms.gle/oFkeTT6pGJWEoQsw9";

const themes = [
  {
    title: "Infrastructure Monitoring",
    description: "Develop tech solutions to monitor the health and performance of critical infrastructure like bridges, roads, and buildings to ensure their longevity and safety.",
    icon: Activity
  },
  {
    title: "Project & Cost Management",
    description: "Propose innovative solutions, AI models, or BIM applications that streamline construction workflows, reduce project delays, and provide accurate cost control from start to finish.",
    icon: Calculator
  },
  {
    title: "Waste & Sustainability",
    description: "Design circular economy models, new technologies for recycling construction waste into valuable materials, or digital tools to track and minimize the carbon footprint of projects.",
    icon: Recycle
  },
  {
    title: "Safety",
    description: "Create technology-based solutions to make construction sites safer. This could include smart wearables for workers, AI-powered video surveillance to detect hazards, or VR safety training modules.",
    icon: Shield
  },
  {
    title: "Supply Chain & Logistics",
    description: "Build a concept for a smarter construction supply chain. Think 'track-and-trace' platforms for materials, logistics optimization apps, or a digital marketplace for certified local suppliers.",
    icon: Truck
  },
  {
    title: "Traffic Solutions",
    description: "Propose innovative infrastructure designs or smart city technologies to ease urban traffic congestion. This could involve data analytics for traffic flow, smart signaling systems, or new road interchange concepts.",
    icon: Car
  }
];

const prizes = [
  {
    place: "1st Place",
    title: "Winner",
    prize: "₦1,000,000",
    icon: Trophy,
    benefits: [
      'The coveted "NICE KANO 2025 Future Builder" Trophy',
      "Mentorship Program with a distinguished NICE Fellow",
      "Featured Spotlight in the official NICE journal and all post-conference communications"
    ]
  },
  {
    place: "2nd Place",
    title: "First Runner-Up",
    prize: "₦500,000",
    icon: Medal,
    benefits: [
      "Mentorship Program with a distinguished NICE Fellow",
      "Featured mention in post-conference communications"
    ]
  },
  {
    place: "3rd Place",
    title: "Second Runner-Up",
    prize: "₦300,000",
    icon: Award,
    benefits: [
      "Mentorship Program with a distinguished NICE Fellow",
      "Special recognition during the awards ceremony"
    ]
  }
];

const process = [
  {
    step: 1,
    title: "Application",
    description: "Submit your team's idea via our online form. The submission includes your team details and a document (pdf, slides or both), and a 3 minutes video of your proposed solution."
  },
  {
    step: 2,
    title: "Screening & Finalist Selection",
    description: "A Technical Committee will review all applications based on the defined screening criteria. The Top 5 Teams will be selected as finalists and invited to the conference (Fully sponsored trip)."
  },
  {
    step: 3,
    title: "Live Pitch at Kano 2025",
    description: "Finalist teams will present their solution in a 5-minute live pitch to a panel of expert judges and the conference audience."
  },
  {
    step: 4,
    title: "Winner Announcement",
    description: "The top 3 winning teams will be announced and celebrated during the prestigious Conference Dinner and Awards Gala."
  }
];

const criteria = [
  { name: "Innovation & Originality", weight: "35%", description: "Is the idea fresh, creative, and a significant leap forward from existing solutions?" },
  { name: "Potential Impact", weight: "30%", description: "How effectively does the solution address a real, significant problem within the chosen theme in the Nigerian context?" },
  { name: "Feasibility", weight: "25%", description: "Is the concept practical, technologically sound, and realistic? Is there a clear, high-level path to implementation?" },
  { name: "Clarity of Concept", weight: "10%", description: "How clearly and persuasively is the problem, solution, and impact articulated in the written summary?" }
];

export default function InnovationChallenge() {
  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet>
        <title>Young Engineers Innovation Challenge | NICE Kano 2025</title>
        <meta name="description" content="Join the NICE Innovation Challenge at Kano 2025. Showcase your visionary solutions to Nigeria's construction industry challenges and win up to ₦1,000,000." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/innovationchallenge"} />
      </Helmet>

      {/* Hero Section */}
      <section className="text-center mb-16">
        <Badge className="mb-4 bg-brand-yellow text-brand-primary text-sm px-4 py-2">
          <Rocket className="w-4 h-4 mr-2 inline" />
          Innovation Challenge
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-primary via-brand-green to-brand-red bg-clip-text text-transparent">
          Young Engineers Innovation Challenge
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
          An Innovation Arena for Nigeria's Brightest Minds at the NICE Kano 2025 Conference
        </p>
        <Button asChild size="lg" variant="professional" className="text-lg px-8 py-6">
          <a href={APPLICATION_FORM} target="_blank" rel="noreferrer">
            Apply Now
          </a>
        </Button>
      </section>

      {/* Powered By Section */}
      <section className="mb-16 max-w-4xl mx-auto">
        <Card className="border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-brand-green/5">
          <CardContent className="pt-6">
            <p className="text-center text-sm text-muted-foreground mb-4">Powered by</p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex flex-col items-center gap-2">
                <img src={niceLogo} alt="Nigerian Institution of Civil Engineers" className="h-16 object-contain" />
                <p className="text-xs text-center text-muted-foreground max-w-[150px]">Nigerian Institution of Civil Engineers</p>
              </div>
              <span className="text-2xl text-muted-foreground">×</span>
              <div className="flex flex-col items-center gap-2">
                <img src={contechLogo} alt="Contech" className="h-16 object-contain" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Introduction */}
      <section className="mb-16 max-w-4xl mx-auto">
        <Card className="border-brand-primary/20">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed mb-4">
              The future of Nigeria is built on the foundation of smart, sustainable, and resilient infrastructure. As part of the 23rd NICE International Conference, we are proud to launch the <strong>Young Engineers Innovation Challenge</strong>. This is more than a competition; it's a platform for the next generation of engineers to develop and showcase visionary solutions to the industry's most pressing challenges.
            </p>
            <p className="text-lg leading-relaxed">
              If you are a student, graduate, or young professional with a passion for innovation, <strong>this is your stage</strong>.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Challenge Themes */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <Lightbulb className="w-12 h-12 mx-auto mb-4 text-brand-yellow" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Challenge Themes</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose ONE of the following themes for your team's solution
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, idx) => (
            <Card key={idx} className="border-brand-green/20 hover:border-brand-primary/40 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <theme.icon className="w-10 h-10 mb-3 text-brand-primary" />
                <CardTitle className="text-xl text-brand-primary">{theme.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{theme.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Eligibility */}
      <section className="mb-16 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Users className="w-12 h-12 mx-auto mb-4 text-brand-green" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Eligibility & Team Formation</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-brand-green/20">
            <CardHeader>
              <CardTitle className="text-lg">Team Size</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Teams must consist of <strong className="text-foreground">3 to 5 members</strong></p>
            </CardContent>
          </Card>
          <Card className="border-brand-green/20">
            <CardHeader>
              <CardTitle className="text-lg">Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We highly encourage <strong className="text-foreground">multi-disciplinary teams</strong></p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <Target className="w-12 h-12 mx-auto mb-4 text-brand-red" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Journey from Idea to Impact</h2>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          {process.map((item) => (
            <Card key={item.step} className="border-brand-primary/20 hover:border-brand-primary/40 transition-all">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-green flex items-center justify-center text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Prizes */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-brand-yellow" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prizes & Recognition</h2>
          <p className="text-lg text-muted-foreground">Rewarding Excellence</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {prizes.map((prize, idx) => (
            <Card key={idx} className={`border-2 ${idx === 0 ? 'border-brand-yellow shadow-xl scale-105' : 'border-brand-primary/20'} hover:shadow-2xl transition-all duration-300`}>
              <CardHeader className="text-center">
                <prize.icon className={`w-16 h-16 mx-auto mb-4 ${idx === 0 ? 'text-brand-yellow' : 'text-brand-green'}`} />
                <CardTitle className="text-2xl">{prize.place}</CardTitle>
                <CardDescription className="text-lg font-semibold">{prize.title}</CardDescription>
                <div className="text-3xl font-bold text-brand-primary mt-2">{prize.prize}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {prize.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="bg-brand-primary/5 border-brand-primary/20 max-w-4xl mx-auto">
          <CardContent className="pt-6">
            <p className="text-center text-lg">
              <strong>All 5 Finalist Teams</strong> will receive unparalleled networking access to industry leaders and a <strong>Certificate of Participation</strong>.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Screening Criteria */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Application & Screening Criteria</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            How We Select Our Top 5 Finalists
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-4">
          {criteria.map((item, idx) => (
            <Card key={idx} className="border-brand-green/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge variant="outline" className="text-brand-primary border-brand-primary">{item.weight}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-brand-primary/10 via-brand-green/10 to-brand-yellow/10 rounded-2xl p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build the Future?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Submit your application and join Nigeria's brightest engineering minds at NICE Kano 2025
        </p>
        <Button asChild size="lg" variant="professional" className="text-lg px-8 py-6">
          <a href={APPLICATION_FORM} target="_blank" rel="noreferrer">
            Submit Your Application
          </a>
        </Button>
      </section>
    </div>
  );
}
