# BrochureTemplatesA

Provides admin-only CRUD endpoints for brochure templates.
Brochure templates are uploaded files (e.g. PDFs, images) that admins manage
for use across the platform.

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/BrochureTemplatesA/Create` | Creates a new brochure template and uploads its attachment to blob storage. (Auth roles: Admin) |
| DELETE | `/api/BrochureTemplatesA/Delete` | Permanently deletes a brochure template and its associated blob from storage. (Auth roles: Admin) |
| GET | `/api/BrochureTemplatesA/Get` | Gets a single brochure template by ID, including its blob attachment. (Auth roles: Admin) |
| POST | `/api/BrochureTemplatesA/Page` | Gets a paged list of brochure templates, including their blob attachments. (Auth roles: Admin) |
| POST | `/api/BrochureTemplatesA/Update` | Updates an existing brochure template's metadata (Name, Note, JsonConfig, IsAvailable). To replace the attachment file, delete and re-create the template. (Auth roles: Admin) |

## POST `/api/BrochureTemplatesA/Create`

Creates a new brochure template and uploads its attachment to blob storage. (Auth roles: Admin)

- **Operation ID:** `BrochureTemplatesA_Create_POST`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BrochureTemplateARes`](../schemas.md#brochuretemplateares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/BrochureTemplatesA/Delete`

Permanently deletes a brochure template and its associated blob from storage. (Auth roles: Admin)

- **Operation ID:** `BrochureTemplatesA_Delete_DELETE`
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

## GET `/api/BrochureTemplatesA/Get`

Gets a single brochure template by ID, including its blob attachment. (Auth roles: Admin)

- **Operation ID:** `BrochureTemplatesA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BrochureTemplateARes`](../schemas.md#brochuretemplateares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/BrochureTemplatesA/Page`

Gets a paged list of brochure templates, including their blob attachments. (Auth roles: Admin)

- **Operation ID:** `BrochureTemplatesA_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BrochureTemplateAResPage`](../schemas.md#brochuretemplatearespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/BrochureTemplatesA/Update`

Updates an existing brochure template's metadata (Name, Note, JsonConfig, IsAvailable).
To replace the attachment file, delete and re-create the template. (Auth roles: Admin)

- **Operation ID:** `BrochureTemplatesA_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Request body:** [`UpdateBrochureTemplateAReq`](../schemas.md#updatebrochuretemplateareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BrochureTemplateARes`](../schemas.md#brochuretemplateares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
