"use client";

import { useState } from "react";
import { BarChart3, Home, LineChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import type { DataSetupGroup } from "../_data";
import { DataSetupTable } from "./data-setup-table";
import { SettingsToolbar } from "./settings-toolbar";

const itemIcons: Record<string, { icon: LucideIcon; className: string }> = {
  "lead-stages": { icon: BarChart3, className: "text-green-600" },
  "lead-status": { icon: BarChart3, className: "text-green-600" },
  "design-stages": { icon: Home, className: "text-orange-500" },
  "design-status": { icon: Home, className: "text-orange-500" },
  "project-status": { icon: LineChart, className: "text-blue-600" }
};

type Props = {
  groups: DataSetupGroup[];
};

export function DataSetup({ groups }: Props) {
  const allItems = groups.flatMap((group) => group.items);
  const [activeId, setActiveId] = useState(allItems[0]?.id);
  const active = allItems.find((item) => item.id === activeId) ?? allItems[0];

  return (
    <div className="flex flex-col gap-6 lg:flex-row" data-slot="data-setup">
      <nav className="flex shrink-0 flex-col gap-4 lg:w-52" aria-label="Data setup sections">
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-1">
            <p className="text-muted-foreground px-2 text-[11px] font-medium tracking-wider uppercase">
              {group.label}
            </p>
            {group.items.map((item) => {
              const isActive = item.id === active.id;
              const Icon = itemIcons[item.id]?.icon ?? BarChart3;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                    isActive
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <Icon className={cn("size-4 shrink-0", itemIcons[item.id]?.className)} />
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="min-w-0 flex-1">
        <SettingsToolbar addLabel="Add Status" />
        <DataSetupTable columnLabel={active.columnLabel} rows={active.rows} />
      </div>
    </div>
  );
}
