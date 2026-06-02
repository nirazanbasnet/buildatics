import {
  Calendar,
  FileText,
  HardHat,
  LayoutDashboard,
  ListChecks,
  type LucideIcon
} from "lucide-react";

export type PreconstructionCategoryStatus = "done" | "in-progress" | "pending";

export type PreconstructionCategory = {
  id: string;
  label: string;
  status: PreconstructionCategoryStatus;
  completed: number;
  total: number;
};

export type PreconstructionTaskStatus = "completed" | "in-progress" | "pending";

export type PreconstructionTask = {
  id: string;
  label: string;
  staff: string;
  status: PreconstructionTaskStatus;
  date: string;
};

export type PreconstructionStage = {
  id: string;
  label: string;
  tasks: PreconstructionTask[];
};

export type PreconstructionTaskRow = {
  id: string;
  label: string;
  status: PreconstructionTaskStatus;
  startDate: string;
  dueDate: string;
};

export type PreconstructionDocument = {
  id: string;
  name: string;
  size: string;
  uploadedBy: string;
  uploadedOn: string;
};

export type PreconstructionTimelineEntry = {
  id: string;
  title: string;
  date: string;
  time: string;
};

export type PreconstructionDetailContact = {
  id: string;
  role: string;
  value: string;
};

export type PreconstructionDetailOwner = {
  id: string;
  label: string;
  name: string;
  address: string;
  email: string;
  contact: string;
};

export type PreconstructionDetailProject = {
  id: string;
  projectNo: string;
  status: "in-progress";
  address: string;
  progress: number;
  totalBudget: string;
  spent: string;
  timeline: string;
  timelineDate: string;
  stage: string;
  stageStatus: string;
  owners: PreconstructionDetailOwner[];
  contacts: PreconstructionDetailContact[];
  categories: PreconstructionCategory[];
  stages: PreconstructionStage[];
  taskList: PreconstructionTaskRow[];
  documents: PreconstructionDocument[];
  timelineEntries: PreconstructionTimelineEntry[];
};

export const preconstructionDetailTabs = [
  "Overview",
  "ITI Preconstruction",
  "Tasks",
  "Documents",
  "Timeline"
] as const;

export type PreconstructionDetailTab = (typeof preconstructionDetailTabs)[number];

const preconstructionDetailTabIcons: Record<PreconstructionDetailTab, LucideIcon> = {
  Overview: LayoutDashboard,
  "ITI Preconstruction": HardHat,
  Tasks: ListChecks,
  Documents: FileText,
  Timeline: Calendar
};

export const preconstructionDetailTabItems = preconstructionDetailTabs.map((value) => ({
  value,
  icon: preconstructionDetailTabIcons[value]
}));

const dummyOwner = {
  name: "client_name",
  address: "lotNo, streetNo streetName, suburb postCode",
  email: "client_email@gmail.com",
  contact: "+61 400 000 000"
};

function buildStageTasks(statuses: PreconstructionTaskStatus[]): PreconstructionTask[] {
  return statuses.map((status, i) => ({
    id: `t${i + 1}`,
    label: `Task ${i + 1}`,
    staff: "staff_name",
    status,
    date: "25 Jan 2027"
  }));
}

const preconstructionStages: PreconstructionStage[] = [
  {
    id: "s1",
    label: "Concept Stage",
    tasks: buildStageTasks(["completed", "completed", "completed", "completed"])
  },
  {
    id: "s2",
    label: "Preliminary Drawing",
    tasks: buildStageTasks(["completed", "completed", "completed", "completed"])
  },
  {
    id: "s3",
    label: "Developer Approval",
    tasks: buildStageTasks(["completed", "completed", "completed", "completed"])
  },
  {
    id: "s4",
    label: "Construction Drawings",
    tasks: buildStageTasks(["in-progress", "completed", "completed", "in-progress"])
  },
  {
    id: "s5",
    label: "Building Permit",
    tasks: buildStageTasks(["pending", "pending", "pending", "pending"])
  }
];

const preconstructionTaskRows: PreconstructionTaskRow[] = [
  {
    id: "task-1",
    label: "Task 1",
    status: "in-progress",
    startDate: "25 Jan 2027",
    dueDate: "25 Jan 2027"
  },
  {
    id: "task-2",
    label: "Task 2",
    status: "in-progress",
    startDate: "25 Jan 2027",
    dueDate: "25 Jan 2027"
  },
  {
    id: "task-3",
    label: "Task 3",
    status: "in-progress",
    startDate: "25 Jan 2027",
    dueDate: "25 Jan 2027"
  }
];

const preconstructionDocuments: PreconstructionDocument[] = [
  {
    id: "doc-1",
    name: "file_name",
    size: "file_size",
    uploadedBy: "staff_name",
    uploadedOn: "uploaded_date"
  },
  {
    id: "doc-2",
    name: "file_name",
    size: "file_size",
    uploadedBy: "staff_name",
    uploadedOn: "uploaded_date"
  },
  {
    id: "doc-3",
    name: "file_name",
    size: "file_size",
    uploadedBy: "staff_name",
    uploadedOn: "uploaded_date"
  }
];

const preconstructionTimeline: PreconstructionTimelineEntry[] = [
  {
    id: "log-1",
    title: "Email was sent for site verification",
    date: "22 July, 2021",
    time: "2:61 PM"
  },
  { id: "log-2", title: "Called for progress update", date: "23 July, 2021", time: "7:32 PM" },
  {
    id: "log-3",
    title: "Email was sent for site verification",
    date: "22 July, 2021",
    time: "2:61 PM"
  },
  { id: "log-4", title: "Called for progress update", date: "23 July, 2021", time: "7:32 PM" }
];

export const preconstructionDetailMock: PreconstructionDetailProject = {
  id: "pr-001",
  projectNo: "#PR1000",
  status: "in-progress",
  address: "lotNo, streetNo streetName, suburb postCode",
  progress: 35,
  totalBudget: "$ cost",
  spent: "$0000",
  timeline: "7 months",
  timelineDate: "25 Oct 2025",
  stage: "stage_name",
  stageStatus: "On Schedule",
  owners: [
    { id: "o1", label: "Owner 1", ...dummyOwner },
    { id: "o2", label: "Owner 2", ...dummyOwner },
    { id: "o3", label: "Owner 3", ...dummyOwner }
  ],
  contacts: [
    { id: "c1", role: "Geotech Engineer", value: "geotechEngineer_name" },
    { id: "c2", role: "Structural Engineer", value: "structuralEngineer_name" },
    { id: "c3", role: "Energy Rater", value: "energyRater_name" },
    { id: "c4", role: "Building Surveyer", value: "buildingSurveyer_name" },
    { id: "c5", role: "Developer", value: "developer_name" },
    { id: "c6", role: "Council", value: "council_name" },
    { id: "c7", role: "Water Authority", value: "waterAuthority_name" }
  ],
  categories: [
    { id: "cat1", label: "Legal and Finance", status: "done", completed: 4, total: 4 },
    { id: "cat2", label: "Design and Drafting", status: "done", completed: 4, total: 4 },
    { id: "cat3", label: "Permits and Approval", status: "done", completed: 4, total: 4 },
    { id: "cat4", label: "Color and Selection", status: "in-progress", completed: 2, total: 4 },
    { id: "cat5", label: "Sites and Trades", status: "in-progress", completed: 2, total: 4 },
    { id: "cat6", label: "Pre-Start", status: "pending", completed: 0, total: 4 }
  ],
  stages: preconstructionStages,
  taskList: preconstructionTaskRows,
  documents: preconstructionDocuments,
  timelineEntries: preconstructionTimeline
};
