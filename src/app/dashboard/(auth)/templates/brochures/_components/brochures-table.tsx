"use client";

import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { MotionTableRow } from "@src/components/ui/motion-table-row";
import { SortableTableHead, sortBy, useSortState } from "@src/components/ui/sortable-table-head";
import { cn } from "@/lib/utils";

import { brochureStatusConfig, type Brochure } from "../_data";
import { BrochuresActionsMenu } from "./brochures-actions-menu";

type Props = {
  brochures: Brochure[];
  className?: string;
  onBrochureClick?: (brochure: Brochure) => void;
};

type SortField = "ref" | "client" | "siteAddress" | "design" | "createdDate" | "status";

const ACCESSORS: Record<SortField, (b: Brochure) => string | number> = {
  ref: (b) => b.ref,
  client: (b) => b.client,
  siteAddress: (b) => b.siteAddress,
  design: (b) => b.design,
  createdDate: (b) => b.createdDate,
  status: (b) => b.status
};

export function BrochuresTable({ brochures, className, onBrochureClick }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, setSort] = useSortState<SortField>({ field: "ref", direction: "asc" });
  const sortedBrochures = useMemo(() => sortBy(brochures, sort, ACCESSORS), [brochures, sort]);

  const allSelected = sortedBrochures.length > 0 && selected.size === sortedBrochures.length;
  const someSelected = selected.size > 0 && selected.size < sortedBrochures.length;

  function toggleAll(value: boolean) {
    setSelected(value ? new Set(sortedBrochures.map((b) => b.id)) : new Set());
  }

  function toggleOne(id: string, value: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (value) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  return (
    <div className={cn("bg-card h-full overflow-auto rounded-lg border", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-12 pl-4">
              <Checkbox
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                onCheckedChange={(v) => toggleAll(v === true)}
                aria-label="Select all brochures"
              />
            </TableHead>
            <SortableTableHead field="ref" sort={sort} onSort={setSort}>
              Ref#
            </SortableTableHead>
            <SortableTableHead field="client" sort={sort} onSort={setSort}>
              Client Name
            </SortableTableHead>
            <SortableTableHead field="siteAddress" sort={sort} onSort={setSort}>
              Site Address
            </SortableTableHead>
            <SortableTableHead field="design" sort={sort} onSort={setSort}>
              Design
            </SortableTableHead>
            <SortableTableHead field="createdDate" sort={sort} onSort={setSort}>
              Created Date
            </SortableTableHead>
            <SortableTableHead field="status" sort={sort} onSort={setSort}>
              Status
            </SortableTableHead>
            <TableHead className="pr-4 text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBrochures.map((brochure, index) => {
            const isChecked = selected.has(brochure.id);
            const status = brochureStatusConfig[brochure.status];
            return (
              <MotionTableRow
                key={brochure.id}
                index={index}
                onClick={onBrochureClick ? () => onBrochureClick(brochure) : undefined}
                className={onBrochureClick ? "cursor-pointer" : undefined}
              >
                <TableCell className="py-3 pl-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(v) => toggleOne(brochure.id, v === true)}
                    aria-label={`Select ${brochure.ref}`}
                  />
                </TableCell>
                <TableCell className="text-foreground font-medium">
                  <span className="inline-block transition-transform motion-safe:group-hover:translate-x-0.5">
                    {brochure.ref}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{brochure.client}</TableCell>
                <TableCell className="text-muted-foreground">
                  <span className="group-hover:text-foreground inline-flex items-center gap-1.5 transition-all motion-safe:group-hover:translate-x-0.5">
                    <MapPin className="size-4 shrink-0" />
                    {brochure.siteAddress}
                  </span>
                </TableCell>
                <TableCell className="text-foreground font-semibold">{brochure.design}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {brochure.createdDate}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex min-w-24 items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      status.solid
                    )}
                  >
                    {status.label}
                  </span>
                </TableCell>
                <TableCell className="pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <BrochuresActionsMenu
                    brochureRef={brochure.ref}
                    onView={onBrochureClick ? () => onBrochureClick(brochure) : undefined}
                  />
                </TableCell>
              </MotionTableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
