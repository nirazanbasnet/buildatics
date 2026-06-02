import type { ReactNode } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type VariantLink = {
  id: string;
  label: string;
  href: string;
};

type Props = {
  /** Display name of the design (e.g. "Display Center Filter"). */
  designName: string;
  /** Variant identifier (e.g. "V1" or "Variant 1"). */
  variant: string;
  /** Short subtitle describing this variant. */
  subtitle?: string;
  /** Right-side action slot — typically the Use This button. */
  action?: ReactNode;
  /** Sibling variants to switch between. The matching id is highlighted. */
  variants?: VariantLink[];
  /** Active variant id within `variants`. */
  activeVariant?: string;
  /** Id of the variant currently promoted to production (shows a "Selected" badge). */
  promotedVariant?: string;
};

export function VariantHeader({
  designName,
  variant,
  subtitle,
  action,
  variants,
  activeVariant,
  promotedVariant
}: Props) {
  const isActivePromoted = activeVariant !== undefined && activeVariant === promotedVariant;

  return (
    <div className="border-border bg-muted/40 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-md border p-2 px-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {designName}
          </p>
          <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider">
            {variant}
          </span>
          {isActivePromoted ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-700 dark:text-emerald-400">
              <Check className="size-3" />
              Selected
            </span>
          ) : null}
        </div>
        {subtitle ? <p className="text-sm font-medium">{subtitle}</p> : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {variants && variants.length > 1 ? (
          <div className="border-border bg-background flex items-center gap-1 rounded-md border p-0.5">
            {variants.map((v) => {
              const isActive = v.id === activeVariant;
              const isPromoted = v.id === promotedVariant;
              return (
                <Button
                  key={v.id}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn("h-7", !isActive && "text-muted-foreground")}
                >
                  <Link href={v.href}>
                    {isPromoted ? (
                      <Check
                        className={cn(
                          "size-3",
                          isActive ? "text-primary-foreground" : "text-emerald-500"
                        )}
                      />
                    ) : null}
                    {v.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        ) : null}
        {action}
      </div>
    </div>
  );
}
