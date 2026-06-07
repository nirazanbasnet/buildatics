import { apiFetch } from "@/features/auth/lib/api-client";

import type { AllEnumsRes, LeadStageRes } from "../../lib/dto";

// "kind" drives how the section renders: editable lead-stage CRUD, read-only enum list, or no API.
export type DataSetupKind = "lead-stages" | "enum" | "none";

export type DataSetupRow = { id: string; name: string };

export type DataSetupItem = {
  id: string;
  label: string;
  columnLabel: string;
  kind: DataSetupKind;
  rows: DataSetupRow[];
};

export type DataSetupGroup = { label: string; items: DataSetupItem[] };

export async function getDataSetup(): Promise<DataSetupGroup[]> {
  const [stages, enums] = await Promise.all([
    apiFetch<LeadStageRes[]>("/api/LeadStages/GetAll", { auth: true }),
    apiFetch<AllEnumsRes>("/api/StaticValues/All", { auth: true }),
  ]);

  const leadStageRows: DataSetupRow[] = (stages ?? []).map((s) => ({
    id: s.id ?? "",
    name: s.name ?? "—",
  }));
  const leadStatusRows: DataSetupRow[] = (enums.leadStatuses ?? []).map(
    (e) => ({
      id: e.id ?? e.value ?? "",
      name: e.value ?? "—",
    }),
  );
  const designStatusRows: DataSetupRow[] = (enums.designStatuses ?? []).map(
    (e) => ({
      id: e.id ?? e.value ?? "",
      name: e.value ?? "—",
    }),
  );

  return [
    {
      label: "Sales",
      items: [
        {
          id: "lead-stages",
          label: "Lead Stages",
          columnLabel: "Lead Stage",
          kind: "lead-stages",
          rows: leadStageRows,
        },
        {
          id: "lead-status",
          label: "Lead Status",
          columnLabel: "Lead Status",
          kind: "enum",
          rows: leadStatusRows,
        },
      ],
    },
    {
      label: "Display Center",
      items: [
        {
          id: "design-stages",
          label: "Design Stages",
          columnLabel: "Design Stage",
          kind: "none",
          rows: [],
        },
        {
          id: "design-status",
          label: "Design Status",
          columnLabel: "Design Status",
          kind: "enum",
          rows: designStatusRows,
        },
      ],
    },
    {
      label: "Projects",
      items: [
        {
          id: "project-status",
          label: "Project Status",
          columnLabel: "Project Status",
          kind: "none",
          rows: [],
        },
      ],
    },
  ];
}
