# Leads

Manages Sales leads—prospects or clients being tracked through the sales pipeline—with full CRUD and pagination support.
Supports lead prioritization, status management, activity tracking, and assignment to sales staff.

**Operations:** 8 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/Leads/Create` | Creates a new lead. (Audited)  (Auth roles: 1.0.0,22.1.0,22.1.1) |
| DELETE | `/api/Leads/Delete` | Permanently deletes a lead. If forceDelete is true, all associated entities (activity notes, tasks, quotes, designs) are deleted first. Throws a conflict error if the lead has associated entities and forceDelete is false. (Audited)  (Auth roles: 1.0.0,22.4.0,22.4.1) |
| GET | `/api/Leads/Get` | Gets a single lead. (Auth roles: 1.0.0,22.2.0,22.2.1) |
| POST | `/api/Leads/Page` | Gets a paged list of leads ordered by newest first. (Auth roles: 1.0.0,22.2.0,22.2.1) |
| DELETE | `/api/Leads/SoftDelete` | Soft deletes a lead. (Audited)  (Auth roles: 1.0.0,22.4.0,22.4.1) |
| POST | `/api/Leads/Update` | Updates an existing lead. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1) |
| POST | `/api/Leads/UpdateStage` | Updates only the lead stage assignment. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1) |
| POST | `/api/Leads/UpdateStatus` | Updates only the lead status. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1) |

## POST `/api/Leads/Create`

Creates a new lead. (Audited)  (Auth roles: 1.0.0,22.1.0,22.1.1)

- **Operation ID:** `Leads_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`LeadReq`](../schemas.md#leadreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadRes`](../schemas.md#leadres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/Leads/Delete`

Permanently deletes a lead.
If forceDelete is true, all associated entities (activity notes, tasks, quotes, designs) are deleted first.
Throws a conflict error if the lead has associated entities and forceDelete is false. (Audited)  (Auth roles: 1.0.0,22.4.0,22.4.1)

- **Operation ID:** `Leads_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `forceDelete` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/Leads/Get`

Gets a single lead. (Auth roles: 1.0.0,22.2.0,22.2.1)

- **Operation ID:** `Leads_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadRes`](../schemas.md#leadres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Leads/Page`

Gets a paged list of leads ordered by newest first. (Auth roles: 1.0.0,22.2.0,22.2.1)

- **Operation ID:** `Leads_Page_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadResPage`](../schemas.md#leadrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/Leads/SoftDelete`

Soft deletes a lead. (Audited)  (Auth roles: 1.0.0,22.4.0,22.4.1)

- **Operation ID:** `Leads_SoftDelete_DELETE`
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

## POST `/api/Leads/Update`

Updates an existing lead. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1)

- **Operation ID:** `Leads_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`LeadReq`](../schemas.md#leadreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadRes`](../schemas.md#leadres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Leads/UpdateStage`

Updates only the lead stage assignment. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1)

- **Operation ID:** `Leads_UpdateStage_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`LeadUpdateStageReq`](../schemas.md#leadupdatestagereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadRes`](../schemas.md#leadres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Leads/UpdateStatus`

Updates only the lead status. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1)

- **Operation ID:** `Leads_UpdateStatus_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`LeadStatusReq`](../schemas.md#leadstatusreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadRes`](../schemas.md#leadres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
