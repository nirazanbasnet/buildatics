import type { ReactNode } from "react";
import Image from "next/image";
import { Share2, Trash2, ZoomIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { Property } from "../../display-center/_data";

export function FloorPlanPanel({
  property,
  className,
  children
}: {
  property: Property;
  className?: string;
  children?: ReactNode;
}) {
  const brandTag = property.brand.slice(0, 3).toUpperCase();

  return (
    <div
      className={cn("group bg-card relative min-h-72 overflow-hidden rounded-xl border", className)}
    >
      <Image
        src={property.floorPlan}
        alt={`${property.title} floor plan`}
        width={900}
        height={560}
        className="bg-muted h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 dark:bg-stone-100"
      />

      <span
        data-slot="brand-tag"
        className="absolute top-3 left-3 rounded-lg bg-black/50 px-3 py-1 text-xs font-medium tracking-wider text-white backdrop-blur"
      >
        {brandTag} · V{property.version}
      </span>

      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <Button
          size="icon"
          variant="secondary"
          aria-label="Zoom in"
          className="size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70"
        >
          <ZoomIn className="size-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          aria-label="Share"
          className="size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70"
        >
          <Share2 className="size-4" />
        </Button>
      </div>

      <Button
        size="icon"
        variant="secondary"
        aria-label="Delete"
        className="absolute right-3 bottom-3 size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70"
      >
        <Trash2 className="size-4" />
      </Button>

      {children}
    </div>
  );
}
