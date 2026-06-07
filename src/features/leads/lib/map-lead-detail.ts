import type { DesignProperty } from "@/features/designs";

import type { AddressRes } from "./dto";
import type {
  LeadActivityLogRes,
  LeadDesignRes,
  LeadDetailRes,
  LeadQuoteRes,
  LeadTaskRes,
} from "./lead-detail-dto";
import { statusLabel } from "./map-lead";
import { quoteStatusLabel, taskStatusLabel } from "./lead-detail-types";
import type {
  LeadActivityEntry,
  LeadDesignItem,
  LeadOverview,
  LeadOwner,
  LeadQuoteRow,
  LeadTask,
} from "./lead-detail-types";

// Mappers Lead* DTOs → Lead detail UI shapes (see agent/api.md: document the map + gaps).
// GAPS: progress derives from stage position (no API field); quote amount only when line items present.

const DASH = "—";

function composeAddress(
  addr: AddressRes | null | undefined,
  lotNo?: string | null,
): string {
  const parts = [
    lotNo,
    addr?.street,
    addr?.suburb,
    addr?.city,
    addr?.areaCode,
  ].filter((p): p is string => Boolean(p && p.trim()));
  return parts.length ? parts.join(", ") : DASH;
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return DASH;
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? DASH
    : d.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function mapLeadOverview(
  lead: LeadDetailRes,
  ctx: { stageName: string; progress: number },
): LeadOverview {
  const owners: LeadOwner[] = (lead.leadContacts ?? []).map((lc, i) => {
    const c = lc.contact;
    return {
      id: lc.contactId ?? c?.id ?? `owner-${i}`,
      label: `Owner ${i + 1}`,
      name: [c?.firstName, c?.lastName].filter(Boolean).join(" ") || DASH,
      email: c?.primaryEmail ?? DASH,
      phone: c?.primaryPhone ?? DASH,
      address: composeAddress(c?.address),
    };
  });

  const statusValue = lead.status ?? 0;

  return {
    id: lead.id ?? "",
    leadNo: `#LN${lead.sequenceNumber ?? 0}`,
    address: composeAddress(lead.siteAddress, lead.lotNo),
    status: statusLabel(statusValue),
    statusValue,
    stage: ctx.stageName || DASH,
    progress: ctx.progress,
    budget:
      lead.clientBudget != null ? formatCurrency(lead.clientBudget) : DASH,
    developer: lead.developer?.trim() || DASH,
    notes: lead.notes?.trim() || "",
    owners,
  };
}

export function mapLeadTask(task: LeadTaskRes): LeadTask {
  return {
    id: task.id ?? "",
    title: task.title ?? DASH,
    description: task.description?.trim() || "",
    status: task.status ?? 0,
    statusLabel: taskStatusLabel(task.status),
    dueDate: formatDate(task.dueDate),
  };
}

export function mapLeadQuote(quote: LeadQuoteRes): LeadQuoteRow {
  const items = quote.lineItems ?? [];
  const total = items.reduce(
    (sum, li) => sum + (li.qty ?? 0) * (li.unitPrice ?? 0),
    0,
  );
  return {
    id: quote.id ?? "",
    ref: quote.title?.trim() || "Untitled quote",
    version: quote.version ?? 1,
    amount: items.length ? formatCurrency(total) : DASH,
    validUntil: formatDate(quote.validUntilUtc),
    status: quote.status ?? 0,
    statusLabel: quoteStatusLabel(quote.status),
  };
}

export function mapLeadActivity(log: LeadActivityLogRes): LeadActivityEntry {
  return {
    id: log.id ?? "",
    summary: log.summary ?? DASH,
    details: log.details?.trim() || "",
    occurredOn: formatDate(log.occurredOnUtc),
    performedBy: log.performedByName?.trim() || DASH,
  };
}

export function mapLeadDesign(
  link: LeadDesignRes,
  designsById: Map<string, DesignProperty>,
): LeadDesignItem {
  const cd = link.companyDesignId
    ? designsById.get(link.companyDesignId)
    : undefined;
  return {
    id: link.id ?? "",
    companyDesignId: link.companyDesignId ?? "",
    title: cd?.title ?? "Linked design",
    image: cd?.facade ?? "",
  };
}
