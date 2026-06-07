import { cn } from "@/lib/utils";

import { properties, type Property, type PropertyView } from "../_data";
import type { DetailVariantId } from "../../display-center-detail/_components/variants";
import { PropertyCard } from "./property-card";
import { PropertyCardV6 } from "./property-card-v6";
import { PropertyCardV7 } from "./property-card-v7";
import { PropertyListItem } from "./property-list-item";

type Props = {
  view?: PropertyView;
  detailEnabled?: boolean;
  detailVariant?: DetailVariantId;
  gridClassName?: string;
  // Optional real data. Defaults to the kit's mock list so existing template pages are unchanged.
  properties?: Property[];
};

const defaultGrid = "lg:grid-cols-3";

export function Variant1Layout({ view, gridClassName = defaultGrid }: Props) {
  return (
    <div
      key={view ?? "facade"}
      className={cn("grid gap-5 sm:grid-cols-2", gridClassName)}
    >
      {properties.map((property, index) => (
        <PropertyCard
          key={property.id}
          property={property}
          view={view}
          index={index}
        />
      ))}
    </div>
  );
}

export function Variant5Layout({ view }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {properties.map((property) => (
        <PropertyListItem key={property.id} property={property} view={view} />
      ))}
    </div>
  );
}

export function Variant6Layout({ view, gridClassName = defaultGrid }: Props) {
  return (
    <div
      key={view ?? "facade"}
      className={cn("grid gap-5 sm:grid-cols-2", gridClassName)}
    >
      {properties.map((property, index) => (
        <PropertyCardV6
          key={property.id}
          property={property}
          view={view}
          index={index}
        />
      ))}
    </div>
  );
}

export function Variant7Layout({
  view,
  detailEnabled,
  detailVariant,
  gridClassName = defaultGrid,
  properties: items = properties,
}: Props) {
  return (
    <div
      key={view ?? "facade"}
      className={cn("grid flex-1 gap-5 sm:grid-cols-2", gridClassName)}
    >
      {items.map((property, index) => (
        <PropertyCardV7
          key={property.id}
          property={property}
          view={view}
          index={index}
          detailEnabled={detailEnabled}
          detailVariant={detailVariant}
        />
      ))}
    </div>
  );
}

export const VARIANT_LAYOUTS = {
  1: Variant1Layout,
  5: Variant5Layout,
  6: Variant6Layout,
  7: Variant7Layout,
} as const;

export type VariantId = keyof typeof VARIANT_LAYOUTS;
