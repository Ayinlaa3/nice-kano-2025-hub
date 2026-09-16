import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarClock, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CONFERENCE, isEarlyBird } from "@/config/conference";

const STORAGE_KEY = "nice2026-early-bird-extension-seen";

const EarlyBirdAlert = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isEarlyBird()) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* storage unavailable — still show once */
    }
    const t = window.setTimeout(() => setOpen(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : dismiss())}>
      <DialogContent className="sm:max-w-lg border-accent/40">
        <DialogHeader>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Good news
          </div>
          <DialogTitle className="font-display text-3xl leading-tight">
            Early-bird registration extended
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            Early-bird rates for the {CONFERENCE.editionShort} International
            Conference &amp; AGM have been extended from{" "}
            <span className="line-through">15 September</span> to{" "}
            <span className="font-semibold text-foreground">
              25 September 2026
            </span>
            . Register before the new deadline to keep the discounted fee.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm">
          <CalendarClock className="h-5 w-5 shrink-0 text-accent" />
          <span>
            New deadline: <strong>Friday, 25 September 2026</strong> · Conference{" "}
            {CONFERENCE.dates.display}, {CONFERENCE.venue.city}
          </span>
        </div>

        <DialogFooter className="gap-2 sm:gap-3">
          <Button variant="outline" onClick={dismiss} className="sm:order-1">
            Continue Browsing
          </Button>
          <Button
            asChild
            onClick={dismiss}
            className="bg-gradient-eko text-white shadow-gold hover:opacity-95 sm:order-2"
          >
            <Link to={CONFERENCE.registrationPath}>Register Now</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EarlyBirdAlert;
