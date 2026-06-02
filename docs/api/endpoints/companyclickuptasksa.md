# CompanyClickUpTasksA

Manages company-scoped ClickUp task records across all tenants from an admin perspective.
These endpoints support inspection, paging, and maintenance of ClickUp tasks synchronized into Buildatics.

**Operations:** 6 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/CompanyClickUpTasksA/Create` | Creates a company ClickUp task record for the specified company. (Auth roles: Admin) |
| DELETE | `/api/CompanyClickUpTasksA/Delete` | Note: Permanently deletes! Also deletes Subtasks if any. (Auth roles: Admin) |
| GET | `/api/CompanyClickUpTasksA/Get` | Gets a single company ClickUp task by ID, including related data, without tenant scoping. (Auth roles: Admin) |
| POST | `/api/CompanyClickUpTasksA/PageDescending` | Gets a paged list of company ClickUp tasks across tenants, optionally filtered to a parent task. (Auth roles: Admin) |
| DELETE | `/api/CompanyClickUpTasksA/SoftDelete` | Does not soft delete Subtasks if any. Also soft deletes Subtasks if any. (Auth roles: Admin) |
| POST | `/api/CompanyClickUpTasksA/Update` | Updates an existing company ClickUp task record for the specified company. (Auth roles: Admin) |

## POST `/api/CompanyClickUpTasksA/Create`

Creates a company ClickUp task record for the specified company. (Auth roles: Admin)

- **Operation ID:** `CompanyClickUpTasksA_Create_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |

**Request body:** [`CompanyClickUpTaskAReq`](../schemas.md#companyclickuptaskareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyClickUpTaskRes`](../schemas.md#companyclickuptaskres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/CompanyClickUpTasksA/Delete`

Note: Permanently deletes!
Also deletes Subtasks if any. (Auth roles: Admin)

- **Operation ID:** `CompanyClickUpTasksA_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/CompanyClickUpTasksA/Get`

Gets a single company ClickUp task by ID, including related data, without tenant scoping. (Auth roles: Admin)

- **Operation ID:** `CompanyClickUpTasksA_Get_GET`
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

## POST `/api/CompanyClickUpTasksA/PageDescending`

Gets a paged list of company ClickUp tasks across tenants, optionally filtered to a parent task. (Auth roles: Admin)

- **Operation ID:** `CompanyClickUpTasksA_PageDescending_POST`
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

## DELETE `/api/CompanyClickUpTasksA/SoftDelete`

Does not soft delete Subtasks if any.
Also soft deletes Subtasks if any. (Auth roles: Admin)

- **Operation ID:** `CompanyClickUpTasksA_SoftDelete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompanyClickUpTasksA/Update`

Updates an existing company ClickUp task record for the specified company. (Auth roles: Admin)

- **Operation ID:** `CompanyClickUpTasksA_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`CompanyClickUpTaskAReq`](../schemas.md#companyclickuptaskareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyClickUpTaskRes`](../schemas.md#companyclickuptaskres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
