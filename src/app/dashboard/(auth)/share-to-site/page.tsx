import { cookies } from "next/headers";

// eslint-disable-next-line no-restricted-imports -- importing from src/app/.../templates/ route segment (not the top-level /templates playground). Until shared components are promoted to src/components/, the production share-to-site page sources its layout from this iteration location.
import { ShareToSiteLayout } from "../templates/share-to-site/_components/share-to-site-layout";

export default async function ShareToSitePage() {
  // Read cookies so the route renders dynamically (the promoted variant currently
  // shares one layout; reading here also keeps the search-params-driven preview happy).
  await cookies();

  return <ShareToSiteLayout />;
}
