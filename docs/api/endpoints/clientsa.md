# ClientsA

Provides API for managing the Clients for the users with Admin role. 
Supports both Bearer Token and ApiKey Authorization

**Operations:** 9 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/ClientsA/AddRole` |  (Auth roles: Admin) |
| GET | `/api/ClientsA/AllRoles` |  (Auth roles: Admin) |
| POST | `/api/ClientsA/Create` |  (Auth roles: Admin) |
| DELETE | `/api/ClientsA/Delete` |  (Auth roles: Admin) |
| DELETE | `/api/ClientsA/DeleteRole` |  (Auth roles: Admin) |
| GET | `/api/ClientsA/Get` |  (Auth roles: Admin) |
| POST | `/api/ClientsA/Page` | Returns a paged collection of Clients within the system (Auth roles: Admin) |
| POST | `/api/ClientsA/RegenerateSecret` |  (Auth roles: Admin) |
| POST | `/api/ClientsA/Update` |  (Auth roles: Admin) |

## POST `/api/ClientsA/AddRole`

 (Auth roles: Admin)

- **Operation ID:** `ClientsA_AddRole_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `clientId` | string | — |  |
| query | `roleId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ClientResA`](../schemas.md#clientresa) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/ClientsA/AllRoles`

 (Auth roles: Admin)

- **Operation ID:** `ClientsA_AllRoles_GET`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`AppRoleRes`](../schemas.md#approleres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/ClientsA/Create`

 (Auth roles: Admin)

- **Operation ID:** `ClientsA_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`ClientReqA`](../schemas.md#clientreqa)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ClientResA`](../schemas.md#clientresa) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/ClientsA/Delete`

 (Auth roles: Admin)

- **Operation ID:** `ClientsA_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `clientId` | string | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/ClientsA/DeleteRole`

 (Auth roles: Admin)

- **Operation ID:** `ClientsA_DeleteRole_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `clientId` | string | — |  |
| query | `roleId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/ClientsA/Get`

 (Auth roles: Admin)

- **Operation ID:** `ClientsA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `clientId` | string | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ClientResA`](../schemas.md#clientresa) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/ClientsA/Page`

Returns a paged collection of Clients within the system (Auth roles: Admin)

- **Operation ID:** `ClientsA_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ClientResAPage`](../schemas.md#clientresapage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/ClientsA/RegenerateSecret`

 (Auth roles: Admin)

- **Operation ID:** `ClientsA_RegenerateSecret_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `clientId` | string | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ClientResA`](../schemas.md#clientresa) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/ClientsA/Update`

 (Auth roles: Admin)

- **Operation ID:** `ClientsA_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `clientId` | string | — |  |

**Request body:** [`ClientReqA`](../schemas.md#clientreqa)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ClientResA`](../schemas.md#clientresa) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
