"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { SortableTableHead, sortBy, useSortState } from "@src/components/ui/sortable-table-head";
import { cn } from "@/lib/utils";

import { preconstructionListStatusLabels, type PreconstructionListProject } from "../_data";

type Props = {
  projects: PreconstructionListProject[];
  className?: string;
  onProjectClick?: (project: PreconstructionListProject) => void;
};

type SortField =
  | "projectNo"
  | "address"
  | "status"
  | "stage"
  | "council"
  | "developer"
  | "progress";

const ACCESSORS: Record<SortField, (project: PreconstructionListProject) => string | number> = {
  projectNo: (p) => p.projectNo,
  address: (p) => p.address,
  status: (p) => preconstructionListStatusLabels[p.status],
  stage: (p) => p.stage,
  council: (p) => p.council,
  developer: (p) => p.developer,
  progress: (p) => p.progress
};

export function PreconstructionListTable({ projects, className, onProjectClick }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, toggleSort] = useSortState<SortField>({ field: "projectNo", direction: "asc" });
  const sortedProjects = useMemo(() => sortBy(projects, sort, ACCESSORS), [projects, sort]);

  const allSelected = sortedProjects.length > 0 && selected.size === sortedProjects.length;
  const someSelected = selected.size > 0 && selected.size < sortedProjects.length;

  function toggleAll(value: boolean) {
    setSelected(value ? new Set(sortedProjects.map((p) => p.id)) : new Set());
  }

  function toggleOne(id: string, value: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (value) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  return (
    <div className={cn("bg-card h-full overflow-auto rounded-lg border", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-12 pl-4">
              <Checkbox
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                onCheckedChange={(v) => toggleAll(v === true)}
                aria-label="Select all projects"
              />
            </TableHead>
            <SortableTableHead field="projectNo" sort={sort} onSort={toggleSort}>
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
            <SortableTableHead field="developer" sort={sort} onSort={toggleSort}>
              Developer
            </SortableTableHead>
            <SortableTableHead field="progress" sort={sort} onSort={toggleSort} className="pr-4">
              Progress
            </SortableTableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProjects.map((project, index) => {
            const isChecked = selected.has(project.id);
            return (
              <motion.tr
                key={project.id}
                data-slot="table-row"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03, ease: "easeOut" }}
                onClick={onProjectClick ? () => onProjectClick(project) : undefined}
                className={cn(
                  "group hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
                  onProjectClick && "cursor-pointer"
                )}
              >
                <TableCell className="py-3 pl-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(v) => toggleOne(project.id, v === true)}
                    aria-label={`Select ${project.projectNo}`}
                  />
                </TableCell>
                <TableCell className="text-foreground font-medium">
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
                    {preconstructionListStatusLabels[project.status]}
                  </span>
                </TableCell>
                <TableCell className="text-foreground font-medium">{project.stage}</TableCell>
                <TableCell className="text-muted-foreground">{project.council}</TableCell>
                <TableCell className="text-muted-foreground">{project.developer}</TableCell>
                <TableCell className="pr-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted h-1 w-32 overflow-hidden rounded-full">
                      <motion.div
                        className="bg-primary h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.03 + 0.15,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                    <span className="text-muted-foreground w-10 text-sm">{project.progress}%</span>
                  </div>
                </TableCell>
              </motion.tr>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
