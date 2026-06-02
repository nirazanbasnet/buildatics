import { CalendarDays, DollarSign, GitBranch, History, Settings2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  formatCurrency,
  quotedCost,
  type QuotationDetail,
  type QuotationDetailStatus
} from "../_data";

import { QuotationStatusDropdown } from "./quotation-status-dropdown";
import { QuotationValidUntil } from "./quotation-valid-until";

type Props = {
  detail: QuotationDetail;
  onStatusChange: (status: QuotationDetailStatus) => void;
  onValidUntilChange: (value: string) => void;
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

export function QuotationMetaCard({
  detail,
  onStatusChange,
  onValidUntilChange,
  className
}: Props) {
  return (
    <section
      className={cn(
        "bg-card rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      data-slot="quotation-meta"
    >
      <ul className="flex flex-col gap-3.5">
        <MetaRow icon={DollarSign} label="Quoted Cost">
          <span className="text-muted-foreground text-sm">
            {formatCurrency(quotedCost(detail))}
          </span>
        </MetaRow>
        <MetaRow icon={CalendarDays} label="Date Created">
          <span className="text-muted-foreground text-sm">{detail.dateCreated}</span>
        </MetaRow>
        <MetaRow icon={History} label="Version">
          <span className="text-muted-foreground text-sm">{detail.version}</span>
        </MetaRow>
        <MetaRow icon={Settings2} label="Status">
          <QuotationStatusDropdown status={detail.status} onStatusChange={onStatusChange} />
        </MetaRow>
        <MetaRow icon={GitBranch} label="Valid Until">
          <QuotationValidUntil value={detail.validUntil} onChange={onValidUntilChange} />
        </MetaRow>
      </ul>
    </section>
  );
}
