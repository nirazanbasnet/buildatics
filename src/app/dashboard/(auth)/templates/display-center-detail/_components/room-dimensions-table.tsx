import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { detailRooms } from "../_data";

export function RoomDimensionsTable({
  className,
  headerClassName
}: {
  className?: string;
  headerClassName?: string;
}) {
  return (
    <Card className={cn("gap-0 p-0", className)}>
      <div
        className={cn(
          "bg-muted/40 flex items-center justify-between border-b px-4 py-2.5",
          headerClassName
        )}
      >
        <h3 className="font-display text-base">Room Dimensions</h3>
        <Button
          size="icon"
          aria-label="Add room"
          className="size-7 shrink-0 transition-transform active:scale-95"
        >
          <Plus className="size-4" />
        </Button>
      </div>
      <div className="divide-y">
        {detailRooms.map((room, i) => (
          <div
            key={i}
            className="hover:bg-accent/30 flex items-center justify-between px-4 py-2 text-sm transition-colors"
          >
            <span>{room.name}</span>
            <span className="text-muted-foreground font-display text-sm">{room.size}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
