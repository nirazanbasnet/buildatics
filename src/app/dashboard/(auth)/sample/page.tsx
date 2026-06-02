"use client";

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { referenceNavItems } from "@src/components/layout/sidebar/reference-nav-items";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type FlatItem = {
  title: string;
  href: string;
  group: string;
  parent?: string;
  icon?: LucideIcon;
  isComing?: boolean;
  isNew?: boolean;
  isDataBadge?: string;
  newTab?: boolean;
};

function flattenNav(): { group: string; items: FlatItem[] }[] {
  return referenceNavItems.map((group) => {
    const items: FlatItem[] = [];
    for (const entry of group.items) {
      if (entry.items && entry.items.length > 0) {
        for (const sub of entry.items) {
          items.push({
            title: sub.title,
            href: sub.href,
            group: group.title,
            parent: entry.title,
            icon: entry.icon,
            isComing: sub.isComing,
            isNew: sub.isNew,
            isDataBadge: sub.isDataBadge,
            newTab: sub.newTab
          });
        }
      } else {
        items.push({
          title: entry.title,
          href: entry.href,
          group: group.title,
          icon: entry.icon,
          isComing: entry.isComing,
          isNew: entry.isNew,
          isDataBadge: entry.isDataBadge,
          newTab: entry.newTab
        });
      }
    }
    return { group: group.title, items };
  });
}

export default function SampleDashboardPage() {
  const sections = flattenNav();
  const total = sections.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Sample Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Reference index of every sidebar navigation item ({total} total). Click any tile to jump
          to that page.
        </p>
      </header>

      {sections.map((section) => (
        <section key={section.group} className="space-y-3">
          <h2 className="text-lg font-semibold">{section.group}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <NavCard key={`${item.group}-${item.title}-${item.href}`} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function NavCard({ item }: { item: FlatItem }) {
  const Icon = item.icon;
  const isPlaceholder = !item.href || item.href === "#" || item.isComing;

  const inner = (
    <Card className="group hover:bg-accent h-full transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {Icon ? <Icon className="text-muted-foreground size-4" /> : null}
            <CardTitle className="text-base">{item.title}</CardTitle>
          </div>
          {!isPlaceholder ? (
            <ArrowRight className="text-muted-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          ) : null}
        </div>
        {item.parent ? <CardDescription>{item.parent}</CardDescription> : null}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap items-center gap-2">
          <code className="text-muted-foreground text-xs">{item.href}</code>
          {item.isNew ? (
            <Badge variant="outline" className="border-green-400 text-green-600">
              New
            </Badge>
          ) : null}
          {item.isComing ? <Badge variant="outline">Coming</Badge> : null}
          {item.isDataBadge ? <Badge variant="secondary">{item.isDataBadge}</Badge> : null}
        </div>
      </CardContent>
    </Card>
  );

  if (isPlaceholder) {
    return <div className="opacity-60">{inner}</div>;
  }

  return (
    <Link href={item.href} target={item.newTab ? "_blank" : undefined}>
      {inner}
    </Link>
  );
}
