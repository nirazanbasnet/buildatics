"use client";

import { AnimatedSection } from "@src/components/animated-section";

import { useState } from "react";

import { cn } from "@/lib/utils";

import type { Lead } from "../_data";

import { LeadsKanbanV2 } from "./leads-kanban-v2";
import { PaginationNav } from "@src/components/pagination-nav";
import { LeadsTableV2 } from "./leads-table-v2";
import { LeadsToolbar, type LeadsView } from "./leads-toolbar";

type Props = {
  leads: Lead[];
  className?: string;
};

export function LeadsLayoutV2({ leads, className }: Props) {
  const [view, setView] = useState<LeadsView>("list");

  return (
    <div className={cn("space-y-1", className)}>
      <AnimatedSection>
        <LeadsToolbar view={view} onViewChange={setView} />
      </AnimatedSection>
      <AnimatedSection delay={0.04}>
        {view === "list" ? (
          <LeadsTableV2 leads={leads} />
        ) : (
          <LeadsKanbanV2 leads={leads} />
        )}
      </AnimatedSection>
      {view === "list" ? (
        <AnimatedSection delay={0.08}>
          <PaginationNav />
        </AnimatedSection>
      ) : null}
    </div>
  );
}
