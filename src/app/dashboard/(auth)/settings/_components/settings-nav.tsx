"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCardIcon, DatabaseIcon, UserCheckIcon, UserCogIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const navItems: { title: string; href: string; icon: LucideIcon }[] = [
  { title: "Roles", href: "/dashboard/settings", icon: UserCogIcon },
  { title: "User Permissions", href: "/dashboard/settings/user-permissions", icon: UserCheckIcon },
  { title: "Data Setup", href: "/dashboard/settings/data-setup", icon: DatabaseIcon },
  { title: "Subscription", href: "/dashboard/settings/subscription", icon: CreditCardIcon }
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <Card className="py-0">
      <CardContent className="p-2">
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  "hover:bg-muted justify-start",
                  isActive && "bg-muted hover:bg-muted"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon />
                  {item.title}
                </Link>
              </Button>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
}
