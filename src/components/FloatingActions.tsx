import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Ticket, Handshake, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function FloatingActions() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) < 8) return;
      if (y < 80) {
        setVisible(true);
      } else if (delta > 0) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed right-2 sm:right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 pointer-events-none transition-all duration-300 ${
        visible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"
      }`}
    >
      <Link
        to="/registration"
        aria-label="Register Now"
        className="pointer-events-auto flex items-center gap-2 rounded-full bg-brand-primary/85 hover:bg-brand-primary text-white backdrop-blur-md shadow-lg border border-white/20 px-3 py-2.5 text-xs sm:text-sm font-semibold transition-all"
      >
        <Ticket className="h-4 w-4 shrink-0" />
        <span>Register</span>
      </Link>

      <Link
        to="/sponsorships"
        aria-label="Sponsor Us"
        className="pointer-events-auto flex items-center gap-2 rounded-full bg-brand-yellow/85 hover:bg-brand-yellow text-brand-primary backdrop-blur-md shadow-lg border border-white/20 px-3 py-2.5 text-xs sm:text-sm font-semibold transition-all"
      >
        <Handshake className="h-4 w-4 shrink-0" />
        <span>Sponsor</span>
      </Link>

      <button
        onClick={toggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="pointer-events-auto self-end flex items-center justify-center rounded-full bg-background/70 hover:bg-background text-foreground backdrop-blur-md shadow-lg border border-border/60 h-10 w-10 transition-all"
      >
        {isDark ? <Sun className="h-4 w-4 text-accent" /> : <Moon className="h-4 w-4 text-primary" />}
      </button>
    </div>
  );
}
