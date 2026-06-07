import { AccessDenied } from "@src/components/access-denied";
import { loadGuarded } from "@/features/auth/lib/guard";
import {
  getAllQuotes,
  getQuoteLeadOptions,
  QuotationList,
  QUOTES_PAGE_SIZE,
} from "@/features/quotation";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Quotation",
    description: "Track and manage sales quotations across leads.",
    canonical: "/quotation",
  });
}

export default async function QuotationPage() {
  const result = await loadGuarded(() =>
    Promise.all([getAllQuotes(), getQuoteLeadOptions()]),
  );
  if (!result.ok) {
    return (
      <AccessDenied
        title="No access to quotations"
        description="Your account doesn't have permission to view quotations. Contact an administrator if you need access."
      />
    );
  }
  const [quotes, leads] = result.data;

  return (
    <QuotationList
      initialItems={quotes.slice(0, QUOTES_PAGE_SIZE)}
      initialTotal={quotes.length}
      leads={leads}
      pageSize={QUOTES_PAGE_SIZE}
    />
  );
}
