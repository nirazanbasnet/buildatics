import { CalendarDays, Settings2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import type { BrochureDetail, BrochureDetailStatus } from "../_data";
import { BrochureStatusDropdown } from "./brochure-status-dropdown";

type Props = {
  detail: BrochureDetail;
  onStatusChange: (status: BrochureDetailStatus) => void;
  className?: string;
};

function MetaRow({
  icon: Icon,
  label,
  children
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-4" />
      </span>
      <span className="text-foreground flex-1 text-sm font-medium">{label}</span>
      {children}
    </li>
  );
}

export function BrochureMetaCard({ detail, onStatusChange, className }: Props) {
  return (
    <section className={cn("bg-card rounded-2xl border p-5", className)} data-slot="brochure-meta">
      <ul className="flex flex-col gap-3.5">
        <MetaRow icon={CalendarDays} label="Date Created">
          <span className="text-muted-foreground text-sm">{detail.dateCreated}</span>
        </MetaRow>
        <MetaRow icon={Settings2} label="Status">
          <BrochureStatusDropdown status={detail.status} onStatusChange={onStatusChange} />
        </MetaRow>
      </ul>
    </section>
  );
}
