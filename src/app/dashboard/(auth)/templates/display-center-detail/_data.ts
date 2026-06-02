import { Building2, FileText, Layers, ListChecks, type LucideIcon } from "lucide-react";

export type SpecRow = { label: string; value: string };
export type RoomDimension = { name: string; size: string };
export type FacadeOption = { id: string; label: string; image: string };

export const detailTabs = ["Details", "Facades", "Documents", "Tasks"] as const;
export type DetailTab = (typeof detailTabs)[number];

const detailTabIcons: Record<DetailTab, LucideIcon> = {
  Details: Layers,
  Facades: Building2,
  Documents: FileText,
  Tasks: ListChecks
};

export const detailTabItems = detailTabs.map((value) => ({ value, icon: detailTabIcons[value] }));

export const detailDescription =
  "Rear master retreat, open living, and alfresco for seamless outdoor flow.";

export const detailSpecs: SpecRow[] = [
  { label: "Min. Block Width", value: "12.5 m" },
  { label: "Min. Block Depth", value: "30 m" },
  { label: "House Area", value: "25 sq (232 m²)" }
];

export const detailRooms: RoomDimension[] = [
  { name: "Living Room", size: "3000 X 3000" },
  { name: "Living Room", size: "3000 X 3000" },
  { name: "Living Room", size: "3000 X 3000" },
  { name: "Living Room", size: "3000 X 3000" },
  { name: "Living Room", size: "3000 X 3000" }
];

export const availableFacades: FacadeOption[] = [
  {
    id: "facade-1",
    label: "Coastal",
    image: "/images/display-center/facade/RENDER_DF01_12.5M_RIGHT_VN01.jpg"
  },
  {
    id: "facade-2",
    label: "Hampton",
    image: "/images/display-center/facade/RENDER_DF02_12.5M_RIGHT_VN01.jpg"
  },
  {
    id: "facade-3",
    label: "Modern",
    image: "/images/display-center/facade/RENDER_DF04_12.5M_RIGHT_VN01.jpg"
  }
];
