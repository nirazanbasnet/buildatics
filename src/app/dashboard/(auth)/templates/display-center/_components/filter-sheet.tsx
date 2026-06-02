"use client";

import { useState } from "react";
import { ChevronLeft, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

import { FilterContentV2 } from "./filter-content-v2";
import type { FilterVariantId } from "../../display-center-filter/_components/variants";

type FilterState = {
  houseArea: [number, number];
  minBlockDepth: string;
  minBlockWidth: string;
  bedrooms: string;
  baths: string;
  garage: string;
};

const AREA_MIN = 15.5;
const AREA_MAX = 99.6;

const DEFAULTS: FilterState = {
  houseArea: [AREA_MIN, 77.5],
  minBlockDepth: "all",
  minBlockWidth: "12.5",
  bedrooms: "3",
  baths: "3",
  garage: "all"
};

const blockOptions = [
  { value: "all", label: "All" },
  { value: "8.5", label: "8.5m" },
  { value: "10.5", label: "10.5m" },
  { value: "12.5", label: "12.5m" }
];

const countOptions = [
  { value: "all", label: "All" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4+", label: "4+" }
];

const garageOptions = [
  { value: "all", label: "All" },
  { value: "single", label: "Single" },
  { value: "double", label: "Double" }
];

function countActive(state: FilterState): number {
  let n = 0;
  if (state.houseArea[0] !== AREA_MIN || state.houseArea[1] !== AREA_MAX) n++;
  if (state.minBlockDepth !== "all") n++;
  if (state.minBlockWidth !== "all") n++;
  if (state.bedrooms !== "all") n++;
  if (state.baths !== "all") n++;
  if (state.garage !== "all") n++;
  return n;
}

type FilterContentProps = {
  onCancel?: () => void;
  onApply?: () => void;
  /** When true, renders without the top "Filter" header (caller already has a header). */
  hideHeader?: boolean;
  className?: string;
};

export function FilterContent({ onCancel, onApply, hideHeader, className }: FilterContentProps) {
  const [draft, setDraft] = useState<FilterState>(DEFAULTS);
  const activeCount = countActive(draft);

  function update<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function reset() {
    setDraft(DEFAULTS);
  }

  return (
    <div className={cn("flex h-full flex-col overflow-hidden", className)}>
      {!hideHeader ? (
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Filter</h2>
        </div>
      ) : null}

      <div className="h-full flex-1 space-y-6 overflow-y-auto px-4 py-5 md:px-6">
        <Section label="House Area">
          <div className="relative pt-8">
            <SliderTooltip value={draft.houseArea[1]} min={AREA_MIN} max={AREA_MAX} />
            <Slider
              min={AREA_MIN}
              max={AREA_MAX}
              step={0.1}
              value={draft.houseArea}
              onValueChange={(v) => update("houseArea", v as [number, number])}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="bg-muted text-muted-foreground rounded-md px-2 py-1 text-xs font-medium">
              {AREA_MIN.toFixed(1)} sq
            </span>
            <span className="bg-muted text-muted-foreground rounded-md px-2 py-1 text-xs font-medium">
              {AREA_MAX.toFixed(1)} sq
            </span>
          </div>
        </Section>

        <Divider />

        <Section label="Min Block Depth">
          <PillToggleGroup
            value={draft.minBlockDepth}
            onValueChange={(v) => v && update("minBlockDepth", v)}
            options={blockOptions}
          />
        </Section>

        <Divider />

        <Section label="Min Block Width">
          <PillToggleGroup
            value={draft.minBlockWidth}
            onValueChange={(v) => v && update("minBlockWidth", v)}
            options={blockOptions}
          />
        </Section>

        <Divider />

        <Section label="Bedrooms">
          <PillToggleGroup
            value={draft.bedrooms}
            onValueChange={(v) => v && update("bedrooms", v)}
            options={countOptions}
          />
        </Section>

        <Divider />

        <Section label="Baths">
          <PillToggleGroup
            value={draft.baths}
            onValueChange={(v) => v && update("baths", v)}
            options={countOptions}
          />
        </Section>

        <Divider />

        <Section label="Garage">
          <PillToggleGroup
            value={draft.garage}
            onValueChange={(v) => v && update("garage", v)}
            options={garageOptions}
          />
        </Section>
      </div>

      <div className="bg-background sticky bottom-0 z-10 flex items-center justify-between gap-2 border-t px-4 py-4 md:px-6">
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button size="sm" onClick={onApply}>
            Apply Filters{activeCount > 0 ? ` (${activeCount})` : ""}
          </Button>
        </div>
      </div>
    </div>
  );
}

type FilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: FilterVariantId;
};

export function FilterSheet({ open, onOpenChange, variant = "v1" }: FilterSheetProps) {
  const Content = variant === "v2" ? FilterContentV2 : FilterContent;
  const close = () => onOpenChange(false);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="flex flex-row items-center justify-between gap-2 border-b px-4 py-3 md:px-6 md:py-4">
          <Button variant="ghost" size="sm" onClick={close} className="-ml-2 gap-1 p-0! md:hidden">
            <ChevronLeft className="size-5" />
            Back
          </Button>
          <SheetTitle className="text-base font-semibold">Filter</SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={close}
            aria-label="Close"
            className="p-0! md:hidden"
          >
            <X className="size-5" />
          </Button>
        </SheetHeader>
        <Content hideHeader onCancel={close} onApply={close} />
      </SheetContent>
    </Sheet>
  );
}

function SliderTooltip({ value, min, max }: { value: number; min: number; max: number }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div
      className="bg-foreground text-background pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-md px-2 py-1 text-xs leading-none font-medium whitespace-nowrap shadow-sm transition-[left] duration-100"
      style={{ left: `${pct}%` }}
    >
      {value.toFixed(1)} sq
      <div className="bg-foreground absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45" />
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <Label className="text-foreground text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="border-border border-t" />;
}

function PillToggleGroup({
  value,
  onValueChange,
  options
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={onValueChange}
      className="flex flex-wrap"
    >
      {options.map((opt) => (
        <ToggleGroupItem
          key={opt.value}
          value={opt.value}
          variant="outline"
          className={cn(
            "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary h-9 rounded-md px-4 text-sm transition-colors"
          )}
        >
          {opt.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
