"use client";

import { AnimatedSection } from "@src/components/animated-section";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { SegmentedNav } from "@src/components/ui/segmented-nav";
import { cn } from "@/lib/utils";

import {
  preconstructionDetailTabItems,
  preconstructionDetailTabs,
  type PreconstructionDetailProject,
  type PreconstructionDetailTab,
} from "../_data";

import { DocumentsV1 } from "./documents-v1";
import { ItiPreconstructionV1 } from "./iti-preconstruction-v1";
import { PreconstructionDetailOverview } from "./preconstruction-detail-overview";
import { PreconstructionTasks } from "./preconstruction-tasks";
import { PreconstructionTimeline } from "./preconstruction-timeline";

type Props = {
  project: PreconstructionDetailProject;
  className?: string;
};

export function PreconstructionDetailLayout({ project, className }: Props) {
  const [activeTab, setActiveTab] = useState<PreconstructionDetailTab>(
    preconstructionDetailTabs[0],
  );
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? 0 : 8;

  const tabContent =
    activeTab === "Overview" ? (
      <PreconstructionDetailOverview project={project} />
    ) : activeTab === "ITI Preconstruction" ? (
      <ItiPreconstructionV1 project={project} />
    ) : activeTab === "Tasks" ? (
      <PreconstructionTasks project={project} />
    ) : activeTab === "Documents" ? (
      <DocumentsV1 project={project} />
    ) : activeTab === "Timeline" ? (
      <PreconstructionTimeline project={project} />
    ) : (
      <div className="text-muted-foreground rounded-md border border-dashed py-12 text-center text-sm">
        {activeTab} — to be designed
      </div>
    );

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <AnimatedSection>
        <SegmentedNav
          items={preconstructionDetailTabItems}
          value={activeTab}
          onValueChange={setActiveTab}
          ariaLabel="Preconstruction views"
        />
      </AnimatedSection>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: offset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -offset }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {tabContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
