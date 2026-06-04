"use client";

import { useMemo } from "react";
import { Eye, MapPin, MoreVertical, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
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

import { QUOTE_STATUSES, statusMeta } from "../../lib/status";
import type { LeadQuoteStatus } from "../../lib/dto";
import type { QuotationRow } from "../../types";

type QuotationTableProps = {
  quotes: QuotationRow[];
  className?: string;
  onView: (quote: QuotationRow) => void;
  onEdit: (quote: QuotationRow) => void;
  onChangeStatus: (quote: QuotationRow, status: LeadQuoteStatus) => void;
  onDelete: (quote: QuotationRow) => void;
};

type SortField = "ref" | "client" | "siteAddress" | "quoteDate" | "expiryDate" | "status";

const ACCESSORS: Record<SortField, (q: QuotationRow) => string | number> = {
  ref: (q) => q.ref,
  client: (q) => q.client,
  siteAddress: (q) => q.siteAddress,
  quoteDate: (q) => q.quoteDate,
  expiryDate: (q) => q.expiryDate,
  status: (q) => q.statusValue
};

export function QuotationTable({
  quotes,
  className,
  onView,
  onEdit,
  onChangeStatus,
  onDelete
}: QuotationTableProps) {
  const [sort, setSort] = useSortState<SortField>({ field: "quoteDate", direction: "desc" });
  const sorted = useMemo(() => sortBy(quotes, sort, ACCESSORS), [quotes, sort]);

  return (
    <div className={cn("bg-card overflow-auto rounded-lg border", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <SortableTableHead field="ref" sort={sort} onSort={setSort}>
              Quote
            </SortableTableHead>
            <SortableTableHead field="client" sort={sort} onSort={setSort}>
              Client
            </SortableTableHead>
            <SortableTableHead field="siteAddress" sort={sort} onSort={setSort}>
              Site Address
            </SortableTableHead>
            <TableHead>Design</TableHead>
            <TableHead>Amount</TableHead>
            <SortableTableHead field="quoteDate" sort={sort} onSort={setSort}>
              Quote Date
            </SortableTableHead>
            <SortableTableHead field="expiryDate" sort={sort} onSort={setSort}>
              Expiry Date
            </SortableTableHead>
            <SortableTableHead field="status" sort={sort} onSort={setSort}>
              Status
            </SortableTableHead>
            <TableHead className="pr-4 text-right">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((quote, index) => {
            const meta = statusMeta(quote.statusValue);
            return (
              <MotionTableRow
                key={`${quote.leadId}-${quote.id}`}
                index={index}
                onClick={() => onView(quote)}
                className="cursor-pointer"
              >
                <TableCell className="text-foreground font-medium">
                  <span className="inline-flex items-center gap-2">
                    {quote.ref}
                    <span className="text-muted-foreground bg-muted rounded px-1.5 py-0.5 text-xs">
                      V{quote.version}
                    </span>
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{quote.client}</TableCell>
                <TableCell className="text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4 shrink-0" />
                    {quote.siteAddress}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{quote.attachedDesign}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {quote.amount}
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {quote.quoteDate}
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {quote.expiryDate}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex min-w-20 items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      meta.solid
                    )}
                  >
                    {quote.statusLabel}
                  </span>
                </TableCell>
                <TableCell className="pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreVertical className="size-4" />
                        <span className="sr-only">Actions for {quote.ref}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onView(quote)}>
                        <Eye className="size-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(quote)}>
                        <Pencil className="size-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Change status</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuRadioGroup
                            value={String(quote.statusValue)}
                            onValueChange={(v) =>
                              onChangeStatus(quote, Number(v) as LeadQuoteStatus)
                            }
                          >
                            {QUOTE_STATUSES.map((s) => (
                              <DropdownMenuRadioItem key={s.value} value={String(s.value)}>
                                {s.label}
                              </DropdownMenuRadioItem>
                            ))}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive" onClick={() => onDelete(quote)}>
                        <Trash2 className="size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </MotionTableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
