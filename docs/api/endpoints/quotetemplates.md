# QuoteTemplates

Manages reusable company-owned quote templates for the sales module.
These templates let the UI store structured defaults and apply them when building quotations.

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/QuoteTemplates/All` | Gets all quote templates ordered by sort order. (Auth roles: 1.0.0) |
| POST | `/api/QuoteTemplates/Create` | Creates a quote template. (Audited)  (Auth roles: 1.0.0) |
| DELETE | `/api/QuoteTemplates/Delete` | Deletes a quote template. (Audited)  (Auth roles: 1.0.0) |
| GET | `/api/QuoteTemplates/Get` | Gets a single quote template. (Auth roles: 1.0.0) |
| POST | `/api/QuoteTemplates/Update` | Updates an existing quote template. (Audited)  (Auth roles: 1.0.0) |

## GET `/api/QuoteTemplates/All`

Gets all quote templates ordered by sort order. (Auth roles: 1.0.0)

- **Operation ID:** `QuoteTemplates_All_GET`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`QuoteTemplateRes`](../schemas.md#quotetemplateres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/QuoteTemplates/Create`

Creates a quote template. (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `QuoteTemplates_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`QuoteTemplateReq`](../schemas.md#quotetemplatereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`QuoteTemplateRes`](../schemas.md#quotetemplateres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/QuoteTemplates/Delete`

Deletes a quote template. (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `QuoteTemplates_Delete_DELETE`
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

## GET `/api/QuoteTemplates/Get`

Gets a single quote template. (Auth roles: 1.0.0)

- **Operation ID:** `QuoteTemplates_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`QuoteTemplateRes`](../schemas.md#quotetemplateres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/QuoteTemplates/Update`

Updates an existing quote template. (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `QuoteTemplates_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Request body:** [`QuoteTemplateReq`](../schemas.md#quotetemplatereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`QuoteTemplateRes`](../schemas.md#quotetemplateres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
