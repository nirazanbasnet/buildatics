import { cn } from "@/lib/utils";

import { formatCurrency, grossMargin, quotedCost, type QuotationDetail } from "../_data";

type Props = {
  detail: QuotationDetail;
  className?: string;
};

export function QuotationMarginCard({ detail, className }: Props) {
  return (
    <section
      className={cn(
        "bg-card rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      data-slot="quotation-margin"
    >
      <h3 className="text-foreground flex flex-wrap items-center gap-2 text-base font-semibold">
        Internal Margin
        <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase">
          Coming Soon
        </span>
      </h3>
      <div className="mt-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-muted-foreground text-sm">Quoted Cost</span>
          <span className="text-muted-foreground text-sm">
            {formatCurrency(quotedCost(detail))}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-muted-foreground text-sm">Estimated Cost</span>
          <span className="text-muted-foreground text-sm">
            -{formatCurrency(detail.estimatedCost)}
          </span>
        </div>
      </div>
      <div className="border-border mt-4 flex items-center justify-between gap-3 border-t pt-4">
        <span className="text-foreground text-sm font-semibold">Gross Margin</span>
        <span className="bg-muted text-foreground rounded-md px-3 py-1 text-sm font-semibold">
          {formatCurrency(grossMargin(detail))}
        </span>
      </div>
    </section>
  );
}
