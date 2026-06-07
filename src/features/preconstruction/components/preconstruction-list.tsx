"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PaginationNav } from "@src/components/pagination-nav";
import type { LeadOptions } from "@/features/leads/types";

import { PreconstructionTable } from "./table/preconstruction-table";
import { PreconstructionEmptyState } from "./table/preconstruction-empty-state";
import { AddProjectSheet } from "./add-project/add-project-sheet";
import { PreconstructionDetailSheet } from "./detail/preconstruction-detail-sheet";
import { downloadPreconstructionCsv } from "../lib/csv";
import type { PreconstructionProject } from "../types";

type PreconstructionListProps = {
  projects: PreconstructionProject[];
  pageSize: number;
  options: LeadOptions;
};

// Orchestrator for the Preconstruction list. The full set is fetched server-side (no API filter), so
// sort (in the table) and pagination happen client-side. Mutations re-run the server page via router.refresh().
export function PreconstructionList({
  projects,
  pageSize,
  options,
}: PreconstructionListProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [activeProject, setActiveProject] =
    useState<PreconstructionProject | null>(null);

  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return projects.slice(start, start + pageSize);
  }, [projects, page, pageSize]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div>
          <h1 className="text-lg font-semibold">Preconstruction</h1>
          <p className="text-muted-foreground text-sm tabular-nums">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => downloadPreconstructionCsv(projects)}
            disabled={projects.length === 0}
          >
            <Download className="size-4" />
            Export CSV
          </Button>
          <Button size="sm" className="h-9" onClick={() => setAddOpen(true)}>
            <Plus className="size-4" />
            Add Project
          </Button>
        </div>
      </div>

      {projects.length === 0 ? (
        <PreconstructionEmptyState />
      ) : (
        <>
          <PreconstructionTable
            projects={pageItems}
            onRowClick={setActiveProject}
          />
          {totalPages > 1 ? (
            <PaginationNav
              totalPages={totalPages}
              page={page}
              onPageChange={setPage}
            />
          ) : null}
        </>
      )}

      <AddProjectSheet
        open={addOpen}
        onOpenChange={setAddOpen}
        options={options}
        onSaved={() => router.refresh()}
      />

      <PreconstructionDetailSheet
        leadId={activeProject?.id ?? null}
        projectNo={activeProject?.projectNo}
        address={activeProject?.address}
        options={options}
        onOpenChange={(o) => !o && setActiveProject(null)}
        onChanged={() => router.refresh()}
      />
    </div>
  );
}
