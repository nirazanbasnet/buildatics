# LeadTasks

Associates tasks with individual Sales leads for activity planning and follow-up management within the sales process.
Enables sales teams to track action items and milestones tied to specific prospects.

**Operations:** 6 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/LeadTasks/Create` | Creates a task for a lead. (Audited)  (Auth roles: 1.0.0,22.1.0,22.1.1) |
| DELETE | `/api/LeadTasks/Delete` | Deletes a lead task. (Audited)  (Auth roles: 1.0.0,22.4.0,22.4.1) |
| GET | `/api/LeadTasks/Get` | Gets a single sales lead task. (Auth roles: 1.0.0,22.2.0,22.2.1) |
| POST | `/api/LeadTasks/Page` | Gets a paged list of tasks for a lead. (Auth roles: 1.0.0,22.2.0,22.2.1) |
| POST | `/api/LeadTasks/Update` | Updates an existing lead task. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1) |
| POST | `/api/LeadTasks/UpdateStatus` | Updates only the task status. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1) |

## POST `/api/LeadTasks/Create`

Creates a task for a lead. (Audited)  (Auth roles: 1.0.0,22.1.0,22.1.1)

- **Operation ID:** `LeadTasks_Create_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |

**Request body:** [`LeadTaskReq`](../schemas.md#leadtaskreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadTaskRes`](../schemas.md#leadtaskres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/LeadTasks/Delete`

Deletes a lead task. (Audited)  (Auth roles: 1.0.0,22.4.0,22.4.1)

- **Operation ID:** `LeadTasks_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/LeadTasks/Get`

Gets a single sales lead task. (Auth roles: 1.0.0,22.2.0,22.2.1)

- **Operation ID:** `LeadTasks_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadTaskRes`](../schemas.md#leadtaskres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/LeadTasks/Page`

Gets a paged list of tasks for a lead. (Auth roles: 1.0.0,22.2.0,22.2.1)

- **Operation ID:** `LeadTasks_Page_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |

**Request body:** [`SalesLeadTaskPageReq`](../schemas.md#salesleadtaskpagereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadTaskResPage`](../schemas.md#leadtaskrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/LeadTasks/Update`

Updates an existing lead task. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1)

- **Operation ID:** `LeadTasks_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |
| query | `id` | string (uuid) | — |  |

**Request body:** [`LeadTaskReq`](../schemas.md#leadtaskreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadTaskRes`](../schemas.md#leadtaskres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/LeadTasks/UpdateStatus`

Updates only the task status. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1)

- **Operation ID:** `LeadTasks_UpdateStatus_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |
| query | `id` | string (uuid) | — |  |

**Request body:** [`LeadTaskStatusReq`](../schemas.md#leadtaskstatusreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadTaskRes`](../schemas.md#leadtaskres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
