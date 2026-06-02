# SubscriptionPaymentsA

**Operations:** 3 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/SubscriptionPaymentsA/CancelCurrentSubscription` | Cancel the current subscription for the specifed company. This will cause the cuurent subscription to be immediately stopped. (Audited)  (Auth roles: Admin,PaymentProcessor) |
| POST | `/api/SubscriptionPaymentsA/Create` | Processes payment for a subscription after an update from the Payment Gateway. This should be called from a Function/Logic app that is triggered based on Queue that stores responses from Payment Gateway. (Audited)  (Auth roles: Admin,PaymentProcessor) |
| POST | `/api/SubscriptionPaymentsA/Page` | Returns paginated subscription payment history for the specified company in descending order. (Auth roles: Admin,PaymentProcessor) |

## POST `/api/SubscriptionPaymentsA/CancelCurrentSubscription`

Cancel the current subscription for the specifed company.
This will cause the cuurent subscription to be immediately stopped. (Audited)  (Auth roles: Admin,PaymentProcessor)

- **Operation ID:** `SubscriptionPaymentsA_CancelCurrentSubscription_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |
| query | `cancelOnExpiry` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/SubscriptionPaymentsA/Create`

Processes payment for a subscription after an update from the Payment Gateway.
This should be called from a Function/Logic app that is triggered based on Queue that stores responses from Payment Gateway. (Audited)  (Auth roles: Admin,PaymentProcessor)

- **Operation ID:** `SubscriptionPaymentsA_Create_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |
| query | `subscriptionPlanId` | string (uuid) | — |  |
| query | `paymentStatus` | [`PaymentStatus`](../schemas.md#paymentstatus) | — |  |
| query | `stripePaymentIntentId` | string | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/SubscriptionPaymentsA/Page`

Returns paginated subscription payment history for the specified company in descending order. (Auth roles: Admin,PaymentProcessor)

- **Operation ID:** `SubscriptionPaymentsA_Page_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`SubscriptionPaymentHistoryResPage`](../schemas.md#subscriptionpaymenthistoryrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
