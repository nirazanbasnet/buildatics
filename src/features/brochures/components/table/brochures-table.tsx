"use client";

import { useMemo } from "react";
import { FileText } from "lucide-react";

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

import { NoApiData } from "../no-api-data";
import { BrochuresActionsMenu } from "./brochures-actions-menu";
import type { BrochureRow } from "../../lib/types";

type BrochuresTableProps = {
  brochures: BrochureRow[];
  className?: string;
  onRowClick?: (b: BrochureRow) => void;
  onView: (b: BrochureRow) => void;
  onEdit: (b: BrochureRow) => void;
  onDelete: (b: BrochureRow) => void;
};

type SortField = "name" | "design" | "created";

const ACCESSORS: Record<SortField, (b: BrochureRow) => string | number> = {
  name: (b) => b.name,
  design: (b) => b.templateName,
  created: (b) => b.created,
};

export function BrochuresTable({
  brochures,
  className,
  onRowClick,
  onView,
  onEdit,
  onDelete,
}: BrochuresTableProps) {
  const [sort, toggleSort] = useSortState<SortField>({
    field: "name",
    direction: "asc",
  });
  const rows = useMemo(
    () => sortBy(brochures, sort, ACCESSORS),
    [brochures, sort],
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
              Ref
            </SortableTableHead>
            <TableHead>Client</TableHead>
            <TableHead>Site Address</TableHead>
            <SortableTableHead field="design" sort={sort} onSort={toggleSort}>
              Design
            </SortableTableHead>
            <SortableTableHead field="created" sort={sort} onSort={toggleSort}>
              Created
            </SortableTableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12 pr-4 text-right">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((brochure, index) => (
            <MotionTableRow
              key={brochure.id}
              index={index}
              onClick={onRowClick ? () => onRowClick(brochure) : undefined}
              className={onRowClick ? "cursor-pointer" : undefined}
            >
              <TableCell className="text-foreground py-3 pl-4 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="text-muted-foreground size-4 shrink-0" />
                  {brochure.name}
                </span>
              </TableCell>
              <TableCell>
                <NoApiData />
              </TableCell>
              <TableCell>
                <NoApiData />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {brochure.templateName || <NoApiData />}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {brochure.created}
              </TableCell>
              <TableCell>
                <NoApiData />
              </TableCell>
              <TableCell
                className="pr-4 text-right"
                onClick={(e) => e.stopPropagation()}
              >
                <BrochuresActionsMenu
                  brochure={brochure}
                  onView={() => onView(brochure)}
                  onEdit={() => onEdit(brochure)}
                  onDelete={() => onDelete(brochure)}
                />
              </TableCell>
            </MotionTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
