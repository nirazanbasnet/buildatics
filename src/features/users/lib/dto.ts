// DTOs for the admin Users APIs (UsersA), mirroring docs/api/schemas.md. Only fields we use are typed. No `any`.

// docs/api/schemas.md#designationtoappusermapres — only the shape we read (roles come via the flat `roles[]`).
export type DesignationToAppUserMapRes = {
  id?: string;
};

// docs/api/schemas.md#userdetailedres
export type UserDetailedRes = {
  id?: string;
  userName?: string;
  email?: string;
  emailConfirmed?: boolean;
  emailOtp2FAEnabled?: boolean;
  phoneNumber?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  roles?: string[];
  deletedOnUtc?: string | null;
  lockoutEnd?: string | null;
  lockoutEnabled?: boolean;
  accessFailedCount?: number;
  termsAndConditionsAcceptedOnUtc?: string | null;
  termsAndConditionsUrl?: string | null;
  designationToAppUserMaps?: DesignationToAppUserMapRes[];
};

// docs/api/schemas.md#userdetailedrespage
export type UserDetailedResPage = {
  items?: UserDetailedRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};

// docs/api/schemas.md#pagedreq
export type PagedReq = {
  pageNumber: number;
  pageSize: number;
};

// docs/api/schemas.md#registeruserreq
export type RegisterUserReq = {
  email: string;
  password: string;
};

// docs/api/schemas.md#changeemailreq
export type ChangeEmailReq = {
  userId?: string;
  email: string;
};

// docs/api/schemas.md#updateuseremailotp2fareq
export type UpdateUserEmailOtp2FAReq = {
  userId?: string;
  emailOtp2FAEnabled?: boolean;
};

// docs/api/schemas.md#forgotpasswordreq / #forgotpasswordres
export type ForgotPasswordReq = {
  email: string;
};

export type ForgotPasswordRes = {
  resetPasswordUrl?: string;
};

// docs/api/schemas.md#messageresponsedto
export type MessageResponseDto = {
  message?: string;
};
