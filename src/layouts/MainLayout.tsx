import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "@/assets/nice-logo.svg";
import { Button } from "@/components/ui/button";

const REG_FORM = "https://forms.gle/HXocP4aGn5Pb1HmR6";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/program", label: "Program" },
  { to: "/speakers", label: "Speakers" },
  { to: "/location", label: "Location" },
  { to: "/hotels-travel", label: "Hotels & Travel" },
  { to: "/about", label: "About" },
  { to: "/sponsorships", label: "Sponsorships" },
  { to: "/contact", label: "Contact" },
];

export default function MainLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="NICE logo" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Nigerian Institution of Civil Engineers
              </p>
              <p className="font-semibold">Kano 2025 Conference & AGM</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `story-link ${isActive ? "text-brand font-medium" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="brand" size="sm" className="hover-scale">
              <a href={REG_FORM} target="_blank" rel="noreferrer">
                Register Now
              </a>
            </Button>
            <Button asChild variant="brandSecondary" size="sm" className="hidden md:inline-flex hover-scale">
              <Link to="/sponsorships">Sponsor Us</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t py-10 bg-background">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <img src={logo} alt="NICE logo" className="h-10 w-auto" />
            <p className="text-sm text-muted-foreground mt-3">
              Sustaining the world’s infrastructure through excellence in civil engineering.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="mt-3 grid gap-2 text-sm">
              <li><Link to="/about" className="story-link">About</Link></li>
              <li><Link to="/program" className="story-link">Program</Link></li>
              <li><Link to="/sponsorships" className="story-link">Sponsorships</Link></li>
              <li><a href={REG_FORM} target="_blank" rel="noreferrer" className="story-link">Register</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Location</h4>
            <ul className="mt-3 grid gap-2 text-sm">
              <li>
                <Link to="/location" className="story-link">Coronation Hall, Kano Government House</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              <li>© {new Date().getFullYear()} NICE</li>
              <li>All rights reserved.</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
