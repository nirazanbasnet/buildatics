"use client";

import { Check, FileText, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { BrochureDetailStatus } from "../_data";

type Props = {
  onStatusChange: (status: BrochureDetailStatus) => void;
  className?: string;
};

export function BrochureDetailActions({ onStatusChange, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Button
        variant="secondary"
        className="h-10 justify-center gap-2"
        onClick={() => {
          onStatusChange("sent");
          toast.success("Brochure marked as sent");
        }}
      >
        <Check className="size-4" />
        Mark as Sent
      </Button>
      <Button
        variant="secondary"
        className="h-10 justify-center gap-2"
        onClick={() => toast.success("Generating PDF…")}
      >
        <FileText className="size-4" />
        Generate PDF
      </Button>
      <Button
        variant="secondary"
        className="h-10 justify-center gap-2"
        onClick={() => toast.success("Opening mail composer…")}
      >
        <Mail className="size-4" />
        Send Mail
      </Button>
      <Button
        className="h-10 justify-center gap-2"
        onClick={() => toast.success("Calling client…")}
      >
        <Phone className="size-4" />
        Call Client
      </Button>
    </div>
  );
}
