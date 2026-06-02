import { Bell } from "lucide-react";

import { cn } from "@/lib/utils";

import type { BrochureHistoryEntry } from "../_data";

type Props = {
  entries: BrochureHistoryEntry[];
  className?: string;
};

export function BrochureHistory({ entries, className }: Props) {
  return (
    <section
      className={cn("bg-card rounded-2xl border p-5", className)}
      data-slot="brochure-history"
    >
      <h3 className="text-foreground text-base font-semibold">History</h3>
      <ul className="mt-4 flex flex-col">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="border-border/60 flex items-start gap-3 border-b py-3 first:pt-0 last:border-b-0 last:pb-0"
          >
            <span className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full">
              <Bell className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-foreground text-sm font-semibold">{entry.message}</p>
              <p className="text-muted-foreground text-xs">By: {entry.by}</p>
            </div>
            <span className="text-muted-foreground shrink-0 text-xs">{entry.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
