// Request/response DTOs mirroring the Buildatics Platform API schemas.
// Source of truth: docs/api/schemas.md (ResourceOwnerToken*). Keep in sync; no `any`.

export type ResourceOwnerTokenReq = {
  userName: string;
  password: string;
  /** Specify true to generate a Refresh Token. */
  rememberMe?: boolean;
  /** Public URL of the accepted Terms and Conditions; null until the user accepts new terms. */
  termsAndConditionsUrl?: string | null;
  /** Email OTP code, used when the account has email-based 2FA enabled. */
  emailOtpCode?: string | null;
};

export type ResourceOwnerTokenUserRes = {
  id?: string;
  email?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  termsAndConditionsAcceptedOnUtc?: string | null;
  termsAndConditionsUrl?: string | null;
};

export type TokenCompanyRes = {
  id?: string;
  name?: string;
  logoBlobUrl?: string;
  currentSubscriptionPlanId?: string;
};

export type ResourceOwnerTokenRes = {
  accessToken?: string;
  tokenType?: string;
  expiresIn?: number;
  refreshToken?: string;
  userName?: string;
  user?: ResourceOwnerTokenUserRes;
  company?: TokenCompanyRes;
  requiresTwoFactor?: boolean;
  twoFactorMethod?: string;
  twoFactorDestinationMasked?: string;
  message?: string;
};

export type ResourceOwnerRefreshTokenReq = {
  accessToken: string;
  refreshToken: string;
};
