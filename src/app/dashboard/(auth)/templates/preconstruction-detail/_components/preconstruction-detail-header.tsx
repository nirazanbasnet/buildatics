import { ChevronDown, MapPin, MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { PreconstructionDetailProject } from "../_data";

type Props = {
  project: PreconstructionDetailProject;
};

export function PreconstructionDetailHeader({ project }: Props) {
  return (
    <section className="bg-card rounded-2xl border p-5">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-foreground text-2xl font-bold tracking-tight">{project.projectNo}</h2>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            In Progress
            <ChevronDown className="size-3.5" />
          </button>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="size-9 rounded-md"
          aria-label="More actions"
        >
          <MoreVertical className="size-4" />
        </Button>
      </header>

      <div className="mt-4 flex items-start gap-3">
        <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
          <MapPin className="size-4" />
        </span>
        <p className="text-foreground self-center text-sm">{project.address}</p>
      </div>
    </section>
  );
}
