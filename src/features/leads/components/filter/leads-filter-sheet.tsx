"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

import { LEADS_FILTER_DEFAULTS } from "../../lib/filter";
import { statusLabel } from "../../lib/map-lead";
import type { LeadOptions, LeadsFilterState } from "../../types";

const STATUS_VALUES = [0, 1, 2, 3, 4, 5, 6];

type LeadsFilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: LeadsFilterState;
  onApply: (next: LeadsFilterState) => void;
  options: LeadOptions;
};

export function LeadsFilterSheet({
  open,
  onOpenChange,
  value,
  onApply,
  options
}: LeadsFilterSheetProps) {
  const [draft, setDraft] = useState<LeadsFilterState>(value);
  const close = () => onOpenChange(false);

  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  function update<K extends keyof LeadsFilterState>(key: K, next: LeadsFilterState[K]) {
    setDraft((prev) => ({ ...prev, [key]: next }));
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" showCloseButton={false} className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="flex flex-row items-center justify-between gap-2 border-b">
          <Button variant="ghost" size="sm" onClick={close} className="-ml-2 gap-1 p-0! md:hidden">
            <ChevronLeft className="size-5" />
            Back
          </Button>
          <SheetTitle className="text-base font-semibold">Filter</SheetTitle>
          <Button variant="ghost" size="icon" onClick={close} aria-label="Close" className="p-0! md:hidden">
            <X className="size-5" />
          </Button>
        </SheetHeader>
        <SheetDescription className="sr-only">
          Filter leads by search, pipeline stage, assignee and status.
        </SheetDescription>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5 md:px-6">
          <Section label="Search">
            <Input
              placeholder="Client, address or lead no"
              value={draft.search}
              onChange={(e) => update("search", e.target.value)}
            />
          </Section>

          <Section label="Pipeline stage">
            <FilterSelect
              value={draft.stageId}
              onValueChange={(v) => update("stageId", v)}
              allLabel="All stages"
              options={options.stages}
            />
          </Section>

          <Section label="Assigned">
            <FilterSelect
              value={draft.assignedUserId}
              onValueChange={(v) => update("assignedUserId", v)}
              allLabel="Anyone"
              options={options.staff}
            />
          </Section>

          <Section label="Status">
            <FilterSelect
              value={draft.status}
              onValueChange={(v) => update("status", v)}
              allLabel="All statuses"
              options={STATUS_VALUES.map((n) => ({ id: String(n), name: statusLabel(n) }))}
            />
          </Section>
        </div>

        <div className="bg-background sticky bottom-0 z-10 flex items-center justify-between gap-2 border-t px-4 py-4 md:px-6">
          <Button variant="ghost" size="sm" onClick={() => setDraft(LEADS_FILTER_DEFAULTS)}>
            Reset
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={close}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                onApply(draft);
                close();
              }}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-foreground text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}

function FilterSelect({
  value,
  onValueChange,
  allLabel,
  options
}: {
  value: string;
  onValueChange: (value: string) => void;
  allLabel: string;
  options: { id: string; name: string }[];
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{allLabel}</SelectItem>
        {options.map((o) => (
          <SelectItem key={o.id} value={o.id}>
            {o.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
