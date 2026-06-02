"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

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

type Props = {
  onCancel?: () => void;
  onApply?: () => void;
  hideHeader?: boolean;
  className?: string;
};

export function FilterContentV2({ onCancel, onApply, hideHeader, className }: Props) {
  const [draft, setDraft] = useState<FilterState>(DEFAULTS);
  const activeCount = countActive(draft);

  function update<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function reset() {
    setDraft(DEFAULTS);
  }

  function summary(value: string, fallback = "Any") {
    return value === "all" ? fallback : value;
  }

  return (
    <div className={cn("flex h-full flex-col", className)}>
      {!hideHeader ? (
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Filter</h2>
        </div>
      ) : null}

      <div className="flex-1 overflow-y-auto px-3 py-3">
        <Accordion type="multiple" defaultValue={["house-area", "bedrooms"]} className="space-y-2">
          <FilterAccordionItem
            value="house-area"
            label="House Area"
            summary={`${draft.houseArea[0].toFixed(1)}–${draft.houseArea[1].toFixed(1)} sq`}
          >
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
          </FilterAccordionItem>

          <FilterAccordionItem
            value="block-depth"
            label="Min Block Depth"
            summary={summary(draft.minBlockDepth)}
          >
            <PillToggleGroup
              value={draft.minBlockDepth}
              onValueChange={(v) => v && update("minBlockDepth", v)}
              options={blockOptions}
            />
          </FilterAccordionItem>

          <FilterAccordionItem
            value="block-width"
            label="Min Block Width"
            summary={summary(draft.minBlockWidth)}
          >
            <PillToggleGroup
              value={draft.minBlockWidth}
              onValueChange={(v) => v && update("minBlockWidth", v)}
              options={blockOptions}
            />
          </FilterAccordionItem>

          <FilterAccordionItem value="bedrooms" label="Bedrooms" summary={summary(draft.bedrooms)}>
            <PillToggleGroup
              value={draft.bedrooms}
              onValueChange={(v) => v && update("bedrooms", v)}
              options={countOptions}
            />
          </FilterAccordionItem>

          <FilterAccordionItem value="baths" label="Baths" summary={summary(draft.baths)}>
            <PillToggleGroup
              value={draft.baths}
              onValueChange={(v) => v && update("baths", v)}
              options={countOptions}
            />
          </FilterAccordionItem>

          <FilterAccordionItem value="garage" label="Garage" summary={summary(draft.garage)}>
            <PillToggleGroup
              value={draft.garage}
              onValueChange={(v) => v && update("garage", v)}
              options={garageOptions}
            />
          </FilterAccordionItem>
        </Accordion>
      </div>

      <div className="bg-background flex items-center justify-between gap-2 border-t px-6 py-4">
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

function FilterAccordionItem({
  value,
  label,
  summary,
  children
}: {
  value: string;
  label: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem value={value} className="bg-card overflow-hidden rounded-md border last:border">
      <AccordionTrigger className="px-3 py-2 hover:no-underline">
        <div className="flex w-full items-center justify-between gap-2 pr-2">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-muted-foreground text-xs font-medium">{summary}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-3 pb-3">{children}</AccordionContent>
    </AccordionItem>
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
      className="flex-wrapb flex"
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
