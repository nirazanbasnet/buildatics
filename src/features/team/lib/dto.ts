// DTOs for the Team (Staff) + Roles (Designations) APIs, mirroring docs/api/schemas.md. No `any`.

// docs/api/schemas.md#addressreq / #addressres
export type AddressReq = {
  street?: string;
  areaCode: string; // required by the API when an address is supplied
  suburb?: string;
  city?: string;
  state?: number;
};

export type AddressRes = {
  id?: string;
  street?: string;
  areaCode?: string;
  suburb?: string;
  city?: string;
  state?: number | null;
};

// docs/api/schemas.md#userres
export type UserRes = {
  id?: string;
  email?: string;
  emailConfirmed?: boolean;
  phoneNumber?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
};

// docs/api/schemas.md#appmodulerolewrapper
export type AppModuleRoleWrapper = {
  moduleType?: string;
  modulePermissionType?: string;
  modulePermissionModifier?: string;
};

// docs/api/schemas.md#designationres — the company's named roles (Supervisor, Tradie, PM, …).
export type DesignationRes = {
  id?: string;
  name?: string;
  description?: string | null;
  deletedOnUtc?: string | null;
};

// docs/api/schemas.md#designationrespage
export type DesignationResPage = {
  items?: DesignationRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};

// docs/api/schemas.md#designationtoappusermapres — a staff member's designation-based role assignment.
export type DesignationToAppUserMapRes = {
  designation?: DesignationRes;
  appUser?: UserRes;
};

// docs/api/schemas.md#staffres
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
  address?: AddressRes | null;
};

// docs/api/schemas.md#staffreq
export type StaffReq = {
  firstName: string; // required
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  email: string; // required
  address?: AddressReq;
};

// docs/api/schemas.md#invitestaffres
export type InviteStaffRes = {
  message?: string;
  staffUser?: StaffRes;
};
