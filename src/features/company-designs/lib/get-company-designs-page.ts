import { apiFetch } from "@/features/auth/lib/api-client";
import type { DesignProperty, PagedReq } from "@/features/designs";

import type { CompanyDesignResPage } from "./dto";
import { mapCompanyDesignToProperty } from "./map-company-design";

export type CompanyDesignsPage = {
  designs: DesignProperty[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

// Server-only: fetches a page of the company's own designs (most-recently-updated first) through the
// BFF gateway and maps each to the shared UI shape. SAS preview URLs expire ~15 min — fetch per request.
export async function getCompanyDesignsPage(
  req: PagedReq,
): Promise<CompanyDesignsPage> {
  const res = await apiFetch<CompanyDesignResPage>(
    "/api/CompanyDesigns/PageDescending",
    {
      method: "POST",
      auth: true,
      body: req,
    },
  );

  const items = res.items ?? [];

  return {
    designs: items.map((cd, index) => mapCompanyDesignToProperty(cd, index)),
    totalCount: res.totalCount ?? items.length,
    pageNumber: res.pageNumber ?? req.pageNumber,
    pageSize: res.pageSize ?? req.pageSize,
  };
}

const ALL_PAGE_SIZE = 100;
const ALL_MAX_PAGES = 20; // safety cap (≤ 2000 designs)

// Fetches the entire company design set so the Company Library can filter/paginate client-side
// (PageDescending takes only pageNumber/pageSize). Loops pages until everything is retrieved.
export async function getAllCompanyDesigns(): Promise<DesignProperty[]> {
  const all: DesignProperty[] = [];
  let pageNumber = 1;

  while (pageNumber <= ALL_MAX_PAGES) {
    const { designs, totalCount } = await getCompanyDesignsPage({
      pageNumber,
      pageSize: ALL_PAGE_SIZE,
    });
    all.push(...designs);
    if (all.length >= totalCount || designs.length < ALL_PAGE_SIZE) break;
    pageNumber += 1;
  }

  return all;
}
