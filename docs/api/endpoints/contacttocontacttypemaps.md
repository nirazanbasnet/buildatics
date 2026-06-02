# ContactToContactTypeMaps

Manages the mapping between contacts and contact types within a company.
Associates contacts with one or more classifications for organization and filtering.

**Operations:** 4 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/ContactToContactTypeMaps/Create` |  (Audited)  (Auth roles: 1.0.0) |
| DELETE | `/api/ContactToContactTypeMaps/Delete` | Note: Permanently deletes! (Audited)  (Auth roles: 1.0.0) |
| GET | `/api/ContactToContactTypeMaps/Get` |  (Auth roles: 1.0.0) |
| POST | `/api/ContactToContactTypeMaps/Page` |  (Auth roles: 1.0.0) |

## POST `/api/ContactToContactTypeMaps/Create`

 (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `ContactToContactTypeMaps_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`ContactToContactTypeMapReq`](../schemas.md#contacttocontacttypemapreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ContactToContactTypeMapRes`](../schemas.md#contacttocontacttypemapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/ContactToContactTypeMaps/Delete`

Note: Permanently deletes! (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `ContactToContactTypeMaps_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `contactId` | string (uuid) | — |  |
| query | `contactTypeId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/ContactToContactTypeMaps/Get`

 (Auth roles: 1.0.0)

- **Operation ID:** `ContactToContactTypeMaps_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `contactId` | string (uuid) | — |  |
| query | `contactTypeId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ContactToContactTypeMapRes`](../schemas.md#contacttocontacttypemapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/ContactToContactTypeMaps/Page`

 (Auth roles: 1.0.0)

- **Operation ID:** `ContactToContactTypeMaps_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ContactToContactTypeMapResPage`](../schemas.md#contacttocontacttypemaprespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
