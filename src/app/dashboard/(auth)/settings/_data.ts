export type SettingsStatus = "active" | "blocked" | "inactive";

export const settingsStatusConfig: Record<
  SettingsStatus,
  { label: string; trigger: string; dot: string }
> = {
  active: {
    label: "Active",
    trigger: "bg-green-600 text-white hover:bg-green-600/90",
    dot: "bg-green-500"
  },
  blocked: {
    label: "Blocked",
    trigger: "bg-orange-500 text-white hover:bg-orange-500/90",
    dot: "bg-orange-500"
  },
  inactive: {
    label: "Inactive",
    trigger: "bg-red-500 text-white hover:bg-red-500/90",
    dot: "bg-red-500"
  }
};

export const settingsStatusOrder: SettingsStatus[] = ["active", "blocked", "inactive"];

const statusCycle: SettingsStatus[] = ["active", "blocked", "inactive"];

export type Role = {
  id: string;
  name: string;
  permissions: string[];
  status: SettingsStatus;
};

export const roles: Role[] = Array.from({ length: 10 }, (_, i) => ({
  id: `role-${i + 1}`,
  name: "role_name",
  permissions: ["Construction", "Preconstruction", "Display Center"],
  status: statusCycle[i % statusCycle.length]
}));

export type SettingsUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  status: SettingsStatus;
};

const userPermissionSets: string[][] = [
  ["Construction", "Preconstruction", "Display Center", "Projects"],
  ["Construction", "Preconstruction"],
  ["Construction", "Preconstruction"],
  ["Construction", "Preconstruction", "Display Center", "Projects", "Leads"],
  ["Preconstruction", "Display Center"]
];

export const settingsUsers: SettingsUser[] = Array.from({ length: 12 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: "user_name",
  email: "user_email@gmail.com",
  role: "role_name",
  permissions: userPermissionSets[i % userPermissionSets.length],
  status: statusCycle[i % statusCycle.length]
}));

export type DataSetupRow = {
  id: string;
  name: string;
  status: SettingsStatus;
};

export type DataSetupItem = {
  id: string;
  label: string;
  columnLabel: string;
  rows: DataSetupRow[];
};

export type DataSetupGroup = {
  label: string;
  items: DataSetupItem[];
};

function setupRows(prefix: string, statuses: SettingsStatus[]): DataSetupRow[] {
  return statuses.map((status, i) => ({ id: `${prefix}-${i + 1}`, name: "status_name", status }));
}

export const dataSetupGroups: DataSetupGroup[] = [
  {
    label: "Sales",
    items: [
      {
        id: "lead-stages",
        label: "Lead Stages",
        columnLabel: "Lead Stage",
        rows: setupRows("lead-stage", ["active", "active", "inactive", "active"])
      },
      {
        id: "lead-status",
        label: "Lead Status",
        columnLabel: "Lead Status",
        rows: setupRows("lead-status", ["active", "active", "inactive", "inactive"])
      }
    ]
  },
  {
    label: "Display Center",
    items: [
      {
        id: "design-stages",
        label: "Design Stages",
        columnLabel: "Design Stage",
        rows: setupRows("design-stage", ["active", "inactive", "active"])
      },
      {
        id: "design-status",
        label: "Design Status",
        columnLabel: "Design Status",
        rows: setupRows("design-status", ["active", "active", "inactive"])
      }
    ]
  },
  {
    label: "Projects",
    items: [
      {
        id: "project-status",
        label: "Project Status",
        columnLabel: "Project Status",
        rows: setupRows("project-status", ["active", "inactive", "active", "inactive"])
      }
    ]
  }
];

export type SubscriptionPlan = {
  id: string;
  name: string;
  badge: string;
  badgeTone: "current" | "popular" | "premium";
  price: string;
  cadence: string;
  note: string;
  features: string[];
  validTill?: string;
  cta: "cancel" | "upgrade";
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "Starter Plan",
    badge: "Current Plan",
    badgeTone: "current",
    price: "$499.00",
    cadence: "/month",
    note: "Incl. GST billed monthly",
    features: ["Up to 15 GB Storage"],
    validTill: "20 August 2026",
    cta: "cancel"
  },
  {
    id: "pro",
    name: "Pro Plan",
    badge: "Most Popular",
    badgeTone: "popular",
    price: "$499.00",
    cadence: "/month",
    note: "Incl. GST billed monthly",
    features: ["Up to 15 GB Storage"],
    cta: "upgrade"
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    badge: "Premium Plan",
    badgeTone: "premium",
    price: "$499.00",
    cadence: "/month",
    note: "Incl. GST billed monthly",
    features: ["Up to 15 GB Storage"],
    cta: "upgrade"
  }
];
