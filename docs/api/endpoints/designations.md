# Designations

Allows to manage Designations that Staff within a Company can have
e.g. Supervisor, Tradie, Project Manager etc

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/Designations/Create` |  (Audited)  (Auth roles: 1.0.0) |
| DELETE | `/api/Designations/Delete` | Deletes a designation. Returns 400 if the designation is still assigned to one or more users. (Audited)  (Auth roles: 1.0.0) |
| GET | `/api/Designations/Get` |  (Auth roles: 1.0.0) |
| POST | `/api/Designations/Page` |  (Auth roles: 1.0.0) |
| POST | `/api/Designations/Update` |  (Audited)  (Auth roles: 1.0.0) |

## POST `/api/Designations/Create`

 (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `Designations_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`DesignationReq`](../schemas.md#designationreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignationRes`](../schemas.md#designationres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/Designations/Delete`

Deletes a designation. Returns 400 if the designation is still assigned to one or more users. (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `Designations_Delete_DELETE`
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

## GET `/api/Designations/Get`

 (Auth roles: 1.0.0)

- **Operation ID:** `Designations_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignationRes`](../schemas.md#designationres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Designations/Page`

 (Auth roles: 1.0.0)

- **Operation ID:** `Designations_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignationResPage`](../schemas.md#designationrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Designations/Update`

 (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `Designations_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Request body:** [`DesignationReq`](../schemas.md#designationreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignationRes`](../schemas.md#designationres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
