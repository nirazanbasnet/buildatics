# SubscriptionPaymentHistory

Provides paginated access to subscription payment history for the current company.

**Operations:** 1 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/SubscriptionPaymentHistory/Page` | Returns paginated subscription payment history for the current company in descending order. (Auth roles: 1.0.0,2.0.0,2.2.0) |

## POST `/api/SubscriptionPaymentHistory/Page`

Returns paginated subscription payment history for the current company in descending order. (Auth roles: 1.0.0,2.0.0,2.2.0)

- **Operation ID:** `SubscriptionPaymentHistory_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`SubscriptionPaymentHistoryResPage`](../schemas.md#subscriptionpaymenthistoryrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
