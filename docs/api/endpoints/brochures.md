# Brochures

Manages tenant brochures stored as HTML blobs via BlobMap/BlobModel.

**Operations:** 6 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/Brochures/Create` | Creates a new brochure and uploads its HTML file to blob storage. (Audited)  (Auth roles: 1.0.0,23.1.0) |
| DELETE | `/api/Brochures/Delete` | Deletes a brochure and its associated blob mapping for the current tenant. (Audited)  (Auth roles: 1.0.0,23.4.0) |
| GET | `/api/Brochures/DownloadPdf` | Downloads a brochure as a PDF file generated from its stored HTML content. (Auth roles: 1.0.0,23.2.0) |
| GET | `/api/Brochures/Get` | Gets a single brochure by ID for the current tenant. (Auth roles: 1.0.0,23.2.0) |
| POST | `/api/Brochures/Page` | Returns a paged list of brochures for the current tenant. (Auth roles: 1.0.0,23.2.0) |
| POST | `/api/Brochures/Update` | Updates brochure metadata and replaces the brochure HTML blob. (Audited)  (Auth roles: 1.0.0,23.3.0) |

## POST `/api/Brochures/Create`

Creates a new brochure and uploads its HTML file to blob storage. (Audited)  (Auth roles: 1.0.0,23.1.0)

- **Operation ID:** `Brochures_Create_POST`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BrochureRes`](../schemas.md#brochureres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/Brochures/Delete`

Deletes a brochure and its associated blob mapping for the current tenant. (Audited)  (Auth roles: 1.0.0,23.4.0)

- **Operation ID:** `Brochures_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/Brochures/DownloadPdf`

Downloads a brochure as a PDF file generated from its stored HTML content. (Auth roles: 1.0.0,23.2.0)

- **Operation ID:** `Brochures_DownloadPdf_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `pdfServiceType` | [`PdfServiceType`](../schemas.md#pdfservicetype) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | string (binary) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/Brochures/Get`

Gets a single brochure by ID for the current tenant. (Auth roles: 1.0.0,23.2.0)

- **Operation ID:** `Brochures_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BrochureRes`](../schemas.md#brochureres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Brochures/Page`

Returns a paged list of brochures for the current tenant. (Auth roles: 1.0.0,23.2.0)

- **Operation ID:** `Brochures_Page_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BrochureResPage`](../schemas.md#brochurerespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Brochures/Update`

Updates brochure metadata and replaces the brochure HTML blob. (Audited)  (Auth roles: 1.0.0,23.3.0)

- **Operation ID:** `Brochures_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BrochureRes`](../schemas.md#brochureres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
