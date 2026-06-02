"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronRight, MapPin, Phone, Plus, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Kanban from "@/components/ui/kanban";
import { cn } from "@/lib/utils";

import { groupLeadsByStage, leadStages, leadStatusLabels, type Lead } from "../_data";

type Props = {
  leads: Lead[];
  className?: string;
};

function InfoRow({
  icon: Icon,
  label,
  value
}: {
  icon: typeof MapPin;
  label?: string;
  value: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-4" />
      </span>
      {label ? (
        <>
          <span className="text-foreground flex-1 self-center text-sm font-medium">{label}</span>
          <span className="text-muted-foreground self-center text-sm">{value}</span>
        </>
      ) : (
        <span className="text-foreground flex-1 self-center text-sm leading-snug">{value}</span>
      )}
    </li>
  );
}

function LeadKanbanCard({ lead, index = 0 }: { lead: Lead; index?: number }) {
  const reduceMotion = useReducedMotion() ?? false;
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      className="bg-card flex flex-col gap-4 rounded-2xl border p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <header className="flex items-start justify-between gap-3">
        <h3 className="text-foreground text-lg font-bold tracking-tight">{lead.leadNo}</h3>
        <span className="inline-flex min-w-24 items-center justify-center rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-medium text-white dark:bg-emerald-600">
          {leadStatusLabels[lead.status]}
        </span>
      </header>

      <ul className="flex flex-col gap-2.5">
        <InfoRow icon={MapPin} value={lead.address} />
        <InfoRow icon={User} label="Client" value={lead.client} />
        <InfoRow icon={Settings} label="Stage" value={lead.stage} />
        <InfoRow icon={Phone} label="Phone" value={lead.phone} />
      </ul>

      <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
        <div className="bg-primary h-full rounded-full" style={{ width: `${lead.progress}%` }} />
      </div>

      <footer className="flex items-center justify-between gap-3 pt-1">
        <div className="flex -space-x-2">
          {lead.assignees.map((a) => (
            <Avatar key={a.initials} className="border-card bg-card size-7 border-2" title={a.name}>
              <AvatarFallback className="bg-muted text-foreground text-[10px] font-semibold">
                {a.initials}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <button
          type="button"
          className="text-foreground hover:text-foreground/80 focus-visible:ring-ring inline-flex items-center gap-1 rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          See Details
          <ChevronRight className="size-4" />
        </button>
      </footer>
    </motion.article>
  );
}

export function LeadsKanban({ leads, className }: Props) {
  const [columns, setColumns] = useState<Record<string, Lead[]>>(() => groupLeadsByStage(leads));

  return (
    <Kanban.Root value={columns} onValueChange={setColumns} getItemValue={(item) => item.id}>
      <Kanban.Board className={cn("flex w-full gap-4 overflow-x-auto pb-2", className)}>
        {leadStages.map((stage) => {
          const items = columns[stage.id] ?? [];
          return (
            <Kanban.Column
              key={stage.id}
              value={stage.id}
              className="bg-muted/40 w-[340px] min-w-[340px] rounded-2xl p-3"
            >
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-sm font-semibold">{stage.name}</span>
                  <Badge variant="outline" className="bg-background h-5 rounded-md px-1.5 text-xs">
                    {items.length}
                  </Badge>
                </div>
                <Button
                  type="button"
                  size="icon"
                  className="bg-foreground text-background hover:bg-foreground/90 size-7 rounded-md"
                  aria-label={`Add lead to ${stage.name}`}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                {items.map((lead, index) => (
                  <Kanban.Item key={lead.id} value={lead.id} asHandle asChild>
                    <div>
                      <LeadKanbanCard lead={lead} index={index} />
                    </div>
                  </Kanban.Item>
                ))}
              </div>
            </Kanban.Column>
          );
        })}
      </Kanban.Board>
      <Kanban.Overlay>
        <div className="bg-primary/10 size-full rounded-2xl" />
      </Kanban.Overlay>
    </Kanban.Root>
  );
}
