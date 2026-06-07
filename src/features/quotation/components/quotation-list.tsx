"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { PaginationNav } from "@src/components/pagination-nav";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { QuotationToolbar } from "./toolbar/quotation-toolbar";
import { QuotationTable } from "./table/quotation-table";
import { QuotationEmptyState } from "./table/quotation-empty-state";
import { AddQuoteSheet } from "./add-quote/add-quote-sheet";
import { EditQuoteSheet } from "./add-quote/edit-quote-sheet";
import { QuotationDetailSheet } from "./detail/quotation-detail-sheet";
import { queryQuotes } from "../actions/query-quotes";
import { deleteQuote } from "../actions/delete-quote";
import { updateQuoteStatus } from "../actions/update-quote-status";
import { QUOTES_FILTER_DEFAULTS, countActiveQuoteFilters } from "../lib/filter";
import { downloadQuotesCsv } from "../lib/csv";
import type { LeadQuoteStatus } from "../lib/dto";
import type { QuoteLeadOption } from "../lib/lead-options";
import type { QuotationRow, QuotationsFilterState } from "../types";

type QuotationListProps = {
  initialItems: QuotationRow[];
  initialTotal: number;
  leads: QuoteLeadOption[];
  pageSize: number;
};

export function QuotationList({
  initialItems,
  initialTotal,
  leads,
  pageSize,
}: QuotationListProps) {
  const [filters, setFilters] = useState<QuotationsFilterState>(
    QUOTES_FILTER_DEFAULTS,
  );
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(initialTotal);
  const [isPending, startTransition] = useTransition();

  const [addOpen, setAddOpen] = useState(false);
  const [editQuote, setEditQuote] = useState<QuotationRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<QuotationRow | null>(null);
  const [viewTarget, setViewTarget] = useState<{
    leadId: string;
    id: string;
  } | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const hasAny = initialTotal > 0;

  function runQuery(nextFilters: QuotationsFilterState, nextPage: number) {
    startTransition(async () => {
      const res = await queryQuotes({
        filters: nextFilters,
        page: nextPage,
        pageSize,
      });
      setItems(res.items);
      setTotal(res.total);
    });
  }

  function applyFilters(next: QuotationsFilterState) {
    setFilters(next);
    setPage(1);
    runQuery(next, 1);
  }

  function clearFilters() {
    setFilters(QUOTES_FILTER_DEFAULTS);
    setPage(1);
    runQuery(QUOTES_FILTER_DEFAULTS, 1);
  }

  function goToPage(next: number) {
    setPage(next);
    runQuery(filters, next);
  }

  function refresh() {
    runQuery(filters, page);
  }

  function onChangeStatus(quote: QuotationRow, status: LeadQuoteStatus) {
    if (status === quote.statusValue) return;
    startTransition(async () => {
      const res = await updateQuoteStatus(quote.leadId, quote.id, status);
      if (res.ok) {
        toast.success("Status updated");
        runQuery(filters, page);
      } else {
        toast.error(res.error ?? "Failed to update the status.");
      }
    });
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    const target = deleteTarget;
    startTransition(async () => {
      const res = await deleteQuote(target.leadId, target.id);
      if (res.ok) {
        toast.success("Quotation deleted");
        setDeleteTarget(null);
        runQuery(filters, page);
      } else {
        toast.error(res.error ?? "Failed to delete the quotation.");
      }
    });
  }

  return (
    <div>
      <QuotationToolbar
        resultCount={total}
        filters={filters}
        onFiltersChange={applyFilters}
        onExportCsv={() => downloadQuotesCsv(items)}
        onAddQuotation={() => setAddOpen(true)}
      />

      {items.length === 0 ? (
        <QuotationEmptyState
          filtered={hasAny}
          onClearFilters={
            countActiveQuoteFilters(filters) > 0 ? clearFilters : undefined
          }
        />
      ) : (
        <>
          <div
            className={cn(
              "transition-opacity duration-200",
              isPending && "pointer-events-none opacity-50",
            )}
          >
            <QuotationTable
              quotes={items}
              onView={(q) => setViewTarget({ leadId: q.leadId, id: q.id })}
              onEdit={setEditQuote}
              onChangeStatus={onChangeStatus}
              onDelete={setDeleteTarget}
            />
          </div>
          {totalPages > 1 ? (
            <PaginationNav
              totalPages={totalPages}
              page={page}
              onPageChange={goToPage}
            />
          ) : null}
        </>
      )}

      <AddQuoteSheet
        open={addOpen}
        onOpenChange={setAddOpen}
        leads={leads}
        onCreated={(created) => {
          refresh();
          if (created) setViewTarget(created);
        }}
      />
      <EditQuoteSheet
        quote={editQuote}
        onOpenChange={() => setEditQuote(null)}
        onSaved={refresh}
      />
      <QuotationDetailSheet
        target={viewTarget}
        onOpenChange={(o) => !o && setViewTarget(null)}
        onChanged={refresh}
      />

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this quotation?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `"${deleteTarget.ref}" (V${deleteTarget.version}) will be permanently removed.`
                : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={isPending}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
