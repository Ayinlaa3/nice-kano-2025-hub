import { AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function RegistrationDeadlineAlert() {
  return <section role="alert" className="border-b border-destructive/40 bg-destructive/10">
    <div className="container mx-auto py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
      <div className="flex-1">
        <p className="font-semibold text-foreground">Registration closes Wednesday, 14 October 2026</p>
        <p className="text-sm text-foreground">Registration will not be entertained during the conference. Complete your registration before the deadline.</p>
      </div>
      <Button asChild variant="destructive" className="shrink-0"><Link to="/registration">Register Now <ArrowRight className="h-4 w-4" /></Link></Button>
    </div>
  </section>;
}