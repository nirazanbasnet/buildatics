// Design-only placeholder data for the preconstruction detail, mirroring the reference sample
// (src/app/dashboard/(auth)/templates/preconstruction-detail/_data.ts). These sections have NO API
// source yet (Category Progress, ITI stages, role contacts, Spent/Timeline stats); they render with
// these placeholders so the production detail matches the approved design 1:1. Replace with real data
// once the backend exposes it.

export type ProjectCategoryStatus = "done" | "in-progress" | "pending";

export type ProjectCategory = {
  id: string;
  label: string;
  status: ProjectCategoryStatus;
  completed: number;
  total: number;
};

export const STATIC_CATEGORIES: ProjectCategory[] = [
  {
    id: "cat1",
    label: "Legal and Finance",
    status: "done",
    completed: 4,
    total: 4,
  },
  {
    id: "cat2",
    label: "Design and Drafting",
    status: "done",
    completed: 4,
    total: 4,
  },
  {
    id: "cat3",
    label: "Permits and Approval",
    status: "done",
    completed: 4,
    total: 4,
  },
  {
    id: "cat4",
    label: "Color and Selection",
    status: "in-progress",
    completed: 2,
    total: 4,
  },
  {
    id: "cat5",
    label: "Sites and Trades",
    status: "in-progress",
    completed: 2,
    total: 4,
  },
  { id: "cat6", label: "Pre-Start", status: "pending", completed: 0, total: 4 },
];

export type ProjectRoleContact = { id: string; role: string; value: string };

// Developer is overridden with the real lead.developer at render time; the rest are placeholders.
export const STATIC_CONTACT_ROLES: ProjectRoleContact[] = [
  { id: "c1", role: "Geotech Engineer", value: "geotechEngineer_name" },
  { id: "c2", role: "Structural Engineer", value: "structuralEngineer_name" },
  { id: "c3", role: "Energy Rater", value: "energyRater_name" },
  { id: "c4", role: "Building Surveyer", value: "buildingSurveyer_name" },
  { id: "c5", role: "Developer", value: "developer_name" },
  { id: "c6", role: "Council", value: "council_name" },
  { id: "c7", role: "Water Authority", value: "waterAuthority_name" },
];

export type ProjectStageTaskStatus = "completed" | "in-progress" | "pending";

export type ProjectStageTask = {
  id: string;
  label: string;
  staff: string;
  status: ProjectStageTaskStatus;
  date: string;
};

export type ProjectStage = {
  id: string;
  label: string;
  tasks: ProjectStageTask[];
};

function stageTasks(statuses: ProjectStageTaskStatus[]): ProjectStageTask[] {
  return statuses.map((status, i) => ({
    id: `t${i + 1}`,
    label: `Task ${i + 1}`,
    staff: "staff_name",
    status,
    date: "25 Jan 2027",
  }));
}

export const STATIC_ITI_STAGES: ProjectStage[] = [
  {
    id: "s1",
    label: "Concept Stage",
    tasks: stageTasks(["completed", "completed", "completed", "completed"]),
  },
  {
    id: "s2",
    label: "Preliminary Drawing",
    tasks: stageTasks(["completed", "completed", "completed", "completed"]),
  },
  {
    id: "s3",
    label: "Developer Approval",
    tasks: stageTasks(["completed", "completed", "completed", "completed"]),
  },
  {
    id: "s4",
    label: "Construction Drawings",
    tasks: stageTasks(["in-progress", "completed", "completed", "in-progress"]),
  },
  {
    id: "s5",
    label: "Building Permit",
    tasks: stageTasks(["pending", "pending", "pending", "pending"]),
  },
];

// Stat-card placeholders (no API): the budget value falls back to this when clientBudget is absent.
export const STATIC_STATS = {
  budgetFallback: "$ cost",
  spent: "Spent $0000",
  timeline: "7 months",
  timelineDate: "25 Oct 2025",
  stageStatus: "On Schedule",
} as const;
