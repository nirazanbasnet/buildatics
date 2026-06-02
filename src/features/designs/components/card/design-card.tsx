"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Bath, BedDouble, Car, Share2, Sofa, ZoomIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { DesignDetailSheet } from "../detail/design-detail-sheet";
import { BLUR_DATA_URL } from "../../lib/blur-placeholder";
import type { DesignProperty, DesignView } from "../../types";

type DesignCardProps = {
  design: DesignProperty;
  view?: DesignView;
  index?: number;
  detailEnabled?: boolean;
};

function stop(e: React.MouseEvent) {
  e.stopPropagation();
}

export function DesignCard({ design, view = "facade", index = 0, detailEnabled }: DesignCardProps) {
  const [open, setOpen] = useState(false);
  const src = view === "floor" ? design.floorPlan : design.facade;
  const brandTag = design.brand.slice(0, 3).toUpperCase();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
    >
      <Card
        onClick={detailEnabled ? () => setOpen(true) : undefined}
        role={detailEnabled ? "button" : undefined}
        tabIndex={detailEnabled ? 0 : undefined}
        onKeyDown={
          detailEnabled
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpen(true);
                }
              }
            : undefined
        }
        className={cn(
          "group h-full gap-0 overflow-hidden p-0 transition duration-300 hover:-translate-y-1.5 hover:shadow-lg",
          detailEnabled && "focus-visible:ring-ring cursor-pointer focus-visible:ring-2"
        )}
      >
        <div className="relative">
          <Image
            src={src}
            alt={`${design.title} ${view === "floor" ? "floor plan" : "facade"}`}
            width={900}
            height={560}
            // First row is above the fold — prioritise to satisfy the LCP hint.
            priority={index < 3}
            // Blurred LQIP while the remote preview loads, then sharpens in.
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className={cn(
              "h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105",
              view === "floor" && "bg-muted dark:bg-stone-100"
            )}
          />
          <span
            data-slot="brand-tag"
            className="absolute top-3 left-3 rounded-lg bg-black/50 px-3 py-1 text-xs font-medium tracking-wider text-white backdrop-blur"
          >
            {brandTag} · V{design.version}
          </span>
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={stop}
              className="size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70"
            >
              <ZoomIn className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={stop}
              className="size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70"
            >
              <Share2 className="size-4" />
            </Button>
          </div>
        </div>

        <div className="gap-4 p-4 sm:grid sm:grid-cols-5">
          <div className="col-span-2 mb-4 flex justify-between gap-3 sm:mb-0 sm:flex-col">
            <div>
              <h3 className="text-base font-semibold">{design.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm tabular-nums">
                {design.width}m × {design.depth}m
              </p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold tabular-nums">{design.squareFootage}</span>
              <span className="text-muted-foreground text-sm">sq</span>
            </div>
          </div>

          <div className="col-span-3 grid grid-cols-2 gap-2">
            <SpecTile icon={BedDouble} value={design.beds} label="beds" />
            <SpecTile icon={Bath} value={design.baths} label="baths" />
            <SpecTile icon={Sofa} value={design.living} label="living" />
            <SpecTile icon={Car} value={design.garage} label="garage" />
          </div>
        </div>
      </Card>

      {detailEnabled ? (
        <DesignDetailSheet open={open} onOpenChange={setOpen} design={design} />
      ) : null}
    </motion.div>
  );
}

function SpecTile({
  icon: Icon,
  value,
  label
}: {
  icon: typeof BedDouble;
  value: number;
  label: string;
}) {
  return (
    <div className="bg-muted flex shrink-0 items-center gap-2 rounded-md p-2">
      <Icon className="text-muted-foreground size-4 shrink-0" />
      <div className="flex flex-col leading-tight">
        <span className="font-bold tabular-nums">{value}</span>
        <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}
