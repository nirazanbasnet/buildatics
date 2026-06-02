# DesignsA

Provides admin APIs for managing system-wide design templates.
Admin and design admins can create, update, and manage design templates that are available for company import.
Includes design versioning, status management (Active, Deprecated), and design customization features.

**Operations:** 9 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/DesignsA/Create` |  (Auth roles: Admin,DesignAdmin) |
| DELETE | `/api/DesignsA/Delete` | Note: Permanent delete! (Auth roles: Admin,DesignAdmin) |
| PATCH | `/api/DesignsA/DesignStatus` | Change the status of a Design. (Auth roles: Admin,DesignAdmin) |
| GET | `/api/DesignsA/Get` |  (Auth roles: Admin,DesignAdmin) |
| GET | `/api/DesignsA/GetByIdWithAllVersions` |  (Auth roles: Admin,DesignAdmin) |
| POST | `/api/DesignsA/PageDescending` |  (Auth roles: Admin,DesignAdmin) |
| POST | `/api/DesignsA/PageWithAllVersions` |  (Auth roles: Admin,DesignAdmin) |
| DELETE | `/api/DesignsA/SoftDelete` |  (Auth roles: Admin,DesignAdmin) |
| POST | `/api/DesignsA/Update` |  (Auth roles: Admin,DesignAdmin) |

## POST `/api/DesignsA/Create`

 (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignsA_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`DesignAReq`](../schemas.md#designareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignRes`](../schemas.md#designres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/DesignsA/Delete`

Note: Permanent delete! (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignsA_Delete_DELETE`
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

## PATCH `/api/DesignsA/DesignStatus`

Change the status of a Design. (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignsA_DesignStatus_PATCH`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `designStatus` | [`DesignStatus`](../schemas.md#designstatus) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignRes`](../schemas.md#designres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/DesignsA/Get`

 (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignsA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignRes`](../schemas.md#designres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/DesignsA/GetByIdWithAllVersions`

 (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignsA_GetByIdWithAllVersions_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignRes`](../schemas.md#designres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/DesignsA/PageDescending`

 (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignsA_PageDescending_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignResPage`](../schemas.md#designrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/DesignsA/PageWithAllVersions`

 (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignsA_PageWithAllVersions_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignResPage`](../schemas.md#designrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/DesignsA/SoftDelete`

 (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignsA_SoftDelete_DELETE`
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

## POST `/api/DesignsA/Update`

 (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignsA_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Request body:** [`DesignAReq`](../schemas.md#designareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignRes`](../schemas.md#designres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
