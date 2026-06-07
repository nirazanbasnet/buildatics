export const PRECON_PAGE_SIZE = 10;

// Row shape consumed by the Preconstruction table. Mapped from LeadRes (see lib/map-project.ts).
// `status` is a display label; `progress` is derived from stage position (documented gaps).
export type PreconstructionProject = {
  id: string;
  projectNo: string;
  address: string;
  status: string;
  statusValue: number;
  stageId: string;
  stage: string;
  council: string;
  developer: string;
  progress: number;
};
