# LeadQuoteLineItems

Manages the individual line items that make up a lead quote in the sales module.
Line items capture the itemized pricing, quantities, and cost breakdown used to build a proposal.

**Operations:** 4 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/LeadQuoteLineItems/Create` | Creates a lead quote line item. (Audited)  (Auth roles: 1.0.0,22.1.0,22.1.1) |
| DELETE | `/api/LeadQuoteLineItems/Delete` | Deletes a lead quote line item. (Audited)  (Auth roles: 1.0.0,22.4.0,22.4.1) |
| GET | `/api/LeadQuoteLineItems/GetByQuotation` | Gets all line items for a lead quote. (Auth roles: 1.0.0,22.2.0,22.2.1) |
| POST | `/api/LeadQuoteLineItems/Update` | Updates an existing lead quote line item. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1) |

## POST `/api/LeadQuoteLineItems/Create`

Creates a lead quote line item. (Audited)  (Auth roles: 1.0.0,22.1.0,22.1.1)

- **Operation ID:** `LeadQuoteLineItems_Create_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |

**Request body:** [`LeadQuoteLineItemReq`](../schemas.md#leadquotelineitemreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadQuoteLineItemRes`](../schemas.md#leadquotelineitemres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/LeadQuoteLineItems/Delete`

Deletes a lead quote line item. (Audited)  (Auth roles: 1.0.0,22.4.0,22.4.1)

- **Operation ID:** `LeadQuoteLineItems_Delete_DELETE`
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

## GET `/api/LeadQuoteLineItems/GetByQuotation`

Gets all line items for a lead quote. (Auth roles: 1.0.0,22.2.0,22.2.1)

- **Operation ID:** `LeadQuoteLineItems_GetByQuotation_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |
| query | `leadQuoteId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadQuoteLineItemRes`](../schemas.md#leadquotelineitemres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/LeadQuoteLineItems/Update`

Updates an existing lead quote line item. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1)

- **Operation ID:** `LeadQuoteLineItems_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |
| query | `id` | string (uuid) | — |  |

**Request body:** [`LeadQuoteLineItemReq`](../schemas.md#leadquotelineitemreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadQuoteLineItemRes`](../schemas.md#leadquotelineitemres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
