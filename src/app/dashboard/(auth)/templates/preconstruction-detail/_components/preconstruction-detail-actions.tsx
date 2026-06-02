import { CalendarDays, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PreconstructionDetailActions() {
  return (
    <div className="flex flex-col gap-2">
      <Button className="h-10 justify-center gap-2 rounded-lg">
        <Phone className="size-4" />
        Call Client
      </Button>
      <Button variant="secondary" className="h-10 justify-center gap-2 rounded-lg">
        <Mail className="size-4" />
        Send Mail
      </Button>
      <Button variant="secondary" className="h-10 justify-center gap-2 rounded-lg">
        <CalendarDays className="size-4" />
        Schedule Meeting
      </Button>
    </div>
  );
}
