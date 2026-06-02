import { cn } from "@/lib/utils";

import { outstandingClaims } from "../_data";

export function FinanceOverview({ className }: { className?: string }) {
  return (
    <section
      className={cn("bg-card h-full overflow-auto rounded-lg border", className)}
      data-slot="finance-overview"
    >
      <header className="bg-muted/50 border-b px-5 py-3">
        <h3 className="text-foreground text-base font-semibold">Outstanding Claims</h3>
      </header>
      <ul className="divide-border divide-y">
        {outstandingClaims.map((claim) => (
          <li key={claim.id} className="flex items-start justify-between gap-4 px-5 py-4">
            <div className="min-w-0 space-y-1">
              <p className="text-foreground text-sm font-semibold">{claim.client}</p>
              <p className="text-muted-foreground text-xs">{claim.meta}</p>
              {claim.warning ? (
                <p
                  className={cn(
                    "text-xs",
                    claim.warning.tone === "danger" ? "text-red-600" : "text-amber-600"
                  )}
                >
                  {claim.warning.text}
                </p>
              ) : null}
            </div>
            <span className="shrink-0 text-sm font-semibold text-red-600">{claim.amount}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
