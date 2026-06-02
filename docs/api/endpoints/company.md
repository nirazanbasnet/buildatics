# Company

Provides company-scoped APIs for viewing and maintaining the current tenant's company profile and branding data.
These endpoints expose the core organization record used throughout the platform.

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/Company/Get` | Gets Company details (Auth roles: 1.0.0) |
| GET | `/api/Company/GetCompanyDesignsIFrame` |  (Auth roles: 1.0.0,21.2.0) |
| PATCH | `/api/Company/RegenerateCompanyDesignsIFrame` | Creates/replaces the PublicDataAccessToken for the Company and returns the iframe HTML code to embed on external/public websites (Audited)  (Auth roles: 1.0.0,21.3.0) |
| POST | `/api/Company/Update` | Allows Owner to update his Company details (Audited)  (Auth roles: 1.0.0) |
| PATCH | `/api/Company/UpdatePublicCompanyDesignStyle` | Updates just the PublicCompanyDesignStyle field of the Company (Audited)  (Auth roles: 1.0.0,21.3.0) |

## GET `/api/Company/Get`

Gets Company details (Auth roles: 1.0.0)

- **Operation ID:** `Company_Get_GET`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyRes`](../schemas.md#companyres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/Company/GetCompanyDesignsIFrame`

 (Auth roles: 1.0.0,21.2.0)

- **Operation ID:** `Company_GetCompanyDesignsIFrame_GET`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignsIFrameRes`](../schemas.md#companydesignsiframeres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/Company/RegenerateCompanyDesignsIFrame`

Creates/replaces the PublicDataAccessToken for the Company and returns the iframe HTML code to embed on external/public websites (Audited)  (Auth roles: 1.0.0,21.3.0)

- **Operation ID:** `Company_RegenerateCompanyDesignsIFrame_PATCH`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignsIFrameRes`](../schemas.md#companydesignsiframeres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Company/Update`

Allows Owner to update his Company details (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `Company_Update_POST`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyRes`](../schemas.md#companyres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/Company/UpdatePublicCompanyDesignStyle`

Updates just the PublicCompanyDesignStyle field of the Company (Audited)  (Auth roles: 1.0.0,21.3.0)

- **Operation ID:** `Company_UpdatePublicCompanyDesignStyle_PATCH`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `publicCompanyDesignStyle` | string | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyRes`](../schemas.md#companyres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
