import { Suspense } from "react";

import { DisplayCenterShowcase } from "../../dashboard/(auth)/templates/display-center/_components/display-center-showcase";
import {
  VARIANT_LAYOUTS,
  type VariantId
} from "../../dashboard/(auth)/templates/display-center/_components/variant-layouts";

type EmbedSearchParams = {
  layout?: string;
  font?: string;
  theme?: string;
  view?: string;
};

function resolveStyle(layout: string | undefined): VariantId {
  const id = Number(layout);
  return id in VARIANT_LAYOUTS ? (id as VariantId) : 7;
}

export default async function DisplayCenterEmbedPage({
  searchParams
}: {
  searchParams: Promise<EmbedSearchParams>;
}) {
  const params = await searchParams;
  const view = params.view === "floor" ? "floor" : "facade";

  return (
    <main className="bg-background min-h-screen p-4">
      <Suspense fallback={<div className="bg-card min-h-96 rounded-2xl border" />}>
        <DisplayCenterShowcase
          style={resolveStyle(params.layout)}
          font={params.font}
          theme={params.theme}
          view={view}
        />
      </Suspense>
    </main>
  );
}
