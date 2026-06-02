export type PreconstructionListStatus = "in-progress";

export type PreconstructionListProject = {
  id: string;
  projectNo: string;
  address: string;
  status: PreconstructionListStatus;
  stage: string;
  council: string;
  developer: string;
  progress: number;
};

export const preconstructionListStatusLabels: Record<PreconstructionListStatus, string> = {
  "in-progress": "In Progress"
};

export const preconstructionListProjects: PreconstructionListProject[] = Array.from(
  { length: 15 },
  (_, i) => ({
    id: `pr-${String(i + 1).padStart(3, "0")}`,
    projectNo: "#PR1000",
    address: "LotNo, streetNo streetName, suburb postCode",
    status: "in-progress",
    stage: "stage_name",
    council: "client_name",
    developer: "developer_name",
    progress: 50
  })
);
