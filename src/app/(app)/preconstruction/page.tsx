import { AccessDenied } from "@src/components/access-denied";
import { loadGuarded } from "@/features/auth/lib/guard";
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
  const result = await loadGuarded(() =>
    Promise.all([getAllPreconstructionProjects(), getLeadOptions()]),
  );
  if (!result.ok) {
    return (
      <AccessDenied
        title="No access to preconstruction"
        description="Your account doesn't have permission to view preconstruction projects. Contact an administrator if you need access."
      />
    );
  }
  const [projects, options] = result.data;

  return (
    <PreconstructionList
      projects={projects}
      pageSize={PRECON_PAGE_SIZE}
      options={options}
    />
  );
}
