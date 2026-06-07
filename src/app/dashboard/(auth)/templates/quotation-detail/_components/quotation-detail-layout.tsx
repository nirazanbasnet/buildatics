"use client";

import { AnimatedSection } from "@src/components/animated-section";

import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

import { SegmentedNav } from "@src/components/ui/segmented-nav";
import { cn } from "@/lib/utils";

import {
  quotationDetailTabItems,
  quotationDetailTabs,
  type QuotationBuilderHandlers,
  type QuotationCategory,
  type QuotationDetail,
  type QuotationDetailStatus,
  type QuotationDetailTab,
  type QuotationLineItem,
} from "../_data";

import { QuotationBuilder } from "./quotation-builder";
import { QuotationDetailActions } from "./quotation-detail-actions";
import { QuotationDetailInfoCard } from "./quotation-detail-info-card";
import { QuotationEditableSection } from "./quotation-editable-section";
import { QuotationMarginCard } from "./quotation-margin-card";
import { QuotationMetaCard } from "./quotation-meta-card";
import { QuotationSummaryCard } from "./quotation-summary-card";

function uid(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

function move<T>(list: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

type Props = {
  detail: QuotationDetail;
  className?: string;
};

export function QuotationDetailLayout({
  detail: initialDetail,
  className,
}: Props) {
  const [detail, setDetail] = useState<QuotationDetail>(initialDetail);
  const [activeTab, setActiveTab] = useState<QuotationDetailTab>(
    quotationDetailTabs[0],
  );

  function patchCategories(
    updater: (categories: QuotationCategory[]) => QuotationCategory[],
  ) {
    setDetail((prev) => ({ ...prev, categories: updater(prev.categories) }));
  }

  function patchItems(
    categoryId: string,
    updater: (items: QuotationLineItem[]) => QuotationLineItem[],
  ) {
    patchCategories((categories) =>
      categories.map((category) =>
        category.id === categoryId
          ? { ...category, items: updater(category.items) }
          : category,
      ),
    );
  }

  const handlers: QuotationBuilderHandlers = {
    addCategory: () =>
      patchCategories((categories) => [
        ...categories,
        {
          id: uid("cat"),
          name: "New Category",
          collapsed: false,
          items: [{ id: uid("li"), name: "New item", cost: 0, visible: true }],
        },
      ]),
    moveCategory: (categoryId, direction) =>
      patchCategories((categories) => {
        const index = categories.findIndex(
          (category) => category.id === categoryId,
        );
        return index === -1 ? categories : move(categories, index, direction);
      }),
    renameCategory: (categoryId, name) =>
      patchCategories((categories) =>
        categories.map((category) =>
          category.id === categoryId ? { ...category, name } : category,
        ),
      ),
    duplicateCategory: (categoryId) =>
      patchCategories((categories) => {
        const index = categories.findIndex(
          (category) => category.id === categoryId,
        );
        if (index === -1) return categories;
        const source = categories[index];
        const clone: QuotationCategory = {
          ...source,
          id: uid("cat"),
          name: `${source.name} (copy)`,
          items: source.items.map((item) => ({ ...item, id: uid("li") })),
        };
        const next = [...categories];
        next.splice(index + 1, 0, clone);
        return next;
      }),
    toggleCategoryCollapsed: (categoryId) =>
      patchCategories((categories) =>
        categories.map((category) =>
          category.id === categoryId
            ? { ...category, collapsed: !category.collapsed }
            : category,
        ),
      ),
    deleteCategory: (categoryId) =>
      patchCategories((categories) =>
        categories.filter((category) => category.id !== categoryId),
      ),
    addLineItem: (categoryId) =>
      patchItems(categoryId, (items) => [
        ...items,
        { id: uid("li"), name: "New item", cost: 0, visible: true },
      ]),
    updateLineItem: (categoryId, itemId, patch) =>
      patchItems(categoryId, (items) =>
        items.map((item) =>
          item.id === itemId ? { ...item, ...patch } : item,
        ),
      ),
    toggleLineItemVisibility: (categoryId, itemId) =>
      patchItems(categoryId, (items) =>
        items.map((item) =>
          item.id === itemId ? { ...item, visible: !item.visible } : item,
        ),
      ),
    moveLineItem: (categoryId, itemId, direction) =>
      patchItems(categoryId, (items) => {
        const index = items.findIndex((item) => item.id === itemId);
        return index === -1 ? items : move(items, index, direction);
      }),
    reorderLineItems: (categoryId, activeId, overId) =>
      patchItems(categoryId, (items) => {
        const from = items.findIndex((item) => item.id === activeId);
        const to = items.findIndex((item) => item.id === overId);
        return from === -1 || to === -1 ? items : arrayMove(items, from, to);
      }),
    duplicateLineItem: (categoryId, itemId) =>
      patchItems(categoryId, (items) => {
        const index = items.findIndex((item) => item.id === itemId);
        if (index === -1) return items;
        const clone = { ...items[index], id: uid("li") };
        const next = [...items];
        next.splice(index + 1, 0, clone);
        return next;
      }),
    deleteLineItem: (categoryId, itemId) =>
      patchItems(categoryId, (items) =>
        items.filter((item) => item.id !== itemId),
      ),
  };

  function setStatus(status: QuotationDetailStatus) {
    setDetail((prev) => ({ ...prev, status }));
  }

  function setValidUntil(validUntil: string) {
    setDetail((prev) => ({ ...prev, validUntil }));
  }

  function createRevision() {
    setDetail((prev) => {
      const current = Number(prev.version.replace(/\D/g, "")) || 1;
      return { ...prev, version: `V${current + 1}` };
    });
  }

  return (
    <div className={cn("", className)} data-slot="quotation-detail">
      <AnimatedSection>
        <SegmentedNav
          items={quotationDetailTabItems}
          value={activeTab}
          onValueChange={setActiveTab}
          ariaLabel="Quotation views"
        />
      </AnimatedSection>

      {activeTab === "Quote Builder" ? (
        <AnimatedSection className="overflow-auto" delay={0.04}>
          <div className="grid flex-1 gap-4 overflow-hidden lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="flex min-w-0 flex-col gap-4 overflow-auto">
              <QuotationDetailInfoCard detail={detail} />
              <QuotationBuilder detail={detail} handlers={handlers} />
              <QuotationEditableSection
                title="Internal Notes"
                value={detail.internalNotes}
                placeholder="Notes only visible to your team…"
                onChange={(value) =>
                  setDetail((prev) => ({ ...prev, internalNotes: value }))
                }
              />
              <QuotationEditableSection
                title="Scope and Description"
                value={detail.scope}
                placeholder="Describe the scope of work…"
                onChange={(value) =>
                  setDetail((prev) => ({ ...prev, scope: value }))
                }
              />
              <QuotationEditableSection
                title="Terms and Conditions"
                value={detail.terms}
                placeholder="Payment terms, validity, exclusions…"
                onChange={(value) =>
                  setDetail((prev) => ({ ...prev, terms: value }))
                }
              />
            </div>

            <aside className="flex flex-col gap-3">
              <QuotationSummaryCard detail={detail} />
              <QuotationMarginCard detail={detail} />
              <QuotationMetaCard
                detail={detail}
                onStatusChange={setStatus}
                onValidUntilChange={setValidUntil}
              />
              <QuotationDetailActions
                onStatusChange={setStatus}
                onCreateRevision={createRevision}
              />
            </aside>
          </div>
        </AnimatedSection>
      ) : (
        <AnimatedSection delay={0.04}>
          <div className="text-muted-foreground rounded-md border border-dashed py-16 text-center text-sm">
            {activeTab} — to be designed
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
