"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import type { LeadRow } from "../../types";

type LeadDetailSheetProps = {
  lead: LeadRow | null;
  onOpenChange: (open: boolean) => void;
};

// Read-only "view" sheet for a lead, built from the row data already in the table.
export function LeadDetailSheet({ lead, onOpenChange }: LeadDetailSheetProps) {
  return (
    <Sheet open={lead !== null} onOpenChange={(o) => !o && onOpenChange(false)}>
      <SheetContent side="right" className="w-full gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>{lead?.leadNo ?? "Lead"}</SheetTitle>
          <SheetDescription>{lead?.client}</SheetDescription>
        </SheetHeader>
        {lead ? (
          <dl className="divide-y px-4">
            <Row label="Client" value={lead.client} />
            <Row label="Phone" value={lead.phone} />
            <Row label="Address" value={lead.address} />
            <Row label="Stage" value={lead.stage} />
            <Row label="Status" value={lead.status} />
            <Row label="Assigned" value={lead.assignee} />
            <Row label="Budget" value={lead.budget} />
          </dl>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
