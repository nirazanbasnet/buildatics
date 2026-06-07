"use client";

import { AnimatedSection } from "@src/components/animated-section";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { preconstructionDetailMock } from "../../preconstruction-detail/_data";
import { PreconstructionDetailSheet } from "../../preconstruction-detail/_components/preconstruction-detail-sheet";
import type { PreconstructionDetailVariantId } from "../../preconstruction-detail/_components/variants";
import type { PreconstructionListProject } from "../_data";

import { PreconstructionListCards } from "./preconstruction-list-cards";
import { PaginationNav } from "@src/components/pagination-nav";
import { PreconstructionListTable } from "./preconstruction-list-table";
import {
  PreconstructionListToolbar,
  type PreconstructionListView,
} from "./preconstruction-list-toolbar";

type Props = {
  projects: PreconstructionListProject[];
  className?: string;
  detailEnabled?: boolean;
  detailVariant?: PreconstructionDetailVariantId;
};

export function PreconstructionListLayout({
  projects,
  className,
  detailEnabled,
  detailVariant,
}: Props) {
  const [view, setView] = useState<PreconstructionListView>("list");
  const [selected, setSelected] = useState<PreconstructionListProject | null>(
    null,
  );

  const handleProjectClick = detailEnabled ? setSelected : undefined;

  return (
    <>
      <div className={cn("space-y-1", className)}>
        <AnimatedSection>
          <PreconstructionListToolbar view={view} onViewChange={setView} />
        </AnimatedSection>
        <AnimatedSection delay={0.04} className="flex-1 overflow-auto">
          {view === "list" ? (
            <PreconstructionListTable
              projects={projects}
              onProjectClick={handleProjectClick}
            />
          ) : (
            <PreconstructionListCards
              projects={projects}
              onProjectClick={handleProjectClick}
            />
          )}
        </AnimatedSection>
        <AnimatedSection delay={0.08}>
          <PaginationNav />
        </AnimatedSection>
      </div>
      {detailEnabled && selected ? (
        <PreconstructionDetailSheet
          open
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
          project={{
            ...preconstructionDetailMock,
            id: selected.id,
            projectNo: selected.projectNo,
            address: selected.address,
          }}
          variant={detailVariant}
        />
      ) : null}
    </>
  );
}
