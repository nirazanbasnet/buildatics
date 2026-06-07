"use client";

import { useMemo } from "react";
import { Download, FileText, MoreVertical, Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MotionTableRow } from "@src/components/ui/motion-table-row";
import {
  SortableTableHead,
  sortBy,
  useSortState,
} from "@src/components/ui/sortable-table-head";
import { cn } from "@/lib/utils";

import type { BrochureTemplateRow } from "../lib/types";

type Props = {
  templates: BrochureTemplateRow[];
  className?: string;
  onEdit: (t: BrochureTemplateRow) => void;
  onDelete: (t: BrochureTemplateRow) => void;
};

type SortField = "name" | "available" | "created";

const ACCESSORS: Record<
  SortField,
  (t: BrochureTemplateRow) => string | number
> = {
  name: (t) => t.name,
  available: (t) => (t.isAvailable ? 1 : 0),
  created: (t) => t.created,
};

export function BrochureTemplatesTable({
  templates,
  className,
  onEdit,
  onDelete,
}: Props) {
  const [sort, toggleSort] = useSortState<SortField>({
    field: "name",
    direction: "asc",
  });
  const rows = useMemo(
    () => sortBy(templates, sort, ACCESSORS),
    [templates, sort],
  );

  return (
    <div
      className={cn(
        "bg-card h-full overflow-auto rounded-lg border",
        className,
      )}
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <SortableTableHead
              field="name"
              sort={sort}
              onSort={toggleSort}
              className="pl-4"
            >
              Name
            </SortableTableHead>
            <SortableTableHead
              field="available"
              sort={sort}
              onSort={toggleSort}
            >
              Available
            </SortableTableHead>
            <TableHead>Note</TableHead>
            <SortableTableHead field="created" sort={sort} onSort={toggleSort}>
              Created
            </SortableTableHead>
            <TableHead className="w-12 pr-4 text-right">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((template, index) => (
            <MotionTableRow key={template.id} index={index}>
              <TableCell className="text-foreground py-3 pl-4 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="text-muted-foreground size-4 shrink-0" />
                  {template.name}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant={template.isAvailable ? "default" : "secondary"}>
                  {template.isAvailable ? "Available" : "Hidden"}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground max-w-xs truncate">
                {template.note || "—"}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {template.created}
              </TableCell>
              <TableCell className="pr-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      aria-label={`Actions for ${template.name}`}
                    >
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    {template.fileUrl ? (
                      <DropdownMenuItem asChild>
                        <a
                          href={template.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Download className="size-4" />
                          Open attachment
                        </a>
                      </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuItem onSelect={() => onEdit(template)}>
                      <Pencil className="size-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onSelect={() => onDelete(template)}
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </MotionTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
