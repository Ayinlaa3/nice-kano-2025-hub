import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "@/assets/nice-logo.svg";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const REG_FORM = "https://forms.gle/HXocP4aGn5Pb1HmR6";

const navigationGroups = [
  {
    label: "Event Info",
    items: [
      { to: "/program", label: "Program", description: "Conference schedule and sessions" },
      { to: "/speakers", label: "Speakers", description: "Featured speakers and presenters" },
      { to: "/location", label: "Location", description: "Venue details and directions" },
    ]
  },
  {
    label: "Attendance",
    items: [
      { to: "/hotels-travel", label: "Hotels & Travel", description: "Accommodation and travel info" },
    ]
  },
  {
    label: "About",
    items: [
      { to: "/about", label: "About KANO 2025", description: "Learn about our conference" },
      { to: "/sponsorships", label: "Sponsorships", description: "Partnership opportunities" },
    ]
  }
];

export default function MainLayout() {
  const isMobile = useIsMobile();

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition-colors ${isActive ? "text-brand-primary font-medium bg-brand-primary/5" : "text-foreground hover:text-brand-primary"}`
            }
          >
            Home
          </NavLink>
          
          {navigationGroups.map((group) => (
            <div key={group.label} className="space-y-2">
              <h4 className="font-semibold text-brand-primary text-sm uppercase tracking-wide">{group.label}</h4>
              {group.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-brand-primary hover:bg-brand-primary/5 rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          
          <div className="border-t pt-4">
            <Link
              to="/contact"
              className="block px-3 py-2 text-sm text-muted-foreground hover:text-brand-primary hover:bg-brand-primary/5 rounded-md transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-40 bg-gradient-to-r from-brand-primary/10 via-brand-yellow/5 to-brand-red/10 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-brand-primary/30 shadow-lg">
        <div className="container mx-auto flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3 transition-transform duration-200 hover:scale-105">
            <img src={logo} alt="NICE logo" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <p className="font-old-english text-brand-primary text-xl md:text-3xl">
  Nigerian Institution <br className="hidden md:block" /> of Civil Engineers
</p>

              <p className="text-xs text-brand-gold/80 tracking-wide">23rd International Conference</p>
              <p className="font-semibold bg-gradient-to-r from-brand-primary to-brand-red bg-clip-text text-transparent">Kano 2025 Conference & AGM</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-4">
            <NavLink 
              to="/" 
              className={({ isActive }) =>
                `relative px-3 py-2 rounded-md transition-all duration-200 hover:bg-brand-primary/10 ${isActive ? "text-brand-primary font-medium bg-brand-primary/5" : "text-foreground hover:text-brand-primary"}`
              }
            >
              Home
            </NavLink>
            
            <NavigationMenu>
              <NavigationMenuList>
                {navigationGroups.map((group) => (
                  <NavigationMenuItem key={group.label}>
                    <NavigationMenuTrigger className="text-foreground hover:text-brand-primary hover:bg-brand-primary/10 data-[state=open]:bg-brand-primary/10 data-[state=open]:text-brand-primary">
                      {group.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[400px] bg-card border border-brand-primary/20 shadow-xl">
                        {group.items.map((item) => (
                          <NavigationMenuLink key={item.to} asChild>
                            <Link
                              to={item.to}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-primary/10 hover:text-brand-primary focus:bg-brand-primary/10 focus:text-brand-primary group"
                            >
                              <div className="text-sm font-medium leading-none group-hover:text-brand-primary">{item.label}</div>
                              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground group-hover:text-brand-primary/70">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <NavLink 
                      to="/contact" 
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-md transition-all duration-200 hover:bg-brand-primary/10 ${isActive ? "text-brand-primary font-medium bg-brand-primary/5" : "text-foreground hover:text-brand-primary"}`
                      }
                    >
                      Contact
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-3">
            <MobileMenu />
            <Button asChild variant="professional" size="sm">
              <a href={REG_FORM} target="_blank" rel="noreferrer">
                Register Now
              </a>
            </Button>
            <Button asChild variant="cultural" size="sm" className="hidden md:inline-flex">
              <Link to="/sponsorships">Sponsor Us</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-brand-green/20 py-12 bg-brand-green text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="NICE logo" className="h-12 w-auto" />
                <div>
                  <p className="text-xs font-old-english tracking-wider text-white/80 uppercase">
                    NIGERIAN INSTITUTION OF CIVIL ENGINEERS
                  </p>
                  <p className="text-xs text-brand-gold tracking-wide">23rd International Conference</p>
                  <p className="font-semibold text-white">
                    Kano 2025 Conference & AGM
                  </p>
                </div>
              </div>
              <p className="text-sm text-white/70 max-w-md">
                Sustaining the world's infrastructure through excellence in civil engineering. Join us in Kano for an inspiring conference focused on innovation and sustainability.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4 border-b border-white/20 pb-2">Event Information</h4>
              <ul className="grid gap-3 text-sm">
                <li>
                  <Link to="/program" className="flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors group">
                    <span className="w-1 h-1 bg-brand-gold rounded-full group-hover:scale-150 transition-transform"></span>
                    Program Schedule
                  </Link>
                </li>
                <li>
                  <Link to="/speakers" className="flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors group">
                    <span className="w-1 h-1 bg-brand-gold rounded-full group-hover:scale-150 transition-transform"></span>
                    Featured Speakers
                  </Link>
                </li>
                <li>
                  <Link to="/location" className="flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors group">
                    <span className="w-1 h-1 bg-brand-gold rounded-full group-hover:scale-150 transition-transform"></span>
                    Venue & Location
                  </Link>
                </li>
                <li>
                  <Link to="/hotels-travel" className="flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors group">
                    <span className="w-1 h-1 bg-brand-gold rounded-full group-hover:scale-150 transition-transform"></span>
                    Hotels & Travel
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4 border-b border-white/20 pb-2">Get Involved</h4>
              <ul className="grid gap-3 text-sm">
                <li>
                  <a href={REG_FORM} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors group">
                    <span className="w-1 h-1 bg-brand-gold rounded-full group-hover:scale-150 transition-transform"></span>
                    Register Now
                  </a>
                </li>
                <li>
                  <Link to="/sponsorships" className="flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors group">
                    <span className="w-1 h-1 bg-brand-gold rounded-full group-hover:scale-150 transition-transform"></span>
                    Become a Sponsor
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors group">
                    <span className="w-1 h-1 bg-brand-gold rounded-full group-hover:scale-150 transition-transform"></span>
                    About KANO 2025
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors group">
                    <span className="w-1 h-1 bg-brand-gold rounded-full group-hover:scale-150 transition-transform"></span>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/70">
              © {new Date().getFullYear()} Nigerian Institution of Civil Engineers. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/70">Follow the conference:</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}