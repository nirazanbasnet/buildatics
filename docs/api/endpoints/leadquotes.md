# LeadQuotes

Manages quotations generated for Sales leads, supporting multi-quote tracking and quote-to-order workflows.
Enables sales teams to generate, update, and track multiple quotes per lead with status management.

**Operations:** 7 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/LeadQuotes/Create` | Creates a lead quote. (Audited)  (Auth roles: 1.0.0,22.1.0,22.1.1) |
| DELETE | `/api/LeadQuotes/Delete` | Deletes a lead quote. (Audited)  (Auth roles: 1.0.0,22.4.0,22.4.1) |
| GET | `/api/LeadQuotes/Get` | Gets a single lead quote. (Auth roles: 1.0.0,22.2.0,22.2.1) |
| POST | `/api/LeadQuotes/IncrementVersion` | Increments only the lead quote version. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1) |
| POST | `/api/LeadQuotes/Page` | Gets a paged list of lead quotes for a lead. (Auth roles: 1.0.0,22.2.0,22.2.1) |
| POST | `/api/LeadQuotes/Update` | Updates an existing lead quote. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1) |
| POST | `/api/LeadQuotes/UpdateStatus` | Updates only the lead quote status. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1) |

## POST `/api/LeadQuotes/Create`

Creates a lead quote. (Audited)  (Auth roles: 1.0.0,22.1.0,22.1.1)

- **Operation ID:** `LeadQuotes_Create_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |

**Request body:** [`LeadQuoteReq`](../schemas.md#leadquotereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadQuoteRes`](../schemas.md#leadquoteres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/LeadQuotes/Delete`

Deletes a lead quote. (Audited)  (Auth roles: 1.0.0,22.4.0,22.4.1)

- **Operation ID:** `LeadQuotes_Delete_DELETE`
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

## GET `/api/LeadQuotes/Get`

Gets a single lead quote. (Auth roles: 1.0.0,22.2.0,22.2.1)

- **Operation ID:** `LeadQuotes_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadQuoteRes`](../schemas.md#leadquoteres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/LeadQuotes/IncrementVersion`

Increments only the lead quote version. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1)

- **Operation ID:** `LeadQuotes_IncrementVersion_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadQuoteRes`](../schemas.md#leadquoteres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/LeadQuotes/Page`

Gets a paged list of lead quotes for a lead. (Auth roles: 1.0.0,22.2.0,22.2.1)

- **Operation ID:** `LeadQuotes_Page_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |

**Request body:** [`LeadQuotePageReq`](../schemas.md#leadquotepagereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadQuoteResPage`](../schemas.md#leadquoterespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/LeadQuotes/Update`

Updates an existing lead quote. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1)

- **Operation ID:** `LeadQuotes_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |
| query | `id` | string (uuid) | — |  |

**Request body:** [`LeadQuoteReq`](../schemas.md#leadquotereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadQuoteRes`](../schemas.md#leadquoteres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/LeadQuotes/UpdateStatus`

Updates only the lead quote status. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1)

- **Operation ID:** `LeadQuotes_UpdateStatus_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |
| query | `id` | string (uuid) | — |  |

**Request body:** [`LeadQuoteStatusReq`](../schemas.md#leadquotestatusreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadQuoteRes`](../schemas.md#leadquoteres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
