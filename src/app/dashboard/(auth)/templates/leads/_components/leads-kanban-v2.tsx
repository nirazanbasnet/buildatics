"use client";

import { useState } from "react";
import { DollarSign, GripVertical, Phone, PlusCircleIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as Kanban from "@/components/ui/kanban";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { groupLeadsByStage, leadStages, leadStatusLabels, type Lead } from "../_data";

type Props = {
  leads: Lead[];
  className?: string;
};

function ProgressChip({ value }: { value: number }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * value) / 100;
  return (
    <div className="flex items-center gap-2 rounded-lg border p-1">
      <div className="relative size-4">
        <svg
          className="size-full -rotate-90"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            className="stroke-current text-gray-200 dark:text-neutral-700"
            strokeWidth="2"
          />
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            className={cn("stroke-current", {
              "text-green-600!": value === 100,
              "text-orange-500!": value > 50 && value < 100
            })}
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
      </div>
      {`${value}%`}
    </div>
  );
}

function LeadKanbanCardV2({ lead }: { lead: Lead }) {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle className="text-base font-semibold">{lead.leadNo}</CardTitle>
        <CardDescription>{lead.address}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-muted-foreground flex items-center justify-between text-sm">
          <div className="flex -space-x-2 overflow-hidden">
            {lead.assignees.map((a) => (
              <Avatar key={a.initials} className="border-background border-2">
                <AvatarFallback>{a.initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
        <Separator />
        <div className="text-muted-foreground flex items-center justify-between text-sm">
          <Badge className="capitalize" variant="outline">
            {leadStatusLabels[lead.status]}
          </Badge>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span className="text-xs">{lead.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs">{lead.budget}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function LeadsKanbanV2({ leads, className }: Props) {
  const [columns, setColumns] = useState<Record<string, Lead[]>>(() => groupLeadsByStage(leads));

  return (
    <TooltipProvider>
      <Kanban.Root value={columns} onValueChange={setColumns} getItemValue={(item) => item.id}>
        <Kanban.Board className={cn("flex w-full gap-4 overflow-x-auto pb-4", className)}>
          {leadStages.map((stage) => {
            const items = columns[stage.id] ?? [];
            return (
              <Kanban.Column key={stage.id} value={stage.id} className="w-[340px] min-w-[340px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{stage.name}</span>
                    <Badge variant="outline">{items.length}</Badge>
                  </div>
                  <div className="flex">
                    <Kanban.ColumnHandle asChild>
                      <Button variant="ghost" size="icon">
                        <GripVertical className="h-4 w-4" />
                      </Button>
                    </Kanban.ColumnHandle>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <PlusCircleIcon />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add Lead</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                {items.length > 0 ? (
                  <div className="flex flex-col gap-2 p-0.5">
                    {items.map((lead) => (
                      <Kanban.Item key={lead.id} value={lead.id} asHandle asChild>
                        <div>
                          <LeadKanbanCardV2 lead={lead} />
                        </div>
                      </Kanban.Item>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col justify-center gap-4 pt-4">
                    <div className="text-muted-foreground text-sm">No lead added here.</div>
                    <Button variant="outline">Add Lead</Button>
                  </div>
                )}
              </Kanban.Column>
            );
          })}
        </Kanban.Board>
        <Kanban.Overlay>
          <div className="bg-primary/10 size-full rounded-md" />
        </Kanban.Overlay>
      </Kanban.Root>
    </TooltipProvider>
  );
}
