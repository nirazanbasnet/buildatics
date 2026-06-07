import type { DesignProperty } from "../types";

// Client-side filtering: /api/Designs/Page accepts only PagedReq (no server-side filter/search),
// so the Design Library fetches the full set once and filters here over fields the API returns.

export type DesignFilterState = {
  houseArea: [number, number];
  minBlockDepth: string;
  minBlockWidth: string;
  bedrooms: string;
  baths: string;
  garage: string;
};

// Fallback bounds when there's no data; real bounds are derived from the designs (getAreaBounds)
// because the API's areaInSquares values vary widely and a hardcoded range would exclude everything.
export const AREA_FALLBACK_MIN = 0;
export const AREA_FALLBACK_MAX = 100;

export type AreaBounds = [number, number];

// Computes the house-area slider range from the actual data, rounded to clean integers.
export function getAreaBounds(designs: DesignProperty[]): AreaBounds {
  if (designs.length === 0) return [AREA_FALLBACK_MIN, AREA_FALLBACK_MAX];
  let min = Infinity;
  let max = -Infinity;
  for (const d of designs) {
    if (d.squareFootage < min) min = d.squareFootage;
    if (d.squareFootage > max) max = d.squareFootage;
  }
  min = Math.floor(min);
  max = Math.ceil(max);
  if (min === max) max = min + 1;
  return [min, max];
}

// Default filter state for a given area range: full range + no other constraints (matches all designs).
export function makeDefaultFilters(areaBounds: AreaBounds): DesignFilterState {
  return {
    houseArea: [areaBounds[0], areaBounds[1]],
    minBlockDepth: "all",
    minBlockWidth: "all",
    bedrooms: "all",
    baths: "all",
    garage: "all",
  };
}

export const blockOptions = [
  { value: "all", label: "All" },
  { value: "8.5", label: "8.5m" },
  { value: "10.5", label: "10.5m" },
  { value: "12.5", label: "12.5m" },
];

export const countOptions = [
  { value: "all", label: "All" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4+", label: "4+" },
];

export const garageOptions = [
  { value: "all", label: "All" },
  { value: "single", label: "Single" },
  { value: "double", label: "Double" },
];

// Resets a single filter back to its default (so a toolbar chip's ✕ can clear just that one).
export function clearFilterKey(
  state: DesignFilterState,
  key: keyof DesignFilterState,
  areaBounds: AreaBounds,
): DesignFilterState {
  if (key === "houseArea")
    return { ...state, houseArea: [areaBounds[0], areaBounds[1]] };
  return { ...state, [key]: "all" };
}

// Human-readable chips for the active filters (shown in the toolbar with their actual values).
export function describeActiveFilters(
  state: DesignFilterState,
  areaBounds: AreaBounds,
): Array<{ key: keyof DesignFilterState; label: string }> {
  const chips: Array<{ key: keyof DesignFilterState; label: string }> = [];
  const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

  if (
    state.houseArea[0] !== areaBounds[0] ||
    state.houseArea[1] !== areaBounds[1]
  ) {
    chips.push({
      key: "houseArea",
      label: `Area: ${fmt(state.houseArea[0])}–${fmt(state.houseArea[1])} sq`,
    });
  }
  if (state.minBlockDepth !== "all") {
    chips.push({
      key: "minBlockDepth",
      label: `Depth: ≥${state.minBlockDepth}m`,
    });
  }
  if (state.minBlockWidth !== "all") {
    chips.push({
      key: "minBlockWidth",
      label: `Width: ≥${state.minBlockWidth}m`,
    });
  }
  if (state.bedrooms !== "all")
    chips.push({ key: "bedrooms", label: `${state.bedrooms} Beds` });
  if (state.baths !== "all")
    chips.push({ key: "baths", label: `${state.baths} Baths` });
  if (state.garage !== "all") {
    const g =
      state.garage === "single"
        ? "Single"
        : state.garage === "double"
          ? "Double"
          : state.garage;
    chips.push({ key: "garage", label: `Garage: ${g}` });
  }
  return chips;
}

export function countActiveFilters(
  state: DesignFilterState,
  areaBounds: AreaBounds,
): number {
  let n = 0;
  if (
    state.houseArea[0] !== areaBounds[0] ||
    state.houseArea[1] !== areaBounds[1]
  )
    n++;
  if (state.minBlockDepth !== "all") n++;
  if (state.minBlockWidth !== "all") n++;
  if (state.bedrooms !== "all") n++;
  if (state.baths !== "all") n++;
  if (state.garage !== "all") n++;
  return n;
}

// "4+" means 4 or more; a plain number means exactly that count.
function matchesCount(selected: string, actual: number): boolean {
  if (selected === "all") return true;
  if (selected.endsWith("+")) return actual >= Number.parseInt(selected, 10);
  return actual === Number.parseInt(selected, 10);
}

// Garage: "single" = 1 car, "double" = 2+ cars.
function matchesGarage(selected: string, garage: number): boolean {
  if (selected === "all") return true;
  if (selected === "single") return garage === 1;
  if (selected === "double") return garage >= 2;
  return true;
}

// A block option (e.g. "12.5") means "lot dimension is at least this many metres".
function matchesMinBlock(selected: string, actual: number): boolean {
  if (selected === "all") return true;
  return actual >= Number.parseFloat(selected);
}

export function applyDesignFilters(
  designs: DesignProperty[],
  f: DesignFilterState,
): DesignProperty[] {
  return designs.filter(
    (d) =>
      d.squareFootage >= f.houseArea[0] &&
      d.squareFootage <= f.houseArea[1] &&
      matchesMinBlock(f.minBlockDepth, d.depth) &&
      matchesMinBlock(f.minBlockWidth, d.width) &&
      matchesCount(f.bedrooms, d.beds) &&
      matchesCount(f.baths, d.baths) &&
      matchesGarage(f.garage, d.garage),
  );
}
