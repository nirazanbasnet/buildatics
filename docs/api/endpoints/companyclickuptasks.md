# CompanyClickUpTasks

Integrates Clickup task management with the Buildatics platform.
Allows querying and synchronizing Clickup tasks associated with a company's work items and projects.

**Operations:** 2 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/CompanyClickUpTasks/Get` |  (Auth roles: 1.0.0,19.2.0) |
| POST | `/api/CompanyClickUpTasks/PageDescending` |  (Auth roles: 1.0.0,19.2.0) |

## GET `/api/CompanyClickUpTasks/Get`

 (Auth roles: 1.0.0,19.2.0)

- **Operation ID:** `CompanyClickUpTasks_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyClickUpTaskRes`](../schemas.md#companyclickuptaskres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompanyClickUpTasks/PageDescending`

 (Auth roles: 1.0.0,19.2.0)

- **Operation ID:** `CompanyClickUpTasks_PageDescending_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`CompanyClickUpTaskPagedReq`](../schemas.md#companyclickuptaskpagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyClickUpTaskResPage`](../schemas.md#companyclickuptaskrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
