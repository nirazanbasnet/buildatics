# LeadActivityLogs

Manages the activity timeline for a sales lead, including manual notes and system-generated events.
Activity logs provide the engagement history used by sales teams to understand lead progress and follow-up actions.

**Operations:** 2 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/LeadActivityLogs/CreateManual` | Adds a manual activity entry to a lead. (Audited)  (Auth roles: 1.0.0,22.1.0,22.1.1,22.3.0,22.3.1,22.4.0,22.4.1) |
| POST | `/api/LeadActivityLogs/Page` | Gets a paged list of activity logs for a lead. (Auth roles: 1.0.0,22.2.0,22.2.1) |

## POST `/api/LeadActivityLogs/CreateManual`

Adds a manual activity entry to a lead. (Audited)  (Auth roles: 1.0.0,22.1.0,22.1.1,22.3.0,22.3.1,22.4.0,22.4.1)

- **Operation ID:** `LeadActivityLogs_CreateManual_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |

**Request body:** [`LeadActivityLogReq`](../schemas.md#leadactivitylogreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadActivityLogRes`](../schemas.md#leadactivitylogres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/LeadActivityLogs/Page`

Gets a paged list of activity logs for a lead. (Auth roles: 1.0.0,22.2.0,22.2.1)

- **Operation ID:** `LeadActivityLogs_Page_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |

**Request body:** [`LeadActivityLogPageReq`](../schemas.md#leadactivitylogpagereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadActivityLogResPage`](../schemas.md#leadactivitylogrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
