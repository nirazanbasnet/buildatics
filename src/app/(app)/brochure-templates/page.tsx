import { ShieldAlert } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getProfile } from "@/features/profile";
import {
  BrochureTemplatesList,
  getAllBrochureTemplates,
} from "@/features/brochure-templates";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Brochure Templates",
    description: "Manage the brochure templates available to your company.",
    canonical: "/brochure-templates",
  });
}

export default async function BrochureTemplatesPage() {
  // BrochureTemplatesA enforces the Admin role (403 otherwise); gate the page too for a clear message.
  const profile = await getProfile();
  const isAdmin = (profile.roles ?? []).includes("Admin");

  if (!isAdmin) {
    return (
      <Empty className="h-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShieldAlert />
          </EmptyMedia>
          <EmptyTitle>Admins only</EmptyTitle>
          <EmptyDescription>
            You need the Admin role to manage brochure templates. Contact an
            administrator if you need access.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const templates = await getAllBrochureTemplates();

  return <BrochureTemplatesList templates={templates} />;
}
