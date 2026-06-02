# HtmlPageTemplatesA

Provides admin-only CRUD endpoints for system and tenant HTML page templates.
These templates are used to render hosted HTML documents, branded pages, and exported content.

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/HtmlPageTemplatesA/Create` | Creates a new HTML page template. (Auth roles: Admin) |
| DELETE | `/api/HtmlPageTemplatesA/Delete` | Permanently deletes an HTML page template. (Auth roles: Admin) |
| GET | `/api/HtmlPageTemplatesA/Get` | Gets a single HTML page template by ID. (Auth roles: Admin) |
| POST | `/api/HtmlPageTemplatesA/Page` | Gets a paged list of HTML page templates across the system. (Auth roles: Admin) |
| POST | `/api/HtmlPageTemplatesA/Update` | Updates an existing HTML page template. (Auth roles: Admin) |

## POST `/api/HtmlPageTemplatesA/Create`

Creates a new HTML page template. (Auth roles: Admin)

- **Operation ID:** `HtmlPageTemplatesA_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`HtmlPageTemplateAReq`](../schemas.md#htmlpagetemplateareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`HtmlPageTemplateARes`](../schemas.md#htmlpagetemplateares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/HtmlPageTemplatesA/Delete`

Permanently deletes an HTML page template. (Auth roles: Admin)

- **Operation ID:** `HtmlPageTemplatesA_Delete_DELETE`
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

## GET `/api/HtmlPageTemplatesA/Get`

Gets a single HTML page template by ID. (Auth roles: Admin)

- **Operation ID:** `HtmlPageTemplatesA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`HtmlPageTemplateARes`](../schemas.md#htmlpagetemplateares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/HtmlPageTemplatesA/Page`

Gets a paged list of HTML page templates across the system. (Auth roles: Admin)

- **Operation ID:** `HtmlPageTemplatesA_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`HtmlPageTemplateAResPage`](../schemas.md#htmlpagetemplatearespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/HtmlPageTemplatesA/Update`

Updates an existing HTML page template. (Auth roles: Admin)

- **Operation ID:** `HtmlPageTemplatesA_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Request body:** [`HtmlPageTemplateAReq`](../schemas.md#htmlpagetemplateareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`HtmlPageTemplateARes`](../schemas.md#htmlpagetemplateares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
