import type { LeadQuoteStatus } from "./dto";

// The LeadQuoteStatus enum (docs/api/schemas.md#leadquotestatus) is an integer 0–3 with NO documented
// labels — only the note that Accepted and Rejected are terminal states. Interim mapping below; confirm
// the real value→label mapping with the API owners before relying on it.
//
// Gap: 0/1/2/3 are guessed as Draft / Sent / Accepted / Rejected (terminal: Accepted, Rejected).
export type StatusMeta = {
  value: LeadQuoteStatus;
  label: string;
  // Badge tone class built from design tokens (no hardcoded hex).
  solid: string;
  terminal: boolean;
};

export const QUOTE_STATUSES: StatusMeta[] = [
  { value: 0, label: "Draft", solid: "bg-muted text-foreground", terminal: false },
  { value: 1, label: "Sent", solid: "bg-primary text-primary-foreground", terminal: false },
  { value: 2, label: "Accepted", solid: "bg-emerald-500 text-white dark:bg-emerald-600", terminal: true },
  { value: 3, label: "Rejected", solid: "bg-destructive text-white", terminal: true }
];

const BY_VALUE = new Map(QUOTE_STATUSES.map((s) => [s.value, s]));

export function statusMeta(value: LeadQuoteStatus | null | undefined): StatusMeta {
  return BY_VALUE.get((value ?? 0) as LeadQuoteStatus) ?? QUOTE_STATUSES[0];
}
