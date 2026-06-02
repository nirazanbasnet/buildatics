"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

import {
  blockOptions,
  countActiveFilters,
  countOptions,
  garageOptions,
  makeDefaultFilters,
  type AreaBounds,
  type DesignFilterState
} from "../../lib/filter";

type DesignFilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: DesignFilterState;
  onApply: (next: DesignFilterState) => void;
  areaBounds: AreaBounds;
};

// Controlled filter sheet: edits a local draft and lifts the result up via onApply on "Apply Filters".
export function DesignFilterSheet({
  open,
  onOpenChange,
  value,
  onApply,
  areaBounds
}: DesignFilterSheetProps) {
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
        <SheetDescription className="sr-only">
          Filter designs by house area, block size, bedrooms, bathrooms and garage.
        </SheetDescription>
        <FilterContent
          hideHeader
          value={value}
          open={open}
          areaBounds={areaBounds}
          onCancel={close}
          onApply={(next) => {
            onApply(next);
            close();
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

type FilterContentProps = {
  value: DesignFilterState;
  open: boolean;
  areaBounds: AreaBounds;
  onCancel: () => void;
  onApply: (next: DesignFilterState) => void;
  hideHeader?: boolean;
  className?: string;
};

function FilterContent({
  value,
  open,
  areaBounds,
  onCancel,
  onApply,
  hideHeader,
  className
}: FilterContentProps) {
  const [draft, setDraft] = useState<DesignFilterState>(value);
  const activeCount = countActiveFilters(draft, areaBounds);
  const [areaMin, areaMax] = areaBounds;
  const areaStep = areaMax - areaMin > 100 ? 1 : 0.1;

  // Re-sync the draft with the applied filters whenever the sheet (re)opens.
  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  function update<K extends keyof DesignFilterState>(key: K, next: DesignFilterState[K]) {
    setDraft((prev) => ({ ...prev, [key]: next }));
  }

  function reset() {
    setDraft(makeDefaultFilters(areaBounds));
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
            <SliderTooltip value={draft.houseArea[1]} min={areaMin} max={areaMax} />
            <Slider
              min={areaMin}
              max={areaMax}
              step={areaStep}
              value={draft.houseArea}
              onValueChange={(v) => update("houseArea", v as [number, number])}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="bg-muted text-muted-foreground rounded-md px-2 py-1 text-xs font-medium">
              {areaMin.toFixed(1)} sq
            </span>
            <span className="bg-muted text-muted-foreground rounded-md px-2 py-1 text-xs font-medium">
              {areaMax.toFixed(1)} sq
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
          <Button size="sm" onClick={() => onApply(draft)}>
            Apply Filters{activeCount > 0 ? ` (${activeCount})` : ""}
          </Button>
        </div>
      </div>
    </div>
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
