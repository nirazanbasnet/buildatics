import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

import { preconstructionListStatusLabels, type PreconstructionListProject } from "../_data";

type Props = {
  projects: PreconstructionListProject[];
  className?: string;
  onProjectClick?: (project: PreconstructionListProject) => void;
};

function DefRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="text-foreground truncate text-sm font-medium">{value}</dd>
    </div>
  );
}

export function PreconstructionListCardsV2({ projects, className, onProjectClick }: Props) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {projects.map((project) => {
        const interactive = Boolean(onProjectClick);
        return (
          <article
            key={project.id}
            onClick={onProjectClick ? () => onProjectClick(project) : undefined}
            onKeyDown={
              interactive
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onProjectClick?.(project);
                    }
                  }
                : undefined
            }
            role={interactive ? "button" : undefined}
            tabIndex={interactive ? 0 : undefined}
            className={cn(
              "bg-card flex flex-col gap-3 rounded-lg border border-l-4 border-l-emerald-500 p-4",
              interactive &&
                "focus-visible:ring-ring hover:border-foreground/30 cursor-pointer transition-colors hover:border-l-emerald-500 focus-visible:ring-2 focus-visible:outline-none"
            )}
          >
            <header className="flex items-center justify-between gap-2">
              <h3 className="text-foreground font-mono text-lg font-bold tracking-tight">
                {project.projectNo}
              </h3>
              <span className="text-foreground inline-flex items-center gap-1.5 text-xs font-medium">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {preconstructionListStatusLabels[project.status]}
              </span>
            </header>

            <p className="text-muted-foreground flex items-start gap-1.5 text-xs leading-snug">
              <MapPin className="mt-0.5 size-3.5 shrink-0" />
              <span className="line-clamp-2">{project.address}</span>
            </p>

            <dl className="border-border/60 flex flex-col gap-1.5 border-t pt-3">
              <DefRow label="Stage" value={project.stage} />
              <DefRow label="Developer" value={project.developer} />
              <DefRow label="Client" value={project.council} />
            </dl>

            <div className="mt-auto space-y-1.5 pt-1">
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground font-semibold">{project.progress}%</span>
              </div>
              <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
