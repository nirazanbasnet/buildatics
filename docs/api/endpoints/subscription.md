# Subscription

Provides APIs to manage company subscription.
These can be accessed even if company is locked.

**Operations:** 4 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/Subscription/AllAvaliableSubscriptionPlans` | SubscriptionPlans available for the company to subscribe to. (Auth roles: 1.0.0,2.0.0,2.2.0) |
| POST | `/api/Subscription/CancelCurrentSubscription` | Cancels the current subscription for the company. Company will be locked when the current subscription expires and will need to subscribe to a new plan to get access again. (Audited)  (Auth roles: 1.0.0,2.0.0,2.3.0) |
| POST | `/api/Subscription/GetCheckoutUrl` | Returns the checkout url for the specified subscription plan.  User can be redirected to this url to complete the subscription purchase or upgrade. (Audited)  (Auth roles: 1.0.0,2.0.0,2.3.0) |
| GET | `/api/Subscription/GetCurrentSubscriptionPlan` | Gets the active subscription plan of the company. (Auth roles: 1.0.0,2.0.0,2.2.0) |

## GET `/api/Subscription/AllAvaliableSubscriptionPlans`

SubscriptionPlans available for the company to subscribe to. (Auth roles: 1.0.0,2.0.0,2.2.0)

- **Operation ID:** `Subscription_AllAvaliableSubscriptionPlans_GET`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`SubscriptionPlanRes`](../schemas.md#subscriptionplanres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Subscription/CancelCurrentSubscription`

Cancels the current subscription for the company.
Company will be locked when the current subscription expires and will need to subscribe to a new plan to get access again. (Audited)  (Auth roles: 1.0.0,2.0.0,2.3.0)

- **Operation ID:** `Subscription_CancelCurrentSubscription_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `subscriptionPlanId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Subscription/GetCheckoutUrl`

Returns the checkout url for the specified subscription plan. 
User can be redirected to this url to complete the subscription purchase or upgrade. (Audited)  (Auth roles: 1.0.0,2.0.0,2.3.0)

- **Operation ID:** `Subscription_GetCheckoutUrl_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `subscriptionPlanId` | string (uuid) | — |  |
| query | `renewsOnExpiry` | boolean | — | When true, the subscription plan will be renewed on expiry date.             When false, the subscription plan will not be renewed once it expires |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | string |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/Subscription/GetCurrentSubscriptionPlan`

Gets the active subscription plan of the company. (Auth roles: 1.0.0,2.0.0,2.2.0)

- **Operation ID:** `Subscription_GetCurrentSubscriptionPlan_GET`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`SubscriptionPlanRes`](../schemas.md#subscriptionplanres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
