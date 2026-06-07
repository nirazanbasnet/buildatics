import { statusLabel } from "@/features/leads/lib/map-lead";

import type {
  AddressRes,
  LeadActivityLogRes,
  LeadBlobMapRes,
  LeadTaskRes,
  PreconLeadRes,
} from "./dto";
import { taskStatusLabel } from "./detail-types";
import type {
  ProjectDocument,
  ProjectOverview,
  ProjectOwner,
  ProjectTask,
  ProjectTimelineEntry,
} from "./detail-types";

// Mappers Lead* API DTOs → preconstruction detail UI shapes. See agent/api.md: document map + gaps.
// GAPS: council has no API field (omitted here); progress derives from stage position (passed in);
// document file size is not exposed by BlobModelRes (omitted).

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

export type OverviewMapContext = {
  stageName: string;
  progress: number;
};

export function mapOverview(
  lead: PreconLeadRes,
  ctx: OverviewMapContext,
): ProjectOverview {
  const owners: ProjectOwner[] = (lead.leadContacts ?? []).map((lc, i) => {
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

  const num = (v: number | null | undefined, suffix = "") =>
    v != null ? `${v}${suffix}` : DASH;

  const details: Array<{ label: string; value: string }> = [
    { label: "Lot No", value: lead.lotNo?.trim() || DASH },
    { label: "Land width", value: num(lead.landWidthInMetres, " m") },
    { label: "Land depth", value: num(lead.landDepthInMetres, " m") },
    { label: "House area", value: num(lead.houseAreaInSquareMetres, " m²") },
    { label: "Land size", value: num(lead.landSizeInSquareMetres, " m²") },
  ];

  return {
    id: lead.id ?? "",
    projectNo: `#PR${lead.sequenceNumber ?? 0}`,
    address: composeAddress(lead.siteAddress, lead.lotNo),
    status: statusLabel(lead.status ?? 0),
    stage: ctx.stageName || DASH,
    progress: ctx.progress,
    budget: lead.clientBudget != null ? String(lead.clientBudget) : DASH,
    developer: lead.developer?.trim() || DASH,
    notes: lead.notes?.trim() || "",
    owners,
    details,
  };
}

export function mapTask(task: LeadTaskRes): ProjectTask {
  return {
    id: task.id ?? "",
    title: task.title ?? DASH,
    description: task.description?.trim() || "",
    status: task.status ?? 0,
    statusLabel: taskStatusLabel(task.status),
    dueDate: formatDate(task.dueDate),
  };
}

export function mapDocument(blob: LeadBlobMapRes): ProjectDocument {
  const model = blob.blobModel;
  return {
    id: blob.blobModelId ?? model?.id ?? "",
    name: model?.fileName ?? "Untitled file",
    uploadedOn: formatDate(model?.updatedOnUtc),
    url: model?.inlineOpenSasUrl ?? model?.sasUrl ?? "",
  };
}

export function mapTimelineEntry(
  log: LeadActivityLogRes,
): ProjectTimelineEntry {
  return {
    id: log.id ?? "",
    summary: log.summary ?? DASH,
    details: log.details?.trim() || "",
    occurredOn: formatDate(log.occurredOnUtc),
    performedBy: log.performedByName?.trim() || DASH,
  };
}
