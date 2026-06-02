import { cookies } from "next/headers";

// eslint-disable-next-line no-restricted-imports -- importing from src/app/.../templates/ route segment (not the top-level /templates playground). Until shared components are promoted to src/components/, the production quotation page sources its layout from this iteration location.
import { quotations } from "../templates/quotation/_data";
// eslint-disable-next-line no-restricted-imports -- see note above
import { QuotationLayout } from "../templates/quotation/_components/quotation-layout";
// eslint-disable-next-line no-restricted-imports -- see note above
import { QuotationLayoutV2 } from "../templates/quotation/_components/quotation-layout-v2";
// eslint-disable-next-line no-restricted-imports -- see note above
import { parseQuotationVariant } from "../templates/quotation/_components/variants";

export default async function QuotationPage() {
  const cookieStore = await cookies();
  const quotationVariant = parseQuotationVariant(cookieStore.get("quotation_variant")?.value);

  const Layout = quotationVariant === "v2" ? QuotationLayoutV2 : QuotationLayout;

  return <Layout quotations={quotations} detailEnabled />;
}
