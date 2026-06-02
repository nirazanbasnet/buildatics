"use client";

import { CalendarDays, Mail, Phone, RefreshCw, Send, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { QuotationDetailStatus } from "../_data";

type Props = {
  onStatusChange: (status: QuotationDetailStatus) => void;
  onCreateRevision: () => void;
  className?: string;
};

export function QuotationDetailActions({ onStatusChange, onCreateRevision, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          className="h-10 justify-center gap-2"
          onClick={() => {
            onStatusChange("sent");
            toast.success("Quotation marked as sent");
          }}
        >
          <Send className="size-4" />
          Mark Sent
        </Button>
        <Button
          variant="outline"
          className="h-10 justify-center gap-2"
          onClick={() => {
            onStatusChange("declined");
            toast.error("Quotation marked as declined");
          }}
        >
          <X className="size-4" />
          Mark Declined
        </Button>
      </div>
      <Button
        variant="outline"
        className="h-10 justify-center gap-2"
        onClick={() => {
          onCreateRevision();
          toast.success("New revision created");
        }}
      >
        <RefreshCw className="size-4" />
        Create Revision
      </Button>
      <Button
        className="h-10 justify-center gap-2"
        onClick={() => toast.success("Calling client…")}
      >
        <Phone className="size-4" />
        Call Client
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
        variant="secondary"
        className="h-10 justify-center gap-2"
        onClick={() => toast.success("Opening scheduler…")}
      >
        <CalendarDays className="size-4" />
        Schedule Meeting
      </Button>
    </div>
  );
}
