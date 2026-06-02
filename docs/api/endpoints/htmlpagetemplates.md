# HtmlPageTemplates

Manages company-accessible HTML page templates used to render branded documents and hosted HTML content.
Templates can be downloaded with the caller's access token injected so the rendered page can call protected APIs.

**Operations:** 3 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/HtmlPageTemplates/Download` | Downloads an HTML template with the current caller's access token injected into the configured placeholder. (Auth roles: 1.0.0) |
| GET | `/api/HtmlPageTemplates/GetAccessTokenPlaceHolder` | Gets the token placeholder string that HTML templates must include where the caller's bearer token should be injected. (Auth roles: 1.0.0) |
| POST | `/api/HtmlPageTemplates/Page` | Gets a paged list of HTML page templates available to the current company, including shared system templates. (Auth roles: 1.0.0) |

## GET `/api/HtmlPageTemplates/Download`

Downloads an HTML template with the current caller's access token injected into the configured placeholder. (Auth roles: 1.0.0)

- **Operation ID:** `HtmlPageTemplates_Download_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | string (binary) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/HtmlPageTemplates/GetAccessTokenPlaceHolder`

Gets the token placeholder string that HTML templates must include where the caller's bearer token should be injected. (Auth roles: 1.0.0)

- **Operation ID:** `HtmlPageTemplates_GetAccessTokenPlaceHolder_GET`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | string |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/HtmlPageTemplates/Page`

Gets a paged list of HTML page templates available to the current company, including shared system templates. (Auth roles: 1.0.0)

- **Operation ID:** `HtmlPageTemplates_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`HtmlPageTemplatePageResPage`](../schemas.md#htmlpagetemplatepagerespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
