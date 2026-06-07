"use client";

import { AnimatedSection } from "@src/components/animated-section";

import { useState } from "react";

import { SegmentedNav } from "@src/components/ui/segmented-nav";
import { cn } from "@/lib/utils";

import {
  brochureDetailTabItems,
  brochureDetailTabs,
  type BrochureDetail,
  type BrochureDetailStatus,
  type BrochureDetailTab,
  type BrochureOwner,
  type BrochurePropertyInfo as PropertyInfo,
} from "../_data";

import { BrochureAttachedDesigns } from "./brochure-attached-designs";
import { BrochureDetailActions } from "./brochure-detail-actions";
import { BrochureDetailInfoCard } from "./brochure-detail-info-card";
import { BrochureHistory } from "./brochure-history";
import { BrochureMetaCard } from "./brochure-meta-card";
import { BrochureOwners } from "./brochure-owners";
import { BrochurePreview } from "./brochure-preview";
import { BrochurePropertyInfo } from "./brochure-property-info";

function uid(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

type Props = {
  detail: BrochureDetail;
  className?: string;
};

export function BrochureDetailLayout({
  detail: initialDetail,
  className,
}: Props) {
  const [detail, setDetail] = useState<BrochureDetail>(initialDetail);
  const [activeTab, setActiveTab] = useState<BrochureDetailTab>(
    brochureDetailTabs[0],
  );

  function setStatus(status: BrochureDetailStatus) {
    setDetail((prev) => ({ ...prev, status }));
  }

  function setTemplate(template: string) {
    setDetail((prev) => ({ ...prev, template }));
  }

  function addOwner(): string {
    const id = uid("owner");
    setDetail((prev) => ({
      ...prev,
      owners: [
        ...prev.owners,
        { id, name: "", address: "", email: "", contact: "" },
      ],
    }));
    return id;
  }

  function updateOwner(id: string, patch: Partial<BrochureOwner>) {
    setDetail((prev) => ({
      ...prev,
      owners: prev.owners.map((owner) =>
        owner.id === id ? { ...owner, ...patch } : owner,
      ),
    }));
  }

  function updateProperty(patch: Partial<PropertyInfo>) {
    setDetail((prev) => ({
      ...prev,
      property: { ...prev.property, ...patch },
    }));
  }

  return (
    <div
      className={cn("flex flex-col gap-4", className)}
      data-slot="brochure-detail"
    >
      <div className="grid h-full gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-4 overflow-hidden">
          <AnimatedSection>
            <SegmentedNav
              items={brochureDetailTabItems}
              value={activeTab}
              onValueChange={setActiveTab}
              ariaLabel="Brochure views"
            />
          </AnimatedSection>

          {activeTab === "Brochure Builder" ? (
            <AnimatedSection delay={0.04} className="h-full overflow-auto">
              <div className="flex h-full flex-col gap-4 overflow-auto">
                <BrochureDetailInfoCard
                  detail={detail}
                  onTemplateChange={setTemplate}
                />
                <BrochureOwners
                  owners={detail.owners}
                  onAddOwner={addOwner}
                  onUpdateOwner={updateOwner}
                />
                <BrochurePropertyInfo
                  property={detail.property}
                  onChange={updateProperty}
                />
                <BrochureAttachedDesigns
                  designs={detail.attachedDesigns}
                  design={detail.template}
                  onDesignChange={setTemplate}
                />
              </div>
            </AnimatedSection>
          ) : activeTab === "Preview" ? (
            <AnimatedSection delay={0.04}>
              <BrochurePreview />
            </AnimatedSection>
          ) : (
            <AnimatedSection delay={0.04}>
              <BrochureHistory entries={detail.history} />
            </AnimatedSection>
          )}
        </div>

        <aside className="flex flex-col gap-3">
          <BrochureMetaCard detail={detail} onStatusChange={setStatus} />
          <BrochureDetailActions onStatusChange={setStatus} />
        </aside>
      </div>
    </div>
  );
}
