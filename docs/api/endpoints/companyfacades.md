# CompanyFacades

Manages company facade library items used in building design visualization.
Facades are reusable architectural design elements that can be attached to designs and managed at the company level.
Supports versioning, status management, and blob (image) attachments.

**Operations:** 6 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/CompanyFacades/Create` | Creates a new company facade in the library with basic information. (Audited)  (Auth roles: 1.0.0,20.1.0) |
| DELETE | `/api/CompanyFacades/Delete` | Note: Permanently deletes! (Audited)  (Auth roles: 1.0.0,20.4.0) |
| GET | `/api/CompanyFacades/Get` | Gets a single company facade by ID with all associated blobs and related data. (Auth roles: 1.0.0,20.2.0) |
| POST | `/api/CompanyFacades/PageDescending` | Gets a paginated list of company facades ordered by most recently updated first. (Auth roles: 1.0.0,20.2.0) |
| DELETE | `/api/CompanyFacades/SoftDelete` |  (Audited)  (Auth roles: 1.0.0,20.4.0) |
| POST | `/api/CompanyFacades/Update` | Updates an existing company facade with new information. (Audited)  (Auth roles: 1.0.0,20.3.0) |

## POST `/api/CompanyFacades/Create`

Creates a new company facade in the library with basic information. (Audited)  (Auth roles: 1.0.0,20.1.0)

- **Operation ID:** `CompanyFacades_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`CompanyFacadeReq`](../schemas.md#companyfacadereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyFacadeRes`](../schemas.md#companyfacaderes) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/CompanyFacades/Delete`

Note: Permanently deletes! (Audited)  (Auth roles: 1.0.0,20.4.0)

- **Operation ID:** `CompanyFacades_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `forceDelete` | boolean | — | When true, all the related child entities such as blobs etc. will also be deleted |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/CompanyFacades/Get`

Gets a single company facade by ID with all associated blobs and related data. (Auth roles: 1.0.0,20.2.0)

- **Operation ID:** `CompanyFacades_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyFacadeRes`](../schemas.md#companyfacaderes) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompanyFacades/PageDescending`

Gets a paginated list of company facades ordered by most recently updated first. (Auth roles: 1.0.0,20.2.0)

- **Operation ID:** `CompanyFacades_PageDescending_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyFacadeResPage`](../schemas.md#companyfacaderespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/CompanyFacades/SoftDelete`

 (Audited)  (Auth roles: 1.0.0,20.4.0)

- **Operation ID:** `CompanyFacades_SoftDelete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompanyFacades/Update`

Updates an existing company facade with new information. (Audited)  (Auth roles: 1.0.0,20.3.0)

- **Operation ID:** `CompanyFacades_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`CompanyFacadeReq`](../schemas.md#companyfacadereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyFacadeRes`](../schemas.md#companyfacaderes) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
