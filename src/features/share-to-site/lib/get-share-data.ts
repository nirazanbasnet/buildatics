import { apiFetch } from "@/features/auth/lib/api-client";
import type { DesignProperty, PagedReq } from "@/features/designs";

import type {
  CompanyDesignsIFrameRes,
  CompanyStyleRes,
  PublicCompanyDesignResPage,
} from "./dto";
import { decodeShareConfig, type ShareConfig } from "./share-config";
import { mapPublicDesignToProperty } from "./map-public-design";

// Server-only: fetches the company's embed iframe (carries the public token + style).
export async function getCompanyDesignsIFrame(): Promise<CompanyDesignsIFrameRes> {
  return apiFetch<CompanyDesignsIFrameRes>(
    "/api/Company/GetCompanyDesignsIFrame",
    {
      auth: true,
    },
  );
}

// Server-only: reads the saved public-design style (font/theme/layout) off the company record.
export async function getShareConfig(): Promise<ShareConfig> {
  const company = await apiFetch<CompanyStyleRes>("/api/Company/Get", {
    auth: true,
  });
  return decodeShareConfig(company.publicCompanyDesignStyle);
}

// Server-only: fetches one page of the company's PUBLIC designs via the share token (anonymous endpoint).
export async function getPublicDesignsPage(
  token: string,
  req: PagedReq,
): Promise<{ designs: DesignProperty[]; totalCount: number }> {
  const res = await apiFetch<PublicCompanyDesignResPage>(
    `/api/PublicCompanyDesigns/PageDescending?token=${encodeURIComponent(token)}`,
    { method: "POST", auth: false, body: req },
  );

  const items = res.items ?? [];
  return {
    designs: items.map((d, index) => mapPublicDesignToProperty(d, index)),
    totalCount: res.totalCount ?? items.length,
  };
}

const ALL_PAGE_SIZE = 100;
const ALL_MAX_PAGES = 20; // safety cap (≤ 2000 designs)

// Fetches the whole public catalogue the share token exposes, so the preview mirrors the live site.
export async function getAllPublicDesigns(
  token: string,
): Promise<DesignProperty[]> {
  if (!token.trim()) return [];

  const all: DesignProperty[] = [];
  let pageNumber = 1;

  while (pageNumber <= ALL_MAX_PAGES) {
    const { designs, totalCount } = await getPublicDesignsPage(token, {
      pageNumber,
      pageSize: ALL_PAGE_SIZE,
    });
    all.push(...designs);
    if (all.length >= totalCount || designs.length < ALL_PAGE_SIZE) break;
    pageNumber += 1;
  }

  return all;
}
