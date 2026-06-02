import type { PreconstructionDetailProject } from "../_data";

import { PreconstructionDetailActions } from "./preconstruction-detail-actions";
import { PreconstructionDetailCategoryProgress } from "./preconstruction-detail-category-progress";
import { PreconstructionDetailContacts } from "./preconstruction-detail-contacts";
import { PreconstructionDetailHeader } from "./preconstruction-detail-header";
import { PreconstructionDetailNotes } from "./preconstruction-detail-notes";
import { PreconstructionDetailOwners } from "./preconstruction-detail-owners";
import { PreconstructionDetailStats } from "./preconstruction-detail-stats";

type Props = {
  project: PreconstructionDetailProject;
};

export function PreconstructionDetailOverview({ project }: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-4">
        <PreconstructionDetailHeader project={project} />
        <PreconstructionDetailStats project={project} />
        <PreconstructionDetailOwners owners={project.owners} />
        <PreconstructionDetailContacts contacts={project.contacts} />
        <PreconstructionDetailNotes />
      </div>
      <aside className="flex flex-col gap-3">
        <PreconstructionDetailCategoryProgress categories={project.categories} />
        <PreconstructionDetailActions />
      </aside>
    </div>
  );
}
