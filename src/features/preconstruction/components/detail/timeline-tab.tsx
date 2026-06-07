"use client";

import { useState, useTransition } from "react";
import { Check, Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";

import { addTimelineLog } from "../../actions/timeline";
import type {
  ProjectOverview,
  ProjectTimelineEntry,
} from "../../lib/detail-types";
import { TabLayout } from "./tab-layout";

type TimelineTabProps = {
  overview: ProjectOverview;
  leadId: string;
  timeline: ProjectTimelineEntry[];
  onChanged: () => void;
};

export function TimelineTab({
  overview,
  leadId,
  timeline,
  onChanged,
}: TimelineTabProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [addOpen, setAddOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [isPending, startTransition] = useTransition();

  function add() {
    startTransition(async () => {
      const res = await addTimelineLog(leadId, { summary, details });
      if (res.ok) {
        toast.success("Log added");
        setAddOpen(false);
        setSummary("");
        setDetails("");
        onChanged();
      } else {
        toast.error(res.error ?? "Failed to add the log.");
      }
    });
  }

  return (
    <TabLayout overview={overview}>
      <section
        className="bg-card rounded-2xl border p-5"
        data-slot="timeline-card"
      >
        <header className="flex items-center justify-between gap-3 pb-2">
          <h3 className="text-foreground text-lg font-semibold">Timeline</h3>
          <Button size="sm" className="h-9" onClick={() => setAddOpen(true)}>
            <Plus className="size-4" />
            Add log
          </Button>
        </header>

        {timeline.length === 0 ? (
          <p className="text-muted-foreground rounded-lg border border-dashed py-10 text-center text-sm">
            No activity yet.
          </p>
        ) : (
          <Timeline defaultValue={timeline.length} className="mt-4">
            {timeline.map((entry, index) => (
              <TimelineItem
                key={entry.id}
                step={index + 1}
                className="space-y-1"
              >
                <motion.div
                  className="flex flex-col gap-0.5"
                  {...(reduceMotion
                    ? {}
                    : {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        transition: {
                          duration: 0.3,
                          delay: index * 0.05,
                          ease: "easeOut" as const,
                        },
                      })}
                >
                  <TimelineHeader>
                    <TimelineSeparator className="bg-border" />
                    <div className="flex items-start justify-between gap-3">
                      <TimelineTitle className="text-foreground text-base font-semibold">
                        {entry.summary}
                      </TimelineTitle>
                      <span className="text-muted-foreground shrink-0 text-sm">
                        {entry.performedBy !== "—" ? entry.performedBy : ""}
                      </span>
                    </div>
                    <TimelineIndicator className="flex size-6 items-center justify-center border-0 bg-emerald-500 text-white">
                      <Check className="size-3.5" strokeWidth={3} />
                    </TimelineIndicator>
                  </TimelineHeader>
                  <TimelineContent>
                    {entry.details ? (
                      <p className="text-foreground/90 text-sm">
                        {entry.details}
                      </p>
                    ) : null}
                    <TimelineDate className="text-muted-foreground">
                      {entry.occurredOn}
                    </TimelineDate>
                  </TimelineContent>
                </motion.div>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </section>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add log</DialogTitle>
            <DialogDescription>
              Record a manual activity on this project.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="log-summary">Summary</Label>
              <Input
                id="log-summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="What happened?"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="log-details">Details</Label>
              <Textarea
                id="log-details"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Optional details"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={add} disabled={isPending || !summary.trim()}>
              {isPending ? "Adding…" : "Add log"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TabLayout>
  );
}
