# GoogleSheetsA

Provides admin-only Google Sheets and Google Drive integration endpoints for downloading files and reading sheet data.
These endpoints support import and reporting workflows that rely on externally hosted spreadsheet content.

**Operations:** 2 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/GoogleSheetsA/Download` | Downloads a file from Google Sheets or Google Drive. Private files must be shared with the platform service account used by the integration. (Auth roles: Admin) |
| GET | `/api/GoogleSheetsA/GetAsJson` | Reads a specified Google Sheets range and returns the sheet data as JSON. (Auth roles: Admin) |

## GET `/api/GoogleSheetsA/Download`

Downloads a file from Google Sheets or Google Drive.
Private files must be shared with the platform service account used by the integration. (Auth roles: Admin)

- **Operation ID:** `GoogleSheetsA_Download_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `googleSheetUrl` | string | — |  |
| query | `fileNameWithExtension` | string | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | string (binary) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/GoogleSheetsA/GetAsJson`

Reads a specified Google Sheets range and returns the sheet data as JSON. (Auth roles: Admin)

- **Operation ID:** `GoogleSheetsA_GetAsJson_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `googleSheetUrl` | string | — | Any url that contains the spreadsheet id |
| query | `rangeInA1Notation` | string | — | e.g. WTD Scorecard'!A1:D121 For enitre sheet just specify the sheet title. e.g. WTD Scorecard |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ReadResponse`](../schemas.md#readresponse) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
