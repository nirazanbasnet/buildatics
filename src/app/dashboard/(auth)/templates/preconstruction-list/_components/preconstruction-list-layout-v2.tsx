"use client";

import { AnimatedSection } from "@src/components/animated-section";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { preconstructionDetailMock } from "../../preconstruction-detail/_data";
import { PreconstructionDetailSheet } from "../../preconstruction-detail/_components/preconstruction-detail-sheet";
import type { PreconstructionDetailVariantId } from "../../preconstruction-detail/_components/variants";
import type { PreconstructionListProject } from "../_data";

import { PreconstructionListCardsV2 } from "./preconstruction-list-cards-v2";
import { PaginationNav } from "@src/components/pagination-nav";
import { PreconstructionListTableV2 } from "./preconstruction-list-table-v2";
import {
  PreconstructionListToolbar,
  type PreconstructionListView
} from "./preconstruction-list-toolbar";

type Props = {
  projects: PreconstructionListProject[];
  className?: string;
  detailEnabled?: boolean;
  detailVariant?: PreconstructionDetailVariantId;
};

export function PreconstructionListLayoutV2({
  projects,
  className,
  detailEnabled,
  detailVariant
}: Props) {
  const [view, setView] = useState<PreconstructionListView>("list");
  const [selected, setSelected] = useState<PreconstructionListProject | null>(null);

  const handleProjectClick = detailEnabled ? setSelected : undefined;

  return (
    <>
      <div className={cn("space-y-1", className)}>
        <AnimatedSection>
          <PreconstructionListToolbar view={view} onViewChange={setView} />
        </AnimatedSection>
        <AnimatedSection delay={0.04}>
          {view === "list" ? (
            <PreconstructionListTableV2 projects={projects} onProjectClick={handleProjectClick} />
          ) : (
            <PreconstructionListCardsV2 projects={projects} onProjectClick={handleProjectClick} />
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
            address: selected.address
          }}
          variant={detailVariant}
        />
      ) : null}
    </>
  );
}
