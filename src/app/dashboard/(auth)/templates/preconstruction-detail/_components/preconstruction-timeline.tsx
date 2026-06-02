"use client";

import { Check, Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle
} from "@/components/ui/timeline";

import type { PreconstructionDetailProject } from "../_data";

import { PreconstructionTabLayout } from "./preconstruction-tab-layout";

type Props = {
  project: PreconstructionDetailProject;
  className?: string;
};

export function PreconstructionTimeline({ project, className }: Props) {
  const entries = project.timelineEntries;
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <PreconstructionTabLayout categories={project.categories} className={className}>
      <section className="bg-card rounded-2xl border p-5" data-slot="timeline-card">
        <header className="flex items-center justify-between gap-3 pb-2">
          <h3 className="text-foreground text-lg font-semibold">Timeline</h3>
          <Button size="sm" className="h-9">
            <Plus className="size-4" />
            Add Log
          </Button>
        </header>

        <Timeline defaultValue={0} className="mt-4">
          {entries.map((entry, index) => (
            <TimelineItem key={entry.id} step={index + 1} className="space-y-1">
              <motion.div
                className="flex flex-col gap-0.5"
                {...(reduceMotion
                  ? {}
                  : {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { duration: 0.3, delay: index * 0.05, ease: "easeOut" as const }
                    })}
              >
                <TimelineHeader>
                  <TimelineSeparator className="bg-border" />
                  <div className="flex items-start justify-between gap-3">
                    <TimelineTitle className="text-foreground text-base font-semibold">
                      {entry.title}
                    </TimelineTitle>
                    <span className="text-muted-foreground shrink-0 text-sm">{entry.time}</span>
                  </div>
                  <TimelineIndicator className="flex size-6 items-center justify-center border-0 bg-emerald-500 text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </TimelineIndicator>
                </TimelineHeader>
                <TimelineContent>
                  <TimelineDate className="text-muted-foreground">{entry.date}</TimelineDate>
                </TimelineContent>
              </motion.div>
            </TimelineItem>
          ))}
        </Timeline>
      </section>
    </PreconstructionTabLayout>
  );
}
