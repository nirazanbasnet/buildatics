# CompanyDesignCustomFields

Manages custom fields for company designs, allowing companies to extend design metadata with application-specific attributes.
Custom fields can store additional information relevant to the company's design requirements.

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/CompanyDesignCustomFields/All` |  (Auth roles: 1.0.0,20.2.0) |
| POST | `/api/CompanyDesignCustomFields/Create` |  (Audited)  (Auth roles: 1.0.0,20.1.0) |
| DELETE | `/api/CompanyDesignCustomFields/Delete` | Note: Permanently deletes! (Audited)  (Auth roles: 1.0.0,20.4.0) |
| GET | `/api/CompanyDesignCustomFields/Get` |  (Auth roles: 1.0.0,20.2.0) |
| POST | `/api/CompanyDesignCustomFields/Update` |  (Audited)  (Auth roles: 1.0.0,20.3.0) |

## GET `/api/CompanyDesignCustomFields/All`

 (Auth roles: 1.0.0,20.2.0)

- **Operation ID:** `CompanyDesignCustomFields_All_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyDesignId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignCustomFieldRes`](../schemas.md#companydesigncustomfieldres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompanyDesignCustomFields/Create`

 (Audited)  (Auth roles: 1.0.0,20.1.0)

- **Operation ID:** `CompanyDesignCustomFields_Create_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyDesignId` | string (uuid) | — |  |

**Request body:** [`CompanyDesignCustomFieldReq`](../schemas.md#companydesigncustomfieldreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignCustomFieldRes`](../schemas.md#companydesigncustomfieldres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/CompanyDesignCustomFields/Delete`

Note: Permanently deletes! (Audited)  (Auth roles: 1.0.0,20.4.0)

- **Operation ID:** `CompanyDesignCustomFields_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `companyDesignId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/CompanyDesignCustomFields/Get`

 (Auth roles: 1.0.0,20.2.0)

- **Operation ID:** `CompanyDesignCustomFields_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `companyDesignId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignCustomFieldRes`](../schemas.md#companydesigncustomfieldres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompanyDesignCustomFields/Update`

 (Audited)  (Auth roles: 1.0.0,20.3.0)

- **Operation ID:** `CompanyDesignCustomFields_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `companyDesignId` | string (uuid) | — |  |

**Request body:** [`CompanyDesignCustomFieldReq`](../schemas.md#companydesigncustomfieldreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignCustomFieldRes`](../schemas.md#companydesigncustomfieldres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
