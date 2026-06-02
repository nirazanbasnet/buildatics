export type LeadStatus = "in-progress";

export type LeadAssignee = {
  initials: string;
  name: string;
};

export type Lead = {
  id: string;
  leadNo: string;
  address: string;
  status: LeadStatus;
  stageId: string;
  stage: string;
  budget: string;
  client: string;
  phone: string;
  assignees: LeadAssignee[];
  progress: number;
};

export type LeadStage = {
  id: string;
  name: string;
};

export const leadStatusLabels: Record<LeadStatus, string> = {
  "in-progress": "In Progress"
};

export const leadStages: LeadStage[] = [
  { id: "stage-1", name: "stage_name" },
  { id: "stage-2", name: "stage_name" },
  { id: "stage-3", name: "stage_name" },
  { id: "stage-4", name: "stage_name" }
];

const sharedAssignees: LeadAssignee[] = [
  { initials: "VB", name: "Vihaan Banerjee" },
  { initials: "AN", name: "Aarav Nair" }
];

export const leads: Lead[] = leadStages.flatMap((stage, stageIndex) =>
  Array.from({ length: 12 }, (_, i) => {
    const n = stageIndex * 12 + i + 1;
    return {
      id: `ln-${String(n).padStart(3, "0")}`,
      leadNo: "#LN10000",
      address: "lotNo, streetNo streetName, suburb postCode",
      status: "in-progress" as const,
      stageId: stage.id,
      stage: stage.name,
      budget: "10",
      client: "client_name",
      phone: "+61 400 000 000",
      assignees: sharedAssignees,
      progress: 70
    };
  })
);

export function groupLeadsByStage(
  source: Lead[],
  stages: LeadStage[] = leadStages
): Record<string, Lead[]> {
  const grouped: Record<string, Lead[]> = {};
  for (const stage of stages) grouped[stage.id] = [];
  for (const lead of source) {
    if (grouped[lead.stageId]) grouped[lead.stageId].push(lead);
  }
  return grouped;
}
