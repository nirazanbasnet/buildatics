# CompaniesA

Provides API for managing the companies for the users with Admin role.

**Operations:** 13 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/CompaniesA/Approve` | Allows to Approve any pending Company whose Owner has confirmed his Email. (Auth roles: Admin) |
| PATCH | `/api/CompaniesA/DequeueAndProcessStorageMessages` | Processes storage messages from the company storage azure queue and updates (increases or decreases) the Api.Data.Models.Core.Company.UsageTotalBlobsSizeInBytes accordingly. This must be called every few minutes to keep the Company storage usage up to date. If the response has failed messages, those messages can be retried again later. Or placed in a dead letter queue (or other persistent storage) for further investigation. (Auth roles: Admin) |
| GET | `/api/CompaniesA/Get` | Gets Company details (Auth roles: Admin) |
| GET | `/api/CompaniesA/GetSubscriptionPlanValidity` | Gets the Utc until which the subscription plan is valid for a given company. This can be used to alert the companies when their subscription will expire and they need to renew. (Auth roles: Admin) |
| PATCH | `/api/CompaniesA/Lock` | Locks the specified Company. (Auth roles: Admin) |
| POST | `/api/CompaniesA/Page` | Returns a paged collection of Companies within the system (Auth roles: Admin) |
| POST | `/api/CompaniesA/RegisterBuilderAppCompany` |  (Auth roles: Admin) |
| GET | `/api/CompaniesA/Reject` | Allows to reject any Company that has not been approved already (Auth roles: Admin) |
| PATCH | `/api/CompaniesA/SetCompanyStorageConsumptionFromBlobModels` | This API is for admin to manually set or refresh the storage consumption for a Company. Always compute the storage consumption for the Company by scanning all blobs using a logic app or function app then call this method. Otherwise, when the usageTotalBlobsSizeInBytes is not specified, this is a heavy operation and cause API/SQL DB to slow down a lot. (Auth roles: Admin) |
| GET | `/api/CompaniesA/Unlock` | Unlocks the specified Company. (Auth roles: Admin) |
| PATCH | `/api/CompaniesA/Update` | Allows to update certain Company fields (Auth roles: Admin) |
| PATCH | `/api/CompaniesA/UpdatePublicDataAccessToken` | Updates the PublicDataAccessToken for the specified Company. This can be used to disable/enable public access to the Company's public data (e.g. designs visible on website). (Auth roles: Admin) |
| GET | `/api/CompaniesA/ValidateSubscriptionPlan` | Checks if a company's subscription plan is valid. Depending on the response, the next action could be to lock the company. (Auth roles: Admin) |

## GET `/api/CompaniesA/Approve`

Allows to Approve any pending Company whose Owner has confirmed his Email. (Auth roles: Admin)

- **Operation ID:** `CompaniesA_Approve_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyARes`](../schemas.md#companyares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/CompaniesA/DequeueAndProcessStorageMessages`

Processes storage messages from the company storage azure queue and updates (increases or decreases) the Api.Data.Models.Core.Company.UsageTotalBlobsSizeInBytes accordingly.
This must be called every few minutes to keep the Company storage usage up to date.
If the response has failed messages, those messages can be retried again later. Or placed in a dead letter queue (or other persistent storage) for further investigation. (Auth roles: Admin)

- **Operation ID:** `CompaniesA_DequeueAndProcessStorageMessages_PATCH`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `maxMessages` | integer (int32) | — | messages to process in one run. e.g. 10 |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ProcessMessageRes`](../schemas.md#processmessageres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/CompaniesA/Get`

Gets Company details (Auth roles: Admin)

- **Operation ID:** `CompaniesA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyARes`](../schemas.md#companyares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/CompaniesA/GetSubscriptionPlanValidity`

Gets the Utc until which the subscription plan is valid for a given company.
This can be used to alert the companies when their subscription will expire and they need to renew. (Auth roles: Admin)

- **Operation ID:** `CompaniesA_GetSubscriptionPlanValidity_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | string (date-time) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/CompaniesA/Lock`

Locks the specified Company. (Auth roles: Admin)

- **Operation ID:** `CompaniesA_Lock_PATCH`
- **Auth:** Bearer token required

**Request body:** [`LockCompanyAReq`](../schemas.md#lockcompanyareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyARes`](../schemas.md#companyares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompaniesA/Page`

Returns a paged collection of Companies within the system (Auth roles: Admin)

- **Operation ID:** `CompaniesA_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyMinAResPage`](../schemas.md#companyminarespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompaniesA/RegisterBuilderAppCompany`

 (Auth roles: Admin)

- **Operation ID:** `CompaniesA_RegisterBuilderAppCompany_POST`
- **Auth:** Bearer token required

**Request body:** [`RegisterCompanyAReq`](../schemas.md#registercompanyareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyARes`](../schemas.md#companyares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/CompaniesA/Reject`

Allows to reject any Company that has not been approved already (Auth roles: Admin)

- **Operation ID:** `CompaniesA_Reject_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyARes`](../schemas.md#companyares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/CompaniesA/SetCompanyStorageConsumptionFromBlobModels`

This API is for admin to manually set or refresh the storage consumption for a Company.
Always compute the storage consumption for the Company by scanning all blobs using a logic app or function app then call this method.
Otherwise, when the usageTotalBlobsSizeInBytes is not specified, this is a heavy operation and cause API/SQL DB to slow down a lot. (Auth roles: Admin)

- **Operation ID:** `CompaniesA_SetCompanyStorageConsumptionFromBlobModels_PATCH`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |
| query | `usageTotalBlobsSizeInBytes` | integer (int64) | — | Currently this is a heavy call when usageTotalBlobsSizeInBytes is not specified. |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyARes`](../schemas.md#companyares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/CompaniesA/Unlock`

Unlocks the specified Company. (Auth roles: Admin)

- **Operation ID:** `CompaniesA_Unlock_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyARes`](../schemas.md#companyares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/CompaniesA/Update`

Allows to update certain Company fields (Auth roles: Admin)

- **Operation ID:** `CompaniesA_Update_PATCH`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |

**Request body:** [`UpdateCompanyAReq`](../schemas.md#updatecompanyareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyARes`](../schemas.md#companyares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/CompaniesA/UpdatePublicDataAccessToken`

Updates the PublicDataAccessToken for the specified Company.
This can be used to disable/enable public access to the Company's public data (e.g. designs visible on website). (Auth roles: Admin)

- **Operation ID:** `CompaniesA_UpdatePublicDataAccessToken_PATCH`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |
| query | `publicDataAccessToken` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyARes`](../schemas.md#companyares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/CompaniesA/ValidateSubscriptionPlan`

Checks if a company's subscription plan is valid.
Depending on the response, the next action could be to lock the company. (Auth roles: Admin)

- **Operation ID:** `CompaniesA_ValidateSubscriptionPlan_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ValidateSubscriptionPlanRes`](../schemas.md#validatesubscriptionplanres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
