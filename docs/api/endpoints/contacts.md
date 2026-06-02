# Contacts

Manages company contacts and their associated address information.
Contacts can be referenced from various entities (leads, projects, stages, tasks) and support soft delete.
Only company owners can manage contacts for their organization.

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/Contacts/Create` | Creates a new contact with basic information and address. (Audited)  (Auth roles: 1.0.0) |
| GET | `/api/Contacts/Get` | Gets a single contact by ID with full address details. (Auth roles: 1.0.0) |
| POST | `/api/Contacts/PageDescending` | Gets a paginated list of contacts ordered by most recently updated first. Excludes soft-deleted contacts by default. (Auth roles: 1.0.0) |
| DELETE | `/api/Contacts/SoftDelete` | Soft deletes a contact, marking it as inactive while preserving audit history and associated relationships. (Audited)  (Auth roles: 1.0.0) |
| POST | `/api/Contacts/Update` | Updates an existing contact's information and address details. (Audited)  (Auth roles: 1.0.0) |

## POST `/api/Contacts/Create`

Creates a new contact with basic information and address. (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `Contacts_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`ContactReq`](../schemas.md#contactreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ContactRes`](../schemas.md#contactres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/Contacts/Get`

Gets a single contact by ID with full address details. (Auth roles: 1.0.0)

- **Operation ID:** `Contacts_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ContactRes`](../schemas.md#contactres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Contacts/PageDescending`

Gets a paginated list of contacts ordered by most recently updated first. Excludes soft-deleted contacts by default. (Auth roles: 1.0.0)

- **Operation ID:** `Contacts_PageDescending_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ContactResPage`](../schemas.md#contactrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/Contacts/SoftDelete`

Soft deletes a contact, marking it as inactive while preserving audit history and associated relationships. (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `Contacts_SoftDelete_DELETE`
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

## POST `/api/Contacts/Update`

Updates an existing contact's information and address details. (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `Contacts_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Request body:** [`ContactReq`](../schemas.md#contactreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ContactRes`](../schemas.md#contactres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
