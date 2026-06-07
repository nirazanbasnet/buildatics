"use client";

import { ChevronDown, MapPin, MoreVertical, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LEAD_STATUS_OPTIONS } from "../../lib/lead-detail-types";
import type { LeadOverview } from "../../lib/lead-detail-types";

type DetailHeaderProps = {
  overview: LeadOverview;
  onEdit: () => void;
  onStatusChange: (status: number) => void;
};

export function DetailHeader({
  overview,
  onEdit,
  onStatusChange,
}: DetailHeaderProps) {
  return (
    <section
      className="bg-card rounded-2xl border p-5"
      data-slot="detail-header"
    >
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            {overview.leadNo}
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-emerald-600"
              >
                {overview.status}
                <ChevronDown className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {LEAD_STATUS_OPTIONS.map((o) => (
                <DropdownMenuItem
                  key={o.value}
                  onSelect={() => onStatusChange(o.value)}
                >
                  {o.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="size-9 rounded-md"
              aria-label="Lead actions"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={onEdit}>
              <Pencil />
              Edit lead
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      {overview.address !== "—" ? (
        <div className="mt-4 flex items-start gap-3">
          <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
            <MapPin className="size-4" />
          </span>
          <p className="text-foreground self-center text-sm">
            {overview.address}
          </p>
        </div>
      ) : null}
    </section>
  );
}
