"use client";

import { AnimatedSection } from "@src/components/animated-section";

import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  brochureDetailMock,
  type BrochureDetail,
} from "../../brochure-detail/_data";
import { BrochureDetailSheet } from "../../brochure-detail/_components/brochure-detail-sheet";
import type { Brochure } from "../_data";

import { PaginationNav } from "@src/components/pagination-nav";
import { BrochuresTableV2 } from "./brochures-table-v2";
import { BrochuresToolbar } from "./brochures-toolbar";

function toDetail(brochure: Brochure): BrochureDetail {
  return {
    ...brochureDetailMock,
    id: brochure.id,
    ref: brochure.ref,
    siteAddress: brochure.siteAddress,
    status: brochure.status,
    dateCreated: brochure.createdDate,
  };
}

type Props = {
  brochures: Brochure[];
  className?: string;
  detailEnabled?: boolean;
};

export function BrochuresLayoutV2({
  brochures,
  className,
  detailEnabled,
}: Props) {
  const [selected, setSelected] = useState<Brochure | null>(null);
  const handleBrochureClick = detailEnabled ? setSelected : undefined;

  return (
    <>
      <div className={cn("space-y-1", className)}>
        <AnimatedSection>
          <BrochuresToolbar />
        </AnimatedSection>
        <AnimatedSection delay={0.04}>
          <BrochuresTableV2
            brochures={brochures}
            onBrochureClick={handleBrochureClick}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.08}>
          <PaginationNav />
        </AnimatedSection>
      </div>
      {detailEnabled && selected ? (
        <BrochureDetailSheet
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
