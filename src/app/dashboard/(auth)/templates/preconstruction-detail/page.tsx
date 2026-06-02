import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { parsePreconstructionDetailVariant } from "./_components/variants";

export default async function PreconstructionDetailIndex() {
  const cookieStore = await cookies();
  const variant = parsePreconstructionDetailVariant(
    cookieStore.get("preconstruction_detail_variant")?.value
  );
  const n = variant === "v2" ? 2 : 1;
  redirect(`/dashboard/templates/preconstruction-detail/variant-${n}`);
}
