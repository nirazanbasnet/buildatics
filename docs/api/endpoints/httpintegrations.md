# HttpIntegrations

Generaic Http query execution controller for all integrated services

**Operations:** 1 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/HttpIntegrations/Execute` | Executes the specified query for the specifed ExternalProvider and returns Http response (Audited)  (Auth roles: 1.0.0) |

## POST `/api/HttpIntegrations/Execute`

Executes the specified query for the specifed ExternalProvider and returns Http response (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `HttpIntegrations_Execute_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `actionId` | integer (int64) | — |  |
| query | `externalApiProviderType` | [`ExternalApiProviderType`](../schemas.md#externalapiprovidertype) | — |  |

**Request body:** [`HttpExecuteQueryReq`](../schemas.md#httpexecutequeryreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
