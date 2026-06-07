"use client";

import { AnimatedSection } from "@src/components/animated-section";

import { useState } from "react";

import { cn } from "@/lib/utils";

import type { Lead } from "../_data";

import { LeadsKanban } from "./leads-kanban";
import { PaginationNav } from "@src/components/pagination-nav";
import { LeadsTable } from "./leads-table";
import { LeadsToolbar, type LeadsView } from "./leads-toolbar";

type Props = {
  leads: Lead[];
  className?: string;
};

export function LeadsLayout({ leads, className }: Props) {
  const [view, setView] = useState<LeadsView>("list");

  return (
    <div className={cn("flex flex-col space-y-1 overflow-hidden", className)}>
      <AnimatedSection>
        <LeadsToolbar view={view} onViewChange={setView} />
      </AnimatedSection>
      <AnimatedSection delay={0.04} className="flex-1 overflow-auto">
        {view === "list" ? (
          <LeadsTable leads={leads} />
        ) : (
          <LeadsKanban leads={leads} />
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
