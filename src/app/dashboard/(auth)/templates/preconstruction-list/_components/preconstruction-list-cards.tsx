import { cn } from "@/lib/utils";

import type { PreconstructionListProject } from "../_data";

import { PreconstructionListCard } from "./preconstruction-list-card";

type Props = {
  projects: PreconstructionListProject[];
  className?: string;
  onProjectClick?: (project: PreconstructionListProject) => void;
};

export function PreconstructionListCards({ projects, className, onProjectClick }: Props) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {projects.map((project, index) => (
        <PreconstructionListCard
          key={project.id}
          project={project}
          index={index}
          onClick={onProjectClick ? () => onProjectClick(project) : undefined}
        />
      ))}
    </div>
  );
}
