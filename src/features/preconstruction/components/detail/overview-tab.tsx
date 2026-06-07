"use client";

import { Card } from "@/components/ui/card";

import { DetailHeader } from "./detail-header";
import { DetailStats } from "./detail-stats";
import { DetailOwners } from "./detail-owners";
import { DetailContacts } from "./detail-contacts";
import { TabLayout } from "./tab-layout";
import type { ProjectOverview } from "../../lib/detail-types";

type OverviewTabProps = {
  overview: ProjectOverview;
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
        <DetailContacts developer={overview.developer} onEdit={onEdit} />
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
