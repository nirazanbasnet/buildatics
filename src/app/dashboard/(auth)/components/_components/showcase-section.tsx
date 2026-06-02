import type { ReactNode } from "react";

export function ShowcaseSection({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-base font-semibold">{title}</h2>
        {description ? <p className="text-muted-foreground text-sm">{description}</p> : null}
      </div>
      <div className="bg-card flex flex-wrap items-start gap-3 rounded-lg border p-6">
        {children}
      </div>
    </section>
  );
}
