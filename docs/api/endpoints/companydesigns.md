# CompanyDesigns

Manages company-specific design library items. Companies can create, customize, and organize designs from the system library.
Supports versioning, status management (Available, Archived), and website visibility controls for display center integration.

**Operations:** 11 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| PATCH | `/api/CompanyDesigns/CompanyDesignStatus` | Change the status of a CompanyDesign. (Audited)  (Auth roles: 1.0.0,20.3.0) |
| POST | `/api/CompanyDesigns/Create` | Creates a new company design from scratch, initializing it with provided name, description, and other properties. (Audited)  (Auth roles: 1.0.0,20.1.0) |
| DELETE | `/api/CompanyDesigns/Delete` | Note: Permanently deletes! (Audited)  (Auth roles: 1.0.0,20.4.0) |
| GET | `/api/CompanyDesigns/Get` | Gets a single company design by ID, including all associated data (facades, custom fields, blobs). (Auth roles: 1.0.0,20.2.0) |
| GET | `/api/CompanyDesigns/GetByIdWithAllVersions` | Gets a company design with all its historical versions, allowing users to see the evolution and variations of a design. (Auth roles: 1.0.0,20.2.0) |
| POST | `/api/CompanyDesigns/ImportDesign` | Imports a system provided Api.Data.Models.Core.Design into a Api.Data.Models.Core.CompanyDesign for the Api.Data.Models.Core.Company. This will create a new copy of the Api.Data.Models.Core.Design and its associated Blobs, Api.Data.Models.Core.DesignCustomFields."/> and Facades etc. The blobs will be accounted towards storage limits of the Api.Data.Models.Core.Company. (Audited)  (Auth roles: 1.0.0,20.1.0) |
| POST | `/api/CompanyDesigns/PageDescending` | Gets a paginated list of company designs ordered by most recently updated first. Supports filtering for deleted designs. (Auth roles: 1.0.0,20.2.0) |
| POST | `/api/CompanyDesigns/PageWithAllVersions` | Gets a paginated list including all versions of company designs. Useful for viewing design revision history across all variations. (Auth roles: 1.0.0,20.2.0) |
| DELETE | `/api/CompanyDesigns/SoftDelete` | Note: SoftDeleted Designs still account towards file/blobs storage limits. (Audited)  (Auth roles: 1.0.0,20.4.0) |
| POST | `/api/CompanyDesigns/Update` | Updates an existing company design with new properties. Cannot modify the design status through this endpoint; use CompanyDesignStatus action instead. (Audited)  (Auth roles: 1.0.0,20.3.0) |
| PATCH | `/api/CompanyDesigns/VisibleOnWebsite` |  (Audited)  (Auth roles: 1.0.0,21.3.0) |

## PATCH `/api/CompanyDesigns/CompanyDesignStatus`

Change the status of a CompanyDesign. (Audited)  (Auth roles: 1.0.0,20.3.0)

- **Operation ID:** `CompanyDesigns_CompanyDesignStatus_PATCH`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `CompanyDesignStatus` | [`CompanyDesignStatus`](../schemas.md#companydesignstatus) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignRes`](../schemas.md#companydesignres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompanyDesigns/Create`

Creates a new company design from scratch, initializing it with provided name, description, and other properties. (Audited)  (Auth roles: 1.0.0,20.1.0)

- **Operation ID:** `CompanyDesigns_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`CompanyDesignReq`](../schemas.md#companydesignreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignRes`](../schemas.md#companydesignres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/CompanyDesigns/Delete`

Note: Permanently deletes! (Audited)  (Auth roles: 1.0.0,20.4.0)

- **Operation ID:** `CompanyDesigns_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `forceDelete` | boolean | — | When true, all the related child entities such as blobs, custom fields etc. will also be deleted |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/CompanyDesigns/Get`

Gets a single company design by ID, including all associated data (facades, custom fields, blobs). (Auth roles: 1.0.0,20.2.0)

- **Operation ID:** `CompanyDesigns_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignRes`](../schemas.md#companydesignres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/CompanyDesigns/GetByIdWithAllVersions`

Gets a company design with all its historical versions, allowing users to see the evolution and variations of a design. (Auth roles: 1.0.0,20.2.0)

- **Operation ID:** `CompanyDesigns_GetByIdWithAllVersions_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignRes`](../schemas.md#companydesignres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompanyDesigns/ImportDesign`

Imports a system provided Api.Data.Models.Core.Design into a Api.Data.Models.Core.CompanyDesign for the Api.Data.Models.Core.Company.
This will create a new copy of the Api.Data.Models.Core.Design and its associated Blobs, Api.Data.Models.Core.DesignCustomFields."/> and Facades etc.
The blobs will be accounted towards storage limits of the Api.Data.Models.Core.Company. (Audited)  (Auth roles: 1.0.0,20.1.0)

- **Operation ID:** `CompanyDesigns_ImportDesign_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `designId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignRes`](../schemas.md#companydesignres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompanyDesigns/PageDescending`

Gets a paginated list of company designs ordered by most recently updated first. Supports filtering for deleted designs. (Auth roles: 1.0.0,20.2.0)

- **Operation ID:** `CompanyDesigns_PageDescending_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignResPage`](../schemas.md#companydesignrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompanyDesigns/PageWithAllVersions`

Gets a paginated list including all versions of company designs. Useful for viewing design revision history across all variations. (Auth roles: 1.0.0,20.2.0)

- **Operation ID:** `CompanyDesigns_PageWithAllVersions_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignResPage`](../schemas.md#companydesignrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/CompanyDesigns/SoftDelete`

Note: SoftDeleted Designs still account towards file/blobs storage limits. (Audited)  (Auth roles: 1.0.0,20.4.0)

- **Operation ID:** `CompanyDesigns_SoftDelete_DELETE`
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

## POST `/api/CompanyDesigns/Update`

Updates an existing company design with new properties. Cannot modify the design status through this endpoint; use CompanyDesignStatus action instead. (Audited)  (Auth roles: 1.0.0,20.3.0)

- **Operation ID:** `CompanyDesigns_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`CompanyDesignReq`](../schemas.md#companydesignreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignRes`](../schemas.md#companydesignres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/CompanyDesigns/VisibleOnWebsite`

 (Audited)  (Auth roles: 1.0.0,21.3.0)

- **Operation ID:** `CompanyDesigns_VisibleOnWebsite_PATCH`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `visible` | boolean | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyDesignRes`](../schemas.md#companydesignres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
