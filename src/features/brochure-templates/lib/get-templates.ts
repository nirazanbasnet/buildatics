import { apiFetch } from "@/features/auth/lib/api-client";

import type { BrochureTemplateAResPage } from "./dto";
import { mapTemplateRow } from "./map";
import type { BrochureTemplateRow } from "./types";

const ALL_PAGE_SIZE = 100;
const ALL_MAX_PAGES = 20;

// Server-only (Admin): all brochure templates (BrochureTemplatesA/Page, looped) → rows.
export async function getAllBrochureTemplates(): Promise<
  BrochureTemplateRow[]
> {
  const rows: BrochureTemplateRow[] = [];
  let pageNumber = 1;
  while (pageNumber <= ALL_MAX_PAGES) {
    const res = await apiFetch<BrochureTemplateAResPage>(
      "/api/BrochureTemplatesA/Page",
      {
        method: "POST",
        auth: true,
        body: { pageNumber, pageSize: ALL_PAGE_SIZE },
      },
    );
    const items = res.items ?? [];
    rows.push(...items.map(mapTemplateRow));
    const total = res.totalCount ?? rows.length;
    if (rows.length >= total || items.length < ALL_PAGE_SIZE) break;
    pageNumber += 1;
  }
  return rows;
}
