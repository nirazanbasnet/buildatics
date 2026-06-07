"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Download, Plus, Search } from "lucide-react";
import { toast } from "sonner";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaginationNav } from "@src/components/pagination-nav";

import { deleteBrochure } from "../actions/delete-brochure";
import { downloadBrochuresCsv } from "../lib/csv";
import type { BrochureRow, TemplateOption } from "../lib/types";
import { BrochuresTable } from "./table/brochures-table";
import { BrochuresEmptyState } from "./table/brochures-empty-state";
import { AddBrochureSheet } from "./add-brochure/add-brochure-sheet";
import { EditBrochureSheet } from "./add-brochure/edit-brochure-sheet";
import { BrochureDetailSheet } from "./detail/brochure-detail-sheet";

type BrochuresListProps = {
  brochures: BrochureRow[];
  templates: TemplateOption[];
  pageSize: number;
};

export function BrochuresList({
  brochures,
  templates,
  pageSize,
}: BrochuresListProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [viewId, setViewId] = useState<string | null>(null);
  const [viewName, setViewName] = useState<string | undefined>(undefined);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BrochureRow | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return brochures;
    return brochures.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.templateName.toLowerCase().includes(q),
    );
  }, [brochures, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  function openView(b: BrochureRow) {
    setViewId(b.id);
    setViewName(b.name);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    const target = deleteTarget;
    startTransition(async () => {
      const res = await deleteBrochure(target.id);
      if (res.ok) {
        toast.success("Brochure deleted");
        setDeleteTarget(null);
        if (viewId === target.id) setViewId(null);
        router.refresh();
      } else {
        toast.error(res.error ?? "Failed to delete the brochure.");
      }
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div>
          <h1 className="text-lg font-semibold">Brochures</h1>
          <p className="text-muted-foreground text-sm tabular-nums">
            {filtered.length} {filtered.length === 1 ? "brochure" : "brochures"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search brochures"
              className="h-9 w-48 pl-9"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => downloadBrochuresCsv(filtered)}
            disabled={filtered.length === 0}
          >
            <Download className="size-4" />
            Export CSV
          </Button>
          <Button size="sm" className="h-9" onClick={() => setAddOpen(true)}>
            <Plus className="size-4" />
            Add Brochure
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <BrochuresEmptyState filtered={brochures.length > 0} />
      ) : (
        <>
          <BrochuresTable
            brochures={pageItems}
            onRowClick={openView}
            onView={openView}
            onEdit={(b) => setEditId(b.id)}
            onDelete={setDeleteTarget}
          />
          {totalPages > 1 ? (
            <PaginationNav
              totalPages={totalPages}
              page={safePage}
              onPageChange={setPage}
            />
          ) : null}
        </>
      )}

      <AddBrochureSheet
        open={addOpen}
        onOpenChange={setAddOpen}
        templates={templates}
        onSaved={() => router.refresh()}
      />
      <EditBrochureSheet
        brochureId={editId}
        templates={templates}
        onOpenChange={() => setEditId(null)}
        onSaved={() => router.refresh()}
      />
      <BrochureDetailSheet
        brochureId={viewId}
        brochureName={viewName}
        onOpenChange={() => setViewId(null)}
        onEdit={(id) => {
          setViewId(null);
          setEditId(id);
        }}
        onDelete={(id, name) =>
          setDeleteTarget({
            id,
            name,
            templateName: "",
            created: "",
            htmlUrl: "",
          })
        }
      />

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this brochure?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `${deleteTarget.name} will be permanently removed.`
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
