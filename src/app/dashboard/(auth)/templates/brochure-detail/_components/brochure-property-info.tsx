"use client";

import { Car, Maximize2, MoveHorizontal, MoveVertical } from "lucide-react";

import { cn } from "@/lib/utils";

import type { BrochurePropertyInfo as PropertyInfo } from "../_data";
import { BrochureField } from "./brochure-field";

type Props = {
  property: PropertyInfo;
  onChange: (patch: Partial<PropertyInfo>) => void;
  className?: string;
};

const driveways: PropertyInfo["driveway"][] = ["right", "left"];

export function BrochurePropertyInfo({ property, onChange, className }: Props) {
  return (
    <section
      className={cn("bg-card rounded-2xl border p-5", className)}
      data-slot="brochure-property"
    >
      <h3 className="text-foreground text-base font-semibold">Property Information</h3>
      <div className="mt-5 flex flex-col gap-3">
        <BrochureField
          icon={MoveHorizontal}
          label="Land Width"
          type="number"
          value={property.landWidth}
          onChange={(value) => onChange({ landWidth: value })}
        />
        <BrochureField
          icon={MoveVertical}
          label="Land Depth"
          type="number"
          value={property.landDepth}
          onChange={(value) => onChange({ landDepth: value })}
        />
        <BrochureField
          icon={Maximize2}
          label="Land Area"
          type="number"
          value={property.landArea}
          onChange={(value) => onChange({ landArea: value })}
        />
        <div className="flex items-center gap-3">
          <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
            <Car className="size-4" />
          </span>
          <span className="text-foreground flex-1 text-sm font-medium">Driveway</span>
          <div className="bg-muted/60 flex gap-1 rounded-md p-0.5">
            {driveways.map((side) => {
              const isActive = property.driveway === side;
              return (
                <button
                  key={side}
                  type="button"
                  onClick={() => onChange({ driveway: side })}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm font-medium capitalize transition-colors",
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {side}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
