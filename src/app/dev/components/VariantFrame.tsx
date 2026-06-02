"use client";

import { Suspense, lazy, useMemo } from "react";

type Props = {
  feature: string;
  variant: string;
};

export function VariantFrame({ feature, variant }: Props) {
  const Lazy = useMemo(
    () =>
      lazy(() =>
        import(`@/../templates/${feature}/${variant}.tsx`).catch(() => ({
          default: () => (
            <div className="text-destructive text-sm">
              Could not load templates/{feature}/{variant}.tsx
            </div>
          )
        }))
      ),
    [feature, variant]
  );

  return (
    <div className="bg-background rounded-md border p-6">
      <Suspense fallback={<div className="text-muted-foreground text-sm">Loading…</div>}>
        <Lazy />
      </Suspense>
    </div>
  );
}
