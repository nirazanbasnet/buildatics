import { apiFetch } from "@/features/auth/lib/api-client";

import type { DesignResPage } from "./dto";
import { mapDesignToProperty } from "./map-design";
import type { DesignProperty, DesignsPage, PagedReq } from "../types";

// Server-only: fetches a page of system designs through the BFF gateway and maps each to the UI shape.
// SAS preview URLs in the response expire ~15 min, so callers must fetch per request (no caching).
export async function getDesignsPage(req: PagedReq): Promise<DesignsPage> {
  const res = await apiFetch<DesignResPage>("/api/Designs/Page", {
    method: "POST",
    auth: true,
    body: req,
  });

  const items = res.items ?? [];

  return {
    designs: items.map((design, index) => mapDesignToProperty(design, index)),
    totalCount: res.totalCount ?? items.length,
    pageNumber: res.pageNumber ?? req.pageNumber,
    pageSize: res.pageSize ?? req.pageSize,
  };
}

const ALL_PAGE_SIZE = 100;
const ALL_MAX_PAGES = 20; // safety cap (≤ 2000 designs)

// Fetches the entire design set so the Design Library can filter/paginate client-side
// (the endpoint has no server-side filter). Loops pages until everything is retrieved.
export async function getAllDesigns(): Promise<DesignProperty[]> {
  const all: DesignProperty[] = [];
  let pageNumber = 1;

  while (pageNumber <= ALL_MAX_PAGES) {
    const { designs, totalCount } = await getDesignsPage({
      pageNumber,
      pageSize: ALL_PAGE_SIZE,
    });
    all.push(...designs);
    if (all.length >= totalCount || designs.length < ALL_PAGE_SIZE) break;
    pageNumber += 1;
  }

  return all;
}
