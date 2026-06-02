import { MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { detailDescription } from "../_data";
import type { Property } from "../../display-center/_data";

export function DetailHeader({ property }: { property: Property }) {
  return (
    <Card className="gap-1 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">{property.title}</h2>
          <p className="text-muted-foreground text-sm">{detailDescription}</p>
        </div>
        <Button size="icon" variant="outline" aria-label="More actions" className="size-8 shrink-0">
          <MoreVertical className="size-4" />
        </Button>
      </div>
    </Card>
  );
}
