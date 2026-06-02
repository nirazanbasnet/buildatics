import { notFound } from "next/navigation";

import { componentRegistry } from "../_registry";
import { SHOWCASES } from "../_showcases";

export function generateStaticParams() {
  return componentRegistry.map((c) => ({ slug: c.slug }));
}

export default async function ComponentShowcasePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = componentRegistry.find((c) => c.slug === slug);
  const Showcase = SHOWCASES[slug];

  if (!entry || !Showcase) return notFound();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-muted-foreground text-xs tracking-wide uppercase">Component</p>
        <h1 className="text-3xl font-semibold tracking-tight">{entry.name}</h1>
        <p className="text-muted-foreground text-sm">{entry.description}</p>
      </header>
      <Showcase />
    </div>
  );
}
