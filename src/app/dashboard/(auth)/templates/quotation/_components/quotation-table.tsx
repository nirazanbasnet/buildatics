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

import { quotationStatusConfig, type Quotation } from "../_data";
import { QuotationActionsMenu } from "./quotation-actions-menu";

type Props = {
  quotations: Quotation[];
  className?: string;
  onQuotationClick?: (quotation: Quotation) => void;
};

type SortField =
  | "ref"
  | "client"
  | "siteAddress"
  | "attachedDesign"
  | "amount"
  | "quoteDate"
  | "expiryDate"
  | "status";

const ACCESSORS: Record<SortField, (q: Quotation) => string | number> = {
  ref: (q) => q.ref,
  client: (q) => q.client,
  siteAddress: (q) => q.siteAddress,
  attachedDesign: (q) => q.attachedDesign,
  amount: (q) => q.amount,
  quoteDate: (q) => q.quoteDate,
  expiryDate: (q) => q.expiryDate,
  status: (q) => q.status
};

export function QuotationTable({ quotations, className, onQuotationClick }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, setSort] = useSortState<SortField>({ field: "ref", direction: "asc" });
  const sortedQuotations = useMemo(() => sortBy(quotations, sort, ACCESSORS), [quotations, sort]);

  const allSelected = sortedQuotations.length > 0 && selected.size === sortedQuotations.length;
  const someSelected = selected.size > 0 && selected.size < sortedQuotations.length;

  function toggleAll(value: boolean) {
    setSelected(value ? new Set(sortedQuotations.map((q) => q.id)) : new Set());
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
                aria-label="Select all quotations"
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
            <SortableTableHead field="attachedDesign" sort={sort} onSort={setSort}>
              Attached Design
            </SortableTableHead>
            <SortableTableHead field="amount" sort={sort} onSort={setSort}>
              Amount
            </SortableTableHead>
            <SortableTableHead field="quoteDate" sort={sort} onSort={setSort}>
              Quote Date
            </SortableTableHead>
            <SortableTableHead field="expiryDate" sort={sort} onSort={setSort}>
              Expiry Date
            </SortableTableHead>
            <SortableTableHead field="status" sort={sort} onSort={setSort}>
              Status
            </SortableTableHead>
            <TableHead className="pr-4 text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedQuotations.map((quotation, index) => {
            const isChecked = selected.has(quotation.id);
            const status = quotationStatusConfig[quotation.status];
            return (
              <MotionTableRow
                key={quotation.id}
                index={index}
                onClick={onQuotationClick ? () => onQuotationClick(quotation) : undefined}
                className={onQuotationClick ? "cursor-pointer" : undefined}
              >
                <TableCell className="py-3 pl-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(v) => toggleOne(quotation.id, v === true)}
                    aria-label={`Select ${quotation.ref}`}
                  />
                </TableCell>
                <TableCell className="text-foreground font-medium">
                  <span className="inline-block transition-transform motion-safe:group-hover:translate-x-0.5">
                    {quotation.ref}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{quotation.client}</TableCell>
                <TableCell className="text-muted-foreground">
                  <span className="group-hover:text-foreground inline-flex items-center gap-1.5 transition-all motion-safe:group-hover:translate-x-0.5">
                    <MapPin className="size-4 shrink-0" />
                    {quotation.siteAddress}
                  </span>
                </TableCell>
                <TableCell className="text-foreground font-semibold">
                  {quotation.attachedDesign}
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {quotation.amount}
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {quotation.quoteDate}
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {quotation.expiryDate}
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
                  <QuotationActionsMenu
                    quotationRef={quotation.ref}
                    onView={onQuotationClick ? () => onQuotationClick(quotation) : undefined}
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
