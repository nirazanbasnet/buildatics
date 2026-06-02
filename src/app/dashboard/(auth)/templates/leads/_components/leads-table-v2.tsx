import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

import { leadStatusLabels, type Lead } from "../_data";

type Props = {
  leads: Lead[];
  className?: string;
  onLeadClick?: (lead: Lead) => void;
};

function ProgressRing({ value }: { value: number }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;
  return (
    <div className="relative size-12 shrink-0">
      <svg className="size-12 -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={radius} className="stroke-muted fill-none" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-foreground fill-none transition-all"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="text-foreground absolute inset-0 flex items-center justify-center text-xs font-semibold">
        {value}%
      </span>
    </div>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
        {label}
      </p>
      <p className="text-foreground truncate text-sm font-medium">{value}</p>
    </div>
  );
}

export function LeadsTableV2({ leads, className, onLeadClick }: Props) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {leads.map((lead) => {
        const interactive = Boolean(onLeadClick);
        return (
          <article
            key={lead.id}
            onClick={onLeadClick ? () => onLeadClick(lead) : undefined}
            onKeyDown={
              interactive
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onLeadClick?.(lead);
                    }
                  }
                : undefined
            }
            role={interactive ? "button" : undefined}
            tabIndex={interactive ? 0 : undefined}
            className={cn(
              "bg-card flex items-stretch gap-4 rounded-lg border p-4 transition duration-300",
              interactive &&
                "focus-visible:ring-ring cursor-pointer hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:outline-none"
            )}
          >
            <div className="flex min-w-fit flex-col items-start justify-between gap-2">
              <span className="bg-muted text-foreground rounded-md px-2 py-1 font-mono text-sm font-bold tracking-tight">
                {lead.leadNo}
              </span>
              <span className="text-foreground inline-flex items-center gap-1.5 text-xs font-medium">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {leadStatusLabels[lead.status]}
              </span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
              <div className="flex items-center gap-1.5 text-sm">
                <MapPin className="text-muted-foreground size-4 shrink-0" />
                <span className="text-foreground truncate">{lead.address}</span>
              </div>
              <dl className="grid grid-cols-3 gap-x-4">
                <MetaCell label="Stage" value={lead.stage} />
                <MetaCell label="Budget" value={lead.budget} />
                <MetaCell label="Client" value={lead.client} />
              </dl>
            </div>

            <div className="flex items-center">
              <ProgressRing value={lead.progress} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
