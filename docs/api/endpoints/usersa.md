# UsersA

Provides API for managing the user accounts for the users with Admin role.

**Operations:** 10 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| PATCH | `/api/UsersA/ChangeEmail` | Changes the user's email id. (Auth roles: Admin) |
| POST | `/api/UsersA/ConfirmEmail` | Confirms user's email (Auth roles: Admin) |
| POST | `/api/UsersA/CreateAdmin` | Allows existing Admin to create a new Admin User.  Existing Admin needs to manually confirm the email id after adding the new Admin user. Use this with caution since Admin has access to entire system (Auth roles: Admin) |
| POST | `/api/UsersA/CreateDesignAdmin` | Allows existing Admin to create a new DesignAdmin User.  Existing Admin needs to manually confirm the email id after adding the new DesignAdmin user. DesignAdmin has access to Design relaed APIs (Auth roles: Admin) |
| PATCH | `/api/UsersA/ForceAcceptTermsAndConditions` | Accept the terms and conditions on behalf of the user with the specified email. (Auth roles: Admin) |
| POST | `/api/UsersA/GetForgotPasswordLink` | Use this to get a link to rset password for a user who is unable to receive emails. (Auth roles: Admin) |
| POST | `/api/UsersA/Page` |  (Auth roles: Admin) |
| PATCH | `/api/UsersA/ResetTermsAndConditionsAcceptance` | Resets Terms and Conditions acceptance for the specified users, thus forcing them to accept again on next login. (Auth roles: Admin) |
| DELETE | `/api/UsersA/SoftDelete` | Soft deletes a user by setting DeletedOnUtc and anonymizing the email by inserting _GUID before '@'. (Auth roles: Admin) |
| PATCH | `/api/UsersA/UpdateEmailOtpTwoFactor` | Enables or disables email OTP two-factor authentication for the specified user. (Auth roles: Admin) |

## PATCH `/api/UsersA/ChangeEmail`

Changes the user's email id. (Auth roles: Admin)

- **Operation ID:** `UsersA_ChangeEmail_PATCH`
- **Auth:** Bearer token required

**Request body:** [`ChangeEmailReq`](../schemas.md#changeemailreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`UserRes`](../schemas.md#userres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/UsersA/ConfirmEmail`

Confirms user's email (Auth roles: Admin)

- **Operation ID:** `UsersA_ConfirmEmail_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `email` | string | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`MessageResponseDto`](../schemas.md#messageresponsedto) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/UsersA/CreateAdmin`

Allows existing Admin to create a new Admin User. 
Existing Admin needs to manually confirm the email id after adding the new Admin user.
Use this with caution since Admin has access to entire system (Auth roles: Admin)

- **Operation ID:** `UsersA_CreateAdmin_POST`
- **Auth:** Bearer token required

**Request body:** [`RegisterUserReq`](../schemas.md#registeruserreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`MessageResponseDto`](../schemas.md#messageresponsedto) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/UsersA/CreateDesignAdmin`

Allows existing Admin to create a new DesignAdmin User. 
Existing Admin needs to manually confirm the email id after adding the new DesignAdmin user.
DesignAdmin has access to Design relaed APIs (Auth roles: Admin)

- **Operation ID:** `UsersA_CreateDesignAdmin_POST`
- **Auth:** Bearer token required

**Request body:** [`RegisterUserReq`](../schemas.md#registeruserreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`MessageResponseDto`](../schemas.md#messageresponsedto) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/UsersA/ForceAcceptTermsAndConditions`

Accept the terms and conditions on behalf of the user with the specified email. (Auth roles: Admin)

- **Operation ID:** `UsersA_ForceAcceptTermsAndConditions_PATCH`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `email` | string | — |  |
| query | `termsAndConditionsUrl` | string | — | Public URL of the terms and conditions document/page |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`MessageResponseDto`](../schemas.md#messageresponsedto) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/UsersA/GetForgotPasswordLink`

Use this to get a link to rset password for a user who is unable to receive emails. (Auth roles: Admin)

- **Operation ID:** `UsersA_GetForgotPasswordLink_POST`
- **Auth:** Bearer token required

**Request body:** [`ForgotPasswordReq`](../schemas.md#forgotpasswordreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ForgotPasswordRes`](../schemas.md#forgotpasswordres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/UsersA/Page`

 (Auth roles: Admin)

- **Operation ID:** `UsersA_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`UserDetailedResPage`](../schemas.md#userdetailedrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/UsersA/ResetTermsAndConditionsAcceptance`

Resets Terms and Conditions acceptance for the specified users, thus forcing them to accept again on next login. (Auth roles: Admin)

- **Operation ID:** `UsersA_ResetTermsAndConditionsAcceptance_PATCH`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`MessageResponseDto`](../schemas.md#messageresponsedto) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/UsersA/SoftDelete`

Soft deletes a user by setting DeletedOnUtc and anonymizing the email by inserting _GUID before '@'. (Auth roles: Admin)

- **Operation ID:** `UsersA_SoftDelete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `userId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`MessageResponseDto`](../schemas.md#messageresponsedto) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/UsersA/UpdateEmailOtpTwoFactor`

Enables or disables email OTP two-factor authentication for the specified user. (Auth roles: Admin)

- **Operation ID:** `UsersA_UpdateEmailOtpTwoFactor_PATCH`
- **Auth:** Bearer token required

**Request body:** [`UpdateUserEmailOtp2FAReq`](../schemas.md#updateuseremailotp2fareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`UserDetailedRes`](../schemas.md#userdetailedres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
