"use client";

import { useRef, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { toast } from "sonner";

import { AnimatedSection } from "@src/components/animated-section";
import { SegmentedNav } from "@src/components/ui/segmented-nav";
import { cn } from "@/lib/utils";

import {
  quotationDetailTabItems,
  quotationDetailTabs,
  type QuotationBuilderHandlers,
  type QuotationCategory,
  type QuotationDetail as KitQuotationDetail,
  type QuotationDetailStatus,
  type QuotationDetailTab,
  type QuotationLineItem
} from "./_data";
import { QuotationBuilder } from "./kit/quotation-builder";
import { QuotationDetailActions } from "./kit/quotation-detail-actions";
import { QuotationDetailInfoCard } from "./kit/quotation-detail-info-card";
import { QuotationEditableSection } from "./kit/quotation-editable-section";
import { QuotationMarginCard } from "./kit/quotation-margin-card";
import { QuotationMetaCard } from "./kit/quotation-meta-card";
import { QuotationSummaryCard } from "./kit/quotation-summary-card";

import {
  createLineItem,
  deleteLineItem,
  listLineItems,
  updateLineItem
} from "../../actions/line-items";
import { incrementVersion } from "../../actions/increment-version";
import { updateQuote } from "../../actions/update-quote";
import { updateQuoteStatus } from "../../actions/update-quote-status";
import type { LeadQuoteLineItemReq, LeadQuoteStatus } from "../../lib/dto";
import { GST_RATE, type QuoteDetailModel, type QuoteLineItem } from "../../types";

// ---- status mapping: kit string status <-> API LeadQuoteStatus enum (see status.ts gap) ----
const KIT_BY_ENUM: Record<LeadQuoteStatus, QuotationDetailStatus> = {
  0: "draft",
  1: "sent",
  2: "signed",
  3: "declined"
};
const ENUM_BY_KIT: Record<QuotationDetailStatus, LeadQuoteStatus> = {
  draft: 0,
  sent: 1,
  signed: 2,
  declined: 3
};

function uid(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}
const isTemp = (id: string) => id.startsWith("tmp-");

function move<T>(list: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

// Groups the flat API line items into the kit's category → items shape (preserving first-seen order).
function toCategories(items: QuoteLineItem[]): QuotationCategory[] {
  const order: string[] = [];
  const byName = new Map<string, QuotationLineItem[]>();
  for (const li of [...items].sort((a, b) => a.sortOrder - b.sortOrder)) {
    if (!byName.has(li.category)) {
      byName.set(li.category, []);
      order.push(li.category);
    }
    byName.get(li.category)!.push({
      id: li.id,
      name: li.description,
      cost: li.qty * li.unitPrice,
      visible: li.isVisible
    });
  }
  return order.map((name) => ({ id: uid("cat"), name, collapsed: false, items: byName.get(name)! }));
}

function toKitDetail(model: QuoteDetailModel): KitQuotationDetail {
  return {
    id: model.id,
    title: model.title,
    client: model.client,
    design: "—",
    siteAddress: model.siteAddress,
    gstRate: GST_RATE,
    status: KIT_BY_ENUM[model.statusValue] ?? "draft",
    version: `V${model.version}`,
    dateCreated: model.createdOn,
    validUntil: model.validUntil,
    estimatedCost: 0,
    categories: toCategories(model.lineItems),
    internalNotes: "",
    scope: model.description,
    terms: ""
  };
}

type QuotationDetailProps = {
  detail: QuoteDetailModel;
  // Called after a change that affects the list (status, revision) so it can re-query.
  onChanged?: () => void;
};

// Hardened + API-wired version of the kit QuotationDetailLayout. UI is unchanged; the builder handlers,
// status, valid-until, scope and version now persist through the LeadQuotes/LeadQuoteLineItems APIs.
export function QuotationDetail({ detail: model, onChanged }: QuotationDetailProps) {
  const leadId = model.leadId;
  const quoteId = model.id;

  const [detail, setDetail] = useState<KitQuotationDetail>(() => toKitDetail(model));
  const [activeTab, setActiveTab] = useState<QuotationDetailTab>(quotationDetailTabs[0]);

  // Latest state for debounced/background persistence, and per-item edit debounce timers.
  const detailRef = useRef(detail);
  detailRef.current = detail;
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  function patchCategories(updater: (categories: QuotationCategory[]) => QuotationCategory[]) {
    setDetail((prev) => ({ ...prev, categories: updater(prev.categories) }));
  }

  function patchItems(
    categoryId: string,
    updater: (items: QuotationLineItem[]) => QuotationLineItem[]
  ) {
    patchCategories((categories) =>
      categories.map((category) =>
        category.id === categoryId ? { ...category, items: updater(category.items) } : category
      )
    );
  }

  function findCategory(categoryId: string): QuotationCategory | undefined {
    return detailRef.current.categories.find((c) => c.id === categoryId);
  }

  // Body for a line-item create/update from the kit item (qty is fixed to 1 — the kit UI has a single
  // cost field, so cost is persisted as unitPrice; see map-detail.ts gap).
  function itemBody(
    categoryName: string,
    item: QuotationLineItem,
    sortOrder: number
  ): LeadQuoteLineItemReq {
    return {
      leadQuoteId: quoteId,
      category: categoryName,
      description: item.name,
      qty: 1,
      unitPrice: item.cost,
      sortOrder,
      isVisible: item.visible
    };
  }

  // Re-pulls authoritative line items from the server (used to recover after a failed mutation).
  function resync() {
    listLineItems(leadId, quoteId)
      .then((items) =>
        setDetail((prev) => {
          const rebuilt = toCategories(items);
          // Preserve collapse state + any local empty categories by name.
          const collapsedByName = new Map(prev.categories.map((c) => [c.name, c.collapsed]));
          const present = new Set(rebuilt.map((c) => c.name));
          const empties = prev.categories.filter(
            (c) => !present.has(c.name) && c.items.length === 0
          );
          return {
            ...prev,
            categories: [
              ...rebuilt.map((c) => ({ ...c, collapsed: collapsedByName.get(c.name) ?? false })),
              ...empties
            ]
          };
        })
      )
      .catch(() => undefined);
  }

  type ActionResult = { ok: boolean; error?: string };
  function persist(p: Promise<ActionResult>, errMsg: string, resyncOnFail = true) {
    p.then((res) => {
      if (!res.ok) {
        toast.error(res.error ?? errMsg);
        if (resyncOnFail) resync();
      }
    }).catch(() => {
      toast.error(errMsg);
      if (resyncOnFail) resync();
    });
  }

  // Persists the given ordered items (sortOrder = index). Pass the freshly-computed array so we don't
  // read stale state straight after a setState.
  function persistOrder(categoryName: string, items: QuotationLineItem[]) {
    items.forEach((item, index) => {
      if (isTemp(item.id)) return;
      persist(
        updateLineItem(leadId, item.id, itemBody(categoryName, item, index)),
        "Failed to reorder items.",
        false
      );
    });
  }

  // Debounced persistence for inline name/cost edits.
  function scheduleItemPersist(categoryId: string, itemId: string) {
    if (isTemp(itemId)) return;
    const existing = timers.current.get(itemId);
    if (existing) clearTimeout(existing);
    timers.current.set(
      itemId,
      setTimeout(() => {
        timers.current.delete(itemId);
        const category = findCategory(categoryId);
        const item = category?.items.find((i) => i.id === itemId);
        if (!category || !item) return;
        const index = category.items.indexOf(item);
        persist(
          updateLineItem(leadId, itemId, itemBody(category.name, item, index)),
          "Failed to save the line item.",
          false
        );
      }, 600)
    );
  }

  // Replaces a temporary client id with the server id once a create resolves, then flushes any edits.
  function reconcileTempId(tempId: string, realId: string) {
    setDetail((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => ({
        ...c,
        items: c.items.map((i) => (i.id === tempId ? { ...i, id: realId } : i))
      }))
    }));
    const category = detailRef.current.categories.find((c) => c.items.some((i) => i.id === tempId));
    const item = category?.items.find((i) => i.id === tempId);
    if (category && item) {
      const index = category.items.indexOf(item);
      persist(
        updateLineItem(leadId, realId, itemBody(category.name, item, index)),
        "Failed to save the line item.",
        false
      );
    }
  }

  const handlers: QuotationBuilderHandlers = {
    addCategory: () =>
      patchCategories((categories) => [
        ...categories,
        { id: uid("cat"), name: "New Category", collapsed: false, items: [] }
      ]),

    // Category ordering is not a first-class API concept (only per-item sortOrder) — kept local.
    moveCategory: (categoryId, direction) =>
      patchCategories((categories) => {
        const index = categories.findIndex((c) => c.id === categoryId);
        return index === -1 ? categories : move(categories, index, direction);
      }),

    renameCategory: (categoryId, name) => {
      patchCategories((categories) =>
        categories.map((c) => (c.id === categoryId ? { ...c, name } : c))
      );
      const category = findCategory(categoryId);
      category?.items.forEach((item, index) => {
        if (isTemp(item.id)) return;
        persist(
          updateLineItem(leadId, item.id, itemBody(name, item, index)),
          "Failed to rename the category."
        );
      });
    },

    duplicateCategory: (categoryId) => {
      const source = findCategory(categoryId);
      if (!source) return;
      const name = `${source.name} (copy)`;
      const clones: QuotationLineItem[] = source.items.map((item) => ({ ...item, id: uid("tmp") }));
      patchCategories((categories) => {
        const index = categories.findIndex((c) => c.id === categoryId);
        const next = [...categories];
        next.splice(index + 1, 0, { id: uid("cat"), name, collapsed: false, items: clones });
        return next;
      });
      clones.forEach((clone, index) => {
        createLineItem(leadId, itemBody(name, clone, index)).then((res) => {
          if (res.ok && res.item?.id) reconcileTempId(clone.id, res.item.id);
          else toast.error(res.error ?? "Failed to duplicate the category.");
        });
      });
    },

    toggleCategoryCollapsed: (categoryId) =>
      patchCategories((categories) =>
        categories.map((c) => (c.id === categoryId ? { ...c, collapsed: !c.collapsed } : c))
      ),

    deleteCategory: (categoryId) => {
      const category = findCategory(categoryId);
      patchCategories((categories) => categories.filter((c) => c.id !== categoryId));
      category?.items.forEach((item) => {
        if (isTemp(item.id)) return;
        persist(deleteLineItem(leadId, item.id), "Failed to delete the category.");
      });
    },

    addLineItem: (categoryId) => {
      const category = findCategory(categoryId);
      if (!category) return;
      const tempId = uid("tmp");
      const newItem: QuotationLineItem = { id: tempId, name: "New item", cost: 0, visible: true };
      const index = category.items.length;
      patchItems(categoryId, (items) => [...items, newItem]);
      createLineItem(leadId, itemBody(category.name, newItem, index)).then((res) => {
        if (res.ok && res.item?.id) reconcileTempId(tempId, res.item.id);
        else {
          toast.error(res.error ?? "Failed to add the line item.");
          patchItems(categoryId, (items) => items.filter((i) => i.id !== tempId));
        }
      });
    },

    updateLineItem: (categoryId, itemId, patch) => {
      patchItems(categoryId, (items) =>
        items.map((item) => (item.id === itemId ? { ...item, ...patch } : item))
      );
      scheduleItemPersist(categoryId, itemId);
    },

    toggleLineItemVisibility: (categoryId, itemId) => {
      patchItems(categoryId, (items) =>
        items.map((item) => (item.id === itemId ? { ...item, visible: !item.visible } : item))
      );
      if (isTemp(itemId)) return;
      const category = findCategory(categoryId);
      const item = category?.items.find((i) => i.id === itemId);
      if (!category || !item) return;
      const index = category.items.indexOf(item);
      persist(
        updateLineItem(leadId, itemId, itemBody(category.name, item, index)),
        "Failed to update visibility.",
        false
      );
    },

    moveLineItem: (categoryId, itemId, direction) => {
      const category = findCategory(categoryId);
      if (!category) return;
      const index = category.items.findIndex((i) => i.id === itemId);
      if (index === -1) return;
      const reordered = move(category.items, index, direction);
      patchItems(categoryId, () => reordered);
      persistOrder(category.name, reordered);
    },

    reorderLineItems: (categoryId, activeId, overId) => {
      const category = findCategory(categoryId);
      if (!category) return;
      const from = category.items.findIndex((i) => i.id === activeId);
      const to = category.items.findIndex((i) => i.id === overId);
      if (from === -1 || to === -1) return;
      const reordered = arrayMove(category.items, from, to);
      patchItems(categoryId, () => reordered);
      persistOrder(category.name, reordered);
    },

    duplicateLineItem: (categoryId, itemId) => {
      const category = findCategory(categoryId);
      const source = category?.items.find((i) => i.id === itemId);
      if (!category || !source) return;
      const tempId = uid("tmp");
      const clone: QuotationLineItem = { ...source, id: tempId };
      patchItems(categoryId, (items) => {
        const index = items.findIndex((i) => i.id === itemId);
        const next = [...items];
        next.splice(index + 1, 0, clone);
        return next;
      });
      createLineItem(leadId, itemBody(category.name, clone, category.items.length)).then((res) => {
        if (res.ok && res.item?.id) reconcileTempId(tempId, res.item.id);
        else {
          toast.error(res.error ?? "Failed to duplicate the item.");
          patchItems(categoryId, (items) => items.filter((i) => i.id !== tempId));
        }
      });
    },

    deleteLineItem: (categoryId, itemId) => {
      patchItems(categoryId, (items) => items.filter((i) => i.id !== itemId));
      if (isTemp(itemId)) return;
      persist(deleteLineItem(leadId, itemId), "Failed to delete the item.");
    }
  };

  function setStatus(status: QuotationDetailStatus) {
    const prevStatus = detail.status;
    setDetail((prev) => ({ ...prev, status }));
    updateQuoteStatus(leadId, quoteId, ENUM_BY_KIT[status]).then((res) => {
      if (res.ok) onChanged?.();
      else {
        setDetail((prev) => ({ ...prev, status: prevStatus }));
        toast.error(res.error ?? "Failed to update status.");
      }
    });
  }

  function setValidUntil(validUntil: string) {
    setDetail((prev) => ({ ...prev, validUntil }));
    persist(
      updateQuote(leadId, quoteId, {
        title: detailRef.current.title,
        description: detailRef.current.scope,
        validUntil
      }),
      "Failed to update validity.",
      false
    );
  }

  function setScope(scope: string) {
    setDetail((prev) => ({ ...prev, scope }));
    const existing = timers.current.get("__scope__");
    if (existing) clearTimeout(existing);
    timers.current.set(
      "__scope__",
      setTimeout(() => {
        persist(
          updateQuote(leadId, quoteId, {
            title: detailRef.current.title,
            description: detailRef.current.scope,
            validUntil: detailRef.current.validUntil
          }),
          "Failed to save scope.",
          false
        );
      }, 600)
    );
  }

  function createRevision() {
    incrementVersion(leadId, quoteId).then((res) => {
      if (res.ok) {
        setDetail((prev) => ({
          ...prev,
          version: `V${res.version ?? Number(prev.version.replace(/\D/g, "")) + 1}`
        }));
        onChanged?.();
      } else {
        toast.error(res.error ?? "Failed to create a revision.");
      }
    });
  }

  return (
    <div className={cn("")} data-slot="quotation-detail">
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
          <div className="grid flex-1 gap-4 overflow-hidden lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] mt-4">
            <div className="flex min-w-0 flex-col gap-4 overflow-auto">
              <QuotationDetailInfoCard detail={detail} />
              <QuotationBuilder detail={detail} handlers={handlers} />
              <QuotationEditableSection
                title="Internal Notes"
                value={detail.internalNotes}
                placeholder="Notes only visible to your team…"
                onChange={(value) => setDetail((prev) => ({ ...prev, internalNotes: value }))}
              />
              <QuotationEditableSection
                title="Scope and Description"
                value={detail.scope}
                placeholder="Describe the scope of work…"
                onChange={setScope}
              />
              <QuotationEditableSection
                title="Terms and Conditions"
                value={detail.terms}
                placeholder="Payment terms, validity, exclusions…"
                onChange={(value) => setDetail((prev) => ({ ...prev, terms: value }))}
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
              <QuotationDetailActions onStatusChange={setStatus} onCreateRevision={createRevision} />
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
