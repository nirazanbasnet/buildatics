import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

import { brochureStatusConfig, type Brochure } from "../_data";
import { BrochuresActionsMenu } from "./brochures-actions-menu";

type Props = {
  brochures: Brochure[];
  className?: string;
  onBrochureClick?: (brochure: Brochure) => void;
};

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

export function BrochuresTableV2({ brochures, className, onBrochureClick }: Props) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {brochures.map((brochure) => {
        const status = brochureStatusConfig[brochure.status];
        const interactive = Boolean(onBrochureClick);
        return (
          <article
            key={brochure.id}
            onClick={onBrochureClick ? () => onBrochureClick(brochure) : undefined}
            onKeyDown={
              interactive
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onBrochureClick?.(brochure);
                    }
                  }
                : undefined
            }
            role={interactive ? "button" : undefined}
            tabIndex={interactive ? 0 : undefined}
            className={cn(
              "bg-card relative flex items-stretch gap-4 overflow-hidden rounded-lg border py-4 pr-3 pl-5 transition duration-300",
              interactive &&
                "focus-visible:ring-ring cursor-pointer hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:outline-none"
            )}
          >
            <span className={cn("absolute inset-y-0 left-0 w-1", status.stripe)} aria-hidden />

            <div className="flex min-w-fit flex-col items-start justify-between gap-2">
              <span className="bg-muted text-foreground rounded-md px-2 py-1 font-mono text-sm font-bold tracking-tight">
                {brochure.ref}
              </span>
              <span className="text-foreground inline-flex items-center gap-1.5 text-xs font-medium">
                <span className={cn("size-1.5 rounded-full", status.dot)} />
                {status.label}
              </span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-foreground text-sm font-semibold">{brochure.design}</span>
                <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                  <MapPin className="size-3.5 shrink-0" />
                  {brochure.siteAddress}
                </span>
              </div>
              <dl className="grid grid-cols-2 gap-x-4">
                <MetaCell label="Client" value={brochure.client} />
                <MetaCell label="Created Date" value={brochure.createdDate} />
              </dl>
            </div>

            <div className="flex items-center pl-2" onClick={(e) => e.stopPropagation()}>
              <BrochuresActionsMenu
                brochureRef={brochure.ref}
                onView={onBrochureClick ? () => onBrochureClick(brochure) : undefined}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
