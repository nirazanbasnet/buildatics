import { Eye, History, LayoutTemplate, type LucideIcon } from "lucide-react";

export type BrochureDetailStatus = "draft" | "sent";

export const brochureDetailStatusConfig: Record<
  BrochureDetailStatus,
  { label: string; trigger: string; dot: string }
> = {
  draft: {
    label: "Draft",
    trigger: "bg-blue-600 text-white hover:bg-blue-600/90",
    dot: "bg-blue-500"
  },
  sent: {
    label: "Sent",
    trigger: "bg-green-600 text-white hover:bg-green-600/90",
    dot: "bg-green-500"
  }
};

export const brochureDetailStatusOrder: BrochureDetailStatus[] = ["draft", "sent"];

export const brochureDetailTabs = ["Brochure Builder", "Preview", "History"] as const;
export type BrochureDetailTab = (typeof brochureDetailTabs)[number];

const brochureDetailTabIcons: Record<BrochureDetailTab, LucideIcon> = {
  "Brochure Builder": LayoutTemplate,
  Preview: Eye,
  History: History
};

export const brochureDetailTabItems = brochureDetailTabs.map((value) => ({
  value,
  icon: brochureDetailTabIcons[value]
}));

export type BrochureOwner = {
  id: string;
  name: string;
  address: string;
  email: string;
  contact: string;
};

export type BrochurePropertyInfo = {
  landWidth: string;
  landDepth: string;
  landArea: string;
  driveway: "left" | "right";
};

export type BrochureAttachedDesign = {
  id: string;
  image: string;
  alt: string;
};

export type BrochureHistoryEntry = {
  id: string;
  message: string;
  by: string;
  time: string;
};

export type BrochureDetail = {
  id: string;
  ref: string;
  siteAddress: string;
  template: string;
  status: BrochureDetailStatus;
  dateCreated: string;
  owners: BrochureOwner[];
  property: BrochurePropertyInfo;
  attachedDesigns: BrochureAttachedDesign[];
  history: BrochureHistoryEntry[];
};

export const brochureTemplateOptions = [
  { value: "modern", label: "Modern" },
  { value: "classic", label: "Classic" },
  { value: "minimal", label: "Minimal" }
];

export const brochureDesignOptions = [
  { value: "double-storey", label: "Double Storey" },
  { value: "single-storey", label: "Single Storey" },
  { value: "duplex", label: "Duplex" }
];

const facade = (file: string) => `/images/display-center/facade/${file}`;
const plan = (file: string) => `/images/display-center/plans/${file}`;

export const brochureDetailMock: BrochureDetail = {
  id: "br-001",
  ref: "#BR10000",
  siteAddress: "lotNo, streetNo streetName, suburb postCode",
  template: "",
  status: "sent",
  dateCreated: "25 April 2026",
  owners: [
    {
      id: "owner-1",
      name: "owner_name",
      address: "lotNo, streetNo streetName, suburb postCode",
      email: "placeholder@gmail.com",
      contact: "+61 5626262626"
    }
  ],
  property: {
    landWidth: "500",
    landDepth: "500",
    landArea: "500",
    driveway: "left"
  },
  attachedDesigns: [
    {
      id: "design-plan",
      image: plan("PLAN_DP01_12.5M BY 28M_RIGHT_VN01.png"),
      alt: "Floor plan"
    },
    {
      id: "design-facade",
      image: facade("RENDER_DF01_12.5M_RIGHT_VN01.jpg"),
      alt: "Facade render"
    }
  ],
  history: Array.from({ length: 9 }, (_, i) => ({
    id: `history-${i + 1}`,
    message: "Uh oh! Something went wrong.",
    by: "Staff_name",
    time: "1 hour ago"
  }))
};
