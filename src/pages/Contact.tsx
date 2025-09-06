import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Users, MessageSquare } from "lucide-react";

// Import leadership photos
import leaderOfoeyeno from "@/assets/leader-ofoeyeno.jpg";
import leaderBalla from "@/assets/leader-balla.jpg";
import leaderAlhassan from "@/assets/leader-alhassan.jpg";
import leaderBoaz from "@/assets/leader-boaz.jpg";

const REG_FORM = "https://forms.gle/HXocP4aGn5Pb1HmR6";

export default function Contact() {
  const { toast } = useToast();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Simulate form submission to conference@nicehq.org
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };
    
    // In a real implementation, this would send to conference@nicehq.org
    console.log('Form submission to conference@nicehq.org:', data);
    
    toast({ 
      title: "Message sent successfully!", 
      description: "Your message has been delivered to conference@nicehq.org. We'll respond within 24 hours." 
    });
    
    (e.target as HTMLFormElement).reset();
  }

  const leadershipContacts = [
    {
      name: "Engr. Dr. Bemigho Ofoeyeno",
      title: "FNSE, FNICE",
      role: "Chairman, Central Planning Committee",
      phone: "+234 802 331 8732",
      image: leaderOfoeyeno,
      color: "primary"
    },
    {
      name: "Engr. Maryam Abubakar Balla",
      title: "FNSE, FNICE", 
      role: "Secretary, Central Planning Committee",
      phone: "+234 803 811 1882",
      image: leaderBalla,
      color: "green"
    },
    {
      name: "Engr. Prof. Hassim Alhassan",
      title: "FNSE, FNICE",
      role: "Chairman, Local Organizing Committee", 
      phone: "+234 810 310 2219",
      image: leaderAlhassan,
      color: "gold"
    },
    {
      name: "Engr. David Boaz",
      title: "FNSE, FNICE",
      role: "NICE Executive Secretary",
      phone: "+234 803 715 4335",
      image: leaderBoaz,
      color: "red"
    }
  ];

  const subcommitteeContacts = [
    { department: "Registration", email: "reg@nicehq.org", description: "Conference registration and attendee support" },
    { department: "Sponsorship", email: "sponsor@nicehq.org", description: "Partnership and sponsorship opportunities" },
    { department: "Logistics", email: "logistics@nicehq.org", description: "Venue, transportation, and logistics coordination" },
    { department: "Media", email: "media@nicehq.org", description: "Press coverage and media relations" },
    { department: "Technical Sessions", email: "technical@nicehq.org", description: "Paper submissions and technical programs" },
    { department: "Accommodation", email: "stay@nicehq.org", description: "Hotel bookings and accommodation assistance" }
  ];

  const supportTeam = [
    { name: "Boaz", phone: "+234 803 715 4335", role: "General Support" },
    { name: "Ahmed", phone: "+234 818 209 7622", role: "Technical Support" },
    { name: "Bright", phone: "+234 706 207 0193", role: "Registration Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Helmet>
        <title>Contact Us | NICE Kano 2025</title>
        <meta name="description" content="Contact the NICE Kano 2025 organizing committee, conference leadership, subcommittee chairmen, and support team." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/contact"} />
      </Helmet>

      <div className="container mx-auto py-12 md:py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Contact & Support
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with our conference leadership, specialized subcommittees, and dedicated support team for all your conference needs.
          </p>
        </header>

        {/* Conference Leadership */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Conference Leadership</h2>
            <p className="text-muted-foreground">Direct contact with our distinguished conference leaders</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipContacts.map((leader, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{leader.name}</h3>
                  <p className="text-sm text-primary/80 mb-1">{leader.title}</p>
                  <p className="text-sm font-medium text-muted-foreground mb-3">{leader.role}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${leader.phone}`} className="hover:text-primary transition-colors">
                      {leader.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Contacts */}
          <div className="lg:col-span-2 space-y-8">
            {/* General Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  General Conference Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">conference@nicehq.org</p>
                      <p className="text-sm text-muted-foreground">Main conference email</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <a href={REG_FORM} target="_blank" rel="noreferrer" className="font-medium text-primary hover:underline">
                        Conference Registration Form
                      </a>
                      <p className="text-sm text-muted-foreground">Complete your registration online</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subcommittee Contacts */}
            <Card>
              <CardHeader>
                <CardTitle>Subcommittee Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {subcommitteeContacts.map((committee, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Mail className="h-4 w-4 text-muted-foreground mt-1" />
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <h4 className="font-medium">{committee.department}</h4>
                          <a 
                            href={`mailto:${committee.email}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {committee.email}
                          </a>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{committee.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Support Team */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  WhatsApp Support Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {supportTeam.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}?text=Hello%20${member.name},%20I%20need%20assistance%20regarding%20the%20NICE%20Kano%202025%20conference.`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          {member.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Your message will be delivered to conference@nicehq.org
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email" placeholder="you@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" placeholder="+234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="How can we assist you with the conference?" 
                      rows={5} 
                      required 
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button type="reset" variant="outline" className="flex-1">
                      Reset
                    </Button>
                    <Button type="submit" className="flex-1">
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}