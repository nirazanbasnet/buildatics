# StripeSessionsA

Used for house keeping

**Operations:** 6 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| DELETE | `/api/StripeSessionsA/Delete` | Note: Permanently deletes! Also deletes Subtasks if any. (Auth roles: Admin) |
| GET | `/api/StripeSessionsA/Get` |  (Auth roles: Admin) |
| POST | `/api/StripeSessionsA/PageDescending` |  (Auth roles: Admin) |
| POST | `/api/StripeSessionsA/PageDescendingNoTenant` | Paginates over all the sessions across all the Companies. (Auth roles: Admin) |
| DELETE | `/api/StripeSessionsA/SoftDelete` | Does not soft delete Subtasks if any. Also soft deletes Subtasks if any. (Auth roles: Admin) |
| POST | `/api/StripeSessionsA/Update` | Updates specific fields for an existing StripeSession. We do not allow creating StripeSessions since they should only be created by end users. (Auth roles: Admin) |

## DELETE `/api/StripeSessionsA/Delete`

Note: Permanently deletes!
Also deletes Subtasks if any. (Auth roles: Admin)

- **Operation ID:** `StripeSessionsA_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/StripeSessionsA/Get`

 (Auth roles: Admin)

- **Operation ID:** `StripeSessionsA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`StripeSessionRes`](../schemas.md#stripesessionres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/StripeSessionsA/PageDescending`

 (Auth roles: Admin)

- **Operation ID:** `StripeSessionsA_PageDescending_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`StripeSessionResPage`](../schemas.md#stripesessionrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/StripeSessionsA/PageDescendingNoTenant`

Paginates over all the sessions across all the Companies. (Auth roles: Admin)

- **Operation ID:** `StripeSessionsA_PageDescendingNoTenant_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`StripeSessionResPage`](../schemas.md#stripesessionrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/StripeSessionsA/SoftDelete`

Does not soft delete Subtasks if any.
Also soft deletes Subtasks if any. (Auth roles: Admin)

- **Operation ID:** `StripeSessionsA_SoftDelete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/StripeSessionsA/Update`

Updates specific fields for an existing StripeSession.
We do not allow creating StripeSessions since they should only be created by end users. (Auth roles: Admin)

- **Operation ID:** `StripeSessionsA_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`UpdateStripeSessionAReq`](../schemas.md#updatestripesessionareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`StripeSessionRes`](../schemas.md#stripesessionres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
