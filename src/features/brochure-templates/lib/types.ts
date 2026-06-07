export const TEMPLATES_PAGE_SIZE = 10;

export type BrochureTemplateRow = {
  id: string;
  name: string;
  note: string;
  isAvailable: boolean;
  created: string;
  fileName: string;
  fileUrl: string; // "" when no blob
};

// Values prefilled into the edit form (fetched via Get).
export type BrochureTemplateEdit = {
  id: string;
  name: string;
  note: string;
  jsonConfig: string;
  isAvailable: boolean;
};
