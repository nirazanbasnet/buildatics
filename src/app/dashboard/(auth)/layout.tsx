import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@src/components/layout/sidebar/app-sidebar";
import { SiteFooter } from "@src/components/layout/footer/site-footer";
import { SiteHeader } from "@src/components/layout/header";
import { getSession } from "@/features/auth";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SSR enforcement to complement the edge guard in proxy.ts: no session → back to login.
  const session = await getSession();
  if (!session) redirect("/login");

  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get("sidebar_state")?.value === "true" ||
    cookieStore.get("sidebar_state") === undefined;

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 14)",
          "--content-padding": "calc(var(--spacing) * 4)",
          "--content-margin": "calc(var(--spacing) * 1.5)",
          "--content-full-height":
            "calc(100vh - var(--header-height) - (var(--content-padding) * 2) - (var(--content-margin) * 2))",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={session.user} />
      <SidebarInset>
        <SiteHeader user={session.user} />
        <div className="bg-muted/40 group-data-[theme-sidebar-mode=floating]/layout:bg-transparent h-[calc(100%-110px)]">
          <div className="@container/main p-(--content-padding) xl:group-data-[theme-content-layout=centered]/layout:container xl:group-data-[theme-content-layout=centered]/layout:mx-auto h-full">
            {children}
          </div>
          <SiteFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
