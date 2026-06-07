"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { linkDesign, unlinkDesign } from "../../actions/lead-designs";
import type {
  DesignOption,
  LeadDesignItem,
  LeadOverview,
} from "../../lib/lead-detail-types";
import { TabLayout } from "./tab-layout";

type DesignsTabProps = {
  overview: LeadOverview;
  leadId: string;
  designs: LeadDesignItem[];
  designOptions: DesignOption[];
  onChanged: () => void;
};

export function DesignsTab({
  overview,
  leadId,
  designs,
  designOptions,
  onChanged,
}: DesignsTabProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [isPending, startTransition] = useTransition();

  function link() {
    if (!selected) return;
    startTransition(async () => {
      const res = await linkDesign(leadId, selected);
      if (res.ok) {
        toast.success("Design linked");
        setAddOpen(false);
        setSelected("");
        onChanged();
      } else {
        toast.error(res.error ?? "Failed to link the design.");
      }
    });
  }

  function remove(id: string) {
    startTransition(async () => {
      const res = await unlinkDesign(leadId, id);
      if (res.ok) {
        toast.success("Design removed");
        onChanged();
      } else {
        toast.error(res.error ?? "Failed to unlink the design.");
      }
    });
  }

  return (
    <TabLayout overview={overview}>
      <section className="bg-card rounded-2xl border p-5">
        <header className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <h3 className="text-foreground text-lg font-semibold">Designs</h3>
          <Button
            size="sm"
            className="h-9"
            onClick={() => setAddOpen(true)}
            disabled={designOptions.length === 0}
          >
            <Plus className="size-4" />
            Link design
          </Button>
        </header>

        {designs.length === 0 ? (
          <p className="text-muted-foreground rounded-lg border border-dashed py-10 text-center text-sm">
            No designs linked yet.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {designs.map((design) => (
              <Card key={design.id} className="flex-row items-center gap-3 p-3">
                <div className="bg-muted relative size-16 shrink-0 overflow-hidden rounded-md">
                  {design.image ? (
                    <Image
                      src={design.image}
                      alt={design.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <span className="text-foreground min-w-0 flex-1 truncate text-sm font-medium">
                  {design.title}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => remove(design.id)}
                  disabled={isPending}
                  aria-label={`Unlink ${design.title}`}
                >
                  <Trash2 className="size-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Link design</DialogTitle>
            <DialogDescription>
              Attach a company design to this lead.
            </DialogDescription>
          </DialogHeader>
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a design" />
            </SelectTrigger>
            <SelectContent>
              {designOptions.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={link} disabled={isPending || !selected}>
              {isPending ? "Linking…" : "Link design"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TabLayout>
  );
}
