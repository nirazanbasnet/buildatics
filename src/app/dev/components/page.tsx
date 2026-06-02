import { notFound } from "next/navigation";
import { discoverTemplates } from "./discover";
import { VariantFrame } from "./VariantFrame";

export const dynamic = "force-dynamic";

export default function DevComponentsPage() {
  if (process.env.NODE_ENV === "production") return notFound();

  const features = discoverTemplates();

  return (
    <main className="mx-auto max-w-screen-xl space-y-12 p-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Component catalog</h1>
        <p className="text-muted-foreground text-sm">
          Auto-discovered templates from <code>/templates/{"{feature}"}/Variant*.tsx</code>. Iterate
          designs here before promoting to <code>src/</code>. Dev-only route.
        </p>
      </header>

      {features.length === 0 ? (
        <div className="text-muted-foreground rounded-md border p-8 text-center text-sm">
          No templates yet. Create <code>templates/{"{feature}"}/Variant1.tsx</code> to begin.
        </div>
      ) : (
        features.map((feature) => (
          <section key={feature.name} className="space-y-4">
            <div className="flex items-baseline gap-3">
              <h2 className="text-xl font-semibold">{feature.name}</h2>
              <span className="text-muted-foreground text-xs">
                {feature.variants.length} variant{feature.variants.length === 1 ? "" : "s"}
              </span>
            </div>
            {feature.notes ? (
              <pre className="bg-muted text-muted-foreground overflow-x-auto rounded-md p-4 text-xs whitespace-pre-wrap">
                {feature.notes}
              </pre>
            ) : null}
            <div className="grid gap-6 lg:grid-cols-2">
              {feature.variants.map((v) => (
                <div key={v.name} className="space-y-2">
                  <div className="text-muted-foreground text-xs font-medium">{v.name}</div>
                  <VariantFrame feature={feature.name} variant={v.name} />
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
}
