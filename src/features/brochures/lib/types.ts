export const BROCHURES_PAGE_SIZE = 10;

// Row shape for the brochures table. Only `name`/`templateName`/`created`/`htmlUrl` are API-backed;
// the reference table's client/site-address/status columns have no API source (rendered as NoApiData).
export type BrochureRow = {
  id: string;
  name: string;
  templateName: string; // "" when none
  created: string;
  htmlUrl: string; // "" when no blob
};

// Detail model — API-backed fields only. The mock-only sections (owners/property/designs/history/status)
// are rendered with the NoApiData label in the detail components.
export type BrochureDetailModel = {
  id: string;
  name: string;
  note: string;
  templateId: string;
  templateName: string;
  created: string;
  htmlUrl: string;
};

// A brochure template option for the create/edit Select.
export type TemplateOption = { id: string; name: string };
