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

import { LeadsToolbar } from "./toolbar/leads-toolbar";
import { LeadsTable } from "./table/leads-table";
import { LeadsEmptyState } from "./table/leads-empty-state";
import { LeadsFilterSheet } from "./filter/leads-filter-sheet";
import { AddLeadSheet } from "./add-lead/add-lead-sheet";
import { EditLeadSheet } from "./add-lead/edit-lead-sheet";
import { LeadDetailSheet } from "./detail/lead-detail-sheet";
import { queryLeads } from "../actions/query-leads";
import { deleteLead } from "../actions/delete-lead";
import { LEADS_FILTER_DEFAULTS, countActiveLeadFilters } from "../lib/filter";
import { downloadLeadsCsv } from "../lib/csv";
import type { LeadOptions, LeadRow, LeadsFilterState } from "../types";

type LeadsListProps = {
  initialItems: LeadRow[];
  initialTotal: number;
  options: LeadOptions;
  pageSize: number;
};

export function LeadsList({
  initialItems,
  initialTotal,
  options,
  pageSize,
}: LeadsListProps) {
  const [filters, setFilters] = useState<LeadsFilterState>(
    LEADS_FILTER_DEFAULTS,
  );
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(initialTotal);
  const [isPending, startTransition] = useTransition();

  const [filterOpen, setFilterOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [viewLead, setViewLead] = useState<LeadRow | null>(null);
  const [editLeadId, setEditLeadId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LeadRow | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const hasAnyLeads = initialTotal > 0;

  function runQuery(nextFilters: LeadsFilterState, nextPage: number) {
    startTransition(async () => {
      const res = await queryLeads({
        filters: nextFilters,
        page: nextPage,
        pageSize,
      });
      setItems(res.items);
      setTotal(res.total);
    });
  }

  function applyFilters(next: LeadsFilterState) {
    setFilters(next);
    setPage(1);
    runQuery(next, 1);
  }

  function clearFilters() {
    setFilters(LEADS_FILTER_DEFAULTS);
    setPage(1);
    runQuery(LEADS_FILTER_DEFAULTS, 1);
  }

  function goToPage(next: number) {
    setPage(next);
    runQuery(filters, next);
  }

  function refresh() {
    runQuery(filters, page);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    const target = deleteTarget;
    startTransition(async () => {
      const res = await deleteLead(target.id);
      if (res.ok) {
        toast.success("Lead deleted");
        setDeleteTarget(null);
        const res2 = await queryLeads({ filters, page, pageSize });
        setItems(res2.items);
        setTotal(res2.total);
      } else {
        toast.error(res.error ?? "Failed to delete the lead.");
      }
    });
  }

  return (
    <div>
      <LeadsToolbar
        resultCount={total}
        filters={filters}
        onFiltersChange={applyFilters}
        options={options}
        onOpenFilter={() => setFilterOpen(true)}
        onExportCsv={() => downloadLeadsCsv(items)}
        onAddLead={() => setAddOpen(true)}
      />

      {items.length === 0 ? (
        <LeadsEmptyState
          filtered={hasAnyLeads}
          onClearFilters={
            countActiveLeadFilters(filters) > 0 ? clearFilters : undefined
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
            <LeadsTable
              leads={items}
              onLeadClick={setViewLead}
              onView={setViewLead}
              onEdit={(lead) => setEditLeadId(lead.id)}
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

      <LeadsFilterSheet
        open={filterOpen}
        onOpenChange={setFilterOpen}
        value={filters}
        onApply={applyFilters}
        options={options}
      />
      <AddLeadSheet
        open={addOpen}
        onOpenChange={setAddOpen}
        options={options}
        onCreated={refresh}
      />
      <EditLeadSheet
        leadId={editLeadId}
        onOpenChange={() => setEditLeadId(null)}
        options={options}
        onSaved={refresh}
      />
      <LeadDetailSheet
        leadId={viewLead?.id ?? null}
        leadNo={viewLead?.leadNo}
        options={options}
        onOpenChange={() => setViewLead(null)}
        onChanged={refresh}
      />

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this lead?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `${deleteTarget.leadNo} (${deleteTarget.client}) will be removed from the list. This can be restored by an admin.`
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
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
