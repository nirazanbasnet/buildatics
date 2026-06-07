"use client";

import { AnimatedSection } from "@src/components/animated-section";

import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  quotationDetailMock,
  type QuotationDetail,
} from "../../quotation-detail/_data";
import { QuotationDetailSheet } from "../../quotation-detail/_components/quotation-detail-sheet";
import type { Quotation } from "../_data";

import { PaginationNav } from "@src/components/pagination-nav";
import { QuotationTableV2 } from "./quotation-table-v2";
import { QuotationToolbar } from "./quotation-toolbar";

function toDetail(quotation: Quotation): QuotationDetail {
  return {
    ...quotationDetailMock,
    id: quotation.id,
    client: quotation.client,
    design: quotation.attachedDesign,
    siteAddress: quotation.siteAddress,
    status: quotation.status === "signed" ? "signed" : "draft",
  };
}

type Props = {
  quotations: Quotation[];
  className?: string;
  detailEnabled?: boolean;
};

export function QuotationLayoutV2({
  quotations,
  className,
  detailEnabled,
}: Props) {
  const [selected, setSelected] = useState<Quotation | null>(null);
  const handleQuotationClick = detailEnabled ? setSelected : undefined;

  return (
    <>
      <div className={cn("space-y-1", className)}>
        <AnimatedSection>
          <QuotationToolbar />
        </AnimatedSection>
        <AnimatedSection delay={0.04}>
          <QuotationTableV2
            quotations={quotations}
            onQuotationClick={handleQuotationClick}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.08}>
          <PaginationNav />
        </AnimatedSection>
      </div>
      {detailEnabled && selected ? (
        <QuotationDetailSheet
          open
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
          detail={toDetail(selected)}
        />
      ) : null}
    </>
  );
}
