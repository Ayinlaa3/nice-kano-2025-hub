import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const REG_FORM = "https://forms.gle/HXocP4aGn5Pb1HmR6";

export default function Contact() {
  const { toast } = useToast();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast({ title: "Message sent", description: "Thanks for reaching out. We'll get back to you shortly." });
  }

  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet>
        <title>Contact Us | NICE Kano 2025</title>
        <meta name="description" content="Get in touch with the NICE Kano 2025 organizing committee. Find subcommittee contacts and a general inquiry form." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/contact"} />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Contact & Support</h1>
        <p className="text-muted-foreground mt-2">We’re here to help with registration, sponsorship, logistics, and general inquiries.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <Card className="p-5">
            <h2 className="font-semibold">General Contacts</h2>
            <ul className="mt-3 grid gap-2 text-sm">
              <li>Email: conference@nicehq.org</li>
              <li>Phone: +234 800 000 0000</li>
              <li>Registration: <a className="story-link" href={REG_FORM} target="_blank" rel="noreferrer">Google Form</a></li>
            </ul>
          </Card>
          <Card className="p-5 mt-6">
            <h2 className="font-semibold">Subcommittees</h2>
            <ul className="mt-3 grid gap-2 text-sm">
              <li>Registration — reg@nicehq.org</li>
              <li>Sponsorship — sponsor@nicehq.org</li>
              <li>Logistics — logistics@nicehq.org</li>
              <li>Media — media@nicehq.org</li>
              <li>Technical Sessions — technical@nicehq.org</li>
              <li>Accommodation — stay@nicehq.org</li>
            </ul>
          </Card>
        </div>
        <Card className="p-6">
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="Your name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="you@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" placeholder="+234" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="How can we assist you?" rows={5} required />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="reset" variant="outline">Reset</Button>
              <Button type="submit" variant="hero">Send Message</Button>
            </div>
          </form>
        </Card>
      </section>
    </div>
  );
}
