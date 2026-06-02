# LeadStages

Manages the company-owned sales pipeline stages that define how leads progress through the sales process.
These stages act as reusable workflow configuration for categorizing leads such as prospecting, quoting, and closing.

**Operations:** 6 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/LeadStages/Create` | Creates a new lead stage. (Audited)  (Auth roles: 1.0.0) |
| DELETE | `/api/LeadStages/Delete` | Deletes a lead stage. (Audited)  (Auth roles: 1.0.0) |
| GET | `/api/LeadStages/Get` | Gets a single lead stage. (Auth roles: 1.0.0) |
| GET | `/api/LeadStages/GetAll` | Gets all lead stages ordered by sort order. (Auth roles: 1.0.0) |
| POST | `/api/LeadStages/Reorder` | Reorders lead stages. (Audited)  (Auth roles: 1.0.0) |
| POST | `/api/LeadStages/Update` | Updates an existing lead stage. (Audited)  (Auth roles: 1.0.0) |

## POST `/api/LeadStages/Create`

Creates a new lead stage. (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `LeadStages_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`LeadStageReq`](../schemas.md#leadstagereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadStageRes`](../schemas.md#leadstageres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/LeadStages/Delete`

Deletes a lead stage. (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `LeadStages_Delete_DELETE`
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

## GET `/api/LeadStages/Get`

Gets a single lead stage. (Auth roles: 1.0.0)

- **Operation ID:** `LeadStages_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadStageRes`](../schemas.md#leadstageres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/LeadStages/GetAll`

Gets all lead stages ordered by sort order. (Auth roles: 1.0.0)

- **Operation ID:** `LeadStages_GetAll_GET`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadStageRes`](../schemas.md#leadstageres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/LeadStages/Reorder`

Reorders lead stages. (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `LeadStages_Reorder_POST`
- **Auth:** Bearer token required

**Request body:** [`LeadStageReorderReq`](../schemas.md#leadstagereorderreq)[]

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadStageRes`](../schemas.md#leadstageres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/LeadStages/Update`

Updates an existing lead stage. (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `LeadStages_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Request body:** [`LeadStageReq`](../schemas.md#leadstagereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadStageRes`](../schemas.md#leadstageres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
