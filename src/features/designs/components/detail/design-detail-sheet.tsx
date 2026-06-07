"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  ArrowLeft,
  ArrowRight,
  MoreVertical,
  Plus,
  Share2,
  Trash2,
  ZoomIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@src/components/animated-section";
import { SegmentedNav } from "@src/components/ui/segmented-nav";
import { SheetMobileBar } from "@src/components/ui/sheet-mobile-bar";

import type { DesignProperty } from "../../types";
import {
  availableFacades,
  detailDescription,
  detailRooms,
  detailSpecs,
  detailTabItems,
  detailTabs,
  type DetailTab,
} from "../../lib/detail-static-data";

type DesignDetailSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  design: DesignProperty;
};

export function DesignDetailSheet({
  open,
  onOpenChange,
  design,
}: DesignDetailSheetProps) {
  const close = () => onOpenChange(false);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full overflow-y-auto p-0 sm:max-w-3xl lg:max-w-234"
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>{design.title} details</SheetTitle>
            <SheetDescription>Detail view for {design.title}</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <SheetMobileBar onClose={close} title={design.title} />
        <div className="p-4 sm:p-6">
          <DetailLayout design={design} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DetailLayout({
  design,
  className,
}: {
  design: DesignProperty;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState<DetailTab>(detailTabs[0]);

  return (
    <div className={cn("space-y-5", className)}>
      <AnimatedSection>
        <SegmentedNav
          items={detailTabItems}
          value={activeTab}
          onValueChange={setActiveTab}
          ariaLabel="Detail views"
        />
      </AnimatedSection>
      <AnimatedSection delay={0.04}>
        <DetailHeader design={design} />
      </AnimatedSection>
      <AnimatedSection delay={0.08}>
        <div className="grid gap-4 lg:grid-cols-[5fr_4fr]">
          <FloorPlanPanel design={design} />
          <div className="space-y-3">
            <SpecificationsTable />
            <RoomDimensionsTable />
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection delay={0.12}>
        <AvailableFacades design={design} />
      </AnimatedSection>
    </div>
  );
}

function DetailHeader({ design }: { design: DesignProperty }) {
  return (
    <Card className="gap-1 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">
            {design.title}
          </h2>
          <p className="text-muted-foreground text-sm">{detailDescription}</p>
        </div>
        <Button
          size="icon"
          variant="outline"
          aria-label="More actions"
          className="size-8 shrink-0"
        >
          <MoreVertical className="size-4" />
        </Button>
      </div>
    </Card>
  );
}

function FloorPlanPanel({
  design,
  className,
  children,
}: {
  design: DesignProperty;
  className?: string;
  children?: ReactNode;
}) {
  const brandTag = design.brand.slice(0, 3).toUpperCase();

  return (
    <div
      className={cn(
        "group bg-card relative min-h-72 overflow-hidden rounded-xl border",
        className,
      )}
    >
      <Image
        src={design.floorPlan}
        alt={`${design.title} floor plan`}
        width={900}
        height={560}
        className="bg-muted h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 dark:bg-stone-100"
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

function SpecificationsTable({
  className,
  headerClassName,
}: {
  className?: string;
  headerClassName?: string;
}) {
  return (
    <Card className={cn("gap-0 p-0", className)}>
      <div
        className={cn(
          "bg-muted/40 flex items-center justify-between border-b px-4 py-2.5",
          headerClassName,
        )}
      >
        <h3 className="font-display text-base">Specifications</h3>
      </div>
      <div className="divide-y">
        {detailSpecs.map((spec) => (
          <div
            key={spec.label}
            className="hover:bg-accent/30 flex items-center justify-between px-4 py-2 text-sm transition-colors"
          >
            <span>{spec.label}</span>
            <span className="text-muted-foreground font-display text-sm">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RoomDimensionsTable({
  className,
  headerClassName,
}: {
  className?: string;
  headerClassName?: string;
}) {
  return (
    <Card className={cn("gap-0 p-0", className)}>
      <div
        className={cn(
          "bg-muted/40 flex items-center justify-between border-b px-4 py-2.5",
          headerClassName,
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
            <span className="text-muted-foreground font-display text-sm">
              {room.size}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AvailableFacades({
  design,
  className,
  cardClassName,
}: {
  design: DesignProperty;
  className?: string;
  cardClassName?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const brandTag = design.brand.slice(0, 3).toUpperCase();

  function scrollBy(delta: number) {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <section className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Available Facades</h3>
        <div className="flex items-center gap-2">
          <Button size="sm">
            <Plus className="size-4" />
            Add Facade
          </Button>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="outline"
              aria-label="Previous facade"
              onClick={() => scrollBy(-300)}
              className="size-8 transition-transform active:scale-95"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              aria-label="Next facade"
              onClick={() => scrollBy(300)}
              className="size-8 transition-transform active:scale-95"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 pb-1"
      >
        {availableFacades.map((facade) => (
          <div
            key={facade.id}
            className={cn(
              "group bg-card relative w-72 shrink-0 snap-start overflow-hidden rounded-xl border transition-shadow hover:shadow-md",
              cardClassName,
            )}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={facade.image}
                alt={facade.label}
                width={600}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
                  aria-label="Zoom"
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
                aria-label="Delete facade"
                className="absolute right-3 bottom-3 size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
