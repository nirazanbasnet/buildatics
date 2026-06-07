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
  const [quotes, leads] = await Promise.all([
    getAllQuotes(),
    getQuoteLeadOptions(),
  ]);

  return (
    <QuotationList
      initialItems={quotes.slice(0, QUOTES_PAGE_SIZE)}
      initialTotal={quotes.length}
      leads={leads}
      pageSize={QUOTES_PAGE_SIZE}
    />
  );
}
