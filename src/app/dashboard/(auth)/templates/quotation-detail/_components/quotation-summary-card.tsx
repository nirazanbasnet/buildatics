import { cn } from "@/lib/utils";

import { formatCurrency, gstAmount, quotedCost, totalCost, type QuotationDetail } from "../_data";

type Props = {
  detail: QuotationDetail;
  className?: string;
};

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={cn("text-sm", muted ? "text-muted-foreground" : "text-foreground")}>
        {label}
      </span>
      <span className={cn("text-sm", muted ? "text-muted-foreground" : "text-foreground")}>
        {value}
      </span>
    </div>
  );
}

export function QuotationSummaryCard({ detail, className }: Props) {
  return (
    <section
      className={cn(
        "bg-card rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      data-slot="quotation-summary"
    >
      <h3 className="text-foreground text-base font-semibold">Quotation Summary</h3>
      <div className="mt-4 flex flex-col gap-2.5">
        <Row label="Quoted Cost" value={formatCurrency(quotedCost(detail))} muted />
        <Row label="Gst." value={formatCurrency(gstAmount(detail))} muted />
      </div>
      <div className="border-border mt-4 flex items-center justify-between gap-3 border-t pt-4">
        <span className="text-foreground text-sm font-semibold">Total Cost</span>
        <span className="bg-muted text-foreground rounded-md px-3 py-1 text-sm font-semibold">
          {formatCurrency(totalCost(detail))}
        </span>
      </div>
    </section>
  );
}
