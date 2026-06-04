// DTOs for the current-user profile APIs, mirroring docs/api/schemas.md. Only fields we use are typed. No `any`.

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

// docs/api/schemas.md#userprofilereq
export type UserProfileReq = {
  firstName: string; // required
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  emailOtp2FAEnabled?: boolean;
  address?: AddressReq;
};

// docs/api/schemas.md#userprofileres
export type UserProfileRes = {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  emailOtp2FAEnabled?: boolean;
  roles?: string[];
  address?: AddressRes | null;
  termsAndConditionsAcceptedOnUtc?: string | null;
  termsAndConditionsUrl?: string | null;
  uiThemeJson?: string | null;
};

// docs/api/schemas.md#changepasswordreq
export type ChangePasswordReq = {
  oldPassword: string;
  newPassword: string;
};

// docs/api/schemas.md#messageresponsedto
export type MessageResponseDto = {
  message?: string;
};
