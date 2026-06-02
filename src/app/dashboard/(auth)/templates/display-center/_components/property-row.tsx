import Image from "next/image";
import { Clock, Maximize2, Plus, Share2, ZoomIn } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { Property, PropertyView } from "../_data";
import { PropertyStats } from "./property-card";
import { cn } from "@/lib/utils";

export function PropertyRow({
  property,
  view = "facade"
}: {
  property: Property;
  view?: PropertyView;
}) {
  const src = view === "floor" ? property.floorPlan : property.facade;
  return (
    <Card className="gap-0 overflow-hidden p-0">
      <div className="grid gap-0 md:grid-cols-[5fr_7fr]">
        <div className="relative">
          <Image
            src={src}
            alt={`${property.title} ${view === "floor" ? "floor plan" : "facade"}`}
            width={900}
            height={560}
            className={cn("h-full min-h-56 w-full object-cover", view === "floor" && "bg-muted")}
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="bg-background/80 hover:bg-background size-8 rounded-full backdrop-blur"
            >
              <ZoomIn className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="bg-background/80 hover:bg-background size-8 rounded-full backdrop-blur"
            >
              <Share2 className="size-4" />
            </Button>
          </div>
          <Badge
            variant="secondary"
            className="bg-background text-foreground absolute bottom-3 left-3 rounded-full px-3 py-1 font-medium"
          >
            {property.brand}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-background text-foreground absolute right-3 bottom-3 gap-1 rounded-full px-3 py-1 font-medium"
          >
            <Clock className="size-3" />
            Version {property.version}
          </Badge>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                <Maximize2 className="size-4" />
                {property.width}W X {property.depth}D
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Button size="sm">
                <Plus className="size-4" />
                Add Lead
              </Button>
              <Badge variant="secondary" className="rounded-md">
                {property.squareFootage} sq
              </Badge>
            </div>
          </div>

          <Separator />

          <PropertyStats property={property} />
        </div>
      </div>
    </Card>
  );
}
