// UI shapes for the preconstruction detail sheet (mapped from Lead* API DTOs in map-detail.ts).

export type ProjectOwner = {
  id: string;
  label: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type ProjectOverview = {
  id: string;
  projectNo: string;
  address: string;
  status: string;
  stage: string;
  progress: number;
  budget: string;
  developer: string;
  notes: string;
  owners: ProjectOwner[];
  // Free-form detail rows (lot, land size, etc.) shown in the overview.
  details: Array<{ label: string; value: string }>;
};

export type ProjectTask = {
  id: string;
  title: string;
  description: string;
  status: number;
  statusLabel: string;
  dueDate: string;
};

export type ProjectDocument = {
  id: string; // blobModelId
  name: string;
  uploadedOn: string;
  url: string;
};

export type ProjectTimelineEntry = {
  id: string;
  summary: string;
  details: string;
  occurredOn: string;
  performedBy: string;
};

export type ProjectDetail = {
  overview: ProjectOverview;
  tasks: ProjectTask[];
  documents: ProjectDocument[];
  timeline: ProjectTimelineEntry[];
};

// docs/api/schemas.md#leadtaskstatus — int enum 0-2, no labels in the spec. Tentative; confirm with backend.
export const TASK_STATUS_OPTIONS: Array<{ value: number; label: string }> = [
  { value: 0, label: "Pending" },
  { value: 1, label: "In Progress" },
  { value: 2, label: "Completed" },
];

export function taskStatusLabel(value: number | null | undefined): string {
  return (
    TASK_STATUS_OPTIONS.find((o) => o.value === value)?.label ??
    `Status ${value ?? 0}`
  );
}

// Default activity type for manual timeline logs (LeadActivityLogType enum 1-9, unlabeled — tentative).
export const MANUAL_ACTIVITY_TYPE = 1;

// docs/api/schemas.md#leadstatus — int enum 0-6, no labels in the spec (mirrors leads map-lead.ts). Tentative.
export const PROJECT_STATUS_OPTIONS: Array<{ value: number; label: string }> = [
  { value: 0, label: "New" },
  { value: 1, label: "In Progress" },
  { value: 2, label: "Qualified" },
  { value: 3, label: "Won" },
  { value: 4, label: "Lost" },
  { value: 5, label: "On Hold" },
  { value: 6, label: "Archived" },
];
