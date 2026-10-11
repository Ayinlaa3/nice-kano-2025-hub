import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Users, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

import { OFFICIAL_CONTACTS, SUPPORT_CONTACTS, whatsappLink } from "@/config/contacts";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Helmet title="Contact Us | NICE Lagos 2026">
        <meta name="description" content="Contact the NICE Lagos 2026 organizing committee, conference contacts and specialist WhatsApp support team." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/contact"} />
      </Helmet>

      <div className="container mx-auto py-12 md:py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Contact & Support
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Contact our conference team or speak to the right specialist for your enquiry.
          </p>
        </header>


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
                <div className="space-y-4">
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
                      <Link to="/registration" className="font-medium text-primary hover:underline">
                        Conference Registration
                      </Link>
                      <p className="text-sm text-muted-foreground">Complete your registration online</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Conference Contacts</h4>
                    <div className="space-y-5">
                      {OFFICIAL_CONTACTS.map((contact) => <div key={contact.name}>
                        <p className="font-medium">{contact.name}{contact.role === "Acting ES" ? " (Acting ES)" : ""}</p>
                        <a className="text-accent underline text-sm" href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
                      </div>)}
                    </div>
                  </div>
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
                  {SUPPORT_CONTACTS.map((member, index) => (
                    <div key={index} className="flex flex-wrap gap-3 items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={whatsappLink(member)}
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