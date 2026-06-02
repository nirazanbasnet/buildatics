import { DollarSign } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { financeStats } from "../_data";

export function FinanceStatCards({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}>
      {financeStats.map((stat) => (
        <Card
          key={stat.id}
          className="py-0 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <CardContent className="flex items-start justify-between gap-3 p-5">
            <div className="min-w-0 space-y-1">
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className={cn("text-2xl font-bold tracking-tight", stat.valueClass)}>
                {stat.value}
              </p>
              {stat.subtext ? (
                <p className="text-muted-foreground text-xs">{stat.subtext}</p>
              ) : null}
            </div>
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full border",
                stat.accentClass
              )}
            >
              <DollarSign className="size-4" />
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
