"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ZoomIn } from "lucide-react";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { brochureDesignOptions, type BrochureAttachedDesign } from "../_data";

type Props = {
  designs: BrochureAttachedDesign[];
  design: string;
  onDesignChange: (value: string) => void;
  className?: string;
};

export function BrochureAttachedDesigns({ designs, design, onDesignChange, className }: Props) {
  return (
    <section
      className={cn("bg-card rounded-2xl border p-5", className)}
      data-slot="brochure-designs"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-foreground text-base font-semibold">Attached Designs</h3>
        <Select value={design} onValueChange={onDesignChange}>
          <SelectTrigger className="w-52" size="sm">
            <SelectValue placeholder="Choose New Design" />
          </SelectTrigger>
          <SelectContent>
            {brochureDesignOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {designs.map((item) => (
          <Dialog key={item.id}>
            <div className="bg-muted/30 relative overflow-hidden rounded-lg border">
              <img src={item.image} alt={item.alt} className="h-52 w-full object-cover" />
              <DialogTrigger asChild>
                <button
                  type="button"
                  aria-label={`Zoom ${item.alt}`}
                  className="bg-background/90 hover:bg-background absolute top-2 right-2 flex size-8 items-center justify-center rounded-full border shadow-sm"
                >
                  <ZoomIn className="size-4" />
                </button>
              </DialogTrigger>
            </div>
            <DialogContent className="max-w-3xl p-2">
              <VisuallyHidden>
                <DialogTitle>{item.alt}</DialogTitle>
              </VisuallyHidden>
              <img
                src={item.image}
                alt={item.alt}
                className="max-h-[80vh] w-full rounded-md object-contain"
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
