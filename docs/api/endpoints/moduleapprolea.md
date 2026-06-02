# ModuleAppRoleA

Allows Admin to manage the ModuleAppRole entities, which represent the permissions for different modules in the application.
Companies can use them to map  designations to these ModuleAppRoles to grant permissions to users with those designations.

**Operations:** 6 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/ModuleAppRoleA/Create` |  (Auth roles: Admin) |
| DELETE | `/api/ModuleAppRoleA/Delete` |  (Auth roles: Admin) |
| GET | `/api/ModuleAppRoleA/Get` |  (Auth roles: Admin) |
| POST | `/api/ModuleAppRoleA/Page` |  (Auth roles: Admin) |
| DELETE | `/api/ModuleAppRoleA/SoftDelete` |  (Auth roles: Admin) |
| POST | `/api/ModuleAppRoleA/Update` |  (Auth roles: Admin) |

## POST `/api/ModuleAppRoleA/Create`

 (Auth roles: Admin)

- **Operation ID:** `ModuleAppRoleA_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`ModuleAppRoleReq`](../schemas.md#moduleapprolereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ModuleAppRoleRes`](../schemas.md#moduleapproleres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/ModuleAppRoleA/Delete`

 (Auth roles: Admin)

- **Operation ID:** `ModuleAppRoleA_Delete_DELETE`
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

## GET `/api/ModuleAppRoleA/Get`

 (Auth roles: Admin)

- **Operation ID:** `ModuleAppRoleA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ModuleAppRoleRes`](../schemas.md#moduleapproleres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/ModuleAppRoleA/Page`

 (Auth roles: Admin)

- **Operation ID:** `ModuleAppRoleA_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ModuleAppRoleResPage`](../schemas.md#moduleapprolerespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/ModuleAppRoleA/SoftDelete`

 (Auth roles: Admin)

- **Operation ID:** `ModuleAppRoleA_SoftDelete_DELETE`
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

## POST `/api/ModuleAppRoleA/Update`

 (Auth roles: Admin)

- **Operation ID:** `ModuleAppRoleA_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Request body:** [`ModuleAppRoleReq`](../schemas.md#moduleapprolereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ModuleAppRoleRes`](../schemas.md#moduleapproleres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
