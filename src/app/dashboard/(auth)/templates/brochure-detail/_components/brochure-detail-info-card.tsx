"use client";

import { FileText, Home, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { brochureTemplateOptions, type BrochureDetail } from "../_data";

type Props = {
  detail: BrochureDetail;
  onTemplateChange: (value: string) => void;
  className?: string;
};

function Row({
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

export function BrochureDetailInfoCard({ detail, onTemplateChange, className }: Props) {
  return (
    <section className={cn("bg-card rounded-2xl border p-5", className)} data-slot="brochure-info">
      <ul className="flex flex-col gap-3.5">
        <Row icon={FileText} label="#Ref">
          <span className="text-muted-foreground text-sm">{detail.ref}</span>
        </Row>
        <Row icon={MapPin} label="Site Address">
          <span className="text-muted-foreground truncate text-sm">{detail.siteAddress}</span>
        </Row>
        <Row icon={Home} label="Brochure Design">
          <Select value={detail.template} onValueChange={onTemplateChange}>
            <SelectTrigger className="w-56 max-w-[55%]" size="sm">
              <SelectValue placeholder="Choose Brochure Template" />
            </SelectTrigger>
            <SelectContent>
              {brochureTemplateOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Row>
      </ul>
    </section>
  );
}
