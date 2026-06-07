import { AccessDenied } from "@src/components/access-denied";
import { loadGuarded } from "@/features/auth/lib/guard";
import { DataSetup, getDataSetup } from "@/features/settings";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Settings — Data Setup",
    description: "Configure pipeline stages and reference data.",
    canonical: "/settings/data-setup",
  });
}

export default async function DataSetupPage() {
  const result = await loadGuarded(() => getDataSetup());
  if (!result.ok) {
    return (
      <AccessDenied
        title="No access to data setup"
        description="Your account doesn't have permission to configure data setup. Contact an administrator if you need access."
      />
    );
  }
  return <DataSetup groups={result.data} />;
}
