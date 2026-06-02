import { FileText, Home, MapPin, Percent, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import type { QuotationDetail } from "../_data";

type Props = {
  detail: QuotationDetail;
  className?: string;
};

function InfoRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <li className="flex items-center gap-3">
      <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-4" />
      </span>
      <span className="text-foreground flex-1 text-sm font-medium">{label}</span>
      <span className="text-muted-foreground truncate text-sm">{value}</span>
    </li>
  );
}

export function QuotationDetailInfoCard({ detail, className }: Props) {
  return (
    <section className={cn("bg-card rounded-2xl border p-5", className)} data-slot="quotation-info">
      <ul className="flex flex-col gap-3.5">
        <InfoRow icon={FileText} label="Quotation Title" value={detail.title} />
        <InfoRow icon={User} label="Client" value={detail.client} />
        <InfoRow icon={Home} label="Design" value={detail.design} />
        <InfoRow icon={MapPin} label="Site Address" value={detail.siteAddress} />
        <InfoRow icon={Percent} label="Gst. Rate" value={`${detail.gstRate} %`} />
      </ul>
    </section>
  );
}
