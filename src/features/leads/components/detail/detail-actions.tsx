import { CalendarDays, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { LeadOwner } from "../../lib/lead-detail-types";

type DetailActionsProps = {
  owner?: LeadOwner;
};

// Quick actions sidebar. Call/Mail link to the primary contact when available.
export function DetailActions({ owner }: DetailActionsProps) {
  const phone = owner && owner.phone !== "—" ? owner.phone : "";
  const email = owner && owner.email !== "—" ? owner.email : "";

  return (
    <div className="flex flex-col gap-2">
      <Button
        asChild={Boolean(phone)}
        disabled={!phone}
        className="h-10 justify-center gap-2 rounded-lg"
      >
        {phone ? (
          <a href={`tel:${phone}`}>
            <Phone className="size-4" />
            Call Client
          </a>
        ) : (
          <span>
            <Phone className="size-4" />
            Call Client
          </span>
        )}
      </Button>
      <Button
        asChild={Boolean(email)}
        disabled={!email}
        variant="secondary"
        className="h-10 justify-center gap-2 rounded-lg"
      >
        {email ? (
          <a href={`mailto:${email}`}>
            <Mail className="size-4" />
            Send Mail
          </a>
        ) : (
          <span>
            <Mail className="size-4" />
            Send Mail
          </span>
        )}
      </Button>
      <Button
        variant="secondary"
        className="h-10 justify-center gap-2 rounded-lg"
      >
        <CalendarDays className="size-4" />
        Schedule Meeting
      </Button>
    </div>
  );
}
