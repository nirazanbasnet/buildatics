// DTOs for the Settings module, mirroring docs/api/schemas.md. Only fields the UI uses. No `any`.

// --- Roles (Designations + ModuleAppRoles) ---
export type ModuleAppRoleRes = {
  id?: string;
  moduleType?: string;
  modulePermissionType?: string;
  modulePermissionModifier?: string;
  isAvailable?: boolean;
};

export type DesignationToModuleAppRoleMapRes = {
  designation?: DesignationRes;
  moduleAppRole?: ModuleAppRoleRes;
};

export type DesignationRes = {
  id?: string;
  name?: string;
  description?: string | null;
  designationToModuleAppRoleMaps?: DesignationToModuleAppRoleMapRes[];
};

export type DesignationReq = {
  name?: string;
  description?: string;
};

export type DesignationResPage = {
  items?: DesignationRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};

export type ModuleAppRoleResPage = {
  items?: ModuleAppRoleRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};

// --- Staff (User Permissions) ---
export type AppModuleRoleWrapper = {
  moduleType?: string;
  modulePermissionType?: string;
  modulePermissionModifier?: string;
};

export type DesignationToAppUserMapRes = {
  designation?: DesignationRes;
};

export type StaffRes = {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  emailConfirmed?: boolean;
  roles?: string[];
  moduleRoles?: AppModuleRoleWrapper[];
  designationToAppUserMaps?: DesignationToAppUserMapRes[];
  deletedOnUtc?: string | null;
};

export type StaffReq = {
  firstName: string;
  lastName?: string;
  middleName?: string;
  phoneNumber?: string;
  email: string;
};

// --- Lead stages (Data Setup) ---
export type LeadStageRes = {
  id?: string;
  name?: string;
  colour?: string | null;
  sortOrder?: number;
};

export type LeadStageReq = {
  name: string;
  colour?: string;
  sortOrder?: number;
};

// --- Static enums ---
export type EnumRes = { id?: string; value?: string };
export type AllEnumsRes = {
  leadStatuses?: EnumRes[];
  designStatuses?: EnumRes[];
};

// --- Subscription ---
export type SubscriptionPlanRes = {
  id?: string;
  name?: string;
  description?: string | null;
  maxUsers?: number;
  maxBrochures?: number;
  maxBlobStorageInBytes?: number;
  price?: number;
  billingPeriodDays?: number;
};
