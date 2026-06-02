# CompanyDesignFacadeMaps

Manages the relationships between company designs and facade elements used within those designs.
Allows designs to include multiple facade components for architectural visualization.

**Operations:** 4 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/CompanyDesignFacadeMaps/All` |  (Auth roles: 1.0.0,20.2.0) |
| POST | `/api/CompanyDesignFacadeMaps/Create` |  (Audited)  (Auth roles: 1.0.0,20.1.0) |
| DELETE | `/api/CompanyDesignFacadeMaps/Delete` | Note: permanent delete! (Audited)  (Auth roles: 1.0.0,20.4.0) |
| GET | `/api/CompanyDesignFacadeMaps/Get` |  (Auth roles: 1.0.0,20.2.0) |

## GET `/api/CompanyDesignFacadeMaps/All`

 (Auth roles: 1.0.0,20.2.0)

- **Operation ID:** `CompanyDesignFacadeMaps_All_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyDesignId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignFacadeMapRes`](../schemas.md#companydesignfacademapres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompanyDesignFacadeMaps/Create`

 (Audited)  (Auth roles: 1.0.0,20.1.0)

- **Operation ID:** `CompanyDesignFacadeMaps_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`CompanyDesignFacadeMapReq`](../schemas.md#companydesignfacademapreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignFacadeMapRes`](../schemas.md#companydesignfacademapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/CompanyDesignFacadeMaps/Delete`

Note: permanent delete! (Audited)  (Auth roles: 1.0.0,20.4.0)

- **Operation ID:** `CompanyDesignFacadeMaps_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyDesignId` | string (uuid) | — |  |
| query | `companyFacadeId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/CompanyDesignFacadeMaps/Get`

 (Auth roles: 1.0.0,20.2.0)

- **Operation ID:** `CompanyDesignFacadeMaps_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyDesignId` | string (uuid) | — |  |
| query | `companyFacadeId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignFacadeMapRes`](../schemas.md#companydesignfacademapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
