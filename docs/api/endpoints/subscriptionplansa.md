# SubscriptionPlansA

Provides admin-only CRUD endpoints for subscription plan definitions.
Subscription plans control the pricing and feature tiers available to companies across the platform.

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/SubscriptionPlansA/Create` | Creates a new subscription plan. (Auth roles: Admin) |
| DELETE | `/api/SubscriptionPlansA/Delete` | Permanently deletes a subscription plan after verifying no company is currently subscribed to it. (Auth roles: Admin) |
| GET | `/api/SubscriptionPlansA/Get` | Gets a single subscription plan by ID. (Auth roles: Admin) |
| POST | `/api/SubscriptionPlansA/Page` | Gets a paged list of subscription plans. (Auth roles: Admin) |
| POST | `/api/SubscriptionPlansA/Update` | Updates an existing subscription plan. (Auth roles: Admin) |

## POST `/api/SubscriptionPlansA/Create`

Creates a new subscription plan. (Auth roles: Admin)

- **Operation ID:** `SubscriptionPlansA_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`SubscriptionPlanAReq`](../schemas.md#subscriptionplanareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`SubscriptionPlanARes`](../schemas.md#subscriptionplanares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/SubscriptionPlansA/Delete`

Permanently deletes a subscription plan after verifying no company is currently subscribed to it. (Auth roles: Admin)

- **Operation ID:** `SubscriptionPlansA_Delete_DELETE`
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

## GET `/api/SubscriptionPlansA/Get`

Gets a single subscription plan by ID. (Auth roles: Admin)

- **Operation ID:** `SubscriptionPlansA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`SubscriptionPlanARes`](../schemas.md#subscriptionplanares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/SubscriptionPlansA/Page`

Gets a paged list of subscription plans. (Auth roles: Admin)

- **Operation ID:** `SubscriptionPlansA_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`SubscriptionPlanAResPage`](../schemas.md#subscriptionplanarespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/SubscriptionPlansA/Update`

Updates an existing subscription plan. (Auth roles: Admin)

- **Operation ID:** `SubscriptionPlansA_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Request body:** [`SubscriptionPlanAReq`](../schemas.md#subscriptionplanareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`SubscriptionPlanARes`](../schemas.md#subscriptionplanares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
