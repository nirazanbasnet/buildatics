import type { AddressRes, LeadRes } from "./dto";
import type { LeadRow } from "../types";

/**
 * API → UI field map for the Leads table (see agent/api.md: document the map + gaps).
 *
 * DIRECT MAP  LeadRes → LeadRow:
 *   `#LN{sequenceNumber}`                              → leadNo
 *   leadContacts[0].contact.firstName + lastName       → client
 *   leadContacts[0].contact.primaryPhone               → phone
 *   siteAddress ?? leadContacts[0].contact.address     → address (composed)
 *   leadStageId  (+ stages map)                        → stage (name)   [join: LeadStages/GetAll]
 *   assignedUserId (+ staff map)                       → assignee       [join: Staff/All]
 *   clientBudget                                       → budget
 *   status (enum)                                      → status (label) [see GAP #2]
 *
 * GAPS — UI fields with NO clean API source (for the backend team):
 *   1. progress  — LeadRes has NO progress/completion field; the table's progress bar has nothing to
 *                  bind to. INTERIM: 0.
 *   2. status    — `status` is an unlabeled int enum (0-6). No labels in the spec. INTERIM: a tentative
 *                  label map (STATUS_LABELS) — confirm the real labels with the backend.
 *   3. stage/assignee names — the list endpoint returns only `leadStageId` / `assignedUserId`; we resolve
 *                  names by joining LeadStages/GetAll + Staff/All (extra calls; not embedded in the list).
 */

// Tentative — confirm real enum labels with the backend.
const STATUS_LABELS: Record<number, string> = {
  0: "New",
  1: "In Progress",
  2: "Qualified",
  3: "Won",
  4: "Lost",
  5: "On Hold",
  6: "Archived"
};

export function statusLabel(value: number | null | undefined): string {
  return STATUS_LABELS[value ?? 0] ?? `Status ${value}`;
}

function composeAddress(addr: AddressRes | null | undefined, lotNo?: string | null): string {
  if (!addr && !lotNo) return "—";
  const parts = [lotNo, addr?.street, addr?.suburb, addr?.city, addr?.areaCode].filter(
    (p): p is string => Boolean(p && p.trim())
  );
  return parts.length ? parts.join(", ") : "—";
}

export function mapLeadToRow(
  lead: LeadRes,
  stageNames: Map<string, string>,
  staffNames: Map<string, string>
): LeadRow {
  const contact = lead.leadContacts?.[0]?.contact;
  const client = [contact?.firstName, contact?.lastName].filter(Boolean).join(" ") || "—";
  const stageId = lead.leadStageId ?? "";
  const assignedUserId = lead.assignedUserId ?? "";
  const statusValue = lead.status ?? 0;

  return {
    id: lead.id ?? "",
    leadNo: `#LN${lead.sequenceNumber ?? 0}`,
    address: composeAddress(lead.siteAddress ?? contact?.address, lead.lotNo),
    status: statusLabel(statusValue),
    statusValue,
    stageId,
    stage: stageNames.get(stageId) ?? "—",
    budget: lead.clientBudget != null ? String(lead.clientBudget) : "—",
    client,
    phone: contact?.primaryPhone ?? "—",
    progress: 0, // GAP #1
    assignedUserId,
    assignee: staffNames.get(assignedUserId) ?? "—"
  };
}
