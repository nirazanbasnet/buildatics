"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MotionTableRow } from "@src/components/ui/motion-table-row";
import { cn } from "@/lib/utils";

import {
  claimDetailMock,
  claimStatusConfig,
  claims,
  type Claim,
} from "../_data";
import { ClaimDetailSheet } from "./claim-detail-sheet";
import { FinanceActionsMenu } from "./finance-actions-menu";
import { PaginationNav } from "@src/components/pagination-nav";
import { FinanceToolbar } from "./finance-toolbar";

export function FinanceClaims() {
  const [selected, setSelected] = useState<Claim | null>(null);

  return (
    <div>
      <FinanceToolbar exportable addLabel="Add Claim" />
      <div className="bg-card overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="pl-4 font-semibold">Ref</TableHead>
              <TableHead className="font-semibold">Client</TableHead>
              <TableHead className="font-semibold">Stage</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Issued Date</TableHead>
              <TableHead className="font-semibold">Due Date</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="pr-4 text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.map((claim, index) => {
              const status = claimStatusConfig[claim.status];
              return (
                <MotionTableRow
                  key={claim.id}
                  index={index}
                  onClick={() => setSelected(claim)}
                  className="cursor-pointer"
                >
                  <TableCell className="text-foreground py-3 pl-4 font-medium">
                    <span className="inline-block transition-transform motion-safe:group-hover:translate-x-0.5">
                      {claim.ref}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="min-w-0">
                      <p className="text-foreground text-sm font-semibold">
                        {claim.client}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {claim.projectAddress}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground font-medium">
                    {claim.stage}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex min-w-24 items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        status.badge,
                      )}
                    >
                      {status.label}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {claim.issuedDate}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {claim.dueDate}
                  </TableCell>
                  <TableCell className="text-foreground font-semibold whitespace-nowrap">
                    {claim.amount}
                  </TableCell>
                  <TableCell
                    className="pr-4 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FinanceActionsMenu
                      label={claim.ref}
                      onView={() => setSelected(claim)}
                    />
                  </TableCell>
                </MotionTableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <PaginationNav />

      {selected ? (
        <ClaimDetailSheet
          open
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
          detail={{ ...claimDetailMock, id: selected.id }}
        />
      ) : null}
    </div>
  );
}
