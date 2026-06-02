// eslint-disable-next-line no-restricted-imports -- importing from src/app/.../templates/ route segment (not the top-level /templates playground). Until shared components are promoted to src/components/, the production preconstruction-list page sources its layout from this iteration location.
import { preconstructionListProjects } from "../templates/preconstruction-list/_data";
// eslint-disable-next-line no-restricted-imports -- see note above
import { PreconstructionListLayout } from "../templates/preconstruction-list/_components/preconstruction-list-layout";

export default function PreconstructionListPage() {
  return (
    <PreconstructionListLayout
      projects={preconstructionListProjects}
      detailEnabled
      detailVariant="v1"
    />
  );
}
