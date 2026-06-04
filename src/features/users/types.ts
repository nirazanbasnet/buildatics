export const USERS_PAGE_SIZE = 10;

// Row shape consumed by the admin users table (flattened from UserDetailedRes).
export type UserRow = {
  id: string;
  name: string;
  email: string;
  emailConfirmed: boolean;
  twoFactorEnabled: boolean;
  roles: string[];
  isDeleted: boolean;
  isLocked: boolean;
  termsAccepted: boolean;
};

export type UsersResult = {
  items: UserRow[];
  total: number;
  pageNumber: number;
  pageSize: number;
};

// The two user kinds an Admin can create via UsersA. Maps to CreateAdmin / CreateDesignAdmin.
export type CreatableRole = "Admin" | "DesignAdmin";

// Shared result of the user-management server actions.
export type UserActionResult = {
  ok: boolean;
  message?: string;
  error?: string;
};

export type CreateUserResult = UserActionResult & {
  fieldErrors?: Partial<Record<"email" | "password", string>>;
};

export type ForgotPasswordLinkResult = UserActionResult & {
  resetPasswordUrl?: string;
};
