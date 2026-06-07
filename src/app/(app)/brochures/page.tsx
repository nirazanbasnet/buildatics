import { AccessDenied } from "@src/components/access-denied";
import { loadGuarded } from "@/features/auth/lib/guard";
import {
  BROCHURES_PAGE_SIZE,
  BrochuresList,
  getAllBrochures,
  getBrochureTemplates,
} from "@/features/brochures";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Brochures",
    description: "Create, preview and manage your company brochures.",
    canonical: "/brochures",
  });
}

export default async function BrochuresPage() {
  const result = await loadGuarded(async () => {
    const templates = await getBrochureTemplates();
    const brochures = await getAllBrochures(templates);
    return { templates, brochures };
  });
  if (!result.ok) {
    return (
      <AccessDenied
        title="No access to brochures"
        description="Your account doesn't have permission to view brochures. Contact an administrator if you need access."
      />
    );
  }
  const { templates, brochures } = result.data;

  return (
    <BrochuresList
      brochures={brochures}
      templates={templates}
      pageSize={BROCHURES_PAGE_SIZE}
    />
  );
}
