import { Helmet } from "react-helmet-async";

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
        <h2 className="text-2xl font-semibold">Planning Committee</h2>
        <ul className="mt-4 grid gap-2 list-disc pl-5">
          <li>Engr. A. Example — National Chairman</li>
          <li>Engr. B. Example — Conference Chair</li>
          <li>Engr. C. Example — Technical Sessions Lead</li>
          <li>Engr. D. Example — Logistics Lead</li>
        </ul>
      </section>
    </div>
  );
}
