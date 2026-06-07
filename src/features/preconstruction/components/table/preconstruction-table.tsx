"use client";

import { useMemo } from "react";
import { MapPin } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MotionProgress } from "@src/components/ui/motion-progress";
import { MotionTableRow } from "@src/components/ui/motion-table-row";
import {
  SortableTableHead,
  sortBy,
  useSortState,
} from "@src/components/ui/sortable-table-head";
import { cn } from "@/lib/utils";

import type { PreconstructionProject } from "../../types";

type PreconstructionTableProps = {
  projects: PreconstructionProject[];
  className?: string;
  onRowClick?: (project: PreconstructionProject) => void;
};

type SortField =
  | "projectNo"
  | "address"
  | "status"
  | "stage"
  | "council"
  | "developer"
  | "progress";

const ACCESSORS: Record<
  SortField,
  (p: PreconstructionProject) => string | number
> = {
  projectNo: (p) => p.projectNo,
  address: (p) => p.address,
  status: (p) => p.status,
  stage: (p) => p.stage,
  council: (p) => p.council,
  developer: (p) => p.developer,
  progress: (p) => p.progress,
};

export function PreconstructionTable({
  projects,
  className,
  onRowClick,
}: PreconstructionTableProps) {
  const [sort, toggleSort] = useSortState<SortField>({
    field: "projectNo",
    direction: "asc",
  });
  const sortedProjects = useMemo(
    () => sortBy(projects, sort, ACCESSORS),
    [projects, sort],
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
              field="projectNo"
              sort={sort}
              onSort={toggleSort}
              className="pl-4"
            >
              Project No
            </SortableTableHead>
            <SortableTableHead field="address" sort={sort} onSort={toggleSort}>
              Address
            </SortableTableHead>
            <SortableTableHead field="status" sort={sort} onSort={toggleSort}>
              Status
            </SortableTableHead>
            <SortableTableHead field="stage" sort={sort} onSort={toggleSort}>
              Stage
            </SortableTableHead>
            <SortableTableHead field="council" sort={sort} onSort={toggleSort}>
              Council
            </SortableTableHead>
            <SortableTableHead
              field="developer"
              sort={sort}
              onSort={toggleSort}
            >
              Developer
            </SortableTableHead>
            <SortableTableHead
              field="progress"
              sort={sort}
              onSort={toggleSort}
              className="pr-4"
            >
              Progress
            </SortableTableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProjects.map((project, index) => (
            <MotionTableRow
              key={project.id}
              index={index}
              onClick={onRowClick ? () => onRowClick(project) : undefined}
              className={onRowClick ? "cursor-pointer" : undefined}
            >
              <TableCell className="text-foreground py-3 pl-4 font-medium">
                <span className="inline-block transition-transform motion-safe:group-hover:translate-x-0.5">
                  {project.projectNo}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                <span className="group-hover:text-foreground inline-flex items-center gap-1.5 transition-all motion-safe:group-hover:translate-x-0.5">
                  <MapPin className="size-4 shrink-0" />
                  {project.address}
                </span>
              </TableCell>
              <TableCell>
                <span className="inline-flex min-w-24 items-center justify-center rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-emerald-600">
                  {project.status}
                </span>
              </TableCell>
              <TableCell className="text-foreground font-medium">
                {project.stage}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {project.council}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {project.developer}
              </TableCell>
              <TableCell className="pr-4">
                <MotionProgress value={project.progress} index={index} />
              </TableCell>
            </MotionTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
