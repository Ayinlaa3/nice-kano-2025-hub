import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="rounded-full border border-border/60 hover:border-accent/60 hover:bg-accent/10 transition-all"
    >
      {isDark ? (
        <Sun className="h-[1.15rem] w-[1.15rem] text-accent" />
      ) : (
        <Moon className="h-[1.15rem] w-[1.15rem] text-primary" />
      )}
    </Button>
  );
}
