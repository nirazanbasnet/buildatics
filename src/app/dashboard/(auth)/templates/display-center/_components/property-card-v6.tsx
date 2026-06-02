"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Bath, BedDouble, Car, Maximize2, Share2, Sofa, ZoomIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import type { Property, PropertyView } from "../_data";

type Props = {
  property: Property;
  view?: PropertyView;
  index?: number;
};

export function PropertyCardV6({ property, view = "facade", index = 0 }: Props) {
  const src = view === "floor" ? property.floorPlan : property.facade;
  const brandTag = property.brand.slice(0, 3).toUpperCase();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
    >
      <Card className="group gap-0 overflow-hidden p-0 transition duration-300 hover:-translate-y-1.5 hover:shadow-lg">
        <div className="relative">
          <Image
            src={src}
            alt={`${property.title} ${view === "floor" ? "floor plan" : "facade"}`}
            width={900}
            height={560}
            className={cn(
              "h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105",
              view === "floor" && "bg-muted dark:bg-stone-100"
            )}
          />
          <span
            data-slot="brand-tag"
            className="absolute right-3 bottom-3 rounded-sm bg-black/50 px-2 py-1 text-xs font-medium tracking-wider text-white backdrop-blur"
          >
            {brandTag} · V{property.version}
          </span>
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70"
            >
              <ZoomIn className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70"
            >
              <Share2 className="size-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4 p-4">
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight tabular-nums">
                {property.squareFootage}
              </span>
              <span className="text-muted-foreground text-sm">sq</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <Maximize2 className="size-3.5" />
              <span>
                {property.width}m × {property.depth}m
              </span>
            </div>
          </div>

          <h3 className="text-base font-semibold">{property.title}</h3>

          <div className="border-border flex items-center rounded-md border px-1 py-1.5">
            <SpecChip icon={BedDouble} value={property.beds} label="bed" />
            <Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />
            <SpecChip icon={Bath} value={property.baths} label="bath" />
            <Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />
            <SpecChip icon={Sofa} value={property.living} />
            <Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />
            <SpecChip icon={Car} value={property.garage} />
          </div>

          <Button className="w-full">
            View design
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

function SpecChip({
  icon: Icon,
  value,
  label
}: {
  icon: typeof BedDouble;
  value: number;
  label?: string;
}) {
  return (
    <div className="flex flex-1 items-center justify-center gap-1.5 px-2 text-sm">
      <Icon className="text-muted-foreground size-4" />
      <span className="font-semibold tabular-nums">{value}</span>
      {label ? <span className="text-muted-foreground">{label}</span> : null}
    </div>
  );
}
