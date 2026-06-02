# DummyDataA

Provides API for managing the DummyData for the users with Admin role.

**Operations:** 3 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/DummyDataA/AddDummyLogs` |  (Auth roles: Admin) |
| POST | `/api/DummyDataA/RegisterDummyCompany` | Register new Dummy Company with Staff (Owner, Manager etc) (Auth roles: Admin) |
| POST | `/api/DummyDataA/SendTestQueuedEmail` |  (Auth roles: Admin) |

## GET `/api/DummyDataA/AddDummyLogs`

 (Auth roles: Admin)

- **Operation ID:** `DummyDataA_AddDummyLogs_GET`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/DummyDataA/RegisterDummyCompany`

Register new Dummy Company with Staff (Owner, Manager etc) (Auth roles: Admin)

- **Operation ID:** `DummyDataA_RegisterDummyCompany_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `subscriptionPlanId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`MessageResponseDto`](../schemas.md#messageresponsedto) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/DummyDataA/SendTestQueuedEmail`

 (Auth roles: Admin)

- **Operation ID:** `DummyDataA_SendTestQueuedEmail_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `fromEmailId` | string | — |  |
| query | `toEmailId` | string | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
