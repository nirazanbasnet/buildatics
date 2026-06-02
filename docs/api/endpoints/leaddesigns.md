# LeadDesigns

Manages the company designs linked to a sales lead during preconstruction and quoting workflows.
These links let sales users track which design options have been discussed or proposed for a lead.

**Operations:** 3 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/LeadDesigns/Add` | Links a company design to a lead. (Audited)  (Auth roles: 1.0.0,22.1.0,22.1.1) |
| GET | `/api/LeadDesigns/All` | Gets all designs linked to a lead. (Auth roles: 1.0.0,22.2.0,22.2.1) |
| DELETE | `/api/LeadDesigns/Delete` | Unlinks a design from a lead. (Audited)  (Auth roles: 1.0.0,22.4.0,22.4.1) |

## POST `/api/LeadDesigns/Add`

Links a company design to a lead. (Audited)  (Auth roles: 1.0.0,22.1.0,22.1.1)

- **Operation ID:** `LeadDesigns_Add_POST`
- **Auth:** Bearer token required

**Request body:** [`LeadDesignReq`](../schemas.md#leaddesignreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadDesignRes`](../schemas.md#leaddesignres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/LeadDesigns/All`

Gets all designs linked to a lead. (Auth roles: 1.0.0,22.2.0,22.2.1)

- **Operation ID:** `LeadDesigns_All_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadDesignRes`](../schemas.md#leaddesignres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/LeadDesigns/Delete`

Unlinks a design from a lead. (Audited)  (Auth roles: 1.0.0,22.4.0,22.4.1)

- **Operation ID:** `LeadDesigns_Delete_DELETE`
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
