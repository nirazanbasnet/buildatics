import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { parsePreconstructionListVariant } from "./_components/variants";

export default async function PreconstructionListIndex() {
  const cookieStore = await cookies();
  const variant = parsePreconstructionListVariant(
    cookieStore.get("preconstruction_list_variant")?.value
  );
  const n = variant === "v2" ? 2 : 1;
  redirect(`/dashboard/templates/preconstruction-list/variant-${n}`);
}
