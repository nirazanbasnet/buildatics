# ContactTypes

Manages contact type classifications used to categorize contacts within a company (e.g., Owner, Agent, Contractor).
Contact types help organize and filter contacts for assignment and relationship mapping.

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/ContactTypes/All` |  (Auth roles: 1.0.0) |
| POST | `/api/ContactTypes/Create` |  (Audited)  (Auth roles: 1.0.0) |
| DELETE | `/api/ContactTypes/Delete` | Note: Permanently deletes! (Audited)  (Auth roles: 1.0.0) |
| GET | `/api/ContactTypes/Get` |  (Auth roles: 1.0.0) |
| POST | `/api/ContactTypes/Update` |  (Audited)  (Auth roles: 1.0.0) |

## POST `/api/ContactTypes/All`

 (Auth roles: 1.0.0)

- **Operation ID:** `ContactTypes_All_POST`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ContactTypeRes`](../schemas.md#contacttyperes)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/ContactTypes/Create`

 (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `ContactTypes_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`ContactTypeReq`](../schemas.md#contacttypereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ContactTypeRes`](../schemas.md#contacttyperes) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/ContactTypes/Delete`

Note: Permanently deletes! (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `ContactTypes_Delete_DELETE`
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

## GET `/api/ContactTypes/Get`

 (Auth roles: 1.0.0)

- **Operation ID:** `ContactTypes_Get_GET`
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

## POST `/api/ContactTypes/Update`

 (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `ContactTypes_Update_POST`
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
