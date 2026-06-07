import { apiFetch } from "@/features/auth/lib/api-client";

import type { BrochureResPage, BrochureTemplateResPage } from "./dto";
import { mapBrochureRow } from "./map-brochure";
import type { BrochureRow, TemplateOption } from "./types";

const ALL_PAGE_SIZE = 100;
const ALL_MAX_PAGES = 20;

// Server-only: available brochure templates (BrochureTemplates/Page, looped).
export async function getBrochureTemplates(): Promise<TemplateOption[]> {
  const templates: TemplateOption[] = [];
  let pageNumber = 1;
  while (pageNumber <= ALL_MAX_PAGES) {
    const res = await apiFetch<BrochureTemplateResPage>(
      "/api/BrochureTemplates/Page",
      {
        method: "POST",
        auth: true,
        body: { pageNumber, pageSize: ALL_PAGE_SIZE },
      },
    );
    const items = res.items ?? [];
    templates.push(
      ...items.map((t) => ({
        id: t.id ?? "",
        name: t.name ?? "Untitled template",
      })),
    );
    const total = res.totalCount ?? templates.length;
    if (templates.length >= total || items.length < ALL_PAGE_SIZE) break;
    pageNumber += 1;
  }
  return templates;
}

// Server-only: all brochures (Brochures/Page, looped), mapped to rows. SAS URLs expire — fetch per request.
export async function getAllBrochures(
  templates?: TemplateOption[],
): Promise<BrochureRow[]> {
  const templateList = templates ?? (await getBrochureTemplates());
  const templateNames = new Map(templateList.map((t) => [t.id, t.name]));

  const rows: BrochureRow[] = [];
  let pageNumber = 1;
  while (pageNumber <= ALL_MAX_PAGES) {
    const res = await apiFetch<BrochureResPage>("/api/Brochures/Page", {
      method: "POST",
      auth: true,
      body: { pageNumber, pageSize: ALL_PAGE_SIZE },
    });
    const items = res.items ?? [];
    rows.push(...items.map((b) => mapBrochureRow(b, templateNames)));
    const total = res.totalCount ?? rows.length;
    if (rows.length >= total || items.length < ALL_PAGE_SIZE) break;
    pageNumber += 1;
  }
  return rows;
}
