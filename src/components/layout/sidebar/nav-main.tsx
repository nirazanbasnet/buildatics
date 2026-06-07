"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BookOpenIcon,
  BriefcaseIcon,
  Building2Icon,
  ChevronRight,
  ComponentIcon,
  FileTextIcon,
  HardHatIcon,
  LibraryBigIcon,
  SettingsIcon,
  Share2Icon,
  UserIcon,
  UsersIcon,
  UsersRoundIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { referenceNavItems } from "@src/components/layout/sidebar/reference-nav-items";

type NavItem = {
  title: string;
  href: string;
  icon?: LucideIcon;
  isComing?: boolean;
  isDataBadge?: string;
  isNew?: boolean;
  newTab?: boolean;
  items?: NavItem[];
};

type NavGroup = {
  title?: string;
  items: NavItem[];
};

export const navItems: NavGroup[] = [
  {
    title: "Design",
    items: [
      {
        title: "Design Library",
        href: "/design-library",
        icon: Building2Icon,
      },
      {
        title: "Company Library",
        href: "/company-library",
        icon: LibraryBigIcon,
      },
      {
        title: "Share to Site",
        href: "/share-to-site",
        icon: Share2Icon,
      },
    ],
  },
  {
    title: "Construction",
    items: [
      {
        title: "Preconstruction",
        href: "/preconstruction",
        icon: HardHatIcon,
      },
    ],
  },
  {
    title: "Sales",
    items: [
      {
        title: "Leads",
        href: "/leads",
        icon: UsersIcon,
      },
      {
        title: "Quotation",
        href: "/quotation",
        icon: FileTextIcon,
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        title: "Team & Roles",
        href: "/team",
        icon: UsersRoundIcon,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        href: "/profile",
        icon: UserIcon,
      },
    ],
  },
  {
    items: [
      {
        title: "Brochures",
        href: "/dashboard/brochures",
        icon: BookOpenIcon,
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: SettingsIcon,
      },
      {
        title: "Business",
        href: "/dashboard/business/documents",
        icon: BriefcaseIcon,
        items: [
          { title: "Documents", href: "/dashboard/business/documents" },
          { title: "Finance", href: "/dashboard/business/finance" },
        ],
      },
    ],
  },
];

// Admin-only product nav, injected into the minimal nav when the signed-in user has the Admin role.
const adminNavGroup: NavGroup = {
  title: "Admin",
  items: [
    {
      title: "Users",
      href: "/users",
      icon: UsersIcon,
    },
  ],
};

export function NavMain({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion() ?? false;
  const { isMobile } = useSidebar();

  const useMinimal =
    // Real product routes live outside /dashboard (the reference kit) — always show the product nav there.
    !pathname.startsWith("/dashboard") ||
    pathname === "/dashboard" ||
    pathname === "/dashboard/display-center" ||
    pathname === "/dashboard/preconstruction-list" ||
    pathname === "/dashboard/leads" ||
    pathname === "/dashboard/share-to-site" ||
    pathname === "/dashboard/quotation" ||
    pathname === "/dashboard/brochures" ||
    pathname.startsWith("/dashboard/settings") ||
    pathname.startsWith("/dashboard/business") ||
    pathname.startsWith("/dashboard/templates/") ||
    pathname.startsWith("/dashboard/components");
  const minimalItems: NavGroup[] = isAdmin
    ? [...navItems, adminNavGroup]
    : navItems;
  const items: NavGroup[] = useMinimal ? minimalItems : referenceNavItems;

  return (
    <>
      {items.map((nav, i) => (
        <SidebarGroup key={nav.title ?? `group-${i}`}>
          <SidebarGroupLabel>{nav.title}</SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {nav.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {Array.isArray(item.items) && item.items.length > 0 ? (
                    <>
                      <div className="hidden group-data-[collapsible=icon]:block">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SidebarMenuButton tooltip={item.title}>
                              {item.icon && <item.icon />}
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            side={isMobile ? "bottom" : "right"}
                            align={isMobile ? "end" : "start"}
                            className="min-w-48 rounded-lg"
                          >
                            <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                            {item.items?.map((sub) => (
                              <DropdownMenuItem
                                className="hover:text-foreground active:text-foreground hover:bg-[var(--primary)]/10! active:bg-[var(--primary)]/10!"
                                asChild
                                key={sub.title}
                              >
                                <a href={sub.href}>{sub.title}</a>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Collapsible
                        className="group/collapsible block group-data-[collapsible=icon]:hidden"
                        defaultOpen={
                          !!item.items.find((s) => s.href === pathname)
                        }
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className="hover:text-foreground active:text-foreground hover:bg-[var(--primary)]/10 active:bg-[var(--primary)]/10"
                            tooltip={item.title}
                          >
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item?.items?.map((subItem, key) => (
                              <SidebarMenuSubItem key={key}>
                                <SidebarMenuSubButton
                                  className="hover:text-foreground active:text-foreground hover:bg-[var(--primary)]/10 active:bg-[var(--primary)]/10"
                                  isActive={pathname === subItem.href}
                                  asChild
                                >
                                  <Link
                                    href={subItem.href}
                                    target={subItem.newTab ? "_blank" : ""}
                                  >
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    </>
                  ) : (
                    <SidebarMenuButton
                      className="hover:text-foreground active:text-foreground relative isolate overflow-visible hover:bg-[var(--primary)]/10 active:bg-[var(--primary)]/10 data-[active=true]:bg-transparent"
                      isActive={pathname === item.href}
                      tooltip={item.title}
                      asChild
                    >
                      <Link
                        href={item.href}
                        target={item.newTab ? "_blank" : ""}
                      >
                        {pathname === item.href ? (
                          reduceMotion ? (
                            <span
                              aria-hidden
                              className="bg-sidebar-accent absolute inset-0 -z-10 rounded-md"
                            />
                          ) : (
                            <motion.span
                              aria-hidden
                              layoutId="sidebar-active-pill"
                              transition={{
                                type: "tween",
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="bg-sidebar-accent absolute inset-0 -z-10 rounded-md"
                            />
                          )
                        ) : null}
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                  {!!item.isComing && (
                    <SidebarMenuBadge className="peer-hover/menu-button:text-foreground opacity-50">
                      Coming
                    </SidebarMenuBadge>
                  )}
                  {!!item.isNew && (
                    <SidebarMenuBadge className="border border-green-400 text-green-600 peer-hover/menu-button:text-green-600">
                      New
                    </SidebarMenuBadge>
                  )}
                  {!!item.isDataBadge && (
                    <SidebarMenuBadge className="peer-hover/menu-button:text-foreground">
                      {item.isDataBadge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
