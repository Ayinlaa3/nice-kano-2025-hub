import { Helmet } from "react-helmet-async";
import { IllBeThere } from "@/components/IllBeThere";

const Flyer = () => {
  return (
    <>
      <Helmet>
        <title>Create Your "I'll Be Attending" Flyer | NICE Lagos 2026</title>
        <meta
          name="description"
          content="Add your photo and name to create your personalised NICE 2026 conference flyer, then save it or share it on WhatsApp, Instagram, Facebook, LinkedIn, TikTok and X."
        />
        <link rel="canonical" href="https://conference.nicehq.org/flyer" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 pt-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            I have registered and will be attending
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            The 24th International Civil Engineering Conference &amp; AGM, 20th – 22nd October 2026,
            Academy Guest House &amp; Events Halls, Agidingbi, Ikeja, Lagos.
          </p>
        </div>
        <IllBeThere />
      </div>
    </>
  );
};

export default Flyer;
