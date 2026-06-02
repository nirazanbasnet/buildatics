# ContactTypesA

Provides system-wide admin APIs for managing contact type classifications across all companies.
Admin users can create, update, and delete contact types that are available for use by companies.
Contact types are system-scoped and can be reused across multiple companies.

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/ContactTypesA/All` |  (Auth roles: Admin) |
| POST | `/api/ContactTypesA/Create` |  (Auth roles: Admin) |
| DELETE | `/api/ContactTypesA/Delete` | Note: Permanently deletes! (Auth roles: Admin) |
| GET | `/api/ContactTypesA/Get` |  (Auth roles: Admin) |
| POST | `/api/ContactTypesA/Update` |  (Auth roles: Admin) |

## POST `/api/ContactTypesA/All`

 (Auth roles: Admin)

- **Operation ID:** `ContactTypesA_All_POST`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ContactTypeRes`](../schemas.md#contacttyperes)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/ContactTypesA/Create`

 (Auth roles: Admin)

- **Operation ID:** `ContactTypesA_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`ContactTypeReq`](../schemas.md#contacttypereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ContactTypeRes`](../schemas.md#contacttyperes) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/ContactTypesA/Delete`

Note: Permanently deletes! (Auth roles: Admin)

- **Operation ID:** `ContactTypesA_Delete_DELETE`
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

## GET `/api/ContactTypesA/Get`

 (Auth roles: Admin)

- **Operation ID:** `ContactTypesA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ContactTypeRes`](../schemas.md#contacttyperes) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/ContactTypesA/Update`

 (Auth roles: Admin)

- **Operation ID:** `ContactTypesA_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Request body:** [`ContactTypeReq`](../schemas.md#contacttypereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ContactTypeRes`](../schemas.md#contacttyperes) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
