"use client";

import { Card } from "@/components/ui/card";

import { DetailHeader } from "./detail-header";
import { DetailStats } from "./detail-stats";
import { DetailOwners } from "./detail-owners";
import { TabLayout } from "./tab-layout";
import type { LeadOverview } from "../../lib/lead-detail-types";

type OverviewTabProps = {
  overview: LeadOverview;
  onEdit: () => void;
  onStatusChange: (status: number) => void;
};

export function OverviewTab({
  overview,
  onEdit,
  onStatusChange,
}: OverviewTabProps) {
  return (
    <TabLayout overview={overview}>
      <div className="flex flex-col gap-4">
        <DetailHeader
          overview={overview}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
        <DetailStats overview={overview} />
        {overview.owners.length > 0 ? (
          <DetailOwners owners={overview.owners} />
        ) : null}
        {overview.developer !== "—" ? (
          <Card className="flex-row items-center justify-between gap-4 p-5">
            <span className="text-muted-foreground text-sm">Developer</span>
            <span className="text-foreground text-sm font-medium">
              {overview.developer}
            </span>
          </Card>
        ) : null}
        {overview.notes ? (
          <Card className="gap-2 p-5">
            <h3 className="text-foreground text-base font-semibold">Notes</h3>
            <p className="text-foreground text-sm whitespace-pre-wrap">
              {overview.notes}
            </p>
          </Card>
        ) : null}
      </div>
    </TabLayout>
  );
}
