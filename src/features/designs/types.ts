// Paginated request body for the API (docs/api/schemas.md#pagedreq).
export type PagedReq = {
  pageNumber: number;
  pageSize: number;
};

// The shape the display-center UI consumes (structurally identical to the kit's `Property` type in
// src/app/dashboard/(auth)/templates/display-center/_data.ts). Defined here to avoid coupling the
// feature to the reference-kit folder; structural typing keeps it assignable to `Property`.
export type DesignProperty = {
  id: string;
  title: string;
  brand: string;
  version: string;
  width: number;
  depth: number;
  squareFootage: number;
  beds: number;
  baths: number;
  living: number;
  garage: number;
  facade: string;
  floorPlan: string;
};

export type DesignView = "facade" | "floor";

// One source of truth for the grid page size (3-column grid → 3 rows).
export const DESIGNS_PAGE_SIZE = 9;

export type DesignsPage = {
  designs: DesignProperty[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};
