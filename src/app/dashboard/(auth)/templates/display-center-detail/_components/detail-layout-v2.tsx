"use client";

import { AnimatedSection } from "@src/components/animated-section";

import { useState } from "react";

import { SegmentedNav } from "@src/components/ui/segmented-nav";
import { cn } from "@/lib/utils";

import type { Property } from "../../display-center/_data";
import { detailTabItems, detailTabs, type DetailTab } from "../_data";

import { AvailableFacades } from "./available-facades";
import { DetailHeader } from "./detail-header";
import { FloorPlanPanel } from "./floor-plan-panel";
import { RoomDimensionsTable } from "./room-dimensions-table";
import { SpecificationsTable } from "./specifications-table";

export function DetailLayoutV2({
  property,
  className,
}: {
  property: Property;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState<DetailTab>(detailTabs[0]);

  return (
    <div className={cn("grid gap-5 lg:grid-cols-[180px_1fr]", className)}>
      <AnimatedSection>
        <SegmentedNav
          items={detailTabItems}
          value={activeTab}
          onValueChange={setActiveTab}
          ariaLabel="Detail views"
        />
      </AnimatedSection>
      <div className="space-y-5">
        <AnimatedSection delay={0.04}>
          <DetailHeader property={property} />
        </AnimatedSection>
        <AnimatedSection delay={0.08}>
          <div className="grid gap-4 lg:grid-cols-[5fr_4fr]">
            <FloorPlanPanel property={property} />
            <div className="space-y-3">
              <SpecificationsTable />
              <RoomDimensionsTable />
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.12}>
          <AvailableFacades property={property} />
        </AnimatedSection>
      </div>
    </div>
  );
}
