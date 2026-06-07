"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MotionTableRow } from "@src/components/ui/motion-table-row";

import { payables } from "../_data";
import { FinanceActionsMenu } from "./finance-actions-menu";
import { PaginationNav } from "@src/components/pagination-nav";
import { FinanceToolbar } from "./finance-toolbar";

export function FinancePayables() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allSelected = payables.length > 0 && selected.size === payables.length;
  const someSelected = selected.size > 0 && selected.size < payables.length;

  function toggleAll(value: boolean) {
    setSelected(value ? new Set(payables.map((p) => p.id)) : new Set());
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
    <div>
      <FinanceToolbar />
      <div className="bg-card overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-12 pl-4">
                <Checkbox
                  checked={
                    allSelected ? true : someSelected ? "indeterminate" : false
                  }
                  onCheckedChange={(v) => toggleAll(v === true)}
                  aria-label="Select all invoices"
                />
              </TableHead>
              <TableHead className="font-semibold">Invoice</TableHead>
              <TableHead className="font-semibold">Vendor</TableHead>
              <TableHead className="font-semibold">Project</TableHead>
              <TableHead className="font-semibold">Stage</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Due Date</TableHead>
              <TableHead className="pr-4 text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payables.map((payable, index) => (
              <MotionTableRow key={payable.id} index={index}>
                <TableCell className="py-3 pl-4">
                  <Checkbox
                    checked={selected.has(payable.id)}
                    onCheckedChange={(v) => toggleOne(payable.id, v === true)}
                    aria-label={`Select ${payable.invoice}`}
                  />
                </TableCell>
                <TableCell className="text-foreground font-medium">
                  <span className="inline-block transition-transform motion-safe:group-hover:translate-x-0.5">
                    {payable.invoice}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {payable.vendor}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {payable.project}
                </TableCell>
                <TableCell className="text-foreground font-medium">
                  {payable.stage}
                </TableCell>
                <TableCell>
                  <span className="inline-flex min-w-24 items-center justify-center rounded-md bg-green-600 px-2.5 py-1 text-xs font-medium text-white dark:bg-green-600">
                    Sent
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {payable.dueDate}
                </TableCell>
                <TableCell className="pr-4 text-right">
                  <FinanceActionsMenu label={payable.invoice} />
                </TableCell>
              </MotionTableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationNav />
    </div>
  );
}
