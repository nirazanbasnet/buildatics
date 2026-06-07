"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LayoutTemplate, Plus } from "lucide-react";
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
import { cn } from "@/lib/utils";

import { deleteTemplate } from "../actions/delete-template";
import type { BrochureTemplateRow } from "../lib/types";
import { BrochureTemplatesTable } from "./brochure-templates-table";
import { AddTemplateSheet } from "./add-template-sheet";
import { EditTemplateSheet } from "./edit-template-sheet";

type Props = {
  templates: BrochureTemplateRow[];
};

export function BrochureTemplatesList({ templates }: Props) {
  const router = useRouter();
  const [addOpen, setAddOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BrochureTemplateRow | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();

  function confirmDelete() {
    if (!deleteTarget) return;
    const target = deleteTarget;
    startTransition(async () => {
      const res = await deleteTemplate(target.id);
      if (res.ok) {
        toast.success("Template deleted");
        setDeleteTarget(null);
        router.refresh();
      } else {
        toast.error(res.error ?? "Failed to delete the template.");
      }
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div>
          <h1 className="text-lg font-semibold">Brochure Templates</h1>
          <p className="text-muted-foreground text-sm tabular-nums">
            {templates.length}{" "}
            {templates.length === 1 ? "template" : "templates"}
          </p>
        </div>
        <Button size="sm" className="h-9" onClick={() => setAddOpen(true)}>
          <Plus className="size-4" />
          Add Template
        </Button>
      </div>

      {templates.length === 0 ? (
        <div
          className={cn(
            "bg-card flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-20 text-center",
          )}
        >
          <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
            <LayoutTemplate className="size-6" />
          </div>
          <h3 className="mt-4 text-base font-semibold">No templates yet</h3>
          <p className="text-muted-foreground mt-1 max-w-sm text-sm">
            Add a template (with an attachment) and mark it available so it
            appears when creating brochures.
          </p>
        </div>
      ) : (
        <BrochureTemplatesTable
          templates={templates}
          onEdit={(t) => setEditId(t.id)}
          onDelete={setDeleteTarget}
        />
      )}

      <AddTemplateSheet
        open={addOpen}
        onOpenChange={setAddOpen}
        onSaved={() => router.refresh()}
      />
      <EditTemplateSheet
        templateId={editId}
        onOpenChange={() => setEditId(null)}
        onSaved={() => router.refresh()}
      />

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this template?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `${deleteTarget.name} and its attachment will be permanently removed.`
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
