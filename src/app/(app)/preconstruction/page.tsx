import {
  PreconstructionList,
  PRECON_PAGE_SIZE,
  getAllPreconstructionProjects,
} from "@/features/preconstruction";
import { getLeadOptions } from "@/features/leads/lib/get-lead-options";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Preconstruction",
    description: "Track preconstruction projects across the build pipeline.",
    canonical: "/preconstruction",
  });
}

export default async function PreconstructionPage() {
  const [projects, options] = await Promise.all([
    getAllPreconstructionProjects(),
    getLeadOptions(),
  ]);

  return (
    <PreconstructionList
      projects={projects}
      pageSize={PRECON_PAGE_SIZE}
      options={options}
    />
  );
}
