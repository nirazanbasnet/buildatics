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
import { MotionProgress } from "@src/components/ui/motion-progress";
import { MotionTableRow } from "@src/components/ui/motion-table-row";
import { SortableTableHead, sortBy, useSortState } from "@src/components/ui/sortable-table-head";
import { cn } from "@/lib/utils";

import { leadStatusLabels, type Lead } from "../_data";

type Props = {
  leads: Lead[];
  className?: string;
  onLeadClick?: (lead: Lead) => void;
};

type SortField = "leadNo" | "address" | "status" | "stage" | "budget" | "client" | "progress";

const ACCESSORS: Record<SortField, (lead: Lead) => string | number> = {
  leadNo: (l) => l.leadNo,
  address: (l) => l.address,
  status: (l) => leadStatusLabels[l.status],
  stage: (l) => l.stage,
  budget: (l) => l.budget,
  client: (l) => l.client,
  progress: (l) => l.progress
};

export function LeadsTable({ leads, className, onLeadClick }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, toggleSort] = useSortState<SortField>({ field: "leadNo", direction: "asc" });
  const sortedLeads = useMemo(() => sortBy(leads, sort, ACCESSORS), [leads, sort]);

  const allSelected = sortedLeads.length > 0 && selected.size === sortedLeads.length;
  const someSelected = selected.size > 0 && selected.size < sortedLeads.length;

  function toggleAll(value: boolean) {
    setSelected(value ? new Set(sortedLeads.map((l) => l.id)) : new Set());
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
                aria-label="Select all leads"
              />
            </TableHead>
            <SortableTableHead field="leadNo" sort={sort} onSort={toggleSort}>
              Lead No
            </SortableTableHead>
            <SortableTableHead field="address" sort={sort} onSort={toggleSort}>
              Address
            </SortableTableHead>
            <SortableTableHead field="status" sort={sort} onSort={toggleSort}>
              Status
            </SortableTableHead>
            <SortableTableHead field="stage" sort={sort} onSort={toggleSort}>
              Stage
            </SortableTableHead>
            <SortableTableHead field="budget" sort={sort} onSort={toggleSort}>
              Budget
            </SortableTableHead>
            <SortableTableHead field="client" sort={sort} onSort={toggleSort}>
              Client
            </SortableTableHead>
            <SortableTableHead field="progress" sort={sort} onSort={toggleSort} className="pr-4">
              Progress
            </SortableTableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedLeads.map((lead, index) => {
            const isChecked = selected.has(lead.id);
            return (
              <MotionTableRow
                key={lead.id}
                index={index}
                onClick={onLeadClick ? () => onLeadClick(lead) : undefined}
                className={onLeadClick ? "cursor-pointer" : undefined}
              >
                <TableCell className="py-3 pl-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(v) => toggleOne(lead.id, v === true)}
                    aria-label={`Select ${lead.leadNo}`}
                  />
                </TableCell>
                <TableCell className="text-foreground font-medium">
                  <span className="inline-block transition-transform motion-safe:group-hover:translate-x-0.5">
                    {lead.leadNo}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <span className="group-hover:text-foreground inline-flex items-center gap-1.5 transition-all motion-safe:group-hover:translate-x-0.5">
                    <MapPin className="size-4 shrink-0" />
                    {lead.address}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="inline-flex min-w-24 items-center justify-center rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-emerald-600">
                    {leadStatusLabels[lead.status]}
                  </span>
                </TableCell>
                <TableCell className="text-foreground font-medium">{lead.stage}</TableCell>
                <TableCell className="text-muted-foreground">{lead.budget}</TableCell>
                <TableCell className="text-muted-foreground">{lead.client}</TableCell>
                <TableCell className="pr-4">
                  <MotionProgress value={lead.progress} index={index} />
                </TableCell>
              </MotionTableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
