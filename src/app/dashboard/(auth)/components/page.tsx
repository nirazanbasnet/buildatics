import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { componentRegistry } from "./_registry";

export default function ComponentsIndexPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-muted-foreground text-xs tracking-wide uppercase">Reference</p>
        <h1 className="text-3xl font-semibold tracking-tight">Components</h1>
        <p className="text-muted-foreground text-sm">
          {componentRegistry.length} primitives. Open one to see its elements and variants.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {componentRegistry.map((c) => (
          <Link key={c.slug} href={`/dashboard/components/${c.slug}`} className="group">
            <Card className="hover:bg-accent h-full transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{c.name}</CardTitle>
                  <ArrowRight className="text-muted-foreground size-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription>{c.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
