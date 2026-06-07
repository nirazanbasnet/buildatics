"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Home,
  LineChart,
  MoreVertical,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import {
  createLeadStage,
  deleteLeadStage,
  updateLeadStage,
} from "../actions/lead-stage-actions";
import type { DataSetupGroup, DataSetupRow } from "../lib/get-data-setup";
import { NoApiData, NoApiDataBlock } from "../../components/no-api-data";

const itemIcons: Record<string, { icon: LucideIcon; className: string }> = {
  "lead-stages": { icon: BarChart3, className: "text-green-600" },
  "lead-status": { icon: BarChart3, className: "text-green-600" },
  "design-stages": { icon: Home, className: "text-orange-500" },
  "design-status": { icon: Home, className: "text-orange-500" },
  "project-status": { icon: LineChart, className: "text-blue-600" },
};

type Props = {
  groups: DataSetupGroup[];
};

export function DataSetup({ groups }: Props) {
  const router = useRouter();
  const allItems = groups.flatMap((g) => g.items);
  const [activeId, setActiveId] = useState(allItems[0]?.id);
  const active = allItems.find((i) => i.id === activeId) ?? allItems[0];

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<DataSetupRow | null>(null);
  const [name, setName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<DataSetupRow | null>(null);
  const [isPending, startTransition] = useTransition();

  function openAdd() {
    setEditing(null);
    setName("");
    setFormOpen(true);
  }
  function openEdit(row: DataSetupRow) {
    setEditing(row);
    setName(row.name);
    setFormOpen(true);
  }

  function submit() {
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }
    startTransition(async () => {
      const res = editing
        ? await updateLeadStage(editing.id, { name })
        : await createLeadStage({ name });
      if (res.ok) {
        toast.success(editing ? "Stage updated" : "Stage added");
        setFormOpen(false);
        router.refresh();
      } else {
        toast.error(res.error ?? "Failed to save.");
      }
    });
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    const target = deleteTarget;
    startTransition(async () => {
      const res = await deleteLeadStage(target.id);
      if (res.ok) {
        toast.success("Stage deleted");
        setDeleteTarget(null);
        router.refresh();
      } else {
        toast.error(res.error ?? "Failed to delete.");
      }
    });
  }

  const editable = active.kind === "lead-stages";

  return (
    <div className="flex flex-col gap-6 lg:flex-row" data-slot="data-setup">
      <nav
        className="flex shrink-0 flex-col gap-4 lg:w-52"
        aria-label="Data setup sections"
      >
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-1">
            <p className="text-muted-foreground px-2 text-[11px] font-medium tracking-wider uppercase">
              {group.label}
            </p>
            {group.items.map((item) => {
              const isActive = item.id === active.id;
              const Icon = itemIcons[item.id]?.icon ?? BarChart3;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                    isActive
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 shrink-0",
                      itemIcons[item.id]?.className,
                    )}
                  />
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <div>
            <h3 className="text-foreground text-base font-semibold">
              {active.label}
            </h3>
            {active.kind === "enum" ? (
              <p className="text-muted-foreground text-xs">
                Read-only system values.
              </p>
            ) : null}
          </div>
          {editable ? (
            <Button size="sm" className="h-9" onClick={openAdd}>
              <Plus className="size-4" />
              Add {active.columnLabel}
            </Button>
          ) : null}
        </div>

        {active.kind === "none" ? (
          <NoApiDataBlock />
        ) : (
          <div className="bg-card overflow-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="pl-4 font-semibold">
                    {active.columnLabel}
                  </TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="pr-4 text-right font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {active.rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-muted-foreground h-24 text-center"
                    >
                      No {active.columnLabel.toLowerCase()} yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  active.rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-foreground py-3 pl-4 font-medium">
                        {row.name}
                      </TableCell>
                      <TableCell>
                        <NoApiData />
                      </TableCell>
                      <TableCell className="pr-4 text-right">
                        {editable ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                                aria-label={`Actions for ${row.name}`}
                              >
                                <MoreVertical className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="min-w-40"
                            >
                              <DropdownMenuItem onSelect={() => openEdit(row)}>
                                <Pencil />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                variant="destructive"
                                onSelect={() => setDeleteTarget(row)}
                              >
                                <Trash2 />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <NoApiData label="Read-only" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing
                ? `Edit ${active.columnLabel}`
                : `Add ${active.columnLabel}`}
            </DialogTitle>
            <DialogDescription>
              Lead pipeline stages are used across the Leads module.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="ds-name">Name</Label>
            <Input
              id="ds-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Stage name"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFormOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={submit} disabled={isPending || !name.trim()}>
              {isPending ? "Saving…" : editing ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete this {active.columnLabel.toLowerCase()}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget ? `${deleteTarget.name} will be removed.` : null}
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
