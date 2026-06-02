# EmailTemplatesA

Provides admin APIs for managing email templates used across the system.
Admin users can define and customize email templates for system notifications and communications.
Templates support variable placeholders for dynamic content.

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/EmailTemplatesA/Create` |  (Auth roles: Admin) |
| DELETE | `/api/EmailTemplatesA/Delete` |  (Auth roles: Admin) |
| GET | `/api/EmailTemplatesA/Get` |  (Auth roles: Admin) |
| POST | `/api/EmailTemplatesA/Page` |  (Auth roles: Admin) |
| POST | `/api/EmailTemplatesA/Update` |  (Auth roles: Admin) |

## POST `/api/EmailTemplatesA/Create`

 (Auth roles: Admin)

- **Operation ID:** `EmailTemplatesA_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`EmailTemplateAReq`](../schemas.md#emailtemplateareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`EmailTemplateARes`](../schemas.md#emailtemplateares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/EmailTemplatesA/Delete`

 (Auth roles: Admin)

- **Operation ID:** `EmailTemplatesA_Delete_DELETE`
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

## GET `/api/EmailTemplatesA/Get`

 (Auth roles: Admin)

- **Operation ID:** `EmailTemplatesA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`EmailTemplateARes`](../schemas.md#emailtemplateares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/EmailTemplatesA/Page`

 (Auth roles: Admin)

- **Operation ID:** `EmailTemplatesA_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`EmailTemplateAResPage`](../schemas.md#emailtemplatearespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/EmailTemplatesA/Update`

 (Auth roles: Admin)

- **Operation ID:** `EmailTemplatesA_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Request body:** [`EmailTemplateAReq`](../schemas.md#emailtemplateareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`EmailTemplateARes`](../schemas.md#emailtemplateares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
