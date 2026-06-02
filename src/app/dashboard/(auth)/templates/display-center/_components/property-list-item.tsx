import Image from "next/image";
import { Bath, BedDouble, Car, Clock, Plus, Sofa } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Property, PropertyView } from "../_data";
import { cn } from "@/lib/utils";

export function PropertyListItem({
  property,
  view = "facade"
}: {
  property: Property;
  view?: PropertyView;
}) {
  const src = view === "floor" ? property.floorPlan : property.facade;
  return (
    <div className="hover:bg-accent/40 group bg-card flex items-center gap-4 rounded-lg border p-3 transition-colors">
      <div className="bg-muted relative size-20 shrink-0 overflow-hidden rounded-md dark:bg-stone-100">
        <Image
          src={src}
          alt={`${property.title} ${view === "floor" ? "floor plan" : "facade"}`}
          width={200}
          height={200}
          className={cn("h-full w-full", "object-cover")}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-semibold">{property.title}</h3>
          <Badge variant="outline" className="gap-1 rounded-full px-2 py-0 text-xs">
            <Clock className="size-3" />v{property.version}
          </Badge>
          <Badge variant="secondary" className="rounded-full px-2 py-0 text-xs">
            {property.brand}
          </Badge>
        </div>
        <p className="text-muted-foreground mt-0.5 text-xs">
          {property.width}W × {property.depth}D · {property.squareFootage} sq
        </p>
      </div>

      <div className="hidden items-center gap-4 text-sm md:flex">
        <CompactStat icon={BedDouble} value={property.beds} />
        <CompactStat icon={Bath} value={property.baths} />
        <CompactStat icon={Sofa} value={property.living} />
        <CompactStat icon={Car} value={property.garage} />
      </div>

      <Button size="sm" variant="outline" className="shrink-0">
        <Plus className="size-4" />
        Add Lead
      </Button>
    </div>
  );
}

function CompactStat({ icon: Icon, value }: { icon: typeof BedDouble; value: number }) {
  return (
    <div className="text-muted-foreground flex items-center gap-1">
      <Icon className="size-4" />
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
