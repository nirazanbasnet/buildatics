import { cookies } from "next/headers";

// eslint-disable-next-line no-restricted-imports -- importing from src/app/.../templates/ route segment (not the top-level /templates playground). Until shared components are promoted to src/components/, the production brochures page sources its layout from this iteration location.
import { brochures } from "../templates/brochures/_data";
// eslint-disable-next-line no-restricted-imports -- see note above
import { BrochuresLayout } from "../templates/brochures/_components/brochures-layout";
// eslint-disable-next-line no-restricted-imports -- see note above
import { BrochuresLayoutV2 } from "../templates/brochures/_components/brochures-layout-v2";
// eslint-disable-next-line no-restricted-imports -- see note above
import { parseBrochuresVariant } from "../templates/brochures/_components/variants";

export default async function BrochuresPage() {
  const cookieStore = await cookies();
  const brochuresVariant = parseBrochuresVariant(cookieStore.get("brochures_variant")?.value);

  const Layout = brochuresVariant === "v2" ? BrochuresLayoutV2 : BrochuresLayout;

  return <Layout brochures={brochures} detailEnabled />;
}
