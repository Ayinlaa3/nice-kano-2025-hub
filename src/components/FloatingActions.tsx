import { Link } from "react-router-dom";
import { Ticket, Handshake, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function FloatingActions() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 pointer-events-none">
      <Link
        to="/registration"
        aria-label="Register Now"
        className="pointer-events-auto group flex items-center gap-2 rounded-full bg-brand-primary/80 hover:bg-brand-primary text-white backdrop-blur-md shadow-lg border border-white/20 pl-3 pr-3 py-2.5 transition-all hover:pr-4"
      >
        <Ticket className="h-4 w-4 shrink-0" />
        <span className="hidden md:inline text-sm font-semibold">Register</span>
        <span className="md:hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[80px] group-focus:max-w-[80px]">
          Register
        </span>
      </Link>

      <Link
        to="/sponsorships"
        aria-label="Sponsor Us"
        className="pointer-events-auto group flex items-center gap-2 rounded-full bg-brand-yellow/80 hover:bg-brand-yellow text-brand-primary backdrop-blur-md shadow-lg border border-white/20 pl-3 pr-3 py-2.5 transition-all hover:pr-4"
      >
        <Handshake className="h-4 w-4 shrink-0" />
        <span className="hidden md:inline text-sm font-semibold">Sponsor</span>
        <span className="md:hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[80px] group-focus:max-w-[80px]">
          Sponsor
        </span>
      </Link>

      <button
        onClick={toggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="pointer-events-auto flex items-center justify-center rounded-full bg-background/70 hover:bg-background text-foreground backdrop-blur-md shadow-lg border border-border/60 h-10 w-10 transition-all"
      >
        {isDark ? <Sun className="h-4 w-4 text-accent" /> : <Moon className="h-4 w-4 text-primary" />}
      </button>
    </div>
  );
}
