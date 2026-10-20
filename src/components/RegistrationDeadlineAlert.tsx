import { Ticket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function RegistrationDeadlineAlert() {
  return <section role="alert" className="border-b border-accent/40 bg-accent/10">
    <div className="container mx-auto py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <Ticket className="h-6 w-6 text-accent shrink-0" />
      <div className="flex-1">
        <p className="font-semibold text-foreground">Conference registration is closed</p>
        <p className="text-sm text-foreground">Registration for the 24th International Civil Engineering Conference & AGM, 20–22 October 2026, has closed. Registered delegates can find support, tours, hotels and more in the Delegate Hub.</p>
      </div>
      <Button asChild className="shrink-0"><Link to="/registration">Delegate Hub <ArrowRight className="h-4 w-4" /></Link></Button>
    </div>
  </section>;
}
